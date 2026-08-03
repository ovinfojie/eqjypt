"use client"

import { useState } from "react"
import Link from "next/link"
import { Download, Search, Filter, BarChart2, TrendingUp, FileText, Calendar } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const monthData = [
  { month: "1月", amount: 128000, count: 32 },
  { month: "2月", amount: 96000,  count: 24 },
  { month: "3月", amount: 154000, count: 41 },
  { month: "4月", amount: 132000, count: 35 },
  { month: "5月", amount: 178000, count: 48 },
  { month: "6月", amount: 201000, count: 56 },
  { month: "7月", amount: 189000, count: 52 },
]

const ROWS = [
  { id: "BS2026070001", project: "荔枝产地直供补贴", type: "产地直供", merchant: "茂名荔枝直供中心", amount: 12800, status: "已发放", date: "2026-07-15", period: "2026-07" },
  { id: "BS2026070002", project: "绿色蔬菜采购补贴", type: "绿色农产品", merchant: "广州有机农场", amount: 8600,  status: "已发放", date: "2026-07-14", period: "2026-07" },
  { id: "BS2026070003", project: "粮食订单农业补贴", type: "订单农业",   merchant: "江门粮油合作社", amount: 21000, status: "待发放", date: "2026-07-13", period: "2026-07" },
  { id: "BS2026070004", project: "生猪直供补贴",     type: "畜禽产品",   merchant: "清远温氏农牧",   amount: 15400, status: "待审核", date: "2026-07-12", period: "2026-07" },
  { id: "BS2026070005", project: "咖啡豆出口补贴",   type: "特色农产品", merchant: "云南普洱咖啡庄", amount: 9200,  status: "已发放", date: "2026-07-11", period: "2026-07" },
  { id: "BS2026060001", project: "水产品冷链补贴",   type: "水产品",     merchant: "湛江海鲜供应链", amount: 17800, status: "已发放", date: "2026-06-30", period: "2026-06" },
  { id: "BS2026060002", project: "荔枝产地直供补贴", type: "产地直供",   merchant: "茂名荔枝直供中心", amount: 11200, status: "已发放", date: "2026-06-28", period: "2026-06" },
]

const STATUS_STYLE: Record<string, string> = {
  已发放: "bg-[#e8f5e9] text-[#2e7d32]",
  待发放: "bg-[#fff8e1] text-[#e65100]",
  待审核: "bg-[#e3f2fd] text-[#1565c0]",
}

export default function ButieReportPage() {
  const [search, setSearch] = useState("")
  const [period, setPeriod] = useState("")
  const [status, setStatus] = useState("")

  const filtered = ROWS.filter(r =>
    (!search || r.merchant.includes(search) || r.project.includes(search) || r.id.includes(search)) &&
    (!period || r.period === period) &&
    (!status || r.status === status)
  )

  const totalAmount = filtered.reduce((s, r) => s + r.amount, 0)
  const issued = filtered.filter(r => r.status === "已发放").reduce((s, r) => s + r.amount, 0)
  const pending = filtered.filter(r => r.status !== "已发放").length

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-bold text-[#1a1a2e]">补贴报表</h1>
          <p className="text-[13px] text-[#999] mt-0.5">补贴发放统计与明细查询</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] text-white text-[13px] rounded-lg hover:bg-[#2d2d4e] transition-colors">
          <Download className="w-4 h-4" />导出报表
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "本月补贴总额", value: `¥${(totalAmount/10000).toFixed(1)}万`, icon: BarChart2, color: "text-[#1a5fa8]" },
          { label: "已发放金额",   value: `¥${(issued/10000).toFixed(1)}万`,      icon: TrendingUp, color: "text-[#2e7d32]" },
          { label: "待处理笔数",   value: `${pending}笔`,                           icon: FileText,   color: "text-[#e65100]" },
          { label: "参与商户",     value: `${new Set(filtered.map(r=>r.merchant)).size}家`, icon: Calendar, color: "text-[#7b1fa2]" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-[#dde3ec] p-4">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <span className="text-[12px] text-[#999]">{s.label}</span>
            </div>
            <div className={`text-[22px] font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-[#dde3ec] p-4">
          <h3 className="text-[14px] font-semibold text-[#333] mb-4">月度补贴发放金额（元）</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v/10000).toFixed(0)}万`} />
              <Tooltip formatter={(v) => [`¥${Number(v).toLocaleString()}`, "金额"]} />
              <Bar dataKey="amount" fill="#1a5fa8" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-[#dde3ec] p-4">
          <h3 className="text-[14px] font-semibold text-[#333] mb-4">月度补贴笔数趋势</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={monthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [`${Number(v)}笔`, "笔数"]} />
              <Line type="monotone" dataKey="count" stroke="#3a8c3f" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#dde3ec] p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 border border-[#dde3ec] rounded-lg px-3 py-2 flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-[#999]" />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="搜索商户名称/项目/编号" className="text-[13px] outline-none flex-1 bg-transparent" />
          </div>
          <select value={period} onChange={e=>setPeriod(e.target.value)} className="border border-[#dde3ec] rounded-lg px-3 py-2 text-[13px] text-[#333] outline-none">
            <option value="">全部期间</option>
            <option value="2026-07">2026年7月</option>
            <option value="2026-06">2026年6月</option>
          </select>
          <select value={status} onChange={e=>setStatus(e.target.value)} className="border border-[#dde3ec] rounded-lg px-3 py-2 text-[13px] text-[#333] outline-none">
            <option value="">全部状态</option>
            <option value="已发放">已发放</option>
            <option value="待发放">待发放</option>
            <option value="待审核">待审核</option>
          </select>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-[#dde3ec] text-[13px] text-[#666] rounded-lg hover:bg-[#f5f7fa]">
            <Filter className="w-3.5 h-3.5" />重置
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#dde3ec] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#dde3ec] bg-[#f8fafc]">
              {["补贴编号","补贴项目","类型","商户名称","补贴金额","状态","发放日期","操作"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[12px] font-semibold text-[#999]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={r.id} className={`border-b border-[#f0f0f0] hover:bg-[#fafbfc] ${i%2===1?"bg-[#fafbfc]":""}`}>
                <td className="px-4 py-3 text-[12px] text-[#1a5fa8] font-mono">{r.id}</td>
                <td className="px-4 py-3 text-[13px] text-[#333]">{r.project}</td>
                <td className="px-4 py-3 text-[12px] text-[#666]">{r.type}</td>
                <td className="px-4 py-3 text-[13px] text-[#333]">{r.merchant}</td>
                <td className="px-4 py-3 text-[13px] font-semibold text-[#e8831a]">¥{r.amount.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${STATUS_STYLE[r.status]}`}>{r.status}</span>
                </td>
                <td className="px-4 py-3 text-[12px] text-[#666]">{r.date}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/butie/list`} className="text-[12px] text-[#1a5fa8] hover:underline">查看详情</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#999] text-[13px]">暂无数据</div>
        )}
        <div className="px-4 py-3 border-t border-[#f0f0f0] flex items-center justify-between">
          <span className="text-[12px] text-[#999]">共 {filtered.length} 条记录</span>
          <span className="text-[12px] font-semibold text-[#333]">合计补贴：<span className="text-[#e8831a]">¥{totalAmount.toLocaleString()}</span></span>
        </div>
      </div>
    </div>
  )
}
