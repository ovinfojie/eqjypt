"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  ChevronRight, MessageCircle, Check, X, Pencil, Plus,
  Truck, Warehouse, Factory,
} from "lucide-react"

/* ─── Types ─── */
interface SpecRow {
  id: string
  label: string
  price: number
  unit: string
  qty: number
  merchantDiscount: number
  platformDiscount: number
}

/* ─── Mock data ─── */
const BUYER = { name: "盒马超市采购部", no: "no.122438" }
const SELLER = { name: "汕头潮阳区社村合作农业发展有限公司", no: "no.122434" }

const PRODUCT = {
  img: "/images/products/simiao-rice.png",
  name: "广东特色海丰油占米",
  deliveryMethod: "卖家配送",
  pickupAddr: "广州市越秀区某某街道xx路xx号  王先生 1788900****",
  pickupNote: "（下单后显示联系电话）",
  settlement: "工行安心付",
  paymentRatio: "预付款 (10%)",
  tradeMode: "担保交易",
}

const INIT_SPECS: SpecRow[] = [
  { id: "s1", label: "5kg / 袋", price: 88,  unit: "袋", qty: 1000, merchantDiscount: 0, platformDiscount: 0 },
  { id: "s2", label: "10kg / 袋", price: 160, unit: "袋", qty: 1000, merchantDiscount: 0, platformDiscount: 0 },
]

const SERVICES = [
  {
    id: "l1", type: "logistics" as const,
    name: "广州市广百物流有限公司",
    tags: ["零拒绝", "专线直达", "当日达"],
    desc: "地点：广东省内；适用：半箱粮油、小批量农产品、样品；运力：零担拼车，最小接货 0.5 吨，最大单车载重 8 吨",
    price: "2.6 元/吨·天起",
  },
  {
    id: "w1", type: "warehouse" as const,
    name: "广东天起冷储物流有限公司",
    tags: ["常温仓", "冷仓", "防虫防霉", "政府储备"],
    desc: "地点：广东省汕头市某区xx路xx号（距您约110km）；适用：半箱粮油、生鲜农产品；容量：5,200吨/总15,000吨",
    price: "2.6 元/吨·天起",
  },
  {
    id: "p1", type: "processing" as const,
    name: "广州某某加工服务商",
    tags: ["精深加工", "平台认证", "日产500吨"],
    desc: "地点：广州市某区xx路xx号（距您约60km）；适用：稻谷、大米、糯米；设备：糙米加工生产线1套",
    price: "待报价",
  },
]

const SERVICE_ICONS = { logistics: Truck, warehouse: Warehouse, processing: Factory }

/* ─── 提示弹窗（订单提交成功 → 签合同 → 付款 → 下服务单） ─── */
type ModalStep = "submitted" | "paid"

