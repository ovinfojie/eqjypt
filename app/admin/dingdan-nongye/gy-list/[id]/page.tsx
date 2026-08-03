"use client"

import Link from "next/link"
import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ChevronLeft, CheckCircle, XCircle, FileText, Building2, User, Phone } from "lucide-react"

const SUPPLY = {
  id: "GY20260501001",
  publisher: "惠州新供销天润粮油储备有限公司",
  contact: "张经理",
  phone: "138****8888",
  publishTime: "2026-04-02 10:15",
  deliveryStart: "2026-04-23",
  deliveryEnd: "2026-04-25 23:59",
  status: "待审核",
  product: "丝苗米",
  spec: "公斤",
  qty: "9000公斤",
  priceRange: "78~88元/公斤",
  progress: 0,
  total: 9000,
  tradeMode: "担保交易",
  settlement: "建行龙存管",
  delivery: "卖家配送",
  qualityStd: "GB/T 1354 大米三等及以上，水分≤14.5%，整精米率≥65%，无异味。",
  capability: "年产能5万吨，拥有2000亩自有种植基地，通过GAP认证",
  remark: "可提供质检报告及产地溯源证明，支持实地考察",
  files: ["供应资质证明.pdf", "质检报告样本.pdf"],
  inquiryCount: 0,
  signedCount: 0,
  buyers: [] as { company: string; qty: string; price: string; signTime: string; status: string }[],
}

const AUDIT_LOG = [
  { time: "2026-04-02 10:15", action: "供应发布", operator: "惠州新供销天润粮油储备有限公司", desc: "商家发布订单种植供应信息，等待平台审核" },
]

const statusColors: Record<string, { color: string; bg: string }> = {
  "正在进行":   { color: "#3a8c3f", bg: "#e8f5e9" },
  "待审核":     { color: "#e8831a", bg: "#fff7ed" },
  "驳回待修改": { color: "#e53935", bg: "#fdecea" },
  "已结束":     { color: "#555",    bg: "#f0f0f0" },
  "已关闭":     { color: "#999",    bg: "#f5f5f5" },
}

