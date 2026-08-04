"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  ChevronRight, ShoppingCart, Phone, MessageCircle,
  Truck, Warehouse, Factory, Check, X, ChevronDown, ChevronUp,
  QrCode,
} from "lucide-react"

/* ─── Mock data ─── */
const PRODUCT = {
  id: "p-haifengjm",
  name: "广东特色海丰油占米",
  supplierId: "sdcyqs",
  supplierName: "汕头潮阳区社村合作农业发展有限公司",
  supplierNo: "no.122434",
  certified: true,
  badge: ["供销产品"],
  image: "/images/products/simiao-rice.png",
  priceBase: 88.00,
  priceUnit: "元",
  priceHint: "起",
  tags: ["优品"],
  deliveryMethods: ["卖家配送", "买家自提"],
  selfPickup: {
    addr: "广州市某区某某街道xx路xx号",
    contact: "万先生",
    phone: "1788900****",
    note: "（下单后显示联系电话）",
  },
  settlementChannels: ["运行安心付", "工行安心付"],
  paymentRatio: "预付款 10%",
  tradeModes: ["担保交易", "非担保交易"],
  specs: [
    { id: "s1", label: "5kg / 袋", price: 88.00, minBatch: 100, maxSupply: 8000, checked: true },
    { id: "s2", label: "10kg / 袋", price: 170.00, minBatch: 100, maxSupply: 12000, checked: false },
    { id: "s3", label: "15kg / 袋", price: 260.00, minBatch: 100, maxSupply: 8000, checked: false },
  ],
  serviceTags: ["零拒绝", "专线直达", "当日达"],
}

const SERVICES = {
  logistics: [
    {
      id: "l1", name: "广州市广百物流有限公司",
      tags: ["整车运输", "专线直达", "当日达", "平台认证"],
      region: "广东省内",
      types: "半箱粮油、小批量农产品、样品",
      capacity: "零担拼车，最小接货 0.5 吨，最大单车载重 8 吨",
      price: "2.6 元/吨·天起",
    },
    {
      id: "l2", name: "佛山供销物流有限公司",
      tags: ["冷藏运输", "整合"],
      region: "全国",
      types: "食品、农产品",
      capacity: "4.2 米 6 米冷藏车，温控 1℃～4℃，最大重量 15 吨",
      price: "2.8 元/吨·天起",
    },
  ],
  warehouse: [
    {
      id: "w1", name: "广东天起冷储物流有限公司",
      tags: ["常温仓", "冷仓", "防虫防霉", "政府储备"],
      region: "广东省汕头市某区xx路xx号（距您约110km）",
      types: "半箱粮油、生鲜农产品",
      capacity: "可用容量：5,200 吨 / 总容量：15,000 吨（最大单仓 2000 吨）",
      price: "2.6 元/吨·天起",
    },
    {
      id: "w2", name: "南京百豚冷储物流有限公司",
      tags: ["常温仓", "冷仓", "防虫防霉", "政府储备"],
      region: "广东省某区xx路xx号（距您约900km）",
      types: "食品、农产品、生鲜食品",
      capacity: "可用容量：5,200 吨 / 总容量：15,000 吨（最大单仓 5000 吨）",
      price: "2.6 元/吨·天起",
    },
  ],
  processing: [
    {
      id: "p1", name: "广州某某加工服务商",
      tags: ["精深加工", "平台认证", "日产500吨"],
      region: "广州市某区xx路xx号（距您约60km）",
      types: "稻谷、大米、糯米、胚芽米",
      equipment: "糙米加工生产线1套，色选机2台，抛光机3台，最大单批次 30 吨",
      price: "待报价",
    },
    {
      id: "p2", name: "汕头某某加工服务商",
      tags: ["精深加工", "平台认证", "日产500吨"],
      region: "汕头市某区xx路xx号（距您约60km）",
      types: "稻谷、大米、糯米、胚芽米",
      equipment: "糙米加工生产线1套，色选机2台，抛光机3台，最大单批次 30 吨",
      price: "待报价",
    },
  ],
}

const DETAIL_IMAGES = ["/images/products/simiao-rice.png"]

const RELATED = [
  { name: "广东产地直供特色单品海丰油占米1", price: "32.80", img: "/images/products/simiao-rice.png" },
  { name: "广东产地直供特色单品海丰油占米2", price: "32.80", img: "/images/products/simiao-rice.png" },
  { name: "广东产地直供特色单品海丰油占米3", price: "32.80", img: "/images/products/simiao-rice.png" },
  { name: "广东产地直供特色单品海丰油占米4", price: "32.80", img: "/images/products/simiao-rice.png" },
  { name: "广东产地直供特色单品海丰油占米5", price: "32.80", img: "/images/products/simiao-rice.png" },
]

