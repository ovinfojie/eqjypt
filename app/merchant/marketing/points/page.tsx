"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Star, TrendingUp, Users, Award } from "lucide-react"

type TabKey = "rules" | "records" | "exchange"

const TABS: { key: TabKey; label: string }[] = [
  { key: "rules", label: "积分规则" },
  { key: "records", label: "积分明细" },
  { key: "exchange", label: "兑换管理" },
]

const rules = [
  { trigger: "每完成一笔订单", ratio: "订单金额 × 1%", cap: "无上限", active: true },
  { trigger: "首次下单", ratio: "赠送 500 积分", cap: "每账号一次", active: true },
  { trigger: "邀请新用户", ratio: "赠送 200 积分", cap: "每邀请一人", active: true },
  { trigger: "完成企业认证", ratio: "赠送 1,000 积分", cap: "一次性", active: false },
]

const records = [
  { user: "盒马超市采购部", action: "订单积分 SO2026080100031", points: "+6,800", balance: "48,200", date: "2026-08-01" },
  { user: "广州大润发", action: "邀请新用户奖励", points: "+200", balance: "41,400", date: "2026-07-30" },
  { user: "深圳沃尔玛", action: "兑换优惠券（满500减80）", points: "-2,000", balance: "41,200", date: "2026-07-28" },
  { user: "东莞永辉超市", action: "订单积分 SO2026072500045", points: "+3,120", balance: "43,200", date: "2026-07-25" },
]

const exchanges = [
  { name: "满500减80优惠券", points: 2000, stock: 50, exchanged: 18, active: true },
  { name: "采购红包¥100", points: 5000, stock: 20, exchanged: 6, active: true },
  { name: "免运费券", points: 800, stock: 100, exchanged: 45, active: true },
  { name: "8折折扣券", points: 3000, stock: 30, exchanged: 30, active: false },
]

export default function PointsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("rules")

  return (
    <div className="max-w-[900px] mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/merchant/marketing/overview" className="flex items-center gap-1.5 text-[13px] text-[#6b7c93] hover:text-[#1a5fa8]">
          <ChevronLeft className="w-4 h-4" /> 返回
        </Link>
        <h1 className="text-[20px] font-bold text-[#1a1a2e]">积分管理</h1>
      </div>

      {/* 概览 */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "全平台总积分", value: "48,200", icon: Star, color: "#e8831a", bg: "#fff8f0" },
          { label: "本月新增", value: "+12,640", icon: TrendingUp, color: "#3a8c3f", bg: "#e8f5e9" },
          { label: "本月兑换", value: "6,800", icon: Award, color: "#1a5fa8", bg: "#e8f4fd" },
          { label: "活跃用户", value: "32人", icon: Users, color: "#6b7c93", bg: "#f5f7fa" },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-lg border border-[#e8edf5] p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: c.bg }}>
              <c.icon className="w-5 h-5" style={{ color: c.color }} />
            </div>
            <div>
              <div className="text-[20px] font-bold text-[#1a1a2e]">{c.value}</div>
              <div className="text-[12px] text-[#6b7c93]">{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex border-b border-[#e8edf5]">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2.5 text-[13px] font-medium transition-colors ${activeTab === tab.key ? "text-[#1a5fa8] border-b-2 border-[#1a5fa8] -mb-px" : "text-[#6b7c93] hover:text-[#1a5fa8]"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "rules" && (
        <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
          <div className="px-5 py-3 border-b border-[#e8edf5] flex items-center justify-between">
            <span className="text-[14px] font-semibold text-[#1a1a2e]">积分发放规则</span>
            <button className="text-[13px] text-[#1a5fa8] hover:underline">添加规则</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[12px] text-[#6b7c93] bg-[#f8fafc] border-b border-[#e8edf5]">
                <th className="px-5 py-2.5 text-left">触发条件</th>
                <th className="px-5 py-2.5 text-left">积分比例/金额</th>
                <th className="px-5 py-2.5 text-left">限制</th>
                <th className="px-5 py-2.5 text-center">状态</th>
                <th className="px-5 py-2.5 text-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((r, i) => (
                <tr key={i} className="border-b border-[#f0f4f8] text-[13px] hover:bg-[#f8fafc]">
                  <td className="px-5 py-3 text-[#1a1a2e]">{r.trigger}</td>
                  <td className="px-5 py-3 font-medium text-[#e8831a]">{r.ratio}</td>
                  <td className="px-5 py-3 text-[#555]">{r.cap}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${r.active ? "bg-[#e8f5e9] text-[#3a8c3f]" : "bg-[#f5f7fa] text-[#6b7c93]"}`}>
                      {r.active ? "启用" : "停用"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button className="text-[12px] text-[#1a5fa8] hover:underline mr-2">编辑</button>
                    <button className="text-[12px] text-[#6b7c93] hover:underline">{r.active ? "停用" : "启用"}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "records" && (
        <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-[12px] text-[#6b7c93] bg-[#f8fafc] border-b border-[#e8edf5]">
                <th className="px-5 py-2.5 text-left">用户</th>
                <th className="px-5 py-2.5 text-left">说明</th>
                <th className="px-5 py-2.5 text-right">积分变动</th>
                <th className="px-5 py-2.5 text-right">余额</th>
                <th className="px-5 py-2.5 text-center">时间</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i} className="border-b border-[#f0f4f8] text-[13px] hover:bg-[#f8fafc]">
                  <td className="px-5 py-3 font-medium text-[#1a1a2e]">{r.user}</td>
                  <td className="px-5 py-3 text-[#555]">{r.action}</td>
                  <td className={`px-5 py-3 text-right font-semibold ${r.points.startsWith("+") ? "text-[#3a8c3f]" : "text-[#ef4444]"}`}>{r.points}</td>
                  <td className="px-5 py-3 text-right text-[#1a1a2e]">{r.balance}</td>
                  <td className="px-5 py-3 text-center text-[#6b7c93]">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "exchange" && (
        <div className="grid grid-cols-2 gap-4">
          {exchanges.map((e, i) => (
            <div key={i} className="bg-white rounded-lg border border-[#e8edf5] p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="text-[14px] font-semibold text-[#1a1a2e]">{e.name}</div>
                <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${e.active ? "bg-[#e8f5e9] text-[#3a8c3f]" : "bg-[#f5f7fa] text-[#6b7c93]"}`}>
                  {e.active ? "上架" : "下架"}
                </span>
              </div>
              <div className="text-[13px] text-[#e8831a] font-semibold mb-2">{e.points.toLocaleString()} 积分兑换</div>
              <div className="text-[12px] text-[#6b7c93] mb-3">库存 {e.stock} · 已兑换 {e.exchanged}</div>
              <div className="h-1.5 bg-[#f0f4f8] rounded-full overflow-hidden">
                <div className="h-full bg-[#1a5fa8] rounded-full" style={{ width: `${Math.round(e.exchanged / e.stock * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
