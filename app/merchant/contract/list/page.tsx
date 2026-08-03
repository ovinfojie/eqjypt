"use client"

import { useState } from "react"
import { Search, Eye, Download, Pen, FileText, CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react"

const STATUS_MAP = {
  pending_sign: { label: "待签署", color: "#e8831a", bg: "#fff8f0", icon: Clock },
  signed:       { label: "已生效", color: "#3a8c3f", bg: "#e8f5e9", icon: CheckCircle2 },
  expired:      { label: "已到期", color: "#999",    bg: "#f3f4f6", icon: AlertCircle },
  cancelled:    { label: "已终止", color: "#ef4444", bg: "#fef2f2", icon: XCircle },
}

const contracts = [
  { id: "CT2026080101", title: "农产品采购合同（大米-Q3）",   type: "采购合同", counterparty: "广东供销农产品股份有限公司", amount: "¥158,000", signDate: "2026-07-15", expiryDate: "2026-10-15", status: "signed" as const },
  { id: "CT2026080102", title: "江门产地直供框架协议（虾）",   type: "框架协议", counterparty: "江门鲜活水产直供中心",       amount: "¥240,000", signDate: "—",         expiryDate: "2026-12-31", status: "pending_sign" as const },
  { id: "CT2026072201", title: "荔枝季度采购合同（2026）",     type: "采购合同", counterparty: "茂名荔枝产地直供中心",       amount: "¥68,400",  signDate: "2026-06-01", expiryDate: "2026-08-31", status: "signed" as const },
  { id: "CT2026050301", title: "冷链仓储服务合同",             type: "服务合同", counterparty: "广东冷链物流有限公司",       amount: "¥36,000",  signDate: "2026-05-01", expiryDate: "2026-08-01", status: "expired" as const },
  { id: "CT2026030101", title: "2026年度大宗粮油采购协议",     type: "框架协议", counterparty: "南雄产地直供中心",           amount: "¥500,000", signDate: "—",         expiryDate: "2027-03-01", status: "pending_sign" as const },
]

const TABS = [
  { key: "all", label: "全部" },
  { key: "pending_sign", label: "待签署", count: 2 },
  { key: "signed",       label: "已生效" },
  { key: "expired",      label: "已到期" },
  { key: "cancelled",    label: "已终止" },
]

export default function ContractListPage() {
  const [tab, setTab] = useState("all")
  const [keyword, setKeyword] = useState("")

  const filtered = contracts.filter(c => {
    if (tab !== "all" && c.status !== tab) return false
    if (keyword && !c.title.includes(keyword) && !c.counterparty.includes(keyword)) return false
    return true
  })

  return (
    <div className="max-w-[1000px] space-y-5">
      <div>
        <h1 className="text-[20px] font-bold text-[#1a1a2e] mb-1">合同管理</h1>
        <p className="text-[13px] text-[#6b7c93]">查看和管理所有业务往来合同，跟踪签署状态与有效期。</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "全部合同",  value: contracts.length, color: "#1a5fa8" },
          { label: "待签署",    value: contracts.filter(c => c.status === "pending_sign").length, color: "#e8831a" },
          { label: "已生效",    value: contracts.filter(c => c.status === "signed").length,       color: "#3a8c3f" },
          { label: "即将到期",  value: 1, color: "#7c3aed" },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-lg border border-[#e8edf5] p-4 flex items-center gap-3">
            <div className="text-[24px] font-bold" style={{ color: c.color }}>{c.value}</div>
            <div className="text-[12px] text-[#6b7c93]">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
        <div className="flex border-b border-[#e8edf5]">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-5 py-2.5 text-[13px] border-b-2 -mb-px transition-colors ${tab === t.key ? "border-[#1a5fa8] text-[#1a5fa8] font-semibold" : "border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>
              {t.label}
              {t.count && <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#e8831a] text-white text-[10px] font-bold">{t.count}</span>}
            </button>
          ))}
          <div className="flex-1" />
          <div className="flex items-center gap-2 px-4">
            <div className="flex items-center gap-2 border border-[#e8edf5] rounded px-3 py-1.5 w-[200px]">
              <Search className="w-3.5 h-3.5 text-[#aaa]" />
              <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="搜索合同名称/对方单位" className="flex-1 text-[13px] outline-none placeholder:text-[#aaa]" />
            </div>
          </div>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[12px] text-[#6b7c93] bg-[#f8fafc] border-b border-[#f0f4f8]">
              {["合同编号","合同名称","类型","对方单位","合同金额","签署日期","到期日期","状态","操作"].map(h => (
                <th key={h} className="px-4 py-2.5 text-left font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => {
              const s = STATUS_MAP[c.status]
              return (
                <tr key={c.id} className="border-b border-[#f8fafc] hover:bg-[#fafbfc]">
                  <td className="px-4 py-3 text-[12px] text-[#999] font-mono">{c.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#6b7c93] shrink-0" />
                      <span className="font-medium text-[#1a1a2e]">{c.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 bg-[#f0f4f8] text-[#555] text-[11px] rounded">{c.type}</span></td>
                  <td className="px-4 py-3 text-[#555]">{c.counterparty}</td>
                  <td className="px-4 py-3 font-semibold text-[#e8831a]">{c.amount}</td>
                  <td className="px-4 py-3 text-[#999]">{c.signDate}</td>
                  <td className="px-4 py-3 text-[#999]">{c.expiryDate}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium w-fit" style={{ color: s.color, background: s.bg }}>
                      <s.icon className="w-3 h-3" />{s.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 text-[12px] text-[#1a5fa8] hover:underline"><Eye className="w-3 h-3" />查看</button>
                      {c.status === "pending_sign" && (
                        <button className="flex items-center gap-1 text-[12px] text-[#e8831a] hover:underline"><Pen className="w-3 h-3" />签署</button>
                      )}
                      <button className="flex items-center gap-1 text-[12px] text-[#6b7c93] hover:underline"><Download className="w-3 h-3" />下载</button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
