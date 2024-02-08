import type { Metadata } from "next";
import { poppins } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tour City Games",
  description: "Reserva gimkanas por la ciudad. ¿A qué esperas?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide">
      <body className={`min-h-dvh flex flex-col ${poppins.className}`}>
        {children}
      </body>
    </html>
  );
}
