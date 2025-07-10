import { ColorAnalysis } from "@/types/makeup";

export class SkinToneDetector {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
  }

  async analyzeImage(imageFile: File): Promise<ColorAnalysis> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const analysis = this.processImage(img);
          resolve(analysis);
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(imageFile);
    });
  }

  private processImage(img: HTMLImageElement): ColorAnalysis {
    // Set canvas size
    this.canvas.width = img.width;
    this.canvas.height = img.height;
    
    // Draw image
    this.ctx.drawImage(img, 0, 0);
    
    // Get image data
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    
    // Analyze skin tone in central face region (approximate)
    const centerX = Math.floor(this.canvas.width / 2);
    const centerY = Math.floor(this.canvas.height / 2);
    const regionSize = Math.min(this.canvas.width, this.canvas.height) / 4;
    
    const skinPixels = this.extractSkinPixels(data, centerX, centerY, regionSize);
    const avgColor = this.calculateAverageColor(skinPixels);
    const dominantColors = this.findDominantColors(skinPixels);
    
    const undertone = this.detectUndertone(avgColor, dominantColors);
    const depth = this.detectDepth(avgColor);
    const confidence = this.calculateConfidence(skinPixels, undertone, depth);
    
    return {
      avgColor,
      dominantColors,
      undertone,
      depth,
      confidence
    };
  }

  private extractSkinPixels(data: Uint8ClampedArray, centerX: number, centerY: number, regionSize: number): Array<{r: number, g: number, b: number}> {
    const skinPixels: Array<{r: number, g: number, b: number}> = [];
    
    for (let y = centerY - regionSize; y < centerY + regionSize; y++) {
      for (let x = centerX - regionSize; x < centerX + regionSize; x++) {
        if (x >= 0 && x < this.canvas.width && y >= 0 && y < this.canvas.height) {
          const index = (y * this.canvas.width + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          
          // Simple skin color detection - can be improved with ML
          if (this.isSkinColor(r, g, b)) {
            skinPixels.push({ r, g, b });
          }
        }
      }
    }
    
    return skinPixels;
  }

  private isSkinColor(r: number, g: number, b: number): boolean {
    // Basic skin color detection based on RGB ranges
    // This is a simplified version - in production, use more sophisticated detection
    return (
      r > 95 && g > 40 && b > 20 &&
      r > g && r > b &&
      r - g > 15 &&
      Math.abs(r - g) > 15
    );
  }

  private calculateAverageColor(pixels: Array<{r: number, g: number, b: number}>): {r: number, g: number, b: number} {
    if (pixels.length === 0) {
      return { r: 200, g: 180, b: 140 }; // Default skin tone
    }
    
    const sum = pixels.reduce((acc, pixel) => ({
      r: acc.r + pixel.r,
      g: acc.g + pixel.g,
      b: acc.b + pixel.b
    }), { r: 0, g: 0, b: 0 });
    
    return {
      r: Math.round(sum.r / pixels.length),
      g: Math.round(sum.g / pixels.length),
      b: Math.round(sum.b / pixels.length)
    };
  }

  private findDominantColors(pixels: Array<{r: number, g: number, b: number}>): Array<{r: number, g: number, b: number, percentage: number}> {
    // Simple color clustering - group similar colors
    const colorGroups = new Map<string, number>();
    
    pixels.forEach(pixel => {
      // Round to nearest 10 for grouping
      const key = `${Math.round(pixel.r / 10) * 10}-${Math.round(pixel.g / 10) * 10}-${Math.round(pixel.b / 10) * 10}`;
      colorGroups.set(key, (colorGroups.get(key) || 0) + 1);
    });
    
    // Convert to array and sort by frequency
    const sortedColors = Array.from(colorGroups.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([key, count]) => {
        const [r, g, b] = key.split('-').map(Number);
        return {
          r, g, b,
          percentage: (count / pixels.length) * 100
        };
      });
    
    return sortedColors;
  }

  private detectUndertone(avgColor: {r: number, g: number, b: number}, dominantColors: Array<{r: number, g: number, b: number, percentage: number}>): 'warm' | 'cool' | 'neutral' | 'olive' {
    const { r, g, b } = avgColor;
    
    // Calculate ratios
    const redRatio = r / (r + g + b);
    const greenRatio = g / (r + g + b);
    const blueRatio = b / (r + g + b);
    
    // Detect undertone based on color ratios
    if (redRatio > 0.4 && greenRatio > 0.35) {
      return 'warm'; // Yellow/golden undertones
    } else if (blueRatio > 0.25 || (r > g && r > b && redRatio > 0.45)) {
      return 'cool'; // Pink/red undertones
    } else if (greenRatio > 0.38 && redRatio > 0.35) {
      return 'olive'; // Green/yellow undertones
    } else {
      return 'neutral'; // Balanced undertones
    }
  }

  private detectDepth(avgColor: {r: number, g: number, b: number}): 'very-light' | 'light' | 'light-medium' | 'medium' | 'medium-deep' | 'deep' | 'very-deep' {
    const { r, g, b } = avgColor;
    const brightness = (r + g + b) / 3;
    
    if (brightness > 220) return 'very-light';
    if (brightness > 200) return 'light';
    if (brightness > 180) return 'light-medium';
    if (brightness > 160) return 'medium';
    if (brightness > 140) return 'medium-deep';
    if (brightness > 120) return 'deep';
    return 'very-deep';
  }

  private calculateConfidence(pixels: Array<{r: number, g: number, b: number}>, undertone: string, depth: string): number {
    // Simple confidence calculation based on pixel consistency
    if (pixels.length < 100) return 0.4; // Low confidence for few pixels
    
    const avgColor = this.calculateAverageColor(pixels);
    const variance = pixels.reduce((acc, pixel) => {
      const diff = Math.abs(pixel.r - avgColor.r) + Math.abs(pixel.g - avgColor.g) + Math.abs(pixel.b - avgColor.b);
      return acc + diff;
    }, 0) / pixels.length;
    
    // Lower variance = higher confidence
    const baseConfidence = Math.max(0.5, 1 - (variance / 150));
    
    // Boost confidence for clear undertones
    const undertoneBoost = undertone === 'neutral' ? 0.8 : 0.9;
    
    return Math.min(0.95, baseConfidence * undertoneBoost);
  }
}
