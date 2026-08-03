"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Eye, CheckCircle, XCircle, Search } from "lucide-react"

const projects = [
  { id: "BT001", name: "2026年荔枝产业补贴",     type: "产业补贴", budget: "¥500万", used: "¥280万", applicants: 128, approved: 96,  status: "active",  deadline: "2026-09-30" },
  { id: "BT002", name: "丝苗米种植扶持计划",     type: "种植补贴", budget: "¥300万", used: "¥120万", applicants: 64,  approved: 48,  status: "active",  deadline: "2026-12-31" },
  { id: "BT003", name: "农产品冷链物流补贴",     type: "物流补贴", budget: "¥200万", used: "¥200万", applicants: 45,  approved: 45,  status: "full",    deadline: "2026-06-30" },
  { id: "BT004", name: "2025年农业技术推广补贴", type: "技术补贴", budget: "¥150万", used: "¥150万", applicants: 32,  approved: 30,  status: "ended",   deadline: "2025-12-31" },
]

const applications = [
  { id: "SQ001", project: "2026年荔枝产业补贴",  company: "茂名荔枝专业合作社",   amt: "¥18,000", submitTime: "2026-08-01", status: "pending" },
  { id: "SQ002", project: "丝苗米种植扶持计划",  company: "台山丝苗米种植基地",   amt: "¥25,000", submitTime: "2026-07-30", status: "pending" },
  { id: "SQ003", project: "2026年荔枝产业补贴",  company: "广东省荔枝协会",       amt: "¥45,000", submitTime: "2026-07-28", status: "approved" },
  { id: "SQ004", project: "丝苗米种植扶持计划",  company: "江门新会农业合作社",   amt: "¥12,000", submitTime: "2026-07-25", status: "rejected" },
  { id: "SQ005", project: "2026年荔枝产业补贴",  company: "高州荔枝种植专业户",   amt: "¥8,000",  submitTime: "2026-07-22", status: "pending" },
]

const statusMap: Record<string, { label: string; color: string; bg: string }> = {
  pending:  { label: "待审核", color: "#e8831a", bg: "#fff7ed" },
  approved: { label: "已通过", color: "#2e7d32", bg: "#e8f5e9" },
  rejected: { label: "已驳回", color: "#dc2626", bg: "#fef2f2" },
}

const projectStatusMap: Record<string, { label: string; color: string }> = {
  active: { label: "进行中", color: "#2e7d32" },
  full:   { label: "额度已满", color: "#e8831a" },
  ended:  { label: "已结束", color: "#6b7c93" },
}

