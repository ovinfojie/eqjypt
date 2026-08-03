"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Search, ChevronRight, Calendar, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react"

const COMMODITY_TAGS = ["全部", "丝苗米", "土豆", "菠萝", "东布", "象牙香占", "荔枝", "玉米", "大豆", "花生", "西瓜", "番薯"]

const ALL_DEMANDS = [
  { company: "廉州新供销天润粮油储量有限公司", title: "2026年广东省内计划大量采购丝苗米", product: "丝苗米", qty: 900, signed: 400, unit: "吨", dateRange: "2026-01 至 2026-07", category: "丝苗米" },
  { company: "廉州中信供销润农农产品有限公司", title: "2026年广东省内计划大量采购菠萝干", product: "菠萝干", qty: 8000, signed: 5000, unit: "公斤", dateRange: "2026-03 至 2026-06", category: "菠萝" },
  { company: "广东新供销天润米业有限公司", title: "2026年广东省内计划大量采购象牙香占米", product: "象牙香占", qty: 3, signed: 1.2, unit: "吨", dateRange: "2026-05 至 2026-08", category: "象牙香占" },
  { company: "广东天富冷链物流有限公司", title: "2026年广东省内计划大量采购恩平土豆", product: "土豆", qty: 10, signed: 10, unit: "吨", dateRange: "2026-08 至 2026-11", category: "土豆" },
  { company: "广州农产品交易有限公司", title: "2026年春季大宗采购荔枝计划", product: "荔枝", qty: 50, signed: 20, unit: "吨", dateRange: "2026-05 至 2026-07", category: "荔枝" },
  { company: "深圳鲜果供应链有限公司", title: "2026年广东优质玉米采购计划", product: "玉米", qty: 200, signed: 80, unit: "吨", dateRange: "2026-06 至 2026-09", category: "玉米" },
  { company: "广东粮食集团采购部", title: "2026年大豆年度采购框架协议", product: "大豆", qty: 500, signed: 150, unit: "吨", dateRange: "2026-01 至 2026-12", category: "大豆" },
  { company: "珠海农业发展有限公司", title: "2026年花生仁批量采购需求", product: "花生", qty: 120, signed: 60, unit: "吨", dateRange: "2026-04 至 2026-08", category: "花生" },
  { company: "佛山供销社农产品中心", title: "2026年西瓜季节性采购计划", product: "西瓜", qty: 300, signed: 100, unit: "吨", dateRange: "2026-05 至 2026-08", category: "西瓜" },
  { company: "东莞冷链配送有限公司", title: "2026年番薯年度采购协议", product: "番薯", qty: 80, signed: 30, unit: "吨", dateRange: "2026-02 至 2026-11", category: "番薯" },
  { company: "中山市农业供应链公司", title: "2026年丝苗米优质品种采购", product: "丝苗米", qty: 600, signed: 200, unit: "吨", dateRange: "2026-03 至 2026-09", category: "丝苗米" },
  { company: "惠州农产品流通公司", title: "2026年菠萝原果批量采购计划", product: "菠萝", qty: 5000, signed: 2000, unit: "公斤", dateRange: "2026-04 至 2026-07", category: "菠萝" },
]

const PAGE_SIZE = 8

