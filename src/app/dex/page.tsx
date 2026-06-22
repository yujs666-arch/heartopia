import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { CATEGORY_META, type ItemCategory } from "@/types/item";
import Link from "next/link";

const ITEM_COUNTS: Record<ItemCategory, number> = {
  fish: 98, insect: 68, bird: 71, recipe: 87,
  flower: 37, furniture: 100, material: 28, pet: 25,
};

export default function DexPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 p-6">

          {/* Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">도감</h1>
            <p className="text-sm text-muted-foreground mt-1">두근두근타운의 모든 아이템 정보를 확인하세요</p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(Object.entries(CATEGORY_META) as [ItemCategory, typeof CATEGORY_META[ItemCategory]][]).map(
              ([key, { label, emoji, color, bg }]) => (
                <Link
                  key={key}
                  href={`/dex/${key}`}
                  className="group flex flex-col gap-4 p-6 rounded-2xl bg-white border border-border hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center text-2xl`}>
                    {emoji}
                  </div>
                  <div>
                    <p className={`text-base font-bold ${color}`}>{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">총 {ITEM_COUNTS[key]}종</p>
                  </div>
                </Link>
              )
            )}
          </div>

        </main>
      </div>
    </div>
  );
}
