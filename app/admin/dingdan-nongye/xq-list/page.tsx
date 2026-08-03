"use client"

import { useState } from "react"
import Link from "next/link"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Search, Download, Eye, CheckCircle, XCircle } from "lucide-react"

const mockData = [
  {
    id: "XQ20260501001", publisher: "平远新供销天润粮油有限公司",
    title: "2026年广东省内计划大量采购丝苗米",
    product: "丝苗米", qty: "9000公斤", progress: 6630, total: 9000, unit: "公斤",
    priceRange: "78~88元/kg", deadline: "2026-04-25", quoteCount: 8, status: "正在进行", created: "2026-04-01",
  },
  {
    id: "XQ20260501002", publisher: "江门新供销天润农业发展有限公司",
    title: "2026年广东省内计划大量采购菠萝干",
    product: "菠萝干", qty: "8000公斤", progress: 0, total: 8000, unit: "公斤",
    priceRange: "25~30元/kg", deadline: "2026-04-25", quoteCount: 0, status: "待审核", created: "2026-04-02",
  },
  {
    id: "XQ20260501003", publisher: "东莞新供销天润农产品有限公司",
    title: "2026年广东省内计划大量采购象牙香占",
    product: "象牙香占", qty: "2吨", progress: 0, total: 2, unit: "吨",
    priceRange: "8~10元/斤", deadline: "2026-04-20", quoteCount: 2, status: "已结束", created: "2026-03-15",
  },
  {
    id: "XQ20260501004", publisher: "广东汕头潮阳天润粮油有限公司",
    title: "2026年广东省内计划大量采购恩平土豆",
    product: "土豆", qty: "7000公斤", progress: 7000, total: 7000, unit: "公斤",
    priceRange: "1.2~1.5元/公斤", deadline: "2026-04-20", quoteCount: 5, status: "已结束", created: "2026-03-10",
  },
  {
    id: "XQ20260501005", publisher: "广州供销数字科技有限公司",
    title: "2026年广东省内计划大量采购新鲜荔枝",
    product: "荔枝", qty: "5000公斤", progress: 1200, total: 5000, unit: "公斤",
    priceRange: "15~20元/公斤", deadline: "2026-05-10", quoteCount: 3, status: "正在进行", created: "2026-04-10",
  },
  {
    id: "XQ20260501006", publisher: "深圳新供销农业科技有限公司",
    title: "2026年广东省内计划大量采购冬瓜",
    product: "冬瓜", qty: "12000公斤", progress: 0, total: 12000, unit: "公斤",
    priceRange: "2~3元/公斤", deadline: "2026-05-15", quoteCount: 0, status: "驳回待修改", created: "2026-04-12",
  },
]

const tabs = ["全部", "待审核", "驳回待修改", "正在进行", "已结束", "已关闭"]

const statusColors: Record<string, { color: string; bg: string }> = {
  "正在进行":   { color: "#1a5fa8", bg: "#e8f4fd" },
  "待审核":     { color: "#e8831a", bg: "#fff7ed" },
  "驳回待修改": { color: "#e53935", bg: "#fdecea" },
  "已结束":     { color: "#2e7d32", bg: "#e8f5e9" },
  "已关闭":     { color: "#999",    bg: "#f5f5f5" },
}

