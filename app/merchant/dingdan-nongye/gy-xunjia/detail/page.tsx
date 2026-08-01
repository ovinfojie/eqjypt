"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ChevronLeft, FileText, Pencil } from "lucide-react"

const submitted = {
  id: "XJ20260601001",
  supplyId: "ID0001120x",
  supplyTitle: "2026年广东省内优质丝苗米大量供应",
  seller: "惠州新供销天润粮油储备有限公司",
  submitTime: "2026-04-20 09:15",
  status: "pending" as const,
  unit: "公斤",
  // 询价内容
  inquiryQty: "3000公斤",
  expectPrice: "80元/公斤",
  deliveryDate: "2026-05-15",
  deliveryAddr: "广东省广州市越秀区大东街道莱园东路78号 陈先生 178****5566",
  qualityReq: "参照GB/T 1354大米标准，要求三等及以上，水分≤14%，无异味。",
  tradeMode: "担保交易",
  settlement: "建行龙存管",
  delivery: "卖家配送",
  // 买方联系人
  contactName: "陈经理",
  contactPhone: "178****5566",
  // 其他
  remark: "需要随货附送质检报告，分3批次交货。",
  files: ["采购需求说明.pdf"],
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

function Section({ title, color = "#3a8c3f", children }: { title: string; color?: string; children: React.ReactNode }) {
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

export default function GyXunjiaDetailPage() {
  const searchParams = useSearchParams()
  const fromShoudaode = searchParams.get("from") === "shoudaode"
  const s = STATUS_MAP[submitted.status]

  return (
    <div className="max-w-[820px]">
      {/* Breadcrumb */}
      <div className="text-[13px] text-[#999] mb-4 flex items-center gap-1">
        <Link
          href={fromShoudaode ? "/merchant/xunbaojia/wo-shoudaode" : "/merchant/xunbaojia/wo-faqide"}
          className="flex items-center gap-1 hover:text-[#3a8c3f]"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          {fromShoudaode ? "我收到的" : "我发起的"}
        </Link>
        <span>›</span>
        <span className="text-[#333]">采购询价详情</span>
      </div>

      <div className="bg-white rounded-lg border border-[#dde3ec]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
          <div>
            <div className="text-[16px] font-semibold text-[#1a1a2e] mb-1">{submitted.supplyTitle}</div>
            <div className="flex items-center gap-4 text-[12px] text-[#999]">
              <span>询价单号：{submitted.id}</span>
              <span>关联供应：{submitted.supplyId}</span>
              <span>提交时间：{submitted.submitTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded text-[13px] font-medium" style={{ color: s.color, background: s.bg }}>
              {s.label}
            </span>
            {!fromShoudaode && submitted.status === "pending" && (
              <Link
                href="/merchant/dingdan-nongye/gy-xunjia/edit"
                className="flex items-center gap-1.5 px-4 h-8 border border-[#3a8c3f] text-[#3a8c3f] text-[13px] rounded hover:bg-[#f0fdf4] transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" /> 修改询价
              </Link>
            )}
          </div>
        </div>

        <div className="p-6">
          {/* 关联供应信息 */}
          <Section title="关联供应信息">
            <Field label="供应方" value={submitted.seller} />
            <Field label="供应编号" value={submitted.supplyId} />
          </Section>

          {/* 询价内容 */}
          <Section title="询价内容">
            <Field label="询购数量" value={submitted.inquiryQty} />
            <Field label="期望价格" value={submitted.expectPrice} />
            <Field label="期望收货" value={submitted.deliveryDate} />
            <Field label="收货地址" value={submitted.deliveryAddr} />
            <Field label="交易模式" value={submitted.tradeMode} />
            <Field label="结算渠道" value={submitted.settlement} />
            <Field label="配送方式" value={submitted.delivery} />
            {submitted.qualityReq && <Field label="质量要求" value={submitted.qualityReq} />}
          </Section>

          {/* 买方联系人 */}
          <Section title="买方联系人信息">
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
                      <div key={i} className="flex items-center gap-2 text-[13px] text-[#3a8c3f] hover:underline cursor-pointer">
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
