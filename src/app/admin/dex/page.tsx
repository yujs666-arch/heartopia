"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { CATEGORY_META, type Item, type ItemCategory } from "@/types/item";
import { addItem, getAllItems, deleteItem } from "@/lib/items";
import { useAuth } from "@/contexts/AuthContext";
import { Trash2, Plus, ChevronDown } from "lucide-react";

const EMPTY_FORM = {
  name: "",
  category: "fish" as ItemCategory,
  description: "",
  rarity: "" as unknown as number,
  sellPrice: "" as unknown as number,
  buyPrice: "" as unknown as number,
  location: "",
  timeCondition: "",
  weatherCondition: "",
  level: "" as unknown as number,
  image: "",
};

export default function AdminDexPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [filterCat, setFilterCat] = useState<ItemCategory | "all">("all");

  const load = async () => {
    const data = await getAllItems();
    setItems(data.sort((a, b) => a.name.localeCompare(b.name, "ko")));
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      await addItem({
        name: form.name.trim(),
        category: form.category,
        description: form.description || undefined,
        rarity: form.rarity ? Number(form.rarity) as 1|2|3|4|5 : undefined,
        sellPrice: form.sellPrice ? Number(form.sellPrice) : undefined,
        buyPrice: form.buyPrice ? Number(form.buyPrice) : undefined,
        location: form.location ? form.location.split(",").map((s) => s.trim()) : undefined,
        timeCondition: form.timeCondition || undefined,
        weatherCondition: form.weatherCondition || undefined,
        level: form.level ? Number(form.level) : undefined,
        image: form.image || undefined,
        status: "approved",
        submittedBy: user?.uid,
      });
      setForm(EMPTY_FORM);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("삭제할까요?")) return;
    await deleteItem(id);
    await load();
  };

  const filtered = filterCat === "all" ? items : items.filter((i) => i.category === filterCat);

  if (!user) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">로그인이 필요해요.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 p-6 space-y-6">

          <h1 className="text-2xl font-bold text-foreground">아이템 관리</h1>

          {/* Add Form */}
          <div className="bg-white border border-border rounded-2xl p-6">
            <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-primary" /> 새 아이템 추가
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-3 gap-4">

              {/* 카테고리 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">카테고리 *</label>
                <div className="relative">
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as ItemCategory })}
                    className="w-full appearance-none px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {(Object.entries(CATEGORY_META) as [ItemCategory, { label: string }][]).map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* 이름 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">이름 *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="예: 은어" required
                  className="px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>

              {/* 희귀도 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">희귀도 (1~5)</label>
                <input value={form.rarity} onChange={(e) => setForm({ ...form, rarity: e.target.value as unknown as number })}
                  type="number" min={1} max={5} placeholder="예: 3"
                  className="px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>

              {/* 판매가 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">판매가 (G)</label>
                <input value={form.sellPrice} onChange={(e) => setForm({ ...form, sellPrice: e.target.value as unknown as number })}
                  type="number" min={0} placeholder="예: 500"
                  className="px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>

              {/* 구매가 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">구매가 (G)</label>
                <input value={form.buyPrice} onChange={(e) => setForm({ ...form, buyPrice: e.target.value as unknown as number })}
                  type="number" min={0} placeholder="예: 200"
                  className="px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>

              {/* 레벨 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">해금 레벨</label>
                <input value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value as unknown as number })}
                  type="number" min={1} placeholder="예: 5"
                  className="px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>

              {/* 위치 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">획득 위치 (쉼표로 구분)</label>
                <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="예: 강, 호수"
                  className="px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>

              {/* 시간 조건 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">시간 조건</label>
                <input value={form.timeCondition} onChange={(e) => setForm({ ...form, timeCondition: e.target.value })}
                  placeholder="예: 오전 6시~오후 6시"
                  className="px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>

              {/* 날씨 조건 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">날씨 조건</label>
                <input value={form.weatherCondition} onChange={(e) => setForm({ ...form, weatherCondition: e.target.value })}
                  placeholder="예: 맑음"
                  className="px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>

              {/* 이미지 URL */}
              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-xs font-medium text-muted-foreground">이미지 URL</label>
                <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                  className="px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>

              {/* 설명 */}
              <div className="flex flex-col gap-1.5 col-span-full">
                <label className="text-xs font-medium text-muted-foreground">설명</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2} placeholder="아이템 설명..."
                  className="px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              </div>

              <div className="col-span-full flex justify-end">
                <button type="submit" disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors">
                  {saving ? "저장 중..." : "아이템 추가"}
                </button>
              </div>
            </form>
          </div>

          {/* Item List */}
          <div className="bg-white border border-border rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-sm font-bold text-foreground">등록된 아이템 ({items.length})</h2>
              <div className="relative">
                <select value={filterCat} onChange={(e) => setFilterCat(e.target.value as ItemCategory | "all")}
                  className="appearance-none pl-3 pr-8 py-1.5 rounded-xl border border-border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option value="all">전체</option>
                  {(Object.entries(CATEGORY_META) as [ItemCategory, { label: string }][]).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">아직 등록된 아이템이 없어요.</div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground">이름</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">카테고리</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">희귀도</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">판매가</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">위치</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((item) => {
                    const m = CATEGORY_META[item.category];
                    return (
                      <tr key={item.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="px-6 py-3 font-medium text-foreground">{item.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{m.emoji} {m.label}</td>
                        <td className="px-4 py-3 text-amber-400">{"★".repeat(item.rarity ?? 0)}</td>
                        <td className="px-4 py-3 text-muted-foreground">{item.sellPrice ? `${item.sellPrice.toLocaleString()}G` : "-"}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{item.location?.join(", ") ?? "-"}</td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 text-muted-foreground transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}
