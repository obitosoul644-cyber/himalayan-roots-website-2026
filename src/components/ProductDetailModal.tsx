import React, { useState } from 'react';
import { X, ShoppingBag, Check, MapPin, Feather, Heart, Share2, Shield, Leaf } from 'lucide-react';
import { Product, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';
import { ARTISANS } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenArtisan?: (artisanId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  currency,
  onAddToCart,
  onOpenArtisan,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  if (!isOpen || !product) return null;

  const artisan = ARTISANS.find((a) => a.id === product.artisanId);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2B1D14]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-4">
        <div className="inline-block w-full max-w-4xl p-6 sm:p-8 my-8 text-left align-middle transition-all transform bg-[#FAF6F0] shadow-2xl rounded-2xl border border-[#E5DACB] relative">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-[#2B1D14]/60 hover:text-[#2B1D14] hover:bg-[#EAE2D3] transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left: Product Imagery Stage */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#EFE8DA] border border-[#E5DACB]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.bestseller && (
                  <div className="absolute top-3 left-3 bg-[#FAF6F0]/95 backdrop-blur-xs text-[#7B4B32] text-xs font-semibold px-2.5 py-1 rounded border border-[#E5DACB]">
                    Artisan Signature Piece
                  </div>
                )}
              </div>

              {/* Sustainability & Origin badge */}
              <div className="p-3.5 rounded-lg bg-[#EAE2D3]/50 border border-[#E5DACB] flex items-start gap-3">
                <Leaf className="w-4 h-4 text-[#53634A] shrink-0 mt-0.5" />
                <p className="text-xs text-[#2B1D14]/80 leading-relaxed">
                  <strong>Sustainable Promise:</strong> {product.sustainableNote}
                </p>
              </div>

              {/* Artisan Micro-profile */}
              {artisan && (
                <div className="p-4 rounded-xl bg-white border border-[#E5DACB] space-y-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={artisan.image}
                      alt={artisan.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#C69A58]"
                    />
                    <div>
                      <div className="text-xs text-[#53634A] font-medium">Crafted By</div>
                      <div className="font-serif font-bold text-sm text-[#7B4B32]">{artisan.name}</div>
                    </div>
                  </div>
                  <p className="text-xs text-[#2B1D14]/75 italic">
                    "{artisan.quote}"
                  </p>
                </div>
              )}
            </div>

            {/* Right: Contiguous Purchase Module */}
            <div className="flex flex-col justify-between space-y-5">
              <div>
                {/* Category & Origin */}
                <div className="flex items-center gap-2 text-xs text-[#53634A] font-medium mb-1">
                  <span>{product.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#7B4B32]" />
                    {product.origin}
                  </span>
                </div>

                {/* Title */}
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D14]">
                    {product.name}
                  </h2>
                </div>
                <div className="text-xs text-[#7B4B32] font-medium mb-3">
                  {product.nepaliName} · Authentic Handcraft
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-[#E5DACB]">
                  <span className="text-2xl font-bold text-[#7B4B32] tabular-nums">
                    {formatPrice(product.priceNpr, currency)}
                  </span>
                  <span className="text-xs text-[#53634A] font-medium">
                    (In Stock · Handcrafted in Patan)
                  </span>
                </div>

                {/* Description */}
                <div className="space-y-3 mb-6">
                  <p className="text-sm text-[#2B1D14]/85 leading-relaxed">
                    {product.description}
                  </p>
                  <p className="text-xs text-[#2B1D14]/75 leading-relaxed bg-[#FAF6F0] p-3 rounded-lg border border-[#E5DACB]">
                    <strong className="text-[#7B4B32]">Traditional Method:</strong> {product.craftDetails}
                  </p>
                </div>

                {/* Materials & Dimensions */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7B4B32]">
                    Materials &amp; Details
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#2B1D14]/80">
                    {product.materials.map((mat, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C69A58]" />
                        <span>{mat}</span>
                      </li>
                    ))}
                    {product.dimensions && (
                      <li className="flex items-center gap-1.5 sm:col-span-2 text-[#53634A]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#53634A]" />
                        <span>Dimensions: {product.dimensions}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Purchase Action Box */}
              <div className="pt-4 border-t border-[#E5DACB] space-y-4">
                <div className="flex items-center gap-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#E5DACB] rounded-lg bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-sm text-[#2B1D14] hover:bg-[#EAE2D3] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm font-semibold tabular-nums text-[#2B1D14]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-sm text-[#2B1D14] hover:bg-[#EAE2D3] transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart CTA */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium text-sm transition-all shadow-sm ${
                      justAdded
                        ? 'bg-[#53634A] text-white'
                        : 'bg-[#7B4B32] text-white hover:bg-[#633a25]'
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        Added to Your Bag
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        Add {quantity} to Bag · {formatPrice(product.priceNpr * quantity, currency)}
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs text-[#2B1D14]/60">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-[#53634A]" />
                    Fair Trade certified craft
                  </span>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1 hover:text-[#7B4B32] transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    {copiedLink ? 'Link Copied!' : 'Share Craft'}
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
