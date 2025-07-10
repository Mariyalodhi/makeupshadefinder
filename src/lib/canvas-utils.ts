export class CanvasUtils {
  static applyMakeupOverlay(
    canvas: HTMLCanvasElement,
    originalImage: HTMLImageElement,
    shade: string,
    makeupType: 'foundation' | 'concealer' | 'highlighter' = 'foundation'
  ): void {
    const ctx = canvas.getContext('2d')!;
    
    // Clear canvas and redraw original image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
    
    // Apply makeup overlay based on type
    switch (makeupType) {
      case 'foundation':
        this.applyFoundationOverlay(ctx, canvas, shade);
        break;
      case 'concealer':
        this.applyConcealerOverlay(ctx, canvas, shade);
        break;
      case 'highlighter':
        this.applyHighlighterOverlay(ctx, canvas, shade);
        break;
    }
  }

  private static applyFoundationOverlay(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, shade: string): void {
    // Get the color from shade
    const color = this.getColorFromShade(shade);
    
    // Create a subtle overlay for foundation
    ctx.globalCompositeOperation = 'multiply';
    ctx.globalAlpha = 0.3;
    
    // Apply to face region (simplified - in production, use face detection)
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 4;
    
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Reset blend mode
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }

  private static applyConcealerOverlay(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, shade: string): void {
    const color = this.getColorFromShade(shade);
    
    // Apply to under-eye area and blemish-prone areas
    ctx.globalCompositeOperation = 'normal';
    ctx.globalAlpha = 0.4;
    
    // Under-eye area (simplified positioning)
    const eyeY = canvas.height * 0.45;
    const eyeWidth = canvas.width * 0.3;
    const eyeHeight = canvas.height * 0.1;
    
    ctx.fillStyle = color;
    ctx.fillRect(canvas.width * 0.2, eyeY, eyeWidth, eyeHeight);
    ctx.fillRect(canvas.width * 0.5, eyeY, eyeWidth, eyeHeight);
    
    ctx.globalAlpha = 1;
  }

  private static applyHighlighterOverlay(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, shade: string): void {
    const color = this.getColorFromShade(shade);
    
    // Apply to highlight areas (nose bridge, cheekbones, etc.)
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 0.6;
    
    // Nose bridge
    const noseX = canvas.width / 2;
    const noseY = canvas.height * 0.4;
    const noseWidth = canvas.width * 0.05;
    const noseHeight = canvas.height * 0.2;
    
    ctx.fillStyle = color;
    ctx.fillRect(noseX - noseWidth / 2, noseY, noseWidth, noseHeight);
    
    // Cheekbones
    const cheekY = canvas.height * 0.5;
    const cheekRadius = canvas.width * 0.08;
    
    ctx.beginPath();
    ctx.arc(canvas.width * 0.25, cheekY, cheekRadius, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(canvas.width * 0.75, cheekY, cheekRadius, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }

  private static getColorFromShade(shade: string): string {
    // Map shade names to colors
    const shadeMap: Record<string, string> = {
      'light-warm': '#F5DEB3',
      'light-medium-warm': '#E8C5A0',
      'medium-warm': '#D4A574',
      'medium-deep-warm': '#C9A96E',
      'deep-warm': '#B8860B',
      'very-deep-warm': '#8B4513',
      'light-cool': '#F0E6D2',
      'medium-cool': '#E6B88A',
      'deep-cool': '#CD853F',
    };
    
    return shadeMap[shade] || '#D4A574';
  }

  static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  static rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
}
