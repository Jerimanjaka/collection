import DynamicImage from "@/components/DynamicImage";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white-nacre to-beige pt-40 lg:pt-48 overflow-hidden">
      {/* Background hero image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <div className="relative w-full h-full bg-beige">
            <DynamicImage
              slot="hero-bg"
              alt="Premiere Collection hero"
              className="object-cover"
              placeholder={
                <div className="w-full h-full bg-gradient-to-br from-beige-dark/40 via-beige/20 to-champagne-light/10" />
              }
            />
          </div>
        </div>
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white-nacre/80 via-white-nacre/60 to-beige/90" />
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
            Sourcing & Production
          </span>
          <span className="block w-12 h-[1px] bg-champagne" />
        </div>

        {/* Main title */}
        <h1 className="font-[var(--font-cormorant)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-tight mb-6 animate-fade-in-up animate-delay-200">
          From Rare Sourcing
          <br />
          <span className="italic text-champagne">to Masterful</span>
          <br />
          Production
        </h1>

        {/* Description */}
        <p className="font-[var(--font-inter)] text-base sm:text-lg text-grey max-w-2xl mx-auto mb-12 animate-fade-in-up animate-delay-400 leading-relaxed">
          Premiere Collection Ltd partners with the world&apos;s finest artisans to
          deliver bespoke luxury products — from concept to creation.
        </p>

        {/* CTA */}
        <div className="animate-fade-in-up animate-delay-600">
          <a
            href="#collection"
            className="inline-block px-10 py-4 border-2 border-champagne text-champagne font-[var(--font-inter)] text-sm tracking-widest uppercase hover:bg-champagne hover:text-white transition-all duration-500"
          >
            Explore Our Collection
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-champagne" />
      </div>
    </section>
  );
}
