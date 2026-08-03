"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, XCircle, Eye, Crown } from "lucide-react"

const applications = [
  { id: "UG001", company: "广州粮油集团",   currentLevel: "金牌会员", targetLevel: "VIP会员",    reason: "年度交易额超过200万，申请升级VIP", orders: 328, amt: "¥248万",  docs: "营业执照、交易流水",  submitTime: "2026-08-01", status: "pending" },
  { id: "UG002", company: "永辉超市广州区", currentLevel: "银牌会员", targetLevel: "金牌会员",   reason: "连续6个月活跃采购，申请升级金牌", orders: 216, amt: "¥86万",   docs: "采购合同",            submitTime: "2026-07-30", status: "pending" },
  { id: "UG003", company: "华润万家采购",   currentLevel: "VIP会员",  targetLevel: "超级会员",   reason: "年度累计交易额突破500万，申请超级会员资质", orders: 624, amt: "¥680万", docs: "营业执照、年度报表、交易流水", submitTime: "2026-07-28", status: "pending" },
  { id: "UG004", company: "东莞批发市场",   currentLevel: "普通会员", targetLevel: "银牌会员",   reason: "注册已满3个月，累计订单超50单", orders: 98, amt: "¥32万",    docs: "营业执照",            submitTime: "2026-07-25", status: "approved" },
  { id: "UG005", company: "深圳某农业公司", currentLevel: "普通会员", targetLevel: "银牌会员",   reason: "申请升级",                         orders: 12, amt: "¥1.8万",   docs: "营业执照",            submitTime: "2026-07-20", status: "rejected" },
  { id: "UG006", company: "广东农批中心",   currentLevel: "银牌会员", targetLevel: "金牌会员",   reason: "年交易额超过100万",                orders: 180, amt: "¥120万",  docs: "营业执照、交易流水",  submitTime: "2026-08-02", status: "pending" },
]

const levelColors: Record<string, string> = {
  "普通会员": "#6b7c93",
  "银牌会员": "#607d8b",
  "金牌会员": "#b45309",
  "VIP会员":  "#7c3aed",
  "超级会员": "#1a5fa8",
}

const statusMap: Record<string, { label: string; color: string; bg: string }> = {
  pending:  { label: "待审核", color: "#e8831a", bg: "#fff7ed" },
  approved: { label: "已通过", color: "#2e7d32", bg: "#e8f5e9" },
  rejected: { label: "已驳回", color: "#dc2626", bg: "#fef2f2" },
}

