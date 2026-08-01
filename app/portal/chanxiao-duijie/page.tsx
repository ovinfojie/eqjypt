"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

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

/* ─── Sub-component: one category section ─── */
function CategorySection({ cat }: { cat: Category }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<"全部" | "仅看采购信息" | "仅看供应信息">("全部")
  const [keyword, setKeyword] = useState("")

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
                          <button className="text-[#1a5fa8] hover:underline">加入采购车</button>
                          <Link href={`/portal/chanxiao-duijie/xiaoshou-detail?id=${row.id}`} className="text-[#e8831a] hover:underline">
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
