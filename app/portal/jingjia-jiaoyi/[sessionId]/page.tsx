"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ChevronLeft, Clock, Users, Eye, FileText, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react"

/* ─── Types ─── */
interface GoodRow {
  id: string
  name: string
  spec: string
  qty: string
  startPrice: string
  currentPrice: string
  increment: string
  settlement: string
  delivery: string
  status: "bidding" | "waiting" | "sold"
  bidCount: number
  winner: string
}

interface BidRecord {
  time: string
  company: string
  price: string
  round: number
}

/* ─── Mock data ─── */
const SESSION = {
  id: "a001",
  title: "2026年春季粮食竞价专场（第12期）",
  organizer: "广东省粮食交易中心",
  contact: "张经理  138****8888",
  bidType: "升价拍(英式拍)",
  demandType: "组合销售",
  allowExtend: "允许",
  sessionDuration: "300秒",
  deposit: "50万元",
  startTime: "2026-04-20 10:00",
  endTime: "2026-04-20 16:00",
  announcement: "本专场为广东省春季粮食统采竞价专场，共2轮次6个品种。参拍企业需完成保证金缴纳，担保交易通过建行龙存管或工行安心付完成。竞价采用英式升价拍卖，每次加价不低于加价幅度，竞价节时长300秒，允许延时。中标企业须在3个工作日内完成签约。",
}

const GOODS: GoodRow[] = [
  { id: "g1", name: "优选青苗软香米", spec: "25KG/袋", qty: "1000吨", startPrice: "2010元/吨", currentPrice: "2080元/吨", increment: "10元/吨", settlement: "建行龙存管", delivery: "买家自提", status: "bidding", bidCount: 12, winner: "" },
  { id: "g2", name: "粮芯谷稻油粘米", spec: "25KG/袋", qty: "900吨",  startPrice: "2000元/吨", currentPrice: "2040元/吨", increment: "5元/吨",  settlement: "建行龙存管", delivery: "买家自提", status: "bidding", bidCount: 8,  winner: "" },
  { id: "g3", name: "优选南晶香占",   spec: "15KG/袋", qty: "800吨",  startPrice: "2120元/吨", currentPrice: "2120元/吨", increment: "15元/吨", settlement: "工行安心付", delivery: "卖家配送", status: "waiting", bidCount: 0,  winner: "" },
  { id: "g4", name: "优选某某米",     spec: "25KG/袋", qty: "1200吨", startPrice: "2180元/吨", currentPrice: "2180元/吨", increment: "10元/吨", settlement: "工行安心付", delivery: "卖家配送", status: "waiting", bidCount: 0,  winner: "" },
  { id: "g5", name: "黄花占米",       spec: "25KG/袋", qty: "2000吨", startPrice: "2030元/吨", currentPrice: "2110元/吨", increment: "20元/吨", settlement: "建行龙存管", delivery: "卖家配送", status: "sold",    bidCount: 6,  winner: "广州某某贸易有限公司" },
  { id: "g6", name: "特选晚粳米",     spec: "10KG/袋", qty: "700吨",  startPrice: "3200元/吨", currentPrice: "3200元/吨", increment: "20元/吨", settlement: "建行龙存管", delivery: "卖家配送", status: "waiting", bidCount: 0,  winner: "" },
]

const BID_RECORDS: BidRecord[] = [
  { time: "10:42:18", company: "广州新供销天润米业有限公司",         price: "2080元/吨", round: 1 },
  { time: "10:41:03", company: "惠州新供销天润粮油储备有限公司",     price: "2070元/吨", round: 1 },
  { time: "10:39:55", company: "深圳供销农产品贸易有限公司",         price: "2060元/吨", round: 1 },
  { time: "10:38:02", company: "广州新供销天润米业有限公司",         price: "2050元/吨", round: 1 },
  { time: "10:36:45", company: "东莞新供销天润农产品有限公司",       price: "2040元/吨", round: 1 },
]

