"use client"

import { useState } from "react"
import {
  Leaf, Truck, Warehouse, Wheat, MapPin, Factory,
  CheckCircle, Clock, XCircle, AlertCircle, ChevronRight, Plus,
} from "lucide-react"
import Link from "next/link"

const statusMap: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  active:   { label: "服务中",   color: "text-[#3a8c3f] bg-[#edf7ee]",   icon: CheckCircle },
  pending:  { label: "审核中",   color: "text-[#c47d0e] bg-[#fef3e0]",   icon: Clock       },
  expired:  { label: "已到期",   color: "text-[#999] bg-[#f5f5f5]",      icon: XCircle     },
  rejected: { label: "已驳回",   color: "text-[#d9363e] bg-[#fff1f0]",   icon: AlertCircle },
}

type ServiceStatus = "active" | "pending" | "expired" | "rejected"
type ServiceItem = {
  id: string; type: string; icon: React.ElementType; color: string
  name: string; status: ServiceStatus
  startDate: string; endDate: string; region: string; contact: string
  monthlyOrders: number; totalAmount: string
}

const myServices: ServiceItem[] = [
  {
    id: "1", type: "乡镇农产品综合服务站", icon: MapPin,  color: "#3a8c3f",
    name: "XX县XX镇农产品综合服务站",
    status: "active",
    startDate: "2025-03-01", endDate: "2026-03-01",
    region: "广东省梅州市XX县XX镇",
    contact: "张经理 / 138xxxx1234",
    monthlyOrders: 128, totalAmount: "36.5万元",
  },
  {
    id: "2", type: "冷链仓储服务", icon: Warehouse, color: "#1a5fa8",
    name: "XX冷链物流（广州）仓储服务",
    status: "active",
    startDate: "2025-01-15", endDate: "2026-01-15",
    region: "广州市花都区",
    contact: "李经理 / 139xxxx5678",
    monthlyOrders: 52, totalAmount: "128万元",
  },
  {
    id: "3", type: "粮食收购加工", icon: Wheat, color: "#c47d0e",
    name: "XX粮食收购加工合作申请",
    status: "pending",
    startDate: "2025-12-20", endDate: "--",
    region: "广东省韶关市南雄市",
    contact: "王总 / 137xxxx9012",
    monthlyOrders: 0, totalAmount: "--",
  },
  {
    id: "4", type: "农产品直供配送", icon: Truck, color: "#3a8c3f",
    name: "XX配送（深圳）直供配送合作",
    status: "expired",
    startDate: "2024-06-01", endDate: "2025-06-01",
    region: "深圳市南山区",
    contact: "陈经理 / 136xxxx3456",
    monthlyOrders: 0, totalAmount: "256万元",
  },
]

const tabs = [
  { key: "all",      label: "全部",   count: myServices.length },
  { key: "active",   label: "服务中", count: myServices.filter(s => s.status === "active").length },
  { key: "pending",  label: "审核中", count: myServices.filter(s => s.status === "pending").length },
  { key: "expired",  label: "已到期", count: myServices.filter(s => s.status === "expired").length },
]

export default function WoDeFuwuPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filtered = activeTab === "all"
    ? myServices
    : myServices.filter(s => s.status === activeTab)

  return (
  <>
<div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[18px] font-bold text-[#1a1a2e]">我的全产业链服务</h1>
          <p className="text-[13px] text-[#6b7c93] mt-0.5">管理您已入驻的全产业链服务</p>
        </div>
        <Link
          href="/merchant/quancyl/shenqing"
          className="flex items-center gap-1.5 px-4 py-2 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded-lg hover:bg-[#0d4a8a] transition-colors"
        >
          <Plus className="w-4 h-4" />
          申请新服务
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "服务中",   value: myServices.filter(s => s.status === "active").length,   color: "#3a8c3f" },
          { label: "审核中",   value: myServices.filter(s => s.status === "pending").length,  color: "#c47d0e" },
          { label: "本月订单", value: myServices.reduce((a, s) => a + s.monthlyOrders, 0),   color: "#1a5fa8" },
          { label: "累计金额", value: "420.5万",                                               color: "#6b3fa8" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-[#e0e6ef] p-4">
            <div className="text-[22px] font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[12px] text-[#999] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-[#e8edf5] mb-5">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-5 py-2.5 text-[13px] font-medium border-b-2 transition-colors ${
              activeTab === t.key
                ? "border-[#1a5fa8] text-[#1a5fa8]"
                : "border-transparent text-[#6b7c93] hover:text-[#1a5fa8]"
            }`}
          >
            {t.label}
            <span className="ml-1.5 px-1.5 py-0.5 text-[11px] rounded-full bg-[#f0f3f8] text-[#6b7c93]">
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Service cards */}
      <div className="space-y-3">
        {filtered.map(s => {
          const Icon = s.icon
          const StatusIcon = statusMap[s.status].icon
          return (
            <div key={s.id} className="bg-white rounded-xl border border-[#e0e6ef] p-5">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${s.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[14px] font-semibold text-[#1a1a2e]">{s.name}</span>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${statusMap[s.status].color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {statusMap[s.status].label}
                    </span>
                  </div>
                  <div className="text-[12px] text-[#6b7c93] mb-3">
                    服务类型：{s.type} &nbsp;|&nbsp; {s.region} &nbsp;|&nbsp; 联系人：{s.contact}
                  </div>
                  <div className="flex items-center gap-6 text-[12px]">
                    <span className="text-[#999]">合作期：{s.startDate} ~ {s.endDate}</span>
                    {s.monthlyOrders > 0 && (
                      <span className="text-[#999]">本月订单：<span className="text-[#1a5fa8] font-semibold">{s.monthlyOrders}</span> 笔</span>
                    )}
                    {s.totalAmount !== "--" && (
                      <span className="text-[#999]">累计金额：<span className="text-[#3a8c3f] font-semibold">{s.totalAmount}</span></span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  {s.status === "active" && (
                    <button className="px-3 py-1.5 text-[12px] border border-[#1a5fa8] text-[#1a5fa8] rounded-lg hover:bg-[#e8f4fd] transition-colors">
                      查看详情
                    </button>
                  )}
                  {s.status === "expired" && (
                    <button className="px-3 py-1.5 text-[12px] border border-[#3a8c3f] text-[#3a8c3f] rounded-lg hover:bg-[#edf7ee] transition-colors">
                      续期申请
                    </button>
                  )}
                  {s.status === "rejected" && (
                    <button className="px-3 py-1.5 text-[12px] border border-[#d9363e] text-[#d9363e] rounded-lg hover:bg-[#fff1f0] transition-colors">
                      重新申请
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#999] text-[14px]">
            暂无相关服务记录
          </div>
        )}
      </div>
  </>
)
}
