"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowDown, ArrowUp, Eye } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const monthData = [
  { m: "3月", income: 3200, settle: 2800, fee: 96 },
  { m: "4月", income: 4100, settle: 3600, fee: 123 },
  { m: "5月", income: 3800, settle: 3300, fee: 114 },
  { m: "6月", income: 4600, settle: 4000, fee: 138 },
  { m: "7月", income: 5200, settle: 4500, fee: 156 },
  { m: "8月", income: 3800, settle: 3200, fee: 114 },
]

const records = [
  { id: "FS001", merchant: "广州粮油集团",       order: "PO2026080100120", type: "销售结算",   gross: "¥24,000", fee: "¥720",  net: "¥23,280", date: "2026-08-01", status: "settled" },
  { id: "FS002", merchant: "盒马超市采购部",     order: "PO2026080100119", type: "采购结算",   gross: "¥56,000", fee: "¥1,680", net: "¥54,320", date: "2026-08-01", status: "pending" },
  { id: "FS003", merchant: "广东农垦集团",       order: "PO2026073100086", type: "销售结算",   gross: "¥18,500", fee: "¥555",  net: "¥17,945", date: "2026-07-31", status: "settled" },
  { id: "FS004", merchant: "永辉超市广州区",     order: "PO2026073100085", type: "服务费",     gross: "¥8,200",  fee: "¥246",  net: "¥7,954",  date: "2026-07-31", status: "settled" },
  { id: "FS005", merchant: "深圳农产品流通",     order: "PO2026073000060", type: "采购结算",   gross: "¥12,000", fee: "¥360",  net: "¥11,640", date: "2026-07-30", status: "dispute" },
]

const settleStatusMap: Record<string, { label: string; color: string; bg: string }> = {
  settled: { label: "已结算", color: "#2e7d32", bg: "#e8f5e9" },
  pending: { label: "结算中", color: "#e8831a", bg: "#fff7ed" },
  dispute: { label: "争议中", color: "#dc2626", bg: "#fef2f2" },
}

const tabs = [
  { key: "settlement", label: "结算总览" },
  { key: "channel",    label: "结算渠道" },
  { key: "scene",      label: "业务场景" },
]

const channels = [
  { name: "微信支付",   vol: "¥1,248万", ratio: 42, status: "active" },
  { name: "支付宝",     vol: "¥964万",   ratio: 32, status: "active" },
  { name: "银行转账",   vol: "¥482万",   ratio: 16, status: "active" },
  { name: "银联支付",   vol: "¥301万",   ratio: 10, status: "active" },
]

const scenes = [
  { name: "竞拍交易结算",   fee: "1.5%", minFee: "¥50", maxFee: "¥5,000", status: "active" },
  { name: "询价订单结算",   fee: "1.0%", minFee: "¥20", maxFee: "¥3,000", status: "active" },
  { name: "订单农业结算",   fee: "0.8%", minFee: "¥10", maxFee: "¥2,000", status: "active" },
  { name: "集采结算",       fee: "1.2%", minFee: "¥30", maxFee: "¥4,000", status: "active" },
  { name: "平台服务费",     fee: "固定", minFee: "——",  maxFee: "——",      status: "active" },
]

