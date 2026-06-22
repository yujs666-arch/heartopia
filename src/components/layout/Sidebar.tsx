"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  MessageSquare,
  Trophy,
  User,
  Settings,
  Heart,
  Bell,
  Bookmark,
} from "lucide-react";

const navItems = [
  { href: "/",          icon: Home,           label: "홈" },
  { href: "/dex",       icon: BookOpen,       label: "도감" },
  { href: "/community", icon: MessageSquare,  label: "커뮤니티" },
  { href: "/ranking",   icon: Trophy,         label: "랭킹" },
  { href: "/saved",     icon: Bookmark,       label: "저장됨" },
  { href: "/profile",   icon: User,           label: "프로필" },
  { href: "/settings",  icon: Settings,       label: "설정" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-56 min-h-screen bg-sidebar border-r border-sidebar-border shrink-0">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-base font-bold text-foreground tracking-tight">하트오피아</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                ${active
                  ? "bg-sidebar-accent text-sidebar-primary font-semibold"
                  : "text-sidebar-foreground hover:bg-secondary hover:text-foreground"
                }`}
            >
              <Icon className={`w-4.5 h-4.5 shrink-0 ${active ? "text-primary" : ""}`} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 pb-6 pt-4 space-y-3 border-t border-sidebar-border mt-4">
        <button className="w-full py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google로 로그인
        </button>
        <div className="flex items-center gap-2 px-1">
          <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">게스트</p>
            <p className="text-[10px] text-muted-foreground">로그인이 필요해요</p>
          </div>
          <Bell className="w-4 h-4 text-muted-foreground shrink-0" />
        </div>
      </div>
    </aside>
  );
}
