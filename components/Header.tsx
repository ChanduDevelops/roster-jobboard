"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Board" },
  { href: "/saved", label: "Saved" },
  { href: "/post", label: "Post a job" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b-2 border-ink/90 bg-paper-raised">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="w-9 h-9 rounded-full border-2 border-ink flex items-center justify-center stamp text-[10px] rotate-[-6deg] group-hover:rotate-0 transition-transform">
            R°
          </span>
          <span className="font-display text-2xl tracking-tight">Roster</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "px-3 py-2 text-sm rounded-md transition-colors " +
                  (active
                    ? "bg-ink text-paper"
                    : "text-ink/80 hover:bg-ink/10")
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
