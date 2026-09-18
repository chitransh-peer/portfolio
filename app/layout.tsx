import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/motion/Providers";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Peer Consulting Resources — Work & Capabilities",
  description:
    "A women-owned IT consulting, training, and technology staffing firm in Princeton, NJ. A working portfolio of what we build for clients across New Jersey, New York, and Connecticut.",
  openGraph: {
    title: "Peer Consulting Resources — Work & Capabilities",
    description:
      "A women-owned IT consulting, training, and technology staffing firm in Princeton, NJ. A working portfolio of what we build for clients across New Jersey, New York, and Connecticut.",
    type: "website",
  },
};

/**
 * Light is the default, so this only has to opt a returning visitor back
 * into dark — and it has to run before first paint, or they'd watch the
 * page flash light before flipping.
 */
const themeScript = `
(function () {
  try {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
