import { ImageGenerator } from "@/components/image-generator";
import { ImageGallery } from "@/components/image-gallery";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2, Code, Play, Check, Book, Twitter, Github, MessageCircle } from "lucide-react";

export default function Home() {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Wand2 className="text-white h-4 w-4" />
                </div>
                <span className="text-xl font-bold text-gray-900">AIPixel Studio</span>
              </div>
              <div className="hidden md:flex space-x-6">
                <a href="#generate" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Generate
                </a>
                <a href="#gallery" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Gallery
                </a>
                <a href="#embed" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Embed
                </a>
                <a href="#api" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  API
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">AI</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Create Stunning AI Images
            <span className="block text-yellow-300">In Seconds</span>
          </h1>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Generate professional-quality images with AI and embed them seamlessly into any website. No design skills required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-gray-50 px-8 py-4 font-semibold shadow-lg"
              onClick={() => document.getElementById('generate')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="mr-2 h-4 w-4" />
              Start Creating
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 font-semibold"
              onClick={() => document.getElementById('embed')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Code className="mr-2 h-4 w-4" />
              View Embed Code
            </Button>
          </div>
        </div>
      </div>

      {/* Main Generation Interface */}
      <div id="generate" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ImageGenerator />
        
        <div id="gallery" className="mt-12">
          <ImageGallery />
        </div>
      </div>

      {/* Embed Section */}
      <div id="embed" className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Embed AI Image Generation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Add powerful AI image generation to your website with just a few lines of code. 
              Fully customizable and responsive for any platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Widget Preview */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Widget Preview</h3>
              <Card>
                <CardContent className="p-8">
                  <div className="border-2 border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      AI Image Generator
                    </h4>
                    <textarea 
                      placeholder="Describe your image..."
                      className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none text-sm"
                      defaultValue="A cute robot playing with colorful balloons"
                    />
                    <div className="flex justify-between items-center mt-4">
                      <select className="text-sm border border-gray-200 rounded px-3 py-2">
                        <option>512x512</option>
                        <option>1024x1024</option>
                      </select>
                      <Button size="sm" className="bg-primary text-white hover:opacity-90">
                        Generate
                      </Button>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Embed Code</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    iframe Embed
                  </label>
                  <div className="bg-gray-900 rounded-lg p-4 relative">
                    <code className="text-green-400 text-sm whitespace-pre-wrap">
{`<iframe 
  src="${window.location.origin}/embed/widget"
  width="100%" 
  height="400"
  frameborder="0">
</iframe>`}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-white hover:bg-gray-800"
                      onClick={() => copyToClipboard(`<iframe src="${window.location.origin}/embed/widget" width="100%" height="400" frameborder="0"></iframe>`)}
                    >
                      <Code className="h-4 w-4" />
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
        </div>
      </div>

      {/* API Section */}
      <div id="api" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Developer API</h2>
            <p className="text-xl text-gray-600">
              Integrate AI image generation directly into your applications
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Start</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">1. Make a Request</h4>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <code className="text-green-400 text-xs block whitespace-pre-wrap">
{`curl -X POST ${window.location.origin}/api/generate-image \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "A sunset over mountains",
    "size": "1024x1024",
    "style": "photorealistic"
  }'`}
                        </code>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">2. Get Results</h4>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <code className="text-blue-400 text-xs block whitespace-pre-wrap">
{`{
  "id": 123,
  "imageUrl": "https://generated-image-url.png",
  "prompt": "A sunset over mountains",
  "size": "1024x1024",
  "style": "photorealistic"
}`}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
                  <div className="space-y-4">
                    {[
                      { title: "High-Quality Generation", desc: "DALL-E 3 model for professional results" },
                      { title: "Fast Response Times", desc: "Average generation time under 10 seconds" },
                      { title: "Multiple Formats", desc: "Support for various image sizes and styles" },
                      { title: "Safety Filters", desc: "Built-in content moderation and safety checks" }
                    ].map((feature) => (
                      <div key={feature.title} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="text-green-600 h-3 w-3" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{feature.title}</h4>
                          <p className="text-sm text-gray-600">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90">
                      <Book className="mr-2 h-4 w-4" />
                      View Full Documentation
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Wand2 className="text-white h-4 w-4" />
                </div>
                <span className="text-xl font-bold">AIPixel Studio</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering developers and creators with cutting-edge AI image generation technology. 
                Create, embed, and scale with confidence.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Widget</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 AIPixel Studio. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
