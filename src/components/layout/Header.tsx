import { Search, Bell } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center gap-4 px-8 py-4 border-b border-border/60 bg-card/40 backdrop-blur-sm sticky top-0 z-10">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="아이템, 캐릭터, 공략 검색..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background/60 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-secondary transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
