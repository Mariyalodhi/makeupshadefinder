import { Product } from "@/types/makeup";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Heart, ShoppingCart, Palette, Sparkles, Users } from "lucide-react";
import { BRAND_LOGOS, COUNTRY_SETTINGS } from "@/lib/product-database";

interface ProductRecommendationsProps {
  products: Product[] | null | undefined;
  loading?: boolean;
  selectedCountry: string;
}

export function ProductRecommendations({ products, loading, selectedCountry }: ProductRecommendationsProps) {
  const countrySettings = COUNTRY_SETTINGS[selectedCountry];

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Finding your perfect matches...</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-16 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No matching products found for {countrySettings?.name}. Try selecting a different country or adjusting your preferences.</p>
      </div>
    );
  }

  // Separate foundations and lipsticks
  const foundationProducts = products ? products.filter(p => p.type === 'foundation') : [];
  const lipstickProducts = products ? products.filter(p => p.type === 'lipstick') : [];
  const concealerProducts = products ? products.filter(p => p.type === 'concealer') : [];
  const highlighterProducts = products ? products.filter(p => p.type === 'highlighter') : [];

  const ProductGrid = ({ productList, title }: { productList: Product[], title: string }) => (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-700 flex items-center">
        <Palette className="w-5 h-5 mr-2" />
        {title} ({productList.length})
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productList.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {BRAND_LOGOS[product.brand] || product.brand}
                  </Badge>
                  <CardTitle className="text-lg font-medium group-hover:text-primary transition-colors">
                    {product.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Shade: {product.shade}</p>
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-4">
              <div className="space-y-3">
                {product.hexColor && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Color:</span>
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: product.hexColor }}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {product.undertone} • {product.depth}
                    </Badge>
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: product.hexColor }}
                      title={`Shade: ${product.shade}`}
                    />
                    {/* Compatibility Score */}
                    <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                      98% match
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">
                      {countrySettings?.currency} {product.price}
                    </div>
                    {/* Price category indicator */}
                    <div className="text-xs text-gray-500">
                      {product.price < 10 ? 'Budget-friendly' : 
                       product.price < 25 ? 'Mid-range' : 'Premium'}
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  Perfect for {product.undertone} undertones with {product.depth} depth
                </div>

                {/* Country-specific features */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Available in {countrySettings?.name}</span>
                  <span>
                    {product.country === 'pakistan' ? '🇵🇰' : 
                     product.country === 'india' ? '🇮🇳' : '🌍'} 
                    {product.country === selectedCountry ? ' Local' : ' International'}
                  </span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-3">
              <div className="flex space-x-2 w-full">
                <Button 
                  className="flex-1" 
                  onClick={() => window.open(product.affiliateLink, '_blank')}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
                <Button variant="outline" size="icon">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );

  const groupProductsByBrand = (productList: Product[]) => {
    const grouped: { [brand: string]: Product[] } = {};
    productList.forEach(product => {
      if (!grouped[product.brand]) {
        grouped[product.brand] = [];
      }
      grouped[product.brand].push(product);
    });
    return Object.entries(grouped);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">
          Your Perfect Matches for {countrySettings?.name} ({products?.length})
        </h3>
        <Button variant="outline" size="sm">
          <Heart className="w-4 h-4 mr-2" />
          Save All
        </Button>
      </div>

      {/* Customized Recommendations Summary */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-primary" />
            Customized For You
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{foundationProducts.length}</div>
              <div className="text-sm text-gray-600">Foundations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{lipstickProducts.length}</div>
              <div className="text-sm text-gray-600">Lipsticks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{concealerProducts.length}</div>
              <div className="text-sm text-gray-600">Concealers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{highlighterProducts.length}</div>
              <div className="text-sm text-gray-600">Highlighters</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Foundation Products */}
      {foundationProducts.length > 0 && (
        <div className="space-y-6">
          <ProductGrid productList={foundationProducts} title="Foundation Matches" />

          {/* Brand-wise breakdown for foundations */}
          <div className="space-y-4">
            <h5 className="text-md font-medium text-gray-700">By Brand:</h5>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {groupProductsByBrand(foundationProducts).map(([brand, brandProducts]) => (
                <Card key={brand} className="p-3 text-center hover:shadow-md transition-shadow">
                  <div className="text-sm font-medium text-gray-800">{BRAND_LOGOS[brand] || brand}</div>
                  <div className="text-xs text-gray-500">{brandProducts.length} matches</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lipstick Products */}
      {lipstickProducts.length > 0 && (
        <ProductGrid productList={lipstickProducts} title="Lipstick Recommendations" />
      )}

      {/* Concealer Products */}
      {concealerProducts.length > 0 && (
        <ProductGrid productList={concealerProducts} title="Concealer Matches" />
      )}

      {/* Highlighter Products */}
      {highlighterProducts.length > 0 && (
        <ProductGrid productList={highlighterProducts} title="Highlighter Recommendations" />
      )}

      {/* All Brands Available */}
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Available Brands in {countrySettings?.name}
          </h4>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set((products || []).map(p => p.brand))).sort().map(brand => (
              <Badge key={brand} variant="outline" className="text-xs">
                {BRAND_LOGOS[brand] || brand}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}