"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ChevronRight, MapPin, Plus, Truck, FileText, MessageSquare, ChevronDown } from "lucide-react"

interface Address {
  id: string
  name: string
  phone: string
  tag: string
  province: string
  city: string
  detail: string
  isDefault: boolean
}

interface OrderItem {
  id: string
  name: string
  spec: string
  unit: string
  price: number
  qty: number
  img: string
  supplier: string
}

const addresses: Address[] = [
  { id: "a1", name: "张采购", phone: "138****8888", tag: "公司", province: "广东省", city: "广州市天河区", detail: "珠江新城花城大道88号采购中心301室", isDefault: true },
  { id: "a2", name: "李经理", phone: "139****9999", tag: "仓库", province: "广东省", city: "广州市番禺区", detail: "大石镇石岗路99号冷链仓储中心", isDefault: false },
]

const orderItems: OrderItem[] = [
  { id: "1", name: "台山丝苗米（精装）", spec: "25kg/袋", unit: "袋", price: 128.00, qty: 10, img: "/images/products/simiao-rice.png", supplier: "广东供销农产品股份有限公司" },
  { id: "2", name: "某某优选鸡蛋", spec: "30枚/盒", unit: "盒", price: 31.12, qty: 5, img: "/images/products/eggs.png", supplier: "广东供销农产品股份有限公司" },
  { id: "4", name: "妃子笑荔枝（产地直供）", spec: "5kg/箱", unit: "箱", price: 98.00, qty: 8, img: "/images/products/sanhuali.png", supplier: "茂名荔枝产地直供中心" },
  { id: "5", name: "梅州金柚（大果）", spec: "3kg/个", unit: "个", price: 45.00, qty: 12, img: "/images/products/pomelo.png", supplier: "茂名荔枝产地直供中心" },
]

const deliveryOptions = [
  { id: "d1", label: "卖家配送", desc: "由供应商统一配送，预计3-5个工作日", price: 0 },
  { id: "d2", label: "买家自提", desc: "凭提货码到指定仓库自取，需提前预约", price: -20 },
  { id: "d3", label: "平台冷链专送", desc: "全程冷链配送，适合生鲜产品，次日达", price: 80 },
]

