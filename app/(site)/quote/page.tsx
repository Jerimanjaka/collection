export const dynamic = "force-dynamic";

import QuoteForm from "@/components/QuoteForm";
import Link from "next/link";

export const metadata = {
  title: "Request a Quote | Premiere Collection Ltd",
  description: "Request a tailored quotation for your bespoke luxury products.",
};

export default function QuotePage() {
  return (
    <main className="pt-44 lg:pt-52 pb-24 bg-white-nacre">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-12" aria-label="Breadcrumb">
          <Link
            href="/"
            className="font-[var(--font-inter)] text-xs text-grey hover:text-champagne transition-colors flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Home
          </Link>
          <span className="text-grey/30">/</span>
          <span className="font-[var(--font-inter)] text-xs text-champagne font-medium">
            Request a Quote
          </span>
        </nav>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="block w-10 h-[1px] bg-champagne" />
            <span className="font-[var(--font-inter)] text-xs tracking-[0.3em] uppercase text-champagne">
              Get Started
            </span>
            <span className="block w-10 h-[1px] bg-champagne" />
          </div>
          <h1 className="font-[var(--font-cormorant)] text-4xl sm:text-5xl font-light">
            Request a <em className="text-champagne">Quote</em>
          </h1>
        </div>

        {/* Form */}
        <QuoteForm />
      </div>
    </main>
  );
}
