import Image from "next/image";
import { getImagePath } from "@/lib/image-manifest";

interface DynamicImageProps {
  slot: string;
  alt: string;
  className?: string;
  placeholder?: React.ReactNode;
}

export default async function DynamicImage({
  slot,
  alt,
  className = "object-cover",
  placeholder,
}: DynamicImageProps) {
  const imagePath = await getImagePath(slot);

  if (!imagePath) {
    return placeholder || null;
  }

  return (
    <Image
      src={imagePath}
      alt={alt}
      fill
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      unoptimized
    />
  );
}
