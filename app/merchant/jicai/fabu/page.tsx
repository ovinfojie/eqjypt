"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronLeft, Plus, Trash2, Search, X, Info, ChevronDown,
} from "lucide-react"

/* ───── Types ───── */
type PriceMode = "fixed" | "inquiry" | "ladder"

interface LadderTier { minQty: string; maxQty: string; price: string }
interface CustomerGroup { id: number; groupName: string; customerCount: number; price: string }

interface SkuCard {
  id: string
  marketSkuCode: string
  masterSkuCode: string
  skuName: string
  skuDesc: string
  estimatedQty: string
  minBatch: string
  // fixed price fields
  salePrice: string
  enableOnePrice: boolean
  customerGroups: CustomerGroup[]
  // ladder price fields
  ladderTiers: LadderTier[]
}

interface Product {
  id: string
  name: string
  category: string
  spuCode: string
  skus: SkuCard[]
}

/* ───── Mock data ───── */
const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1", name: "五常大米", category: "粮油米面/食用油/花生油", spuCode: "P626342237328",
    skus: [
      { id: "s1", marketSkuCode: "sj-xxxx-0213213", masterSkuCode: "zsj-0213288", skuName: "5kg / 袋", skuDesc: "袋装", estimatedQty: "", minBatch: "", salePrice: "", enableOnePrice: false, customerGroups: [{ id: 1, groupName: "", customerCount: 23, price: "" }, { id: 2, groupName: "", customerCount: 17, price: "" }], ladderTiers: [{ minQty: "", maxQty: "", price: "" }, { minQty: "", maxQty: "", price: "" }, { minQty: "", maxQty: "不限", price: "" }] },
      { id: "s2", marketSkuCode: "sj-xxxx-0213214", masterSkuCode: "zsj-0213289", skuName: "10kg / 袋", skuDesc: "袋装", estimatedQty: "", minBatch: "", salePrice: "", enableOnePrice: false, customerGroups: [{ id: 1, groupName: "", customerCount: 23, price: "" }], ladderTiers: [{ minQty: "", maxQty: "", price: "" }, { minQty: "", maxQty: "不限", price: "" }] },
      { id: "s3", marketSkuCode: "sj-xxxx-0213215", masterSkuCode: "zsj-0213290", skuName: "15kg / 袋", skuDesc: "袋装", estimatedQty: "", minBatch: "", salePrice: "", enableOnePrice: false, customerGroups: [{ id: 1, groupName: "", customerCount: 28, price: "" }], ladderTiers: [{ minQty: "", maxQty: "", price: "" }, { minQty: "", maxQty: "不限", price: "" }] },
    ],
  },
  { id: "p2", name: "丝苗米", category: "粮油米面/谷类作物/稻谷", spuCode: "P484876690560", skus: [{ id: "s4", marketSkuCode: "sj-xxxx-0213220", masterSkuCode: "zsj-0213300", skuName: "25kg / 袋", skuDesc: "袋装", estimatedQty: "", minBatch: "", salePrice: "", enableOnePrice: false, customerGroups: [], ladderTiers: [{ minQty: "", maxQty: "", price: "" }, { minQty: "", maxQty: "不限", price: "" }] }] },
  { id: "p3", name: "南雄玉米油", category: "粮油米面/食用油/花生油", spuCode: "P626342237328", skus: [{ id: "s5", marketSkuCode: "sj-xxxx-0213230", masterSkuCode: "zsj-0213310", skuName: "5L / 桶", skuDesc: "桶装", estimatedQty: "", minBatch: "", salePrice: "", enableOnePrice: false, customerGroups: [], ladderTiers: [{ minQty: "", maxQty: "", price: "" }, { minQty: "", maxQty: "不限", price: "" }] }] },
  { id: "p4", name: "广东韶关仁化鸭稻丝苗米", category: "粮油米面/面食米食/丝苗米", spuCode: "P491851883648", skus: [{ id: "s6", marketSkuCode: "sj-xxxx-0213240", masterSkuCode: "zsj-0213320", skuName: "10kg / 袋", skuDesc: "袋装", estimatedQty: "", minBatch: "", salePrice: "", enableOnePrice: false, customerGroups: [], ladderTiers: [{ minQty: "", maxQty: "", price: "" }, { minQty: "", maxQty: "不限", price: "" }] }] },
  { id: "p5", name: "象牙香占米", category: "粮油米面/谷类作物/稻谷", spuCode: "P491851883649", skus: [{ id: "s7", marketSkuCode: "sj-xxxx-0213250", masterSkuCode: "zsj-0213330", skuName: "15kg / 袋", skuDesc: "袋装", estimatedQty: "", minBatch: "", salePrice: "", enableOnePrice: false, customerGroups: [], ladderTiers: [{ minQty: "", maxQty: "", price: "" }, { minQty: "", maxQty: "不限", price: "" }] }] },
]

