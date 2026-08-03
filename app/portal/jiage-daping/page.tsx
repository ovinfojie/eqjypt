"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, AreaChart, Area,
} from "recharts"
import { TrendingUp, TrendingDown, Minus, ArrowLeft, RefreshCw, Maximize2 } from "lucide-react"

/* ── Mock data ── */
const CATEGORIES = ["粮油", "蔬菜", "水果", "肉禽蛋", "海鲜水产", "干货调味"]

const INDEX_CARDS = [
  { label: "综合价格指数", value: "108.6", change: 2.3, unit: "点", trend: "up" },
  { label: "粮油价格指数", value: "102.4", change: 0.8, unit: "点", trend: "up" },
  { label: "蔬菜价格指数", value: "115.2", change: -3.1, unit: "点", trend: "down" },
  { label: "水果价格指数", value: "121.8", change: 5.6, unit: "点", trend: "up" },
  { label: "肉禽蛋价格指数", value: "98.3", change: -0.4, unit: "点", trend: "down" },
  { label: "海鲜水产指数", value: "112.7", change: 1.2, unit: "点", trend: "up" },
]

const trendData = [
  { date: "01-01", 粮油: 101, 蔬菜: 118, 水果: 112, 肉禽蛋: 99 },
  { date: "01-08", 粮油: 102, 蔬菜: 122, 水果: 108, 肉禽蛋: 98 },
  { date: "01-15", 粮油: 101, 蔬菜: 116, 水果: 114, 肉禽蛋: 99 },
  { date: "01-22", 粮油: 103, 蔬菜: 110, 水果: 116, 肉禽蛋: 100 },
  { date: "02-01", 粮油: 102, 蔬菜: 108, 水果: 119, 肉禽蛋: 98 },
  { date: "02-08", 粮油: 104, 蔬菜: 112, 水果: 120, 肉禽蛋: 97 },
  { date: "02-15", 粮油: 103, 蔬菜: 115, 水果: 122, 肉禽蛋: 98 },
  { date: "03-01", 粮油: 102, 蔬菜: 118, 水果: 121, 肉禽蛋: 99 },
  { date: "03-08", 粮油: 103, 蔬菜: 114, 水果: 119, 肉禽蛋: 99 },
  { date: "03-15", 粮油: 102, 蔬菜: 115, 水果: 122, 肉禽蛋: 98 },
]

const barData = [
  { cat: "粮油", 本期: 102, 上期: 101 },
  { cat: "蔬菜", 本期: 115, 上期: 118 },
  { cat: "水果", 本期: 122, 上期: 116 },
  { cat: "肉禽蛋", 本期: 98, 上期: 99 },
  { cat: "海鲜", 本期: 113, 上期: 111 },
  { cat: "干货", 本期: 106, 上期: 105 },
]

const priceTable = [
  { name: "台山丝苗米", cat: "粮油", unit: "元/50kg", price: "142.00", prev: "140.50", change: "+1.07%", trend: "up" },
  { name: "花生油（5L）", cat: "粮油", unit: "元/桶", price: "89.80", prev: "91.20", change: "-1.54%", trend: "down" },
  { name: "白菜", cat: "蔬菜", unit: "元/kg", price: "2.30", prev: "2.80", change: "-17.86%", trend: "down" },
  { name: "番茄", cat: "蔬菜", unit: "元/kg", price: "4.50", prev: "4.20", change: "+7.14%", trend: "up" },
  { name: "增城荔枝", cat: "水果", unit: "元/kg", price: "18.60", prev: "16.80", change: "+10.71%", trend: "up" },
  { name: "进口苹果", cat: "水果", unit: "元/kg", price: "12.40", prev: "12.50", change: "-0.80%", trend: "down" },
  { name: "猪五花肉", cat: "肉禽蛋", unit: "元/kg", price: "28.50", prev: "29.00", change: "-1.72%", trend: "down" },
  { name: "鸡蛋", cat: "肉禽蛋", unit: "元/kg", price: "10.20", prev: "10.20", change: "0%", trend: "flat" },
  { name: "对虾", cat: "海鲜", unit: "元/kg", price: "68.00", prev: "64.00", change: "+6.25%", trend: "up" },
  { name: "花椒", cat: "干货", unit: "元/kg", price: "56.00", prev: "55.00", change: "+1.82%", trend: "up" },
]

const NOW = "2026年08月02日 更新"
const LINES = ["粮油", "蔬菜", "水果", "肉禽蛋"]
const LINE_COLORS = ["#1a5fa8", "#3a8c3f", "#e8831a", "#c0392b"]

