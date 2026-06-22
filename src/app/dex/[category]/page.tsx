"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { CATEGORY_META, type Item, type ItemCategory } from "@/types/item";
import { getItemsByCategory } from "@/lib/items";
import Link from "next/link";
import { Search, Plus } from "lucide-react";

function RarityStars({ rarity }: { rarity?: number }) {
  if (!rarity) return null;
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-xs ${i < rarity ? "text-amber-400" : "text-gray-200"}`}>★</span>
      ))}
    </div>
  );
}

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as ItemCategory;
  const meta = CATEGORY_META[category];

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!category || !meta) return;
    getItemsByCategory(category)
      .then(setItems)
      .finally(() => setLoading(false));
  }, [category, meta]);

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!meta) return <div className="p-8">존재하지 않는 카테고리예요.</div>;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 p-6">

          {/* Breadcrumb + Title */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Link href="/dex" className="hover:text-primary">도감</Link>
                <span>/</span>
                <span className="text-foreground font-medium">{meta.label}</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <span>{meta.emoji}</span> {meta.label}
                <span className="text-sm font-normal text-muted-foreground">({items.length}종)</span>
              </h1>
            </div>
            <Link
              href="/admin/dex"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" /> 아이템 추가
            </Link>
          </div>

          {/* Search */}
          <div className="relative max-w-sm mb-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`${meta.label} 검색...`}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
            />
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-white border border-border p-4 animate-pulse">
                  <div className="w-full aspect-square rounded-xl bg-secondary mb-3" />
                  <div className="h-4 bg-secondary rounded mb-2" />
                  <div className="h-3 bg-secondary rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="text-5xl mb-4">{meta.emoji}</span>
              <p className="text-sm font-medium text-foreground mb-1">
                {search ? "검색 결과가 없어요" : "아직 등록된 아이템이 없어요"}
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                {search ? "다른 키워드로 검색해보세요" : "관리자 페이지에서 아이템을 추가해주세요"}
              </p>
              {!search && (
                <Link href="/admin/dex" className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                  아이템 추가하기
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filtered.map((item) => (
                <Link
                  key={item.id}
                  href={`/dex/${category}/${item.id}`}
                  className="group flex flex-col rounded-2xl bg-white border border-border hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden"
                >
                  {/* Image */}
                  <div className={`w-full aspect-square ${meta.bg} flex items-center justify-center text-4xl`}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>{meta.emoji}</span>
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-3">
                    <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                    <RarityStars rarity={item.rarity} />
                    {item.sellPrice && (
                      <p className="text-xs text-muted-foreground mt-1">💰 {item.sellPrice.toLocaleString()}G</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
