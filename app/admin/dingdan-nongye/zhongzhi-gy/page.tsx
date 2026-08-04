"use client"

import { useState } from "react"
import { Search, Download, Eye, CheckCircle, XCircle, X } from "lucide-react"

type Row = {
  id: string
  orderId: string
  applicant: string
  title: string
  product: string
  qty: string
  reason: string
  applyTime: string
  status: "待审核" | "已通过" | "已驳回"
  rejectReason?: string
}

const mockData: Row[] = [
  {
    id: "ZZGY20260501001", orderId: "GY20260501001", applicant: "饶平种植专业合作社",
    title: "2026年优质丝苗米供应", product: "丝苗米", qty: "12000公斤",
    reason: "受天气影响减产，无法足量供应，申请终止该供应。", applyTime: "2026-04-21 11:30", status: "待审核",
  },
  {
    id: "ZZGY20260501002", orderId: "GY20260501002", applicant: "南雄市社村合作农业发展有限公司",
    title: "2026年恩平土豆产地直供", product: "土豆", qty: "8000公斤",
    reason: "已与其他渠道达成长期合作，终止本平台供应。", applyTime: "2026-04-20 09:15", status: "待审核",
  },
  {
    id: "ZZGY20260501003", orderId: "GY20260501003", applicant: "台山市大江供销社",
    title: "2026年新鲜荔枝供应", product: "荔枝", qty: "5000公斤",
    reason: "定价调整，重新发布供应信息。", applyTime: "2026-04-16 16:40", status: "已通过",
  },
  {
    id: "ZZGY20260501004", orderId: "GY20260501004", applicant: "高州市社村合作农业发展有限公司02",
    title: "2026年冬瓜产地供应", product: "冬瓜", qty: "15000公斤",
    reason: "误发布，申请终止。", applyTime: "2026-04-13 10:20", status: "已驳回",
    rejectReason: "该供应已被买家下单并支付预付款，不符合终止条件。",
  },
]

const tabs = ["全部", "待审核", "已通过", "已驳回"] as const

const statusColors: Record<string, { color: string; bg: string }> = {
  "待审核": { color: "#e8831a", bg: "#fff7ed" },
  "已通过": { color: "#2e7d32", bg: "#e8f5e9" },
  "已驳回": { color: "#e53935", bg: "#fdecea" },
}

