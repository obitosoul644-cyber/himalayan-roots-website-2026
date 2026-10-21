/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, CurrencyCode } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { StoryView } from './views/StoryView';
import { ContactView } from './views/ContactView';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'shop' | 'story' | 'contact'>('home');
  const [currency, setCurrency] = useState<CurrencyCode>('NPR');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Start with 1 Lokta Paper Journal so users immediately see a warm cart experience
    { product: PRODUCTS[0], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll to top on page switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((curr) => (curr === message ? null : curr));
    }, 2800);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to your bag`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleOrderComplete = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE4] text-[#2B1D14]">
      
      {/* Top Banner for Sustainable Mission & Free Nepal Delivery */}
      <div className="bg-[#53634A] text-[#F5EFE4] px-4 py-2 text-center text-[11px] sm:text-xs font-medium tracking-wide">
        <span>Handmade by master artisans in Patan, Nepal · Free delivery in Nepal on orders over NPR 3,000</span>
      </div>

      {/* Top Navigation Bar adhering to the Top Bar Contract */}
      <Navbar
        activePage={activePage}
        onNavigate={(page) => setActivePage(page as any)}
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomeView
            currency={currency}
            onNavigate={(page) => setActivePage(page as any)}
            onAddToCart={handleAddToCart}
            onQuickView={handleQuickView}
          />
        )}

        {activePage === 'shop' && (
          <ShopView
            currency={currency}
            onAddToCart={handleAddToCart}
            onQuickView={handleQuickView}
          />
        )}

        {activePage === 'story' && (
          <StoryView
            onNavigate={(page) => setActivePage(page as any)}
          />
        )}

        {activePage === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={(page) => setActivePage(page as any)} />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => setIsCheckoutOpen(true)}
        currency={currency}
        onNavigateToShop={() => setActivePage('shop')}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedProduct(null);
        }}
        currency={currency}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        currency={currency}
        onOrderComplete={handleOrderComplete}
      />

      {/* Lightweight Toast Notification */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#2B1D14] text-white text-xs font-medium shadow-xl border border-[#7B4B32] transition-transform animate-bounce-subtle"
        >
          <div className="w-5 h-5 rounded-full bg-[#53634A] text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-[#C69A58] underline underline-offset-2 hover:text-white transition-colors"
          >
            View Bag
          </button>
        </aside>
      )}

    </div>
  );
}
