import DynamicImage from "@/components/DynamicImage";

const products = [
  {
    name: "Awards and Trophies",
    category: "AWARDS & RECOGNITION",
    ref: "REF: AT-001",
    description: "Bespoke awards crafted with precision for prestigious events and corporate recognition.",
  },
  {
    name: "Branded Accessories",
    category: "ACCESSORIES & BRANDING",
    ref: "REF: BA-001",
    description: "Premium branded accessories that elevate your corporate identity with elegance.",
  },
  {
    name: "Custom Packaging",
    category: "PACKAGING & DESIGN",
    ref: "REF: CP-001",
    description: "Luxury custom packaging solutions that create unforgettable unboxing experiences.",
  },
  {
    name: "Personalized Jewellery",
    category: "JEWELLERY & CRAFT",
    ref: "REF: PJ-001",
    description: "Exquisite personalized jewellery pieces crafted by master artisans worldwide.",
  },
];

export default function Collection() {
  return (
    <section id="collection" className="py-24 sm:py-32 bg-white-nacre">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="block w-10 h-[1px] bg-champagne" />
              <span className="font-[var(--font-inter)] text-xs tracking-[0.3em] uppercase text-champagne">
                Collections Exclusives
              </span>
            </div>
            <h2 className="font-[var(--font-cormorant)] text-4xl sm:text-5xl font-light">
              Our <em className="text-champagne">Collection</em>
            </h2>
          </div>
          <a
            href="#collection"
            className="mt-6 sm:mt-0 inline-block px-8 py-3 border border-foreground/20 font-[var(--font-inter)] text-sm tracking-wider uppercase hover:border-champagne hover:text-champagne transition-all duration-300"
          >
            View All
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.name}
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Image placeholder */}
              <div className="relative aspect-[3/4] bg-beige mb-5 overflow-hidden">
                <DynamicImage
                  slot={`collection-${index}`}
                  alt={product.name}
                  className="object-cover"
                  placeholder={
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-[var(--font-cormorant)] text-lg italic text-grey/50">
                        Image {index + 1}
                      </span>
                    </div>
                  }
                />
                <div className="absolute inset-0 bg-champagne/0 group-hover:bg-champagne/10 transition-all duration-500" />
                {/* Reference badge */}
                <div className="absolute top-4 right-4 bg-white-nacre/90 px-3 py-1">
                  <span className="font-[var(--font-inter)] text-[10px] tracking-wider text-champagne-dark">
                    {product.ref}
                  </span>
                </div>
              </div>

              {/* Info */}
              <span className="font-[var(--font-inter)] text-[10px] tracking-[0.2em] text-grey uppercase">
                {product.category}
              </span>
              <h3 className="font-[var(--font-cormorant)] text-xl mt-1 mb-2 group-hover:text-champagne transition-colors duration-300">
                {product.name}
              </h3>
              <p className="font-[var(--font-inter)] text-xs text-grey leading-relaxed mb-3">
                {product.description}
              </p>
              <a
                href="#collection"
                className="inline-flex items-center gap-2 font-[var(--font-inter)] text-xs tracking-wider text-champagne uppercase"
              >
                Explore
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  &rarr;
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
