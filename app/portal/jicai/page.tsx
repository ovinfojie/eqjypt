"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  ChevronRight,
  Search,
  ShoppingCart,
  ChevronDown,
  Volume2,
} from "lucide-react"

/* ─── Types ─── */
type SortOption = "价格由低到高" | "价格由高到低" | "销量优先" | "最新上架"
type PriceType = "全部" | "固定价" | "竞价"

/* ─── Mock data ─── */
const categoryBanners = [
  {
    id: "veg",
    label: "蔬菜品类集采",
    period: "2026.06.23 - 2026.07.08",
    tag: "新鲜直供 · 批量优选",
    desc: "本次集采涵盖50+农产品品类",
    color: "#2d8a4e",
    bg: "#e8f5e9",
  },
  {
    id: "fruit",
    label: "水果品类集采活动",
    period: "2026.06.23 - 2026.07.15",
    tag: "产地直采 · 新鲜直达",
    desc: "荔枝、苹果、芒果等当季水果",
    color: "#e8831a",
    bg: "#fff3e0",
  },
]

const sortOptions: SortOption[] = ["价格由低到高", "价格由高到低", "销量优先", "最新上架"]
const priceTypes: PriceType[] = ["全部", "固定价", "竞价"]
const categoryOptions = ["全部店铺", "粮油副食", "蔬菜水果", "肉禽蛋奶", "海鲜水产", "干货调味", "熟食面点"]

const departments = ["农产品公司粮油业务部", "农产品公司蔬果业务部", "农产品公司禽蛋业务部"]

interface Product {
  id: string
  name: string
  priceType: PriceType
  price: number
  delivery: string
  dept: string
  image: string
  tag?: string
}

