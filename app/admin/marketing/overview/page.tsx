"use client"

import { useState } from "react"
import { Plus, Eye, Pencil, ToggleLeft, ToggleRight, Gift } from "lucide-react"

const tabs = [
  { key: "hongbao", label: "红包管理" },
  { key: "coupon",  label: "卡券管理" },
  { key: "points",  label: "积分规则" },
]

const hongbaos = [
  { id: "HB001", name: "新用户注册红包",     type: "固定金额", amt: "¥10.00", budget: "¥100,000", used: "¥38,400", qty: 3840, status: "active",  exp: "2026-12-31" },
  { id: "HB002", name: "首单满减红包",       type: "满减券",   amt: "¥50减5", budget: "¥50,000",  used: "¥22,500", qty: 450,  status: "active",  exp: "2026-09-30" },
  { id: "HB003", name: "618年中大促红包",    type: "随机金额", amt: "¥1-20",  budget: "¥200,000", used: "¥200,000", qty: 12000, status: "ended", exp: "2026-06-18" },
]

const coupons = [
  { id: "CQ001", name: "粮食类优惠券",   disc: "9折",   minAmt: "¥500起", total: 5000, used: 1280, status: "active", exp: "2026-10-31" },
  { id: "CQ002", name: "水果类优惠券",   disc: "8折",   minAmt: "¥200起", total: 3000, used: 980,  status: "active", exp: "2026-09-30" },
  { id: "CQ003", name: "新客专享券",     disc: "¥20减", minAmt: "¥100起", total: 10000, used: 3200, status: "active", exp: "2026-12-31" },
]

const pointRules = [
  { id: "PR001", name: "下单获积分",     rule: "每消费¥1获1积分",  multi: "×1",   status: "active" },
  { id: "PR002", name: "签到获积分",     rule: "每日签到获10积分", multi: "×10",  status: "active" },
  { id: "PR003", name: "积分抵扣",       rule: "100积分抵¥1",      multi: "×0.01", status: "active" },
  { id: "PR004", name: "会员专属倍率",   rule: "VIP会员消费×2积分", multi: "×2",  status: "active" },
]

