"use client"

import { useState } from "react"
import { MerchantLayout } from "@/components/merchant/merchant-layout"
import {
  ShieldCheck, TrendingUp, Clock, CheckCircle, XCircle,
  FileText, ChevronRight, Landmark, AlertCircle,
} from "lucide-react"

const CREDIT_ITEMS = [
  { label: "交易总笔数",    value: "1,286 笔",   trend: "+12%", good: true  },
  { label: "按时履约率",    value: "98.4%",       trend: "+0.3%", good: true },
  { label: "平均交易金额",  value: "¥ 23,500",   trend: "+8%",  good: true  },
  { label: "投诉纠纷率",    value: "0.2%",        trend: "-0.1%", good: true },
]

const LOANS = [
  { id: "1", product: "供销惠农贷", bank: "广东农村信用合作联社", amount: "80万元", status: "还款中", rate: "3.65%", dueDate: "2026-12-15", paid: 6, total: 12 },
  { id: "2", product: "订单农业专项贷", bank: "邮储银行", amount: "50万元", status: "已结清", rate: "3.85%", dueDate: "2025-06-10", paid: 18, total: 18 },
]

const HISTORY = [
  { date: "2026-07-28", type: "交易记录", desc: "完成采购订单 #PO-20260728，金额 ¥ 125,000，按时履约", score: "+2" },
  { date: "2026-07-15", type: "信用更新", desc: "月度信用评分更新，综合评分上升 3 分", score: "+3" },
  { date: "2026-06-30", type: "交易记录", desc: "完成销售订单 #SO-20260630，金额 ¥ 88,500，准时发货", score: "+1" },
  { date: "2026-06-20", type: "认证更新", desc: "企业营业执照年审通过，资质认证信息更新", score: "+2" },
  { date: "2026-05-31", type: "信用更新", desc: "月度信用评分更新，综合评分上升 5 分", score: "+5" },
]

