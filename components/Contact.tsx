"use client";

import { useState, useEffect, type FormEvent } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [texts, setTexts] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/public/content")
      .then((r) => r.json())
      .then((data) => setTexts(data))
      .catch(() => {});
  }, []);

  const t = (key: string, fallback: string) => texts[key] || fallback;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          company: formData.get("company"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to send message");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-white-nacre">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="block w-10 h-[1px] bg-champagne" />
              <span className="font-[var(--font-inter)] text-xs tracking-[0.3em] uppercase text-champagne">
                {t("contact.subtitle", "Get in Touch")}
              </span>
            </div>
            <h2 className="font-[var(--font-cormorant)] text-4xl sm:text-5xl font-light mb-8">
              Contact <em className="text-champagne">Us</em>
            </h2>
            <p className="font-[var(--font-inter)] text-sm text-grey leading-relaxed mb-10 max-w-lg">
              {t("contact.description", "Have a question or want to start a project? Reach out to our team and we'll get back to you within 24 hours.")}
            </p>

            {/* Contact info */}
            <div className="space-y-6">
              <div>
                <h4 className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-champagne mb-2">
                  Email
                </h4>
                <p className="font-[var(--font-inter)] text-sm text-foreground">
                  {t("contact.email", "contact@premierecollection.com")}
                </p>
              </div>
              <div>
                <h4 className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-champagne mb-2">
                  Location
                </h4>
                <p className="font-[var(--font-inter)] text-sm text-foreground">
                  {t("contact.location", "London, United Kingdom")}
                </p>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div>
            {submitted ? (
              <div className="h-full flex items-center justify-center bg-beige p-12 text-center">
                <div>
                  <div className="w-16 h-16 bg-champagne/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="font-[var(--font-cormorant)] text-2xl mb-3">Message Sent</h3>
                  <p className="font-[var(--font-inter)] text-sm text-grey">
                    Thank you for reaching out. We&apos;ll get back to you shortly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">Full Name *</label>
                    <input type="text" name="name" required className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors" />
                  </div>
                  <div>
                    <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">Company</label>
                    <input type="text" name="company" className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">Email Address *</label>
                  <input type="email" name="email" required className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors" />
                </div>
                <div>
                  <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">Message *</label>
                  <textarea name="message" required rows={5} className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors resize-none" />
                </div>
                {error && <p className="font-[var(--font-inter)] text-xs text-red-500">{error}</p>}
                <button type="submit" disabled={sending} className="w-full px-8 py-4 bg-champagne text-white font-[var(--font-inter)] text-sm tracking-wider uppercase hover:bg-champagne-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
