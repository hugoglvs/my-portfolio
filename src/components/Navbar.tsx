"use client";

import { Home, User, LayoutGrid, BookOpen, LogIn, UserPlus, LogOut, Map } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Discover", href: "/discover", icon: Map },
  { label: "About", href: "/about", icon: User },
  { label: "Work", href: "/work", icon: LayoutGrid },
  { label: "Hobbies", href: "/hobbies", icon: BookOpen },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowUserMenu(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full px-4 py-4">
      <div className="flex items-center justify-center">
        <div className="flex gap-2 md:gap-4 rounded-xl border border-[var(--neutral-400)] bg-[var(--background)] px-4 sm:px-6 py-2 shadow-lg backdrop-blur-md">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "bg-[var(--primary)] text-[var(--secondary)] shadow-inner ring-1 ring-[var(--primary-light)]"
                    : "text-[var(--neutral-600)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]"
                )}
              >
                <Icon size={20} />
                <span className="hidden md:inline">{label}</span>
              </Link>
            );
          })}

          {/* Authentication section */}
          <div className="flex items-center gap-2 ml-4 border-l border-[var(--neutral-300)] pl-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 text-sm font-medium text-[var(--neutral-600)] hover:text-[var(--foreground)] hover:bg-[var(--accent)] transition-all"
                >
                  <User size={20} />
                  <span className="hidden sm:inline">Profile</span>
                </button>

                {/* User dropdown menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[var(--background)] border border-[var(--neutral-300)] py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-[var(--neutral-600)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-[var(--neutral-600)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]"
                    >
                      <div className="flex items-center gap-2">
                        <LogOut size={16} />
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 text-sm font-medium text-[var(--neutral-600)] hover:text-[var(--foreground)] hover:bg-[var(--accent)] transition-all"
                >
                  <LogIn size={20} />
                  <span className="hidden sm:inline">Login</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 text-sm font-medium text-[var(--neutral-600)] hover:text-[var(--foreground)] hover:bg-[var(--accent)] transition-all"
                >
                  <UserPlus size={20} />
                  <span className="hidden sm:inline">Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 