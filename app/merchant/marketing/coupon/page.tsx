"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Plus, Ticket } from "lucide-react"

type TabKey = "active" | "upcoming" | "ended"
type CouponType = "discount" | "manjian" | "zhekou"

const TYPE_LABEL: Record<CouponType, { label: string; color: string; bg: string }> = {
  manjian:  { label: "满减券", color: "#1a5fa8", bg: "#e8f4fd" },
  discount: { label: "折扣券", color: "#e8831a", bg: "#fff8f0" },
  zhekou:   { label: "无门槛", color: "#3a8c3f", bg: "#e8f5e9" },
}

const coupons = [
  { id: "c1", name: "满500减50", type: "manjian" as CouponType, desc: "满¥500减¥50", total: 200, used: 112, endAt: "2026-09-30", status: "active" },
  { id: "c2", name: "8折优惠券", type: "zhekou" as CouponType, desc: "全场8折", total: 50, used: 23, endAt: "2026-08-31", status: "active" },
  { id: "c3", name: "国庆满1000减150", type: "manjian" as CouponType, desc: "满¥1000减¥150", total: 100, used: 0, endAt: "2026-10-07", status: "upcoming" },
  { id: "c4", name: "7月折扣券", type: "discount" as CouponType, desc: "折扣9折", total: 80, used: 51, endAt: "2026-07-31", status: "ended" },
]

export default function CouponPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("active")
  const [showCreate, setShowCreate] = useState(false)
  const [couponType, setCouponType] = useState<CouponType>("manjian")

  const filtered = coupons.filter(c => c.status === activeTab)

  return (
    <div className="max-w-[900px] mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/merchant/marketing/overview" className="flex items-center gap-1.5 text-[13px] text-[#6b7c93] hover:text-[#1a5fa8]">
            <ChevronLeft className="w-4 h-4" /> 返回
          </Link>
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">卡券管理</h1>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-1.5 px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
          <Plus className="w-4 h-4" /> 新建卡券
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "发放总量", value: "430张", color: "#1a5fa8" },
          { label: "已使用", value: "186张", color: "#3a8c3f" },
          { label: "使用率", value: "43.3%", color: "#e8831a" },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-lg border border-[#e8edf5] p-4 text-center">
            <div className="text-[22px] font-bold mb-1" style={{ color: c.color }}>{c.value}</div>
            <div className="text-[12px] text-[#6b7c93]">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="flex border-b border-[#e8edf5]">
        {(["active", "upcoming", "ended"] as TabKey[]).map(k => (
          <button key={k} onClick={() => setActiveTab(k)}
            className={`px-5 py-2.5 text-[13px] font-medium transition-colors ${activeTab === k ? "text-[#1a5fa8] border-b-2 border-[#1a5fa8] -mb-px" : "text-[#6b7c93] hover:text-[#1a5fa8]"}`}>
            {k === "active" ? "进行中" : k === "upcoming" ? "未开始" : "已结束"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#e8edf5] p-16 text-center">
            <Ticket className="w-12 h-12 text-[#dde3ec] mx-auto mb-2" />
            <p className="text-[13px] text-[#6b7c93]">暂无卡券</p>
          </div>
        ) : filtered.map(c => {
          const t = TYPE_LABEL[c.type]
          const rate = c.total > 0 ? Math.round((c.used / c.total) * 100) : 0
          return (
            <div key={c.id} className="bg-white rounded-lg border border-[#e8edf5] p-5 flex items-center gap-6">
              {/* 券样式 */}
              <div className="w-28 h-16 rounded-lg flex flex-col items-center justify-center shrink-0 border-2 border-dashed" style={{ borderColor: t.color, backgroundColor: t.bg }}>
                <div className="text-[16px] font-bold" style={{ color: t.color }}>{c.name.length > 6 ? c.desc : c.name}</div>
                <div className="text-[11px]" style={{ color: t.color }}>{t.label}</div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[14px] font-semibold text-[#1a1a2e]">{c.name}</span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium" style={{ color: t.color, backgroundColor: t.bg }}>{t.label}</span>
                </div>
                <div className="text-[12px] text-[#6b7c93] mb-2">{c.desc} · 有效期至 {c.endAt}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[#f0f4f8] rounded-full overflow-hidden">
                    <div className="h-full bg-[#1a5fa8] rounded-full transition-all" style={{ width: `${rate}%` }} />
                  </div>
                  <span className="text-[11px] text-[#6b7c93] shrink-0">已用 {c.used}/{c.total} · {rate}%</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 shrink-0">
                <button className="px-3 py-1.5 border border-[#1a5fa8] text-[#1a5fa8] text-[12px] rounded hover:bg-[#e8f4fd]">详情</button>
                {c.status === "active" && (
                  <button className="px-3 py-1.5 border border-[#e8edf5] text-[#ef4444] text-[12px] rounded hover:border-red-300">停止</button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {showCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[520px] p-6">
            <h2 className="text-[16px] font-bold text-[#1a1a2e] mb-4">新建卡券</h2>
            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <label className="text-[13px] text-[#6b7c93] w-24 text-right shrink-0">券类型</label>
                <div className="flex gap-2">
                  {(Object.entries(TYPE_LABEL) as [CouponType, typeof TYPE_LABEL[CouponType]][]).map(([k, v]) => (
                    <button key={k} onClick={() => setCouponType(k)}
                      className={`px-4 py-1.5 rounded-lg border text-[13px] transition-colors ${couponType === k ? "border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8]" : "border-[#e8edf5] text-[#555]"}`}>
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
              {[
                { label: "卡券名称", placeholder: "如：满500减50" },
                ...(couponType === "manjian" ? [{ label: "满减金额(元)", placeholder: "如：满500减50，填50" }] : []),
                ...(couponType !== "manjian" ? [{ label: "折扣比例(%)", placeholder: "如：80表示8折" }] : []),
                { label: "使用门槛(元)", placeholder: "0表示无门槛" },
                { label: "发放数量(张)", placeholder: "如：100" },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-3">
                  <label className="text-[13px] text-[#6b7c93] w-24 text-right shrink-0">{f.label}</label>
                  <input type="text" placeholder={f.placeholder} className="flex-1 border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
              ))}
              <div className="flex items-center gap-3">
                <label className="text-[13px] text-[#6b7c93] w-24 text-right shrink-0">有效期</label>
                <div className="flex items-center gap-2 flex-1">
                  <input type="date" className="flex-1 border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                  <span className="text-[#6b7c93] shrink-0">至</span>
                  <input type="date" className="flex-1 border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setShowCreate(false)} className="px-5 py-2 border border-[#e8edf5] text-[13px] rounded-lg hover:bg-[#f5f7fa]">取消</button>
              <button onClick={() => setShowCreate(false)} className="px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded-lg hover:bg-[#0d4a8a]">确认发布</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
