"use client"

import { useState } from "react"
import { Plus, Pencil, Eye, ToggleLeft, ToggleRight, Search, Building2 } from "lucide-react"

const operators = [
  { id: "OP001", name: "广州区域运营中心",   area: "广州市", contact: "李运营", phone: "13800138001", merchants: 428, orders: 3240, status: "active",   created: "2025-01-15" },
  { id: "OP002", name: "深圳区域运营中心",   area: "深圳市", contact: "王总监", phone: "13800138002", merchants: 385, orders: 2980, status: "active",   created: "2025-01-20" },
  { id: "OP003", name: "东莞区域运营中心",   area: "东莞市", contact: "张主任", phone: "13800138003", merchants: 210, orders: 1560, status: "active",   created: "2025-03-01" },
  { id: "OP004", name: "佛山区域运营中心",   area: "佛山市", contact: "陈经理", phone: "13800138004", merchants: 198, orders: 1420, status: "active",   created: "2025-03-15" },
  { id: "OP005", name: "惠州区域运营中心",   area: "惠州市", contact: "刘主任", phone: "13800138005", merchants: 142, orders: 980,  status: "inactive", created: "2025-05-01" },
]

export default function YunyingListPage() {
  const [data, setData] = useState(operators)
  const [keyword, setKeyword] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState<typeof operators[0] | null>(null)

  const toggle = (id: string) => setData(data.map(r => r.id === id ? { ...r, status: r.status === "active" ? "inactive" : "active" } : r))
  const filtered = data.filter(r => !keyword || r.name.includes(keyword) || r.area.includes(keyword))

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">二级运营管理</h1>
          <p className="text-[13px] text-[#6b7c93] mt-0.5">管理各区域运营中心，配置权限范围和管理员信息</p>
        </div>
        <button onClick={() => { setEditTarget(null); setShowModal(true) }} className="flex items-center gap-1.5 px-4 py-2 bg-[#1a1a2e] text-white text-[13px] rounded hover:bg-[#2d2d4e] transition-colors">
          <Plus className="w-3.5 h-3.5" />新增运营中心
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "运营中心总数", value: data.length, color: "#1a1a2e" },
          { label: "已启用",       value: data.filter(r => r.status === "active").length, color: "#2e7d32" },
          { label: "管理商户总数", value: data.reduce((s, r) => s + r.merchants, 0), color: "#1a5fa8" },
          { label: "本月订单总数", value: data.reduce((s, r) => s + r.orders, 0).toLocaleString(), color: "#e8831a" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-[#dde3ec] p-4 flex items-center gap-4">
            <div className="text-[28px] font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[13px] text-[#6b7c93]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#dde3ec]">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#dde3ec]">
          <span className="text-[14px] font-semibold text-[#1a1a2e]">运营中心列表</span>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#999]" />
            <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="搜索名称/地区" className="h-8 border border-[#dde3ec] rounded pl-8 pr-3 text-[12px] focus:outline-none focus:border-[#1a5fa8] w-44" />
          </div>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[#999] text-[12px] border-b border-[#f0f4f9]">
              {["编号","名称","区域","联系人","手机号","管理商户","本月订单","状态","创建时间","操作"].map(h => (
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
                    <Building2 className="w-3.5 h-3.5 text-[#1a5fa8]" />{row.name}
                  </div>
                </td>
                <td className="px-4 py-3 text-[#555]">{row.area}</td>
                <td className="px-4 py-3 text-[#555]">{row.contact}</td>
                <td className="px-4 py-3 text-[#6b7c93]">{row.phone}</td>
                <td className="px-4 py-3 text-[#1a5fa8] font-semibold">{row.merchants}</td>
                <td className="px-4 py-3 text-[#555]">{row.orders.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${row.status === "active" ? "text-[#2e7d32] bg-[#e8f5ee]" : "text-[#6b7280] bg-[#f3f4f6]"}`}>
                    {row.status === "active" ? "已启用" : "已停用"}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#6b7c93]">{row.created}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setEditTarget(row); setShowModal(true) }} className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                      <Eye className="w-3.5 h-3.5" />详情
                    </button>
                    <button onClick={() => { setEditTarget(row); setShowModal(true) }} className="flex items-center gap-1 text-[#e8831a] hover:underline text-[12px]">
                      <Pencil className="w-3.5 h-3.5" />编辑
                    </button>
                    <button onClick={() => toggle(row.id)} className={`flex items-center gap-1 text-[12px] ${row.status === "active" ? "text-[#dc2626] hover:underline" : "text-[#2e7d32] hover:underline"}`}>
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
            <h3 className="text-[16px] font-bold text-[#1a1a2e] mb-5">{editTarget ? "编辑运营中心" : "新增运营中心"}</h3>
            <div className="space-y-4">
              {[
                { label: "运营中心名称", placeholder: "如：广州区域运营中心", def: editTarget?.name || "" },
                { label: "所在区域",     placeholder: "如：广州市",            def: editTarget?.area || "" },
                { label: "联系人",       placeholder: "管理员姓名",            def: editTarget?.contact || "" },
                { label: "联系电话",     placeholder: "手机号码",              def: editTarget?.phone || "" },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-[13px] font-medium text-[#444] mb-1.5">{f.label}</label>
                  <input defaultValue={f.def} placeholder={f.placeholder} className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-[#dde3ec] rounded text-[13px] text-[#555] hover:border-[#1a5fa8]">取消</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-[#1a5fa8] text-white rounded text-[13px] hover:bg-[#0d4a8a]">保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
