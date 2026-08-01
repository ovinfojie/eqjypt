"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Clock, ChevronLeft, ChevronRight, Flame, Eye, Users } from "lucide-react"

/* ─── Types ─── */
type AuctionStatus = "live" | "upcoming" | "ended"

interface AuctionSession {
  id: string
  title: string
  organizer: string
  status: AuctionStatus
  bidType: string
  startTime: string
  endTime: string
  countdown: string
  goodsCount: number
  viewCount: number
  bidderCount: number
  totalQty: string
  startPrice: string
  tags: string[]
  categoryColor: string
}

/* ─── Mock data ─── */
const sessions: AuctionSession[] = [
  {
    id: "a001", title: "2026年春季粮食竞价专场（第12期）", organizer: "广东省粮食交易中心",
    status: "live", bidType: "升价拍", startTime: "2026-04-20 10:00", endTime: "2026-04-20 16:00",
    countdown: "02:18:44", goodsCount: 6, viewCount: 1842, bidderCount: 38,
    totalQty: "8600吨", startPrice: "2010元/吨", tags: ["担保交易", "组合销售"],
    categoryColor: "#1a5fa8",
  },
  {
    id: "a002", title: "惠州新供销荔枝专场竞价（2026春）", organizer: "惠州新供销天润农产品有限公司",
    status: "live", bidType: "降价拍", startTime: "2026-04-20 09:00", endTime: "2026-04-20 18:00",
    countdown: "04:52:11", goodsCount: 3, viewCount: 962, bidderCount: 21,
    totalQty: "3200吨", startPrice: "6800元/吨", tags: ["担保交易"],
    categoryColor: "#e8831a",
  },
  {
    id: "a003", title: "广州新供销天润米业丝苗米竞价", organizer: "广州新供销天润米业有限公司",
    status: "live", bidType: "升价拍", startTime: "2026-04-20 14:00", endTime: "2026-04-21 10:00",
    countdown: "20:04:03", goodsCount: 4, viewCount: 554, bidderCount: 15,
    totalQty: "5000吨", startPrice: "1950元/吨", tags: ["担保交易", "定购竞销"],
    categoryColor: "#3a8c3f",
  },
  {
    id: "a004", title: "2026年粤西冻品水产联合竞价专场", organizer: "广东粤西水产交易中心",
    status: "upcoming", bidType: "升价拍", startTime: "2026-04-22 09:30", endTime: "2026-04-22 17:00",
    countdown: "距开始 1天 15:30", goodsCount: 8, viewCount: 321, bidderCount: 0,
    totalQty: "12000吨", startPrice: "3200元/吨", tags: ["担保交易", "组合销售"],
    categoryColor: "#1a5fa8",
  },
  {
    id: "a005", title: "特色农产品产地直采竞价（梅州专场）", organizer: "梅州市供销社联合社",
    status: "upcoming", bidType: "升价拍", startTime: "2026-04-23 10:00", endTime: "2026-04-23 16:00",
    countdown: "距开始 2天 16:00", goodsCount: 5, viewCount: 188, bidderCount: 0,
    totalQty: "2800吨", startPrice: "4500元/吨", tags: ["担保交易"],
    categoryColor: "#6b21a8",
  },
  {
    id: "a006", title: "2026年第8期粮食定购竞销专场", organizer: "广东省粮食交易中心",
    status: "upcoming", bidType: "密封拍", startTime: "2026-04-25 09:00", endTime: "2026-04-25 15:00",
    countdown: "距开始 4天 15:00", goodsCount: 6, viewCount: 97, bidderCount: 0,
    totalQty: "9000吨", startPrice: "2050元/吨", tags: ["定购竞销"],
    categoryColor: "#1a5fa8",
  },
  {
    id: "a007", title: "2026年春季蔬菜联合竞价（第5期）", organizer: "广东农产品交易中心",
    status: "ended", bidType: "升价拍", startTime: "2026-04-15 09:00", endTime: "2026-04-15 17:00",
    countdown: "已结束", goodsCount: 7, viewCount: 2341, bidderCount: 54,
    totalQty: "6800吨", startPrice: "1200元/吨", tags: ["担保交易"],
    categoryColor: "#3a8c3f",
  },
  {
    id: "a008", title: "南雄板鸭春季专场竞价（第3期）", organizer: "南雄市供销社联合社",
    status: "ended", bidType: "升价拍", startTime: "2026-04-10 10:00", endTime: "2026-04-10 16:00",
    countdown: "已结束", goodsCount: 2, viewCount: 876, bidderCount: 29,
    totalQty: "450吨", startPrice: "28000元/吨", tags: ["担保交易"],
    categoryColor: "#e8831a",
  },
]

