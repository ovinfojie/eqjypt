"use client"

import Link from "next/link"
import { ChevronLeft, Edit2, XCircle, MessageCircle } from "lucide-react"

const DEMAND = {
  id: "CG20260601001",
  title: "2026年广东省大批量优质丝苗米长期采购",
  category: "粮油",
  publishTime: "2026-06-01 09:00",
  deadline: "2026-06-30",
  status: "采购中",
  // 采购信息
  product: "丝苗米",
  spec: "吨",
  qty: "50吨",
  budget: "18万元",
  deliveryAddr: "广东省广州市越秀区大东街道莱园东路78号",
  deliveryTime: "2026-06-15 至 2026-06-30",
  tradeMode: "担保交易",
  settlement: "建行龙存管",
  delivery: "卖家配送",
  qualityReq: "要求三等及以上，水分≤14%，整精米率≥65%，随货附质检报告",
  remark: "优先选择广东省内产地，有长期合作意向",
  // 联系人
  contactName: "陈经理",
  contactPhone: "135****7890",
  // 报价统计
  inquiries: 12,
  // 报价列表
  quotes: [
    { company: "惠州新供销天润粮油储备有限公司", credit: "AAA", price: "3600元/吨", qty: "50吨", deliveryTime: "2026-06-15", time: "2026-06-03 14:22", status: "待处理" },
    { company: "广州新供销天润米业有限公司",     credit: "AA",  price: "3700元/吨", qty: "45吨", deliveryTime: "2026-06-18", time: "2026-06-02 10:05", status: "待处理" },
    { company: "深圳供销农产品贸易有限公司",     credit: "A",   price: "3500元/吨", qty: "30吨", deliveryTime: "2026-06-20", time: "2026-06-02 08:40", status: "已拒绝" },
  ],
}

const statusColors: Record<string, { text: string; bg: string }> = {
  "采购中":   { text: "#1a5fa8", bg: "#e8f4fd" },
  "已完成":   { text: "#6b7c93", bg: "#f0f2f5" },
  "已关闭":   { text: "#888",    bg: "#f5f5f5" },
  "即将结束": { text: "#e8831a", bg: "#fff4e6" },
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

export default function CaigouDetailPage() {
  const d = DEMAND
  const sc = statusColors[d.status] ?? statusColors["已完成"]

  return (
<div className="max-w-[900px] space-y-4">
        {/* 面包屑 */}
        <div className="flex items-center gap-1.5 text-[13px] text-[#999]">
          <Link href="/merchant/chanxiao/caigou-list" className="flex items-center gap-1 hover:text-[#1a5fa8] transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />我的采购需求
          </Link>
          <span>›</span>
          <span className="text-[#333]">需求详情</span>
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
                <span>截止日期：{d.deadline}</span>
                <span>收到报价：<span className="text-[#e8831a] font-semibold">{d.inquiries}</span> 家</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {d.status === "采购中" && (
                <Link
                  href={`/merchant/chanxiao/fabu-caigou?edit=${d.id}`}
                  className="flex items-center gap-1.5 px-4 h-9 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
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

        {/* 采购信息 */}
        <Section title="采购信息">
          <div className="grid grid-cols-2 gap-x-8">
            <Field label="采购商品" value={d.product} />
            <Field label="规格单位" value={d.spec} />
            <Field label="采购数量" value={d.qty} />
            <Field label="预算金额" value={<span className="text-[#e8831a] font-semibold">{d.budget}</span>} />
            <Field label="收货时间" value={d.deliveryTime} />
            <Field label="收货地址" value={d.deliveryAddr} />
            <Field label="交易模式" value={d.tradeMode} />
            <Field label="结算渠道" value={d.settlement} />
            <Field label="配送方式" value={d.delivery} />
          </div>
          {d.qualityReq && <div className="mt-2 pt-3 border-t border-[#f5f7fa]"><Field label="质量要求" value={d.qualityReq} /></div>}
          {d.remark && <Field label="备注说明" value={d.remark} />}
        </Section>

        {/* 联系人 */}
        <Section title="联系人信息" accent="#3a8c3f">
          <div className="grid grid-cols-2 gap-x-8">
            <Field label="联系人" value={d.contactName} />
            <Field label="联系电话" value={d.contactPhone} />
          </div>
        </Section>

        {/* 供应商报价 */}
        <Section title={`供应商报价（${d.quotes.length}家）`} accent="#e8831a">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e8edf5] text-[12px] text-[#888]">
                {["供应商", "信用等级", "报价", "可供量", "交货时间", "报价时间", "状态", "操作"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.quotes.map((q, i) => (
                <tr key={i} className="border-b border-[#f5f7fa] last:border-0 hover:bg-[#fafcff]">
                  <td className="px-4 py-2.5 text-[#333] max-w-[180px]">
                    <div className="truncate">{q.company}</div>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`px-1.5 py-0.5 rounded text-[11px] font-semibold ${
                      q.credit === "AAA" ? "text-[#c8961a] bg-[#fff8e1]" :
                      q.credit === "AA"  ? "text-[#1a5fa8] bg-[#e8f4fd]" :
                      "text-[#666] bg-[#f0f2f5]"
                    }`}>{q.credit}</span>
                  </td>
                  <td className="px-4 py-2.5 text-[#e8831a] font-semibold">{q.price}</td>
                  <td className="px-4 py-2.5 text-[#333]">{q.qty}</td>
                  <td className="px-4 py-2.5 text-[#6b7c93]">{q.deliveryTime}</td>
                  <td className="px-4 py-2.5 text-[#6b7c93] text-[12px]">{q.time}</td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                      q.status === "待处理" ? "text-[#e8831a] bg-[#fff4e6]" : "text-[#999] bg-[#f0f0f0]"
                    }`}>{q.status}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      {q.status === "待处理" && (
                        <>
                          <button className="text-[12px] text-[#1a5fa8] hover:underline">接受</button>
                          <span className="text-[#dde3ec]">|</span>
                          <button className="text-[12px] text-[#e53935] hover:underline">拒绝</button>
                          <span className="text-[#dde3ec]">|</span>
                        </>
                      )}
                      <button className="flex items-center gap-0.5 text-[12px] text-[#6b7c93] hover:text-[#1a5fa8]">
                        <MessageCircle className="w-3.5 h-3.5" />联系
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
