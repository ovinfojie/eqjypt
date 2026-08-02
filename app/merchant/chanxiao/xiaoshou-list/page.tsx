"use client"

import { useState } from "react"
import Link from "next/link"
import { MerchantLayout } from "@/components/merchant/merchant-layout"
import { Plus, Search, Eye, Edit2, Trash2 } from "lucide-react"

type StatusFilter = "全部" | "销售中" | "即将结束" | "已完成" | "已关闭"

const rows = [
  { id: "XS20260601001", title: "2026年新产丰两优大米大量供应", category: "粮油", qty: "300吨", price: "2.8~3.2元/斤", validUntil: "2026-08-31", status: "销售中", inquiries: 8 },
  { id: "XS20260601002", title: "有机菜心、芥兰周年稳定供应", category: "蔬菜", qty: "2000公斤/天", price: "3.5~4.5元/斤", validUntil: "2026-12-31", status: "销售中", inquiries: 15 },
  { id: "XS20260601003", title: "2026年粤西荔枝火热供应中", category: "水果", qty: "500吨", price: "15~25元/斤", validUntil: "2026-07-31", status: "即将结束", inquiries: 42 },
  { id: "XS20260601004", title: "南海鲜活海鲜直供", category: "水产", qty: "10吨/天", price: "面议", validUntil: "2026-12-31", status: "销售中", inquiries: 23 },
  { id: "XS20260601005", title: "土鸡蛋特价批量出售", category: "畜禽", qty: "5000枚/周", price: "1.2元/枚", validUntil: "2026-06-30", status: "已完成", inquiries: 6 },
]

const statusColors: Record<string, { text: string; bg: string }> = {
  "销售中":   { text: "#3a8c3f", bg: "#f0fdf4" },
  "即将结束": { text: "#e8831a", bg: "#fff4e6" },
  "已完成":   { text: "#6b7c93", bg: "#f0f2f5" },
  "已关闭":   { text: "#888", bg: "#f5f5f5" },
}

const statusFilters: StatusFilter[] = ["全部", "销售中", "即将结束", "已完成", "已关闭"]

export default function XiaoshouListPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("全部")
  const [keyword, setKeyword] = useState("")

  const filtered = rows.filter(r =>
    (statusFilter === "全部" || r.status === statusFilter) &&
    (keyword === "" || r.title.includes(keyword))
  )

  return (
    <MerchantLayout>
      <div className="max-w-[960px]">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-[18px] font-bold text-[#1a1a2e]">我的销售信息</h1>
            <p className="text-[13px] text-[#888] mt-0.5">管理您发布的销售供应信息，查看买方询价</p>
          </div>
          <Link href="/merchant/chanxiao/fabu-xiaoshou"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#3a8c3f] text-white text-[13px] font-semibold rounded-lg hover:bg-[#2d6e32] transition-colors">
            <Plus className="w-4 h-4" />发布销售信息
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-[#e8edf5] p-4 mb-4">
          <div className="flex gap-3 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aab]" />
              <input value={keyword} onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索销售标题..."
                className="w-full pl-9 pr-4 py-2 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
            </div>
            <button className="px-5 py-2 bg-[#3a8c3f] text-white text-[13px] rounded-lg hover:bg-[#2d6e32] transition-colors">搜索</button>
          </div>
          <div className="flex gap-2">
            {statusFilters.map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded-full text-[12px] transition-colors ${
                  statusFilter === s ? "bg-[#3a8c3f] text-white" : "bg-[#f0f2f5] text-[#555] hover:bg-[#f0fdf4] hover:text-[#3a8c3f]"
                }`}>{s}</button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f8f9fc] border-b border-[#e8edf5] text-[12px] text-[#888]">
                <th className="text-left px-4 py-3 font-medium">销售标题</th>
                <th className="text-left px-4 py-3 font-medium">分类</th>
                <th className="text-left px-4 py-3 font-medium">供应量</th>
                <th className="text-left px-4 py-3 font-medium">价格区间</th>
                <th className="text-left px-4 py-3 font-medium">有效期至</th>
                <th className="text-center px-4 py-3 font-medium">询价数</th>
                <th className="text-center px-4 py-3 font-medium">状态</th>
                <th className="text-center px-4 py-3 font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f2f5]">
              {filtered.map((row) => {
                const sc = statusColors[row.status] ?? statusColors["销售中"]
                return (
                  <tr key={row.id} className="hover:bg-[#fafbfc] transition-colors">
                    <td className="px-4 py-3.5">
                      <Link href={`/portal/chanxiao-duijie/xiaoshou-detail?id=${row.id}`}
                        className="text-[13px] font-medium text-[#333] hover:text-[#1a5fa8] line-clamp-1">{row.title}</Link>
                      <div className="text-[11px] text-[#bbb] mt-0.5">{row.id}</div>
                    </td>
                    <td className="px-4 py-3.5 text-[13px] text-[#666]">{row.category}</td>
                    <td className="px-4 py-3.5 text-[13px] text-[#666]">{row.qty}</td>
                    <td className="px-4 py-3.5 text-[13px] text-[#e8831a] font-medium">{row.price}</td>
                    <td className="px-4 py-3.5 text-[13px] text-[#666]">{row.validUntil}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="text-[15px] font-semibold text-[#3a8c3f]">{row.inquiries}</span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium" style={{ color: sc.text, background: sc.bg }}>{row.status}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-center gap-3">
                        <Link href={`/merchant/chanxiao/xiaoshou-list/${row.id}`}
                          className="flex items-center gap-1 text-[12px] text-[#1a5fa8] hover:underline">
                          <Eye className="w-3.5 h-3.5" />查看
                        </Link>
                        {row.status === "销售中" && (
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
                  <td colSpan={8} className="px-4 py-12 text-center text-[13px] text-[#bbb]">暂无销售信息</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MerchantLayout>
  )
}
