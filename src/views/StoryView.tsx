import React from 'react';
import { ArrowRight, Leaf, HeartHandshake, ShieldCheck, Sparkles, MapPin, Award } from 'lucide-react';
import { ARTISANS } from '../data/products';

interface StoryViewProps {
  onNavigate: (page: string) => void;
}

export const StoryView: React.FC<StoryViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      
      {/* 1. Brand History & Vision */}
      <section className="space-y-6 max-w-4xl mx-auto text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#53634A]">
          Our Roots &amp; Heritage
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1D14] leading-tight">
          Where Ancient Mountain Craft Meets Modern Living
        </h1>
        <p className="text-sm sm:text-base text-[#2B1D14]/80 leading-relaxed">
          Founded in 2022 in the historic artisan quarter of Patan (Lalitpur), Himalayan Roots began with a singular conviction: that Nepal's living craft traditions belong at the forefront of modern sustainable design, not relegated to fleeting tourist souvenirs.
        </p>
      </section>

      {/* 2. Photo & Manifesto Section */}
      <section className="rounded-2xl bg-[#FAF6F0] border border-[#E5DACB] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto">
            <img
              src="/src/assets/images/artisan_workshop_patan_1792565716737.jpg"
              alt="Artisan in Patan workshop working on handmade Lokta and wood"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#53634A]">
                Patan, Lalitpur · Est. 2022
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D14]">
                Preserving Nepal’s Living Heritage
              </h2>
              <p className="text-xs sm:text-sm text-[#2B1D14]/80 leading-relaxed">
                Patan has been celebrated for over a millennium as the cradle of Nepali art and architecture. Its narrow brick alleyways, hidden courtyards (*bahals*), and wooden lattice windows remain alive with the rhythmic sound of chisels, shuttles, and water vats.
              </p>
              <p className="text-xs sm:text-sm text-[#2B1D14]/80 leading-relaxed">
                As mass industrial imports flood local markets, master artisans face the risk of ancestral techniques fading away. Himalayan Roots bridges this gap: we guarantee guaranteed fair wages, provide modern design direction, and connect local creators directly with customers worldwide.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5DACB] flex items-center justify-between text-xs">
              <span className="text-[#53634A] font-medium">30+ Artisans Supported</span>
              <span className="text-[#7B4B32] font-semibold">100% Traceable Supply</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Traditional Techniques Deep-Dive */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#53634A] font-semibold">
            Ancestral Methods
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D14]">
            Three Pillars of Our Craft
          </h2>
          <p className="text-xs text-[#2B1D14]/75">
            How wild nature and patient human hands shape every object we offer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Technique 1: Lokta */}
          <div className="p-6 rounded-xl bg-[#FAF6F0] border border-[#E5DACB] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#53634A]/10 text-[#53634A] flex items-center justify-center font-serif font-bold text-lg">
                01
              </div>
              <h3 className="font-serif font-bold text-lg text-[#2B1D14]">
                The Sacred Lokta Harvest
              </h3>
              <p className="text-xs text-[#2B1D14]/80 leading-relaxed">
                Lokta paper is made from the inner fibrous bark of <em>Daphne cannabina</em>, a wild shrub flourishing between 2,000 and 3,500 meters in the Himalayan foothills. Harvesting only requires trimming the stems—the root system stays alive and fully regenerates every 5 to 7 years, making it completely renewable.
              </p>
            </div>
            <div className="text-[11px] text-[#53634A] font-medium pt-3 border-t border-[#E5DACB]">
              Resistant to insects · Zero chemical bleaching · Lasts centuries
            </div>
          </div>

          {/* Technique 2: Dhaka */}
          <div className="p-6 rounded-xl bg-[#FAF6F0] border border-[#E5DACB] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#7B4B32]/10 text-[#7B4B32] flex items-center justify-center font-serif font-bold text-lg">
                02
              </div>
              <h3 className="font-serif font-bold text-lg text-[#2B1D14]">
                Dhaka Handloom Weaving
              </h3>
              <p className="text-xs text-[#2B1D14]/80 leading-relaxed">
                Woven on traditional wooden pit looms, authentic Nepali Dhaka is one of the most mathematically demanding textiles in South Asia. Each colored motif is counted thread-by-thread and laid by hand without automated jacquards, representing iconic Himalayan mountain summits and floral geometries.
              </p>
            </div>
            <div className="text-[11px] text-[#7B4B32] font-medium pt-3 border-t border-[#E5DACB]">
              Zero electrical power · Up to 3 days per piece · Women's cooperatives
            </div>
          </div>

          {/* Technique 3: Wood & Bronze */}
          <div className="p-6 rounded-xl bg-[#FAF6F0] border border-[#E5DACB] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#C69A58]/20 text-[#7B4B32] flex items-center justify-center font-serif font-bold text-lg">
                03
              </div>
              <h3 className="font-serif font-bold text-lg text-[#2B1D14]">
                Newari Chisel &amp; Bronze Craft
              </h3>
              <p className="text-xs text-[#2B1D14]/80 leading-relaxed">
                In Patan's courtyards, sculptors and carvers use generational steel gouges to turn fallen Himalayan walnut and cast bronze into sacred everyday objects. Finished solely with cold-pressed natural walnut oil and pure beeswax, preserving natural wood pores.
              </p>
            </div>
            <div className="text-[11px] text-[#7B4B32] font-medium pt-3 border-t border-[#E5DACB]">
              Fallen timbers only · No synthetic varnishes · Heirloom quality
            </div>
          </div>

        </div>
      </section>

      {/* 4. Meet Our Artisans Profiles */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#53634A] font-semibold">
            The Living Hands
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D14]">
            Meet the Artisans of Himalayan Roots
          </h2>
          <p className="text-xs text-[#2B1D14]/75">
            The masters, weavers, and carvers whose dedication breathes life into each creation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTISANS.map((artisan) => (
            <div
              key={artisan.id}
              className="rounded-xl bg-[#FAF6F0] border border-[#E5DACB] p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[#EAE2D3] border border-[#C69A58]">
                    <img
                      src={artisan.image}
                      alt={artisan.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#2B1D14]">
                      {artisan.name}
                    </h3>
                    <div className="text-xs text-[#7B4B32] font-medium">
                      {artisan.craftRole}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#53634A]">
                  <MapPin className="w-3 h-3 text-[#7B4B32]" />
                  <span>{artisan.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{artisan.experienceYears} Years Mastery</span>
                </div>

                <p className="text-xs text-[#2B1D14]/80 leading-relaxed">
                  {artisan.bio}
                </p>

                <div className="p-3 rounded-lg bg-white border border-[#E5DACB] text-xs text-[#7B4B32] italic">
                  "{artisan.quote}"
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5DACB] text-[11px] text-[#2B1D14]/70">
                <strong className="text-[#2B1D14]">Specialty:</strong> {artisan.specialty}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Responsible Production Commitment */}
      <section className="rounded-2xl bg-[#53634A] text-white p-8 sm:p-12 space-y-6">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#FAF6F0]/80 font-semibold">
            Our Responsible Promise
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Four Commitments to Our Artisans &amp; Earth
          </h2>
          <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
            Sustainability is not a marketing label for us; it is the foundation of mountain survival and Newari communal ethics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 text-left">
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs space-y-2">
            <h4 className="font-serif font-bold text-sm text-[#FAF6F0]">Fair Living Wages</h4>
            <p className="text-xs text-white/80 leading-relaxed">
              Artisans set their own pricing, ensuring stable income that exceeds standard local minimum wages by over 40%.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs space-y-2">
            <h4 className="font-serif font-bold text-sm text-[#FAF6F0]">Zero Plastic Policy</h4>
            <p className="text-xs text-white/80 leading-relaxed">
              Every package is secured with hand-twisted Lokta twine, natural jute fibers, and pressed botanical paper tapes.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs space-y-2">
            <h4 className="font-serif font-bold text-sm text-[#FAF6F0]">Regenerative Harvest</h4>
            <p className="text-xs text-white/80 leading-relaxed">
              Harvested only in collaboration with community forestry user groups high in the hills of Dolakha and Bagmati.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs space-y-2">
            <h4 className="font-serif font-bold text-sm text-[#FAF6F0]">Preserving Identity</h4>
            <p className="text-xs text-white/80 leading-relaxed">
              Documenting and transmitting centuries of Newari script, wood carving motifs, and Dhaka patterns to the next generation.
            </p>
          </div>
        </div>

        <div className="pt-6 text-center">
          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C69A58] text-[#2B1D14] text-xs sm:text-sm font-semibold hover:bg-[#d6a968] transition-colors"
          >
            <span>Explore Handcrafted Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
