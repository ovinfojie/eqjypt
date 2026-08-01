"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Plus, Eye, CheckCircle2, XCircle, Clock, Users, Package } from "lucide-react"

type AdminSessionStatus = "live" | "upcoming" | "ended" | "reviewing" | "rejected"

interface AdminSession {
  id: string
  title: string
  organizer: string
  bidType: string
  goodsCount: number
  status: AdminSessionStatus
  startTime: string
  endTime: string
  bidderCount: number
  totalQty: string
  depositTotal: string
}

const SESSIONS: AdminSession[] = [
  {
    id: "a001", title: "2026年春季粮食竞价专场（第12期）", organizer: "广东省粮食交易中心",
    bidType: "升价拍", goodsCount: 6, status: "live",
    startTime: "2026-04-20 10:00", endTime: "2026-04-20 16:00",
    bidderCount: 38, totalQty: "8600吨", depositTotal: "190万元",
  },
  {
    id: "a002", title: "惠州新供销荔枝专场竞价（2026春）", organizer: "惠州新供销天润农产品有限公司",
    bidType: "降价拍", goodsCount: 3, status: "live",
    startTime: "2026-04-20 09:00", endTime: "2026-04-20 18:00",
    bidderCount: 21, totalQty: "3200吨", depositTotal: "42万元",
  },
  {
    id: "a003", title: "冬季粮食竞价专场（待审核）", organizer: "广州新供销天润米业有限公司",
    bidType: "降价拍", goodsCount: 5, status: "reviewing",
    startTime: "2026-04-28 10:00", endTime: "2026-04-28 16:00",
    bidderCount: 0, totalQty: "6000吨", depositTotal: "—",
  },
  {
    id: "a004", title: "2026年粤西冻品水产联合竞价", organizer: "广东粤西水产交易中心",
    bidType: "升价拍", goodsCount: 8, status: "upcoming",
    startTime: "2026-04-22 09:30", endTime: "2026-04-22 17:00",
    bidderCount: 0, totalQty: "12000吨", depositTotal: "0万元",
  },
  {
    id: "a005", title: "特色农产品产地直采竞价（梅州专场）", organizer: "梅州市供销社联合社",
    bidType: "升价拍", goodsCount: 5, status: "upcoming",
    startTime: "2026-04-23 10:00", endTime: "2026-04-23 16:00",
    bidderCount: 0, totalQty: "2800吨", depositTotal: "0万元",
  },
  {
    id: "a006", title: "2026年春季蔬菜联合竞价（第5期）", organizer: "广东农产品交易中心",
    bidType: "升价拍", goodsCount: 7, status: "ended",
    startTime: "2026-04-15 09:00", endTime: "2026-04-15 17:00",
    bidderCount: 54, totalQty: "6800吨", depositTotal: "270万元",
  },
  {
    id: "a007", title: "某竞价专场（资质不符）", organizer: "某某公司",
    bidType: "升价拍", goodsCount: 2, status: "rejected",
    startTime: "—", endTime: "—",
    bidderCount: 0, totalQty: "—", depositTotal: "—",
  },
]

const STATUS_CONFIG: Record<AdminSessionStatus, { label: string; bg: string; text: string }> = {
  live:      { label: "进行中", bg: "bg-[#fef2f2]",  text: "text-[#cc2222]" },
  upcoming:  { label: "待开始", bg: "bg-[#fff7ed]",  text: "text-[#e8831a]" },
  ended:     { label: "已结束", bg: "bg-[#f5f5f5]",  text: "text-[#999]" },
  reviewing: { label: "审核中", bg: "bg-[#fffbf0]",  text: "text-[#b45309]" },
  rejected:  { label: "已驳回", bg: "bg-[#f5f5f5]",  text: "text-[#cc2222]" },
}

const TABS: { key: AdminSessionStatus | "all"; label: string }[] = [
  { key: "all",       label: "全部" },
  { key: "reviewing", label: "待审核" },
  { key: "live",      label: "进行中" },
  { key: "upcoming",  label: "待开始" },
  { key: "ended",     label: "已结束" },
  { key: "rejected",  label: "已驳回" },
]

