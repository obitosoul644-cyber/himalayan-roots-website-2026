import React from 'react';
import { ArrowRight, Leaf, Shield, HeartHandshake, Sparkles, MapPin, Compass } from 'lucide-react';
import { Product, CurrencyCode } from '../types';
import { PRODUCTS, TESTIMONIALS, ARTISANS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface HomeViewProps {
  currency: CurrencyCode;
  onNavigate: (page: string) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currency,
  onNavigate,
  onAddToCart,
  onQuickView,
}) => {
  // 4 Core Featured Products from the design brief
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-20 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Editorial Hero Prose */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs font-medium text-[#53634A]">
                <MapPin className="w-3.5 h-3.5 text-[#7B4B32]" />
                <span>Patan, Lalitpur, Nepal</span>
                <span aria-hidden="true">·</span>
                <span>Established 2022</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#2B1D14] leading-[1.15] text-balance">
                Crafted in Nepal. Made to Be Cherished.
              </h1>

              <p className="text-sm sm:text-base text-[#2B1D14]/80 leading-relaxed max-w-xl">
                Discover handmade treasures inspired by Nepal's rich traditions. Every piece celebrates local craftsmanship, timeless design, and the hands behind the work.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('shop')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#7B4B32] text-white text-sm font-medium hover:bg-[#633a25] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4B32]"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('story')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#7B4B32] text-[#7B4B32] text-sm font-medium hover:bg-[#FAF6F0] transition-colors focus:outline-none"
                >
                  <span>Our Story</span>
                </button>
              </div>

              {/* Trust markers (Adjacency to Hero Claim) */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E5DACB] text-xs">
                <div>
                  <div className="font-serif font-bold text-base text-[#7B4B32]">100%</div>
                  <div className="text-[#2B1D14]/70 mt-0.5">Handmade in Nepal</div>
                </div>
                <div>
                  <div className="font-serif font-bold text-base text-[#7B4B32]">30+</div>
                  <div className="text-[#2B1D14]/70 mt-0.5">Master Artisans</div>
                </div>
                <div>
                  <div className="font-serif font-bold text-base text-[#7B4B32]">Fair Trade</div>
                  <div className="text-[#2B1D14]/70 mt-0.5">Living Wages Paid</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden bg-[#FAF6F0] border border-[#E5DACB] shadow-lg group">
                <img
                  src="/src/assets/images/himalayan_roots_hero_1792565713723.jpg"
                  alt="Handcrafted Lokta paper journal and Nepali artisan craft"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle caption strip */}
                <div className="p-4 bg-[#FAF6F0] border-t border-[#E5DACB] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-serif font-bold text-[#7B4B32] block">
                      The Himalayan Botanical Collection
                    </span>
                    <span className="text-[#2B1D14]/70">
                      Lokta paper journal with deckle edges &amp; hand-turned walnut bowl
                    </span>
                  </div>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="text-xs font-semibold text-[#7B4B32] hover:text-[#53634A] underline underline-offset-4"
                  >
                    View Pieces
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="bg-[#FAF6F0] py-16 border-y border-[#E5DACB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#53634A]">
            Rooted in Patan Heritage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D14] max-w-2xl mx-auto leading-tight">
            A Piece of Nepal, Made by Hand
          </h2>
          <p className="text-sm sm:text-base text-[#2B1D14]/80 leading-relaxed max-w-3xl mx-auto">
            We bring together thoughtfully made products that celebrate Nepali creativity and traditional skills. From handmade paper to woven textiles, each item connects everyday living with the beauty of local craftsmanship.
          </p>

          {/* 4 Brand Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 text-left">
            <div className="p-5 rounded-xl bg-white border border-[#E5DACB] space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[#F5EFE4] flex items-center justify-center text-[#7B4B32]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#2B1D14]">Authenticity</h3>
              <p className="text-xs text-[#2B1D14]/70 leading-relaxed">
                Ancestral techniques passed down through generations in Kathmandu Valley and Himalayan mountain villages.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#E5DACB] space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[#F5EFE4] flex items-center justify-center text-[#7B4B32]">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#2B1D14]">Craftsmanship</h3>
              <p className="text-xs text-[#2B1D14]/70 leading-relaxed">
                Meticulous attention to detail in hand-sewn book bindings, thread-counted Dhaka patterns, and chisel carvings.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#E5DACB] space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[#F5EFE4] flex items-center justify-center text-[#7B4B32]">
                <Leaf className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#2B1D14]">Sustainability</h3>
              <p className="text-xs text-[#2B1D14]/70 leading-relaxed">
                Regenerative wild Daphne bark, natural botanical dyes, zero-plastic packaging, and biodegradable materials.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#E5DACB] space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[#F5EFE4] flex items-center justify-center text-[#7B4B32]">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#2B1D14]">Nepali Heritage</h3>
              <p className="text-xs text-[#2B1D14]/70 leading-relaxed">
                Connecting modern global lifestyles with the living culture and warmth of Nepal’s historic artisan guild.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCT COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#53634A] font-semibold">
              Curated Craft Catalog
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D14] mt-1">
              Featured Handcrafted Essentials
            </h2>
            <p className="text-xs text-[#2B1D14]/75 mt-1">
              The signature creations cherished by our community in Nepal and abroad
            </p>
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7B4B32] hover:text-[#53634A] transition-colors"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Core Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>

      {/* 4. ARTISAN STORIES SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#FAF6F0] border border-[#E5DACB] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto">
              <img
                src="/src/assets/images/artisan_workshop_patan_1792565716737.jpg"
                alt="Master Artisan in Patan workshop"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#53634A]">
                  Behind the Craft
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D14]">
                  Meet the Hands Behind Every Object
                </h2>
                <p className="text-xs sm:text-sm text-[#2B1D14]/80 leading-relaxed">
                  In the centuries-old alleys of Patan, master craftspeople transform raw natural elements into heirloom pieces. Every Lokta notebook sheet is lifted by hand, every wood grain is chiseled by eye, and every textile reflects weeks of patience.
                </p>
                <blockquote className="p-4 rounded-xl bg-white border border-[#E5DACB] text-xs italic text-[#7B4B32] leading-relaxed">
                  "Lokta lives twice—first as a mountain bush in the mist, then as words preserved for generations."
                  <span className="block not-italic font-semibold text-[#2B1D14] mt-1 text-[11px]">
                    — Dawa Tamang, Master Lokta Papermaker (24 Years Experience)
                  </span>
                </blockquote>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => onNavigate('story')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#7B4B32] text-white text-xs font-medium hover:bg-[#633a25] transition-colors"
                >
                  <span>Meet Our Artisans</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-xs font-medium text-[#7B4B32] hover:underline"
                >
                  Visit Patan Atelier
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#53634A] font-semibold">
            Community Voices
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D14]">
            Cherished Across the World
          </h2>
          <p className="text-xs text-[#2B1D14]/75">
            What travelers, collectors, and design lovers say about Himalayan Roots
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-xl bg-[#FAF6F0] border border-[#E5DACB] flex flex-col justify-between space-y-4"
            >
              <p className="text-xs sm:text-sm text-[#2B1D14]/85 leading-relaxed italic">
                "{t.comment}"
              </p>
              <div className="pt-3 border-t border-[#E5DACB]/80 text-xs">
                <div className="font-semibold text-[#7B4B32]">{t.author}</div>
                <div className="text-[#2B1D14]/65">{t.role} · {t.city}</div>
                <div className="text-[11px] text-[#53634A] mt-1">Verified Buyer of {t.productName}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#53634A] text-white p-8 sm:p-12 text-center space-y-6">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold max-w-xl mx-auto">
            Bring the Soul of Nepal into Your Home
          </h2>
          <p className="text-xs sm:text-sm text-white/85 max-w-2xl mx-auto leading-relaxed">
            Whether you are curating mindful stationery, looking for thoughtful ethical gifts, or seeking authentic cultural decor, each order directly sustains artisan livelihoods.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('shop')}
              className="px-6 py-3 rounded-xl bg-[#C69A58] text-[#2B1D14] font-medium text-xs sm:text-sm hover:bg-[#d6a968] transition-all shadow-md"
            >
              Explore Our Collection
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-xl border border-white/40 text-white font-medium text-xs sm:text-sm hover:bg-white/10 transition-colors"
            >
              Wholesale &amp; Custom Gifts
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
