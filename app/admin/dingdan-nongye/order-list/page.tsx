"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Download, Eye } from "lucide-react"

const mockData = [
  {
    id: "HT20260501001",
    xqId: "XQ20260501001",
    gyId: "GY20260501001",
    buyer: "平远新供销天润粮油有限公司",
    seller: "惠州新供销天润粮油储备有限公司",
    product: "丝苗米",
    qty: "3000公斤",
    price: "82元/公斤",
    amount: 246000,
    signTime: "2026-04-21 09:30",
    deliveryTime: "2026-04-23",
    status: "履约中",
  },
  {
    id: "HT20260501002",
    xqId: "XQ20260501001",
    gyId: "GY20260501002",
    buyer: "广州供销数字科技有限公司",
    seller: "广州新供销天润米业有限公司",
    product: "丝苗米",
    qty: "2000公斤",
    price: "80元/公斤",
    amount: 160000,
    signTime: "2026-04-20 15:00",
    deliveryTime: "2026-04-23",
    status: "已完成",
  },
  {
    id: "HT20260501003",
    xqId: "XQ20260501003",
    gyId: "GY20260501003",
    buyer: "东莞新供销天润农产品有限公司",
    seller: "广东新供销天润粮油集团有限公司",
    product: "象牙香占",
    qty: "1吨",
    price: "9元/斤",
    amount: 18000,
    signTime: "2026-04-18 11:00",
    deliveryTime: "2026-04-22",
    status: "已完成",
  },
  {
    id: "HT20260501004",
    xqId: "XQ20260501004",
    gyId: "GY20260501004",
    buyer: "广东汕头潮阳天润粮油有限公司",
    seller: "广东天荔冷链物流有限公司",
    product: "土豆",
    qty: "7000公斤",
    price: "1.3元/公斤",
    amount: 9100,
    signTime: "2026-04-15 14:00",
    deliveryTime: "2026-04-18",
    status: "待付款",
  },
  {
    id: "HT20260501005",
    xqId: "XQ20260501005",
    gyId: "GY20260501005",
    buyer: "深圳新供销农业科技有限公司",
    seller: "惠州新供销天润粮油储备有限公司",
    product: "荔枝",
    qty: "1200公斤",
    price: "17元/公斤",
    amount: 20400,
    signTime: "2026-04-22 16:30",
    deliveryTime: "2026-05-05",
    status: "履约中",
  },
]

const tabs = ["全部", "待付款", "履约中", "已完成", "纠纷处理"]

const statusColors: Record<string, { color: string; bg: string }> = {
  "待付款": { color: "#e8831a", bg: "#fff7ed" },
  "履约中": { color: "#1a5fa8", bg: "#e8f4fd" },
  "已完成": { color: "#2e7d32", bg: "#e8f5e9" },
  "纠纷处理": { color: "#e53935", bg: "#fdecea" },
}

export default function AdminOrderListPage() {
  const [activeTab, setActiveTab] = useState("全部")
  const [searchText, setSearchText] = useState("")

  const filtered = mockData.filter(r => {
    if (activeTab !== "全部" && r.status !== activeTab) return false
    if (searchText && !r.id.includes(searchText) && !r.buyer.includes(searchText) && !r.seller.includes(searchText) && !r.product.includes(searchText)) return false
    return true
  })

  const totalAmount = mockData.reduce((s, d) => s + d.amount, 0)

  return (
<div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[20px] font-bold text-[#1a1a2e]">已成交订单管理</h1>
            <p className="text-[13px] text-[#6b7c93] mt-0.5">管理订单农业所有已签约成交的订单，跟进履约状态</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#dde3ec] rounded text-[13px] text-[#444] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
            <Download className="w-4 h-4" />导出数据
          </button>
        </div>

        {/* 统计卡 */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {[
            { label: "成交订单总数", value: String(mockData.length),                                     color: "#1a5fa8" },
            { label: "待付款",       value: String(mockData.filter(d => d.status === "待付款").length),  color: "#e8831a" },
            { label: "履约中",       value: String(mockData.filter(d => d.status === "履约中").length),  color: "#1a5fa8" },
            { label: "已完成",       value: String(mockData.filter(d => d.status === "已完成").length),  color: "#2e7d32" },
            { label: "累计成交额",   value: `${(totalAmount / 10000).toFixed(1)}万元`,                   color: "#e8831a" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-lg border border-[#dde3ec] px-5 py-4">
              <div className="text-[13px] text-[#6b7c93] mb-1">{s.label}</div>
              <div className="text-[24px] font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Tab + 搜索 */}
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
              <input type="text" placeholder="搜索合同编号、买卖双方、商品名称"
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
                {["合同编号", "买方", "卖方", "商品/数量", "成交价", "成交金额", "签约时间", "计划交货", "状态", "操作"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-[#444] border-b border-[#dde3ec] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => {
                const sc = statusColors[row.status] ?? { color: "#999", bg: "#f5f5f5" }
                return (
                  <tr key={row.id} className="border-b border-[#dde3ec] last:border-0 hover:bg-[#fafbfc]">
                    <td className="px-4 py-3 text-[#1a5fa8] font-medium whitespace-nowrap">{row.id}</td>
                    <td className="px-4 py-3">
                      <div className="text-[#333] max-w-[140px] line-clamp-1">{row.buyer}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[#333] max-w-[140px] line-clamp-1">{row.seller}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-[#333]">{row.product}</div>
                      <div className="text-[11px] text-[#6b7c93]">{row.qty}</div>
                    </td>
                    <td className="px-4 py-3 text-[#e8831a] font-medium">{row.price}</td>
                    <td className="px-4 py-3 font-bold text-[#1a1a2e]">
                      {row.amount >= 10000
                        ? `${(row.amount / 10000).toFixed(2)}万元`
                        : `${row.amount.toLocaleString()}元`}
                    </td>
                    <td className="px-4 py-3 text-[#6b7c93] text-[12px] whitespace-nowrap">{row.signTime}</td>
                    <td className="px-4 py-3 text-[#6b7c93] text-[12px] whitespace-nowrap">{row.deliveryTime}</td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full text-[12px] font-medium whitespace-nowrap"
                        style={{ color: sc.color, backgroundColor: sc.bg }}>{row.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/dingdan-nongye/order-list/${row.id}`}
                        className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                        <Eye className="w-3.5 h-3.5" />详情
                      </Link>
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
)
}
