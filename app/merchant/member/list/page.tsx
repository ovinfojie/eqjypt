"use client"

import { useState } from "react"
import { Search, Plus, Users, Star, UserX } from "lucide-react"

type TabKey = "all" | "vip" | "regular" | "blacklist"

const TABS: { key: TabKey; label: string; count: number }[] = [
  { key: "all", label: "全部客户", count: 48 },
  { key: "vip", label: "VIP客户", count: 12 },
  { key: "regular", label: "普通客户", count: 34 },
  { key: "blacklist", label: "黑名单", count: 2 },
]

const LEVEL_MAP: Record<string, { label: string; color: string; bg: string }> = {
  vip:     { label: "VIP",  color: "#e8831a", bg: "#fff8f0" },
  regular: { label: "普通", color: "#6b7c93", bg: "#f5f7fa" },
  blacklist: { label: "黑名单", color: "#ef4444", bg: "#fef2f2" },
}

const members = [
  { id: "m1", name: "广州大润发配送中心", contact: "王主任", phone: "138-0000-2222", type: "vip", totalAmt: "¥168,400", orders: 32, lastOrder: "2026-08-01", tag: "大客户" },
  { id: "m2", name: "深圳沃尔玛采购部", contact: "张总", phone: "138-0000-3333", type: "vip", totalAmt: "¥124,800", orders: 24, lastOrder: "2026-07-28", tag: "大客户" },
  { id: "m3", name: "东莞永辉超市", contact: "陈采购", phone: "138-0000-4444", type: "regular", totalAmt: "¥45,200", orders: 10, lastOrder: "2026-07-25", tag: "" },
  { id: "m4", name: "佛山家乐福", contact: "刘主管", phone: "138-0000-5555", type: "regular", totalAmt: "¥36,800", orders: 8, lastOrder: "2026-07-20", tag: "" },
  { id: "m5", name: "某问题采购商", contact: "—", phone: "—", type: "blacklist", totalAmt: "¥0", orders: 0, lastOrder: "—", tag: "欺诈风险" },
]

export default function MemberListPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all")
  const [keyword, setKeyword] = useState("")

  const filtered = members.filter(m => {
    const matchTab = activeTab === "all" || m.type === activeTab
    const matchKw = !keyword || m.name.includes(keyword) || m.contact.includes(keyword)
    return matchTab && matchKw
  })

  return (
    <div className="max-w-[980px] mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-bold text-[#1a1a2e]">客户/会员管理</h1>
        <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]">
          <Plus className="w-4 h-4" /> 新增客户
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "全部客户", value: 48, icon: Users, color: "#1a5fa8", bg: "#e8f4fd" },
          { label: "VIP客户", value: 12, icon: Star, color: "#e8831a", bg: "#fff8f0" },
          { label: "黑名单", value: 2, icon: UserX, color: "#ef4444", bg: "#fef2f2" },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-lg border border-[#e8edf5] p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: c.bg }}>
              <c.icon className="w-5 h-5" style={{ color: c.color }} />
            </div>
            <div>
              <div className="text-[22px] font-bold text-[#1a1a2e]">{c.value}</div>
              <div className="text-[12px] text-[#6b7c93]">{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-[#e8edf5] p-4 flex items-center gap-3">
        <div className="flex items-center gap-2 border border-[#e8edf5] rounded px-3 py-1.5 flex-1 max-w-[320px]">
          <Search className="w-3.5 h-3.5 text-[#6b7c93] shrink-0" />
          <input type="text" placeholder="搜索客户名称/联系人" value={keyword} onChange={e => setKeyword(e.target.value)} className="flex-1 text-[13px] outline-none placeholder:text-[#aaa]" />
        </div>
      </div>

      <div className="flex border-b border-[#e8edf5]">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-[13px] font-medium transition-colors ${activeTab === tab.key ? "text-[#1a5fa8] border-b-2 border-[#1a5fa8] -mb-px" : "text-[#6b7c93] hover:text-[#1a5fa8]"}`}>
            {tab.label}（{tab.count}）
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-[12px] text-[#6b7c93] bg-[#f8fafc] border-b border-[#e8edf5]">
              <th className="px-4 py-2.5 text-left">客户名称</th>
              <th className="px-4 py-2.5 text-left">联系人</th>
              <th className="px-4 py-2.5 text-center">等级</th>
              <th className="px-4 py-2.5 text-right">累计采购额</th>
              <th className="px-4 py-2.5 text-right">订单数</th>
              <th className="px-4 py-2.5 text-center">最近下单</th>
              <th className="px-4 py-2.5 text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => {
              const lv = LEVEL_MAP[m.type]
              return (
                <tr key={m.id} className="border-b border-[#f0f4f8] hover:bg-[#f8fafc] text-[13px]">
                  <td className="px-4 py-3">
                    <div className="font-medium text-[#1a1a2e]">{m.name}</div>
                    {m.tag && <div className="text-[11px] text-[#e8831a] mt-0.5">{m.tag}</div>}
                  </td>
                  <td className="px-4 py-3 text-[#555]">{m.contact}<br /><span className="text-[12px] text-[#6b7c93]">{m.phone}</span></td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold" style={{ color: lv.color, backgroundColor: lv.bg }}>{lv.label}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-[#e8831a]">{m.totalAmt}</td>
                  <td className="px-4 py-3 text-right">{m.orders}</td>
                  <td className="px-4 py-3 text-center text-[#6b7c93]">{m.lastOrder}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-[12px] text-[#1a5fa8] hover:underline mr-2">详情</button>
                    <button className="text-[12px] text-[#6b7c93] hover:underline">编辑</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