function Section({ title, accent = "#3a8c3f", children }: { title: string; accent?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-[#dde3ec] overflow-hidden">
      <div className="px-5 py-3 bg-[#f5f7fa] border-b border-[#dde3ec] flex items-center gap-2">
        <span className="w-0.5 h-4 rounded-full inline-block" style={{ background: accent }} />
        <span className="text-[13px] font-semibold text-[#333]">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-3 py-2 border-b border-[#f5f7fa] last:border-0 text-[13px]">
      <span className="text-[#999] w-24 shrink-0 text-right">{label}</span>
      <span className="text-[#333] flex-1">{value}</span>
    </div>
  )
}

export default function AdminGyDetailPage() {
  const d = SUPPLY
  const sc = statusColors[d.status] ?? statusColors["已关闭"]
  const pct = d.total > 0 ? Math.round(d.progress / d.total * 100) : 0
  const [rejectReason, setRejectReason] = useState("")
  const [showReject, setShowReject] = useState(false)

  return (
    <AdminLayout>
      <div className="max-w-[900px] space-y-4">
        {/* 面包屑 */}
        <div className="flex items-center gap-1.5 text-[13px] text-[#999]">
          <Link href="/admin/dingdan-nongye/gy-list" className="flex items-center gap-1 hover:text-[#3a8c3f] transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />订单种植供应管理
          </Link>
          <span>›</span>
          <span className="text-[#333]">供应详情</span>
        </div>

        {/* 标题卡 */}
        <div className="bg-white rounded-lg border border-[#dde3ec] p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[12px] font-semibold"
                  style={{ color: sc.color, background: sc.bg }}>{d.status}</span>
                <span className="text-[12px] text-[#999]">{d.id}</span>
                <span className="text-[12px] text-[#999]">发布时间：{d.publishTime}</span>
              </div>
              <h1 className="text-[18px] font-bold text-[#1a1a2e] mb-1">{d.product} 供应 · {d.priceRange}</h1>
              <div className="flex items-center gap-4 text-[13px] text-[#6b7c93]">
                <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />{d.publisher}</span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{d.contact}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{d.phone}</span>
              </div>
            </div>
            {d.status === "待审核" && (
              <div className="flex items-center gap-2 shrink-0">
                <button className="flex items-center gap-1.5 px-5 h-9 bg-[#2e7d32] text-white text-[13px] rounded hover:bg-[#1b5e20] transition-colors">
                  <CheckCircle className="w-4 h-4" />审核通过
                </button>
                <button onClick={() => setShowReject(!showReject)}
                  className="flex items-center gap-1.5 px-5 h-9 bg-red-500 text-white text-[13px] rounded hover:bg-red-600 transition-colors">
                  <XCircle className="w-4 h-4" />驳回
                </button>
              </div>
            )}
          </div>

          {showReject && (
            <div className="mt-4 pt-4 border-t border-[#f0f0f0]">
              <div className="flex items-start gap-3">
                <label className="text-[13px] text-[#555] w-16 shrink-0 pt-2">驳回原因</label>
                <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)}
                  placeholder="请填写驳回原因，将通知给发布方..."
                  className="flex-1 border border-[#dde3ec] rounded px-3 py-2 text-[13px] h-16 resize-none focus:outline-none focus:border-red-300" />
                <div className="flex flex-col gap-2">
                  <button className="px-5 h-8 bg-red-500 text-white text-[13px] rounded hover:bg-red-600 transition-colors">确认驳回</button>
                  <button onClick={() => setShowReject(false)} className="px-5 h-8 border border-[#dde3ec] text-[#666] text-[13px] rounded transition-colors">取消</button>
                </div>
              </div>
            </div>
          )}

          {/* 签约进度 */}
          <div className="mt-4 pt-4 border-t border-[#f0f0f0]">
            <div className="flex items-center justify-between mb-1.5 text-[13px]">
              <span className="text-[#6b7c93]">签约进度</span>
              <span className="font-semibold text-[#3a8c3f]">{d.progress}/{d.total} {d.spec}（{pct}%）</span>
            </div>
            <div className="h-2 bg-[#e8edf5] rounded-full overflow-hidden mb-2">
              <div className="h-full rounded-full bg-[#3a8c3f]" style={{ width: `${Math.min(pct, 100)}%` }} />
            </div>
            <div className="flex items-center gap-4 text-[12px] text-[#6b7c93]">
              <span>收到询价：<span className="text-[#e8831a] font-semibold">{d.inquiryCount}</span> 笔</span>
              <span>已签约：<span className="text-[#3a8c3f] font-semibold">{d.signedCount}</span> 笔</span>
              <span>供应截止：<span className="text-[#333]">{d.deliveryEnd}</span></span>
            </div>
          </div>
        </div>

        {/* 供应信息 */}
        <Section title="供应信息">
          <div className="grid grid-cols-2 gap-x-8">
            <Field label="供应商品" value={d.product} />
            <Field label="规格单位" value={d.spec} />
            <Field label="预估供应量" value={d.qty} />
            <Field label="销售价区间" value={<span className="text-[#e8831a] font-semibold">{d.priceRange}</span>} />
            <Field label="计划供应" value={`${d.deliveryStart} 至 ${d.deliveryEnd}`} />
            <Field label="交易模式" value={d.tradeMode} />
            <Field label="结算渠道" value={d.settlement} />
            <Field label="配送方式" value={d.delivery} />
          </div>
          <div className="mt-2 pt-3 border-t border-[#f5f7fa]">
            <Field label="质检标准" value={d.qualityStd} />
            <Field label="产能说明" value={d.capability} />
            {d.remark && <Field label="备注说明" value={d.remark} />}
          </div>
          {d.files.length > 0 && (
            <div className="mt-2 pt-3 border-t border-[#f5f7fa] flex gap-3 text-[13px]">
              <span className="text-[#999] w-24 shrink-0 text-right">附件</span>
              <div className="flex flex-col gap-1.5">
                {d.files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-[#3a8c3f] hover:underline cursor-pointer">
                    <FileText className="w-4 h-4 shrink-0" />{f}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Section>

        {/* 发布方信息 */}
        <Section title="发布方信息" accent="#1a5fa8">
          <div className="grid grid-cols-2 gap-x-8">
            <Field label="发布企业" value={d.publisher} />
            <Field label="联系人" value={d.contact} />
            <Field label="联系电话" value={d.phone} />
            <Field label="发布时间" value={d.publishTime} />
          </div>
        </Section>

        {/* 签约采购商 */}
        <Section title="签约采购商记录">
          {d.buyers.length === 0 ? (
            <p className="text-[13px] text-[#999] text-center py-4">暂无签约记录</p>
          ) : (
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#e8edf5] text-[12px] text-[#888]">
                  {["采购方", "数量", "成交价", "签约时间", "状态"].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {d.buyers.map((b, i) => (
                  <tr key={i} className="border-b border-[#f5f7fa] last:border-0 hover:bg-[#fafcff]">
                    <td className="px-4 py-2.5 text-[#333]">{b.company}</td>
                    <td className="px-4 py-2.5 text-[#333]">{b.qty}</td>
                    <td className="px-4 py-2.5 text-[#e8831a] font-medium">{b.price}</td>
                    <td className="px-4 py-2.5 text-[#6b7c93]">{b.signTime}</td>
                    <td className="px-4 py-2.5">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium text-[#3a8c3f] bg-[#e8f5e9]">{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Section>

        {/* 操作日志 */}
        <Section title="操作日志" accent="#6b7c93">
          {AUDIT_LOG.map((log, i) => (
            <div key={i} className="flex gap-4 pb-4 last:pb-0">
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#3a8c3f] mt-1 shrink-0" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-0.5">
                  <span className="text-[13px] font-semibold text-[#333]">{log.action}</span>
                  <span className="text-[12px] text-[#999]">{log.time}</span>
                </div>
                <div className="text-[13px] text-[#6b7c93]">{log.desc}</div>
                <div className="text-[12px] text-[#aaa] mt-0.5">操作人：{log.operator}</div>
              </div>
            </div>
          ))}
        </Section>
      </div>
    </AdminLayout>
  )
}
