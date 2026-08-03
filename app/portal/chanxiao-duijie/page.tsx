"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ChevronLeft, ChevronRight, ArrowRight, X, Plus, Minus } from "lucide-react"

/* ─── Types ─── */
type InfoType = "采购" | "供应"

interface InfoRow {
  id: string
  type: InfoType
  company: string
  product: string
  qty: string
  supplyStart: string
  supplyEnd: string
  delivery: string
  publishTime: string
}

interface SubCategory {
  name: string
  totalQty: string
  totalAmt: string
}

interface Category {
  name: string
  totalQty: string
  totalAmt: string
  subs: SubCategory[]
  rows: InfoRow[]
  moreHref: string
}

/* ─── Mock data ─── */
const categories: Category[] = [
  {
    name: "粮食",
    totalQty: "10000吨",
    totalAmt: "1000000万元",
    moreHref: "/portal/chanxiao-duijie?cat=粮食",
    subs: [
      { name: "南晶香占", totalQty: "100吨", totalAmt: "100万元" },
      { name: "大豆",     totalQty: "100吨", totalAmt: "100万元" },
      { name: "玉米",     totalQty: "100吨", totalAmt: "100万元" },
      { name: "xx米",     totalQty: "100吨", totalAmt: "100万元" },
      { name: "xx粮食",   totalQty: "100吨", totalAmt: "100万元" },
      { name: "xx粮食2",  totalQty: "100吨", totalAmt: "100万元" },
      { name: "xx粮食3",  totalQty: "100吨", totalAmt: "100万元" },
      { name: "xx粮食4",  totalQty: "100吨", totalAmt: "100万元" },
    ],
    rows: [
      { id: "CG001", type: "采购", company: "广东新天润有限公司", product: "大米",   qty: "8000公斤", supplyStart: "2026-03-02", supplyEnd: "2026-03-26", delivery: "买家自提",         publishTime: "2026-04-05" },
      { id: "XS001", type: "供应", company: "广东某某有限公司",   product: "大豆",   qty: "7000公斤", supplyStart: "2026-03-02", supplyEnd: "2026-04-26", delivery: "买家自提、卖家配送", publishTime: "2026-04-03" },
      { id: "XS002", type: "供应", company: "广东某某有限公司",   product: "玉米",   qty: "9000公斤", supplyStart: "2026-03-02", supplyEnd: "2026-03-26", delivery: "买家自提",         publishTime: "2026-03-30" },
      { id: "CG002", type: "采购", company: "广东某某有限公司",   product: "大米",   qty: "6000公斤", supplyStart: "2026-03-10", supplyEnd: "2026-05-19", delivery: "买家自提",         publishTime: "2026-03-29" },
      { id: "XS003", type: "供应", company: "广东某某有限公司",   product: "大米",   qty: "9000公斤", supplyStart: "2026-03-08", supplyEnd: "2026-04-18", delivery: "卖家配送",         publishTime: "2026-03-28" },
    ],
  },
  {
    name: "特色农产品",
    totalQty: "10000吨",
    totalAmt: "1000000万元",
    moreHref: "/portal/chanxiao-duijie?cat=特色农产品",
    subs: [
      { name: "特色农产品1", totalQty: "100吨", totalAmt: "100万元" },
      { name: "特色农产品2", totalQty: "100吨", totalAmt: "100万元" },
      { name: "特色农产品3", totalQty: "100吨", totalAmt: "100万元" },
      { name: "特色农产品4", totalQty: "100吨", totalAmt: "100万元" },
      { name: "特色农产品5", totalQty: "100吨", totalAmt: "100万元" },
      { name: "特色农产品6", totalQty: "100吨", totalAmt: "100万元" },
      { name: "特色农产品7", totalQty: "100吨", totalAmt: "100万元" },
    ],
    rows: [
      { id: "CG003", type: "采购", company: "广东新天润有限公司", product: "某特色农产品", qty: "8000公斤", supplyStart: "2026-03-02", supplyEnd: "2026-03-26", delivery: "买家自提",         publishTime: "2026-04-05" },
      { id: "XS004", type: "供应", company: "广东某某有限公司",   product: "某特色农产品", qty: "7000公斤", supplyStart: "2026-03-02", supplyEnd: "2026-04-26", delivery: "买家自提、卖家配送", publishTime: "2026-04-03" },
      { id: "XS005", type: "供应", company: "广东某某有限公司",   product: "某特色农产品", qty: "9000公斤", supplyStart: "2026-03-02", supplyEnd: "2026-03-26", delivery: "买家自提",         publishTime: "2026-03-30" },
      { id: "CG004", type: "采购", company: "广东某某有限公司",   product: "某特色农产品", qty: "6000公斤", supplyStart: "2026-03-10", supplyEnd: "2026-05-19", delivery: "买家自提",         publishTime: "2026-03-29" },
      { id: "XS006", type: "供应", company: "广东某某有限公司",   product: "某特色农产品", qty: "9000公斤", supplyStart: "2026-03-08", supplyEnd: "2026-04-18", delivery: "卖家配送",         publishTime: "2026-03-28" },
    ],
  },
  {
    name: "农资",
    totalQty: "10000吨",
    totalAmt: "1000000万元",
    moreHref: "/portal/chanxiao-duijie?cat=农资",
    subs: [
      { name: "BB肥",  totalQty: "100吨", totalAmt: "100万元" },
      { name: "复合肥", totalQty: "100吨", totalAmt: "100万元" },
      { name: "有机肥", totalQty: "100吨", totalAmt: "100万元" },
      { name: "氮肥",  totalQty: "100吨", totalAmt: "100万元" },
      { name: "钾肥",  totalQty: "100吨", totalAmt: "100万元" },
      { name: "某某肥", totalQty: "100吨", totalAmt: "100万元" },
      { name: "某某肥2", totalQty: "100吨", totalAmt: "100万元" },
    ],
    rows: [
      { id: "CG005", type: "采购", company: "广东新天润有限公司", product: "BB肥",  qty: "8000公斤", supplyStart: "2026-03-02", supplyEnd: "2026-03-26", delivery: "买家自提",         publishTime: "2026-04-05" },
      { id: "XS007", type: "供应", company: "广东某某有限公司",   product: "复合肥", qty: "7000公斤", supplyStart: "2026-03-02", supplyEnd: "2026-04-26", delivery: "买家自提、卖家配送", publishTime: "2026-04-03" },
      { id: "XS008", type: "供应", company: "广东某某有限公司",   product: "有机肥", qty: "9000公斤", supplyStart: "2026-03-02", supplyEnd: "2026-03-26", delivery: "买家自提",         publishTime: "2026-03-30" },
      { id: "CG006", type: "采购", company: "广东某某有限公司",   product: "氮肥",  qty: "6000公斤", supplyStart: "2026-03-10", supplyEnd: "2026-05-19", delivery: "买家自提",         publishTime: "2026-03-29" },
      { id: "XS009", type: "供应", company: "广东某某有限公司",   product: "钾肥",  qty: "9000公斤", supplyStart: "2026-03-08", supplyEnd: "2026-04-18", delivery: "卖家配送",         publishTime: "2026-03-28" },
    ],
  },
]

