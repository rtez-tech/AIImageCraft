import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { GeneratedImage } from "@shared/schema";

interface EmbedModalProps {
  image: GeneratedImage;
  onClose: () => void;
}

export function EmbedModal({ image, onClose }: EmbedModalProps) {
  const { toast } = useToast();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const baseUrl = window.location.origin;
  const embedUrl = `${baseUrl}/embed/${image.id}`;
  
  const iframeCode = `<iframe 
  src="${embedUrl}"
  width="100%" 
  height="400"
  frameborder="0">
</iframe>`;

  const jsWidgetCode = `<script src="${baseUrl}/widget.js"></script>
<div id="aipixel-widget" 
     data-image-id="${image.id}"
     data-theme="light"
     data-size="medium"></div>`;

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(type);
      toast({
        title: "Copied to clipboard",
        description: "The embed code has been copied to your clipboard.",
      });
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy the embed code.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Embed Code</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Widget Preview */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Widget Preview</h3>
            <Card>
              <CardContent className="p-6">
                <div className="border-2 border-gray-200 rounded-lg p-4">
                  <img
                    src={image.imageUrl}
                    alt={image.prompt}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <p className="text-sm text-gray-600 mb-2">{image.prompt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{image.size}</span>
                    <span className="text-xs text-gray-500">{image.style.replace('_', ' ')}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Powered by <span className="font-medium">AIPixel Studio</span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Embed Code */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Embed Code</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  iframe Embed
                </label>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <code className="text-green-400 text-sm whitespace-pre-wrap">
                    {iframeCode}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-white hover:bg-gray-800"
                    onClick={() => copyToClipboard(iframeCode, 'iframe')}
                  >
                    {copiedCode === 'iframe' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  JavaScript Widget
                </label>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <code className="text-green-400 text-sm whitespace-pre-wrap">
                    {jsWidgetCode}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-white hover:bg-gray-800"
                    onClick={() => copyToClipboard(jsWidgetCode, 'js')}
                  >
                    {copiedCode === 'js' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Card className="bg-blue-50">
                <CardContent className="p-4">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Customization Options
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Custom themes and colors</li>
                    <li>• Size variations (small, medium, large)</li>
                    <li>• API key integration</li>
                    <li>• Custom generation limits</li>
                    <li>• Webhook notifications</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
