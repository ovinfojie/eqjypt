"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Eye, User, Crown, Building2 } from "lucide-react"

const levelMap: Record<string, { label: string; color: string; bg: string }> = {
  normal: { label: "普通会员",   color: "#6b7c93", bg: "#f3f4f6" },
  silver: { label: "银牌会员",   color: "#607d8b", bg: "#eceff1" },
  gold:   { label: "金牌会员",   color: "#b45309", bg: "#fef3c7" },
  vip:    { label: "VIP会员",    color: "#7c3aed", bg: "#f3e8fd" },
  super:  { label: "超级会员",   color: "#1a5fa8", bg: "#e8f4fd" },
}

const members = [
  { id: "M001", name: "广州粮油集团",       type: "企业", contact: "李采购",  phone: "13800138001", level: "vip",    points: 12480, orders: 328, amt: "¥248万", joinDate: "2025-01-15", status: "active"   },
  { id: "M002", name: "盒马超市采购部",     type: "企业", contact: "王总",    phone: "13800138002", level: "super",  points: 38600, orders: 860, amt: "¥1,024万", joinDate: "2024-08-20", status: "active"   },
  { id: "M003", name: "永辉超市广州区",     type: "企业", contact: "陈采购",  phone: "13800138003", level: "gold",   points: 8240,  orders: 216, amt: "¥86万",  joinDate: "2025-03-01", status: "active"   },
  { id: "M004", name: "深圳农批中心",       type: "企业", contact: "张经理",  phone: "13800138004", level: "silver", points: 3600,  orders: 98,  amt: "¥32万",  joinDate: "2025-05-15", status: "active"   },
  { id: "M005", name: "刘XX（散户）",       type: "个人", contact: "刘XX",    phone: "13800138005", level: "normal", points: 480,   orders: 12,  amt: "¥1.8万", joinDate: "2026-02-10", status: "active"   },
  { id: "M006", name: "广东某农业公司",     type: "企业", contact: "冯主任",  phone: "13800138006", level: "normal", points: 120,   orders: 5,   amt: "¥0.8万", joinDate: "2026-06-01", status: "inactive" },
]

const tabs = [
  { key: "all",    label: "全部" },
  { key: "super",  label: "超级会员" },
  { key: "vip",    label: "VIP" },
  { key: "gold",   label: "金牌" },
  { key: "silver", label: "银牌" },
  { key: "normal", label: "普通" },
]

export default function MemberListPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [keyword, setKeyword] = useState("")
  const [detailItem, setDetailItem] = useState<typeof members[0] | null>(null)

  const filtered = members.filter(m => {
    const matchTab = activeTab === "all" || m.level === activeTab
    const matchKw = !keyword || m.name.includes(keyword) || m.contact.includes(keyword)
    return matchTab && matchKw
  })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">会员管理</h1>
          <p className="text-[13px] text-[#6b7c93] mt-0.5">管理平台所有企业和个人会员，查看等级、积分和交易情况</p>
        </div>
        <Link href="/admin/member/upgrade" className="px-4 py-2 border border-[#dde3ec] text-[#1a5fa8] text-[13px] rounded hover:border-[#1a5fa8] transition-colors">
          升级审核
          <span className="ml-2 px-1.5 py-0.5 bg-[#e8831a] text-white text-[11px] rounded-full">6</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label: "会员总数",     value: members.length,                               color: "#1a1a2e" },
          { label: "超级会员",     value: members.filter(m => m.level === "super").length,  color: "#1a5fa8" },
          { label: "VIP会员",      value: members.filter(m => m.level === "vip").length,    color: "#7c3aed" },
          { label: "金牌及以上",   value: members.filter(m => ["gold","vip","super"].includes(m.level)).length, color: "#b45309" },
          { label: "本月活跃",     value: "4",                                          color: "#2e7d32" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-[#dde3ec] p-4 flex items-center gap-3">
            <div className="text-[28px] font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[13px] text-[#6b7c93]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#dde3ec]">
        <div className="flex items-center justify-between border-b border-[#dde3ec]">
          <div className="flex px-4">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`px-3 py-3 text-[13px] font-medium border-b-2 transition-colors ${activeTab === t.key ? "border-[#1a1a2e] text-[#1a1a2e]" : "border-transparent text-[#666] hover:text-[#1a1a2e]"}`}>
                {t.label}
                <span className="ml-1 px-1.5 py-0.5 bg-[#f0f4f8] text-[#6b7c93] text-[11px] rounded-full">
                  {t.key === "all" ? members.length : members.filter(m => m.level === t.key).length}
                </span>
              </button>
            ))}
          </div>
          <div className="relative mr-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#999]" />
            <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="搜索名称/联系人" className="h-8 border border-[#dde3ec] rounded pl-8 pr-3 text-[12px] focus:outline-none focus:border-[#1a5fa8] w-44" />
          </div>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[#999] text-[12px] border-b border-[#f0f4f9]">
              {["ID","会员名称","类型","联系人","会员等级","积分","订单数","累计金额","加入时间","状态","操作"].map(h => (
                <th key={h} className="px-4 py-2.5 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => {
              const lv = levelMap[row.level]
              return (
                <tr key={row.id} className="border-b border-[#f0f4f9] last:border-0 hover:bg-[#fafbfc]">
                  <td className="px-4 py-3 text-[#999] text-[12px]">{row.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 font-medium text-[#1a1a2e]">
                      {row.type === "企业" ? <Building2 className="w-3.5 h-3.5 text-[#1a5fa8]" /> : <User className="w-3.5 h-3.5 text-[#6b7c93]" />}
                      {row.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#555]">{row.type}</td>
                  <td className="px-4 py-3 text-[#555]">{row.contact}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium w-fit" style={{ color: lv.color, background: lv.bg }}>
                      {["vip","super"].includes(row.level) && <Crown className="w-3 h-3" />}
                      {lv.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#e8831a]">{row.points.toLocaleString()}</td>
                  <td className="px-4 py-3 text-[#555]">{row.orders}</td>
                  <td className="px-4 py-3 font-medium text-[#1a1a2e]">{row.amt}</td>
                  <td className="px-4 py-3 text-[#6b7c93]">{row.joinDate}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${row.status === "active" ? "text-[#2e7d32] bg-[#e8f5ee]" : "text-[#6b7280] bg-[#f3f4f6]"}`}>
                      {row.status === "active" ? "正常" : "停用"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setDetailItem(row)} className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                      <Eye className="w-3.5 h-3.5" />详情
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {detailItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setDetailItem(null)}>
          <div className="bg-white rounded-xl shadow-xl p-6 w-[480px]" onClick={e => e.stopPropagation()}>
            <h3 className="text-[16px] font-bold text-[#1a1a2e] mb-5">会员详情</h3>
            <div className="space-y-3">
              {[
                ["会员ID", detailItem.id],
                ["名称",   detailItem.name],
                ["类型",   detailItem.type],
                ["联系人", detailItem.contact],
                ["手机号", detailItem.phone],
                ["会员等级", levelMap[detailItem.level].label],
                ["积分",   detailItem.points.toLocaleString()],
                ["订单数", String(detailItem.orders)],
                ["累计金额", detailItem.amt],
                ["加入时间", detailItem.joinDate],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center gap-3 py-2 border-b border-[#f0f4f9] last:border-0">
                  <span className="text-[13px] text-[#999] w-20 shrink-0">{k}</span>
                  <span className="text-[13px] text-[#333] font-medium">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-5">
              <button onClick={() => setDetailItem(null)} className="px-4 py-2 bg-[#1a5fa8] text-white rounded text-[13px]">关闭</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
