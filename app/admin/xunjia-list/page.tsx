"use client"

import { useState } from "react"
import { Search, Filter, Download, Eye, CheckCircle, XCircle, Clock } from "lucide-react"

const statusMap: Record<string, { label: string; color: string; bg: string }> = {
  pending:   { label: "待审核", color: "#e8831a", bg: "#fff7ed" },
  active:    { label: "报价中", color: "#1a5fa8", bg: "#e8f4fd" },
  completed: { label: "已完成", color: "#2e7d32", bg: "#e8f5e9" },
  cancelled: { label: "已取消", color: "#999",    bg: "#f5f5f5" },
}

const mockData = [
  {
    id: "XJ20260430001",
    title: "2026年广东省内计划大量采购丝苗米",
    buyer: "盒马超市采购部",
    supplier: "广东新供销天润粮油集团有限公司",
    product: "丝苗米",
    qty: "100吨",
    priceRange: "2800~3000元/吨",
    deadline: "2026-04-25 23:59",
    quoteCount: 3,
    status: "active",
    created: "2026-04-20",
  },
  {
    id: "XJ20260429002",
    title: "2026年广东省内计划采购玉米原粮",
    buyer: "广州市粮食集团",
    supplier: "汕头潮阳区社村合作农业发展有限公司",
    product: "玉米",
    qty: "500吨",
    priceRange: "2200~2400元/吨",
    deadline: "2026-04-28 18:00",
    quoteCount: 7,
    status: "active",
    created: "2026-04-19",
  },
  {
    id: "XJ20260428003",
    title: "大米类批量采购询价",
    buyer: "永辉超市采购部",
    supplier: "——",
    product: "大米",
    qty: "200吨",
    priceRange: "待定",
    deadline: "2026-04-30 17:00",
    quoteCount: 0,
    status: "pending",
    created: "2026-04-18",
  },
  {
    id: "XJ20260425004",
    title: "花生油产地直采询价",
    buyer: "华润万家广州采购中心",
    supplier: "广东农垦集团有限公司",
    product: "花生油",
    qty: "50吨",
    priceRange: "14000~16000元/吨",
    deadline: "2026-04-22 17:00",
    quoteCount: 5,
    status: "completed",
    created: "2026-04-15",
  },
  {
    id: "XJ20260424005",
    title: "冬瓜批量采购",
    buyer: "深圳农产品流通有限公司",
    supplier: "——",
    product: "冬瓜",
    qty: "30吨",
    priceRange: "800~1000元/吨",
    deadline: "2026-04-20 17:00",
    quoteCount: 0,
    status: "cancelled",
    created: "2026-04-14",
  },
]

const tabs = [
  { key: "all", label: "全部" },
  { key: "pending", label: "待审核" },
  { key: "active", label: "报价中" },
  { key: "completed", label: "已完成" },
  { key: "cancelled", label: "已取消" },
]

export default function XunjiaListPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchText, setSearchText] = useState("")

  const filtered = mockData.filter((d) => {
    const matchTab = activeTab === "all" || d.status === activeTab
    const matchSearch = d.title.includes(searchText) || d.id.includes(searchText) || d.buyer.includes(searchText)
    return matchTab && matchSearch
  })

  return (
    <div>
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[20px] font-bold text-[#1a1a2e]">需求管理列表</h1>
            <p className="text-[13px] text-[#6b7c93] mt-0.5">管理平台所有采购询价需求，审核、跟进报价进度</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#dde3ec] rounded text-[13px] text-[#444] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
            <Download className="w-4 h-4" />
            导出数据
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "今日新增需求", value: "12", color: "#1a5fa8" },
            { label: "报价中", value: "38", color: "#e8831a" },
            { label: "本月完成", value: "127", color: "#2e7d32" },
            { label: "待审核", value: "5", color: "#999" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-lg border border-[#dde3ec] px-5 py-4">
              <div className="text-[13px] text-[#6b7c93] mb-1">{s.label}</div>
              <div className="text-[28px] font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-[#dde3ec] mb-4">
          {/* Tabs */}
          <div className="flex border-b border-[#dde3ec] px-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 text-[13px] font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-[#1a5fa8] text-[#1a5fa8]"
                    : "border-transparent text-[#666] hover:text-[#1a5fa8]"
                }`}
              >
                {tab.label}
                {tab.key !== "all" && (
                  <span className="ml-1.5 px-1.5 py-0.5 bg-[#f0f4f8] text-[#6b7c93] text-[11px] rounded-full">
                    {mockData.filter((d) => d.status === tab.key).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search & filter bar */}
          <div className="flex items-center gap-3 p-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
              <input
                type="text"
                placeholder="搜索需求编号、标题、买家名称"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full h-9 border border-[#dde3ec] rounded pl-9 pr-3 text-[13px] outline-none focus:border-[#1a5fa8]"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-[#dde3ec] rounded text-[13px] text-[#444] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
              <Filter className="w-4 h-4" />
              筛选
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-[#dde3ec] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead className="bg-[#f5f7fa]">
              <tr>
                {["需求编号", "需求标题", "买家", "商品/数量", "报价区间", "报价截止", "报价数", "状态", "操作"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-[#444] border-b border-[#dde3ec]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => {
                const st = statusMap[row.status]
                return (
                  <tr key={row.id} className="border-b border-[#dde3ec] last:border-0 hover:bg-[#fafbfc]">
                    <td className="px-4 py-3 text-[#1a5fa8] font-medium">{row.id}</td>
                    <td className="px-4 py-3 max-w-[200px]">
                      <div className="font-medium text-[#1a1a2e] line-clamp-1">{row.title}</div>
                      <div className="text-[11px] text-[#999] mt-0.5">{row.created}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-[#333]">{row.buyer}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{row.product}</div>
                      <div className="text-[#6b7c93] text-[12px]">{row.qty}</div>
                    </td>
                    <td className="px-4 py-3 text-[#333]">{row.priceRange}</td>
                    <td className="px-4 py-3 text-[#6b7c93]">{row.deadline}</td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-[#1a5fa8]">{row.quoteCount}</span>
                      <span className="text-[#999] ml-0.5">个</span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2.5 py-1 rounded-full text-[12px] font-medium"
                        style={{ color: st.color, backgroundColor: st.bg }}
                      >
                        {st.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                          <Eye className="w-3.5 h-3.5" />
                          详情
                        </button>
                        {row.status === "pending" && (
                          <>
                            <button className="flex items-center gap-1 text-[#2e7d32] hover:underline text-[12px]">
                              <CheckCircle className="w-3.5 h-3.5" />
                              通过
                            </button>
                            <button className="flex items-center gap-1 text-red-500 hover:underline text-[12px]">
                              <XCircle className="w-3.5 h-3.5" />
                              驳回
                            </button>
                          </>
                        )}
                        {row.status === "active" && (
                          <button className="flex items-center gap-1 text-[#e8831a] hover:underline text-[12px]">
                            <Clock className="w-3.5 h-3.5" />
                            催报价
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#dde3ec]">
            <span className="text-[13px] text-[#6b7c93]">共 {mockData.length} 条记录</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className={`w-8 h-8 rounded text-[13px] transition-colors ${
                    p === 1 ? "bg-[#1a5fa8] text-white" : "text-[#444] hover:bg-[#f0f4f8]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}
