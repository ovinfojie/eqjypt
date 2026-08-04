"use client"

import { useState } from "react"
import { Search, X, Download } from "lucide-react"

type OrderStatus = "none" | "placed"

interface Row {
  id: string
  demand: string
  winner: string
  title: string
  product: string
  winTime: string
  orderStatus: OrderStatus
  canOrder: boolean
}

const ROWS: Row[] = [
  { id: "ZQ-5040492b2ad12c8359e", demand: "普通采购", winner: "汕尾新供销天润粮油有限公司(粮油业务部)", title: "天润汕尾库库区3000吨粮食竞拍销售", product: "南晶香占", winTime: "2026-05-12 09:12:45", orderStatus: "none", canOrder: true },
  { id: "ZQ-5040492b2ad12c8351e", demand: "普通销售", winner: "连山新供销天润粮油有限公司(粮油业务部)", title: "天润汕尾库库区3200吨粮食竞拍销售", product: "小麦", winTime: "2026-05-12 09:12:45", orderStatus: "none", canOrder: false },
  { id: "ZQ-5040492b2ad12c8344e", demand: "定购竞销", winner: "怀集新供销天润现代农业发展有限公司(粮油业务部)", title: "天润汕尾库库区1800吨粮食竞拍销售", product: "黄花占米、南晶香占", winTime: "2026-05-12 09:12:45", orderStatus: "none", canOrder: false },
  { id: "ZQ-5040492b2ad12c8353e", demand: "定销竞购", winner: "南雄新供销天润现代农业发展有限公司(粮油业务部)", title: "天润汕尾库库区3100吨粮食竞拍销售", product: "小麦、南晶香占", winTime: "2026-05-12 09:12:45", orderStatus: "none", canOrder: true },
  { id: "ZQ-5040492b2ad12c8354e", demand: "组合采购", winner: "阳西县新供销天润现代农业发展有限公司(粮油业务部)", title: "天润汕尾库库区2200吨粮食竞拍销售", product: "南晶香占、小麦 等5种", winTime: "2026-05-12 09:12:45", orderStatus: "placed", canOrder: false },
  { id: "ZQ-5040492b2ad12c8355e", demand: "组合销售", winner: "广东汕头潮阳天润粮油有限公司(粮油业务部)", title: "天润汕尾库库区3000吨粮食竞拍销售", product: "南晶香占、大豆 等4种", winTime: "2026-05-12 09:12:45", orderStatus: "none", canOrder: true },
]

