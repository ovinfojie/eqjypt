"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Eye, Pencil, ToggleLeft, ToggleRight, Package } from "lucide-react"

const products = [
  { id: "SP001", name: "台山丝苗米（精装）",   chandi: "江门产地直供中心", category: "粮食", price: "128元/袋(25kg)", stock: 2400, status: "on",  shenhe: "已通过", updated: "2026-08-01" },
  { id: "SP002", name: "茂名荔枝（妃子笑）",   chandi: "茂名产地直供中心", category: "水果", price: "68元/箱(5kg)", stock: 580,  status: "on",  shenhe: "已通过", updated: "2026-07-28" },
  { id: "SP003", name: "玉米原粮（本地散装）", chandi: "南雄产地直供中心", category: "粮食", price: "2290元/吨",    stock: 15000, status: "on", shenhe: "已通过", updated: "2026-07-25" },
  { id: "SP004", name: "花生油（5L桶装）",      chandi: "江门产地直供中心", category: "油料", price: "88元/桶",      stock: 1200, status: "off", shenhe: "已通过", updated: "2026-07-20" },
  { id: "SP005", name: "优选鸡蛋（30枚）",      chandi: "肇庆产地直供中心", category: "禽蛋", price: "24元/盒",      stock: 3600, status: "on",  shenhe: "待审核", updated: "2026-08-02" },
]

export default function ChandiProductPage() {
  const [data, setData] = useState(products)
  const [keyword, setKeyword] = useState("")
  const [detailItem, setDetailItem] = useState<typeof products[0] | null>(null)

  const toggle = (id: string) => setData(data.map(r => r.id === id ? { ...r, status: r.status === "on" ? "off" : "on" } : r))
  const filtered = data.filter(r => !keyword || r.name.includes(keyword) || r.chandi.includes(keyword))

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">产地商品管理</h1>
          <p className="text-[13px] text-[#6b7c93] mt-0.5">管理各产地直供中心的上架商品，审核、上下架操作</p>
        </div>
        <Link href="/admin/yanxuan/shangpin-shenhe" className="flex items-center gap-1.5 px-4 py-2 border border-[#dde3ec] text-[#1a5fa8] text-[13px] rounded hover:border-[#1a5fa8] transition-colors">
          前往商品审核
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "商品总数",   value: data.length,                              color: "#1a1a2e" },
          { label: "已上架",     value: data.filter(r => r.status === "on").length, color: "#2e7d32" },
          { label: "待审核",     value: data.filter(r => r.shenhe === "待审核").length, color: "#e8831a" },
          { label: "已下架",     value: data.filter(r => r.status === "off").length, color: "#6b7c93" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-[#dde3ec] p-4 flex items-center gap-4">
            <div className="text-[28px] font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[13px] text-[#6b7c93]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#dde3ec]">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#dde3ec]">
          <span className="text-[14px] font-semibold text-[#1a1a2e]">商品列表</span>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#999]" />
              <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="搜索商品/产地" className="h-8 border border-[#dde3ec] rounded pl-8 pr-3 text-[12px] focus:outline-none focus:border-[#1a5fa8] w-44" />
            </div>
            <button className="flex items-center gap-1 px-3 h-8 border border-[#dde3ec] rounded text-[12px] text-[#555] hover:border-[#1a5fa8]">
              <Filter className="w-3.5 h-3.5" />筛选
            </button>
          </div>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[#999] text-[12px] border-b border-[#f0f4f9]">
              {["商品编号","商品名称","所属产地","品类","价格","库存(件)","审核状态","上架状态","更新时间","操作"].map(h => (
                <th key={h} className="px-4 py-2.5 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr key={row.id} className="border-b border-[#f0f4f9] last:border-0 hover:bg-[#fafbfc]">
                <td className="px-4 py-3 text-[#999] font-mono text-[12px]">{row.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 font-medium text-[#1a1a2e]">
                    <Package className="w-3.5 h-3.5 text-[#1a5fa8]" />{row.name}
                  </div>
                </td>
                <td className="px-4 py-3 text-[#555]">{row.chandi}</td>
                <td className="px-4 py-3 text-[#6b7c93]">{row.category}</td>
                <td className="px-4 py-3 text-[#1a1a2e]">{row.price}</td>
                <td className="px-4 py-3 font-semibold text-[#1a5fa8]">{row.stock.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${row.shenhe === "已通过" ? "text-[#2e7d32] bg-[#e8f5e9]" : "text-[#e8831a] bg-[#fff7ed]"}`}>{row.shenhe}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${row.status === "on" ? "text-[#1a5fa8] bg-[#e8f4fd]" : "text-[#6b7280] bg-[#f3f4f6]"}`}>{row.status === "on" ? "已上架" : "已下架"}</span>
                </td>
                <td className="px-4 py-3 text-[#6b7c93]">{row.updated}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setDetailItem(row)} className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                      <Eye className="w-3.5 h-3.5" />详情
                    </button>
                    <button className="flex items-center gap-1 text-[#e8831a] hover:underline text-[12px]">
                      <Pencil className="w-3.5 h-3.5" />编辑
                    </button>
                    <button onClick={() => toggle(row.id)} className={`flex items-center gap-1 text-[12px] ${row.status === "on" ? "text-[#dc2626] hover:underline" : "text-[#2e7d32] hover:underline"}`}>
                      {row.status === "on" ? <><ToggleRight className="w-3.5 h-3.5" />下架</> : <><ToggleLeft className="w-3.5 h-3.5" />上架</>}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail modal */}
      {detailItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setDetailItem(null)}>
          <div className="bg-white rounded-xl shadow-xl p-6 w-[480px]" onClick={e => e.stopPropagation()}>
            <h3 className="text-[16px] font-bold text-[#1a1a2e] mb-5">商品详情</h3>
            <div className="space-y-3">
              {[
                ["商品编号", detailItem.id],
                ["商品名称", detailItem.name],
                ["所属产地", detailItem.chandi],
                ["品类",     detailItem.category],
                ["价格",     detailItem.price],
                ["库存",     detailItem.stock + " 件"],
                ["审核状态", detailItem.shenhe],
                ["上架状态", detailItem.status === "on" ? "已上架" : "已下架"],
                ["更新时间", detailItem.updated],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center gap-3 py-2 border-b border-[#f0f4f9] last:border-0">
                  <span className="text-[13px] text-[#999] w-20 shrink-0">{k}</span>
                  <span className="text-[13px] text-[#333] font-medium">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-5">
              <button onClick={() => setDetailItem(null)} className="px-4 py-2 bg-[#1a5fa8] text-white rounded text-[13px] hover:bg-[#0d4a8a]">关闭</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
