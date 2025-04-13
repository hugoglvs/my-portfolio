"use client";

import { Home, User, BookOpen, LogIn, UserPlus, LogOut, Map } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const navItems = [
  { label: "Accueil", href: "/", icon: Home },
  { label: "Explorer", href: "/explore", icon: Map },
  { label: "A propos", href: "/about", icon: User },
  { label: "Hobbies", href: "/hobbies", icon: BookOpen },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setShowUserMenu(false);
  };

  // Render only the navigation items until the component is mounted
  const renderNavItems = () => (
    <>
      {navItems.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={clsx(
              "flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-[var(--primary)] text-[var(--secondary)] shadow-inner ring-1 ring-[var(--primary-light)] hover:bg-[var(--primary)]/90"
                : "text-[var(--neutral-600)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]/50"
            )}
          >
            <Icon size={20} className="transition-transform duration-200 group-hover:scale-110" />
            <span className="hidden md:inline">{label}</span>
          </Link>
        );
      })}
    </>
  );

  // Render the authentication section only after mounting
  const renderAuthSection = () => {
    if (!mounted) return null;

    return (
      <div className="flex items-center gap-2 ml-4 border-l border-[var(--neutral-300)] pl-4">
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 text-sm font-medium text-[var(--neutral-600)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]/50 transition-all duration-200"
            >
              <User size={20} className="transition-transform duration-200 group-hover:scale-110" />
              <span className="hidden sm:inline">Profil</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[var(--background)]/90 backdrop-blur-md border border-[var(--neutral-300)] py-1 animate-fade-in">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-[var(--neutral-600)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]/50 transition-all duration-200"
                  onClick={() => setShowUserMenu(false)}
                >
                  Mon Profil
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-[var(--neutral-600)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-2">
                    <LogOut size={16} />
                    <span>Déconnexion</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 text-sm font-medium text-[var(--neutral-600)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]/50 transition-all duration-200"
            >
              <LogIn size={20} className="transition-transform duration-200 group-hover:scale-110" />
              <span className="hidden sm:inline">Connexion</span>
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 text-sm font-medium text-[var(--neutral-600)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]/50 transition-all duration-200"
            >
              <UserPlus size={20} className="transition-transform duration-200 group-hover:scale-110" />
              <span className="hidden sm:inline">Inscription</span>
            </Link>
          </>
        )}
      </div>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full px-4 py-4">
      <div className="flex items-center justify-center">
        <div className="flex gap-2 md:gap-4 rounded-xl border border-[var(--neutral-400)] bg-[var(--background)]/80 px-4 sm:px-6 py-2 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-[var(--background)]/90">
          {renderNavItems()}
          {renderAuthSection()}
        </div>
      </div>
    </nav>
  );
} 