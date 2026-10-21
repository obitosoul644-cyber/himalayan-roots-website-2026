import React, { useState } from 'react';
import { ShoppingBag, Eye, Check, Sparkles } from 'lucide-react';
import { Product, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';

interface ProductCardProps {
  product: Product;
  currency: CurrencyCode;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onAddToCart,
  onQuickView,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => {
      setIsAdding(false);
      setTimeout(() => setJustAdded(false), 1400);
    }, 250);
  };

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group cursor-pointer flex flex-col h-full bg-[#FAF6F0] rounded-xl border border-[#E5DACB] overflow-hidden hover:border-[#C69A58] hover:shadow-md transition-all duration-200"
    >
      {/* Product Image Stage (65-70% visual prominence) */}
      <div className="relative aspect-[4/3] bg-[#EFE8DA] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FAF6F0] to-[#EAE2D3]">
            <Sparkles className="w-8 h-8 text-[#C69A58] mb-2 stroke-[1.5]" />
            <span className="font-serif text-sm font-semibold text-[#7B4B32]">{product.name}</span>
            <span className="text-xs text-[#53634A] mt-1">Handmade in Patan</span>
          </div>
        )}

        {/* Quiet badge if bestseller or featured (Zero-pill discipline: quiet subtle label) */}
        {product.bestseller && (
          <div className="absolute top-3 left-3 bg-[#FAF6F0]/95 backdrop-blur-xs text-[#7B4B32] text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded border border-[#E5DACB]">
            Artisan Signature
          </div>
        )}

        {/* Quick View Hover Overlay Button */}
        <div className="absolute inset-0 bg-[#2B1D14]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/95 text-[#2B1D14] text-xs font-medium shadow-md hover:bg-white hover:text-[#7B4B32] transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 justify-between">
        <div>
          {/* Metadata: Clean unboxed text with typographic dot separator */}
          <div className="flex items-center gap-2 text-xs text-[#53634A] mb-1.5 font-medium">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.origin.split(',')[0]}</span>
          </div>

          {/* Title & Nepali Script */}
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <h3 className="font-serif text-lg font-bold text-[#2B1D14] group-hover:text-[#7B4B32] transition-colors line-clamp-1">
              {product.name}
            </h3>
            <span className="text-xs text-[#7B4B32]/70 font-normal shrink-0">
              {product.nepaliName}
            </span>
          </div>

          {/* Tagline */}
          <p className="text-xs text-[#2B1D14]/75 line-clamp-2 leading-relaxed mb-3">
            {product.tagline}
          </p>
        </div>

        {/* Price & Add to Cart Action Row */}
        <div className="pt-3 border-t border-[#EAE2D3] flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-[#2B1D14]/60 block">Price</span>
            <span className="text-base font-semibold text-[#7B4B32] tabular-nums">
              {formatPrice(product.priceNpr, currency)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={isAdding}
            aria-label={`Add ${product.name} to cart`}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              justAdded
                ? 'bg-[#53634A] text-white'
                : 'bg-[#7B4B32] text-white hover:bg-[#633a25] shadow-xs'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
