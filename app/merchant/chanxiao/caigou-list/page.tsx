"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Eye, Edit2, Trash2 } from "lucide-react"

type StatusFilter = "全部" | "采购中" | "已完成" | "已关闭" | "即将结束"

const rows = [
  { id: "CG20260601001", title: "2026年广东省大批量优质丝苗米长期采购", category: "粮油", qty: "50吨", budget: "18万元", deadline: "2026-06-30", status: "采购中", inquiries: 12 },
  { id: "CG20260601002", title: "饲料用玉米大批量长期采购", category: "粮油", qty: "120吨/月", budget: "面议", deadline: "2026-07-20", status: "采购中", inquiries: 0 },
  { id: "CG20260601003", title: "非转基因大豆采购", category: "粮油", qty: "30吨", budget: "12万元", deadline: "2026-06-10", status: "已完成", inquiries: 5 },
  { id: "CG20260601004", title: "广东省内优质有机蔬菜长期稳定供货", category: "蔬菜", qty: "500公斤/天", budget: "面议", deadline: "2026-12-31", status: "采购中", inquiries: 7 },
  { id: "CG20260601005", title: "2026年应季荔枝大量收购", category: "水果", qty: "200吨", budget: "面议", deadline: "2026-07-15", status: "即将结束", inquiries: 18 },
]

const statusColors: Record<string, { text: string; bg: string }> = {
  "采购中":   { text: "#1a5fa8", bg: "#e8f4fd" },
  "已完成":   { text: "#6b7c93", bg: "#f0f2f5" },
  "已关闭":   { text: "#888", bg: "#f5f5f5" },
  "即将结束": { text: "#e8831a", bg: "#fff4e6" },
}

const statusFilters: StatusFilter[] = ["全部", "采购中", "即将结束", "已完成", "已关闭"]

export default function CaigouListPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("全部")
  const [keyword, setKeyword] = useState("")

  const filtered = rows.filter(r =>
    (statusFilter === "全部" || r.status === statusFilter) &&
    (keyword === "" || r.title.includes(keyword))
  )

  return (
<div className="max-w-[960px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-[18px] font-bold text-[#1a1a2e]">我的采购需求</h1>
            <p className="text-[13px] text-[#888] mt-0.5">管理您发布的采购需求，查看供应商报价</p>
          </div>
          <Link
            href="/merchant/chanxiao/fabu-caigou"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded-lg hover:bg-[#0d4a8a] transition-colors"
          >
            <Plus className="w-4 h-4" />发布采购需求
          </Link>
        </div>

        {/* Search + status filter */}
        <div className="bg-white rounded-xl border border-[#e8edf5] p-4 mb-4">
          <div className="flex gap-3 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aab]" />
              <input value={keyword} onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索采购标题..."
                className="w-full pl-9 pr-4 py-2 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
            </div>
            <button className="px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded-lg hover:bg-[#0d4a8a] transition-colors">搜索</button>
          </div>
          <div className="flex gap-2">
            {statusFilters.map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded-full text-[12px] transition-colors ${
                  statusFilter === s ? "bg-[#1a5fa8] text-white" : "bg-[#f0f2f5] text-[#555] hover:bg-[#e8f4fd] hover:text-[#1a5fa8]"
                }`}
              >{s}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f8f9fc] border-b border-[#e8edf5] text-[12px] text-[#888]">
                <th className="text-left px-4 py-3 font-medium">需求标题</th>
                <th className="text-left px-4 py-3 font-medium">分类</th>
                <th className="text-left px-4 py-3 font-medium">采购量</th>
                <th className="text-left px-4 py-3 font-medium">预算</th>
                <th className="text-left px-4 py-3 font-medium">截止日期</th>
                <th className="text-center px-4 py-3 font-medium">报价数</th>
                <th className="text-center px-4 py-3 font-medium">状态</th>
                <th className="text-center px-4 py-3 font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f2f5]">
              {filtered.map((row) => {
                const sc = statusColors[row.status] ?? statusColors["采购中"]
                return (
                  <tr key={row.id} className="hover:bg-[#fafbfc] transition-colors">
                    <td className="px-4 py-3.5">
                      <Link href={`/portal/chanxiao-duijie/caigou-detail?id=${row.id}`}
                        className="text-[13px] font-medium text-[#333] hover:text-[#1a5fa8] line-clamp-1">{row.title}</Link>
                      <div className="text-[11px] text-[#bbb] mt-0.5">{row.id}</div>
                    </td>
                    <td className="px-4 py-3.5 text-[13px] text-[#666]">{row.category}</td>
                    <td className="px-4 py-3.5 text-[13px] text-[#666]">{row.qty}</td>
                    <td className="px-4 py-3.5 text-[13px] text-[#666]">{row.budget}</td>
                    <td className="px-4 py-3.5 text-[13px] text-[#666]">{row.deadline}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="text-[15px] font-semibold text-[#1a5fa8]">{row.inquiries}</span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium" style={{ color: sc.text, background: sc.bg }}>{row.status}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-center gap-3">
                        <Link href={`/merchant/chanxiao/caigou-list/${row.id}`}
                          className="flex items-center gap-1 text-[12px] text-[#1a5fa8] hover:underline">
                          <Eye className="w-3.5 h-3.5" />查看
                        </Link>
                        {row.status === "采购中" && (
                          <button className="flex items-center gap-1 text-[12px] text-[#e8831a] hover:underline">
                            <Edit2 className="w-3.5 h-3.5" />编辑
                          </button>
                        )}
                        {row.status !== "已完成" && (
                          <button className="flex items-center gap-1 text-[12px] text-[#e53e3e] hover:underline">
                            <Trash2 className="w-3.5 h-3.5" />关闭
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-[13px] text-[#bbb]">暂无采购需求</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
)
}
