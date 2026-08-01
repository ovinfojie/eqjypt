"use client"

import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useState } from "react"
import {
  ArrowRight, CheckCircle, Warehouse, Truck, Wheat,
  Leaf, Factory, MapPin, Phone, ChevronRight, Building2,
  BarChart2, Users, Award, ShieldCheck,
} from "lucide-react"

/* ── 六大服务模块 ── */
const services = [
  {
    id: "xiangzhen",
    icon: MapPin,
    title: "乡镇农产品综合服务站",
    subtitle: "贴近农户的一站式基层服务",
    desc: "依托县域公共型农业社会化服务平台，在各乡镇建立农产品综合服务站，提供订单农业、农资集采、农机服务、标准化种植等综合性农业社会化服务，直连农户与市场。",
    tags: ["订单农业", "农资集采", "农机服务", "标准化种植"],
    img: "/images/quancyl/service-station.png",
    href: "/portal/quanchanyilian/xiangzhen",
    stats: [{ label: "覆盖乡镇", value: "1254" }, { label: "服务农户", value: "82万+" }, { label: "覆盖县域", value: "63" }],
    color: "#3a8c3f",
  },
  {
    id: "nongzi",
    icon: Leaf,
    title: "专业农资农技服务网",
    subtitle: "全省布局的农资供应与技术服务",
    desc: "全省布局4个国家战略性农资储备库，43个区域农资配送中心，51家县域农服公司和1254个农资农技服务中心，提供优质农资供应、农业技术指导、病虫害防治等专业服务。",
    tags: ["农资供应", "技术指导", "病虫害防治", "土壤检测"],
    img: "/images/quancyl/agri-supplies.png",
    href: "/portal/quanchanyilian/nongzi",
    stats: [{ label: "储备库", value: "4" }, { label: "配送中心", value: "43" }, { label: "服务中心", value: "1254" }],
    color: "#1a5fa8",
  },
  {
    id: "liangshi",
    icon: Wheat,
    title: "粮食全产业链服务网",
    subtitle: "从田间到餐桌的粮食全链条服务",
    desc: "部省合作国家级重大项目，占地1500亩，总投资50亿元，打造现代农业与食品加工产业集群服务，覆盖粮食收购、烘干、仓储、加工、销售全流程，实现产值最大化。",
    tags: ["粮食收购", "烘干加工", "仓储管理", "品牌销售"],
    img: "/images/quancyl/grain-processing.png",
    href: "/portal/quanchanyilian/liangshi",
    stats: [{ label: "占地面积", value: "1500亩" }, { label: "总投资", value: "50亿" }, { label: "年处理量", value: "70万吨" }],
    color: "#c47d0e",
  },
  {
    id: "lengchain",
    icon: Warehouse,
    title: "公共型冷链物流骨干网",
    subtitle: "覆盖全省的冷链物流基础设施",
    desc: "构建覆盖全省的公共型冷链物流骨干网络，集聚冷藏保鲜、常温仓储、粮食仓储等多类型仓储服务，配套田头专线、干支线运输，确保农产品从产地到市场全程保鲜。",
    tags: ["冷藏仓储", "常温仓库", "田头专线", "干支线运输"],
    img: "/images/quancyl/cold-chain.png",
    href: "/portal/quanchanyilian/lengchain",
    stats: [{ label: "冷库容量", value: "200万吨" }, { label: "覆盖城市", value: "21" }, { label: "物流节点", value: "180+" }],
    color: "#1a5fa8",
  },
  {
    id: "peisong",
    icon: Truck,
    title: "农产品直供配送网",
    subtitle: "精准高效的农产品配送服务",
    desc: "对接粤港澳大湾区（广东·惠州）绿色农产品生产供应基地，建立农产品直供配送网络，为餐饮、商超、机关单位、学校食堂等提供优质、新鲜、可溯源的农产品直供配送服务。",
    tags: ["直供配送", "餐饮配送", "商超对接", "溯源保障"],
    img: "/images/quancyl/order-farming.png",
    href: "/portal/quanchanyilian/peisong",
    stats: [{ label: "配送客户", value: "8000+" }, { label: "日均配送", value: "500吨" }, { label: "准时率", value: "99.2%" }],
    color: "#3a8c3f",
  },
  {
    id: "shuzi",
    icon: Factory,
    title: "数字供销服务平台",
    subtitle: "贯穿产前产中产后的数字化服务",
    desc: '提供开放高效协同的数字化服务，贯穿产前、产中、产后的"实体+数字"双轨优势，整合供销系统资源，实现农产品生产、流通、销售及服务全链条数字化管理与优化。',
    tags: ["产前规划", "产中监控", "产后销售", "数据分析"],
    img: "/images/quancyl/hero-bg.png",
    href: "/portal/quanchanyilian/shuzi",
    stats: [{ label: "接入主体", value: "1.2万" }, { label: "数字化覆盖", value: "63县" }, { label: "交易额", value: "34亿" }],
    color: "#6b3fa8",
  },
]

