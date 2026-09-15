import type { Metadata } from "next";
import { Chakra_Petch, Rajdhani, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/motion/Providers";

/* Angular, bevelled display face — the cut-corner look of HUD type. */
const display = Chakra_Petch({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

/* Squared-off and slightly condensed; reads as instrumentation. */
const body = Rajdhani({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

/* Terminal face for labels, chips, and the status rows. */
const mono = Share_Tech_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
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
 * Applies the stored theme before first paint. Without this the page
 * renders dark and then flips, which is the one transition nobody wants.
 */
const themeScript = `
(function () {
  try {
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light');
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
