"use client";

import { useState, useEffect } from "react";

export function useLogoPath() {
  const [logoPath, setLogoPath] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/public/logo")
      .then((r) => r.json())
      .then((data) => {
        if (data.path) setLogoPath(data.path);
      })
      .catch(() => {});
  }, []);

  return logoPath;
}
