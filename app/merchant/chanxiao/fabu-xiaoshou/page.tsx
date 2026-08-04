"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, CheckCircle, Plus, Trash2, Search, X, Info, Upload, Package, Boxes, Star } from "lucide-react"

/* ───── Types ───── */
type SupplyType = "single" | "combo"
type PriceMode = "fixed" | "inquiry" | "ladder"

interface LadderTier { minQty: string; maxQty: string; price: string }
interface CustomPrice { id: string; customer: string; price: string }

interface SkuCard {
  id: string
  marketSkuCode: string
  masterSkuCode: string
  skuName: string
  skuDesc: string
  estimatedQty: string
  minBatch: string
  salePrice: string
  ladderTiers: LadderTier[]
  enableCustomPrice: boolean
  customPrices: CustomPrice[]
}

interface ArchiveSku { id: string; code: string; name: string; desc: string }
interface ArchiveProduct {
  id: string
  name: string
  category: string
  spuCode: string
  skus: ArchiveSku[]
}

/* 套餐组合项：主商品(必选) 或 可选搭配商品 */
interface ComboItem {
  id: string
  required: boolean
  productId: string
  productName: string
  category: string
  skuId: string
  qty: string
  price: string // 主商品=套餐基础价；可选=加购价
}

const newTiers = (): LadderTier[] => [
  { minQty: "", maxQty: "", price: "" },
  { minQty: "", maxQty: "不限", price: "" },
]

const uid = () => Math.random().toString(36).slice(2, 9)

/* ───── Mock 商品基础档案（均为单商品，套餐由单商品组合而成） ───── */
const ARCHIVE_PRODUCTS: ArchiveProduct[] = [
  {
    id: "p1", name: "丰两优大米", category: "粮油", spuCode: "P626342237328",
    skus: [
      { id: "s1", code: "zsj-0213288", name: "5kg / 袋", desc: "袋装" },
      { id: "s2", code: "zsj-0213289", name: "25kg / 袋", desc: "袋装" },
    ],
  },
  { id: "p2", name: "有机菜心", category: "蔬菜", spuCode: "P484876690560",
    skus: [{ id: "s3", code: "zsj-0213300", name: "5kg / 箱", desc: "冷藏" }] },
  { id: "p3", name: "粤西妃子笑荔枝", category: "水果", spuCode: "P626342237330",
    skus: [
      { id: "s4", code: "zsj-0213310", name: "2.5kg / 盒", desc: "礼盒装" },
      { id: "s4b", code: "zsj-0213311", name: "5kg / 箱", desc: "泡沫箱" },
    ] },
  { id: "p4", name: "桂味荔枝", category: "水果", spuCode: "P626342237331",
    skus: [{ id: "s7", code: "zsj-0213340", name: "1.5kg / 盒", desc: "礼盒装" }] },
  { id: "p5", name: "沙糖桔", category: "水果", spuCode: "P626342237332",
    skus: [{ id: "s8", code: "zsj-0213350", name: "2kg / 袋", desc: "袋装" }] },
  { id: "p6", name: "南雄玉米油", category: "粮油", spuCode: "P626342237333",
    skus: [{ id: "s9", code: "zsj-0213360", name: "5L / 桶", desc: "桶装" }] },
]

const categories = ["粮油", "蔬菜", "水果", "畜禽", "水产", "其他"]
const tradeModes = ["担保交易", "直接交易"]
const settlementOptions = ["建行龙存管", "工行安心付", "农行存管", "线下结算"]
const deliveryOptions = ["卖家配送", "买家自提", "无需物流"]
const invoiceOptions = ["增值税专用发票", "增值税普通发票", "不提供发票"]
const customerGroups = ["核心客户", "普通客户", "经销商渠道", "商超渠道", "新供销天润粮油", "湛江天润粮油"]

const num = (v: string) => { const n = Number.parseFloat(v); return Number.isFinite(n) ? n : 0 }

