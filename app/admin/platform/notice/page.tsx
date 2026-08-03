"use client"

import { useState } from "react"
import { Bell, Plus, Pencil, Trash2, Eye, X, Search } from "lucide-react"

const NOTICES = [
  { id: 1, title: "关于平台升级维护的公告", type: "系统公告", target: "全体用户", status: "已发布", publishAt: "2026-07-30 10:00", views: 1284, top: true },
  { id: 2, title: "2026年荔枝产季采购专项活动通知", type: "活动通知", target: "采购商", status: "已发布", publishAt: "2026-07-28 09:00", views: 867, top: false },
  { id: 3, title: "平台新功能上线：农业信用评分体系", type: "功能更新", target: "全体用户", status: "已发布", publishAt: "2026-07-25 14:30", views: 2341, top: false },
  { id: 4, title: "供应商入驻资质审核流程优化说明", type: "操作指引", target: "供应商", status: "草稿", publishAt: "—", views: 0, top: false },
  { id: 5, title: "8月份竞拍专场预告", type: "活动通知", target: "全体用户", status: "定时发布", publishAt: "2026-08-01 09:00", views: 0, top: false },
]

const STATUS_STYLE: Record<string, string> = {
  已发布: "bg-[#e8f5e9] text-[#2e7d32]",
  草稿: "bg-[#f5f5f5] text-[#757575]",
  定时发布: "bg-[#e3f2fd] text-[#1565c0]",
}

