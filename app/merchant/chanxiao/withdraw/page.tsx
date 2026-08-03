"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, AlertTriangle, XCircle, CheckCircle, Search } from "lucide-react"

type WithdrawType = "caigou" | "xiaoshou"

const CAIGOU_LIST = [
  { id: "CG20260601001", title: "2026年广东省大批量优质丝苗米长期采购", category: "粮油", qty: "50吨", publishTime: "2026-06-01", status: "采购中", quotes: 12 },
  { id: "CG20260601002", title: "鲜活海鲜大批量采购",                   category: "水产", qty: "10吨", publishTime: "2026-06-02", status: "采购中", quotes: 5  },
  { id: "CG20260601003", title: "有机蔬菜长期定向采购",                 category: "蔬菜", qty: "200公斤/天", publishTime: "2026-06-03", status: "采购中", quotes: 3 },
]

const XIAOSHOU_LIST = [
  { id: "XS20260601001", title: "2026年新产丰两优大米大量供应",       category: "粮油", qty: "300吨",       publishTime: "2026-06-01", status: "销售中", inquiries: 8  },
  { id: "XS20260601002", title: "有机菜心、芥兰周年稳定供应",         category: "蔬菜", qty: "2000公斤/天", publishTime: "2026-06-01", status: "销售中", inquiries: 15 },
  { id: "XS20260601003", title: "2026年粤西荔枝火热供应中",           category: "水果", qty: "500吨",       publishTime: "2026-05-28", status: "销售中", inquiries: 42 },
]

const WITHDRAW_REASONS = [
  { id: "r1", label: "信息填写有误，需要重新发布",          risk: "low"  },
  { id: "r2", label: "货源已售完/采购需求已满足",           risk: "low"  },
  { id: "r3", label: "价格发生变动，需调整后重新发布",      risk: "low"  },
  { id: "r4", label: "已有报价/询价，需告知对方后撤回",     risk: "mid"  },
  { id: "r5", label: "与其他平台重复发布，统一管理",        risk: "low"  },
  { id: "r6", label: "其他原因",                           risk: "low"  },
]

const riskLabel: Record<string, { text: string; color: string }> = {
  low: { text: "低影响", color: "text-[#3a8c3f] bg-[#f0fdf4]" },
  mid: { text: "需通知对方", color: "text-[#e8831a] bg-[#fff4e6]" },
}

type Step = "select" | "confirm" | "done"