/* ─── 加入采购车弹窗 ─── */
interface CartModalRow {
  id: string
  company: string
  product: string
  delivery: string
}

function AddToCartModal({ row, onClose }: { row: CartModalRow; onClose: () => void }) {
  const [deliveryMethod, setDeliveryMethod] = useState<"卖家配送" | "买家自提">("卖家配送")
  const [address, setAddress] = useState("")
  const [settlement, setSettlement] = useState<"建行龙存管" | "工行安心付">("建行龙存管")
  const [qty, setQty] = useState(0)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    setAdded(true)
    setTimeout(() => onClose(), 800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-lg w-[680px] max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
          <h3 className="text-[16px] font-bold text-[#1a1a2e]">快速加入购物车</h3>
          <button onClick={onClose} className="text-[#999] hover:text-[#333] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* 商品基础信息 */}
          <div>
            <div className="text-[13px] text-[#6b7c93] mb-1">{row.company}</div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[20px] font-bold text-[#1a1a2e]">{row.product}</span>
              <span className="px-2.5 py-0.5 bg-[#e8831a] text-white text-[12px] rounded font-medium">询价</span>
            </div>
            <div className="text-[13px] text-[#999]">平台严选优质农产品</div>
          </div>

          {/* 配送方式 */}
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[#555] w-[72px] shrink-0">配送方式</span>
            <div className="flex gap-2">
              {(["卖家配送", "买家自提"] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setDeliveryMethod(m)}
                  className={`px-4 py-1.5 rounded border text-[13px] transition-colors ${
                    deliveryMethod === m
                      ? "border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8] font-medium"
                      : "border-[#dde3ec] text-[#555] hover:border-[#1a5fa8]/60"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* 收货地址 */}
          {deliveryMethod === "卖家配送" && (
            <div className="flex items-center gap-4">
              <span className="text-[13px] text-[#555] w-[72px] shrink-0">收货地址</span>
              <div className="flex-1 flex gap-2">
                <select
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] text-[#999]"
                >
                  <option value="">请选择地址</option>
                  <option value="a1">广州市天河区珠江新城花城大道88号</option>
                  <option value="a2">广州市番禺区大石镇石岗路99号冷链仓储中心</option>
                </select>
                <button className="px-3 py-1.5 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded hover:bg-[#e8f4fd] transition-colors shrink-0">
                  新增
                </button>
              </div>
            </div>
          )}

          {/* 结算渠道 */}
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[#555] w-[72px] shrink-0">结算渠道</span>
            <div className="flex gap-2">
              {(["建行龙存管", "工行安心付"] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setSettlement(s)}
                  className={`px-4 py-1.5 rounded border text-[13px] transition-colors ${
                    settlement === s
                      ? "border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8] font-medium"
                      : "border-[#dde3ec] text-[#555] hover:border-[#1a5fa8]/60"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 结算方式 */}
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[#555] w-[72px] shrink-0">结算方式</span>
            <span className="text-[13px] text-[#333]">全款全货</span>
          </div>

          {/* 交易方式 */}
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[#555] w-[72px] shrink-0">交易方式</span>
            <button className="px-4 py-1.5 rounded border border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8] text-[13px] font-medium">
              担保交易
            </button>
          </div>

          {/* 规格明细 */}
          <div className="border border-[#e8edf5] rounded overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f5f7fa]">
                  {["规格", "价格", "预估供应量", "起批量", "数量"].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-[12px] text-[#666] font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#e8edf5]">
                  <td className="px-4 py-3 text-[13px] text-[#333]">斤</td>
                  <td className="px-4 py-3 text-[13px] text-[#333]">1.20元</td>
                  <td className="px-4 py-3 text-[13px] text-[#333]">100 斤</td>
                  <td className="px-4 py-3 text-[13px] text-[#333]">1 斤</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setQty(Math.max(0, qty - 1))}
                        className="w-6 h-6 rounded border border-[#dde3ec] flex items-center justify-center hover:border-[#1a5fa8] transition-colors"
                      >
                        <Minus className="w-3 h-3 text-[#555]" />
                      </button>
                      <span className="w-10 text-center text-[13px] font-medium">{qty}</span>
                      <button
                        onClick={() => setQty(qty + 1)}
                        className="w-6 h-6 rounded border border-[#dde3ec] flex items-center justify-center hover:border-[#1a5fa8] transition-colors"
                      >
                        <Plus className="w-3 h-3 text-[#555]" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#e8edf5]">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-[#dde3ec] text-[#555] text-[14px] rounded hover:border-[#999] transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleAdd}
            disabled={added}
            className="px-8 py-2 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors disabled:opacity-70"
          >
            {added ? "已加入" : "加入购物车"}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Sub-component: one category section ─── */
function CategorySection({ cat }: { cat: Category }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<"全部" | "仅看采购信息" | "仅看供应信息">("全部")
  const [keyword, setKeyword] = useState("")
  const [cartModalRow, setCartModalRow] = useState<CartModalRow | null>(null)

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === "left" ? -240 : 240, behavior: "smooth" })
  }

  const rows = cat.rows.filter((r) => {
    if (filter === "仅看采购信息" && r.type !== "采购") return false
    if (filter === "仅看供应信息" && r.type !== "供应") return false
    if (keyword && !r.product.includes(keyword) && !r.company.includes(keyword)) return false
    return true
  })

  return (
    <section className="mb-10">
      {/* Category title */}
      <h2 className="text-[24px] font-bold text-[#1a1a2e] text-center mb-1">{cat.name}</h2>
      <div className="text-center text-[#1a5fa8] text-[14px] mb-4">
        总量：<span className="font-semibold">{cat.totalQty}</span>
        <span className="mx-4" />
        总额：<span className="font-semibold">{cat.totalAmt}</span>
      </div>

      {/* Sub-category scroll strip */}
      <div className="relative flex items-center mb-4">
        <button
          onClick={() => scroll("left")}
          className="w-7 h-7 rounded-full bg-white border border-[#dde3ec] flex items-center justify-center shrink-0 mr-1 hover:bg-[#e8f4fd] transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-[#555]" />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide flex-1"
          style={{ scrollbarWidth: "none" }}
        >
          {cat.subs.map((sub) => (
            <div
              key={sub.name}
              className="shrink-0 border border-[#b3d4f5] bg-[#e8f4fd] rounded px-3 py-1.5 min-w-[100px] text-center cursor-pointer hover:border-[#1a5fa8] transition-colors"
            >
              <div className="text-[12px] font-semibold text-[#1a5fa8] mb-1">{sub.name}</div>
              <div className="flex justify-between text-[11px] text-[#555] gap-2">
                <span>总量</span><span>总额</span>
              </div>
              <div className="flex justify-between text-[11px] font-medium text-[#333] gap-2">
                <span>{sub.totalQty}</span><span>{sub.totalAmt}</span>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="w-7 h-7 rounded-full bg-white border border-[#dde3ec] flex items-center justify-center shrink-0 ml-1 hover:bg-[#e8f4fd] transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-[#555]" />
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 mb-0 border border-[#dde3ec] bg-white px-4 py-2.5 rounded-t">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="border border-[#dde3ec] rounded px-2 py-1 text-[12px] focus:outline-none focus:border-[#1a5fa8]"
        >
          <option value="全部">全部信息</option>
          <option value="仅看采购信息">仅看采购信息</option>
          <option value="仅看供应信息">仅看供应信息</option>
        </select>
        <select className="border border-[#dde3ec] rounded px-2 py-1 text-[12px] focus:outline-none focus:border-[#1a5fa8]">
          <option>商品分类</option>
        </select>
        <div className="flex-1" />
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="请输入商品名称"
          className="border border-[#dde3ec] rounded px-3 py-1 text-[12px] w-[180px] focus:outline-none focus:border-[#1a5fa8]"
        />
        <button className="px-4 py-1 bg-[#1a5fa8] text-white text-[12px] rounded hover:bg-[#0d4a8a] transition-colors">
          搜索
        </button>
      </div>

      {/* Table */}
      <div className="border border-[#dde3ec] border-t-0 bg-white rounded-b overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f5f7fa] border-b border-[#dde3ec]">
              {["采购 / 供应方", "商品", "数量", "采购 / 供应时间", "配送方式", "发布时间", "操作"].map((h) => (
                <th key={h} className="px-3 py-2.5 text-left text-[12px] text-[#666] font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isCaigou = row.type === "采购"
              const detailHref = isCaigou
                ? `/portal/chanxiao-duijie/caigou-detail?id=${row.id}`
                : `/portal/chanxiao-duijie/xiaoshou-detail?id=${row.id}`
              return (
                <tr key={row.id} className="border-b border-[#f0f2f5] hover:bg-[#fafbfd] transition-colors">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`shrink-0 px-1.5 py-0.5 rounded text-[11px] font-semibold ${
                        isCaigou ? "bg-[#1a5fa8] text-white" : "bg-[#3a8c3f] text-white"
                      }`}>
                        {row.type}
                      </span>
                      <span className="text-[13px] text-[#333]">{row.company}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-[13px] text-[#333]">{row.product}</td>
                  <td className="px-3 py-3 text-[13px] text-[#333]">{row.qty}</td>
                  <td className="px-3 py-3 text-[13px] text-[#555]">{row.supplyStart} 至 {row.supplyEnd}</td>
                  <td className="px-3 py-3 text-[13px] text-[#555]">{row.delivery}</td>
                  <td className="px-3 py-3 text-[13px] text-[#999]">{row.publishTime}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3 text-[12px]">
                      <Link href={detailHref} className="text-[#1a5fa8] hover:underline">
                        详情
                      </Link>
                      {isCaigou ? (
                        <Link href={`/portal/chanxiao-duijie/caigou-detail?id=${row.id}`} className="text-[#e8831a] hover:underline">
                          去报价
                        </Link>
                      ) : (
                        <>
                          <button
                            onClick={() => setCartModalRow({ id: row.id, company: row.company, product: row.product, delivery: row.delivery })}
                            className="text-[#1a5fa8] hover:underline text-[12px]"
                          >
                            加入采购车
                          </button>
                          <Link href={`/portal/checkout?id=${row.id}`} className="text-[#e8831a] hover:underline">
                            立即下单
                          </Link>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* More button */}
      <div className="text-center mt-4">
        <Link
          href={cat.moreHref}
          className="inline-flex items-center gap-2 px-8 py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors"
        >
          更多{cat.name}产销信息 <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 加入采购车弹窗 */}
      {cartModalRow && (
        <AddToCartModal row={cartModalRow} onClose={() => setCartModalRow(null)} />
      )}
    </section>
  )
}

/* ─── Page ─── */
export default function ChanxiaoDuijiePage() {
  // keyword state removed — search is handled per-section in CategorySection
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">

        {/* Hero Banner */}
        <div
          className="relative w-full h-[240px] flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0a3d7a 0%, #1a5fa8 50%, #1e7fc4 100%)",
          }}
        >
          {/* Background texture overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          {/* Decorative circles */}
          <div className="absolute left-[8%] top-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/10 opacity-30" />
          <div className="absolute left-[6%] top-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white/10 opacity-20" />
          <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/10 opacity-30" />
          <div className="absolute right-[6%] top-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white/10 opacity-20" />

          {/* Content */}
          <div className="relative z-10 text-center">
            <h1 className="text-[42px] font-bold text-white mb-2 tracking-wide">产销对接</h1>
            <p className="text-[16px] text-white/80 mb-5">产销衔接 阳光高效</p>
            <div className="flex items-center justify-center gap-4">
              <span className="px-5 py-1.5 rounded-full border border-white/40 bg-white/10 text-white text-[14px] backdrop-blur-sm">
                采购 → 销售
              </span>
              <span className="px-5 py-1.5 rounded-full border border-white/40 bg-white/10 text-white text-[14px] backdrop-blur-sm">
                高效 → 共赢
              </span>
            </div>
          </div>
        </div>

        {/* Category sections */}
        <div className="max-w-[1100px] mx-auto px-6 py-8">
          {categories.map((cat) => (
            <CategorySection key={cat.name} cat={cat} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
