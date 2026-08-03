"use client"

import Link from "next/link"
import { Gift, Ticket, Star, TrendingUp, Users, ChevronRight } from "lucide-react"

const modules = [
  {
    icon: Gift, title: "红包管理", desc: "发放采购红包，促进买家下单",
    href: "/merchant/marketing/hongbao",
    stats: [{ label: "已发放", value: "¥2,400" }, { label: "已使用", value: "¥1,860" }, { label: "使用率", value: "77.5%" }],
    color: "#e8831a", bg: "#fff8f0",
  },
  {
    icon: Ticket, title: "卡券管理", desc: "优惠券、满减券、折扣券",
    href: "/merchant/marketing/coupon",
    stats: [{ label: "已发放", value: "320张" }, { label: "已使用", value: "186张" }, { label: "使用率", value: "58.1%" }],
    color: "#1a5fa8", bg: "#e8f4fd",
  },
  {
    icon: Star, title: "积分管理", desc: "积分奖励与兑换管理",
    href: "/merchant/marketing/points",
    stats: [{ label: "总积分", value: "48,200" }, { label: "已兑换", value: "12,800" }, { label: "活跃用户", value: "32人" }],
    color: "#3a8c3f", bg: "#e8f5e9",
  },
]

const recentActivities = [
  { title: "8月采购红包活动", type: "红包", startAt: "2026-08-01", endAt: "2026-08-31", budget: "¥2,000", used: "¥680", status: "active" },
  { title: "新用户首单满减券", type: "卡券", startAt: "2026-07-01", endAt: "2026-09-30", budget: "200张", used: "112张", status: "active" },
  { title: "7月购物积分双倍", type: "积分", startAt: "2026-07-01", endAt: "2026-07-31", budget: "—", used: "—", status: "ended" },
]

export default function MarketingOverviewPage() {
  return (
    <div className="max-w-[980px] mx-auto space-y-5">
      <h1 className="text-[20px] font-bold text-[#1a1a2e]">营销权益总览</h1>

      {/* 整体统计 */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "营销总投入", value: "¥8,640", icon: TrendingUp, color: "#1a5fa8", bg: "#e8f4fd" },
          { label: "带来订单", value: "86单", icon: Gift, color: "#e8831a", bg: "#fff8f0" },
          { label: "影响客户", value: "234人", icon: Users, color: "#3a8c3f", bg: "#e8f5e9" },
          { label: "ROI", value: "3.2x", icon: Star, color: "#6b7c93", bg: "#f5f7fa" },
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

      {/* 三大模块入口 */}
      <div className="grid grid-cols-3 gap-4">
        {modules.map(m => (
          <Link key={m.title} href={m.href} className="bg-white rounded-lg border border-[#e8edf5] p-5 hover:border-[#1a5fa8] hover:shadow-sm transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: m.bg }}>
                  <m.icon className="w-5 h-5" style={{ color: m.color }} />
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-[#1a1a2e]">{m.title}</div>
                  <div className="text-[12px] text-[#6b7c93]">{m.desc}</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#6b7c93] group-hover:text-[#1a5fa8] transition-colors" />
            </div>
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#f0f4f8]">
              {m.stats.map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-[14px] font-semibold text-[#1a1a2e]">{s.value}</div>
                  <div className="text-[11px] text-[#6b7c93]">{s.label}</div>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* 近期活动 */}
      <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#e8edf5] flex items-center justify-between">
          <span className="text-[14px] font-semibold text-[#1a1a2e]">近期营销活动</span>
          <button className="text-[13px] text-[#1a5fa8] hover:underline">新增活动</button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-[12px] text-[#6b7c93] bg-[#f8fafc] border-b border-[#e8edf5]">
              <th className="px-5 py-2.5 text-left">活动名称</th>
              <th className="px-5 py-2.5 text-center">类型</th>
              <th className="px-5 py-2.5 text-center">活动时间</th>
              <th className="px-5 py-2.5 text-right">预算</th>
              <th className="px-5 py-2.5 text-right">已使用</th>
              <th className="px-5 py-2.5 text-center">状态</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((a, i) => (
              <tr key={i} className="border-b border-[#f0f4f8] hover:bg-[#f8fafc] text-[13px]">
                <td className="px-5 py-3 font-medium text-[#1a1a2e]">{a.title}</td>
                <td className="px-5 py-3 text-center text-[#555]">{a.type}</td>
                <td className="px-5 py-3 text-center text-[#6b7c93]">{a.startAt} ~ {a.endAt}</td>
                <td className="px-5 py-3 text-right">{a.budget}</td>
                <td className="px-5 py-3 text-right text-[#e8831a] font-medium">{a.used}</td>
                <td className="px-5 py-3 text-center">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${a.status === "active" ? "bg-[#e8f5e9] text-[#3a8c3f]" : "bg-[#f5f7fa] text-[#6b7c93]"}`}>
                    {a.status === "active" ? "进行中" : "已结束"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
