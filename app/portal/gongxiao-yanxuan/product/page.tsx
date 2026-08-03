"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  ChevronRight, ShoppingCart, Phone, MessageCircle,
  MapPin, Shield, Truck, Clock, Star, CheckCircle,
  ChevronLeft, ChevronDown, Package, Leaf,
} from "lucide-react"

/* ── Mock product data ── */
const PRODUCT = {
  id: "p001",
  name: "鲜活南美白对虾",
  tagline: "江门产地直供 | 当日捕捞 | 全程冷链",
  region: "广东江门",
  supplier: "广东江门产地直供中心",
  supplierId: "jiangmen",
  badge: ["产地直供", "可溯源", "今日采摘"],
  images: [
    "/images/products/shrimp-fresh.png",
    "/images/products/luoshi-shrimp.png",
    "/images/products/shrimp-fresh.png",
    "/images/products/luoshi-shrimp.png",
  ],
  category: "鲜活水产 / 对虾",
  priceRange: "28.80 ~ 42.00",
  unit: "元/斤",
  minOrder: "50斤起批",
  stock: "充足",
  specs: [
    { label: "20/30只/斤", price: "31.12", active: false },
    { label: "30/40只/斤", price: "28.80", active: true  },
    { label: "40/50只/斤", price: "26.50", active: false },
    { label: "50/60只/斤", price: "24.00", active: false },
  ],
  logistics: [
    { icon: Truck,   title: "冷链配送",   desc: "全程冷链，次日达（广深莞惠）" },
    { icon: Package, title: "起批数量",   desc: "50斤起批，支持拆零" },
    { icon: Clock,   title: "发货时效",   desc: "下单后2小时内安排发货" },
    { icon: Shield,  title: "品质保障",   desc: "48小时内可申请退换" },
  ],
  certifications: ["无公害农产品", "绿色食品认证", "SC食品生产许可"],
  supplierInfo: {
    name: "广东江门产地直供中心",
    rating: 4.9,
    orders: "1286",
    years: "5年",
    tags: ["诚信经营", "实力商家", "快速发货"],
  },
  detail: [
    { label: "商品名称", value: "鲜活南美白对虾" },
    { label: "产地",     value: "广东江门" },
    { label: "规格",     value: "多规格可选" },
    { label: "净重",     value: "按实际重量结算" },
    { label: "保质期",   value: "冷藏24小时 / 冷冻3个月" },
    { label: "包装",     value: "泡沫箱+冰袋，保温保鲜" },
    { label: "配送",     value: "顺丰冷链 / 自有冷链车" },
  ],
  reviews: [
    { user: "广州某餐饮采购部", score: 5, content: "质量非常好，虾很活，发货速度快，下次还会采购。", date: "2025-12-18" },
    { user: "深圳某超市采购中心", score: 5, content: "产地直供价格实惠，品质稳定，合作两年了，推荐！", date: "2025-12-10" },
    { user: "东莞某食材配送商", score: 4, content: "整体满意，冷链做得不错，虾到手还是活的。", date: "2025-11-28" },
  ],
  related: [
    { id: "r1", name: "优选罗氏沼虾",   price: "38.50", img: "/images/products/luoshi-shrimp.png" },
    { id: "r2", name: "精选淡水虾",     price: "28.80", img: "/images/products/shrimp-fresh.png"  },
    { id: "r3", name: "鲜活禽蛋（鸡蛋）", price: "12.50", img: "/images/products/eggs.png"        },
    { id: "r4", name: "优质丝苗米",     price: "5.80",  img: "/images/products/simiao-rice.png"   },
  ],
}

