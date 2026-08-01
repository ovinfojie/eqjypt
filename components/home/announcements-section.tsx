"use client"

import { useState } from "react"
import { Mail } from "lucide-react"

type Tab = "通知" | "活动"

const notices = [
  { date: "2025-12-30", title: "2025年12月30日17点平台系统升级通知，期间部分功能暂停使用" },
  { date: "2025-12-30", title: "2025年12月30日(15:00)白云库粮食销售竞价专场活动通知" },
  { date: "2025-12-30", title: "2025年12月30日17点平台系统升级通知，期间部分功能暂停使用" },
  { date: "2025-12-30", title: "2025年12月30日(15:00)白云库粮食销售竞价专场活动通知" },
  { date: "2025-12-29", title: "2025年12月29日关于平台用户实名认证升级的重要通知" },
  { date: "2025-12-28", title: "2025年12月28日春节前农产品集采活动预告" },
]

const activities = [
  { date: "2026-01-15", title: "2026年春节农产品促销专场活动——年货节大促即将开始" },
  { date: "2026-01-10", title: "粤供销平台新年竞拍活动预报名通道开放" },
  { date: "2025-12-25", title: "2025年度优质供应商评选活动正式启动" },
  { date: "2025-12-20", title: "订单农业冬季农产品采购对接会报名通知" },
]

export function AnnouncementsSection() {
  const [activeTab, setActiveTab] = useState<Tab>("通知")
  const items = activeTab === "通知" ? notices : activities

  return (
    <div className="bg-white rounded border border-border p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-[#1a5fa8]" />
          <h3 className="text-[16px] font-bold text-[#1a1a2e]">平台公告</h3>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-4">
        {(["通知", "活动"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 text-[14px] transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "text-white bg-[#1a5fa8] border-[#1a5fa8]"
                : "text-[#333] border-transparent hover:text-[#1a5fa8]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <ul className="space-y-0 divide-y divide-border">
        {items.map((item, i) => (
          <li key={i} className="py-3 hover:bg-[#f5f7fa] -mx-5 px-5 cursor-pointer transition-colors">
            <a href="#" className="flex items-start gap-3">
              <span className="text-[12px] text-[#6b7c93] shrink-0 mt-0.5">{item.date}</span>
              <span className="text-[13px] text-[#333] line-clamp-1 hover:text-[#1a5fa8] transition-colors">
                {item.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
