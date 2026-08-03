"use client"

import { useState } from "react"
import { Trophy, FileText, CheckCircle2, Clock, Download, ChevronRight } from "lucide-react"
import Link from "next/link"

const notices = [
  { id: "WN2026080101", auctionNo: "AUC2026080001", title: "第28期粮食专场竞拍",  product: "广东丝苗米（一级）", qty: "50吨", winPrice: "¥5,800/吨", totalAmount: "¥290,000", winnedAt: "2026-08-01 10:30", deadline: "2026-08-08", status: "pending_contract" as const },
  { id: "WN2026072501", auctionNo: "AUC2026072501", title: "第26期蔬菜专场竞拍",  product: "有机西红柿（精品级）", qty: "20吨", winPrice: "¥3,200/吨", totalAmount: "¥64,000", winnedAt: "2026-07-25 14:00", deadline: "2026-08-01", status: "signed" as const },
  { id: "WN2026071001", auctionNo: "AUC2026071001", title: "第22期水果专场竞拍",  product: "妃子笑荔枝（精品）", qty: "8吨", winPrice: "¥18,000/吨", totalAmount: "¥144,000", winnedAt: "2026-07-10 11:20", deadline: "2026-07-17", status: "completed" as const },
]

const STATUS_MAP = {
  pending_contract: { label: "待签合同",  color: "#e8831a", bg: "#fff8f0" },
  signed:           { label: "合同已签",  color: "#1a5fa8", bg: "#e8f4fd" },
  completed:        { label: "交易完成",  color: "#3a8c3f", bg: "#e8f5e9" },
}

export default function WinNoticePage() {
  const [selected, setSelected] = useState<string | null>(null)
  const notice = notices.find(n => n.id === selected)

  return (
    <div className="max-w-[900px] space-y-5">
      <div>
        <h1 className="text-[20px] font-bold text-[#1a1a2e] mb-1">中标通知书</h1>
        <p className="text-[13px] text-[#6b7c93]">查看参与竞拍活动的中标结果，及时签署合同完成交易。</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "全部中标",  value: notices.length, color: "#1a5fa8" },
          { label: "待签合同",  value: notices.filter(n => n.status === "pending_contract").length, color: "#e8831a" },
          { label: "交易完成",  value: notices.filter(n => n.status === "completed").length, color: "#3a8c3f" },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-lg border border-[#e8edf5] p-4 flex items-center gap-3">
            <div className="text-[26px] font-bold" style={{ color: c.color }}>{c.value}</div>
            <div className="text-[12px] text-[#6b7c93]">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {notices.map(n => {
          const s = STATUS_MAP[n.status]
          return (
            <div key={n.id} className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
              <div className="px-5 py-3 bg-[#f8fafc] border-b border-[#e8edf5] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trophy className="w-4 h-4 text-[#e8831a]" />
                  <span className="text-[13px] font-semibold text-[#1a1a2e]">{n.title}</span>
                  <span className="text-[12px] text-[#999] font-mono">{n.auctionNo}</span>
                </div>
                <span className="px-2.5 py-1 rounded text-[12px] font-medium" style={{ color: s.color, background: s.bg }}>{s.label}</span>
              </div>
              <div className="px-5 py-4 flex gap-6">
                <div className="flex-1 grid grid-cols-3 gap-4 text-[13px]">
                  {[
                    { label: "中标商品", value: n.product },
                    { label: "中标数量", value: n.qty },
                    { label: "中标单价", value: n.winPrice },
                    { label: "合同总额", value: n.totalAmount },
                    { label: "中标时间", value: n.winnedAt },
                    { label: "合同截止", value: n.deadline },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="text-[12px] text-[#999] mb-0.5">{item.label}</div>
                      <div className="font-medium text-[#1a1a2e]">{item.value}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2 w-[140px] shrink-0 justify-center">
                  <button onClick={() => setSelected(n.id)} className="py-2 border border-[#1a5fa8] text-[#1a5fa8] text-[12px] rounded hover:bg-[#e8f4fd] transition-colors flex items-center justify-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />查看通知书
                  </button>
                  {n.status === "pending_contract" && (
                    <Link href="/merchant/contract/list" className="py-2 bg-[#e8831a] text-white text-[12px] rounded hover:bg-[#d4741a] transition-colors text-center flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />前往签合同
                    </Link>
                  )}
                  <button className="py-2 border border-[#e8edf5] text-[#6b7c93] text-[12px] rounded hover:bg-[#f5f7fa] flex items-center justify-center gap-1.5">
                    <Download className="w-3.5 h-3.5" />下载PDF
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 中标通知书弹窗 */}
      {selected && notice && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[600px] shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-[#f0f4f8] flex items-center justify-between">
              <span className="text-[15px] font-semibold">中标通知书</span>
              <button onClick={() => setSelected(null)} className="text-[#aaa] text-lg">×</button>
            </div>
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fff8f0] rounded-full mb-4">
                  <Trophy className="w-5 h-5 text-[#e8831a]" />
                  <span className="text-[#e8831a] font-bold text-[14px]">恭喜您竞拍成功！</span>
                </div>
                <h2 className="text-[22px] font-bold text-[#1a1a2e] mb-1">中 标 通 知 书</h2>
                <p className="text-[12px] text-[#999]">编号：{notice.id}</p>
              </div>
              <div className="bg-[#f8fafc] rounded-xl p-6 space-y-3 text-[13px] mb-6">
                {[
                  ["竞拍项目", notice.title],
                  ["中标企业", "盒马超市采购部"],
                  ["中标商品", notice.product],
                  ["中标数量", notice.qty],
                  ["中标单价", notice.winPrice],
                  ["合同总金额", notice.totalAmount],
                  ["中标时间", notice.winnedAt],
                  ["合同签署截止", notice.deadline],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-center border-b border-[#e8edf5] pb-2 last:border-0 last:pb-0">
                    <span className="text-[#999]">{label}</span>
                    <span className="font-medium text-[#1a1a2e]">{value}</span>
                  </div>
                ))}
              </div>
              <p className="text-[12px] text-[#6b7c93] bg-[#fff8f0] rounded p-3 mb-6">
                请在合同签署截止日期前完成合同签署，逾期视为放弃中标资格，保证金将不予退还。
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setSelected(null)} className="px-6 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded">关闭</button>
                <button className="flex items-center gap-1.5 px-5 py-2 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded hover:bg-[#e8f4fd]">
                  <Download className="w-3.5 h-3.5" />下载PDF
                </button>
                {notice.status === "pending_contract" && (
                  <Link href="/merchant/contract/list" className="flex items-center gap-1.5 px-6 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]">
                    <ChevronRight className="w-3.5 h-3.5" />前往签署合同
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
