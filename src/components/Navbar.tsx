"use client";

import { Home, User, BookOpen, Map, } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { label: "Accueil", href: "/", icon: Home },
  { label: "Explorer", href: "/explore", icon: Map },
  { label: "A propos", href: "/about", icon: User },
  { label: "Hobbies", href: "/hobbies", icon: BookOpen },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full px-4 py-4">
      <div className="flex items-center justify-center">
        <div className="flex gap-2 md:gap-4 rounded-xl border border-[var(--neutral-400)] bg-[var(--background)]/80 px-4 sm:px-6 py-2 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-[var(--background)]/90">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[var(--neutral-200)] dark:bg-[var(--neutral-700)] text-[var(--neutral-800)] dark:text-[var(--neutral-200)] shadow-inner ring-1 ring-[var(--neutral-600)] hover:bg-[var(--neutral-300)]/70"
                    : "text-[var(--neutral-600)] dark:text-[var(--neutral-400)] hover:text-[var(--foreground)] hover:bg-[var(--neutral-200)]/50 dark:hover:bg-[var(--neutral-700)]/50"
                )}
              >
                <Icon size={20} className="transition-transform duration-200 group-hover:scale-110" />
                <span className="hidden md:inline">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
} 