export default function ButieListPage() {
  const [activeView, setActiveView] = useState<"projects" | "applications">("projects")
  const [keyword, setKeyword] = useState("")
  const [detailItem, setDetailItem] = useState<typeof applications[0] | null>(null)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">补贴管理</h1>
          <p className="text-[13px] text-[#6b7c93] mt-0.5">管理平台补贴项目，审核企业补贴申请</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex border border-[#dde3ec] rounded overflow-hidden text-[13px]">
            <button onClick={() => setActiveView("projects")} className={`px-4 py-1.5 ${activeView === "projects" ? "bg-[#1a1a2e] text-white" : "text-[#555] hover:bg-[#f5f7fa]"}`}>补贴项目</button>
            <button onClick={() => setActiveView("applications")} className={`px-4 py-1.5 ${activeView === "applications" ? "bg-[#1a1a2e] text-white" : "text-[#555] hover:bg-[#f5f7fa]"}`}>申请审核</button>
          </div>
          {activeView === "projects" && (
            <Link href="/admin/butie/shenhe" className="flex items-center gap-1.5 px-4 py-2 bg-[#1a1a2e] text-white text-[13px] rounded hover:bg-[#2d2d4e] transition-colors">
              <Plus className="w-3.5 h-3.5" />新增项目
            </Link>
          )}
        </div>
      </div>

      {activeView === "projects" ? (
        <>
          <div className="grid grid-cols-2 gap-5">
            {projects.map(p => {
              const ps = projectStatusMap[p.status]
              const pct = Math.round(parseInt(p.used.replace(/[^0-9]/g, "")) / parseInt(p.budget.replace(/[^0-9]/g, "")) * 100)
              return (
                <div key={p.id} className="bg-white rounded-xl border border-[#dde3ec] p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-[15px] font-semibold text-[#1a1a2e]">{p.name}</h3>
                      <span className="text-[11px] text-[#6b7c93] mt-0.5">{p.type} · 截止 {p.deadline}</span>
                    </div>
                    <span className="text-[12px] font-medium" style={{ color: ps.color }}>{ps.label}</span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-[12px] text-[#6b7c93] mb-1">
                      <span>已使用 {p.used}</span>
                      <span>总额 {p.budget}</span>
                    </div>
                    <div className="h-2 bg-[#f0f4f8] rounded-full overflow-hidden">
                      <div className="h-full bg-[#1a5fa8] rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[13px]">
                    <span className="text-[#555]">申请人数 <strong className="text-[#1a1a2e]">{p.applicants}</strong></span>
                    <span className="text-[#555]">已批准 <strong className="text-[#2e7d32]">{p.approved}</strong></span>
                    <button onClick={() => setActiveView("applications")} className="ml-auto flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                      <Eye className="w-3.5 h-3.5" />查看申请
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl border border-[#dde3ec]">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#dde3ec]">
            <span className="text-[14px] font-semibold text-[#1a1a2e]">补贴申请列表
              <span className="ml-2 px-2 py-0.5 bg-[#fff7ed] text-[#e8831a] text-[12px] rounded-full">{applications.filter(a => a.status === "pending").length} 待审核</span>
            </span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#999]" />
              <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="搜索企业/项目" className="h-8 border border-[#dde3ec] rounded pl-8 pr-3 text-[12px] focus:outline-none focus:border-[#1a5fa8] w-44" />
            </div>
          </div>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-[#999] text-[12px] border-b border-[#f0f4f9]">
                {["申请编号","补贴项目","申请企业","申请金额","提交时间","状态","操作"].map(h => (
                  <th key={h} className="px-5 py-2.5 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications.filter(a => !keyword || a.company.includes(keyword) || a.project.includes(keyword)).map(row => {
                const st = statusMap[row.status]
                return (
                  <tr key={row.id} className="border-b border-[#f0f4f9] last:border-0 hover:bg-[#fafbfc]">
                    <td className="px-5 py-3 text-[#999] text-[12px]">{row.id}</td>
                    <td className="px-5 py-3 text-[#555] max-w-[180px] truncate">{row.project}</td>
                    <td className="px-5 py-3 font-medium text-[#1a1a2e]">{row.company}</td>
                    <td className="px-5 py-3 font-bold text-[#b45309]">{row.amt}</td>
                    <td className="px-5 py-3 text-[#6b7c93]">{row.submitTime}</td>
                    <td className="px-5 py-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-medium" style={{ color: st.color, background: st.bg }}>{st.label}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setDetailItem(row)} className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]"><Eye className="w-3.5 h-3.5" />详情</button>
                        {row.status === "pending" && (
                          <>
                            <button onClick={() => setDetailItem(row)} className="flex items-center gap-1 text-[#2e7d32] hover:underline text-[12px]"><CheckCircle className="w-3.5 h-3.5" />通过</button>
                            <button className="flex items-center gap-1 text-[#dc2626] hover:underline text-[12px]"><XCircle className="w-3.5 h-3.5" />驳回</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {detailItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setDetailItem(null)}>
          <div className="bg-white rounded-xl shadow-xl p-6 w-[480px]" onClick={e => e.stopPropagation()}>
            <h3 className="text-[16px] font-bold text-[#1a1a2e] mb-5">补贴申请详情</h3>
            <div className="space-y-3">
              {[["申请编号", detailItem.id], ["补贴项目", detailItem.project], ["申请企业", detailItem.company], ["申请金额", detailItem.amt], ["提交时间", detailItem.submitTime], ["当前状态", statusMap[detailItem.status].label]].map(([k, v]) => (
                <div key={k} className="flex items-center gap-3 py-2 border-b border-[#f0f4f9] last:border-0">
                  <span className="text-[13px] text-[#999] w-20 shrink-0">{k}</span>
                  <span className="text-[13px] text-[#333] font-medium">{v}</span>
                </div>
              ))}
            </div>
            {detailItem.status === "pending" && (
              <div className="mt-4">
                <label className="block text-[13px] font-medium text-[#444] mb-1.5">审核意见</label>
                <textarea className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none" rows={3} placeholder="请输入审核意见..." />
              </div>
            )}
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setDetailItem(null)} className="px-4 py-2 border border-[#dde3ec] rounded text-[13px] text-[#555]">关闭</button>
              {detailItem.status === "pending" && (
                <>
                  <button onClick={() => setDetailItem(null)} className="px-4 py-2 border border-[#dc2626] text-[#dc2626] rounded text-[13px]">驳回</button>
                  <button onClick={() => setDetailItem(null)} className="px-4 py-2 bg-[#2e7d32] text-white rounded text-[13px]">审核通过</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
