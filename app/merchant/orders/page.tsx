"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MerchantLayout } from "@/components/merchant/merchant-layout"
import {
  Search, ChevronDown, Package, Truck, CreditCard,
  CheckCircle2, XCircle, Clock, ChevronRight, RefreshCw,
} from "lucide-react"

type OrderStatus = "all" | "pending_confirm" | "pending_payment" | "shipping" | "completed" | "cancelled"

interface OrderItem {
  name: string
  spec: string
  qty: number
  unit: string
  price: number
  img: string
}

interface Order {
  id: string
  orderNo: string
  createdAt: string
  status: OrderStatus
  statusLabel: string
  supplier: string
  items: OrderItem[]
  total: number
  deliveryType: string
  paymentMethod: string
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  pending_confirm: { label: "待供应商确认", color: "#e8831a", bg: "#fff8f0", icon: Clock },
  pending_payment: { label: "待付款",         color: "#1a5fa8", bg: "#e8f4fd", icon: CreditCard },
  shipping:        { label: "配送中",          color: "#3a8c3f", bg: "#e8f5e9", icon: Truck },
  completed:       { label: "已完成",          color: "#6b7c93", bg: "#f5f7fa", icon: CheckCircle2 },
  cancelled:       { label: "已取消",          color: "#ef4444", bg: "#fef2f2", icon: XCircle },
}

const TABS: { key: OrderStatus; label: string; count?: number }[] = [
  { key: "all",             label: "全部订单" },
  { key: "pending_confirm", label: "待确认", count: 2 },
  { key: "pending_payment", label: "待付款", count: 1 },
  { key: "shipping",        label: "配送中", count: 1 },
  { key: "completed",       label: "已完成" },
  { key: "cancelled",       label: "已取消" },
]

const orders: Order[] = [
  {
    id: "o1", orderNo: "PO2026080100123", createdAt: "2026-08-01 10:32", status: "pending_confirm",
    statusLabel: "待供应商确认", supplier: "广东供销农产品股份有限公司", deliveryType: "卖家配送", paymentMethod: "平台担保付款",
    total: 1435.60,
    items: [
      { name: "台山丝苗米（精装）", spec: "25kg/袋", qty: 10, unit: "袋", price: 128.00, img: "/images/products/simiao-rice.png" },
      { name: "某某优选鸡蛋", spec: "30枚/盒", qty: 5, unit: "盒", price: 31.12, img: "/images/products/eggs.png" },
    ],
  },
  {
    id: "o2", orderNo: "PO2026073100098", createdAt: "2026-07-31 14:20", status: "pending_payment",
    statusLabel: "待付款", supplier: "茂名荔枝产地直供中心", deliveryType: "卖家配送", paymentMethod: "银行转账",
    total: 1324.00,
    items: [
      { name: "妃子笑荔枝（产地直供）", spec: "5kg/箱", qty: 8, unit: "箱", price: 98.00, img: "/images/products/sanhuali.png" },
      { name: "梅州金柚（大果）", spec: "3kg/个", qty: 12, unit: "个", price: 45.00, img: "/images/products/pomelo.png" },
    ],
  },
  {
    id: "o3", orderNo: "PO2026072800076", createdAt: "2026-07-28 09:15", status: "shipping",
    statusLabel: "配送中", supplier: "广东供销农产品股份有限公司", deliveryType: "平台冷链专送", paymentMethod: "平台担保付款",
    total: 680.00,
    items: [
      { name: "江门鲜活南美白对虾", spec: "1kg/盒", qty: 20, unit: "盒", price: 68.00, img: "/images/products/shrimp-fresh.png" },
    ],
  },
  {
    id: "o4", orderNo: "PO2026072500045", createdAt: "2026-07-25 16:40", status: "completed",
    statusLabel: "已完成", supplier: "广东供销农产品股份有限公司", deliveryType: "卖家配送", paymentMethod: "月结授信",
    total: 3120.00,
    items: [
      { name: "罗氏虾（鲜活）", spec: "2.5kg/箱", qty: 30, unit: "箱", price: 104.00, img: "/images/products/luoshi-shrimp.png" },
    ],
  },
  {
    id: "o5", orderNo: "PO2026072000033", createdAt: "2026-07-20 11:00", status: "cancelled",
    statusLabel: "已取消", supplier: "茂名荔枝产地直供中心", deliveryType: "卖家配送", paymentMethod: "平台担保付款",
    total: 245.00,
    items: [
      { name: "菠萝（徐闻产）", spec: "10kg/箱", qty: 5, unit: "箱", price: 49.00, img: "/images/products/pineapple.png" },
    ],
  },
]

