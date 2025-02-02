import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "../styles/globals.css";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const robotoMono = Roboto_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Evan's Portfolio",
  description: "A web portfolio created by Evan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} ${roboto.variable} ${robotoMono.variable} antialiased`}
      >
        <main>{children}</main>
        <footer className="relative footer footer-center bg-neutral text-base-content pb-4">
          <aside>
            <p>
              Copyright © {new Date().getFullYear()}
            </p>
          </aside>
        </footer>
      </body>
    </html>
  );
}
