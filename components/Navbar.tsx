"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Our Collection", href: "/#collection" },
  { label: "Our Strategy", href: "/#strategy" },
  { label: "About Us", href: "/#about" },
  { label: "Join Us", href: "/#join" },
  { label: "Contact Us", href: "/#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-beige-dark transition-all duration-500 ${
        scrolled
          ? "bg-white-nacre/98 backdrop-blur-md shadow-sm"
          : "bg-white-nacre/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-20" : "h-28 sm:h-32 lg:h-40"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo.png"
              alt="Premiere Collection Ltd"
              width={700}
              height={250}
              className={`w-auto mix-blend-multiply transition-all duration-500 ${
                scrolled
                  ? "h-12 sm:h-14 max-w-[200px] sm:max-w-[280px]"
                  : "h-12 sm:h-14 lg:h-32 max-w-[260px] sm:max-w-[380px] lg:max-w-[500px]"
              }`}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-[var(--font-inter)] text-sm tracking-wide text-foreground/70 hover:text-champagne transition-colors duration-300 uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link
              href="/quote"
              className="inline-block px-6 py-3 bg-champagne text-white text-sm font-[var(--font-inter)] tracking-wider uppercase hover:bg-champagne-dark transition-colors duration-300"
            >
              Request a Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-4 py-6 bg-white-nacre border-t border-beige-dark space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block font-[var(--font-inter)] text-sm tracking-wide text-foreground/70 hover:text-champagne transition-colors uppercase"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/quote"
            className="block text-center px-6 py-3 bg-champagne text-white text-sm font-[var(--font-inter)] tracking-wider uppercase hover:bg-champagne-dark transition-colors"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </nav>
  );
}