export default function ZhongzhiGyPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("全部")
  const [searchText, setSearchText] = useState("")
  const [rows, setRows] = useState<Row[]>(mockData)
  const [detailRow, setDetailRow] = useState<Row | null>(null)
  const [rejectRow, setRejectRow] = useState<Row | null>(null)
  const [rejectText, setRejectText] = useState("")

  const filtered = rows.filter((r) => {
    if (activeTab !== "全部" && r.status !== activeTab) return false
    if (searchText && !r.title.includes(searchText) && !r.id.includes(searchText) && !r.applicant.includes(searchText)) return false
    return true
  })

  const handleApprove = (row: Row) => {
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: "已通过" } : r)))
  }

  const submitReject = () => {
    if (!rejectRow || !rejectText.trim()) return
    setRows((prev) => prev.map((r) => (r.id === rejectRow.id ? { ...r, status: "已驳回", rejectReason: rejectText.trim() } : r)))
    setRejectRow(null)
    setRejectText("")
  }

  return (
    <div>
      {/* 页头 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">平台终止供应</h1>
          <p className="text-[13px] text-[#6b7c93] mt-0.5">审核商家提交的订单种植供应终止申请，驳回需填写撤回理由</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-[#dde3ec] rounded text-[13px] text-[#444] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
          <Download className="w-4 h-4" />导出数据
        </button>
      </div>

      {/* 统计卡 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "终止申请总数", value: String(rows.length), color: "#1a5fa8" },
          { label: "待审核", value: String(rows.filter((d) => d.status === "待审核").length), color: "#e8831a" },
          { label: "已通过", value: String(rows.filter((d) => d.status === "已通过").length), color: "#2e7d32" },
          { label: "已驳回", value: String(rows.filter((d) => d.status === "已驳回").length), color: "#e53935" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-lg border border-[#dde3ec] px-5 py-4">
            <div className="text-[13px] text-[#6b7c93] mb-1">{s.label}</div>
            <div className="text-[28px] font-bold" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* 搜索 + Tab */}
      <div className="bg-white rounded-lg border border-[#dde3ec] mb-4">
        <div className="flex border-b border-[#dde3ec] px-4">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-[13px] font-medium border-b-2 transition-colors ${
                activeTab === tab ? "border-[#1a5fa8] text-[#1a5fa8]" : "border-transparent text-[#666] hover:text-[#1a5fa8]"
              }`}>
              {tab}
              {tab !== "全部" && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-[#f0f4f8] text-[#6b7c93] text-[11px] rounded-full">
                  {rows.filter((d) => d.status === tab).length}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 p-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
            <input type="text" placeholder="搜索终止申请编号、供应标题、申请企业"
              value={searchText} onChange={(e) => setSearchText(e.target.value)}
              className="w-full h-9 border border-[#dde3ec] rounded pl-9 pr-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
          </div>
        </div>
      </div>

      {/* 表格 */}
      <div className="bg-white rounded-lg border border-[#dde3ec] overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-[#f5f7fa]">
            <tr>
              {["终止申请编号", "关联供应", "申请企业", "商品/数量", "终止原因", "申请时间", "状态", "操作"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-semibold text-[#444] border-b border-[#dde3ec] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => {
              const sc = statusColors[row.status]
              return (
                <tr key={row.id} className="border-b border-[#dde3ec] last:border-0 hover:bg-[#fafbfc]">
                  <td className="px-4 py-3 text-[#1a5fa8] font-medium whitespace-nowrap">{row.id}</td>
                  <td className="px-4 py-3">
                    <div className="text-[#1a5fa8]">{row.orderId}</div>
                    <div className="text-[11px] text-[#999] max-w-[180px] line-clamp-1">{row.title}</div>
                  </td>
                  <td className="px-4 py-3 max-w-[160px]">
                    <div className="text-[#333] line-clamp-1">{row.applicant}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-[#333]">{row.product}</div>
                    <div className="text-[11px] text-[#6b7c93]">{row.qty}</div>
                  </td>
                  <td className="px-4 py-3 max-w-[200px]">
                    <div className="text-[#666] line-clamp-2">{row.reason}</div>
                  </td>
                  <td className="px-4 py-3 text-[#6b7c93] whitespace-nowrap">{row.applyTime}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-[12px] font-medium whitespace-nowrap"
                      style={{ color: sc.color, backgroundColor: sc.bg }}>{row.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setDetailRow(row)}
                        className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                        <Eye className="w-3.5 h-3.5" />详情
                      </button>
                      {row.status === "待审核" && (
                        <>
                          <button onClick={() => handleApprove(row)}
                            className="flex items-center gap-1 text-[#2e7d32] hover:underline text-[12px]">
                            <CheckCircle className="w-3.5 h-3.5" />通过
                          </button>
                          <button onClick={() => { setRejectRow(row); setRejectText("") }}
                            className="flex items-center gap-1 text-red-500 hover:underline text-[12px]">
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
              <tr><td colSpan={8} className="px-4 py-10 text-center text-[13px] text-[#999]">暂无数据</td></tr>
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#dde3ec]">
          <span className="text-[13px] text-[#6b7c93]">共 {filtered.length} 条记录</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((p) => (
              <button key={p} className={`w-8 h-8 rounded text-[13px] transition-colors ${p === 1 ? "bg-[#1a5fa8] text-white" : "text-[#444] hover:bg-[#f0f4f8]"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {/* 详情弹窗 */}
      {detailRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setDetailRow(null)}>
          <div className="bg-white rounded-lg w-[560px] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
              <h3 className="text-[16px] font-bold text-[#1a1a2e]">终止供应详情</h3>
              <button onClick={() => setDetailRow(null)}><X className="w-5 h-5 text-[#999] hover:text-[#333]" /></button>
            </div>
            <div className="px-6 py-5 space-y-3 text-[13px]">
              {[
                ["终止申请编号", detailRow.id],
                ["关联供应编号", detailRow.orderId],
                ["供应标题", detailRow.title],
                ["申请企业", detailRow.applicant],
                ["商品/数量", `${detailRow.product}  ${detailRow.qty}`],
                ["申请时间", detailRow.applyTime],
                ["终止原因", detailRow.reason],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <span className="text-[#999] shrink-0 w-24">{k}</span>
                  <span className="text-[#333] flex-1">{v}</span>
                </div>
              ))}
              <div className="flex gap-3">
                <span className="text-[#999] shrink-0 w-24">审核状态</span>
                <span className="font-medium" style={{ color: statusColors[detailRow.status].color }}>{detailRow.status}</span>
              </div>
              {detailRow.status === "已驳回" && detailRow.rejectReason && (
                <div className="flex gap-3">
                  <span className="text-[#999] shrink-0 w-24">撤回理由</span>
                  <span className="text-[#e53935] flex-1">{detailRow.rejectReason}</span>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#e8edf5]">
              {detailRow.status === "待审核" && (
                <>
                  <button onClick={() => { handleApprove(detailRow); setDetailRow(null) }}
                    className="px-4 py-2 bg-[#2e7d32] text-white text-[13px] rounded hover:bg-[#256628]">审核通过</button>
                  <button onClick={() => { setRejectRow(detailRow); setRejectText(""); setDetailRow(null) }}
                    className="px-4 py-2 bg-red-500 text-white text-[13px] rounded hover:bg-red-600">审核驳回</button>
                </>
              )}
              <button onClick={() => setDetailRow(null)}
                className="px-4 py-2 border border-[#dde3ec] text-[#444] text-[13px] rounded hover:border-[#999]">关闭</button>
            </div>
          </div>
        </div>
      )}

      {/* 驳回弹窗（填写撤回理由） */}
      {rejectRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setRejectRow(null)}>
          <div className="bg-white rounded-lg w-[480px] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
              <h3 className="text-[16px] font-bold text-[#1a1a2e]">审核驳回</h3>
              <button onClick={() => setRejectRow(null)}><X className="w-5 h-5 text-[#999] hover:text-[#333]" /></button>
            </div>
            <div className="px-6 py-5 space-y-3">
              <div className="text-[13px] text-[#666]">
                正在驳回终止申请 <span className="text-[#1a5fa8] font-medium">{rejectRow.id}</span>，请填写撤回理由：
              </div>
              <textarea
                value={rejectText} onChange={(e) => setRejectText(e.target.value)}
                placeholder="请输入撤回理由（必填）" rows={4} maxLength={200}
                className="w-full border border-[#dde3ec] rounded p-3 text-[13px] outline-none focus:border-[#1a5fa8] resize-none" />
              <div className="text-right text-[11px] text-[#999]">{rejectText.length}/200</div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#e8edf5]">
              <button onClick={() => setRejectRow(null)}
                className="px-4 py-2 border border-[#dde3ec] text-[#444] text-[13px] rounded hover:border-[#999]">取消</button>
              <button onClick={submitReject} disabled={!rejectText.trim()}
                className="px-4 py-2 bg-red-500 text-white text-[13px] rounded hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed">确认驳回</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
