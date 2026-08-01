"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  Handshake, ChevronRight, Building2, Truck, ShoppingBag,
  BarChart2, Globe, ShieldCheck, Users, Star, ArrowRight,
  CheckCircle, Phone, Mail, MapPin,
} from "lucide-react"

const COOP_MODELS = [
  {
    id: "platform",
    icon: Globe,
    title: "平台入驻合作",
    desc: "农产品生产商、供应商、采购商可入驻平台，享受交易撮合、品牌推广、数据分析等全套服务支持。",
    benefits: ["免费注册入驻", "专属运营支持", "品牌曝光资源", "大数据分析工具"],
    cta: "立即入驻",
    href: "/portal/kaifang-hezuo/apply?type=platform",
    color: "#1a5fa8",
    bg: "bg-[#e8f4fd]",
  },
  {
    id: "channel",
    icon: Truck,
    title: "渠道经销合作",
    desc: "与供销社系统基层网点、农资经销商、农技服务站开展渠道合作，共建农产品流通网络。",
    benefits: ["共享客户资源", "联合市场推广", "专项业务激励", "渠道运营培训"],
    cta: "申请渠道合作",
    href: "/portal/kaifang-hezuo/apply?type=channel",
    color: "#3a8c3f",
    bg: "bg-[#e8fdf0]",
  },
  {
    id: "supply",
    icon: ShoppingBag,
    title: "采购供应合作",
    desc: "大型商超、电商平台、餐饮连锁企业可通过平台建立稳定农产品供应链，实现产地直采降本增效。",
    benefits: ["产地直采溯源", "品质保障承诺", "稳定供货协议", "专属采购通道"],
    cta: "申请采购合作",
    href: "/portal/kaifang-hezuo/apply?type=supply",
    color: "#e65c00",
    bg: "bg-[#fff3e0]",
  },
  {
    id: "tech",
    icon: BarChart2,
    title: "数据技术合作",
    desc: "与科研机构、技术服务商开展农业大数据、农业物联网、智慧农业等领域深度技术合作。",
    benefits: ["数据共享授权", "联合研发项目", "技术成果转化", "专家资源共享"],
    cta: "申请技术合作",
    href: "/portal/kaifang-hezuo/apply?type=tech",
    color: "#6366f1",
    bg: "bg-[#ede9fe]",
  },
]

const STATS = [
  { value: "1,200+", label: "合作伙伴" },
  { value: "63个", label: "覆盖县域" },
  { value: "86亿元", label: "年交易规模" },
  { value: "98.2%", label: "合作伙伴满意度" },
]

const PARTNERS = [
  { name: "盒马生鲜", type: "采购商", desc: "年采购额超 5 亿元，覆盖广东、福建、浙江三省特色农产品" },
  { name: "广州农委", type: "政府机构", desc: "共建广州农产品溯源体系，接入 3,200 家农业主体" },
  { name: "顺丰冷链", type: "物流合作", desc: "共建全省农产品冷链物流网络，日处理量 50 吨" },
  { name: "省农科院", type: "科研合作", desc: "共同开展农产品品质检测与标准制定，发布 12 项团标" },
  { name: "中国电信", type: "技术合作", desc: "合作推进农业物联网建设，覆盖 280 个农业基地" },
  { name: "农银理财", type: "金融合作", desc: "联合推出供销惠农系列金融产品，累计放贷 23 亿元" },
]

const PROCESS_STEPS = [
  { step: "01", title: "提交申请", desc: "填写合作申请表，选择合作类型，提交企业资质材料" },
  { step: "02", title: "资质审核", desc: "平台在 3 个工作日内完成资质审核，并通知审核结果" },
  { step: "03", title: "洽谈对接", desc: "双方确定合作方向、合作模式及商业条款，签署合作协议" },
  { step: "04", title: "正式合作", desc: "开通合作权限，分配专属对接资源，正式启动合作业务" },
]

