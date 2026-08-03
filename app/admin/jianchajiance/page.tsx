"use client"

import Link from "next/link"
import { ArrowLeft, TrendingUp, TrendingDown, Users, ShoppingCart, BarChart2, Activity } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const tradeData = [
  { day: "7/27", amt: 320, orders: 88 },
  { day: "7/28", amt: 480, orders: 132 },
  { day: "7/29", amt: 410, orders: 110 },
  { day: "7/30", amt: 560, orders: 158 },
  { day: "7/31", amt: 620, orders: 174 },
  { day: "8/1",  amt: 750, orders: 210 },
  { day: "8/2",  amt: 820, orders: 230 },
]

const categoryData = [
  { name: "粮食类",   value: 38 },
  { name: "蔬菜类",   value: 22 },
  { name: "水果类",   value: 18 },
  { name: "禽蛋类",   value: 12 },
  { name: "其他",     value: 10 },
]
const PIE_COLORS = ["#1a5fa8", "#2e7d32", "#e8831a", "#7c3aed", "#6b7c93"]

const provinceData = [
  { name: "广州", val: 320 },
  { name: "深圳", val: 280 },
  { name: "东莞", val: 180 },
  { name: "佛山", val: 160 },
  { name: "惠州", val: 120 },
  { name: "珠海", val: 90 },
]

const topSuppliers = [
  { name: "广东新供销天润粮油集团",    amt: "¥2,840万", orders: 1240 },
  { name: "茂名荔枝产地直供中心",      amt: "¥1,920万", orders: 860  },
  { name: "广东农垦集团有限公司",      amt: "¥1,650万", orders: 720  },
  { name: "汕头潮阳区社村合作农业",    amt: "¥980万",   orders: 420  },
  { name: "江门台山丝苗米产业集团",    amt: "¥860万",   orders: 380  },
]

export default function JianchaJiancePage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/admin" className="flex items-center gap-2 text-white/60 hover:text-white text-[13px] transition-colors">
          <ArrowLeft className="w-4 h-4" />返回工作台
        </Link>
        <h1 className="text-[22px] font-bold tracking-wider text-center flex-1">
          粤供销公共型农产品产地交易服务平台 · 监察大屏
        </h1>
        <div className="text-[13px] text-white/50 text-right">
          <div>2026-08-02 14:30:22</div>
          <div className="flex items-center gap-1 justify-end mt-0.5">
            <Activity className="w-3 h-3 text-[#2e7d32]" />
            <span className="text-[#2e7d32]">系统运行正常</span>
          </div>
        </div>
      </div>

      {/* Top KPI row */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        {[
          { label: "注册企业",   val: "3,847", unit: "家",  delta: "+12",   up: true,  color: "#1a5fa8" },
          { label: "今日订单",   val: "284",   unit: "单",  delta: "+18%",  up: true,  color: "#2e7d32" },
          { label: "今日成交额", val: "¥380万", unit: "",   delta: "+22%",  up: true,  color: "#e8831a" },
          { label: "在线用户",   val: "1,246", unit: "人",  delta: "-3%",   up: false, color: "#7c3aed" },
          { label: "本月累计额", val: "¥4.2亿", unit: "",   delta: "+8%",  up: true,  color: "#0891b2" },
          { label: "待处理异常", val: "38",    unit: "项",  delta: "+5",    up: false, color: "#dc2626" },
        ].map((k) => (
          <div key={k.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-[11px] text-white/50 mb-2">{k.label}</div>
            <div className="text-[22px] font-bold mb-1" style={{ color: k.color }}>{k.val}<span className="text-[13px] ml-0.5 text-white/40">{k.unit}</span></div>
            <div className={`text-[11px] flex items-center gap-0.5 ${k.up ? "text-[#2e7d32]" : "text-[#dc2626]"}`}>
              {k.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {k.delta} 较昨日
            </div>
          </div>
        ))}
      </div>

      {/* Middle row: line chart + pie + bar */}
      <div className="grid grid-cols-3 gap-5 mb-5">
        {/* Trade trend */}
        <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-5">
          <h2 className="text-[14px] font-semibold text-white/80 mb-4">近7日成交趋势（万元）</h2>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={tradeData}>
              <XAxis dataKey="day" tick={{ fill: "#ffffff60", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#ffffff60", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid #ffffff20", borderRadius: 8, color: "#fff", fontSize: 12 }} />
              <Line type="monotone" dataKey="amt" stroke="#1a5fa8" strokeWidth={2} dot={{ r: 3, fill: "#1a5fa8" }} name="成交额(万)" />
              <Line type="monotone" dataKey="orders" stroke="#e8831a" strokeWidth={2} dot={{ r: 3, fill: "#e8831a" }} name="订单数" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category pie */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h2 className="text-[14px] font-semibold text-white/80 mb-4">商品品类占比</h2>
          <div className="flex items-center gap-3">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie data={categoryData} cx={55} cy={55} innerRadius={32} outerRadius={55} dataKey="value" paddingAngle={3}>
                  {categoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 flex-1">
              {categoryData.map((c, i) => (
                <div key={c.name} className="flex items-center gap-2 text-[12px]">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-white/70 flex-1">{c.name}</span>
                  <span className="text-white/90 font-medium">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row: regional bar + top suppliers */}
      <div className="grid grid-cols-2 gap-5">
        {/* Regional distribution */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h2 className="text-[14px] font-semibold text-white/80 mb-4">各地区成交量（吨）</h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={provinceData} barSize={28}>
              <XAxis dataKey="name" tick={{ fill: "#ffffff60", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#ffffff60", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid #ffffff20", borderRadius: 8, color: "#fff", fontSize: 12 }} />
              <Bar dataKey="val" fill="#1a5fa8" radius={[4, 4, 0, 0]} name="成交量(吨)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top suppliers */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h2 className="text-[14px] font-semibold text-white/80 mb-4">TOP5 供应商成交额</h2>
          <div className="space-y-3">
            {topSuppliers.map((s, i) => (
              <div key={s.name} className="flex items-center gap-3">
                <span className={`w-5 h-5 rounded text-[11px] font-bold flex items-center justify-center shrink-0 ${i < 3 ? "bg-[#e8831a] text-white" : "bg-white/10 text-white/50"}`}>{i + 1}</span>
                <span className="text-[12px] text-white/80 flex-1 truncate">{s.name}</span>
                <span className="text-[13px] font-semibold text-[#e8831a] shrink-0">{s.amt}</span>
                <span className="text-[11px] text-white/40 shrink-0">{s.orders}单</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
