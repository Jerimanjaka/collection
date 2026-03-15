import DynamicImage from "@/components/DynamicImage";
import Text from "@/components/Text";
import { getText } from "@/lib/content-manifest";

export default async function Collection() {
  const products = [
    { key: "collection.product0", defaultName: "Awards and Trophies", defaultCat: "AWARDS & RECOGNITION", defaultRef: "REF: AT-001", defaultDesc: "Bespoke awards crafted with precision for prestigious events and corporate recognition." },
    { key: "collection.product1", defaultName: "Branded Accessories", defaultCat: "ACCESSORIES & BRANDING", defaultRef: "REF: BA-001", defaultDesc: "Premium branded accessories that elevate your corporate identity with elegance." },
    { key: "collection.product2", defaultName: "Custom Packaging", defaultCat: "PACKAGING & DESIGN", defaultRef: "REF: CP-001", defaultDesc: "Luxury custom packaging solutions that create unforgettable unboxing experiences." },
    { key: "collection.product3", defaultName: "Personalized Jewellery", defaultCat: "JEWELLERY & CRAFT", defaultRef: "REF: PJ-001", defaultDesc: "Exquisite personalized jewellery pieces crafted by master artisans worldwide." },
  ];

  return (
    <section id="collection" className="py-24 sm:py-32 bg-white-nacre">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="block w-10 h-[1px] bg-champagne" />
              <span className="font-[var(--font-inter)] text-xs tracking-[0.3em] uppercase text-champagne">
                <Text k="collection.subtitle" fallback="Collections Exclusives" />
              </span>
            </div>
            <h2 className="font-[var(--font-cormorant)] text-4xl sm:text-5xl font-light">
              Our <em className="text-champagne"><Text k="collection.title" fallback="Collection" /></em>
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
          {await Promise.all(products.map(async (product, index) => {
            const name = await getText(`${product.key}.name`, product.defaultName);
            const category = await getText(`${product.key}.category`, product.defaultCat);
            const ref = await getText(`${product.key}.ref`, product.defaultRef);
            const description = await getText(`${product.key}.desc`, product.defaultDesc);

            return (
              <div
                key={product.key}
                className="group cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] bg-beige mb-5 overflow-hidden">
                  <DynamicImage
                    slot={`collection-${index}`}
                    alt={name}
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
                      {ref}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <span className="font-[var(--font-inter)] text-[10px] tracking-[0.2em] text-grey uppercase">
                  {category}
                </span>
                <h3 className="font-[var(--font-cormorant)] text-xl mt-1 mb-2 group-hover:text-champagne transition-colors duration-300">
                  {name}
                </h3>
                <p className="font-[var(--font-inter)] text-xs text-grey leading-relaxed mb-3">
                  {description}
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
            );
          }))}
        </div>
      </div>
    </section>
  );
}
