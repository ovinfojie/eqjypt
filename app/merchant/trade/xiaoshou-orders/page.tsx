"use client"

import { useState } from "react"
import { Search, ChevronDown, RefreshCw, Clock, Truck, CheckCircle2, XCircle, CreditCard, Package } from "lucide-react"
import Link from "next/link"

type OrderStatus = "all"|"pending_confirm"|"pending_delivery"|"shipping"|"pending_accept"|"completed"|"cancelled"

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  pending_confirm:  { label: "待我确认",  color: "#e8831a", bg: "#fff8f0", icon: Clock },
  pending_delivery: { label: "待发货",    color: "#1a5fa8", bg: "#e8f4fd", icon: Package },
  shipping:         { label: "已发货",    color: "#3a8c3f", bg: "#e8f5e9", icon: Truck },
  pending_accept:   { label: "待买家验收", color: "#7c3aed", bg: "#f3e8ff", icon: CheckCircle2 },
  completed:        { label: "已完成",    color: "#6b7c93", bg: "#f5f7fa", icon: CheckCircle2 },
  cancelled:        { label: "已取消",    color: "#ef4444", bg: "#fef2f2", icon: XCircle },
}

const TABS = [
  { key: "all",             label: "全部" },
  { key: "pending_confirm", label: "待确认", count: 1 },
  { key: "pending_delivery",label: "待发货", count: 2 },
  { key: "shipping",        label: "已发货" },
  { key: "pending_accept",  label: "待验收" },
  { key: "completed",       label: "已完成" },
  { key: "cancelled",       label: "已取消" },
]

const orders = [
  { id: "s1", orderNo: "SO2026080100055", createdAt: "2026-08-01 14:22", status: "pending_confirm" as OrderStatus, buyer: "广州某超市集团", total: 2880.00, deliveryType: "买家自提", paymentMethod: "月结授信",
    items: [{ name: "台山丝苗米（精装）", spec: "25kg/袋", qty: 20, unit: "袋", price: 68.00 }] },
  { id: "s2", orderNo: "SO2026073100041", createdAt: "2026-07-31 10:05", status: "pending_delivery" as OrderStatus, buyer: "东莞某生鲜平台", total: 3600.00, deliveryType: "我方配送", paymentMethod: "平台担保付款",
    items: [{ name: "江门南美白对虾（鲜活）", spec: "1kg/盒", qty: 60, unit: "盒", price: 60.00 }] },
  { id: "s3", orderNo: "SO2026072900029", createdAt: "2026-07-29 09:30", status: "shipping" as OrderStatus, buyer: "佛山某农贸市场", total: 1260.00, deliveryType: "我方配送", paymentMethod: "银行转账",
    items: [{ name: "妃子笑荔枝", spec: "5kg/箱", qty: 18, unit: "箱", price: 70.00 }] },
  { id: "s4", orderNo: "SO2026072700018", createdAt: "2026-07-27 16:40", status: "completed" as OrderStatus, buyer: "深圳某连锁便利店", total: 4200.00, deliveryType: "我方配送", paymentMethod: "月结授信",
    items: [{ name: "肇庆新兴走地鸡", spec: "1只/箱", qty: 60, unit: "只", price: 70.00 }] },
]

