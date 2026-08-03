"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts"
import {
  TrendingUp, TrendingDown, RefreshCw, Search, ShoppingCart,
  Tag, Leaf, LayoutGrid,
} from "lucide-react"

/* ── 指数卡数据 ── */
const INDEX_CARDS = [
  {
    label: "综合价格指数",
    sublabel: "（加权平均合成）",
    value: "108.6",
    baseNote: "以上月为100基准",
    change: "+1.2",
    changeLabel: "较上期",
    date: "2025 / 06 / 08",
    icon: LayoutGrid,
    iconBg: "bg-[#1a5fa8]",
    valuColor: "text-[#1a5fa8]",
  },
  {
    label: "采购价格指数",
    sublabel: "（订单加权平均）",
    value: "106.3",
    baseNote: "平台采购综合指数",
    change: "+0.8",
    changeLabel: "较上期",
    date: "2025 / 06 / 08",
    icon: ShoppingCart,
    iconBg: "bg-[#d9363e]",
    valuColor: "text-[#1a5fa8]",
  },
  {
    label: "销售价格指数",
    sublabel: "（市场成交价加权）",
    value: "110.4",
    baseNote: "市场销售综合指数",
    change: "+1.5",
    changeLabel: "较上期",
    date: "2025 / 06 / 08",
    icon: Tag,
    iconBg: "bg-[#d9363e]",
    valuColor: "text-[#d9363e]",
  },
  {
    label: "收购价格指数",
    sublabel: "（为农收购加权）",
    value: "107.2",
    baseNote: "农产品收购综合指数",
    change: "+0.9",
    changeLabel: "较上期",
    date: "2025 / 06 / 08",
    icon: Leaf,
    iconBg: "bg-[#3a8c3f]",
    valuColor: "text-[#3a8c3f]",
  },
]

/* ── 走势图数据 ── */
const TREND_DATA = [
  { date: "6/08", sell: 110.2, buy: 106.1, collect: 106.9 },
  { date: "6/09", sell: 110.4, buy: 106.2, collect: 107.0 },
  { date: "6/10", sell: 110.3, buy: 106.0, collect: 106.8 },
  { date: "6/11", sell: 110.5, buy: 106.1, collect: 107.1 },
  { date: "6/12", sell: 110.2, buy: 106.1, collect: 106.9 },
  { date: "6/13", sell: 110.6, buy: 106.3, collect: 107.2 },
  { date: "6/14", sell: 110.7, buy: 106.4, collect: 107.1 },
  { date: "6/15", sell: 110.6, buy: 106.3, collect: 107.0 },
]

/* ── 官方来源数据 ── */
const OFFICIAL_SOURCES = [
  { name: "广东省农业农村厅",       count: 12, time: "08:30" },
  { name: "国家发改委价格监测中心", count: 8,  time: "08:00" },
  { name: "农业农村部市场信息",      count: 15, time: "08:00" },
  { name: "国家统计局",              count: 6,  time: "08:00" },
  { name: "国家粮食局",              count: 4,  time: "08:00" },
  { name: "广东供销大数据平台",      count: 32, time: "实时"  },
]

