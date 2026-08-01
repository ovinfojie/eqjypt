"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ChevronLeft, RefreshCw, Search, RotateCcw, ChevronRight, Eye, Users } from "lucide-react"

/* ─── Types ─── */
type SessionStatus = "live" | "upcoming" | "ended"

interface ZoneSession {
  id: string
  title: string
  bidType: "普通采购" | "定向竞购" | "组合采购" | "组合竞购"
  status: SessionStatus
  round?: string
  countdown?: { d?: number; h: number; m: number; s: number }
  img: string
  products: string[]
  totalQty: string
  viewCount: number
  organizer: string
  registered: boolean
  canBid: boolean
}

/* ─── Zone config (keyed by zoneId) ─── */
const ZONES: Record<string, {
  name: string; subtitle: string; img: string; color: string;
  liveSessions: number; onlineBuyers: number; dealQty: string; dealAmt: string;
}> = {
  grain:   { name: "粮食",    subtitle: "覆盖全国主产区，小麦·水稻·玉米·大豆专业竞拍交易，实时行情，透明公开", img: "/images/jingjia/grain.png",       color: "#c8860a", liveSessions: 2, onlineBuyers: 18, dealQty: "9898吨", dealAmt: "92898万元" },
  frozen:  { name: "冻肉",    subtitle: "冷鲜冻品专业竞价平台，猪牛羊禽直采交易，全程冷链保障",                   img: "/images/jingjia/frozen-meat.png", color: "#1a5fa8", liveSessions: 1, onlineBuyers: 12, dealQty: "3200吨", dealAmt: "45600万元" },
  seafood: { name: "水产",    subtitle: "华南水产竞拍中心，对虾·罗非鱼·贝类专场交易，产地直采保鲜",               img: "/images/jingjia/seafood.png",     color: "#0e6ba8", liveSessions: 4, onlineBuyers: 24, dealQty: "6500吨", dealAmt: "78000万元" },
  veg:     { name: "蔬菜",    subtitle: "广东新鲜蔬菜批量竞拍，叶菜·根茎·瓜果类，基地直供",                       img: "/images/jingjia/vegetable.png",   color: "#3a8c3f", liveSessions: 2, onlineBuyers: 15, dealQty: "4200吨", dealAmt: "12600万元" },
  fruit:   { name: "水果",    subtitle: "岭南特色水果专区，荔枝·龙眼·芒果·菠萝产地竞价直采",                       img: "/images/jingjia/fruit.png",       color: "#e8831a", liveSessions: 3, onlineBuyers: 20, dealQty: "8000吨", dealAmt: "96000万元" },
  egg:     { name: "禽蛋",    subtitle: "优质禽蛋产地直采，鸡蛋·鸭蛋·鹌鹑蛋批量竞价",                             img: "/images/products/eggs.png",       color: "#b45309", liveSessions: 1, onlineBuyers: 8,  dealQty: "1200吨", dealAmt: "8400万元"  },
  rice:    { name: "粉米",    subtitle: "广东优质米粉专区，丝苗米·米粉·米制品竞拍直采",                             img: "/images/jingjia/rice-flour.png",  color: "#6b7c93", liveSessions: 2, onlineBuyers: 10, dealQty: "5000吨", dealAmt: "22000万元" },
  special: { name: "特色农产品", subtitle: "广东特色农产品竞拍大厅，地标产品·有机农产品专场交易",                   img: "/images/jingjia/specialty.png",   color: "#7c3aed", liveSessions: 2, onlineBuyers: 14, dealQty: "2800吨", dealAmt: "33600万元" },
  agrisup: { name: "农资",    subtitle: "化肥·农药·种子·农机批量竞价采购，全程电子合同",                           img: "/images/jingjia/agri-supply.png", color: "#374151", liveSessions: 1, onlineBuyers: 6,  dealQty: "3000吨", dealAmt: "9000万元"  },
}

