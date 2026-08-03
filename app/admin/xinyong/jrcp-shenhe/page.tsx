"use client"

import { useState } from "react"
import { Search, Clock, CheckCircle, XCircle, Eye } from "lucide-react"

const APPLICATIONS = [
  { id: "FIN-20260801", name: "广东粮油贸易有限公司", product: "供销惠农贷", bank: "广东农信社", amount: "80万元", score: 826, submitTime: "2026-08-01 09:12", status: "待审核" },
  { id: "FIN-20260731", name: "江门市鑫虾水产养殖场", product: "订单农业专项贷", bank: "邮储银行", amount: "50万元", score: 761, submitTime: "2026-07-31 14:35", status: "待审核" },
  { id: "FIN-20260729", name: "广州盒马生鲜采购中心", product: "农业经营担保", bank: "省农担", amount: "300万元", score: 893, submitTime: "2026-07-29 10:22", status: "已通过" },
  { id: "FIN-20260727", name: "茂名南方荔枝发展公司", product: "农产品价格指数险", bank: "中华联合财险", amount: "100万", score: 685, submitTime: "2026-07-27 16:08", status: "已通过" },
  { id: "FIN-20260725", name: "肇庆莲藕种植专业户",   product: "供销惠农贷", bank: "广东农信社", amount: "20万元", score: 612, submitTime: "2026-07-25 11:44", status: "已拒绝" },
  { id: "FIN-20260724", name: "遂溪甘蔗糖业加工厂",   product: "农产品仓单质押贷", bank: "广州农商银行", amount: "180万元", score: 779, submitTime: "2026-07-24 09:55", status: "已通过" },
]

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  "待审核": { label: "待审核", cls: "bg-[#fffbeb] text-[#b45309]" },
  "已通过": { label: "已通过", cls: "bg-[#e8fdf0] text-[#3a8c3f]" },
  "已拒绝": { label: "已拒绝", cls: "bg-[#fde8e8] text-[#d9534f]" },
}

export default function JrcpShenhePage() {
  const [tab, setTab] = useState("全部")
  const [keyword, setKeyword] = useState("")
  const [modalId, setModalId] = useState<string | null>(null)

  const tabs = ["全部", "待审核", "已通过", "已拒绝"]
  const pending = APPLICATIONS.filter(a => a.status === "待审核").length

  const filtered = APPLICATIONS.filter(a => {
    const matchTab = tab === "全部" || a.status === tab
    const matchKw = !keyword || a.name.includes(keyword) || a.id.includes(keyword)
    return matchTab && matchKw
  })

  const modalApp = APPLICATIONS.find(a => a.id === modalId)

  return (
<div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-bold text-[#1a1a2e]">金融申请审核</h1>
            <p className="text-[13px] text-[#888] mt-0.5">审核平台农业主体提交的金融产品申请</p>
          </div>
          {pending > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-[#fffbeb] border border-[#fde68a] rounded-lg text-[13px] text-[#b45309]">
              <Clock className="w-4 h-4" />
              <span>有 <strong>{pending}</strong> 笔申请待审核</span>
            </div>
          )}
        </div>

        {/* Tabs + search */}
        <div className="bg-white rounded-xl border border-[#e8edf5] p-4 flex items-center gap-4">
          <div className="flex gap-1">
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded text-[13px] font-medium transition-colors ${tab === t ? "bg-[#1a5fa8] text-white" : "text-[#555] hover:bg-[#f5f7fa]"}`}>
                {t}{t === "待审核" && pending > 0 && <span className="ml-1.5 inline-block w-4 h-4 rounded-full bg-[#d9534f] text-white text-[10px] leading-4 text-center font-bold">{pending}</span>}
              </button>
            ))}
          </div>
          <div className="relative ml-auto max-w-[260px] w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbb]" />
            <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="搜索申请方或单号" className="w-full pl-9 pr-3 py-2 border border-[#dde3ec] rounded text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead className="bg-[#f8fafc] border-b border-[#e8edf5]">
              <tr>
                {["申请单号", "申请方", "申请产品", "合作机构", "申请金额", "信用评分", "提交时间", "状态", "操作"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[12px] font-semibold text-[#555]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f8]">
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-[#f8fafc]">
                  <td className="px-4 py-3.5 font-mono text-[#888] text-[12px]">{a.id}</td>
                  <td className="px-4 py-3.5 font-medium text-[#1a1a2e]">{a.name}</td>
                  <td className="px-4 py-3.5 text-[#555]">{a.product}</td>
                  <td className="px-4 py-3.5 text-[#888]">{a.bank}</td>
                  <td className="px-4 py-3.5 font-semibold text-[#1a5fa8]">{a.amount}</td>
                  <td className="px-4 py-3.5">
                    <span className={`font-bold ${a.score >= 800 ? "text-[#3a8c3f]" : a.score >= 700 ? "text-[#1a5fa8]" : "text-[#e65c00]"}`}>{a.score}</span>
                  </td>
                  <td className="px-4 py-3.5 text-[#888]">{a.submitTime}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${STATUS_MAP[a.status].cls}`}>{STATUS_MAP[a.status].label}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setModalId(a.id)} className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                        <Eye className="w-3.5 h-3.5" />
                        查看
                      </button>
                      {a.status === "待审核" && (
                        <>
                          <button className="flex items-center gap-1 text-[#3a8c3f] hover:underline text-[12px]">
                            <CheckCircle className="w-3.5 h-3.5" />
                            通过
                          </button>
                          <button className="flex items-center gap-1 text-[#d9534f] hover:underline text-[12px]">
                            <XCircle className="w-3.5 h-3.5" />
                            拒绝
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {modalId && modalApp && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setModalId(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-[500px] p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[16px] font-bold text-[#1a1a2e]">申请详情</h3>
              <button onClick={() => setModalId(null)} className="text-[#bbb] hover:text-[#555] text-[20px] leading-none">×</button>
            </div>
            <div className="space-y-3 text-[13px]">
              {[
                { label: "申请单号", value: modalApp.id },
                { label: "申请方", value: modalApp.name },
                { label: "申请产品", value: modalApp.product },
                { label: "合作机构", value: modalApp.bank },
                { label: "申请金额", value: modalApp.amount },
                { label: "信用评分", value: `${modalApp.score} 分` },
                { label: "提交时间", value: modalApp.submitTime },
                { label: "当前状态", value: STATUS_MAP[modalApp.status].label },
              ].map(item => (
                <div key={item.label} className="flex gap-4 py-2 border-b border-[#f0f4f8] last:border-0">
                  <span className="w-24 text-[#888] shrink-0">{item.label}</span>
                  <span className="font-medium text-[#1a1a2e]">{item.value}</span>
                </div>
              ))}
            </div>
            {modalApp.status === "待审核" && (
              <div className="flex gap-3 mt-5">
                <button className="flex-1 py-2.5 bg-[#1a5fa8] text-white rounded text-[14px] font-medium hover:bg-[#1550a0] transition-colors">
                  审核通过
                </button>
                <button className="flex-1 py-2.5 bg-white border border-[#d9534f] text-[#d9534f] rounded text-[14px] font-medium hover:bg-[#fde8e8] transition-colors">
                  审核拒绝
                </button>
              </div>
            )}
          </div>
        </div>
      )}
)
}