/* ─── 加入购物车成功弹窗 ─── */
function CartSuccessModal({ onClose, onGoCart }: { onClose: () => void; onGoCart: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-lg w-[360px] shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8edf5]">
          <h3 className="text-[15px] font-bold text-[#1a1a2e]">提示</h3>
          <button onClick={onClose}><X className="w-4 h-4 text-[#999]" /></button>
        </div>
        <div className="px-5 py-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-3">
            <Check className="w-6 h-6 text-[#3a8c3f]" />
          </div>
          <p className="text-[15px] font-semibold text-[#1a1a2e] mb-1">已成功加入采购车</p>
          <p className="text-[13px] text-[#999]">您可以继续浏览或前往采购车结算</p>
        </div>
        <div className="flex gap-3 px-5 pb-5">
          <button onClick={onClose} className="flex-1 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">继续浏览</button>
          <button onClick={onGoCart} className="flex-1 py-2 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded hover:bg-[#0d4a8a]">前往采购车</button>
        </div>
      </div>
    </div>
  )
}

/* ─── Service card ─── */
function ServiceCard({ item, type }: { item: typeof SERVICES.logistics[0] & { equipment?: string }; type: "logistics" | "warehouse" | "processing" }) {
  return (
    <div className="border border-[#dde3ec] rounded p-3 flex items-start gap-2 hover:border-[#1a5fa8]/40 transition-colors">
      <div className="w-4 h-4 rounded-full border-2 border-[#1a5fa8] flex items-center justify-center mt-0.5 shrink-0">
        <div className="w-2 h-2 rounded-full bg-[#1a5fa8]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap mb-1">
          <span className="text-[13px] font-semibold text-[#1a1a2e]">{item.name}</span>
          {item.tags?.map(t => (
            <span key={t} className="px-1.5 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[10px] rounded">{t}</span>
          ))}
        </div>
        <div className="text-[12px] text-[#666] space-y-0.5">
          <div>地点：{item.region}</div>
          {type === "logistics" && <><div>适用：{item.types}</div><div>运力：{item.capacity}</div></>}
          {type === "warehouse" && <><div>适用：{item.types}</div><div>容量：{item.capacity}</div></>}
          {type === "processing" && item.equipment && <><div>适用：{item.types}</div><div>设备：{item.equipment}</div></>}
          <div>计费：{item.price}</div>
        </div>
      </div>
    </div>
  )
}

