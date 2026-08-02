"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, Clock, TrendingUp, CheckCircle2, XCircle } from "lucide-react"

type MyBidStatus = "bidding" | "won" | "lost" | "upcoming"

interface MyBidItem {
  id: string
  sessionTitle: string
  goodName: string
  bidType: string
  myLatestPrice: string
  currentTopPrice: string
  isLeading: boolean
  sessionStatus: MyBidStatus
  endTime: string
  deposit: string
  organizer: string
}

const MY_BIDS: MyBidItem[] = [
  {
    id: "b001", sessionTitle: "2026年春季粮食竞价专场（第12期）", goodName: "优选青苗软香米",
    bidType: "升价拍", myLatestPrice: "2080元/吨", currentTopPrice: "2080元/吨", isLeading: true,
    sessionStatus: "bidding", endTime: "2026-04-20 16:00", deposit: "50万元", organizer: "广东省粮食交易中心",
  },
  {
    id: "b002", sessionTitle: "2026年春季粮食竞价专场（第12期）", goodName: "粮芯谷稻油粘米",
    bidType: "升价拍", myLatestPrice: "2035元/吨", currentTopPrice: "2040元/吨", isLeading: false,
    sessionStatus: "bidding", endTime: "2026-04-20 16:00", deposit: "50万元", organizer: "广东省粮食交易中心",
  },
  {
    id: "b003", sessionTitle: "惠州新供销荔枝专场竞价（2026春）", goodName: "桂味荔枝（优等品）",
    bidType: "降价拍", myLatestPrice: "6800元/吨", currentTopPrice: "6800元/吨", isLeading: true,
    sessionStatus: "upcoming", endTime: "2026-04-22 18:00", deposit: "20万元", organizer: "惠州新供销天润农产品有限公司",
  },
  {
    id: "b004", sessionTitle: "2026年春季蔬菜联合竞价（第5期）", goodName: "有机芥蓝",
    bidType: "升价拍", myLatestPrice: "1350元/吨", currentTopPrice: "1420元/吨", isLeading: false,
    sessionStatus: "lost", endTime: "2026-04-15 17:00", deposit: "10万元", organizer: "广东农产品交易中心",
  },
  {
    id: "b005", sessionTitle: "南雄板鸭春季专场竞价（第3期）", goodName: "南雄正宗板鸭",
    bidType: "升价拍", myLatestPrice: "28500元/吨", currentTopPrice: "28500元/吨", isLeading: true,
    sessionStatus: "won", endTime: "2026-04-10 16:00", deposit: "5万元", organizer: "南雄市供销社联合社",
  },
]

const STATUS_CONFIG: Record<MyBidStatus, { label: string; bg: string; text: string }> = {
  bidding:  { label: "进行中", bg: "bg-[#fef2f2]",  text: "text-[#cc2222]" },
  upcoming: { label: "待开始", bg: "bg-[#fff7ed]",  text: "text-[#e8831a]" },
  won:      { label: "已中标", bg: "bg-[#e8f9f0]",  text: "text-[#1a8a3f]" },
  lost:     { label: "未中标", bg: "bg-[#f5f5f5]",  text: "text-[#999]" },
}

const TABS: { key: MyBidStatus | "all"; label: string }[] = [
  { key: "all",      label: "全部" },
  { key: "bidding",  label: "进行中" },
  { key: "upcoming", label: "待开始" },
  { key: "won",      label: "已中标" },
  { key: "lost",     label: "未中标" },
]

export default function WoCanjiaPage() {
  const [activeTab, setActiveTab] = useState<MyBidStatus | "all">("all")

  const filtered = activeTab === "all" ? MY_BIDS : MY_BIDS.filter((b) => b.sessionStatus === activeTab)

  return (
    <div className="max-w-[900px]">
      <div className="mb-5">
        <h1 className="text-[20px] font-bold text-[#1a1a2e]">我参与的竞拍</h1>
        <p className="text-[13px] text-[#6b7c93] mt-1">查看您参与的所有竞价专场出价记录</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: "参拍中",   value: MY_BIDS.filter((b) => b.sessionStatus === "bidding").length,  color: "text-[#cc2222]" },
          { label: "待开始",   value: MY_BIDS.filter((b) => b.sessionStatus === "upcoming").length, color: "text-[#e8831a]" },
          { label: "已中标",   value: MY_BIDS.filter((b) => b.sessionStatus === "won").length,      color: "text-[#1a8a3f]" },
          { label: "未中标",   value: MY_BIDS.filter((b) => b.sessionStatus === "lost").length,     color: "text-[#999]" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#dde3ec] rounded-lg px-4 py-3 text-center">
            <div className={`text-[22px] font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[12px] text-[#999] mt-0.5">{s.label}</div>
          </div>
        ))}
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
        {filtered.map((b) => {
          const sc = STATUS_CONFIG[b.sessionStatus]
          return (
            <div key={b.id} className="bg-white border border-[#dde3ec] rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${sc.bg} ${sc.text}`}>
                      {sc.label}
                    </span>
                    <span className="px-2 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[11px] rounded">{b.bidType}</span>
                  </div>
                  <div className="text-[14px] font-semibold text-[#1a1a2e] mb-0.5 truncate">{b.sessionTitle}</div>
                  <div className="text-[13px] text-[#6b7c93] mb-2">竞拍商品：{b.goodName} · {b.organizer}</div>
                  <div className="flex items-center gap-4 text-[13px]">
                    <span className="text-[#999]">我的出价：<span className="text-[#333] font-medium">{b.myLatestPrice}</span></span>
                    <span className="text-[#999]">当前最高：<span className="text-[#cc2222] font-bold">{b.currentTopPrice}</span></span>
                    <span className="text-[#999]">保证金：<span className="text-[#333]">{b.deposit}</span></span>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  {b.sessionStatus === "bidding" && (
                    <div className="mb-2">
                      {b.isLeading ? (
                        <span className="flex items-center gap-1 text-[#1a8a3f] text-[12px] font-semibold">
                          <TrendingUp className="w-3.5 h-3.5" />领先出价
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[#cc2222] text-[12px] font-semibold">
                          <XCircle className="w-3.5 h-3.5" />已被超出
                        </span>
                      )}
                    </div>
                  )}
                  {b.sessionStatus === "won" && (
                    <div className="mb-2 flex items-center gap-1 text-[#1a8a3f] text-[12px] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />中标成功
                    </div>
                  )}
                  <div className="text-[11px] text-[#999] mb-2 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" />{b.endTime}
                  </div>
                  <Link
                    href={`/merchant/jingjia/wo-canjia/${b.id}`}
                    className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]"
                  >
                    <Eye className="w-3.5 h-3.5" />查看记录
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
