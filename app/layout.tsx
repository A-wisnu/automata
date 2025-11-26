import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Automata Diagram Generator",
  description: "Generate interactive automata diagrams with AI analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
