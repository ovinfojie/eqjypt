"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  MapPin, ChevronLeft, ShoppingCart, Package,
  Truck, Warehouse, Factory, CreditCard, Star,
} from "lucide-react"

/* ─── Mock data ─── */
const regionData = {
  name: "江门",
  fullName: "江门产地直供中心",
  breadcrumb: "广东省江门市新会区大蟹镇核心产区",
  heroDesc: "江门拥有丰富的水产资源，养殖面积近22万亩，罗非鱼、对虾（螠蛄虾，节节虾）年产量超过20万吨，其中南美白对虾精选是核心产区品类。以科技赋能现代农业产业园数字化运营，打造特色鲜活、完善冷链物流，产地直全程可追溯。",
  stats: [
    { label: "养殖面积", value: "50万亩", sub: "养殖面积" },
    { label: "年产量",   value: "70万吨", sub: "年产量"   },
    { label: "总产值",   value: "20亿+",  sub: "总产值"   },
    { label: "合作农户", value: "1万户+", sub: "合作农户"  },
    { label: "养殖面积", value: "11.16万亩", sub: "养殖面积" },
    { label: "年产量",   value: "20万吨+", sub: "年产量"   },
    { label: "生态养殖", value: "50%+",   sub: "生态养殖占比" },
  ],
  capabilities: [
    { icon: "digital", title: "数字化交易与撮合能力", desc: "通过数字化平台实现供需精准匹配，帮助买卖双方高效成交，保障交易全程透明。" },
    { icon: "quality", title: "品控与流通调味系",      desc: "平台建立完整的品控管理体系，从采购、包装、运输到入库，流通各链路可见。" },
    { icon: "price",   title: "柔性与合规",            desc: "建立完善的产销对接平台，实现'买方多元化'全方位服务，以及买卖发现的保全服务。" },
    { icon: "finance", title: "金融赋能能力",          desc: "基于平台数字化交易数据，引入大量金融机构合作，为平台买卖方提供全方位金融服务。" },
    { icon: "cold",    title: "政策与拓利优势",        desc: "绑定于产地'产地联盟'制度优势，提供全链路各类服务，完善拓荒各相关客群，确保利率服务。" },
    { icon: "ecology", title: "生态与环境保障",        desc: "坚持绿色养殖理念，生态养殖占比超50%，推广标准化养殖技术，保障产品质量与环境可持续。" },
  ],
  products: [
    { id: "1", name: "鲜活南美白对虾",   desc: "鲜活直达｜规格:20/30只/斤｜买家配送", price: "31.12", img: "#e0f2fe" },
    { id: "2", name: "优选罗氏沼虾",     desc: "优选直采｜规格:80/100只/斤｜卖家配送", price: "31.12", img: "#e8f4ed" },
    { id: "3", name: "精选淡水虾",       desc: "精选产地｜规格:40/60只/斤｜买家配送", price: "31.12", img: "#fce8d8" },
    { id: "4", name: "自营星节对虾",     desc: "自营直供｜规格:25/35只/斤｜卖家配送", price: "31.12", img: "#e8f0fe" },
    { id: "5", name: "精选南美白对虾",   desc: "精选直达｜规格:20/30只/斤｜买家配送", price: "31.12", img: "#f3e8ff" },
    { id: "6", name: "鲜活罗氏沼虾",     desc: "鲜活直达｜规格:80/100只/斤｜卖家配送", price: "31.12", img: "#e0f2fe" },
    { id: "7", name: "优选淡水白对虾",   desc: "优选直采｜规格:30/45只/斤｜买家配送", price: "31.12", img: "#fef9c3" },
    { id: "8", name: "鲜活南米白对虾",   desc: "鲜活直达｜规格:40/60只/斤｜卖家配送", price: "31.12", img: "#e8f4ed" },
  ],
  services: [
    { icon: Truck,      title: "物流", desc: "提供覆盖全省的冷链物流配送，无论是城市配送还是乡镇配送，均保证全程冷链、快速、准时送达。" },
    { icon: Warehouse,  title: "仓储", desc: "具有完备的安全保管及精细化管理能力，提供控温保鲜，配置多种容量模式，适合农产品全程仓储管理。" },
    { icon: Factory,    title: "加工处理", desc: "提供精细化分拣处理，下架销售前对农产品进行加工处理，支持各类农产品与原料企业的加工合作。" },
    { icon: CreditCard, title: "金融", desc: "提供供销联系金融服务，引导申请担保，助力农业与企业金融全流程、支持以往信贷业务申请。" },
  ],
  story: "江门市是中南华地区主要的产区，养殖虾类（螠蛄虾、罗氏虾、节节虾）年产量近30万吨，其中南美白对虾11.15万亩，产量超过20万吨。全省全省全部使用生态养殖，占比超50%，重要供应全省大中型超市及餐饮连锁。\n\n在广东省农业产业分工格局中，江门是水产养殖的重要产业基地——以对虾为主，包括淡水白虾、罗氏沼虾（罗非鱼），年产量不低于2亿5千万元，约占全省比例30%，农业总产值已突破百亿元，加工处理对接交易平台服务中，产销交易总量已于广东省百分比大以核心大量产地直供中心的形式参与交易。",
}

