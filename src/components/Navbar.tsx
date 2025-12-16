"use client";

import { Home, FolderCode } from "lucide-react";
import LinkGroups, { LinkItem } from "./LinkGroups";
import { Fragment } from "react";

const navGroups: LinkItem[][] = [
  [
    { label: "Accueil", href: "/", icon: Home },
  ],
  [
    // { label: "A propos", href: "/about", icon: User },
    { label: "Projets", href: "/work", icon: FolderCode },
  ],
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 px-4 py-4 w-fit mx-auto">
      <div className="flex items-center gap-2 rounded-xl border border-[var(--neutral-400)] bg-[var(--background)]/80 px-4 sm:px-6 py-2 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-[var(--background)]/90">
        {navGroups.map((group, index) => (
          <Fragment key={`group-${index}`}>
            {index > 0 && (
              <div className="h-6 w-px bg-[var(--neutral-400)]" />
            )}
            <LinkGroups items={group} />
          </Fragment>
        ))}
      </div>
    </nav>
  );
}
