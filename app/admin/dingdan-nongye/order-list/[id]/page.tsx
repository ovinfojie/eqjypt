"use client"

import Link from "next/link"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ChevronLeft, FileText, Building2, User, Phone, AlertTriangle } from "lucide-react"

const ORDER = {
  id: "HT20260501001",
  xqId: "XQ20260501001",
  gyId: "GY20260501001",
  signTime: "2026-04-21 09:30",
  status: "履约中",
  // 买方
  buyer: "平远新供销天润粮油有限公司",
  buyerDept: "粮油业务部",
  buyerContact: "陈经理",
  buyerPhone: "135****7890",
  // 卖方
  seller: "惠州新供销天润粮油储备有限公司",
  sellerContact: "张经理",
  sellerPhone: "138****8888",
  // 商品
  product: "丝苗米",
  spec: "公斤",
  qty: "3000公斤",
  price: "82元/公斤",
  amount: 246000,
  prepayRatio: "30%",
  prepayAmount: 73800,
  qualityStd: "GB/T 1354 大米三等及以上，水分≤14%，整精米率≥65%",
  tradeMode: "担保交易",
  settlement: "建行龙存管",
  delivery: "卖家配送",
  deliveryAddr: "广东省梅州市平远县新供销粮油仓储基地",
  deliveryTime: "2026-04-23",
  // 合同文件
  files: ["订单种植合同HT20260501001.pdf"],
  // 付款记录
  payments: [
    { time: "2026-04-21 10:00", type: "预付款（30%）", amount: 73800, status: "已支付", channel: "建行龙存管" },
  ],
  // 履约进度
  timeline: [
    { time: "2026-04-21 09:30", event: "合同签署", desc: "买卖双方完成电子签署，合同生效", done: true },
    { time: "2026-04-21 10:00", event: "预付款支付", desc: "买方通过建行龙存管支付预付款 73,800 元", done: true },
    { time: "2026-04-23", event: "卖方发货", desc: "卖方按约定日期发货，提供物流单号", done: false },
    { time: "2026-04-25", event: "买方收货", desc: "买方完成收货验收，确认质量合格", done: false },
    { time: "2026-04-26", event: "尾款结算", desc: "平台释放监管资金，完成尾款支付", done: false },
  ],
}

const statusColors: Record<string, { color: string; bg: string }> = {
  "待付款":   { color: "#e8831a", bg: "#fff7ed" },
  "履约中":   { color: "#1a5fa8", bg: "#e8f4fd" },
  "已完成":   { color: "#2e7d32", bg: "#e8f5e9" },
  "纠纷处理": { color: "#e53935", bg: "#fdecea" },
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
      <span className="text-[#999] w-28 shrink-0 text-right">{label}</span>
      <span className="text-[#333] flex-1">{value}</span>
    </div>
  )
}

