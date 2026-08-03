"use client"

import { useState } from "react"
import { CreditCard, ArrowUpCircle, ArrowDownCircle, Clock, CheckCircle2, XCircle, AlertTriangle } from "lucide-react"

const TYPE_MAP = {
  paid:     { label: "已缴纳", color: "#1a5fa8", bg: "#e8f4fd", icon: ArrowUpCircle },
  refunded: { label: "已退款", color: "#3a8c3f", bg: "#e8f5e9", icon: ArrowDownCircle },
  frozen:   { label: "已冻结", color: "#e8831a", bg: "#fff8f0", icon: Clock },
  forfeited:{ label: "已没收", color: "#ef4444", bg: "#fef2f2", icon: XCircle },
}

const deposits = [
  { id: "DP2026080101", auctionNo: "AUC2026080001", title: "第28期粮食专场", amount: 10000, type: "paid" as const, paidAt: "2026-07-31 09:00", note: "参拍保证金，已中标" },
  { id: "DP2026072501", auctionNo: "AUC2026072501", title: "第26期蔬菜专场", amount: 5000,  type: "refunded" as const, paidAt: "2026-07-24 10:00", note: "已完成签约，保证金已退还", refundedAt: "2026-08-01" },
  { id: "DP2026071001", auctionNo: "AUC2026071001", title: "第22期水果专场", amount: 8000,  type: "refunded" as const, paidAt: "2026-07-09 14:30", note: "交易完成，保证金已退还", refundedAt: "2026-07-20" },
  { id: "DP2026060501", auctionNo: "AUC2026060501", title: "第18期综合专场", amount: 3000,  type: "forfeited" as const, paidAt: "2026-06-04 11:00", note: "中标后未按时签署合同，保证金已没收" },
]

const records = [
  { id: "R001", type: "in",  desc: "第28期粮食专场参拍保证金缴纳", amount: 10000, at: "2026-07-31 09:00" },
  { id: "R002", type: "out", desc: "第26期蔬菜专场保证金退还",      amount: 5000,  at: "2026-08-01 10:00" },
  { id: "R003", type: "in",  desc: "第26期蔬菜专场参拍保证金缴纳", amount: 5000,  at: "2026-07-24 10:00" },
  { id: "R004", type: "out", desc: "第22期水果专场保证金退还",      amount: 8000,  at: "2026-07-20 14:00" },
]

export default function DepositPage() {
  const [tab, setTab] = useState<"records"|"refund">("records")
  const [showRefund, setShowRefund] = useState(false)

  return (
    <div className="max-w-[900px] space-y-5">
      <div>
        <h1 className="text-[20px] font-bold text-[#1a1a2e] mb-1">保证金管理</h1>
        <p className="text-[13px] text-[#6b7c93]">查看各竞拍活动的保证金缴纳状态，申请退款或查看缴纳记录。</p>
      </div>

      {/* 账户概览 */}
      <div className="bg-[#1a5fa8] rounded-xl p-5 flex items-center gap-6">
        <div className="flex-1">
          <div className="text-white/70 text-[12px] mb-1">保证金账户余额</div>
          <div className="text-white text-[32px] font-bold">¥10,000</div>
          <div className="text-white/60 text-[12px] mt-1">冻结中：¥10,000 · 可用：¥0</div>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white text-[13px] rounded-lg transition-colors">充值</button>
          <button onClick={() => setShowRefund(true)} className="px-5 py-2.5 bg-white text-[#1a5fa8] text-[13px] font-semibold rounded-lg hover:bg-white/90 transition-colors">申请退款</button>
        </div>
      </div>

      {/* 明细列表 */}
      <div className="grid grid-cols-2 gap-4">
        {deposits.map(d => {
          const s = TYPE_MAP[d.type]
          return (
            <div key={d.id} className="bg-white rounded-xl border border-[#e8edf5] p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[13px] font-semibold text-[#1a1a2e]">{d.title}</span>
                <span className="flex items-center gap-1 text-[12px] font-medium px-2 py-0.5 rounded" style={{ color: s.color, background: s.bg }}>
                  <s.icon className="w-3 h-3" />{s.label}
                </span>
              </div>
              <div className="text-[26px] font-bold text-[#1a5fa8] mb-2">¥{d.amount.toLocaleString()}</div>
              <div className="text-[12px] text-[#999] space-y-1">
                <div>竞拍编号：{d.auctionNo}</div>
                <div>缴纳时间：{d.paidAt}</div>
                {"refundedAt" in d && <div className="text-[#3a8c3f]">退款时间：{d.refundedAt}</div>}
                <div className="pt-1 text-[#6b7c93]">{d.note}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Tab：缴纳记录 */}
      <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
        <div className="flex border-b border-[#e8edf5]">
          {[{ key: "records", label: "缴纳/退款记录" }, { key: "refund", label: "退款申请记录" }].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as "records"|"refund")}
              className={`px-5 py-2.5 text-[13px] border-b-2 -mb-px ${tab === t.key ? "border-[#1a5fa8] text-[#1a5fa8] font-semibold" : "border-transparent text-[#666]"}`}>
              {t.label}
            </button>
          ))}
        </div>
        {tab === "records" ? (
          <div className="divide-y divide-[#f8fafc]">
            {records.map(r => (
              <div key={r.id} className="px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {r.type === "in"
                    ? <ArrowUpCircle className="w-5 h-5 text-[#e8831a]" />
                    : <ArrowDownCircle className="w-5 h-5 text-[#3a8c3f]" />}
                  <div>
                    <div className="text-[13px] text-[#1a1a2e]">{r.desc}</div>
                    <div className="text-[12px] text-[#999]">{r.at}</div>
                  </div>
                </div>
                <div className={`text-[15px] font-bold ${r.type === "in" ? "text-[#e8831a]" : "text-[#3a8c3f]"}`}>
                  {r.type === "in" ? "-" : "+"}¥{r.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 py-12 text-center text-[14px] text-[#999]">暂无退款申请记录</div>
        )}
      </div>

      {/* 退款申请弹窗 */}
      {showRefund && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[440px] shadow-xl">
            <div className="px-6 py-4 border-b border-[#f0f4f8] flex items-center justify-between">
              <span className="text-[15px] font-semibold">申请退款</span>
              <button onClick={() => setShowRefund(false)} className="text-[#aaa] text-lg">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-[#fff8f0] rounded p-3 flex gap-2 text-[12px] text-[#e8831a]">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>退款申请提交后，需在 1-3 个工作日内由平台审核处理，原路退回绑定账户。</span>
              </div>
              <div>
                <label className="block text-[12px] text-[#6b7c93] mb-1"><span className="text-red-500">*</span>选择退款项目</label>
                <select className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]">
                  <option>请选择可退款项目</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] text-[#6b7c93] mb-1">退款说明</label>
                <textarea className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none h-20" placeholder="请说明退款原因" />
              </div>
            </div>
            <div className="px-6 pb-5 flex gap-3 justify-end">
              <button onClick={() => setShowRefund(false)} className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded">取消</button>
              <button onClick={() => setShowRefund(false)} className="px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded">提交申请</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