export default function XiaoshouOrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus | "all">("all")
  const [keyword, setKeyword] = useState("")

  const filtered = orders.filter(o => {
    if (activeTab !== "all" && o.status !== activeTab) return false
    if (keyword && !o.orderNo.includes(keyword) && !o.buyer.includes(keyword)) return false
    return true
  })

  const stats = [
    { label: "全部订单", value: orders.length, color: "#1a5fa8" },
    { label: "待处理", value: 3, color: "#e8831a" },
    { label: "本月销售额", value: "¥32,180", color: "#3a8c3f" },
    { label: "已完成", value: orders.filter(o => o.status === "completed").length, color: "#6b7c93" },
  ]

  return (
    <div className="max-w-[980px] space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-bold text-[#1a1a2e]">我的销售订单</h1>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map(c => (
          <div key={c.label} className="bg-white rounded-lg border border-[#e8edf5] p-4 text-center">
            <div className="text-[22px] font-bold mb-1" style={{ color: c.color }}>{c.value}</div>
            <div className="text-[13px] text-[#6b7c93]">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-[#e8edf5] p-4 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 border border-[#e8edf5] rounded px-3 py-1.5 flex-1 min-w-[200px] max-w-[320px]">
          <Search className="w-3.5 h-3.5 text-[#6b7c93] shrink-0" />
          <input type="text" placeholder="搜索订单号 / 买家名称" value={keyword} onChange={e => setKeyword(e.target.value)} className="flex-1 text-[13px] outline-none placeholder:text-[#aaa]" />
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e8edf5] rounded text-[13px] text-[#555]">
          时间范围 <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <button className="flex items-center gap-1.5 ml-auto text-[13px] text-[#6b7c93]">
          <RefreshCw className="w-3.5 h-3.5" /> 刷新
        </button>
      </div>

      <div className="flex items-center gap-0 border-b border-[#e8edf5]">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key as OrderStatus | "all")}
            className={`relative px-4 py-2.5 text-[13px] font-medium transition-colors whitespace-nowrap ${activeTab === tab.key ? "text-[#1a5fa8] border-b-2 border-[#1a5fa8] -mb-px" : "text-[#6b7c93] hover:text-[#1a5fa8]"}`}>
            {tab.label}
            {tab.count && (
              <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#e8831a] text-white text-[10px] font-bold">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#e8edf5] p-16 text-center">
            <Package className="w-14 h-14 text-[#dde3ec] mx-auto mb-3" />
            <p className="text-[14px] text-[#6b7c93]">暂无相关订单</p>
          </div>
        ) : filtered.map(order => {
          const sc = STATUS_CONFIG[order.status]
          return (
            <div key={order.id} className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
              <div className="px-5 py-3 bg-[#f8fafc] border-b border-[#e8edf5] flex items-center justify-between">
                <div className="flex items-center gap-4 text-[13px]">
                  <span className="font-semibold text-[#1a1a2e]">{order.buyer}</span>
                  <span className="text-[#6b7c93]">订单号：<span className="font-mono text-[#1a1a2e]">{order.orderNo}</span></span>
                  <span className="text-[#6b7c93]">{order.createdAt}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium" style={{ color: sc.color, backgroundColor: sc.bg }}>
                  <sc.icon className="w-3.5 h-3.5" />{sc.label}
                </div>
              </div>
              <div className="px-5 py-4 flex gap-5">
                <div className="flex-1 space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#f0f4f8] shrink-0" />
                      <div className="flex-1">
                        <div className="text-[13px] font-medium text-[#1a1a2e]">{item.name}</div>
                        <div className="text-[12px] text-[#6b7c93]">{item.spec} × {item.qty}{item.unit}</div>
                      </div>
                      <div className="text-[13px] font-semibold text-[#e8831a]">¥{(item.price * item.qty).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                <div className="w-[180px] shrink-0 border-l border-[#f0f4f8] pl-5 flex flex-col justify-between">
                  <div className="space-y-1 text-[12px] text-[#6b7c93]">
                    <div>配送：<span className="text-[#1a1a2e]">{order.deliveryType}</span></div>
                    <div>支付：<span className="text-[#1a1a2e]">{order.paymentMethod}</span></div>
                    <div className="pt-1 border-t border-[#f0f4f8]">合计：<span className="text-[16px] font-bold text-[#e8831a]">¥{order.total.toFixed(2)}</span></div>
                  </div>
                  <div className="flex flex-col gap-2 mt-3">
                    {order.status === "pending_confirm" && (
                      <button className="py-1.5 bg-[#1a5fa8] text-white text-[12px] font-semibold rounded">确认接单</button>
                    )}
                    {order.status === "pending_delivery" && (
                      <button className="py-1.5 bg-[#3a8c3f] text-white text-[12px] font-semibold rounded">确认发货</button>
                    )}
                    <Link href={`/merchant/trade/xiaoshou-orders/${order.id}`} className="py-1.5 border border-[#1a5fa8] text-[#1a5fa8] text-[12px] rounded text-center">查看详情</Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