export default function SessionListPage() {
  const [activeTab, setActiveTab] = useState<AdminSessionStatus | "all">("all")
  const [keyword, setKeyword] = useState("")
  const [reviewModal, setReviewModal] = useState<{ id: string; action: "approve" | "reject" } | null>(null)
  const [rejectReason, setRejectReason] = useState("")

  const filtered = SESSIONS.filter((s) => {
    const matchTab = activeTab === "all" || s.status === activeTab
    const matchKw = !keyword || s.title.includes(keyword) || s.organizer.includes(keyword)
    return matchTab && matchKw
  })

  const reviewingCount = SESSIONS.filter((s) => s.status === "reviewing").length

  return (
    <div className="max-w-[1000px]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">竞价专场管理</h1>
          <p className="text-[13px] text-[#6b7c93] mt-1">审核、管理平台全部竞价专场</p>
        </div>
        <Link
          href="/admin/fabu-jingpai"
          className="flex items-center gap-1.5 px-4 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors"
        >
          <Plus className="w-4 h-4" />
          发布竞拍专场
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-5">
        {[
          { label: "进行中",   value: SESSIONS.filter((s) => s.status === "live").length,      color: "text-[#cc2222]" },
          { label: "待开始",   value: SESSIONS.filter((s) => s.status === "upcoming").length,  color: "text-[#e8831a]" },
          { label: "待审核",   value: reviewingCount,                                           color: "text-[#b45309]" },
          { label: "已结束",   value: SESSIONS.filter((s) => s.status === "ended").length,     color: "text-[#666]" },
          { label: "参拍总次", value: SESSIONS.reduce((a, s) => a + s.bidderCount, 0),          color: "text-[#1a5fa8]" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#dde3ec] rounded-lg px-4 py-3 text-center">
            <div className={`text-[22px] font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[12px] text-[#999] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs + Search */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 border-b border-[#dde3ec]">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2 text-[13px] font-medium border-b-2 -mb-px transition-colors relative ${
                activeTab === t.key ? "border-[#1a5fa8] text-[#1a5fa8]" : "border-transparent text-[#666] hover:text-[#1a5fa8]"
              }`}
            >
              {t.label}
              {t.key === "reviewing" && reviewingCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#cc2222] text-white text-[10px] rounded-full flex items-center justify-center">
                  {reviewingCount}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#999]" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="搜索专场标题/主办方"
              className="pl-8 pr-3 h-8 border border-[#dde3ec] rounded text-[13px] w-[220px] outline-none focus:border-[#1a5fa8]"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#dde3ec] rounded-lg overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e8edf5]">
              {["状态", "专场标题", "主办方", "竞价类型", "商品", "参拍", "开始时间", "操作"].map((h) => (
                <th key={h} className="px-3 py-3 text-left text-[12px] font-semibold text-[#555] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => {
              const sc = STATUS_CONFIG[s.status]
              return (
                <tr key={s.id} className="border-b border-[#e8edf5] last:border-0 hover:bg-[#f8fafc]">
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${sc.bg} ${sc.text}`}>{sc.label}</span>
                  </td>
                  <td className="px-3 py-3 max-w-[200px]">
                    <div className="font-medium text-[#1a1a2e] truncate">{s.title}</div>
                  </td>
                  <td className="px-3 py-3 text-[#6b7c93] max-w-[140px] truncate">{s.organizer}</td>
                  <td className="px-3 py-3">
                    <span className="px-2 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[11px] rounded">{s.bidType}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="flex items-center gap-1 text-[#333]"><Package className="w-3.5 h-3.5 text-[#999]" />{s.goodsCount}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="flex items-center gap-1 text-[#333]"><Users className="w-3.5 h-3.5 text-[#999]" />{s.bidderCount}</span>
                  </td>
                  <td className="px-3 py-3 text-[#6b7c93] whitespace-nowrap">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{s.startTime}</span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link href={`/portal/jingjia-jiaoyi/${s.id}`} className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                        <Eye className="w-3.5 h-3.5" />查看
                      </Link>
                      {s.status === "reviewing" && (
                        <>
                          <button
                            onClick={() => setReviewModal({ id: s.id, action: "approve" })}
                            className="flex items-center gap-1 text-[#1a8a3f] hover:underline text-[12px]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />通过
                          </button>
                          <button
                            onClick={() => setReviewModal({ id: s.id, action: "reject" })}
                            className="flex items-center gap-1 text-[#cc2222] hover:underline text-[12px]"
                          >
                            <XCircle className="w-3.5 h-3.5" />驳回
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Review modal */}
      {reviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-[400px] p-6">
            <h3 className="text-[16px] font-bold text-[#1a1a2e] mb-3">
              {reviewModal.action === "approve" ? "确认通过审核？" : "驳回竞拍申请"}
            </h3>
            {reviewModal.action === "reject" && (
              <div className="mb-4">
                <label className="block text-[13px] text-[#555] mb-1.5">驳回原因 <span className="text-red-500">*</span></label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={3}
                  placeholder="请输入驳回原因..."
                  className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] outline-none focus:border-[#1a5fa8] resize-none"
                />
              </div>
            )}
            {reviewModal.action === "approve" && (
              <p className="text-[13px] text-[#6b7c93] mb-4">该专场将在审核通过后按计划时间正式上线。</p>
            )}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => { setReviewModal(null); setRejectReason("") }}
                className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:bg-[#f5f7fa]"
              >
                取消
              </button>
              <button
                onClick={() => { setReviewModal(null); setRejectReason("") }}
                className={`px-5 py-2 text-white text-[13px] rounded font-medium ${
                  reviewModal.action === "approve"
                    ? "bg-[#1a8a3f] hover:bg-[#15713380]"
                    : "bg-[#cc2222] hover:bg-[#aa1111]"
                }`}
              >
                {reviewModal.action === "approve" ? "确认通过" : "确认驳回"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
