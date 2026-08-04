"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { PublishAuctionDialog, type PublishMode } from "@/components/merchant/jingjia/publish-auction-dialog"

type Status = "reviewing" | "rejected" | "upcoming" | "live" | "ended" | "closed"

const STATUS_MAP: Record<Status, { label: string; color: string }> = {
  reviewing: { label: "待审核", color: "#e8831a" },
  rejected: { label: "驳回待修改", color: "#e34d59" },
  upcoming: { label: "即将开始", color: "#1a5fa8" },
  live: { label: "正在进行", color: "#16a34a" },
  ended: { label: "已结束", color: "#666" },
  closed: { label: "已关闭", color: "#999" },
}

const STATUS_TABS: { key: Status | "all"; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "reviewing", label: "待审核" },
  { key: "rejected", label: "驳回待修改" },
  { key: "upcoming", label: "即将开始" },
  { key: "live", label: "正在进行" },
  { key: "ended", label: "已结束" },
  { key: "closed", label: "已关闭" },
]

interface Row {
  id: string
  demand: string
  bidType: string
  startTime: string
  title: string
  products: string
  createTime: string
  status: Status
  abortive: boolean
  myDeposit: number
  depositStatus: string
}

const ROWS: Row[] = [
  { id: "ID0001120x", demand: "普通采购", bidType: "降价拍(荷兰拍)", startTime: "2026-06-13 14:00", title: "天润汕尾库库区3000吨粮食竞拍销售", products: "南晶香占、黄花占米 等3种", createTime: "2026-05-12 09:12:45", status: "reviewing", abortive: false, myDeposit: 10000, depositStatus: "冻结" },
  { id: "ID0001120x", demand: "普通销售", bidType: "升价拍(英式拍)", startTime: "2026-06-12 14:00", title: "天润汕尾库库区3200吨粮食竞拍销售", products: "小麦、黄花占米 等2种", createTime: "2026-05-12 09:12:45", status: "rejected", abortive: false, myDeposit: 30000, depositStatus: "冻结" },
  { id: "ID0001120x", demand: "定购竞销", bidType: "升价拍(英式拍)", startTime: "2026-06-11 14:00", title: "天润汕尾库库区1800吨粮食竞拍销售", products: "大豆、黄花占米 等5种", createTime: "2026-05-12 09:12:45", status: "upcoming", abortive: false, myDeposit: 0, depositStatus: "—" },
  { id: "ID0001120x", demand: "定销竞购", bidType: "降价拍(荷兰拍)", startTime: "2026-06-09 14:00", title: "天润汕尾库库区3100吨粮食竞拍销售", products: "小麦、南晶香占 等6种", createTime: "2026-05-12 09:12:45", status: "live", abortive: false, myDeposit: 5000, depositStatus: "冻结" },
  { id: "ID0001120x", demand: "组合采购", bidType: "降价拍(荷兰拍)", startTime: "2026-05-13 14:00", title: "天润汕尾库库区2200吨粮食竞拍销售", products: "南晶香占、小麦 等3种", createTime: "2026-05-12 09:12:45", status: "ended", abortive: true, myDeposit: 50000, depositStatus: "冻结(部分退回)" },
  { id: "ID0001120x", demand: "组合销售", bidType: "升价拍(英式拍)", startTime: "2026-05-12 14:00", title: "天润汕尾库库区3000吨粮食竞拍销售", products: "南晶香占、大豆 等4种", createTime: "2026-05-12 09:12:45", status: "closed", abortive: false, myDeposit: 40000, depositStatus: "已退回" },
]

const STATS = [
  { label: "发布场次", value: "100 场" },
  { label: "中标", value: "89 场" },
  { label: "报名方", value: "1887 家" },
  { label: "中标总重量", value: "328391 吨" },
  { label: "中标总金额", value: "18879877 元", accent: true },
]

function actionsFor(status: Status): string[] {
  switch (status) {
    case "reviewing": return ["取消发布", "查看详情", "克隆", "查看保证金"]
    case "rejected": return ["编辑", "关闭竞拍", "查看详情", "克隆", "查看保证金"]
    case "upcoming": return ["查看详情", "克隆"]
    case "live": return ["查看详情", "查看保证金", "克隆"]
    case "ended": return ["查看详情", "查看保证金", "克隆"]
    case "closed": return ["查看详情", "查看保证金", "克隆"]
  }
}

