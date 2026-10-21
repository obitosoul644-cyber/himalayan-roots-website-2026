import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, X, Check } from 'lucide-react';
import { Product, ProductCategory, CurrencyCode } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface ShopViewProps {
  currency: CurrencyCode;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  currency,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Crafts' },
    { id: 'paper', label: 'Lokta Paper' },
    { id: 'textiles', label: 'Dhaka & Textiles' },
    { id: 'wood-metal', label: 'Wood & Metal' },
    { id: 'gifts', label: 'Gift Sets' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesNepali = item.nepaliName.toLowerCase().includes(q);
        const matchesTagline = item.tagline.toLowerCase().includes(q);
        const matchesMaterials = item.materials.some((m) => m.toLowerCase().includes(q));
        const matchesArtisan = item.artisanName.toLowerCase().includes(q);
        if (!matchesName && !matchesNepali && !matchesTagline && !matchesMaterials && !matchesArtisan) {
          return false;
        }
      }
      // Stock filter
      if (inStockOnly && !item.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceNpr - b.priceNpr;
      if (sortBy === 'price-desc') return b.priceNpr - a.priceNpr;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first, then name
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy, inStockOnly]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setInStockOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="space-y-3 pb-6 border-b border-[#E5DACB]">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#53634A]">
          Handcrafted in Nepal
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D14]">
          The Artisanal Collection
        </h1>
        <p className="text-xs sm:text-sm text-[#2B1D14]/75 max-w-2xl leading-relaxed">
          From sustainable high-altitude Lokta paper to handwoven Dhaka textiles and carved Himalayan walnut, each creation embodies centuries of living Nepali craftsmanship.
        </p>
      </div>

      {/* Control Bar: Categories, Search & Sorting */}
      <div className="space-y-4">
        
        {/* Category Segmented Controls (Interactive Filter buttons as per rule 1.A) */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#7B4B32] text-white shadow-xs font-semibold'
                  : 'bg-[#FAF6F0] text-[#2B1D14] border border-[#E5DACB] hover:border-[#7B4B32]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search, Sort & Stock Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1 items-center">
          
          {/* Search bar */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-[#7B4B32] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search journals, tote bags, bowls, gifts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 rounded-lg border border-[#E5DACB] bg-[#FAF6F0] text-xs text-[#2B1D14] placeholder-[#2B1D14]/50 focus:outline-none focus:border-[#7B4B32]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#2B1D14]/40 hover:text-[#2B1D14]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="sm:col-span-4 flex items-center gap-2">
            <span className="text-xs text-[#2B1D14]/70 whitespace-nowrap">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg border border-[#E5DACB] bg-[#FAF6F0] text-xs text-[#2B1D14] focus:outline-none focus:border-[#7B4B32] cursor-pointer"
            >
              <option value="featured">Featured / Artisan Choice</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>

          {/* In Stock toggle */}
          <div className="sm:col-span-2 flex items-center justify-end">
            <label className="flex items-center gap-2 text-xs text-[#2B1D14] cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-[#E5DACB] text-[#7B4B32] focus:ring-[#7B4B32]"
              />
              <span>In Stock Only</span>
            </label>
          </div>

        </div>

      </div>

      {/* Results Count & Active Filter Indicator */}
      <div className="flex items-center justify-between text-xs text-[#2B1D14]/70 pt-2 border-t border-[#E5DACB]/60">
        <div>
          Showing <span className="font-semibold text-[#7B4B32] tabular-nums">{filteredProducts.length}</span> handcrafted items
        </div>
        {(selectedCategory !== 'all' || searchQuery || inStockOnly) && (
          <button
            onClick={handleResetFilters}
            className="text-xs text-[#7B4B32] hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Reset all filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#FAF6F0] rounded-2xl border border-[#E5DACB] p-8 space-y-4">
          <Sparkles className="w-8 h-8 text-[#C69A58] mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#2B1D14]">No items found</h3>
          <p className="text-xs text-[#2B1D14]/70 max-w-sm mx-auto">
            We couldn't find any handmade crafts matching your criteria. Try adjusting your search term or category filter.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-lg bg-[#7B4B32] text-white text-xs font-medium hover:bg-[#633a25] transition-colors"
          >
            Show All Crafts
          </button>
        </div>
      )}

      {/* Client Note on Packaging & Custom Orders */}
      <div className="p-6 rounded-2xl bg-[#EAE2D3]/60 border border-[#E5DACB] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-serif font-bold text-sm text-[#7B4B32]">
            Need Custom Corporate Gifting or Wedding Favors?
          </h4>
          <p className="text-xs text-[#2B1D14]/80 mt-0.5">
            We personalize Lokta paper journals, custom woven Dhaka patterns, and carved wooden gift cases for special occasions.
          </p>
        </div>
        <button
          onClick={() => {
            const contactBtn = document.querySelector('[data-page="contact"]') as HTMLElement;
            if (contactBtn) contactBtn.click();
          }}
          className="px-4 py-2 rounded-lg border border-[#7B4B32] text-[#7B4B32] text-xs font-semibold hover:bg-[#7B4B32] hover:text-white transition-colors whitespace-nowrap shrink-0"
        >
          Custom Inquiries
        </button>
      </div>

    </div>
  );
};
