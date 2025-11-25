import { Onest } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";

const CustomFont = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["Inter", "sans-serif"],
});

export const metadata = {
  title: "90Rule",
  description:
    "A precise sleep cycle calculator designed to help you wake up feeling refreshed and energized",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${CustomFont.className} antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