export default function NoticePage() {
  const [notices, setNotices] = useState(NOTICES)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [modal, setModal] = useState<null | "add" | "edit" | "view">(null)
  const [selected, setSelected] = useState<typeof NOTICES[0] | null>(null)
  const [form, setForm] = useState({ title: "", type: "系统公告", target: "全体用户", content: "", top: false })

  const filtered = notices.filter(n =>
    (!search || n.title.includes(search)) &&
    (!typeFilter || n.type === typeFilter)
  )

  const openEdit = (n: typeof NOTICES[0]) => { setSelected(n); setForm({ title: n.title, type: n.type, target: n.target, content: "", top: n.top }); setModal("edit") }
  const openView = (n: typeof NOTICES[0]) => { setSelected(n); setModal("view") }
  const handleDelete = (id: number) => setNotices(prev => prev.filter(n => n.id !== id))

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-bold text-[#1a1a2e]">消息公告管理</h1>
          <p className="text-[13px] text-[#999] mt-0.5">管理平台公告、活动通知及系统消息</p>
        </div>
        <button onClick={() => { setForm({ title: "", type: "系统公告", target: "全体用户", content: "", top: false }); setModal("add") }}
          className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] text-white text-[13px] rounded-lg hover:bg-[#2d2d4e] transition-colors">
          <Plus className="w-4 h-4" />新增公告
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "公告总数", value: notices.length, color: "text-[#1a5fa8]" },
          { label: "已发布", value: notices.filter(n=>n.status==="已发布").length, color: "text-[#2e7d32]" },
          { label: "草稿", value: notices.filter(n=>n.status==="草稿").length, color: "text-[#757575]" },
          { label: "总阅读量", value: notices.reduce((s,n)=>s+n.views,0).toLocaleString(), color: "text-[#e8831a]" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-[#dde3ec] p-4 flex items-center gap-3">
            <Bell className={`w-5 h-5 ${s.color}`} />
            <div>
              <div className={`text-[20px] font-bold ${s.color}`}>{s.value}</div>
              <div className="text-[12px] text-[#999]">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#dde3ec] p-4 flex items-center gap-3">
        <div className="flex items-center gap-2 border border-[#dde3ec] rounded-lg px-3 py-2 flex-1">
          <Search className="w-4 h-4 text-[#999]" />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="搜索公告标题" className="text-[13px] outline-none flex-1 bg-transparent" />
        </div>
        <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)} className="border border-[#dde3ec] rounded-lg px-3 py-2 text-[13px] outline-none">
          <option value="">全部类型</option>
          {["系统公告","活动通知","功能更新","操作指引"].map(t=><option key={t}>{t}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#dde3ec] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#dde3ec] bg-[#f8fafc]">
              {["标题","类型","发布对象","状态","发布时间","阅读量","操作"].map(h=>(
                <th key={h} className="text-left px-4 py-3 text-[12px] font-semibold text-[#999]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(n => (
              <tr key={n.id} className="border-b border-[#f0f0f0] hover:bg-[#fafbfc]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {n.top && <span className="px-1.5 py-0.5 bg-[#fff3e0] text-[#e65100] text-[10px] font-bold rounded">置顶</span>}
                    <span className="text-[13px] text-[#333]">{n.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[12px] text-[#666]">{n.type}</td>
                <td className="px-4 py-3 text-[12px] text-[#666]">{n.target}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${STATUS_STYLE[n.status]}`}>{n.status}</span>
                </td>
                <td className="px-4 py-3 text-[12px] text-[#666]">{n.publishAt}</td>
                <td className="px-4 py-3 text-[12px] text-[#666]">{n.views.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={()=>openView(n)} className="text-[#1a5fa8] hover:underline text-[12px] flex items-center gap-1"><Eye className="w-3.5 h-3.5"/>查看</button>
                    <button onClick={()=>openEdit(n)} className="text-[#666] hover:text-[#333] text-[12px] flex items-center gap-1"><Pencil className="w-3.5 h-3.5"/>编辑</button>
                    <button onClick={()=>handleDelete(n.id)} className="text-[#c62828] hover:underline text-[12px] flex items-center gap-1"><Trash2 className="w-3.5 h-3.5"/>删除</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-12 text-[#999] text-[13px]">暂无公告</div>}
      </div>

      {/* Modal: Add/Edit */}
      {(modal === "add" || modal === "edit") && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[560px] shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#dde3ec]">
              <h2 className="text-[16px] font-bold text-[#1a1a2e]">{modal==="add"?"新增公告":"编辑公告"}</h2>
              <button onClick={()=>setModal(null)}><X className="w-5 h-5 text-[#999]" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[13px] font-medium text-[#333] block mb-1.5">公告标题 <span className="text-red-500">*</span></label>
                <input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} className="w-full border border-[#dde3ec] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#1a5fa8]" placeholder="请输入公告标题" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] font-medium text-[#333] block mb-1.5">公告类型</label>
                  <select value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))} className="w-full border border-[#dde3ec] rounded-lg px-3 py-2 text-[13px] outline-none">
                    {["系统公告","活动通知","功能更新","操作指引"].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[13px] font-medium text-[#333] block mb-1.5">发布对象</label>
                  <select value={form.target} onChange={e=>setForm(f=>({...f,target:e.target.value}))} className="w-full border border-[#dde3ec] rounded-lg px-3 py-2 text-[13px] outline-none">
                    {["全体用户","采购商","供应商","运营商"].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[13px] font-medium text-[#333] block mb-1.5">公告内容</label>
                <textarea value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))} rows={5} className="w-full border border-[#dde3ec] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#1a5fa8] resize-none" placeholder="请输入公告内容..." />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.top} onChange={e=>setForm(f=>({...f,top:e.target.checked}))} className="w-4 h-4 accent-[#1a5fa8]" />
                <span className="text-[13px] text-[#333]">置顶显示</span>
              </label>
            </div>
            <div className="px-6 py-4 border-t border-[#dde3ec] flex justify-end gap-3">
              <button onClick={()=>setModal(null)} className="px-4 py-2 border border-[#dde3ec] text-[13px] text-[#666] rounded-lg hover:bg-[#f5f7fa]">取消</button>
              <button onClick={()=>setModal(null)} className="px-4 py-2 border border-[#dde3ec] text-[13px] text-[#666] rounded-lg hover:bg-[#f5f7fa]">存为草稿</button>
              <button onClick={()=>setModal(null)} className="px-4 py-2 bg-[#1a1a2e] text-white text-[13px] rounded-lg hover:bg-[#2d2d4e]">立即发布</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: View */}
      {modal === "view" && selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[560px] shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#dde3ec]">
              <h2 className="text-[15px] font-bold text-[#1a1a2e]">{selected.title}</h2>
              <button onClick={()=>setModal(null)}><X className="w-5 h-5 text-[#999]" /></button>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex gap-6 text-[12px] text-[#666]">
                <span>类型：{selected.type}</span>
                <span>对象：{selected.target}</span>
                <span>状态：<span className={`px-1.5 py-0.5 rounded-full text-[11px] ${STATUS_STYLE[selected.status]}`}>{selected.status}</span></span>
              </div>
              <div className="text-[12px] text-[#999]">发布时间：{selected.publishAt}</div>
              <div className="bg-[#f8fafc] rounded-lg p-4 text-[13px] text-[#555] leading-relaxed min-h-[100px]">
                （公告正文内容展示区域）
              </div>
              <div className="text-[12px] text-[#999]">阅读量：{selected.views.toLocaleString()}</div>
            </div>
            <div className="px-6 py-4 border-t border-[#dde3ec] flex justify-end">
              <button onClick={()=>setModal(null)} className="px-4 py-2 bg-[#1a1a2e] text-white text-[13px] rounded-lg hover:bg-[#2d2d4e]">关闭</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
