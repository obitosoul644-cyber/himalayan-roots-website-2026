import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Check, Sparkles, Send, Globe2, ChevronDown, ChevronUp } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [inquiryType, setInquiryType] = useState<'general' | 'wholesale' | 'corporate'>('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'Nepal',
    subject: '',
    message: '',
    quantityEstimate: '10-50 units',
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'Do you ship internationally from Nepal?',
      a: 'Yes! We ship worldwide via DHL Express and Nepal Post EMS. All international parcels are packed in shock-absorbing Lokta paper with trackable dispatch numbers. Typical delivery to North America, Europe, and Australia is 5-8 business days.',
    },
    {
      q: 'Can I visit your artisan atelier in Patan?',
      a: 'Absolutely! Our studio and showroom is located in the historic Patan Old City, just a 5-minute walk from Patan Durbar Square. Visitors are welcome Sunday through Friday between 10:00 AM and 7:00 PM NPT to witness Lokta binding and woodcarving.',
    },
    {
      q: 'Do you offer wholesale pricing for design boutiques?',
      a: 'Yes, we supply independent bookshops, museum stores, and eco-friendly gift boutiques worldwide. Minimum wholesale orders start at 25 units with custom branding and hot-foil stamping available on Lokta paper journals.',
    },
    {
      q: 'What makes Himalayan Lokta paper unique?',
      a: 'Lokta paper is produced without cutting down trees—only the regenerable bark of the Daphne shrub is gathered. It is acid-free, naturally resistant to silverfish and humidity, and has been the chosen paper for royal decrees and sacred Buddhist manuscripts for over 1,000 years.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Page Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#53634A]">
          Connect With Us
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D14]">
          Get in Touch With Our Atelier
        </h1>
        <p className="text-xs sm:text-sm text-[#2B1D14]/75 leading-relaxed">
          Whether you are visiting Patan, planning custom gift hampers, inquiring about international wholesale, or asking about a craft, we'd love to hear from you.
        </p>
      </div>

      {/* Main Grid: Form Left, Atelier Details Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Form Column */}
        <div className="lg:col-span-7 bg-[#FAF6F0] rounded-2xl border border-[#E5DACB] p-6 sm:p-8 space-y-6">
          
          {/* Inquiry Type Tabs */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#7B4B32] mb-2">
              Inquiry Purpose
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setInquiryType('general')}
                className={`py-2 px-2 text-xs font-medium rounded-lg border transition-colors ${
                  inquiryType === 'general'
                    ? 'bg-[#7B4B32] text-white border-[#7B4B32]'
                    : 'bg-white text-[#2B1D14] border-[#E5DACB] hover:border-[#7B4B32]'
                }`}
              >
                General Inquiry
              </button>
              <button
                type="button"
                onClick={() => setInquiryType('wholesale')}
                className={`py-2 px-2 text-xs font-medium rounded-lg border transition-colors ${
                  inquiryType === 'wholesale'
                    ? 'bg-[#7B4B32] text-white border-[#7B4B32]'
                    : 'bg-white text-[#2B1D14] border-[#E5DACB] hover:border-[#7B4B32]'
                }`}
              >
                Wholesale &amp; Export
              </button>
              <button
                type="button"
                onClick={() => setInquiryType('corporate')}
                className={`py-2 px-2 text-xs font-medium rounded-lg border transition-colors ${
                  inquiryType === 'corporate'
                    ? 'bg-[#7B4B32] text-white border-[#7B4B32]'
                    : 'bg-white text-[#2B1D14] border-[#E5DACB] hover:border-[#7B4B32]'
                }`}
              >
                Custom Gift Sets
              </button>
            </div>
          </div>

          {submitted ? (
            <div className="p-8 rounded-xl bg-white border border-[#E5DACB] text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#53634A]/10 text-[#53634A] flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#7B4B32]">
                Dhanyabad! Message Received.
              </h3>
              <p className="text-xs text-[#2B1D14]/80 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Our Patan team will review your {inquiryType} inquiry and respond to <strong>{formData.email}</strong> within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    country: 'Nepal',
                    subject: '',
                    message: '',
                    quantityEstimate: '10-50 units',
                  });
                }}
                className="px-4 py-2 text-xs font-semibold text-[#7B4B32] hover:underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#2B1D14] mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Ramesh Shakya"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5DACB] bg-white text-xs text-[#2B1D14] focus:outline-none focus:border-[#7B4B32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#2B1D14] mb-1">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5DACB] bg-white text-xs text-[#2B1D14] focus:outline-none focus:border-[#7B4B32]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#2B1D14] mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+977 98XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5DACB] bg-white text-xs text-[#2B1D14] focus:outline-none focus:border-[#7B4B32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#2B1D14] mb-1">
                    Country / Region
                  </label>
                  <input
                    type="text"
                    placeholder="Nepal, USA, Germany..."
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5DACB] bg-white text-xs text-[#2B1D14] focus:outline-none focus:border-[#7B4B32]"
                  />
                </div>
              </div>

              {inquiryType !== 'general' && (
                <div>
                  <label className="block text-xs font-medium text-[#2B1D14] mb-1">
                    Estimated Quantity Requirement
                  </label>
                  <select
                    value={formData.quantityEstimate}
                    onChange={(e) => setFormData({ ...formData, quantityEstimate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5DACB] bg-white text-xs text-[#2B1D14] focus:outline-none focus:border-[#7B4B32]"
                  >
                    <option value="10-50 units">10 – 50 units (Small batch)</option>
                    <option value="50-200 units">50 – 200 units (Corporate / Store)</option>
                    <option value="200+ units">200+ units (Export distribution)</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#2B1D14] mb-1">
                  Subject *
                </label>
                <input
                  required
                  type="text"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#E5DACB] bg-white text-xs text-[#2B1D14] focus:outline-none focus:border-[#7B4B32]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2B1D14] mb-1">
                  Message Details *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about the products or project you have in mind..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#E5DACB] bg-white text-xs text-[#2B1D14] focus:outline-none focus:border-[#7B4B32]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#7B4B32] text-white font-medium text-xs sm:text-sm hover:bg-[#633a25] transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}

        </div>

        {/* Studio Location & Details Column */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Atelier Card */}
          <div className="bg-[#FAF6F0] rounded-2xl border border-[#E5DACB] p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#53634A]">
                Patan Showroom
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#7B4B32] mt-0.5">
                Himalayan Roots Atelier
              </h3>
              <p className="text-xs text-[#2B1D14]/75 mt-1">
                A serene haven of handmade crafts nestled in the artistic heart of Lalitpur.
              </p>
            </div>

            <div className="space-y-4 text-xs text-[#2B1D14]/85">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#7B4B32] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2B1D14]">Store Location</strong>
                  <span>Haku Bahal, Ward 12, Near Patan Durbar Square, Lalitpur 44700, Nepal</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#7B4B32] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2B1D14]">Visiting Hours</strong>
                  <span>Sunday – Friday: 10:00 AM – 7:00 PM (NPT)</span>
                  <span className="block text-[#53634A]">Saturday: By appointment for workshops</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#7B4B32] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2B1D14]">Direct Phone &amp; WhatsApp</strong>
                  <span>+977 1 552 4890 (Landline)</span>
                  <span className="block text-[#7B4B32]">+977 980 123 4567 (WhatsApp / Cell)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#7B4B32] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2B1D14]">Electronic Mail</strong>
                  <span>namaste@himalayanroots.com.np</span>
                  <span className="block text-[11px] text-[#2B1D14]/60">Wholesale: export@himalayanroots.com.np</span>
                </div>
              </div>
            </div>

            {/* Quick directions helper */}
            <div className="p-4 rounded-xl bg-white border border-[#E5DACB] text-xs space-y-1.5">
              <div className="font-semibold text-[#7B4B32] flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Directions for Travelers</span>
              </div>
              <p className="text-[#2B1D14]/75 text-[11px] leading-relaxed">
                Take a taxi to Mangal Bazaar, Patan. From the Krishna Mandir courtyard, walk 200 meters south into the historic Newari artisan lane. Look for the carved wooden sign with our mountain lotus emblem.
              </p>
            </div>
          </div>

          {/* Direct WhatsApp Callout */}
          <div className="p-5 rounded-2xl bg-[#53634A] text-white flex items-center justify-between gap-4">
            <div>
              <h4 className="font-serif font-bold text-sm">Need Instant Assistance?</h4>
              <p className="text-xs text-white/80 mt-0.5">
                Message our Patan store manager directly on WhatsApp.
              </p>
            </div>
            <a
              href="https://wa.me/9779801234567"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-lg bg-[#C69A58] text-[#2B1D14] text-xs font-semibold hover:bg-[#d6a968] transition-colors whitespace-nowrap shrink-0"
            >
              Chat on WhatsApp
            </a>
          </div>

        </div>

      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="space-y-6 pt-6 border-t border-[#E5DACB]">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs uppercase tracking-widest text-[#53634A] font-semibold">
            Common Questions
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#2B1D14]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#FAF6F0] border border-[#E5DACB] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-serif font-bold text-sm text-[#2B1D14]">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#7B4B32] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#7B4B32] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#2B1D14]/80 leading-relaxed border-t border-[#E5DACB]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
