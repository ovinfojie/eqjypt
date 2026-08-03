"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Package, CheckCircle2, Clock, Truck, XCircle } from "lucide-react"

type TabKey = "caigou" | "xiaoshou"
type StatusKey = "all" | "pending" | "processing" | "completed" | "cancelled"

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  pending:    { label: "待处理",  color: "#e8831a", bg: "#fff8f0" },
  processing: { label: "履行中",  color: "#1a5fa8", bg: "#e8f4fd" },
  completed:  { label: "已完成",  color: "#3a8c3f", bg: "#e8f5e9" },
  cancelled:  { label: "已取消",  color: "#6b7c93", bg: "#f5f7fa" },
}

const caigouOrders = [
  { id: "co1", no: "CXO-2026080100023", product: "台山丝苗米", spec: "散装", qty: "5吨", amt: "16,000", seller: "粤西粮食集散中心", date: "2026-08-01", status: "processing" },
  { id: "co2", no: "CXO-2026073100019", product: "荔枝（妃子笑）", spec: "统货", qty: "2吨", amt: "36,000", seller: "茂名荔枝协会", date: "2026-07-31", status: "completed" },
  { id: "co3", no: "CXO-2026072000011", product: "冬瓜（大果）", spec: "20kg+/个", qty: "3吨", amt: "4,200", seller: "惠州蔬菜供应商", date: "2026-07-20", status: "cancelled" },
]

const xiaoshouOrders = [
  { id: "xs1", no: "CXO-2026080100031", product: "南美白对虾", spec: "50/60规格", qty: "1吨", amt: "68,000", buyer: "盒马鲜生采购部", date: "2026-08-01", status: "pending" },
  { id: "xs2", no: "CXO-2026072800024", product: "花生仁（红衣）", spec: "一级品", qty: "10吨", amt: "95,000", buyer: "广粮集团", date: "2026-07-28", status: "processing" },
  { id: "xs3", no: "CXO-2026071500016", product: "番薯（合江品种）", spec: "散装", qty: "20吨", amt: "60,000", buyer: "永辉超市采购", date: "2026-07-15", status: "completed" },
]

const STATUS_TABS: { key: StatusKey; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "pending", label: "待处理" },
  { key: "processing", label: "履行中" },
  { key: "completed", label: "已完成" },
  { key: "cancelled", label: "已取消" },
]

export default function ChanxiaoOrdersPage() {
  const [mainTab, setMainTab] = useState<TabKey>("caigou")
  const [statusTab, setStatusTab] = useState<StatusKey>("all")
  const [keyword, setKeyword] = useState("")

  const orders = mainTab === "caigou" ? caigouOrders : xiaoshouOrders
  const counterpartyKey = mainTab === "caigou" ? "seller" : "buyer"

  const filtered = orders.filter((o: Record<string, string>) => {
    const matchStatus = statusTab === "all" || o.status === statusTab
    const matchKw = !keyword || o.product.includes(keyword) || o.no.includes(keyword) || o[counterpartyKey].includes(keyword)
    return matchStatus && matchKw
  })

  return (
    <div className="max-w-[980px] mx-auto space-y-5">
      <h1 className="text-[20px] font-bold text-[#1a1a2e]">产销对接订单管理</h1>

      {/* 主Tab：我采购 / 我销售 */}
      <div className="flex rounded-lg overflow-hidden border border-[#e8edf5] w-fit">
        {(["caigou", "xiaoshou"] as TabKey[]).map(k => (
          <button key={k} onClick={() => { setMainTab(k); setStatusTab("all") }}
            className={`px-6 py-2 text-[13px] font-medium transition-colors ${mainTab === k ? "bg-[#1a5fa8] text-white" : "bg-white text-[#6b7c93] hover:bg-[#f5f7fa]"}`}>
            {k === "caigou" ? "我采购" : "我销售"}
          </button>
        ))}
      </div>

      {/* 统计 */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "全部订单", value: orders.length, color: "#1a5fa8" },
          { label: "待处理", value: orders.filter(o => o.status === "pending").length, color: "#e8831a" },
          { label: "履行中", value: orders.filter(o => o.status === "processing").length, color: "#3a8c3f" },
          { label: "已完成", value: orders.filter(o => o.status === "completed").length, color: "#6b7c93" },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-lg border border-[#e8edf5] p-4 text-center">
            <div className="text-[22px] font-bold mb-1" style={{ color: c.color }}>{c.value}</div>
            <div className="text-[13px] text-[#6b7c93]">{c.label}</div>
          </div>
        ))}
      </div>

      {/* 搜索 */}
      <div className="bg-white rounded-lg border border-[#e8edf5] p-4 flex items-center gap-3">
        <div className="flex items-center gap-2 border border-[#e8edf5] rounded px-3 py-1.5 flex-1 max-w-[320px]">
          <Search className="w-3.5 h-3.5 text-[#6b7c93] shrink-0" />
          <input type="text" placeholder="搜索订单号/商品名称/对方名称" value={keyword} onChange={e => setKeyword(e.target.value)}
            className="flex-1 text-[13px] outline-none placeholder:text-[#aaa]" />
        </div>
      </div>

      {/* 状态 Tabs */}
      <div className="flex border-b border-[#e8edf5]">
        {STATUS_TABS.map(tab => (
          <button key={tab.key} onClick={() => setStatusTab(tab.key)}
            className={`px-4 py-2.5 text-[13px] font-medium transition-colors ${statusTab === tab.key ? "text-[#1a5fa8] border-b-2 border-[#1a5fa8] -mb-px" : "text-[#6b7c93] hover:text-[#1a5fa8]"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* 列表 */}
      <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-[12px] text-[#6b7c93] bg-[#f8fafc] border-b border-[#e8edf5]">
              <th className="px-4 py-2.5 text-left">订单号</th>
              <th className="px-4 py-2.5 text-left">商品</th>
              <th className="px-4 py-2.5 text-left">{mainTab === "caigou" ? "供应商" : "采购商"}</th>
              <th className="px-4 py-2.5 text-right">数量</th>
              <th className="px-4 py-2.5 text-right">金额</th>
              <th className="px-4 py-2.5 text-center">日期</th>
              <th className="px-4 py-2.5 text-center">状态</th>
              <th className="px-4 py-2.5 text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} className="py-16 text-center text-[13px] text-[#6b7c93]"><Package className="w-10 h-10 text-[#dde3ec] mx-auto mb-2" />暂无订单</td></tr>
            ) : (filtered as Record<string, string>[]).map(o => {
              const s = STATUS_MAP[o.status]
              return (
                <tr key={o.id} className="border-b border-[#f0f4f8] hover:bg-[#f8fafc] text-[13px]">
                  <td className="px-4 py-3 font-mono text-[12px] text-[#555]">{o.no}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-[#1a1a2e]">{o.product}</div>
                    <div className="text-[12px] text-[#6b7c93]">{o.spec}</div>
                  </td>
                  <td className="px-4 py-3 text-[#555]">{o[counterpartyKey]}</td>
                  <td className="px-4 py-3 text-right font-medium">{o.qty}</td>
                  <td className="px-4 py-3 text-right font-semibold text-[#e8831a]">¥{o.amt}</td>
                  <td className="px-4 py-3 text-center text-[#6b7c93]">{o.date}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium" style={{ color: s.color, backgroundColor: s.bg }}>{s.label}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-[12px] text-[#1a5fa8] hover:underline">查看详情</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
