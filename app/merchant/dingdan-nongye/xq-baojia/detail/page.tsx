"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ChevronLeft, FileText, Pencil } from "lucide-react"

const submitted = {
  id: "BJ20260601001",
  needId: "ID0001120x",
  needTitle: "2026年广东省内计划大量采购丝苗米",
  buyer: "平远新供销天润粮油有限公司（粮油业务部）",
  submitTime: "2026-04-20 14:23",
  status: "pending" as const,
  // 报价内容
  priceMin: "78",
  priceMax: "88",
  unit: "公斤",
  supplyQty: "9000公斤",
  qualityStd: "GB/T 1354 大米三等及以上，水分≤14.5%，整精米率≥65%。",
  capability: "年产能5万吨，拥有2000亩自有种植基地，通过GAP认证",
  tradeMode: "担保交易",
  settlement: "建行龙存管",
  delivery: "卖家配送",
  // 卖方联系人
  contactName: "张经理",
  contactPhone: "138****8888",
  // 其他
  remark: "可提供质检报告及产地溯源证明，支持实地考察",
  files: ["供应资质证明.pdf"],
}

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "未下单", color: "#e8831a", bg: "#fff8f0" },
  ordered: { label: "已下单", color: "#16a34a", bg: "#f0fdf4" },
  closed:  { label: "已关闭", color: "#999",    bg: "#f5f5f5" },
  expired: { label: "已过期", color: "#dc2626", bg: "#fff1f1" },
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 py-2.5 border-b border-[#f0f0f0] last:border-0">
      <span className="text-[13px] text-[#999] w-24 shrink-0 text-right">{label}</span>
      <span className="text-[13px] text-[#333] flex-1">{value}</span>
    </div>
  )
}

function Section({ title, color = "#1a5fa8", children }: { title: string; color?: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1 pb-2 border-b border-[#e8edf5]">
        <span className="w-0.5 h-4 rounded" style={{ background: color }} />
        <span className="text-[13px] font-semibold" style={{ color }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

function XqBaojiaDetailContent() {
  const searchParams = useSearchParams()
  const fromShoudaode = searchParams.get("from") === "shoudaode"
  const s = STATUS_MAP[submitted.status]

  return (
    <div className="max-w-[820px]">
      {/* Breadcrumb */}
      <div className="text-[13px] text-[#999] mb-4 flex items-center gap-1">
        <Link
          href={fromShoudaode ? "/merchant/xunbaojia/wo-shoudaode" : "/merchant/xunbaojia/wo-faqide"}
          className="flex items-center gap-1 hover:text-[#1a5fa8]"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          {fromShoudaode ? "我收到的" : "我发起的"}
        </Link>
        <span>›</span>
        <span className="text-[#333]">供应报价详情</span>
      </div>

      <div className="bg-white rounded-lg border border-[#dde3ec]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
          <div>
            <div className="text-[16px] font-semibold text-[#1a1a2e] mb-1">{submitted.needTitle}</div>
            <div className="flex items-center gap-4 text-[12px] text-[#999]">
              <span>报价单号：{submitted.id}</span>
              <span>关联需求：{submitted.needId}</span>
              <span>提交时间：{submitted.submitTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded text-[13px] font-medium" style={{ color: s.color, background: s.bg }}>
              {s.label}
            </span>
            {!fromShoudaode && submitted.status === "pending" && (
              <Link
                href="/merchant/dingdan-nongye/xq-baojia/edit"
                className="flex items-center gap-1.5 px-4 h-8 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded hover:bg-[#e8f4fd] transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" /> 修改报价
              </Link>
            )}
          </div>
        </div>

        <div className="p-6">
          {/* 买方信息 */}
          <Section title="关联需求信息">
            <Field label="需求方" value={submitted.buyer} />
            <Field label="需求编号" value={submitted.needId} />
          </Section>

          {/* 报价内容 */}
          <Section title="报价内容">
            <Field label="报价区间" value={`${submitted.priceMin} ~ ${submitted.priceMax} 元/${submitted.unit}`} />
            <Field label="可供应量" value={submitted.supplyQty} />
            <Field label="交易模式" value={submitted.tradeMode} />
            <Field label="结算渠道" value={submitted.settlement} />
            <Field label="配送方式" value={submitted.delivery} />
            {submitted.qualityStd && <Field label="质检标准" value={submitted.qualityStd} />}
            {submitted.capability && <Field label="产能说明" value={submitted.capability} />}
          </Section>

          {/* 卖方联系人 */}
          <Section title="卖方联系人信息">
            <Field label="联系人姓名" value={submitted.contactName} />
            <Field label="联系人电话" value={submitted.contactPhone} />
          </Section>

          {/* 其他信息 */}
          {(submitted.remark || submitted.files.length > 0) && (
            <Section title="其他信息">
              {submitted.remark && <Field label="备注说明" value={submitted.remark} />}
              {submitted.files.length > 0 && (
                <div className="flex gap-3 py-2.5">
                  <span className="text-[13px] text-[#999] w-24 shrink-0 text-right">附件</span>
                  <div className="flex flex-col gap-1.5">
                    {submitted.files.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-[13px] text-[#1a5fa8] hover:underline cursor-pointer">
                        <FileText className="w-4 h-4" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}

export default function XqBaojiaDetailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-[#999] text-[13px]">加载中…</div>}>
      <XqBaojiaDetailContent />
    </Suspense>
  )
}