/* ── 平台核心数据 ── */
const platformStats = [
  { value: "四网一基地一平台", label: "核心服务体系", icon: Award },
  { value: "1254", label: "农资农技服务中心", icon: MapPin },
  { value: "63", label: "参与县域数", icon: Building2 },
  { value: "82万+", label: "服务农户数", icon: Users },
  { value: "50亿", label: "粮食产业投资额", icon: BarChart2 },
  { value: "200万吨", label: "冷链仓储容量", icon: Warehouse },
]

/* ── 合作模式 ── */
const cooperationModes = [
  {
    title: "供销农场合作",
    desc: "生产基地共建共商共享，提供在线认证、合作协议签订等，经供销认证的合作方对接相应服务板块。",
    icon: Leaf,
    action: "申请合作",
    href: "/portal/quanchanyilian/apply?type=farm",
  },
  {
    title: "合作种植养殖基地",
    desc: "按照自愿、互利、民主、平等的合作制原则，开展合作种植（养殖）基地共建，保障绿色、安全、优质农产品稳定供给。",
    icon: Wheat,
    action: "了解详情",
    href: "/portal/quanchanyilian/apply?type=base",
  },
  {
    title: "服务机构入驻",
    desc: "加工、仓储、运输服务机构可申请入驻全产业链服务平台，获得平台流量、品牌背书和运营支持。",
    icon: Building2,
    action: "申请入驻",
    href: "/portal/quanchanyilian/apply?type=service",
  },
  {
    title: "乡镇服务站合作",
    desc: "在各乡镇建立农产品综合服务站，提供订单农业、农资集采等综合性农业社会化服务，直连农户与市场。",
    icon: MapPin,
    action: "申请加盟",
    href: "/portal/quanchanyilian/apply?type=station",
  },
]

