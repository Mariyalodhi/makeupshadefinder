import { Product, CountrySettings, ColorAnalysis } from "@/types/makeup";

export const BRAND_LOGOS: Record<string, string> = {
  "Fenty Beauty": "FENTY",
  "MAC": "MAC",
  "NARS": "NARS",
  "Lakme": "LAKME",
  "Sugar Cosmetics": "SUGAR",
  "Nykaa": "NYKAA",
  "Maybelline": "MAYBELLINE",
  "L'Oreal": "L'OREAL",
  "Huda Beauty": "HUDA",
  "NYX": "NYX",
  "Sephora": "SEPHORA",
  "Musarrat Misbah": "MM",
  "Beautify by Amna": "BEAUTIFY",
  "Medora": "MEDORA",
  "Miss Rose": "MISS ROSE",
  "Riwaj": "RIWAJ",
  "Christine": "CHRISTINE",
  "Kiro": "KIRO",
  "Kay Beauty": "KAY",
  "Juicy Chemistry": "JUICY",
  "FAE Beauty": "FAE",
  "Plum Goodness": "PLUM",
};

export const COUNTRY_SETTINGS: Record<string, CountrySettings> = {
  pakistan: {
    code: 'pakistan',
    name: 'Pakistan',
    currency: 'PKR',
    affiliateUrls: {
      primary: 'https://daraz.pk',
      secondary: 'https://www.chemovaglow.com'
    }
  },
  india: {
    code: 'india',
    name: 'India',
    currency: 'INR',
    affiliateUrls: {
      primary: 'https://nykaa.com',
      secondary: 'https://amazon.in'
    }
  },
  global: {
    code: 'global',
    name: 'Global',
    currency: 'USD',
    affiliateUrls: {
      primary: 'https://amazon.com',
      secondary: 'https://sephora.com'
    }
  },
  other: {
    code: 'other',
    name: 'Other',
    currency: 'USD',
    affiliateUrls: {
      primary: 'https://amazon.com'
    }
  }
};

export const UNDERTONE_DESCRIPTIONS: Record<string, string> = {
  warm: "Golden, yellow, or peach undertones",
  cool: "Pink, red, or blue undertones",
  neutral: "Balanced mix of warm and cool tones",
  olive: "Green or yellow-green undertones",
};

export const DEPTH_DESCRIPTIONS: Record<string, string> = {
  "very-light": "Very fair skin tone",
  "light": "Light skin tone",
  "light-medium": "Light to medium skin tone",
  "medium": "Medium skin tone",
  "medium-deep": "Medium to deep skin tone",
  "deep": "Deep skin tone",
  "very-deep": "Very deep skin tone",
};

