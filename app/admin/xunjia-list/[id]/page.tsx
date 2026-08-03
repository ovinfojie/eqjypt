"use client"

import Link from "next/link"
import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import {
  ChevronLeft, CheckCircle, XCircle, MessageSquare,
  Phone, FileText, Clock, User, Building2,
} from "lucide-react"

const DEMAND = {
  id: "XJ20260430001",
  title: "2026年广东省内计划大量采购丝苗米",
  buyer: "盒马超市采购部",
  buyerContact: "李采购",
  buyerPhone: "135****1234",
  product: "丝苗米",
  spec: "吨",
  qty: "100吨",
  priceRange: "2800~3000元/吨",
  deadline: "2026-04-25 23:59",
  deliveryStart: "2026-05-01",
  deliveryEnd: "2026-05-15",
  prepay: "30%",
  tradeMode: "担保交易",
  settlement: "建行龙存管",
  delivery: "卖家配送",
  quoteMode: "可以修改报价",
  qualityReq: "参照GB/T 1354大米标准，要求三等及以上，水分≤14%，无异味，随货附送质检报告。",
  remark: "分3批次交货，每批约33吨，具体日期另行协商。",
  files: ["采购需求说明.pdf", "质检标准文件.docx"],
  status: "active",
  created: "2026-04-20 09:00",
  quoteCount: 3,
}

const QUOTES = [
  {
    id: "Q001",
    company: "广东新供销天润粮油集团有限公司",
    creditLevel: "AAA",
    priceMin: 2800,
    priceMax: 2900,
    supplyQty: "100吨",
    totalMin: 280000,
    totalMax: 290000,
    deliveryTime: "2026-05-01",
    qualityStd: "GB/T 1354 大米三等及以上，水分≤14%，整精米率≥65%",
    tradeMode: "担保交易",
    settlement: "建行龙存管",
    delivery: "卖家配送",
    contact: "张经理",
    phone: "138****8888",
    submitTime: "2026-04-21 14:23",
    status: "待接受",
    badge: "最优报价",
  },
  {
    id: "Q002",
    company: "广州新供销天润米业有限公司",
    creditLevel: "AA",
    priceMin: 2850,
    priceMax: 2950,
    supplyQty: "80吨",
    totalMin: 228000,
    totalMax: 236000,
    deliveryTime: "2026-05-05",
    qualityStd: "GB/T 1354 大米三等，水分≤14%",
    tradeMode: "担保交易",
    settlement: "建行龙存管",
    delivery: "卖家配送",
    contact: "李经理",
    phone: "139****6666",
    submitTime: "2026-04-21 10:05",
    status: "待接受",
    badge: "",
  },
  {
    id: "Q003",
    company: "深圳供销农产品贸易有限公司",
    creditLevel: "A",
    priceMin: 2780,
    priceMax: 3000,
    supplyQty: "60吨",
    totalMin: 166800,
    totalMax: 180000,
    deliveryTime: "2026-05-08",
    qualityStd: "GB/T 1354 大米三等",
    tradeMode: "非担保交易",
    settlement: "工行安心付",
    delivery: "买家自提",
    contact: "王经理",
    phone: "137****5555",
    submitTime: "2026-04-20 16:40",
    status: "待接受",
    badge: "",
  },
]

const AUDIT_LOG = [
  { time: "2026-04-20 09:00", action: "需求发布", operator: "盒马超市采购部", desc: "商家发布采购需求，等待平台审核" },
  { time: "2026-04-20 11:30", action: "审核通过", operator: "管理员 admin01", desc: "需求信息审核通过，状态变更为报价中" },
  { time: "2026-04-21 10:05", action: "收到报价", operator: "系统", desc: "广州新供销天润米业有限公司提交报价" },
  { time: "2026-04-21 14:23", action: "收到报价", operator: "系统", desc: "广东新供销天润粮油集团有限公司提交报价" },
]

