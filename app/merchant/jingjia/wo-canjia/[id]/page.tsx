"use client"

import Link from "next/link"
import { ChevronLeft, TrendingUp, XCircle, Clock, CheckCircle2, ExternalLink } from "lucide-react"

const BID = {
  id: "b001",
  sessionTitle: "2026年春季粮食竞价专场（第12期）",
  sessionId: "session-001",
  goodName: "优选青苗软香米",
  bidType: "升价拍",
  unit: "吨",
  totalQty: "200吨",
  organizer: "广东省粮食交易中心",
  sessionStatus: "bidding" as keyof typeof STATUS_CONFIG,
  endTime: "2026-04-20 16:00",
  startTime: "2026-04-20 09:00",
  deposit: "50万元",
  depositPaid: true,
  // 我的出价
  myLatestPrice: "2080元/吨",
  myBidCount: 4,
  isLeading: true,
  currentTopPrice: "2080元/吨",
  secondPrice: "2070元/吨",
  reservePrice: "1900元/吨",
  // 出价记录
  bidHistory: [
    { time: "2026-04-20 14:52:08", price: "2080元/吨", isMe: true,  company: "盒马超市采购部",      remark: "加价出价" },
    { time: "2026-04-20 14:50:31", price: "2070元/吨", isMe: false, company: "永辉超市广州采购中心",  remark: "" },
    { time: "2026-04-20 14:48:20", price: "2060元/吨", isMe: true,  company: "盒马超市采购部",      remark: "" },
    { time: "2026-04-20 14:45:00", price: "2050元/吨", isMe: false, company: "广百集团采购中心",     remark: "" },
    { time: "2026-04-20 14:40:12", price: "2040元/吨", isMe: true,  company: "盒马超市采购部",      remark: "首次出价" },
    { time: "2026-04-20 14:38:00", price: "2030元/吨", isMe: false, company: "永辉超市广州采购中心",  remark: "" },
  ],
  // 商品信息
  goodDesc: "优选青苗软香米，产地广东台山，采用传统种植工艺，口感软糯，香气浓郁。",
  qualityStd: "GB/T 1354-2018 一等，水分≤13.5%，整精米率≥70%",
  basePrice: "1900元/吨",
  bidStep: "10元/吨",
}

const STATUS_CONFIG = {
  bidding:  { label: "进行中", bg: "bg-[#fef2f2]", text: "text-[#cc2222]", icon: Clock },
  upcoming: { label: "待开始", bg: "bg-[#fff7ed]", text: "text-[#e8831a]", icon: Clock },
  won:      { label: "已中标", bg: "bg-[#e8f9f0]", text: "text-[#1a8a3f]", icon: CheckCircle2 },
  lost:     { label: "未中标", bg: "bg-[#f5f5f5]", text: "text-[#999]",    icon: XCircle },
}

