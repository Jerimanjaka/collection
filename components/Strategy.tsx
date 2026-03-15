import DynamicImage from "@/components/DynamicImage";

const strategies = [
  {
    number: "01",
    title: "Sourcing & Production",
    description:
      "Identification and selection of the finest suppliers worldwide to guarantee quality, lead times, and compliance.",
    icon: (
      <svg className="w-8 h-8 text-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18a.94.94 0 00-.662.274.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Design & Development",
    description:
      "Creative conception and bespoke product development — from initial brief to finalized prototype.",
    icon: (
      <svg className="w-8 h-8 text-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Precision Production",
    description:
      "Rigorous monitoring of every manufacturing stage for products that meet the highest standards.",
    icon: (
      <svg className="w-8 h-8 text-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
];

export default function Strategy() {
  return (
    <section id="strategy" className="py-24 sm:py-32 bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="font-[var(--font-inter)] text-xs tracking-[0.3em] uppercase text-champagne">
            What We Do
          </span>
          <h2 className="font-[var(--font-cormorant)] text-4xl sm:text-5xl font-light mt-4">
            Our <em className="text-champagne">Strategy</em>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {strategies.map((item, index) => (
            <div
              key={item.number}
              className="bg-white-nacre p-8 sm:p-10 border border-beige-dark hover:border-champagne-light transition-all duration-500 group"
            >
              {/* Number & Icon */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-[var(--font-inter)] text-xs text-grey/40">
                  {item.number}
                </span>
                <div className="w-14 h-14 rounded-full bg-beige flex items-center justify-center group-hover:bg-champagne-light/20 transition-colors duration-300">
                  {item.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="font-[var(--font-cormorant)] text-2xl font-semibold mb-4 uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="font-[var(--font-inter)] text-sm text-grey leading-relaxed mb-8">
                {item.description}
              </p>

              {/* Image */}
              <div className="relative aspect-[4/3] bg-beige overflow-hidden">
                <DynamicImage
                  slot={`strategy-${index}`}
                  alt={item.title}
                  className="object-cover"
                  placeholder={
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-[var(--font-cormorant)] italic text-grey/40">
                        Image {item.title.split(" ")[0]}
                      </span>
                    </div>
                  }
                />
              </div>

              {/* Link */}
              <div className="mt-6">
                <a
                  href="#strategy"
                  className="inline-flex items-center gap-2 font-[var(--font-inter)] text-xs tracking-wider text-champagne uppercase"
                >
                  Discover
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    &rarr;
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
