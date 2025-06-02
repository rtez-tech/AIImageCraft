import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { GenerateImageRequest, GeneratedImage } from "@shared/schema";

export function useImageGeneration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: GenerateImageRequest): Promise<GeneratedImage> => {
      const response = await apiRequest("POST", "/api/generate-image", data);
      return response.json();
    },
    onSuccess: () => {
      // Invalidate images query to refresh the gallery
      queryClient.invalidateQueries({ queryKey: ["/api/images"] });
    },
  });
}

export function useDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await apiRequest("DELETE", `/api/images/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/images"] });
    },
  });
}