function Section({ title, accent = "#1a5fa8", children }: { title: string; accent?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
      <div className="px-5 py-3 bg-[#f8fafc] border-b border-[#e8edf5] flex items-center gap-2">
        <span className="w-0.5 h-4 rounded-full inline-block" style={{ background: accent }} />
        <span className="text-[13px] font-semibold text-[#333]">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-3 py-2 border-b border-[#f5f7fa] last:border-0 text-[13px]">
      <span className="text-[#999] w-28 shrink-0 text-right">{label}</span>
      <span className="text-[#333] flex-1">{value}</span>
    </div>
  )
}

export default function BidDetailPage() {
  const b = BID
  const sc = STATUS_CONFIG[b.sessionStatus]
  const StatusIcon = sc.icon

  return (
<div className="max-w-[900px] space-y-4">
        {/* 面包屑 */}
        <div className="flex items-center gap-1.5 text-[13px] text-[#999]">
          <Link href="/merchant/jingjia/wo-canjia" className="flex items-center gap-1 hover:text-[#1a5fa8] transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />我参与的竞拍
          </Link>
          <span>›</span>
          <span className="text-[#333]">竞拍详情</span>
        </div>

        {/* 状态横幅 */}
        <div className={`rounded-lg p-5 flex items-center justify-between ${sc.bg.replace("bg-", "bg-")}`}
          style={{ background: b.sessionStatus === "bidding" ? "#fef2f2" : b.sessionStatus === "upcoming" ? "#fff7ed" : b.sessionStatus === "won" ? "#e8f9f0" : "#f5f5f5" }}
        >
          <div className="flex items-center gap-3">
            <StatusIcon className={`w-8 h-8 ${sc.text}`} />
            <div>
              <div className={`text-[16px] font-bold ${sc.text}`}>{sc.label}</div>
              {b.isLeading && b.sessionStatus === "bidding" && (
                <div className="text-[12px] text-[#1a8a3f] flex items-center gap-1 mt-0.5">
                  <TrendingUp className="w-3.5 h-3.5" />当前领先，继续保持！
                </div>
              )}
              {!b.isLeading && b.sessionStatus === "bidding" && (
                <div className="text-[12px] text-[#cc2222] flex items-center gap-1 mt-0.5">
                  <XCircle className="w-3.5 h-3.5" />已被其他买家超出，请及时加价
                </div>
              )}
              {b.sessionStatus === "won" && (
                <div className="text-[12px] text-[#1a8a3f] mt-0.5">恭喜您以 {b.myLatestPrice} 成功中标</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {b.sessionStatus === "bidding" && (
              <Link
                href={`/portal/jingjia-jiaoyi/${b.sessionId}`}
                className="flex items-center gap-1.5 px-5 h-9 bg-[#cc2222] text-white text-[13px] font-semibold rounded hover:bg-[#aa1a1a] transition-colors"
              >
                立即出价 <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}
            <div className="text-right text-[12px] text-[#6b7c93]">
              <div>结束时间</div>
              <div className="font-semibold text-[#333]">{b.endTime}</div>
            </div>
          </div>
        </div>

        {/* 当前报价状态 */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "我的最新出价", value: b.myLatestPrice, color: b.isLeading ? "#1a8a3f" : "#cc2222" },
            { label: "当前最高价",   value: b.currentTopPrice, color: "#cc2222" },
            { label: "第二高价",     value: b.secondPrice, color: "#e8831a" },
            { label: "起拍底价",     value: b.reservePrice, color: "#6b7c93" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-[#e8edf5] rounded-lg px-4 py-3 text-center">
              <div className="text-[12px] text-[#999] mb-1">{s.label}</div>
              <div className="text-[15px] font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* 竞拍商品信息 */}
        <Section title="竞拍商品">
          <div className="grid grid-cols-2 gap-x-8">
            <Field label="专场名称" value={
              <Link href={`/portal/jingjia-jiaoyi/${b.sessionId}`} className="text-[#1a5fa8] hover:underline flex items-center gap-1">
                {b.sessionTitle} <ExternalLink className="w-3 h-3" />
              </Link>
            } />
            <Field label="主办方" value={b.organizer} />
            <Field label="竞拍商品" value={b.goodName} />
            <Field label="竞拍方式" value={b.bidType} />
            <Field label="总数量" value={b.totalQty} />
            <Field label="起拍价" value={b.basePrice} />
            <Field label="最小加价幅" value={b.bidStep} />
            <Field label="我的出价次数" value={`${b.myBidCount} 次`} />
            <Field label="保证金" value={b.deposit} />
            <Field label="已缴保证金" value={b.depositPaid ? <span className="text-[#1a8a3f]">已缴纳</span> : <span className="text-[#e8831a]">未缴纳</span>} />
          </div>
          {b.goodDesc && <div className="mt-2 pt-3 border-t border-[#f5f7fa]"><Field label="商品描述" value={b.goodDesc} /></div>}
          {b.qualityStd && <Field label="质检标准" value={b.qualityStd} />}
        </Section>

        {/* 出价记录 */}
        <Section title="出价记录">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e8edf5] text-[12px] text-[#888]">
                {["出价时间", "出价金额", "出价方", "备注"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.bidHistory.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-[#f5f7fa] last:border-0 transition-colors ${
                    row.isMe ? "bg-[#f0f7ff] hover:bg-[#e8f4fd]" : "hover:bg-[#fafcff]"
                  }`}
                >
                  <td className="px-4 py-2.5 text-[#6b7c93]">{row.time}</td>
                  <td className="px-4 py-2.5">
                    <span className={`font-semibold ${i === 0 ? "text-[#cc2222] text-[14px]" : "text-[#333]"}`}>
                      {row.price}
                    </span>
                    {i === 0 && (
                      <span className="ml-2 px-1.5 py-0.5 bg-[#fef2f2] text-[#cc2222] text-[10px] rounded">当前最高</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={row.isMe ? "text-[#1a5fa8] font-semibold" : "text-[#333]"}>
                      {row.company}
                    </span>
                    {row.isMe && <span className="ml-1.5 text-[11px] text-[#1a5fa8]">（我）</span>}
                  </td>
                  <td className="px-4 py-2.5 text-[#6b7c93]">{row.remark || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* 底部操作 */}
        <div className="flex items-center gap-3 pb-4">
          <Link
            href="/merchant/jingjia/wo-canjia"
            className="flex items-center gap-1.5 px-5 h-9 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />返回列表
          </Link>
          <Link
            href={`/portal/jingjia-jiaoyi/${b.sessionId}`}
            className="flex items-center gap-1.5 px-5 h-9 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded hover:bg-[#e8f4fd] transition-colors"
          >
            进入竞价专场 <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
)
}