/* ── 价格明细表 ── */
const PRICE_TABLE = [
  { name: "大米",   unit: "元/kg", cat: "粮食", buy: 4.30, sell: 4.60, collect: 4.10, index: 104,   region: "全国均价", source: "平台",       date: "2026-06-08 12:00" },
  { name: "大豆",   unit: "元/kg", cat: "粮食", buy: 2.80, sell: 3.10, collect: 2.90, index: 98.8,  region: "全国均价", source: "官方",       date: "2026-06-08 12:00" },
  { name: "小麦",   unit: "元/kg", cat: "粮食", buy: 2.30, sell: 2.80, collect: 2.30, index: 97.3,  region: "全国均价", source: "官方",       date: "2026-06-08 12:00" },
  { name: "猪肉",   unit: "元/kg", cat: "肉类", buy: 12.30, sell: 13.30, collect: 11.30, index: 107.2, region: "全国均价", source: "官方",   date: "2026-06-08 12:00" },
  { name: "鸡肉",   unit: "元/kg", cat: "肉类", buy: 6.30, sell: 6.80, collect: 6.10, index: 104.8, region: "广州",     source: "官方",       date: "2026-06-08 12:00" },
  { name: "白菜",   unit: "元/kg", cat: "蔬菜", buy: 2.30, sell: 2.40, collect: 2.20, index: 100,   region: "广州",     source: "官方",       date: "2026-06-08 12:00" },
  { name: "鸡蛋",   unit: "元/kg", cat: "禽蛋", buy: 3.40, sell: 3.60, collect: 3.30, index: 96.8,  region: "全省均价", source: "官方",       date: "2026-06-08 12:00" },
  { name: "鸭蛋",   unit: "元/kg", cat: "禽蛋", buy: 3.80, sell: 4.30, collect: 3.30, index: 103.5, region: "佛山",     source: "平台",       date: "2026-06-08 12:00" },
  { name: "草鱼",   unit: "元/kg", cat: "水产", buy: 8.30, sell: 8.60, collect: 8.10, index: 97.2,  region: "江门",     source: "平台",       date: "2026-06-08 12:00" },
  { name: "对虾",   unit: "元/kg", cat: "水产", buy: 12.30, sell: 12.10, collect: 11.90, index: 94.2, region: "江门",   source: "平台",       date: "2026-06-08 12:00" },
]

/* ── 涨跌榜数据 ── */
const RISE_LIST = [
  { name: "益苗米", cat: "粮食", price: 4.80, change: "+2.7%" },
  { name: "大豆",   cat: "粮食", price: 3.90, change: "+4.2%" },
  { name: "小麦",   cat: "粮食", price: 4.60, change: "+2.9%" },
  { name: "荔枝",   cat: "水果", price: 5.80, change: "+1.2%" },
  { name: "猪肉",   cat: "肉类", price: 9.20, change: "+1.1%" },
]
const FALL_LIST = [
  { name: "鸡肉",   cat: "肉类", price: 4.80, change: "+2.7%" },
  { name: "花生油", cat: "油脂", price: 9.90, change: "+4.2%" },
  { name: "番薯",   cat: "蔬菜", price: 3.60, change: "+2.9%" },
  { name: "鸡蛋",   cat: "禽蛋", price: 4.80, change: "+1.2%" },
  { name: "鸭蛋",   cat: "禽蛋", price: 3.20, change: "+1.1%" },
]

const CATS = ["全部", "粮食", "肉类", "蔬菜", "禽蛋", "水产"]
const SOURCE_OPTS = ["全部数据", "平台数据", "官方数据"]
const PERIOD_OPTS = ["近7天", "近15天", "近30天"]

