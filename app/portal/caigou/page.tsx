"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ChevronLeft, Calendar, Plus } from "lucide-react"

/* ── 顶部行情：采/销均价 ── */
const PRICE_DATE = "2025-12-12"
const BUY_PRICES = [
  { cat: "稻谷", price: "12.10" },
  { cat: "冻肉", price: "12.10" },
  { cat: "豆类", price: "12.10" },
  { cat: "某某", price: "12.10" },
  { cat: "某某", price: "12.10" },
]
const SELL_PRICES = [
  { cat: "稻谷", price: "12.12" },
  { cat: "冻肉", price: "12.12" },
  { cat: "豆类", price: "12.12" },
  { cat: "某某", price: "12.12" },
  { cat: "某某", price: "12.12" },
]

/* ── 三大采购分类 ── */
const CATEGORIES = ["粮食采购", "特色农产品采购", "农资采购"] as const
type Category = (typeof CATEGORIES)[number]

/* ── 采购需求数据 ── */
type Demand = {
  id: string
  title: string
  goods: string
  receiveTime: string
  quoteDeadline: string
  tradeMode: "担保交易" | "非担保交易"
  prepayRatio: string
  status: "已报价" | "未报价"
}

const DEMANDS: Demand[] = [
  { id: "1", title: "食用油采购", goods: "压榨花生油（5L/桶）500桶", receiveTime: "2026-03-02 至 2026-03-26", quoteDeadline: "2026-04-30", tradeMode: "担保交易", prepayRatio: "15%", status: "已报价" },
  { id: "2", title: "中稻采购", goods: "收购本地农户种植的中稻，品种不限，预计采购量 200-300 吨", receiveTime: "2026-03-02 至 2026-04-26", quoteDeadline: "2026-04-30", tradeMode: "担保交易", prepayRatio: "10%", status: "已报价" },
  { id: "3", title: "稻谷类采购", goods: "求购储备用稻谷，国标三等及以上即可，采购总量 1000 吨", receiveTime: "2026-03-02 至 2026-03-26", quoteDeadline: "2026-04-30", tradeMode: "非担保交易", prepayRatio: "0%", status: "未报价" },
  { id: "4", title: "长粒香稻采购", goods: "有机长粒香稻（10kg / 真空袋）500 吨", receiveTime: "2026-03-10 至 2026-05-19", quoteDeadline: "2026-04-30", tradeMode: "非担保交易", prepayRatio: "15%", status: "未报价" },
  { id: "5", title: "冻肉采购", goods: "冻猪前腿肉（25kg/箱）800 吨", receiveTime: "2026-03-08 至 2026-04-18", quoteDeadline: "2026-04-30", tradeMode: "非担保交易", prepayRatio: "20%", status: "已报价" },
  { id: "6", title: "冻肉采购", goods: "原切冻牛腩（20kg / 箱）50 吨", receiveTime: "2026-03-10 至 2026-05-19", quoteDeadline: "2026-04-30", tradeMode: "担保交易", prepayRatio: "10%", status: "未报价" },
  { id: "7", title: "冻肉采购", goods: "采购单位食堂用冻猪肉制品，部位不限，总量100吨", receiveTime: "2026-03-02 至 2026-04-26", quoteDeadline: "2026-04-30", tradeMode: "非担保交易", prepayRatio: "25%", status: "未报价" },
  { id: "8", title: "大豆采购", goods: "有机黄大豆（10kg / 真空袋）30吨", receiveTime: "2026-03-02 至 2026-04-26", quoteDeadline: "2026-04-30", tradeMode: "担保交易", prepayRatio: "10%", status: "未报价" },
  { id: "9", title: "大豆采购", goods: "批量收购本地农户自产黄大豆，品种不限，预计采购量 300-400 吨", receiveTime: "2026-03-08 至 2026-04-18", quoteDeadline: "2026-04-30", tradeMode: "担保交易", prepayRatio: "0%", status: "未报价" },
  { id: "10", title: "大豆采购", goods: "求购储备级商品大豆，质量达国标三等及以上标准，采购总量 800 吨", receiveTime: "2026-03-02 至 2026-03-26", quoteDeadline: "2026-04-30", tradeMode: "非担保交易", prepayRatio: "10%", status: "未报价" },
]

