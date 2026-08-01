"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Search, Plus, MapPin, Calendar, ChevronRight, ArrowRight, Package, ShoppingCart, TrendingUp, Users } from "lucide-react"

/* ─── Types ─── */
type MainTab = "采购信息" | "销售信息"

/* ─── Data ─── */
const categoryTags = ["全部", "粮油", "蔬菜", "水果", "畜禽", "水产", "其他"]

const caigouList = [
  {
    id: "CG20260601001", status: "采购中", category: "粮油",
    title: "2026年广东省大批量优质丝苗米长期采购",
    desc: "要求粒粒整齐，含水量≤14%，整精米率≥65%，要求有绿色食品认证。",
    qty: "50吨", unit: "吨", price: "面议", city: "广州市",
    deadline: "2026-06-30", buyer: "广州荣食品有限公司",
    contact: "张经理", views: 238, inquiries: 12,
  },
  {
    id: "CG20260601002", status: "采购中", category: "粮油",
    title: "饲料用玉米大批量长期采购",
    desc: "长期稳定需求，饲料用玉米，容重≥720g/L，水分≤14%，杂质≤1%。",
    qty: "120吨/月", unit: "吨/月", price: "面议", city: "佛山市",
    deadline: "2026-07-20", buyer: "佛山荣养殖合作社",
    contact: "李主任", views: 156, inquiries: 0,
  },
  {
    id: "CG20260601003", status: "已完成", category: "粮油",
    title: "非转基因大豆采购",
    desc: "用于豆腐、豆浆生产，要求非转基因认证，蛋白质含量≥38%。",
    qty: "30吨", unit: "吨", price: "12万元", city: "深圳市",
    deadline: "2026-06-10", buyer: "深圳荣豆制品厂",
    contact: "王厂长", views: 412, inquiries: 5,
  },
  {
    id: "CG20260601004", status: "采购中", category: "蔬菜",
    title: "广东省内优质有机蔬菜长期稳定供货",
    desc: "需要有机认证蔬菜，品种多样，包含叶菜类、根茎类，要求每日新鲜配送。",
    qty: "500公斤/天", unit: "公斤/天", price: "面议", city: "广州市",
    deadline: "2026-12-31", buyer: "广州某连锁餐饮集团",
    contact: "采购部", views: 89, inquiries: 7,
  },
  {
    id: "CG20260601005", status: "采购中", category: "水果",
    title: "2026年应季荔枝大量收购",
    desc: "品种不限，要求新鲜度高，糖度≥16°Brix，无明显病虫害，产地广东本地。",
    qty: "200吨", unit: "吨", price: "面议", city: "东莞市",
    deadline: "2026-07-15", buyer: "东莞水果批发市场",
    contact: "赵经理", views: 321, inquiries: 18,
  },
  {
    id: "CG20260601006", status: "采购中", category: "畜禽",
    title: "活猪长期稳定采购合作",
    desc: "需要长期稳定供货，活猪体重120-150kg，瘦肉率≥55%，需提供检疫证明。",
    qty: "50头/周", unit: "头/周", price: "面议", city: "深圳市",
    deadline: "2026-12-31", buyer: "深圳某大型肉联厂",
    contact: "刘总监", views: 203, inquiries: 9,
  },
]

