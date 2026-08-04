"use client"

import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ChevronRight, Users, ShoppingBag, Package, Wallet, CheckCircle, Shield, Truck, Eye, LayoutGrid } from "lucide-react"
import Image from "next/image"

/* ─── Data ─── */
const stats = [
  { label: "采购品种", value: "2890", unit: "种" },
  { label: "参与企业", value: "18", unit: "家" },
  { label: "采购总量", value: "9898", unit: "吨" },
  { label: "采购总额", value: "92898", unit: "万元" },
]

const advantages = [
  {
    icon: LayoutGrid,
    title: "需求汇集",
    desc: "整合机关、学校、企事业单位等多方采购需求，形成规模效益",
    highlight: "联合采购超过10000吨",
    color: "#1a5fa8",
    bg: "#e8f4fd",
  },
  {
    icon: Package,
    title: "规模议价",
    desc: "以量谈价，统一议价议价，采购成本平均降低15%-30%",
    highlight: "节省采购成本不下于万元",
    color: "#3a8c3f",
    bg: "#e8f5e9",
  },
  {
    icon: Shield,
    title: "履约保障",
    desc: "发挥供销优势，强化企业资质认证，确保合同履约安全可靠",
    highlight: "合同履约率提升300%",
    color: "#6a3a9f",
    bg: "#f3eeff",
  },
  {
    icon: Eye,
    title: "阳光采购",
    desc: "招标公开透明，采购环节全程留证可溯，杜绝暗箱操作",
    highlight: "启动透明公示流程",
    color: "#1a5fa8",
    bg: "#e8f4fd",
  },
  {
    icon: CheckCircle,
    title: "高效便捷",
    desc: "一键提交需求，系统智能匹配优质供应商，快速完成采购全流程",
    highlight: "平均采购周期缩短60%",
    color: "#e8831a",
    bg: "#fff3e0",
  },
  {
    icon: Truck,
    title: "配送保障",
    desc: "依托全省11地市配送网络，冷链物流全程可控，善保供放心量采购",
    highlight: "24小时极速到达",
    color: "#0891b2",
    bg: "#e0f7fa",
  },
]

const enterprises = [
  {
    id: "1",
    name: "广东供销农产品股份有限公司",
    badges: [
      { label: "粤供优选", color: "#3a8c3f" },
      { label: "食品安全认证", color: "#1a5fa8" },
      { label: "省级重点企业", color: "#6a3a9f" },
    ],
    desc: "依托全省供销系统供应链优势，专注为机关、学校及企事业单位提供一站式集采服务。",
    coreItems: "米面粮油、肉禽蛋奶、鲜蔬水果、海鲜水产、干货调味、熟食面点及精品水果。源头直采，批批检测，价格透明。",
    advantage: "食安可追溯，应急保供能力强，有效降低采购成本。",
    founded: "2015年",
    regions: "全省21地市",
    tags: ["粮油", "蔬菜", "水产", "禽蛋"],
  },
  {
    id: "2",
    name: "广东天禾农股份有限公司",
    badges: [
      { label: "上市企业", color: "#e8831a" },
      { label: "绿色认证", color: "#3a8c3f" },
    ],
    desc: "作为广东供销合作社直属企业，华南农资流通骨干一员，专注于种植大户、农业合作社及企业单位提供一站式农资集采服务。",
    coreItems: "复合、甲肥、聚茂苗养式、以蔬菜种子种子种，全品类蔬菜物种物规格处理，绿色环保。",
    advantage: "全国103家配送中心直达终端，服务超25000客户；24小时响应，2小时内送达；配备专业农服务，提供作物解决方案。",
    founded: "1991年",
    regions: "全国103个配送中心",
    tags: ["化肥", "农药", "种子", "种苗"],
  },
  {
    id: "3",
    name: "广东新供销天润粮油集团有限公司",
    badges: [
      { label: "国企资质", color: "#c0392b" },
      { label: "绿链粮质", color: "#3a8c3f" },
    ],
    desc: '依托"粤供销融全"产业链，聚焦广东本地优质粮油，推进佛山市域品牌建设，重点实现标准化程度高、服务政府、企事业及民生保障。',
    coreItems: '以"广东丝苗米MO"，遵循追溯尺寸丝苗米、蚕豆丝苗米、怀集丝苗米、台山丝苗米为MO，执行GB/T 1354-2019 三级以上标准。',
    advantage: "集中在全产业链备仓、粮源与售备保障，品质与溯源，国企进购与各保供岗元大地废，为集采业链提稳经营、合规、高效的支援。",
    founded: "2008年",
    regions: "广东全省及华南区域",
    tags: ["丝苗米", "糙米", "大米", "谷物粮食"],
  },
  {
    id: "4",
    name: "广东新供销大业冷链集团有限公司",
    badges: [
      { label: "冷链资质认证", color: "#0891b2" },
      { label: "应急保供企业", color: "#e8831a" },
    ],
    desc: "广东供销合作联社直属冷链物流骨干企业，依托全省冷链仓链网络与配置配送体系，专注为企业提供一供一站式冷链采购与配送服务，保障生鲜食品从源头到终端的全链条安全。",
    coreItems: "冷冻冷藏（猪、牛、羊、鸡肉）、冰鲜水产（活鱼、虾、螺贝类品）、速冻食品（汤圆、水饺、预制菜）、低温乳制品、全品类合标冷链存储，全程2°C-4°C低温配送。",
    advantage: "在粤冷库仓储容量超20万方米，冷链车辆近300辆，交货日市次日达标准；建立全程追踪溯源系统，打印清晰冷链日志；承接动应急储肉类及春节供应任务，善善快速调度服。",
    founded: "2012年",
    regions: "粤港澳大湾区及全省21地市",
    tags: ["冷链食品", "冷冻肉类", "冷鲜水产", "速冻食品", "低温乳制品"],
  },
]