export default function XqListPage() {
  const [keyword, setKeyword] = useState("")
  const [activeTag, setActiveTag] = useState("全部")
  const [page, setPage] = useState(1)

  const filtered = ALL_DEMANDS.filter((r) => {
    const matchTag = activeTag === "全部" || r.category === activeTag
    const matchKw = !keyword || r.company.includes(keyword) || r.product.includes(keyword) || r.title.includes(keyword)
    return matchTag && matchKw
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <div className="bg-[#1a5fa8] py-10">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="flex items-center gap-2 text-white/60 text-[13px] mb-3">
              <Link href="/portal" className="hover:text-white transition-colors">首页</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/portal/dingdan-nongye" className="hover:text-white transition-colors">订单农业服务</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">订单种植需求列表</span>
            </div>
            <h1 className="text-[28px] font-bold text-white mb-1">订单种植需求</h1>
            <p className="text-white/70 text-[14px]">共 {ALL_DEMANDS.length} 条需求 · 实时更新</p>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-8 py-8">

          {/* 商品标签筛选 */}
          <div className="bg-white border border-[#e8edf5] rounded-lg p-4 mb-4 flex items-center gap-2 flex-wrap">
            <span className="text-[12px] text-[#6b7c93] shrink-0">商品分类：</span>
            {COMMODITY_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => { setActiveTag(tag); setPage(1) }}
                className={`px-3 py-1 rounded text-[12px] border transition-colors ${
                  activeTag === tag
                    ? "bg-[#1a5fa8] text-white border-[#1a5fa8]"
                    : "bg-white text-[#6b7c93] border-[#dde3ec] hover:border-[#1a5fa8] hover:text-[#1a5fa8]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* 搜索栏 */}
          <div className="bg-white border border-[#e8edf5] rounded-lg p-4 mb-4 flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 border border-[#dde3ec] rounded px-3 h-9">
              <Search className="w-4 h-4 text-[#6b7c93] shrink-0" />
              <input
                type="text"
                placeholder="输入公司/商品/需求搜索..."
                value={keyword}
                onChange={(e) => { setKeyword(e.target.value); setPage(1) }}
                className="flex-1 text-[13px] outline-none bg-transparent placeholder:text-[#aaa]"
              />
            </div>
            <button className="px-5 h-9 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
              搜索
            </button>
            <Link
              href="/merchant/dingdan-nongye/fabu-xq"
              className="px-5 h-9 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded hover:bg-[#e8f4fd] transition-colors flex items-center gap-1.5"
            >
              + 发布需求
            </Link>
          </div>

          {/* 数据表格 */}
          <div className="bg-white border border-[#e8edf5] rounded-lg overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[#f5f7fa] border-b border-[#e8edf5]">
                  {["公司信息", "需求", "商品", "预估总采购量", "已签约进度", "计划收购时间", "操作"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-[#555] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-[#aaa] text-[13px]">暂无符合条件的需求</td>
                  </tr>
                ) : paginated.map((row, i) => {
                  const pct = row.qty > 0 ? Math.round((row.signed / row.qty) * 100) : 0
                  return (
                    <tr key={i} className="border-b border-[#f0f4f8] hover:bg-[#fafcff] transition-colors">
                      <td className="px-4 py-3 text-[#333] max-w-[180px]">
                        <div className="truncate">{row.company}</div>
                      </td>
                      <td className="px-4 py-3 text-[#1a5fa8] max-w-[220px]">
                        <div className="truncate">{row.title}</div>
                      </td>
                      <td className="px-4 py-3 font-medium text-[#1a1a2e] whitespace-nowrap">{row.product}</td>
                      <td className="px-4 py-3 text-[#1a1a2e] whitespace-nowrap">{row.qty}{row.unit}</td>
                      <td className="px-4 py-3 w-40">
                        <div className="text-[12px] text-[#6b7c93] mb-1">余：{row.qty - row.signed}{row.unit}</div>
                        <div className="h-2 bg-[#e8edf5] rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-[#1a5fa8]" style={{ width: `${Math.min(pct, 100)}%` }} />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#6b7c93] text-[12px] whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          {row.dateRange}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <Link href="/portal/dingdan-nongye/xq-detail" className="text-[12px] text-[#1a5fa8] hover:underline">详细信息</Link>
                          <Link href="/portal/dingdan-nongye/gongying-baojia" className="text-[12px] text-[#e8831a] hover:underline">发起供应报价</Link>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {/* 分页 */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-[#e8edf5]">
              <span className="text-[12px] text-[#6b7c93]">共 {filtered.length} 条</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-7 h-7 flex items-center justify-center rounded border border-[#e8edf5] text-[#6b7c93] hover:border-[#1a5fa8] hover:text-[#1a5fa8] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-7 h-7 flex items-center justify-center rounded border text-[12px] transition-colors ${
                      p === page
                        ? "bg-[#1a5fa8] text-white border-[#1a5fa8]"
                        : "border-[#e8edf5] text-[#6b7c93] hover:border-[#1a5fa8] hover:text-[#1a5fa8]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-7 h-7 flex items-center justify-center rounded border border-[#e8edf5] text-[#6b7c93] hover:border-[#1a5fa8] hover:text-[#1a5fa8] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