const invoiceTypes = ["不需要发票", "增值税普通发票", "增值税专用发票"]
const paymentMethods = [
  { id: "p1", label: "银行转账", desc: "对公转账，需上传转账凭证" },
  { id: "p2", label: "平台担保付款", desc: "收货验货后确认放款，资金安全" },
  { id: "p3", label: "月结授信", desc: "需开通信用额度，按月统一结算" },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [selectedAddr, setSelectedAddr] = useState("a1")
  const [showAddrPanel, setShowAddrPanel] = useState(false)
  const [selectedDelivery, setSelectedDelivery] = useState("d1")
  const [selectedPayment, setSelectedPayment] = useState("p2")
  const [invoiceType, setInvoiceType] = useState("增值税专用发票")
  const [invoiceTitle, setInvoiceTitle] = useState("")
  const [taxNo, setTaxNo] = useState("")
  const [remark, setRemark] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const addr = addresses.find(a => a.id === selectedAddr)!
  const delivery = deliveryOptions.find(d => d.id === selectedDelivery)!
  const subtotal = orderItems.reduce((s, i) => s + i.price * i.qty, 0)
  const deliveryFee = delivery.price
  const total = subtotal + deliveryFee

  const handleSubmit = () => {
    setSubmitting(true)
    setTimeout(() => {
      router.push("/portal/order-success?no=PO2026080100123")
    }, 800)
  }

  // group by supplier
  const supplierGroups = orderItems.reduce<Record<string, OrderItem[]>>((acc, item) => {
    if (!acc[item.supplier]) acc[item.supplier] = []
    acc[item.supplier].push(item)
    return acc
  }, {})

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-[1100px] mx-auto px-6 py-6">

          {/* 面包屑 + 步骤条 */}
          <div className="flex items-center gap-1.5 text-[13px] text-[#6b7c93] mb-5">
            <Link href="/portal" className="hover:text-[#1a5fa8]">首页</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/portal/cart" className="hover:text-[#1a5fa8]">采购车</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1a1a2e]">确认订单</span>
          </div>

          {/* 步骤指示 */}
          <div className="flex items-center justify-center gap-0 mb-8">
            {["填写收货信息", "确认订单", "提交成功"].map((step, i) => (
              <div key={step} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold border-2 ${i <= 1 ? "bg-[#1a5fa8] border-[#1a5fa8] text-white" : "bg-white border-[#dde3ec] text-[#6b7c93]"}`}>
                    {i + 1}
                  </div>
                  <span className={`text-[13px] font-medium ${i <= 1 ? "text-[#1a5fa8]" : "text-[#6b7c93]"}`}>{step}</span>
                </div>
                {i < 2 && <div className={`w-16 h-0.5 mx-3 ${i < 1 ? "bg-[#1a5fa8]" : "bg-[#dde3ec]"}`} />}
              </div>
            ))}
          </div>

          <div className="flex gap-5 items-start">
            {/* 左主区域 */}
            <div className="flex-1 min-w-0 space-y-4">

              {/* 收货地址 */}
              <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-[#1a5fa8]" />
                  <h2 className="text-[15px] font-bold text-[#1a1a2e]">收货地址</h2>
                </div>
                <div className="space-y-3">
                  {addresses.map(a => (
                    <label key={a.id} className={`flex items-start gap-3 p-4 rounded border cursor-pointer transition-colors ${selectedAddr === a.id ? "border-[#1a5fa8] bg-[#e8f4fd]" : "border-[#e8edf5] hover:border-[#1a5fa8]/40"}`}>
                      <input type="radio" name="addr" value={a.id} checked={selectedAddr === a.id} onChange={() => setSelectedAddr(a.id)} className="mt-0.5 accent-[#1a5fa8]" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[14px] font-semibold text-[#1a1a2e]">{a.name}</span>
                          <span className="text-[12px] text-[#6b7c93]">{a.phone}</span>
                          <span className="text-[11px] px-1.5 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] border border-[#1a5fa8]/20 rounded">{a.tag}</span>
                          {a.isDefault && <span className="text-[11px] px-1.5 py-0.5 bg-[#e8f5e9] text-[#3a8c3f] border border-[#3a8c3f]/20 rounded">默认</span>}
                        </div>
                        <div className="text-[13px] text-[#555]">{a.province} {a.city} {a.detail}</div>
                      </div>
                    </label>
                  ))}
                  <button className="flex items-center gap-1.5 text-[13px] text-[#1a5fa8] hover:underline">
                    <Plus className="w-3.5 h-3.5" />新增收货地址
                  </button>
                </div>
              </div>

              {/* 配送方式 */}
              <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Truck className="w-4 h-4 text-[#1a5fa8]" />
                  <h2 className="text-[15px] font-bold text-[#1a1a2e]">配送方式</h2>
                </div>
                <div className="space-y-2">
                  {deliveryOptions.map(d => (
                    <label key={d.id} className={`flex items-center gap-3 p-3.5 rounded border cursor-pointer transition-colors ${selectedDelivery === d.id ? "border-[#1a5fa8] bg-[#e8f4fd]" : "border-[#e8edf5] hover:border-[#1a5fa8]/40"}`}>
                      <input type="radio" name="delivery" value={d.id} checked={selectedDelivery === d.id} onChange={() => setSelectedDelivery(d.id)} className="accent-[#1a5fa8]" />
                      <div className="flex-1">
                        <span className="text-[14px] font-medium text-[#1a1a2e]">{d.label}</span>
                        <span className="text-[13px] text-[#6b7c93] ml-3">{d.desc}</span>
                      </div>
                      <span className={`text-[14px] font-semibold ${d.price > 0 ? "text-[#e8831a]" : d.price < 0 ? "text-[#3a8c3f]" : "text-[#3a8c3f]"}`}>
                        {d.price > 0 ? `+¥${d.price}` : d.price < 0 ? `-¥${Math.abs(d.price)}` : "免费"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 商品清单（按供应商分组） */}
              <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
                <h2 className="text-[15px] font-bold text-[#1a1a2e] mb-4">商品清单</h2>
                {Object.entries(supplierGroups).map(([supplier, items]) => (
                  <div key={supplier} className="mb-5 last:mb-0">
                    <div className="text-[13px] font-semibold text-[#1a5fa8] mb-3 pb-2 border-b border-[#f0f4f8]">{supplier}</div>
                    <div className="space-y-3">
                      {items.map(item => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="relative w-14 h-14 rounded border border-[#e8edf5] overflow-hidden shrink-0">
                            <Image src={item.img} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-medium text-[#1a1a2e] line-clamp-1">{item.name}</div>
                            <div className="text-[12px] text-[#6b7c93]">规格：{item.spec} × {item.qty}{item.unit}</div>
                          </div>
                          <div className="text-[14px] font-semibold text-[#e8831a] shrink-0">
                            ¥{(item.price * item.qty).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* 备注 */}
                    <div className="mt-3 flex items-center gap-2">
                      <MessageSquare className="w-3.5 h-3.5 text-[#6b7c93] shrink-0" />
                      <input
                        placeholder={`给 ${supplier} 留言（选填）`}
                        className="flex-1 text-[13px] border border-[#e8edf5] rounded px-3 py-1.5 focus:outline-none focus:border-[#1a5fa8] placeholder:text-[#aaa]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* 发票信息 */}
              <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4 text-[#1a5fa8]" />
                  <h2 className="text-[15px] font-bold text-[#1a1a2e]">发票信息</h2>
                </div>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  {invoiceTypes.map(t => (
                    <label key={t} className={`flex items-center gap-1.5 px-3 py-2 rounded border cursor-pointer text-[13px] transition-colors ${invoiceType === t ? "border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8] font-medium" : "border-[#e8edf5] text-[#555] hover:border-[#1a5fa8]/40"}`}>
                      <input type="radio" name="invoice" value={t} checked={invoiceType === t} onChange={() => setInvoiceType(t)} className="accent-[#1a5fa8]" />
                      {t}
                    </label>
                  ))}
                </div>
                {invoiceType !== "不需要发票" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[13px] text-[#6b7c93] mb-1">发票抬头</label>
                      <input value={invoiceTitle} onChange={e => setInvoiceTitle(e.target.value)} placeholder="请输入单位名称" className="w-full border border-[#e8edf5] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-[#6b7c93] mb-1">纳税人识别号</label>
                      <input value={taxNo} onChange={e => setTaxNo(e.target.value)} placeholder="请输入税号" className="w-full border border-[#e8edf5] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                    </div>
                  </div>
                )}
              </div>

              {/* 支付方式 */}
              <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
                <h2 className="text-[15px] font-bold text-[#1a1a2e] mb-4">支付方式</h2>
                <div className="space-y-2">
                  {paymentMethods.map(pm => (
                    <label key={pm.id} className={`flex items-center gap-3 p-3.5 rounded border cursor-pointer transition-colors ${selectedPayment === pm.id ? "border-[#1a5fa8] bg-[#e8f4fd]" : "border-[#e8edf5] hover:border-[#1a5fa8]/40"}`}>
                      <input type="radio" name="payment" value={pm.id} checked={selectedPayment === pm.id} onChange={() => setSelectedPayment(pm.id)} className="accent-[#1a5fa8]" />
                      <div>
                        <span className="text-[14px] font-medium text-[#1a1a2e]">{pm.label}</span>
                        <span className="text-[13px] text-[#6b7c93] ml-3">{pm.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 备注 */}
              <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
                <h2 className="text-[15px] font-bold text-[#1a1a2e] mb-3">订单备注</h2>
                <textarea
                  value={remark}
                  onChange={e => setRemark(e.target.value)}
                  placeholder="如有特殊要求请在此说明（选填）"
                  rows={3}
                  className="w-full border border-[#e8edf5] rounded px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none placeholder:text-[#aaa]"
                />
              </div>
            </div>

            {/* 右侧价格汇总 */}
            <div className="w-[280px] shrink-0 sticky top-[80px]">
              <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
                <h3 className="text-[15px] font-bold text-[#1a1a2e] mb-4 pb-3 border-b border-[#f0f4f8]">费用明细</h3>
                <div className="space-y-2.5 mb-4 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-[#6b7c93]">商品金额</span>
                    <span className="text-[#1a1a2e] font-medium">¥{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b7c93]">配送费用</span>
                    <span className={deliveryFee === 0 ? "text-[#3a8c3f] font-medium" : "text-[#1a1a2e] font-medium"}>
                      {deliveryFee === 0 ? "免费" : deliveryFee > 0 ? `+¥${deliveryFee}` : `-¥${Math.abs(deliveryFee)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b7c93]">商品数量</span>
                    <span className="text-[#1a1a2e]">{orderItems.reduce((s, i) => s + i.qty, 0)} 件</span>
                  </div>
                </div>
                <div className="border-t border-[#f0f4f8] pt-3 mb-5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[14px] font-semibold text-[#1a1a2e]">应付总额</span>
                    <span className="text-[24px] font-bold text-[#e8831a]">¥{total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full py-3 bg-[#e8831a] text-white text-[15px] font-bold rounded hover:bg-[#d4741a] transition-colors disabled:opacity-70"
                >
                  {submitting ? "提交中..." : "确认提交采购申请"}
                </button>
                <p className="text-[12px] text-[#6b7c93] text-center mt-2 leading-relaxed">
                  提交后供应商将确认库存，<br />确认后进入付款流程
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
