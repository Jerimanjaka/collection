import fs from "fs";
import path from "path";

export type ImageManifest = Record<string, { filename: string; updatedAt: number }>;

const MANIFEST_PATH = path.join(process.cwd(), "public/images/manifest.json");

export function getManifest(): ImageManifest {
  try {
    // Clear require cache to always read fresh data after uploads
    delete require.cache[MANIFEST_PATH];
    const data = fs.readFileSync(MANIFEST_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export function setManifest(manifest: ImageManifest): void {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

export function getImagePath(slot: string): string | null {
  const manifest = getManifest();
  const entry = manifest[slot];
  if (!entry) return null;
  return `/images/${entry.filename}?v=${entry.updatedAt}`;
}

export const SLOTS = {
  "hero-bg": "Hero Background",
  "collection-0": "Awards and Trophies",
  "collection-1": "Branded Accessories",
  "collection-2": "Custom Packaging",
  "collection-3": "Personalized Jewellery",
  "strategy-0": "Sourcing & Production",
  "strategy-1": "Design & Development",
  "strategy-2": "Precision Production",
  "about-0": "About Us",
} as const;