const xiaoshouList = [
  {
    id: "XS20260601001", status: "销售中", category: "粮油",
    title: "2026年新产丰两优大米大量供应",
    desc: "自有种植基地，GAP认证，含水量≤14%，整精米率≥70%，可提供质检报告。",
    qty: "300吨", unit: "吨", price: "2.8~3.2元/斤", city: "韶关市",
    validUntil: "2026-08-31", seller: "韶关新供销天润粮油有限公司",
    contact: "陈经理", views: 178, inquiries: 8,
  },
  {
    id: "XS20260601002", status: "销售中", category: "蔬菜",
    title: "有机菜心、芥兰周年稳定供应",
    desc: "通过有机认证，自有基地500亩，可保障周年供应，每日采摘当天发货。",
    qty: "2000公斤/天", unit: "公斤/天", price: "3.5~4.5元/斤", city: "清远市",
    validUntil: "2026-12-31", seller: "清远绿源有机农业有限公司",
    contact: "黄总", views: 265, inquiries: 15,
  },
  {
    id: "XS20260601003", status: "销售中", category: "水果",
    title: "2026年粤西荔枝火热供应中",
    desc: "桂味、糯米糍两个品种，糖度高，肉质嫩，产地直发，全程冷链配送。",
    qty: "500吨", unit: "吨", price: "15~25元/斤", city: "茂名市",
    validUntil: "2026-07-31", seller: "茂名荔枝专业合作社",
    contact: "梁社长", views: 891, inquiries: 42,
  },
  {
    id: "XS20260601004", status: "销售中", category: "水产",
    title: "南海鲜活海鲜直供",
    desc: "自有捕捞船队，多品种海鲜，活鲜率≥95%，可定制规格，支持大宗采购。",
    qty: "10吨/天", unit: "吨/天", price: "面议", city: "湛江市",
    validUntil: "2026-12-31", seller: "湛江海洋渔业有限公司",
    contact: "王船长", views: 432, inquiries: 23,
  },
  {
    id: "XS20260601005", status: "即将结束", category: "畜禽",
    title: "土鸡蛋特价批量出售",
    desc: "散养土鸡蛋，无激素无抗生素，蛋黄金黄，口感好，欢迎批量采购。",
    qty: "5000枚/周", unit: "枚/周", price: "1.2元/枚", city: "梅州市",
    validUntil: "2026-06-30", seller: "梅州客家土鸡养殖场",
    contact: "钟老板", views: 156, inquiries: 6,
  },
  {
    id: "XS20260601006", status: "销售中", category: "粮油",
    title: "花生油产地直供，量大从优",
    desc: "普宁花生纯压榨，非转基因，无添加，酸价≤2mgKOH/g，可提供出厂检测报告。",
    qty: "100吨", unit: "吨", price: "16~18元/斤", city: "揭阳市",
    validUntil: "2026-09-30", seller: "揭阳普宁花生油厂",
    contact: "林厂长", views: 298, inquiries: 11,
  },
]

const statusColors: Record<string, { text: string; bg: string; border: string }> = {
  "采购中":   { text: "#1a5fa8", bg: "#e8f4fd", border: "#b3d4f5" },
  "销售中":   { text: "#3a8c3f", bg: "#f0fdf4", border: "#86efac" },
  "已完成":   { text: "#6b7c93", bg: "#f0f2f5", border: "#d0d7e3" },
  "即将结束": { text: "#e8831a", bg: "#fff4e6", border: "#fcd49a" },
}

const stats = [
  { label: "入驻企业", value: "1,248", unit: "家", icon: Users },
  { label: "发布采购信息", value: "3,621", unit: "条", icon: ShoppingCart },
  { label: "发布销售信息", value: "5,894", unit: "条", icon: Package },
  { label: "累计成交额", value: "12.6", unit: "亿元", icon: TrendingUp },
]