const STATUS_CFG = {
  bidding: { label: "竞拍中", bg: "bg-[#fef2f2]", text: "text-[#cc2222]", dot: "bg-[#cc2222] animate-pulse" },
  waiting: { label: "待竞拍", bg: "bg-[#f5f7fa]", text: "text-[#666]",    dot: "bg-[#aaa]" },
  sold:    { label: "已成交", bg: "bg-[#e8f9f0]", text: "text-[#1a8a3f]", dot: "bg-[#1a8a3f]" },
}

/* ─── Countdown hook ─── */
function useCountdown(initial: number) {
  const [secs, setSecs] = useState(initial)
  useEffect(() => {
    if (secs <= 0) return
    const t = setInterval(() => setSecs((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [secs])
  const h = String(Math.floor(secs / 3600)).padStart(2, "0")
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0")
  const s = String(secs % 60).padStart(2, "0")
  return `${h}:${m}:${s}`
}

/* ─── Page ─── */
export default function SessionDetailPage() {
  const countdown = useCountdown(8324)
  const [myBidPrice, setMyBidPrice] = useState("")
  const [bidSuccess, setBidSuccess] = useState(false)
  const [activeGood, setActiveGood] = useState("g1")

  const currentGood = GOODS.find((g) => g.id === activeGood) ?? GOODS[0]

  const handleBid = () => {
    if (!myBidPrice) return
    setBidSuccess(true)
    setTimeout(() => setBidSuccess(false), 3000)
    setMyBidPrice("")
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div className="bg-white border-b border-[#dde3ec] px-6 py-2.5">
          <div className="max-w-[1100px] mx-auto flex items-center gap-2 text-[13px] text-[#999]">
            <Link href="/portal" className="hover:text-[#1a5fa8]">首页</Link>
            <span>/</span>
            <Link href="/portal/jingjia-jiaoyi" className="hover:text-[#1a5fa8]">竞价交易</Link>
            <span>/</span>
            <span className="text-[#333]">{SESSION.title}</span>
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto px-6 py-6">

          {/* Session header */}
          <div className="bg-white rounded-lg border border-[#dde3ec] p-5 mb-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fef2f2] text-[#cc2222] text-[12px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#cc2222] animate-pulse" />
                    进行中
                  </span>
                  <span className="px-2 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[12px] rounded">{SESSION.bidType}</span>
                  <span className="px-2 py-0.5 bg-[#f0fdf4] text-[#3a8c3f] text-[12px] rounded">{SESSION.demandType}</span>
                </div>
                <h1 className="text-[20px] font-bold text-[#1a1a2e] mb-1.5">{SESSION.title}</h1>
                <p className="text-[13px] text-[#6b7c93]">主办方：{SESSION.organizer} · 联系人：{SESSION.contact}</p>
              </div>
              {/* Countdown */}
              <div className="shrink-0 text-center bg-[#1a1a2e] rounded-lg px-6 py-3">
                <div className="text-[11px] text-white/60 mb-1">距专场结束</div>
                <div className="text-[28px] font-mono font-bold text-[#f97316] tracking-widest">{countdown}</div>
                <div className="text-[11px] text-white/60 mt-1">{SESSION.endTime} 截止</div>
              </div>
            </div>

            {/* Meta grid */}
            <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-[#e8edf5] text-[13px]">
              {[
                { label: "是否延时",   value: SESSION.allowExtend   },
                { label: "交易节时长", value: SESSION.sessionDuration },
                { label: "保证金",     value: SESSION.deposit        },
                { label: "开始时间",   value: SESSION.startTime      },
              ].map((m) => (
                <div key={m.label}>
                  <span className="text-[#999]">{m.label}：</span>
                  <span className="text-[#333] font-medium">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-5">
            {/* Left */}
            <div className="flex-1 min-w-0">

              {/* Goods table */}
              <div className="bg-white rounded-lg border border-[#dde3ec] mb-5 overflow-hidden">
                <div className="px-5 py-3 border-b border-[#e8edf5] flex items-center justify-between">
                  <h2 className="text-[15px] font-semibold text-[#1a1a2e]">竞拍商品列表</h2>
                  <span className="text-[13px] text-[#6b7c93]">共 {GOODS.length} 个商品</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-[#e8edf5]">
                        {["状态", "商品名称", "规格", "数量", "起拍价", "当前价", "加价幅度", "出价次数", "操作"].map((h) => (
                          <th key={h} className="px-3 py-2.5 text-left text-[12px] font-semibold text-[#555] whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {GOODS.map((g) => {
                        const sc = STATUS_CFG[g.status]
                        const isActive = activeGood === g.id
                        return (
                          <tr
                            key={g.id}
                            onClick={() => setActiveGood(g.id)}
                            className={`border-b border-[#e8edf5] last:border-0 cursor-pointer transition-colors ${isActive ? "bg-[#e8f4fd]" : "hover:bg-[#f8fafc]"}`}
                          >
                            <td className="px-3 py-3">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${sc.bg} ${sc.text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                                {sc.label}
                              </span>
                            </td>
                            <td className="px-3 py-3 font-medium text-[#1a1a2e]">{g.name}</td>
                            <td className="px-3 py-3 text-[#6b7c93]">{g.spec}</td>
                            <td className="px-3 py-3">{g.qty}</td>
                            <td className="px-3 py-3 text-[#666]">{g.startPrice}</td>
                            <td className="px-3 py-3 font-bold text-[#cc2222]">{g.currentPrice}</td>
                            <td className="px-3 py-3 text-[#6b7c93]">{g.increment}</td>
                            <td className="px-3 py-3">{g.bidCount}</td>
                            <td className="px-3 py-3">
                              <button
                                onClick={(e) => { e.stopPropagation(); setActiveGood(g.id) }}
                                className="text-[#1a5fa8] hover:underline text-[12px]"
                              >
                                出价
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bid records */}
              <div className="bg-white rounded-lg border border-[#dde3ec] overflow-hidden">
                <div className="px-5 py-3 border-b border-[#e8edf5]">
                  <h2 className="text-[15px] font-semibold text-[#1a1a2e]">出价记录</h2>
                </div>
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b border-[#e8edf5]">
                      {["出价时间", "参拍企业", "出价金额", "轮次"].map((h) => (
                        <th key={h} className="px-4 py-2.5 text-left text-[12px] font-semibold text-[#555]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {BID_RECORDS.map((r, i) => (
                      <tr key={i} className={`border-b border-[#e8edf5] last:border-0 ${i === 0 ? "bg-[#fffbf0]" : ""}`}>
                        <td className="px-4 py-3 font-mono text-[12px] text-[#6b7c93]">{r.time}</td>
                        <td className="px-4 py-3 font-medium text-[#1a1a2e]">
                          {i === 0 && <TrendingUp className="inline w-3.5 h-3.5 text-[#e8831a] mr-1" />}
                          {r.company}
                        </td>
                        <td className="px-4 py-3 font-bold text-[#cc2222]">{r.price}</td>
                        <td className="px-4 py-3 text-[#6b7c93]">第{r.round}轮</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: bid panel */}
            <div className="w-[300px] shrink-0 space-y-4">

              {/* Active good bid card */}
              <div className="bg-white rounded-lg border border-[#1a5fa8] overflow-hidden sticky top-4">
                <div className="bg-[#1a5fa8] px-4 py-3">
                  <div className="text-[11px] text-white/70 mb-0.5">当前竞拍商品</div>
                  <div className="text-[14px] font-bold text-white">{currentGood.name}</div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#999]">数量</span>
                    <span className="font-medium">{currentGood.qty}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#999]">起拍价</span>
                    <span className="text-[#666]">{currentGood.startPrice}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#999]">加价幅度</span>
                    <span className="text-[#1a5fa8] font-medium">{currentGood.increment}</span>
                  </div>
                  <div className="flex justify-between text-[13px] items-center">
                    <span className="text-[#999]">当前最高价</span>
                    <span className="text-[22px] font-bold text-[#cc2222] leading-tight">{currentGood.currentPrice}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#999]">配送方式</span>
                    <span>{currentGood.delivery}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#999]">结算渠道</span>
                    <span className="text-right text-[12px]">{currentGood.settlement}</span>
                  </div>

                  {currentGood.status === "bidding" ? (
                    <>
                      <div className="pt-2 border-t border-[#e8edf5]">
                        <label className="block text-[12px] text-[#666] mb-1.5">我的出价（元/吨）</label>
                        <input
                          type="number"
                          value={myBidPrice}
                          onChange={(e) => setMyBidPrice(e.target.value)}
                          placeholder="请输入出价金额"
                          className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[14px] font-bold outline-none focus:border-[#cc2222] text-[#cc2222]"
                        />
                        <p className="text-[11px] text-[#999] mt-1">最低出价：2090元/吨（当前价+加价幅度）</p>
                      </div>
                      {bidSuccess && (
                        <div className="flex items-center gap-2 p-2.5 bg-[#e8f9f0] rounded text-[#1a8a3f] text-[13px]">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          出价成功！等待结果
                        </div>
                      )}
                      <button
                        onClick={handleBid}
                        className="w-full py-2.5 bg-[#cc2222] text-white font-bold text-[14px] rounded hover:bg-[#aa1111] transition-colors"
                      >
                        确认出价
                      </button>
                    </>
                  ) : currentGood.status === "sold" ? (
                    <div className="pt-2 border-t border-[#e8edf5]">
                      <div className="flex items-start gap-2 p-2.5 bg-[#e8f9f0] rounded text-[13px] text-[#1a8a3f]">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold">已成交</div>
                          <div className="text-[12px] mt-0.5">中标方：{currentGood.winner}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-[#e8edf5]">
                      <div className="flex items-center gap-2 p-2.5 bg-[#f5f7fa] rounded text-[13px] text-[#666]">
                        <Clock className="w-4 h-4 shrink-0" />
                        该商品暂未开始竞拍
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Session stats */}
              <div className="bg-white rounded-lg border border-[#dde3ec] p-4">
                <h3 className="text-[13px] font-semibold text-[#333] mb-3">专场统计</h3>
                <div className="space-y-2 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-[#999] flex items-center gap-1"><Eye className="w-3.5 h-3.5" />浏览人次</span>
                    <span className="font-medium">1,842</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#999] flex items-center gap-1"><Users className="w-3.5 h-3.5" />参拍企业</span>
                    <span className="font-medium">38 家</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#999] flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" />总出价次数</span>
                    <span className="font-medium">26 次</span>
                  </div>
                </div>
              </div>

              {/* Announcement */}
              <div className="bg-white rounded-lg border border-[#dde3ec] p-4">
                <h3 className="text-[13px] font-semibold text-[#333] mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#1a5fa8]" />
                  竞拍公告
                </h3>
                <p className="text-[12px] text-[#666] leading-relaxed line-clamp-5">{SESSION.announcement}</p>
                <button className="text-[12px] text-[#1a5fa8] hover:underline mt-1.5">查看完整公告</button>
              </div>

              {/* Warning */}
              <div className="flex items-start gap-2 p-3 bg-[#fff7ed] border border-[#f0d9b5] rounded text-[12px] text-[#e8831a]">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>参拍前请确认已缴纳保证金，中标后须在3个工作日内完成签约。</span>
              </div>

              <Link
                href="/portal/jingjia-jiaoyi"
                className="flex items-center gap-1.5 text-[13px] text-[#666] hover:text-[#1a5fa8]"
              >
                <ChevronLeft className="w-4 h-4" />
                返回竞价列表
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
