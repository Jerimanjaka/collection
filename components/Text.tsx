import { getText } from "@/lib/content-manifest";

export default async function Text({
  k,
  fallback,
}: {
  k: string;
  fallback: string;
}) {
  const text = await getText(k, fallback);
  return <>{text}</>;
}
