"use client"

import { useState } from "react"
import { ChevronDown, Download, TrendingUp, TrendingDown, DollarSign, Clock } from "lucide-react"

type TabKey = "overview" | "records" | "bills"

const TABS: { key: TabKey; label: string }[] = [
  { key: "overview", label: "结算概览" },
  { key: "records", label: "收支明细" },
  { key: "bills", label: "对账单" },
]

const records = [
  { id: "r1", type: "income", desc: "订单收款 PO2026080100123", amt: "+1,435.60", balance: "12,840.60", date: "2026-08-01 14:30", channel: "平台担保账户" },
  { id: "r2", type: "expense", desc: "平台服务费 (0.5%)", amt: "-7.18", balance: "12,833.42", date: "2026-08-01 14:31", channel: "平台担保账户" },
  { id: "r3", type: "income", desc: "订单收款 PO2026073100098", amt: "+1,324.00", balance: "11,409.42", date: "2026-07-31 17:00", channel: "银行转账" },
  { id: "r4", type: "income", desc: "集采结算款 jc001", amt: "+16,000.00", balance: "10,085.42", date: "2026-07-28 10:00", channel: "平台担保账户" },
  { id: "r5", type: "expense", desc: "提现到银行卡", amt: "-10,000.00", balance: "-5,914.58", date: "2026-07-25 09:00", channel: "招商银行" },
]

const bills = [
  { id: "b1", period: "2026年7月", income: "68,400.00", expense: "342.00", net: "68,058.00", status: "confirmed" },
  { id: "b2", period: "2026年6月", income: "45,200.00", expense: "226.00", net: "44,974.00", status: "confirmed" },
  { id: "b3", period: "2026年5月", income: "32,800.00", expense: "164.00", net: "32,636.00", status: "confirmed" },
]

export default function SettlementPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview")

  return (
    <div className="max-w-[980px] mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-bold text-[#1a1a2e]">结算与对账</h1>
        <button className="flex items-center gap-1.5 px-4 py-1.5 border border-[#e8edf5] text-[13px] text-[#555] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8]">
          <Download className="w-4 h-4" /> 导出报表
        </button>
      </div>

      <div className="flex border-b border-[#e8edf5]">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2.5 text-[13px] font-medium transition-colors ${activeTab === tab.key ? "text-[#1a5fa8] border-b-2 border-[#1a5fa8] -mb-px" : "text-[#6b7c93] hover:text-[#1a5fa8]"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "可提现余额", value: "¥12,840.60", sub: "平台账户余额", icon: DollarSign, color: "#1a5fa8", bg: "#e8f4fd" },
              { label: "本月收入", value: "¥18,759.60", sub: "较上月 +12.3%", icon: TrendingUp, color: "#3a8c3f", bg: "#e8f5e9" },
              { label: "本月支出", value: "¥7.18", sub: "平台服务费", icon: TrendingDown, color: "#e8831a", bg: "#fff8f0" },
              { label: "待结算金额", value: "¥3,120.00", sub: "1笔待结算", icon: Clock, color: "#6b7c93", bg: "#f5f7fa" },
            ].map(c => (
              <div key={c.label} className="bg-white rounded-lg border border-[#e8edf5] p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] text-[#6b7c93]">{c.label}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: c.bg }}>
                    <c.icon className="w-4 h-4" style={{ color: c.color }} />
                  </div>
                </div>
                <div className="text-[20px] font-bold text-[#1a1a2e]">{c.value}</div>
                <div className="text-[12px] text-[#6b7c93] mt-0.5">{c.sub}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg border border-[#e8edf5] p-5 flex justify-between items-center">
            <div>
              <div className="text-[15px] font-semibold text-[#1a1a2e] mb-1">提现到银行账户</div>
              <div className="text-[13px] text-[#6b7c93]">当前绑定：招商银行 **** 0001 | 提现到账时间 1-3 个工作日</div>
            </div>
            <button className="px-6 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">立即提现</button>
          </div>
        </div>
      )}

      {activeTab === "records" && (
        <div className="space-y-3">
          <div className="bg-white rounded-lg border border-[#e8edf5] p-4 flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e8edf5] rounded text-[13px] text-[#555] hover:border-[#1a5fa8]">
              时间范围 <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e8edf5] rounded text-[13px] text-[#555] hover:border-[#1a5fa8]">
              收支类型 <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-[12px] text-[#6b7c93] bg-[#f8fafc] border-b border-[#e8edf5]">
                  <th className="px-4 py-2.5 text-left">时间</th>
                  <th className="px-4 py-2.5 text-left">摘要</th>
                  <th className="px-4 py-2.5 text-left">渠道</th>
                  <th className="px-4 py-2.5 text-right">金额</th>
                  <th className="px-4 py-2.5 text-right">余额</th>
                </tr>
              </thead>
              <tbody>
                {records.map(r => (
                  <tr key={r.id} className="border-b border-[#f0f4f8] hover:bg-[#f8fafc] text-[13px]">
                    <td className="px-4 py-3 text-[#6b7c93] whitespace-nowrap">{r.date}</td>
                    <td className="px-4 py-3 text-[#1a1a2e]">{r.desc}</td>
                    <td className="px-4 py-3 text-[#555]">{r.channel}</td>
                    <td className={`px-4 py-3 text-right font-semibold ${r.type === "income" ? "text-[#3a8c3f]" : "text-[#ef4444]"}`}>{r.amt}</td>
                    <td className="px-4 py-3 text-right text-[#1a1a2e]">{r.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "bills" && (
        <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-[12px] text-[#6b7c93] bg-[#f8fafc] border-b border-[#e8edf5]">
                <th className="px-5 py-2.5 text-left">结算周期</th>
                <th className="px-5 py-2.5 text-right">收入合计</th>
                <th className="px-5 py-2.5 text-right">费用合计</th>
                <th className="px-5 py-2.5 text-right">净收入</th>
                <th className="px-5 py-2.5 text-center">状态</th>
                <th className="px-5 py-2.5 text-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {bills.map(b => (
                <tr key={b.id} className="border-b border-[#f0f4f8] hover:bg-[#f8fafc] text-[13px]">
                  <td className="px-5 py-3 font-medium text-[#1a1a2e]">{b.period}</td>
                  <td className="px-5 py-3 text-right text-[#3a8c3f] font-semibold">¥{b.income}</td>
                  <td className="px-5 py-3 text-right text-[#ef4444]">¥{b.expense}</td>
                  <td className="px-5 py-3 text-right text-[#1a5fa8] font-bold">¥{b.net}</td>
                  <td className="px-5 py-3 text-center">
                    <span className="px-2 py-0.5 bg-[#e8f5e9] text-[#3a8c3f] text-[11px] rounded-full font-medium">已确认</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button className="text-[12px] text-[#1a5fa8] hover:underline mr-3">查看</button>
                    <button className="text-[12px] text-[#6b7c93] hover:underline">下载</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
