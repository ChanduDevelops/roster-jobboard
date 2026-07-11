import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Roster — a hiring board that reads like one",
  description:
    "An open board of real roles, posted plainly: what the job pays, what it needs, and when it closes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="max-w-5xl mx-auto px-4 sm:px-6">{children}</main>
        <footer className="max-w-5xl mx-auto px-4 sm:px-6 py-10 mt-16 border-t border-line/60 text-sm text-slate flex flex-wrap gap-x-6 gap-y-2 justify-between">
          <span className="stamp">ROSTER · BOARD NO. 001</span>
          <span>Every listing here is a sample posting for demonstration.</span>
        </footer>
      </body>
    </html>
  );
}
