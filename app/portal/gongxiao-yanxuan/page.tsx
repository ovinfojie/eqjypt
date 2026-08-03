"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ChevronLeft, ChevronRight, MapPin, ArrowRight } from "lucide-react"

/* ─── Types ─── */
interface Region {
  id: string
  name: string
  totalQty: string
  totalAmt: string
  products: string
  productCount: number
  desc: string
  thumb: string
}

interface SubCategory {
  name: string
  totalQty: string
  totalAmt: string
}

interface FeaturedProduct {
  id: string
  name: string
  tagline: string
  img: string       // placeholder colour
  sellers: { name: string; price: string; origin: string }[]
  moreHref: string
}

interface FeaturedCategory {
  name: string
  totalQty: string
  totalAmt: string
  subs: SubCategory[]
  products: FeaturedProduct[]
}

/* ─── Mock data ─── */
const regions: Region[] = [
  { id: "jiangmen",  name: "江门",  totalQty: "100吨", totalAmt: "100万元", products: "鲜活对虾、生蚝、鳗鱼",     productCount: 128, desc: "江门鳗鱼、对虾产业园核心产区，新会大蟹原产地",   thumb: "/images/regions/jiangmen-thumb.png" },
  { id: "nanxiong",  name: "南雄",  totalQty: "100吨", totalAmt: "100万元", products: "丝苗米、板鸭、姜蒜",       productCount: 18,  desc: "粤北粮食主产区，丝苗米、板鸭核心产地",           thumb: "/images/regions/nanxiong-thumb.png" },
  { id: "shaoguang", name: "韶关",  totalQty: "100吨", totalAmt: "100万元", products: "仁化鸭稻丝苗米、有机蔬菜", productCount: 128, desc: "丹霞山有机农业示范区，仁化鸭稻享誉全省",          thumb: "/images/regions/shaoguan-thumb.png" },
  { id: "suixi",     name: "遂溪",  totalQty: "100吨", totalAmt: "100万元", products: "甘蔗、番薯、花生",         productCount: 12,  desc: "蔗糖主产区，徐闻菠萝产地毗邻",                   thumb: "/images/regions/maoming-thumb.png"  },
  { id: "maoming",   name: "茂名",  totalQty: "100吨", totalAmt: "100万元", products: "荔枝、龙眼、芒果",         productCount: 64,  desc: "荔枝之乡，荔枝年产量全国第一",                   thumb: "/images/regions/maoming-thumb.png"  },
  { id: "zhaoqing",  name: "肇庆",  totalQty: "100吨", totalAmt: "100万元", products: "砚坑鱼、端州莲藕",         productCount: 36,  desc: "西江流域水产优质产区，怀集桑皮纸文化产地",       thumb: "/images/regions/shaoguan-thumb.png" },
  { id: "shaoguan2", name: "韶关",  totalQty: "100吨", totalAmt: "100万元", products: "翁源兰花、南雄板鸭",       productCount: 28,  desc: "北部生态屏障，特色农产品资源丰富",               thumb: "/images/regions/shaoguan-thumb.png" },
]