const categoryProducts: Record<string, { label: string; qty: string; price: string }[]> = {
  "丝苗米": [{ label: "丝苗米", qty: "100吨", price: "100万元" }],
  "化肥":   [{ label: "化肥",   qty: "100吨", price: "100万元" }],
  "大豆":   [{ label: "大豆",   qty: "100吨", price: "100万元" }],
  "种子":   [{ label: "种子",   qty: "100吨", price: "100万元" }],
  "食用油": [{ label: "食用油", qty: "100吨", price: "100万元" }],
  "鸡蛋":   [{ label: "鸡蛋",   qty: "100吨", price: "100万元" }],
  "蓝莓":   [{ label: "蓝莓",   qty: "100吨", price: "100万元" }],
  "猕猴桃": [{ label: "猕猴桃", qty: "100吨", price: "100万元" }],
}
const carouselItems = Object.keys(categoryProducts)

const categoryBanners = [
  {
    id: "veg",
    title: "蔬菜品类集采",
    period: "2026.06.23 - 2026.07.08",
    tag: "新鲜直供 · 批量优选",
    sub: "本次集采涵盖50+农产品品类",
    img: "/images/jicai-veg-banner.png",
    textColor: "#fff",
    tagBg: "rgba(255,255,255,0.25)",
  },
  {
    id: "fruit",
    title: "水果品类集采活动",
    period: "2026.07.01 - 2026.12.31",
    tag: "产地直采 · 新鲜直达",
    sub: "",
    img: "/images/jicai-fruit-banner.png",
    textColor: "#fff",
    tagBg: "rgba(255,255,255,0.25)",
  },
]

