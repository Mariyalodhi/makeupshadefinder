import { useState, useCallback } from 'react';
import { SkinToneDetector } from '@/lib/skin-tone-detection';
import { ColorAnalysis } from '@/types/makeup';

export function useImageUpload() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ColorAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const detector = new SkinToneDetector();

  const handleImageUpload = useCallback(async (file: File) => {
    setError(null);
    setUploadedImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Analyze image
    setIsAnalyzing(true);
    try {
      const result = await detector.analyzeImage(file);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const resetUpload = useCallback(() => {
    setUploadedImage(null);
    setImagePreview(null);
    setAnalysis(null);
    setError(null);
    setIsAnalyzing(false);
  }, []);

  return {
    uploadedImage,
    imagePreview,
    isAnalyzing,
    analysis,
    error,
    handleImageUpload,
    resetUpload,
  };
}
