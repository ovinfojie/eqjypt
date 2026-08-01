"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Eye, CheckCircle2, XCircle, Building2 } from "lucide-react"

type AuditStatus = "pending" | "approved" | "rejected"
const STATUS_MAP: Record<AuditStatus, { label: string; color: string; bg: string }> = {
  pending:  { label: "待审核", color: "#b45309", bg: "#fef3c7" },
  approved: { label: "已通过", color: "#1a7a3c", bg: "#e8f5ee" },
  rejected: { label: "已驳回", color: "#b91c1c", bg: "#fee2e2" },
}

const rows = [
  { id: "GYS001", name: "广东新天润粮油有限公司",     region: "江门产地直供中心", bizType: "粮油/水产",   contact: "张经理 138****8888", creditLevel: "AAA", submittedAt: "2026-06-03 10:00", status: "pending"  as AuditStatus },
  { id: "GYS002", name: "茂名供销农产品贸易有限公司", region: "茂名产地直供中心", bizType: "水果/蔬菜",  contact: "李经理 139****9999", creditLevel: "AA",  submittedAt: "2026-06-02 15:20", status: "pending"  as AuditStatus },
  { id: "GYS003", name: "南雄社村合作农业发展有限公司", region: "南雄产地直供中心", bizType: "粮油/加工", contact: "王经理 136****7777", creditLevel: "AAA", submittedAt: "2026-06-01 09:30", status: "approved" as AuditStatus },
  { id: "GYS004", name: "肇庆新供销农产品有限公司",   region: "肇庆产地直供中心", bizType: "禽蛋/水产",  contact: "刘经理 137****6666", creditLevel: "A",   submittedAt: "2026-05-30 14:10", status: "approved" as AuditStatus },
  { id: "GYS005", name: "广州供销数字科技有限公司",   region: "韶关产地直供中心", bizType: "特色农产品", contact: "陈经理 135****5555", creditLevel: "AA",  submittedAt: "2026-05-28 10:45", status: "rejected" as AuditStatus },
]

const TABS = [
  { key: "all",      label: "全部" },
  { key: "pending",  label: "待审核" },
  { key: "approved", label: "已通过" },
  { key: "rejected", label: "已驳回" },
]

const CREDIT_STYLE: Record<string, { color: string; bg: string }> = {
  AAA: { color: "#c8961a", bg: "#fff8e1" },
  AA:  { color: "#1a5fa8", bg: "#e8f4fd" },
  A:   { color: "#555",    bg: "#f0f0f0" },
}

