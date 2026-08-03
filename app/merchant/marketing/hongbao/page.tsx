"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Plus, Gift } from "lucide-react"

type TabKey = "active" | "upcoming" | "ended"
const TABS: { key: TabKey; label: string }[] = [
  { key: "active", label: "进行中" },
  { key: "upcoming", label: "未开始" },
  { key: "ended", label: "已结束" },
]

const hongbaos = [
  { id: "hb1", name: "8月采购红包", amount: "¥50", minOrder: "¥500", budget: "¥2,000", used: "¥680", count: 40, usedCount: 13, endAt: "2026-08-31", status: "active" },
  { id: "hb2", name: "新用户首单红包", amount: "¥30", minOrder: "¥300", budget: "¥900", used: "¥330", count: 30, usedCount: 11, endAt: "2026-09-30", status: "active" },
  { id: "hb3", name: "国庆特惠红包", amount: "¥100", minOrder: "¥1,000", budget: "¥5,000", used: "—", count: 50, usedCount: 0, endAt: "2026-10-07", status: "upcoming" },
  { id: "hb4", name: "7月清仓红包", amount: "¥20", minOrder: "¥200", budget: "¥1,000", used: "¥860", count: 50, usedCount: 43, endAt: "2026-07-31", status: "ended" },
]

export default function HongbaoPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("active")
  const [showCreate, setShowCreate] = useState(false)

  const filtered = hongbaos.filter(h => h.status === activeTab)

  return (
    <div className="max-w-[900px] mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/merchant/marketing/overview" className="flex items-center gap-1.5 text-[13px] text-[#6b7c93] hover:text-[#1a5fa8]">
            <ChevronLeft className="w-4 h-4" /> 返回
          </Link>
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">红包管理</h1>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-1.5 px-4 py-1.5 bg-[#e8831a] text-white text-[13px] rounded hover:bg-[#d4741a] transition-colors">
          <Plus className="w-4 h-4" /> 新建红包
        </button>
      </div>

      {/* 汇总 */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "红包总预算", value: "¥8,900", color: "#e8831a" },
          { label: "已发放金额", value: "¥2,400", color: "#1a5fa8" },
          { label: "已使用金额", value: "¥1,870", color: "#3a8c3f" },
          { label: "使用率", value: "77.9%", color: "#6b7c93" },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-lg border border-[#e8edf5] p-4 text-center">
            <div className="text-[22px] font-bold mb-1" style={{ color: c.color }}>{c.value}</div>
            <div className="text-[12px] text-[#6b7c93]">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#e8edf5]">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2.5 text-[13px] font-medium transition-colors ${activeTab === tab.key ? "text-[#1a5fa8] border-b-2 border-[#1a5fa8] -mb-px" : "text-[#6b7c93] hover:text-[#1a5fa8]"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* 红包列表 */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#e8edf5] p-16 text-center">
            <Gift className="w-12 h-12 text-[#dde3ec] mx-auto mb-2" />
            <p className="text-[13px] text-[#6b7c93]">暂无红包活动</p>
          </div>
        ) : filtered.map(h => (
          <div key={h.id} className="bg-white rounded-lg border border-[#e8edf5] p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#fff8f0] flex items-center justify-center shrink-0">
                  <Gift className="w-6 h-6 text-[#e8831a]" />
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-[#1a1a2e] mb-0.5">{h.name}</div>
                  <div className="flex items-center gap-3 text-[12px] text-[#6b7c93]">
                    <span>面额：<b className="text-[#e8831a]">{h.amount}</b></span>
                    <span>门槛：{h.minOrder}</span>
                    <span>有效期至：{h.endAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-center">
                <div>
                  <div className="text-[16px] font-bold text-[#1a1a2e]">{h.count}张</div>
                  <div className="text-[11px] text-[#6b7c93]">发放数量</div>
                </div>
                <div>
                  <div className="text-[16px] font-bold text-[#3a8c3f]">{h.usedCount}张</div>
                  <div className="text-[11px] text-[#6b7c93]">已使用</div>
                </div>
                <div>
                  <div className="text-[16px] font-bold text-[#e8831a]">{h.used}</div>
                  <div className="text-[11px] text-[#6b7c93]">使用金额</div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <button className="px-3 py-1.5 border border-[#1a5fa8] text-[#1a5fa8] text-[12px] rounded hover:bg-[#e8f4fd]">详情</button>
                  {h.status === "active" && (
                    <button className="px-3 py-1.5 border border-[#e8edf5] text-[#ef4444] text-[12px] rounded hover:border-red-300">停止</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 新建弹窗 */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[520px] p-6">
            <h2 className="text-[16px] font-bold text-[#1a1a2e] mb-4">新建红包活动</h2>
            <div className="space-y-3.5">
              {[
                { label: "活动名称", type: "text", placeholder: "请输入红包活动名称" },
                { label: "红包面额(元)", type: "number", placeholder: "如：50" },
                { label: "使用门槛(元)", type: "number", placeholder: "订单金额满多少可用" },
                { label: "发放数量(张)", type: "number", placeholder: "如：100" },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-3">
                  <label className="text-[13px] text-[#6b7c93] w-28 text-right shrink-0">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} className="flex-1 border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
              ))}
              <div className="flex items-center gap-3">
                <label className="text-[13px] text-[#6b7c93] w-28 text-right shrink-0">有效期</label>
                <div className="flex items-center gap-2 flex-1">
                  <input type="date" className="flex-1 border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                  <span className="text-[#6b7c93] shrink-0">至</span>
                  <input type="date" className="flex-1 border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setShowCreate(false)} className="px-5 py-2 border border-[#e8edf5] text-[13px] rounded-lg hover:bg-[#f5f7fa]">取消</button>
              <button onClick={() => setShowCreate(false)} className="px-5 py-2 bg-[#e8831a] text-white text-[13px] rounded-lg hover:bg-[#d4741a]">确认发布</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