// Comprehensive product database with South Asian and international brands
export const PRODUCT_DATABASE: Product[] = [
  // Fenty Beauty - Global
  {
    id: "fenty-310",
    brand: "Fenty Beauty",
    name: "Pro Filt'r Soft Matte Foundation",
    type: "foundation",
    shade: "310",
    undertone: "warm",
    depth: "medium",
    price: 36,
    affiliateLink: "https://fentybeauty.com?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "global",
    hexColor: "#D4A574"
  },
  {
    id: "fenty-lipstick-red",
    brand: "Fenty Beauty",
    name: "Stunna Lip Paint",
    type: "lipstick",
    shade: "Uncensored",
    undertone: "cool",
    depth: "medium",
    price: 25,
    affiliateLink: "https://fentybeauty.com?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "global",
    hexColor: "#C41E3A"
  },

  // MAC - Global
  {
    id: "mac-nc42",
    brand: "MAC",
    name: "Studio Fix Fluid Foundation",
    type: "foundation",
    shade: "NC42",
    undertone: "warm",
    depth: "medium",
    price: 37,
    affiliateLink: "https://maccosmetics.com?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "global",
    hexColor: "#D4A574"
  },
  {
    id: "mac-ruby-woo",
    brand: "MAC",
    name: "Ruby Woo Lipstick",
    type: "lipstick",
    shade: "Ruby Woo",
    undertone: "cool",
    depth: "medium",
    price: 19,
    affiliateLink: "https://maccosmetics.com?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "global",
    hexColor: "#D2001F"
  },

  // Lakme - India
  {
    id: "lakme-w4",
    brand: "Lakme",
    name: "9to5 Weightless Mousse Foundation",
    type: "foundation",
    shade: "W4",
    undertone: "warm",
    depth: "medium",
    price: 15,
    affiliateLink: "https://nykaa.com/lakme?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "india",
    hexColor: "#D4A574"
  },
  {
    id: "lakme-red-lip",
    brand: "Lakme",
    name: "Enrich Matte Lipstick",
    type: "lipstick",
    shade: "RM16",
    undertone: "warm",
    depth: "medium",
    price: 8,
    affiliateLink: "https://nykaa.com/lakme?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "india",
    hexColor: "#E74C3C"
  },

  // Sugar Cosmetics - India
  {
    id: "sugar-foundation-20",
    brand: "Sugar Cosmetics",
    name: "Ace of Face Foundation Stick",
    type: "foundation",
    shade: "20 Biscotti",
    undertone: "warm",
    depth: "medium",
    price: 12,
    affiliateLink: "https://nykaa.com/sugar-cosmetics?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "india",
    hexColor: "#D4A574"
  },
  {
    id: "sugar-lipstick-bold",
    brand: "Sugar Cosmetics",
    name: "Smudge Me Not Liquid Lipstick",
    type: "lipstick",
    shade: "01 Red Velvet",
    undertone: "cool",
    depth: "medium",
    price: 9,
    affiliateLink: "https://nykaa.com/sugar-cosmetics?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "india",
    hexColor: "#B22222"
  },

  // Musarrat Misbah - Pakistan
  {
    id: "mm-foundation-beige",
    brand: "Musarrat Misbah",
    name: "Flawless Foundation",
    type: "foundation",
    shade: "Medium Beige",
    undertone: "warm",
    depth: "medium",
    price: 1200,
    affiliateLink: "https://daraz.pk/musarrat-misbah?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "pakistan",
    hexColor: "#D4A574"
  },
  {
    id: "mm-lipstick-coral",
    brand: "Musarrat Misbah",
    name: "Velvet Matte Lipstick",
    type: "lipstick",
    shade: "Coral Crush",
    undertone: "warm",
    depth: "medium",
    price: 800,
    affiliateLink: "https://daraz.pk/musarrat-misbah?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "pakistan",
    hexColor: "#FF7F50"
  },

  // Medora - Pakistan
  {
    id: "medora-foundation-honey",
    brand: "Medora",
    name: "HD Foundation",
    type: "foundation",
    shade: "Honey",
    undertone: "warm",
    depth: "medium",
    price: 950,
    affiliateLink: "https://daraz.pk/medora?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "pakistan",
    hexColor: "#DDB774"
  },
  {
    id: "medora-lipstick-rose",
    brand: "Medora",
    name: "Matte Lipstick",
    type: "lipstick",
    shade: "Rose Pink",
    undertone: "cool",
    depth: "light",
    price: 450,
    affiliateLink: "https://daraz.pk/medora?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "pakistan",
    hexColor: "#FF69B4"
  },

  // Huda Beauty - Global
  {
    id: "huda-foundation-fawn",
    brand: "Huda Beauty",
    name: "#FauxFilter Foundation",
    type: "foundation",
    shade: "Fawn 350G",
    undertone: "warm",
    depth: "medium",
    price: 40,
    affiliateLink: "https://hudabeauty.com?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "global",
    hexColor: "#D4A574"
  },
  {
    id: "huda-lipstick-trendsetter",
    brand: "Huda Beauty",
    name: "Power Bullet Matte Lipstick",
    type: "lipstick",
    shade: "Trendsetter",
    undertone: "warm",
    depth: "medium",
    price: 25,
    affiliateLink: "https://hudabeauty.com?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "global",
    hexColor: "#DC143C"
  },

  // Maybelline - Global
  {
    id: "maybelline-foundation-128",
    brand: "Maybelline",
    name: "Fit Me Foundation",
    type: "foundation",
    shade: "128 Warm Nude",
    undertone: "warm",
    depth: "light-medium",
    price: 8,
    affiliateLink: "https://maybelline.com?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "global",
    hexColor: "#E8C5A0"
  },
  {
    id: "maybelline-lipstick-red",
    brand: "Maybelline",
    name: "Super Stay Matte Ink",
    type: "lipstick",
    shade: "Pioneer",
    undertone: "warm",
    depth: "medium",
    price: 10,
    affiliateLink: "https://maybelline.com?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "global",
    hexColor: "#B22222"
  },

  // L'Oreal - Global
  {
    id: "loreal-foundation-w5",
    brand: "L'Oreal",
    name: "True Match Foundation",
    type: "foundation",
    shade: "W5 Sand",
    undertone: "warm",
    depth: "medium",
    price: 12,
    affiliateLink: "https://loreal.com?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "global",
    hexColor: "#DDB774"
  },
  {
    id: "loreal-lipstick-nude",
    brand: "L'Oreal",
    name: "Rouge Signature Matte Lip Stain",
    type: "lipstick",
    shade: "I Choose",
    undertone: "neutral",
    depth: "medium",
    price: 11,
    affiliateLink: "https://loreal.com?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "global",
    hexColor: "#D2691E"
  },

  // NARS - Global
  {
    id: "nars-foundation-punjab",
    brand: "NARS",
    name: "Natural Radiant Longwear Foundation",
    type: "foundation",
    shade: "Punjab",
    undertone: "warm",
    depth: "medium",
    price: 47,
    affiliateLink: "https://narscosmetics.com?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "global",
    hexColor: "#D4A574"
  },
  {
    id: "nars-lipstick-dragon",
    brand: "NARS",
    name: "Velvet Matte Lip Pencil",
    type: "lipstick",
    shade: "Dragon Girl",
    undertone: "warm",
    depth: "medium",
    price: 27,
    affiliateLink: "https://narscosmetics.com?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "global",
    hexColor: "#DC143C"
  },

  // NYX - Global
  {
    id: "nyx-foundation-caramel",
    brand: "NYX",
    name: "Can't Stop Won't Stop Foundation",
    type: "foundation",
    shade: "Caramel",
    undertone: "warm",
    depth: "medium",
    price: 15,
    affiliateLink: "https://nyxcosmetics.com?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "global",
    hexColor: "#D2B48C"
  },
  {
    id: "nyx-lipstick-pink",
    brand: "NYX",
    name: "Matte Lipstick",
    type: "lipstick",
    shade: "Pure Red",
    undertone: "cool",
    depth: "medium",
    price: 6,
    affiliateLink: "https://nyxcosmetics.com?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "global",
    hexColor: "#DC143C"
  },

  // Sephora - Global
  {
    id: "sephora-foundation-25",
    brand: "Sephora",
    name: "Best Skin Ever Foundation",
    type: "foundation",
    shade: "25 Medium",
    undertone: "neutral",
    depth: "medium",
    price: 20,
    affiliateLink: "https://sephora.com?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "global",
    hexColor: "#D4A574"
  },
  {
    id: "sephora-lipstick-always-red",
    brand: "Sephora",
    name: "Rouge Cream Lipstick",
    type: "lipstick",
    shade: "Always Red",
    undertone: "cool",
    depth: "medium",
    price: 8,
    affiliateLink: "https://sephora.com?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "global",
    hexColor: "#B22222"
  },

  // Beautify by Amna - Pakistan
  {
    id: "beautify-foundation-golden",
    brand: "Beautify by Amna",
    name: "Flawless Foundation",
    type: "foundation",
    shade: "Golden Medium",
    undertone: "warm",
    depth: "medium",
    price: 1500,
    affiliateLink: "https://daraz.pk/beautify-by-amna?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "pakistan",
    hexColor: "#D4A574"
  },
  {
    id: "beautify-lipstick-berry",
    brand: "Beautify by Amna",
    name: "Matte Liquid Lipstick",
    type: "lipstick",
    shade: "Berry Bliss",
    undertone: "cool",
    depth: "medium",
    price: 900,
    affiliateLink: "https://daraz.pk/beautify-by-amna?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "pakistan",
    hexColor: "#8B008B"
  },

  // Miss Rose - Pakistan
  {
    id: "miss-rose-foundation-natural",
    brand: "Miss Rose",
    name: "Liquid Foundation",
    type: "foundation",
    shade: "Natural Beige",
    undertone: "neutral",
    depth: "medium",
    price: 600,
    affiliateLink: "https://daraz.pk/miss-rose?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "pakistan",
    hexColor: "#D4A574"
  },
  {
    id: "miss-rose-lipstick-nude",
    brand: "Miss Rose",
    name: "Matte Lipstick",
    type: "lipstick",
    shade: "Nude Pink",
    undertone: "warm",
    depth: "light",
    price: 250,
    affiliateLink: "https://daraz.pk/miss-rose?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "pakistan",
    hexColor: "#FFB6C1"
  },

    // Riwaj - Pakistan
  {
    id: "riwaj-foundation-wheat",
    brand: "Riwaj",
    name: "Perfect Coverage Foundation",
    type: "foundation",
    shade: "Wheat",
    undertone: "warm",
    depth: "medium",
    price: 850,
    affiliateLink: "https://daraz.pk/riwaj?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "pakistan",
    hexColor: "#DEB887"
  },
  {
    id: "riwaj-lipstick-coral",
    brand: "Riwaj",
    name: "Velvet Matte Lipstick",
    type: "lipstick",
    shade: "Coral Delight",
    undertone: "warm",
    depth: "medium",
    price: 400,
    affiliateLink: "https://daraz.pk/riwaj?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "pakistan",
    hexColor: "#FF7F50"
  },

  // Christine - Pakistan
  {
    id: "christine-foundation-honey",
    brand: "Christine",
    name: "Liquid Foundation",
    type: "foundation",
    shade: "Honey Glow",
    undertone: "warm",
    depth: "medium",
    price: 700,
    affiliateLink: "https://daraz.pk/christine?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "pakistan",
    hexColor: "#DAA520"
  },
  {
    id: "christine-lipstick-red",
    brand: "Christine",
    name: "Matte Lipstick",
    type: "lipstick",
    shade: "Classic Red",
    undertone: "cool",
    depth: "medium",
    price: 350,
    affiliateLink: "https://daraz.pk/christine?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "pakistan",
    hexColor: "#DC143C"
  },

    // Nykaa - India
  {
    id: "nykaa-foundation-walnut",
    brand: "Nykaa",
    name: "All Day Matte Foundation",
    type: "foundation",
    shade: "Walnut",
    undertone: "warm",
    depth: "medium",
    price: 16,
    affiliateLink: "https://nykaa.com/nykaa-cosmetics?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "india",
    hexColor: "#D2B48C"
  },
  {
    id: "nykaa-lipstick-berry",
    brand: "Nykaa",
    name: "Matte to Last Liquid Lipstick",
    type: "lipstick",
    shade: "Berry Important",
    undertone: "cool",
    depth: "medium",
    price: 7,
    affiliateLink: "https://nykaa.com/nykaa-cosmetics?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "india",
    hexColor: "#8B008B"
  },

  // Kiro - India
  {
    id: "kiro-foundation-medium",
    brand: "Kiro",
    name: "Flawless Foundation",
    type: "foundation",
    shade: "Medium Beige",
    undertone: "neutral",
    depth: "medium",
    price: 14,
    affiliateLink: "https://nykaa.com/kiro?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "india",
    hexColor: "#D4A574"
  },
  {
    id: "kiro-lipstick-nude",
    brand: "Kiro",
    name: "Matte Lipstick",
    type: "lipstick",
    shade: "Nude Appeal",
    undertone: "warm",
    depth: "medium",
    price: 9,
    affiliateLink: "https://nykaa.com/kiro?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "india",
    hexColor: "#DEB887"
  },

  // Kay Beauty - India
  {
    id: "kay-foundation-honey",
    brand: "Kay Beauty",
    name: "Mattifying Foundation",
    type: "foundation",
    shade: "Honey 130",
    undertone: "warm",
    depth: "medium",
    price: 18,
    affiliateLink: "https://nykaa.com/kay-beauty?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "india",
    hexColor: "#DAA520"
  },
  {
    id: "kay-lipstick-coral",
    brand: "Kay Beauty",
    name: "Matte Lip Crayon",
    type: "lipstick",
    shade: "Coral Crush",
    undertone: "warm",
    depth: "medium",
    price: 12,
    affiliateLink: "https://nykaa.com/kay-beauty?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "india",
    hexColor: "#FF7F50"
  },

  // Juicy Chemistry - India
  {
    id: "juicy-foundation-natural",
    brand: "Juicy Chemistry",
    name: "Organic Foundation",
    type: "foundation",
    shade: "Natural Medium",
    undertone: "neutral",
    depth: "medium",
    price: 22,
    affiliateLink: "https://nykaa.com/juicy-chemistry?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "india",
    hexColor: "#D4A574"
  },
  {
    id: "juicy-lipstick-rose",
    brand: "Juicy Chemistry",
    name: "Organic Lip Tint",
    type: "lipstick",
    shade: "Rose Petal",
    undertone: "cool",
    depth: "light",
    price: 15,
    affiliateLink: "https://nykaa.com/juicy-chemistry?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "india",
    hexColor: "#FFB6C1"
  },

  // FAE Beauty - India
  {
    id: "fae-foundation-caramel",
    brand: "FAE Beauty",
    name: "Weightless Foundation",
    type: "foundation",
    shade: "Caramel",
    undertone: "warm",
    depth: "medium",
    price: 20,
    affiliateLink: "https://nykaa.com/fae-beauty?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "india",
    hexColor: "#D2B48C"
  },
  {
    id: "fae-lipstick-berry",
    brand: "FAE Beauty",
    name: "Liquid Matte Lipstick",
    type: "lipstick",
    shade: "Berry Bliss",
    undertone: "cool",
    depth: "medium",
    price: 13,
    affiliateLink: "https://nykaa.com/fae-beauty?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "india",
    hexColor: "#8B008B"
  },

  // Plum Goodness - India
  {
    id: "plum-foundation-tan",
    brand: "Plum Goodness",
    name: "Natural Foundation",
    type: "foundation",
    shade: "Tan",
    undertone: "warm",
    depth: "medium",
    price: 19,
    affiliateLink: "https://nykaa.com/plum-goodness?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "india",
    hexColor: "#D2B48C"
  },
  {
    id: "plum-lipstick-nude",
    brand: "Plum Goodness",
    name: "Matte Lip Crayon",
    type: "lipstick",
    shade: "Nude Muse",
    undertone: "neutral",
    depth: "medium",
    price: 11,
    affiliateLink: "https://nykaa.com/plum-goodness?utm_source=chemovaglow&utm_medium=affiliate&utm_campaign=shadefinder",
    country: "india",
    hexColor: "#DEB887"
  }
];

