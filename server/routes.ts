import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateImageRequestSchema } from "@shared/schema";
import { generateImage } from "./lib/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate image endpoint
  app.post("/api/generate-image", async (req, res) => {
    try {
      const validatedData = generateImageRequestSchema.parse(req.body);
      
      // Generate image with OpenAI
      const result = await generateImage({
        prompt: validatedData.prompt,
        size: validatedData.size,
        quality: validatedData.quality,
      });

      // Store in database
      const savedImage = await storage.createGeneratedImage({
        prompt: validatedData.prompt,
        imageUrl: result.url,
        size: validatedData.size,
        style: validatedData.style,
        quality: validatedData.quality,
        userId: null, // For now, not requiring authentication
      });

      res.json(savedImage);
    } catch (error) {
      console.error("Error generating image:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to generate image" 
      });
    }
  });

  // Get all generated images
  app.get("/api/images", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const images = await storage.getGeneratedImages(limit);
      res.json(images);
    } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).json({ message: "Failed to fetch images" });
    }
  });

  // Get single image for embedding
  app.get("/api/images/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const image = await storage.getGeneratedImage(id);
      
      if (!image) {
        res.status(404).json({ message: "Image not found" });
        return;
      }

      res.json(image);
    } catch (error) {
      console.error("Error fetching image:", error);
      res.status(500).json({ message: "Failed to fetch image" });
    }
  });

  // Delete image
  app.delete("/api/images/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteGeneratedImage(id);
      
      if (!deleted) {
        res.status(404).json({ message: "Image not found" });
        return;
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({ message: "Failed to delete image" });
    }
  });

  // Embed widget endpoint
  app.get("/embed/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const image = await storage.getGeneratedImage(id);
      
      if (!image) {
        res.status(404).send("Image not found");
        return;
      }

      const embedHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Generated Image</title>
  <style>
    body { margin: 0; padding: 16px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
    .container { max-width: 100%; text-align: center; }
    img { max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .caption { margin-top: 12px; font-size: 14px; color: #666; }
    .powered-by { margin-top: 8px; font-size: 12px; color: #999; }
    .powered-by a { color: #6366F1; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <img src="${image.imageUrl}" alt="${image.prompt}" />
    <div class="caption">${image.prompt}</div>
    <div class="powered-by">Powered by <a href="${process.env.APP_URL || 'http://localhost:5000'}" target="_blank">AIPixel Studio</a></div>
  </div>
</body>
</html>`;

      res.setHeader('Content-Type', 'text/html');
      res.send(embedHtml);
    } catch (error) {
      console.error("Error serving embed:", error);
      res.status(500).send("Error loading image");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
