"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  ChevronRight, ShoppingCart, Phone, MessageCircle,
  Check, X, Minus, Plus,
} from "lucide-react"

/* ─── Mock product data ─── */
const PRODUCT = {
  id: "p-jicai-001",
  name: "某某优选大米（集采专区）",
  supplierId: "gz-gongxiao",
  supplierName: "广东供销农产品股份有限公司",
  certified: true,
  badge: "粤供优选",
  image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80",
  priceBase: 88.00,
  deliveryMethods: ["卖家配送", "买家自提"],
  selfPickup: {
    addr: "广州市天河区某街道xx路xx号",
    contact: "王先生",
    phone: "1388900****",
    note: "（下单后显示联系电话）",
  },
  settlementChannels: ["运行安心付", "工行安心付"],
  paymentRatio: "预付款 10%",
  tradeModes: ["担保交易", "非担保交易"],
  specs: [
    { id: "s1", label: "5kg / 袋",  price: 88.00,  minBatch: 100, maxSupply: 8000,  checked: true  },
    { id: "s2", label: "10kg / 袋", price: 170.00, minBatch: 100, maxSupply: 12000, checked: false },
    { id: "s3", label: "15kg / 袋", price: 260.00, minBatch: 100, maxSupply: 8000,  checked: false },
  ],
  detailImages: [
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80",
  ],
  detailText: `本品为优质台山丝苗米，产自广东省著名稻米产区，是国家地理标志保护产品，承载着粤港澳大湾区天然自然馈赠与百年种植传承。产地肥沃、海拔适中、雨量丰沛，加上得天独厚的自然环境，从田间种植、精选加工、全程可溯，品质有保障。

外观上，本品米粒长细长，颗粒均匀，透亮晶莹通透，富有光泽，加热拒腐透明感浓厚，冲煮有馨香，口感软糯可口，粒粒分明，韧劲不足之处，无毫米家黑豆之处还是够满足大众上餐桌口感。

本次采购通过集采平台统一议价，享受规模采购优惠，价格透明公开，全程担保交易，确保采购安全可靠。`,
  storeRecommend: [
    { id: "r1", name: "某某优选鸡蛋", price: 31.12, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&q=70" },
    { id: "r2", name: "某某优选荔枝", price: 45.00, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&q=70" },
    { id: "r3", name: "某某优选牛奶", price: 58.80, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=70" },
    { id: "r4", name: "某某优选苹果", price: 32.50, image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300&q=70" },
    { id: "r5", name: "某某优选香蕉", price: 18.90, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&q=70" },
  ],
}

export default function JicaiProductPage() {
  const params = useParams()
  const companyId = params.id as string

  const [selectedDelivery, setSelectedDelivery] = useState("卖家配送")
  const [selectedSettlement, setSelectedSettlement] = useState("运行安心付")
  const [selectedTradeMode, setSelectedTradeMode] = useState("担保交易")
  const [specs, setSpecs] = useState(PRODUCT.specs)
  const [cartModal, setCartModal] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  const totalQty = specs.reduce((sum, s) => {
    if (!s.checked) return sum
    return sum + 1000
  }, 0)
  const totalPrice = specs.reduce((sum, s) => {
    if (!s.checked) return sum
    return sum + s.price * 1000
  }, 0)

  function toggleSpec(id: string) {
    setSpecs((prev) => prev.map((s) => s.id === id ? { ...s, checked: !s.checked } : s))
  }

  function handleAddCart() {
    setCartCount((c) => c + specs.filter((s) => s.checked).length)
    setCartModal(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-6 py-5">

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[12px] text-[#6b7c93] mb-5">
            <Link href="/" className="hover:text-[#1a5fa8]">首页</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/portal/jicai" className="hover:text-[#1a5fa8]">集采专区</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/portal/jicai/${companyId}`} className="hover:text-[#1a5fa8]">集采商品</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1a1a2e]">商品详情</span>
          </div>

          {/* Supplier strip */}
          <div className="bg-white border border-[#e8edf5] rounded px-4 py-2.5 flex items-center gap-3 mb-5 text-[13px]">
            <span className="font-semibold text-[#1a5fa8]">{PRODUCT.supplierName}</span>
            {PRODUCT.certified && (
              <span className="text-[11px] px-2 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] border border-[#1a5fa8]/20 rounded">粤供优选</span>
            )}
            <button className="ml-auto text-[#1a5fa8] hover:underline">进入店铺</button>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-[#1a5fa8] text-[#1a5fa8] rounded hover:bg-[#e8f4fd] transition-colors">
              <MessageCircle className="w-3.5 h-3.5" />联系商家
            </button>
          </div>

          <div className="flex gap-6">
            {/* Left: product image */}
            <div className="w-[360px] shrink-0">
              <div className="bg-white border border-[#e8edf5] rounded overflow-hidden aspect-square relative">
                <Image src={PRODUCT.image} alt={PRODUCT.name} fill className="object-cover" />
              </div>
              <div className="flex gap-2 mt-2">
                <div className="w-[60px] h-[60px] border-2 border-[#1a5fa8] rounded overflow-hidden relative cursor-pointer">
                  <Image src={PRODUCT.image} alt="" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Right: product info */}
            <div className="flex-1 min-w-0">
              {/* Title + badge */}
              <div className="flex items-start gap-2 mb-3">
                <span className="shrink-0 text-[11px] px-2 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] border border-[#1a5fa8]/20 rounded mt-0.5">
                  {PRODUCT.badge}
                </span>
                <h1 className="text-[20px] font-bold text-[#1a1a2e] leading-snug">{PRODUCT.name}</h1>
              </div>

              {/* Price */}
              <div className="bg-[#f8fafc] border border-[#e8edf5] rounded px-4 py-3 mb-4 flex items-baseline gap-1">
                <span className="text-[13px] text-[#6b7c93]">价格</span>
                <span className="text-[28px] font-bold text-[#e8831a] ml-2">¥{PRODUCT.priceBase.toFixed(2)}</span>
                <span className="text-[13px] text-[#6b7c93]">元</span>
                <span className="text-[13px] text-[#6b7c93]">起</span>
                <span className="ml-2 text-[11px] px-2 py-0.5 bg-[#fff3e0] text-[#e8831a] border border-[#e8831a]/20 rounded">集采优惠</span>
              </div>

              {/* Delivery */}
              <div className="flex items-center gap-3 mb-3 text-[13px]">
                <span className="w-[72px] text-[#6b7c93] shrink-0">配送方式</span>
                <div className="flex items-center gap-2">
                  {PRODUCT.deliveryMethods.map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedDelivery(m)}
                      className={`px-3 py-1 rounded border text-[13px] transition-colors ${
                        selectedDelivery === m
                          ? "border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8]"
                          : "border-[#dde3ec] text-[#555] hover:border-[#1a5fa8]"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {selectedDelivery === "买家自提" && (
                <div className="ml-[84px] mb-3 text-[12px] text-[#555] bg-[#f5f7fa] border border-[#e8edf5] rounded px-3 py-2">
                  自提点：{PRODUCT.selfPickup.addr}&nbsp;
                  {PRODUCT.selfPickup.contact}&nbsp;{PRODUCT.selfPickup.phone}
                  <span className="text-[#999]">{PRODUCT.selfPickup.note}</span>
                </div>
              )}

              {/* Settlement */}
              <div className="flex items-center gap-3 mb-3 text-[13px]">
                <span className="w-[72px] text-[#6b7c93] shrink-0">结算渠道</span>
                <div className="flex items-center gap-2">
                  {PRODUCT.settlementChannels.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedSettlement(c)}
                      className={`px-3 py-1 rounded border text-[13px] transition-colors ${
                        selectedSettlement === c
                          ? "border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8]"
                          : "border-[#dde3ec] text-[#555] hover:border-[#1a5fa8]"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3 text-[13px]">
                <span className="w-[72px] text-[#6b7c93] shrink-0">结算方式</span>
                <span className="text-[#333]">{PRODUCT.paymentRatio}</span>
              </div>

              {/* Trade mode */}
              <div className="flex items-center gap-3 mb-5 text-[13px]">
                <span className="w-[72px] text-[#6b7c93] shrink-0">交易模式</span>
                <div className="flex items-center gap-2">
                  {PRODUCT.tradeModes.map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedTradeMode(m)}
                      className={`px-3 py-1 rounded border text-[13px] transition-colors ${
                        selectedTradeMode === m
                          ? "border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8]"
                          : "border-[#dde3ec] text-[#555] hover:border-[#1a5fa8]"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spec table */}
              <div className="border border-[#e8edf5] rounded overflow-hidden mb-4">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="bg-[#f5f7fa] border-b border-[#e8edf5]">
                      <th className="text-left px-3 py-2 text-[#6b7c93] font-medium w-8"></th>
                      <th className="text-left px-3 py-2 text-[#6b7c93] font-medium">规格</th>
                      <th className="text-left px-3 py-2 text-[#6b7c93] font-medium">价格（元）</th>
                      <th className="text-left px-3 py-2 text-[#6b7c93] font-medium">起批量</th>
                      <th className="text-left px-3 py-2 text-[#6b7c93] font-medium">预估供应量</th>
                      <th className="text-center px-3 py-2 text-[#6b7c93] font-medium">数量</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specs.map((spec) => (
                      <tr key={spec.id} className="border-b border-[#e8edf5] last:border-0 hover:bg-[#f8fafc]">
                        <td className="px-3 py-2.5">
                          <input
                            type="checkbox"
                            checked={spec.checked}
                            onChange={() => toggleSpec(spec.id)}
                            className="accent-[#1a5fa8] w-4 h-4"
                          />
                        </td>
                        <td className="px-3 py-2.5 font-medium text-[#1a1a2e]">{spec.label}</td>
                        <td className="px-3 py-2.5 text-[#e8831a] font-semibold">{spec.price.toFixed(2)}</td>
                        <td className="px-3 py-2.5 text-[#555]">{spec.minBatch}</td>
                        <td className="px-3 py-2.5 text-[#555]">{spec.maxSupply}袋</td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center justify-center gap-1">
                            <button className="w-6 h-6 border border-[#dde3ec] rounded flex items-center justify-center hover:border-[#1a5fa8] text-[#555]">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-12 text-center text-[13px] font-medium">1000</span>
                            <button className="w-6 h-6 border border-[#dde3ec] rounded flex items-center justify-center hover:border-[#1a5fa8] text-[#555]">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total */}
              <div className="bg-[#f8fafc] border border-[#e8edf5] rounded px-4 py-2.5 mb-5 flex items-center gap-4 text-[13px]">
                <span className="text-[#6b7c93]">合计 {totalQty} 件</span>
                <span className="text-[#6b7c93]">商品总金额：</span>
                <span className="text-[16px] font-bold text-[#e8831a]">¥{totalPrice.toLocaleString()}.00</span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <Link
                  href={`/portal/chanxiao-duijie/xiadan`}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-[#1a5fa8] text-white text-[15px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors"
                >
                  立即下单
                </Link>
                <button
                  onClick={handleAddCart}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-[#e8f4fd] text-[#1a5fa8] border border-[#1a5fa8] text-[15px] font-semibold rounded hover:bg-[#d0e8f8] transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  加入购物车
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 border border-[#dde3ec] text-[#555] text-[15px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
                  <Phone className="w-4 h-4" />
                  联系商家
                </button>
              </div>
            </div>
          </div>

          {/* Product detail + store recommend */}
          <div className="flex gap-6 mt-8">
            {/* Detail */}
            <div className="flex-1 min-w-0">
              <div className="bg-white border border-[#e8edf5] rounded overflow-hidden">
                <div className="px-5 py-3 border-b border-[#e8edf5] flex items-center gap-4">
                  <span className="text-[14px] font-bold text-[#1a1a2e] border-b-2 border-[#1a5fa8] pb-2 -mb-3">商品详情</span>
                </div>
                <div className="p-5">
                  {PRODUCT.detailImages.map((img, i) => (
                    <div key={i} className="relative w-full aspect-video rounded overflow-hidden mb-4">
                      <Image src={img} alt="商品详情图" fill className="object-cover" />
                    </div>
                  ))}
                  <p className="text-[13px] text-[#555] leading-relaxed whitespace-pre-line">{PRODUCT.detailText}</p>
                </div>
              </div>
            </div>

            {/* Store recommend */}
            <div className="w-[200px] shrink-0">
              <div className="bg-white border border-[#e8edf5] rounded overflow-hidden">
                <div className="px-4 py-3 border-b border-[#e8edf5] bg-[#1a5fa8]">
                  <span className="text-[13px] font-bold text-white">本店推荐</span>
                </div>
                <div className="divide-y divide-[#e8edf5]">
                  {PRODUCT.storeRecommend.map((p) => (
                    <Link
                      key={p.id}
                      href={`/portal/jicai/${companyId}/product/${p.id}`}
                      className="flex flex-col p-3 hover:bg-[#f8fafc] transition-colors"
                    >
                      <div className="relative w-full aspect-square rounded overflow-hidden mb-2">
                        <Image src={p.image} alt={p.name} fill className="object-cover" />
                      </div>
                      <span className="text-[12px] text-[#1a1a2e] line-clamp-2 mb-1">{p.name}</span>
                      <span className="text-[13px] font-bold text-[#e8831a]">¥{p.price.toFixed(2)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ── Cart success modal ── */}
      {cartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setCartModal(false)}>
          <div className="bg-white rounded-lg w-[360px] shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#e8f5e9] flex items-center justify-center">
                  <Check className="w-5 h-5 text-[#3a8c3f]" />
                </div>
                <span className="text-[15px] font-bold text-[#1a1a2e]">已加入购物车</span>
              </div>
              <button onClick={() => setCartModal(false)}>
                <X className="w-5 h-5 text-[#999]" />
              </button>
            </div>
            <div className="flex items-center gap-3 mb-5 p-3 bg-[#f5f7fa] rounded">
              <div className="relative w-14 h-14 rounded overflow-hidden shrink-0">
                <Image src={PRODUCT.image} alt={PRODUCT.name} fill className="object-cover" />
              </div>
              <div>
                <div className="text-[13px] font-medium text-[#1a1a2e]">{PRODUCT.name}</div>
                <div className="text-[12px] text-[#6b7c93] mt-0.5">已选 {specs.filter(s => s.checked).length} 种规格</div>
              </div>
            </div>
            <div className="text-[12px] text-[#6b7c93] text-center mb-4">
              购物车中共 <span className="font-bold text-[#1a5fa8]">{cartCount}</span> 件商品
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setCartModal(false)}
                className="flex-1 py-2.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999] transition-colors"
              >
                继续浏览
              </button>
              <Link
                href="/portal/cart"
                className="flex-1 py-2.5 bg-[#1a5fa8] text-white text-[13px] rounded text-center font-semibold hover:bg-[#0d4a8a] transition-colors"
                onClick={() => setCartModal(false)}
              >
                去购物车
              </Link>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  )
}