export function getProductsByCountry(country: string): Product[] {
  if (country === 'global') {
    return PRODUCT_DATABASE.filter(p => p.country === 'global');
  }
  return PRODUCT_DATABASE.filter(p => p.country === country || p.country === 'global');
}

export function getMatchingProducts(
  undertone: string,
  depth: string,
  country: string,
  type?: 'foundation' | 'lipstick'
): Product[] {
  let products = getProductsByCountry(country);

  if (type) {
    products = products.filter(p => p.type === type);
  }

  return products.filter(p => {
    const undertoneMatch = p.undertone === undertone || p.undertone === 'neutral';
    const depthMatch = p.depth === depth || 
      (p.depth === 'light-medium' && (depth === 'light' || depth === 'medium')) ||
      (p.depth === 'medium-deep' && (depth === 'medium' || depth === 'deep'));

    return undertoneMatch && depthMatch;
  }).sort((a, b) => {
    // Prioritize exact matches
    const aExact = a.undertone === undertone && a.depth === depth;
    const bExact = b.undertone === undertone && b.depth === depth;
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;
    return 0;
  });
}

// Helper function to get shade color for display
export function getShadeColor(shade: string): string {
  // This is a simplified color mapping - in a real app, you'd have actual color values
  const colorMap: { [key: string]: string } = {
    'Fair': '#F7E7CE',
    'Light': '#F1D5AE',
    'Medium': '#D4A574',
    'Tan': '#C19A6B',
    'Deep': '#A67C52',
    'Rich': '#8B4513',
    'Ebony': '#654321',
    'Porcelain': '#FFF8DC',
    'Ivory': '#FFFFF0',
    'Beige': '#F5F5DC',
    'Sand': '#F4A460',
    'Honey': '#DAA520',
    'Caramel': '#D2691E',
    'Cocoa': '#D2691E',
    'Espresso': '#704214',
    'Mahogany': '#C04000'
  };

  return colorMap[shade] || '#D4A574';
}