const STATUS_CONFIG = {
  live:     { label: "进行中", bg: "bg-[#e8f9f0]", text: "text-[#1a8a3f]", dot: "bg-[#1a8a3f]", border: "border-[#3a8c3f]" },
  upcoming: { label: "即将开始", bg: "bg-[#fff7ed]", text: "text-[#e8831a]", dot: "bg-[#e8831a]", border: "border-[#e8831a]" },
  ended:    { label: "已结束", bg: "bg-[#f5f5f5]", text: "text-[#999]", dot: "bg-[#ccc]", border: "border-[#dde3ec]" },
}

const BID_TYPE_COLOR: Record<string, string> = {
  "升价拍": "bg-[#e8f4fd] text-[#1a5fa8]",
  "降价拍": "bg-[#fff0f0] text-[#cc3333]",
  "密封拍": "bg-[#f5f0ff] text-[#6b21a8]",
}

/* ─── Sub-components ─── */
function CountdownBadge({ text, status }: { text: string; status: AuctionStatus }) {
  if (status !== "live") return (
    <span className="flex items-center gap-1 text-[12px] text-[#999]">
      <Clock className="w-3.5 h-3.5" />{text}
    </span>
  )
  return (
    <span className="flex items-center gap-1.5 text-[13px] font-mono font-bold text-[#cc2222]">
      <span className="w-2 h-2 rounded-full bg-[#cc2222] animate-pulse" />
      剩余 {text}
    </span>
  )
}

