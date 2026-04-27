import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Mercado Martin – Produtos Frescos e Orgânicos",
  description: "Mini Mercado Martin: hortifruti, temperos, grãos e muito mais. Produtos frescos, orgânicos e entregues com carinho.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${dmSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
