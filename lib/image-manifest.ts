import { put, del, list } from "@vercel/blob";

export type ImageManifest = Record<string, { filename: string; url: string; updatedAt: number }>;

const MANIFEST_KEY = "manifest/images.json";

// Cache to avoid fetching manifest on every call during a single request
let manifestCache: { data: ImageManifest; timestamp: number } | null = null;
const CACHE_TTL = 2000; // 2s

export async function getManifest(): Promise<ImageManifest> {
  if (manifestCache && Date.now() - manifestCache.timestamp < CACHE_TTL) {
    return manifestCache.data;
  }

  try {
    const blobs = await list({ prefix: MANIFEST_KEY });
    if (blobs.blobs.length > 0) {
      const res = await fetch(blobs.blobs[0].url);
      const data = await res.json();
      manifestCache = { data, timestamp: Date.now() };
      return data;
    }
  } catch {
    // fallback
  }
  return {};
}

export async function setManifest(manifest: ImageManifest): Promise<void> {
  // Delete old manifest
  try {
    const blobs = await list({ prefix: MANIFEST_KEY });
    for (const blob of blobs.blobs) {
      await del(blob.url);
    }
  } catch {
    // ignore
  }

  await put(MANIFEST_KEY, JSON.stringify(manifest), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });

  manifestCache = { data: manifest, timestamp: Date.now() };
}

export async function getImagePath(slot: string): Promise<string | null> {
  const manifest = await getManifest();
  const entry = manifest[slot];
  if (!entry) return null;
  return entry.url;
}

export const SLOTS = {
  "logo": "Site Logo",
  "hero-slide-0": "Hero Slide 1",
  "hero-slide-1": "Hero Slide 2",
  "hero-slide-2": "Hero Slide 3",
  "hero-slide-3": "Hero Slide 4",
  "collection-0": "Awards and Trophies",
  "collection-1": "Branded Accessories",
  "collection-2": "Custom Packaging",
  "collection-3": "Personalized Jewellery",
  "strategy-0": "Sourcing & Production",
  "strategy-1": "Design & Development",
  "strategy-2": "Precision Production",
  "about-0": "About Us",
} as const;
