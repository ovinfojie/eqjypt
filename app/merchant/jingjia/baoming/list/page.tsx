"use client"

import { useState } from "react"
import { Search } from "lucide-react"

type Status = "upcoming" | "live" | "ended" | "canceled" | "closed"

const STATUS_MAP: Record<Status, { label: string; color: string }> = {
  upcoming: { label: "即将开始", color: "#1a5fa8" },
  live: { label: "正在进行", color: "#16a34a" },
  ended: { label: "已结束", color: "#666" },
  canceled: { label: "平台取消", color: "#e34d59" },
  closed: { label: "已关闭", color: "#999" },
}

const STATUS_TABS: { key: Status | "all"; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "upcoming", label: "即将开始" },
  { key: "live", label: "正在进行" },
  { key: "ended", label: "已结束" },
]

interface Row {
  id: string
  applyTime: string
  demand: string
  bidType: string
  publisher: string
  title: string
  products: string
  startTime: string
  status: Status
  won: boolean
  myDeposit: number
  depositStatus: string
}

const ROWS: Row[] = [
  { id: "bm-4607939f9d8042deb", applyTime: "2026-05-12 09:12:45", demand: "普通采购", bidType: "降价拍(荷兰拍)", publisher: "汕尾新供销天润粮油有限公司(粮油业务部)", title: "天润汕尾库库区3000吨粮食竞拍销售", products: "南晶香占、黄花占米 等3种", startTime: "2026-05-12 09:12:45", status: "upcoming", won: false, myDeposit: 10000, depositStatus: "已冻结(锁定中)" },
  { id: "bm-4607939f9d8043deb", applyTime: "2026-05-12 09:12:45", demand: "普通销售", bidType: "升价拍(英式拍)", publisher: "连山新供销天润粮油有限公司(粮油业务部)", title: "天润连山库库区3200吨粮食竞拍销售", products: "小麦、黄花占米 等2种", startTime: "2026-05-12 09:12:45", status: "live", won: false, myDeposit: 30000, depositStatus: "已冻结(锁定中)" },
  { id: "bm-4607939f9d8047deb", applyTime: "2026-05-12 09:12:45", demand: "组合销售", bidType: "升价拍(英式拍)", publisher: "怀集新供销天润现代农业发展有限公司(粮油业务部)", title: "天润怀集库库区1800吨粮食竞拍销售", products: "南晶香占、大豆 等4种", startTime: "2026-05-12 09:12:45", status: "canceled", won: false, myDeposit: 40000, depositStatus: "已冻结(锁定中)" },
  { id: "bm-4607939f9d8044deb", applyTime: "2026-05-12 09:12:45", demand: "定购竞销", bidType: "升价拍(英式拍)", publisher: "南雄新供销天润现代农业发展有限公司(粮油业务部)", title: "天润南雄库库区3100吨粮食竞拍销售", products: "大豆、黄花占米 等5种", startTime: "2026-05-12 09:12:45", status: "closed", won: false, myDeposit: 0, depositStatus: "—" },
  { id: "bm-4607939f9d8045deb", applyTime: "2026-05-12 09:12:45", demand: "定销竞购", bidType: "降价拍(荷兰拍)", publisher: "阳西县新供销天润现代农业发展有限公司(粮油业务部)", title: "天润阳西库库区2200吨粮食竞拍销售", products: "小麦、南晶香占 等6种", startTime: "2026-05-12 09:12:45", status: "ended", won: true, myDeposit: 5000, depositStatus: "已冻结(可申请退款)" },
  { id: "bm-4607939f9d8046deb", applyTime: "2026-05-12 09:12:45", demand: "组合采购", bidType: "降价拍(荷兰拍)", publisher: "广东汕头潮阳天润粮油有限公司(粮油业务部)", title: "天润潮阳库库区3000吨粮食竞拍销售", products: "南晶香占、小麦 等3种", startTime: "2026-05-12 09:12:45", status: "ended", won: true, myDeposit: 50000, depositStatus: "已完成(全额已退款)" },
]

const STATS = [
  { label: "报名场次", value: "100 场" },
  { label: "中标", value: "89 场" },
  { label: "中标总重量", value: "328391 吨" },
  { label: "中标总金额", value: "18879877 元", accent: true },
]

function actionsFor(r: Row): { label: string; danger?: boolean }[] {
  const acts: { label: string; danger?: boolean }[] = [{ label: "查看详情" }]
  if (r.status === "upcoming") acts.push({ label: "查看保证金" }, { label: "取消报名", danger: true })
  else if (r.status === "live") acts.push({ label: "查看保证金" })
  else if (r.status === "ended") {
    acts.push({ label: "查看保证金" })
    if (r.won) acts.push({ label: "中标通知书" })
  } else if (r.status === "canceled") acts.push({ label: "查看保证金" })
  return acts
}

export default function BaomingListPage() {
  const [tab, setTab] = useState<Status | "all">("all")
  const filtered = tab === "all" ? ROWS : ROWS.filter((r) => r.status === tab)

  return (
    <div>
      {/* 统计卡 */}
      <div className="grid grid-cols-4 gap-3 mb-4 max-w-[720px]">
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
          <Field label="我的保证金状态"><select className={fInput}><option>全部</option><option>已冻结(锁定中)</option><option>已冻结(可申请退款)</option><option>已退款</option></select></Field>
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
              {["报名编号", "报名时间", "发布方需求", "竞价类型", "发布方", "专场标题", "商品", "专场开始时间", "专场状态", "是否中标", "我缴纳的保证金(元)", "我的保证金状态", "操作"].map((h) => (
                <th key={h} className="text-left font-medium px-3 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, idx) => {
              const s = STATUS_MAP[r.status]
              return (
                <tr key={idx} className="border-t border-[#f0f4f8] hover:bg-[#fafbfc] align-top">
                  <td className="px-3 py-3 text-[#1a5fa8] font-mono text-[12px]">{r.id}</td>
                  <td className="px-3 py-3">{r.applyTime}</td>
                  <td className="px-3 py-3">{r.demand}</td>
                  <td className="px-3 py-3">{r.bidType}</td>
                  <td className="px-3 py-3 max-w-[180px] whitespace-normal">{r.publisher}</td>
                  <td className="px-3 py-3 max-w-[200px] whitespace-normal">{r.title}</td>
                  <td className="px-3 py-3">{r.products}</td>
                  <td className="px-3 py-3">{r.startTime}</td>
                  <td className="px-3 py-3"><span style={{ color: s.color }}>{s.label}</span></td>
                  <td className="px-3 py-3"><span className={r.won ? "text-[#e34d59] font-medium" : "text-[#666]"}>{r.won ? "是" : "否"}</span></td>
                  <td className="px-3 py-3">{r.myDeposit.toLocaleString()}</td>
                  <td className="px-3 py-3">{r.depositStatus}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-x-2 gap-y-1 max-w-[150px]">
                      {actionsFor(r).map((a) => (
                        <button key={a.label} className={`hover:underline ${a.danger ? "text-[#e34d59]" : "text-[#1a5fa8]"}`}>{a.label}</button>
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
