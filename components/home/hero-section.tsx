"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ShoppingCart,
  Tag,
  Users,
  Gavel,
  Truck,
  Sprout,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const slides = [
  {
    title: "放心产品",
    titleHighlight: "全链服务",
    desc: "粤供销公共型农产品产地交易服务平台，整合粮食和重要农产品生产、加工、仓储、物流以及全程冷链、金融保险等全产业链资源，构建\u201c源头直采+平台交易+产地直供\u201d的产地供应链模式，服务小农户、对接大市场。",
  },
  {
    title: "订单农业",
    titleHighlight: "产销对接",
    desc: "通过订单农业模式，实现农产品产前规划、产中服务、产后销售的全流程管理，帮助农户稳定销售渠道，保障农产品质量与供给。",
  },
  {
    title: "竞价交易",
    titleHighlight: "公平透明",
    desc: "依托平台竞价交易系统，实现农产品公开、公平、透明的价格发现机制，有效保障买卖双方利益，促进农产品高效流通。",
  },
]

const quickEntries = [
  { icon: ShoppingCart, label: "采购专区",   sub: "采购信息总览",       href: "/portal/caigou",           color: "#1a5fa8" },
  { icon: Tag,          label: "销售专区",   sub: "销售信息总览",       href: "/portal/chanxiao-duijie",   color: "#1a5fa8" },
  { icon: Users,        label: "集采专区",   sub: "集采信息总览",       href: "/portal/jicai",             color: "#1a5fa8" },
  { icon: Gavel,        label: "竞价中心",   sub: "竞拍专场总览",       href: "/portal/jingjia-jiaoyi",    color: "#1a5fa8" },
  { icon: Truck,        label: "供应链服务", sub: "仓储 / 运输 / 加工", href: "/portal/quanchanyilian",    color: "#1a5fa8" },
  { icon: Sprout,       label: "农业金融服务", sub: "实时行情 / 金融",  href: "/portal/nongye-xinyong",    color: "#1a5fa8" },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent((c) => (c + 1) % slides.length)

  return (
    <section className="bg-[#0d4a8a] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 py-0">
        <div className="flex gap-0 items-stretch">
          {/* Left: Slide */}
          <div className="flex-1 relative min-h-[320px] flex items-center">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
                <circle cx="500" cy="160" r="200" fill="none" stroke="white" strokeWidth="40" />
                <circle cx="500" cy="160" r="130" fill="none" stroke="white" strokeWidth="20" />
                <circle cx="120" cy="280" r="80" fill="none" stroke="white" strokeWidth="15" />
              </svg>
            </div>

            <div className="relative z-10 py-12 pr-8">
              <h2 className="text-[36px] font-bold text-white mb-4 leading-tight">
                {slides[current].title}{" "}
                <span className="text-[#e8831a]">{slides[current].titleHighlight}</span>
              </h2>
              <p className="text-[14px] text-white/80 leading-relaxed max-w-[520px] mb-6">
                {slides[current].desc}
              </p>
              <Link
                href="/portal/kaifang-hezuo"
                className="inline-flex items-center text-[14px] text-white/80 hover:text-white transition-colors"
              >
                了解我们的使命 &gt;
              </Link>

              {/* Dots + controls */}
              <div className="flex items-center gap-3 mt-8">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current ? "bg-white w-6" : "bg-white/40"
                    }`}
                    aria-label={`切换到第${i + 1}张`}
                  />
                ))}
                <button onClick={prev} className="ml-2 text-white/60 hover:text-white" aria-label="上一张">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={next} className="text-white/60 hover:text-white" aria-label="下一张">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Quick entries grid */}
          <div className="grid grid-cols-3 gap-px bg-[#1a5fa8]/40 shrink-0 w-[480px]">
            {quickEntries.map((entry) => {
              const Icon = entry.icon
              return (
                <Link
                  key={entry.label}
                  href={entry.href}
                  className="bg-[#1a5fa8]/60 hover:bg-[#1a5fa8]/80 transition-colors flex flex-col items-center justify-center py-8 gap-2 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[14px] font-semibold text-white">{entry.label}</span>
                  <span className="text-[12px] text-white/60">{entry.sub}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