const products: Product[] = [
  { id: "1", name: "某某优选大米", priceType: "固定价", price: 31.12, delivery: "卖家配送+买家自提", dept: "农产品公司粮油业务部", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=70", tag: "台山丝苗米" },
  { id: "2", name: "某某优选鸡蛋", priceType: "固定价", price: 31.12, delivery: "卖家配送", dept: "农产品公司禽蛋业务部", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&q=70" },
  { id: "3", name: "某某优选荔枝3", priceType: "固定价", price: 31.12, delivery: "卖家配送", dept: "农产品公司蔬果业务部", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&q=70" },
  { id: "4", name: "某某优选牛奶", priceType: "固定价", price: 31.12, delivery: "卖家配送", dept: "农产品公司禽蛋业务部", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=70" },
  { id: "5", name: "某某优选荔枝", priceType: "固定价", price: 31.12, delivery: "卖家配送+买家自提", dept: "农产品公司蔬果业务部", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&q=70" },
  { id: "6", name: "某某优选鸡蛋", priceType: "固定价", price: 31.12, delivery: "卖家配送", dept: "农产品公司禽蛋业务部", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&q=70" },
  { id: "7", name: "某某优选苹果", priceType: "固定价", price: 31.12, delivery: "卖家配送", dept: "农产品公司蔬果业务部", image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&q=70" },
  { id: "8", name: "某某优选香蕉", priceType: "固定价", price: 31.12, delivery: "卖家配送", dept: "农产品公司禽蛋业务部", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=70" },
  { id: "9", name: "某某优选大米", priceType: "固定价", price: 31.12, delivery: "卖家配送+买家自提", dept: "农产品公司粮油业务部", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=70" },
  { id: "10", name: "某某优选面条", priceType: "固定价", price: 31.12, delivery: "卖家配送", dept: "农产品公司粮油业务部", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=70" },
  { id: "11", name: "某某优选食用油", priceType: "固定价", price: 31.12, delivery: "卖家配送", dept: "农产品公司粮油业务部", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=70" },
  { id: "12", name: "某某优选海鲜", priceType: "固定价", price: 31.12, delivery: "卖家配送", dept: "农产品公司蔬果业务部", image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&q=70" },
]

const recommendedProducts = [
  { id: "r1", name: "某某品牌哈氏仿对虾", price: 31.12, image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=300&q=70" },
  { id: "r2", name: "某某某某优选苹果", price: 31.12, image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300&q=70" },
  { id: "r3", name: "某某品牌牛奶", price: 31.12, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=70" },
  { id: "r4", name: "某某某某某某品", price: 31.12, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&q=70" },
  { id: "r5", name: "某某品牌哈氏仿对虾", price: 31.12, image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=300&q=70" },
  { id: "r6", name: "某某品牌冻链鲜虾", price: 31.12, image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=300&q=70" },
  { id: "r7", name: "某某品牌优选苹果", price: 31.12, image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300&q=70" },
  { id: "r8", name: "某某某某优选荔枝", price: 31.12, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&q=70" },
]

export default function JicaiPage() {
  const [activeSort, setActiveSort] = useState<SortOption>("价格由低到高")
  const [activePriceType, setActivePriceType] = useState<PriceType>("全部")
  const [activeCategory, setActiveCategory] = useState("全部店铺")
  const [keyword, setKeyword] = useState("")
  const [cartCount] = useState(2)

  const filteredProducts = products.filter((p) => {
    const matchPrice = activePriceType === "全部" || p.priceType === activePriceType
    const matchKw = !keyword || p.name.includes(keyword)
    return matchPrice && matchKw
  })

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">

        {/* ── Supplier Header ── */}
        <div className="bg-white border-b border-border">
          <div className="max-w-[1400px] mx-auto px-6 py-5">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[12px] text-[#6b7c93] mb-4">
              <a href="/" className="hover:text-[#1a5fa8] transition-colors">首页</a>
              <ChevronRight className="w-3 h-3" />
              <Link href="/portal/jicai" className="hover:text-[#1a5fa8] transition-colors">集采专区</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#1a1a2e]">广东供销农产品股份有限公司</span>
            </div>

            <div className="flex items-start gap-6">
              {/* Supplier info */}
              <div
                className="flex-1 rounded p-5 relative overflow-hidden"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=60')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-[#0d4a8a]/75" />
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-[20px] font-bold text-white">广东供销农产品股份有限公司</h1>
                      <div className="flex items-center gap-1 bg-[#3a8c3f] px-2 py-0.5 rounded text-[11px] text-white font-medium">
                        <span>粤供优选</span>
                      </div>
                    </div>
                    <p className="text-[13px] text-white/80 mb-3 max-w-[640px]">
                      依托全省供销系统供应链优势，专注为机关、学校及企事业单位提供一站式集采服务。
                    </p>
                    <div className="text-[12px] text-white/70 mb-1">
                      <span className="font-medium text-white">核心品类：</span>
                      米面粮油、肉禽蛋奶、鲜蔬水果、海鲜水产、干货调味、熟食面点及精品水果。源头直采，批批检测，价格透明。
                    </div>
                    <div className="text-[12px] text-white/70">
                      <span className="font-medium text-white">核心优势：</span>
                      食安可追溯，应急保供能力强，有效降低采购成本。
                    </div>
                  </div>
                  <button className="shrink-0 px-4 py-2 bg-white/20 border border-white/40 text-white text-[13px] rounded hover:bg-white/30 transition-colors">
                    查看营业执照
                  </button>
                </div>
              </div>

              {/* Cart widget */}
              <div className="w-[200px] shrink-0 bg-[#f0f4f8] border border-border rounded p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <ShoppingCart className="w-5 h-5 text-[#1a5fa8]" />
                  <span className="text-[14px] font-semibold text-[#1a1a2e]">我的采购车</span>
                  <span className="w-5 h-5 rounded-full bg-[#e8831a] text-white text-[11px] flex items-center justify-center font-bold">{cartCount}</span>
                </div>
                <p className="text-[12px] text-[#6b7c93] mb-3">已加入 {cartCount} 件商品</p>
                <button className="w-full py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
                  提交采购申请
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Announcement Bar ── */}
        <div className="bg-[#e8f4fd] border-b border-[#1a5fa8]/20">
          <div className="max-w-[1400px] mx-auto px-6 py-2.5 flex items-center gap-2 text-[13px] text-[#1a5fa8]">
            <Volume2 className="w-4 h-4 shrink-0" />
            <span className="font-medium">粤供优选关于集采系统单配送的最新公告</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* ── Category Activity Banners ── */}
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            {categoryBanners.map((banner) => (
              <div
                key={banner.id}
                className="rounded overflow-hidden relative h-[180px] cursor-pointer group"
                style={{ backgroundColor: banner.color }}
              >
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <div>
                    <div className="text-[20px] font-bold text-white mb-1">{banner.label}</div>
                    <div className="text-[13px] text-white/80">活动时间 {banner.period}</div>
                  </div>
                  <div>
                    <div className="inline-block bg-white/20 border border-white/40 text-white text-[12px] px-3 py-1 rounded mb-2">
                      {banner.tag}
                    </div>
                    <div className="text-[12px] text-white/70">{banner.desc}</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Filters + Product Grid ── */}
        <div className="max-w-[1400px] mx-auto px-6 pb-8">
          {/* Filter bar */}
          <div className="bg-white border border-border rounded p-4 mb-4 flex items-center gap-4 flex-wrap">
            {/* Category dropdown */}
            <div className="relative">
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded text-[13px] text-[#333] hover:border-[#1a5fa8] transition-colors">
                {activeCategory} <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setActiveSort(opt)}
                  className={`px-3 py-1.5 text-[13px] rounded border transition-colors ${
                    activeSort === opt
                      ? "bg-[#1a5fa8] text-white border-[#1a5fa8]"
                      : "text-[#333] border-border hover:border-[#1a5fa8]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Price type toggle */}
            <div className="flex items-center gap-1.5">
              {priceTypes.map((pt) => (
                <button
                  key={pt}
                  onClick={() => setActivePriceType(pt)}
                  className={`px-3 py-1.5 text-[13px] rounded border transition-colors ${
                    activePriceType === pt
                      ? "bg-[#1a5fa8] text-white border-[#1a5fa8]"
                      : "text-[#333] border-border hover:border-[#1a5fa8]"
                  }`}
                >
                  {pt}
                </button>
              ))}
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {categoryOptions.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-[13px] rounded border transition-colors ${
                    activeCategory === cat
                      ? "bg-[#1a5fa8] text-white border-[#1a5fa8]"
                      : "text-[#333] border-border hover:border-[#1a5fa8]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search input */}
            <div className="ml-auto flex items-center gap-2 border border-border rounded px-3 py-1.5 min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-[#6b7c93]" />
              <input
                type="text"
                placeholder="输入商品名称"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="flex-1 text-[13px] outline-none bg-transparent placeholder:text-[#6b7c93]"
              />
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-border rounded overflow-hidden hover:shadow-md hover:border-[#1a5fa8]/30 transition-all cursor-pointer group"
              >
                <div className="aspect-square overflow-hidden bg-[#f5f7fa]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                    <span className="text-[11px] px-1.5 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] border border-[#1a5fa8]/20 rounded">
                      {product.priceType}
                    </span>
                    <span className="text-[11px] px-1.5 py-0.5 bg-[#e8f5e9] text-[#3a8c3f] border border-[#3a8c3f]/20 rounded">
                      担保交易
                    </span>
                    <span className="text-[11px] text-[#6b7c93]">{product.delivery}</span>
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#1a1a2e] mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-0.5 mb-2">
                    <span className="text-[18px] font-bold text-[#e8831a]">{product.price.toFixed(2)}</span>
                    <span className="text-[12px] text-[#6b7c93]">元 起</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#6b7c93] mb-3">
                    <span className="w-3 h-3 bg-[#6b7c93] rounded-sm inline-block shrink-0" />
                    {product.dept}
                  </div>
                  <button className="w-full py-1.5 bg-[#1a5fa8] text-white text-[12px] rounded hover:bg-[#0d4a8a] transition-colors">
                    加入采购车
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] text-[#6b7c93]">共 30 个</span>
            <div className="flex items-center gap-1.5">
              {[1, 2].map((p) => (
                <button
                  key={p}
                  className={`w-8 h-8 text-[13px] rounded border transition-colors ${
                    p === 1
                      ? "bg-[#1a5fa8] text-white border-[#1a5fa8]"
                      : "bg-white text-[#333] border-border hover:border-[#1a5fa8]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Recommended section */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-[#1a5fa8] rounded-full" />
              <h2 className="text-[16px] font-bold text-[#1a1a2e]">常买 / 推荐</h2>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {recommendedProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border border-border rounded overflow-hidden hover:shadow-md hover:border-[#1a5fa8]/30 transition-all cursor-pointer group flex"
                >
                  <div className="w-[80px] h-[80px] shrink-0 overflow-hidden bg-[#f5f7fa]">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                    <span className="text-[12px] font-medium text-[#1a1a2e] line-clamp-2">{p.name}</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[14px] font-bold text-[#e8831a]">{p.price.toFixed(2)}元</span>
                      <button className="text-[11px] px-2 py-0.5 bg-[#1a5fa8] text-white rounded hover:bg-[#0d4a8a] transition-colors">
                        加入采购车
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
