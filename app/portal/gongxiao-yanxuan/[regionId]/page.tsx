"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  MapPin, ChevronLeft, ShoppingCart,
  Truck, Warehouse, Factory, CreditCard, Star,
} from "lucide-react"

/* ─── Mock data ─── */
const regionData = {
  name: "江门",
  fullName: "江门产地直供中心",
  breadcrumb: "广东省江门市新会区大蟹镇核心产区",
  heroDesc: "江门市是华南地区主要的虾类产区，全市虾类（包括南美白对虾、罗氏虾、班节虾等）养殖面积约50万亩，产量超过70万吨，总产值超过20亿元，其中南美白对虾养殖是核心产区品类。",
  stats: [
    { value: "50万亩",   sub: "养殖面积" },
    { value: "70万吨",   sub: "年产量"   },
    { value: "20亿+",    sub: "总产值"   },
    { value: "1万户+",   sub: "合作农户" },
    { value: "11.16万亩",sub: "虾塘面积" },
    { value: "20万吨+",  sub: "对虾产量" },
    { value: "50%+",     sub: "生态养殖占比" },
  ],
  capabilities: [
    { icon: "digital", title: "数字化交易与撮合能力", desc: "通过数字化平台实现供需精准匹配，帮助买卖双方高效成交，保障交易全程透明。" },
    { icon: "quality", title: "品控与流通调味系",      desc: "平台建立完整的品控管理体系，从采购、包装、运输到入库，流通各链路可见。" },
    { icon: "price",   title: "柔性与合规",            desc: "建立完善的产销对接平台，实现买方多元化全方位服务，以及买卖发现的保全服务。" },
    { icon: "finance", title: "金融赋能能力",          desc: "基于平台数字化交易数据，引入大量金融机构合作，为平台买卖方提供全方位金融服务。" },
    { icon: "cold",    title: "政策与拓利优势",        desc: "绑定于产地联盟制度优势，提供全链路各类服务，完善拓荒各相关客群，确保利率服务。" },
    { icon: "ecology", title: "生态与环境保障",        desc: "坚持绿色养殖理念，生态养殖占比超50%，推广标准化养殖技术，保障产品质量与环境可持续。" },
  ],
  products: [
    { id: "1", name: "鲜活南美白对虾",   desc: "鲜活直达｜规格:20/30只/斤｜买家配送", price: "31.12", img: "/images/products/shrimp-fresh.png" },
    { id: "2", name: "优选罗氏沼虾",     desc: "优选直采｜规格:80/100只/斤｜卖家配送", price: "38.50", img: "/images/products/luoshi-shrimp.png" },
    { id: "3", name: "精选淡水虾",       desc: "精选产地｜规格:40/60只/斤｜买家配送", price: "28.80", img: "/images/products/shrimp-fresh.png" },
    { id: "4", name: "自营班节对虾",     desc: "自营直供｜规格:25/35只/斤｜卖家配送", price: "42.00", img: "/images/products/luoshi-shrimp.png" },
    { id: "5", name: "精选南美白对虾",   desc: "精选直达｜规格:20/30只/斤｜买家配送", price: "31.12", img: "/images/products/shrimp-fresh.png" },
    { id: "6", name: "鲜活罗氏沼虾",     desc: "鲜活直达｜规格:80/100只/斤｜卖家配送", price: "39.80", img: "/images/products/luoshi-shrimp.png" },
    { id: "7", name: "优选淡水白对虾",   desc: "优选直采｜规格:30/45只/斤｜买家配送", price: "27.60", img: "/images/products/shrimp-fresh.png" },
    { id: "8", name: "鲜活南美白对虾",   desc: "鲜活直达｜规格:40/60只/斤｜卖家配送", price: "33.00", img: "/images/products/luoshi-shrimp.png" },
  ],
  services: [
    { icon: Truck,      title: "物流", desc: "提供覆盖全省的冷链物流配送，无论是城市配送还是乡镇配送，均保证全程冷链、快速、准时送达。" },
    { icon: Warehouse,  title: "仓储", desc: "具有完备的安全保管及精细化管理能力，提供控温保鲜，配置多种容量模式，适合农产品全程仓储管理。" },
    { icon: Factory,    title: "加工处理", desc: "提供精细化分拣处理，下架销售前对农产品进行加工处理，支持各类农产品与原料企业的加工合作。" },
    { icon: CreditCard, title: "金融", desc: "提供供销联系金融服务，引导申请担保，助力农业与企业金融全流程、支持以往信贷业务申请。" },
  ],
  storyImages: [
    "/images/regions/jiangmen-thumb.png",
    "/images/products/shrimp-fresh.png",
    "/images/products/luoshi-shrimp.png",
    "/images/regions/jiangmen-hero.png",
  ],
  story: "江门市是中南华地区主要的产区，养殖虾类（螠蛄虾、罗氏虾、班节虾）年产量近30万吨，其中南美白对虾11.15万亩，产量超过20万吨。全省全省全部使用生态养殖，占比超50%，重要供应全省大中型超市及餐饮连锁。\n\n在广东省农业产业分工格局中，江门是水产养殖的重要产业基地——以对虾为主，包括淡水白虾、罗氏沼虾（罗非鱼），年产量不低于2亿5千万元，约占全省比例30%，农业总产值已突破百亿元，加工处理对接交易平台服务中，产销交易总量已于广东省百分比大以核心大量产地直供中心的形式参与交易。",
}

