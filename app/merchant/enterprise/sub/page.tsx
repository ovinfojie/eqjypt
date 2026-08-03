"use client"

import { useState } from "react"
import { Plus, Search, Eye, Pencil, Users } from "lucide-react"
import Link from "next/link"

const subs = [
  { id: "SUB001", name: "盒马生鲜广州采购站", contact: "李某某", phone: "138****1111", type: "采购站", status: "active", createdAt: "2024-04-01", staffCount: 5 },
  { id: "SUB002", name: "盒马有机农场直采部", contact: "王某某", phone: "139****2222", type: "直采部", status: "active", createdAt: "2024-07-15", staffCount: 3 },
  { id: "SUB003", name: "盒马华南区仓储中心", contact: "陈某某", phone: "136****3333", type: "仓储中心", status: "disabled", createdAt: "2023-10-20", staffCount: 8 },
]

export default function SubMerchantPage() {
  const [keyword, setKeyword] = useState("")
  const [showAdd, setShowAdd] = useState(false)

  return (
    <div className="max-w-[900px] space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a2e] mb-1">子商户管理</h1>
          <p className="text-[13px] text-[#6b7c93]">管理挂靠在本企业账号下的子商户，分配独立的操作账号与权限范围。</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-1.5 px-4 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
          <Plus className="w-3.5 h-3.5" />新增子商户
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "子商户总数", value: subs.length, color: "#1a5fa8" },
          { label: "正常运营", value: subs.filter(s=>s.status==="active").length, color: "#3a8c3f" },
          { label: "已停用",   value: subs.filter(s=>s.status==="disabled").length, color: "#999" },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-lg border border-[#e8edf5] p-4 flex items-center gap-3">
            <div className="text-[26px] font-bold" style={{ color: c.color }}>{c.value}</div>
            <div className="text-[12px] text-[#6b7c93]">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#f0f4f8] flex items-center gap-3">
          <div className="flex items-center gap-2 border border-[#e8edf5] rounded px-3 py-1.5 w-[220px]">
            <Search className="w-3.5 h-3.5 text-[#aaa]" />
            <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="搜索子商户名称" className="flex-1 text-[13px] outline-none placeholder:text-[#aaa]" />
          </div>
        </div>
        <div className="divide-y divide-[#f0f4f8]">
          {subs.filter(s => !keyword || s.name.includes(keyword)).map(s => (
            <div key={s.id} className="px-5 py-4 flex items-center justify-between hover:bg-[#fafbfc]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e8f4fd] flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#1a5fa8]" />
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-[#1a1a2e]">{s.name}</div>
                  <div className="text-[12px] text-[#6b7c93]">类型：{s.type} · 员工：{s.staffCount}人 · 创建：{s.createdAt}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-[13px] text-[#555]">
                  <span className="text-[#999]">联系人：</span>{s.contact} {s.phone}
                </div>
                <span className={`px-2 py-0.5 rounded text-[11px] ${s.status === "active" ? "bg-[#e8f5e9] text-[#3a8c3f]" : "bg-[#f3f4f6] text-[#999]"}`}>
                  {s.status === "active" ? "正常" : "已停用"}
                </span>
                <div className="flex gap-2">
                  <Link href={`/merchant/enterprise/sub/${s.id}`} className="flex items-center gap-1 text-[12px] text-[#1a5fa8] hover:underline"><Eye className="w-3 h-3" />查看</Link>
                  <button className="flex items-center gap-1 text-[12px] text-[#e8831a] hover:underline"><Pencil className="w-3 h-3" />编辑</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[480px] shadow-xl">
            <div className="px-6 py-4 border-b border-[#f0f4f8] flex items-center justify-between">
              <span className="text-[15px] font-semibold">新增子商户</span>
              <button onClick={() => setShowAdd(false)} className="text-[#aaa] text-lg">×</button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: "子商户名称", placeholder: "请输入子商户全称" },
                { label: "类型",       placeholder: "如：采购站/直采部/仓储中心" },
                { label: "联系人",     placeholder: "请输入负责人姓名" },
                { label: "联系电话",   placeholder: "请输入手机号" },
                { label: "管理员账号", placeholder: "设置子商户主账号" },
                { label: "初始密码",   placeholder: "设置初始登录密码" },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-[12px] text-[#6b7c93] mb-1">{f.label}</label>
                  <input className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder={f.placeholder} />
                </div>
              ))}
            </div>
            <div className="px-6 pb-5 flex gap-3 justify-end">
              <button onClick={() => setShowAdd(false)} className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded">取消</button>
              <button onClick={() => setShowAdd(false)} className="px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded">确认创建</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
