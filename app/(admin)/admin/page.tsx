"use client";

import { useState, useEffect, useCallback, type FormEvent, type DragEvent } from "react";
import Image from "next/image";

type ManifestEntry = { filename: string; updatedAt: number };
type Manifest = Record<string, ManifestEntry>;
type Slots = Record<string, string>;

const sections = [
  {
    title: "Hero",
    description: "Background image for the hero section",
    slots: ["hero-bg"],
  },
  {
    title: "Our Collection",
    description: "Product images (ratio 3:4 recommended)",
    slots: ["collection-0", "collection-1", "collection-2", "collection-3"],
  },
  {
    title: "Our Strategy",
    description: "Strategy card images (ratio 4:3 recommended)",
    slots: ["strategy-0", "strategy-1", "strategy-2"],
  },
  {
    title: "About Us",
    description: "About section image (ratio 4:5 recommended)",
    slots: ["about-0"],
  },
];

function UploadSlot({
  slot,
  label,
  entry,
  onUploadSuccess,
}: {
  slot: string;
  label: string;
  entry?: ManifestEntry;
  onUploadSuccess: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  const uploadFile = async (file: File) => {
    setError("");
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("slot", slot);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed");
      } else {
        onUploadSuccess();
      }
    } catch {
      setError("Network error");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = "";
  };

  const imageSrc = entry ? `/images/${entry.filename}?v=${entry.updatedAt}` : null;

  return (
    <div className="bg-white-nacre border border-beige-dark p-4 hover:border-champagne-light transition-colors">
      <p className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-champagne mb-3">
        {label}
      </p>

      {/* Preview */}
      <div
        className={`relative aspect-[4/3] bg-beige mb-3 overflow-hidden flex items-center justify-center border-2 border-dashed transition-colors ${
          dragOver ? "border-champagne bg-champagne/5" : "border-transparent"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={label}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="text-center p-4">
            <svg
              className="w-10 h-10 text-grey/30 mx-auto mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
              />
            </svg>
            <p className="font-[var(--font-inter)] text-[10px] text-grey/50">
              Drag & drop or click below
            </p>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-white-nacre/80 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-champagne border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className={`grid gap-2 ${entry ? "grid-cols-2" : "grid-cols-1"}`}>
        <label className="block w-full text-center px-4 py-2 bg-champagne text-white font-[var(--font-inter)] text-[11px] tracking-wider uppercase cursor-pointer hover:bg-champagne-dark transition-colors">
          {entry ? "Replace" : "Upload Image"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/svg+xml"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
        {entry && (
          <button
            type="button"
            onClick={async () => {
              setError("");
              try {
                const res = await fetch("/api/admin/delete", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ slot }),
                });
                if (res.ok) {
                  onUploadSuccess();
                } else {
                  setError("Delete failed");
                }
              } catch {
                setError("Network error");
              }
            }}
            className="w-full text-center px-4 py-2 border border-red-300 text-red-400 font-[var(--font-inter)] text-[11px] tracking-wider uppercase hover:bg-red-50 hover:border-red-400 transition-colors"
          >
            Delete
          </button>
        )}
      </div>

      {error && (
        <p className="font-[var(--font-inter)] text-[10px] text-red-500 mt-2">
          {error}
        </p>
      )}

      {entry && (
        <p className="font-[var(--font-inter)] text-[10px] text-grey/50 mt-2">
          {entry.filename}
        </p>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [manifest, setManifest] = useState<Manifest>({});
  const [slots, setSlots] = useState<Slots>({});
  const [loading, setLoading] = useState(true);

  const fetchManifest = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/images");
      if (res.ok) {
        const data = await res.json();
        setManifest(data.manifest);
        setSlots(data.slots);
        setAuthenticated(true);
      }
    } catch {
      // not authenticated
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchManifest();
  }, [fetchManifest]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthenticated(true);
        fetchManifest();
      } else {
        setLoginError("Incorrect password");
      }
    } catch {
      setLoginError("Connection error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-champagne border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <h1 className="font-[var(--font-cormorant)] text-4xl font-light mb-2">
              Admin <em className="text-champagne">Panel</em>
            </h1>
            <p className="font-[var(--font-inter)] text-xs text-grey">
              Premiere Collection Ltd
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-[var(--font-inter)] text-xs tracking-wider uppercase text-grey mb-2 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-beige border border-beige-dark font-[var(--font-inter)] text-sm focus:outline-none focus:border-champagne transition-colors"
                autoFocus
              />
            </div>
            {loginError && (
              <p className="font-[var(--font-inter)] text-xs text-red-500">
                {loginError}
              </p>
            )}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-champagne text-white font-[var(--font-inter)] text-sm tracking-wider uppercase hover:bg-champagne-dark transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard
  const uploadedCount = Object.keys(manifest).length;
  const totalCount = Object.keys(slots).length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white-nacre border-b border-beige-dark px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-[var(--font-cormorant)] text-3xl font-light">
              Image <em className="text-champagne">Manager</em>
            </h1>
            <p className="font-[var(--font-inter)] text-xs text-grey mt-1">
              {uploadedCount}/{totalCount} images uploaded
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="inline-block px-5 py-2 border border-foreground/20 font-[var(--font-inter)] text-xs tracking-wider uppercase hover:border-champagne hover:text-champagne transition-all"
            >
              View Site
            </a>
            <button
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                setAuthenticated(false);
                setPassword("");
              }}
              className="inline-block px-5 py-2 border border-red-300 text-red-400 font-[var(--font-inter)] text-xs tracking-wider uppercase hover:bg-red-50 hover:border-red-400 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {sections.map((section) => (
          <div key={section.title} className="mb-14">
            <div className="flex items-center gap-4 mb-2">
              <span className="block w-8 h-[1px] bg-champagne" />
              <h2 className="font-[var(--font-cormorant)] text-2xl">
                {section.title}
              </h2>
            </div>
            <p className="font-[var(--font-inter)] text-xs text-grey mb-6 ml-12">
              {section.description}
            </p>
            <div
              className={`grid gap-6 ${
                section.slots.length === 1
                  ? "grid-cols-1 max-w-md"
                  : section.slots.length === 3
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {section.slots.map((slot) => (
                <UploadSlot
                  key={slot}
                  slot={slot}
                  label={slots[slot] || slot}
                  entry={manifest[slot]}
                  onUploadSuccess={fetchManifest}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