const SESSIONS: ZoneSession[] = [
  {
    id: "a001", title: "四会库粮食竞价交易",     bidType: "普通采购", status: "live",     round: "第一轮次",
    countdown: { h: 0, m: 0, s: 45 },
    img: "/images/jingjia/grain.png",     products: ["丝苗米","玉米","等3种商品"], totalQty: "2000吨", viewCount: 200, organizer: "广东省供销纳天不润粮食油有限公司", registered: true, canBid: true,
  },
  {
    id: "a002", title: "某某库玉米竞价出库",     bidType: "定向竞购", status: "live",     round: "第二轮次",
    countdown: { h: 0, m: 0, s: 45 },
    img: "/images/jingjia/grain.png",     products: ["玉米","等1种商品"],           totalQty: "2000吨", viewCount: 200, organizer: "广东省供销纳天不润粮食品有限公司", registered: false, canBid: true,
  },
  {
    id: "a003", title: "某某大豆竞价采购",       bidType: "组合采购", status: "upcoming", round: undefined,
    countdown: { h: 8, m: 31, s: 0 },
    img: "/images/jingjia/grain.png",     products: ["稻谷","玉米","等3种商品"], totalQty: "2000吨", viewCount: 200, organizer: "广东省供销纳天不润大豆有限公司", registered: true, canBid: false,
  },
  {
    id: "a004", title: "某某库粮食组合竞价出库", bidType: "组合竞购", status: "upcoming",
    countdown: { h: 1, m: 8, s: 0 },
    img: "/images/jingjia/grain.png",     products: ["大豆","玉米","等3种商品"], totalQty: "2000吨", viewCount: 200, organizer: "广东省供销纳天不润大豆地区总治有限公司", registered: true, canBid: false,
  },
  {
    id: "a005", title: "四会库粮食竞价交易",     bidType: "普通采购", status: "upcoming",
    countdown: { h: 3, m: 11, s: 0 },
    img: "/images/jingjia/grain.png",     products: ["小麦","大豆","玉米","等3种商品"], totalQty: "2000吨", viewCount: 260, organizer: "广东省供销纳天不润粮食油有限公司", registered: false, canBid: false,
  },
  {
    id: "a006", title: "某某库稻谷竞价采购",     bidType: "组合采购", status: "upcoming",
    countdown: { h: 4, m: 9, s: 0 },
    img: "/images/jingjia/grain.png",     products: ["某某库稻谷","玉米","等3种商品"], totalQty: "2000吨", viewCount: 260, organizer: "广东省供销纳天不润粮食油有限公司", registered: true, canBid: false,
  },
  {
    id: "a007", title: "某某库玉米竞价出库",     bidType: "定向竞购", status: "upcoming",
    countdown: { h: 5, m: 9, s: 0 },
    img: "/images/jingjia/grain.png",     products: ["某某库稻谷","等3种商品"], totalQty: "2000吨", viewCount: 260, organizer: "广东省供销纳天不润粮食油有限公司", registered: false, canBid: false,
  },
  {
    id: "a008", title: "某某库稻谷竞价出库",     bidType: "组合采购", status: "upcoming",
    countdown: { h: 6, m: 9, s: 0 },
    img: "/images/jingjia/grain.png",     products: ["稻谷","等3种商品"], totalQty: "2000吨", viewCount: 260, organizer: "广东省供销纳天不润粮食油有限公司", registered: true, canBid: false,
  },
  {
    id: "a009", title: "四会库粮食竞价交易",     bidType: "普通采购", status: "upcoming",
    countdown: { h: 8, m: 13, s: 0 },
    img: "/images/jingjia/grain.png",     products: ["丝苗米","玉米","等3种商品"], totalQty: "2000吨", viewCount: 260, organizer: "广东省供销纳天不润粮食油有限公司", registered: true, canBid: false,
  },
  {
    id: "a010", title: "某某库大豆竞价出库",     bidType: "普通采购", status: "ended",
    img: "/images/jingjia/grain.png",     products: ["大豆"], totalQty: "2000吨", viewCount: 260, organizer: "广东省供销纳天不润粮食油有限公司", registered: false, canBid: false,
  },
  {
    id: "a011", title: "某某库稻谷组合竞价出库", bidType: "组合竞购", status: "ended",
    img: "/images/jingjia/grain.png",     products: ["稻谷","小麦","水稻"], totalQty: "2000吨", viewCount: 260, organizer: "广东省供销纳天不润粮食油有限公司", registered: false, canBid: false,
  },
  {
    id: "a012", title: "四会库粮食竞价交易",     bidType: "普通采购", status: "ended",
    img: "/images/jingjia/grain.png",     products: ["丝苗米","大豆","等3种商品"], totalQty: "2000吨", viewCount: 260, organizer: "广东省供销纳天不润粮食油有限公司", registered: true, canBid: false,
  },
]

