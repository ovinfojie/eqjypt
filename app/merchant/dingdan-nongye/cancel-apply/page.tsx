"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, AlertTriangle, CheckCircle2, XCircle, Info, Shield } from "lucide-react"

const ORDER = {
  id: "HT-DD20260001",
  title: "2026年广东省内计划大量采购丝苗米",
  product: "丝苗米",
  spec: "公斤",
  qty: 9000,
  priceMin: 2.70,
  priceMax: 3.20,
  deliveryDate: "2026-04-23",
  signDate: "2026-03-15",
  counterparty: "惠州新供销天润粮油储备有限公司",
  myRole: "采购方",
  status: "履约中",
  prepayPaid: 7290,
  totalEstimate: 24300,
}

const CANCEL_REASONS = [
  { value: "mutual",       label: "双方协商一致取消",   risk: "low",    desc: "买卖双方均同意取消，无违约责任" },
  { value: "force",        label: "不可抗力（自然灾害/政策）", risk: "low", desc: "因不可抗力导致合同无法履行，需提供证明材料" },
  { value: "counterparty", label: "对方违约（未履约）",  risk: "medium", desc: "对方未按合同履约，可申请违约赔偿" },
  { value: "self",         label: "我方原因取消",        risk: "high",   desc: "主动违约，需承担违约金及相应赔偿责任" },
  { value: "quality",      label: "质量不符合约定",      risk: "medium", desc: "收货验收不合格，可申请退货退款" },
  { value: "other",        label: "其他原因",            risk: "medium", desc: "请在说明中详细描述" },
]

const RISK_CONFIG = {
  low:    { label: "低风险",  color: "#3a8c3f", bg: "#e8f7eb",  border: "#b7d9bb" },
  medium: { label: "中等风险", color: "#e8831a", bg: "#fff4e6",  border: "#ffd54f" },
  high:   { label: "高风险",  color: "#d9363e", bg: "#fff1f0",  border: "#ffa39e" },
}

type Step = "select" | "confirm" | "done"