export default function JiageDapingPage() {
  const [keyword, setKeyword]   = useState("")
  const [catFilter, setCat]     = useState("全部")
  const [srcFilter, setSrc]     = useState("全部数据")
  const [period, setPeriod]     = useState("近7天")
  const [page, setPage]         = useState(1)
  const PAGE_SIZE = 10

  const filtered = PRICE_TABLE.filter(r => {
    const matchKw  = !keyword || r.name.includes(keyword) || r.cat.includes(keyword)
    const matchCat = catFilter === "全部" || r.cat === catFilter
    const matchSrc = srcFilter === "全部数据" || r.source === (srcFilter === "平台数据" ? "平台" : "官方")
    return matchKw && matchCat && matchSrc
  })
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const pageData   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="min-h-screen bg-[#f4f6f9] font-sans">
      <SiteHeader />

      {/* Hero banner */}
      <div className="bg-[#1a5fa8] text-white py-10 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-[36px] font-bold mb-2">农产品价格指数</h1>
          <p className="text-[15px] text-white/80">整合平台数据 · 汇聚官方权威信息 · 服务全平台用户</p>
        </div>
      </div>

      {/* Refresh row */}
      <div className="bg-white border-b border-[#e8e8e8]">
        <div className="max-w-[1200px] mx-auto px-6 py-2.5 flex items-center justify-end gap-2">
          <span className="text-[12px] text-[#999]">更新时间：2026-06-09 13:20</span>
          <button className="flex items-center gap-1 px-3 py-1 bg-[#1a5fa8] text-white rounded text-[12px] hover:bg-[#1550a0] transition-colors">
            <RefreshCw className="w-3 h-3" />
            刷新数据
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-6 space-y-6">

        {/* 4 index cards */}
        <div className="grid grid-cols-4 gap-4">
          {INDEX_CARDS.map((card) => {
            const Icon = card.icon
            return (
              <div key={card.label} className="bg-white rounded-lg border border-[#e8e8e8] p-4 flex flex-col gap-1.5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[13px] text-[#333] font-medium">{card.label}</span>
                    <span className="text-[12px] text-[#999] ml-1">{card.sublabel}</span>
                  </div>
                  <span className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${card.iconBg}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </span>
                </div>
                <div className={`text-[32px] font-bold leading-none ${card.valuColor}`}>{card.value}</div>
                <div className="text-[12px] text-[#999]">{card.baseNote}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="flex items-center gap-1 text-[#3a8c3f] text-[12px]">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {card.change} {card.changeLabel}
                  </span>
                  <span className="text-[11px] text-[#bbb]">{card.date}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Chart + data source */}
        <div className="grid grid-cols-[1fr_280px] gap-4">
          {/* Line chart */}
          <div className="bg-white rounded-lg border border-[#e8e8e8] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#1a5fa8]" />
                <span className="text-[15px] font-semibold text-[#222]">综合价格指数走势</span>
                <span className="text-[12px] text-[#999]">基准值 100</span>
              </div>
              <div className="flex items-center gap-1.5">
                {PERIOD_OPTS.map(p => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-3 py-1 rounded text-[12px] border transition-colors ${
                      period === p
                        ? "bg-[#1a5fa8] text-white border-[#1a5fa8]"
                        : "text-[#666] border-[#ddd] hover:border-[#1a5fa8] hover:text-[#1a5fa8]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Legend row */}
            <div className="flex items-center gap-6 mb-3 text-[12px] text-[#666]">
              <span className="flex items-center gap-1.5">
                <span className="w-8 border-t-2 border-[#d9363e]" />
                销售价格指数（向下游卖出）
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-8 border-t-2 border-dashed border-[#1a5fa8]" />
                采购价格指数（从批发市场买入）
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-8 border-t-2 border-dashed border-[#3a8c3f]" />
                收购价格指数（从农户收购）
              </span>
            </div>

            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={TREND_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fill: "#999", fontSize: 11 }} />
                <YAxis tick={{ fill: "#999", fontSize: 11 }} domain={[104, 113]} />
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 6, fontSize: 12 }}
                  formatter={(v, name) => {
                    const labels: Record<string, string> = { sell: "销售价格指数", buy: "采购价格指数", collect: "收购价格指数" }
                    return [Number(v).toFixed(1), labels[String(name)] || String(name)]
                  }}
                />
                <Line type="monotone" dataKey="sell"    stroke="#d9363e" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="buy"     stroke="#1a5fa8" strokeWidth={2} strokeDasharray="5 3" dot={{ r: 3 }} />
                <Line type="monotone" dataKey="collect" stroke="#3a8c3f" strokeWidth={2} strokeDasharray="5 3" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Data source panel */}
          <div className="bg-white rounded-lg border border-[#e8e8e8] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[14px] font-semibold text-[#222]">数据来源</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#f0f7ff] rounded p-3">
                <div className="flex items-center gap-1 text-[12px] text-[#1a5fa8] font-medium mb-1">
                  <LayoutGrid className="w-3.5 h-3.5" />平台数据
                </div>
                <div className="text-[28px] font-bold text-[#1a5fa8]">32</div>
                <div className="text-[11px] text-[#999] mt-0.5">广东供销平台</div>
                <div className="text-[11px] text-[#3a8c3f] mt-1">实时更新</div>
              </div>
              <div className="bg-[#fff8f0] rounded p-3">
                <div className="flex items-center gap-1 text-[12px] text-[#d9363e] font-medium mb-1">
                  <Search className="w-3.5 h-3.5" />官方数据
                </div>
                <div className="text-[28px] font-bold text-[#d9363e]">45</div>
                <div className="text-[11px] text-[#999] mt-0.5">5个权威机构</div>
                <div className="text-[11px] text-[#3a8c3f] mt-1">每日定时抓取</div>
              </div>
            </div>
            <div className="space-y-2 text-[12px]">
              <div className="text-[12px] text-[#666] font-medium mb-1">官方来源</div>
              {OFFICIAL_SOURCES.map(src => (
                <div key={src.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#555]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3a8c3f] shrink-0" />
                    {src.name}
                  </span>
                  <span className="text-[#999] tabular-nums">{src.count}条 {src.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price detail table */}
        <div className="bg-white rounded-lg border border-[#e8e8e8] p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base font-semibold text-[#222]">农产品价格明细</span>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#bbb]" />
              <input
                value={keyword}
                onChange={e => { setKeyword(e.target.value); setPage(1) }}
                placeholder="输入品名搜索"
                className="pl-8 pr-3 py-1.5 border border-[#ddd] rounded text-[13px] w-40 focus:outline-none focus:border-[#1a5fa8]"
              />
            </div>
            <button
              onClick={() => setPage(1)}
              className="px-4 py-1.5 bg-[#1a5fa8] text-white rounded text-[13px] hover:bg-[#1550a0] transition-colors"
            >
              搜索
            </button>
            <select
              value={catFilter}
              onChange={e => { setCat(e.target.value); setPage(1) }}
              className="px-3 py-1.5 border border-[#ddd] rounded text-[13px] text-[#555] focus:outline-none focus:border-[#1a5fa8]"
            >
              {CATS.map(c => <option key={c}>{c}</option>)}
            </select>
            <select
              value={srcFilter}
              onChange={e => { setSrc(e.target.value); setPage(1) }}
              className="px-3 py-1.5 border border-[#ddd] rounded text-[13px] text-[#555] focus:outline-none focus:border-[#1a5fa8]"
            >
              {SOURCE_OPTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Table */}
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="bg-[#f7f8fa] text-[#666]">
                <th className="text-left py-2.5 px-3 border border-[#eee] font-medium">品种</th>
                <th className="text-left py-2.5 px-3 border border-[#eee] font-medium">品类</th>
                <th className="text-right py-2.5 px-3 border border-[#eee] font-medium">采购价 ↑↓</th>
                <th className="text-right py-2.5 px-3 border border-[#eee] font-medium">销售价 ↑↓</th>
                <th className="text-right py-2.5 px-3 border border-[#eee] font-medium">收购价</th>
                <th className="text-right py-2.5 px-3 border border-[#eee] font-medium">价格指数 ↑↓</th>
                <th className="text-left py-2.5 px-3 border border-[#eee] font-medium">产地 / 区域</th>
                <th className="text-left py-2.5 px-3 border border-[#eee] font-medium">数据来源</th>
                <th className="text-left py-2.5 px-3 border border-[#eee] font-medium">更新时间</th>
                <th className="text-center py-2.5 px-3 border border-[#eee] font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((row, i) => (
                <tr key={i} className="hover:bg-[#f9fbff] transition-colors border-b border-[#f0f0f0]">
                  <td className="py-2.5 px-3 text-[#333] font-medium border-x border-[#f0f0f0]">
                    {row.name} <span className="text-[11px] text-[#999]">{row.unit}</span>
                  </td>
                  <td className="py-2.5 px-3 text-[#666] border-x border-[#f0f0f0]">{row.cat}</td>
                  <td className="py-2.5 px-3 text-right border-x border-[#f0f0f0]">
                    <span className="font-mono font-medium text-[#333]">{row.buy.toFixed(2)}</span>
                    <br />
                    <span className="text-[11px] text-[#3a8c3f]">↑+0.05</span>
                  </td>
                  <td className="py-2.5 px-3 text-right border-x border-[#f0f0f0]">
                    <span className="font-mono font-medium text-[#333]">{row.sell.toFixed(2)}</span>
                    <br />
                    <span className="text-[11px] text-[#3a8c3f]">↑+0.05</span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-[#555] border-x border-[#f0f0f0]">
                    {row.collect.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-right border-x border-[#f0f0f0]">
                    <span className={`font-mono font-medium ${row.index >= 100 ? "text-[#d9363e]" : "text-[#3a8c3f]"}`}>
                      {row.index}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[#555] border-x border-[#f0f0f0]">{row.region}</td>
                  <td className="py-2.5 px-3 border-x border-[#f0f0f0]">
                    <span className={`text-[12px] font-medium ${row.source === "平台" ? "text-[#1a5fa8]" : "text-[#3a8c3f]"}`}>
                      {row.source}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[11px] text-[#999] border-x border-[#f0f0f0]">{row.date}</td>
                  <td className="py-2.5 px-3 text-center border-x border-[#f0f0f0]">
                    <button className="px-3 py-0.5 bg-[#1a5fa8] text-white text-[12px] rounded hover:bg-[#1550a0] transition-colors">
                      历史
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 text-[13px]">
            <span className="text-[#999]">共 {filtered.length} 个</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPage(idx + 1)}
                  className={`w-7 h-7 rounded text-[13px] border transition-colors ${
                    page === idx + 1
                      ? "bg-[#1a5fa8] text-white border-[#1a5fa8]"
                      : "text-[#555] border-[#ddd] hover:border-[#1a5fa8] hover:text-[#1a5fa8]"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Rise / Fall board */}
        <div className="grid grid-cols-2 gap-4 pb-4">
          {/* Rise */}
          <div className="bg-white rounded-lg border border-[#e8e8e8] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[14px] font-semibold text-[#222]">今日涨幅榜</span>
              <span className="text-[12px] text-[#999]">销售价</span>
            </div>
            <div className="space-y-3">
              {RISE_LIST.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold text-white ${
                      i === 0 ? "bg-[#d9363e]" : i === 1 ? "bg-[#e8831a]" : i === 2 ? "bg-[#e8831a]" : "bg-[#bbb]"
                    }`}>{i + 1}</span>
                    <span className="text-[#333]">{item.name}</span>
                    <span className="text-[11px] text-[#999] bg-[#f5f5f5] px-1.5 rounded">{item.cat}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#333] font-mono">{item.price.toFixed(2)}</span>
                    <span className="text-[#3a8c3f] text-[12px] w-14 text-right">↑ {item.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fall */}
          <div className="bg-white rounded-lg border border-[#e8e8e8] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[14px] font-semibold text-[#222]">今日跌幅榜</span>
              <span className="text-[12px] text-[#999]">销售价</span>
            </div>
            <div className="space-y-3">
              {FALL_LIST.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold text-white ${
                      i === 0 ? "bg-[#d9363e]" : i === 1 ? "bg-[#e8831a]" : i === 2 ? "bg-[#e8831a]" : "bg-[#bbb]"
                    }`}>{i + 1}</span>
                    <span className="text-[#333]">{item.name}</span>
                    <span className="text-[11px] text-[#999] bg-[#f5f5f5] px-1.5 rounded">{item.cat}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#333] font-mono">{item.price.toFixed(2)}</span>
                    <span className="text-[#d9363e] text-[12px] w-14 text-right">↓ {item.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      <SiteFooter />
    </div>
  )
}