export default function FabuXiaoshouPage() {
  const [submitted, setSubmitted] = useState(false)

  /* 供应类型 单品/套餐 */
  const [supplyType, setSupplyType] = useState<SupplyType>("single")

  /* 商品选择器 */
  const [showPicker, setShowPicker] = useState(false)
  const [pickerSearch, setPickerSearch] = useState("")
  const [pickerCategory, setPickerCategory] = useState("")
  const [pickerSelected, setPickerSelected] = useState<string | null>(null)
  const [pickerTarget, setPickerTarget] = useState<"single" | "combo-main" | "combo-optional">("single")

  /* 单品：选中商品 + 定价 */
  const [selectedProduct, setSelectedProduct] = useState<ArchiveProduct | null>(null)
  const [priceMode, setPriceMode] = useState<PriceMode>("fixed")
  const [inquiryIsMarket, setInquiryIsMarket] = useState(true)
  const [skus, setSkus] = useState<SkuCard[]>([])

  /* 套餐：主商品 + 可选搭配 */
  const [comboMain, setComboMain] = useState<ComboItem | null>(null)
  const [comboOptionals, setComboOptionals] = useState<ComboItem[]>([])

  /* 基本信息 */
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [validUntil, setValidUntil] = useState("")
  const [deliveryCycle, setDeliveryCycle] = useState("")
  const [originArea, setOriginArea] = useState("")
  const [shipFrom, setShipFrom] = useState("")

  /* 交易条款 */
  const [depositRatio, setDepositRatio] = useState("")
  const [tradeMode, setTradeMode] = useState(tradeModes[0])
  const [deliveryMethods, setDeliveryMethods] = useState<string[]>(["卖家配送"])
  const [settlements, setSettlements] = useState<string[]>(["建行龙存管"])
  const [freightMode, setFreightMode] = useState("卖家承担")
  const [invoice, setInvoice] = useState(invoiceOptions[0])

  /* 可见/交易范围 */
  const [visibility, setVisibility] = useState("all")

  /* 联系人 */
  const [contact, setContact] = useState("")
  const [phone, setPhone] = useState("")
  const [dept, setDept] = useState("")

  /* helpers */
  const toggleArr = (arr: string[], v: string, setter: (a: string[]) => void) =>
    setter(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v])

  const filteredArchive = ARCHIVE_PRODUCTS.filter(p =>
    (!pickerCategory || p.category === pickerCategory) &&
    (!pickerSearch || p.name.includes(pickerSearch) || p.spuCode.includes(pickerSearch))
  )

  function openPicker(target: "single" | "combo-main" | "combo-optional") {
    setPickerTarget(target)
    setPickerSelected(null)
    setPickerSearch("")
    if (target === "single") { setSelectedProduct(null); setSkus([]) }
    setShowPicker(true)
  }

  function confirmPicker() {
    const p = ARCHIVE_PRODUCTS.find(x => x.id === pickerSelected)
    if (!p) return
    if (pickerTarget === "single") {
      setSelectedProduct(p)
      setSkus(p.skus.map(s => ({
        id: s.id, marketSkuCode: `sj-${p.spuCode.slice(-6)}-${s.code.slice(-4)}`, masterSkuCode: s.code,
        skuName: s.name, skuDesc: s.desc, estimatedQty: "", minBatch: "", salePrice: "",
        ladderTiers: newTiers(), enableCustomPrice: false, customPrices: [],
      })))
    } else {
      const item: ComboItem = {
        id: uid(), required: pickerTarget === "combo-main",
        productId: p.id, productName: p.name, category: p.category,
        skuId: p.skus[0].id, qty: "1", price: "",
      }
      if (pickerTarget === "combo-main") setComboMain(item)
      else setComboOptionals(prev => [...prev, item])
    }
    setShowPicker(false)
    setPickerSelected(null)
    setPickerSearch("")
  }

  /* 单品 SKU 更新 */
  const updateSku = (id: string, patch: Partial<SkuCard>) =>
    setSkus(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s))
  const updateTier = (skuId: string, idx: number, key: keyof LadderTier, v: string) =>
    setSkus(prev => prev.map(s => s.id === skuId
      ? { ...s, ladderTiers: s.ladderTiers.map((t, i) => i === idx ? { ...t, [key]: v } : t) } : s))
  const addTier = (skuId: string) =>
    setSkus(prev => prev.map(s => s.id === skuId
      ? { ...s, ladderTiers: [...s.ladderTiers.slice(0, -1), { minQty: "", maxQty: "", price: "" }, { minQty: "", maxQty: "不限", price: "" }] } : s))
  const removeTier = (skuId: string, idx: number) =>
    setSkus(prev => prev.map(s => s.id === skuId
      ? { ...s, ladderTiers: s.ladderTiers.filter((_, i) => i !== idx) } : s))

  /* 一客一价 */
  const addCustomPrice = (skuId: string) =>
    setSkus(prev => prev.map(s => s.id === skuId
      ? { ...s, customPrices: [...s.customPrices, { id: uid(), customer: "", price: "" }] } : s))
  const updateCustomPrice = (skuId: string, cpId: string, patch: Partial<CustomPrice>) =>
    setSkus(prev => prev.map(s => s.id === skuId
      ? { ...s, customPrices: s.customPrices.map(cp => cp.id === cpId ? { ...cp, ...patch } : cp) } : s))
  const removeCustomPrice = (skuId: string, cpId: string) =>
    setSkus(prev => prev.map(s => s.id === skuId
      ? { ...s, customPrices: s.customPrices.filter(cp => cp.id !== cpId) } : s))

  /* 套餐组合项更新 */
  const updateCombo = (id: string, patch: Partial<ComboItem>) => {
    if (comboMain?.id === id) { setComboMain({ ...comboMain, ...patch }); return }
    setComboOptionals(prev => prev.map(c => c.id === id ? { ...c, ...patch } : c))
  }
  const removeOptional = (id: string) => setComboOptionals(prev => prev.filter(c => c.id !== id))
  const skusOf = (productId: string) => ARCHIVE_PRODUCTS.find(p => p.id === productId)?.skus ?? []
  const skuNameOf = (productId: string, skuId: string) => skusOf(productId).find(s => s.id === skuId)?.name ?? ""

  const basePrice = num(comboMain?.price ?? "")
  const optionalSum = comboOptionals.reduce((sum, c) => sum + num(c.price), 0)
  const fullComboPrice = basePrice + optionalSum

  const inputCls = "w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]"
  const labelCls = "block text-[13px] text-[#555] mb-1.5"
  const sectionTitle = "text-[14px] font-semibold text-[#333] mb-4 pb-2 border-b border-[#f0f2f5]"

  if (submitted) {
    return (
      <div className="max-w-[560px] mx-auto mt-16 bg-white rounded-xl border border-[#e8edf5] p-10 text-center">
        <CheckCircle className="w-14 h-14 text-[#3a8c3f] mx-auto mb-4" />
        <div className="text-[20px] font-bold text-[#333] mb-2">供应信息发布成功</div>
        <div className="text-[14px] text-[#888] mb-8">您的供应信息已提交平台审核，审核通过后买方可在产销对接大厅查看并询价。</div>
        <div className="flex gap-3 justify-center">
          <Link href="/merchant/chanxiao/supply-list" className="px-6 py-2.5 bg-[#3a8c3f] text-white text-[13px] rounded-lg hover:bg-[#2d6e32] transition-colors">
            查看供应信息
          </Link>
          <Link href="/portal/chanxiao-duijie" className="px-6 py-2.5 border border-[#dde3ec] text-[#555] text-[13px] rounded-lg hover:bg-[#f5f7fa] transition-colors">
            前往产销对接大厅
          </Link>
        </div>
      </div>
    )
  }

  const pickerTitle = pickerTarget === "combo-main" ? "选择主商品" : pickerTarget === "combo-optional" ? "选择可选搭配商品" : "选择商品"

  return (
    <div className="max-w-[900px]">
      <div className="text-[13px] text-[#999] mb-4 flex items-center gap-1">
        <Link href="/merchant/chanxiao/supply-list" className="flex items-center gap-1 hover:text-[#1a5fa8]">
          <ChevronLeft className="w-3.5 h-3.5" />发布管理 · 供应信息
        </Link>
        <span>›</span>
        <span className="text-[#333]">发布供应信息</span>
      </div>

      <div className="bg-white rounded-xl border border-[#dde3ec]">
        <div className="px-7 py-5 border-b border-[#e8edf5]">
          <h1 className="text-[18px] font-bold text-[#1a1a2e]">发布供应信息</h1>
          <p className="text-[13px] text-[#888] mt-1">从商品基础档案中选择商品或组合套餐并设置定价，向买方发布供应信息</p>
        </div>

        <div className="p-7 space-y-8">
          {/* 供应类型 */}
          <section>
            <h2 className={sectionTitle}>供应类型</h2>
            <div className="grid grid-cols-2 gap-4">
              {([["single", "单品供应", "单个商品档案，可含多个规格", Package], ["combo", "组合套餐", "主商品搭配可选商品，按买家所选组合计价", Boxes]] as const).map(([k, label, hint, Icon]) => (
                <button key={k}
                  onClick={() => { setSupplyType(k); setSelectedProduct(null); setSkus([]); setComboMain(null); setComboOptionals([]) }}
                  className={`flex items-start gap-3 p-4 rounded-lg border text-left transition-colors ${supplyType === k ? "border-[#3a8c3f] bg-[#f0fdf4]" : "border-[#dde3ec] hover:border-[#3a8c3f]/50"}`}>
                  <span className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${supplyType === k ? "border-[#3a8c3f]" : "border-[#ccc]"}`}>
                    {supplyType === k && <span className="w-2 h-2 rounded-full bg-[#3a8c3f]" />}
                  </span>
                  <Icon className={`w-5 h-5 shrink-0 ${supplyType === k ? "text-[#3a8c3f]" : "text-[#aab4c2]"}`} />
                  <div>
                    <div className="text-[13px] font-semibold text-[#333]">{label}</div>
                    <div className="text-[12px] text-[#999] mt-0.5">{hint}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* ============ 单品供应 ============ */}
          {supplyType === "single" && (
            <>
              <section>
                <h2 className={sectionTitle}>选择商品</h2>
                {!selectedProduct ? (
                  <button onClick={() => openPicker("single")}
                    className="w-full py-6 border border-dashed border-[#c8d3e0] rounded-lg text-[13px] text-[#6b7c93] hover:border-[#3a8c3f] hover:text-[#3a8c3f] transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />从商品基础档案中选择商品
                  </button>
                ) : (
                  <div className="border border-[#e8edf5] rounded-lg overflow-hidden">
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#f8fafc] border-b border-[#e8edf5]">
                      <div className="w-12 h-12 rounded bg-[#e8f4fd] flex items-center justify-center text-[#1a5fa8] text-[11px] font-bold shrink-0">
                        {selectedProduct.name.slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-[#1a1a2e] flex items-center gap-2">
                          {selectedProduct.name}
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#e8f4fd] text-[#1a5fa8]">单品</span>
                        </div>
                        <div className="text-[12px] text-[#999] mt-0.5">{selectedProduct.category} · SPU：{selectedProduct.spuCode} · {selectedProduct.skus.length}个规格</div>
                      </div>
                      <button onClick={() => openPicker("single")} className="text-[12px] text-[#1a5fa8] hover:underline shrink-0">重新选择</button>
                    </div>
                  </div>
                )}
              </section>

              {selectedProduct && (
                <section>
                  <h2 className={sectionTitle}>定价方式</h2>
                  <div className="flex gap-2 mb-5">
                    {([["fixed", "固定价"], ["inquiry", "询价"], ["ladder", "阶梯价"]] as [PriceMode, string][]).map(([k, label]) => (
                      <button key={k} onClick={() => setPriceMode(k)}
                        className={`px-4 py-1.5 rounded border text-[12px] font-medium transition-colors ${priceMode === k ? "border-[#3a8c3f] bg-[#f0fdf4] text-[#3a8c3f]" : "border-[#dde3ec] text-[#555] hover:border-[#3a8c3f]/60"}`}>
                        {label}
                      </button>
                    ))}
                  </div>

                  {priceMode === "inquiry" && (
                    <div className="flex items-center gap-3 mb-4 p-3 bg-[#f5f7fa] rounded border border-[#e8edf5]">
                      <span className="text-[12px] text-[#555]">统一设置为时价</span>
                      <button onClick={() => setInquiryIsMarket(!inquiryIsMarket)}
                        className={`relative w-10 h-5 rounded-full transition-colors ${inquiryIsMarket ? "bg-[#3a8c3f]" : "bg-[#dde3ec]"}`}>
                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${inquiryIsMarket ? "left-[22px]" : "left-0.5"}`} />
                      </button>
                      {inquiryIsMarket && <span className="text-[11px] text-[#6b7c93]">已设为时价，买方询价时协商定价，无需填写单价</span>}
                    </div>
                  )}

                  <div className="space-y-4">
                    {skus.map((sku, idx) => (
                      <div key={sku.id} className="border border-[#e8edf5] rounded overflow-hidden">
                        <div className="bg-[#f5f7fa] px-4 py-2 text-[12px] font-medium text-[#1a1a2e]">规格 {idx + 1}</div>
                        <div className="p-4 space-y-3">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-[#6b7c93] whitespace-nowrap">市集SKU编码：</span>
                              <input value={sku.marketSkuCode} readOnly className="flex-1 bg-[#f5f7fa] border border-[#e8edf5] rounded px-2 py-1 text-[11px] text-[#555]" />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-[#6b7c93] whitespace-nowrap">主数据SKU编码：</span>
                              <input value={sku.masterSkuCode} readOnly className="flex-1 bg-[#f5f7fa] border border-[#e8edf5] rounded px-2 py-1 text-[11px] text-[#555]" />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-[#6b7c93] whitespace-nowrap">规格名称：</span>
                              <input value={sku.skuName} readOnly className="flex-1 bg-[#f5f7fa] border border-[#e8edf5] rounded px-2 py-1 text-[11px] text-[#555]" />
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-[#6b7c93] whitespace-nowrap"><span className="text-red-500">*</span> 可供应量：</span>
                              <input value={sku.estimatedQty} onChange={e => updateSku(sku.id, { estimatedQty: e.target.value })}
                                placeholder="请输入" className="flex-1 border border-[#dde3ec] rounded px-2 py-1 text-[11px] focus:outline-none focus:border-[#3a8c3f]" />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-[#6b7c93] whitespace-nowrap">最小起订量：</span>
                              <input value={sku.minBatch} onChange={e => updateSku(sku.id, { minBatch: e.target.value })}
                                placeholder="请输入" className="flex-1 border border-[#dde3ec] rounded px-2 py-1 text-[11px] focus:outline-none focus:border-[#3a8c3f]" />
                            </div>
                            {priceMode === "fixed" && (
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-[#6b7c93] whitespace-nowrap"><span className="text-red-500">*</span> 销售价(元)：</span>
                                <input value={sku.salePrice} onChange={e => updateSku(sku.id, { salePrice: e.target.value })}
                                  placeholder="请输入" className="flex-1 border border-[#dde3ec] rounded px-2 py-1 text-[11px] focus:outline-none focus:border-[#3a8c3f]" />
                              </div>
                            )}
                            {priceMode === "inquiry" && !inquiryIsMarket && (
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-[#6b7c93] whitespace-nowrap"><span className="text-red-500">*</span> 参考单价(元)：</span>
                                <input value={sku.salePrice} onChange={e => updateSku(sku.id, { salePrice: e.target.value })}
                                  placeholder="请输入参考单价" className="flex-1 border border-[#dde3ec] rounded px-2 py-1 text-[11px] focus:outline-none focus:border-[#3a8c3f]" />
                              </div>
                            )}
                          </div>

                          {/* 固定价：一客一价 */}
                          {priceMode === "fixed" && (
                            <div className="pt-1">
                              <label className="flex items-center gap-2 text-[12px] text-[#333] cursor-pointer w-fit">
                                <input type="checkbox" checked={sku.enableCustomPrice}
                                  onChange={e => updateSku(sku.id, { enableCustomPrice: e.target.checked, customPrices: e.target.checked && sku.customPrices.length === 0 ? [{ id: uid(), customer: "", price: "" }] : sku.customPrices })}
                                  className="accent-[#3a8c3f] w-3.5 h-3.5" />
                                <span className="font-medium">启用一客一价</span>
                                <span className="text-[11px] text-[#999]">为指定客户/客户组设置专属价格，其余客户按上方销售价</span>
                              </label>
                              {sku.enableCustomPrice && (
                                <div className="mt-3 border border-[#e8edf5] rounded overflow-hidden">
                                  <table className="w-full text-[11px]">
                                    <thead className="bg-[#f5f7fa]">
                                      <tr>{["客户 / 客户组", "专属单价(元)", "操作"].map(h => (
                                        <th key={h} className="px-3 py-2 text-left text-[#6b7c93] font-medium">{h}</th>
                                      ))}</tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#f0f4f8]">
                                      {sku.customPrices.map(cp => (
                                        <tr key={cp.id}>
                                          <td className="px-3 py-2">
                                            <select value={cp.customer} onChange={e => updateCustomPrice(sku.id, cp.id, { customer: e.target.value })}
                                              className="w-48 border border-[#dde3ec] rounded px-2 py-1 bg-white focus:outline-none focus:border-[#3a8c3f]">
                                              <option value="">请选择客户/客户组</option>
                                              {customerGroups.map(g => <option key={g}>{g}</option>)}
                                            </select>
                                          </td>
                                          <td className="px-3 py-2">
                                            <input value={cp.price} onChange={e => updateCustomPrice(sku.id, cp.id, { price: e.target.value })}
                                              placeholder="请输入专属价" className="w-28 border border-[#dde3ec] rounded px-2 py-1 focus:outline-none focus:border-[#3a8c3f]" />
                                          </td>
                                          <td className="px-3 py-2">
                                            <button onClick={() => removeCustomPrice(sku.id, cp.id)}
                                              className="text-[#e53e3e] hover:underline inline-flex items-center gap-1"><Trash2 className="w-3 h-3" />删除</button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                  <button onClick={() => addCustomPrice(sku.id)}
                                    className="w-full py-2 text-[11px] text-[#6b7c93] border-t border-dashed border-[#dde3ec] hover:bg-[#f5f7fa] transition-colors">
                                    + 添加客户价格
                                  </button>
                                </div>
                              )}
                            </div>
                          )}

                          {priceMode === "ladder" && (
                            <div className="space-y-2 pt-1">
                              <div className="flex items-start gap-2 p-2.5 bg-[#f0fdf4] rounded text-[11px] text-[#3a8c3f]">
                                <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                按购买数量区间设置不同单价，买方下单时系统自动匹配对应区间价格。最后一档数量上限自动为"不限"。
                              </div>
                              <div className="border border-[#e8edf5] rounded overflow-hidden">
                                <table className="w-full text-[11px]">
                                  <thead className="bg-[#f5f7fa]">
                                    <tr>{["档位", "最小数量", "最大数量", "销售价(元)", "操作"].map(h => (
                                      <th key={h} className="px-3 py-2 text-left text-[#6b7c93] font-medium">{h}</th>
                                    ))}</tr>
                                  </thead>
                                  <tbody className="divide-y divide-[#f0f4f8]">
                                    {sku.ladderTiers.map((tier, ti) => (
                                      <tr key={ti}>
                                        <td className="px-3 py-2 text-[#555]">{ti + 1}</td>
                                        <td className="px-3 py-2">
                                          <input value={tier.minQty} onChange={e => updateTier(sku.id, ti, "minQty", e.target.value)}
                                            placeholder="请输入" className="w-24 border border-[#dde3ec] rounded px-2 py-1 focus:outline-none focus:border-[#3a8c3f]" />
                                        </td>
                                        <td className="px-3 py-2">
                                          {ti === sku.ladderTiers.length - 1
                                            ? <input value="不限" readOnly className="w-24 border border-[#e8edf5] bg-[#f5f7fa] rounded px-2 py-1 text-[#aab4c2]" />
                                            : <input value={tier.maxQty} onChange={e => updateTier(sku.id, ti, "maxQty", e.target.value)}
                                                placeholder="请输入" className="w-24 border border-[#dde3ec] rounded px-2 py-1 focus:outline-none focus:border-[#3a8c3f]" />}
                                        </td>
                                        <td className="px-3 py-2">
                                          <input value={tier.price} onChange={e => updateTier(sku.id, ti, "price", e.target.value)}
                                            placeholder="请输入" className="w-24 border border-[#dde3ec] rounded px-2 py-1 focus:outline-none focus:border-[#3a8c3f]" />
                                        </td>
                                        <td className="px-3 py-2">
                                          <button onClick={() => removeTier(sku.id, ti)} disabled={sku.ladderTiers.length <= 2}
                                            className="text-[#e53e3e] hover:underline disabled:opacity-30">删除</button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                                <button onClick={() => addTier(sku.id)}
                                  className="w-full py-2 text-[11px] text-[#6b7c93] border-t border-dashed border-[#dde3ec] hover:bg-[#f5f7fa] transition-colors">
                                  + 添加档位
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* ============ 组合套餐 ============ */}
          {supplyType === "combo" && (
            <section>
              <h2 className={sectionTitle}>套餐商品配置</h2>
              <div className="flex items-start gap-2 p-3 mb-5 bg-[#eff6ff] rounded border border-[#dbeafe] text-[12px] text-[#1a5fa8]">
                <Info className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  从商品基础档案中选择一个<b>主商品（必选）</b>并设置套餐基础价，再添加若干<b>可选搭配商品</b>并分别设置加购价。
                  买家可自由勾选可选商品，系统按 <b>基础价 + 所选可选商品加购价</b> 自动累加出该组合的套餐价。
                </div>
              </div>

              {/* 主商品 */}
              <div className="mb-6">
                <div className="text-[13px] font-medium text-[#333] mb-2 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-[#e8831a] fill-[#e8831a]" />主商品（必选）
                </div>
                {!comboMain ? (
                  <button onClick={() => openPicker("combo-main")}
                    className="w-full py-5 border border-dashed border-[#c8d3e0] rounded-lg text-[13px] text-[#6b7c93] hover:border-[#3a8c3f] hover:text-[#3a8c3f] transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />选择主商品
                  </button>
                ) : (
                  <div className="border border-[#e8831a]/40 bg-[#fff9f0] rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#e8f4fd] flex items-center justify-center text-[#1a5fa8] text-[10px] font-bold shrink-0">{comboMain.productName.slice(0, 2)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-[#1a1a2e]">{comboMain.productName}
                          <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-[#fff0e0] text-[#e8831a]">必选</span>
                        </div>
                        <div className="text-[12px] text-[#999]">{comboMain.category}</div>
                      </div>
                      <button onClick={() => openPicker("combo-main")} className="text-[12px] text-[#1a5fa8] hover:underline shrink-0">更换</button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-3">
                      <div>
                        <label className="text-[11px] text-[#6b7c93] block mb-1">规格</label>
                        <select value={comboMain.skuId} onChange={e => updateCombo(comboMain.id, { skuId: e.target.value })}
                          className="w-full border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] bg-white focus:outline-none focus:border-[#3a8c3f]">
                          {skusOf(comboMain.productId).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] text-[#6b7c93] block mb-1">数量</label>
                        <input value={comboMain.qty} onChange={e => updateCombo(comboMain.id, { qty: e.target.value })}
                          className="w-full border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#3a8c3f]" />
                      </div>
                      <div>
                        <label className="text-[11px] text-[#6b7c93] block mb-1"><span className="text-red-500">*</span> 套餐基础价(元)</label>
                        <input value={comboMain.price} onChange={e => updateCombo(comboMain.id, { price: e.target.value })}
                          placeholder="仅购买主商品的价格" className="w-full border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#3a8c3f]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 可选搭配商品 */}
              <div className="mb-6">
                <div className="text-[13px] font-medium text-[#333] mb-2">可选搭配商品（买家自选，可不选）</div>
                <div className="space-y-3">
                  {comboOptionals.map((opt, i) => (
                    <div key={opt.id} className="border border-[#e8edf5] rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-[#e8f4fd] flex items-center justify-center text-[#1a5fa8] text-[10px] font-bold shrink-0">{opt.productName.slice(0, 2)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-semibold text-[#1a1a2e]">可选 {i + 1} · {opt.productName}
                            <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-[#f0f4f8] text-[#6b7c93]">可选</span>
                          </div>
                          <div className="text-[12px] text-[#999]">{opt.category}</div>
                        </div>
                        <button onClick={() => removeOptional(opt.id)} className="text-[12px] text-[#e53e3e] hover:underline shrink-0 inline-flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" />移除</button>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div>
                          <label className="text-[11px] text-[#6b7c93] block mb-1">规格</label>
                          <select value={opt.skuId} onChange={e => updateCombo(opt.id, { skuId: e.target.value })}
                            className="w-full border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] bg-white focus:outline-none focus:border-[#3a8c3f]">
                            {skusOf(opt.productId).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] text-[#6b7c93] block mb-1">数量</label>
                          <input value={opt.qty} onChange={e => updateCombo(opt.id, { qty: e.target.value })}
                            className="w-full border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#3a8c3f]" />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#6b7c93] block mb-1"><span className="text-red-500">*</span> 加购价(元)</label>
                          <input value={opt.price} onChange={e => updateCombo(opt.id, { price: e.target.value })}
                            placeholder="勾选后追加的价格" className="w-full border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#3a8c3f]" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => openPicker("combo-optional")} disabled={!comboMain}
                  className="w-full mt-3 py-3 border border-dashed border-[#c8d3e0] rounded-lg text-[13px] text-[#6b7c93] hover:border-[#3a8c3f] hover:text-[#3a8c3f] transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
                  <Plus className="w-4 h-4" />添加可选搭配商品{!comboMain && "（请先选择主商品）"}
                </button>
              </div>

              {/* 套餐价格预览 */}
              {comboMain && (
                <div className="border border-[#3a8c3f]/30 bg-[#f0fdf4] rounded-lg p-4">
                  <div className="text-[13px] font-semibold text-[#2d6e32] mb-3">套餐价格预览</div>
                  <div className="space-y-1.5 text-[12px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#555]">基础套餐价（仅主商品：{comboMain.productName} {skuNameOf(comboMain.productId, comboMain.skuId)} ×{comboMain.qty || 1}）</span>
                      <span className="font-semibold text-[#333]">¥{basePrice.toFixed(2)}</span>
                    </div>
                    {comboOptionals.map(opt => (
                      <div key={opt.id} className="flex items-center justify-between text-[#6b7c93]">
                        <span>＋ 勾选【{opt.productName} {skuNameOf(opt.productId, opt.skuId)} ×{opt.qty || 1}】加购</span>
                        <span>+ ¥{num(opt.price).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-2 mt-1 border-t border-[#c8e6ca]">
                      <span className="text-[#2d6e32] font-medium">全选套餐价（主商品 + 全部可选）</span>
                      <span className="text-[16px] font-bold text-[#e8831a]">¥{fullComboPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#7a8a99] mt-2">买家实际支付 = 基础套餐价 + 所勾选可选商品的加购价之和</div>
                </div>
              )}
            </section>
          )}

          {/* 基本信息 */}
          <section>
            <h2 className={sectionTitle}>基本信息</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="col-span-2">
                <label className={labelCls}><span className="text-red-500">*</span> 供应标题</label>
                <input value={title} onChange={e => setTitle(e.target.value)}
                  placeholder="请输入供应信息标题，如：2026年新产丰两优大米大量供应" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}><span className="text-red-500">*</span> 商品分类</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className={`${inputCls} bg-white`}>
                  <option value="">请选择分类</option>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}><span className="text-red-500">*</span> 信息有效期至</label>
                <input type="date" value={validUntil} onChange={e => setValidUntil(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>产地/供货区域</label>
                <input value={originArea} onChange={e => setOriginArea(e.target.value)} placeholder="如：广东省湛江市" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>发货地</label>
                <input value={shipFrom} onChange={e => setShipFrom(e.target.value)} placeholder="如：广东省广州市白云区" className={inputCls} />
              </div>
              <div className="col-span-2">
                <label className={labelCls}>交货周期</label>
                <input value={deliveryCycle} onChange={e => setDeliveryCycle(e.target.value)} placeholder="如：签约后7天内发货" className={inputCls} />
              </div>
            </div>
          </section>

          {/* 交易条款 */}
          <section>
            <h2 className={sectionTitle}>交易条款</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className={labelCls}>预付款比例</label>
                <div className="flex items-center gap-2">
                  <input value={depositRatio} onChange={e => setDepositRatio(e.target.value)} placeholder="如：20" className={inputCls} />
                  <span className="text-[13px] text-[#666]">%</span>
                </div>
              </div>
              <div>
                <label className={labelCls}>交易模式</label>
                <select value={tradeMode} onChange={e => setTradeMode(e.target.value)} className={`${inputCls} bg-white`}>
                  {tradeModes.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>运费方式</label>
                <select value={freightMode} onChange={e => setFreightMode(e.target.value)} className={`${inputCls} bg-white`}>
                  {["卖家承担", "买家承担", "按运费模板计算", "面议"].map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>发票</label>
                <select value={invoice} onChange={e => setInvoice(e.target.value)} className={`${inputCls} bg-white`}>
                  {invoiceOptions.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className={labelCls}>配送方式（可多选）</label>
                <div className="flex flex-wrap gap-2">
                  {deliveryOptions.map(m => (
                    <button key={m} onClick={() => toggleArr(deliveryMethods, m, setDeliveryMethods)}
                      className={`px-3 py-1.5 rounded border text-[12px] transition-colors ${deliveryMethods.includes(m) ? "border-[#3a8c3f] bg-[#f0fdf4] text-[#3a8c3f]" : "border-[#dde3ec] text-[#555] hover:border-[#3a8c3f]/60"}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-span-2">
                <label className={labelCls}>结算渠道（可多选）</label>
                <div className="flex flex-wrap gap-2">
                  {settlementOptions.map(m => (
                    <button key={m} onClick={() => toggleArr(settlements, m, setSettlements)}
                      className={`px-3 py-1.5 rounded border text-[12px] transition-colors ${settlements.includes(m) ? "border-[#3a8c3f] bg-[#f0fdf4] text-[#3a8c3f]" : "border-[#dde3ec] text-[#555] hover:border-[#3a8c3f]/60"}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 附件 */}
          <section>
            <h2 className={sectionTitle}>商品图片 / 附件</h2>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 px-4 py-2 border border-dashed border-[#c8d3e0] rounded-lg text-[13px] text-[#6b7c93] hover:border-[#3a8c3f] hover:text-[#3a8c3f] transition-colors">
                <Upload className="w-4 h-4" />上传图片/附件
              </button>
              <span className="text-[12px] text-[#aab4c2]">支持 png/jpg/pdf，单个不超过 20M，最多 9 张</span>
            </div>
          </section>

          {/* 可见范围 */}
          <section>
            <h2 className={sectionTitle}>发布范围</h2>
            <div className="space-y-2">
              {([["all", "公开发布 · 所有采购商可见并询价"], ["group", "指定客户组可见"], ["directed", "定向发布 · 仅指定采购商可见"]] as const).map(([k, label]) => (
                <label key={k} className="flex items-center gap-2 text-[13px] text-[#444] cursor-pointer">
                  <input type="radio" name="visibility" checked={visibility === k} onChange={() => setVisibility(k)} className="accent-[#3a8c3f]" />
                  {label}
                </label>
              ))}
              {visibility !== "all" && (
                <input placeholder={visibility === "group" ? "请选择客户分组" : "请输入指定采购商名称"}
                  className={`${inputCls} mt-2 max-w-[420px]`} />
              )}
            </div>
          </section>

          {/* 联系人 */}
          <section>
            <h2 className={sectionTitle}>卖方联系人信息</h2>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4">
              <div>
                <label className={labelCls}><span className="text-red-500">*</span> 联系人姓名</label>
                <input value={contact} onChange={e => setContact(e.target.value)} placeholder="请输入联系人姓名" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}><span className="text-red-500">*</span> 联系电话</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="请输入联系电话" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>所属部门</label>
                <input value={dept} onChange={e => setDept(e.target.value)} placeholder="如：销售部" className={inputCls} />
              </div>
            </div>
          </section>
        </div>

        <div className="px-7 py-4 border-t border-[#e8edf5] flex items-center justify-end gap-3">
          <Link href="/merchant/chanxiao/supply-list" className="px-6 py-2.5 border border-[#dde3ec] text-[#555] text-[13px] rounded-lg hover:bg-[#f5f7fa] transition-colors">
            取消
          </Link>
          <button onClick={() => setSubmitted(true)}
            className="px-8 py-2.5 bg-[#3a8c3f] text-white text-[13px] font-semibold rounded-lg hover:bg-[#2d6e32] transition-colors">
            提交发布
          </button>
        </div>
      </div>

      {/* 商品选择器弹窗 */}
      {showPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowPicker(false)}>
          <div className="bg-white rounded-lg w-[720px] max-h-[80vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
              <h3 className="text-[15px] font-bold text-[#1a1a2e]">{pickerTitle}</h3>
              <button onClick={() => setShowPicker(false)}><X className="w-5 h-5 text-[#999]" /></button>
            </div>
            <div className="px-6 py-3 border-b border-[#e8edf5] flex gap-3">
              <select value={pickerCategory} onChange={e => setPickerCategory(e.target.value)}
                className="border border-[#dde3ec] rounded px-3 py-2 text-[13px] bg-white focus:outline-none focus:border-[#3a8c3f]">
                <option value="">全部分类</option>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aab]" />
                <input value={pickerSearch} onChange={e => setPickerSearch(e.target.value)}
                  placeholder="搜索商品名称 / SPU编码" className="w-full pl-9 pr-4 py-2 border border-[#dde3ec] rounded text-[13px] focus:outline-none focus:border-[#3a8c3f]" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-3">
              {filteredArchive.length === 0 ? (
                <div className="py-12 text-center text-[13px] text-[#bbb]">未找到匹配的商品</div>
              ) : (
                <div className="space-y-2">
                  {filteredArchive.map(p => (
                    <label key={p.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${pickerSelected === p.id ? "border-[#3a8c3f] bg-[#f0fdf4]" : "border-[#e8edf5] hover:border-[#3a8c3f]/50"}`}>
                      <input type="radio" name="pick" checked={pickerSelected === p.id} onChange={() => setPickerSelected(p.id)} className="accent-[#3a8c3f]" />
                      <div className="w-10 h-10 rounded bg-[#e8f4fd] flex items-center justify-center text-[#1a5fa8] text-[10px] font-bold shrink-0">{p.name.slice(0, 2)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-medium text-[#1a1a2e]">{p.name}</div>
                        <div className="text-[12px] text-[#999]">{p.category} · SPU：{p.spuCode} · {p.skus.length}个规格</div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#e8edf5]">
              <button onClick={() => setShowPicker(false)} className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">取消</button>
              <button onClick={confirmPicker} disabled={!pickerSelected}
                className="px-6 py-2 bg-[#3a8c3f] text-white text-[13px] font-semibold rounded hover:bg-[#2d6e32] disabled:opacity-40">确定</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