const featuredCategories: FeaturedCategory[] = [
  {
    name: "特色单品",
    totalQty: "10000吨",
    totalAmt: "1000000万元",
    subs: [
      { name: "禽蛋",   totalQty: "100吨", totalAmt: "107万元" },
      { name: "菠萝",   totalQty: "100吨", totalAmt: "107万元" },
      { name: "三华李", totalQty: "100吨", totalAmt: "107万元" },
      { name: "罗氏虾", totalQty: "100吨", totalAmt: "107万元" },
      { name: "罗非鱼", totalQty: "100吨", totalAmt: "107万元" },
      { name: "柚子",   totalQty: "100吨", totalAmt: "107万元" },
      { name: "丝苗米", totalQty: "100吨", totalAmt: "107万元" },
    ],
    products: [
      {
        id: "1", name: "禽蛋", tagline: "一心才力，蛋品生鲜",
        img: "/images/products/eggs.png", moreHref: "/portal/gongxiao-yanxuan/products?cat=禽蛋",
        sellers: [
          { name: "XX禽蛋1", price: "31.12", origin: "广东江门产地直供中心" },
          { name: "XX禽蛋2", price: "31.12", origin: "广东供销产地直供中心" },
        ],
      },
      {
        id: "2", name: "菠萝", tagline: "源头好菠萝，大胆放心甜",
        img: "/images/products/pineapple.png", moreHref: "/portal/gongxiao-yanxuan/products?cat=菠萝",
        sellers: [
          { name: "XX菠萝1", price: "31.12", origin: "广东江门产地直供中心" },
          { name: "XX菠萝2", price: "31.12", origin: "广东供销产地直供中心" },
        ],
      },
      {
        id: "3", name: "三华李", tagline: "好季好吃，正宗三华李",
        img: "/images/products/sanhuali.png", moreHref: "/portal/gongxiao-yanxuan/products?cat=三华李",
        sellers: [
          { name: "XX选产1", price: "31.12", origin: "广东江门产地直供中心" },
          { name: "XX选产2", price: "31.12", origin: "广东供销产地直供中心" },
        ],
      },
      {
        id: "4", name: "罗氏虾", tagline: "罗氏好虾，鲜嫩肥肉",
        img: "/images/products/luoshi-shrimp.png", moreHref: "/portal/gongxiao-yanxuan/products?cat=罗氏虾",
        sellers: [
          { name: "XX水产1", price: "31.12", origin: "广东江门产地直供中心" },
          { name: "XX水产2", price: "31.12", origin: "广东供销产地直供中心" },
        ],
      },
      {
        id: "5", name: "冻品", tagline: "鲜冻好货汇集，采购省心更实惠",
        img: "/images/products/frozen.png", moreHref: "/portal/gongxiao-yanxuan/products?cat=冻品",
        sellers: [
          { name: "XX冻肉1", price: "31.12", origin: "广东东莞产地直供中心" },
          { name: "XX冻鱼2", price: "31.12", origin: "广东供销产地直供中心" },
        ],
      },
      {
        id: "6", name: "柚子", tagline: "皮薄肉厚，柚香满分",
        img: "/images/products/pomelo.png", moreHref: "/portal/gongxiao-yanxuan/products?cat=柚子",
        sellers: [
          { name: "XX柚子1", price: "31.12", origin: "广东梅州产地直供中心" },
          { name: "XX柚子2", price: "31.12", origin: "广东供销产地直供中心" },
        ],
      },
      {
        id: "7", name: "丝苗米", tagline: "好好好吃，供销畅旺",
        img: "/images/products/simiao-rice.png", moreHref: "/portal/gongxiao-yanxuan/products?cat=丝苗米",
        sellers: [
          { name: "XX丝苗米1", price: "31.12", origin: "广东南雄产地直供中心" },
          { name: "XX丝苗米2", price: "31.12", origin: "广东供销产地直供中心" },
        ],
      },
      {
        id: "8", name: "更多特色农产品", tagline: "汇聚万千·区尽辉煌",
        img: "/images/products/eggs.png", moreHref: "/portal/gongxiao-yanxuan/products",
        sellers: [
          { name: "XX特色品1", price: "31.12", origin: "广东各产地直供中心" },
          { name: "XX特色品2", price: "31.12", origin: "广东供销产地直供中心" },
        ],
      },
    ],
  },
]

