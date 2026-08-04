"use client"

import { useState } from "react"

type RefundRow = {
  id: string
  sceneNo: string
  title: string
  payer: string
  payee: string
  channel: string
  handleType: string
  breachSide?: string
  initType?: string
  amount: string
  progress: string
  applyTime: string
}

const initiatedRows: RefundRow[] = [
  { id: "ICBCJP177059813898256721", sceneNo: "JP2512110046", title: "2026年2月3日10点30分惠州库粮食竞价交易", payer: "数科有限公司(数科粮油子店)", payee: "数科有限公司(数科粮油子店)", channel: "工行安心付", handleType: "保证金原路退回", breachSide: "——", initType: "向中标方发起", amount: "3000.00", progress: "待中标方审核", applyTime: "2025-11-21 14:59:06" },
  { id: "1765338018972-ryAd20251210114019", sceneNo: "JP2512110046", title: "2026年2月4日10点30分惠州库粮食竞价交易", payer: "数科有限公司(数科粮油子店)", payee: "广东优稻粮油有限公司", channel: "建行龙存管", handleType: "保证金违约扣罚", breachSide: "我方", initType: "向中标方发起", amount: "3000.00", progress: "中标方审核不通过", applyTime: "2025-11-21 14:59:06" },
  { id: "1765338018972-ryAd20251210114019", sceneNo: "JP2512110046", title: "2026年2月5日10点30分惠州库粮食竞价交易", payer: "数科有限公司(数科粮油子店)", payee: "数科有限公司(数科粮油子店)", channel: "建行龙存管", handleType: "保证金原路退回", breachSide: "——", initType: "向平台申诉", amount: "1000.00", progress: "待平台审核", applyTime: "2025-11-21 14:59:06" },
  { id: "1765338018972-ryAd20251210114019", sceneNo: "JP2512110046", title: "2026年2月6日10点30分惠州库粮食竞价交易", payer: "数科有限公司(数科粮油子店)", payee: "广东优稻粮油有限公司", channel: "建行龙存管", handleType: "保证金违约扣罚", breachSide: "我方", initType: "向平台申诉", amount: "1000.00", progress: "平台审核不通过", applyTime: "2025-11-21 14:59:06" },
  { id: "ICBCJP176890165234249913", sceneNo: "JP2512080005", title: "2026年2月7日10点30分惠州库粮食竞价交易", payer: "平远新供销天润粮油有限公司", payee: "数科有限公司(数科粮油子店)", channel: "工行安心付", handleType: "保证金违约扣罚", breachSide: "对方", initType: "向中标方发起", amount: "3000.00", progress: "平台审核通过待退款", applyTime: "2025-11-21 14:59:06" },
  { id: "ICBCJP176890165234249913", sceneNo: "JP2512080005", title: "2026年2月8日10点30分惠州库粮食竞价交易", payer: "数科有限公司(数科粮油子店)", payee: "广东优稻粮油有限公司", channel: "工行安心付", handleType: "保证金违约扣罚", breachSide: "我方", initType: "向中标方发起", amount: "3000.00", progress: "已退款", applyTime: "2025-11-21 14:59:06" },
]