const NOTICES = [
  { text: "【JP2512240009】仲恺库采购420吨福湘柱卡白米专场竞价交易公告", date: "2025-12-30" },
  { text: "【JP2512240008】2025年12月29日（15:00）四西库粮食竞价交易", date: "2025-12-29" },
  { text: "【JP2512240006】仲恺库采购420吨福湘柱卡白米专场竞价交易公告", date: "2025-12-28" },
]
const AWARDS = [
  { text: "【JP2512170003】2025年12月22日惠州基地库粮食竞价交易交易专场结拍...", date: "2025-12-24" },
  { text: "【JP2512150002】2025年12月17日10点南沙库销售竞价交易专场结拍...", date: "2025-12-24" },
  { text: "【JP2512170002】2025年12月22日惠州基地库粮食竞价交易交易专场结拍...", date: "2025-12-23" },
]

/* ─── Countdown box ─── */
function CountdownBox({ d, h, m, s, status }: { d?: number; h: number; m: number; s: number; status: SessionStatus }) {
  const [time, setTime] = useState({ d: d ?? 0, h, m, s })
  useEffect(() => {
    if (status === "ended") return
    const timer = setInterval(() => {
      setTime((prev) => {
        let { d, h, m, s } = prev
        s--; if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) { h = 23; d-- }
        if (d < 0) { d = 0; h = 0; m = 0; s = 0 }
        return { d, h, m, s }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [status])

  const color = status === "live" ? "bg-[#cc2222]" : "bg-[#1a5fa8]"
  const textColor = status === "live" ? "text-[#cc2222]" : "text-[#1a5fa8]"
  const label = status === "live" ? "拍卖结束：" : "距开始："

  const parts: { v: string; unit: string }[] = []
  if ((time.d ?? 0) > 0) parts.push({ v: String(time.d).padStart(2, "0"), unit: "天" })
  parts.push(
    { v: String(time.h).padStart(2, "0"), unit: "时" },
    { v: String(time.m).padStart(2, "0"), unit: "分" },
    { v: String(time.s).padStart(2, "0"), unit: "秒" },
  )

  return (
    <div className="flex flex-col items-center gap-1">
      <span className={`text-[11px] ${textColor}`}>{label}</span>
      <div className="flex items-center gap-1">
        {parts.map(({ v, unit }, i) => (
          <span key={i} className="flex items-center gap-0.5">
            <span className={`inline-flex items-center justify-center w-7 h-7 rounded text-[14px] font-bold font-mono text-white ${color}`}>{v[0]}</span>
            <span className={`inline-flex items-center justify-center w-7 h-7 rounded text-[14px] font-bold font-mono text-white ${color}`}>{v[1]}</span>
            <span className={`text-[11px] font-medium ${textColor} mx-0.5`}>{unit}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Session card ─── */
function SessionCard({ s }: { s: ZoneSession }) {
  const isLive = s.status === "live"
  const isUpcoming = s.status === "upcoming"
  const isEnded = s.status === "ended"

  const BID_TYPE_COLOR: Record<string, string> = {
    "普通采购": "bg-[#6b7c93] text-white",
    "定向竞购": "bg-[#1a5fa8] text-white",
    "组合采购": "bg-[#3a8c3f] text-white",
    "组合竞购": "bg-[#7c3aed] text-white",
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-[#dde3ec] hover:shadow-md transition-shadow flex flex-col">
      {/* Image */}
      <div className="relative h-[140px]">
        <Image src={s.img} alt={s.title} fill className="object-cover" />
        {/* bid type top-left */}
        <span className={`absolute top-2 left-2 px-2 py-0.5 text-[11px] font-semibold rounded ${BID_TYPE_COLOR[s.bidType] ?? "bg-[#6b7c93] text-white"}`}>
          {s.bidType}
        </span>
        {/* status overlay */}
        {isLive && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#cc2222]/80 to-transparent px-3 py-2">
            <div className="text-white text-[12px] font-bold">正在进行{s.round ? `（${s.round}）` : ""}</div>
          </div>
        )}
        {isUpcoming && s.countdown && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1a5fa8]/80 to-transparent px-3 py-2">
            <div className="text-white text-[12px] font-bold">
              即将开始 {(s.countdown.d ?? 0) > 0 ? `${s.countdown.d}天` : ""}{s.countdown.h}小时{s.countdown.m}分钟
            </div>
          </div>
        )}
        {isEnded && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white text-[18px] font-bold tracking-widest">已结束</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-3 flex-1 flex flex-col">
        <div className="font-semibold text-[#1a1a2e] text-[14px] mb-1 line-clamp-1">{s.title}</div>
        <div className="text-[12px] text-[#6b7c93] mb-2 line-clamp-1">{s.products.join("、")}</div>
        <div className="flex items-center gap-3 text-[12px] text-[#666] mb-2">
          <span>总量 <span className="font-semibold text-[#1a1a2e]">{s.totalQty}</span></span>
          <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" />{s.viewCount}</span>
        </div>
        <div className="text-[11px] text-[#999] truncate mb-2">
          <span className="text-[#6b7c93]">↗</span> {s.organizer}
        </div>

        {/* Countdown (live/upcoming only) */}
        {(isLive || isUpcoming) && s.countdown && (
          <div className="mb-2">
            <CountdownBox {...s.countdown} status={s.status} />
          </div>
        )}

        {/* Buttons */}
        <div className="mt-auto flex items-center gap-2">
          {s.registered && (
            <span className="px-2 py-1 text-[11px] bg-[#e8f9f0] text-[#1a8a3f] rounded font-semibold">已报名</span>
          )}
          {!s.registered && !isEnded && (
            <span className="px-2 py-1 text-[11px] bg-[#f5f7fa] text-[#999] rounded">未报名</span>
          )}
          <div className="flex gap-1.5 ml-auto">
            {isLive && s.canBid && s.registered && (
              <Link href={`/portal/jingjia-jiaoyi/${s.id}`} className="px-3 py-1.5 bg-[#cc2222] text-white text-[12px] font-semibold rounded hover:bg-[#aa1111] transition-colors">
                立即报价
              </Link>
            )}
            {!s.registered && !isEnded && (
              <button className="px-3 py-1.5 border border-[#1a5fa8] text-[#1a5fa8] text-[12px] rounded hover:bg-[#e8f4fd] transition-colors">
                立即报名{s.status === "upcoming" ? "\n(未报名)" : ""}
              </button>
            )}
            <Link href={`/portal/jingjia-jiaoyi/${s.id}`} className="px-3 py-1.5 bg-[#1a5fa8] text-white text-[12px] rounded hover:bg-[#0d4a8a] transition-colors">
              进入专场
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Page ─── */
export default function ZonePage({ params }: { params: { zoneId: string } }) {
  const zone = ZONES[params.zoneId] ?? ZONES["grain"]
  const [keyword, setKeyword] = useState("")
  const [statusFilter, setStatusFilter] = useState("全部")
  const [now, setNow] = useState("")

  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleString("zh-CN", { hour12: false }))
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [])

  const liveSessions = SESSIONS.filter(s => s.status === "live").length

  const filtered = SESSIONS.filter(s => {
    if (statusFilter === "全部") return true
    if (statusFilter === "进行中") return s.status === "live"
    if (statusFilter === "即将开始") return s.status === "upcoming"
    if (statusFilter === "已结束") return s.status === "ended"
    return true
  })

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">

        {/* ── Breadcrumb ── */}
        <div className="bg-white border-b border-[#e8edf5]">
          <div className="max-w-[1100px] mx-auto px-6 py-2 flex items-center gap-1.5 text-[13px] text-[#999]">
            <Link href="/portal/jingjia-jiaoyi" className="flex items-center gap-1 hover:text-[#1a5fa8]">
              <ChevronLeft className="w-3.5 h-3.5" /> 竞拍专区
            </Link>
            <span>›</span>
            <span className="text-[#1a1a2e] font-medium">{zone.name}</span>
          </div>
        </div>

        {/* ── Zone Hero ── */}
        <div className="relative w-full overflow-hidden" style={{ background: "linear-gradient(135deg, #0d2a52 0%, #1a5fa8 60%, #1e7fc4 100%)" }}>
          <div className="absolute inset-0">
            <Image src={zone.img} alt={zone.name} fill className="object-cover opacity-30" />
          </div>
          <div className="relative max-w-[1100px] mx-auto px-6 py-8">
            <div className="flex items-start justify-between gap-6">
              {/* Left: title */}
              <div className="text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-[#cc2222] text-white text-[12px] font-bold rounded">
                    {liveSessions} 场正在进行
                  </span>
                </div>
                <h1 className="text-[36px] font-bold mb-2">
                  <span style={{ color: zone.color }} className="mr-1">{zone.name}</span>
                  竞拍专区
                </h1>
                <p className="text-white/70 text-[14px] max-w-[480px] leading-relaxed">{zone.subtitle}</p>
              </div>
              {/* Right: stats */}
              <div className="grid grid-cols-2 gap-3 shrink-0">
                {[
                  { label: "今日进行场次", value: zone.liveSessions + " 场", icon: "📋" },
                  { label: "在线竞争企业", value: zone.onlineBuyers + " 家", icon: "👥" },
                  { label: "成交总量",     value: zone.dealQty,              icon: "⚖️" },
                  { label: "成交总金额",   value: zone.dealAmt,              icon: "💰" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-center border border-white/15 min-w-[130px]">
                    <div className="text-white font-bold text-[18px]">{s.value}</div>
                    <div className="text-white/60 text-[12px] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto px-6 py-6">

          {/* ── Notices + Awards ── */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { title: `${zone.name}竞拍公告`, color: "#e8831a", items: NOTICES },
              { title: "中标公示", color: "#3a8c3f", items: AWARDS },
            ].map((panel) => (
              <div key={panel.title} className="bg-white rounded-lg border border-[#dde3ec] p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded flex items-center justify-center text-[9px] text-white font-bold" style={{ background: panel.color }}>公</span>
                    <span className="font-semibold text-[#1a1a2e] text-[14px]">{panel.title}</span>
                  </div>
                  <Link href="#" className="text-[12px] text-[#1a5fa8] hover:underline">全部 →</Link>
                </div>
                <ul className="space-y-2">
                  {panel.items.map((item, i) => (
                    <li key={i} className="flex items-start justify-between gap-2 text-[12px]">
                      <span className="text-[#333] hover:text-[#1a5fa8] cursor-pointer line-clamp-1 flex-1">{item.text}</span>
                      <span className="text-[#999] shrink-0">{item.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Search + Filters ── */}
          <div className="bg-white rounded-lg border border-[#dde3ec] p-4 mb-4">
            {/* Row 1: search + dropdowns */}
            <div className="flex items-center gap-2 mb-3">
              <input
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder="编号/名称/供应商/商品名称"
                className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]"
              />
              {["专场状态", "发布方要求", "竞拍类型", "竞拍间隔", "商品分类"].map((label) => (
                <select key={label} className="border border-[#dde3ec] rounded px-2 py-1.5 text-[13px] text-[#666] focus:outline-none focus:border-[#1a5fa8] bg-white">
                  <option>{label}</option>
                </select>
              ))}
              <button className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] flex items-center gap-1">
                <Search className="w-3.5 h-3.5" /> 搜索
              </button>
            </div>
            {/* Row 2: time quick-filter */}
            <div className="flex items-center gap-3">
              <input type="text" placeholder="开始时间 - 结束时间" className="border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] w-[200px] focus:outline-none" />
              {["1小时内", "明天", "未来3天", "未来一周"].map((t) => (
                <button key={t} className="px-3 py-1.5 border border-[#dde3ec] rounded text-[12px] text-[#666] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
                  {t}
                </button>
              ))}
              <button className="px-3 py-1.5 bg-[#e8f4fd] text-[#1a5fa8] text-[12px] rounded border border-[#1a5fa8] flex items-center gap-1">
                <RotateCcw className="w-3 h-3" /> 重置
              </button>
              <button className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[12px] rounded flex items-center gap-1">
                <Search className="w-3 h-3" /> 搜索
              </button>
            </div>
          </div>

          {/* ── Session list header ── */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[16px] font-bold text-[#1a1a2e]">竞拍专场列表</h2>
            <div className="flex items-center gap-2 text-[13px] text-[#666]">
              <span>北京时间 {now}</span>
              <button className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                <RefreshCw className="w-3 h-3" /> 刷新
              </button>
            </div>
          </div>

          {/* ── Session cards 4-col grid ── */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((s) => <SessionCard key={s.id} s={s} />)}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1 mt-8">
            <span className="text-[13px] text-[#999] mr-3">共 30 个</span>
            <button className="w-7 h-7 flex items-center justify-center border border-[#dde3ec] rounded text-[#666] hover:border-[#1a5fa8]">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {[1, 2, 3, 4].map((n) => (
              <button key={n} className={`w-7 h-7 flex items-center justify-center rounded text-[13px] font-medium ${n === 1 ? "bg-[#1a5fa8] text-white" : "border border-[#dde3ec] text-[#666] hover:border-[#1a5fa8]"}`}>
                {n}
              </button>
            ))}
            <button className="w-7 h-7 flex items-center justify-center border border-[#dde3ec] rounded text-[#666] hover:border-[#1a5fa8]">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