export default function KaifangHezuoPage() {
  const [activeCoop, setActiveCoop] = useState("platform")
  const active = COOP_MODELS.find(m => m.id === activeCoop)!

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[340px] overflow-hidden">
        <Image src="/images/hezuo/hero-bg.png" alt="开放合作共赢" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d3b6e]/88 via-[#1a5fa8]/65 to-transparent" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 h-full flex items-center">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Handshake className="w-5 h-5 text-[#4dd0a0]" />
              <span className="text-[#4dd0a0] text-[14px] font-medium">开放生态 · 合作共赢</span>
            </div>
            <h1 className="text-[42px] font-bold text-white leading-tight mb-3">
              开放合作共赢
            </h1>
            <p className="text-white/80 text-[16px] max-w-[520px] leading-relaxed mb-6">
              粤供销平台开放全场景合作体系，携手农业生产商、采购商、物流服务商、科研机构、金融机构共同构建现代农产品产地交易生态，实现各方价值最大化。
            </p>
            <div className="flex items-center gap-3">
              <Link href="/portal/kaifang-hezuo/apply" className="px-6 py-2.5 bg-[#1a5fa8] text-white rounded text-[14px] font-medium hover:bg-[#1550a0] transition-colors">
                申请合作
              </Link>
              <Link href="#models" className="px-6 py-2.5 bg-white/20 text-white border border-white/40 rounded text-[14px] font-medium hover:bg-white/30 transition-colors">
                了解合作模式
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#1a5fa8] py-5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-4 divide-x divide-white/20">
            {STATS.map(s => (
              <div key={s.label} className="text-center px-4">
                <div className="text-[28px] font-bold text-white">{s.value}</div>
                <div className="text-white/70 text-[13px] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cooperation models */}
      <section id="models" className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-[28px] font-bold text-[#1a1a2e]">四大合作模式</h2>
          <p className="text-[#666] mt-2 text-[14px]">灵活多元的合作方式，满足不同类型合作伙伴的需求</p>
        </div>
        <div className="flex gap-8">
          {/* Left tabs */}
          <div className="w-[280px] shrink-0 space-y-2">
            {COOP_MODELS.map(m => {
              const Icon = m.icon
              const isActive = activeCoop === m.id
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveCoop(m.id)}
                  className={`w-full text-left px-4 py-4 rounded-xl border-2 transition-all ${
                    isActive ? "border-[#1a5fa8] bg-white shadow-md" : "border-transparent bg-white hover:border-[#dde3ec]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${m.bg}`}>
                      <Icon className="w-5 h-5" style={{ color: m.color }} />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-[#1a1a2e]">{m.title}</div>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-[#1a5fa8] ml-auto" />}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right content */}
          <div className="flex-1 bg-white rounded-2xl border border-[#e8edf5] shadow-sm p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${active.bg}`}>
                <active.icon className="w-7 h-7" style={{ color: active.color }} />
              </div>
              <div>
                <h3 className="text-[22px] font-bold text-[#1a1a2e]">{active.title}</h3>
                <p className="text-[#666] mt-1 text-[14px] leading-relaxed max-w-[500px]">{active.desc}</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-[14px] font-bold text-[#1a1a2e] mb-3">合作权益</h4>
              <div className="grid grid-cols-2 gap-3">
                {active.benefits.map(b => (
                  <div key={b} className="flex items-center gap-2.5 p-3 bg-[#f8fafc] rounded-lg border border-[#e8edf5]">
                    <CheckCircle className="w-4 h-4 text-[#3a8c3f] shrink-0" />
                    <span className="text-[13px] text-[#555] font-medium">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#f0f4f8] flex items-center justify-between">
              <div className="flex items-center gap-4 text-[13px] text-[#888]">
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />400-xxx-xxxx</span>
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />hezuo@gzeryx.com</span>
              </div>
              <Link
                href={active.href}
                className="px-6 py-2.5 rounded text-[14px] font-semibold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: active.color }}
              >
                {active.cta}
                <ArrowRight className="w-4 h-4 inline ml-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cooperation ecosystem image */}
      <section className="bg-white py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-12">
            <div className="w-[420px] shrink-0 rounded-2xl overflow-hidden shadow-md">
              <Image src="/images/hezuo/cooperation-model.png" alt="合作生态" width={420} height={300} className="w-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="text-[#1a5fa8] text-[13px] font-medium mb-2">平台合作生态</div>
              <h2 className="text-[26px] font-bold text-[#1a1a2e] mb-4">构建农产品产地交易开放生态</h2>
              <p className="text-[#555] text-[14px] leading-relaxed mb-6">
                粤供销平台以"开放、共享、共赢"为理念，整合供销社系统资源、政府政策支持、金融机构资本，构建以农产品产地交易为核心的数字化开放生态。平台通过标准化接口、开放数据服务、专属运营支持，吸引各类主体参与平台生态建设，共同打造互利互赢的合作共同体。
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Building2, label: "供销社系统", desc: "基层网点 2,800+" },
                  { icon: Globe, label: "数字化服务", desc: "全链条数字覆盖" },
                  { icon: ShieldCheck, label: "政策背书", desc: "省级重点平台" },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3 p-4 bg-[#f8fafc] rounded-lg border border-[#e8edf5]">
                    <div className="w-8 h-8 rounded-lg bg-[#e8f4fd] flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-[#1a5fa8]" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#1a1a2e]">{item.label}</div>
                      <div className="text-[12px] text-[#888] mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-[26px] font-bold text-[#1a1a2e]">合作流程</h2>
          <p className="text-[#666] mt-2 text-[14px]">简单四步，快速开启合作</p>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {PROCESS_STEPS.map((s, i) => (
            <div key={s.step} className="relative">
              {i < PROCESS_STEPS.length - 1 && (
                <div className="absolute top-8 left-[calc(100%-8px)] w-full h-[2px] bg-[#dde3ec] z-0" />
              )}
              <div className="relative z-10 bg-white rounded-xl p-5 border border-[#e8edf5] shadow-sm text-center">
                <div className="w-16 h-16 rounded-full bg-[#e8f4fd] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[24px] font-bold text-[#1a5fa8]">{s.step}</span>
                </div>
                <h3 className="text-[15px] font-bold text-[#1a1a2e] mb-2">{s.title}</h3>
                <p className="text-[13px] text-[#666] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="bg-white py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-[26px] font-bold text-[#1a1a2e]">标杆合作案例</h2>
            <p className="text-[#666] mt-2 text-[14px]">与各行业头部企业及机构携手共建</p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {PARTNERS.map(p => (
              <div key={p.name} className="bg-[#f8fafc] rounded-xl border border-[#e8edf5] p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#e8f4fd] flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-[#1a5fa8]" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#1a1a2e]">{p.name}</div>
                    <span className="text-[11px] px-2 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] rounded font-medium">{p.type}</span>
                  </div>
                </div>
                <p className="text-[13px] text-[#666] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1a5fa8] py-14">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-[28px] font-bold text-white mb-3">携手共创农产品交易新生态</h2>
          <p className="text-white/70 text-[15px] mb-8 max-w-[560px] mx-auto">
            无论您是农业生产者、采购商、服务商还是科研机构，粤供销平台都期待与您深度合作，共同推进广东农业产业现代化。
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/portal/kaifang-hezuo/apply" className="px-8 py-3 bg-white text-[#1a5fa8] rounded text-[15px] font-semibold hover:bg-white/90 transition-colors">
              立即申请合作
            </Link>
            <a href="tel:400xxxxxxx" className="px-8 py-3 bg-transparent text-white border border-white/50 rounded text-[15px] font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4" />
              电话咨询
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
