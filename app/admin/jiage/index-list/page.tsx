"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Pencil, Eye, TrendingUp, TrendingDown, Search } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const trendData = [
  { m: "3月", rice: 2820, corn: 2180, peanut: 14200 },
  { m: "4月", rice: 2850, corn: 2200, peanut: 14500 },
  { m: "5月", rice: 2900, corn: 2250, peanut: 15000 },
  { m: "6月", rice: 2880, corn: 2230, peanut: 14800 },
  { m: "7月", rice: 2920, corn: 2260, peanut: 15200 },
  { m: "8月", rice: 2960, corn: 2290, peanut: 15600 },
]

const indices = [
  { id: "JG001", name: "丝苗米价格指数",   category: "粮食", unit: "元/吨",  current: 2960, prev: 2920, change: "+40",  up: true,  updated: "2026-08-02", status: "已发布" },
  { id: "JG002", name: "玉米原粮价格指数", category: "粮食", unit: "元/吨",  current: 2290, prev: 2260, change: "+30",  up: true,  updated: "2026-08-02", status: "已发布" },
  { id: "JG003", name: "花生油价格指数",   category: "油料", unit: "元/吨",  current: 15600, prev: 15200, change: "+400", up: true, updated: "2026-08-02", status: "已发布" },
  { id: "JG004", name: "荔枝价格指数",     category: "水果", unit: "元/公斤", current: 8.5,  prev: 9.2,  change: "-0.7", up: false, updated: "2026-08-01", status: "已发布" },
  { id: "JG005", name: "冬瓜价格指数",     category: "蔬菜", unit: "元/公斤", current: 0.85, prev: 0.82, change: "+0.03", up: true, updated: "2026-08-01", status: "已发布" },
  { id: "JG006", name: "鸡蛋价格指数",     category: "禽蛋", unit: "元/枚",  current: 0.72, prev: 0.75, change: "-0.03", up: false, updated: "2026-08-01", status: "草稿" },
]

export default function JiageIndexListPage() {
  const [keyword, setKeyword] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState<typeof indices[0] | null>(null)

  const filtered = indices.filter(r => !keyword || r.name.includes(keyword) || r.category.includes(keyword))

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">价格指数管理</h1>
          <p className="text-[13px] text-[#6b7c93] mt-0.5">管理平台农产品价格指数，支持发布、编辑和走势查看</p>
        </div>
        <button onClick={() => { setEditTarget(null); setShowModal(true) }} className="flex items-center gap-1.5 px-4 py-2 bg-[#1a1a2e] text-white text-[13px] rounded hover:bg-[#2d2d4e] transition-colors">
          <Plus className="w-3.5 h-3.5" />新增指数
        </button>
      </div>

      {/* Trend chart */}
      <div className="bg-white rounded-xl border border-[#dde3ec] p-5">
        <h2 className="text-[14px] font-semibold text-[#1a1a2e] mb-4">主要品类价格走势（元/吨）</h2>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={trendData}>
            <XAxis dataKey="m" tick={{ fontSize: 12, fill: "#6b7c93" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#6b7c93" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            <Line type="monotone" dataKey="rice"   stroke="#1a5fa8" strokeWidth={2} dot={false} name="丝苗米" />
            <Line type="monotone" dataKey="corn"   stroke="#2e7d32" strokeWidth={2} dot={false} name="玉米" />
            <Line type="monotone" dataKey="peanut" stroke="#e8831a" strokeWidth={2} dot={false} name="花生油" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#dde3ec]">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#dde3ec]">
          <span className="text-[14px] font-semibold text-[#1a1a2e]">指数列表</span>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#999]" />
            <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="搜索品名/品类" className="h-8 border border-[#dde3ec] rounded pl-8 pr-3 text-[12px] focus:outline-none focus:border-[#1a5fa8] w-48" />
          </div>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[#999] text-[12px] border-b border-[#f0f4f9]">
              {["编号","指数名称","品类","单位","当前价格","涨跌","更新时间","状态","操作"].map(h => (
                <th key={h} className="px-5 py-2.5 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr key={row.id} className="border-b border-[#f0f4f9] last:border-0 hover:bg-[#fafbfc]">
                <td className="px-5 py-3 text-[#999] font-mono text-[12px]">{row.id}</td>
                <td className="px-5 py-3 font-medium text-[#1a1a2e]">{row.name}</td>
                <td className="px-5 py-3 text-[#555]">{row.category}</td>
                <td className="px-5 py-3 text-[#6b7c93]">{row.unit}</td>
                <td className="px-5 py-3 font-semibold text-[#1a1a2e]">{row.current}</td>
                <td className="px-5 py-3">
                  <span className={`flex items-center gap-0.5 text-[12px] font-medium ${row.up ? "text-[#dc2626]" : "text-[#2e7d32]"}`}>
                    {row.up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {row.change}
                  </span>
                </td>
                <td className="px-5 py-3 text-[#6b7c93]">{row.updated}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${row.status === "已发布" ? "text-[#2e7d32] bg-[#e8f5e9]" : "text-[#6b7c93] bg-[#f3f4f6]"}`}>{row.status}</span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Link href="/portal/jiage-daping" className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                      <Eye className="w-3.5 h-3.5" />查看
                    </Link>
                    <button onClick={() => { setEditTarget(row); setShowModal(true) }} className="flex items-center gap-1 text-[#e8831a] hover:underline text-[12px]">
                      <Pencil className="w-3.5 h-3.5" />编辑
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl shadow-xl p-6 w-[480px]" onClick={e => e.stopPropagation()}>
            <h3 className="text-[16px] font-bold text-[#1a1a2e] mb-5">{editTarget ? "编辑价格指数" : "新增价格指数"}</h3>
            <div className="space-y-4">
              {[
                { label: "指数名称", placeholder: "如：丝苗米价格指数", defaultValue: editTarget?.name || "" },
                { label: "品类",     placeholder: "如：粮食", defaultValue: editTarget?.category || "" },
                { label: "当前价格", placeholder: "如：2960", defaultValue: editTarget ? String(editTarget.current) : "" },
                { label: "计量单位", placeholder: "如：元/吨", defaultValue: editTarget?.unit || "" },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-[13px] font-medium text-[#444] mb-1.5">{f.label}</label>
                  <input defaultValue={f.defaultValue} placeholder={f.placeholder} className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-[#dde3ec] rounded text-[13px] text-[#555] hover:border-[#1a5fa8]">取消</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-[#1a5fa8] text-white rounded text-[13px] hover:bg-[#0d4a8a]">保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