const statusMap: Record<string, { label: string; color: string; bg: string }> = {
  pending:   { label: "待审核", color: "#e8831a", bg: "#fff7ed" },
  active:    { label: "报价中", color: "#1a5fa8", bg: "#e8f4fd" },
  completed: { label: "已完成", color: "#2e7d32", bg: "#e8f5e9" },
  cancelled: { label: "已取消", color: "#999",    bg: "#f5f5f5" },
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

export default function XunjiaDetailPage() {
  const d = DEMAND
  const st = statusMap[d.status]
  const [rejectReason, setRejectReason] = useState("")
  const [showReject, setShowReject] = useState(false)
  const [expandedQuote, setExpandedQuote] = useState<string | null>("Q001")

  return (
    <AdminLayout>
      <div className="max-w-[960px] space-y-4">
        {/* 面包屑 */}
        <div className="flex items-center gap-1.5 text-[13px] text-[#999]">
          <Link href="/admin/xunjia-list" className="flex items-center gap-1 hover:text-[#1a5fa8] transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />需求管理列表
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
                  style={{ color: st.color, background: st.bg }}>{st.label}</span>
                <span className="text-[12px] text-[#999]">{d.id}</span>
                <span className="text-[12px] text-[#999]">发布时间：{d.created}</span>
              </div>
              <h1 className="text-[18px] font-bold text-[#1a1a2e] mb-1">{d.title}</h1>
              <div className="flex items-center gap-4 text-[13px] text-[#6b7c93]">
                <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />{d.buyer}</span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{d.buyerContact}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{d.buyerPhone}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {d.status === "pending" && (
                <>
                  <button className="flex items-center gap-1.5 px-5 h-9 bg-[#2e7d32] text-white text-[13px] rounded hover:bg-[#1b5e20] transition-colors">
                    <CheckCircle className="w-4 h-4" />审核通过
                  </button>
                  <button
                    onClick={() => setShowReject(!showReject)}
                    className="flex items-center gap-1.5 px-5 h-9 bg-red-500 text-white text-[13px] rounded hover:bg-red-600 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />驳回
                  </button>
                </>
              )}
              {d.status === "active" && (
                <button className="flex items-center gap-1.5 px-5 h-9 border border-[#e8831a] text-[#e8831a] text-[13px] rounded hover:bg-[#fff4e6] transition-colors">
                  <Clock className="w-4 h-4" />催报价
                </button>
              )}
              <button className="flex items-center gap-1.5 px-5 h-9 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
                <MessageSquare className="w-4 h-4" />联系买家
              </button>
            </div>
          </div>

          {/* 驳回输入 */}
          {showReject && (
            <div className="mt-4 pt-4 border-t border-[#f0f0f0]">
              <div className="flex items-start gap-3">
                <label className="text-[13px] text-[#555] w-16 shrink-0 pt-2">驳回原因</label>
                <textarea
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                  placeholder="请填写驳回原因，将通知给买家..."
                  className="flex-1 border border-[#dde3ec] rounded px-3 py-2 text-[13px] h-16 resize-none focus:outline-none focus:border-red-300"
                />
                <div className="flex flex-col gap-2">
                  <button className="px-5 h-8 bg-red-500 text-white text-[13px] rounded hover:bg-red-600 transition-colors">确认驳回</button>
                  <button onClick={() => setShowReject(false)} className="px-5 h-8 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-[#1a5fa8] transition-colors">取消</button>
                </div>
              </div>
            </div>
          )}

          {/* 统计数字 */}
          <div className="mt-4 pt-4 border-t border-[#f0f0f0] grid grid-cols-4 gap-4">
            {[
              { label: "采购数量", value: d.qty, color: "#1a5fa8" },
              { label: "报价截止", value: d.deadline.split(" ")[0], color: "#333" },
              { label: "收到报价", value: `${d.quoteCount} 个`, color: "#e8831a" },
              { label: "交货时间", value: `${d.deliveryStart}`, color: "#333" },
            ].map(item => (
              <div key={item.label} className="text-center">
                <div className="text-[12px] text-[#999] mb-1">{item.label}</div>
                <div className="text-[15px] font-bold" style={{ color: item.color }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 需求信息 */}
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
          {d.qualityReq && (
            <div className="mt-2 pt-3 border-t border-[#f5f7fa]">
              <Field label="质量要求" value={d.qualityReq} />
              {d.remark && <Field label="备注说明" value={d.remark} />}
            </div>
          )}
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

        {/* 报价列表 */}
        <Section title={`供应商报价列表（共 ${QUOTES.length} 个）`} accent="#e8831a">
          <div className="space-y-3">
            {QUOTES.map(q => {
              const isExpanded = expandedQuote === q.id
              return (
                <div key={q.id} className={`border rounded-lg overflow-hidden transition-all ${isExpanded ? "border-[#1a5fa8]" : "border-[#e8edf5]"}`}>
                  <div
                    className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#fafcff]"
                    onClick={() => setExpandedQuote(isExpanded ? null : q.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[14px] font-semibold text-[#333]">{q.company}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[11px] font-semibold ${
                          q.creditLevel === "AAA" ? "bg-[#fff8e1] text-[#c8961a]"
                          : q.creditLevel === "AA" ? "bg-[#e8f5e9] text-[#2e7d32]"
                          : "bg-[#f5f5f5] text-[#888]"
                        }`}>{q.creditLevel}</span>
                        {q.badge && (
                          <span className="px-1.5 py-0.5 rounded text-[11px] bg-[#e8f4fd] text-[#1a5fa8] font-medium">{q.badge}</span>
                        )}
                      </div>
                      <div className="text-[12px] text-[#999]">报价时间：{q.submitTime}</div>
                    </div>
                    <div className="text-center shrink-0">
                      <div className="text-[15px] font-bold text-[#e8831a]">{q.priceMin}~{q.priceMax} 元/吨</div>
                      <div className="text-[12px] text-[#999]">报价区间</div>
                    </div>
                    <div className="text-center shrink-0">
                      <div className="text-[14px] font-semibold text-[#333]">{q.supplyQty}</div>
                      <div className="text-[12px] text-[#999]">可供应量</div>
                    </div>
                    <div className="text-center shrink-0">
                      <div className="text-[14px] font-semibold text-[#333]">{q.deliveryTime}</div>
                      <div className="text-[12px] text-[#999]">交货时间</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] bg-[#e8f4fd] text-[#1a5fa8] shrink-0">{q.status}</span>
                  </div>
                  {isExpanded && (
                    <div className="border-t border-[#f0f0f0] bg-[#fafcff] p-4">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[13px] mb-3">
                        {[
                          ["质检标准", q.qualityStd],
                          ["交易模式", q.tradeMode],
                          ["结算渠道", q.settlement],
                          ["配送方式", q.delivery],
                          ["联系人", `${q.contact}  ${q.phone}`],
                          ["预计总额", `${q.totalMin.toLocaleString()} ~ ${q.totalMax.toLocaleString()} 元`],
                        ].map(([k, v]) => (
                          <div key={k} className="flex gap-2">
                            <span className="text-[#999] w-16 shrink-0">{k}</span>
                            <span className="text-[#555]">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Section>

        {/* 操作日志 */}
        <Section title="操作日志" accent="#6b7c93">
          <div className="space-y-0">
            {AUDIT_LOG.map((log, i) => (
              <div key={i} className="flex gap-4 pb-4 last:pb-0 relative">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1a5fa8] mt-1 shrink-0 z-10" />
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
