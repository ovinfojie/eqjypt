"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RefreshCw, ChevronLeft, ChevronRight, Eye } from "lucide-react"

/* ─── Types ─── */
interface Category {
  id: string
  name: string
  img: string
  live: number
  upcoming: number
  ended: number
}

interface SessionRow {
  id: string
  catId: string
  title: string
  organizer: string
  status: "live" | "upcoming" | "ended"
  bidType: string
  countdown: string
  countdownParts?: { h: number; m: number; s: number }
  thumb: string
  goods: { name: string; img: string }[]
  totalQty: string
  viewCount: number
  registered: boolean
}

/* ─── Data ─── */
const CATEGORIES: Category[] = [
  { id: "grain",    name: "粮食",       img: "/images/jingjia/grain.png",       live: 3, upcoming: 2, ended: 1 },
  { id: "frozen",   name: "冻肉",       img: "/images/jingjia/frozen-meat.png", live: 2, upcoming: 1, ended: 2 },
  { id: "seafood",  name: "水产",       img: "/images/jingjia/seafood.png",     live: 6, upcoming: 1, ended: 0 },
  { id: "egg",      name: "禽蛋",       img: "/images/products/eggs.png",       live: 1, upcoming: 1, ended: 1 },
  { id: "rice",     name: "粉米",       img: "/images/jingjia/rice-flour.png",  live: 3, upcoming: 2, ended: 0 },
  { id: "veg",      name: "蔬菜",       img: "/images/jingjia/vegetable.png",   live: 3, upcoming: 1, ended: 0 },
  { id: "fruit",    name: "水果",       img: "/images/jingjia/fruit.png",       live: 3, upcoming: 2, ended: 1 },
  { id: "special",  name: "更多特色农产品", img: "/images/jingjia/specialty.png", live: 3, upcoming: 0, ended: 2 },
  { id: "agrisup",  name: "农资",       img: "/images/jingjia/agri-supply.png", live: 3, upcoming: 1, ended: 1 },
]

const SESSIONS: SessionRow[] = [
  {
    id: "a001", catId: "grain", title: "某某库玉米竞价出库",
    organizer: "广东省供销纳天米粮食有限公司", status: "live",
    bidType: "普通竞购", countdown: "正在进行（第13场）",
    countdownParts: { h: 0, m: 1, s: 38 },
    thumb: "/images/jingjia/grain.png",
    goods: [{ name: "包谷", img: "/images/jingjia/grain.png" }, { name: "粗米", img: "/images/jingjia/rice-flour.png" }, { name: "玉米", img: "/images/jingjia/grain.png" }],
    totalQty: "2000吨", viewCount: 260, registered: true,
  },
  {
    id: "a002", catId: "frozen", title: "四会库粮食竞价交易",
    organizer: "广东省供销纳天天米粮食公司", status: "live",
    bidType: "定向竞购", countdown: "正在进行（第23场）",
    countdownParts: { h: 1, m: 25, s: 38 },
    thumb: "/images/jingjia/frozen-meat.png",
    goods: [{ name: "冻猪腿", img: "/images/jingjia/frozen-meat.png" }, { name: "猪蹄（优）", img: "/images/jingjia/frozen-meat.png" }, { name: "洗排骨", img: "/images/jingjia/frozen-meat.png" }],
    totalQty: "2000吨", viewCount: 260, registered: false,
  },
  {
    id: "a003", catId: "seafood", title: "XX库冻品竞价交易",
    organizer: "广东省供销纳天天米粮食公司", status: "upcoming",
    bidType: "普通竞购", countdown: "即将开始",
    countdownParts: { h: 0, m: 12, s: 25 },
    thumb: "/images/jingjia/seafood.png",
    goods: [{ name: "冻猪腿", img: "/images/jingjia/seafood.png" }, { name: "猪蹄（优）", img: "/images/jingjia/seafood.png" }, { name: "洗排骨", img: "/images/jingjia/seafood.png" }],
    totalQty: "2000吨", viewCount: 260, registered: false,
  },
  {
    id: "a004", catId: "grain", title: "某某库玉米竞价出库",
    organizer: "广东省供销纳天天米粮食公司", status: "upcoming",
    bidType: "普通竞购", countdown: "即将开始",
    countdownParts: { h: 4, m: 25, s: 38 },
    thumb: "/images/jingjia/grain.png",
    goods: [{ name: "包谷", img: "/images/jingjia/grain.png" }, { name: "玉米", img: "/images/jingjia/grain.png" }, { name: "粗米", img: "/images/jingjia/rice-flour.png" }],
    totalQty: "2000吨", viewCount: 260, registered: true,
  },
  {
    id: "a005", catId: "grain", title: "某某库大豆竞价出库",
    organizer: "广东省供销纳天天米农业有限公司", status: "ended",
    bidType: "组合竞购", countdown: "已结束",
    thumb: "/images/jingjia/grain.png",
    goods: [{ name: "大豆", img: "/images/jingjia/grain.png" }],
    totalQty: "2000吨", viewCount: 260, registered: false,
  },
  {
    id: "a006", catId: "grain", title: "某某库稻谷组合竞价出库",
    organizer: "广东省供销纳天天米粮食公司", status: "ended",
    bidType: "组合竞购", countdown: "已结束",
    thumb: "/images/jingjia/grain.png",
    goods: [{ name: "稻谷", img: "/images/jingjia/grain.png" }, { name: "小麦", img: "/images/jingjia/grain.png" }, { name: "水稻", img: "/images/jingjia/grain.png" }],
    totalQty: "2000吨", viewCount: 260, registered: false,
  },
]

