"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Search, ChevronRight, MapPin, Calendar } from "lucide-react"

/* ─── Types ─── */
type RoleTab = "需求方" | "供应方" | "农户"
type CropTab = "水稻" | "土豆" | "菠萝"

/* ─── Demand table data ─── */
const demandRows = [
  { company: "廉州新供销天润粮油储量有限公司", year: "2026年广东省内计划大量采购丝苗米", product: "丝苗米", qty: 900, signed: 400, unit: "吨", dateRange: "2026-01 至 2026-07" },
  { company: "廉州中信供销润农农产品有限公司", year: "2026年广东省内计划大量采购菠萝干", product: "菠萝干", qty: 8000, signed: 5000, unit: "公斤", dateRange: "2026-03 至 2026-06" },
  { company: "广东新供销天润米业有限公司", year: "2026年广东省内计划大量采购象牙香占米", product: "象牙香占", qty: 3, signed: 1.2, unit: "吨", dateRange: "2026-05 至 2026-08" },
  { company: "广东天富冷链物流有限公司", year: "2026年广东省内计划大量采购恩平土豆", product: "土豆", qty: 10, signed: 10, unit: "吨", dateRange: "2026-08 至 2026-11" },
]

/* ─── Supply table data ─── */
const supplyRows = [
  { company: "廉州新供销天润粮油储量有限公司", product: "丝苗米、高蛋白占", qty: 1000, signed: 400, unit: "吨", dateRange: "2026-01 至 2026-07" },
  { company: "廉州中信供销润农农产品有限公司", product: "菠萝、土豆", qty: 8000, signed: 5000, unit: "公斤", dateRange: "2026-03 至 2026-06" },
  { company: "广东新供销天润米业有限公司", product: "象牙香占、香皇", qty: 3, signed: 1.2, unit: "吨", dateRange: "2026-05 至 2026-08" },
  { company: "广东天富冷链物流有限公司", product: "土豆、红薯", qty: 10, signed: 10, unit: "吨", dateRange: "2026-08 至 2026-11" },
]

/* ─── Crop progress data ─── */
const cropItems = [
  { name: "商品名占", org: "汕头市村社村合作农业发展公司", dateRange: "2025-11-01 至 2026-05-30", pct: 40 },
  { name: "香芋", org: "汕头市惠圆双庆米农业制造联用有限公司", dateRange: "2011-11-01 至 2026-03-10", pct: 90 },
  { name: "万占香", org: "汕头米农业合创联销服务有限公司", dateRange: "2025-11-01 至 2026-01-30", pct: 70 },
  { name: "超发香芋", org: "商丘市村社村合作农业发展公司", dateRange: "2025-06-01 至 2026-01-30", pct: 65 },
  { name: "象牙香丝苗", org: "商丘市村社村合作农业发展公司", dateRange: "2025-06-01 至 2026-12-30", pct: 95 },
]

/* ─── Guaranteed purchase data ─── */
const purchaseRows = [
  { company: "廉州新供销天润粮油储量有限公司", product: "丝苗米", qty: "9000公斤", price: "6元/斤", dateRange: "2026-01 至 2026-07" },
  { company: "廉州中信供销润农农产品有限公司", product: "菠萝干", qty: "8000公斤", price: "5元/斤", dateRange: "2026-03 至 2026-06" },
  { company: "广东新供销天润米业有限公司", product: "东塘布", qty: "2吨", price: "8元/斤", dateRange: "2026-05 至 2026-08" },
  { company: "广东天富冷链物流有限公司", product: "土豆", qty: "7000公斤", price: "1.2元/公斤", dateRange: "2026-08 至 2026-11" },
]

const commodityTags = ["丝苗米 13场", "土豆 32场", "菠萝 13场", "东布 42场", "丝苗米 13场", "丝苗米 13场", "某某某 13场", "某某 13场"]

const cropStats = { total: 38, ongoing: 15, completed: 8, cropOps: 15, area: 92010, completionRate: 95 }

