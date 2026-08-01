"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Star, MessageCircle, Phone, ChevronDown, ChevronUp } from "lucide-react"

const demand = {
  id: "DD20260001",
  title: "2026年广东省内计划大量采购丝苗米",
  publisher: "平远新供销天润粮油有限公司（粮油业务部）",
  product: "丝苗米",
  spec: "公斤",
  qty: "9000公斤",
  deadline: "2026-04-25",
  deliveryStart: "2026-04-23",
  deliveryEnd: "2026-04-25",
  prepay: "30%",
  tradeMode: "担保交易",
  settlement: "建行龙存管",
  delivery: "卖家配送",
  quoteMode: "可以修改报价",
  budget: "78,000 元",
  status: "报价中",
}

const quotes = [
  {
    id: "Q001",
    company: "惠州新供销天润粮油储备有限公司",
    creditLevel: "AAA",
    priceMin: 2.70,
    priceMax: 3.20,
    unit: "元/公斤",
    supplyQty: "9000公斤",
    totalMin: 24300,
    totalMax: 28800,
    deliveryTime: "2026-04-23",
    qualityStd: "GB/T 1354 大米三等及以上，水分≤14.5%，整精米率≥65%",
    capability: "年产能5万吨，拥有2000亩自有种植基地，通过GAP认证",
    tradeMode: "担保交易",
    settlement: "建行龙存管",
    delivery: "卖家配送",
    remark: "可提供质检报告及产地溯源证明，支持实地考察",
    contact: "张经理",
    phone: "138****8888",
    submitTime: "2026-04-20 14:23",
    badge: "最优报价",
    selected: false,
    expanded: true,
  },
  {
    id: "Q002",
    company: "广州新供销天润米业有限公司",
    creditLevel: "AA",
    priceMin: 2.85,
    priceMax: 3.30,
    unit: "元/公斤",
    supplyQty: "8000公斤",
    totalMin: 22800,
    totalMax: 26400,
    deliveryTime: "2026-04-22",
    qualityStd: "GB/T 1354 大米二等及以上，水分≤14%",
    capability: "年产能3万吨，广东省农业龙头企业",
    tradeMode: "担保交易",
    settlement: "建行龙存管",
    delivery: "卖家配送",
    remark: "货源充足，可按需分批配送",
    contact: "李经理",
    phone: "139****6666",
    submitTime: "2026-04-19 10:05",
    badge: "响应最快",
    selected: false,
    expanded: false,
  },
  {
    id: "Q003",
    company: "深圳供销农产品贸易有限公司",
    creditLevel: "A",
    priceMin: 2.60,
    priceMax: 3.00,
    unit: "元/公斤",
    supplyQty: "5000公斤",
    totalMin: 13000,
    totalMax: 15000,
    deliveryTime: "2026-04-24",
    qualityStd: "GB/T 1354 大米三等，水分≤14.5%",
    capability: "年产能1.5万吨",
    tradeMode: "非担保交易",
    settlement: "工行安心付",
    delivery: "买家自提",
    remark: "价格有弹性，欢迎议价",
    contact: "王经理",
    phone: "137****5555",
    submitTime: "2026-04-18 16:40",
    badge: "",
    selected: false,
    expanded: false,
  },
]

const creditColors: Record<string, string> = {
  "AAA": "text-[#c8961a] bg-[#fff8e1]",
  "AA": "text-[#1a5fa8] bg-[#e8f4fd]",
  "A": "text-[#555] bg-[#f0f0f0]",
}

