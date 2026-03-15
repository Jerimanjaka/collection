import Link from "next/link";
import DynamicImage from "@/components/DynamicImage";
import Text from "@/components/Text";

export default async function About() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white-nacre">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] bg-beige overflow-hidden">
              <DynamicImage
                slot="about-0"
                alt="About Premiere Collection"
                className="object-cover"
                placeholder={
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-[var(--font-cormorant)] text-xl italic text-grey/40">
                      Image About
                    </span>
                  </div>
                }
              />
            </div>
            {/* Decorative border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-champagne-light" />
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="block w-10 h-[1px] bg-champagne" />
              <span className="font-[var(--font-inter)] text-xs tracking-[0.3em] uppercase text-champagne">
                <Text k="about.subtitle" fallback="Our Story" />
              </span>
            </div>

            <h2 className="font-[var(--font-cormorant)] text-4xl sm:text-5xl font-light mb-8 leading-tight">
              About
              <br />
              <em className="text-champagne">Us</em>
            </h2>

            <p className="font-[var(--font-inter)] text-sm text-grey leading-relaxed mb-8">
              <Text k="about.paragraph1" fallback="Founded over 15 years ago, Premiere Collection Ltd was born from a vision: making the world's finest production resources accessible to luxury houses, without compromise on quality or ethics." />
            </p>

            {/* Quote */}
            <div className="border-l-2 border-champagne pl-6 mb-8">
              <p className="font-[var(--font-cormorant)] text-xl italic text-foreground/80 leading-relaxed">
                &ldquo;<Text k="about.quote" fallback="Every product we deliver carries the imprint of irreplaceable human craftsmanship." />&rdquo;
              </p>
            </div>

            <p className="font-[var(--font-inter)] text-sm text-grey leading-relaxed mb-10">
              <Text k="about.paragraph2" fallback="Our team of specialists travels the world to identify, qualify, and build lasting partnerships with the most exacting workshops — from Southeast Asia to artisanal Europe." />
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/quote"
                className="inline-block px-8 py-3 bg-champagne text-white font-[var(--font-inter)] text-sm tracking-wider uppercase hover:bg-champagne-dark transition-colors duration-300"
              >
                Work with Us
              </Link>
              <a
                href="#contact"
                className="inline-block px-8 py-3 border border-foreground/20 font-[var(--font-inter)] text-sm tracking-wider uppercase hover:border-champagne hover:text-champagne transition-all duration-300"
              >
                Our Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
