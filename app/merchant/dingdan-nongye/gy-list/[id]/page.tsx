"use client"

import Link from "next/link"
import { ChevronLeft, FileText, Edit2, XCircle, Eye } from "lucide-react"

const SUPPLY = {
  id: "ID0001120x",
  publisher: "惠州新供销天润粮油储备有限公司",
  publishTime: "2026-04-02 10:15",
  deliveryStart: "2026-04-23",
  deliveryEnd: "2026-04-25 23:59",
  status: "正在进行",
  // 商品
  product: "丝苗米",
  spec: "公斤",
  qty: "9000公斤",
  priceRange: "78 ~ 88 元/公斤",
  progress: 6630,
  total: 9000,
  // 供应信息
  qualityStd: "GB/T 1354 大米三等及以上，水分≤14.5%，整精米率≥65%。",
  capability: "年产能5万吨，拥有2000亩自有种植基地，通过GAP认证",
  tradeMode: "担保交易",
  settlement: "建行龙存管",
  delivery: "卖家配送",
  remark: "可提供质检报告及产地溯源证明，支持实地考察",
  files: ["供应资质证明.pdf"],
  // 联系人
  contactName: "张经理",
  contactPhone: "138****8888",
  // 询价列表汇总
  inquiryCount: 5,
  signedCount: 1,
  // 签约采购商
  buyers: [
    { company: "平远新供销天润粮油有限公司", qty: "3000公斤", price: "80元/公斤", signTime: "2026-04-21 09:30", status: "已签约" },
    { company: "广州供销数字科技有限公司",   qty: "2000公斤", price: "82元/公斤", signTime: "2026-04-20 15:00", status: "签约中" },
  ],
}

const statusColors: Record<string, { text: string; bg: string }> = {
  "正在进行":   { text: "#3a8c3f", bg: "#e8f5e9" },
  "待审核":     { text: "#e8831a", bg: "#fff4e6" },
  "驳回待修改": { text: "#e53935", bg: "#fdecea" },
  "已结束":     { text: "#666",    bg: "#f0f0f0" },
  "已关闭":     { text: "#666",    bg: "#f0f0f0" },
}

function Section({ title, accent = "#3a8c3f", children }: { title: string; accent?: string; children: React.ReactNode }) {
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

export default function GyDetailPage() {
  const d = SUPPLY
  const sc = statusColors[d.status] ?? statusColors["已结束"]
  const pct = Math.round((d.progress / d.total) * 100)

  return (
<div className="max-w-[900px] space-y-4">
        {/* 面包屑 */}
        <div className="flex items-center gap-1.5 text-[13px] text-[#999]">
          <Link href="/merchant/dingdan-nongye/gy-list" className="flex items-center gap-1 hover:text-[#3a8c3f] transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />订单种植供应
          </Link>
          <span>›</span>
          <span className="text-[#333]">供应详情</span>
        </div>

        {/* 标题卡片 */}
        <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[12px] font-semibold" style={{ color: sc.text, background: sc.bg }}>
                  {d.status}
                </span>
                <span className="text-[12px] text-[#999]">{d.id}</span>
                <span className="text-[12px] text-[#999]">发布时间：{d.publishTime}</span>
              </div>
              <h1 className="text-[18px] font-bold text-[#1a1a2e] mb-1">{d.product} · {d.priceRange}</h1>
              <p className="text-[13px] text-[#6b7c93]">{d.publisher}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {d.status === "正在进行" && (
                <Link
                  href={`/merchant/dingdan-nongye/gy-xunjia?id=${d.id}`}
                  className="flex items-center gap-1.5 px-4 h-9 bg-[#3a8c3f] text-white text-[13px] rounded hover:bg-[#2d7032] transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />查看询价（{d.inquiryCount}）
                </Link>
              )}
              {(d.status === "正在进行" || d.status === "待审核" || d.status === "驳回待修改") && (
                <Link
                  href={`/merchant/dingdan-nongye/fabu-gy?edit=${d.id}`}
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
              <span className="text-[#6b7c93]">签约进度</span>
              <span className="font-semibold text-[#3a8c3f]">{d.progress}/{d.total} {d.spec}（{pct}%）</span>
            </div>
            <div className="h-2.5 bg-[#e8edf5] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#3a8c3f] transition-all"
                style={{ width: `${Math.min(pct, 100)}%` }}
              />
            </div>
            <div className="flex items-center gap-4 mt-2 text-[12px] text-[#6b7c93]">
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
          {d.qualityStd && <div className="mt-2 pt-3 border-t border-[#f5f7fa]"><Field label="质检标准" value={d.qualityStd} /></div>}
          {d.capability && <Field label="产能说明" value={d.capability} />}
        </Section>

        {/* 卖方联系人 */}
        <Section title="卖方联系人" accent="#1a5fa8">
          <div className="grid grid-cols-2 gap-x-8">
            <Field label="发布方" value={d.publisher} />
            <Field label="联系人" value={d.contactName} />
            <Field label="联系电话" value={d.contactPhone} />
          </div>
        </Section>

        {/* 签约采购商 */}
        <Section title="签约采购商">
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
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        b.status === "已签约" ? "text-[#3a8c3f] bg-[#e8f5e9]" : "text-[#e8831a] bg-[#fff4e6]"
                      }`}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
                    <div key={i} className="flex items-center gap-2 text-[#3a8c3f] hover:underline cursor-pointer">
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
)
}