const NOTICES = [
  "【JP2512240009】仲恺库采购420吨福湘柱卡白米专场竞价交易公告",
  "【JP2512240008】2025年12月29日（15:00）四西库粮食竞价交易",
  "【JP2512240006】仲恺库采购420吨福湘柱卡白米专场竞价交易公告",
  "【JP2512170003】仲恺库采购420吨福湘柱卡白米专场竞价交易公告",
]
const AWARDS = [
  "【JP2512170003】2025年12月22日惠州基地库粮食竞价交易交易专场结拍",
  "【JP2512150002】2025年12月17日10点南沙库销售竞价交易专场结拍",
  "【JP2512170002】2025年12月22日惠州基地库粮食竞价交易交易专场结拍",
  "【JP2512121002】2025年12月17日10点南沙库销售竞价交易专场结拍",
]

/* ─── Countdown display ─── */
function CountdownTimer({ h, m, s, label, color }: { h: number; m: number; s: number; label: string; color: "red" | "orange" | "blue" }) {
  const [time, setTime] = useState({ h, m, s })
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev
        s--
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) { h = 0; m = 0; s = 0 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const boxColor = color === "red" ? "bg-[#cc2222] text-white" : color === "orange" ? "bg-[#e8831a] text-white" : "bg-[#1a5fa8] text-white"
  const labelColor = color === "red" ? "text-[#cc2222]" : color === "orange" ? "text-[#e8831a]" : "text-[#1a5fa8]"

  return (
    <div className="flex items-center gap-1">
      <span className={`text-[12px] font-medium ${labelColor} mr-0.5`}>{label}</span>
      {[String(time.h).padStart(2, "0"), String(time.m).padStart(2, "0"), String(time.s).padStart(2, "0")].map((v, i) => (
        <span key={i} className="flex items-center gap-0.5">
          <span className={`inline-flex items-center justify-center w-7 h-6 rounded text-[14px] font-bold font-mono ${boxColor}`}>{v[0]}</span>
          <span className={`inline-flex items-center justify-center w-7 h-6 rounded text-[14px] font-bold font-mono ${boxColor}`}>{v[1]}</span>
          {i < 2 && <span className={`text-[14px] font-bold ${labelColor} mx-0.5`}>:</span>}
        </span>
      ))}
    </div>
  )
}

