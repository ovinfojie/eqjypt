"use client"

import Link from "next/link"
import {
  ShoppingCart, Store, Settings, ArrowRight,
  FileText, BarChart2, Users, Package,
  ClipboardList, TrendingUp, Gavel, Calendar,
} from "lucide-react"

const platforms = [
  {
    id: "portal",
    label: "交易服务平台",
    subtitle: "粤供销公共型农产品产地交易服务平台",
    desc: "面向买卖双方的门户网站，提供订单农业、产销对接、竞价交易、集采专区等全业务入口",
    color: "#1a5fa8",
    lightBg: "#e8f4fd",
    icon: ShoppingCart,
    href: "/portal",
    modules: [
      { label: "首页", href: "/portal" },
      { label: "订单农业服务", href: "/portal/dingdan-nongye" },
      { label: "集采专区", href: "/portal/jicai" },
      { label: "产销对接", href: "/portal" },
      { label: "供销严选", href: "/portal" },
      { label: "竞价交易", href: "/portal" },
    ],
    tag: "用户端",
  },
  {
    id: "merchant",
    label: "商家中心",
    subtitle: "商家后台管理中心",
    desc: "供供应方、采购方商家使用，管理订单、报价、采购询价、下单结算等全流程业务",
    color: "#2e7d32",
    lightBg: "#e8f5e9",
    icon: Store,
    href: "/merchant",
    modules: [
      { label: "发起采购询价", href: "/merchant/caigou-xunjia" },
      { label: "发起供应报价", href: "/merchant/gongying-baojia" },
      { label: "提交订单", href: "/merchant/xiadan" },
      { label: "我的订单", href: "/merchant" },
      { label: "商品管理", href: "/merchant" },
      { label: "我的", href: "/merchant" },
    ],
    tag: "商家端",
  },
  {
    id: "admin",
    label: "平台运营管理端",
    subtitle: "平台运营后台管理系统",
    desc: "平台管理员使用，负责需求审核、竞拍发布、运营管理、数据统计、商家管理等全平台运营工作",
    color: "#6a1a8a",
    lightBg: "#f3e8fd",
    icon: Settings,
    href: "/admin",
    modules: [
      { label: "需求管理列表", href: "/admin/xunjia-list" },
      { label: "发布销售竞拍", href: "/admin/fabu-jingpai" },
      { label: "预约管理", href: "/admin/yuyue" },
      { label: "商家管理", href: "/admin" },
      { label: "数据统计", href: "/admin" },
      { label: "系统设置", href: "/admin" },
    ],
    tag: "管理端",
  },
]

const quickLinks = [
  { label: "订单农业（门户）", href: "/portal/dingdan-nongye", icon: FileText, color: "#1a5fa8" },
  { label: "集采专区（门户）", href: "/portal/jicai", icon: Package, color: "#1a5fa8" },
  { label: "发起采购询价", href: "/merchant/caigou-xunjia", icon: ClipboardList, color: "#2e7d32" },
  { label: "发起供应报价", href: "/merchant/gongying-baojia", icon: TrendingUp, color: "#2e7d32" },
  { label: "提交订单", href: "/merchant/xiadan", icon: ShoppingCart, color: "#2e7d32" },
  { label: "需求管理列表", href: "/admin/xunjia-list", icon: Users, color: "#6a1a8a" },
  { label: "发布销售竞拍", href: "/admin/fabu-jingpai", icon: Gavel, color: "#6a1a8a" },
  { label: "预约管理", href: "/admin/yuyue", icon: Calendar, color: "#6a1a8a" },
]

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      {/* Top bar */}
      <header className="bg-[#1a1a2e] text-white">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1a5fa8] rounded flex items-center justify-center">
              <BarChart2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-[15px] font-semibold">粤供销农产品产地交易平台</span>
            <span className="ml-2 px-2 py-0.5 bg-white/10 rounded text-[11px] text-white/60">原型导航总控台</span>
          </div>
          <span className="text-[12px] text-white/40">v0 设计还原 · 三端导览</span>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-10">

        {/* Page title */}
        <div className="mb-10">
          <h1 className="text-[28px] font-bold text-[#1a1a2e] mb-2">选择平台入口</h1>
          <p className="text-[14px] text-[#6b7c93]">
            系统共包含三个端，点击下方平台卡片或模块链接可快速跳转到对应页面
          </p>
        </div>

        {/* Three platform cards */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {platforms.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.id}
                className="bg-white rounded-xl border border-[#dde3ec] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Card header */}
                <div className="p-6" style={{ backgroundColor: p.color }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-[12px] text-white font-medium">
                      {p.tag}
                    </span>
                  </div>
                  <h2 className="text-[20px] font-bold text-white mb-1">{p.label}</h2>
                  <p className="text-[12px] text-white/70">{p.subtitle}</p>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <p className="text-[13px] text-[#6b7c93] leading-relaxed mb-5">{p.desc}</p>

                  {/* Module links */}
                  <div className="space-y-1.5 mb-5">
                    {p.modules.map((m) => (
                      <Link
                        key={m.label}
                        href={m.href}
                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#f5f7fa] transition-colors group"
                      >
                        <span className="text-[13px] text-[#333] group-hover:text-[#1a5fa8]">{m.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#ccc] group-hover:text-[#1a5fa8]" />
                      </Link>
                    ))}
                  </div>

                  {/* Enter button */}
                  <Link
                    href={p.href}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-[14px] font-semibold transition-colors"
                    style={{ backgroundColor: p.lightBg, color: p.color }}
                  >
                    进入{p.label} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick links */}
        <div className="bg-white rounded-xl border border-[#dde3ec] p-6 shadow-sm">
          <h2 className="text-[16px] font-bold text-[#1a1a2e] mb-5">
            已完成页面快速入口
            <span className="ml-2 text-[12px] font-normal text-[#6b7c93]">（当前已开发的页面，可直接点击访问）</span>
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {quickLinks.map((l) => {
              const Icon = l.icon
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[#dde3ec] hover:border-current hover:shadow-sm transition-all group"
                  style={{ "--hover-color": l.color } as React.CSSProperties}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: l.color + "18" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: l.color }} />
                  </div>
                  <span className="text-[13px] text-[#333] group-hover:font-medium leading-tight">{l.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-8 bg-white rounded-xl border border-[#dde3ec] p-6 shadow-sm">
          <h2 className="text-[16px] font-bold text-[#1a1a2e] mb-5">原型完成进度</h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            {[
              { label: "订单农业服务", pct: 40, note: "缺逆向流程、对接方案" },
              { label: "产销对接", pct: 40, note: "缺逆向流程、二级运营设计" },
              { label: "竞价交易", pct: 50, note: "缺小程序对接、保证金方案" },
              { label: "全产业链服务", pct: 20, note: "能力定位未明确" },
              { label: "农业信用服务", pct: 20, note: "缺金融保险产品内容" },
              { label: "开放合作共赢", pct: 20, note: "能力定位未明确" },
              { label: "集采小程序", pct: 2, note: "仅首页等5个页面" },
              { label: "用户注册/库存/积分", pct: 30, note: "基础流程待完善" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-medium text-[#333]">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#999]">{item.note}</span>
                    <span className="text-[13px] font-bold" style={{ color: item.pct >= 40 ? "#1a5fa8" : item.pct >= 25 ? "#e8831a" : "#999" }}>
                      {item.pct}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-[#f0f4f8] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${item.pct}%`,
                      backgroundColor: item.pct >= 40 ? "#1a5fa8" : item.pct >= 25 ? "#e8831a" : "#ccc",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}