export default function JiageDapingPage() {
  const [activeTab, setActiveTab] = useState("全部")
  const [period, setPeriod] = useState("近3月")

  const filtered = activeTab === "全部" ? priceTable : priceTable.filter(r => r.cat === activeTab)

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#0a1520] border-b border-white/10">
        <div className="flex items-center gap-4">
          <Link href="/portal" className="flex items-center gap-1.5 text-[13px] text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回平台
          </Link>
          <div className="w-px h-4 bg-white/20" />
          <h1 className="text-[15px] font-bold text-white">粤供销农产品价格大屏</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[12px] text-white/50">{NOW}</span>
          <button className="flex items-center gap-1.5 text-[12px] text-white/60 hover:text-white transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />刷新
          </button>
          <button className="flex items-center gap-1.5 text-[12px] text-white/60 hover:text-white transition-colors">
            <Maximize2 className="w-3.5 h-3.5" />全屏
          </button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Index cards */}
        <div className="grid grid-cols-6 gap-3">
          {INDEX_CARDS.map((card) => (
            <div key={card.label} className="bg-[#132236] border border-white/10 rounded-lg p-4">
              <div className="text-[11px] text-white/50 mb-2">{card.label}</div>
              <div className="text-[26px] font-bold text-white mb-1">{card.value}</div>
              <div className={`flex items-center gap-1 text-[12px] ${
                card.trend === "up" ? "text-[#e8831a]" : card.trend === "down" ? "text-[#3a8c3f]" : "text-white/50"
              }`}>
                {card.trend === "up" ? <TrendingUp className="w-3.5 h-3.5" /> :
                 card.trend === "down" ? <TrendingDown className="w-3.5 h-3.5" /> :
                 <Minus className="w-3.5 h-3.5" />}
                {card.trend === "up" ? "+" : ""}{card.change} 点
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Trend line chart */}
          <div className="col-span-2 bg-[#132236] border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[14px] font-semibold text-white">价格指数走势</h2>
              <div className="flex gap-1.5">
                {["近1月", "近3月", "近半年"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-3 py-1 text-[12px] rounded transition-colors ${
                      period === p ? "bg-[#1a5fa8] text-white" : "text-white/50 hover:text-white"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} domain={[90, 130]} />
                <Tooltip
                  contentStyle={{ background: "#0a1520", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, fontSize: 12 }}
                  labelStyle={{ color: "rgba(255,255,255,0.7)" }}
                />
                <Legend wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }} />
                {LINES.map((key, i) => (
                  <Line key={key} type="monotone" dataKey={key} stroke={LINE_COLORS[i]} strokeWidth={2} dot={false} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar chart */}
          <div className="bg-[#132236] border border-white/10 rounded-lg p-4">
            <h2 className="text-[14px] font-semibold text-white mb-4">本期 vs 上期对比</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="cat" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} domain={[90, 130]} />
                <Tooltip
                  contentStyle={{ background: "#0a1520", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, fontSize: 12 }}
                  labelStyle={{ color: "rgba(255,255,255,0.7)" }}
                />
                <Legend wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }} />
                <Bar dataKey="本期" fill="#1a5fa8" radius={[3, 3, 0, 0]} />
                <Bar dataKey="上期" fill="rgba(255,255,255,0.15)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Price table */}
        <div className="bg-[#132236] border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-semibold text-white">重点品种价格监测</h2>
            <div className="flex gap-1.5">
              {["全部", ...CATEGORIES].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 text-[12px] rounded transition-colors ${
                    activeTab === tab ? "bg-[#1a5fa8] text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-[12px]">
                <th className="text-left pb-2 font-medium">品名</th>
                <th className="text-left pb-2 font-medium">品类</th>
                <th className="text-left pb-2 font-medium">计价单位</th>
                <th className="text-right pb-2 font-medium">本期价格</th>
                <th className="text-right pb-2 font-medium">上期价格</th>
                <th className="text-right pb-2 font-medium">涨跌幅</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-2.5 text-white font-medium">{row.name}</td>
                  <td className="py-2.5 text-white/60">{row.cat}</td>
                  <td className="py-2.5 text-white/60">{row.unit}</td>
                  <td className="py-2.5 text-right font-mono font-semibold text-white">{row.price}</td>
                  <td className="py-2.5 text-right font-mono text-white/50">{row.prev}</td>
                  <td className={`py-2.5 text-right font-medium ${
                    row.trend === "up" ? "text-[#e8831a]" : row.trend === "down" ? "text-[#3a8c3f]" : "text-white/40"
                  }`}>
                    <span className="flex items-center justify-end gap-1">
                      {row.trend === "up" ? <TrendingUp className="w-3.5 h-3.5" /> :
                       row.trend === "down" ? <TrendingDown className="w-3.5 h-3.5" /> :
                       <Minus className="w-3.5 h-3.5" />}
                      {row.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
