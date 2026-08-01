"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  ArrowRight, MapPin, Leaf, Wheat, Warehouse, Truck,
  Factory, ChevronRight, Phone, Mail, CheckCircle,
  Building2, Users, BarChart2, Clock, Shield,
} from "lucide-react"

/* ── 各服务模块数据 ── */
const serviceData: Record<string, {
  title: string
  subtitle: string
  heroImg: string
  color: string
  description: string
  stats: { label: string; value: string }[]
  features: { title: string; desc: string; icon: React.ElementType }[]
  serviceItems: { name: string; desc: string }[]
  applyType: string
}> = {
  xiangzhen: {
    title: "乡镇农产品综合服务站",
    subtitle: "贴近农户的一站式基层服务网络",
    heroImg: "/images/quancyl/service-station.png",
    color: "#3a8c3f",
    description: "依托县域公共型农业社会化服务平台，在各乡镇建立农产品综合服务站，覆盖全省63个县域、1254个乡镇服务中心，提供订单农业、农资集采、农机服务、标准化种植等综合性农业社会化服务，是连接农户与市场的重要枢纽。",
    stats: [
      { label: "覆盖乡镇", value: "1254" },
      { label: "服务农户", value: "82万+" },
      { label: "覆盖县域", value: "63" },
      { label: "年服务量", value: "350万次" },
    ],
    features: [
      { icon: CheckCircle, title: "订单农业对接", desc: "依托供销平台订单农业体系，帮助农户对接市场需求，签订种植订单，保障收购价格，降低市场风险。" },
      { icon: Leaf,         title: "农资供应服务", desc: "集采优质农资产品，为农户提供化肥、农药、种子等农业生产物资，价格优惠，质量可靠。" },
      { icon: BarChart2,    title: "标准化指导", desc: "提供标准化种植技术指导和培训，帮助农户掌握科学种植技术，提升产品质量和产量。" },
      { icon: Truck,        title: "产地收购服务", desc: "设立产地收购点，及时收购农产品，缩短农产品流通环节，减少损耗，提高农户收益。" },
    ],
    serviceItems: [
      { name: "订单种植服务", desc: "按市场需求签订种植合同，保障农户收益" },
      { name: "农资统采服务", desc: "集中采购农资，降低农业生产成本" },
      { name: "农机共享服务", desc: "共享农业机械设备，减少农户固定投入" },
      { name: "技术培训服务", desc: "提供标准化种植技术指导与农民培训" },
      { name: "产地收购服务", desc: "就近收购农产品，减少流通损耗" },
      { name: "信息咨询服务", desc: "提供市场行情、政策信息咨询服务" },
    ],
    applyType: "station",
  },
  nongzi: {
    title: "专业农资农技服务网",
    subtitle: "全省布局的农资供应与技术服务体系",
    heroImg: "/images/quancyl/agri-supplies.png",
    color: "#1a5fa8",
    description: "全省布局4个国家战略性农资储备库，43个区域农资配送中心，51家县域农服公司和1254个农资农技服务中心，提供优质农资供应、农业技术指导、病虫害防治等专业服务，是全省覆盖最广的专业农资农技服务网络。",
    stats: [
      { label: "国家储备库", value: "4个" },
      { label: "区域配送中心", value: "43个" },
      { label: "县域农服公司", value: "51家" },
      { label: "服务中心", value: "1254个" },
    ],
    features: [
      { icon: Shield,    title: "优质农资供应", desc: "严格筛选优质农资品牌，建立产品准入制度，确保所售农资安全、正规、有效，杜绝假冒伪劣。" },
      { icon: Leaf,      title: "农业技术指导", desc: "配备专业农业技术人员，提供土壤检测、施肥方案、病虫害防治等专业技术指导服务。" },
      { icon: BarChart2, title: "数字化管理", desc: "建立农资销售与技术服务数字化管理系统，实现农资追溯、用量分析和服务效果评估。" },
      { icon: Users,     title: "农户培训", desc: "定期组织农户培训班，推广科学施肥、绿色防控等先进农业技术，提升农户技术水平。" },
    ],
    serviceItems: [
      { name: "农资供应", desc: "化肥、农药、种子、农膜等优质农资供应" },
      { name: "土壤检测", desc: "土壤成分分析与施肥方案定制" },
      { name: "病虫害防治", desc: "专业植保技术指导与统防统治服务" },
      { name: "技术培训", desc: "标准化种植、绿色农业技术培训" },
      { name: "农资配送", desc: "农资产品配送到田头服务" },
      { name: "农业保险", desc: "协助农户办理农业保险业务" },
    ],
    applyType: "service",
  },
  liangshi: {
    title: "粮食全产业链服务网",
    subtitle: "从田间到餐桌的粮食全链条综合服务",
    heroImg: "/images/quancyl/grain-processing.png",
    color: "#c47d0e",
    description: "部省合作国家级重大项目，占地1500亩，总投资50亿元，打造现代农业与食品加工产业集群服务，覆盖粮食收购、烘干、仓储、加工、销售全流程，配套完善的产地服务体系，实现粮食产值最大化。",
    stats: [
      { label: "占地面积", value: "1500亩" },
      { label: "总投资额", value: "50亿元" },
      { label: "年处理量", value: "70万吨" },
      { label: "合作农户", value: "15万户" },
    ],
    features: [
      { icon: Wheat,     title: "粮食收购服务", desc: "建立覆盖全省的粮食收购网络，为农户提供公平、透明的粮食收购价格，保障种粮农民利益。" },
      { icon: Factory,   title: "烘干加工服务", desc: "提供专业粮食烘干、分级、包装等初加工服务，减少粮食损耗，提升粮食品质和商品价值。" },
      { icon: Warehouse, title: "仓储管理服务", desc: "提供标准化粮食仓储服务，采用先进仓储技术，确保粮食安全储存，可提供代储、自储多种模式。" },
      { icon: BarChart2, title: "品牌销售服务", desc: "依托供销品牌和渠道资源，帮助优质粮食产品进入商超、电商等销售渠道，实现产品增值。" },
    ],
    serviceItems: [
      { name: "粮食收购", desc: "公开透明的粮食收购价格与快速结算" },
      { name: "粮食烘干", desc: "专业粮食烘干设备，减少晾晒损耗" },
      { name: "粮食仓储", desc: "标准化仓储，多种储存模式可选" },
      { name: "粮食加工", desc: "碾米、磨粉、包装等精深加工服务" },
      { name: "品牌销售", desc: "帮助优质粮食进入品牌销售渠道" },
      { name: "金融服务", desc: "粮食抵押融资、农业保险协办服务" },
    ],
    applyType: "base",
  },
  lengchain: {
    title: "公共型冷链物流骨干网",
    subtitle: "覆盖全省的冷链物流基础设施网络",
    heroImg: "/images/quancyl/cold-chain.png",
    color: "#1a6fa8",
    description: "构建覆盖全省的公共型冷链物流骨干网络，集聚冷藏保鲜、常温仓储、粮食仓储等多类型仓储服务，配套田头专线、干支线运输，确保农产品从产地到市场全程保鲜，减少流通损耗，提升农产品附加值。",
    stats: [
      { label: "冷库总容量", value: "200万吨" },
      { label: "覆盖城市", value: "21个" },
      { label: "物流节点", value: "180+" },
      { label: "配送车辆", value: "800+" },
    ],
    features: [
      { icon: Warehouse, title: "冷链仓储服务", desc: "提供冷藏（0-4℃）、冷冻（-18℃以下）、气调等多种仓储服务，满足不同农产品的储存需求。" },
      { icon: Truck,     title: "冷链运输服务", desc: "配备专业冷链运输车队，覆盖全省21个地级市，提供田头直达、仓库转运、城市配送等服务。" },
      { icon: Clock,     title: "预冷处理服务", desc: "在产地设立田头预冷站，农产品采收后即时预冷处理，最大限度保持农产品新鲜度和品质。" },
      { icon: Shield,    title: "全程追溯服务", desc: "建立冷链全程温度监控与追溯系统，实时掌握货物状态，确保冷链不断链，品质有保障。" },
    ],
    serviceItems: [
      { name: "冷库租用", desc: "冷藏、冷冻、气调仓库出租服务" },
      { name: "冷链运输", desc: "全省覆盖的专业冷链车队运输服务" },
      { name: "田头预冷", desc: "产地预冷站快速预冷处理服务" },
      { name: "分拣包装", desc: "产地分拣、分级、贴标包装服务" },
      { name: "代理报关", desc: "出口农产品报关、检验检疫代理服务" },
      { name: "金融保险", desc: "冷链货物保险、融资支持服务" },
    ],
    applyType: "service",
  },
  peisong: {
    title: "农产品直供配送网",
    subtitle: "精准高效的农产品产地直供配送服务",
    heroImg: "/images/quancyl/order-farming.png",
    color: "#3a8c3f",
    description: "对接粤港澳大湾区（广东·惠州）绿色农产品生产供应基地，建立农产品直供配送网络，为餐饮企业、商超、机关单位、学校食堂等提供优质、新鲜、可溯源的农产品直供配送服务，已服务8000余家机构客户。",
    stats: [
      { label: "服务客户", value: "8000+" },
      { label: "日均配送量", value: "500吨" },
      { label: "准时率", value: "99.2%" },
      { label: "覆盖品类", value: "500+" },
    ],
    features: [
      { icon: Truck,     title: "产地直供服务", desc: "对接供销认证的优质农业生产基地，产地直采直送，减少中间流通环节，确保新鲜度和性价比。" },
      { icon: Shield,    title: "品质溯源保障", desc: "每批农产品均可追溯至具体农户和地块，支持扫码查询生产记录，品质透明可信。" },
      { icon: Clock,     title: "定时定量配送", desc: "根据客户需求制定配送计划，定时定量配送，支持当日达、次日达等灵活配送模式。" },
      { icon: BarChart2, title: "数字化采购管理", desc: "提供数字化采购管理系统，支持在线下单、订单跟踪、账单对账，降低采购管理成本。" },
    ],
    serviceItems: [
      { name: "餐饮配送", desc: "餐饮企业农产品定制化配送服务" },
      { name: "商超供货", desc: "商超农产品专区供货与陈列服务" },
      { name: "机构团购", desc: "机关单位、学校食堂集中采购配送" },
      { name: "电商仓配", desc: "电商平台农产品仓储配送一体化服务" },
      { name: "产地直采", desc: "按需定制产地直采服务" },
      { name: "溯源管理", desc: "农产品全程溯源系统接入服务" },
    ],
    applyType: "service",
  },
  shuzi: {
    title: "数字供销服务平台",
    subtitle: "贯穿产前产中产后的数字化农业服务",
    heroImg: "/images/quancyl/hero-bg.png",
    color: "#6b3fa8",
    description: "提供开放高效协同的数字化服务，贯穿产前、产中、产后的"实体+数字"双轨优势，整合供销系统资源，实现农产品生产、流通、销售及服务全链条数字化管理与优化，已接入1.2万家农业主体，覆盖63个县域。",
    stats: [
      { label: "接入主体", value: "1.2万" },
      { label: "数字化县域", value: "63" },
      { label: "年交易额", value: "34亿" },
      { label: "数据接口", value: "200+" },
    ],
    features: [
      { icon: BarChart2, title: "产前规划服务", desc: "基于市场大数据和产地资源分析，为农户和农业主体提供种植品类建议、订单预测等产前规划服务。" },
      { icon: Shield,    title: "产中监控服务", desc: "整合物联网、遥感等技术，实时监控农业生产环境和作物生长状态，预警病虫害风险。" },
      { icon: Truck,     title: "产后销售服务", desc: "对接供销平台各销售渠道，提供数字化订单管理、库存管理、物流跟踪等产后销售服务。" },
      { icon: Users,     title: "农业金融服务", desc: "基于数字化信用评估，为农业主体提供农业贷款、保险等普惠金融服务，降低融资门槛。" },
    ],
    serviceItems: [
      { name: "数字农业管理", desc: "农业生产全流程数字化管理系统" },
      { name: "市场大数据", desc: "农产品市场行情数据分析与预测" },
      { name: "农业物联网", desc: "田间环境监测、作物长势监控" },
      { name: "供应链金融", desc: "基于数字信用的农业融资服务" },
      { name: "电子合同", desc: "在线签订农业合作合同与订单" },
      { name: "数字溯源", desc: "农产品全链条数字溯源系统" },
    ],
    applyType: "service",
  },
}

