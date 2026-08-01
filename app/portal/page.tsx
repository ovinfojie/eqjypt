"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/home/hero-section"
import { PriceIndexSection } from "@/components/home/price-index-section"
import { AnnouncementsSection } from "@/components/home/announcements-section"
import {
  ArrowRight,
  CheckCircle,
  BarChart2,
  Search,
  FileText,
  Shield,
  Warehouse,
  Truck,
  Star,
} from "lucide-react"
import Link from "next/link"

/* ─── 首页各业务模块数据 ─── */
const orderAgricultureFeatures = [
  { num: "1", title: "层级化管理", desc: "需求方 — 供应方 — 农户三层架构，责任明确，管理高效" },
  { num: "2", title: "双层督导", desc: "供应方日常管理配合需求方抽查，确保标准执行到位" },
  { num: "3", title: "标准化生产", desc: "统一种植标准，绿色农资、技术指导，保证产品质量" },
  { num: "4", title: "可追溯体系", desc: "从田头到餐桌，每批农产品绑定农户和地块" },
]

const orderAgricultureStats = [
  { value: "63", unit: "个", label: "参与县域数" },
  { value: "822", unit: "个", label: "农业主体" },
  { value: "87,613", unit: "万亩/次", label: "累计种植" },
  { value: "3,400", unit: "万元", label: "累计交易额" },
]

const chanxiaoFeatures = [
  { icon: Search, title: "快速匹配", desc: "在线匹配供需双方，发布需求后可快速收到报价" },
  { icon: CheckCircle, title: "采销精准匹配", desc: "基于品类、地域、数量、价格等多维度精准筛选，减少无效沟通" },
  { icon: Star, title: "阳光高效", desc: "全流程在线透明，价格公开，交易记录留存可追溯" },
  { icon: FileText, title: "合同保障", desc: "电子合同规范签署，资金托管保障买卖双方权益" },
]

const chanxiaoStats = [
  { value: "68,653", unit: "笔", label: "交易订单" },
  { value: "8,713", unit: "个", label: "完成需求" },
  { value: "312", unit: "种", label: "商品种类" },
]

const gongxiaoFeatures = [
  { icon: ArrowRight, title: "产地直采", desc: "跳过中间商，直接对接原产地，确保源头可查、保障产品质量" },
  { icon: Warehouse, title: "仓储服务", desc: "覆盖多个县域的冷链仓储网络，支持分级分类存储管理" },
  { icon: Truck, title: "加工配送", desc: "提供初级加工、分拣包装、定制化配送到户的全链路服务" },
  { icon: Shield, title: "品质保障", desc: "供销严选地域特色农产品产地直供，全程品控溯源，质量可靠、供应稳定" },
]

const jingjiaFeatures = [
  { title: "多元化交易模式", desc: "支持降价拍、升价拍、定购竞销等灵活模式" },
  { title: "履约保障机制", desc: "保证金制度确保买卖双方按约定完成交割" },
  { title: "实时竞价", desc: "支持多商品同时竞价，实时显示最新出价" },
  { title: "资金安全保障", desc: "第三方资金托管，保障双方权益" },
  { title: "价格透明公开", desc: "中标结果公示，历史成交价格可查询" },
  { title: "电子合同管理", desc: "线上合同保障交易安全与合规，提升交易效率" },
]