/* ───── Component ───── */
export default function FabuJicaiPage() {
  /* product picker */
  const [showPicker, setShowPicker] = useState(false)
  const [pickerSearch, setPickerSearch] = useState("")
  const [pickerCategory, setPickerCategory] = useState("")
  const [pickerSelected, setPickerSelected] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  /* price mode */
  const [priceMode, setPriceMode] = useState<PriceMode>("fixed")
  const [inquiryIsMarket, setInquiryIsMarket] = useState(true)

  /* sku state */
  const [skus, setSkus] = useState<SkuCard[]>([])

  /* 集采设置 */
  const [jicaiStartDate, setJicaiStartDate] = useState("")
  const [jicaiEndDate, setJicaiEndDate] = useState("")
  const [categoryType, setCategoryType] = useState("")
  const [deliveryType, setDeliveryType] = useState("")
  const [qualityStd, setQualityStd] = useState("")
  const [deliveryCycle, setDeliveryCycle] = useState("")
  const [minSignup, setMinSignup] = useState("10")
  const [autoEnd, setAutoEnd] = useState(true)
  const [supportRetail, setSupportRetail] = useState(true)

  /* 支付与结算 */
  const [settleChannels, setSettleChannels] = useState<string[]>(["建行龙存管"])
  const [settleMode, setSettleMode] = useState<"prepay" | "full">("prepay")
  const [prepayRatio, setPrepayRatio] = useState("")
  const [tradeMode, setTradeMode] = useState<string[]>(["担保交易"])
  const [tradeElements, setTradeElements] = useState<string[]>(["身份证号/统一信用代码"])

  /* 配送设置 */
  const [deliveryMethods, setDeliveryMethods] = useState<string[]>(["卖家配送", "买家自提"])
  const [deliveryTemplates, setDeliveryTemplates] = useState<{ id: number; value: string }[]>([
    { id: 1, value: "" }, { id: 2, value: "" },
  ])

  /* 基本信息 */
  const [title, setTitle] = useState("")
  const [productCategory, setProductCategory] = useState("粮食")
  const [productName, setProductName] = useState("")
  const [activityDesc, setActivityDesc] = useState("")

  /* ── Picker helpers ── */
  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchCat = !pickerCategory || p.category.includes(pickerCategory)
    const matchKw = !pickerSearch || p.name.includes(pickerSearch) || p.spuCode.includes(pickerSearch)
    return matchCat && matchKw
  })

  function confirmPicker() {
    const p = MOCK_PRODUCTS.find(x => x.id === pickerSelected)
    if (!p) return
    setSelectedProduct(p)
    setSkus(p.skus.map(s => ({ ...s })))
    setShowPicker(false)
    setPickerSelected(null)
    setPickerSearch("")
  }

  /* ── SKU helpers ── */
  function updateSku(id: string, patch: Partial<SkuCard>) {
    setSkus(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s))
  }

  function addLadderTier(skuId: string) {
    setSkus(prev => prev.map(s => s.id === skuId
      ? { ...s, ladderTiers: [...s.ladderTiers.slice(0, -1), { minQty: "", maxQty: "", price: "" }, { minQty: "", maxQty: "不限", price: "" }] }
      : s
    ))
  }
  function removeLadderTier(skuId: string, idx: number) {
    setSkus(prev => prev.map(s => s.id === skuId
      ? { ...s, ladderTiers: s.ladderTiers.filter((_, i) => i !== idx) }
      : s
    ))
  }
  function updateLadderTier(skuId: string, idx: number, key: keyof LadderTier, val: string) {
    setSkus(prev => prev.map(s => s.id === skuId
      ? { ...s, ladderTiers: s.ladderTiers.map((t, i) => i === idx ? { ...t, [key]: val } : t) }
      : s
    ))
  }

  function addCustomerGroup(skuId: string) {
    setSkus(prev => prev.map(s => s.id === skuId
      ? { ...s, customerGroups: [...s.customerGroups, { id: Date.now(), groupName: "", customerCount: 0, price: "" }] }
      : s
    ))
  }
  function removeCustomerGroup(skuId: string, gid: number) {
    setSkus(prev => prev.map(s => s.id === skuId
      ? { ...s, customerGroups: s.customerGroups.filter(g => g.id !== gid) }
      : s
    ))
  }
  function updateCustomerGroup(skuId: string, gid: number, key: keyof CustomerGroup, val: string) {
    setSkus(prev => prev.map(s => s.id === skuId
      ? { ...s, customerGroups: s.customerGroups.map(g => g.id === gid ? { ...g, [key]: val } : g) }
      : s
    ))
  }

  /* ── Checkbox toggle helper ── */
  function toggleArr(arr: string[], setArr: (v: string[]) => void, val: string) {
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  const inputCls = "border border-[#dde3ec] rounded px-2.5 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8] transition-colors"
  const labelCls = "text-[13px] text-[#6b7c93] shrink-0"
  const requiredMark = <span className="text-red-500 ml-0.5">*</span>

  return (
    <div className="space-y-4 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/merchant/jicai/huodong-list" className="flex items-center gap-1.5 text-[13px] text-[#6b7c93] hover:text-[#1a5fa8] transition-colors">
          <ChevronLeft className="w-4 h-4" /> 返回列表
        </Link>
        <h1 className="text-[18px] font-bold text-[#1a1a2e]">发布集采活动</h1>
      </div>

      {/* ── 基本信息 ── */}
      <div className="bg-white rounded border border-[#e8edf5]">
        <div className="px-5 py-3 border-b border-[#f0f4f8] text-[13px] font-semibold text-[#1a1a2e] bg-[#f8fafc]">基本信息</div>
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-3">
            <span className={`${labelCls} w-20 text-right`}>活动标题{requiredMark}</span>
            <input value={title} onChange={e => setTitle(e.target.value)} maxLength={50}
              placeholder="请输入集采活动标题，最多50字"
              className={`${inputCls} flex-1`} />
          </div>
          <div className="flex items-center gap-3">
            <span className={`${labelCls} w-20 text-right`}>商品品类{requiredMark}</span>
            <select value={productCategory} onChange={e => setProductCategory(e.target.value)}
              className={`${inputCls} w-32`}>
              {["粮食", "蔬菜", "水果", "水产", "肉禽蛋", "干货"].map(c => <option key={c}>{c}</option>)}
            </select>
            <input value={productName} onChange={e => setProductName(e.target.value)}
              placeholder="具体商品名称" className={`${inputCls} flex-1`} />
          </div>
        </div>
      </div>

      {/* ── 选择商品 ── */}
      <div className="bg-white rounded border border-[#e8edf5]">
        <div className="px-5 py-3 border-b border-[#f0f4f8] text-[13px] font-semibold text-[#1a1a2e] bg-[#f8fafc] flex items-center justify-between">
          <span>商品{requiredMark}</span>
          {!selectedProduct && (
            <button onClick={() => setShowPicker(true)}
              className="flex items-center gap-1.5 text-[12px] text-[#1a5fa8] border border-[#1a5fa8] px-3 py-1 rounded hover:bg-[#e8f4fd] transition-colors">
              <Plus className="w-3.5 h-3.5" /> 选择商品
            </button>
          )}
        </div>
        <div className="p-5">
          {!selectedProduct ? (
            <div className="text-center py-8 text-[13px] text-[#aab4c2]">
              请先选择商品，每次活动仅支持添加一个商品
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-[#f5f7fa] rounded border border-[#e8edf5]">
                <div className="w-12 h-12 bg-[#dde3ec] rounded flex items-center justify-center shrink-0">
                  <div className="w-8 h-8 bg-[#bac4d0] rounded" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-[#1a1a2e]">{selectedProduct.name}</div>
                  <div className="text-[11px] text-[#6b7c93] mt-0.5">{selectedProduct.category}</div>
                  <div className="text-[11px] text-[#aab4c2]">平台SPU编码：{selectedProduct.spuCode}</div>
                </div>
                <button onClick={() => { setSelectedProduct(null); setSkus([]) }}
                  className="text-[12px] text-[#e8831a] hover:underline">更换商品</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── 定价方式 ── (只在选了商品后显示) */}
      {selectedProduct && (
        <div className="bg-white rounded border border-[#e8edf5]">
          <div className="px-5 py-3 border-b border-[#f0f4f8] text-[13px] font-semibold text-[#1a1a2e] bg-[#f8fafc]">定价方式</div>
          <div className="p-5">
            {/* Mode tabs */}
            <div className="flex gap-2 mb-5">
              {([["fixed", "固定价"], ["inquiry", "询价"], ["ladder", "阶梯价"]] as [PriceMode, string][]).map(([k, label]) => (
                <button key={k} onClick={() => setPriceMode(k)}
                  className={`px-4 py-1.5 rounded border text-[12px] font-medium transition-colors ${priceMode === k ? "border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8]" : "border-[#dde3ec] text-[#555] hover:border-[#1a5fa8]/60"}`}>
                  {label}
                </button>
              ))}
            </div>

            {/* 询价: 时价 toggle */}
            {priceMode === "inquiry" && (
              <div className="flex items-center gap-3 mb-4 p-3 bg-[#f5f7fa] rounded border border-[#e8edf5]">
                <span className={`${labelCls}`}>统一设置为时价</span>
                <button onClick={() => setInquiryIsMarket(!inquiryIsMarket)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${inquiryIsMarket ? "bg-[#1a5fa8]" : "bg-[#dde3ec]"}`}>
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${inquiryIsMarket ? "left-[22px]" : "left-0.5"}`} />
                </button>
                {inquiryIsMarket && (
                  <span className="text-[11px] text-[#6b7c93]">已设为时价，无需填写规格单价</span>
                )}
              </div>
            )}

            {/* SKU cards */}
            <div className="space-y-4">
              {skus.map((sku, skuIdx) => (
                <div key={sku.id} className="border border-[#e8edf5] rounded overflow-hidden">
                  {/* SKU header */}
                  <div className="bg-[#f5f7fa] px-4 py-2 flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-[12px] font-medium text-[#1a1a2e]">规格 {skuIdx + 1}</span>
                  </div>
                  {/* SKU info row */}
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
                        <span className="text-[11px] text-[#6b7c93] whitespace-nowrap">规格描述：</span>
                        <input value={sku.skuDesc} readOnly className="flex-1 bg-[#f5f7fa] border border-[#e8edf5] rounded px-2 py-1 text-[11px] text-[#555]" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#6b7c93] whitespace-nowrap"><span className="text-red-500">*</span> 预估供应量：</span>
                        <input value={sku.estimatedQty} onChange={e => updateSku(sku.id, { estimatedQty: e.target.value })}
                          placeholder="请输入" className="flex-1 border border-[#dde3ec] rounded px-2 py-1 text-[11px] focus:outline-none focus:border-[#1a5fa8]" />
                        <span className="text-[11px] text-[#6b7c93]">件</span>
                      </div>
                      {priceMode !== "inquiry" && (
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-[#6b7c93] whitespace-nowrap"><span className="text-red-500">*</span> 起批量：</span>
                          <input value={sku.minBatch} onChange={e => updateSku(sku.id, { minBatch: e.target.value })}
                            placeholder="请输入" className="flex-1 border border-[#dde3ec] rounded px-2 py-1 text-[11px] focus:outline-none focus:border-[#1a5fa8]" />
                          <span className="text-[11px] text-[#6b7c93]">件</span>
                        </div>
                      )}
                    </div>

                    {/* ── 固定价 ── */}
                    {priceMode === "fixed" && (
                      <div className="space-y-3 pt-1">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[#6b7c93]"><span className="text-red-500">*</span> 销售价：</span>
                            <input value={sku.salePrice} onChange={e => updateSku(sku.id, { salePrice: e.target.value })}
                              placeholder="请输入" className="w-28 border border-[#dde3ec] rounded px-2 py-1 text-[11px] focus:outline-none focus:border-[#1a5fa8]" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[#6b7c93]">是否启用一客一价</span>
                            <button onClick={() => updateSku(sku.id, { enableOnePrice: !sku.enableOnePrice })}
                              className={`relative w-9 h-5 rounded-full transition-colors ${sku.enableOnePrice ? "bg-[#1a5fa8]" : "bg-[#dde3ec]"}`}>
                              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${sku.enableOnePrice ? "left-[18px]" : "left-0.5"}`} />
                            </button>
                            {sku.enableOnePrice && (
                              <span className="flex items-center gap-1 text-[11px] text-[#1a5fa8]">
                                <Info className="w-3 h-3" /> 为不同客户组设置专属价格，优先级高于通用价格
                              </span>
                            )}
                          </div>
                        </div>
                        {sku.enableOnePrice && (
                          <div className="border border-[#e8edf5] rounded overflow-hidden">
                            <table className="w-full text-[11px]">
                              <thead className="bg-[#f5f7fa]">
                                <tr>
                                  {["序号", "客户分组名称", "关联客户", "销售价(元)", "操作"].map(h => (
                                    <th key={h} className="px-3 py-2 text-left text-[#6b7c93] font-medium">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-[#f0f4f8]">
                                {sku.customerGroups.map((g, gi) => (
                                  <tr key={g.id}>
                                    <td className="px-3 py-2 text-[#555]">{gi + 1}</td>
                                    <td className="px-3 py-2">
                                      <div className="flex items-center gap-1 border border-[#dde3ec] rounded px-2 py-1 w-32">
                                        <span className="flex-1 text-[#aab4c2]">{g.groupName || "请选择"}</span>
                                        <ChevronDown className="w-3 h-3 text-[#aab4c2]" />
                                      </div>
                                    </td>
                                    <td className="px-3 py-2 text-[#1a5fa8] font-medium">{g.customerCount}</td>
                                    <td className="px-3 py-2">
                                      <input value={g.price} onChange={e => updateCustomerGroup(sku.id, g.id, "price", e.target.value)}
                                        placeholder="请输入" className="w-24 border border-[#dde3ec] rounded px-2 py-1 focus:outline-none focus:border-[#1a5fa8]" />
                                    </td>
                                    <td className="px-3 py-2">
                                      <button onClick={() => removeCustomerGroup(sku.id, g.id)} className="text-[#1a5fa8] hover:underline">删除</button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <button onClick={() => addCustomerGroup(sku.id)}
                              className="w-full py-2 text-[11px] text-[#6b7c93] border-t border-dashed border-[#dde3ec] hover:bg-[#f5f7fa] transition-colors">
                              + 添加客户分组
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ── 询价 非时价 ── */}
                    {priceMode === "inquiry" && !inquiryIsMarket && (
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[11px] text-[#6b7c93]"><span className="text-red-500">*</span> 参考单价：</span>
                        <input value={sku.salePrice} onChange={e => updateSku(sku.id, { salePrice: e.target.value })}
                          placeholder="请输入参考单价" className="w-32 border border-[#dde3ec] rounded px-2 py-1 text-[11px] focus:outline-none focus:border-[#1a5fa8]" />
                        <span className="text-[11px] text-[#6b7c93]">元</span>
                      </div>
                    )}

                    {/* ── 阶梯价 ── */}
                    {priceMode === "ladder" && (
                      <div className="space-y-2 pt-1">
                        <div className="flex items-start gap-2 p-2.5 bg-[#e8f4fd] rounded text-[11px] text-[#1a5fa8]">
                          <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                          按购买数量区间设置不同单价，买方下单时系统自动匹配对应区间价格。最后一档数量上限自动为"不限"。
                        </div>
                        <div className="border border-[#e8edf5] rounded overflow-hidden">
                          <table className="w-full text-[11px]">
                            <thead className="bg-[#f5f7fa]">
                              <tr>
                                {["档位", "最小数量", "最大数量", "销售价(元)", "操作"].map(h => (
                                  <th key={h} className="px-3 py-2 text-left text-[#6b7c93] font-medium">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f0f4f8]">
                              {sku.ladderTiers.map((tier, ti) => (
                                <tr key={ti}>
                                  <td className="px-3 py-2 text-[#555]">{ti + 1}</td>
                                  <td className="px-3 py-2">
                                    <input value={tier.minQty} onChange={e => updateLadderTier(sku.id, ti, "minQty", e.target.value)}
                                      placeholder="请输入" className="w-24 border border-[#dde3ec] rounded px-2 py-1 focus:outline-none focus:border-[#1a5fa8]" />
                                  </td>
                                  <td className="px-3 py-2">
                                    {ti === sku.ladderTiers.length - 1
                                      ? <input value="不限" readOnly className="w-24 border border-[#e8edf5] bg-[#f5f7fa] rounded px-2 py-1 text-[#aab4c2]" />
                                      : <input value={tier.maxQty} onChange={e => updateLadderTier(sku.id, ti, "maxQty", e.target.value)}
                                          placeholder="请输入" className="w-24 border border-[#dde3ec] rounded px-2 py-1 focus:outline-none focus:border-[#1a5fa8]" />
                                    }
                                  </td>
                                  <td className="px-3 py-2">
                                    <input value={tier.price} onChange={e => updateLadderTier(sku.id, ti, "price", e.target.value)}
                                      placeholder="请输入" className="w-24 border border-[#dde3ec] rounded px-2 py-1 focus:outline-none focus:border-[#1a5fa8]" />
                                  </td>
                                  <td className="px-3 py-2">
                                    <button onClick={() => removeLadderTier(sku.id, ti)} disabled={sku.ladderTiers.length <= 1}
                                      className="text-[#1a5fa8] hover:underline disabled:opacity-30">删除</button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <button onClick={() => addLadderTier(sku.id)}
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
          </div>
        </div>
      )}

      {/* ── 集采设置 ── */}
      <div className="bg-white rounded border border-[#e8edf5]">
        <div className="px-5 py-3 border-b border-[#f0f4f8] text-[13px] font-semibold text-[#1a1a2e] bg-[#f8fafc]">集采设置</div>
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3">
            <span className={`${labelCls} w-28 text-right`}>活动周期{requiredMark}</span>
            <div className="flex items-center gap-2">
              <input type="date" value={jicaiStartDate} onChange={e => setJicaiStartDate(e.target.value)}
                className={`${inputCls}`} />
              <span className="text-[#aab4c2]">→</span>
              <input type="date" value={jicaiEndDate} onChange={e => setJicaiEndDate(e.target.value)}
                className={`${inputCls}`} />
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className={`${labelCls} w-28 text-right`}></span>
            <div className="grid grid-cols-2 gap-3 flex-1 max-w-[420px]">
              <select value={categoryType} onChange={e => setCategoryType(e.target.value)} className={`${inputCls}`}>
                <option value="">请选择</option>
                {["粮食", "蔬菜", "水果", "水产", "肉禽蛋"].map(c => <option key={c}>{c}</option>)}
              </select>
              <div className="flex items-center gap-2">
                <span className={`${labelCls} whitespace-nowrap`}>质量标准{requiredMark}</span>
                <input value={qualityStd} onChange={e => setQualityStd(e.target.value)}
                  placeholder="请输入" className={`${inputCls} flex-1`} />
              </div>
              <select value={deliveryType} onChange={e => setDeliveryType(e.target.value)} className={`${inputCls}`}>
                <option value="">请选择</option>
                {["产地直发", "仓库发货", "冷链配送"].map(c => <option key={c}>{c}</option>)}
              </select>
              <div className="flex items-center gap-2">
                <span className={`${labelCls} whitespace-nowrap`}>交付周期{requiredMark}</span>
                <input value={deliveryCycle} onChange={e => setDeliveryCycle(e.target.value)}
                  placeholder="请输入" className={`${inputCls} flex-1`} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`${labelCls} w-28 text-right`}>集采报名人数最低门槛{requiredMark}</span>
            <div className="flex flex-col border border-[#dde3ec] rounded overflow-hidden w-16">
              <button onClick={() => setMinSignup(String(Math.max(1, parseInt(minSignup || "0") + 1)))}
                className="text-[#6b7c93] hover:bg-[#f5f7fa] text-[10px] leading-4 px-2">▲</button>
              <input value={minSignup} onChange={e => setMinSignup(e.target.value)}
                className="text-center text-[12px] w-full border-y border-[#dde3ec] py-0.5 focus:outline-none" />
              <button onClick={() => setMinSignup(String(Math.max(1, parseInt(minSignup || "2") - 1)))}
                className="text-[#6b7c93] hover:bg-[#f5f7fa] text-[10px] leading-4 px-2">▼</button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`${labelCls} w-28 text-right`}>达到门槛后自动结束活动{requiredMark}</span>
            <button onClick={() => setAutoEnd(!autoEnd)}
              className={`relative w-10 h-5 rounded-full transition-colors ${autoEnd ? "bg-[#1a5fa8]" : "bg-[#dde3ec]"}`}>
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${autoEnd ? "left-[22px]" : "left-0.5"}`} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className={`${labelCls} w-28 text-right`}>支持使用零售价购买{requiredMark}</span>
            <button onClick={() => setSupportRetail(!supportRetail)}
              className={`relative w-10 h-5 rounded-full transition-colors ${supportRetail ? "bg-[#1a5fa8]" : "bg-[#dde3ec]"}`}>
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${supportRetail ? "left-[22px]" : "left-0.5"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* ── 支付与结算方式 ── */}
      <div className="bg-white rounded border border-[#e8edf5]">
        <div className="px-5 py-3 border-b border-[#f0f4f8] text-[13px] font-semibold text-[#1a1a2e] bg-[#f8fafc]">支付与结算方式</div>
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-6">
            <span className={`${labelCls} w-20 text-right`}>结算渠道{requiredMark}</span>
            {["建行龙存管", "工行安心付"].map(ch => (
              <label key={ch} className="flex items-center gap-1.5 text-[13px] cursor-pointer">
                <input type="checkbox" checked={settleChannels.includes(ch)}
                  onChange={() => toggleArr(settleChannels, setSettleChannels, ch)} />
                {ch}
              </label>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <span className={`${labelCls} w-20 text-right`}>结算方式{requiredMark}</span>
            {(["prepay", "full"] as const).map(m => (
              <label key={m} className="flex items-center gap-1.5 text-[13px] cursor-pointer">
                <input type="radio" checked={settleMode === m} onChange={() => setSettleMode(m)} />
                {m === "prepay" ? "预付款" : "全款全货"}
              </label>
            ))}
          </div>
          {settleMode === "prepay" && (
            <div className="flex items-center gap-3">
              <span className={`${labelCls} w-20 text-right`}>预付款比例{requiredMark}</span>
              <div className="flex items-center gap-1">
                <input value={prepayRatio} onChange={e => setPrepayRatio(e.target.value)}
                  placeholder="请输入预付款比例" className={`${inputCls} w-40`} />
                <span className="text-[13px] text-[#6b7c93]">%</span>
              </div>
            </div>
          )}
          <div className="flex items-center gap-6">
            <span className={`${labelCls} w-20 text-right`}>交易模式{requiredMark}</span>
            {["担保交易", "非担保交易"].map(m => (
              <label key={m} className="flex items-center gap-1.5 text-[13px] cursor-pointer">
                <input type="checkbox" checked={tradeMode.includes(m)}
                  onChange={() => toggleArr(tradeMode, setTradeMode, m)} />
                {m}
              </label>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <span className={`${labelCls} w-20 text-right`}>交易要素{requiredMark}</span>
            {["身份证号/统一信用代码", "手机号码", "姓名/企业名称"].map(el => (
              <label key={el} className="flex items-center gap-1.5 text-[13px] cursor-pointer">
                <input type="checkbox" checked={tradeElements.includes(el)}
                  onChange={() => toggleArr(tradeElements, setTradeElements, el)} />
                {el}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* ── 配送设置 ── */}
      <div className="bg-white rounded border border-[#e8edf5]">
        <div className="px-5 py-3 border-b border-[#f0f4f8] text-[13px] font-semibold text-[#1a1a2e] bg-[#f8fafc]">配送设置</div>
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-6">
            <span className={`${labelCls} w-20 text-right`}>配送方式{requiredMark}</span>
            {["卖家配送", "买家自提", "无需物流"].map(m => (
              <label key={m} className="flex items-center gap-1.5 text-[13px] cursor-pointer">
                <input type="checkbox" checked={deliveryMethods.includes(m)}
                  onChange={() => toggleArr(deliveryMethods, setDeliveryMethods, m)} />
                {m}
              </label>
            ))}
            <button className="text-[12px] text-[#1a5fa8] hover:underline">设置店铺配送规则 &gt;&gt;</button>
          </div>
          {deliveryMethods.includes("卖家配送") && (
            <div className="ml-28 space-y-1">
              <p className="text-[11px] text-[#e8831a]">请自行决定运费是否包含在商品销售价中，目前本平台不支持线上结算运费</p>
              {deliveryTemplates.map(t => (
                <div key={t.id} className="flex items-center gap-2">
                  <div className="flex items-center gap-1 border border-[#dde3ec] rounded px-2 py-1.5 w-48 text-[12px]">
                    <span className="flex-1 text-[#aab4c2]">{t.value || "请选择"}</span>
                    <ChevronDown className="w-3 h-3 text-[#aab4c2]" />
                  </div>
                  <button className="text-[12px] text-[#1a5fa8] hover:underline">新建</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── 活动说明 ── */}
      <div className="bg-white rounded border border-[#e8edf5]">
        <div className="px-5 py-3 border-b border-[#f0f4f8] text-[13px] font-semibold text-[#1a1a2e] bg-[#f8fafc]">活动说明</div>
        <div className="p-5">
          <textarea rows={4} value={activityDesc} onChange={e => setActivityDesc(e.target.value)}
            placeholder="填写活动详情、品质说明、注意事项等..."
            className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[12px] focus:outline-none focus:border-[#1a5fa8] resize-none" />
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex justify-end gap-3 pb-2">
        <Link href="/merchant/jicai/huodong-list"
          className="px-5 py-2 border border-[#dde3ec] text-[13px] text-[#555] rounded hover:bg-[#f5f7fa] transition-colors">
          取消
        </Link>
        <button className="px-5 py-2 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded hover:bg-[#e8f4fd] transition-colors">
          保存草稿
        </button>
        <button className="px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
          发布集采
        </button>
      </div>

      {/* ── 选择商品弹窗 ── */}
      {showPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowPicker(false)}>
          <div className="bg-white rounded-lg w-[640px] max-h-[80vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
            {/* header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8edf5]">
              <span className="text-[15px] font-semibold text-[#1a1a2e]">选择商品</span>
              <button onClick={() => setShowPicker(false)}>
                <X className="w-5 h-5 text-[#6b7c93] hover:text-[#333]" />
              </button>
            </div>
            {/* search */}
            <div className="px-5 py-3 flex items-center gap-3 border-b border-[#f0f4f8]">
              <div className="flex items-center gap-1 border border-[#dde3ec] rounded px-2 py-1.5 w-44 text-[12px]">
                <span className="flex-1 text-[#aab4c2]">{pickerCategory || "请选择分类"}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#aab4c2]" />
              </div>
              <input value={pickerSearch} onChange={e => setPickerSearch(e.target.value)}
                placeholder="请输入商品名称/平台SPU编码"
                className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
              <button className="flex items-center gap-1.5 bg-[#1a5fa8] text-white text-[12px] px-4 py-1.5 rounded hover:bg-[#0d4a8a]">
                <Search className="w-3.5 h-3.5" /> 搜索
              </button>
            </div>
            {/* list */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#f0f4f8]">
              {filteredProducts.map(p => (
                <div key={p.id}
                  onClick={() => setPickerSelected(p.id)}
                  className={`flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-[#f5f7fa] transition-colors ${pickerSelected === p.id ? "bg-[#e8f4fd]" : ""}`}>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${pickerSelected === p.id ? "border-[#1a5fa8] bg-[#1a5fa8]" : "border-[#dde3ec]"}`}>
                    {pickerSelected === p.id && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                  </div>
                  <div className="w-14 h-14 bg-[#e8edf5] rounded flex items-center justify-center shrink-0">
                    <div className="w-10 h-8 bg-[#a0b4c8] rounded" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-[#1a1a2e]">{p.name}</div>
                    <div className="text-[11px] text-[#6b7c93] mt-0.5">{p.category}</div>
                    <div className="text-[11px] text-[#aab4c2] mt-0.5">平台SPU编码：{p.spuCode}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* pagination */}
            <div className="px-5 py-3 border-t border-[#e8edf5] flex items-center justify-between">
              <span className="text-[11px] text-[#6b7c93]">共 658 项数据</span>
              <div className="flex items-center gap-1">
                {["<", "1", "2", "3", "4", "...", "10", ">"].map((p, i) => (
                  <button key={i}
                    className={`w-7 h-7 rounded text-[11px] transition-colors ${p === "1" ? "bg-[#1a5fa8] text-white" : "text-[#555] hover:bg-[#f0f4f8]"}`}>
                    {p}
                  </button>
                ))}
                <div className="flex items-center gap-1 border border-[#dde3ec] rounded px-2 py-1 ml-2 text-[11px]">
                  <span>10条/页</span>
                  <ChevronDown className="w-3 h-3 text-[#aab4c2]" />
                </div>
              </div>
            </div>
            {/* footer actions */}
            <div className="px-5 py-3 border-t border-[#e8edf5] flex justify-end gap-3">
              <button onClick={() => setShowPicker(false)}
                className="px-5 py-2 border border-[#dde3ec] text-[13px] text-[#555] rounded hover:bg-[#f5f7fa]">
                取消
              </button>
              <button onClick={confirmPicker} disabled={!pickerSelected}
                className="px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] disabled:opacity-40 transition-colors">
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