/* ── Image gallery ── */
function Gallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0)
  return (
    <div className="flex gap-3">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2 w-[72px] shrink-0">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative w-[72px] h-[72px] rounded overflow-hidden border-2 transition-colors ${active === i ? "border-[#1a5fa8]" : "border-[#e8edf5] hover:border-[#aac4e8]"}`}
          >
            <Image src={src} alt={`商品图 ${i + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
      {/* Main image */}
      <div className="relative flex-1 aspect-square rounded-lg overflow-hidden bg-[#f5f7fa] border border-[#e8edf5]">
        <Image src={images[active]} alt="商品主图" fill className="object-cover" />
        {/* Arrows */}
        {active > 0 && (
          <button onClick={() => setActive(a => a - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        {active < images.length - 1 && (
          <button onClick={() => setActive(a => a + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

/* ── Page ── */
export default function ProductDetailPage() {
  const [activeSpec, setActiveSpec] = useState(1)
  const [qty, setQty] = useState(100)
  const [activeTab, setActiveTab] = useState<"detail" | "supplier" | "review">("detail")
  const [addedToCart, setAddedToCart] = useState(false)

  const selectedSpec = PRODUCT.specs[activeSpec]

  const handleAddCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e8edf5]">
        <div className="max-w-[1100px] mx-auto px-6 py-2.5 flex items-center gap-1.5 text-[13px] text-[#999]">
          <Link href="/portal" className="hover:text-[#1a5fa8]">首页</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/portal/gongxiao-yanxuan" className="hover:text-[#1a5fa8]">供销严选</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/portal/gongxiao-yanxuan/${PRODUCT.supplierId}`} className="hover:text-[#1a5fa8]">
            {PRODUCT.region}产地直供中心
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1a1a2e]">{PRODUCT.name}</span>
        </div>
      </div>

      <main className="flex-1">
        <div className="max-w-[1100px] mx-auto px-6 py-6">

          {/* ── Product main ── */}
          <div className="bg-white rounded-lg border border-[#e8edf5] p-6 mb-5">
            <div className="flex gap-8">

              {/* Left: gallery */}
              <div className="w-[380px] shrink-0">
                <Gallery images={PRODUCT.images} />
                {/* Certs */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {PRODUCT.certifications.map(c => (
                    <span key={c} className="flex items-center gap-1 px-2.5 py-1 bg-[#edf7ee] text-[#3a8c3f] text-[11px] rounded-full font-medium">
                      <CheckCircle className="w-3 h-3" />{c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: info */}
              <div className="flex-1 min-w-0">
                {/* Badges */}
                <div className="flex items-center gap-2 mb-2">
                  {PRODUCT.badge.map(b => (
                    <span key={b} className="px-2 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[11px] font-medium rounded">{b}</span>
                  ))}
                </div>

                <h1 className="text-[22px] font-bold text-[#1a1a2e] mb-1">{PRODUCT.name}</h1>
                <p className="text-[13px] text-[#888] mb-4">{PRODUCT.tagline}</p>

                {/* Price */}
                <div className="bg-[#fff8f2] rounded-lg p-4 mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[13px] text-[#666]">价格</span>
                    <span className="text-[32px] font-bold text-[#e8831a]">{selectedSpec.price}</span>
                    <span className="text-[14px] text-[#999]">{PRODUCT.unit}</span>
                    <span className="ml-2 text-[12px] text-[#bbb] line-through">参考价 35.00元/斤</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-[12px] text-[#888]">
                    <span>起批：<span className="text-[#333] font-medium">{PRODUCT.minOrder}</span></span>
                    <span>库存：<span className="text-[#3a8c3f] font-medium">{PRODUCT.stock}</span></span>
                  </div>
                </div>

                {/* Spec selection */}
                <div className="mb-4">
                  <div className="text-[13px] font-medium text-[#333] mb-2">规格选择</div>
                  <div className="flex flex-wrap gap-2">
                    {PRODUCT.specs.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveSpec(i)}
                        className={`px-4 py-2 rounded border text-[13px] transition-all ${
                          activeSpec === i
                            ? "border-[#e8831a] bg-[#fff8f2] text-[#e8831a] font-semibold"
                            : "border-[#dde3ec] text-[#555] hover:border-[#e8831a]"
                        }`}
                      >
                        {s.label}
                        <span className={`ml-1.5 ${activeSpec === i ? "text-[#e8831a]" : "text-[#e8831a]"}`}>{s.price}元</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logistics */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {PRODUCT.logistics.map((l) => {
                    const Icon = l.icon
                    return (
                      <div key={l.title} className="flex items-center gap-2 text-[12px] text-[#666]">
                        <Icon className="w-3.5 h-3.5 text-[#1a5fa8] shrink-0" />
                        <span className="font-medium text-[#333]">{l.title}：</span>
                        <span>{l.desc}</span>
                      </div>
                    )
                  })}
                </div>

                {/* Origin */}
                <div className="flex items-center gap-1.5 text-[13px] text-[#666] mb-5">
                  <MapPin className="w-3.5 h-3.5 text-[#1a5fa8] shrink-0" />
                  <span>产地：</span>
                  <Link href={`/portal/gongxiao-yanxuan/${PRODUCT.supplierId}`} className="text-[#1a5fa8] hover:underline font-medium">
                    {PRODUCT.supplier}
                  </Link>
                  <Leaf className="w-3.5 h-3.5 text-[#3a8c3f] ml-1" />
                  <span className="text-[#3a8c3f]">生态养殖</span>
                </div>

                {/* Qty + Actions */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#dde3ec] rounded overflow-hidden">
                    <button onClick={() => setQty(q => Math.max(50, q - 50))} className="w-9 h-9 flex items-center justify-center text-[#666] hover:bg-[#f5f7fa] text-[18px] font-medium border-r border-[#dde3ec]">-</button>
                    <input
                      type="number"
                      value={qty}
                      onChange={e => setQty(Math.max(50, Number(e.target.value)))}
                      className="w-[80px] h-9 text-center text-[14px] font-semibold outline-none"
                    />
                    <button onClick={() => setQty(q => q + 50)} className="w-9 h-9 flex items-center justify-center text-[#666] hover:bg-[#f5f7fa] text-[18px] font-medium border-l border-[#dde3ec]">+</button>
                  </div>
                  <span className="text-[13px] text-[#999]">斤</span>
                  <span className="text-[13px] text-[#666]">
                    小计：<span className="text-[#e8831a] font-bold text-[16px]">{(qty * parseFloat(selectedSpec.price)).toFixed(2)}</span> 元
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={handleAddCart}
                    className={`flex items-center gap-2 px-8 py-2.5 rounded text-[14px] font-semibold border-2 transition-all ${
                      addedToCart
                        ? "border-[#3a8c3f] bg-[#3a8c3f] text-white"
                        : "border-[#1a5fa8] bg-white text-[#1a5fa8] hover:bg-[#e8f4fd]"
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {addedToCart ? "已加入采购车" : "加入采购车"}
                  </button>
                  <Link
                    href="/portal/checkout"
                    className="flex items-center gap-2 px-8 py-2.5 bg-[#e8831a] text-white rounded text-[14px] font-semibold hover:bg-[#d4740f] transition-colors"
                  >
                    立即采购
                  </Link>
                  <button className="flex items-center gap-2 px-4 py-2.5 border border-[#dde3ec] text-[#666] rounded text-[13px] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
                    <Phone className="w-4 h-4" />
                    联系客服
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 border border-[#dde3ec] text-[#666] rounded text-[13px] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    在线洽谈
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Detail tabs ── */}
          <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden mb-5">
            {/* Tab nav */}
            <div className="flex border-b border-[#e8edf5]">
              {(["detail", "supplier", "review"] as const).map(tab => {
                const labels = { detail: "商品详情", supplier: "供应商信息", review: `买家评价（${PRODUCT.reviews.length}）` }
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-[14px] font-medium border-b-2 transition-colors ${
                      activeTab === tab
                        ? "border-[#1a5fa8] text-[#1a5fa8]"
                        : "border-transparent text-[#666] hover:text-[#1a5fa8]"
                    }`}
                  >
                    {labels[tab]}
                  </button>
                )
              })}
            </div>

            <div className="p-6">
              {/* 商品详情 */}
              {activeTab === "detail" && (
                <div>
                  <table className="w-full text-[13px] mb-6">
                    <tbody>
                      {PRODUCT.detail.map((row, i) => (
                        <tr key={i} className="border-b border-[#f0f3f8]">
                          <td className="py-3 pr-6 w-[120px] text-[#888] font-medium">{row.label}</td>
                          <td className="py-3 text-[#333]">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Product story */}
                  <div className="bg-[#f8fafc] rounded-lg p-5">
                    <h4 className="text-[15px] font-semibold text-[#1a1a2e] mb-3 flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-[#3a8c3f]" />产品故事
                    </h4>
                    <p className="text-[13px] text-[#555] leading-relaxed">
                      广东江门对虾主要来自新会区、台山市一带的红树林围区生态养殖池，水源来自西江干流，水质优良，养殖期间严格按照无公害标准管理，不使用违禁药物。南美白对虾在30天生长周期内达到商品规格，捕捞后立即用冰水保鲜处理，2小时内完成打包发货，全程冷链覆盖，保障到达客户手中时仍保持鲜活状态。
                    </p>
                  </div>
                </div>
              )}

              {/* 供应商信息 */}
              {activeTab === "supplier" && (
                <div>
                  <div className="flex items-start gap-6">
                    <div className="w-[80px] h-[80px] rounded-full bg-[#e8f4fd] flex items-center justify-center shrink-0">
                      <span className="text-[24px] font-bold text-[#1a5fa8]">粤</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-[18px] font-bold text-[#1a1a2e]">{PRODUCT.supplierInfo.name}</h3>
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} className={`w-4 h-4 ${s <= Math.floor(PRODUCT.supplierInfo.rating) ? "text-[#f59e0b] fill-[#f59e0b]" : "text-[#ddd]"}`} />
                          ))}
                          <span className="text-[14px] font-bold text-[#e8831a] ml-1">{PRODUCT.supplierInfo.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-[13px] text-[#666] mb-3">
                        <span>成交订单 <span className="font-bold text-[#1a1a2e]">{PRODUCT.supplierInfo.orders}</span></span>
                        <span>入驻年限 <span className="font-bold text-[#1a1a2e]">{PRODUCT.supplierInfo.years}</span></span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {PRODUCT.supplierInfo.tags.map(t => (
                          <span key={t} className="px-3 py-1 bg-[#edf7ee] text-[#3a8c3f] text-[12px] rounded-full font-medium">{t}</span>
                        ))}
                      </div>
                      <Link
                        href={`/portal/gongxiao-yanxuan/${PRODUCT.supplierId}`}
                        className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors"
                      >
                        进入产地直供中心 <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* 买家评价 */}
              {activeTab === "review" && (
                <div>
                  <div className="flex items-center gap-6 mb-6 pb-5 border-b border-[#f0f3f8]">
                    <div className="text-center">
                      <div className="text-[48px] font-bold text-[#e8831a] leading-none">4.9</div>
                      <div className="flex items-center justify-center gap-0.5 mt-1">
                        {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-[#f59e0b] fill-[#f59e0b]" />)}
                      </div>
                      <div className="text-[12px] text-[#999] mt-1">综合评分</div>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[["质量", 98], ["物流", 97], ["服务", 99]].map(([label, score]) => (
                        <div key={label as string} className="flex items-center gap-3 text-[13px]">
                          <span className="w-8 text-[#666]">{label}</span>
                          <div className="flex-1 h-2 bg-[#f0f3f8] rounded-full overflow-hidden">
                            <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: `${score}%` }} />
                          </div>
                          <span className="text-[#f59e0b] font-semibold">{score}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {PRODUCT.reviews.map((r, i) => (
                      <div key={i} className="border-b border-[#f0f3f8] pb-4 last:border-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-[#e8f4fd] flex items-center justify-center text-[12px] font-bold text-[#1a5fa8]">
                            {r.user.charAt(0)}
                          </div>
                          <div>
                            <div className="text-[13px] font-medium text-[#333]">{r.user}</div>
                            <div className="flex items-center gap-0.5">
                              {[1,2,3,4,5].map(s => (
                                <Star key={s} className={`w-3 h-3 ${s <= r.score ? "text-[#f59e0b] fill-[#f59e0b]" : "text-[#ddd]"}`} />
                              ))}
                              <span className="text-[11px] text-[#999] ml-1">{r.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-[13px] text-[#555] leading-relaxed pl-11">{r.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Related products ── */}
          <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-bold text-[#1a1a2e]">相关商品推荐</h3>
              <Link href="/portal/gongxiao-yanxuan" className="text-[13px] text-[#1a5fa8] hover:underline flex items-center gap-0.5">
                查看更多 <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {PRODUCT.related.map(r => (
                <Link
                  key={r.id}
                  href="/portal/gongxiao-yanxuan/product"
                  className="border border-[#e8edf5] rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div className="relative h-[140px] overflow-hidden">
                    <Image src={r.img} alt={r.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-3">
                    <div className="text-[13px] font-medium text-[#1a1a2e] truncate mb-1">{r.name}</div>
                    <div className="text-[14px] font-bold text-[#e8831a]">{r.price}<span className="text-[11px] font-normal text-[#999]">元/斤起</span></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
