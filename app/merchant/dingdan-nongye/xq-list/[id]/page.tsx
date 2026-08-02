"use client"

import Link from "next/link"
import { MerchantLayout } from "@/components/merchant/merchant-layout"
import { ChevronLeft, FileText, Edit2, XCircle } from "lucide-react"

const DEMAND = {
  id: "ID0001120x",
  title: "2026年广东省内计划大量采购丝苗米",
  publisher: "平远新供销天润粮油有限公司",
  dept: "粮油业务部",
  publishTime: "2026-04-01 09:00",
  deadline: "2026-04-25",
  status: "正在进行",
  // 商品信息
  product: "丝苗米",
  spec: "公斤",
  qty: "9000公斤",
  priceRange: "78 ~ 88 元/公斤",
  deliveryStart: "2026-04-23",
  deliveryEnd: "2026-04-25",
  prepay: "30%",
  tradeMode: "担保交易",
  settlement: "建行龙存管",
  delivery: "卖家配送",
  quoteMode: "可以修改报价",
  qualityReq: "参照GB/T 1354大米标准，要求三等及以上，水分≤14%，无异味。",
  remark: "需要随货附送质检报告，分3批次交货。",
  files: ["采购需求说明.pdf", "质检标准文件.docx"],
  // 联系人
  contactName: "陈经理",
  contactPhone: "135****7890",
  // 进度
  progress: 6630,
  total: 9000,
  quoteCount: 8,
  signedCount: 2,
}

const statusColors: Record<string, { text: string; bg: string }> = {
  "正在进行":   { text: "#1a5fa8", bg: "#e8f4fd" },
  "待审核":     { text: "#e8831a", bg: "#fff4e6" },
  "驳回待修改": { text: "#e53935", bg: "#fdecea" },
  "已结束":     { text: "#666",    bg: "#f0f0f0" },
  "已关闭":     { text: "#666",    bg: "#f0f0f0" },
}

function Section({ title, accent = "#1a5fa8", children }: { title: string; accent?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
      <div className="px-5 py-3 bg-[#f8fafc] border-b border-[#e8edf5] flex items-center gap-2">
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

export default function XqDetailPage() {
  const d = DEMAND
  const sc = statusColors[d.status] ?? statusColors["已结束"]
  const pct = Math.round((d.progress / d.total) * 100)

  return (
    <MerchantLayout>
      <div className="max-w-[900px] space-y-4">
        {/* 面包屑 */}
        <div className="flex items-center gap-1.5 text-[13px] text-[#999]">
          <Link href="/merchant/dingdan-nongye/xq-list" className="flex items-center gap-1 hover:text-[#1a5fa8] transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />订单种植需求
          </Link>
          <span>›</span>
          <span className="text-[#333]">需求详情</span>
        </div>

        {/* 标题卡片 */}
        <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="px-2.5 py-0.5 rounded text-[12px] font-semibold"
                  style={{ color: sc.text, background: sc.bg }}
                >
                  {d.status}
                </span>
                <span className="text-[12px] text-[#999]">{d.id}</span>
                <span className="text-[12px] text-[#999]">发布时间：{d.publishTime}</span>
              </div>
              <h1 className="text-[18px] font-bold text-[#1a1a2e] mb-1">{d.title}</h1>
              <p className="text-[13px] text-[#6b7c93]">{d.publisher} · {d.dept}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {d.status === "正在进行" && (
                <Link
                  href={`/merchant/dingdan-nongye/xq-baojia-list?id=${d.id}`}
                  className="px-4 h-9 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors flex items-center gap-1.5"
                >
                  查看报价（{d.quoteCount}）
                </Link>
              )}
              {(d.status === "正在进行" || d.status === "待审核" || d.status === "驳回待修改") && (
                <Link
                  href={`/merchant/dingdan-nongye/fabu-xq?edit=${d.id}`}
                  className="flex items-center gap-1.5 px-4 h-9 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />编辑
                </Link>
              )}
              {d.status !== "已结束" && d.status !== "已关闭" && (
                <button className="flex items-center gap-1.5 px-4 h-9 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-red-300 hover:text-red-500 transition-colors">
                  <XCircle className="w-3.5 h-3.5" />关闭
                </button>
              )}
            </div>
          </div>

          {/* 进度条 */}
          <div className="mt-4 pt-4 border-t border-[#f0f4f8]">
            <div className="flex items-center justify-between mb-1.5 text-[13px]">
              <span className="text-[#6b7c93]">需求进度</span>
              <span className="font-semibold text-[#1a5fa8]">{d.progress}/{d.total} {d.spec}（{pct}%）</span>
            </div>
            <div className="h-2.5 bg-[#e8edf5] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#1a5fa8] transition-all"
                style={{ width: `${Math.min(pct, 100)}%` }}
              />
            </div>
            <div className="flex items-center gap-4 mt-2 text-[12px] text-[#6b7c93]">
              <span>收到报价：<span className="text-[#e8831a] font-semibold">{d.quoteCount}</span> 家</span>
              <span>已签约：<span className="text-[#3a8c3f] font-semibold">{d.signedCount}</span> 家</span>
              <span>报价截止：<span className="text-[#333]">{d.deadline}</span></span>
            </div>
          </div>
        </div>

        {/* 商品与采购信息 */}
        <Section title="采购信息">
          <div className="grid grid-cols-2 gap-x-8">
            <Field label="采购商品" value={d.product} />
            <Field label="商品规格" value={d.spec} />
            <Field label="采购数量" value={d.qty} />
            <Field label="价格区间" value={<span className="text-[#e8831a] font-semibold">{d.priceRange}</span>} />
            <Field label="计划收货" value={`${d.deliveryStart} 至 ${d.deliveryEnd}`} />
            <Field label="预付款比例" value={d.prepay} />
            <Field label="交易模式" value={d.tradeMode} />
            <Field label="结算渠道" value={d.settlement} />
            <Field label="配送方式" value={d.delivery} />
            <Field label="报价模式" value={d.quoteMode} />
          </div>
          {d.qualityReq && (
            <div className="mt-2 pt-3 border-t border-[#f5f7fa]">
              <Field label="质量要求" value={d.qualityReq} />
            </div>
          )}
        </Section>

        {/* 联系人信息 */}
        <Section title="买方联系人" accent="#3a8c3f">
          <div className="grid grid-cols-2 gap-x-8">
            <Field label="发布方" value={`${d.publisher}（${d.dept}）`} />
            <Field label="联系人" value={d.contactName} />
            <Field label="联系电话" value={d.contactPhone} />
          </div>
        </Section>

        {/* 其他信息 */}
        {(d.remark || d.files.length > 0) && (
          <Section title="其他信息">
            {d.remark && <Field label="备注说明" value={d.remark} />}
            {d.files.length > 0 && (
              <div className="flex gap-3 py-2 text-[13px]">
                <span className="text-[#999] w-24 shrink-0 text-right">附件</span>
                <div className="flex flex-col gap-1.5">
                  {d.files.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-[#1a5fa8] hover:underline cursor-pointer">
                      <FileText className="w-4 h-4 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Section>
        )}
      </div>
    </MerchantLayout>
  )
}
