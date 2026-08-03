"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Search, ChevronRight, Calendar, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react"

const COMMODITY_TAGS = ["全部", "丝苗米", "土豆", "菠萝", "荔枝", "玉米", "大豆", "花生", "象牙香占", "西瓜", "番薯"]

const ALL_SUPPLIES = [
  { company: "茂名市荔枝合作社联合会", title: "2026年茂名优质荔枝大批量供应", product: "荔枝", qty: 200, signed: 80, unit: "吨", dateRange: "2026-05 至 2026-07", category: "荔枝" },
  { company: "南雄丝苗米种植合作社", title: "2026年南雄丝苗米年度供应计划", product: "丝苗米", qty: 500, signed: 200, unit: "吨", dateRange: "2026-03 至 2026-10", category: "丝苗米" },
  { company: "广东绿野农业有限公司", title: "2026年春季菠萝鲜果供应", product: "菠萝", qty: 10000, signed: 4000, unit: "公斤", dateRange: "2026-04 至 2026-06", category: "菠萝" },
  { company: "恩平土豆种植基地", title: "2026年恩平特色土豆批量供应", product: "土豆", qty: 50, signed: 30, unit: "吨", dateRange: "2026-08 至 2026-11", category: "土豆" },
  { company: "云浮咖啡豆种植合作社", title: "2026年云浮精品咖啡豆供应", product: "大豆", qty: 30, signed: 10, unit: "吨", dateRange: "2026-06 至 2026-09", category: "大豆" },
  { company: "阳江花生生产合作社", title: "2026年阳江花生年度供货", product: "花生", qty: 80, signed: 40, unit: "吨", dateRange: "2026-04 至 2026-09", category: "花生" },
  { company: "惠州玉米农场联盟", title: "2026年夏季甜玉米大批供应", product: "玉米", qty: 300, signed: 120, unit: "吨", dateRange: "2026-05 至 2026-08", category: "玉米" },
  { company: "广州增城象牙香占基地", title: "2026年增城象牙香占优质稻供应", product: "象牙香占", qty: 20, signed: 8, unit: "吨", dateRange: "2026-07 至 2026-10", category: "象牙香占" },
  { company: "潮州番薯种植专业社", title: "2026年潮州特色番薯供应", product: "番薯", qty: 60, signed: 25, unit: "吨", dateRange: "2026-03 至 2026-11", category: "番薯" },
  { company: "汕头西瓜农场合作社", title: "2026年夏季西瓜大批量供货", product: "西瓜", qty: 400, signed: 150, unit: "吨", dateRange: "2026-05 至 2026-08", category: "西瓜" },
  { company: "韶关丝苗米协会", title: "2026年韶关有机丝苗米供应", product: "丝苗米", qty: 300, signed: 100, unit: "吨", dateRange: "2026-04 至 2026-09", category: "丝苗米" },
  { company: "梅州荔枝种植联合会", title: "2026年梅州三月红荔枝供应", product: "荔枝", qty: 120, signed: 50, unit: "吨", dateRange: "2026-05 至 2026-06", category: "荔枝" },
]

const PAGE_SIZE = 8

export default function GyListPage() {
  const [keyword, setKeyword] = useState("")
  const [activeTag, setActiveTag] = useState("全部")
  const [page, setPage] = useState(1)

  const filtered = ALL_SUPPLIES.filter((r) => {
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
              <span className="text-white">订单种植供应列表</span>
            </div>
            <h1 className="text-[28px] font-bold text-white mb-1">订单种植供应</h1>
            <p className="text-white/70 text-[14px]">共 {ALL_SUPPLIES.length} 条供应 · 实时更新</p>
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
                placeholder="输入公司/商品/供应搜索..."
                value={keyword}
                onChange={(e) => { setKeyword(e.target.value); setPage(1) }}
                className="flex-1 text-[13px] outline-none bg-transparent placeholder:text-[#aaa]"
              />
            </div>
            <button className="px-5 h-9 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
              搜索
            </button>
            <Link
              href="/merchant/dingdan-nongye/fabu-gy"
              className="px-5 h-9 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded hover:bg-[#e8f4fd] transition-colors flex items-center gap-1.5"
            >
              + 发布供应
            </Link>
          </div>

          {/* 数据表格 */}
          <div className="bg-white border border-[#e8edf5] rounded-lg overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[#f5f7fa] border-b border-[#e8edf5]">
                  {["公司信息", "供应", "商品", "预估供应量", "已签约进度", "计划供应时间", "操作"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-[#555] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-[#aaa] text-[13px]">暂无符合条件的供应信息</td>
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
                          <div className="h-full rounded-full bg-[#3a8c3f]" style={{ width: `${Math.min(pct, 100)}%` }} />
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
                          <Link href="/portal/dingdan-nongye/gy-detail" className="text-[12px] text-[#1a5fa8] hover:underline">详细信息</Link>
                          <Link href="/portal/dingdan-nongye/caigou-xunjia" className="text-[12px] text-[#e8831a] hover:underline">发起采购询价</Link>
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
