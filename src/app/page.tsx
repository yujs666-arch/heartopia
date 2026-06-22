import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { BookOpen, MessageSquare, Shirt, Utensils, Home, Sparkles, Heart, ArrowRight, Users, Star } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <Header />

        <main className="flex-1 p-6">

          {/* Bento Grid */}
          <div className="grid grid-cols-12 gap-4 auto-rows-[minmax(80px,auto)]">

            {/* Hero Card - 8 cols */}
            <div className="col-span-8 row-span-4 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#ffd6e0] via-[#fce4ec] to-[#e8d5f5] p-8 flex flex-col justify-between min-h-[280px]">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-white/60 px-3 py-1 rounded-full mb-4">
                  <Heart className="w-3 h-3 fill-primary" /> 두근두근타운 팬 사이트
                </span>
                <h1 className="text-3xl font-bold text-gray-800 leading-tight mb-3">
                  Find ideas<br />
                  <span className="text-primary">you'll love</span>
                </h1>
                <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                  두근두근타운의 모든 아이템, 공략, 커뮤니티 정보를 한 곳에서 만나보세요.
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <Link href="/dex" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
                  도감 보기 <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/community" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 text-gray-700 text-sm font-semibold hover:bg-white transition-colors">
                  커뮤니티
                </Link>
              </div>
              {/* Decorative blobs */}
              <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-brand-pink/30 blur-3xl pointer-events-none" />
              <div className="absolute right-16 bottom-8 w-24 h-24 rounded-full bg-brand-lavender/40 blur-2xl pointer-events-none" />
              <div className="absolute right-4 -bottom-4 w-32 h-32 rounded-full bg-brand-peach/30 blur-2xl pointer-events-none" />
            </div>

            {/* Stats: 인기 아이템 - 4 cols */}
            <div className="col-span-4 row-span-2 rounded-2xl bg-white border border-border p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-foreground">이번 주 인기</span>
                <Star className="w-4 h-4 text-brand-peach fill-brand-peach" />
              </div>
              <div className="space-y-2.5">
                {["봄날의 원피스", "캠핑 텐트 세트", "딸기 케이크"].map((item, i) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                    <div className="flex-1 h-7 rounded-lg bg-secondary animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Stats: 유저 - 4 cols */}
            <div className="col-span-4 row-span-2 rounded-2xl bg-gradient-to-br from-brand-lavender/15 to-brand-lavender/5 border border-brand-lavender/20 p-5 flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-brand-lavender" />
                <span className="text-sm font-semibold text-foreground">커뮤니티</span>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">0</p>
                <p className="text-xs text-muted-foreground mt-1">등록된 게시글</p>
              </div>
              <Link href="/community" className="text-xs font-semibold text-brand-lavender flex items-center gap-1 hover:underline">
                글 작성하러 가기 <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Dex categories - 5 cards */}
            {[
              { icon: Shirt,    label: "코디",    sub: "아이템",   color: "from-brand-pink/10 to-brand-rose/5",      iconColor: "text-brand-rose",     href: "/dex/costume"   },
              { icon: Home,     label: "가구",    sub: "인테리어", color: "from-brand-peach/15 to-brand-peach/5",    iconColor: "text-brand-peach",    href: "/dex/furniture" },
              { icon: Utensils, label: "레시피",  sub: "요리",     color: "from-brand-mint/10 to-brand-mint/5",      iconColor: "text-brand-mint",     href: "/dex/recipe"    },
              { icon: Sparkles, label: "NPC",     sub: "캐릭터",   color: "from-brand-lavender/15 to-brand-lavender/5", iconColor: "text-brand-lavender", href: "/dex/npc"    },
              { icon: BookOpen, label: "전체",    sub: "도감",     color: "from-secondary to-background",           iconColor: "text-muted-foreground", href: "/dex"          },
            ].map(({ icon: Icon, label, sub, color, iconColor, href }) => (
              <Link
                key={href}
                href={href}
                className={`col-span-3 md:col-span-2 row-span-2 rounded-2xl bg-gradient-to-br ${color} border border-border p-5 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all group`}
              >
                <div className={`w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center shadow-sm ${iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-base font-bold text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </Link>
            ))}

            {/* Community recent posts */}
            <div className="col-span-6 row-span-3 rounded-2xl bg-white border border-border p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  최근 커뮤니티 글
                </h2>
                <Link href="/community" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                  전체 보기 <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-3">
                  <MessageSquare className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">아직 게시글이 없어요</p>
                <p className="text-xs text-muted-foreground">첫 번째 글을 작성해보세요!</p>
              </div>
            </div>

            {/* Quick links card */}
            <div className="col-span-6 row-span-3 rounded-2xl bg-gradient-to-br from-[#fff0f3] to-[#fce4ec] border border-brand-pink/15 p-6">
              <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                빠른 이동
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "공략 게시판",    href: "/community/guide",   emoji: "📖" },
                  { label: "자유 게시판",    href: "/community/free",    emoji: "💬" },
                  { label: "아이템 제보",    href: "/community/report",  emoji: "📝" },
                  { label: "이벤트 정보",    href: "/community/event",   emoji: "🎉" },
                ].map(({ label, href, emoji }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 hover:bg-white border border-white/80 text-sm font-medium text-foreground transition-all hover:shadow-sm"
                  >
                    <span className="text-lg">{emoji}</span>
                    {label}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
