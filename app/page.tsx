import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/home/hero-section"
import { PriceIndexSection } from "@/components/home/price-index-section"
import { AnnouncementsSection } from "@/components/home/announcements-section"
import { OrderAgricultureEntry } from "@/components/home/order-agriculture-entry"
import { ArrowRight, Layers, Award } from "lucide-react"
import Link from "next/link"

const platformStats = [
  { value: "2,847", label: "注册企业", unit: "家" },
  { value: "1,230", label: "入驻供应商", unit: "家" },
  { value: "156", label: "月成交订单", unit: "万元" },
  { value: "98.6", label: "用户满意度", unit: "%" },
]

const serviceModules = [
  {
    title: "产销对接",
    desc: "整合产地资源与市场需求，打通农产品产销链条",
    href: "/chanxiao-duijie",
    color: "#1a5fa8",
    bg: "#e8f4fd",
  },
  {
    title: "供销严选",
    desc: "严选优质农产品，品质可追溯，放心购",
    href: "/gongxiao-yanxuan",
    color: "#3a8c3f",
    bg: "#e8f5e9",
  },
  {
    title: "竞价交易",
    desc: "公开竞拍，价格透明，高效撮合买卖双方",
    href: "/jingjia-jiaoyi",
    color: "#e8831a",
    bg: "#fff3e0",
  },
  {
    title: "全产业链服务",
    desc: "仓储、运输、加工、冷链一站式配套服务",
    href: "/quanchanyilian",
    color: "#8b5cf6",
    bg: "#f3f0ff",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <HeroSection />

        {/* Platform Stats Bar */}
        <div className="bg-white border-b border-border">
          <div className="max-w-[1400px] mx-auto px-6 py-4">
            <div className="flex items-center justify-around">
              {platformStats.map((stat, i) => (
                <div key={stat.label} className="flex items-baseline gap-1.5">
                  <span className="text-[24px] font-bold text-[#1a5fa8]">{stat.value}</span>
                  <span className="text-[13px] text-[#6b7c93]">{stat.unit}</span>
                  <span className="text-[13px] text-[#6b7c93] ml-1">{stat.label}</span>
                  {i < platformStats.length - 1 && (
                    <span className="ml-8 text-border">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 py-6">
          {/* Price Index + Announcements */}
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2">
              <PriceIndexSection />
            </div>
            <div className="col-span-1">
              <AnnouncementsSection />
            </div>
          </div>

          {/* Order Agriculture Entry */}
          <OrderAgricultureEntry />

          {/* Service Modules */}
          <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-[#1a5fa8] rounded-full" />
                <h2 className="text-[18px] font-bold text-[#1a1a2e]">平台服务</h2>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {serviceModules.map((mod) => (
                <Link
                  key={mod.title}
                  href={mod.href}
                  className="bg-white border border-border rounded p-5 hover:shadow-md hover:border-[#1a5fa8]/30 transition-all group"
                >
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center mb-3"
                    style={{ backgroundColor: mod.bg }}
                  >
                    <Layers className="w-5 h-5" style={{ color: mod.color }} />
                  </div>
                  <h3 className="text-[15px] font-semibold text-[#1a1a2e] mb-2">{mod.title}</h3>
                  <p className="text-[13px] text-[#6b7c93] leading-relaxed">{mod.desc}</p>
                  <div
                    className="flex items-center gap-1 mt-3 text-[13px] font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: mod.color }}
                  >
                    了解更多 <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Platform CTA Banner */}
          <section className="mt-8 bg-[#1a5fa8] rounded-lg p-8 flex items-center justify-between">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-[#e8831a]" />
                <span className="text-[13px] text-white/70">粤供销公共型农产品产地交易服务平台</span>
              </div>
              <h3 className="text-[22px] font-bold mb-2">
                构建 &ldquo;源头直采 + 平台交易 + 产地直供&rdquo; 供应链模式
              </h3>
              <p className="text-[14px] text-white/70 max-w-[600px]">
                服务小农户、对接大市场，整合全产业链资源，为农产品流通提供高效、透明、可信赖的交易平台。
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link
                href="/register"
                className="px-6 py-2.5 bg-[#e8831a] text-white text-[14px] font-semibold rounded hover:bg-[#d4751a] transition-colors"
              >
                立即注册
              </Link>
              <Link
                href="/login"
                className="px-6 py-2.5 bg-white/10 text-white text-[14px] font-semibold rounded hover:bg-white/20 transition-colors border border-white/30"
              >
                登录平台
              </Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