const receivedRows: RefundRow[] = [
  { id: "ICBCJP177059813898256721", sceneNo: "JP2512110046", title: "2026年2月3日10点30分惠州库粮食竞价交易", payer: "数科有限公司(数科粮油子店)", payee: "数科有限公司(数科粮油子店)", channel: "工行安心付", handleType: "保证金原路退回", amount: "3000.00", progress: "待发布方审核", applyTime: "2025-11-21 14:59:06" },
  { id: "1765338018972-ryAd20251210114019", sceneNo: "JP2512110046", title: "2026年2月4日10点30分惠州库粮食竞价交易", payer: "数科有限公司(数科粮油子店)", payee: "广东优稻粮油有限公司", channel: "建行龙存管", handleType: "保证金违约扣罚", amount: "3000.00", progress: "发布方审核不通过", applyTime: "2025-11-21 14:59:06" },
  { id: "1765338018972-ryAd20251210114019", sceneNo: "JP2512110046", title: "2026年2月5日10点30分惠州库粮食竞价交易", payer: "数科有限公司(数科粮油子店)", payee: "数科有限公司(数科粮油子店)", channel: "建行龙存管", handleType: "保证金原路退回", amount: "1000.00", progress: "待平台审核", applyTime: "2025-11-21 14:59:06" },
  { id: "1765338018972-ryAd20251210114019", sceneNo: "JP2512110046", title: "2026年2月6日10点30分惠州库粮食竞价交易", payer: "数科有限公司(数科粮油子店)", payee: "广东优稻粮油有限公司", channel: "建行龙存管", handleType: "保证金违约扣罚", amount: "1000.00", progress: "平台审核不通过", applyTime: "2025-11-21 14:59:06" },
  { id: "ICBCJP176890165234249913", sceneNo: "JP2512080005", title: "2026年2月7日10点30分惠州库粮食竞价交易", payer: "平远新供销天润粮油有限公司", payee: "数科有限公司(数科粮油子店)", channel: "工行安心付", handleType: "保证金违约扣罚", amount: "3000.00", progress: "平台审核通过待退款", applyTime: "2025-11-21 14:59:06" },
  { id: "ICBCJP176890165234249913", sceneNo: "JP2512080005", title: "2026年2月8日10点30分惠州库粮食竞价交易", payer: "数科有限公司(数科粮油子店)", payee: "广东优稻粮油有限公司", channel: "工行安心付", handleType: "保证金违约扣罚", amount: "3000.00", progress: "已退款", applyTime: "2025-11-21 14:59:06" },
]

const initiatedTabs = ["全部", "待中标方审核", "中标方审核不通过", "待平台审核", "平台审核不通过", "平台审核通过待退款", "已退款"]
const receivedTabs = ["全部", "待发布方审核", "发布方审核不通过", "待平台审核", "平台审核不通过", "平台审核通过待退款", "已退款"]

const inputCls = "h-8 px-2 border border-[#d9d9d9] rounded text-[13px] text-[#1a1a2e] placeholder:text-[#bbb] focus:outline-none focus:border-[#1a5fa8] w-full"