export default function MemberUpgradePage() {
  const [detailItem, setDetailItem] = useState<typeof applications[0] | null>(null)

  const pending = applications.filter(a => a.status === "pending")

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/member/list" className="flex items-center gap-1 text-[#6b7c93] hover:text-[#1a5fa8] text-[13px]">
          <ArrowLeft className="w-4 h-4" />返回会员列表
        </Link>
        <span className="text-[#dde3ec]">|</span>
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">企业升级审核</h1>
          <p className="text-[13px] text-[#6b7c93] mt-0.5">审核企业提交的会员等级升级申请</p>
        </div>
      </div>

      {/* Pending count */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border-2 border-[#e8831a] p-4">
          <div className="text-[13px] text-[#6b7c93] mb-1">待审核申请</div>
          <div className="text-[32px] font-bold text-[#e8831a]">{pending.length}</div>
          <div className="text-[12px] text-[#e8831a] mt-0.5">需尽快处理</div>
        </div>
        <div className="bg-white rounded-xl border border-[#dde3ec] p-4">
          <div className="text-[13px] text-[#6b7c93] mb-1">本月审核通过</div>
          <div className="text-[32px] font-bold text-[#2e7d32]">{applications.filter(a => a.status === "approved").length}</div>
        </div>
        <div className="bg-white rounded-xl border border-[#dde3ec] p-4">
          <div className="text-[13px] text-[#6b7c93] mb-1">本月审核驳回</div>
          <div className="text-[32px] font-bold text-[#dc2626]">{applications.filter(a => a.status === "rejected").length}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#dde3ec]">
        <div className="px-5 py-3 border-b border-[#dde3ec] flex items-center justify-between">
          <span className="text-[14px] font-semibold text-[#1a1a2e]">升级申请列表</span>
          <span className="text-[12px] text-[#6b7c93]">共 {applications.length} 条记录</span>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[#999] text-[12px] border-b border-[#f0f4f9]">
              {["申请编号","企业名称","当前等级","申请等级","申请原因","订单/金额","提交时间","状态","操作"].map(h => (
                <th key={h} className="px-5 py-2.5 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applications.map(row => {
              const st = statusMap[row.status]
              return (
                <tr key={row.id} className="border-b border-[#f0f4f9] last:border-0 hover:bg-[#fafbfc]">
                  <td className="px-5 py-3 text-[#999] text-[12px]">{row.id}</td>
                  <td className="px-5 py-3 font-medium text-[#1a1a2e]">{row.company}</td>
                  <td className="px-5 py-3">
                    <span className="text-[12px] font-medium px-2 py-0.5 rounded-full bg-[#f3f4f6]" style={{ color: levelColors[row.currentLevel] || "#6b7c93" }}>{row.currentLevel}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-1 text-[12px] font-medium w-fit" style={{ color: levelColors[row.targetLevel] || "#6b7c93" }}>
                      <Crown className="w-3 h-3" />{row.targetLevel}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[#555] max-w-[180px] truncate">{row.reason}</td>
                  <td className="px-5 py-3">
                    <div className="text-[#555]">{row.orders}单</div>
                    <div className="text-[12px] font-medium text-[#b45309]">{row.amt}</div>
                  </td>
                  <td className="px-5 py-3 text-[#6b7c93]">{row.submitTime}</td>
                  <td className="px-5 py-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-medium" style={{ color: st.color, background: st.bg }}>{st.label}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setDetailItem(row)} className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]"><Eye className="w-3.5 h-3.5" />详情</button>
                      {row.status === "pending" && (
                        <>
                          <button onClick={() => setDetailItem(row)} className="flex items-center gap-1 text-[#2e7d32] hover:underline text-[12px]"><CheckCircle className="w-3.5 h-3.5" />通过</button>
                          <button className="flex items-center gap-1 text-[#dc2626] hover:underline text-[12px]"><XCircle className="w-3.5 h-3.5" />驳回</button>
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

      {detailItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setDetailItem(null)}>
          <div className="bg-white rounded-xl shadow-xl p-6 w-[520px]" onClick={e => e.stopPropagation()}>
            <h3 className="text-[16px] font-bold text-[#1a1a2e] mb-5">升级申请详情</h3>
            <div className="space-y-3">
              {[
                ["申请编号", detailItem.id],
                ["企业名称", detailItem.company],
                ["当前等级", detailItem.currentLevel],
                ["申请等级", detailItem.targetLevel],
                ["申请原因", detailItem.reason],
                ["提交材料", detailItem.docs],
                ["订单数",   String(detailItem.orders)],
                ["累计交易", detailItem.amt],
                ["提交时间", detailItem.submitTime],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start gap-3 py-2 border-b border-[#f0f4f9] last:border-0">
                  <span className="text-[13px] text-[#999] w-20 shrink-0">{k}</span>
                  <span className="text-[13px] text-[#333] font-medium">{v}</span>
                </div>
              ))}
            </div>
            {detailItem.status === "pending" && (
              <div className="mt-4">
                <label className="block text-[13px] font-medium text-[#444] mb-1.5">审核意见</label>
                <textarea className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none" rows={3} placeholder="请输入审核意见..." />
              </div>
            )}
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setDetailItem(null)} className="px-4 py-2 border border-[#dde3ec] rounded text-[13px] text-[#555]">关闭</button>
              {detailItem.status === "pending" && (
                <>
                  <button onClick={() => setDetailItem(null)} className="px-4 py-2 border border-[#dc2626] text-[#dc2626] rounded text-[13px]">驳回申请</button>
                  <button onClick={() => setDetailItem(null)} className="px-4 py-2 bg-[#2e7d32] text-white rounded text-[13px]">审核通过</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