/* ─── Sub-components ─── */
function SubCategorySlider({ subs }: { subs: SubCategory[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(subs[0]?.name ?? "")
  const scroll = (dir: "left" | "right") => {
    if (ref.current) ref.current.scrollBy({ left: dir === "left" ? -240 : 240, behavior: "smooth" })
  }
  return (
    <div className="flex items-center gap-1 mb-4">
      <button onClick={() => scroll("left")} className="w-6 h-6 shrink-0 flex items-center justify-center border border-[#dde3ec] rounded text-[#666] hover:text-[#1a5fa8] transition-colors">
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>
      <div ref={ref} className="flex gap-2 overflow-x-auto scrollbar-none flex-1">
        {subs.map((s) => {
          const isActive = active === s.name
          return (
            <button
              key={s.name}
              onClick={() => setActive(s.name)}
              className={`shrink-0 min-w-[100px] px-3 py-2 rounded text-center transition-colors ${
                isActive ? "bg-[#1a5fa8] text-white" : "bg-[#e8f0f8] text-[#333] hover:bg-[#1a5fa8] hover:text-white"
              }`}
            >
              <div className="text-[13px] font-semibold mb-1">{s.name}</div>
              <div className="text-[11px] opacity-90">
                总量 <span className="font-bold">{s.totalQty}</span>
              </div>
              <div className="text-[11px] opacity-90">
                总额 <span className="font-bold">{s.totalAmt}</span>
              </div>
            </button>
          )
        })}
      </div>
      <button onClick={() => scroll("right")} className="w-6 h-6 shrink-0 flex items-center justify-center border border-[#dde3ec] rounded text-[#666] hover:text-[#1a5fa8] transition-colors">
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

function ProductCard({ p }: { p: FeaturedProduct }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-[#e8edf5] hover:shadow-md transition-shadow">
      {/* Product image */}
      <div className="relative w-full h-[160px] overflow-hidden">
        <Image src={p.img} alt={p.name} fill className="object-cover hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-3">
        <div className="text-[15px] font-semibold text-[#1a1a2e] mb-0.5">{p.name}</div>
        <div className="text-[12px] text-[#888] mb-3 truncate">{p.tagline}</div>
        {p.sellers.map((s, i) => (
          <div key={i} className="flex items-center gap-2 mb-1.5">
            <div className="w-5 h-5 rounded-full bg-[#e8f4fd] flex items-center justify-center shrink-0">
              <span className="text-[10px] text-[#1a5fa8] font-bold">{i + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] text-[#333] font-medium truncate">{s.name}</div>
              <div className="flex items-center gap-1">
                <span className="text-[12px] text-[#e8831a] font-semibold">{s.price}元起</span>
                <MapPin className="w-3 h-3 text-[#999]" />
                <span className="text-[11px] text-[#999] truncate">{s.origin}</span>
              </div>
            </div>
          </div>
        ))}
        <Link
          href={p.moreHref}
          className="flex items-center gap-0.5 text-[12px] text-[#1a5fa8] hover:underline mt-2"
        >
          查看更多{p.name} <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}

function RegionSection() {
  const [activeRegion, setActiveRegion] = useState(regions[0])
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: "left" | "right") => {
    if (ref.current) ref.current.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" })
  }

  return (
    <section className="mb-12">
      <h2 className="text-[24px] font-bold text-[#1a1a2e] text-center mb-1">热门产地</h2>
      <div className="flex items-center justify-center gap-6 text-[14px] text-[#666] mb-4">
        <span>总量：<span className="text-[#1a5fa8] font-semibold">10000吨</span></span>
        <span>总额：<span className="text-[#1a5fa8] font-semibold">1000000万元</span></span>
      </div>

      {/* Region tabs slider */}
      <div className="flex items-center gap-1 mb-5">
        <button onClick={() => scroll("left")} className="w-6 h-6 shrink-0 flex items-center justify-center border border-[#dde3ec] rounded text-[#666] hover:text-[#1a5fa8] hover:border-[#1a5fa8] transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <div ref={ref} className="flex gap-2 overflow-x-auto scrollbar-none flex-1">
          {regions.map((r) => (
            <button
              key={r.id + r.name}
              onClick={() => setActiveRegion(r)}
              className={`shrink-0 px-3 py-1.5 border rounded text-center min-w-[90px] transition-colors ${
                activeRegion.id === r.id
                  ? "border-[#1a5fa8] bg-[#1a5fa8] text-white"
                  : "border-[#dde3ec] hover:border-[#1a5fa8] hover:bg-[#e8f4fd]"
              }`}
            >
              <div className={`text-[13px] font-semibold ${activeRegion.id === r.id ? "text-white" : "text-[#333]"}`}>{r.name}</div>
              <div className="flex items-center justify-center gap-1.5 mt-0.5">
                <span className={`text-[11px] ${activeRegion.id === r.id ? "text-white/80" : "text-[#666]"}`}>
                  总量 <span className={activeRegion.id === r.id ? "text-white font-medium" : "text-[#1a5fa8] font-medium"}>{r.totalQty}</span>
                </span>
                <span className={`text-[11px] ${activeRegion.id === r.id ? "text-white/80" : "text-[#666]"}`}>
                  总额 <span className={activeRegion.id === r.id ? "text-white font-medium" : "text-[#1a5fa8] font-medium"}>{r.totalAmt}</span>
                </span>
              </div>
            </button>
          ))}
        </div>
        <button onClick={() => scroll("right")} className="w-6 h-6 shrink-0 flex items-center justify-center border border-[#dde3ec] rounded text-[#666] hover:text-[#1a5fa8] hover:border-[#1a5fa8] transition-colors">
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Region content: list + preview */}
      <div className="grid grid-cols-[320px_1fr] gap-4">
        {/* Left: region list */}
        <div className="space-y-2">
          {regions.slice(0, 4).map((r) => (
            <button
              key={r.id + r.name + "list"}
              onClick={() => setActiveRegion(r)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${
                activeRegion.id === r.id
                  ? "border-[#1a5fa8] bg-[#e8f4fd]"
                  : "border-[#e8edf5] bg-white hover:border-[#1a5fa8] hover:bg-[#f5faff]"
              }`}
            >
              <div className="relative w-12 h-12 rounded shrink-0 overflow-hidden">
                <Image src={r.thumb} alt={r.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[13px] font-semibold ${activeRegion.id === r.id ? "text-[#1a5fa8]" : "text-[#1a1a2e]"}`}>
                    广东{r.name}产地直供中心
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#999] ml-auto shrink-0" />
                </div>
                <div className="text-[12px] text-[#888] truncate">{r.products}</div>
                <div className="text-[12px] text-[#1a5fa8] mt-0.5">{r.productCount} 个商品</div>
              </div>
            </button>
          ))}
        </div>

        {/* Right: region detail preview */}
        <div className="rounded-lg overflow-hidden relative border border-[#e8edf5]">
          <div className="relative w-full h-full min-h-[280px] flex items-end p-6">
            <Image src={activeRegion.thumb} alt={activeRegion.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50" />
            <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-[360px]">
              <div className="flex items-start gap-1 mb-2">
                <MapPin className="w-4 h-4 text-[#1a5fa8] mt-0.5 shrink-0" />
                <span className="text-[13px] text-[#666]">广东省{activeRegion.name}市新会区大蟹镇核心产区</span>
              </div>
              <h3 className="text-[20px] font-bold text-[#1a1a2e] mb-2">
                广东{activeRegion.name}产地直供中心
              </h3>
              <p className="text-[13px] text-[#555] leading-relaxed mb-4">
                {activeRegion.desc}，整合产地资源，打造从产地到餐桌的高效供应链，确保一起鲜解的鲜活与品质。
              </p>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[13px] font-semibold text-[#1a5fa8]">{activeRegion.productCount} 个商品在��</span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/portal/gongxiao-yanxuan/${activeRegion.id}`}
                  className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors"
                >
                  探索产品商城 →
                </Link>
                <Link href="#" className="text-[13px] text-[#1a5fa8] hover:underline">联系系服务</Link>
                <Link href="#" className="text-[13px] text-[#1a5fa8] hover:underline">营销化运营</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <Link
          href="/portal/gongxiao-yanxuan"
          className="px-8 py-2.5 bg-[#1a5fa8] text-white text-[14px] rounded hover:bg-[#0d4a8a] transition-colors flex items-center gap-1.5"
        >
          查看更多产地 <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}

/* ─── Page ─── */
export default function GongxiaoYanxuanPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">

        {/* Hero Banner */}
        <div
          className="relative w-full h-[240px] flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0a3d7a 0%, #1a5fa8 45%, #2d8a4e 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute left-[8%] top-1/2 -translate-y-1/2 w-36 h-36 rounded-full border border-white/10 opacity-25" />
          <div className="absolute left-[5%] top-1/2 -translate-y-1/2 w-52 h-52 rounded-full border border-white/10 opacity-15" />
          <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-36 h-36 rounded-full border border-white/10 opacity-25" />
          <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-52 h-52 rounded-full border border-white/10 opacity-15" />
          <div className="relative z-10 text-center">
            <h1 className="text-[42px] font-bold text-white mb-2 tracking-wide">供销严选</h1>
            <p className="text-[16px] text-white/80 mb-5">精选供应商 产地直供</p>
            <div className="flex items-center justify-center gap-4">
              <span className="px-5 py-1.5 rounded-full border border-white/40 bg-white/10 text-white text-[14px] backdrop-blur-sm">
                产地直采
              </span>
              <span className="px-5 py-1.5 rounded-full border border-white/40 bg-white/10 text-white text-[14px] backdrop-blur-sm">
                超值溯源
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto px-6 py-8">

          {/* Hot Regions */}
          <RegionSection />

          {/* Featured Products */}
          {featuredCategories.map((cat) => (
            <section key={cat.name} className="mb-12">
              <h2 className="text-[24px] font-bold text-[#1a1a2e] text-center mb-1">{cat.name}</h2>
              <div className="flex items-center justify-center gap-6 text-[14px] text-[#666] mb-4">
                <span>总量：<span className="text-[#1a5fa8] font-semibold">{cat.totalQty}</span></span>
                <span>总额：<span className="text-[#1a5fa8] font-semibold">{cat.totalAmt}</span></span>
              </div>
              <SubCategorySlider subs={cat.subs} />
              {/* Search bar */}
              <div className="flex justify-end mb-4 gap-2">
                <input
                  placeholder="搜索产品名称"
                  className="border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] w-[200px] focus:outline-none focus:border-[#1a5fa8]"
                />
                <button className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">搜索</button>
              </div>
              {/* 4-col product grid */}
              <div className="grid grid-cols-4 gap-4 mb-5">
                {cat.products.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
              <div className="flex justify-center">
                <Link
                  href="/portal/gongxiao-yanxuan/product"
                  className="px-8 py-2.5 bg-[#1a5fa8] text-white text-[14px] rounded hover:bg-[#0d4a8a] transition-colors flex items-center gap-1.5"
                >
                  查看更多单品 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          ))}

        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
