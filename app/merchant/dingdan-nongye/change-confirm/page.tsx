"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Clock, CheckCircle2, XCircle, AlertCircle, MessageSquare, ChevronDown, ChevronUp } from "lucide-react"

type ChangeStatus = "pending" | "agreed" | "rejected" | "countered" | "expired"

interface ChangeRequest {
  id: string
  orderId: string
  orderTitle: string
  initiator: "self" | "counterparty"
  counterparty: string
  type: string
  status: ChangeStatus
  submitTime: string
  expireTime: string
  changes: { label: string; from: string; to: string }[]
  reason: string
  files: string[]
  replyMsg?: string
}

const REQUESTS: ChangeRequest[] = [
  {
    id: "CHG-20260001",
    orderId: "HT-DD20260001",
    orderTitle: "2026年广东省内计划大量采购丝苗米",
    initiator: "counterparty",
    counterparty: "惠州新供销天润粮油储备有限公司",
    type: "交货日期变更",
    status: "pending",
    submitTime: "2026-06-08 14:30",
    expireTime: "2026-06-10 14:30",
    changes: [
      { label: "交货日期", from: "2026-04-23", to: "2026-05-05" },
    ],
    reason: "由于近期连续降雨导致水稻收割延迟，预计需顺延 12 天，请采购方予以理解与配合。",
    files: ["延期说明函.pdf"],
  },
  {
    id: "CHG-20260002",
    orderId: "HT-DD20260001",
    orderTitle: "2026年广东省内计划大量采购丝苗米",
    initiator: "self",
    counterparty: "惠州新供销天润粮油储备有限公司",
    type: "采购数量变更",
    status: "agreed",
    submitTime: "2026-05-20 09:15",
    expireTime: "2026-05-22 09:15",
    changes: [
      { label: "采购数量", from: "9000 公斤", to: "8000 公斤" },
    ],
    reason: "因仓库扩容计划调整，本批次采购量需减少 1000 公斤。",
    files: [],
    replyMsg: "同意，已按新数量安排种植计划。",
  },
  {
    id: "CHG-20260003",
    orderId: "HT-DD20260002",
    orderTitle: "2026年茂名荔枝鲜果批量采购",
    initiator: "counterparty",
    counterparty: "茂名丰盛农业有限公司",
    type: "价格区间变更",
    status: "rejected",
    submitTime: "2026-05-10 11:00",
    expireTime: "2026-05-12 11:00",
    changes: [
      { label: "采购价格", from: "4.50 ~ 5.20 元/斤", to: "5.00 ~ 5.80 元/斤" },
    ],
    reason: "今年荔枝产量受高温影响减少约 30%，市场收购价上涨，申请调整合同价格。",
    files: ["市场行情报告.pdf"],
    replyMsg: "价格变动幅度超出预算范围，无法接受，请维持原合同价格。",
  },
]

const STATUS_MAP: Record<ChangeStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  pending:    { label: "待确认",   color: "#e8831a", bg: "#fff4e6", icon: <Clock className="w-3.5 h-3.5" /> },
  agreed:     { label: "已同意",   color: "#3a8c3f", bg: "#e8f7eb", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  rejected:   { label: "已拒绝",   color: "#d9363e", bg: "#fff1f0", icon: <XCircle className="w-3.5 h-3.5" /> },
  countered:  { label: "已反提方案", color: "#1a5fa8", bg: "#e8f4fd", icon: <MessageSquare className="w-3.5 h-3.5" /> },
  expired:    { label: "已过期",   color: "#999",    bg: "#f5f5f5", icon: <AlertCircle className="w-3.5 h-3.5" /> },
}