export default function ServiceDetailPage() {
  const params = useParams()
  const serviceId = params?.serviceId as string
  const data = serviceData[serviceId] ?? serviceData.xiangzhen
  const [activeTab, setActiveTab] = useState<"overview" | "services" | "apply">("overview")

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="bg-[#f8fafc] border-b border-[#e8edf5]">
        <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center gap-1.5 text-[13px] text-[#6b7c93]">
          <Link href="/portal" className="hover:text-[#1a5fa8]">首页</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/portal/quanchanyilian" className="hover:text-[#1a5fa8]">全产业链服务</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1a1a2e]">{data.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-[340px] overflow-hidden">
        <Image src={data.heroImg} alt={data.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2a4a]/80 via-[#0d2a4a]/50 to-transparent" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 h-full flex flex-col justify-center">
          <div
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1 rounded-full mb-4 w-fit"
            style={{ background: `${data.color}30`, color: "white", border: `1px solid ${data.color}60` }}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            {data.subtitle}
          </div>
          <h1 className="text-[32px] font-bold text-white mb-3">{data.title}</h1>
          <p className="text-[14px] text-white/80 max-w-[520px] leading-relaxed">{data.description}</p>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#1a5fa8]">
        <div className="max-w-[1200px] mx-auto px-6 py-5 grid grid-cols-4 divide-x divide-white/20">
          {data.stats.map(s => (
            <div key={s.label} className="text-center px-4">
              <div className="text-[26px] font-bold text-white">{s.value}</div>
              <div className="text-[12px] text-white/70 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab nav */}
      <div className="border-b border-[#e8edf5] bg-white sticky top-0 z-10">
        <div className="max-w-[1200px] mx-auto px-6 flex gap-0">
          {(["overview", "services", "apply"] as const).map((tab) => {
            const labels = { overview: "服务概览", services: "服务项目", apply: "申请合作" }
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3.5 text-[14px] font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-[#1a5fa8] text-[#1a5fa8]"
                    : "border-transparent text-[#6b7c93] hover:text-[#1a5fa8]"
                }`}
              >
                {labels[tab]}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex-1 bg-[#f8fafc]">
        <div className="max-w-[1200px] mx-auto px-6 py-10">

          {/* Tab: 服务概览 */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-2 gap-5">
              {data.features.map((f) => {
                const Icon = f.icon
                return (
                  <div key={f.title} className="bg-white rounded-xl border border-[#e0e6ef] p-6 flex gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${data.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: data.color }} />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold text-[#1a1a2e] mb-2">{f.title}</h4>
                      <p className="text-[13px] text-[#6b7c93] leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Tab: 服务项目 */}
          {activeTab === "services" && (
            <div className="grid grid-cols-3 gap-4">
              {data.serviceItems.map((item) => (
                <div key={item.name} className="bg-white rounded-xl border border-[#e0e6ef] p-5 hover:shadow-md hover:border-[#1a5fa8]/40 transition-all">
                  <div
                    className="w-2 h-5 rounded-full mb-3"
                    style={{ background: data.color }}
                  />
                  <h4 className="text-[14px] font-semibold text-[#1a1a2e] mb-1.5">{item.name}</h4>
                  <p className="text-[13px] text-[#6b7c93] leading-relaxed mb-4">{item.desc}</p>
                  <Link
                    href={`/portal/quanchanyilian/apply?type=${data.applyType}&service=${encodeURIComponent(item.name)}`}
                    className="text-[13px] font-medium flex items-center gap-1 hover:gap-2 transition-all"
                    style={{ color: data.color }}
                  >
                    申请此服务 <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Tab: 申请合作 */}
          {activeTab === "apply" && (
            <div className="max-w-[640px] mx-auto">
              <div className="bg-white rounded-xl border border-[#e0e6ef] p-8">
                <h3 className="text-[20px] font-bold text-[#1a1a2e] mb-2">申请合作入驻</h3>
                <p className="text-[13px] text-[#6b7c93] mb-6">
                  填写以下信息，我们的服务团队将在1-3个工作日内与您联系
                </p>
                <div className="space-y-4">
                  {[
                    { label: "企业/机构名称", placeholder: "请输入企业或机构全称", required: true },
                    { label: "联系人姓名",     placeholder: "请输入联系人姓名",     required: true },
                    { label: "联系电话",       placeholder: "请输入手机号码",       required: true },
                    { label: "所在地区",       placeholder: "省 / 市 / 县",         required: true },
                  ].map(field => (
                    <div key={field.label}>
                      <label className="text-[13px] font-medium text-[#333] mb-1.5 flex items-center gap-1">
                        {field.required && <span className="text-red-500">*</span>}
                        {field.label}
                      </label>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] outline-none focus:border-[#1a5fa8] transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-[13px] font-medium text-[#333] mb-1.5 block">
                      合作意向说明
                    </label>
                    <textarea
                      rows={4}
                      placeholder="请简述您的业务情况和合作意向..."
                      className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] outline-none focus:border-[#1a5fa8] transition-colors resize-none"
                    />
                  </div>
                  <button
                    className="w-full py-3 text-white text-[14px] font-semibold rounded-lg hover:opacity-90 transition-opacity"
                    style={{ background: data.color }}
                  >
                    提交申请
                  </button>
                </div>
                <div className="mt-6 pt-5 border-t border-[#f0f3f8] flex items-center gap-6 text-[13px] text-[#6b7c93]">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4" />
                    020-89309271
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4" />
                    sjpx@gdsgxd.com
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