function RefundTable({ side }: { side: "initiated" | "received" }) {
  const tabs = side === "initiated" ? initiatedTabs : receivedTabs
  const allRows = side === "initiated" ? initiatedRows : receivedRows
  const [tab, setTab] = useState("全部")
  const rows = tab === "全部" ? allRows : allRows.filter(r => r.progress === tab)

  const headers = side === "initiated"
    ? ["保证金编号","关联的专场编号","竞拍专场标题","付款方","收款方","结算渠道","保证金处理类型","违约方","申请处理保证金金额(元)","发起方式","保证金进度","申请退款时间","操作"]
    : ["保证金编号","关联的专场编号","竞拍专场标题","付款方","收款方","结算渠道","保证金处理类型","申请处理保证金金额(元)","保证金进度","申请退款时间","操作"]

  return (
    <div>
      {/* 筛选 */}
      <div className="bg-[#f7f9fc] border border-[#eef1f5] rounded p-4 mb-4">
        <div className="grid grid-cols-4 gap-x-4 gap-y-3">
          <div><label className="block text-[12px] text-[#666] mb-1">保证金编号</label><input placeholder="请输入" className={inputCls} /></div>
          <div><label className="block text-[12px] text-[#666] mb-1">关联的专场编号</label><input placeholder="请输入" className={inputCls} /></div>
          <div><label className="block text-[12px] text-[#666] mb-1">竞拍专场标题</label><input placeholder="请输入" className={inputCls} /></div>
          <div><label className="block text-[12px] text-[#666] mb-1">付款方</label><input placeholder="请输入" className={inputCls} /></div>
          <div><label className="block text-[12px] text-[#666] mb-1">收款方</label><input placeholder="请输入" className={inputCls} /></div>
          <div><label className="block text-[12px] text-[#666] mb-1">结算渠道</label><select className={inputCls}><option>请选择</option></select></div>
          <div><label className="block text-[12px] text-[#666] mb-1">保证金进度</label><select className={inputCls}><option>请选择</option></select></div>
        </div>
        <div className="flex items-end gap-2 mt-3">
          <div className="flex items-center gap-2">
            <label className="text-[12px] text-[#666]">申请退款时间</label>
            <input placeholder="请选择时间" className={inputCls + " w-36"} />
            <span className="text-[12px] text-[#666]">至</span>
            <input placeholder="请选择时间" className={inputCls + " w-36"} />
          </div>
          <button className="h-8 px-5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]">查询</button>
          <button className="h-8 px-5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]">导出</button>
        </div>
      </div>

      {/* 状态Tab */}
      <div className="flex border-b border-[#e8e8e8] mb-3 flex-wrap">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 h-9 text-[13px] -mb-px border-b-2 ${tab === t ? "border-[#1a5fa8] text-[#1a5fa8] font-medium" : "border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>
            {t}
          </button>
        ))}
      </div>

      {/* 表格 */}
      <div className="overflow-x-auto border border-[#eef1f5] rounded">
        <table className="w-full text-[12px] border-collapse min-w-[1400px]">
          <thead>
            <tr className="bg-[#f7f9fc] text-[#666] text-left">
              {headers.map(h => (
                <th key={h} className={`px-3 py-3 font-medium whitespace-nowrap border-b border-[#eef1f5] ${["保证金处理类型","违约方","发起方式"].includes(h) ? "text-[#e34d59]" : ""}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-[#f0f2f5] hover:bg-[#fafbfc]">
                <td className="px-3 py-3 font-mono text-[11px] text-[#1a1a2e] max-w-[160px] break-all">{r.id}</td>
                <td className="px-3 py-3 text-[#1a5fa8] whitespace-nowrap">{r.sceneNo}</td>
                <td className="px-3 py-3 min-w-[220px] text-[#1a1a2e]">{r.title}</td>
                <td className="px-3 py-3 whitespace-nowrap text-[#1a1a2e]">{r.payer}</td>
                <td className="px-3 py-3 whitespace-nowrap text-[#1a1a2e]">{r.payee}</td>
                <td className="px-3 py-3 whitespace-nowrap text-[#1a1a2e]">{r.channel}</td>
                <td className="px-3 py-3 whitespace-nowrap text-[#e34d59]">{r.handleType}</td>
                {side === "initiated" && (
                  <td className={`px-3 py-3 whitespace-nowrap ${r.breachSide === "——" ? "text-[#e34d59]" : "text-[#e34d59]"}`}>{r.breachSide}</td>
                )}
                <td className="px-3 py-3 whitespace-nowrap text-[#1a1a2e]">{r.amount}</td>
                {side === "initiated" && (
                  <td className="px-3 py-3 whitespace-nowrap text-[#e34d59]">{r.initType}</td>
                )}
                <td className="px-3 py-3 whitespace-nowrap text-[#1a1a2e]">{r.progress}</td>
                <td className="px-3 py-3 whitespace-nowrap text-[#666]">{r.applyTime}</td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <div className="flex flex-col gap-0.5">
                    <button className="text-[#1a5fa8] hover:underline text-left">查看详情</button>
                    {side === "received" && r.progress === "待发布方审核" && <button className="text-[#1a5fa8] hover:underline text-left">审核</button>}
                    {side === "initiated" && ["待中标方审核","待平台审核"].includes(r.progress) && <button className="text-[#1a5fa8] hover:underline text-left">撤回</button>}
                    {side === "initiated" && ["中标方审核不通过","平台审核不通过"].includes(r.progress) && <button className="text-[#1a5fa8] hover:underline text-left">编辑</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function RefundView() {
  const [topTab, setTopTab] = useState<"initiated" | "received">("initiated")

  return (
    <div className="p-6 bg-white">
      <div className="flex gap-6 border-b border-[#e8e8e8] mb-5">
        {[
          { k: "initiated", label: "我发起的" },
          { k: "received", label: "我收到的" },
        ].map(t => (
          <button key={t.k} onClick={() => setTopTab(t.k as "initiated" | "received")}
            className={`pb-2 -mb-px text-[15px] border-b-2 ${topTab === t.k ? "border-[#1a5fa8] text-[#1a5fa8] font-semibold" : "border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <RefundTable side={topTab} />
    </div>
  )
}