function ChangeCard({ req }: { req: ChangeRequest }) {
  const [expanded, setExpanded] = useState(req.status === "pending")
  const [action, setAction]     = useState<"" | "agree" | "reject" | "counter">("")
  const [replyMsg, setReplyMsg] = useState("")
  const [done, setDone]         = useState(false)

  const st = STATUS_MAP[req.status]
  const isPending = req.status === "pending" && req.initiator === "counterparty"

  return (
    <div className={`bg-white rounded-lg border overflow-hidden ${req.status === "pending" && req.initiator === "counterparty" ? "border-[#1a5fa8]" : "border-[#e8edf5]"}`}>
      {/* 卡片头 */}
      <div
        className="px-5 py-4 flex items-center gap-3 cursor-pointer hover:bg-[#fafcff] transition-colors"
        onClick={() => setExpanded(v => !v)}
      >
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold`}
          style={{ color: st.color, background: st.bg }}>
          {st.icon}
          {st.label}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold text-[#333] truncate">{req.type}</div>
          <div className="text-[12px] text-[#999] mt-0.5">{req.orderId} · {req.orderTitle}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[12px] text-[#999]">
            {req.initiator === "self" ? "我方发起" : `${req.counterparty.slice(0, 8)}… 发起`}
          </div>
          <div className="text-[12px] text-[#bbb]">{req.submitTime}</div>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-[#999] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#999] shrink-0" />}
      </div>

      {expanded && (
        <div className="border-t border-[#f0f4f8] px-5 py-4 space-y-4">
          {/* 变更对比 */}
          <div>
            <div className="text-[12px] font-semibold text-[#666] mb-2">变更内容对比</div>
            <div className="overflow-hidden rounded-lg border border-[#e8edf5]">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-[#f8fafc]">
                    <th className="text-left px-4 py-2.5 font-semibold text-[#666] w-1/3">变更项目</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-[#666] w-1/3">原合同内容</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-[#1a5fa8] w-1/3">申请变更为</th>
                  </tr>
                </thead>
                <tbody>
                  {req.changes.map((c, i) => (
                    <tr key={i} className="border-t border-[#f0f4f8]">
                      <td className="px-4 py-3 text-[#333]">{c.label}</td>
                      <td className="px-4 py-3 text-[#888] line-through">{c.from}</td>
                      <td className="px-4 py-3 text-[#1a5fa8] font-semibold">{c.to}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 变更原因 */}
          <div className="bg-[#f8fafc] rounded-lg p-4">
            <div className="text-[12px] font-semibold text-[#666] mb-1.5">变更原因</div>
            <div className="text-[13px] text-[#444] leading-relaxed">{req.reason}</div>
            {req.files.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[12px] text-[#999]">附件：</span>
                {req.files.map((f, i) => (
                  <span key={i} className="text-[12px] text-[#1a5fa8] hover:underline cursor-pointer">{f}</span>
                ))}
              </div>
            )}
          </div>

          {/* 到期时间（待确认） */}
          {req.status === "pending" && (
            <div className="flex items-center gap-2 text-[13px] text-[#e8831a]">
              <Clock className="w-4 h-4" />
              <span>请于 <span className="font-semibold">{req.expireTime}</span> 前确认，超时视为自动同意</span>
            </div>
          )}

          {/* 历史回复 */}
          {req.replyMsg && !isPending && (
            <div className="bg-[#f8fafc] rounded-lg p-4 border border-[#e8edf5]">
              <div className="text-[12px] font-semibold text-[#666] mb-1.5">
                {req.initiator === "self" ? "对方回复" : "我方回复"}
              </div>
              <div className="text-[13px] text-[#444]">{req.replyMsg}</div>
            </div>
          )}

          {/* 操作区（待我方确认） */}
          {isPending && !done && (
            <div className="border-t border-[#f0f4f8] pt-4">
              {action === "" && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAction("agree")}
                    className="flex items-center gap-2 px-5 h-9 bg-[#3a8c3f] text-white text-[13px] rounded hover:bg-[#2d7032] transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />同意变更
                  </button>
                  <button
                    onClick={() => setAction("counter")}
                    className="flex items-center gap-2 px-5 h-9 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />反提方案
                  </button>
                  <button
                    onClick={() => setAction("reject")}
                    className="flex items-center gap-2 px-5 h-9 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-red-300 hover:text-red-500 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />拒绝变更
                  </button>
                </div>
              )}

              {(action === "reject" || action === "counter") && (
                <div className="space-y-3">
                  <div className="text-[13px] font-semibold text-[#333]">
                    {action === "reject" ? "填写拒绝原因" : "填写反提方案说明"}
                  </div>
                  <textarea
                    value={replyMsg}
                    onChange={e => setReplyMsg(e.target.value)}
                    rows={3}
                    placeholder={action === "reject" ? "请说明拒绝原因，以便对方了解情况…" : "请说明您的方案，例如建议的新数量/价格/日期…"}
                    className="w-full border border-[#dde3ec] rounded-lg px-4 py-3 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none"
                  />
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setAction("")}
                      className="px-5 h-9 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
                    >
                      返回
                    </button>
                    <button
                      disabled={replyMsg.trim().length < 5}
                      onClick={() => setDone(true)}
                      className={`px-8 h-9 text-white text-[13px] rounded transition-colors ${
                        replyMsg.trim().length >= 5
                          ? action === "reject" ? "bg-red-500 hover:bg-red-600" : "bg-[#1a5fa8] hover:bg-[#0d4a8a]"
                          : "bg-[#ccc] cursor-not-allowed"
                      }`}
                    >
                      {action === "reject" ? "确认拒绝" : "提交反方案"}
                    </button>
                  </div>
                </div>
              )}

              {action === "agree" && (
                <div className="bg-[#e8f7eb] border border-[#b7d9bb] rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2 text-[#3a8c3f] font-semibold text-[13px]">
                    <CheckCircle2 className="w-4.5 h-4.5" />
                    确认同意此变更申请？
                  </div>
                  <div className="text-[13px] text-[#555]">
                    同意后，合同将按变更内容更新，变更生效时间为确认操作完成时。
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setAction("")}
                      className="px-5 h-9 border border-[#b7d9bb] text-[#3a8c3f] text-[13px] rounded hover:bg-[#d4f0d8] transition-colors">
                      再想想
                    </button>
                    <button onClick={() => setDone(true)}
                      className="px-8 h-9 bg-[#3a8c3f] text-white text-[13px] rounded hover:bg-[#2d7032] transition-colors">
                      确认同意
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {done && (
            <div className="flex items-center gap-2 text-[#3a8c3f] bg-[#e8f7eb] rounded-lg px-4 py-3 text-[13px] font-semibold">
              <CheckCircle2 className="w-4.5 h-4.5" />
              操作已提交，合同状态将在确认后更新
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function ChangeConfirmPage() {
  const [tab, setTab] = useState<"all" | "pending" | "done">("all")

  const filtered = REQUESTS.filter(r => {
    if (tab === "pending") return r.status === "pending"
    if (tab === "done")    return r.status !== "pending"
    return true
  })

  const pendingCount = REQUESTS.filter(r => r.status === "pending" && r.initiator === "counterparty").length

  return (
    <div className="max-w-[820px] space-y-4">
      {/* 面包屑 */}
      <div className="flex items-center gap-1.5 text-[13px] text-[#999]">
        <Link href="/merchant/dingdan-nongye/xq-list"
          className="flex items-center gap-1 hover:text-[#1a5fa8] transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" />订单种植需求
        </Link>
        <span>›</span>
        <span className="text-[#333]">订单变更记录</span>
      </div>

      {/* 页头 */}
      <div className="bg-white rounded-lg border border-[#e8edf5] px-5 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-[16px] font-bold text-[#1a1a2e]">订单变更管理</h2>
          <p className="text-[13px] text-[#888] mt-0.5">查看和处理所有订单变更申请</p>
        </div>
        {pendingCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-[#fff4e6] border border-[#ffd54f] rounded-lg">
            <AlertCircle className="w-4 h-4 text-[#e8831a]" />
            <span className="text-[13px] font-semibold text-[#e8831a]">有 {pendingCount} 条变更待您确认</span>
          </div>
        )}
      </div>

      {/* Tab */}
      <div className="flex items-center gap-1 bg-white rounded-lg border border-[#e8edf5] p-1">
        {([
          { key: "all",     label: "全部",     count: REQUESTS.length },
          { key: "pending", label: "待确认",   count: REQUESTS.filter(r => r.status === "pending").length },
          { key: "done",    label: "已处理",   count: REQUESTS.filter(r => r.status !== "pending").length },
        ] as const).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 px-5 h-9 rounded text-[13px] transition-colors ${
              tab === t.key ? "bg-[#1a5fa8] text-white font-semibold" : "text-[#666] hover:bg-[#f5f7fa]"
            }`}
          >
            {t.label}
            <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${
              tab === t.key ? "bg-white/20 text-white" : "bg-[#f0f0f0] text-[#888]"
            }`}>
              {t.count}
            </span>
          </button>
        ))}
        <div className="ml-auto">
          <Link href="/merchant/dingdan-nongye/change-apply"
            className="flex items-center gap-2 px-4 h-9 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
            + 发起变更申请
          </Link>
        </div>
      </div>

      {/* 变更申请列表 */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#e8edf5] py-16 text-center text-[13px] text-[#bbb]">
            暂无变更记录
          </div>
        ) : (
          filtered.map(r => <ChangeCard key={r.id} req={r} />)
        )}
      </div>
    </div>
  )
}
