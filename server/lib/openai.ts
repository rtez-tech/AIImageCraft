import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface GenerateImageOptions {
  prompt: string;
  size: "1024x1024" | "1024x768" | "768x1024";
  quality: "standard" | "hd";
}

export async function generateImage(options: GenerateImageOptions): Promise<{ url: string }> {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: options.prompt,
      n: 1,
      size: options.size,
      quality: options.quality,
    });

    if (!response.data[0]?.url) {
      throw new Error("No image URL returned from OpenAI");
    }

    return { url: response.data[0].url };
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error(`Failed to generate image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
