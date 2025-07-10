export interface SkinToneAnalysis {
  id: number;
  userId?: number;
  undertone: 'warm' | 'cool' | 'neutral' | 'olive';
  depth: 'very-light' | 'light' | 'light-medium' | 'medium' | 'medium-deep' | 'deep' | 'very-deep';
  confidence: number;
  imageData?: string;
  analysis?: any;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  type: 'foundation' | 'concealer' | 'highlighter' | 'lipstick';
  shade: string;
  undertone: 'warm' | 'cool' | 'neutral' | 'olive';
  depth: 'very-light' | 'light' | 'light-medium' | 'medium' | 'medium-deep' | 'deep' | 'very-deep';
  price: number;
  affiliateLink: string;
  imageUrl?: string;
  country: 'pakistan' | 'india' | 'global' | 'other';
  hexColor?: string;
}

export interface CountrySettings {
  code: 'pakistan' | 'india' | 'global' | 'other';
  name: string;
  currency: string;
  affiliateUrls: {
    primary: string;
    secondary?: string;
  };
}

export interface Recommendation {
  id: number;
  analysisId: number;
  productId: number;
  matchScore: string;
  product: Product;
}

export interface ColorAnalysis {
  avgColor: {
    r: number;
    g: number;
    b: number;
  };
  dominantColors: Array<{
    r: number;
    g: number;
    b: number;
    percentage: number;
  }>;
  undertone: 'warm' | 'cool' | 'neutral' | 'olive';
  depth: 'very-light' | 'light' | 'light-medium' | 'medium' | 'medium-deep' | 'deep' | 'very-deep';
  confidence: number;
}