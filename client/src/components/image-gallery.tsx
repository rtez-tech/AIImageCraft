import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, Code, Trash2, Filter, ArrowUpDown } from "lucide-react";
import { useDeleteImage } from "@/hooks/use-image-generation";
import { useToast } from "@/hooks/use-toast";
import { EmbedModal } from "./embed-modal";
import { useState } from "react";
import type { GeneratedImage } from "@shared/schema";

export function ImageGallery() {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const deleteMutation = useDeleteImage();

  const { data: images, isLoading } = useQuery<GeneratedImage[]>({
    queryKey: ["/api/images"],
  });

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast({
        title: "Image deleted",
        description: "The image has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete the image.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async (imageUrl: string, prompt: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-generated-${prompt.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download the image.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Generated Images</h3>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((index) => (
            <Card key={index} className="shadow-lg overflow-hidden">
              <Skeleton className="h-64 w-full" />
              <CardContent className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Generated Images</h3>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500">No images generated yet. Create your first AI image above!</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Generated Images</h3>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card
              key={image.id}
              className="shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <img
                src={image.imageUrl}
                alt={image.prompt}
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {image.prompt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {image.size}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {image.style.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(image.imageUrl, image.prompt)}
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedImage(image)}
                      title="Embed"
                    >
                      <Code className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(image.id)}
                      disabled={deleteMutation.isPending}
                      title="Delete"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedImage && (
        <EmbedModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}
