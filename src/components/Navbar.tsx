import React from 'react';
import { ShoppingBag, Globe, Menu, X } from 'lucide-react';
import { CurrencyCode } from '../types';
import { CURRENCIES } from '../data/products';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  currency,
  onCurrencyChange,
  cartCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'story', label: 'Our Story' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F5EFE4]/95 backdrop-blur-md border-b border-[#E3D8C8] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Single text element wordmark) */}
          <button
            onClick={() => handleLinkClick('home')}
            className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#7B4B32] hover:text-[#53634A] transition-colors whitespace-nowrap shrink-0 focus:outline-none"
          >
            Himalayan Roots
          </button>

          {/* Zone 2: 4 single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#2B1D14]/80">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-1 focus:outline-none ${
                  activePage === link.id
                    ? 'text-[#7B4B32] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#7B4B32]'
                    : 'hover:text-[#7B4B32]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Currency selector & Primary Cart Action */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Currency selector */}
            <div className="relative inline-flex items-center">
              <label htmlFor="currency-select" className="sr-only">Currency</label>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E3D8C8] bg-[#FAF6F0] text-xs font-medium text-[#2B1D14] hover:border-[#C69A58] transition-colors">
                <Globe className="w-3.5 h-3.5 text-[#7B4B32] shrink-0" />
                <select
                  id="currency-select"
                  value={currency}
                  onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                  className="bg-transparent text-xs font-medium text-[#2B1D14] cursor-pointer focus:outline-none pr-1"
                >
                  {Object.values(CURRENCIES).map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label={`Shopping bag with ${cartCount} items`}
              className="relative flex items-center justify-center p-2.5 rounded-lg bg-[#7B4B32] text-white hover:bg-[#633a25] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4B32]"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 flex items-center justify-center text-[11px] font-bold text-white bg-[#53634A] rounded-full border-2 border-[#F5EFE4] tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#2B1D14] hover:bg-[#EAE2D3] transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile navigation tray */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E3D8C8] bg-[#F5EFE4] px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                activePage === link.id
                  ? 'bg-[#EAE2D3] text-[#7B4B32] font-semibold'
                  : 'text-[#2B1D14] hover:bg-[#EAE2D3]/60'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
