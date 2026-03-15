"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-sm p-4 sm:p-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-[var(--font-inter)] text-xs text-white-nacre/70 leading-relaxed text-center sm:text-left">
          This website uses essential cookies to ensure proper functionality. By
          continuing to use this site, you agree to our{" "}
          <Link href="/legal" className="text-champagne hover:underline">
            Cookie Policy
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="shrink-0 px-6 py-2 bg-champagne text-white font-[var(--font-inter)] text-xs tracking-wider uppercase hover:bg-champagne-dark transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
