import Link from "next/link";

export const metadata = {
  title: "Legal Notice & Privacy Policy | Premiere Collection Ltd",
};

export default function LegalPage() {
  return (
    <main className="pt-44 lg:pt-52 pb-24 bg-white-nacre">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Legal Notice
          </span>
        </nav>

        <h1 className="font-[var(--font-cormorant)] text-4xl sm:text-5xl font-light mb-12">
          Legal <em className="text-champagne">Notice</em>
        </h1>

        <div className="space-y-12 font-[var(--font-inter)] text-sm text-grey leading-relaxed">
          {/* Company Info */}
          <section>
            <h2 className="font-[var(--font-cormorant)] text-2xl text-foreground mb-4">
              Company Information
            </h2>
            <p>
              <strong>Premiere Collection Ltd</strong><br />
              Sourcing & Production<br />
              London, United Kingdom<br />
              Email: contact@premierecollection.com
            </p>
          </section>

          {/* Privacy Policy */}
          <section>
            <h2 className="font-[var(--font-cormorant)] text-2xl text-foreground mb-4">
              Privacy Policy
            </h2>
            <p className="mb-4">
              Premiere Collection Ltd is committed to protecting your privacy. This
              policy explains how we collect, use, and safeguard your personal
              information.
            </p>
            <h3 className="font-[var(--font-cormorant)] text-xl text-foreground mt-6 mb-3">
              Data We Collect
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Contact information (name, email, phone number, company) submitted via our contact and quote request forms</li>
              <li>Project details provided in quote requests</li>
              <li>Files uploaded as part of branding elements for quote requests</li>
              <li>Technical cookies necessary for the website to function</li>
            </ul>
            <h3 className="font-[var(--font-cormorant)] text-xl text-foreground mt-6 mb-3">
              How We Use Your Data
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>To respond to your enquiries and quote requests</li>
              <li>To provide the services you have requested</li>
              <li>To improve our website and services</li>
            </ul>
            <h3 className="font-[var(--font-cormorant)] text-xl text-foreground mt-6 mb-3">
              Data Retention
            </h3>
            <p>
              We retain your personal data only for as long as necessary to fulfil
              the purposes for which it was collected, or as required by law.
            </p>
            <h3 className="font-[var(--font-cormorant)] text-xl text-foreground mt-6 mb-3">
              Your Rights
            </h3>
            <p>
              Under the UK GDPR, you have the right to access, rectify, erase, or
              restrict the processing of your personal data. To exercise these
              rights, contact us at contact@premierecollection.com.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="font-[var(--font-cormorant)] text-2xl text-foreground mb-4">
              Cookie Policy
            </h2>
            <p className="mb-4">
              This website uses only essential cookies required for the site to
              function properly (e.g., admin authentication). We do not use
              tracking or advertising cookies.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="font-[var(--font-cormorant)] text-2xl text-foreground mb-4">
              Intellectual Property
            </h2>
            <p>
              All content on this website, including text, images, logos, and
              design, is the property of Premiere Collection Ltd and is protected
              by intellectual property laws. Reproduction without prior written
              consent is prohibited.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
