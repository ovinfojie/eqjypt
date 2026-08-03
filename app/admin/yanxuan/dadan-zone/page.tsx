"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Pencil, Eye, ToggleLeft, ToggleRight, Star } from "lucide-react"

const zones = [
  { id: "DZ001", name: "江门虾专区",     product: "江门虾",     region: "广东·江门", suppliers: 8,  products: 24, views: 18420, orders: 380, status: "active",   sort: 1, updated: "2026-08-01" },
  { id: "DZ002", name: "荔枝专区",       product: "荔枝",       region: "广东·茂名", suppliers: 12, products: 36, views: 32580, orders: 860, status: "active",   sort: 2, updated: "2026-07-28" },
  { id: "DZ003", name: "丝苗米专区",     product: "丝苗米",     region: "广东·江门", suppliers: 6,  products: 18, views: 9640,  orders: 240, status: "active",   sort: 3, updated: "2026-07-20" },
  { id: "DZ004", name: "禽蛋专区",       product: "鸡蛋/鸭蛋", region: "广东全省",  suppliers: 15, products: 42, views: 7820,  orders: 190, status: "active",   sort: 4, updated: "2026-07-15" },
  { id: "DZ005", name: "咖啡豆专区",     product: "咖啡豆",     region: "广东·云浮", suppliers: 4,  products: 12, views: 4320,  orders: 80,  status: "inactive", sort: 5, updated: "2026-06-30" },
]

export default function DadanZonePage() {
  const [data, setData] = useState(zones)
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState<typeof zones[0] | null>(null)

  const toggle = (id: string) => setData(data.map(r => r.id === id ? { ...r, status: r.status === "active" ? "inactive" : "active" } : r))

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">大单品专区管理</h1>
          <p className="text-[13px] text-[#6b7c93] mt-0.5">管理供销严选平台的大单品专区，配置专区信息和关联供应商</p>
        </div>
        <button onClick={() => { setEditTarget(null); setShowModal(true) }} className="flex items-center gap-1.5 px-4 py-2 bg-[#1a1a2e] text-white text-[13px] rounded hover:bg-[#2d2d4e] transition-colors">
          <Plus className="w-3.5 h-3.5" />新增专区
        </button>
      </div>

      {/* Zone cards */}
      <div className="grid grid-cols-5 gap-4">
        {data.map((z, i) => (
          <div key={z.id} className={`bg-white rounded-xl border-2 p-4 ${z.status === "active" ? "border-[#1a5fa8]" : "border-[#dde3ec]"}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-white px-2 py-0.5 rounded-full bg-[#1a5fa8]">TOP {z.sort}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${z.status === "active" ? "text-[#2e7d32] bg-[#e8f5e9]" : "text-[#6b7280] bg-[#f3f4f6]"}`}>
                {z.status === "active" ? "已启用" : "已停用"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mb-2">
              <Star className="w-4 h-4 text-[#e8831a]" />
              <span className="text-[14px] font-bold text-[#1a1a2e]">{z.name}</span>
            </div>
            <div className="text-[12px] text-[#6b7c93] mb-3">{z.region}</div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-[#f5f7fa] rounded p-2">
                <div className="text-[16px] font-bold text-[#1a5fa8]">{z.products}</div>
                <div className="text-[10px] text-[#999]">商品数</div>
              </div>
              <div className="bg-[#f5f7fa] rounded p-2">
                <div className="text-[16px] font-bold text-[#e8831a]">{z.orders}</div>
                <div className="text-[10px] text-[#999]">本月订单</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#dde3ec]">
        <div className="px-5 py-3 border-b border-[#dde3ec]">
          <span className="text-[14px] font-semibold text-[#1a1a2e]">专区列表</span>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[#999] text-[12px] border-b border-[#f0f4f9]">
              {["编号","专区名称","主打商品","产地","供应商数","商品数","浏览量","本月订单","排序","状态","操作"].map(h => (
                <th key={h} className="px-4 py-2.5 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id} className="border-b border-[#f0f4f9] last:border-0 hover:bg-[#fafbfc]">
                <td className="px-4 py-3 text-[#999] text-[12px]">{row.id}</td>
                <td className="px-4 py-3 font-medium text-[#1a1a2e]">{row.name}</td>
                <td className="px-4 py-3 text-[#555]">{row.product}</td>
                <td className="px-4 py-3 text-[#6b7c93]">{row.region}</td>
                <td className="px-4 py-3 text-[#555]">{row.suppliers}</td>
                <td className="px-4 py-3 text-[#1a5fa8] font-semibold">{row.products}</td>
                <td className="px-4 py-3 text-[#555]">{row.views.toLocaleString()}</td>
                <td className="px-4 py-3 font-semibold text-[#e8831a]">{row.orders}</td>
                <td className="px-4 py-3 text-[#555]">{row.sort}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${row.status === "active" ? "text-[#2e7d32] bg-[#e8f5ee]" : "text-[#6b7280] bg-[#f3f4f6]"}`}>
                    {row.status === "active" ? "已启用" : "已停用"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setEditTarget(row); setShowModal(true) }} className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]"><Eye className="w-3.5 h-3.5" />详情</button>
                    <button onClick={() => { setEditTarget(row); setShowModal(true) }} className="flex items-center gap-1 text-[#e8831a] hover:underline text-[12px]"><Pencil className="w-3.5 h-3.5" />编辑</button>
                    <button onClick={() => toggle(row.id)} className={`flex items-center gap-1 text-[12px] ${row.status === "active" ? "text-[#dc2626]" : "text-[#2e7d32]"} hover:underline`}>
                      {row.status === "active" ? <><ToggleRight className="w-3.5 h-3.5" />停用</> : <><ToggleLeft className="w-3.5 h-3.5" />启用</>}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl shadow-xl p-6 w-[500px]" onClick={e => e.stopPropagation()}>
            <h3 className="text-[16px] font-bold text-[#1a1a2e] mb-5">{editTarget ? "编辑专区" : "新增大单品专区"}</h3>
            <div className="space-y-4">
              {[
                { label: "专区名称", placeholder: "如：荔枝专区",   def: editTarget?.name || "" },
                { label: "主打商品", placeholder: "如：荔枝",       def: editTarget?.product || "" },
                { label: "产地区域", placeholder: "如：广东·茂名",  def: editTarget?.region || "" },
                { label: "排序权重", placeholder: "数字越小越靠前", def: editTarget ? String(editTarget.sort) : "" },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-[13px] font-medium text-[#444] mb-1.5">{f.label}</label>
                  <input defaultValue={f.def} placeholder={f.placeholder} className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-[#dde3ec] rounded text-[13px] text-[#555]">取消</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-[#1a5fa8] text-white rounded text-[13px] hover:bg-[#0d4a8a]">保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
