"use client"

import { useState } from "react"
import { Plus, Search, Pencil, Trash2, Shield } from "lucide-react"

const staffList = [
  { id: "S001", name: "李采购", phone: "138****1111", role: "采购经理",   status: "active",   joinDate: "2024-03-15", lastLogin: "2026-08-02" },
  { id: "S002", name: "王销售", phone: "139****2222", role: "销售专员",   status: "active",   joinDate: "2024-06-01", lastLogin: "2026-08-01" },
  { id: "S003", name: "陈财务", phone: "136****3333", role: "财务专员",   status: "active",   joinDate: "2025-01-10", lastLogin: "2026-07-30" },
  { id: "S004", name: "刘仓管", phone: "135****4444", role: "仓储专员",   status: "disabled", joinDate: "2023-11-20", lastLogin: "2026-05-12" },
]

export default function StaffPage() {
  const [keyword, setKeyword] = useState("")
  const [showAdd, setShowAdd] = useState(false)

  const filtered = staffList.filter(s => s.name.includes(keyword) || s.role.includes(keyword))

  return (
    <div className="max-w-[900px] space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a2e] mb-1">企业员工管理</h1>
          <p className="text-[13px] text-[#6b7c93]">管理企业账号下的员工信息，分配操作角色与权限。</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-1.5 px-4 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
          <Plus className="w-3.5 h-3.5" />添加员工
        </button>
      </div>

      {/* 统计 */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "员工总数",   value: staffList.length, color: "#1a5fa8" },
          { label: "在职员工",   value: staffList.filter(s=>s.status==="active").length, color: "#3a8c3f" },
          { label: "已停用",     value: staffList.filter(s=>s.status==="disabled").length, color: "#999" },
          { label: "角色种类",   value: 4, color: "#7c3aed" },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-lg border border-[#e8edf5] p-4 flex items-center gap-3">
            <div className="text-[24px] font-bold" style={{ color: c.color }}>{c.value}</div>
            <div className="text-[12px] text-[#6b7c93]">{c.label}</div>
          </div>
        ))}
      </div>

      {/* 搜索 + 表格 */}
      <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#f0f4f8] flex items-center gap-3">
          <div className="flex items-center gap-2 border border-[#e8edf5] rounded px-3 py-1.5 w-[220px]">
            <Search className="w-3.5 h-3.5 text-[#aaa]" />
            <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="搜索姓名/角色" className="flex-1 text-[13px] outline-none placeholder:text-[#aaa]" />
          </div>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[12px] text-[#6b7c93] border-b border-[#f0f4f8]">
              {["员工编号","姓名","手机号","角色","状态","加入时间","最近登录","操作"].map(h => (
                <th key={h} className="px-4 py-2.5 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} className="border-b border-[#f8fafc] hover:bg-[#fafbfc]">
                <td className="px-4 py-3 text-[#999] text-[12px] font-mono">{s.id}</td>
                <td className="px-4 py-3 font-medium text-[#1a1a2e]">{s.name}</td>
                <td className="px-4 py-3 text-[#555]">{s.phone}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[11px] rounded">{s.role}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] ${s.status === "active" ? "bg-[#e8f5e9] text-[#3a8c3f]" : "bg-[#f3f4f6] text-[#999]"}`}>
                    {s.status === "active" ? "在职" : "已停用"}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#999]">{s.joinDate}</td>
                <td className="px-4 py-3 text-[#999]">{s.lastLogin}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 text-[12px] text-[#1a5fa8] hover:underline"><Pencil className="w-3 h-3" />编辑</button>
                    <button className="flex items-center gap-1 text-[12px] text-[#e8831a] hover:underline"><Shield className="w-3 h-3" />权限</button>
                    <button className="flex items-center gap-1 text-[12px] text-[#ef4444] hover:underline"><Trash2 className="w-3 h-3" />停用</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 添加员工弹窗 */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[460px] shadow-xl">
            <div className="px-6 py-4 border-b border-[#f0f4f8] flex items-center justify-between">
              <span className="text-[15px] font-semibold text-[#1a1a2e]">添加员工</span>
              <button onClick={() => setShowAdd(false)} className="text-[#aaa] hover:text-[#555] text-lg">×</button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: "员工姓名", placeholder: "请输入员工真实姓名" },
                { label: "手机号码", placeholder: "用于登录和接收通知" },
                { label: "初始密码", placeholder: "请设置初始登录密码" },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-[12px] text-[#6b7c93] mb-1">{f.label}</label>
                  <input className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder={f.placeholder} />
                </div>
              ))}
              <div>
                <label className="block text-[12px] text-[#6b7c93] mb-1">分配角色</label>
                <select className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]">
                  {["采购经理","销售专员","财务专员","仓储专员","普通员工"].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="px-6 pb-5 flex gap-3 justify-end">
              <button onClick={() => setShowAdd(false)} className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded">取消</button>
              <button onClick={() => setShowAdd(false)} className="px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]">确认添加</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
