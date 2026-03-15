const reasons = [
  {
    title: "Global Network",
    description: "Access to a worldwide network of artisans, manufacturers, and designers.",
  },
  {
    title: "Quality Standards",
    description: "Uncompromising quality control at every stage of production.",
  },
  {
    title: "Creative Freedom",
    description: "Work on unique, bespoke projects for leading luxury brands.",
  },
  {
    title: "Ethical Practices",
    description: "Commitment to sustainable sourcing and fair trade principles.",
  },
];

export default function JoinUs() {
  return (
    <section id="join" className="py-24 sm:py-32 bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="block w-10 h-[1px] bg-champagne" />
              <span className="font-[var(--font-inter)] text-xs tracking-[0.3em] uppercase text-champagne">
                Careers & Partnerships
              </span>
            </div>
            <h2 className="font-[var(--font-cormorant)] text-4xl sm:text-5xl font-light mb-8">
              Join <em className="text-champagne">Us</em>
            </h2>
            <p className="font-[var(--font-inter)] text-sm text-grey leading-relaxed mb-10 max-w-lg">
              We are always looking for talented individuals and partners who share
              our passion for excellence. Whether you are a craftsman, designer, or
              industry professional — there is a place for you at Premiere
              Collection.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-champagne text-white font-[var(--font-inter)] text-sm tracking-wider uppercase hover:bg-champagne-dark transition-colors duration-300"
            >
              Get in Touch
            </a>
          </div>

          {/* Right - reasons grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <div
                key={reason.title}
                className="bg-white-nacre p-6 border border-beige-dark hover:border-champagne-light transition-all duration-300"
              >
                <span className="font-[var(--font-inter)] text-xs text-champagne/50 mb-3 block">
                  0{index + 1}
                </span>
                <h3 className="font-[var(--font-cormorant)] text-xl font-semibold mb-3">
                  {reason.title}
                </h3>
                <p className="font-[var(--font-inter)] text-xs text-grey leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
