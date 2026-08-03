"use client"

import Link from "next/link"
import { Plus, Pencil, Eye, ToggleLeft, ToggleRight, MapPin } from "lucide-react"
import { useState } from "react"

type Status = "active" | "inactive"

const rows = [
  { id: "CD001", name: "江门产地直供中心",  area: "广东·江门",  products: 128, suppliers: 36, totalQty: "70万吨",  totalAmt: "20亿+",  status: "active"   as Status, updatedAt: "2026-06-01" },
  { id: "CD002", name: "南雄产地直供中心",  area: "广东·南雄",  products: 18,  suppliers: 12, totalQty: "10万吨",  totalAmt: "3亿+",   status: "active"   as Status, updatedAt: "2026-05-28" },
  { id: "CD003", name: "茂名产地直供中心",  area: "广东·茂名",  products: 64,  suppliers: 24, totalQty: "50万吨",  totalAmt: "15亿+",  status: "active"   as Status, updatedAt: "2026-05-20" },
  { id: "CD004", name: "肇庆产地直供中心",  area: "广东·肇庆",  products: 36,  suppliers: 18, totalQty: "20万吨",  totalAmt: "6亿+",   status: "active"   as Status, updatedAt: "2026-05-15" },
  { id: "CD005", name: "韶关产地直供中心",  area: "广东·韶关",  products: 128, suppliers: 42, totalQty: "30万吨",  totalAmt: "9亿+",   status: "inactive" as Status, updatedAt: "2026-04-10" },
  { id: "CD006", name: "遂溪产地直供中心",  area: "广东·遂溪",  products: 12,  suppliers: 8,  totalQty: "8万吨",   totalAmt: "2亿+",   status: "inactive" as Status, updatedAt: "2026-04-05" },
]

export default function ChandiListPage() {
  const [data, setData] = useState(rows)
  const [keyword, setKeyword] = useState("")

  const toggle = (id: string) => {
    setData(data.map((r) => r.id === id ? { ...r, status: r.status === "active" ? "inactive" : "active" } : r))
  }

  const filtered = data.filter((r) => !keyword || r.name.includes(keyword) || r.area.includes(keyword))

  return (
  <>
<div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a2e] mb-1">产地管理</h1>
          <p className="text-[13px] text-[#6b7c93]">管理供销严选平台的产地直供中心，配置产地信息、能力介绍和供应商绑定。</p>
        </div>
        <Link
          href="/admin/yanxuan/chandi-edit"
          className="flex items-center gap-1.5 px-4 h-8 bg-[#1a1a2e] text-white text-[13px] rounded hover:bg-[#2d2d4e] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />新增产地
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: "产地总数", value: data.length,                               color: "#1a1a2e" },
          { label: "已启用",   value: data.filter(r=>r.status==="active").length, color: "#1a7a3c" },
          { label: "供应商总数", value: data.reduce((s,r)=>s+r.suppliers, 0),    color: "#1a5fa8" },
          { label: "上架商品",  value: data.reduce((s,r)=>s+r.products, 0),      color: "#b45309" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-lg border border-[#dde3ec] p-4 flex items-center gap-4">
            <div className="text-[28px] font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[13px] text-[#6b7c93]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-[#dde3ec]">
        {/* Search bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e8edf5]">
          <span className="text-[14px] font-semibold text-[#1a1a2e]">产地列表</span>
          <div className="flex items-center gap-2">
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="搜索产地名称/地区"
              className="border border-[#dde3ec] rounded px-3 h-7 text-[12px] w-[200px] focus:outline-none focus:border-[#1a5fa8]"
            />
            <button className="px-3 h-7 bg-[#1a1a2e] text-white text-[12px] rounded">搜索</button>
          </div>
        </div>

        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[#6b7c93] text-[12px] border-b border-[#e8edf5]">
              <th className="px-4 py-2.5 text-left font-medium">编号</th>
              <th className="px-4 py-2.5 text-left font-medium">产地名称</th>
              <th className="px-4 py-2.5 text-left font-medium">所在地区</th>
              <th className="px-4 py-2.5 text-left font-medium">上架商品</th>
              <th className="px-4 py-2.5 text-left font-medium">供应商数</th>
              <th className="px-4 py-2.5 text-left font-medium">总供应量</th>
              <th className="px-4 py-2.5 text-left font-medium">总产值</th>
              <th className="px-4 py-2.5 text-left font-medium">状态</th>
              <th className="px-4 py-2.5 text-left font-medium">更新时间</th>
              <th className="px-4 py-2.5 text-left font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-b border-[#f0f4f9] hover:bg-[#fafbfc]">
                <td className="px-4 py-3 text-[#6b7c93] text-[12px] font-mono">{row.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 font-medium text-[#1a1a2e]">
                    <MapPin className="w-3.5 h-3.5 text-[#1a5fa8]" />{row.name}
                  </div>
                </td>
                <td className="px-4 py-3 text-[#6b7c93]">{row.area}</td>
                <td className="px-4 py-3 text-[#1a5fa8] font-semibold">{row.products}</td>
                <td className="px-4 py-3 text-[#555]">{row.suppliers}</td>
                <td className="px-4 py-3 text-[#555]">{row.totalQty}</td>
                <td className="px-4 py-3 text-[#555]">{row.totalAmt}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                    row.status === "active" ? "text-[#1a7a3c] bg-[#e8f5ee]" : "text-[#6b7280] bg-[#f3f4f6]"
                  }`}>
                    {row.status === "active" ? "已启用" : "已停用"}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#6b7c93]">{row.updatedAt}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/portal/gongxiao-yanxuan/${row.id.toLowerCase()}`} className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                      <Eye className="w-3.5 h-3.5" />查看
                    </Link>
                    <Link href="/admin/yanxuan/chandi-edit" className="flex items-center gap-1 text-[#e8831a] hover:underline text-[12px]">
                      <Pencil className="w-3.5 h-3.5" />编辑
                    </Link>
                    <button onClick={() => toggle(row.id)} className={`flex items-center gap-1 text-[12px] ${row.status === "active" ? "text-[#b91c1c] hover:underline" : "text-[#1a7a3c] hover:underline"}`}>
                      {row.status === "active"
                        ? <><ToggleRight className="w-3.5 h-3.5" />停用</>
                        : <><ToggleLeft  className="w-3.5 h-3.5" />启用</>}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  </>
)
}