export default function SupplierShenhePage() {
  const [data, setData] = useState(rows)
  const [tab, setTab]   = useState("all")
  const [keyword, setKeyword] = useState("")
  const [rejectId, setRejectId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState("")

  const approve = (id: string) => setData(data.map((r) => r.id === id ? { ...r, status: "approved" as AuditStatus } : r))
  const reject  = (id: string, reason: string) => {
    setData(data.map((r) => r.id === id ? { ...r, status: "rejected" as AuditStatus } : r))
    setRejectId(null); setRejectReason("")
  }

  const filtered = data.filter((r) => {
    if (tab !== "all" && r.status !== tab) return false
    if (keyword && !r.name.includes(keyword) && !r.region.includes(keyword)) return false
    return true
  })

  const pendingCount = data.filter(r => r.status === "pending").length

  return (
    <AdminLayout>
      <div className="mb-5">
        <h1 className="text-[20px] font-bold text-[#1a1a2e] mb-1">
          供应商审核
          {pendingCount > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#b91c1c] text-white text-[11px] font-bold">{pendingCount}</span>
          )}
        </h1>
        <p className="text-[13px] text-[#6b7c93]">审核供应商入驻供销严选平台的申请，通过后供应商可发布商品。</p>
      </div>

      <div className="bg-white rounded-lg border border-[#dde3ec]">
        <div className="flex items-center border-b border-[#e8edf5]">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-5 py-2.5 text-[13px] transition-colors border-b-2 -mb-px ${
                tab === t.key ? "border-[#1a1a2e] text-[#1a1a2e] font-semibold" : "border-transparent text-[#666] hover:text-[#1a1a2e]"
              }`}>
              {t.label}
              {t.key === "pending" && pendingCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] text-[10px] font-semibold">{pendingCount}</span>
              )}
            </button>
          ))}
          <div className="flex-1" />
          <div className="flex items-center gap-2 px-4">
            <input value={keyword} onChange={(e) => setKeyword(e.target.value)}
              placeholder="搜索供应商名称/产地"
              className="border border-[#dde3ec] rounded px-3 h-7 text-[12px] w-[200px] focus:outline-none focus:border-[#1a5fa8]" />
            <button className="px-3 h-7 bg-[#1a1a2e] text-white text-[12px] rounded">搜索</button>
          </div>
        </div>

        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[#6b7c93] text-[12px] border-b border-[#e8edf5]">
              <th className="px-4 py-2.5 text-left font-medium">编号</th>
              <th className="px-4 py-2.5 text-left font-medium">供应商名称</th>
              <th className="px-4 py-2.5 text-left font-medium">申请产地</th>
              <th className="px-4 py-2.5 text-left font-medium">经营品类</th>
              <th className="px-4 py-2.5 text-left font-medium">联系人</th>
              <th className="px-4 py-2.5 text-left font-medium">信用等级</th>
              <th className="px-4 py-2.5 text-left font-medium">申请时间</th>
              <th className="px-4 py-2.5 text-left font-medium">状态</th>
              <th className="px-4 py-2.5 text-left font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => {
              const s = STATUS_MAP[row.status]
              const c = CREDIT_STYLE[row.creditLevel] ?? CREDIT_STYLE.A
              return (
                <tr key={row.id} className="border-b border-[#f0f4f9] hover:bg-[#fafbfc]">
                  <td className="px-4 py-3 text-[#6b7c93] text-[12px] font-mono">{row.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 font-medium text-[#1a1a2e]">
                      <Building2 className="w-3.5 h-3.5 text-[#6b7c93]" />{row.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#6b7c93]">{row.region}</td>
                  <td className="px-4 py-3 text-[#555]">{row.bizType}</td>
                  <td className="px-4 py-3 text-[#555]">{row.contact}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold" style={{ color: c.color, background: c.bg }}>{row.creditLevel}</span>
                  </td>
                  <td className="px-4 py-3 text-[#6b7c93]">{row.submittedAt}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium" style={{ color: s.color, background: s.bg }}>{s.label}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                        <Eye className="w-3.5 h-3.5" />查看资质
                      </button>
                      {row.status === "pending" && (
                        <>
                          <button onClick={() => approve(row.id)} className="flex items-center gap-1 text-[#1a7a3c] hover:underline text-[12px]">
                            <CheckCircle2 className="w-3.5 h-3.5" />通过
                          </button>
                          <button onClick={() => setRejectId(row.id)} className="flex items-center gap-1 text-[#b91c1c] hover:underline text-[12px]">
                            <XCircle className="w-3.5 h-3.5" />驳回
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr><td colSpan={9} className="px-4 py-10 text-center text-[#999] text-[13px]">暂无数据</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {rejectId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[460px] p-6">
            <h3 className="text-[16px] font-semibold text-[#1a1a2e] mb-4">填写驳回原因</h3>
            <textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)}
              placeholder="请填写驳回原因，将通知给供应商" rows={4}
              className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a1a2e] resize-none mb-4" />
            <div className="flex justify-end gap-3">
              <button onClick={() => setRejectId(null)} className="px-5 h-8 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:bg-[#f5f7fa]">取消</button>
              <button onClick={() => rejectReason.trim() && reject(rejectId, rejectReason)}
                disabled={!rejectReason.trim()}
                className="px-5 h-8 bg-[#b91c1c] text-white text-[13px] rounded hover:bg-[#991b1b] disabled:opacity-40 disabled:cursor-not-allowed">
                确认驳回
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