export default function DingdanNongyePage() {
  const [roleTab, setRoleTab] = useState<RoleTab>("需求方")
  const [cropTab, setCropTab] = useState<CropTab>("水稻")
  const [demandKeyword, setDemandKeyword] = useState("")
  const [supplyKeyword, setSupplyKeyword] = useState("")

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">

        {/* ── Banner ── */}
        <div
          className="relative"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#0a2e5c]/80" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 pt-8 pb-0">
            {/* Title */}
            <div className="text-center pt-6 pb-4">
              <h1 className="text-[36px] font-bold text-white mb-2">订单农业服务</h1>
              <p className="text-[15px] text-white/80">以销定产 按需定质</p>
            </div>

            {/* Role tabs */}
            <div className="flex justify-center gap-0 mt-4">
              {(["需求方", "供应方", "农户"] as RoleTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setRoleTab(tab)}
                  className={`px-10 py-2.5 text-[14px] font-medium border-b-2 transition-colors ${
                    roleTab === tab
                      ? "border-white text-white"
                      : "border-transparent text-white/60 hover:text-white"
                  }`}
                >
                  {tab === "需求方" ? "🏢 需求方" : tab === "供应方" ? "🏭 供应方" : "🌾 农户"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── 4-step flow cards ── */}
        <div className="bg-white border-b border-[#e8edf5]">
          <div className="max-w-[1400px] mx-auto px-8 py-8">
            <div className="grid grid-cols-4 gap-4">
              {[
                {
                  num: 1, title: "需求准备与前期规划",
                  desc: "需求方与供应商确定供应方（共供销商业、农贸合作伙伴、农业服务机构）",
                  points: ["明确需求标准", "选择供应/农场方", "开展初步接洽"],
                },
                {
                  num: 2, title: "订单签订与任务分解传导",
                  desc: "需求方与供应方实签订合同，共同签署，形式按任务分解下达",
                  points: ["合同设计与签订", "任务分解与计划下达", "二次协议/保险协议"],
                },
                {
                  num: 3, title: "生产过程监控与支持",
                  desc: "需求方与供应方实现对实际生产过程，共同开展服务、履职保障产品质量",
                  points: ["双督导督查体系", "定期检查要求", "风险控制机制"],
                },
                {
                  num: 4, title: "采收、交割与结算",
                  desc: "对农产品的采收、加工处理、仓储、物流，初级精加工、分级结算",
                  points: ["组织化采收", "分级验收整合", "顺利结算"],
                },
              ].map((step) => (
                <div key={step.num} className="border border-[#e8edf5] rounded p-5 hover:border-[#1a5fa8]/40 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#1a5fa8] text-white text-[13px] font-bold flex items-center justify-center shrink-0">
                      {step.num}
                    </div>
                    <h3 className="text-[14px] font-semibold text-[#1a1a2e]">{step.title}</h3>
                  </div>
                  <p className="text-[12px] text-[#6b7c93] leading-relaxed mb-4">{step.desc}</p>
                  <ul className="space-y-1.5">
                    {step.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-[12px] text-[#3a8c3f]">
                        <div className="w-4 h-4 rounded-full border border-[#3a8c3f] flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#3a8c3f]" />
                        </div>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-4 text-[#1a5fa8] text-[12px] flex items-center gap-1 hover:gap-2 transition-all">
                    了解更多 <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 订单种植需求 ── */}
        <div className="max-w-[1400px] mx-auto px-8 py-8">
          <h2 className="text-[20px] font-bold text-[#1a1a2e] text-center mb-5">订单种植需求</h2>

          {/* Commodity tag bar */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-[12px] text-[#6b7c93]">已有商品：</span>
            {commodityTags.map((tag, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded text-[12px] border transition-colors ${
                  i === 1
                    ? "bg-[#1a5fa8] text-white border-[#1a5fa8]"
                    : "bg-white text-[#6b7c93] border-[#dde3ec] hover:border-[#1a5fa8] hover:text-[#1a5fa8]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search + table */}
          <div className="bg-white border border-[#e8edf5] rounded">
            <div className="p-4 border-b border-[#e8edf5] flex items-center gap-3">
              <div className="flex-1 flex items-center gap-2 border border-[#dde3ec] rounded px-3 h-9">
                <Search className="w-4 h-4 text-[#6b7c93]" />
                <input
                  type="text"
                  placeholder="输入公司/商品/需求搜索..."
                  value={demandKeyword}
                  onChange={(e) => setDemandKeyword(e.target.value)}
                  className="flex-1 text-[13px] outline-none bg-transparent placeholder:text-[#aaa]"
                />
              </div>
              <button className="px-5 h-9 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
                搜索
              </button>
            </div>
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[#f5f7fa] border-b border-[#e8edf5]">
                  {["公司信息", "需求", "商品", "预估总采购量", "已签约", "计划收购时间", "操作"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-[#555] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {demandRows
                  .filter((r) => !demandKeyword || r.company.includes(demandKeyword) || r.product.includes(demandKeyword))
                  .map((row, i) => {
                    const pct = row.qty > 0 ? Math.round((row.signed / row.qty) * 100) : 0
                    return (
                      <tr key={i} className="border-b border-[#f0f4f8] hover:bg-[#fafcff] transition-colors">
                        <td className="px-4 py-3 text-[#333] max-w-[200px]">{row.company}</td>
                        <td className="px-4 py-3 text-[#6b7c93] max-w-[220px] text-[12px]">{row.year}</td>
                        <td className="px-4 py-3 font-medium text-[#1a1a2e]">{row.product}</td>
                        <td className="px-4 py-3 text-[#1a1a2e]">{row.qty}{row.unit}</td>
                        <td className="px-4 py-3 w-44">
                          <div className="text-[12px] text-[#6b7c93] mb-1">余：{row.qty - row.signed}{row.unit}</div>
                          <div className="h-2 bg-[#e8edf5] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#1a5fa8]"
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[#6b7c93] text-[12px] flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {row.dateRange}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-1">
                            <button className="text-[12px] text-[#1a5fa8] hover:underline text-left">详细信息</button>
                            <Link href="/portal/dingdan-nongye/gongying-baojia" className="text-[12px] text-[#e8831a] hover:underline">
                              发起供应报价
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
            <div className="p-4 flex items-center justify-center gap-3">
              <Link
                href="/portal/dingdan-nongye/caigou-xunjia"
                className="px-6 py-2 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded hover:bg-[#e8f4fd] transition-colors flex items-center gap-1.5"
              >
                发布订单种植需求 <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <button className="px-6 py-2 border border-[#dde3ec] text-[#6b7c93] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors flex items-center gap-1.5">
                更多订单种植需求 <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── 订单种植供应 ── */}
        <div className="bg-white border-t border-b border-[#e8edf5]">
          <div className="max-w-[1400px] mx-auto px-8 py-8">
            <h2 className="text-[20px] font-bold text-[#1a1a2e] text-center mb-5">订单种植供应</h2>

            {/* Commodity tag bar */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-[12px] text-[#6b7c93]">已有供应：</span>
              {commodityTags.map((tag, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded text-[12px] border transition-colors ${
                    i === 1
                      ? "bg-[#1a5fa8] text-white border-[#1a5fa8]"
                      : "bg-white text-[#6b7c93] border-[#dde3ec] hover:border-[#1a5fa8] hover:text-[#1a5fa8]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Search + table */}
            <div className="border border-[#e8edf5] rounded">
              <div className="p-4 border-b border-[#e8edf5] flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2 border border-[#dde3ec] rounded px-3 h-9">
                  <Search className="w-4 h-4 text-[#6b7c93]" />
                  <input
                    type="text"
                    placeholder="输入公司/商品/供应搜索..."
                    value={supplyKeyword}
                    onChange={(e) => setSupplyKeyword(e.target.value)}
                    className="flex-1 text-[13px] outline-none bg-transparent placeholder:text-[#aaa]"
                  />
                </div>
                <button className="px-5 h-9 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
                  搜索
                </button>
              </div>
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-[#f5f7fa] border-b border-[#e8edf5]">
                    {["公司信息", "商品", "预估供应量", "已签约", "计划供应时间", "操作"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold text-[#555] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {supplyRows
                    .filter((r) => !supplyKeyword || r.company.includes(supplyKeyword) || r.product.includes(supplyKeyword))
                    .map((row, i) => {
                      const pct = row.qty > 0 ? Math.round((row.signed / row.qty) * 100) : 0
                      return (
                        <tr key={i} className="border-b border-[#f0f4f8] hover:bg-[#fafcff] transition-colors">
                          <td className="px-4 py-3 text-[#333] max-w-[200px]">{row.company}</td>
                          <td className="px-4 py-3 font-medium text-[#1a1a2e]">{row.product}</td>
                          <td className="px-4 py-3 text-[#1a1a2e]">{row.qty}{row.unit}</td>
                          <td className="px-4 py-3 w-44">
                            <div className="text-[12px] text-[#6b7c93] mb-1">余：{row.qty - row.signed}{row.unit}</div>
                            <div className="h-2 bg-[#e8edf5] rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-[#1a5fa8]"
                                style={{ width: `${Math.min(pct, 100)}%` }}
                              />
                            </div>
                          </td>
                          <td className="px-4 py-3 text-[#6b7c93] text-[12px]">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {row.dateRange}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col gap-1">
                              <button className="text-[12px] text-[#1a5fa8] hover:underline text-left">详细信息</button>
                              <Link href="/portal/dingdan-nongye/caigou-xunjia" className="text-[12px] text-[#e8831a] hover:underline">
                                发起采购询价
                              </Link>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
              <div className="p-4 flex items-center justify-center gap-3">
                <Link
                  href="/merchant/dingdan-nongye/fabu-gy"
                  className="px-6 py-2 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded hover:bg-[#e8f4fd] transition-colors flex items-center gap-1.5"
                >
                  发布订单种植供应 <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <button className="px-6 py-2 border border-[#dde3ec] text-[#6b7c93] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors flex items-center gap-1.5">
                  更多订单种植供应 <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── 种植过程管理 ── */}
        <div className="max-w-[1400px] mx-auto px-8 py-8">
          <h2 className="text-[20px] font-bold text-[#1a1a2e] text-center mb-6">种植过程管理</h2>
          <div className="flex gap-6">
            {/* Left: tabs + progress list */}
            <div className="flex-1 min-w-0">
              {/* Tabs */}
              <div className="flex gap-0 mb-4">
                {(["水稻", "土豆", "菠萝"] as CropTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCropTab(tab)}
                    className={`px-6 py-2 text-[13px] font-medium border transition-colors first:rounded-l last:rounded-r -ml-px first:ml-0 ${
                      cropTab === tab
                        ? "bg-[#1a5fa8] text-white border-[#1a5fa8] z-10"
                        : "bg-white text-[#555] border-[#dde3ec] hover:border-[#1a5fa8] hover:text-[#1a5fa8]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Progress list */}
              <div className="bg-white border border-[#e8edf5] rounded">
                {cropItems.map((item, i) => (
                  <div key={i} className={`p-4 ${i < cropItems.length - 1 ? "border-b border-[#f0f4f8]" : ""}`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-3">
                        <span className="text-[13px] font-semibold text-[#1a1a2e] w-20">{item.name}</span>
                        <span className="text-[12px] text-[#6b7c93]">{item.org}</span>
                      </div>
                      <span className="text-[12px] text-[#6b7c93]">{item.dateRange}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-4 bg-[#e8edf5] rounded-sm overflow-hidden">
                        <div
                          className="h-full bg-[#1a5fa8] flex items-center justify-end pr-1.5"
                          style={{ width: `${item.pct}%` }}
                        >
                          <span className="text-[10px] text-white font-medium">{item.pct}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="p-4 flex justify-center border-t border-[#f0f4f8]">
                  <button className="px-6 py-2 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded hover:bg-[#e8f4fd] transition-colors flex items-center gap-1.5">
                    查看我的种植任务 <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: stats cards */}
            <div className="w-[280px] shrink-0">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "总任务(个)", value: cropStats.total, color: "text-[#1a5fa8]" },
                  { label: "正在进行(个)", value: cropStats.ongoing, color: "text-[#1a5fa8]" },
                  { label: "已完成(个)", value: cropStats.completed, color: "text-[#3a8c3f]" },
                  { label: "种植作物(种)", value: cropStats.cropOps, color: "text-[#1a5fa8]" },
                  { label: "种植面积(亩)", value: cropStats.area.toLocaleString(), color: "text-[#1a5fa8]" },
                  { label: "完成率(%)", value: cropStats.completionRate, color: "text-[#3a8c3f]" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white border border-[#e8edf5] rounded p-4 text-center">
                    <div className={`text-[24px] font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-[12px] text-[#6b7c93] mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── 农产品保价收购 ── */}
        <div className="bg-white border-t border-[#e8edf5]">
          <div className="max-w-[1400px] mx-auto px-8 py-8">
            <h2 className="text-[20px] font-bold text-[#1a1a2e] text-center mb-5">农产品保价收购</h2>

            {/* Commodity tag bar */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-[12px] text-[#6b7c93]">已有收购：</span>
              {commodityTags.map((tag, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded text-[12px] border transition-colors ${
                    i === 1
                      ? "bg-[#1a5fa8] text-white border-[#1a5fa8]"
                      : "bg-white text-[#6b7c93] border-[#dde3ec] hover:border-[#1a5fa8] hover:text-[#1a5fa8]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="border border-[#e8edf5] rounded overflow-hidden">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-[#f5f7fa] border-b border-[#e8edf5]">
                    {["公司信息", "商品", "数量", "收购价", "计划收购时间"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold text-[#555]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {purchaseRows.map((row, i) => (
                    <tr key={i} className="border-b border-[#f0f4f8] hover:bg-[#fafcff] transition-colors">
                      <td className="px-4 py-3 text-[#333]">{row.company}</td>
                      <td className="px-4 py-3 font-medium text-[#1a1a2e]">{row.product}</td>
                      <td className="px-4 py-3 text-[#1a1a2e]">{row.qty}</td>
                      <td className="px-4 py-3 text-[#e8831a] font-semibold">{row.price}</td>
                      <td className="px-4 py-3 text-[#6b7c93] text-[12px]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {row.dateRange}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom platform link */}
            <div className="flex justify-center mt-6">
              <button className="flex items-center gap-2 px-6 py-2.5 bg-[#1a5fa8] text-white text-[13px] rounded-full hover:bg-[#0d4a8a] transition-colors">
                <MapPin className="w-4 h-4" />
                为农服务综合平台
              </button>
            </div>
          </div>
        </div>

      </main>
      <SiteFooter />
    </div>
  )
}