/* ─── Category card (看专区 view) ─── */
function CategoryCard({ cat }: { cat: Category }) {
  return (
    <Link href={`/portal/jingjia-jiaoyi/zone/${cat.id}`} className="block group">
      <div className="bg-white rounded-lg overflow-hidden border border-[#dde3ec] hover:shadow-md hover:border-[#1a5fa8] transition-all">
        <div className="relative h-[140px] overflow-hidden">
          <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-2 left-3 text-white font-bold text-[18px]">{cat.name}</div>
        </div>
        <div className="px-3 py-2.5">
          <div className="flex items-center gap-3 text-[12px] mb-2.5">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              <span className="text-[#666]">进行中 <span className="font-bold text-[#1a1a2e]">{cat.live}</span> 场</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8831a]" />
              <span className="text-[#666]">即将 <span className="font-bold text-[#1a1a2e]">{cat.upcoming}</span> 场</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccc]" />
              <span className="text-[#666]">已结束 <span className="font-bold text-[#1a1a2e]">{cat.ended}</span> 场</span>
            </span>
          </div>
          <div className="text-center text-[13px] text-[#1a5fa8] border border-[#1a5fa8] rounded py-1 group-hover:bg-[#1a5fa8] group-hover:text-white transition-colors">
            进入专区 →
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ─── Session row card (看专场 view) ─── */
function SessionRowCard({ s }: { s: SessionRow }) {
  const isLive = s.status === "live"
  const isUpcoming = s.status === "upcoming"
  const isEnded = s.status === "ended"

  return (
    <div className={`bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow ${isLive ? "border-[#dde3ec]" : "border-[#dde3ec]"}`}>
      <div className="flex gap-0">
        {/* Left: large thumb + bid type badge */}
        <div className="relative w-[180px] shrink-0">
          <Image src={s.thumb} alt={s.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/20" />
          {/* Bid type badge top-left */}
          <span className={`absolute top-2 left-2 px-2 py-0.5 text-[11px] font-semibold rounded text-white ${
            s.bidType === "定向竞购" ? "bg-[#1a5fa8]" : s.bidType === "组合竞购" ? "bg-[#3a8c3f]" : "bg-[#6b7c93]"
          }`}>{s.bidType}</span>
          {/* Registration status bottom-left */}
          <div className="absolute bottom-2 left-2">
            {s.registered
              ? <span className="px-2 py-0.5 bg-[#22c55e] text-white text-[11px] font-semibold rounded">已报名</span>
              : <span className="px-2 py-0.5 bg-white/80 text-[#666] text-[11px] rounded">未报名</span>
            }
          </div>
          {/* View count */}
          <div className="absolute bottom-2 right-2 flex items-center gap-0.5 text-white text-[11px]">
            <Eye className="w-3 h-3" />{s.viewCount}
          </div>
        </div>

        {/* Middle: info */}
        <div className="flex-1 px-4 py-3 min-w-0">
          <div className="font-semibold text-[#1a1a2e] text-[15px] mb-0.5 truncate">{s.title}</div>
          <div className="text-[12px] text-[#6b7c93] mb-2 truncate">{s.organizer}</div>
          {/* Goods thumbnails */}
          <div className="flex items-center gap-1.5 mb-2">
            {s.goods.slice(0, 3).map((g, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="relative w-9 h-9 rounded overflow-hidden border border-[#e8edf5]">
                  <Image src={g.img} alt={g.name} fill className="object-cover" />
                </div>
                <span className="text-[11px] text-[#666]">{g.name}</span>
              </div>
            ))}
          </div>
          <div className="text-[12px] text-[#666]">总量 <span className="font-semibold text-[#1a1a2e]">{s.totalQty}</span></div>
        </div>

        {/* Right: countdown + button */}
        <div className="w-[200px] shrink-0 flex flex-col items-center justify-center gap-3 border-l border-[#e8edf5] px-4 py-3">
          {isLive && s.countdownParts && (
            <>
              <div className="text-[12px] font-semibold text-[#cc2222]">正在进行（第13场）</div>
              <div className="text-[11px] text-[#999] mb-0.5">拍卖结束：</div>
              <CountdownTimer {...s.countdownParts} label="" color="red" />
            </>
          )}
          {isUpcoming && s.countdownParts && (
            <>
              <div className="text-[12px] font-semibold text-[#e8831a]">即将开始</div>
              <div className="text-[11px] text-[#999] mb-0.5">距开始：</div>
              <CountdownTimer {...s.countdownParts} label="" color="orange" />
            </>
          )}
          {isEnded && (
            <div className="text-[15px] font-bold text-[#999]">已结束</div>
          )}
          <Link
            href={`/portal/jingjia-jiaoyi/${s.id}`}
            className={`mt-1 px-5 py-1.5 rounded text-[13px] font-medium text-white transition-colors ${
              isLive ? "bg-[#cc2222] hover:bg-[#aa1111]" :
              isUpcoming ? "bg-[#1a5fa8] hover:bg-[#0d4a8a]" :
              "bg-[#6b7c93] hover:bg-[#555]"
            }`}
          >
            进入专场
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ─── Page ─── */
export default function JingjiaJiaoyiPage() {
  const [mainTab, setMainTab] = useState<"zone" | "session">("zone")
  const [now, setNow] = useState("")
  const noticeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleString("zh-CN", { hour12: false }))
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">

        {/* ── Hero Banner ── */}
        <div className="relative w-full overflow-hidden" style={{ background: "linear-gradient(135deg, #0a2a52 0%, #1a5fa8 55%, #1279b5 100%)" }}>
          {/* grid texture */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="max-w-[1100px] mx-auto px-6 py-8 flex gap-8">
            {/* Left: title + features */}
            <div className="flex-1 text-white pt-2">
              <h1 className="text-[38px] font-bold mb-1 tracking-wide">竞价交易</h1>
              <p className="text-white/70 text-[14px] mb-5">实时竞价 公开透明</p>
              <div className="flex flex-wrap gap-2">
                {["公告", "公开", "公示"].map((t, i) => (
                  <span key={t} className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[13px] border border-white/20 bg-white/10 ${i === 0 ? "bg-[#e8831a]/80 border-[#e8831a]" : i === 1 ? "bg-[#3a8c3f]/70 border-[#3a8c3f]" : "bg-[#1a5fa8] border-[#1a5fa8]"}`}>
                    <span className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center text-[10px]">{["公","公","公"][i]}</span>{t}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-[12px] text-white/50 leading-relaxed">
                多元化交易模式 | 智能化竞价平台 | 实况视频监管 | 担保交易安全保障<br />
                价格透明公开 | 电子合同服务 | 7×24 小时交付服务 | 数据安全运营
              </div>
            </div>
            {/* Right: notice + award panels */}
            <div className="flex gap-4 w-[560px] shrink-0">
              {/* 竞拍公告 */}
              <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-white font-semibold text-[13px]">
                    <span className="w-4 h-4 bg-[#e8831a] rounded flex items-center justify-center text-[9px] text-white">公</span>
                    竞拍公告
                  </div>
                  <Link href="/portal/jingjia-jiaoyi" className="text-[11px] text-white/60 hover:text-white">全部 →</Link>
                </div>
                <ul className="space-y-1.5">
                  {NOTICES.map((n, i) => (
                    <li key={i} className="text-[11px] text-white/75 hover:text-white cursor-pointer flex items-start gap-1 leading-snug">
                      <span className="shrink-0 mt-0.5">·</span>
                      <span className="line-clamp-1">{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* 中标公示 */}
              <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-white font-semibold text-[13px]">
                    <span className="w-4 h-4 bg-[#3a8c3f] rounded flex items-center justify-center text-[9px] text-white">示</span>
                    中标公示
                  </div>
                  <Link href="/portal/jingjia-jiaoyi" className="text-[11px] text-white/60 hover:text-white">全部 →</Link>
                </div>
                <ul className="space-y-1.5">
                  {AWARDS.map((n, i) => (
                    <li key={i} className="text-[11px] text-white/75 hover:text-white cursor-pointer flex items-start gap-1 leading-snug">
                      <span className="shrink-0 mt-0.5">·</span>
                      <span className="line-clamp-1">{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="max-w-[1100px] mx-auto px-6 py-6">

          {/* Time + Tab switcher row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[13px] text-[#666]">
              <span>北京时间 {now}</span>
              <button className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                <RefreshCw className="w-3 h-3" /> 刷新
              </button>
            </div>
            {/* Tab: 看专区 / 看专场 */}
            <div className="flex rounded overflow-hidden border border-[#dde3ec]">
              <button
                onClick={() => setMainTab("zone")}
                className={`flex items-center gap-1.5 px-5 py-2 text-[13px] font-medium transition-colors ${mainTab === "zone" ? "bg-[#1a5fa8] text-white" : "bg-white text-[#666] hover:bg-[#f5f7fa]"}`}
              >
                ☰ 看专区
              </button>
              <button
                onClick={() => setMainTab("session")}
                className={`flex items-center gap-1.5 px-5 py-2 text-[13px] font-medium transition-colors border-l border-[#dde3ec] ${mainTab === "session" ? "bg-[#1a5fa8] text-white" : "bg-white text-[#666] hover:bg-[#f5f7fa]"}`}
              >
                ☰ 看专场
              </button>
            </div>
          </div>

          {/* ── 看专区 tab ── */}
          {mainTab === "zone" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {CATEGORIES.map((cat) => <CategoryCard key={cat.id} cat={cat} />)}
            </div>
          )}

          {/* ── 看专场 tab ── */}
          {mainTab === "session" && (
            <div className="space-y-3">
              {SESSIONS.map((s) => <SessionRowCard key={s.id} s={s} />)}
              {/* Pagination */}
              <div className="flex items-center justify-between pt-4">
                <span className="text-[13px] text-[#999]">共 {SESSIONS.length} 条</span>
                <div className="flex items-center gap-1">
                  <button className="w-7 h-7 flex items-center justify-center border border-[#dde3ec] rounded text-[#666] hover:border-[#1a5fa8]">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded bg-[#1a5fa8] text-white text-[13px] font-bold">1</button>
                  <button className="w-7 h-7 flex items-center justify-center border border-[#dde3ec] rounded text-[#666] hover:border-[#1a5fa8]">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