const jingjiaStats = [
  { value: "13", unit: "场", label: "即将开始" },
  { value: "12", unit: "场", label: "正在进行" },
  { value: "1,200+", unit: "场", label: "已完成" },
  { value: "8,182", unit: "万元", label: "总交易额" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">

        {/* ── Hero Banner + 快捷入口 ── */}
        <HeroSection />

        {/* ── 价格指数 + 平台公告 ── */}
        <section className="bg-white py-8">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-2">
                <PriceIndexSection />
              </div>
              <div className="col-span-1">
                <AnnouncementsSection />
              </div>
            </div>
          </div>
        </section>

        {/* ── 订单农业服务 ── */}
        <section
          className="py-16 relative overflow-hidden"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* overlay */}
          <div className="absolute inset-0 bg-white/88" />
          <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <div className="flex gap-16 items-start">
              {/* Left text */}
              <div className="flex-1">
                <h2 className="text-[32px] font-bold text-[#1a1a2e] mb-2">
                  订单农业服务
                </h2>
                <p className="text-[16px] text-[#6b7c93] mb-5">以销定产 按需定质</p>
                <p className="text-[14px] text-[#444] leading-relaxed mb-8 max-w-[520px]">
                  依托县域公共型农业社会化服务平台、乡镇农产品综合服务站和供销农场生产基地，对标市场标准、对接市场需求，发展粮食和重要农产品订单种植，保障优质农产品稳定供给。
                </p>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                  {orderAgricultureStats.map((s) => (
                    <div key={s.label} className="bg-white rounded border border-[#dde3ec] p-4 text-center shadow-sm">
                      <div className="flex items-baseline justify-center gap-0.5">
                        <span className="text-[26px] font-bold text-[#1a5fa8]">{s.value}</span>
                        <span className="text-[12px] text-[#6b7c93] ml-1">{s.unit}</span>
                      </div>
                      <div className="text-[12px] text-[#6b7c93] mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Feature cards */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {orderAgricultureFeatures.map((f) => (
                    <div key={f.title} className="bg-white rounded border border-[#dde3ec] p-4 flex gap-3 shadow-sm">
                      <div className="w-7 h-7 rounded-full bg-[#1a5fa8] text-white text-[13px] font-bold flex items-center justify-center shrink-0">
                        {f.num}
                      </div>
                      <div>
                        <div className="text-[14px] font-semibold text-[#1a1a2e] mb-1">{f.title}</div>
                        <div className="text-[12px] text-[#6b7c93] leading-relaxed">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/portal/dingdan-nongye"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors"
                >
                  点击直达 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Right: triangle relationship diagram */}
              <div className="w-[380px] shrink-0 flex flex-col items-center justify-center">
                <div className="relative w-[340px] h-[300px]">
                  {/* Center circle */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#1a5fa8] flex flex-col items-center justify-center shadow-lg z-10">
                    <span className="text-white text-[13px] font-bold leading-tight text-center">订单<br />农业</span>
                  </div>
                  {/* Top: 需求方 */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#e8f4fd] border-2 border-[#1a5fa8] flex flex-col items-center justify-center mx-auto mb-1">
                      <span className="text-[11px] font-semibold text-[#1a5fa8]">需求方</span>
                    </div>
                    <div className="text-[11px] text-[#6b7c93] max-w-[140px] leading-tight">
                      制定需求计划、签订合同、监督管理、验收产品、支付货款
                    </div>
                  </div>
                  {/* Bottom-left: 供应方 */}
                  <div className="absolute bottom-0 left-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#e8f4fd] border-2 border-[#1a5fa8] flex flex-col items-center justify-center mx-auto mb-1">
                      <span className="text-[11px] font-semibold text-[#1a5fa8]">供应方</span>
                    </div>
                    <div className="text-[11px] text-[#6b7c93] max-w-[120px] leading-tight">
                      组织生产、分解任务、日常管理、质量把控、产品交付
                    </div>
                  </div>
                  {/* Bottom-right: 农户 */}
                  <div className="absolute bottom-0 right-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#e8f4fd] border-2 border-[#1a5fa8] flex flex-col items-center justify-center mx-auto mb-1">
                      <span className="text-[11px] font-semibold text-[#1a5fa8]">农户</span>
                    </div>
                    <div className="text-[11px] text-[#6b7c93] max-w-[120px] leading-tight">
                      按标准种植、接受指导、配合检查、交付产品、获得收益
                    </div>
                  </div>
                  {/* Connecting lines (SVG) */}
                  <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                    <line x1="170" y1="80" x2="100" y2="220" stroke="#1a5fa8" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
                    <line x1="170" y1="80" x2="240" y2="220" stroke="#1a5fa8" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
                    <line x1="100" y1="220" x2="240" y2="220" stroke="#1a5fa8" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 产销对接 ── */}
        <section className="py-16 bg-white">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex gap-16 items-start">
              {/* Left: feature icons */}
              <div className="w-[400px] shrink-0 grid grid-cols-2 gap-3">
                {chanxiaoFeatures.map((f) => {
                  const Icon = f.icon
                  return (
                    <div key={f.title} className="bg-[#1a5fa8] rounded p-4">
                      <div className="w-10 h-10 bg-white/20 rounded flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-[14px] font-semibold text-white mb-1">{f.title}</div>
                      <div className="text-[12px] text-white/70 leading-relaxed">{f.desc}</div>
                    </div>
                  )
                })}
              </div>
              {/* Right: text */}
              <div className="flex-1">
                <h2 className="text-[32px] font-bold text-[#1a1a2e] mb-2">产销对接</h2>
                <p className="text-[16px] text-[#6b7c93] mb-5">衔接产销 阳光高效</p>
                <p className="text-[14px] text-[#444] leading-relaxed mb-8 max-w-[520px]">
                  连接上游供应商与下游采购商，实现在线匹配供需信息，消除信息壁垒，减少传统寻源中的时间消耗和不确定性。畅通流通链条，提升流通效率。
                </p>
                <div className="flex gap-8 mb-8">
                  {chanxiaoStats.map((s) => (
                    <div key={s.label} className="border-l-4 border-[#1a5fa8] pl-3">
                      <div className="flex items-baseline gap-1">
                        <span className="text-[26px] font-bold text-[#1a5fa8]">{s.value}</span>
                        <span className="text-[12px] text-[#6b7c93]">{s.unit}</span>
                      </div>
                      <div className="text-[12px] text-[#6b7c93]">{s.label}</div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/portal/chanxiao-duijie"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors"
                >
                  点击直达 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 供销严选 ── */}
        <section className="py-16 bg-[#f5f7fa]">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex gap-16 items-start">
              {/* Left text */}
              <div className="flex-1">
                <h2 className="text-[32px] font-bold text-[#1a1a2e] mb-2">供销严选</h2>
                <p className="text-[16px] text-[#6b7c93] mb-5">精选供应商 产地直供</p>
                <p className="text-[14px] text-[#444] leading-relaxed mb-8 max-w-[520px]">
                  通过"供销社+农户"，严选地域特色农产品产地直供，全程品控溯源，确保源头可查、质量可靠、供应稳定。同时配套加工、仓储和运输服务，提供农产品从田到餐桌的一站式解决方案，保障农产品品质，减少流通损耗。
                </p>
                <div className="flex gap-8 mb-8">
                  {[
                    { value: "352", unit: "家", label: "供销认证企业" },
                    { value: "312", unit: "种", label: "严选商品" },
                    { value: "61", unit: "个", label: "覆盖县域" },
                  ].map((s) => (
                    <div key={s.label} className="border-l-4 border-[#3a8c3f] pl-3">
                      <div className="flex items-baseline gap-1">
                        <span className="text-[26px] font-bold text-[#3a8c3f]">{s.value}</span>
                        <span className="text-[12px] text-[#6b7c93]">{s.unit}</span>
                      </div>
                      <div className="text-[12px] text-[#6b7c93]">{s.label}</div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/portal/gongxiao-yanxuan"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors"
                >
                  点击直达 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              {/* Right features */}
              <div className="w-[360px] shrink-0 space-y-3">
                {gongxiaoFeatures.map((f) => {
                  const Icon = f.icon
                  return (
                    <div key={f.title} className="bg-white rounded border border-[#dde3ec] p-4 flex items-start gap-3 shadow-sm">
                      <div className="w-10 h-10 bg-[#1a5fa8] rounded flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-[14px] font-semibold text-[#1a1a2e] mb-1">{f.title}</div>
                        <div className="text-[12px] text-[#6b7c93] leading-relaxed">{f.desc}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── 竞价交易 ── */}
        <section
          className="py-16 relative overflow-hidden"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#0a2d5a]/85" />
          <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-[32px] font-bold text-white mb-2">竞价交易</h2>
              <p className="text-[16px] text-white/70">实时竞价 公开透明</p>
            </div>
            <div className="flex gap-12 items-start">
              {/* Features grid */}
              <div className="flex-1 grid grid-cols-2 gap-4">
                {jingjiaFeatures.map((f) => (
                  <div key={f.title} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#e8831a] mt-1.5 shrink-0" />
                    <div>
                      <div className="text-[14px] font-semibold text-white mb-1">{f.title}</div>
                      <div className="text-[12px] text-white/60 leading-relaxed">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Stats */}
              <div className="w-[280px] shrink-0 grid grid-cols-2 gap-3">
                {jingjiaStats.map((s) => (
                  <div key={s.label} className="bg-white/10 rounded p-4 text-center border border-white/20">
                    <div className="flex items-baseline justify-center gap-0.5">
                      <span className="text-[26px] font-bold text-white">{s.value}</span>
                      <span className="text-[12px] text-white/60 ml-1">{s.unit}</span>
                    </div>
                    <div className="text-[12px] text-white/60 mt-1">{s.label}</div>
                  </div>
                ))}
                <div className="col-span-2 pt-2">
                  <Link
                    href="/portal/jingjia-jiaoyi"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#e8831a] text-white text-[14px] font-semibold rounded hover:bg-[#d4751a] transition-colors"
                  >
                    点击直达 <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 全产业链服务 ── */}
        <section className="py-16 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 text-center">
            <h2 className="text-[32px] font-bold text-[#1a1a2e] mb-2">全产业链服务</h2>
            <p className="text-[16px] text-[#6b7c93] mb-4">广东供销公共型农业社会化服务体系</p>
            <p className="text-[14px] text-[#444] leading-relaxed mb-10 max-w-[800px] mx-auto">
              具备完整的农产品生产、收购、加工（产地分拣、分级包装、预冷保鲜、食品加工、粮食加工）、仓储（冷链仓储、常温仓储、粮食仓储）、运输等农业服务功能。
            </p>
            <div className="grid grid-cols-5 gap-4 mb-10">
              {[
                { icon: "🌾", label: "生产服务", desc: "种植技术指导、农资配送" },
                { icon: "📦", label: "加工服务", desc: "分拣包装、食品加工" },
                { icon: "🏪", label: "仓储服务", desc: "冷链、常温、粮食仓储" },
                { icon: "🚛", label: "运输配送", desc: "干线物流、产地直配" },
                { icon: "💳", label: "金融保险", desc: "农业信贷、农业保险" },
              ].map((item) => (
                <div key={item.label} className="bg-[#f5f7fa] border border-[#dde3ec] rounded p-5 text-center hover:border-[#1a5fa8]/40 hover:shadow-sm transition-all">
                  <div className="text-[32px] mb-3">{item.icon}</div>
                  <div className="text-[14px] font-semibold text-[#1a1a2e] mb-2">{item.label}</div>
                  <div className="text-[12px] text-[#6b7c93]">{item.desc}</div>
                </div>
              ))}
            </div>
            <Link
              href="/portal/quanchanyilian"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors"
            >
              点击直达 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── 底部 CTA ── */}
        <section className="bg-[#1a5fa8] py-10">
          <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
            <div className="text-white">
              <h3 className="text-[22px] font-bold mb-2">
                构建 &ldquo;源头直采 + 平台交易 + 产地直供&rdquo; 供应链模式
              </h3>
              <p className="text-[14px] text-white/70">
                服务小农户、对接大市场，整合全产业链资源，为农产品流通提供高效、透明、可信赖的交易平台
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link
                href="/portal/register"
                className="px-7 py-2.5 bg-[#e8831a] text-white text-[14px] font-semibold rounded hover:bg-[#d4751a] transition-colors"
              >
                立即注册
              </Link>
              <Link
                href="/portal/login"
                className="px-7 py-2.5 bg-white/10 text-white text-[14px] font-semibold rounded hover:bg-white/20 transition-colors border border-white/30"
              >
                登录平台
              </Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  )
}