// Helper function to get shade color from hex
export const getShadeColorFromHex = (hexColor: string): string => {
  return hexColor || '#D4A574'; // Default skin tone color
};

export const getMatchingProducts = (analysis: ColorAnalysis): Product[] => {
  if (!analysis) return [];

  const matchingProducts = PRODUCT_DATABASE.filter(product => {
    let score = 0;

    // Undertone matching (highest priority)
    if (product.undertone === analysis.undertone) {
      score += 50;
    }

    // Depth matching
    if (product.depth === analysis.depth) {
      score += 30;
    }

    // Similar depth ranges
    const depthRanges = {
      'very-light': ['light'],
      'light': ['very-light', 'light-medium'],
      'light-medium': ['light', 'medium'],
      'medium': ['light-medium', 'medium-dark'],
      'medium-dark': ['medium', 'dark'],
      'dark': ['medium-dark', 'very-dark'],
      'very-dark': ['dark']
    };

    if (depthRanges[analysis.depth]?.includes(product.depth)) {
      score += 15;
    }

    return score >= 30; // Minimum threshold for recommendations
  });

  return matchingProducts
    .sort((a, b) => {
      // Sort by score logic here
      return 0;
    })
    .slice(0, 20); // Limit to top 20 products
};

export const getShadeColor = (hexColor: string): string => {
  return hexColor || '#F5DEB3';
};

export const UNDERTONE_DESCRIPTIONS = {
  warm: 'Golden, yellow, or peachy undertones',
  cool: 'Pink, red, or blue undertones',
  neutral: 'Balanced mix of warm and cool undertones'
};

export const DEPTH_DESCRIPTIONS = {
  'very-light': 'Very fair complexion',
  'light': 'Fair to light complexion',
  'light-medium': 'Light to medium complexion',
  'medium': 'Medium complexion',
  'medium-dark': 'Medium to dark complexion',
  'dark': 'Dark complexion',
  'very-dark': 'Very dark complexion'
};