function SuccessModal({ step, onClose, onAction1, onAction2 }: {
  step: ModalStep
  onClose: () => void
  onAction1: () => void
  onAction2: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-lg w-[340px] shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#e8edf5]">
          <h3 className="text-[15px] font-bold text-[#1a1a2e]">提示</h3>
          <button onClick={onClose}><X className="w-4 h-4 text-[#999]" /></button>
        </div>
        <div className="px-5 py-5 text-center">
          <div className="w-10 h-10 rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-3">
            <Check className="w-5 h-5 text-[#3a8c3f]" />
          </div>
          {step === "submitted" ? (
            <>
              <p className="text-[14px] font-semibold text-[#1a1a2e] mb-1">订单提交成功，请完成合同签订！</p>
            </>
          ) : (
            <>
              <p className="text-[14px] font-semibold text-[#1a1a2e] mb-1">付款成功，继续下服务单（仓储、物流、加工）</p>
            </>
          )}
        </div>
        <div className="flex gap-3 px-5 pb-5">
          <button onClick={onAction1} className="flex-1 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">
            {step === "submitted" ? "稍后签署" : "关闭"}
          </button>
          <button onClick={onAction2} className="flex-1 py-2 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded hover:bg-[#0d4a8a]">
            {step === "submitted" ? "签合同" : "下服务单"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function XiadanPage() {
  const router = useRouter()
  const [specs, setSpecs] = useState<SpecRow[]>(INIT_SPECS)
  const [planDate, setPlanDate] = useState("")
  const [addrSelected, setAddrSelected] = useState("广州市天河区珠江新城花城大道88号")
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [remark, setRemark] = useState("")
  const [modalStep, setModalStep] = useState<ModalStep | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const setQty = (id: string, val: number) => {
    setSpecs(prev => prev.map(s => s.id === id ? { ...s, qty: Math.max(0, val) } : s))
  }

  const productAmt = specs.reduce((s, r) => s + r.price * r.qty, 0)
  const merchantDiscountTotal = specs.reduce((s, r) => s + r.merchantDiscount, 0)
  const platformDiscountTotal = specs.reduce((s, r) => s + r.platformDiscount, 0)
  const deliveryFee = 10
  const totalAmt = productAmt - merchantDiscountTotal - platformDiscountTotal + deliveryFee
  const totalQty = specs.reduce((s, r) => s + r.qty, 0)
  const totalKind = specs.filter(r => r.qty > 0).length

  const handleSubmit = () => {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setModalStep("submitted")
    }, 600)
  }

  const handleModalAction2 = () => {
    if (modalStep === "submitted") {
      // "签合同" → simulate signing → show paid modal
      setModalStep("paid")
    } else {
      // "下服务单"
      router.push("/portal/quanchanyilian/fuwudan")
    }
  }

  const handleModalClose = () => setModalStep(null)

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e8edf5]">
        <div className="max-w-[1200px] mx-auto px-6 py-2.5 flex items-center gap-1.5 text-[12px] text-[#888]">
          <Link href="/portal" className="hover:text-[#1a5fa8]">首页</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/portal/chanxiao-duijie" className="hover:text-[#1a5fa8]">产销对接</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/portal/chanxiao-duijie/xiaoshou-detail" className="hover:text-[#1a5fa8]">商品详情</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#333]">提交订单</span>
        </div>
      </div>

      <main className="flex-1">
        <div className="max-w-[1000px] mx-auto px-6 py-5">

          {/* ── 全链服务配套 ── */}
          <div className="bg-white border border-[#e8edf5] rounded mb-4">
            <div className="px-4 py-3 border-b border-[#e8edf5] flex items-center justify-between">
              <span className="text-[13px] font-semibold text-[#1a1a2e]">本商品支持配套全链服务</span>
              <span className="text-[12px] text-[#e8831a]">商品下单完成后应可选配</span>
            </div>
            <div className="px-4 py-3 bg-[#fffbe6] border-b border-[#f5d78e]">
              <span className="text-[12px] text-[#8a6a00]">! 先提交交易订单，系统将为您推荐适合的仓储、运输、加工服务，您可以继续选下单！</span>
            </div>
            <div className="p-4 grid grid-cols-3 gap-3">
              {SERVICES.map(svc => {
                const Icon = SERVICE_ICONS[svc.type]
                return (
                  <div key={svc.id} className="border border-[#dde3ec] rounded p-3">
                    <div className="flex items-start gap-1.5 mb-1">
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-[#1a5fa8] flex items-center justify-center mt-0.5 shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1a5fa8]" />
                      </div>
                      <div>
                        <span className="text-[12px] font-semibold text-[#1a1a2e]">{svc.name}</span>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {svc.tags.map(t => (
                            <span key={t} className="px-1 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[10px] rounded">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] text-[#666] leading-relaxed">{svc.desc}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── 提交订单表单 ── */}
          <div className="bg-white border border-[#e8edf5] rounded mb-4">
            <div className="px-4 py-3 border-b border-[#e8edf5]">
              <h2 className="text-[15px] font-bold text-[#1a1a2e]">提交订单</h2>
            </div>

            {/* Buyer / Seller */}
            <div className="px-4 py-3 flex items-center gap-4 text-[13px] border-b border-[#f0f3f8] bg-[#fafbfc]">
              <span className="text-[#999]">买家：</span>
              <span className="font-semibold text-[#1a1a2e]">{BUYER.name}</span>
              <span className="text-[#bbb] text-[11px]">（{BUYER.no}）</span>
              <span className="mx-2 text-[#dde3ec]">|</span>
              <span className="text-[#999]">商家：</span>
              <span className="font-semibold text-[#1a1a2e]">{SELLER.name}</span>
              <span className="text-[#bbb] text-[11px]">（{SELLER.no}）</span>
              <button className="ml-2 flex items-center gap-1 px-3 py-1 border border-[#1a5fa8] text-[#1a5fa8] text-[12px] rounded hover:bg-[#e8f4fd]">
                <MessageCircle className="w-3 h-3" />联系商家
              </button>
            </div>

            {/* Product summary */}
            <div className="px-4 py-3 border-b border-[#f0f3f8]">
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 rounded border border-[#e8edf5] overflow-hidden shrink-0">
                  <Image src={PRODUCT.img} alt={PRODUCT.name} fill className="object-cover" />
                </div>
                <div className="flex-1 grid grid-cols-3 gap-x-8 gap-y-1 text-[12px]">
                  <div><span className="text-[#999]">配送方式：</span><span className="text-[#333]">{PRODUCT.deliveryMethod}</span></div>
                  <div className="col-span-2"><span className="text-[#999]">自提点：</span>
                    <span className="text-[#333]">{PRODUCT.pickupAddr}</span>
                    <span className="text-[#999] ml-1">{PRODUCT.pickupNote}</span>
                  </div>
                  <div><span className="text-[#999]">结算渠道：</span><span className="text-[#333]">{PRODUCT.settlement}</span></div>
                  <div><span className="text-[#999]">结算方式：</span><span className="text-[#333]">{PRODUCT.paymentRatio}</span></div>
                  <div><span className="text-[#999]">交易模式：</span><span className="text-[#333]">{PRODUCT.tradeMode}</span></div>
                </div>
              </div>
            </div>

            {/* Spec table */}
            <div className="px-4 py-3 border-b border-[#f0f3f8]">
              <div className="border border-[#e8edf5] rounded overflow-hidden">
                <div className="grid text-[12px] bg-[#f5f7fa] font-medium text-[#555]" style={{ gridTemplateColumns: "1fr 80px 140px 100px 100px 120px 80px" }}>
                  {["规格", "单价(元)", "下单数量", "商家优惠(元)", "平台优惠(元)", "预估总价(元)", "预估总重量(吨)"].map(h => (
                    <div key={h} className="px-3 py-2 text-center">{h}</div>
                  ))}
                </div>
                {specs.map(row => (
                  <div key={row.id} className="grid items-center border-t border-[#f0f3f8] text-[12px]"
                    style={{ gridTemplateColumns: "1fr 80px 140px 100px 100px 120px 80px" }}>
                    <div className="px-3 py-3 text-[#333] font-medium">{row.label}</div>
                    <div className="px-3 py-3 text-center text-[#333]">{row.price}</div>
                    <div className="px-3 py-3 flex items-center justify-center gap-1">
                      <button onClick={() => setQty(row.id, row.qty - 1)}
                        className="w-6 h-6 border border-[#dde3ec] rounded flex items-center justify-center text-[#555] hover:border-[#1a5fa8]">−</button>
                      <input type="number" value={row.qty} onChange={e => setQty(row.id, Number(e.target.value))}
                        className="w-14 border border-[#dde3ec] rounded text-center text-[12px] py-0.5 focus:outline-none focus:border-[#1a5fa8]" />
                      <button onClick={() => setQty(row.id, row.qty + 1)}
                        className="w-6 h-6 border border-[#dde3ec] rounded flex items-center justify-center text-[#555] hover:border-[#1a5fa8]">+</button>
                      <span className="text-[#999] ml-0.5">{row.unit}</span>
                    </div>
                    <div className="px-3 py-3 text-center text-[#333]">{row.merchantDiscount}</div>
                    <div className="px-3 py-3 text-center text-[#333]">{row.platformDiscount}</div>
                    <div className="px-3 py-3 text-center text-[#e8831a] font-semibold">{(row.price * row.qty).toFixed(2)}</div>
                    <div className="px-3 py-3 text-center text-[#666]">{(row.price * row.qty / 2000).toFixed(1)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fields */}
            <div className="px-4 py-3 grid grid-cols-2 gap-x-8 gap-y-4 border-b border-[#f0f3f8]">
              <div className="flex items-center gap-3">
                <label className="text-[13px] text-[#555] shrink-0 w-[80px]"><span className="text-red-500">*</span>计划收货时间</label>
                <input type="text" value={planDate} onChange={e => setPlanDate(e.target.value)}
                  placeholder="开始时间 - 结束时间"
                  className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-[13px] text-[#555] shrink-0 w-[60px]"><span className="text-red-500">*</span>收货信息</label>
                <div className="flex-1 flex gap-2">
                  <select value={addrSelected} onChange={e => setAddrSelected(e.target.value)}
                    className="flex-1 border border-[#dde3ec] rounded px-2 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]">
                    <option value="广州市天河区珠江新城花城大道88号">广州市天河区珠江新城花城大道88号</option>
                    <option value="上海市浦东新区市镇区2888号">上海市浦东新区市镇区2888号</option>
                  </select>
                  <button className="flex items-center gap-1 text-[#1a5fa8] text-[12px] hover:underline shrink-0">
                    <Pencil className="w-3 h-3" />编辑
                  </button>
                  <button className="flex items-center gap-1 text-[#1a5fa8] text-[12px] hover:underline shrink-0">
                    <Plus className="w-3 h-3" />新增
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-[13px] text-[#555] shrink-0 w-[80px]"><span className="text-red-500">*</span>联系人姓名</label>
                <input value={contactName} onChange={e => setContactName(e.target.value)}
                  placeholder="请输入"
                  className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-[13px] text-[#555] shrink-0 w-[60px]"><span className="text-red-500">*</span>联系人电话</label>
                <input value={contactPhone} onChange={e => setContactPhone(e.target.value)}
                  placeholder="请输入手机号码"
                  className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              </div>
              <div className="col-span-2 flex items-start gap-3">
                <label className="text-[13px] text-[#555] shrink-0 w-[80px] pt-1.5">给商家留言</label>
                <textarea value={remark} onChange={e => setRemark(e.target.value)}
                  rows={3} placeholder="请输入"
                  className="flex-1 border border-[#dde3ec] rounded px-3 py-2 text-[13px] resize-none focus:outline-none focus:border-[#1a5fa8]" />
              </div>
            </div>

            {/* Total summary */}
            <div className="px-4 py-4 bg-[#fafbfc]">
              <div className="text-[13px] font-semibold text-[#1a1a2e] mb-3">总计：</div>
              <div className="grid grid-cols-2 gap-y-1.5 text-[12px] text-[#555] mb-2">
                <div>商品种数：<span className="font-semibold text-[#333]">{totalKind} 种</span> &nbsp; 数量总计：<span className="font-semibold text-[#333]">{totalQty} 件</span></div>
                <div className="text-right">
                  <div>商品总金额：<span className="font-semibold text-[#1a1a2e]">{productAmt.toFixed(2)}元</span></div>
                  <div>商家优惠汇计：<span className="text-[#3a8c3f]">{merchantDiscountTotal.toFixed(2)}元</span></div>
                  <div>平台优惠：<span className="text-[#3a8c3f]">0.00元</span></div>
                  <div>运费总计：<span className="text-[#1a1a2e] font-semibold">{deliveryFee.toFixed(2)}元</span></div>
                  <div className="text-[13px] font-semibold">订单总金额：<span className="text-[#1a1a2e]">{totalAmt.toFixed(2)}元</span></div>
                </div>
              </div>
              <div className="text-[12px] text-[#e04040] mt-1">
                本次商品总金额 {productAmt.toFixed(2)}元，需支付预付款10%，应付预款
                <span className="font-semibold"> {(productAmt * 0.1).toFixed(2)}元 </span>
                + 应付运费 {deliveryFee.toFixed(2)}元 =
                <span className="font-bold text-[#e04040]"> {(productAmt * 0.1 + deliveryFee).toFixed(2)}元</span>
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="sticky bottom-0 bg-white border border-[#e8edf5] rounded px-6 py-3 flex items-center justify-end gap-6 shadow-lg">
            <span className="text-[13px] text-[#999]">
              商家优惠 <span className="text-[#3a8c3f]">0 元</span>，平台优惠 <span className="text-[#3a8c3f]">0 元</span>
            </span>
            <span className="text-[14px] text-[#555]">
              应付总金额：<span className="text-[#e04040] text-[22px] font-bold">¥{(productAmt * 0.1 + deliveryFee).toFixed(2)}</span>
            </span>
            <button onClick={handleSubmit} disabled={submitting}
              className="px-8 py-2.5 bg-[#1a5fa8] text-white text-[15px] font-bold rounded hover:bg-[#0d4a8a] transition-colors disabled:opacity-60">
              {submitting ? "提交中..." : "提交订单"}
            </button>
          </div>

        </div>
      </main>

      <SiteFooter />

      {/* Modals */}
      {modalStep && (
        <SuccessModal
          step={modalStep}
          onClose={handleModalClose}
          onAction1={() => { if (modalStep === "submitted") { setModalStep("paid") } else { handleModalClose() } }}
          onAction2={handleModalAction2}
        />
      )}
    </div>
  )
}