function SessionCard({ s }: { s: AuctionSession }) {
  const cfg = STATUS_CONFIG[s.status]
  return (
    <div className={`bg-white rounded-lg border ${cfg.border} overflow-hidden hover:shadow-md transition-shadow`}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#f8fafc] border-b border-[#e8edf5]">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${cfg.bg} ${cfg.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </span>
          <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${BID_TYPE_COLOR[s.bidType] ?? "bg-[#f0f0f0] text-[#666]"}`}>
            {s.bidType}
          </span>
        </div>
        <CountdownBadge text={s.countdown} status={s.status} />
      </div>

      {/* Body */}
      <div className="px-4 py-3">
        <Link href={`/portal/jingjia-jiaoyi/${s.id}`} className="block">
          <h3 className="text-[15px] font-semibold text-[#1a1a2e] mb-1 hover:text-[#1a5fa8] line-clamp-1">{s.title}</h3>
        </Link>
        <p className="text-[12px] text-[#6b7c93] mb-3">{s.organizer}</p>

        <div className="grid grid-cols-3 gap-2 mb-3 text-center">
          <div className="bg-[#f5f7fa] rounded p-2">
            <div className="text-[13px] font-bold text-[#1a5fa8]">{s.goodsCount}</div>
            <div className="text-[11px] text-[#999] mt-0.5">竞拍商品</div>
          </div>
          <div className="bg-[#f5f7fa] rounded p-2">
            <div className="text-[13px] font-bold text-[#1a5fa8]">{s.totalQty}</div>
            <div className="text-[11px] text-[#999] mt-0.5">总量</div>
          </div>
          <div className="bg-[#f5f7fa] rounded p-2">
            <div className="text-[13px] font-bold text-[#e8831a]">{s.startPrice}</div>
            <div className="text-[11px] text-[#999] mt-0.5">起拍价</div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3 text-[12px] text-[#6b7c93]">
          <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{s.viewCount}</span>
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{s.bidderCount} 人参拍</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{s.startTime}</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {s.tags.map((t) => (
            <span key={t} className="px-2 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[11px] rounded">{t}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-[#e8edf5] flex items-center justify-end">
        <Link
          href={`/portal/jingjia-jiaoyi/${s.id}`}
          className={`px-4 py-1.5 rounded text-[13px] font-medium transition-colors ${
            s.status === "live"
              ? "bg-[#cc2222] text-white hover:bg-[#aa1111]"
              : s.status === "upcoming"
              ? "bg-[#1a5fa8] text-white hover:bg-[#0d4a8a]"
              : "border border-[#dde3ec] text-[#666] hover:bg-[#f5f7fa]"
          }`}
        >
          {s.status === "live" ? "立即参拍" : s.status === "upcoming" ? "查看详情" : "查看结果"}
        </Link>
      </div>
    </div>
  )
}

/* ─── Page ─── */
export default function JingjiaJiaoyiPage() {
  const [activeTab, setActiveTab] = useState<AuctionStatus>("live")

  const liveSessions     = sessions.filter((s) => s.status === "live")
  const upcomingSessions = sessions.filter((s) => s.status === "upcoming")
  const endedSessions    = sessions.filter((s) => s.status === "ended")

  const tabMap: { key: AuctionStatus; label: string; count: number }[] = [
    { key: "live",     label: "进行中",   count: liveSessions.length },
    { key: "upcoming", label: "即将开始", count: upcomingSessions.length },
    { key: "ended",    label: "已结束",   count: endedSessions.length },
  ]

  const displayed = activeTab === "live" ? liveSessions : activeTab === "upcoming" ? upcomingSessions : endedSessions

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">

        {/* Hero Banner */}
        <div className="relative w-full h-[220px] flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0d2a52 0%, #1a5fa8 55%, #1e7fc4 100%)" }}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.05) 20px, rgba(255,255,255,0.05) 40px)" }} />
          {/* Decorative circles */}
          <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-white/10" />
          <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white/10" />
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame className="w-7 h-7 text-[#f97316]" />
              <h1 className="text-[40px] font-bold text-white tracking-wide">竞价交易</h1>
              <Flame className="w-7 h-7 text-[#f97316]" />
            </div>
            <p className="text-[15px] text-white/75 mb-5">升价拍 · 降价拍 · 密封拍 · 多种灵活竞价模式</p>
            <div className="flex items-center justify-center gap-4">
              {[
                { label: "进行中专场", value: liveSessions.length + " 个" },
                { label: "即将开始",   value: upcomingSessions.length + " 个" },
                { label: "参拍企业",   value: "200+ 家" },
              ].map((s) => (
                <div key={s.label} className="px-5 py-1.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-center">
                  <span className="text-white font-bold text-[15px]">{s.value}</span>
                  <span className="text-white/70 text-[12px] ml-1.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tab + Grid */}
        <div className="max-w-[1100px] mx-auto px-6 py-8">

          {/* Tabs */}
          <div className="flex items-center gap-1 mb-6 border-b border-[#dde3ec]">
            {tabMap.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-5 py-2.5 text-[14px] font-medium border-b-2 transition-colors -mb-px ${
                  activeTab === t.key
                    ? "border-[#1a5fa8] text-[#1a5fa8]"
                    : "border-transparent text-[#666] hover:text-[#1a5fa8]"
                }`}
              >
                {t.label}
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[11px] ${
                  activeTab === t.key ? "bg-[#1a5fa8] text-white" : "bg-[#e8edf5] text-[#666]"
                }`}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          {/* Session grid */}
          {displayed.length === 0 ? (
            <div className="text-center py-20 text-[#999] text-[14px]">暂无相关竞价专场</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayed.map((s) => <SessionCard key={s.id} s={s} />)}
            </div>
          )}

          {/* Pagination */}
          {displayed.length > 0 && (
            <div className="flex items-center justify-center gap-1 mt-8">
              <button className="w-8 h-8 flex items-center justify-center border border-[#dde3ec] rounded text-[#666] hover:border-[#1a5fa8] hover:text-[#1a5fa8]">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {[1].map((n) => (
                <button key={n} className="w-8 h-8 flex items-center justify-center rounded text-[13px] bg-[#1a5fa8] text-white font-semibold">
                  {n}
                </button>
              ))}
              <button className="w-8 h-8 flex items-center justify-center border border-[#dde3ec] rounded text-[#666] hover:border-[#1a5fa8] hover:text-[#1a5fa8]">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
