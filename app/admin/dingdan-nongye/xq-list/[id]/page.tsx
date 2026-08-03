"use client"

import Link from "next/link"
import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ChevronLeft, CheckCircle, XCircle, FileText, Building2, User, Phone } from "lucide-react"

const DEMAND = {
  id: "XQ20260501001",
  publisher: "平远新供销天润粮油有限公司",
  dept: "粮油业务部",
  contact: "陈经理",
  phone: "135****7890",
  publishTime: "2026-04-01 09:00",
  deadline: "2026-04-25 23:59",
  status: "待审核",
  title: "2026年广东省内计划大量采购丝苗米",
  product: "丝苗米",
  spec: "公斤",
  qty: "9000公斤",
  priceRange: "78~88元/公斤",
  deliveryStart: "2026-04-23",
  deliveryEnd: "2026-04-25",
  prepay: "30%",
  tradeMode: "担保交易",
  settlement: "建行龙存管",
  delivery: "卖家配送",
  quoteMode: "可以修改报价",
  qualityReq: "参照GB/T 1354大米标准，要求三等及以上，水分≤14%，无异味，随货附送质检报告。",
  remark: "分3批次交货，每批约3000公斤，具体日期另行协商。",
  files: ["采购需求说明.pdf", "质检标准文件.docx"],
  progress: 0,
  total: 9000,
  quoteCount: 0,
}

const AUDIT_LOG = [
  { time: "2026-04-01 09:00", action: "需求提交", operator: "平远新供销天润粮油有限公司", desc: "商家发布订单种植采购需求，等待平台审核" },
]

const statusColors: Record<string, { color: string; bg: string }> = {
  "正在进行":   { color: "#1a5fa8", bg: "#e8f4fd" },
  "待审核":     { color: "#e8831a", bg: "#fff7ed" },
  "驳回待修改": { color: "#e53935", bg: "#fdecea" },
  "已结束":     { color: "#2e7d32", bg: "#e8f5e9" },
  "已关闭":     { color: "#999",    bg: "#f5f5f5" },
}

function Section({ title, accent = "#1a5fa8", children }: { title: string; accent?: string; children: React.ReactNode }) {
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

export default function AdminXqDetailPage() {
  const d = DEMAND
  const sc = statusColors[d.status] ?? statusColors["已关闭"]
  const [rejectReason, setRejectReason] = useState("")
  const [showReject, setShowReject] = useState(false)

  return (
    <AdminLayout>
      <div className="max-w-[900px] space-y-4">
        {/* 面包屑 */}
        <div className="flex items-center gap-1.5 text-[13px] text-[#999]">
          <Link href="/admin/dingdan-nongye/xq-list" className="flex items-center gap-1 hover:text-[#1a5fa8] transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />订单种植需求管理
          </Link>
          <span>›</span>
          <span className="text-[#333]">需求详情</span>
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
              <h1 className="text-[18px] font-bold text-[#1a1a2e] mb-1">{d.title}</h1>
              <div className="flex items-center gap-4 text-[13px] text-[#6b7c93]">
                <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />{d.publisher}（{d.dept}）</span>
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

          <div className="mt-4 pt-4 border-t border-[#f0f0f0] grid grid-cols-4 gap-4">
            {[
              { label: "采购数量", value: d.qty, color: "#1a5fa8" },
              { label: "价格区间", value: d.priceRange, color: "#e8831a" },
              { label: "报价截止", value: d.deadline.split(" ")[0], color: "#333" },
              { label: "收到报价", value: `${d.quoteCount} 个`, color: d.quoteCount > 0 ? "#e8831a" : "#999" },
            ].map(item => (
              <div key={item.label} className="text-center">
                <div className="text-[12px] text-[#999] mb-1">{item.label}</div>
                <div className="text-[15px] font-bold" style={{ color: item.color }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 需求详细信息 */}
        <Section title="采购需求信息">
          <div className="grid grid-cols-2 gap-x-8">
            <Field label="采购商品" value={d.product} />
            <Field label="规格单位" value={d.spec} />
            <Field label="采购数量" value={d.qty} />
            <Field label="价格区间" value={<span className="text-[#e8831a] font-semibold">{d.priceRange}</span>} />
            <Field label="计划收货" value={`${d.deliveryStart} 至 ${d.deliveryEnd}`} />
            <Field label="报价截止" value={d.deadline} />
            <Field label="预付款比例" value={d.prepay} />
            <Field label="交易模式" value={d.tradeMode} />
            <Field label="结算渠道" value={d.settlement} />
            <Field label="配送方式" value={d.delivery} />
            <Field label="报价模式" value={d.quoteMode} />
          </div>
          <div className="mt-2 pt-3 border-t border-[#f5f7fa]">
            <Field label="质量要求" value={d.qualityReq} />
            <Field label="备注说明" value={d.remark} />
          </div>
          {d.files.length > 0 && (
            <div className="mt-2 pt-3 border-t border-[#f5f7fa] flex gap-3 text-[13px]">
              <span className="text-[#999] w-24 shrink-0 text-right">附件</span>
              <div className="flex flex-col gap-1.5">
                {d.files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-[#1a5fa8] hover:underline cursor-pointer">
                    <FileText className="w-4 h-4 shrink-0" />{f}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Section>

        {/* 发布方信息 */}
        <Section title="发布方信息" accent="#3a8c3f">
          <div className="grid grid-cols-2 gap-x-8">
            <Field label="发布企业" value={`${d.publisher}（${d.dept}）`} />
            <Field label="联系人" value={d.contact} />
            <Field label="联系电话" value={d.phone} />
            <Field label="发布时间" value={d.publishTime} />
          </div>
        </Section>

        {/* 操作日志 */}
        <Section title="操作日志" accent="#6b7c93">
          <div className="space-y-0">
            {AUDIT_LOG.map((log, i) => (
              <div key={i} className="flex gap-4 pb-4 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1a5fa8] mt-1 shrink-0" />
                  {i < AUDIT_LOG.length - 1 && <div className="w-0.5 flex-1 bg-[#e8edf5] mt-1" />}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-3 mb-0.5">
                    <span className="text-[13px] font-semibold text-[#333]">{log.action}</span>
                    <span className="text-[12px] text-[#999]">{log.time}</span>
                  </div>
                  <div className="text-[13px] text-[#6b7c93]">{log.desc}</div>
                  <div className="text-[12px] text-[#aaa] mt-0.5">操作人：{log.operator}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </AdminLayout>
  )
}
