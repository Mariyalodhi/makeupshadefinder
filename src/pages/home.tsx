import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UploadZone } from '@/components/upload-zone';
import { SkinToneAnalyzer } from '@/components/skin-tone-analyzer';
import { ProductRecommendations } from '@/components/product-recommendations';
import { VirtualTryOn } from '@/components/virtual-try-on';
import { ManualInputForm } from '@/components/manual-input-form';
import { CountrySelector } from '@/components/country-selector';
import { useImageUpload } from '@/hooks/use-image-upload';
import { useToast } from '@/hooks/use-toast';
import { ColorAnalysis, Product } from '@/types/makeup';
import { apiRequest } from '@/lib/queryClient';
import { getMatchingProducts, BRAND_LOGOS, PRODUCT_DATABASE } from "@/lib/product-database";
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { 
  Palette, 
  Sparkles, 
  Users, 
  Camera, 
  Zap,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Menu,
  X,
  Play
} from 'lucide-react';

export default function Home() {
  const [currentAnalysis, setCurrentAnalysis] = useState<ColorAnalysis | null>(null);
  const [analysisId, setAnalysisId] = useState<number | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { toast } = useToast();
  const [selectedCountry, setSelectedCountry] = useState<string>('global');
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState("upload");

  const {
    uploadedImage,
    imagePreview,
    isAnalyzing,
    analysis,
    error,
    handleImageUpload,
    resetUpload,
  } = useImageUpload();

  // Mutation to save analysis
  const saveAnalysisMutation = useMutation({
    mutationFn: async (analysisData: ColorAnalysis) => {
      const response = await apiRequest('POST', '/api/skin-tone-analysis', {
        undertone: analysisData.undertone,
        depth: analysisData.depth,
        confidence: analysisData.confidence.toFixed(2),
        imageData: imagePreview,
        analysis: analysisData,
      });
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysisId(data.id);
      toast({
        title: "Analysis Complete!",
        description: "Your skin tone has been analyzed. Check out your personalized recommendations below.",
      });
    },
    onError: () => {
      toast({
        title: "Analysis Failed",
        description: "Unable to save your analysis. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Mutation to generate recommendations from manual input
  const generateRecommendationsMutation = useMutation({
    mutationFn: async (data: { undertone: string; depth: string }) => {
      const response = await apiRequest('POST', '/api/generate-recommendations', {
        analysisId: Date.now(), // temporary ID
        undertone: data.undertone,
        depth: data.depth,
      });
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentAnalysis({
        undertone: data[0]?.product.undertone || 'warm',
        depth: data[0]?.product.depth || 'medium',
        confidence: 0.85,
        avgColor: { r: 200, g: 180, b: 140 },
        dominantColors: []
      } as ColorAnalysis);
      toast({
        title: "Recommendations Generated!",
        description: "Based on your input, we've found perfect matches for you.",
      });
    },
    onError: () => {
      toast({
        title: "Failed to Generate Recommendations",
        description: "Please try again with different inputs.",
        variant: "destructive",
      });
    },
  });

  const handleAnalysisComplete = (analysisData: ColorAnalysis) => {
    setCurrentAnalysis(analysisData);
    saveAnalysisMutation.mutate(analysisData);

    // Generate product recommendations
    const products = getMatchingProducts(
      analysisData.undertone,
      analysisData.depth,
      selectedCountry
    );
    setRecommendedProducts(products);
  };

  const handleManualSubmit = (data: { undertone: string; depth: string }) => {
    generateRecommendationsMutation.mutate(data);

    // Generate product recommendations for manual input
    const products = getMatchingProducts(
      data.undertone,
      data.depth,
      selectedCountry
    );
    setRecommendedProducts(products);
  };

  // Get all unique brands from the product database
  const getAllBrands = () => {
    const uniqueBrands = new Set();
    PRODUCT_DATABASE.forEach(product => {
      uniqueBrands.add(product.brand);
    });

    return Array.from(uniqueBrands).map(brand => ({
      name: BRAND_LOGOS[brand as string] || brand,
      subtitle: brand === 'Fenty Beauty' ? 'BEAUTY' : 
               brand === 'MAC' ? 'COSMETICS' :
               brand === 'Sugar Cosmetics' ? 'COSMETICS' :
               brand === 'Musarrat Misbah' ? 'MAKEUP' :
               brand === 'Beautify by Amna' ? 'COSMETICS' :
               brand === 'Kay Beauty' ? 'BY KATRINA' :
               brand === 'Juicy Chemistry' ? 'ORGANIC' :
               brand === 'Plum Goodness' ? 'VEGAN' :
               'COSMETICS',
      country: PRODUCT_DATABASE.find(p => p.brand === brand)?.country || 'global'
    }));
  };

  const brands = getAllBrands();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                MakeupShadeFinder
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-primary transition-colors">Home</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-primary transition-colors">How It Works</a>
              <a href="#brands" className="text-gray-700 hover:text-primary transition-colors">Brands</a>
              <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">Contact</a>
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="hidden md:flex items-center space-x-4">
              <Button className="makeup-gradient text-white border-0 hover:scale-105 transition-all duration-300 shadow-lg">
                Sign In
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-2">
                <a href="#" className="text-gray-700 hover:text-primary transition-colors py-2">Home</a>
                <a href="#how-it-works" className="text-gray-700 hover:text-primary transition-colors py-2">How It Works</a>
                <a href="#brands" className="text-gray-700 hover:text-primary transition-colors py-2">Brands</a>
                <a href="#contact" className="text-gray-700 hover:text-primary transition-colors py-2">Contact</a>
                <Button className="makeup-gradient text-white border-0 hover:scale-105 transition-all duration-300 shadow-lg w-full mt-4">
                  Sign In
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {/* Floating makeup icons */}
          <div className="absolute top-20 left-10 animate-float">
            <Palette className="w-8 h-8 text-pink-400 opacity-20" />
          </div>
          <div className="absolute top-40 right-20 animate-float-delayed">
            <Heart className="w-6 h-6 text-purple-400 opacity-20" />
          </div>
          <div className="absolute bottom-40 left-20 animate-float">
            <Star className="w-10 h-10 text-blue-400 opacity-20" />
          </div>
          <div className="absolute top-60 left-1/3 animate-float-delayed">
            <Sparkles className="w-7 h-7 text-pink-500 opacity-30" />
          </div>
          <div className="absolute bottom-60 right-1/4 animate-float">
            <ShoppingBag className="w-9 h-9 text-purple-500 opacity-25" />
          </div>
        </div>

        {/* Attractive Video/Demo Section */}
        <div className="container mx-auto px-4 pt-20 pb-32">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
                <Sparkles className="w-4 h-4" />
                AI-Powered Beauty Tech
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
                Find Your
                <br />
                <span className="relative">
                  Perfect Shade
                  <div className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-pink-300 to-purple-300 rounded opacity-50"></div>
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Upload your selfie and discover makeup shades that perfectly match your skin tone using advanced AI technology across 30+ brands.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => setActiveTab("upload")}
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Try Virtual Makeup
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-full"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Right Visual - Virtual Try-On Demo */}
            <div className="flex-1 relative">
              <div className="relative bg-gradient-to-br from-white to-pink-50 rounded-3xl p-8 shadow-2xl border border-pink-100">
                <div className="absolute -top-4 -right-4 bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium animate-bounce">
                  VIRTUAL TOOL
                </div>

                {/* Mock Phone Interface */}
                <div className="bg-black rounded-3xl p-3 mx-auto" style={{width: '280px', height: '560px'}}>
                  <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl h-full relative overflow-hidden">
                    {/* Mock camera overlay */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-white text-sm font-medium">Live View</span>
                      </div>
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Camera className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Face detection overlay */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-40 h-48 border-4 border-white/50 rounded-2xl relative">
                        <div className="absolute top-2 left-2 w-4 h-4 border-l-4 border-t-4 border-white rounded-tl-lg"></div>
                        <div className="absolute top-2 right-2 w-4 h-4 border-r-4 border-t-4 border-white rounded-tr-lg"></div>
                        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-4 border-b-4 border-white rounded-bl-lg"></div>
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-4 border-b-4 border-white rounded-br-lg"></div>
                      </div>
                    </div>

                    {/* Makeup product selection at bottom */}
                    <div className="absolute bottom-6 left-4 right-4">
                      <div className="flex gap-2 justify-center">
                        {[
                          { color: '#FF6B6B', name: 'Lipstick' },
                          { color: '#4ECDC4', name: 'Foundation' },
                          { color: '#45B7D1', name: 'Eyeliner' },
                          { color: '#96CEB4', name: 'Blush' },
                          { color: '#FFEAA7', name: 'Highlighter' }
                        ].map((item, index) => (
                          <div key={index} className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm">
                            <div 
                              className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: item.color }}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Floating makeup icons */}
                    <div className="absolute top-20 left-8 animate-pulse">
                      <div className="bg-pink-400/80 backdrop-blur-sm rounded-full p-2">
                        <Palette className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-32 right-8 animate-pulse delay-500">
                      <div className="bg-purple-400/80 backdrop-blur-sm rounded-full p-2">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div></div>

      {/* Main Upload Section */}
      <section id="upload-section" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Upload Zone */}
            <div className="space-y-6">
              {!uploadedImage ? (
                <>
                  <UploadZone onImageUpload={handleImageUpload} isUploading={isAnalyzing} />
                  <ManualInputForm 
                    onSubmit={handleManualSubmit}
                    isLoading={generateRecommendationsMutation.isPending}
                  />
                </>
              ) : (
                <>
                  {analysis && (
                    <SkinToneAnalyzer 
                      imagePreview={imagePreview!}
                      analysis={analysis}
                      onAnalysisComplete={handleAnalysisComplete}
                    />
                  )}

                  <div className="flex justify-center">
                    <Button 
                      variant="outline" 
                      onClick={resetUpload}
                      className="text-primary border-primary hover:bg-primary hover:text-white"
                    >
                      Try Another Photo
                    </Button>
                  </div>
                </>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                  {error}
                </div>
              )}
            </div>

            {/* Virtual Try-On */}
            <div className="space-y-6">
              {imagePreview && analysis && (
                <VirtualTryOn 
                  imagePreview={imagePreview}
                  undertone={analysis.undertone}
                  depth={analysis.depth}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Recommendations */}
      {(currentAnalysis || analysisId) && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductRecommendations 
              products={recommendedProducts}
              loading={saveAnalysisMutation.isPending || generateRecommendationsMutation.isPending}
              selectedCountry={selectedCountry}
            />
          </div>
        </section>
      )}

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 relative overflow-hidden">
        {/* Background Makeup Icons */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-10 left-20 text-8xl">💄</div>
          <div className="absolute top-40 right-16 text-6xl">✨</div>
          <div className="absolute bottom-20 left-10 text-7xl">🎨</div>
          <div className="absolute bottom-32 right-32 text-5xl">💋</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600 bg-clip-text text-transparent mb-6">
              How It Works
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              Our advanced color analysis technology makes finding your perfect shade simple and accurate.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-all duration-300 pulse-glow">
                  <Camera className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm shimmer">
                  1
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Upload Your Selfie</h4>
              <p className="text-gray-600 leading-relaxed">
                Take a clear, well-lit photo of your face or upload an existing selfie from your gallery. Our AI will do the rest!
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-all duration-300 pulse-glow">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm shimmer">
                  2
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">AI Analysis</h4>
              <p className="text-gray-600 leading-relaxed">
                Our advanced algorithm analyzes your skin tone, undertone, and depth to find perfect matches across 30+ brands.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-all duration-300 pulse-glow">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm shimmer">
                  3
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Virtual Try & Shop</h4>
              <p className="text-gray-600 leading-relaxed">
                Get personalized recommendations, virtually try on products, and shop with confidence knowing they'll match perfectly.
              </p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="mt-16 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50">
                <div className="text-3xl mb-2">💄</div>
                <div className="text-sm font-semibold text-gray-700">Foundation Match</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50">
                <div className="text-3xl mb-2">💋</div>
                <div className="text-sm font-semibold text-gray-700">Lipstick Try-On</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50">
                <div className="text-3xl mb-2">✨</div>
                <div className="text-sm font-semibold text-gray-700">Concealer Perfect</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50">
                <div className="text-3xl mb-2">🌟</div>
                <div className="text-sm font-semibold text-gray-700">Highlighter Glow</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section id="brands" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Featured Brands</h3>
            <p className="text-gray-600">We work with leading beauty brands to bring you the best shade matches.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 items-center">
            {brands.map((brand, index) => (
              <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow group">
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-primary group-hover:text-primary/80 transition-colors">{brand.name}</div>
                  <div className="text-xs text-gray-500 mb-2">{brand.subtitle}</div>
                  <Badge 
                    variant={brand.country === 'pakistan' ? 'default' : brand.country === 'india' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {brand.country === 'pakistan' ? '🇵🇰 PAK' : 
                     brand.country === 'india' ? '🇮🇳 IND' : 
                     '🌍 GLOBAL'}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Palette className="w-6 h-6 text-primary mr-2" />
                <h4 className="text-xl font-bold text-primary">MakeupShadeFinder</h4>
              </div>
              <p className="text-gray-400">
                Find your perfect makeup shade with AI-powered skin tone analysis.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Features</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Skin Tone Analysis</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Virtual Try-On</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Product Matching</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Brand Partnerships</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 MakeupShadeFinder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}