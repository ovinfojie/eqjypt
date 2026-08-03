"use client"

import { useState } from "react"
import { Search, ChevronDown, FileText, Clock, CheckCircle2, XCircle, Plus } from "lucide-react"

type TabKey = "all" | "pending" | "processing" | "completed" | "rejected"

const TABS: { key: TabKey; label: string; count?: number }[] = [
  { key: "all", label: "全部" },
  { key: "pending", label: "待处理", count: 2 },
  { key: "processing", label: "开票中", count: 1 },
  { key: "completed", label: "已完成" },
  { key: "rejected", label: "已拒绝" },
]

const STATUS_MAP: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  pending:    { label: "待处理", color: "#e8831a", bg: "#fff8f0", icon: Clock },
  processing: { label: "开票中", color: "#1a5fa8", bg: "#e8f4fd", icon: FileText },
  completed:  { label: "已完成", color: "#3a8c3f", bg: "#e8f5e9", icon: CheckCircle2 },
  rejected:   { label: "已拒绝", color: "#ef4444", bg: "#fef2f2", icon: XCircle },
}

const invoices = [
  { id: "i1", applyNo: "FP2026080100023", orderNos: "PO2026080100123、PO2026073100098", amt: "2,759.60", type: "增值税专用发票", header: "盒马超市采购部", taxNo: "91440100MA5D12", applyAt: "2026-08-01", status: "pending" },
  { id: "i2", applyNo: "FP2026073000018", orderNos: "PO2026072500045", amt: "3,120.00", type: "增值税专用发票", header: "盒马超市采购部", taxNo: "91440100MA5D12", applyAt: "2026-07-30", status: "processing" },
  { id: "i3", applyNo: "FP2026072000010", orderNos: "PO2026071500033", amt: "1,840.00", type: "增值税普通发票", header: "盒马超市（个体）", taxNo: "91440100MA5D99", applyAt: "2026-07-20", status: "completed" },
  { id: "i4", applyNo: "FP2026071000005", orderNos: "PO2026070800021", amt: "560.00", type: "增值税专用发票", header: "盒马超市采购部", taxNo: "91440100MA5D12", applyAt: "2026-07-10", status: "rejected" },
]

export default function InvoiceApplyPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all")
  const [keyword, setKeyword] = useState("")
  const [showApply, setShowApply] = useState(false)

  const filtered = invoices.filter(i => {
    const matchTab = activeTab === "all" || i.status === activeTab
    const matchKw = !keyword || i.applyNo.includes(keyword) || i.orderNos.includes(keyword)
    return matchTab && matchKw
  })

  return (
    <div className="max-w-[980px] mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-bold text-[#1a1a2e]">发票申请管理</h1>
        <button onClick={() => setShowApply(true)} className="flex items-center gap-1.5 px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
          <Plus className="w-4 h-4" /> 申请开票
        </button>
      </div>

      <div className="bg-white rounded-lg border border-[#e8edf5] p-4 flex items-center gap-3">
        <div className="flex items-center gap-2 border border-[#e8edf5] rounded px-3 py-1.5 flex-1 max-w-[320px]">
          <Search className="w-3.5 h-3.5 text-[#6b7c93] shrink-0" />
          <input type="text" placeholder="搜索申请编号/订单号" value={keyword} onChange={e => setKeyword(e.target.value)} className="flex-1 text-[13px] outline-none placeholder:text-[#aaa]" />
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e8edf5] rounded text-[13px] text-[#555] hover:border-[#1a5fa8]">
          时间范围 <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex border-b border-[#e8edf5]">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-[13px] font-medium transition-colors ${activeTab === tab.key ? "text-[#1a5fa8] border-b-2 border-[#1a5fa8] -mb-px" : "text-[#6b7c93] hover:text-[#1a5fa8]"}`}>
            {tab.label}
            {tab.count && <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#e8831a] text-white text-[10px] font-bold">{tab.count}</span>}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(inv => {
          const s = STATUS_MAP[inv.status]
          const StatusIcon = s.icon
          return (
            <div key={inv.id} className="bg-white rounded-lg border border-[#e8edf5] p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[12px] font-medium" style={{ color: s.color, backgroundColor: s.bg }}>
                      <StatusIcon className="w-3.5 h-3.5" />{s.label}
                    </span>
                    <span className="font-mono text-[13px] text-[#555]">{inv.applyNo}</span>
                    <span className="text-[13px] text-[#6b7c93]">申请时间：{inv.applyAt}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-[13px]">
                    <div><span className="text-[#6b7c93]">关联订单：</span>{inv.orderNos}</div>
                    <div><span className="text-[#6b7c93]">开票金额：</span><span className="text-[#e8831a] font-semibold">¥{inv.amt}</span></div>
                    <div><span className="text-[#6b7c93]">发票类型：</span>{inv.type}</div>
                    <div><span className="text-[#6b7c93]">开票抬头：</span>{inv.header}</div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4 shrink-0">
                  <button className="px-3 py-1.5 border border-[#1a5fa8] text-[#1a5fa8] text-[12px] rounded hover:bg-[#e8f4fd]">查看详情</button>
                  {inv.status === "completed" && (
                    <button className="px-3 py-1.5 bg-[#3a8c3f] text-white text-[12px] rounded hover:bg-[#2d7a33]">下载发票</button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {showApply && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[560px] p-6">
            <h2 className="text-[16px] font-bold text-[#1a1a2e] mb-4">申请开票</h2>
            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <label className="text-[13px] text-[#6b7c93] w-24 text-right shrink-0">关联订单</label>
                <textarea rows={2} className="flex-1 border border-[#e8edf5] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none" placeholder="输入订单号，多个以逗号分隔" />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-[13px] text-[#6b7c93] w-24 text-right shrink-0">发票类型</label>
                <select className="flex-1 border border-[#e8edf5] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]">
                  <option>增值税专用发票</option>
                  <option>增值税普通发票</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-[13px] text-[#6b7c93] w-24 text-right shrink-0">开票抬头</label>
                <select className="flex-1 border border-[#e8edf5] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]">
                  <option>盒马超市采购部</option>
                  <option>盒马超市（个体）</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-[13px] text-[#6b7c93] w-24 text-right shrink-0">备注</label>
                <input type="text" className="flex-1 border border-[#e8edf5] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="选填" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setShowApply(false)} className="px-5 py-2 border border-[#e8edf5] text-[13px] rounded hover:bg-[#f5f7fa]">取消</button>
              <button onClick={() => setShowApply(false)} className="px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]">提交申请</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
