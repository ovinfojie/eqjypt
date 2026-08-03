"use client"

import Link from "next/link"
import { Search, Plus, Eye, Pencil, Trash2, ChevronDown } from "lucide-react"
import { useState } from "react"

type Status = "published" | "pending" | "rejected" | "off"

const STATUS_MAP: Record<Status, { label: string; color: string; bg: string }> = {
  published: { label: "已上架",   color: "#1a7a3c", bg: "#e8f5ee" },
  pending:   { label: "待审核",   color: "#b45309", bg: "#fef3c7" },
  rejected:  { label: "已驳回",   color: "#b91c1c", bg: "#fee2e2" },
  off:       { label: "已下架",   color: "#6b7280", bg: "#f3f4f6" },
}

const rows = [
  { id: "SP202600001", name: "江门鲜活南美白对虾",   category: "水产/对虾", region: "江门产地直供中心", price: "31.12", unit: "元/斤", stock: "5000斤", status: "published" as Status, updatedAt: "2026-06-01" },
  { id: "SP202600002", name: "优选罗氏沼虾",         category: "水产/淡水虾", region: "江门产地直供中心", price: "28.50", unit: "元/斤", stock: "3000斤", status: "pending"   as Status, updatedAt: "2026-06-02" },
  { id: "SP202600003", name: "广东丝苗米（一级）",   category: "粮油/大米",  region: "南雄产地直供中心", price: "5.80",  unit: "元/斤", stock: "20000斤", status: "published" as Status, updatedAt: "2026-05-28" },
  { id: "SP202600004", name: "茂名荔枝（桂味）",     category: "水果/荔枝",  region: "茂名产地直供中心", price: "18.00", unit: "元/斤", stock: "8000斤",  status: "rejected"  as Status, updatedAt: "2026-05-25" },
  { id: "SP202600005", name: "肇庆新兴走地鸡",       category: "禽蛋/活禽",  region: "肇庆产地直供中心", price: "38.00", unit: "元/只", stock: "200只",   status: "off"       as Status, updatedAt: "2026-05-20" },
  { id: "SP202600006", name: "南雄板鸭（腊味）",     category: "加工/腊味",  region: "南雄产地直供中心", price: "65.00", unit: "元/只", stock: "1000只",  status: "published" as Status, updatedAt: "2026-06-03" },
]

const STATUS_TABS = [
  { key: "all",       label: "全部" },
  { key: "published", label: "已上架" },
  { key: "pending",   label: "待审核" },
  { key: "rejected",  label: "已驳回" },
  { key: "off",       label: "已下架" },
]

export default function YanxuanShangpinListPage() {
  const [tab, setTab] = useState("all")
  const [keyword, setKeyword] = useState("")

  const filtered = rows.filter((r) => {
    if (tab !== "all" && r.status !== tab) return false
    if (keyword && !r.name.includes(keyword) && !r.id.includes(keyword)) return false
    return true
  })

  return (
  <>
<div className="mb-5">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">我的供销严选商品</h1>
          <Link
            href="/merchant/yanxuan/fabu-shangpin"
            className="flex items-center gap-1.5 px-4 h-8 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> 发布新商品
          </Link>
        </div>
        <p className="text-[13px] text-[#6b7c93]">管理已发布到供销严选平台的商品，查看审核状态和上下架情况。</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: "全部商品", value: rows.length,                         color: "#1a5fa8" },
          { label: "已上架",   value: rows.filter(r=>r.status==="published").length, color: "#1a7a3c" },
          { label: "待审核",   value: rows.filter(r=>r.status==="pending").length,   color: "#b45309" },
          { label: "已驳回",   value: rows.filter(r=>r.status==="rejected").length,  color: "#b91c1c" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-lg border border-[#dde3ec] p-4 flex items-center gap-4">
            <div className="text-[28px] font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[13px] text-[#6b7c93]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter row */}
      <div className="bg-white rounded-lg border border-[#dde3ec] mb-4">
        {/* Tabs */}
        <div className="flex border-b border-[#e8edf5]">
          {STATUS_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2.5 text-[13px] transition-colors border-b-2 -mb-px ${
                tab === t.key
                  ? "border-[#1a5fa8] text-[#1a5fa8] font-semibold"
                  : "border-transparent text-[#666] hover:text-[#1a5fa8]"
              }`}
            >
              {t.label}
            </button>
          ))}
          <div className="flex-1" />
          <div className="flex items-center gap-2 px-4">
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="搜索商品名称/编号"
              className="border border-[#dde3ec] rounded px-3 h-7 text-[12px] w-[180px] focus:outline-none focus:border-[#1a5fa8]"
            />
            <button className="px-3 h-7 bg-[#1a5fa8] text-white text-[12px] rounded hover:bg-[#0d4a8a]">搜索</button>
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[#6b7c93] text-[12px] border-b border-[#e8edf5]">
              <th className="px-4 py-2.5 text-left font-medium">商品编号</th>
              <th className="px-4 py-2.5 text-left font-medium">商品名称</th>
              <th className="px-4 py-2.5 text-left font-medium">分类</th>
              <th className="px-4 py-2.5 text-left font-medium">所属产地</th>
              <th className="px-4 py-2.5 text-left font-medium">价格</th>
              <th className="px-4 py-2.5 text-left font-medium">库存</th>
              <th className="px-4 py-2.5 text-left font-medium">状态</th>
              <th className="px-4 py-2.5 text-left font-medium">更新时间</th>
              <th className="px-4 py-2.5 text-left font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => {
              const s = STATUS_MAP[row.status]
              return (
                <tr key={row.id} className="border-b border-[#f0f4f9] hover:bg-[#fafbfc]">
                  <td className="px-4 py-3 text-[#6b7c93] text-[12px] font-mono">{row.id}</td>
                  <td className="px-4 py-3 font-medium text-[#1a1a2e]">{row.name}</td>
                  <td className="px-4 py-3 text-[#6b7c93]">{row.category}</td>
                  <td className="px-4 py-3 text-[#6b7c93]">{row.region}</td>
                  <td className="px-4 py-3 text-[#1a5fa8] font-semibold">{row.price}<span className="text-[#999] font-normal text-[11px] ml-0.5">{row.unit}</span></td>
                  <td className="px-4 py-3 text-[#555]">{row.stock}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium" style={{ color: s.color, background: s.bg }}>{s.label}</span>
                    {row.status === "rejected" && (
                      <div className="text-[11px] text-[#b91c1c] mt-0.5">原因：图片不符合规范</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[#6b7c93]">{row.updatedAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href="/merchant/yanxuan/fabu-shangpin?mode=view" className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                        <Eye className="w-3.5 h-3.5" />查看
                      </Link>
                      {row.status !== "published" && (
                        <Link href="/merchant/yanxuan/fabu-shangpin?mode=edit" className="flex items-center gap-1 text-[#e8831a] hover:underline text-[12px]">
                          <Pencil className="w-3.5 h-3.5" />编辑
                        </Link>
                      )}
                      {row.status === "published" && (
                        <button className="flex items-center gap-1 text-[#6b7280] hover:underline text-[12px]">
                          <ChevronDown className="w-3.5 h-3.5" />下架
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-[#999] text-[13px]">暂无数据</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  </>
)
}