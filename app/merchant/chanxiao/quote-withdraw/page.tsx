"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

const QUOTES = [
  {
    id: "Q20260603001",
    demandId: "CG20260601001",
    demandTitle: "2026年广东省大批量优质丝苗米长期采购",
    buyer: "广州越秀粮食储备有限公司",
    category: "粮油",
    myPrice: "3600元/吨",
    myQty: "50吨",
    myDelivery: "2026-06-15",
    quoteTime: "2026-06-03 14:22",
    deadline: "2026-06-10 23:59",
    status: "待处理",
    canWithdraw: true,
  },
  {
    id: "Q20260603002",
    demandId: "CG20260601002",
    demandTitle: "鲜活海鲜大批量采购",
    buyer: "深圳生鲜配送有限公司",
    category: "水产",
    myPrice: "面议",
    myQty: "5吨/批",
    myDelivery: "2026-06-12",
    quoteTime: "2026-06-02 10:05",
    deadline: "2026-06-08 23:59",
    status: "已接受",
    canWithdraw: false,
  },
  {
    id: "Q20260603003",
    demandId: "CG20260601003",
    demandTitle: "有机蔬菜长期定向采购",
    buyer: "北京有机生活科技有限公司",
    category: "蔬菜",
    myPrice: "4.2元/斤",
    myQty: "150公斤/天",
    myDelivery: "长期",
    quoteTime: "2026-06-01 09:30",
    deadline: "2026-06-15 23:59",
    status: "待处理",
    canWithdraw: true,
  },
]

const WITHDRAW_REASONS = [
  { id: "r1", label: "报价金额填写有误，需要重新报价",        risk: "low" },
  { id: "r2", label: "货源发生变化，无法按原报价供货",        risk: "mid" },
  { id: "r3", label: "市场价格波动，需重新核算成本后报价",    risk: "mid" },
  { id: "r4", label: "已与买方另行协商，通过其他方式成交",    risk: "low" },
  { id: "r5", label: "误操作或重复报价",                      risk: "low" },
  { id: "r6", label: "其他原因",                              risk: "low" },
]

const riskLabel: Record<string, { text: string; color: string }> = {
  low: { text: "低影响", color: "text-[#3a8c3f] bg-[#f0fdf4]" },
  mid: { text: "影响信誉", color: "text-[#e8831a] bg-[#fff4e6]" },
}

const statusStyle: Record<string, { text: string; bg: string }> = {
  "待处理": { text: "#1a5fa8", bg: "#e8f4fd" },
  "已接受": { text: "#3a8c3f", bg: "#f0fdf4" },
  "已拒绝": { text: "#888",    bg: "#f5f5f5" },
}

type Step = "select" | "confirm" | "done"

