"use client"

import Link from "next/link"
import { ShoppingCart, Store, Settings, ArrowRight } from "lucide-react"

const platforms = [
  {
    id: "portal",
    label: "交易服务平台",
    subtitle: "粤供销公共型农产品产地交易服务平台",
    desc: "面向买卖双方的门户网站，提供订单农业、产销对接、竞价交易、集采专区等全业务入口。",
    color: "#1a5fa8",
    lightBg: "#e8f4fd",
    icon: ShoppingCart,
    href: "/portal",
    tag: "用户端",
    modules: [
      { label: "首页", href: "/portal" },
      { label: "订单农业服务", href: "/portal/dingdan-nongye" },
      { label: "集采专区", href: "/portal/jicai" },
    ],
  },
  {
    id: "merchant",
    label: "商家中心",
    subtitle: "商家后台管理中心",
    desc: "供供应方、采购方商家使用，管理订单、报价、采购询价、下单结算等全流程业务。",
    color: "#2e7d32",
    lightBg: "#e8f5e9",
    icon: Store,
    href: "/merchant",
    tag: "商家端",
    modules: [
      { label: "发起采购询价", href: "/merchant/caigou-xunjia" },
      { label: "发起供应报价", href: "/merchant/gongying-baojia" },
      { label: "提交订单", href: "/merchant/xiadan" },
    ],
  },
  {
    id: "admin",
    label: "平台运营管理端",
    subtitle: "平台运营后台管理系统",
    desc: "平台管理员使用，负责需求审核、竞拍发布、运营管理、数据统计、商家管理等全平台运营工作。",
    color: "#6a1a8a",
    lightBg: "#f3e8fd",
    icon: Settings,
    href: "/admin",
    tag: "管理端",
    modules: [
      { label: "需求管理列表", href: "/admin/xunjia-list" },
      { label: "发布销售竞拍", href: "/admin/fabu-jingpai" },
      { label: "预约管理", href: "/admin/yuyue" },
    ],
  },
]

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col">
      {/* Top bar */}
      <header className="bg-[#1a1a2e] text-white shrink-0">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1a5fa8] rounded flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <span className="text-[15px] font-semibold tracking-wide">粤供销农产品产地交易平台</span>
          </div>
          <span className="text-[12px] text-white/40">原型设计总控台</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-[1200px]">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-[32px] font-bold text-[#1a1a2e] mb-3">选择平台入口</h1>
            <p className="text-[15px] text-[#6b7c93]">
              系统共包含三个端，点击平台卡片进入对应系统
            </p>
          </div>

          {/* Three platform cards */}
          <div className="grid grid-cols-3 gap-7">
            {platforms.map((p) => {
              const Icon = p.icon
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-[#dde3ec] overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  {/* Card header */}
                  <div className="p-7" style={{ backgroundColor: p.color }}>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-[12px] text-white font-medium">
                        {p.tag}
                      </span>
                    </div>
                    <h2 className="text-[22px] font-bold text-white mb-1.5">{p.label}</h2>
                    <p className="text-[12px] text-white/70">{p.subtitle}</p>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <p className="text-[13px] text-[#6b7c93] leading-relaxed mb-6">{p.desc}</p>

                    {/* Module links */}
                    <div className="space-y-1.5 mb-6">
                      {p.modules.map((m) => (
                        <Link
                          key={m.label}
                          href={m.href}
                          className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#f5f7fa] transition-colors group"
                        >
                          <span className="text-[13px] text-[#444] group-hover:text-[#1a5fa8]">{m.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#ccc] group-hover:text-[#1a5fa8] transition-colors" />
                        </Link>
                      ))}
                    </div>

                    {/* Enter button */}
                    <Link
                      href={p.href}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[14px] font-semibold transition-all hover:opacity-90"
                      style={{ backgroundColor: p.lightBg, color: p.color }}
                    >
                      进入{p.label}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