export default function AdminOrderDetailPage() {
  const d = ORDER
  const sc = statusColors[d.status] ?? { color: "#999", bg: "#f5f5f5" }

  return (
    <AdminLayout>
      <div className="max-w-[960px] space-y-4">
        {/* 面包屑 */}
        <div className="flex items-center gap-1.5 text-[13px] text-[#999]">
          <Link href="/admin/dingdan-nongye/order-list" className="flex items-center gap-1 hover:text-[#1a5fa8] transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />已成交订单管理
          </Link>
          <span>›</span>
          <span className="text-[#333]">订单详情</span>
        </div>

        {/* 标题卡 */}
        <div className="bg-white rounded-lg border border-[#dde3ec] p-5">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[12px] font-semibold"
                  style={{ color: sc.color, background: sc.bg }}>{d.status}</span>
                <span className="text-[14px] font-bold text-[#1a1a2e]">合同编号：{d.id}</span>
                <span className="text-[12px] text-[#999]">签约时间：{d.signTime}</span>
              </div>
              <div className="flex items-center gap-6 text-[13px] text-[#6b7c93]">
                <span>关联需求：
                  <Link href={`/admin/dingdan-nongye/xq-list/${d.xqId}`} className="text-[#1a5fa8] hover:underline ml-1">{d.xqId}</Link>
                </span>
                <span>关联供应：
                  <Link href={`/admin/dingdan-nongye/gy-list/${d.gyId}`} className="text-[#3a8c3f] hover:underline ml-1">{d.gyId}</Link>
                </span>
              </div>
            </div>
            {d.status === "履约中" && (
              <button className="flex items-center gap-1.5 px-5 h-9 border border-red-300 text-red-500 text-[13px] rounded hover:bg-red-50 transition-colors">
                <AlertTriangle className="w-4 h-4" />标记纠纷
              </button>
            )}
          </div>

          {/* 金额概况 */}
          <div className="grid grid-cols-4 gap-4 bg-[#f5f7fa] rounded-lg p-4">
            {[
              { label: "成交商品", value: `${d.product}（${d.spec}）`, color: "#333" },
              { label: "成交数量", value: d.qty, color: "#1a5fa8" },
              { label: "成交单价", value: d.price, color: "#e8831a" },
              { label: "合同金额", value: `${(d.amount / 10000).toFixed(2)} 万元`, color: "#e8831a" },
            ].map(item => (
              <div key={item.label} className="text-center">
                <div className="text-[12px] text-[#999] mb-1">{item.label}</div>
                <div className="text-[16px] font-bold" style={{ color: item.color }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* 买方信息 */}
          <Section title="买方信息">
            <Field label="买方企业" value={
              <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-[#999]" />{d.buyer}（{d.buyerDept}）</span>
            } />
            <Field label="联系人" value={
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#999]" />{d.buyerContact}</span>
            } />
            <Field label="联系电话" value={
              <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#999]" />{d.buyerPhone}</span>
            } />
          </Section>

          {/* 卖方信息 */}
          <Section title="卖方信息" accent="#3a8c3f">
            <Field label="卖方企业" value={
              <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-[#999]" />{d.seller}</span>
            } />
            <Field label="联系人" value={
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#999]" />{d.sellerContact}</span>
            } />
            <Field label="联系电话" value={
              <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#999]" />{d.sellerPhone}</span>
            } />
          </Section>
        </div>

        {/* 合同条款 */}
        <Section title="合同条款">
          <div className="grid grid-cols-2 gap-x-8">
            <Field label="商品品种" value={d.product} />
            <Field label="规格单位" value={d.spec} />
            <Field label="成交数量" value={d.qty} />
            <Field label="成交单价" value={<span className="text-[#e8831a] font-semibold">{d.price}</span>} />
            <Field label="合同金额" value={<span className="font-bold text-[#1a1a2e]">{d.amount.toLocaleString()} 元</span>} />
            <Field label="预付款比例" value={`${d.prepayRatio}（${d.prepayAmount.toLocaleString()} 元）`} />
            <Field label="交易模式" value={d.tradeMode} />
            <Field label="结算渠道" value={d.settlement} />
            <Field label="配送方式" value={d.delivery} />
            <Field label="交货日期" value={d.deliveryTime} />
          </div>
          <div className="mt-2 pt-3 border-t border-[#f5f7fa]">
            <Field label="收货地址" value={d.deliveryAddr} />
            <Field label="质检标准" value={d.qualityStd} />
          </div>
          {d.files.length > 0 && (
            <div className="mt-2 pt-3 border-t border-[#f5f7fa] flex gap-3 text-[13px]">
              <span className="text-[#999] w-28 shrink-0 text-right">合同文件</span>
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

        {/* 付款记录 */}
        <Section title="付款记录" accent="#e8831a">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e8edf5] text-[12px] text-[#888]">
                {["付款时间", "付款类型", "金额（元）", "结算渠道", "状态"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.payments.map((p, i) => (
                <tr key={i} className="border-b border-[#f5f7fa] last:border-0 hover:bg-[#fafcff]">
                  <td className="px-4 py-2.5 text-[#6b7c93]">{p.time}</td>
                  <td className="px-4 py-2.5 text-[#333]">{p.type}</td>
                  <td className="px-4 py-2.5 font-bold text-[#e8831a]">{p.amount.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-[#6b7c93]">{p.channel}</td>
                  <td className="px-4 py-2.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium text-[#2e7d32] bg-[#e8f5e9]">{p.status}</span>
                  </td>
                </tr>
              ))}
              <tr className="bg-[#f8fafc]">
                <td colSpan={2} className="px-4 py-2.5 text-[13px] font-semibold text-[#555] text-right">尾款（待结算）</td>
                <td className="px-4 py-2.5 font-bold text-[#1a5fa8]">{(d.amount - d.prepayAmount).toLocaleString()}</td>
                <td colSpan={2} className="px-4 py-2.5 text-[12px] text-[#999]">履约完成后通过建行龙存管释放</td>
              </tr>
            </tbody>
          </table>
        </Section>

        {/* 履约进度时间轴 */}
        <Section title="履约进度" accent="#6b7c93">
          <div className="relative pl-4">
            {d.timeline.map((step, i) => (
              <div key={i} className="flex gap-4 pb-5 last:pb-0 relative">
                <div className="flex flex-col items-center absolute left-[-16px]">
                  <div className={`w-3 h-3 rounded-full border-2 mt-0.5 shrink-0 z-10 ${
                    step.done ? "bg-[#2e7d32] border-[#2e7d32]" : "bg-white border-[#dde3ec]"
                  }`} />
                  {i < d.timeline.length - 1 && (
                    <div className={`w-0.5 flex-1 mt-1 ${step.done ? "bg-[#2e7d32]" : "bg-[#e8edf5]"}`} style={{ minHeight: 32 }} />
                  )}
                </div>
                <div className={`flex-1 pb-1 pl-2 ${step.done ? "" : "opacity-50"}`}>
                  <div className="flex items-center gap-3 mb-0.5">
                    <span className={`text-[13px] font-semibold ${step.done ? "text-[#2e7d32]" : "text-[#999]"}`}>{step.event}</span>
                    <span className="text-[12px] text-[#999]">{step.time}</span>
                  </div>
                  <div className="text-[13px] text-[#6b7c93]">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </AdminLayout>
  )
}
