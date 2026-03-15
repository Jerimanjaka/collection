import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Premiere Collection Ltd | Sourcing & Production",
  description:
    "Premium sourcing and production of awards, trophies, branded accessories, custom packaging, and personalized jewellery.",
  metadataBase: new URL("https://premierecollection.com"),
  openGraph: {
    title: "Premiere Collection Ltd | Sourcing & Production",
    description:
      "From rare sourcing to masterful production. Premium awards, branded accessories, custom packaging, and personalized jewellery.",
    url: "https://premierecollection.com",
    siteName: "Premiere Collection Ltd",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premiere Collection Ltd | Sourcing & Production",
    description:
      "From rare sourcing to masterful production. Premium awards, branded accessories, custom packaging, and personalized jewellery.",
  },
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