export default function QuoteWithdrawPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [step, setStep] = useState<Step>("select")
  const [reasonId, setReasonId] = useState<string | null>(null)
  const [remark, setRemark] = useState("")

  const selected = QUOTES.find(q => q.id === selectedId)
  const reason = WITHDRAW_REASONS.find(r => r.id === reasonId)
  const withdrawable = QUOTES.filter(q => q.canWithdraw)

  // 计算截止时间剩余小时
  const getRemaining = (deadline: string) => {
    const diff = new Date(deadline).getTime() - Date.now()
    const hours = Math.floor(diff / 3600000)
    if (hours < 0) return null
    if (hours < 24) return `${hours}小时后截止`
    return `${Math.floor(hours / 24)}天后截止`
  }

  if (step === "done") {
    return (
      <div className="max-w-[560px] mx-auto mt-16 text-center">
        <div className="w-16 h-16 rounded-full bg-[#f0fdf4] flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-[#3a8c3f]" />
        </div>
        <h2 className="text-[20px] font-bold text-[#1a1a2e] mb-2">报价已撤回</h2>
        <p className="text-[13px] text-[#888] mb-1">
          针对「{selected?.demandTitle}」的报价已成功撤回。
        </p>
        <p className="text-[12px] text-[#bbb] mb-6">系统已通知采购方，您的报价已取消</p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/merchant/chanxiao/caigou-list"
            className="px-6 py-2.5 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded-lg hover:bg-[#1550a0] transition-colors"
          >
            返回采购列表
          </Link>
          <button
            onClick={() => { setStep("select"); setSelectedId(null); setReasonId(null); setRemark("") }}
            className="px-6 py-2.5 border border-[#dde3ec] text-[#666] text-[13px] rounded-lg hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
          >
            继续撤回其他报价
          </button>
        </div>
      </div>
    )
  }

  if (step === "confirm" && selected) {
    return (
      <div className="max-w-[620px]">
        <div className="flex items-center gap-1.5 text-[13px] text-[#999] mb-5">
          <button onClick={() => setStep("select")} className="flex items-center gap-1 hover:text-[#1a5fa8] transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />选择报价
          </button>
          <span>›</span>
          <span className="text-[#333]">确认撤回</span>
        </div>

        {/* 报价详情 */}
        <div className="bg-white rounded-xl border border-[#e8edf5] p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-0.5 h-4 rounded-full bg-[#e8831a] inline-block" />
            <span className="text-[13px] font-semibold text-[#333]">撤回报价信息</span>
          </div>
          <div className="bg-[#fff9f0] border border-[#f5ddb0] rounded-lg p-4 space-y-2">
            <div className="text-[14px] font-semibold text-[#1a1a2e]">{selected.demandTitle}</div>
            <div className="grid grid-cols-3 gap-2 text-[12px]">
              <div><span className="text-[#999]">买家：</span><span className="text-[#333]">{selected.buyer}</span></div>
              <div><span className="text-[#999]">我的报价：</span><span className="text-[#e8831a] font-semibold">{selected.myPrice}</span></div>
              <div><span className="text-[#999]">可供数量：</span><span className="text-[#333]">{selected.myQty}</span></div>
              <div><span className="text-[#999]">交货时间：</span><span className="text-[#333]">{selected.myDelivery}</span></div>
              <div><span className="text-[#999]">报价时间：</span><span className="text-[#666]">{selected.quoteTime}</span></div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#e8831a]" />
                <span className="text-[#e8831a] text-[11px]">{getRemaining(selected.deadline)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 撤回原因 */}
        <div className="bg-white rounded-xl border border-[#e8edf5] p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-0.5 h-4 rounded-full bg-[#1a5fa8] inline-block" />
            <span className="text-[13px] font-semibold text-[#333]">撤回原因</span>
            <span className="text-[#e53e3e] text-[12px]">*必选</span>
          </div>
          <div className="space-y-2 mb-4">
            {WITHDRAW_REASONS.map(r => {
              const risk = riskLabel[r.risk]
              return (
                <label key={r.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  reasonId === r.id ? "border-[#1a5fa8] bg-[#e8f4fd]" : "border-[#e8edf5] hover:border-[#1a5fa8]/40"
                }`}>
                  <input type="radio" name="reason" value={r.id}
                    checked={reasonId === r.id}
                    onChange={() => setReasonId(r.id)}
                    className="accent-[#1a5fa8]" />
                  <span className="text-[13px] text-[#333] flex-1">{r.label}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${risk.color}`}>{risk.text}</span>
                </label>
              )
            })}
          </div>
          <div>
            <label className="text-[12px] text-[#888] mb-1 block">补充说明（选填）</label>
            <textarea
              value={remark}
              onChange={e => setRemark(e.target.value)}
              placeholder="可向采购方说明撤回原因，维护商业关系..."
              rows={3}
              className="w-full px-3 py-2 border border-[#dde3ec] rounded-lg text-[13px] text-[#333] placeholder-[#ccc] focus:outline-none focus:border-[#1a5fa8] resize-none"
            />
          </div>
        </div>

        {/* 信誉提示 */}
        <div className="flex items-start gap-2.5 bg-[#fff9f0] border border-[#f5ddb0] rounded-lg p-4 mb-5">
          <AlertTriangle className="w-4 h-4 text-[#e8831a] shrink-0 mt-0.5" />
          <div className="text-[13px] text-[#b26a00]">
            撤回报价<strong>不会影响信用评分</strong>，但频繁撤回可能降低采购方对您的信任度。系统将自动通知采购方您已撤回报价。
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => setStep("select")}
            className="px-6 py-2.5 border border-[#dde3ec] text-[#666] text-[13px] rounded-lg hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
            上一步
          </button>
          <button
            disabled={!reasonId}
            onClick={() => setStep("done")}
            className="px-6 py-2.5 bg-[#e53e3e] text-white text-[13px] font-semibold rounded-lg hover:bg-[#c53030] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <XCircle className="w-4 h-4" />确认撤回报价
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[760px]">
      <div className="flex items-center gap-1.5 text-[13px] text-[#999] mb-5">
        <Link href="/merchant/chanxiao/caigou-list" className="flex items-center gap-1 hover:text-[#1a5fa8] transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" />产销对接
        </Link>
        <span>›</span>
        <span className="text-[#333]">报价撤回</span>
      </div>

      <div className="mb-5">
        <h1 className="text-[18px] font-bold text-[#1a1a2e]">报价撤回</h1>
        <p className="text-[13px] text-[#888] mt-0.5">选择需要撤回的报价记录，仅"待处理"状态的报价可撤回</p>
      </div>

      <div className="space-y-3 mb-5">
        {withdrawable.length === 0 ? (
          <div className="text-center py-12 text-[13px] text-[#bbb] bg-white rounded-xl border border-[#e8edf5]">
            暂无可撤回的报价
          </div>
        ) : withdrawable.map(q => {
          const isSelected = selectedId === q.id
          const ss = statusStyle[q.status] ?? statusStyle["待处理"]
          const remaining = getRemaining(q.deadline)
          return (
            <label key={q.id} className={`flex items-start gap-3 p-4 bg-white rounded-xl border cursor-pointer transition-all ${
              isSelected ? "border-[#1a5fa8] shadow-sm" : "border-[#e8edf5] hover:border-[#1a5fa8]/40"
            }`}>
              <input type="radio" name="quote" value={q.id}
                checked={isSelected}
                onChange={() => setSelectedId(q.id)}
                className="mt-1 accent-[#1a5fa8]" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="text-[14px] font-semibold text-[#1a1a2e] truncate flex-1">{q.demandTitle}</div>
                  <span className="text-[11px] px-2 py-0.5 rounded shrink-0 font-medium" style={{ color: ss.text, background: ss.bg }}>{q.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] text-[#888]">
                  <span>买家：{q.buyer}</span>
                  <span>报价：<span className="text-[#e8831a] font-semibold">{q.myPrice}</span></span>
                  <span>数量：{q.myQty}</span>
                  <span>报价时间：{q.quoteTime}</span>
                </div>
                {remaining && (
                  <div className="mt-2 flex items-center gap-1 text-[12px] text-[#e8831a]">
                    <Clock className="w-3 h-3" />{remaining}
                  </div>
                )}
              </div>
            </label>
          )
        })}

        {/* 不可撤回的报价（灰显） */}
        {QUOTES.filter(q => !q.canWithdraw).map(q => {
          const ss = statusStyle[q.status] ?? statusStyle["待处理"]
          return (
            <div key={q.id} className="flex items-start gap-3 p-4 bg-[#fafafa] rounded-xl border border-[#e8edf5] opacity-60 cursor-not-allowed">
              <input type="radio" disabled className="mt-1" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="text-[14px] font-semibold text-[#999] truncate flex-1">{q.demandTitle}</div>
                  <span className="text-[11px] px-2 py-0.5 rounded shrink-0 font-medium" style={{ color: ss.text, background: ss.bg }}>{q.status}</span>
                </div>
                <div className="text-[12px] text-[#bbb]">已接受的报价不可撤回，如需取消请联系采购方</div>
              </div>
            </div>
          )
        })}
      </div>

      <button
        disabled={!selectedId}
        onClick={() => setStep("confirm")}
        className="px-6 py-2.5 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded-lg hover:bg-[#1550a0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        下一步：确认撤回
      </button>
    </div>
  )
}
