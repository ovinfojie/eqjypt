"use client"

import { useState } from "react"
import { Search, Eye, CheckCircle, XCircle } from "lucide-react"

const tabs = [
  { key: "all",     label: "全部" },
  { key: "paid",    label: "已缴纳" },
  { key: "appeal",  label: "申诉中" },
  { key: "refund",  label: "退款中" },
  { key: "done",    label: "已退款" },
]

const records = [
  { id: "BJ001", session: "2026年广东粮油竞拍专场(一)", company: "广州粮油集团",     amt: "¥50,000", paid: "2026-07-28", status: "paid",   appealReason: "" },
  { id: "BJ002", session: "2026年茂名荔枝产地竞拍",     company: "广东某连锁超市",   amt: "¥20,000", paid: "2026-07-29", status: "appeal", appealReason: "竞拍系统出现故障导致出价失败，申请退还保证金" },
  { id: "BJ003", session: "2026年广东粮油竞拍专场(一)", company: "深圳农产品流通公司", amt: "¥50,000", paid: "2026-07-25", status: "refund", appealReason: "" },
  { id: "BJ004", session: "禽蛋类产品竞拍专场",         company: "东莞批发市场有限公司", amt: "¥10,000", paid: "2026-07-20", status: "done",   appealReason: "" },
  { id: "BJ005", session: "2026年茂名荔枝产地竞拍",     company: "华润万家采购中心",  amt: "¥20,000", paid: "2026-07-30", status: "paid",   appealReason: "" },
]

const statusMap: Record<string, { label: string; color: string; bg: string }> = {
  paid:   { label: "已缴纳", color: "#1a5fa8", bg: "#e8f4fd" },
  appeal: { label: "申诉中", color: "#e8831a", bg: "#fff7ed" },
  refund: { label: "退款中", color: "#7c3aed", bg: "#f3e8fd" },
  done:   { label: "已退款", color: "#2e7d32", bg: "#e8f5e9" },
}