export default function XiaoshouDetailPage() {
  const router = useRouter()
  const [deliveryMethod, setDeliveryMethod] = useState("卖家配送")
  const [settlement, setSettlement] = useState("运行安心付")
  const [tradeMode, setTradeMode] = useState("担保交易")
  const [specQtys, setSpecQtys] = useState<Record<string, number>>({ s1: 1000, s2: 1000, s3: 0 })
  const [specChecked, setSpecChecked] = useState<Record<string, boolean>>({ s1: true, s2: false, s3: false })
  const [serviceOpen, setServiceOpen] = useState(true)
  const [serviceTab, setServiceTab] = useState<"single" | "bundle">("single")
  const [cartModal, setCartModal] = useState(false)

  const totalQty = Object.entries(specChecked).reduce((s, [id, checked]) => checked ? s + (specQtys[id] ?? 0) : s, 0)
  const totalAmt = PRODUCT.specs.reduce((s, sp) => specChecked[sp.id] ? s + sp.price * (specQtys[sp.id] ?? 0) : s, 0)

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e8edf5]">
        <div className="max-w-[1200px] mx-auto px-6 py-2.5 flex items-center gap-1.5 text-[12px] text-[#888]">
          <Link href="/portal" className="hover:text-[#1a5fa8]">当前位置：首页</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/portal/chanxiao-duijie" className="hover:text-[#1a5fa8]">产销对接</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/portal/chanxiao-duijie" className="hover:text-[#1a5fa8]">特色单品</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#333]">商品详情</span>
        </div>
      </div>

      {/* Search bar */}
      <div className="bg-white border-b border-[#e8edf5]">
        <div className="max-w-[1200px] mx-auto px-6 py-3 flex justify-center">
          <div className="flex items-center gap-2">
            <input className="border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] w-[360px] focus:outline-none focus:border-[#1a5fa8]" placeholder="商品 ID" />
            <button className="px-5 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]">搜索</button>
          </div>
        </div>
      </div>

      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-6 py-4">

          {/* Supplier bar */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-semibold text-[#1a1a2e]">{PRODUCT.supplierName}</span>
              {PRODUCT.certified && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-[#e8f5e9] text-[#3a8c3f] text-[11px] rounded border border-[#3a8c3f]/30">
                  <Check className="w-3 h-3" />供销认证
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 border border-[#1a5fa8] text-[#1a5fa8] text-[12px] rounded hover:bg-[#e8f4fd]">进店逛逛</button>
              <button className="flex items-center gap-1 px-4 py-1.5 border border-[#dde3ec] text-[#555] text-[12px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8]">
                <MessageCircle className="w-3.5 h-3.5" />联系客服
              </button>
            </div>
          </div>

          {/* ── 供应时间 ── */}
          <div className="text-center py-2 mb-4">
            <span className="text-[14px] text-[#666]">计划供应时间 </span>
            <span className="text-[28px] font-bold text-[#1a5fa8]">2026-01-01</span>
            <span className="text-[14px] text-[#666]"> 至 </span>
            <span className="text-[28px] font-bold text-[#e8831a]">2026-04-10</span>
          </div>

          {/* ── Main product area ── */}
          <div className="flex gap-5 mb-5">
            {/* Left: image */}
            <div className="w-[320px] shrink-0">
              <div className="relative w-full aspect-square rounded border border-[#e8edf5] overflow-hidden bg-white">
                <Image src={PRODUCT.image} alt={PRODUCT.name} fill className="object-contain p-4" />
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2 mt-2">
                <button className="relative w-[72px] h-[72px] rounded border-2 border-[#1a5fa8] overflow-hidden">
                  <Image src={PRODUCT.image} alt="缩略图" fill className="object-cover" />
                </button>
              </div>
            </div>

            {/* Right: info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Badges + name */}
                  <div className="flex items-center gap-2 mb-1.5">
                    {PRODUCT.badge.map(b => (
                      <span key={b} className="px-2 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[11px] rounded">{b}</span>
                    ))}
                    <h1 className="text-[20px] font-bold text-[#1a1a2e]">{PRODUCT.name}</h1>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-[13px] text-[#666]">价格</span>
                    <span className="text-[32px] font-bold text-[#e8831a]">¥{PRODUCT.priceBase.toFixed(2)}</span>
                    <span className="text-[13px] text-[#999]">{PRODUCT.priceHint}</span>
                    <span className="px-2 py-0.5 bg-[#fff0e0] text-[#e8831a] text-[11px] border border-[#e8831a]/30 rounded">活动价</span>
                  </div>

                  {/* Delivery method */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[13px] text-[#999] w-[60px] shrink-0">配送方式</span>
                    <div className="flex gap-2">
                      {PRODUCT.deliveryMethods.map(m => (
                        <button key={m} onClick={() => setDeliveryMethod(m)}
                          className={`px-3 py-1 rounded border text-[12px] transition-colors ${deliveryMethod === m ? "border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8] font-medium" : "border-[#dde3ec] text-[#555] hover:border-[#1a5fa8]/50"}`}>
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pickup point */}
                  {deliveryMethod === "买家自提" && (
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-[13px] text-[#999] w-[60px] shrink-0">自提点</span>
                      <div className="text-[12px] text-[#555]">
                        {PRODUCT.selfPickup.addr} &nbsp;{PRODUCT.selfPickup.contact} {PRODUCT.selfPickup.phone}
                        <span className="text-[#999]">{PRODUCT.selfPickup.note}</span>
                      </div>
                    </div>
                  )}

                  {/* Settlement */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[13px] text-[#999] w-[60px] shrink-0">结算渠道</span>
                    <div className="flex gap-2">
                      {PRODUCT.settlementChannels.map(s => (
                        <button key={s} onClick={() => setSettlement(s)}
                          className={`px-3 py-1 rounded border text-[12px] transition-colors ${settlement === s ? "border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8] font-medium" : "border-[#dde3ec] text-[#555] hover:border-[#1a5fa8]/50"}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment ratio */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[13px] text-[#999] w-[60px] shrink-0">结算方式</span>
                    <span className="text-[13px] text-[#333]">{PRODUCT.paymentRatio}</span>
                  </div>

                  {/* Trade mode */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[13px] text-[#999] w-[60px] shrink-0">交易模式</span>
                    <div className="flex gap-2">
                      {PRODUCT.tradeModes.map(t => (
                        <button key={t} onClick={() => setTradeMode(t)}
                          className={`px-3 py-1 rounded border text-[12px] transition-colors ${tradeMode === t ? "border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8] font-medium" : "border-[#dde3ec] text-[#555] hover:border-[#1a5fa8]/50"}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Spec table */}
                  <div className="border border-[#e8edf5] rounded overflow-hidden mb-3">
                    <div className="grid text-[12px] bg-[#f5f7fa] font-medium text-[#555]" style={{ gridTemplateColumns: "28px 1fr 80px 80px 100px 80px 80px" }}>
                      <div className="px-2 py-2" />
                      <div className="px-2 py-2">规格</div>
                      <div className="px-2 py-2 text-center">价格(元)</div>
                      <div className="px-2 py-2 text-center">起批量</div>
                      <div className="px-2 py-2 text-center">预估供应量</div>
                      <div className="px-2 py-2 text-center">数量</div>
                      <div className="px-2 py-2 text-center" />
                    </div>
                    {PRODUCT.specs.map(sp => (
                      <div key={sp.id} className="grid items-center border-t border-[#f0f3f8] text-[12px]" style={{ gridTemplateColumns: "28px 1fr 80px 80px 100px 100px 28px" }}>
                        <div className="px-2 py-2.5">
                          <input type="checkbox" checked={specChecked[sp.id] ?? false}
                            onChange={e => setSpecChecked(prev => ({ ...prev, [sp.id]: e.target.checked }))}
                            className="accent-[#1a5fa8]" />
                        </div>
                        <div className="px-2 py-2.5 text-[#333] font-medium">{sp.label}</div>
                        <div className="px-2 py-2.5 text-center text-[#e8831a] font-semibold">{sp.price.toFixed(2)}</div>
                        <div className="px-2 py-2.5 text-center text-[#666]">{sp.minBatch}</div>
                        <div className="px-2 py-2.5 text-center text-[#666]">{sp.maxSupply}袋</div>
                        <div className="px-2 py-2.5 flex items-center gap-1">
                          <button onClick={() => setSpecQtys(p => ({ ...p, [sp.id]: Math.max(0, (p[sp.id] ?? 0) - 1) }))}
                            className="w-5 h-5 border border-[#dde3ec] rounded flex items-center justify-center text-[#555] hover:border-[#1a5fa8]">−</button>
                          <input type="number" value={specQtys[sp.id] ?? 0}
                            onChange={e => setSpecQtys(p => ({ ...p, [sp.id]: Math.max(0, Number(e.target.value)) }))}
                            className="w-12 border border-[#dde3ec] rounded text-center text-[12px] py-0.5 focus:outline-none focus:border-[#1a5fa8]" />
                          <button onClick={() => setSpecQtys(p => ({ ...p, [sp.id]: (p[sp.id] ?? 0) + 1 }))}
                            className="w-5 h-5 border border-[#dde3ec] rounded flex items-center justify-center text-[#555] hover:border-[#1a5fa8]">+</button>
                        </div>
                        <div className="px-1 py-2.5 text-center text-[#999] text-[11px]">袋</div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="text-[13px] text-[#666] mb-4">
                    合计 <span className="font-semibold text-[#333]">{totalQty}</span> 件 &nbsp;商品总金额：
                    <span className="text-[#e8831a] font-bold text-[16px]">¥{totalAmt.toFixed(2)}</span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <Link href="/portal/chanxiao-duijie/xiadan"
                      className="px-8 py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors">
                      立即下单
                    </Link>
                    <button onClick={() => setCartModal(true)}
                      className="flex items-center gap-2 px-6 py-2.5 border border-[#1a5fa8] text-[#1a5fa8] text-[14px] font-semibold rounded hover:bg-[#e8f4fd] transition-colors">
                      <ShoppingCart className="w-4 h-4" />加入购物车
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
                      <Phone className="w-4 h-4" />联系商家
                    </button>
                  </div>
                </div>

                {/* QR code */}
                <div className="w-[72px] shrink-0 text-center">
                  <div className="w-[68px] h-[68px] border border-[#dde3ec] rounded flex items-center justify-center bg-white">
                    <QrCode className="w-10 h-10 text-[#333]" />
                  </div>
                  <div className="text-[10px] text-[#999] mt-1">扫码查看</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 综合配套服务 ── */}
          <div className="bg-white border border-[#e8edf5] rounded mb-5">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#e8edf5] cursor-pointer" onClick={() => setServiceOpen(o => !o)}>
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-semibold text-[#1a1a2e]">综合配套服务</span>
                <span className="text-[12px] text-[#1a5fa8] bg-[#e8f4fd] px-2 py-0.5 rounded">本商品支持配套全链服务</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#e8831a]">
                <span>商品下单后应可选配</span>
                {serviceOpen ? <ChevronUp className="w-4 h-4 text-[#999]" /> : <ChevronDown className="w-4 h-4 text-[#999]" />}
              </div>
            </div>

            {serviceOpen && (
              <div className="p-4">
                <div className="bg-[#fffbe6] border border-[#f5d78e] rounded px-3 py-2 text-[12px] text-[#8a6a00] mb-3 flex items-center gap-1.5">
                  <span className="text-[#e8831a]">!</span>
                  先提交交易订单，系统将为您推荐适合的仓储、运输、加工服务，您可以继续选下单！
                </div>

                {/* Sub tabs */}
                <div className="flex gap-2 mb-3">
                  {(["single", "bundle"] as const).map(t => (
                    <button key={t} onClick={() => setServiceTab(t)}
                      className={`px-4 py-1.5 rounded text-[13px] border transition-colors ${serviceTab === t ? "bg-[#1a5fa8] text-white border-[#1a5fa8]" : "border-[#dde3ec] text-[#555] hover:border-[#1a5fa8]"}`}>
                      {t === "single" ? "单项服务" : "套餐服务"}
                    </button>
                  ))}
                </div>

                {serviceTab === "single" && (
                  <div className="space-y-4">
                    {/* 物流 */}
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-[13px] font-semibold text-[#333]">
                        <Truck className="w-4 h-4 text-[#1a5fa8]" />物流服务
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {SERVICES.logistics.map(s => <ServiceCard key={s.id} item={s} type="logistics" />)}
                      </div>
                    </div>
                    {/* 仓储 */}
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-[13px] font-semibold text-[#333]">
                        <Warehouse className="w-4 h-4 text-[#1a5fa8]" />仓储服务
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {SERVICES.warehouse.map(s => <ServiceCard key={s.id} item={s} type="warehouse" />)}
                      </div>
                    </div>
                    {/* 加工 */}
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-[13px] font-semibold text-[#333]">
                        <Factory className="w-4 h-4 text-[#1a5fa8]" />加工服务
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {SERVICES.processing.map(s => <ServiceCard key={s.id} item={s as any} type="processing" />)}
                      </div>
                    </div>
                  </div>
                )}

                {serviceTab === "bundle" && (
                  <div className="text-center py-8 text-[13px] text-[#999]">暂无套餐服务</div>
                )}
              </div>
            )}
          </div>

          {/* ── 商品详情 + 右侧店铺 ── */}
          <div className="flex gap-5">
            {/* 商品详情组图 */}
            <div className="flex-1 min-w-0 bg-white border border-[#e8edf5] rounded p-4">
              <h3 className="text-[14px] font-semibold text-[#333] mb-3 pb-2 border-b border-[#f0f3f8]">商品详情组图</h3>
              <div className="space-y-3">
                {DETAIL_IMAGES.map((src, i) => (
                  <div key={i} className="relative w-full rounded overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <Image src={src} alt={`详情图${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="mt-4 text-[13px] text-[#555] leading-relaxed">
                <p>海丰油占米，源自广东海丰的地标性农产品，是国家地理标志保护产品，承载着海丰千年天然原野的自然馈赠与历年农业传承。海丰地处南方，光照充足、雨量丰沛，肥沃土地与有机水稻种植双联——每一粒海丰米都凝聚了天地万物的滋养，从田间到餐桌，全程可溯源，品质有保障。</p>
              </div>
            </div>

            {/* 右侧推荐 */}
            <div className="w-[200px] shrink-0">
              <div className="bg-white border border-[#e8edf5] rounded p-3">
                <div className="text-[13px] font-semibold text-[#1a1a2e] mb-3 pb-2 border-b border-[#f0f3f8]">广东汪门拓类公司</div>
                <div className="text-[12px] text-[#666] mb-3">本店推荐</div>
                <div className="space-y-3">
                  {RELATED.map((r, i) => (
                    <Link key={i} href="#" className="flex gap-2 group">
                      <div className="relative w-14 h-14 rounded border border-[#e8edf5] overflow-hidden shrink-0">
                        <Image src={r.img} alt={r.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] text-[#333] group-hover:text-[#1a5fa8] line-clamp-2 leading-tight">{r.name}</div>
                        <div className="text-[12px] font-semibold text-[#e8831a] mt-1">¥{r.price}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <SiteFooter />

      {cartModal && <CartSuccessModal onClose={() => setCartModal(false)} onGoCart={() => router.push("/portal/cart")} />}
    </div>
  )
}