export default function WinNoticeView({ role }: { role: "fabu" | "baoming" }) {
  const [detail, setDetail] = useState<Row | null>(null)

  return (
    <div>
      {/* 筛选区 */}
      <div className="bg-[#f8fafc] border border-[#e8edf5] rounded-lg p-4 mb-4">
        <div className="grid grid-cols-4 gap-x-6 gap-y-3 items-end">
          <Field label="中标通知书编号"><input className={fInput} placeholder="请输入编号" /></Field>
          <Field label="中标方"><input className={fInput} placeholder="请输入公司名称" /></Field>
          <Field label="发布方需求"><select className={fInput}><option>请选择</option><option>普通销售</option><option>普通采购</option><option>定购竞销</option><option>定销竞购</option><option>组合销售</option><option>组合采购</option></select></Field>
          <Field label="专场标题"><input className={fInput} placeholder="请输入专场标题" /></Field>
          <Field label="中标商品"><input className={fInput} placeholder="请输入" /></Field>
          <Field label="订单状态"><select className={fInput}><option>请选择</option><option>未下单</option><option>已下单</option></select></Field>
          <div className="col-span-2">
            <label className="text-[13px] text-[#666] mb-1.5 block">中标时间</label>
            <div className="flex items-center gap-2">
              <input className={fInput} placeholder="开始时间" />
              <span className="text-[#999]">至</span>
              <input className={fInput} placeholder="结束时间" />
              <button className="h-9 px-3 border border-[#dde3ec] rounded text-[12px] text-[#555] whitespace-nowrap">今天</button>
              <button className="h-9 px-3 border border-[#dde3ec] rounded text-[12px] text-[#555] whitespace-nowrap">近7天</button>
              <button className="h-9 px-3 border border-[#dde3ec] rounded text-[12px] text-[#555] whitespace-nowrap">近30天</button>
            </div>
          </div>
          <div className="flex items-end gap-2 col-span-4">
            <button className="flex items-center gap-1 h-9 px-4 bg-[#1a5fa8] text-white rounded text-[13px] hover:bg-[#0d4a8a]"><Search className="w-3.5 h-3.5" />查询</button>
            <button className="h-9 px-4 border border-[#dde3ec] rounded text-[13px] text-[#555]">清空</button>
            <button className="h-9 px-4 border border-[#dde3ec] rounded text-[13px] text-[#555]">导出</button>
          </div>
        </div>
      </div>

      {/* 表格 */}
      <div className="border border-[#e8edf5] rounded-lg overflow-x-auto">
        <table className="w-full text-[13px] whitespace-nowrap">
          <thead>
            <tr className="bg-[#f8fafc] text-[#6b7c93]">
              {["中标通知书编号", "发布方需求", "中标方", "专场标题", "中标商品", "中标时间", "订单状态", "操作"].map((h) => (
                <th key={h} className="text-left font-medium px-3 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.id} className="border-t border-[#f0f4f8] hover:bg-[#fafbfc] align-top">
                <td className="px-3 py-3 font-mono text-[12px] text-[#333]">{r.id}</td>
                <td className="px-3 py-3">{r.demand}</td>
                <td className="px-3 py-3 max-w-[200px] whitespace-normal">{r.winner}</td>
                <td className="px-3 py-3 max-w-[200px] whitespace-normal">{r.title}</td>
                <td className="px-3 py-3">{r.product}</td>
                <td className="px-3 py-3">{r.winTime}</td>
                <td className="px-3 py-3">
                  <span className={r.orderStatus === "placed" ? "text-[#16a34a]" : "text-[#666]"}>{r.orderStatus === "placed" ? "已下单" : "未下单"}</span>
                </td>
                <td className="px-3 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => setDetail(r)} className="text-[#1a5fa8] hover:underline">查看详情</button>
                    {r.canOrder && r.orderStatus === "none" && (
                      <button className="text-[#1a5fa8] hover:underline">下采购订单</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-end gap-3 mt-4 text-[13px] text-[#666]">
        <span>共 {ROWS.length} 条</span>
        <select className="h-8 border border-[#dde3ec] rounded px-2"><option>10条/页</option></select>
        <span className="w-8 h-8 flex items-center justify-center bg-[#1a5fa8] text-white rounded">1</span>
      </div>

      {/* 中标通知书详情弹窗 */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg w-[600px] max-w-[95vw] shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
              <span className="text-[15px] font-bold">中标通知书</span>
              <button onClick={() => setDetail(null)} aria-label="关闭"><X className="w-5 h-5 text-[#999]" /></button>
            </div>
            <div className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-[22px] font-bold text-[#1a1a2e] mb-1 tracking-widest">中 标 通 知 书</h2>
                <p className="text-[12px] text-[#999] font-mono">编号：{detail.id}</p>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-6 space-y-3 text-[13px] mb-6">
                {[
                  ["专场标题", detail.title],
                  ["发布方需求", detail.demand],
                  ["中标方", detail.winner],
                  ["中标商品", detail.product],
                  ["中标时间", detail.winTime],
                  ["订单状态", detail.orderStatus === "placed" ? "已下单" : "未下单"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-[#e8edf5] pb-2 last:border-0 last:pb-0">
                    <span className="text-[#999]">{k}</span>
                    <span className="font-medium text-[#1a1a2e] text-right max-w-[360px]">{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-3">
                <button onClick={() => setDetail(null)} className="h-9 px-6 border border-[#dde3ec] rounded text-[13px] text-[#555]">关闭</button>
                <button className="flex items-center gap-1.5 h-9 px-5 bg-[#1a5fa8] text-white rounded text-[13px] hover:bg-[#0d4a8a]"><Download className="w-3.5 h-3.5" />下载PDF</button>
              </div>
            </div>
          </div>
        </div>
      )}
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
