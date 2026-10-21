import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, ShoppingBag } from 'lucide-react';
import { CartItem, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  currency: CurrencyCode;
  onNavigateToShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  currency,
  onNavigateToShop,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoDiscountNpr, setPromoDiscountNpr] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const rawSubtotalNpr = items.reduce(
    (sum, item) => sum + item.product.priceNpr * item.quantity,
    0
  );
  const finalSubtotalNpr = Math.max(0, rawSubtotalNpr - promoDiscountNpr);
  const freeShippingThresholdNpr = 3000;
  const progressPercent = Math.min(100, Math.round((rawSubtotalNpr / freeShippingThresholdNpr) * 100));

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'NAMASTE10') {
      const discount = Math.round(rawSubtotalNpr * 0.1);
      setPromoDiscountNpr(discount);
      setPromoMessage('10% artisan discount applied!');
    } else if (code === 'HIMALAYA') {
      setPromoDiscountNpr(250);
      setPromoMessage('NPR 250 welcome gift voucher applied!');
    } else {
      setPromoDiscountNpr(0);
      setPromoMessage('Invalid coupon code. Try "NAMASTE10".');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-[#2B1D14]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6F0] border-l border-[#E5DACB] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E5DACB] flex items-center justify-between bg-[#F5EFE4]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#7B4B32]" />
              <h2 className="font-serif text-lg font-bold text-[#2B1D14]">Your Craft Bag</h2>
              <span className="text-xs text-[#53634A] tabular-nums">
                ({items.reduce((acc, item) => acc + item.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#2B1D14]/70 hover:text-[#2B1D14] hover:bg-[#EAE2D3] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Banner */}
          <div className="px-6 py-3 bg-[#EAE2D3]/60 border-b border-[#E5DACB] text-xs">
            {rawSubtotalNpr >= freeShippingThresholdNpr ? (
              <div className="flex items-center gap-1.5 text-[#53634A] font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>You qualify for Free Tracked Delivery within Nepal!</span>
              </div>
            ) : (
              <div>
                <p className="text-[#2B1D14]/80">
                  Add <strong className="text-[#7B4B32]">{formatPrice(freeShippingThresholdNpr - rawSubtotalNpr, currency)}</strong> more for free delivery across Nepal
                </p>
                <div className="w-full bg-[#E5DACB] rounded-full h-1.5 mt-1.5 overflow-hidden">
                  <div
                    className="bg-[#53634A] h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F5EFE4] flex items-center justify-center mb-4 text-[#7B4B32] border border-[#E5DACB]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2B1D14] mb-1">Your bag is empty</h3>
                <p className="text-xs text-[#2B1D14]/70 max-w-xs mb-6">
                  Explore our handcrafted Lokta paper journals, Dhaka woven bags, and wooden treasures.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToShop();
                  }}
                  className="px-5 py-2.5 rounded-lg bg-[#7B4B32] text-white text-xs font-medium hover:bg-[#633a25] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3.5 rounded-xl bg-white border border-[#E5DACB]"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg object-cover bg-[#EFE8DA] shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-[#2B1D14] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="text-[11px] text-[#53634A]">
                          {item.product.origin.split(',')[0]}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#2B1D14]/50 hover:text-red-700 transition-colors p-1"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#E5DACB] rounded-md bg-[#FAF6F0]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-xs text-[#2B1D14] hover:bg-[#EAE2D3] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold tabular-nums text-[#2B1D14]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-xs text-[#2B1D14] hover:bg-[#EAE2D3] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-[#7B4B32] tabular-nums">
                        {formatPrice(item.product.priceNpr * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E5DACB] bg-[#F5EFE4] space-y-4">
              {/* Promo code form */}
              <form onSubmit={applyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Code (e.g. NAMASTE10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-[#E5DACB] bg-white text-xs text-[#2B1D14] focus:outline-none focus:border-[#7B4B32]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg border border-[#7B4B32] text-[#7B4B32] text-xs font-medium hover:bg-[#7B4B32] hover:text-white transition-colors"
                >
                  Apply
                </button>
              </form>
              {promoMessage && (
                <p className={`text-xs ${promoDiscountNpr > 0 ? 'text-[#53634A]' : 'text-red-700'}`}>
                  {promoMessage}
                </p>
              )}

              {/* Cost breakdown */}
              <div className="space-y-1.5 text-xs text-[#2B1D14]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium">{formatPrice(rawSubtotalNpr, currency)}</span>
                </div>
                {promoDiscountNpr > 0 && (
                  <div className="flex justify-between text-[#53634A]">
                    <span>Discount</span>
                    <span className="tabular-nums font-medium">-{formatPrice(promoDiscountNpr, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-[#53634A]">
                    {rawSubtotalNpr >= freeShippingThresholdNpr ? 'FREE (Nepal)' : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#2B1D14] pt-2 border-t border-[#E5DACB]">
                  <span>Total</span>
                  <span className="text-[#7B4B32] tabular-nums">
                    {formatPrice(finalSubtotalNpr, currency)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#7B4B32] text-white font-medium text-sm hover:bg-[#633a25] transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4B32]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#53634A]">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Ethically crafted · Direct artisan support · Worldwide delivery</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