const tabs = ["供销信息", "采购信息", "竞价信息", "订单农业"]

const tickerItems = [
  { type: "采购", name: "2025-12-12 虾肉：", price: "12.10", unit: "元/斤" },
  { type: "供应", name: "2025-12-12 虾肉：", price: "12.12", unit: "元/斤" },
  { type: "采购", name: "2025-12-12 鳗鱼：", price: "12.10", unit: "元/斤" },
  { type: "供应", name: "2025-12-12 鳗鱼：", price: "12.12", unit: "元/斤" },
  { type: "采购", name: "2025-12-12 蟹：",   price: "12.10", unit: "元/斤" },
  { type: "供应", name: "2025-12-12 蟹：",   price: "12.12", unit: "元/斤" },
]

export default function RegionDetailPage() {
  const [activeTab, setActiveTab] = useState("供销信息")

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">

        {/* ── Hero Banner — real image background ── */}
        <div className="relative w-full h-[420px] overflow-hidden">
          <Image
            src="/images/regions/jiangmen-hero.png"
            alt="江门产地直供中心"
            fill
            className="object-cover"
            priority
          />
          {/* dark overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Breadcrumb */}
          <div className="absolute top-4 left-6 z-10">
            <Link href="/portal/gongxiao-yanxuan" className="flex items-center gap-1 text-white/80 hover:text-white text-[13px] transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" />
              首页 / 产地直供中心 / 江门产地
            </Link>
          </div>

          {/* Info card — centred, semi-transparent white, matching prototype */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 max-w-[480px] w-full mx-6 shadow-lg">
              <div className="flex items-center gap-1.5 mb-2">
                <MapPin className="w-4 h-4 text-[#1a5fa8] shrink-0" />
                <span className="text-[13px] text-[#555]">{regionData.breadcrumb}</span>
              </div>
              <h1 className="text-[32px] font-bold text-[#1a1a2e] mb-3 leading-tight">
                <span className="text-[#1a5fa8]">{regionData.name}</span>{" "}产地直供中心
              </h1>
              <p className="text-[13px] text-[#555] leading-relaxed mb-5">
                {regionData.heroDesc}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <button className="px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors font-medium">
                  查看江门虾类 →
                </button>
                <button className="px-5 py-2 bg-white text-[#1a5fa8] text-[13px] rounded border border-[#1a5fa8] hover:bg-[#e8f4fd] transition-colors">
                  了解产地故事
                </button>
                <button className="text-[13px] text-[#1a5fa8] hover:underline transition-colors">联系客服</button>
                <button className="text-[13px] text-[#1a5fa8] hover:underline transition-colors">查看营业执照</button>
              </div>
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

            {/* Tabs */}
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
                  <div className="relative w-full h-[160px] overflow-hidden">
                    <Image src={p.img} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
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
            <h2 className="text-[20px] font-bold text-[#1a1a2e] text-center mb-5">产地直供配套服务</h2>
            <div className="grid grid-cols-2 gap-4">
              {regionData.services.map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.title} className="bg-white rounded-lg p-5 border border-[#e8edf5]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-[#e8f4fd] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#1a5fa8]" />
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
              <div className="grid grid-cols-4 gap-2">
                {regionData.storyImages.map((src, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden aspect-[4/3]">
                    <Image src={src} alt={`产地故事图 ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
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