export default function CaigouPage() {
  const [activeCat, setActiveCat] = useState<Category>("粮食采购")
  const [tradeMode, setTradeMode] = useState("全部")
  const [status, setStatus] = useState("全部")
  const [receiveTime, setReceiveTime] = useState("")
  const [keyword, setKeyword] = useState("")
  const [page, setPage] = useState(1)

  const filtered = DEMANDS.filter((d) => {
    const matchMode = tradeMode === "全部" || d.tradeMode === tradeMode
    const matchStatus = status === "全部" || d.status === status
    const matchKw = !keyword || d.title.includes(keyword) || d.goods.includes(keyword)
    return matchMode && matchStatus && matchKw
  })

  const reset = () => {
    setTradeMode("全部")
    setStatus("全部")
    setReceiveTime("")
    setKeyword("")
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-6 py-5">
          {/* 面包屑 */}
          <div className="flex items-center gap-1.5 text-[13px] text-[#6b7c93] mb-4">
            <Link href="/portal" className="flex items-center gap-1 hover:text-[#1a5fa8] transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" />首页
            </Link>
            <span>/</span>
            <span className="text-[#1a1a2e]">采购专区</span>
          </div>

          {/* 行情条 */}
          <div className="space-y-2 mb-6">
            {[
              { tag: "采", label: "均价", data: BUY_PRICES, tagBg: "bg-[#1a5fa8]" },
              { tag: "销", label: "均价", data: SELL_PRICES, tagBg: "bg-[#1a5fa8]" },
            ].map((row, ri) => (
              <div key={ri} className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`inline-flex items-center justify-center w-6 h-6 text-[13px] font-bold text-white rounded ${row.tagBg}`}>{row.tag}</span>
                  <span className="text-[13px] text-[#6b7c93]">{row.label}</span>
                </div>
                {row.data.map((p, i) => (
                  <div key={i} className="text-[13px] text-[#6b7c93]">
                    {PRICE_DATE} {p.cat} <span className="text-[#e8831a] font-bold">{p.price}</span> 元 / 斤
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* 三大分类切换 */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => { setActiveCat(c); setPage(1) }}
                className={`py-7 rounded-lg text-[22px] font-bold transition-all ${
                  activeCat === c
                    ? "bg-[#1a5fa8] text-white shadow-md"
                    : "bg-[#dbe6f2] text-[#4a6b8a] hover:bg-[#cddcec]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* 筛选栏 */}
          <div className="bg-white border border-border rounded-lg p-5 mb-4">
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#6b7c93] whitespace-nowrap">交易模式：</label>
                <select value={tradeMode} onChange={(e) => setTradeMode(e.target.value)}
                  className="border border-border rounded px-3 py-1.5 text-[13px] text-[#333] outline-none focus:border-[#1a5fa8] bg-white min-w-[90px]">
                  <option>全部</option><option>担保交易</option><option>非担保交易</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#6b7c93] whitespace-nowrap">状态：</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}
                  className="border border-border rounded px-3 py-1.5 text-[13px] text-[#333] outline-none focus:border-[#1a5fa8] bg-white min-w-[90px]">
                  <option>全部</option><option>已报价</option><option>未报价</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#6b7c93] whitespace-nowrap">期望收货时间：</label>
                <div className="flex items-center gap-2 border border-border rounded px-3 py-1.5 focus-within:border-[#1a5fa8] transition-colors bg-white">
                  <input type="date" value={receiveTime} onChange={(e) => setReceiveTime(e.target.value)}
                    className="text-[13px] text-[#333] outline-none w-[130px]" placeholder="选择收货时间" />
                  <Calendar className="w-3.5 h-3.5 text-[#6b7c93]" />
                </div>
              </div>
              <div className="flex items-center gap-2 flex-1 min-w-[220px]">
                <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}
                  placeholder="请输入搜索关键字"
                  className="flex-1 border border-border rounded px-3 py-1.5 text-[13px] outline-none focus:border-[#1a5fa8] placeholder:text-[#bbb]" />
              </div>
              <div className="flex items-center gap-2">
                <button onClick={reset}
                  className="px-5 py-1.5 text-[13px] text-[#333] border border-border rounded hover:border-[#1a5fa8] transition-colors">重置</button>
                <button
                  className="px-5 py-1.5 text-[13px] text-white bg-[#1a5fa8] rounded hover:bg-[#0d4a8a] transition-colors">搜索</button>
              </div>
            </div>
          </div>

          {/* 发布按钮 */}
          <div className="flex justify-end mb-3">
            <Link href="/portal/dingdan-nongye/caigou-xunjia"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-white bg-[#0d4a8a] rounded hover:bg-[#0a3d73] transition-colors">
              <Plus className="w-4 h-4" />发布农产品采购需求
            </Link>
          </div>

          {/* 需求表格 */}
          <div className="bg-white border border-border rounded-lg overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[#f5f7fa] text-[#6b7c93]">
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">需求标题</th>
                  <th className="px-4 py-3 text-left font-semibold">商品信息</th>
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">期望收货时间</th>
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">报价截止日期</th>
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">交易模式</th>
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">预付款比例</th>
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">状态</th>
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">操作</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr key={d.id} className="border-t border-border hover:bg-[#fafbfc] transition-colors">
                    <td className="px-4 py-4 text-[#1a1a2e] whitespace-nowrap align-top">{d.title}</td>
                    <td className="px-4 py-4 text-[#6b7c93] align-top max-w-[220px]">{d.goods}</td>
                    <td className="px-4 py-4 text-[#6b7c93] whitespace-nowrap align-top">{d.receiveTime}</td>
                    <td className="px-4 py-4 text-[#6b7c93] whitespace-nowrap align-top">{d.quoteDeadline}</td>
                    <td className="px-4 py-4 text-[#6b7c93] whitespace-nowrap align-top">{d.tradeMode}</td>
                    <td className="px-4 py-4 text-[#6b7c93] whitespace-nowrap align-top">{d.prepayRatio}</td>
                    <td className="px-4 py-4 whitespace-nowrap align-top">
                      <span className={d.status === "已报价" ? "text-[#3a8c3f]" : "text-[#6b7c93]"}>{d.status}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap align-top">
                      <div className="flex items-center gap-3">
                        <Link href={`/portal/caigou/${d.id}`} className="text-[#1a5fa8] hover:underline">详情</Link>
                        {d.status === "已报价" ? (
                          <Link href={`/portal/caigou/${d.id}`} className="text-[#1a5fa8] hover:underline">查看报价</Link>
                        ) : (
                          <Link href={`/portal/caigou/${d.id}`} className="text-[#1a5fa8] hover:underline">去报价</Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="px-4 py-12 text-center text-[#999]">暂无符合条件的采购需求</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 分页 */}
          <div className="flex items-center justify-end gap-2 mt-5 text-[13px] text-[#6b7c93]">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 border border-border rounded bg-white hover:border-[#1a5fa8] transition-colors">上一页</button>
            {[1, 2, 3].map((p) => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-8 h-8 rounded border transition-colors ${
                  p === page ? "bg-[#1a5fa8] text-white border-[#1a5fa8]" : "bg-white text-[#333] border-border hover:border-[#1a5fa8]"
                }`}>{p}</button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(3, p + 1))}
              className="px-3 py-1.5 border border-border rounded bg-white hover:border-[#1a5fa8] transition-colors">下一页</button>
            <span className="ml-1">到第</span>
            <input className="w-12 border border-border rounded px-2 py-1.5 text-center outline-none focus:border-[#1a5fa8]" defaultValue={page} />
            <span>页</span>
            <button className="px-3 py-1.5 border border-border rounded bg-white hover:border-[#1a5fa8] transition-colors">GO</button>
            <span className="ml-1">共 3 页</span>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