export default function CancelApplyPage() {
  const [step, setStep]           = useState<Step>("select")
  const [reason, setReason]       = useState("")
  const [detail, setDetail]       = useState("")
  const [agreed, setAgreed]       = useState(false)
  const [files, setFiles]         = useState<string[]>([])

  const selectedReason = CANCEL_REASONS.find(r => r.value === reason)
  const risk = selectedReason ? RISK_CONFIG[selectedReason.risk as keyof typeof RISK_CONFIG] : null
  const canNext = reason !== "" && detail.trim().length >= 10 && agreed

  // 预付款退款规则
  const refundRules = {
    mutual:       { refund: ORDER.prepayPaid, penalty: 0,              note: "全额退还预付款" },
    force:        { refund: ORDER.prepayPaid, penalty: 0,              note: "提供证明后全额退还" },
    counterparty: { refund: ORDER.prepayPaid, penalty: ORDER.prepayPaid * 0.1, note: "退还预付款 + 对方赔偿 10%" },
    quality:      { refund: ORDER.prepayPaid, penalty: 0,              note: "退还已支付款项" },
    self:         { refund: ORDER.prepayPaid * 0.7, penalty: ORDER.prepayPaid * 0.3, note: "扣除 30% 违约金后退款" },
    other:        { refund: ORDER.prepayPaid * 0.85, penalty: ORDER.prepayPaid * 0.15, note: "扣除 15% 手续费后退款" },
  }
  const refundRule = reason ? refundRules[reason as keyof typeof refundRules] : null

  if (step === "done") {
    return (
      <div className="max-w-[520px] mx-auto py-14 text-center">
        <div className="w-16 h-16 rounded-full bg-[#e8f7eb] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9 text-[#3a8c3f]" />
        </div>
        <h3 className="text-[20px] font-bold text-[#1a1a2e] mb-2">取消申请已提交</h3>
        <p className="text-[14px] text-[#888] mb-1">已通知对方进行确认处理</p>
        <p className="text-[13px] text-[#aaa] mb-8">平台将在 3 个工作日内完成审核，退款将在审核通过后 5 个工作日内原路退回</p>
        <div className="bg-[#f8fafc] border border-[#e8edf5] rounded-lg p-5 text-[13px] text-left space-y-2.5 mb-8">
          {[
            ["申请编号",   `CAN-${ORDER.id.replace("HT-", "")}`],
            ["订单编号",   ORDER.id],
            ["取消原因",   selectedReason?.label ?? ""],
            ["预计退款",   refundRule ? `¥${refundRule.refund.toFixed(2)}` : "—"],
            ...(refundRule?.penalty ? [["违约金",   `¥${refundRule.penalty.toFixed(2)}`]] : []),
          ].map(([k, v]) => (
            <div key={k} className="flex gap-4">
              <span className="text-[#999] w-20 shrink-0">{k}</span>
              <span className="text-[#333] font-medium">{v}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link href="/merchant/dingdan-nongye/xq-list"
            className="px-6 h-10 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors flex items-center">
            返回需求列表
          </Link>
          <Link href="/merchant"
            className="px-8 h-10 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors flex items-center">
            查看申请进度
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[820px] space-y-4">
      {/* 面包屑 */}
      <div className="flex items-center gap-1.5 text-[13px] text-[#999]">
        <Link href="/merchant/dingdan-nongye/xq-list"
          className="flex items-center gap-1 hover:text-[#1a5fa8] transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" />订单种植需求
        </Link>
        <span>›</span>
        <Link href="/merchant/dingdan-nongye/xq-list"
          className="hover:text-[#1a5fa8] transition-colors">需求详情</Link>
        <span>›</span>
        <span className="text-[#333]">申请取消订单</span>
      </div>

      {/* 步骤条 */}
      <div className="bg-white rounded-lg border border-[#e8edf5] px-8 py-5">
        <div className="flex items-center justify-center gap-0">
          {[
            { key: "select",  label: "选择取消原因" },
            { key: "confirm", label: "确认取消影响" },
            { key: "done",    label: "申请完成" },
          ].map((s, i) => {
            const isActive = s.key === step
            const isDone   = (step === "confirm" && i === 0) || (step === "done" && i <= 1)
            return (
              <div key={s.key} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold ${
                    isDone   ? "bg-[#3a8c3f] text-white" :
                    isActive ? "bg-[#1a5fa8] text-white" :
                    "bg-[#e8edf5] text-[#999]"
                  }`}>
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-[13px] ${
                    isActive ? "text-[#1a5fa8] font-semibold" :
                    isDone   ? "text-[#3a8c3f]" :
                    "text-[#999]"
                  }`}>{s.label}</span>
                </div>
                {i < 2 && <div className="w-20 h-[1px] bg-[#dde3ec] mx-3" />}
              </div>
            )
          })}
        </div>
      </div>

      {/* 警告横幅 */}
      <div className="bg-[#fff1f0] border border-[#ffa39e] rounded-lg px-5 py-3 flex items-start gap-3">
        <AlertTriangle className="w-4.5 h-4.5 text-[#d9363e] shrink-0 mt-0.5" />
        <div className="text-[13px] text-[#7a1f1f]">
          <span className="font-semibold">重要提示：</span>
          订单取消不可逆，请在确认前仔细核对相关信息。
          若双方已签署合同且处于履约阶段，取消可能产生违约金及赔偿责任。
        </div>
      </div>

      {/* 当前订单 */}
      <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
        <div className="px-5 py-3 bg-[#f8fafc] border-b border-[#e8edf5] flex items-center gap-2">
          <span className="w-1 h-4 rounded-full inline-block bg-[#1a5fa8]" />
          <span className="text-[13px] font-semibold text-[#333]">待取消订单信息</span>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-[12px] text-[#999] mr-2">{ORDER.id}</span>
              <span className="text-[14px] font-semibold text-[#1a1a2e]">{ORDER.title}</span>
            </div>
            <span className="px-2.5 py-0.5 rounded text-[12px] font-semibold text-[#e8831a] bg-[#fff4e6] shrink-0">
              {ORDER.status}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "对方主体",  value: ORDER.counterparty.slice(0, 10) + "…" },
              { label: "合同商品",  value: `${ORDER.product}（${ORDER.spec}）` },
              { label: "合同数量",  value: `${ORDER.qty} ${ORDER.spec}` },
              { label: "签约日期",  value: ORDER.signDate },
              { label: "已付预付款", value: `¥${ORDER.prepayPaid.toLocaleString()}`, highlight: true },
              { label: "合同总额",  value: `¥${ORDER.totalEstimate.toLocaleString()}` },
              { label: "交货日期",  value: ORDER.deliveryDate },
              { label: "我方身份",  value: ORDER.myRole },
            ].map(({ label, value, highlight }) => (
              <div key={label} className="bg-[#f8fafc] rounded-lg p-3">
                <div className="text-[11px] text-[#999] mb-1">{label}</div>
                <div className={`text-[13px] font-medium ${highlight ? "text-[#d9363e]" : "text-[#333]"}`}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {step === "select" && (
        <>
          {/* 取消原因选择 */}
          <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
            <div className="px-5 py-3 bg-[#f8fafc] border-b border-[#e8edf5] flex items-center gap-2">
              <span className="w-1 h-4 rounded-full inline-block bg-[#d9363e]" />
              <span className="text-[13px] font-semibold text-[#333]">
                <span className="text-red-500">*</span> 选择取消原因
              </span>
            </div>
            <div className="p-5 grid grid-cols-2 gap-3">
              {CANCEL_REASONS.map(r => {
                const rc = RISK_CONFIG[r.risk as keyof typeof RISK_CONFIG]
                return (
                  <label
                    key={r.value}
                    className={`flex items-start gap-3 border rounded-lg p-4 cursor-pointer transition-all ${
                      reason === r.value
                        ? "border-[#1a5fa8] bg-[#f0f7ff]"
                        : "border-[#dde3ec] hover:border-[#a8c4e0]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={r.value}
                      checked={reason === r.value}
                      onChange={() => setReason(r.value)}
                      className="mt-0.5 accent-[#1a5fa8]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[13px] font-semibold text-[#333]">{r.label}</span>
                        <span className="text-[11px] px-1.5 py-0.5 rounded-full font-medium"
                          style={{ color: rc.color, background: rc.bg }}>
                          {rc.label}
                        </span>
                      </div>
                      <div className="text-[12px] text-[#888]">{r.desc}</div>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          {/* 详细说明 */}
          <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
            <div className="px-5 py-3 bg-[#f8fafc] border-b border-[#e8edf5] flex items-center gap-2">
              <span className="w-1 h-4 rounded-full inline-block bg-[#1a5fa8]" />
              <span className="text-[13px] font-semibold text-[#333]">详细说明与证明材料</span>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-[13px] font-medium text-[#333] mb-1.5 block">
                  <span className="text-red-500">*</span> 详细说明
                  <span className="text-[#999] font-normal ml-2">（至少 10 个字）</span>
                </label>
                <textarea
                  value={detail}
                  onChange={e => setDetail(e.target.value)}
                  rows={4}
                  placeholder="请详细说明申请取消的具体情况，如：发生的时间、原因经过、与对方的协商结果等…"
                  className="w-full border border-[#dde3ec] rounded-lg px-4 py-3 text-[13px] placeholder-[#bbb] focus:outline-none focus:border-[#1a5fa8] resize-none"
                />
                <div className="flex justify-between mt-1 text-[12px]">
                  <span className={detail.length < 10 ? "text-red-400" : "text-[#3a8c3f]"}>
                    {detail.length < 10 ? `还需 ${10 - detail.length} 个字` : "字数符合要求"}
                  </span>
                  <span className="text-[#ccc]">{detail.length} / 500</span>
                </div>
              </div>
              <div>
                <label className="text-[13px] font-medium text-[#333] mb-1.5 block">
                  上传证明材料
                  <span className="text-[#999] font-normal ml-2">（选填，不可抗力/对方违约情况建议上传）</span>
                </label>
                <div
                  className="border-2 border-dashed border-[#dde3ec] rounded-lg px-6 py-8 text-center cursor-pointer hover:border-[#1a5fa8] transition-colors"
                  onClick={() => {
                    if (files.length < 5) setFiles(prev => [...prev, `证明材料${prev.length + 1}.pdf`])
                  }}
                >
                  <div className="text-[13px] text-[#999]">点击上传文件</div>
                  <div className="text-[12px] text-[#bbb] mt-1">JPG、PNG、PDF，单文件不超过 10MB</div>
                </div>
                {files.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    {files.map((f, i) => (
                      <div key={i} className="flex items-center justify-between bg-[#f8fafc] border border-[#e8edf5] rounded px-3 py-2">
                        <span className="text-[13px] text-[#555]">{f}</span>
                        <button onClick={() => setFiles(p => p.filter((_, idx) => idx !== i))}
                          className="text-[12px] text-red-400 hover:text-red-600">删除</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 退款预估（有选择原因后显示） */}
          {refundRule && risk && (
            <div className="rounded-lg border-2 overflow-hidden" style={{ borderColor: risk.border }}>
              <div className="px-5 py-3 flex items-center gap-2" style={{ background: risk.bg }}>
                <Shield className="w-4 h-4 shrink-0" style={{ color: risk.color }} />
                <span className="text-[13px] font-semibold" style={{ color: risk.color }}>
                  {risk.label} · 退款预估
                </span>
              </div>
              <div className="bg-white p-5">
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-[11px] text-[#999] mb-1">已付预付款</div>
                    <div className="text-[16px] font-bold text-[#333]">¥{ORDER.prepayPaid.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] text-[#999] mb-1">预计退款金额</div>
                    <div className="text-[16px] font-bold text-[#3a8c3f]">¥{refundRule.refund.toFixed(2)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] text-[#999] mb-1">
                      {refundRule.penalty > 0 ? "违约金/手续费" : "违约金"}
                    </div>
                    <div className={`text-[16px] font-bold ${refundRule.penalty > 0 ? "text-[#d9363e]" : "text-[#3a8c3f]"}`}>
                      {refundRule.penalty > 0 ? `-¥${refundRule.penalty.toFixed(2)}` : "¥0.00"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-[#888]">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  {refundRule.note}，最终金额以平台审核结果为准
                </div>
              </div>
            </div>
          )}

          {/* 协议与提交 */}
          <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
            <label className="flex items-start gap-2.5 cursor-pointer mb-5">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 accent-[#1a5fa8]" />
              <span className="text-[13px] text-[#555]">
                我已了解取消订单的相关规则和退款政策，并同意
                <span className="text-[#1a5fa8] underline cursor-pointer mx-1">《订单取消规则》</span>
                及其产生的法律效力
              </span>
            </label>
            <div className="flex items-center justify-center gap-4">
              <Link href="/merchant/dingdan-nongye/xq-list"
                className="px-8 h-10 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors flex items-center">
                放弃，返回
              </Link>
              <button
                disabled={!canNext}
                onClick={() => setStep("confirm")}
                className={`px-10 h-10 text-white text-[13px] rounded font-medium transition-colors ${
                  canNext ? "bg-[#d9363e] hover:bg-[#b02a32]" : "bg-[#f0b8bb] cursor-not-allowed"
                }`}
              >
                下一步：确认影响
              </button>
            </div>
          </div>
        </>
      )}

      {step === "confirm" && selectedReason && risk && refundRule && (
        <>
          {/* 影响确认 */}
          <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
            <div className="px-5 py-3 bg-[#f8fafc] border-b border-[#e8edf5] flex items-center gap-2">
              <span className="w-1 h-4 rounded-full inline-block bg-[#d9363e]" />
              <span className="text-[13px] font-semibold text-[#333]">请确认以下取消影响</span>
            </div>
            <div className="p-5 space-y-3">
              {[
                { icon: XCircle, color: "#d9363e", text: `订单 ${ORDER.id} 将被取消，对方将收到取消通知` },
                { icon: Shield, color: risk.color, text: `取消原因：${selectedReason.label}（${risk.label}）` },
                { icon: Info, color: "#1a5fa8", text: `预计退款 ¥${refundRule.refund.toFixed(2)}，${refundRule.penalty > 0 ? `扣除 ¥${refundRule.penalty.toFixed(2)} 违约金/手续费` : "无违约金"}` },
                { icon: Info, color: "#e8831a", text: "退款将在审核通过后 5 个工作日内原路退回至付款账户" },
                { icon: Info, color: "#888", text: "取消后本订单相关合同自动终止，双方权利义务解除" },
              ].map(({ icon: Icon, color, text }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Icon className="w-4.5 h-4.5 shrink-0 mt-0.5" style={{ color }} />
                  <span className="text-[13px] text-[#444]">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 最终确认操作 */}
          <div className="bg-[#fff1f0] border border-[#ffa39e] rounded-lg p-5">
            <div className="flex items-center gap-2 text-[#d9363e] font-semibold text-[14px] mb-3">
              <AlertTriangle className="w-5 h-5" />
              确认提交取消申请？此操作不可撤销。
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setStep("select")}
                className="px-8 h-10 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] bg-white transition-colors">
                返回修改
              </button>
              <button
                onClick={() => setStep("done")}
                className="px-10 h-10 bg-[#d9363e] hover:bg-[#b02a32] text-white text-[13px] rounded font-medium transition-colors"
              >
                确认提交取消申请
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
