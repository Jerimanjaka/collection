import { put, del, list } from "@vercel/blob";

export type ContentManifest = Record<string, string>;

const CONTENT_KEY = "manifest/content.json";

let contentCache: { data: ContentManifest; timestamp: number } | null = null;
const CACHE_TTL = 2000;

export async function getContent(): Promise<ContentManifest> {
  if (contentCache && Date.now() - contentCache.timestamp < CACHE_TTL) {
    return contentCache.data;
  }

  try {
    const blobs = await list({ prefix: CONTENT_KEY });
    if (blobs.blobs.length > 0) {
      const res = await fetch(blobs.blobs[0].url);
      const data = await res.json();
      contentCache = { data, timestamp: Date.now() };
      return data;
    }
  } catch {
    // fallback
  }
  return {};
}

export async function setContent(content: ContentManifest): Promise<void> {
  try {
    const blobs = await list({ prefix: CONTENT_KEY });
    for (const blob of blobs.blobs) {
      await del(blob.url);
    }
  } catch {
    // ignore
  }

  await put(CONTENT_KEY, JSON.stringify(content), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  contentCache = { data: content, timestamp: Date.now() };
}

export async function getText(key: string, fallback: string): Promise<string> {
  const content = await getContent();
  return content[key] || fallback;
}

export const CONTENT_FIELDS: Record<string, { label: string; fields: { key: string; label: string; type: "text" | "textarea"; default: string }[] }> = {
  hero: {
    label: "Hero Section",
    fields: [
      { key: "hero.subtitle", label: "Subtitle", type: "text", default: "Sourcing & Production" },
      { key: "hero.title1", label: "Title Line 1", type: "text", default: "From Rare Sourcing" },
      { key: "hero.title2", label: "Title Line 2 (italic)", type: "text", default: "to Masterful" },
      { key: "hero.title3", label: "Title Line 3", type: "text", default: "Production" },
      { key: "hero.description", label: "Description", type: "textarea", default: "Premiere Collection Ltd partners with the world's finest artisans to deliver bespoke luxury products — from concept to creation." },
      { key: "hero.cta", label: "CTA Button Text", type: "text", default: "Explore Our Collection" },
    ],
  },
  collection: {
    label: "Our Collection",
    fields: [
      { key: "collection.subtitle", label: "Section Subtitle", type: "text", default: "Collections Exclusives" },
      { key: "collection.title", label: "Section Title", type: "text", default: "Collection" },
      { key: "collection.product0.name", label: "Product 1 — Name", type: "text", default: "Awards and Trophies" },
      { key: "collection.product0.category", label: "Product 1 — Category", type: "text", default: "AWARDS & RECOGNITION" },
      { key: "collection.product0.ref", label: "Product 1 — Reference", type: "text", default: "REF: AT-001" },
      { key: "collection.product0.desc", label: "Product 1 — Description", type: "textarea", default: "Bespoke awards crafted with precision for prestigious events and corporate recognition." },
      { key: "collection.product1.name", label: "Product 2 — Name", type: "text", default: "Branded Accessories" },
      { key: "collection.product1.category", label: "Product 2 — Category", type: "text", default: "ACCESSORIES & BRANDING" },
      { key: "collection.product1.ref", label: "Product 2 — Reference", type: "text", default: "REF: BA-001" },
      { key: "collection.product1.desc", label: "Product 2 — Description", type: "textarea", default: "Premium branded accessories that elevate your corporate identity with elegance." },
      { key: "collection.product2.name", label: "Product 3 — Name", type: "text", default: "Custom Packaging" },
      { key: "collection.product2.category", label: "Product 3 — Category", type: "text", default: "PACKAGING & DESIGN" },
      { key: "collection.product2.ref", label: "Product 3 — Reference", type: "text", default: "REF: CP-001" },
      { key: "collection.product2.desc", label: "Product 3 — Description", type: "textarea", default: "Luxury custom packaging solutions that create unforgettable unboxing experiences." },
      { key: "collection.product3.name", label: "Product 4 — Name", type: "text", default: "Personalized Jewellery" },
      { key: "collection.product3.category", label: "Product 4 — Category", type: "text", default: "JEWELLERY & CRAFT" },
      { key: "collection.product3.ref", label: "Product 4 — Reference", type: "text", default: "REF: PJ-001" },
      { key: "collection.product3.desc", label: "Product 4 — Description", type: "textarea", default: "Exquisite personalized jewellery pieces crafted by master artisans worldwide." },
    ],
  },
  strategy: {
    label: "Our Strategy",
    fields: [
      { key: "strategy.subtitle", label: "Section Subtitle", type: "text", default: "What We Do" },
      { key: "strategy.title", label: "Section Title", type: "text", default: "Strategy" },
      { key: "strategy.item0.title", label: "Strategy 1 — Title", type: "text", default: "Sourcing & Production" },
      { key: "strategy.item0.desc", label: "Strategy 1 — Description", type: "textarea", default: "Identification and selection of the finest suppliers worldwide to guarantee quality, lead times, and compliance." },
      { key: "strategy.item1.title", label: "Strategy 2 — Title", type: "text", default: "Design & Development" },
      { key: "strategy.item1.desc", label: "Strategy 2 — Description", type: "textarea", default: "Creative conception and bespoke product development — from initial brief to finalized prototype." },
      { key: "strategy.item2.title", label: "Strategy 3 — Title", type: "text", default: "Precision Production" },
      { key: "strategy.item2.desc", label: "Strategy 3 — Description", type: "textarea", default: "Rigorous monitoring of every manufacturing stage for products that meet the highest standards." },
    ],
  },
  about: {
    label: "About Us",
    fields: [
      { key: "about.subtitle", label: "Section Subtitle", type: "text", default: "Our Story" },
      { key: "about.paragraph1", label: "Paragraph 1", type: "textarea", default: "Founded over 15 years ago, Premiere Collection Ltd was born from a vision: making the world's finest production resources accessible to luxury houses, without compromise on quality or ethics." },
      { key: "about.quote", label: "Quote", type: "textarea", default: "Every product we deliver carries the imprint of irreplaceable human craftsmanship." },
      { key: "about.paragraph2", label: "Paragraph 2", type: "textarea", default: "Our team of specialists travels the world to identify, qualify, and build lasting partnerships with the most exacting workshops — from Southeast Asia to artisanal Europe." },
    ],
  },
  join: {
    label: "Join Us",
    fields: [
      { key: "join.subtitle", label: "Section Subtitle", type: "text", default: "Careers & Partnerships" },
      { key: "join.description", label: "Description", type: "textarea", default: "We are always looking for talented individuals and partners who share our passion for excellence. Whether you are a craftsman, designer, or industry professional — there is a place for you at Premiere Collection." },
      { key: "join.reason0.title", label: "Reason 1 — Title", type: "text", default: "Global Network" },
      { key: "join.reason0.desc", label: "Reason 1 — Description", type: "textarea", default: "Access to a worldwide network of artisans, manufacturers, and designers." },
      { key: "join.reason1.title", label: "Reason 2 — Title", type: "text", default: "Quality Standards" },
      { key: "join.reason1.desc", label: "Reason 2 — Description", type: "textarea", default: "Uncompromising quality control at every stage of production." },
      { key: "join.reason2.title", label: "Reason 3 — Title", type: "text", default: "Creative Freedom" },
      { key: "join.reason2.desc", label: "Reason 3 — Description", type: "textarea", default: "Work on unique, bespoke projects for leading luxury brands." },
      { key: "join.reason3.title", label: "Reason 4 — Title", type: "text", default: "Ethical Practices" },
      { key: "join.reason3.desc", label: "Reason 4 — Description", type: "textarea", default: "Commitment to sustainable sourcing and fair trade principles." },
    ],
  },
  contact: {
    label: "Contact Us",
    fields: [
      { key: "contact.subtitle", label: "Section Subtitle", type: "text", default: "Get in Touch" },
      { key: "contact.description", label: "Description", type: "textarea", default: "Have a question or want to start a project? Reach out to our team and we'll get back to you within 24 hours." },
      { key: "contact.email", label: "Email Address", type: "text", default: "contact@premierecollection.com" },
      { key: "contact.location", label: "Location", type: "text", default: "London, United Kingdom" },
    ],
  },
  footer: {
    label: "Footer",
    fields: [
      { key: "footer.description", label: "Description", type: "textarea", default: "Premium sourcing and production partner for luxury brands worldwide. From concept to creation, we deliver excellence." },
    ],
  },
};
