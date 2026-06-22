"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  MessageSquare,
  Trophy,
  User,
  Settings,
  Heart,
} from "lucide-react";

const navItems = [
  { href: "/dex",       icon: BookOpen,       label: "도감" },
  { href: "/community", icon: MessageSquare,  label: "커뮤니티" },
  { href: "/ranking",   icon: Trophy,         label: "랭킹" },
  { href: "/profile",   icon: User,           label: "프로필" },
  { href: "/settings",  icon: Settings,       label: "설정" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-sidebar text-sidebar-foreground shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-pink/20">
          <Heart className="w-5 h-5 text-brand-pink fill-brand-pink" />
        </div>
        <span className="text-lg font-bold text-white tracking-tight">하트오피아</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${active
                  ? "bg-sidebar-accent text-white"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-white"
                }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Login button */}
      <div className="px-4 pb-6">
        <button className="w-full py-3 rounded-xl bg-brand-pink text-white text-sm font-semibold hover:bg-brand-pink/90 transition-colors">
          Google로 로그인
        </button>
      </div>
    </aside>
  );
}
