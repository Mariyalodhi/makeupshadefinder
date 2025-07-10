import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Camera, Upload, RotateCcw, Palette, Zap, Target, Users } from 'lucide-react';
import { analyzeSkinTone } from '@/lib/skin-tone-detection';
import type { SkinToneAnalysis, ColorAnalysis } from '@/types/makeup';
import { UNDERTONE_DESCRIPTIONS, DEPTH_DESCRIPTIONS, getShadeColor } from '@/lib/product-database';

interface SkinToneAnalyzerProps {
  imagePreview: string;
  analysis: ColorAnalysis;
  onAnalysisComplete: (analysis: ColorAnalysis) => void;
}

export function SkinToneAnalyzer({ imagePreview, analysis, onAnalysisComplete }: SkinToneAnalyzerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    if (imagePreview && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Animate confidence score
        let current = 0;
        const target = Math.round(analysis.confidence * 100);
        const increment = target / 50;

        const animate = () => {
          current += increment;
          if (current < target) {
            setConfidence(Math.round(current));
            requestAnimationFrame(animate);
          } else {
            setConfidence(target);
          }
        };

        animate();
      };

      img.src = imagePreview;
    }
  }, [imagePreview, analysis]);

  useEffect(() => {
    onAnalysisComplete(analysis);
  }, [analysis, onAnalysisComplete]);

  const getUndertoneColor = (undertone: string) => {
    const colors = {
      warm: '#F4D03F',
      cool: '#F1948A',
      neutral: '#D5DBDB',
      olive: '#A9DFBF'
    };
    return colors[undertone as keyof typeof colors] || '#D5DBDB';
  };

  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-bold text-gray-800 mb-8">Your Detected Skin Tone</h3>

      {/* Canvas Preview */}
      <div className="relative bg-gray-100 rounded-xl overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-auto" />
        <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
          <Palette className="w-5 h-5 text-primary" />
        </div>
      </div>

      {/* Analysis Results */}
      <Card className="bg-gradient-to-br from-amber-50 to-rose-50 border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div 
              className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              style={{ backgroundColor: getShadeColor(analysis.depth) }}
            />
            <div>
              <h4 className="text-xl font-semibold text-gray-800 capitalize">
                {analysis.depth.replace('-', ' ')} {analysis.undertone}
              </h4>
              <p className="text-gray-600">{UNDERTONE_DESCRIPTIONS[analysis.undertone]}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Undertone:</span>
              <Badge 
                variant="secondary" 
                className="capitalize"
                style={{ backgroundColor: getUndertoneColor(analysis.undertone) }}
              >
                {analysis.undertone}
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Depth:</span>
              <Badge variant="secondary" className="capitalize">
                {analysis.depth.replace('-', ' ')}
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Confidence:</span>
              <Badge 
                variant="secondary" 
                className={confidence >= 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
              >
                {confidence}%
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Palette className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Matches:</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Finding products...
              </Badge>
            </div>
          </div>

          {/* Dominant Colors */}
          <div>
            <h5 className="font-semibold text-gray-700 mb-3">Dominant Colors</h5>
            <div className="flex space-x-2">
              {analysis.dominantColors.slice(0, 5).map((color, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                  />
                  <span className="text-xs text-gray-500 mt-1">
                    {Math.round(color.percentage)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}