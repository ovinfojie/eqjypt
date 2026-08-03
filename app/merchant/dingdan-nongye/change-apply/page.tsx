"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, AlertCircle, CheckCircle2, Info } from "lucide-react"

const ORDER = {
  id: "HT-DD20260001",
  title: "2026年广东省内计划大量采购丝苗米",
  product: "丝苗米",
  spec: "公斤",
  qty: 9000,
  priceMin: 2.70,
  priceMax: 3.20,
  deliveryDate: "2026-04-23",
  counterparty: "惠州新供销天润粮油储备有限公司",
  myRole: "采购方",
}

const CHANGE_TYPES = [
  { value: "qty",      label: "采购数量变更",   desc: "调整合同约定的采购总量" },
  { value: "price",    label: "价格区间变更",   desc: "调整合同约定的价格上下限" },
  { value: "delivery", label: "交货日期变更",   desc: "延期或提前合同约定的交货日期" },
  { value: "mixed",    label: "多项内容变更",   desc: "同时变更数量、价格或日期中的多项" },
]

function Section({ title, accent = "#1a5fa8", children }: { title: string; accent?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
      <div className="px-5 py-3 bg-[#f8fafc] border-b border-[#e8edf5] flex items-center gap-2">
        <span className="w-1 h-4 rounded-full inline-block shrink-0" style={{ background: accent }} />
        <span className="text-[13px] font-semibold text-[#333]">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

export default function ChangeApplyPage() {
  const [changeType, setChangeType] = useState("qty")
  const [newQty, setNewQty]             = useState(String(ORDER.qty))
  const [newPriceMin, setNewPriceMin]   = useState(String(ORDER.priceMin))
  const [newPriceMax, setNewPriceMax]   = useState(String(ORDER.priceMax))
  const [newDelivery, setNewDelivery]   = useState(ORDER.deliveryDate)
  const [reason, setReason]             = useState("")
  const [agreed, setAgreed]             = useState(false)
  const [submitted, setSubmitted]       = useState(false)
  const [files, setFiles]               = useState<string[]>([])

  const showQty      = changeType === "qty"      || changeType === "mixed"
  const showPrice    = changeType === "price"    || changeType === "mixed"
  const showDelivery = changeType === "delivery" || changeType === "mixed"

  const canSubmit = reason.trim().length >= 10 && agreed

  if (submitted) {
    return (
      <div className="max-w-[520px] mx-auto py-14 text-center">
        <div className="w-16 h-16 rounded-full bg-[#e8f4fd] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9 text-[#1a5fa8]" />
        </div>
        <h3 className="text-[20px] font-bold text-[#1a1a2e] mb-2">变更申请已提交</h3>
        <p className="text-[14px] text-[#888] mb-1">已通知对方（{ORDER.counterparty}）审核</p>
        <p className="text-[13px] text-[#aaa] mb-8">对方在 48 小时内确认，超时未回复视为同意变更</p>
        <div className="bg-[#f8fafc] border border-[#e8edf5] rounded-lg p-5 text-[13px] text-left space-y-2 mb-8">
          {[
            ["订单编号", ORDER.id],
            ["变更类型", CHANGE_TYPES.find(t => t.value === changeType)?.label ?? ""],
            ...(showQty      ? [["原数量 → 新数量", `${ORDER.qty} → ${newQty} ${ORDER.spec}`]]      : []),
            ...(showPrice    ? [["原价格 → 新价格", `${ORDER.priceMin}~${ORDER.priceMax} → ${newPriceMin}~${newPriceMax} 元/${ORDER.spec}`]] : []),
            ...(showDelivery ? [["原交货日期 → 新", `${ORDER.deliveryDate} → ${newDelivery}`]]        : []),
            ["变更原因", reason],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-4">
              <span className="text-[#999] w-28 shrink-0">{k}</span>
              <span className="text-[#333] font-medium">{v}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link href="/merchant/dingdan-nongye/xq-list"
            className="px-6 h-10 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors flex items-center">
            返回需求列表
          </Link>
          <Link href="/merchant/dingdan-nongye/change-confirm"
            className="px-8 h-10 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors flex items-center">
            查看变更进度
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
          className="hover:text-[#1a5fa8] transition-colors">
          需求详情
        </Link>
        <span>›</span>
        <span className="text-[#333]">申请订单变更</span>
      </div>

      {/* 提示横幅 */}
      <div className="bg-[#fff8e1] border border-[#ffd54f] rounded-lg px-5 py-3 flex items-start gap-3">
        <AlertCircle className="w-4.5 h-4.5 text-[#e8831a] shrink-0 mt-0.5" />
        <div className="text-[13px] text-[#7a5c00]">
          <span className="font-semibold">变更须知：</span>
          订单变更申请提交后，需经对方确认后方可生效。变更生效前，原合同条款继续有效。
          如对方在 48 小时内未响应，系统视为同意变更。
        </div>
      </div>

      {/* 当前订单信息 */}
      <Section title="当前订单信息">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[12px] text-[#999] mr-2">{ORDER.id}</span>
            <span className="text-[14px] font-semibold text-[#1a1a2e]">{ORDER.title}</span>
          </div>
          <span className="px-2.5 py-0.5 rounded text-[12px] font-semibold text-[#1a5fa8] bg-[#e8f4fd]">履约中</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "对方主体",   value: ORDER.counterparty },
            { label: "我方身份",   value: ORDER.myRole },
            { label: "采购商品",   value: `${ORDER.product}（${ORDER.spec}）` },
            { label: "合同数量",   value: `${ORDER.qty} ${ORDER.spec}` },
            { label: "合同价格",   value: `${ORDER.priceMin} ~ ${ORDER.priceMax} 元/${ORDER.spec}` },
            { label: "交货日期",   value: ORDER.deliveryDate },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#f8fafc] rounded-lg p-3">
              <div className="text-[11px] text-[#999] mb-1">{label}</div>
              <div className="text-[13px] font-medium text-[#333]">{value}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* 变更类型 */}
      <Section title="选择变更类型">
        <div className="grid grid-cols-2 gap-3">
          {CHANGE_TYPES.map(t => (
            <label key={t.value}
              className={`flex items-start gap-3 border rounded-lg p-4 cursor-pointer transition-all ${
                changeType === t.value
                  ? "border-[#1a5fa8] bg-[#f0f7ff]"
                  : "border-[#dde3ec] hover:border-[#a8c4e0]"
              }`}>
              <input
                type="radio"
                name="changeType"
                value={t.value}
                checked={changeType === t.value}
                onChange={() => setChangeType(t.value)}
                className="mt-0.5 accent-[#1a5fa8]"
              />
              <div>
                <div className="text-[13px] font-semibold text-[#333]">{t.label}</div>
                <div className="text-[12px] text-[#888] mt-0.5">{t.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </Section>

      {/* 变更内容 */}
      <Section title="填写变更内容" accent="#e8831a">
        <div className="space-y-5">
          {showQty && (
            <div>
              <div className="text-[13px] font-semibold text-[#333] mb-3">采购数量变更</div>
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-[#f8fafc] rounded-lg p-4">
                  <div className="text-[11px] text-[#999] mb-1.5">原合同数量</div>
                  <div className="text-[20px] font-bold text-[#333]">{ORDER.qty}
                    <span className="text-[13px] font-normal text-[#666] ml-1">{ORDER.spec}</span>
                  </div>
                </div>
                <div className="rounded-lg p-4 border-2 border-[#1a5fa8] bg-[#f0f7ff]">
                  <div className="text-[11px] text-[#1a5fa8] mb-1.5">
                    <span className="text-red-500">*</span> 申请变更为
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={newQty}
                      onChange={e => setNewQty(e.target.value)}
                      className="w-full h-9 border border-[#a8c4e0] rounded px-3 text-[15px] font-bold text-[#1a5fa8] bg-white focus:outline-none focus:border-[#1a5fa8]"
                    />
                    <span className="text-[13px] text-[#666] shrink-0">{ORDER.spec}</span>
                  </div>
                  {Number(newQty) !== ORDER.qty && (
                    <div className={`text-[11px] mt-1.5 font-medium ${Number(newQty) > ORDER.qty ? "text-[#e8831a]" : "text-red-500"}`}>
                      {Number(newQty) > ORDER.qty ? `↑ 增加 ${Number(newQty) - ORDER.qty} ${ORDER.spec}` : `↓ 减少 ${ORDER.qty - Number(newQty)} ${ORDER.spec}`}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {showPrice && (
            <div>
              <div className="text-[13px] font-semibold text-[#333] mb-3">价格区间变更</div>
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-[#f8fafc] rounded-lg p-4">
                  <div className="text-[11px] text-[#999] mb-1.5">原合同价格</div>
                  <div className="text-[18px] font-bold text-[#333]">
                    {ORDER.priceMin} ~ {ORDER.priceMax}
                    <span className="text-[12px] font-normal text-[#666] ml-1">元/{ORDER.spec}</span>
                  </div>
                </div>
                <div className="rounded-lg p-4 border-2 border-[#1a5fa8] bg-[#f0f7ff]">
                  <div className="text-[11px] text-[#1a5fa8] mb-1.5">
                    <span className="text-red-500">*</span> 申请变更为
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.01"
                      value={newPriceMin}
                      onChange={e => setNewPriceMin(e.target.value)}
                      className="w-24 h-9 border border-[#a8c4e0] rounded px-3 text-[14px] font-bold text-[#1a5fa8] bg-white focus:outline-none focus:border-[#1a5fa8]"
                    />
                    <span className="text-[#999]">~</span>
                    <input
                      type="number"
                      step="0.01"
                      value={newPriceMax}
                      onChange={e => setNewPriceMax(e.target.value)}
                      className="w-24 h-9 border border-[#a8c4e0] rounded px-3 text-[14px] font-bold text-[#1a5fa8] bg-white focus:outline-none focus:border-[#1a5fa8]"
                    />
                    <span className="text-[13px] text-[#666] shrink-0">元/{ORDER.spec}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showDelivery && (
            <div>
              <div className="text-[13px] font-semibold text-[#333] mb-3">交货日期变更</div>
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-[#f8fafc] rounded-lg p-4">
                  <div className="text-[11px] text-[#999] mb-1.5">原合同交货日期</div>
                  <div className="text-[18px] font-bold text-[#333]">{ORDER.deliveryDate}</div>
                </div>
                <div className="rounded-lg p-4 border-2 border-[#1a5fa8] bg-[#f0f7ff]">
                  <div className="text-[11px] text-[#1a5fa8] mb-1.5">
                    <span className="text-red-500">*</span> 申请变更为
                  </div>
                  <input
                    type="date"
                    value={newDelivery}
                    onChange={e => setNewDelivery(e.target.value)}
                    className="w-full h-9 border border-[#a8c4e0] rounded px-3 text-[14px] font-bold text-[#1a5fa8] bg-white focus:outline-none focus:border-[#1a5fa8]"
                  />
                  {newDelivery !== ORDER.deliveryDate && (
                    <div className="text-[11px] mt-1.5 font-medium text-[#e8831a]">
                      {newDelivery > ORDER.deliveryDate ? `延期 ${Math.round((new Date(newDelivery).getTime() - new Date(ORDER.deliveryDate).getTime()) / 86400000)} 天` : `提前 ${Math.round((new Date(ORDER.deliveryDate).getTime() - new Date(newDelivery).getTime()) / 86400000)} 天`}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* 变更原因 */}
      <Section title="变更原因与附件">
        <div className="space-y-4">
          <div>
            <label className="text-[13px] font-medium text-[#333] mb-1.5 block">
              <span className="text-red-500">*</span> 变更原因说明
              <span className="text-[#999] font-normal ml-2">（至少 10 个字）</span>
            </label>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              rows={4}
              placeholder="请详细说明申请变更的原因，例如：市场行情变动、自然灾害影响、双方协商一致等…"
              className="w-full border border-[#dde3ec] rounded-lg px-4 py-3 text-[13px] text-[#333] placeholder-[#bbb] focus:outline-none focus:border-[#1a5fa8] resize-none"
            />
            <div className="flex items-center justify-between mt-1">
              <span className={`text-[12px] ${reason.length < 10 ? "text-red-400" : "text-[#3a8c3f]"}`}>
                {reason.length < 10 ? `还需输入 ${10 - reason.length} 个字` : "字数符合要求"}
              </span>
              <span className="text-[12px] text-[#ccc]">{reason.length} / 500</span>
            </div>
          </div>

          <div>
            <label className="text-[13px] font-medium text-[#333] mb-1.5 block">
              上传证明材料
              <span className="text-[#999] font-normal ml-2">（选填，支持图片/PDF，最多 5 个文件）</span>
            </label>
            <div
              className="border-2 border-dashed border-[#dde3ec] rounded-lg px-6 py-8 text-center cursor-pointer hover:border-[#1a5fa8] transition-colors"
              onClick={() => {
                if (files.length < 5) setFiles(prev => [...prev, `附件文件${prev.length + 1}.pdf`])
              }}
            >
              <div className="text-[13px] text-[#999]">点击上传文件，或将文件拖拽至此处</div>
              <div className="text-[12px] text-[#bbb] mt-1">支持 JPG、PNG、PDF，单文件不超过 10MB</div>
            </div>
            {files.length > 0 && (
              <div className="mt-2 space-y-1.5">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center justify-between bg-[#f8fafc] border border-[#e8edf5] rounded px-3 py-2">
                    <span className="text-[13px] text-[#555]">{f}</span>
                    <button
                      onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))}
                      className="text-[12px] text-red-400 hover:text-red-600"
                    >删除</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* 确认提示 */}
      <div className="bg-[#f0f7ff] border border-[#dce8f8] rounded-lg px-5 py-4 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#1a5fa8] shrink-0 mt-0.5" />
        <div className="text-[13px] text-[#3a5a8a]">
          变更申请提交后，系统将通知 <span className="font-semibold">{ORDER.counterparty}</span> 进行审核确认。
          变更生效前，原合同条款继续有效，请继续按原合同履约，避免违约风险。
        </div>
      </div>

      {/* 协议与提交 */}
      <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
        <label className="flex items-start gap-2.5 cursor-pointer mb-5">
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="mt-0.5 accent-[#1a5fa8]"
          />
          <span className="text-[13px] text-[#555]">
            我已了解变更申请规则，确认上述变更内容真实有效，并同意
            <span className="text-[#1a5fa8] underline cursor-pointer mx-1">《订单变更管理规则》</span>
          </span>
        </label>
        <div className="flex items-center justify-center gap-4">
          <Link href="/merchant/dingdan-nongye/xq-list"
            className="px-8 h-10 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors flex items-center">
            取消
          </Link>
          <button
            disabled={!canSubmit}
            onClick={() => setSubmitted(true)}
            className={`px-12 h-10 text-white text-[13px] rounded font-medium transition-colors ${
              canSubmit ? "bg-[#1a5fa8] hover:bg-[#0d4a8a]" : "bg-[#aac3de] cursor-not-allowed"
            }`}
          >
            提交变更申请
          </button>
        </div>
      </div>
    </div>
  )
}
