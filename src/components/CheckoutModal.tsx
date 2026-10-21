import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, Package, Printer, ArrowLeft } from 'lucide-react';
import { CartItem, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyCode;
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onOrderComplete,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Kathmandu Valley (Patan / Ktm / Bhaktapur)',
    country: 'Nepal',
    postalCode: '44700',
    paymentMethod: 'cod',
    giftMessage: '',
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotalNpr = items.reduce(
    (sum, item) => sum + item.product.priceNpr * item.quantity,
    0
  );
  const isNepal = formData.country.toLowerCase().includes('nepal');
  const shippingNpr = subtotalNpr >= 3000 || !isNepal ? (isNepal ? 0 : 1800) : 150;
  const grandTotalNpr = subtotalNpr + shippingNpr;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `HR-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedOrderId(generatedId);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      onOrderComplete();
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-[#2B1D14]/60 backdrop-blur-xs transition-opacity"
        onClick={orderConfirmed ? undefined : onClose}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-4">
        <div className="inline-block w-full max-w-2xl p-6 sm:p-8 my-8 text-left align-middle bg-[#FAF6F0] shadow-2xl rounded-2xl border border-[#E5DACB] relative">
          
          {!orderConfirmed && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-[#2B1D14]/60 hover:text-[#2B1D14] hover:bg-[#EAE2D3]"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {orderConfirmed ? (
            /* Confirmation View */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#53634A]/10 text-[#53634A] flex items-center justify-center mx-auto border border-[#53634A]/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#53634A] font-semibold">
                  Order Successfully Placed
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#7B4B32] mt-1">
                  Dhanyabad! Thank You.
                </h2>
                <p className="text-sm text-[#2B1D14]/80 mt-2 max-w-md mx-auto">
                  Your order <strong className="font-mono text-[#7B4B32]">#{confirmedOrderId}</strong> has been received by our Patan artisan workshop.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="p-5 rounded-xl bg-white border border-[#E5DACB] text-left space-y-3">
                <div className="flex justify-between items-center text-xs pb-3 border-b border-[#E5DACB]">
                  <span className="text-[#2B1D14]/70">Recipient: <strong>{formData.fullName}</strong></span>
                  <span className="text-[#53634A] font-medium">Status: In Preparation (Patan)</span>
                </div>
                <div className="space-y-2 text-xs">
                  {items.map((it) => (
                    <div key={it.product.id} className="flex justify-between text-[#2B1D14]">
                      <span>{it.quantity}× {it.product.name}</span>
                      <span className="font-semibold tabular-nums">
                        {formatPrice(it.product.priceNpr * it.quantity, currency)}
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-[#E5DACB] flex justify-between font-bold text-sm text-[#7B4B32]">
                    <span>Total Paid / Due</span>
                    <span>{formatPrice(grandTotalNpr, currency)}</span>
                  </div>
                </div>
                {formData.paymentMethod === 'cod' && (
                  <p className="text-[11px] text-[#7B4B32] bg-[#FAF6F0] p-2 rounded border border-[#E5DACB]">
                    Payment Mode: Cash on Delivery upon inspection of your handmade crafts.
                  </p>
                )}
              </div>

              <div className="p-4 rounded-xl bg-[#EAE2D3]/60 border border-[#E5DACB] flex items-center gap-3 text-left">
                <Package className="w-5 h-5 text-[#7B4B32] shrink-0" />
                <p className="text-xs text-[#2B1D14]/80">
                  Each item is packaged by hand in plastic-free recycled Lokta paper stamped with dried botanical seals. A confirmation has been sent to <strong>{formData.email}</strong>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2.5 rounded-lg border border-[#7B4B32] text-[#7B4B32] text-xs font-medium hover:bg-[#7B4B32] hover:text-white transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Print Receipt
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-[#7B4B32] text-white text-xs font-medium hover:bg-[#633a25] transition-colors"
                >
                  Return to Store
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <div>
              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider text-[#53634A] font-semibold">
                  Secure Checkout
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#7B4B32]">
                  Complete Your Order
                </h2>
                <p className="text-xs text-[#2B1D14]/75 mt-0.5">
                  Direct artisan support · Nationwide Nepal and international delivery
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Contact info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#2B1D14] mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Aashish Shakya"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#E5DACB] bg-white text-xs text-[#2B1D14] focus:outline-none focus:border-[#7B4B32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2B1D14] mb-1">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="e.g. +977 98XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#E5DACB] bg-white text-xs text-[#2B1D14] focus:outline-none focus:border-[#7B4B32]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#2B1D14] mb-1">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5DACB] bg-white text-xs text-[#2B1D14] focus:outline-none focus:border-[#7B4B32]"
                  />
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="block text-xs font-medium text-[#2B1D14] mb-1">
                    Delivery Street Address *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="House/Street, Ward No, Landmark (e.g., Near Patan Durbar Square)"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5DACB] bg-white text-xs text-[#2B1D14] focus:outline-none focus:border-[#7B4B32]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#2B1D14] mb-1">
                      City / Region *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#E5DACB] bg-white text-xs text-[#2B1D14] focus:outline-none focus:border-[#7B4B32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2B1D14] mb-1">
                      Country *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#E5DACB] bg-white text-xs text-[#2B1D14] focus:outline-none focus:border-[#7B4B32]"
                    >
                      <option value="Nepal">Nepal</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="Japan">Japan</option>
                      <option value="France">France</option>
                      <option value="India">India</option>
                    </select>
                  </div>
                </div>

                {/* Payment Selection */}
                <div>
                  <label className="block text-xs font-medium text-[#2B1D14] mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <label className={`p-2.5 rounded-lg border cursor-pointer text-xs flex flex-col justify-between ${formData.paymentMethod === 'cod' ? 'border-[#7B4B32] bg-[#FAF6F0] font-semibold text-[#7B4B32]' : 'border-[#E5DACB] bg-white text-[#2B1D14]'}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                        className="sr-only"
                      />
                      <span>Cash on Delivery</span>
                      <span className="text-[10px] text-[#53634A] font-normal">Nepal Nationwide</span>
                    </label>

                    <label className={`p-2.5 rounded-lg border cursor-pointer text-xs flex flex-col justify-between ${formData.paymentMethod === 'esewa' ? 'border-[#7B4B32] bg-[#FAF6F0] font-semibold text-[#7B4B32]' : 'border-[#E5DACB] bg-white text-[#2B1D14]'}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="esewa"
                        checked={formData.paymentMethod === 'esewa'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'esewa' })}
                        className="sr-only"
                      />
                      <span>eSewa / Khalti</span>
                      <span className="text-[10px] text-[#53634A] font-normal">Direct Wallet / QR</span>
                    </label>

                    <label className={`p-2.5 rounded-lg border cursor-pointer text-xs flex flex-col justify-between ${formData.paymentMethod === 'card' ? 'border-[#7B4B32] bg-[#FAF6F0] font-semibold text-[#7B4B32]' : 'border-[#E5DACB] bg-white text-[#2B1D14]'}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                        className="sr-only"
                      />
                      <span>Visa / Mastercard</span>
                      <span className="text-[10px] text-[#53634A] font-normal">International Cards</span>
                    </label>
                  </div>
                </div>

                {/* Gift note */}
                <div>
                  <label className="block text-xs font-medium text-[#2B1D14] mb-1">
                    Complimentary Handwritten Calligraphy Blessing Note (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Happy Birthday Maya! With warmth from the Himalayas."
                    value={formData.giftMessage}
                    onChange={(e) => setFormData({ ...formData, giftMessage: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5DACB] bg-white text-xs text-[#2B1D14] focus:outline-none focus:border-[#7B4B32]"
                  />
                </div>

                {/* Summary Row */}
                <div className="p-3.5 rounded-xl bg-[#EAE2D3]/60 border border-[#E5DACB] space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="tabular-nums font-medium">{formatPrice(subtotalNpr, currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="tabular-nums text-[#53634A] font-medium">
                      {shippingNpr === 0 ? 'FREE' : formatPrice(shippingNpr, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#7B4B32] pt-1.5 border-t border-[#E5DACB]">
                    <span>Total Amount</span>
                    <span className="tabular-nums">{formatPrice(grandTotalNpr, currency)}</span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-[#7B4B32] text-white font-medium text-sm hover:bg-[#633a25] transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Confirm &amp; Place Order · {formatPrice(grandTotalNpr, currency)}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
