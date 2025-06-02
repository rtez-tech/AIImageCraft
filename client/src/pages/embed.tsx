import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import type { GeneratedImage } from "@shared/schema";

export default function Embed() {
  const params = useParams();
  const imageId = params.id ? parseInt(params.id) : null;

  const { data: image, isLoading, error } = useQuery<GeneratedImage>({
    queryKey: [`/api/images/${imageId}`],
    enabled: !!imageId,
  });

  if (!imageId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900">Invalid Image ID</h1>
            </div>
            <p className="text-sm text-gray-600">
              Please provide a valid image ID to embed.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <Skeleton className="h-64 w-full rounded-t-lg" />
          <CardContent className="p-4">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !image) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900">Image Not Found</h1>
            </div>
            <p className="text-sm text-gray-600">
              The requested image could not be found.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <img
          src={image.imageUrl}
          alt={image.prompt}
          className="w-full h-auto rounded-t-lg"
        />
        <CardContent className="p-4">
          <p className="text-sm text-gray-700 mb-2">{image.prompt}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{image.size}</span>
            <span>{image.style.replace('_', ' ')}</span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Powered by{" "}
              <a
                href={window.location.origin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                AIPixel Studio
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
