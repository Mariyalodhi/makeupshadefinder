import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, RotateCcw, Palette } from 'lucide-react';

interface VirtualTryOnProps {
  imageFile: File | null;
  analysis: any;
  recommendedProducts?: any[];
}

export function VirtualTryOn({ imageFile, analysis, recommendedProducts = [] }: VirtualTryOnProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [makeupIntensity, setMakeupIntensity] = useState([30]);
  const [selectedLipstick, setSelectedLipstick] = useState<string>('');
  const [selectedFoundation, setSelectedFoundation] = useState<string>('');

  const lipstickProducts = recommendedProducts.filter(p => p.type === 'lipstick');
  const foundationProducts = recommendedProducts.filter(p => p.type === 'foundation');

  useEffect(() => {
    if (imageFile && canvasRef.current) {
      applyMakeup();
    }
  }, [imageFile, analysis, makeupIntensity, selectedLipstick, selectedFoundation]);

  const applyMakeup = async () => {
    if (!imageFile || !canvasRef.current) return;

    setIsProcessing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the original image
      ctx.drawImage(img, 0, 0);

      const intensity = makeupIntensity[0] / 100;

      // Apply foundation if selected
      if (selectedFoundation && foundationProducts.length > 0) {
        const foundation = foundationProducts.find(p => p.id === selectedFoundation);
        if (foundation?.hexColor) {
          const color = hexToRgb(foundation.hexColor);
          if (color) {
            ctx.globalCompositeOperation = 'multiply';
            ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${intensity * 0.2})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'source-over';
          }
        }
      }

      // Apply lipstick if selected (simplified lip detection)
      if (selectedLipstick && lipstickProducts.length > 0) {
        const lipstick = lipstickProducts.find(p => p.id === selectedLipstick);
        if (lipstick?.hexColor) {
          const color = hexToRgb(lipstick.hexColor);
          if (color) {
            // Simplified lip area detection - center bottom third
            const lipY = canvas.height * 0.7;
            const lipHeight = canvas.height * 0.1;
            const lipWidth = canvas.width * 0.15;
            const lipX = (canvas.width - lipWidth) / 2;

            ctx.globalCompositeOperation = 'multiply';
            ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${intensity * 0.6})`;

            // Create a simple oval for lips
            ctx.beginPath();
            ctx.ellipse(canvas.width / 2, lipY, lipWidth / 2, lipHeight / 2, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
          }
        }
      }

      setIsProcessing(false);
    };

    img.src = URL.createObjectURL(imageFile);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const downloadResult = () => {
    if (!canvasRef.current) return;

    const link = document.createElement('a');
    link.download = 'makeup-try-on.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const resetCanvas = () => {
    setMakeupIntensity([30]);
    setSelectedLipstick('');
    setSelectedFoundation('');
    applyMakeup();
  };

  if (!imageFile) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Palette className="w-5 h-5 mr-2" />
            Virtual Try-On
          </CardTitle>
          <Badge variant="secondary">
            {isProcessing ? 'Processing...' : 'Ready'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Makeup Intensity: {makeupIntensity[0]}%
            </label>
            <Slider
              value={makeupIntensity}
              onValueChange={setMakeupIntensity}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>

          {foundationProducts.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Try Foundation
              </label>
              <Select value={selectedFoundation} onValueChange={setSelectedFoundation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a foundation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {foundationProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      <div className="flex items-center space-x-2">
                        {product.hexColor && (
                          <div 
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: product.hexColor }}
                          />
                        )}
                        <span>{product.brand} - {product.shade}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {lipstickProducts.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Try Lipstick
              </label>
              <Select value={selectedLipstick} onValueChange={setSelectedLipstick}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a lipstick" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {lipstickProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      <div className="flex items-center space-x-2">
                        {product.hexColor && (
                          <div 
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: product.hexColor }}
                          />
                        )}
                        <span>{product.brand} - {product.shade}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Canvas */}
        <div className="relative bg-gray-50 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            className="max-w-full h-auto mx-auto"
            style={{ maxHeight: '400px' }}
          />
          {isProcessing && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <p className="text-sm font-medium">Applying makeup...</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <Button onClick={resetCanvas} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={downloadResult} size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}