export default function JicaiPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">

        {/* ── Hero ── */}
        <div className="bg-gradient-to-r from-[#0d3a6e] to-[#1a5fa8] text-white">
          <div className="max-w-[1200px] mx-auto px-6 py-10 flex items-start gap-10">
            <div className="flex-1">
              <div className="text-[12px] text-white/60 flex items-center gap-1 mb-4">
                <Link href="/" className="hover:text-white/90">首页</Link>
                <ChevronRight className="w-3 h-3" />
                <span>集采专区</span>
              </div>
              <h1 className="text-[32px] font-bold mb-2">集采��区</h1>
              <p className="text-[14px] text-white/75 mb-6">
                企业联合采购专区，汇聚多方需求统一议价集采，共享规模优化与履约保障
              </p>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1.5 px-4 py-2 bg-white/15 border border-white/30 text-white text-[13px] rounded hover:bg-white/25 transition-colors">
                  <ShoppingBag className="w-4 h-4" />一键提交需求
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-white/15 border border-white/30 text-white text-[13px] rounded hover:bg-white/25 transition-colors">
                  <Eye className="w-4 h-4" />见低采购
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-[#e8831a] text-white text-[13px] rounded font-semibold hover:bg-[#c96d0f] transition-colors">
                  <Users className="w-4 h-4" />加快搜索
                </button>
              </div>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              {stats.map((s) => (
                <div key={s.label} className="bg-white/10 border border-white/20 rounded px-5 py-3 min-w-[140px]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[22px] font-bold">{s.value}</span>
                    <span className="text-[12px] text-white/70">{s.unit}</span>
                  </div>
                  <div className="text-[12px] text-white/60 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 集采优势 ── */}
        <div className="bg-white py-12">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-[24px] font-bold text-[#1a1a2e]">集采优势</h2>
              <p className="text-[14px] text-[#6b7c93] mt-2">
                依托广东省供销合作联社系统优势，构建"需求汇聚—统一议价—集中采购—履约保障"全链条服务体系
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {advantages.map((adv) => (
                <div key={adv.title} className="border border-[#e8edf5] rounded-lg p-5 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: adv.bg }}
                    >
                      <adv.icon className="w-5 h-5" style={{ color: adv.color }} />
                    </div>
                    <h3 className="text-[15px] font-bold text-[#1a1a2e]">{adv.title}</h3>
                  </div>
                  <p className="text-[13px] text-[#555] leading-relaxed mb-2">{adv.desc}</p>
                  <div className="text-[12px] font-medium" style={{ color: adv.color }}>{adv.highlight}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 优选企业 ── */}
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-[24px] font-bold text-[#1a1a2e]">优选企业</h2>
            <p className="text-[14px] text-[#6b7c93] mt-2">
              助力机关企事业单位降本增效，让每一笔采购都实现阳光、高效、低价、合规
            </p>
          </div>

          {/* Category Carousel */}
          <div className="bg-white border border-[#e8edf5] rounded-lg p-4 mb-6 overflow-x-auto">
            <div className="flex items-center gap-3 min-w-max">
              {carouselItems.map((item) => (
                <div key={item} className="flex flex-col items-center gap-1 px-4 py-2 border border-[#e8edf5] rounded hover:border-[#1a5fa8] cursor-pointer group transition-colors min-w-[80px]">
                  <span className="text-[13px] font-medium text-[#1a1a2e] group-hover:text-[#1a5fa8]">{item}</span>
                  <span className="text-[11px] text-[#6b7c93]">100吨</span>
                  <span className="text-[11px] text-[#6b7c93]">100万元</span>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise list */}
          <div className="space-y-4">
            {enterprises.map((ent) => (
              <div
                key={ent.id}
                className="bg-white border border-[#e8edf5] rounded-lg p-6 hover:shadow-md hover:border-[#1a5fa8]/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Name + badges */}
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h3 className="text-[16px] font-bold text-[#1a5fa8]">{ent.name}</h3>
                      {ent.badges.map((b) => (
                        <span
                          key={b.label}
                          className="text-[11px] px-2 py-0.5 rounded border font-medium"
                          style={{ color: b.color, borderColor: b.color, background: `${b.color}12` }}
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>

                    {/* Desc */}
                    <p className="text-[13px] text-[#555] leading-relaxed mb-2">{ent.desc}</p>

                    {/* Core items */}
                    <p className="text-[12px] text-[#666] mb-1">
                      <span className="font-medium text-[#333]">核心品类：</span>{ent.coreItems}
                    </p>
                    <p className="text-[12px] text-[#666] mb-3">
                      <span className="font-medium text-[#333]">核心优势：</span>{ent.advantage}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-[12px] text-[#6b7c93]">
                      <span className="flex items-center gap-1">
                        <span className="w-3.5 h-3.5 inline-flex items-center justify-center bg-[#6b7c93]/15 rounded-sm">⊙</span>
                        成立：{ent.founded}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3.5 h-3.5 inline-flex items-center justify-center bg-[#6b7c93]/15 rounded-sm">◎</span>
                        覆盖：{ent.regions}
                      </span>
                      <div className="flex items-center gap-1 flex-wrap">
                        {ent.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-[#f0f4f8] text-[#6b7c93] rounded text-[11px]">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/portal/jicai/${ent.id}`}
                    className="shrink-0 flex items-center gap-1.5 px-6 py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors"
                  >
                    进入 <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Quote ── */}
        <div className="bg-[#0d3a6e] py-10 text-center px-6">
          <p className="text-[14px] text-white/80 max-w-[680px] mx-auto leading-relaxed">
            坚守为农服务初心，发挥组织体系和流通网络优势，搭建农产品直采直供平台，服务机关企事业单位高效集采，实现助农增收与降本增效。
          </p>
          <p className="text-[13px] text-white/50 mt-3">—— 广东省供销合作联社</p>
        </div>

      </main>
      <SiteFooter />
    </div>
  )
}