export default function WithdrawPage() {
  const [type, setType] = useState<WithdrawType>("caigou")
  const [keyword, setKeyword] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [step, setStep] = useState<Step>("select")
  const [reasonId, setReasonId] = useState<string | null>(null)
  const [remark, setRemark] = useState("")
  const [notifyCounterpart, setNotifyCounterpart] = useState(true)

  const list = type === "caigou" ? CAIGOU_LIST : XIAOSHOU_LIST
  const filtered = list.filter(r => keyword === "" || r.title.includes(keyword))
  const selected = list.find(r => r.id === selectedId)
  const reason = WITHDRAW_REASONS.find(r => r.id === reasonId)
  const hasCounterpart = selected && (type === "caigou" ? (selected as typeof CAIGOU_LIST[0]).quotes > 0 : (selected as typeof XIAOSHOU_LIST[0]).inquiries > 0)

  const handleConfirm = () => setStep("done")

  if (step === "done") {
    return (
      <div className="max-w-[560px] mx-auto mt-16 text-center">
        <div className="w-16 h-16 rounded-full bg-[#f0fdf4] flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-[#3a8c3f]" />
        </div>
        <h2 className="text-[20px] font-bold text-[#1a1a2e] mb-2">撤回成功</h2>
        <p className="text-[14px] text-[#888] mb-1">
          {type === "caigou" ? "采购需求" : "销售信息"}「{selected?.title}」已成功撤回下架。
        </p>
        {notifyCounterpart && hasCounterpart && (
          <p className="text-[13px] text-[#e8831a] mb-6">已自动通知相关报价/询价方</p>
        )}
        <div className="flex items-center justify-center gap-3 mt-6">
          <Link
            href={type === "caigou" ? "/merchant/chanxiao/caigou-list" : "/merchant/chanxiao/xiaoshou-list"}
            className="px-6 py-2.5 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded-lg hover:bg-[#1550a0] transition-colors"
          >
            返回列表
          </Link>
          <button
            onClick={() => { setStep("select"); setSelectedId(null); setReasonId(""); setRemark("") }}
            className="px-6 py-2.5 border border-[#dde3ec] text-[#666] text-[13px] rounded-lg hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
          >
            继续撤回其他
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
            <ChevronLeft className="w-3.5 h-3.5" />选择撤回内容
          </button>
          <span>›</span>
          <span className="text-[#333]">确认撤回</span>
        </div>

        {/* 撤回信息卡 */}
        <div className="bg-white rounded-xl border border-[#e8edf5] p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-0.5 h-4 rounded-full bg-[#e8831a] inline-block" />
            <span className="text-[13px] font-semibold text-[#333]">撤回内容</span>
          </div>
          <div className="bg-[#fff9f0] border border-[#f5ddb0] rounded-lg p-4">
            <div className="text-[14px] font-semibold text-[#1a1a2e] mb-1">{selected.title}</div>
            <div className="flex gap-4 text-[12px] text-[#888]">
              <span>编号：{selected.id}</span>
              <span>分类：{selected.category}</span>
              <span>数量：{selected.qty}</span>
              {"quotes" in selected
                ? <span className="text-[#e8831a]">已有 {selected.quotes} 家报价</span>
                : <span className="text-[#e8831a]">已有 {selected.inquiries} 次询价</span>
              }
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
              placeholder="可补充撤回的具体原因，有助于后续审查..."
              rows={3}
              className="w-full px-3 py-2 border border-[#dde3ec] rounded-lg text-[13px] text-[#333] placeholder-[#ccc] focus:outline-none focus:border-[#1a5fa8] resize-none"
            />
          </div>
        </div>

        {/* 通知选项（仅有报价/询价时显示） */}
        {hasCounterpart && (
          <div className="bg-white rounded-xl border border-[#e8edf5] p-5 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-0.5 h-4 rounded-full bg-[#e8831a] inline-block" />
              <span className="text-[13px] font-semibold text-[#333]">通知已报价方</span>
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={notifyCounterpart}
                onChange={e => setNotifyCounterpart(e.target.checked)}
                className="mt-0.5 accent-[#1a5fa8]" />
              <div>
                <span className="text-[13px] text-[#333]">自动发送系统通知给相关报价/询价方</span>
                <p className="text-[12px] text-[#999] mt-0.5">建议勾选，保持良好的商业关系</p>
              </div>
            </label>
          </div>
        )}

        {/* 风险提示 */}
        <div className="flex items-start gap-2.5 bg-[#fff9f0] border border-[#f5ddb0] rounded-lg p-4 mb-5">
          <AlertTriangle className="w-4 h-4 text-[#e8831a] shrink-0 mt-0.5" />
          <div className="text-[13px] text-[#b26a00]">
            撤回后，该{type === "caigou" ? "采购需求" : "销售信息"}将从平台下架，<strong>已达成的报价意向不受影响</strong>，需另行协商处理。撤回操作不可撤销。
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setStep("select")}
            className="px-6 py-2.5 border border-[#dde3ec] text-[#666] text-[13px] rounded-lg hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
          >
            上一步
          </button>
          <button
            disabled={!reasonId}
            onClick={handleConfirm}
            className="px-6 py-2.5 bg-[#e53e3e] text-white text-[13px] font-semibold rounded-lg hover:bg-[#c53030] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <XCircle className="w-4 h-4" />确认撤回下架
          </button>
        </div>
      </div>
    )
  }

  // Step: select
  return (
    <div className="max-w-[760px]">
      <div className="flex items-center gap-1.5 text-[13px] text-[#999] mb-5">
        <Link href="/merchant/chanxiao/caigou-list" className="flex items-center gap-1 hover:text-[#1a5fa8] transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" />产销对接
        </Link>
        <span>›</span>
        <span className="text-[#333]">需求/信息撤回</span>
      </div>

      <div className="mb-5">
        <h1 className="text-[18px] font-bold text-[#1a1a2e]">需求/信息撤回</h1>
        <p className="text-[13px] text-[#888] mt-0.5">选择需要撤回下架的采购需求或销售信息</p>
      </div>

      {/* 类型切换 */}
      <div className="flex gap-2 mb-4">
        {(["caigou", "xiaoshou"] as WithdrawType[]).map(t => (
          <button key={t} onClick={() => { setType(t); setSelectedId(null) }}
            className={`px-5 py-2 rounded-lg text-[13px] font-medium transition-colors ${
              type === t ? "bg-[#1a5fa8] text-white" : "bg-white border border-[#dde3ec] text-[#555] hover:border-[#1a5fa8] hover:text-[#1a5fa8]"
            }`}>
            {t === "caigou" ? "采购需求" : "销售信息"}
          </button>
        ))}
      </div>

      {/* 搜索 */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aab]" />
        <input value={keyword} onChange={e => setKeyword(e.target.value)}
          placeholder={`搜索${type === "caigou" ? "采购需求" : "销售信息"}标题...`}
          className="w-full pl-9 pr-4 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8] bg-white" />
      </div>

      {/* 列表 */}
      <div className="space-y-2 mb-5">
        {filtered.map(row => {
          const isSelected = selectedId === row.id
          const cnt = "quotes" in row ? row.quotes : row.inquiries
          const cntLabel = "quotes" in row ? "家报价" : "次询价"
          return (
            <label key={row.id} className={`flex items-start gap-3 p-4 bg-white rounded-xl border cursor-pointer transition-all ${
              isSelected ? "border-[#1a5fa8] shadow-sm" : "border-[#e8edf5] hover:border-[#1a5fa8]/40"
            }`}>
              <input type="radio" name="item" value={row.id}
                checked={isSelected}
                onChange={() => setSelectedId(row.id)}
                className="mt-0.5 accent-[#1a5fa8]" />
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold text-[#1a1a2e] mb-1 truncate">{row.title}</div>
                <div className="flex gap-4 text-[12px] text-[#888]">
                  <span>{row.id}</span>
                  <span>{row.category}</span>
                  <span>{row.qty}</span>
                  <span className="text-[#e8831a]">已有 {cnt} {cntLabel}</span>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#e8f4fd] text-[#1a5fa8] shrink-0 mt-0.5">
                {row.status}
              </span>
            </label>
          )
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[13px] text-[#bbb] bg-white rounded-xl border border-[#e8edf5]">
            暂无进行中的{type === "caigou" ? "采购需求" : "销售信息"}
          </div>
        )}
      </div>

      <button
        disabled={!selectedId}
        onClick={() => setStep("confirm")}
        className="px-6 py-2.5 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded-lg hover:bg-[#1550a0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        下一步：填写撤回原因
      </button>
    </div>
  )
}