export default function AdminXqListPage() {
  const [activeTab, setActiveTab] = useState("全部")
  const [searchText, setSearchText] = useState("")

  const filtered = mockData.filter(r => {
    if (activeTab !== "全部" && r.status !== activeTab) return false
    if (searchText && !r.title.includes(searchText) && !r.id.includes(searchText) && !r.publisher.includes(searchText)) return false
    return true
  })

  return (
    <AdminLayout>
      <div>
        {/* 页头 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[20px] font-bold text-[#1a1a2e]">订单种植需求管理</h1>
            <p className="text-[13px] text-[#6b7c93] mt-0.5">管理平台所有订单种植采购需求，审核发布状态</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#dde3ec] rounded text-[13px] text-[#444] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
            <Download className="w-4 h-4" />导出数据
          </button>
        </div>

        {/* 统计卡 */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {[
            { label: "需求总数",   value: String(mockData.length), color: "#1a5fa8" },
            { label: "待审核",     value: String(mockData.filter(d => d.status === "待审核").length), color: "#e8831a" },
            { label: "正在进行",   value: String(mockData.filter(d => d.status === "正在进行").length), color: "#1a5fa8" },
            { label: "已结束",     value: String(mockData.filter(d => d.status === "已结束").length), color: "#2e7d32" },
            { label: "驳回待修改", value: String(mockData.filter(d => d.status === "驳回待修改").length), color: "#e53935" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-lg border border-[#dde3ec] px-5 py-4">
              <div className="text-[13px] text-[#6b7c93] mb-1">{s.label}</div>
              <div className="text-[28px] font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* 搜索 + Tab */}
        <div className="bg-white rounded-lg border border-[#dde3ec] mb-4">
          <div className="flex border-b border-[#dde3ec] px-4">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-[13px] font-medium border-b-2 transition-colors ${
                  activeTab === tab ? "border-[#1a5fa8] text-[#1a5fa8]" : "border-transparent text-[#666] hover:text-[#1a5fa8]"
                }`}>
                {tab}
                {tab !== "全部" && (
                  <span className="ml-1.5 px-1.5 py-0.5 bg-[#f0f4f8] text-[#6b7c93] text-[11px] rounded-full">
                    {mockData.filter(d => d.status === tab).length}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 p-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
              <input type="text" placeholder="搜索编号、标题、发布企业"
                value={searchText} onChange={e => setSearchText(e.target.value)}
                className="w-full h-9 border border-[#dde3ec] rounded pl-9 pr-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
            </div>
          </div>
        </div>

        {/* 表格 */}
        <div className="bg-white rounded-lg border border-[#dde3ec] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead className="bg-[#f5f7fa]">
              <tr>
                {["需求编号", "发布企业", "需求标题", "商品/数量", "需求进度", "报价数", "截止日期", "状态", "操作"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-[#444] border-b border-[#dde3ec] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => {
                const pct = row.total > 0 ? Math.round(row.progress / row.total * 100) : 0
                const sc = statusColors[row.status] ?? { color: "#999", bg: "#f5f5f5" }
                return (
                  <tr key={row.id} className="border-b border-[#dde3ec] last:border-0 hover:bg-[#fafbfc]">
                    <td className="px-4 py-3 text-[#1a5fa8] font-medium whitespace-nowrap">{row.id}</td>
                    <td className="px-4 py-3">
                      <div className="text-[#333] max-w-[160px] line-clamp-1">{row.publisher}</div>
                      <div className="text-[11px] text-[#999]">{row.created}</div>
                    </td>
                    <td className="px-4 py-3 max-w-[200px]">
                      <div className="text-[#333] line-clamp-1">{row.title}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-[#333]">{row.product}</div>
                      <div className="text-[11px] text-[#6b7c93]">{row.qty}</div>
                    </td>
                    <td className="px-4 py-3 w-36">
                      <div className="text-[12px] text-[#666] mb-1">{pct}%</div>
                      <div className="h-1.5 bg-[#e8edf5] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${pct >= 100 ? "bg-[#2e7d32]" : "bg-[#1a5fa8]"}`}
                          style={{ width: `${Math.min(pct, 100)}%` }} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-[#e8831a]">{row.quoteCount}</span>
                      <span className="text-[#999] ml-0.5">个</span>
                    </td>
                    <td className="px-4 py-3 text-[#6b7c93] whitespace-nowrap">{row.deadline}</td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full text-[12px] font-medium whitespace-nowrap"
                        style={{ color: sc.color, backgroundColor: sc.bg }}>{row.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/dingdan-nongye/xq-list/${row.id}`}
                          className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                          <Eye className="w-3.5 h-3.5" />详情
                        </Link>
                        {row.status === "待审核" && (
                          <>
                            <button className="flex items-center gap-1 text-[#2e7d32] hover:underline text-[12px]">
                              <CheckCircle className="w-3.5 h-3.5" />通过
                            </button>
                            <button className="flex items-center gap-1 text-red-500 hover:underline text-[12px]">
                              <XCircle className="w-3.5 h-3.5" />驳回
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#dde3ec]">
            <span className="text-[13px] text-[#6b7c93]">共 {filtered.length} 条记录</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map(p => (
                <button key={p} className={`w-8 h-8 rounded text-[13px] transition-colors ${p === 1 ? "bg-[#1a5fa8] text-white" : "text-[#444] hover:bg-[#f0f4f8]"}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