export default function ChanxiaoDuijiePage() {
  const [activeTab, setActiveTab] = useState<MainTab>("采购信息")
  const [category, setCategory] = useState("全部")
  const [keyword, setKeyword] = useState("")

  const list = activeTab === "采购信息" ? caigouList : xiaoshouList
  const filtered = list.filter(item =>
    (category === "全部" || item.category === category) &&
    (keyword === "" || item.title.includes(keyword) || item.desc.includes(keyword))
  )

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">

        {/* ── Banner ── */}
        <section className="relative bg-[#0d2d5a] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1600&q=80')" }}
          />
          <div className="relative max-w-[1200px] mx-auto px-6 py-14">
            <div className="flex items-start justify-between gap-10">
              <div className="flex-1">
                <h1 className="text-[36px] font-bold text-white mb-2 tracking-wide">产销对接</h1>
                <p className="text-[16px] text-white/70 mb-6">供需精准匹配，让好产品找到好买家</p>
                <p className="text-[14px] text-white/60 leading-relaxed max-w-[520px]">
                  整合买方采购需求与卖方销售信息，通过平台精准推送、在线沟通、合同签署等服务，
                  打通农产品从产地到市场的最后一公里，实现高效产销对接。
                </p>
                {/* Stats row */}
                <div className="mt-8 flex gap-6">
                  {stats.map((s) => {
                    const Icon = s.icon
                    return (
                      <div key={s.label} className="bg-white/10 rounded-xl px-5 py-4 flex items-center gap-3">
                        <Icon className="w-7 h-7 text-white/70 shrink-0" />
                        <div>
                          <div className="text-[22px] font-bold text-white leading-none">
                            {s.value}<span className="text-[14px] font-normal ml-1">{s.unit}</span>
                          </div>
                          <div className="text-[12px] text-white/60 mt-0.5">{s.label}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Quick entry cards */}
              <div className="shrink-0 grid grid-cols-2 gap-3 w-[320px]">
                {[
                  { label: "发布采购需求", sub: "我要买，发布采购需求", href: "/merchant/chanxiao/fabu-caigou", color: "#1a5fa8", icon: ShoppingCart },
                  { label: "发布销售信息", sub: "我要卖，发布销售供应", href: "/merchant/chanxiao/fabu-xiaoshou", color: "#3a8c3f", icon: Package },
                  { label: "采购信息大厅", sub: "浏览全部采购需求", href: "#caigou", color: "#6b4fa8", icon: Search },
                  { label: "销售信息大厅", sub: "浏览全部销售供应", href: "#xiaoshou", color: "#a84f1a", icon: TrendingUp },
                ].map((card) => {
                  const Icon = card.icon
                  return (
                    <Link
                      key={card.label}
                      href={card.href}
                      className="bg-white/10 hover:bg-white/20 rounded-xl p-4 flex flex-col gap-2 transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: card.color + "33" }}>
                        <Icon className="w-5 h-5" style={{ color: "white" }} />
                      </div>
                      <div className="text-[14px] font-semibold text-white">{card.label}</div>
                      <div className="text-[12px] text-white/60">{card.sub}</div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="bg-white border-b border-[#e8edf5]">
          <div className="max-w-[1200px] mx-auto px-6 py-8">
            <div className="flex items-center gap-8">
              <div className="text-[14px] font-semibold text-[#333] shrink-0">对接流程</div>
              {[
                { step: "1", label: "发布信息", desc: "买/卖方发布采购或销售信息" },
                { step: "2", label: "精准匹配", desc: "平台智能推送匹配信息" },
                { step: "3", label: "在线沟通", desc: "双方在线洽谈、确认细节" },
                { step: "4", label: "签订合同", desc: "线上合同，安全留存" },
                { step: "5", label: "交付结算", desc: "货款结算，评价完成" },
              ].map((s, i, arr) => (
                <div key={s.step} className="flex items-center gap-4 flex-1">
                  <div className="flex flex-col items-center text-center flex-1">
                    <div className="w-8 h-8 rounded-full bg-[#1a5fa8] text-white text-[13px] font-bold flex items-center justify-center mb-2">
                      {s.step}
                    </div>
                    <div className="text-[13px] font-semibold text-[#333]">{s.label}</div>
                    <div className="text-[11px] text-[#999] mt-0.5">{s.desc}</div>
                  </div>
                  {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-[#ccc] shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Main content ── */}
        <section className="max-w-[1200px] mx-auto px-6 py-8">

          {/* Tab switcher */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-1 bg-white rounded-lg border border-[#e8edf5] p-1">
              {(["采购信息", "销售信息"] as MainTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-md text-[14px] font-semibold transition-colors ${
                    activeTab === tab
                      ? "bg-[#1a5fa8] text-white shadow-sm"
                      : "text-[#555] hover:text-[#1a5fa8]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <Link
              href={activeTab === "采购信息" ? "/merchant/chanxiao/fabu-caigou" : "/merchant/chanxiao/fabu-xiaoshou"}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#e8831a] text-white text-[13px] font-semibold rounded hover:bg-[#d4751a] transition-colors"
            >
              <Plus className="w-4 h-4" />
              {activeTab === "采购信息" ? "发布采购需求" : "发布销售信息"}
            </Link>
          </div>

          {/* Search + filters */}
          <div className="bg-white rounded-xl border border-[#e8edf5] p-4 mb-5">
            <div className="flex gap-3 mb-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aab]" />
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder={activeTab === "采购信息" ? "搜索采购标题、买方名称..." : "搜索销售标题、卖方名称..."}
                  className="w-full pl-9 pr-4 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]"
                />
              </div>
              <button className="px-5 py-2.5 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded-lg hover:bg-[#0d4a8a] transition-colors">
                搜索
              </button>
            </div>
            {/* Category filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[12px] text-[#999] shrink-0">商品分类：</span>
              {categoryTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setCategory(tag)}
                  className={`px-3 py-1 rounded-full text-[12px] transition-colors ${
                    category === tag
                      ? "bg-[#1a5fa8] text-white"
                      : "bg-[#f0f2f5] text-[#555] hover:bg-[#e8f4fd] hover:text-[#1a5fa8]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Result count */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[13px] text-[#666]">
              共 <span className="text-[#1a5fa8] font-semibold">{filtered.length}</span> 条{activeTab}
            </span>
            <div className="flex items-center gap-2 text-[12px] text-[#666]">
              排序：
              <button className="px-3 py-1 rounded bg-[#1a5fa8] text-white">最新发布</button>
              <button className="px-3 py-1 rounded bg-[#f0f2f5] hover:bg-[#e8f4fd] hover:text-[#1a5fa8] transition-colors">询/报价数量</button>
            </div>
          </div>

          {/* Info cards */}
          <div className="space-y-3">
            {filtered.map((item) => {
              const sc = statusColors[item.status] ?? statusColors["采购中"]
              const isCaigou = activeTab === "采购信息"
              const detailHref = isCaigou
                ? `/portal/chanxiao-duijie/caigou-detail?id=${item.id}`
                : `/portal/chanxiao-duijie/xiaoshou-detail?id=${item.id}`
              return (
                <div key={item.id} className="bg-white rounded-xl border border-[#e8edf5] hover:border-[#1a5fa8] hover:shadow-sm transition-all p-5">
                  <div className="flex items-start gap-5">
                    <div className="flex-1 min-w-0">
                      {/* Top row */}
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="px-2 py-0.5 rounded text-[11px] font-semibold border"
                          style={{ color: sc.text, background: sc.bg, borderColor: sc.border }}
                        >
                          {item.status}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#f0f2f5] text-[#666] text-[11px]">{item.category}</span>
                        <span className="text-[11px] text-[#bbb]">{item.id}</span>
                      </div>
                      {/* Title */}
                      <Link href={detailHref} className="text-[16px] font-semibold text-[#1a1a2e] hover:text-[#1a5fa8] transition-colors mb-1.5 block">
                        {item.title}
                      </Link>
                      {/* Desc */}
                      <p className="text-[13px] text-[#666] line-clamp-1 mb-3">{item.desc}</p>
                      {/* Meta row */}
                      <div className="flex items-center gap-5 text-[12px] text-[#888]">
                        <span className="flex items-center gap-1">
                          <Package className="w-3.5 h-3.5" />
                          {isCaigou ? "采购量" : "供应量"}：{item.qty}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {item.city}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {"deadline" in item ? `截止：${item.deadline}` : `有效至：${(item as typeof xiaoshouList[0]).validUntil}`}
                        </span>
                        <span>{isCaigou ? `买方：${item.buyer}` : `卖方：${(item as typeof xiaoshouList[0]).seller}`}</span>
                      </div>
                    </div>

                    {/* Right: price + stats + action */}
                    <div className="shrink-0 flex flex-col items-end gap-3 min-w-[140px]">
                      <div className="text-right">
                        <div className={`text-[18px] font-bold ${item.price === "面议" ? "text-[#888]" : "text-[#e8831a]"}`}>
                          {item.price}
                        </div>
                        <div className="text-[11px] text-[#999]">{isCaigou ? "预算金额" : "销售价格"}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[16px] font-semibold text-[#333]">{item.inquiries}</div>
                        <div className="text-[11px] text-[#999]">{isCaigou ? "供应商报价" : "买方询价"}</div>
                      </div>
                      <Link
                        href={detailHref}
                        className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors"
                      >
                        {isCaigou ? "立即报价" : "立即询价"}
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Load more */}
          <div className="mt-6 text-center">
            <button className="px-8 py-2.5 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded-lg hover:bg-[#e8f4fd] transition-colors">
              加载更多
            </button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
