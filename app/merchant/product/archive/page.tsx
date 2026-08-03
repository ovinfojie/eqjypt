"use client"

import { useState } from "react"
import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"

const products = [
  { id: "P001", name: "台山丝苗米（精装）",   category: "粮油/大米",    unit: "斤",  spec: "25kg/袋",  barcode: "6901234567001", status: "active",   updatedAt: "2026-07-01" },
  { id: "P002", name: "江门南美白对虾（鲜活）", category: "水产/对虾",   unit: "斤",  spec: "1kg/盒",  barcode: "6901234567002", status: "active",   updatedAt: "2026-07-05" },
  { id: "P003", name: "妃子笑荔枝",           category: "水果/荔枝",    unit: "斤",  spec: "5kg/箱",  barcode: "6901234567003", status: "active",   updatedAt: "2026-06-20" },
  { id: "P004", name: "梅州金柚（大果）",       category: "水果/柚子",    unit: "个",  spec: "3kg/个",  barcode: "6901234567004", status: "inactive", updatedAt: "2026-05-10" },
  { id: "P005", name: "肇庆新兴走地鸡",         category: "禽蛋/活禽",    unit: "只",  spec: "1只/箱",  barcode: "6901234567005", status: "active",   updatedAt: "2026-07-08" },
]

export default function ProductArchivePage() {
  const [keyword, setKeyword] = useState("")
  const [category, setCategory] = useState("all")

  const filtered = products.filter(p => {
    if (keyword && !p.name.includes(keyword) && !p.id.includes(keyword)) return false
    if (category !== "all" && !p.category.startsWith(category)) return false
    return true
  })

  return (
    <div className="max-w-[1000px] space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a2e] mb-1">商品基础档案</h1>
          <p className="text-[13px] text-[#6b7c93]">维护企业的商品基础信息库，档案商品可用于各业务模块快速引用。</p>
        </div>
        <Link href="/merchant/product/add" className="flex items-center gap-1.5 px-4 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
          <Plus className="w-3.5 h-3.5" />新建商品档案
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "全部商品", value: products.length, color: "#1a5fa8" },
          { label: "已启用", value: products.filter(p => p.status === "active").length, color: "#3a8c3f" },
          { label: "已停用", value: products.filter(p => p.status === "inactive").length, color: "#999" },
          { label: "商品分类", value: 4, color: "#7c3aed" },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-lg border border-[#e8edf5] p-4 flex items-center gap-3">
            <div className="text-[24px] font-bold" style={{ color: c.color }}>{c.value}</div>
            <div className="text-[12px] text-[#6b7c93]">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#f0f4f8] flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 border border-[#e8edf5] rounded px-3 py-1.5 w-[200px]">
            <Search className="w-3.5 h-3.5 text-[#aaa]" />
            <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="搜索商品名称/编号" className="flex-1 text-[13px] outline-none placeholder:text-[#aaa]" />
          </div>
          <select value={category} onChange={e => setCategory(e.target.value)} className="border border-[#e8edf5] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]">
            <option value="all">全部分类</option>
            {["粮油","水产","水果","禽蛋"].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[12px] text-[#6b7c93] bg-[#f8fafc] border-b border-[#f0f4f8]">
              {["商品编号","商品名称","分类","计量单位","规格","条形码","状态","更新时间","操作"].map(h => (
                <th key={h} className="px-4 py-2.5 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-b border-[#f8fafc] hover:bg-[#fafbfc]">
                <td className="px-4 py-3 text-[12px] text-[#999] font-mono">{p.id}</td>
                <td className="px-4 py-3 font-medium text-[#1a1a2e]">{p.name}</td>
                <td className="px-4 py-3 text-[#6b7c93]">{p.category}</td>
                <td className="px-4 py-3 text-[#555]">{p.unit}</td>
                <td className="px-4 py-3 text-[#555]">{p.spec}</td>
                <td className="px-4 py-3 text-[#999] font-mono text-[12px]">{p.barcode}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] ${p.status === "active" ? "bg-[#e8f5e9] text-[#3a8c3f]" : "bg-[#f3f4f6] text-[#999]"}`}>
                    {p.status === "active" ? "已启用" : "已停用"}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#999]">{p.updatedAt}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 text-[12px] text-[#1a5fa8] hover:underline"><Eye className="w-3 h-3" />查看</button>
                    <Link href={`/merchant/product/add?id=${p.id}`} className="flex items-center gap-1 text-[12px] text-[#e8831a] hover:underline"><Pencil className="w-3 h-3" />编辑</Link>
                    <button className="flex items-center gap-1 text-[12px] text-[#ef4444] hover:underline"><Trash2 className="w-3 h-3" />删除</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
