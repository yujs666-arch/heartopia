import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { BookOpen, MessageSquare, Shirt, Utensils, Home, Sparkles } from "lucide-react";
import Link from "next/link";

const dexCategories = [
  { icon: Shirt,    label: "코디 아이템",    count: 0, color: "bg-brand-pink/10 text-brand-pink",         href: "/dex/costume" },
  { icon: Home,     label: "가구 / 인테리어", count: 0, color: "bg-brand-lavender/10 text-brand-lavender", href: "/dex/furniture" },
  { icon: Utensils, label: "요리 레시피",    count: 0, color: "bg-brand-mint/10 text-brand-mint",         href: "/dex/recipe" },
  { icon: Sparkles, label: "NPC / 캐릭터",   count: 0, color: "bg-brand-peach/10 text-brand-peach",       href: "/dex/npc" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <Header />

        <main className="flex-1 px-8 py-8 space-y-10">

          {/* Hero Banner */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-pink/20 via-brand-lavender/20 to-brand-mint/10 border border-border p-10">
            <div className="relative z-10">
              <p className="text-sm font-medium text-primary mb-2">💝 두근두근타운 팬 사이트</p>
              <h1 className="text-3xl font-bold text-foreground mb-3">
                하트오피아에 오신 것을<br />환영합니다!
              </h1>
              <p className="text-muted-foreground mb-6 max-w-md">
                두근두근타운의 아이템 도감, 공략 정보, 커뮤니티를 한 곳에서 만나보세요.
              </p>
              <div className="flex gap-3">
                <Link href="/dex" className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                  도감 보기
                </Link>
                <Link href="/community" className="px-5 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm font-semibold hover:bg-secondary transition-colors">
                  커뮤니티
                </Link>
              </div>
            </div>
            <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-brand-pink/10 blur-2xl pointer-events-none" />
            <div className="absolute -right-4 bottom-0 w-32 h-32 rounded-full bg-brand-lavender/15 blur-xl pointer-events-none" />
          </section>

          {/* Dex Categories */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                도감
              </h2>
              <Link href="/dex" className="text-sm text-primary font-medium hover:underline">
                전체 보기
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {dexCategories.map(({ icon: Icon, label, count, color, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card/70 border border-border backdrop-blur-sm hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{count}개 항목</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Community */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                최근 커뮤니티 글
              </h2>
              <Link href="/community" className="text-sm text-primary font-medium hover:underline">
                전체 보기
              </Link>
            </div>
            <div className="rounded-2xl bg-card/70 border border-border backdrop-blur-sm overflow-hidden">
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                  <MessageSquare className="w-7 h-7 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">아직 게시글이 없어요</p>
                <p className="text-xs text-muted-foreground mb-4">첫 번째 글을 작성해보세요!</p>
                <Link href="/community/write" className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                  글 작성하기
                </Link>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