const tabs = ["供销信息", "采购信息", "竞价信息", "订单农业"]

/* ─── Ticker ─── */
const tickerItems = [
  { type: "采购", name: "2025-12-12 虾肉：", price: "12.10", unit: "元/斤" },
  { type: "供应", name: "2025-12-12 虾肉：", price: "12.12", unit: "元/斤" },
  { type: "采购", name: "2025-12-12 鳗鱼：", price: "12.10", unit: "元/斤" },
  { type: "供应", name: "2025-12-12 鳗鱼：", price: "12.12", unit: "元/斤" },
  { type: "采购", name: "2025-12-12 蟹：",   price: "12.10", unit: "元/斤" },
  { type: "供应", name: "2025-12-12 蟹：",   price: "12.12", unit: "元/斤" },
]

/* ─── Page ─── */
export default function RegionDetailPage() {
  const [activeTab, setActiveTab] = useState("供销信息")
  const [filterType, setFilterType] = useState("全部")

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">

        {/* ── Hero Banner ── */}
        <div
          className="relative w-full h-[320px] flex items-end overflow-hidden"
          style={{
            background: "linear-gradient(to bottom, rgba(15,40,80,0.3) 0%, rgba(15,40,80,0.65) 100%), linear-gradient(135deg, #0d3060 0%, #1a5fa8 40%, #1e7fc4 100%)",
          }}
        >
          {/* Decorative water-like pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='20' viewBox='0 0 100 20'%3E%3Cpath fill='%23fff' fill-opacity='0.5' d='M0 10 Q25 0 50 10 Q75 20 100 10 L100 20 L0 20 Z'/%3E%3C/svg%3E")`,
              backgroundSize: "100px 20px",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "bottom",
            }}
          />

          {/* Breadcrumb top-left */}
          <div className="absolute top-4 left-6">
            <Link href="/portal/gongxiao-yanxuan" className="flex items-center gap-1 text-white/70 hover:text-white text-[13px] transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" /> 首页 / 产地直供中心 / 江门产地
            </Link>
          </div>

          {/* Info card */}
          <div className="relative z-10 p-6 pb-8 max-w-[560px]">
            <div className="flex items-center gap-1.5 mb-2">
              <MapPin className="w-4 h-4 text-white/70 shrink-0" />
              <span className="text-[13px] text-white/70">{regionData.breadcrumb}</span>
            </div>
            <h1 className="text-[32px] font-bold text-white mb-3 leading-tight">
              <span className="text-[#5bbdff]">{regionData.name}</span> 产地直供中心
            </h1>
            <p className="text-[13px] text-white/80 leading-relaxed mb-5 max-w-[460px]">
              {regionData.heroDesc}
            </p>
            <div className="flex items-center gap-3">
              <button className="px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors font-medium">
                查看江门对虾 →
              </button>
              <button className="px-5 py-2 bg-white/15 text-white text-[13px] rounded border border-white/30 hover:bg-white/25 transition-colors backdrop-blur-sm">
                了解产地故事
              </button>
              <span className="text-[13px] text-white/60 hover:text-white cursor-pointer transition-colors">联系客服</span>
              <span className="text-[13px] text-white/60 hover:text-white cursor-pointer transition-colors">营销化运营</span>
            </div>
          </div>
        </div>

        {/* ── Price Ticker ── */}
        <div className="bg-white border-b border-[#e8edf5] py-1.5">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="grid grid-cols-6 gap-2">
              {tickerItems.map((t, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className={`px-1.5 py-0.5 rounded text-[11px] font-semibold text-white ${t.type === "采购" ? "bg-[#3a8c3f]" : "bg-[#e8831a]"}`}>
                    {t.type}
                  </span>
                  <span className="text-[12px] text-[#555]">{t.name}</span>
                  <span className="text-[12px] font-semibold text-[#1a5fa8]">{t.price}</span>
                  <span className="text-[12px] text-[#999]">{t.unit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto px-6 py-6">

          {/* ── Stats ── */}
          <div className="grid grid-cols-7 gap-3 mb-10">
            {regionData.stats.map((s, i) => (
              <div key={i} className="bg-white rounded-lg p-4 text-center border border-[#e8edf5]">
                <div className="text-[22px] font-bold text-[#1a5fa8] mb-0.5">{s.value}</div>
                <div className="text-[12px] text-[#888]">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* ── Capabilities ── */}
          <section className="mb-10">
            <h2 className="text-[20px] font-bold text-[#1a1a2e] text-center mb-1">{regionData.name}直供中心能力</h2>
            <p className="text-[13px] text-[#888] text-center mb-5">整合农产地资源，打造从产地到餐桌的高效供应链，确保一起鲜解的鲜活与品质</p>
            <div className="grid grid-cols-3 gap-4">
              {regionData.capabilities.map((c, i) => (
                <div key={i} className="bg-white rounded-lg p-5 border border-[#e8edf5] hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#e8f4fd] flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4 text-[#1a5fa8]" />
                    </div>
                    <h3 className="text-[14px] font-semibold text-[#1a1a2e]">{c.title}</h3>
                  </div>
                  <p className="text-[13px] text-[#666] leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Products ── */}
          <section className="mb-10">
            <h2 className="text-[20px] font-bold text-[#1a1a2e] text-center mb-1">{regionData.name}虾类优选</h2>
            <p className="text-[13px] text-[#888] text-center mb-4">产地好物精选</p>

            {/* Product tabs */}
            <div className="flex items-center justify-center gap-0 mb-5 border-b border-[#e8edf5]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 text-[14px] font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === tab
                      ? "border-[#1a5fa8] text-[#1a5fa8]"
                      : "border-transparent text-[#666] hover:text-[#1a5fa8]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Filter bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <select className="border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] text-[#555] focus:outline-none focus:border-[#1a5fa8]">
                  <option>价格排序</option>
                  <option>价格从低到高</option>
                  <option>价格从高到低</option>
                </select>
                <select className="border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] text-[#555] focus:outline-none focus:border-[#1a5fa8]">
                  <option>品类 ∨</option>
                  <option>南美白对虾</option>
                  <option>罗氏沼虾</option>
                  <option>淡水白对虾</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  placeholder="请输入商品名称"
                  className="border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] w-[180px] focus:outline-none focus:border-[#1a5fa8]"
                />
                <button className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">搜索</button>
                <button className="px-4 py-1.5 border border-[#dde3ec] text-[13px] text-[#666] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">重置</button>
              </div>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              {regionData.products.map((p) => (
                <Link key={p.id} href="/portal/gongxiao-yanxuan/product" className="bg-white rounded-lg overflow-hidden border border-[#e8edf5] hover:shadow-md transition-shadow group">
                  <div className="w-full h-[160px] flex items-center justify-center relative" style={{ background: p.img }}>
                    <Package className="w-12 h-12 text-[#1a5fa8]/30" />
                    <button className="absolute bottom-2 right-2 flex items-center gap-1 px-2.5 py-1 bg-[#1a5fa8] text-white text-[11px] rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      <ShoppingCart className="w-3 h-3" /> 加入购车
                    </button>
                  </div>
                  <div className="p-3">
                    <div className="text-[13px] font-semibold text-[#1a1a2e] mb-1 truncate">{p.name}</div>
                    <div className="text-[12px] text-[#888] truncate mb-1.5">{p.desc}</div>
                    <div className="text-[14px] font-bold text-[#e8831a]">{p.price}<span className="text-[12px] font-normal text-[#999]">元起</span></div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end gap-1 text-[13px]">
              <span className="text-[#999] mr-2">共 30 个</span>
              {[1,2,3,4].map((n) => (
                <button key={n} className={`w-7 h-7 rounded flex items-center justify-center ${n === 1 ? "bg-[#1a5fa8] text-white" : "border border-[#dde3ec] text-[#555] hover:border-[#1a5fa8] hover:text-[#1a5fa8]"}`}>{n}</button>
              ))}
            </div>
          </section>

          {/* ── Services ── */}
          <section className="mb-10">
            <h2 className="text-[20px] font-bold text-[#1a1a2e] text-center mb-1">产地直供配套服务</h2>
            <div className="grid grid-cols-2 gap-4 mt-5">
              {regionData.services.map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.title} className="bg-white rounded-lg p-5 border border-[#e8edf5]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-[#e8f4fd] flex items-center justify-center shrink-0">
                        <Icon className="w-4.5 h-4.5 text-[#1a5fa8]" />
                      </div>
                      <h3 className="text-[15px] font-semibold text-[#1a1a2e]">{s.title}</h3>
                    </div>
                    <p className="text-[13px] text-[#666] leading-relaxed mb-3">{s.desc}</p>
                    <button className="text-[13px] text-[#1a5fa8] border border-[#1a5fa8] px-4 py-1 rounded hover:bg-[#e8f4fd] transition-colors">
                      我要使用 →
                    </button>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ── Story ── */}
          <section className="mb-8">
            <h2 className="text-[20px] font-bold text-[#1a1a2e] text-center mb-6">{regionData.name}虾类产地故事</h2>
            <div className="grid grid-cols-[1fr_380px] gap-8 items-start">
              {/* Story image grid */}
              <div className="grid grid-cols-4 gap-2">
                {["#e0f2fe","#e8f4ed","#fce8d8","#e8f0fe"].map((bg, i) => (
                  <div key={i} className="rounded-lg overflow-hidden aspect-[4/3] flex items-center justify-center" style={{ background: bg }}>
                    <Package className="w-8 h-8 text-[#1a5fa8]/30" />
                  </div>
                ))}
              </div>
              {/* Story text */}
              <div>
                {regionData.story.split("\n\n").map((para, i) => (
                  <p key={i} className="text-[13px] text-[#555] leading-relaxed mb-3">{para}</p>
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