export default function FinanceSettlementPage() {
  const [activeTab, setActiveTab] = useState("settlement")
  const [detailItem, setDetailItem] = useState<typeof records[0] | null>(null)

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[20px] font-bold text-[#1a1a2e]">财务管理</h1>
        <p className="text-[13px] text-[#6b7c93] mt-0.5">平台资金结算总览、渠道管理和业务场景配置</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#dde3ec]">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`px-5 py-2.5 text-[14px] font-medium border-b-2 transition-colors -mb-px ${activeTab === t.key ? "border-[#1a1a2e] text-[#1a1a2e]" : "border-transparent text-[#666] hover:text-[#1a1a2e]"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "settlement" && (
        <>
          {/* KPI row */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "本月总流水",   val: "¥3,800万", delta: "+12%",  up: true,  color: "#1a5fa8" },
              { label: "本月结算金额", val: "¥3,200万", delta: "+10%",  up: true,  color: "#2e7d32" },
              { label: "本月平台手续费", val: "¥114万", delta: "+8%",   up: true,  color: "#e8831a" },
              { label: "待结算金额",   val: "¥68万",    delta: "+2笔",  up: false, color: "#dc2626" },
            ].map(k => (
              <div key={k.label} className="bg-white rounded-xl border border-[#dde3ec] p-5">
                <div className="text-[13px] text-[#6b7c93] mb-2">{k.label}</div>
                <div className="text-[24px] font-bold mb-1" style={{ color: k.color }}>{k.val}</div>
                <div className={`text-[12px] flex items-center gap-0.5 ${k.up ? "text-[#2e7d32]" : "text-[#dc2626]"}`}>
                  {k.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {k.delta} 较上月
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl border border-[#dde3ec] p-5">
            <h2 className="text-[14px] font-semibold text-[#1a1a2e] mb-4">近6月结算趋势（万元）</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthData} barSize={24}>
                <XAxis dataKey="m" tick={{ fontSize: 12, fill: "#6b7c93" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#6b7c93" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="income" fill="#1a5fa8" radius={[4, 4, 0, 0]} name="总流水" />
                <Bar dataKey="settle" fill="#2e7d32" radius={[4, 4, 0, 0]} name="已结算" />
                <Bar dataKey="fee"    fill="#e8831a" radius={[4, 4, 0, 0]} name="手续费" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Records table */}
          <div className="bg-white rounded-xl border border-[#dde3ec]">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#dde3ec]">
              <span className="text-[14px] font-semibold text-[#1a1a2e]">结算明细</span>
              <Link href="#" className="text-[13px] text-[#1a5fa8] hover:underline">导出报表</Link>
            </div>
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-[#999] text-[12px] border-b border-[#f0f4f9]">
                  {["结算编号","商户","订单号","业务类型","总金额","手续费","实结金额","结算日","状态","操作"].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map(row => {
                  const st = settleStatusMap[row.status]
                  return (
                    <tr key={row.id} className="border-b border-[#f0f4f9] last:border-0 hover:bg-[#fafbfc]">
                      <td className="px-4 py-3 text-[#999] text-[12px]">{row.id}</td>
                      <td className="px-4 py-3 text-[#555]">{row.merchant}</td>
                      <td className="px-4 py-3 text-[#1a5fa8] text-[12px]">{row.order}</td>
                      <td className="px-4 py-3 text-[#555]">{row.type}</td>
                      <td className="px-4 py-3 font-semibold text-[#1a1a2e]">{row.gross}</td>
                      <td className="px-4 py-3 text-[#e8831a]">{row.fee}</td>
                      <td className="px-4 py-3 font-bold text-[#2e7d32]">{row.net}</td>
                      <td className="px-4 py-3 text-[#6b7c93]">{row.date}</td>
                      <td className="px-4 py-3"><span className="px-2.5 py-1 rounded-full text-[11px] font-medium" style={{ color: st.color, background: st.bg }}>{st.label}</span></td>
                      <td className="px-4 py-3"><button onClick={() => setDetailItem(row)} className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]"><Eye className="w-3.5 h-3.5" />详情</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === "channel" && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {channels.map(c => (
              <div key={c.name} className="bg-white rounded-xl border border-[#dde3ec] p-5">
                <h3 className="text-[15px] font-semibold text-[#1a1a2e] mb-3">{c.name}</h3>
                <div className="text-[24px] font-bold text-[#1a5fa8] mb-1">{c.vol}</div>
                <div className="text-[12px] text-[#6b7c93] mb-3">占比 {c.ratio}%</div>
                <div className="h-2 bg-[#f0f4f8] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1a5fa8] rounded-full" style={{ width: `${c.ratio}%` }} />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] text-[#2e7d32] font-medium">运行正常</span>
                  <button className="text-[12px] text-[#e8831a] hover:underline">配置</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "scene" && (
        <div className="bg-white rounded-xl border border-[#dde3ec]">
          <div className="px-5 py-3 border-b border-[#dde3ec]">
            <span className="text-[14px] font-semibold text-[#1a1a2e]">业务场景手续费配置</span>
          </div>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-[#999] text-[12px] border-b border-[#f0f4f9]">
                {["业务场景","费率","最低收费","最高收费","状态","操作"].map(h => <th key={h} className="px-5 py-2.5 text-left font-medium">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {scenes.map(row => (
                <tr key={row.name} className="border-b border-[#f0f4f9] last:border-0 hover:bg-[#fafbfc]">
                  <td className="px-5 py-3 font-medium text-[#1a1a2e]">{row.name}</td>
                  <td className="px-5 py-3 font-bold text-[#dc2626]">{row.fee}</td>
                  <td className="px-5 py-3 text-[#555]">{row.minFee}</td>
                  <td className="px-5 py-3 text-[#555]">{row.maxFee}</td>
                  <td className="px-5 py-3"><span className="px-2 py-0.5 rounded text-[11px] font-medium text-[#2e7d32] bg-[#e8f5e9]">已启用</span></td>
                  <td className="px-5 py-3"><button className="text-[#e8831a] hover:underline text-[12px]">编辑费率</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {detailItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setDetailItem(null)}>
          <div className="bg-white rounded-xl shadow-xl p-6 w-[480px]" onClick={e => e.stopPropagation()}>
            <h3 className="text-[16px] font-bold text-[#1a1a2e] mb-5">结算明细详情</h3>
            <div className="space-y-3">
              {[
                ["结算编号", detailItem.id], ["商户", detailItem.merchant], ["订单号", detailItem.order],
                ["业务类型", detailItem.type], ["总金额", detailItem.gross], ["手续费", detailItem.fee],
                ["实结金额", detailItem.net], ["结算日期", detailItem.date], ["状态", settleStatusMap[detailItem.status].label],
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
