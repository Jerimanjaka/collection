import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white-nacre py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & description */}
          <div className="md:col-span-2">
            <Image
              src="/images/logo.png"
              alt="Premiere Collection Ltd"
              width={400}
              height={100}
              className="h-20 sm:h-24 w-auto brightness-200 mix-blend-screen mb-6"
            />
            <p className="font-[var(--font-inter)] text-sm text-white-nacre/60 leading-relaxed max-w-sm">
              Premium sourcing and production partner for luxury brands
              worldwide. From concept to creation, we deliver excellence.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-champagne mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Our Collection", href: "/#collection" },
                { label: "Our Strategy", href: "/#strategy" },
                { label: "About Us", href: "/#about" },
                { label: "Join Us", href: "/#join" },
                { label: "Contact Us", href: "/#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-[var(--font-inter)] text-sm text-white-nacre/50 hover:text-champagne transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-champagne mb-6">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="font-[var(--font-inter)] text-sm text-white-nacre/50">
                contact@premierecollection.com
              </li>
              <li className="font-[var(--font-inter)] text-sm text-white-nacre/50">
                London, United Kingdom
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/quote"
                className="inline-block px-6 py-2 border border-champagne text-champagne font-[var(--font-inter)] text-xs tracking-wider uppercase hover:bg-champagne hover:text-white transition-all duration-300"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white-nacre/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-[var(--font-inter)] text-xs text-white-nacre/30">
            &copy; {new Date().getFullYear()} Premiere Collection Ltd. All rights reserved.
          </p>
          <p className="font-[var(--font-inter)] text-xs text-white-nacre/30">
            Sourcing & Production
          </p>
        </div>
      </div>
    </footer>
  );
}