export default function JingjiaDepositPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [keyword, setKeyword] = useState("")
  const [appealItem, setAppealItem] = useState<typeof records[0] | null>(null)

  const filtered = records.filter(r => {
    const matchTab = activeTab === "all" || r.status === activeTab
    const matchKw = !keyword || r.company.includes(keyword) || r.session.includes(keyword)
    return matchTab && matchKw
  })

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[20px] font-bold text-[#1a1a2e]">竞拍保证金管理</h1>
        <p className="text-[13px] text-[#6b7c93] mt-0.5">管理竞拍保证金缴纳、申诉和退款流程</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "保证金总额",  value: "¥150,000", color: "#1a1a2e" },
          { label: "申诉待处理",  value: records.filter(r => r.status === "appeal").length, color: "#e8831a" },
          { label: "退款处理中",  value: records.filter(r => r.status === "refund").length, color: "#7c3aed" },
          { label: "本月已退款",  value: records.filter(r => r.status === "done").length,   color: "#2e7d32" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-[#dde3ec] p-4 flex items-center gap-4">
            <div className="text-[24px] font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[13px] text-[#6b7c93]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#dde3ec]">
        <div className="flex items-center justify-between border-b border-[#dde3ec]">
          <div className="flex px-4">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`px-4 py-3 text-[13px] font-medium border-b-2 transition-colors ${activeTab === t.key ? "border-[#1a1a2e] text-[#1a1a2e]" : "border-transparent text-[#666] hover:text-[#1a1a2e]"}`}>
                {t.label}
                {t.key !== "all" && <span className="ml-1.5 px-1.5 py-0.5 bg-[#f0f4f8] text-[#6b7c93] text-[11px] rounded-full">{records.filter(r => r.status === t.key).length}</span>}
              </button>
            ))}
          </div>
          <div className="relative mr-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#999]" />
            <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="搜索企业/专场" className="h-8 border border-[#dde3ec] rounded pl-8 pr-3 text-[12px] focus:outline-none focus:border-[#1a5fa8] w-44" />
          </div>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[#999] text-[12px] border-b border-[#f0f4f9]">
              {["记录编号","竞拍专场","缴纳企业","保证金金额","缴纳时间","状态","操作"].map(h => (
                <th key={h} className="px-5 py-2.5 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => {
              const st = statusMap[row.status]
              return (
                <tr key={row.id} className="border-b border-[#f0f4f9] last:border-0 hover:bg-[#fafbfc]">
                  <td className="px-5 py-3 text-[#999] text-[12px]">{row.id}</td>
                  <td className="px-5 py-3 font-medium text-[#1a1a2e] max-w-[200px] truncate">{row.session}</td>
                  <td className="px-5 py-3 text-[#555]">{row.company}</td>
                  <td className="px-5 py-3 font-bold text-[#b45309]">{row.amt}</td>
                  <td className="px-5 py-3 text-[#6b7c93]">{row.paid}</td>
                  <td className="px-5 py-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-medium" style={{ color: st.color, background: st.bg }}>{st.label}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setAppealItem(row)} className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                        <Eye className="w-3.5 h-3.5" />详情
                      </button>
                      {row.status === "appeal" && (
                        <>
                          <button onClick={() => setAppealItem(row)} className="flex items-center gap-1 text-[#2e7d32] hover:underline text-[12px]">
                            <CheckCircle className="w-3.5 h-3.5" />通过申诉
                          </button>
                          <button className="flex items-center gap-1 text-[#dc2626] hover:underline text-[12px]">
                            <XCircle className="w-3.5 h-3.5" />驳回
                          </button>
                        </>
                      )}
                      {row.status === "paid" && (
                        <button className="flex items-center gap-1 text-[#7c3aed] hover:underline text-[12px]">发起退款</button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Appeal detail modal */}
      {appealItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setAppealItem(null)}>
          <div className="bg-white rounded-xl shadow-xl p-6 w-[500px]" onClick={e => e.stopPropagation()}>
            <h3 className="text-[16px] font-bold text-[#1a1a2e] mb-5">保证金详情</h3>
            <div className="space-y-3">
              {[
                ["记录编号", appealItem.id],
                ["竞拍专场", appealItem.session],
                ["缴纳企业", appealItem.company],
                ["金额",     appealItem.amt],
                ["缴纳时间", appealItem.paid],
                ["当前状态", statusMap[appealItem.status].label],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start gap-3 py-2 border-b border-[#f0f4f9] last:border-0">
                  <span className="text-[13px] text-[#999] w-20 shrink-0">{k}</span>
                  <span className="text-[13px] text-[#333] font-medium">{v}</span>
                </div>
              ))}
              {appealItem.appealReason && (
                <div className="mt-3 p-3 bg-[#fff7ed] rounded-lg border border-[#fed7aa]">
                  <div className="text-[12px] font-semibold text-[#e8831a] mb-1">申诉原因</div>
                  <div className="text-[13px] text-[#555]">{appealItem.appealReason}</div>
                </div>
              )}
            </div>
            {appealItem.status === "appeal" && (
              <div className="mt-4">
                <label className="block text-[13px] font-medium text-[#444] mb-1.5">处理意见</label>
                <textarea className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none" rows={3} placeholder="请输入处理意见..." />
              </div>
            )}
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setAppealItem(null)} className="px-4 py-2 border border-[#dde3ec] rounded text-[13px] text-[#555]">关闭</button>
              {appealItem.status === "appeal" && (
                <>
                  <button onClick={() => setAppealItem(null)} className="px-4 py-2 border border-[#dc2626] text-[#dc2626] rounded text-[13px]">驳回申诉</button>
                  <button onClick={() => setAppealItem(null)} className="px-4 py-2 bg-[#2e7d32] text-white rounded text-[13px]">通过并退款</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