export default function FabuListPage() {
  const [tab, setTab] = useState<Status | "all">("all")
  const [publish, setPublish] = useState<PublishMode | null>(null)

  const filtered = tab === "all" ? ROWS : ROWS.filter((r) => r.status === tab)

  return (
    <div>
      {/* 统计卡 */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-[#eaf2fb] rounded-lg px-4 py-3">
            <div className={`text-[20px] font-bold ${s.accent ? "text-[#e8831a]" : "text-[#1a5fa8]"}`}>{s.value}</div>
            <div className="text-[12px] text-[#6b7c93] mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* 筛选区 */}
      <div className="bg-[#f8fafc] border border-[#e8edf5] rounded-lg p-4 mb-4">
        <div className="grid grid-cols-5 gap-x-6 gap-y-3 items-end">
          <Field label="专场编号"><input className={fInput} placeholder="请输入专场编号" /></Field>
          <Field label="发布方需求"><select className={fInput}><option>全部</option><option>普通销售</option><option>普通采购</option><option>定购竞销</option><option>定销竞购</option><option>组合销售</option><option>组合采购</option></select></Field>
          <Field label="商品名称"><input className={fInput} placeholder="请输入" /></Field>
          <Field label="专场状态"><select className={fInput}><option>全部</option>{STATUS_TABS.slice(1).map((t) => <option key={t.key}>{t.label}</option>)}</select></Field>
          <Field label="我的保证金状态"><select className={fInput}><option>全部</option><option>冻结</option><option>已退回</option><option>部分退回</option></select></Field>
          <div className="col-span-3">
            <label className="text-[13px] text-[#666] mb-1.5 block">专场开始时间</label>
            <div className="flex items-center gap-2">
              <input className={fInput} placeholder="开始时间" />
              <span className="text-[#999]">至</span>
              <input className={fInput} placeholder="结束时间" />
              <button className="h-9 px-3 border border-[#dde3ec] rounded text-[12px] text-[#555] whitespace-nowrap">今天</button>
              <button className="h-9 px-3 border border-[#dde3ec] rounded text-[12px] text-[#555] whitespace-nowrap">昨天</button>
              <button className="h-9 px-3 border border-[#dde3ec] rounded text-[12px] text-[#555] whitespace-nowrap">近7天</button>
              <button className="h-9 px-3 border border-[#dde3ec] rounded text-[12px] text-[#555] whitespace-nowrap">近30天</button>
            </div>
          </div>
          <div className="flex items-end gap-2">
            <button className="flex items-center gap-1 h-9 px-4 bg-[#1a5fa8] text-white rounded text-[13px] hover:bg-[#0d4a8a]"><Search className="w-3.5 h-3.5" />查询</button>
            <button className="h-9 px-4 border border-[#dde3ec] rounded text-[13px] text-[#555]">清空</button>
            <button className="h-9 px-4 border border-[#dde3ec] rounded text-[13px] text-[#555]">导出</button>
          </div>
        </div>
      </div>

      {/* 发布按钮 */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setPublish("sale")} className="h-9 px-5 bg-[#1a5fa8] text-white rounded text-[13px] font-medium hover:bg-[#0d4a8a]">发布销售竞拍</button>
        <button onClick={() => setPublish("purchase")} className="h-9 px-5 bg-[#1a5fa8] text-white rounded text-[13px] font-medium hover:bg-[#0d4a8a]">发布采购竞拍</button>
      </div>

      {/* 状态 Tab */}
      <div className="flex border-b border-[#dde3ec] mb-4">
        {STATUS_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-[13px] border-b-2 -mb-px ${tab === t.key ? "border-[#1a5fa8] text-[#1a5fa8] font-medium" : "border-transparent text-[#666] hover:text-[#1a5fa8]"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 表格 */}
      <div className="border border-[#e8edf5] rounded-lg overflow-x-auto">
        <table className="w-full text-[13px] whitespace-nowrap">
          <thead>
            <tr className="bg-[#f8fafc] text-[#6b7c93]">
              {["专场编号", "发布方需求", "竞价类型", "专场开始时间", "专场标题", "商品", "创建时间", "专场状态", "是否流拍", "我缴纳的保证金(元)", "我的保证金状态", "操作"].map((h) => (
                <th key={h} className="text-left font-medium px-3 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, idx) => {
              const s = STATUS_MAP[r.status]
              return (
                <tr key={idx} className="border-t border-[#f0f4f8] hover:bg-[#fafbfc]">
                  <td className="px-3 py-3 text-[#1a5fa8] font-mono text-[12px]">{r.id}</td>
                  <td className="px-3 py-3">{r.demand}</td>
                  <td className="px-3 py-3">{r.bidType}</td>
                  <td className="px-3 py-3">{r.startTime}</td>
                  <td className="px-3 py-3 max-w-[220px] whitespace-normal">{r.title}</td>
                  <td className="px-3 py-3">{r.products}</td>
                  <td className="px-3 py-3">{r.createTime}</td>
                  <td className="px-3 py-3"><span style={{ color: s.color }}>{s.label}</span></td>
                  <td className="px-3 py-3"><span className={r.abortive ? "text-[#e34d59]" : "text-[#666]"}>{r.abortive ? "是" : "否"}</span></td>
                  <td className="px-3 py-3">{r.myDeposit.toLocaleString()}</td>
                  <td className="px-3 py-3">{r.depositStatus}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-x-2 gap-y-1 max-w-[160px]">
                      {actionsFor(r.status).map((a) => (
                        <button key={a} className={`hover:underline ${a === "取消发布" || a === "关闭竞拍" ? "text-[#e34d59]" : "text-[#1a5fa8]"}`}>{a}</button>
                      ))}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-end gap-3 mt-4 text-[13px] text-[#666]">
        <span>共 {filtered.length} 条</span>
        <select className="h-8 border border-[#dde3ec] rounded px-2"><option>10条/页</option></select>
        <button className="w-8 h-8 border border-[#dde3ec] rounded">‹</button>
        <span className="w-8 h-8 flex items-center justify-center bg-[#1a5fa8] text-white rounded">1</span>
        <button className="w-8 h-8 border border-[#dde3ec] rounded">›</button>
        <span>前往</span>
        <input className="w-12 h-8 border border-[#dde3ec] rounded text-center" defaultValue={1} />
        <span>页</span>
      </div>

      {publish && <PublishAuctionDialog mode={publish} onClose={() => setPublish(null)} />}
    </div>
  )
}

const fInput = "w-full h-9 px-3 border border-[#dde3ec] rounded text-[13px] focus:outline-none focus:border-[#1a5fa8] placeholder:text-[#bbb] bg-white"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[13px] text-[#666] mb-1.5 block">{label}</label>
      {children}
    </div>
  )
}
