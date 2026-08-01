"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, Plus, Clock, Users, Package } from "lucide-react"

type SessionStatus = "live" | "upcoming" | "ended" | "draft" | "reviewing"

interface MySession {
  id: string
  title: string
  bidType: string
  goodsCount: number
  status: SessionStatus
  startTime: string
  endTime: string
  bidderCount: number
  totalQty: string
  remark: string
}

const MY_SESSIONS: MySession[] = [
  {
    id: "s001", title: "2026年春季丝苗米竞价专场",
    bidType: "升价拍", goodsCount: 4, status: "live",
    startTime: "2026-04-20 10:00", endTime: "2026-04-20 18:00",
    bidderCount: 15, totalQty: "5000吨", remark: "",
  },
  {
    id: "s002", title: "夏季优选大米联合竞价（预告）",
    bidType: "升价拍", goodsCount: 3, status: "upcoming",
    startTime: "2026-05-08 09:30", endTime: "2026-05-08 17:00",
    bidderCount: 0, totalQty: "3200吨", remark: "",
  },
  {
    id: "s003", title: "春节前特供稻米竞价专场",
    bidType: "密封拍", goodsCount: 2, status: "ended",
    startTime: "2026-01-20 09:00", endTime: "2026-01-20 15:00",
    bidderCount: 22, totalQty: "2800吨", remark: "",
  },
  {
    id: "s004", title: "优质晚稻竞价专场（草稿）",
    bidType: "升价拍", goodsCount: 0, status: "draft",
    startTime: "—", endTime: "—",
    bidderCount: 0, totalQty: "—", remark: "草稿，未提交审核",
  },
  {
    id: "s005", title: "冬季粮食竞价专场（审核中）",
    bidType: "降价拍", goodsCount: 5, status: "reviewing",
    startTime: "2026-04-28 10:00", endTime: "2026-04-28 16:00",
    bidderCount: 0, totalQty: "6000吨", remark: "等待平台审核通过",
  },
]

const STATUS_CONFIG: Record<SessionStatus, { label: string; bg: string; text: string }> = {
  live:      { label: "进行中", bg: "bg-[#fef2f2]",  text: "text-[#cc2222]" },
  upcoming:  { label: "待开始", bg: "bg-[#fff7ed]",  text: "text-[#e8831a]" },
  ended:     { label: "已结束", bg: "bg-[#f5f5f5]",  text: "text-[#999]" },
  draft:     { label: "草稿",   bg: "bg-[#f5f5f5]",  text: "text-[#666]" },
  reviewing: { label: "审核中", bg: "bg-[#fffbf0]",  text: "text-[#b45309]" },
}

const TABS: { key: SessionStatus | "all"; label: string }[] = [
  { key: "all",       label: "全部" },
  { key: "live",      label: "进行中" },
  { key: "upcoming",  label: "待开始" },
  { key: "reviewing", label: "审核中" },
  { key: "ended",     label: "已结束" },
  { key: "draft",     label: "草稿" },
]

export default function WoFabuPage() {
  const [activeTab, setActiveTab] = useState<SessionStatus | "all">("all")

  const filtered = activeTab === "all" ? MY_SESSIONS : MY_SESSIONS.filter((s) => s.status === activeTab)

  return (
    <div className="max-w-[900px]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">我发布的竞拍</h1>
          <p className="text-[13px] text-[#6b7c93] mt-1">管理您发布的竞价专场</p>
        </div>
        <Link
          href="/admin/fabu-jingpai"
          className="flex items-center gap-1.5 px-4 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors"
        >
          <Plus className="w-4 h-4" />
          发布竞拍专场
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-4 border-b border-[#dde3ec]">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 text-[13px] font-medium border-b-2 -mb-px transition-colors ${
              activeTab === t.key ? "border-[#1a5fa8] text-[#1a5fa8]" : "border-transparent text-[#666] hover:text-[#1a5fa8]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((s) => {
          const sc = STATUS_CONFIG[s.status]
          return (
            <div key={s.id} className="bg-white border border-[#dde3ec] rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${sc.bg} ${sc.text}`}>{sc.label}</span>
                    <span className="px-2 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[11px] rounded">{s.bidType}</span>
                  </div>
                  <div className="text-[15px] font-semibold text-[#1a1a2e] mb-2 truncate">{s.title}</div>
                  <div className="flex items-center gap-5 text-[13px] text-[#6b7c93]">
                    <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5" />{s.goodsCount} 个商品</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{s.bidderCount} 人参拍</span>
                    <span>总量：{s.totalQty}</span>
                  </div>
                  {s.remark && (
                    <div className="mt-1.5 text-[12px] text-[#e8831a]">{s.remark}</div>
                  )}
                </div>
                <div className="shrink-0 text-right space-y-2">
                  <div className="text-[12px] text-[#999] flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" />
                    {s.startTime === "—" ? "待设置" : s.startTime}
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    {s.status === "live" && (
                      <Link href={`/portal/jingjia-jiaoyi/${s.id}`} className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                        <Eye className="w-3.5 h-3.5" />查看
                      </Link>
                    )}
                    {(s.status === "draft" || s.status === "reviewing") && (
                      <Link href="/admin/fabu-jingpai" className="text-[#1a5fa8] hover:underline text-[12px]">编辑</Link>
                    )}
                    {s.status === "ended" && (
                      <Link href={`/portal/jingjia-jiaoyi/${s.id}`} className="flex items-center gap-1 text-[#666] hover:underline text-[12px]">
                        <Eye className="w-3.5 h-3.5" />查看结果
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
