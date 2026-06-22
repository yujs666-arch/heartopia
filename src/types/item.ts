export type ItemCategory =
  | "fish"
  | "insect"
  | "bird"
  | "recipe"
  | "flower"
  | "furniture"
  | "material"
  | "pet";

export type ItemStatus = "approved" | "pending";

export interface Item {
  id: string;
  category: ItemCategory;
  name: string;
  image?: string;
  description?: string;
  rarity?: 1 | 2 | 3 | 4 | 5;
  sellPrice?: number;
  buyPrice?: number;
  location?: string[];
  timeCondition?: string;
  weatherCondition?: string;
  level?: number;
  // 꽃/작물 전용
  growthTime?: string;
  starPrices?: Record<string, number>;
  // 요리 전용
  ingredients?: string[];
  // 가구 전용
  theme?: string;
  status: ItemStatus;
  submittedBy?: string;
  createdAt?: number;
  updatedAt?: number;
}

export const CATEGORY_META: Record<ItemCategory, { label: string; emoji: string; color: string; bg: string }> = {
  fish:      { label: "물고기",    emoji: "🐟", color: "text-blue-500",   bg: "bg-blue-50"   },
  insect:    { label: "곤충",      emoji: "🦋", color: "text-green-600",  bg: "bg-green-50"  },
  bird:      { label: "새",        emoji: "🐦", color: "text-sky-500",    bg: "bg-sky-50"    },
  recipe:    { label: "요리",      emoji: "🍳", color: "text-orange-500", bg: "bg-orange-50" },
  flower:    { label: "꽃",        emoji: "🌸", color: "text-pink-500",   bg: "bg-pink-50"   },
  furniture: { label: "가구",      emoji: "🪑", color: "text-amber-600",  bg: "bg-amber-50"  },
  material:  { label: "재료",      emoji: "🪵", color: "text-stone-500",  bg: "bg-stone-50"  },
  pet:       { label: "반려동물",  emoji: "🐱", color: "text-purple-500", bg: "bg-purple-50" },
};