export default function XqBaojiaListPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ Q001: true })
  const [selected, setSelected] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"price" | "time" | "credit">("price")

  const sorted = [...quotes].sort((a, b) => {
    if (sortBy === "price") return a.priceMin - b.priceMin
    if (sortBy === "credit") return b.creditLevel.localeCompare(a.creditLevel)
    return a.submitTime.localeCompare(b.submitTime)
  })

  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-[13px] text-[#999] mb-4 flex items-center gap-1">
        <Link href="/merchant/dingdan-nongye/xq-list" className="flex items-center gap-1 hover:text-[#1a5fa8] transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" /> 订单种植需求
        </Link>
        <span className="mx-1">›</span>
        <span className="text-[#333]">查看报价</span>
      </div>

      {/* Demand summary card */}
      <div className="bg-white border border-[#e8edf5] rounded-lg p-4 mb-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 rounded text-[11px] bg-[#e8f4fd] text-[#1a5fa8] font-medium">{demand.status}</span>
              <span className="text-[12px] text-[#999]">{demand.id}</span>
            </div>
            <h2 className="text-[15px] font-semibold text-[#333] mb-1">{demand.title}</h2>
            <p className="text-[12px] text-[#888]">{demand.publisher}</p>
          </div>
          <div className="flex items-center gap-6 shrink-0 text-center">
            {[
              { label: "需求数量", value: demand.qty },
              { label: "预算金额", value: demand.budget },
              { label: "报价截止", value: demand.deadline },
              { label: "收货时间", value: `${demand.deliveryStart} 至 ${demand.deliveryEnd}` },
            ].map(item => (
              <div key={item.label}>
                <div className="text-[12px] text-[#999] mb-0.5">{item.label}</div>
                <div className="text-[13px] font-semibold text-[#333]">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quote list */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-semibold text-[#333]">收到报价</span>
          <span className="px-2 py-0.5 rounded-full bg-[#1a5fa8] text-white text-[12px] font-semibold">{quotes.length}</span>
          <span className="text-[13px] text-[#999]">条</span>
        </div>
        <div className="flex items-center gap-2 text-[13px]">
          <span className="text-[#666]">排序：</span>
          {[
            { key: "price" as const, label: "价格最低" },
            { key: "time" as const, label: "最新报价" },
            { key: "credit" as const, label: "信用最高" },
          ].map(s => (
            <button
              key={s.key}
              onClick={() => setSortBy(s.key)}
              className={`px-3 h-7 rounded text-[12px] transition-colors ${
                sortBy === s.key
                  ? "bg-[#1a5fa8] text-white"
                  : "border border-[#dde3ec] text-[#666] hover:border-[#1a5fa8] hover:text-[#1a5fa8]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {sorted.map((q) => {
          const isExpanded = expanded[q.id]
          const isSelected = selected === q.id

          return (
            <div
              key={q.id}
              className={`bg-white border rounded-lg overflow-hidden transition-all ${
                isSelected ? "border-[#1a5fa8] shadow-[0_0_0_2px_rgba(26,95,168,0.15)]" : "border-[#e8edf5]"
              }`}
            >
              {/* Quote header row */}
              <div className="p-4 flex items-center gap-4">
                {/* Radio select */}
                <button
                  onClick={() => setSelected(isSelected ? null : q.id)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? "border-[#1a5fa8] bg-[#1a5fa8]" : "border-[#dde3ec] hover:border-[#1a5fa8]"
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </button>

                {/* Company info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[14px] font-semibold text-[#333] truncate">{q.company}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[11px] font-semibold ${creditColors[q.creditLevel]}`}>
                      {q.creditLevel}
                    </span>
                    {q.badge && (
                      <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#fff4e6] text-[#e8831a] text-[11px] font-semibold">
                        <Star className="w-3 h-3 fill-[#e8831a]" />
                        {q.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-[12px] text-[#999]">报价时间：{q.submitTime}</div>
                </div>

                {/* Price */}
                <div className="text-center shrink-0">
                  <div className="text-[18px] font-bold text-[#e8831a]">
                    {q.priceMin.toFixed(2)} ~ {q.priceMax.toFixed(2)}
                  </div>
                  <div className="text-[12px] text-[#999]">{q.unit}</div>
                </div>

                {/* Supply qty */}
                <div className="text-center shrink-0">
                  <div className="text-[14px] font-semibold text-[#333]">{q.supplyQty}</div>
                  <div className="text-[12px] text-[#999]">可供应量</div>
                </div>

                {/* Delivery */}
                <div className="text-center shrink-0">
                  <div className="text-[14px] font-semibold text-[#333]">{q.deliveryTime}</div>
                  <div className="text-[12px] text-[#999]">交货时间</div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button className="flex items-center gap-1 px-3 h-8 border border-[#dde3ec] text-[#666] text-[12px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                    联系
                  </button>
                  <button className="flex items-center gap-1 px-3 h-8 border border-[#dde3ec] text-[#666] text-[12px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" />
                    沟通
                  </button>
                  <button
                    onClick={() => setExpanded(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                    className="flex items-center gap-1 px-3 h-8 border border-[#dde3ec] text-[#666] text-[12px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    {isExpanded ? "收起" : "展开"}
                  </button>
                </div>
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="border-t border-[#f0f0f0] bg-[#fafcff] px-4 py-3">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[13px] mb-3">
                    {[
                      ["质检标准", q.qualityStd],
                      ["产能说明", q.capability],
                      ["交易模式", q.tradeMode],
                      ["结算渠道", q.settlement],
                      ["配送方式", q.delivery],
                      ["联系人", `${q.contact} ${q.phone}`],
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-2">
                        <span className="text-[#999] w-16 shrink-0">{k}</span>
                        <span className="text-[#555]">{v}</span>
                      </div>
                    ))}
                  </div>
                  {q.remark && (
                    <div className="flex gap-2 text-[13px]">
                      <span className="text-[#999] w-16 shrink-0">备注说明</span>
                      <span className="text-[#555]">{q.remark}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Bottom action bar */}
      <div className={`mt-6 transition-all ${selected ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
        <div className="bg-white border border-[#e8edf5] rounded-lg p-4 flex items-center justify-between">
          <div className="text-[13px] text-[#666]">
            {selected
              ? `已选择：${quotes.find(q => q.id === selected)?.company}`
              : "请选择一家供应商后接单"}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelected(null)}
              className="px-6 h-9 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
            >
              取消选择
            </button>
            <Link
              href={`/merchant/dingdan-nongye/jieshou-dingdan?quoteId=${selected}`}
              className="px-8 h-9 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors flex items-center"
            >
              确认接单 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
