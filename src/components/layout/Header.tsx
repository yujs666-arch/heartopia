import { Search, SlidersHorizontal } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center gap-4 px-8 py-4 border-b border-border bg-background sticky top-0 z-10">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="아이템, 캐릭터, 공략 검색..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-secondary border border-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
        />
      </div>
      <button className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-secondary text-muted-foreground text-sm hover:text-foreground hover:bg-accent transition-colors">
        <SlidersHorizontal className="w-3.5 h-3.5" />
        필터
      </button>
    </header>
  );
}