export default function QuanChanYiLianPage() {
  const [activeService, setActiveService] = useState(services[0].id)
  const active = services.find(s => s.id === activeService) ?? services[0]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SiteHeader />

      {/* ── Hero Banner ── */}
      <section className="relative h-[420px] overflow-hidden">
        <Image
          src="/images/quancyl/hero-bg.png"
          alt="全产业链服务"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2a4a]/85 via-[#0d2a4a]/60 to-transparent" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 h-full flex flex-col justify-center">
          <div className="text-[13px] text-white/70 mb-3">
            全产业链服务 &gt; 广东供销公共型农业社会化服务体系
          </div>
          <h1 className="text-[40px] font-bold text-white mb-4 leading-tight">
            全产业链服务
          </h1>
          <p className="text-[15px] text-white/85 max-w-[560px] leading-relaxed mb-6">
            集聚供销系统农资农技服务网、粮食全产业链服务网、公共型冷链物流骨干网、农产品直供配送网，以及粤港澳大湾区绿色农产品生产供应基地、数字供销等"四网一基地一平台"，实现农产品生产、流通、销售及服务全链条一体化。
          </p>
          <div className="flex gap-3">
            <Link
              href="/portal/quanchanyilian/apply"
              className="px-6 py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors"
            >
              申请合作入驻
            </Link>
            <Link
              href="#services"
              className="px-6 py-2.5 border border-white/60 text-white text-[14px] rounded hover:bg-white/10 transition-colors"
            >
              了解全部服务
            </Link>
          </div>
        </div>
      </section>

      {/* ── 核心数据统计 ── */}
      <section className="bg-[#1a5fa8] py-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-6 gap-0 divide-x divide-white/20">
            {platformStats.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.label} className="text-center px-4 py-2">
                  <Icon className="w-5 h-5 text-white/60 mx-auto mb-1.5" />
                  <div className="text-[22px] font-bold text-white leading-tight">{s.value}</div>
                  <div className="text-[12px] text-white/70 mt-0.5">{s.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 服务体系介绍 ── */}
      <section id="services" className="py-14 bg-[#f8fafc]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-[28px] font-bold text-[#1a1a2e] mb-3">六大服务体系</h2>
            <p className="text-[15px] text-[#6b7c93] max-w-[600px] mx-auto">
              按照"供销社+农户"的合作制原则，整合产加储运销全链条资源，提供一站式农业社会化服务
            </p>
          </div>

          {/* Tab 切换 */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-1 scrollbar-none">
            {services.map((s) => {
              const Icon = s.icon
              const isActive = s.id === activeService
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveService(s.id)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                    isActive
                      ? "bg-[#1a5fa8] text-white shadow-md"
                      : "bg-white text-[#444] border border-[#e0e6ef] hover:border-[#1a5fa8] hover:text-[#1a5fa8]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {s.title.length > 8 ? s.title.slice(0, 7) + "…" : s.title}
                </button>
              )
            })}
          </div>

          {/* 激活服务详情 */}
          <div className="bg-white rounded-xl border border-[#e0e6ef] overflow-hidden shadow-sm">
            <div className="grid grid-cols-2">
              {/* 左：图片 */}
              <div className="relative h-[320px]">
                <Image
                  src={active.img}
                  alt={active.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0d2a4a]/30" />
              </div>
              {/* 右：详情 */}
              <div className="p-8 flex flex-col justify-center">
                <div
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1 rounded-full mb-4 w-fit"
                  style={{ background: `${active.color}18`, color: active.color }}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  {active.subtitle}
                </div>
                <h3 className="text-[22px] font-bold text-[#1a1a2e] mb-3">{active.title}</h3>
                <p className="text-[14px] text-[#6b7c93] leading-relaxed mb-5">{active.desc}</p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {active.tags.map(t => (
                    <span
                      key={t}
                      className="text-[12px] px-2.5 py-1 rounded border"
                      style={{ borderColor: `${active.color}40`, color: active.color, background: `${active.color}0a` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* 统计数字 */}
                <div className="flex gap-6 mb-6 pb-6 border-b border-[#f0f3f8]">
                  {active.stats.map(st => (
                    <div key={st.label}>
                      <div className="text-[20px] font-bold" style={{ color: active.color }}>{st.value}</div>
                      <div className="text-[12px] text-[#999]">{st.label}</div>
                    </div>
                  ))}
                </div>

                <Link
                  href={active.href}
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold hover:gap-2.5 transition-all"
                  style={{ color: active.color }}
                >
                  了解详情 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* 服务卡片网格 */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <Link
                  key={s.id}
                  href={s.href}
                  className="bg-white rounded-xl border border-[#e0e6ef] p-5 hover:shadow-md hover:border-[#1a5fa8]/40 transition-all group"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: `${s.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <h4 className="text-[14px] font-semibold text-[#1a1a2e] mb-1 group-hover:text-[#1a5fa8] transition-colors">
                    {s.title}
                  </h4>
                  <p className="text-[12px] text-[#6b7c93] line-clamp-2 leading-relaxed mb-3">{s.desc}</p>
                  <div className="flex items-center gap-1 text-[12px] font-medium" style={{ color: s.color }}>
                    查看详情 <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 合作模式 ── */}
      <section className="py-14 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-[28px] font-bold text-[#1a1a2e] mb-3">开放合作模式</h2>
            <p className="text-[15px] text-[#6b7c93]">
              按照自愿、互利、民主、平等的合作制原则，多种方式开展共建共商共享合作
            </p>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {cooperationModes.map((m) => {
              const Icon = m.icon
              return (
                <div
                  key={m.title}
                  className="border border-[#e0e6ef] rounded-xl p-6 hover:shadow-md hover:border-[#1a5fa8]/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#e8f4fd] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#1a5fa8]" />
                  </div>
                  <h4 className="text-[15px] font-semibold text-[#1a1a2e] mb-2">{m.title}</h4>
                  <p className="text-[13px] text-[#6b7c93] leading-relaxed mb-5">{m.desc}</p>
                  <Link
                    href={m.href}
                    className="inline-flex items-center gap-1 text-[13px] text-[#1a5fa8] font-semibold hover:gap-2 transition-all"
                  >
                    {m.action} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 政策背书 + 认证体系 ── */}
      <section className="py-12 bg-[#f8fafc] border-t border-[#e8edf5]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "供销社品牌背书",
                desc: "经广东省供销合作联社认证，具备完善的农产品生产、收购、加工、仓储、运输等服务功能，品质可靠。",
              },
              {
                icon: Award,
                title: "国家级重大项目",
                desc: "部省合作国家级重大项目，接受国家主管部门监管，运营标准高，服务体系完备，是农业社会化服务的标杆。",
              },
              {
                icon: BarChart2,
                title: "数字化全程管控",
                desc: "全链条数字化监管，从生产到销售全程可追溯，数据留痕，保障交易安全，为供需双方提供透明可信的服务环境。",
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex gap-4 p-5 bg-white rounded-xl border border-[#e0e6ef]">
                  <div className="w-10 h-10 rounded-lg bg-[#1a5fa8]/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#1a5fa8]" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-semibold text-[#1a1a2e] mb-1">{item.title}</h4>
                    <p className="text-[13px] text-[#6b7c93] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 bg-[#1a5fa8]">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <div>
            <h3 className="text-[22px] font-bold text-white mb-1">加入全产业链服务体系</h3>
            <p className="text-[14px] text-white/75">获得平台品牌背书、资源对接与数字化运营支持</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/portal/quanchanyilian/apply"
              className="px-7 py-3 bg-white text-[#1a5fa8] text-[14px] font-bold rounded hover:bg-[#f0f6ff] transition-colors"
            >
              立即申请合作
            </Link>
            <Link
              href="/portal/kaifang-hezuo"
              className="px-7 py-3 border border-white/50 text-white text-[14px] font-medium rounded hover:bg-white/10 transition-colors"
            >
              了解开放合作
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
