"use client"

import Link from "next/link"
import { ChevronLeft, Edit2, XCircle, MessageCircle } from "lucide-react"

const SUPPLY = {
  id: "XS20260601001",
  title: "2026年新产丰两优大米大量供应",
  category: "粮油",
  publishTime: "2026-06-01 10:00",
  validUntil: "2026-08-31",
  status: "销售中",
  // 商品信息
  product: "丰两优大米",
  spec: "斤",
  qty: "300吨",
  price: "2.8 ~ 3.2 元/斤",
  origin: "广东省韶关市曲江区",
  deliveryTime: "下单后7天内发货",
  deliveryAddr: "可全国配送，起送量1吨",
  tradeMode: "担保交易",
  settlement: "建行龙存管",
  delivery: "卖家配送（含运费）",
  qualityStd: "GB/T 1354-2018 二等及以上，水分≤13.5%",
  remark: "可提供产地证明及质检报告，欢迎实地考察",
  // 联系人
  contactName: "张经理",
  contactPhone: "138****8888",
  // 询价统计
  inquiries: 8,
  // 采购商询价列表
  inquiryList: [
    { company: "盒马超市采购部",     qty: "10吨",  time: "2026-06-05 14:22", status: "已回复", phone: "020-8899****" },
    { company: "永辉超市广州采购中心", qty: "20吨",  time: "2026-06-04 10:05", status: "待回复", phone: "020-7788****" },
    { company: "广百集团采购中心",    qty: "5吨",   time: "2026-06-03 08:40", status: "已回复", phone: "020-6677****" },
  ],
}

const statusColors: Record<string, { text: string; bg: string }> = {
  "销售中":   { text: "#3a8c3f", bg: "#f0fdf4" },
  "即将结束": { text: "#e8831a", bg: "#fff4e6" },
  "已完成":   { text: "#6b7c93", bg: "#f0f2f5" },
  "已关闭":   { text: "#888",    bg: "#f5f5f5" },
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

export default function XiaoshouDetailPage() {
  const d = SUPPLY
  const sc = statusColors[d.status] ?? statusColors["已完成"]

  return (
<div className="max-w-[900px] space-y-4">
        {/* 面包屑 */}
        <div className="flex items-center gap-1.5 text-[13px] text-[#999]">
          <Link href="/merchant/chanxiao/xiaoshou-list" className="flex items-center gap-1 hover:text-[#3a8c3f] transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />我的销售信息
          </Link>
          <span>›</span>
          <span className="text-[#333]">销售详情</span>
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
                <span className="text-[12px] text-[#999]">发布：{d.publishTime}</span>
              </div>
              <h1 className="text-[18px] font-bold text-[#1a1a2e] mb-1">{d.title}</h1>
              <div className="flex items-center gap-4 text-[13px] text-[#6b7c93]">
                <span>分类：{d.category}</span>
                <span>有效期至：{d.validUntil}</span>
                <span>收到询价：<span className="text-[#e8831a] font-semibold">{d.inquiries}</span> 次</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {d.status === "销售中" && (
                <Link
                  href={`/merchant/chanxiao/fabu-xiaoshou?edit=${d.id}`}
                  className="flex items-center gap-1.5 px-4 h-9 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-[#3a8c3f] hover:text-[#3a8c3f] transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />编辑
                </Link>
              )}
              {d.status !== "已完成" && d.status !== "已关闭" && (
                <button className="flex items-center gap-1.5 px-4 h-9 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-red-300 hover:text-red-500 transition-colors">
                  <XCircle className="w-3.5 h-3.5" />关闭
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 商品信息 */}
        <Section title="商品信息">
          <div className="grid grid-cols-2 gap-x-8">
            <Field label="商品名称" value={d.product} />
            <Field label="规格单位" value={d.spec} />
            <Field label="供应数量" value={d.qty} />
            <Field label="销售价格" value={<span className="text-[#e8831a] font-semibold">{d.price}</span>} />
            <Field label="产地" value={d.origin} />
            <Field label="发货时间" value={d.deliveryTime} />
            <Field label="配送范围" value={d.deliveryAddr} />
            <Field label="交易模式" value={d.tradeMode} />
            <Field label="结算渠道" value={d.settlement} />
            <Field label="配送方式" value={d.delivery} />
          </div>
          {d.qualityStd && <div className="mt-2 pt-3 border-t border-[#f5f7fa]"><Field label="质检标准" value={d.qualityStd} /></div>}
          {d.remark && <Field label="备注说明" value={d.remark} />}
        </Section>

        {/* 联系人 */}
        <Section title="卖方联系人" accent="#1a5fa8">
          <div className="grid grid-cols-2 gap-x-8">
            <Field label="联系人" value={d.contactName} />
            <Field label="联系电话" value={d.contactPhone} />
          </div>
        </Section>

        {/* 采购商询价记录 */}
        <Section title={`采购商询价（${d.inquiryList.length}条）`} accent="#e8831a">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e8edf5] text-[12px] text-[#888]">
                {["采购方", "询价数量", "询价时间", "状态", "操作"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.inquiryList.map((q, i) => (
                <tr key={i} className="border-b border-[#f5f7fa] last:border-0 hover:bg-[#fafcff]">
                  <td className="px-4 py-2.5 text-[#333]">{q.company}</td>
                  <td className="px-4 py-2.5 text-[#333]">{q.qty}</td>
                  <td className="px-4 py-2.5 text-[#6b7c93] text-[12px]">{q.time}</td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                      q.status === "待回复" ? "text-[#e8831a] bg-[#fff4e6]" : "text-[#3a8c3f] bg-[#e8f5e9]"
                    }`}>{q.status}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      {q.status === "待回复" && (
                        <>
                          <button className="text-[12px] text-[#1a5fa8] hover:underline">回复报价</button>
                          <span className="text-[#dde3ec]">|</span>
                        </>
                      )}
                      <button className="flex items-center gap-0.5 text-[12px] text-[#6b7c93] hover:text-[#3a8c3f]">
                        <MessageCircle className="w-3.5 h-3.5" />沟通
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      </div>
)
}
