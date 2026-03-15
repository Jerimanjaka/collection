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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [packagingRequired, setPackagingRequired] = useState<string>("not_sure");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.get("fullName"),
          companyName: formData.get("companyName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          country: formData.get("country"),
          productCategory: formData.get("productCategory"),
          productReference: formData.get("productReference"),
          estimatedQuantity: formData.get("estimatedQuantity"),
          quantityRange: formData.get("quantityRange"),
          personalizationTypes: selectedTypes,
          brandingFiles: uploadedFiles,
          projectDescription: formData.get("projectDescription"),
          packagingRequired,
          shippingLocation: formData.get("shippingLocation"),
          additionalNotes: formData.get("additionalNotes"),
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to send request");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
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
                name="fullName"
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
                name="companyName"
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
              name="email"
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
                name="phone"
                className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors"
              />
            </div>
            <div>
              <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">
                Country
              </label>
              <input
                type="text"
                name="country"
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
              name="productCategory"
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
              name="productReference"
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
                name="estimatedQuantity"
                required
                min="1"
                className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors"
              />
            </div>
            <div>
              <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">
                Select Quantity
              </label>
              <select name="quantityRange" className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors appearance-none">
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
            <label
              className={`block w-full px-4 py-6 bg-beige border border-dashed text-center cursor-pointer transition-colors ${
                uploading ? "border-champagne bg-champagne/5" : "border-beige-dark hover:border-champagne"
              }`}
            >
              {uploading ? (
                <span className="font-[var(--font-inter)] text-xs text-champagne">
                  Uploading...
                </span>
              ) : (
                <>
                  <svg className="w-8 h-8 text-grey/30 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <span className="font-[var(--font-inter)] text-xs text-grey">
                    Click to upload: Logo, Artwork, Design files (PNG, JPG, PDF, AI — max 15MB)
                  </span>
                </>
              )}
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.ai,.eps"
                className="hidden"
                onChange={async (e) => {
                  const files = e.target.files;
                  if (!files?.length) return;
                  setUploading(true);
                  const formData = new FormData();
                  Array.from(files).forEach((f) => formData.append("files", f));
                  try {
                    const res = await fetch("/api/quote/upload", {
                      method: "POST",
                      body: formData,
                    });
                    const data = await res.json();
                    if (res.ok) {
                      setUploadedFiles((prev) => [...prev, ...data.files]);
                    }
                  } catch {
                    // silent fail
                  } finally {
                    setUploading(false);
                    e.target.value = "";
                  }
                }}
              />
            </label>
            {uploadedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {uploadedFiles.map((file, i) => (
                  <div key={i} className="flex items-center justify-between bg-beige px-3 py-2">
                    <span className="font-[var(--font-inter)] text-[11px] text-foreground/70 truncate mr-2">
                      {file.replace(/^\d+_/, "")}
                    </span>
                    <button
                      type="button"
                      onClick={() => setUploadedFiles((prev) => prev.filter((_, idx) => idx !== i))}
                      className="font-[var(--font-inter)] text-[10px] text-red-400 hover:text-red-500 shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">
              Description of Your Project
            </label>
            <textarea
              name="projectDescription"
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
              name="shippingLocation"
              className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors"
              placeholder="City, Country"
            />
          </div>
          <div>
            <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">
              Additional Notes
            </label>
            <textarea
              name="additionalNotes"
              rows={4}
              className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="font-[var(--font-inter)] text-xs text-red-500 mb-4">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={sending}
        className="w-full px-8 py-4 bg-champagne text-white font-[var(--font-inter)] text-sm tracking-widest uppercase hover:bg-champagne-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {sending ? "Sending..." : "Request My Quote"}
      </button>
    </form>
  );
}
