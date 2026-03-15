import Text from "@/components/Text";
import HeroSlideshow from "@/components/HeroSlideshow";
import { getImagePath } from "@/lib/image-manifest";

export default async function Hero() {
  // Fetch all slideshow images
  const slidePromises = [0, 1, 2, 3].map((i) => getImagePath(`hero-slide-${i}`));
  const slideResults = await Promise.all(slidePromises);
  const heroImages = slideResults.filter((url): url is string => url !== null);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white-nacre to-beige pt-40 lg:pt-48 overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <div className="relative w-full h-full bg-beige">
            <HeroSlideshow images={heroImages} />
          </div>
        </div>
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white-nacre/70 via-white-nacre/50 to-beige/80" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-champagne-light/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-beige-dark/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Subtitle */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in-up">
          <span className="block w-12 h-[1px] bg-champagne" />
          <span className="font-[var(--font-inter)] text-xs tracking-[0.3em] uppercase text-champagne">
            <Text k="hero.subtitle" fallback="Sourcing & Production" />
          </span>
          <span className="block w-12 h-[1px] bg-champagne" />
        </div>

        {/* Main title */}
        <h1 className="font-[var(--font-cormorant)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-tight mb-6 animate-fade-in-up animate-delay-200">
          <Text k="hero.title1" fallback="From Rare Sourcing" />
          <br />
          <span className="italic text-champagne">
            <Text k="hero.title2" fallback="to Masterful" />
          </span>
          <br />
          <Text k="hero.title3" fallback="Production" />
        </h1>

        {/* Description */}
        <p className="font-[var(--font-inter)] text-base sm:text-lg text-grey max-w-2xl mx-auto mb-12 animate-fade-in-up animate-delay-400 leading-relaxed">
          <Text k="hero.description" fallback="Premiere Collection Ltd partners with the world's finest artisans to deliver bespoke luxury products — from concept to creation." />
        </p>

        {/* CTA */}
        <div className="animate-fade-in-up animate-delay-600">
          <a
            href="#collection"
            className="inline-block px-10 py-4 border-2 border-champagne text-champagne font-[var(--font-inter)] text-sm tracking-widest uppercase hover:bg-champagne hover:text-white transition-all duration-500"
          >
            <Text k="hero.cta" fallback="Explore Our Collection" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-champagne" />
      </div>
    </section>
  );
}
