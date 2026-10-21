import React, { useState } from 'react';
import { Mail, MapPin, Phone, Instagram, Facebook, Heart, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#2B1D14] text-[#F5EFE4] pt-16 pb-12 border-t border-[#7B4B32]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#F5EFE4]/15">
          
          {/* Column 1: Brand & Heritage */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#F5EFE4] tracking-wide">
              Himalayan Roots
            </h3>
            <p className="text-xs text-[#F5EFE4]/75 leading-relaxed">
              Handmade crafts and sustainable gifts born in Patan, Lalitpur. We honor centuries of Nepali artisan heritage through ethically harvested Lokta paper, handwoven Dhaka textiles, and heritage woodcraft.
            </p>
            <div className="text-xs text-[#C69A58] pt-1">
              Established 2022 · Patan, Lalitpur, Nepal
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#C69A58]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#F5EFE4]/80">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#C69A58] transition-colors focus:outline-none"
                >
                  Home &amp; Featured Pieces
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#C69A58] transition-colors focus:outline-none"
                >
                  All Handcrafted Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-[#C69A58] transition-colors focus:outline-none"
                >
                  Our Story &amp; Artisans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#C69A58] transition-colors focus:outline-none"
                >
                  Contact &amp; Studio Visits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#C69A58] transition-colors focus:outline-none"
                >
                  Wholesale &amp; Custom Gift Sets
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Workshop & Studio */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#C69A58]">
              Atelier &amp; Shop
            </h4>
            <div className="space-y-2.5 text-xs text-[#F5EFE4]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C69A58] shrink-0 mt-0.5" />
                <span>Patan Old City (Near Patan Durbar Square), Lalitpur 44700, Nepal</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C69A58] shrink-0" />
                <span>+977 1 552 4890 · WhatsApp Available</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C69A58] shrink-0" />
                <span>namaste@himalayanroots.com.np</span>
              </div>
              <div className="pt-1 text-[11px] text-[#F5EFE4]/60">
                Studio Hours: Sun – Fri, 10:00 AM – 7:00 PM NPT
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter & Direct Impact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#C69A58]">
              Artisan Gazette
            </h4>
            <p className="text-xs text-[#F5EFE4]/75 leading-relaxed">
              Stories from the workshops in the Kathmandu Valley, new seasonal botanical paper releases, and craft traditions.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#3A291E] border border-[#7B4B32] text-xs text-[#F5EFE4] placeholder-[#F5EFE4]/40 focus:outline-none focus:border-[#C69A58]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg bg-[#C69A58] text-[#2B1D14] font-medium text-xs hover:bg-[#d6a968] transition-colors shrink-0"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-[#8BA87E]">
                  <Check className="w-3.5 h-3.5" />
                  <span>Dhanyabad! Welcome to our craft family.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5EFE4]/60">
          <div>
            &copy; {new Date().getFullYear()} Himalayan Roots. Handmade in Patan, Lalitpur, Nepal.
          </div>
          <div className="flex items-center gap-4">
            <span>Fair Trade Principles</span>
            <span aria-hidden="true">·</span>
            <span>Plastic-Free Eco Packaging</span>
            <span aria-hidden="true">·</span>
            <span>Worldwide Shipping</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