export default function XinyongDanganPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "loans" | "history">("overview")

  return (
    <MerchantLayout>
      <div className="space-y-5">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-bold text-[#1a1a2e]">我的信用档案</h1>
            <p className="text-[13px] text-[#888] mt-0.5">基于平台交易数据的综合信用评分与金融服务记录</p>
          </div>
          <button className="px-4 py-2 bg-[#1a5fa8] text-white text-[13px] rounded font-medium hover:bg-[#1550a0] transition-colors">
            申请信用评估
          </button>
        </div>

        {/* Score card */}
        <div className="bg-gradient-to-r from-[#0d3b6e] to-[#1a5fa8] rounded-xl p-6 text-white">
          <div className="flex items-start gap-8">
            <div className="text-center">
              <div className="text-[13px] text-white/70 mb-1">供销农信分</div>
              <div className="text-[64px] font-bold leading-none">826</div>
              <div className="mt-2 inline-block px-3 py-1 bg-[#4dd0a0]/25 text-[#4dd0a0] text-[12px] rounded-full font-medium">
                AA 优质信用
              </div>
            </div>
            <div className="flex-1 border-l border-white/20 pl-8">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {[
                  { label: "信用等级", value: "AA", sub: "全平台前 8%" },
                  { label: "可申请额度", value: "300万元", sub: "最高授信" },
                  { label: "合作机构", value: "8家", sub: "已授权查询" },
                  { label: "下次更新", value: "2026-09-01", sub: "每月1日更新" },
                ].map(item => (
                  <div key={item.label}>
                    <div className="text-[12px] text-white/60">{item.label}</div>
                    <div className="text-[18px] font-bold mt-0.5">{item.value}</div>
                    <div className="text-[11px] text-white/50">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="shrink-0">
              <div className="w-36 bg-white/10 rounded-xl p-4 text-center">
                <div className="text-[12px] text-white/70 mb-2">评分分布</div>
                {[
                  { range: "900+", label: "卓越", pct: 5,  active: false },
                  { range: "800-900", label: "优质", pct: 22, active: true  },
                  { range: "700-800", label: "良好", pct: 38, active: false },
                  { range: "600-700", label: "一般", pct: 25, active: false },
                  { range: "<600",    label: "较差", pct: 10, active: false },
                ].map(r => (
                  <div key={r.range} className={`flex items-center gap-2 mb-1.5 text-[11px] ${r.active ? "text-[#4dd0a0]" : "text-white/50"}`}>
                    <div className={`h-1.5 rounded-full transition-all ${r.active ? "bg-[#4dd0a0]" : "bg-white/20"}`} style={{ width: `${r.pct * 1.2}px` }} />
                    <span>{r.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-[#dde3ec]">
          {([["overview", "信用概览"], ["loans", "贷款记录"], ["history", "评分历史"]] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2.5 text-[14px] font-medium border-b-2 transition-colors ${
                activeTab === key
                  ? "border-[#1a5fa8] text-[#1a5fa8]"
                  : "border-transparent text-[#666] hover:text-[#1a5fa8]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-white rounded-xl border border-[#e8edf5] p-5">
              <h3 className="text-[15px] font-bold text-[#1a1a2e] mb-4">信用数据来源</h3>
              <div className="space-y-3">
                {CREDIT_ITEMS.map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-[13px] text-[#555]">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold text-[#1a1a2e]">{item.value}</span>
                      <span className={`text-[12px] ${item.good ? "text-[#3a8c3f]" : "text-[#d9534f]"}`}>{item.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-[#e8edf5] p-5">
              <h3 className="text-[15px] font-bold text-[#1a1a2e] mb-4">可申请金融产品</h3>
              <div className="space-y-2.5">
                {[
                  { name: "供销惠农贷", bank: "农信社", amount: "最高200万", type: "贷款" },
                  { name: "农产品价格险", bank: "中华联合", amount: "保额100万", type: "保险" },
                  { name: "农业经营担保", bank: "省农担", amount: "最高1000万", type: "担保" },
                ].map(p => (
                  <div key={p.name} className="flex items-center justify-between p-3 bg-[#f8fafc] rounded-lg border border-[#e8edf5] hover:border-[#1a5fa8]/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#e8f4fd] flex items-center justify-center">
                        <Landmark className="w-4 h-4 text-[#1a5fa8]" />
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-[#1a1a2e]">{p.name}</div>
                        <div className="text-[11px] text-[#888]">{p.bank} · {p.type}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-[#1a5fa8]">{p.amount}</span>
                      <ChevronRight className="w-4 h-4 text-[#bbb]" />
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-3 w-full text-center text-[13px] text-[#1a5fa8] font-medium hover:underline">
                查看全部金融产品 →
              </button>
            </div>
          </div>
        )}

        {activeTab === "loans" && (
          <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
            <table className="w-full text-[13px]">
              <thead className="bg-[#f8fafc] border-b border-[#e8edf5]">
                <tr>
                  {["产品名称", "合作机构", "贷款金额", "利率", "状态", "到期日", "还款进度"].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-[#555]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f4f8]">
                {LOANS.map(l => (
                  <tr key={l.id} className="hover:bg-[#f8fafc]">
                    <td className="px-4 py-3.5 font-medium text-[#1a1a2e]">{l.product}</td>
                    <td className="px-4 py-3.5 text-[#666]">{l.bank}</td>
                    <td className="px-4 py-3.5 font-semibold text-[#1a5fa8]">{l.amount}</td>
                    <td className="px-4 py-3.5 text-[#e65c00]">{l.rate}</td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                        l.status === "还款中" ? "bg-[#e8f4fd] text-[#1a5fa8]" : "bg-[#e8fdf0] text-[#3a8c3f]"
                      }`}>{l.status}</span>
                    </td>
                    <td className="px-4 py-3.5 text-[#666]">{l.dueDate}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-[#e8edf5] rounded-full h-1.5">
                          <div
                            className="bg-[#1a5fa8] h-1.5 rounded-full"
                            style={{ width: `${(l.paid / l.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-[#888]">{l.paid}/{l.total}期</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "history" && (
          <div className="bg-white rounded-xl border border-[#e8edf5] divide-y divide-[#f0f4f8]">
            {HISTORY.map((h, i) => (
              <div key={i} className="flex items-start gap-4 px-5 py-4 hover:bg-[#f8fafc]">
                <div className="w-10 h-10 rounded-full bg-[#e8f4fd] flex items-center justify-center shrink-0 mt-0.5">
                  {h.type === "信用更新" ? <TrendingUp className="w-4.5 h-4.5 text-[#1a5fa8]" />
                    : h.type === "认证更新" ? <ShieldCheck className="w-4.5 h-4.5 text-[#3a8c3f]" />
                    : <FileText className="w-4.5 h-4.5 text-[#e65c00]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[13px] font-semibold text-[#1a1a2e]">{h.type}</span>
                    <span className="text-[11px] text-[#bbb]">{h.date}</span>
                  </div>
                  <p className="text-[13px] text-[#666]">{h.desc}</p>
                </div>
                <span className="text-[14px] font-bold text-[#3a8c3f] shrink-0">{h.score} 分</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </MerchantLayout>
  )
}