export default function MarketingOverviewPage() {
  const [activeTab, setActiveTab] = useState("hongbao")
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">营销管理</h1>
          <p className="text-[13px] text-[#6b7c93] mt-0.5">管理平台红包、卡券和积分营销活动</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-4 py-2 bg-[#1a1a2e] text-white text-[13px] rounded hover:bg-[#2d2d4e] transition-colors">
          <Plus className="w-3.5 h-3.5" />新增活动
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "累计发放红包",   value: "¥260,900", color: "#dc2626" },
          { label: "已核销卡券",     value: "5,460张",   color: "#7c3aed" },
          { label: "平台积分总量",   value: "12.4万分",  color: "#e8831a" },
          { label: "本月营销费用",   value: "¥38,400",   color: "#1a5fa8" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-[#dde3ec] p-4">
            <div className="text-[13px] text-[#6b7c93] mb-2">{s.label}</div>
            <div className="text-[22px] font-bold" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-[#dde3ec]">
        <div className="flex border-b border-[#dde3ec] px-4">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`px-4 py-3 text-[13px] font-medium border-b-2 transition-colors ${activeTab === t.key ? "border-[#1a1a2e] text-[#1a1a2e]" : "border-transparent text-[#666] hover:text-[#1a1a2e]"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "hongbao" && (
          <table className="w-full text-[13px]">
            <thead><tr className="text-[#999] text-[12px] border-b border-[#f0f4f9]">
              {["编号","活动名称","类型","面额","预算","已使用","发放量","状态","有效期","操作"].map(h => <th key={h} className="px-4 py-2.5 text-left font-medium">{h}</th>)}
            </tr></thead>
            <tbody>
              {hongbaos.map(row => (
                <tr key={row.id} className="border-b border-[#f0f4f9] last:border-0 hover:bg-[#fafbfc]">
                  <td className="px-4 py-3 text-[#999] text-[12px]">{row.id}</td>
                  <td className="px-4 py-3 font-medium text-[#1a1a2e]">{row.name}</td>
                  <td className="px-4 py-3 text-[#555]">{row.type}</td>
                  <td className="px-4 py-3 font-bold text-[#dc2626]">{row.amt}</td>
                  <td className="px-4 py-3 text-[#555]">{row.budget}</td>
                  <td className="px-4 py-3 text-[#e8831a]">{row.used}</td>
                  <td className="px-4 py-3 text-[#555]">{row.qty.toLocaleString()}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-[11px] font-medium ${row.status === "active" ? "text-[#2e7d32] bg-[#e8f5e9]" : "text-[#6b7280] bg-[#f3f4f6]"}`}>{row.status === "active" ? "进行中" : "已结束"}</span></td>
                  <td className="px-4 py-3 text-[#6b7c93]">{row.exp}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><button className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]"><Eye className="w-3.5 h-3.5" />详情</button><button className="flex items-center gap-1 text-[#e8831a] hover:underline text-[12px]"><Pencil className="w-3.5 h-3.5" />编辑</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "coupon" && (
          <table className="w-full text-[13px]">
            <thead><tr className="text-[#999] text-[12px] border-b border-[#f0f4f9]">
              {["编号","卡券名称","折扣","使用门槛","发行量","已核销","状态","有效期","操作"].map(h => <th key={h} className="px-4 py-2.5 text-left font-medium">{h}</th>)}
            </tr></thead>
            <tbody>
              {coupons.map(row => (
                <tr key={row.id} className="border-b border-[#f0f4f9] last:border-0 hover:bg-[#fafbfc]">
                  <td className="px-4 py-3 text-[#999] text-[12px]">{row.id}</td>
                  <td className="px-4 py-3 font-medium text-[#1a1a2e]">{row.name}</td>
                  <td className="px-4 py-3 font-bold text-[#7c3aed]">{row.disc}</td>
                  <td className="px-4 py-3 text-[#555]">{row.minAmt}</td>
                  <td className="px-4 py-3 text-[#555]">{row.total.toLocaleString()}</td>
                  <td className="px-4 py-3 text-[#e8831a]">{row.used.toLocaleString()}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-[11px] font-medium text-[#2e7d32] bg-[#e8f5e9]">进行中</span></td>
                  <td className="px-4 py-3 text-[#6b7c93]">{row.exp}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><button className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]"><Eye className="w-3.5 h-3.5" />详情</button><button className="flex items-center gap-1 text-[#e8831a] hover:underline text-[12px]"><Pencil className="w-3.5 h-3.5" />编辑</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "points" && (
          <table className="w-full text-[13px]">
            <thead><tr className="text-[#999] text-[12px] border-b border-[#f0f4f9]">
              {["规则编号","规则名称","规则说明","倍率","状态","操作"].map(h => <th key={h} className="px-4 py-2.5 text-left font-medium">{h}</th>)}
            </tr></thead>
            <tbody>
              {pointRules.map(row => (
                <tr key={row.id} className="border-b border-[#f0f4f9] last:border-0 hover:bg-[#fafbfc]">
                  <td className="px-4 py-3 text-[#999] text-[12px]">{row.id}</td>
                  <td className="px-4 py-3 font-medium text-[#1a1a2e]">{row.name}</td>
                  <td className="px-4 py-3 text-[#555]">{row.rule}</td>
                  <td className="px-4 py-3 font-bold text-[#e8831a]">{row.multi}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-[11px] font-medium text-[#2e7d32] bg-[#e8f5e9]">启用</span></td>
                  <td className="px-4 py-3"><button className="flex items-center gap-1 text-[#e8831a] hover:underline text-[12px]"><Pencil className="w-3.5 h-3.5" />编辑规则</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl shadow-xl p-6 w-[480px]" onClick={e => e.stopPropagation()}>
            <h3 className="text-[16px] font-bold text-[#1a1a2e] mb-5">新增营销活动</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-[#444] mb-1.5">活动类型</label>
                <select className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] focus:outline-none focus:border-[#1a5fa8]">
                  <option>红包活动</option><option>卡券活动</option><option>积分规则</option>
                </select>
              </div>
              {[{ label: "活动名称", placeholder: "请输入活动名称" }, { label: "面额/折扣", placeholder: "如：¥10 或 9折" }, { label: "预算金额", placeholder: "如：100000" }].map(f => (
                <div key={f.label}>
                  <label className="block text-[13px] font-medium text-[#444] mb-1.5">{f.label}</label>
                  <input placeholder={f.placeholder} className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-[#dde3ec] rounded text-[13px] text-[#555]">取消</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-[#1a5fa8] text-white rounded text-[13px] hover:bg-[#0d4a8a]">保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