const statCards = [
  { label: "全部订单", value: orders.length, color: "#1a5fa8" },
  { label: "待处理", value: 3, color: "#e8831a" },
  { label: "本月采购额", value: "¥6,804", color: "#3a8c3f" },
  { label: "已完成订单", value: 1, color: "#6b7c93" },
]

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus>("all")
  const [keyword, setKeyword] = useState("")

  const filtered = orders.filter(o => {
    const matchStatus = activeTab === "all" || o.status === activeTab
    const matchKw = !keyword || o.orderNo.includes(keyword) || o.supplier.includes(keyword) || o.items.some(i => i.name.includes(keyword))
    return matchStatus && matchKw
  })

  return (
    <MerchantLayout>
      <div className="max-w-[980px] mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">我的采购订单</h1>
          <Link href="/portal/jicai" className="flex items-center gap-1.5 text-[13px] text-[#1a5fa8] hover:underline">
            去采购 <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-4 gap-4">
          {statCards.map(c => (
            <div key={c.label} className="bg-white rounded-lg border border-[#e8edf5] p-4 text-center">
              <div className="text-[22px] font-bold mb-1" style={{ color: c.color }}>{c.value}</div>
              <div className="text-[13px] text-[#6b7c93]">{c.label}</div>
            </div>
          ))}
        </div>

        {/* 搜索 + 筛选 */}
        <div className="bg-white rounded-lg border border-[#e8edf5] p-4 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 border border-[#e8edf5] rounded px-3 py-1.5 flex-1 min-w-[200px] max-w-[320px]">
            <Search className="w-3.5 h-3.5 text-[#6b7c93] shrink-0" />
            <input
              type="text"
              placeholder="搜索订单号 / 供应商 / 商品名称"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              className="flex-1 text-[13px] outline-none placeholder:text-[#aaa]"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e8edf5] rounded text-[13px] text-[#555] hover:border-[#1a5fa8] transition-colors">
            时间范围 <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e8edf5] rounded text-[13px] text-[#555] hover:border-[#1a5fa8] transition-colors">
            供应商 <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button className="flex items-center gap-1.5 ml-auto text-[13px] text-[#6b7c93] hover:text-[#1a5fa8] transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> 刷新
          </button>
        </div>

        {/* Tab 状态栏 */}
        <div className="flex items-center gap-0 border-b border-[#e8edf5]">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-4 py-2.5 text-[13px] font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? "text-[#1a5fa8] border-b-2 border-[#1a5fa8] -mb-px"
                  : "text-[#6b7c93] hover:text-[#1a5fa8]"
              }`}
            >
              {tab.label}
              {tab.count && (
                <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#e8831a] text-white text-[10px] font-bold">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* 订单列表 */}
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
                {/* 订单头 */}
                <div className="px-5 py-3 bg-[#f8fafc] border-b border-[#e8edf5] flex items-center justify-between">
                  <div className="flex items-center gap-4 text-[13px]">
                    <span className="font-semibold text-[#1a1a2e]">{order.supplier}</span>
                    <span className="text-[#6b7c93]">订单号：<span className="font-mono text-[#1a1a2e]">{order.orderNo}</span></span>
                    <span className="text-[#6b7c93]">{order.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium" style={{ color: sc.color, backgroundColor: sc.bg }}>
                    <sc.icon className="w-3.5 h-3.5" />
                    {sc.label}
                  </div>
                </div>

                {/* 商品行 */}
                <div className="px-5 py-4">
                  <div className="flex gap-5">
                    {/* 商品列表 */}
                    <div className="flex-1 space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded border border-[#e8edf5] overflow-hidden shrink-0">
                            <Image src={item.img} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-medium text-[#1a1a2e] line-clamp-1">{item.name}</div>
                            <div className="text-[12px] text-[#6b7c93]">{item.spec} × {item.qty}{item.unit}</div>
                          </div>
                          <div className="text-[13px] font-semibold text-[#e8831a] shrink-0">
                            ¥{(item.price * item.qty).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 右侧信息 */}
                    <div className="w-[200px] shrink-0 border-l border-[#f0f4f8] pl-5 flex flex-col justify-between">
                      <div className="space-y-1.5 text-[12px] text-[#6b7c93]">
                        <div>配送：<span className="text-[#1a1a2e]">{order.deliveryType}</span></div>
                        <div>支付：<span className="text-[#1a1a2e]">{order.paymentMethod}</span></div>
                        <div className="pt-1 border-t border-[#f0f4f8]">
                          合计：<span className="text-[16px] font-bold text-[#e8831a]">¥{order.total.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 mt-3">
                        {order.status === "pending_payment" && (
                          <button className="py-1.5 bg-[#e8831a] text-white text-[12px] font-semibold rounded hover:bg-[#d4741a] transition-colors">
                            立即付款
                          </button>
                        )}
                        {order.status === "shipping" && (
                          <button className="py-1.5 bg-[#3a8c3f] text-white text-[12px] font-semibold rounded hover:bg-[#2d7a33] transition-colors">
                            确认收货
                          </button>
                        )}
                        <Link href={`/merchant/orders/${order.id}`} className="py-1.5 border border-[#1a5fa8] text-[#1a5fa8] text-[12px] rounded hover:bg-[#e8f4fd] transition-colors text-center">
                          查看详情
                        </Link>
                        {(order.status === "pending_confirm" || order.status === "pending_payment") && (
                          <button className="py-1.5 border border-[#e8edf5] text-[#6b7c93] text-[12px] rounded hover:border-red-300 hover:text-red-500 transition-colors">
                            取消订单
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </MerchantLayout>
  )
}
