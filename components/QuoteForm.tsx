"use client";

import { useState, type FormEvent } from "react";

const productCategories = [
  "Awards and Trophies",
  "Branded Accessories",
  "Custom Packaging",
  "Personalized Jewellery",
];

const personalizationTypes = [
  "Engraving",
  "Logo Printing",
  "Custom Shape / Mold",
  "Other",
];

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [packagingRequired, setPackagingRequired] = useState<string>("not_sure");

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-champagne/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="font-[var(--font-cormorant)] text-3xl mb-4">
            Quote Request Sent
          </h2>
          <p className="font-[var(--font-inter)] text-sm text-grey leading-relaxed">
            Thank you for your interest. Our team will review your project details
            and get back to you with a tailored quotation within 48 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <p className="font-[var(--font-inter)] text-sm text-grey text-center mb-12 leading-relaxed">
        Tell us about your project and our team will get back to you with a
        tailored quotation.
      </p>

      {/* Section 1 - Contact Information */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="w-8 h-8 rounded-full bg-champagne text-white flex items-center justify-center font-[var(--font-inter)] text-sm">
            1
          </span>
          <h3 className="font-[var(--font-cormorant)] text-2xl">
            Contact Information
          </h3>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">
                Full Name *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors"
              />
            </div>
            <div>
              <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">
                Company Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">
              Email Address *
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors"
              />
            </div>
            <div>
              <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">
                Country
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-beige-dark mb-12" />

      {/* Section 2 - Project Information */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="w-8 h-8 rounded-full bg-champagne text-white flex items-center justify-center font-[var(--font-inter)] text-sm">
            2
          </span>
          <h3 className="font-[var(--font-cormorant)] text-2xl">
            Project Information
          </h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">
              Product Category *
            </label>
            <select
              required
              className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors appearance-none"
            >
              <option value="">Select a category</option>
              {productCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">
              Product Reference / Model
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors"
              placeholder="e.g. AT-001, BA-001..."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">
                Estimated Quantity *
              </label>
              <input
                type="number"
                required
                min="1"
                className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors"
              />
            </div>
            <div>
              <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">
                Select Quantity
              </label>
              <select className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors appearance-none">
                <option value="">Select range</option>
                <option value="1-50">1 - 50</option>
                <option value="50-200">50 - 200</option>
                <option value="200-500">200 - 500</option>
                <option value="500-1000">500 - 1,000</option>
                <option value="1000+">1,000+</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-beige-dark mb-12" />

      {/* Section 3 - Customization Details */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="w-8 h-8 rounded-full bg-champagne text-white flex items-center justify-center font-[var(--font-inter)] text-sm">
            3
          </span>
          <h3 className="font-[var(--font-cormorant)] text-2xl">
            Customization Details
          </h3>
        </div>
        <div className="space-y-6">
          <div>
            <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-3 block">
              Type of Personalization
            </label>
            <div className="flex flex-wrap gap-3">
              {personalizationTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  className={`px-5 py-2 border font-[var(--font-inter)] text-xs tracking-wider transition-all duration-300 ${
                    selectedTypes.includes(type)
                      ? "bg-champagne border-champagne text-white"
                      : "bg-transparent border-beige-dark text-grey hover:border-champagne"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">
              Branding Elements
            </label>
            <div className="w-full px-4 py-6 bg-beige border border-dashed border-beige-dark text-center cursor-pointer hover:border-champagne transition-colors">
              <span className="font-[var(--font-inter)] text-xs text-grey">
                Click to upload: Logo, Artwork, Design files
              </span>
            </div>
          </div>
          <div>
            <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">
              Description of Your Project
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors resize-none"
              placeholder="Describe your requirements..."
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-beige-dark mb-12" />

      {/* Section 4 - Additional Information */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="w-8 h-8 rounded-full bg-champagne text-white flex items-center justify-center font-[var(--font-inter)] text-sm">
            4
          </span>
          <h3 className="font-[var(--font-cormorant)] text-2xl">
            Additional Information
          </h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-3 block">
              Packaging Required
            </label>
            <div className="flex flex-wrap gap-3">
              {[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "not_sure", label: "Not sure yet" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPackagingRequired(opt.value)}
                  className={`px-5 py-2 border font-[var(--font-inter)] text-xs tracking-wider transition-all duration-300 ${
                    packagingRequired === opt.value
                      ? "bg-champagne border-champagne text-white"
                      : "bg-transparent border-beige-dark text-grey hover:border-champagne"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">
              Shipping Location
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors"
              placeholder="City, Country"
            />
          </div>
          <div>
            <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">
              Additional Notes
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full px-8 py-4 bg-champagne text-white font-[var(--font-inter)] text-sm tracking-widest uppercase hover:bg-champagne-dark transition-colors duration-300"
      >
        Request My Quote
      </button>
    </form>
  );
}
