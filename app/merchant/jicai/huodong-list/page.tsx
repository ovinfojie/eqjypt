"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ChevronDown, Package, Clock, CheckCircle2, XCircle, RefreshCw } from "lucide-react"

type TabKey = "all" | "active" | "upcoming" | "ended"

const TABS: { key: TabKey; label: string; count?: number }[] = [
  { key: "all", label: "全部" },
  { key: "active", label: "进行中", count: 2 },
  { key: "upcoming", label: "未开始", count: 1 },
  { key: "ended", label: "已结束" },
]

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  active:   { label: "进行中", color: "#3a8c3f", bg: "#e8f5e9" },
  upcoming: { label: "未开始", color: "#1a5fa8", bg: "#e8f4fd" },
  ended:    { label: "已结束", color: "#6b7c93", bg: "#f5f7fa" },
}

const activities = [
  {
    id: "jc001", title: "2026年8月优质大米集采专项", category: "粮食", status: "active",
    startAt: "2026-08-01", endAt: "2026-08-15", totalQty: "50吨", unitPrice: "3,200元/吨",
    joinCount: 12, orderCount: 8, totalAmt: "384,000",
    myRole: "供应商", myStatus: "已参与",
  },
  {
    id: "jc002", title: "秋季蔬菜集采（叶菜类）", category: "蔬菜", status: "active",
    startAt: "2026-08-01", endAt: "2026-08-20", totalQty: "20吨", unitPrice: "2.8元/斤",
    joinCount: 6, orderCount: 3, totalAmt: "112,000",
    myRole: "采购商", myStatus: "已下单",
  },
  {
    id: "jc003", title: "华南区水产品集采第三期", category: "水产", status: "upcoming",
    startAt: "2026-08-20", endAt: "2026-09-05", totalQty: "30吨", unitPrice: "待定",
    joinCount: 0, orderCount: 0, totalAmt: "—",
    myRole: "供应商", myStatus: "报名中",
  },
  {
    id: "jc004", title: "2026年7月荔枝专项集采", category: "水果", status: "ended",
    startAt: "2026-07-01", endAt: "2026-07-20", totalQty: "60吨", unitPrice: "9元/斤",
    joinCount: 18, orderCount: 15, totalAmt: "1,080,000",
    myRole: "供应商", myStatus: "已完成",
  },
]

export default function JicaiHuodongListPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all")
  const [keyword, setKeyword] = useState("")

  const filtered = activities.filter(a => {
    const matchTab = activeTab === "all" || a.status === activeTab
    const matchKw = !keyword || a.title.includes(keyword) || a.category.includes(keyword)
    return matchTab && matchKw
  })

  return (
    <div className="max-w-[980px] mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-bold text-[#1a1a2e]">集采活动列表</h1>
        <Link href="/merchant/jicai/fabu" className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
          + 发布集采
        </Link>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "参与活动", value: activities.length, color: "#1a5fa8" },
          { label: "进行中", value: 2, color: "#3a8c3f" },
          { label: "累计成交额", value: "¥1,576,000", color: "#e8831a" },
          { label: "本月参与", value: 3, color: "#6b7c93" },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-lg border border-[#e8edf5] p-4 text-center">
            <div className="text-[22px] font-bold mb-1" style={{ color: c.color }}>{c.value}</div>
            <div className="text-[13px] text-[#6b7c93]">{c.label}</div>
          </div>
        ))}
      </div>

      {/* 搜索 */}
      <div className="bg-white rounded-lg border border-[#e8edf5] p-4 flex items-center gap-3">
        <div className="flex items-center gap-2 border border-[#e8edf5] rounded px-3 py-1.5 flex-1 max-w-[320px]">
          <Search className="w-3.5 h-3.5 text-[#6b7c93] shrink-0" />
          <input type="text" placeholder="搜索集采活动名称/品类" value={keyword} onChange={e => setKeyword(e.target.value)}
            className="flex-1 text-[13px] outline-none placeholder:text-[#aaa]" />
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e8edf5] rounded text-[13px] text-[#555] hover:border-[#1a5fa8]">
          品类 <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <button className="flex items-center gap-1.5 ml-auto text-[13px] text-[#6b7c93] hover:text-[#1a5fa8]">
          <RefreshCw className="w-3.5 h-3.5" /> 刷新
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#e8edf5]">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-[13px] font-medium transition-colors whitespace-nowrap ${activeTab === tab.key ? "text-[#1a5fa8] border-b-2 border-[#1a5fa8] -mb-px" : "text-[#6b7c93] hover:text-[#1a5fa8]"}`}>
            {tab.label}
            {tab.count && <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#e8831a] text-white text-[10px] font-bold">{tab.count}</span>}
          </button>
        ))}
      </div>

      {/* 列表 */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#e8edf5] p-16 text-center">
            <Package className="w-14 h-14 text-[#dde3ec] mx-auto mb-3" />
            <p className="text-[14px] text-[#6b7c93]">暂无集采活动</p>
          </div>
        ) : filtered.map(item => {
          const s = STATUS_MAP[item.status]
          return (
            <div key={item.id} className="bg-white rounded-lg border border-[#e8edf5] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold" style={{ color: s.color, backgroundColor: s.bg }}>{s.label}</span>
                    <span className="px-2 py-0.5 bg-[#f0f4f8] rounded text-[11px] text-[#6b7c93]">{item.category}</span>
                    <span className="text-[14px] font-semibold text-[#1a1a2e]">{item.title}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-[12px] text-[#6b7c93]">
                    <div>活动时间：<span className="text-[#1a1a2e]">{item.startAt} ~ {item.endAt}</span></div>
                    <div>集采总量：<span className="text-[#1a1a2e]">{item.totalQty}</span></div>
                    <div>参考单价：<span className="text-[#e8831a] font-medium">{item.unitPrice}</span></div>
                    <div>我的角色：<span className="text-[#1a1a2e]">{item.myRole}</span></div>
                    <div>参与企业：<span className="text-[#1a1a2e]">{item.joinCount}家</span></div>
                    <div>订单数：<span className="text-[#1a1a2e]">{item.orderCount}单</span></div>
                    <div>成交总额：<span className="text-[#e8831a] font-medium">¥{item.totalAmt}</span></div>
                    <div>我的状态：<span className="text-[#3a8c3f] font-medium">{item.myStatus}</span></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <Link href={`/merchant/jicai/huodong-list/${item.id}`} className="px-4 py-1.5 border border-[#1a5fa8] text-[#1a5fa8] text-[12px] rounded hover:bg-[#e8f4fd] transition-colors text-center">
                    查看详情
                  </Link>
                  {item.status === "active" && (
                    <Link href="/merchant/jicai/tongdan" className="px-4 py-1.5 bg-[#3a8c3f] text-white text-[12px] rounded hover:bg-[#2d7a33] transition-colors text-center">
                      集采统单
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
