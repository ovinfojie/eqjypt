"use client"

import { useState } from "react"

type DepositRow = {
  id: string
  payTime: string
  sceneNo: string
  title: string
  payer: string
  result: string
  product: string
  channel: string
  paid: string
  refunded: string
  deducted: string
  remain: string
  sceneStatus: string
  depositStatus: string
  danger?: boolean
}

const baseRows: DepositRow[] = [
  { id: "1781271837791-ryAd20260612214351", payTime: "2025-11-21 14:59:06", sceneNo: "JP2512110046", title: "2026年2月5日10点30分惠州库粮食竞价交易", payer: "数科有限公司(数科粮油子店)", result: "-", product: "-", channel: "工行安心付", paid: "10000.00", refunded: "0", deducted: "0", remain: "10000.00", sceneStatus: "即将开始", depositStatus: "已冻结(锁定中)" },
  { id: "1781271837791-ryAd20260612214358", payTime: "2025-11-21 14:59:06", sceneNo: "JP2512110046", title: "2026年2月6日10点30分惠州库粮食竞价交易", payer: "数科有限公司(数科粮油子店)", result: "-", product: "-", channel: "建行龙存管", paid: "10000.00", refunded: "0", deducted: "0", remain: "10000.00", sceneStatus: "正在进行", depositStatus: "已冻结(锁定中)" },
  { id: "1781271837791-ryAd20260612214358", payTime: "2025-11-21 14:59:06", sceneNo: "JP2512110046", title: "2026年2月7日10点30分惠州库粮食竞价交易", payer: "数科有限公司(数科粮油子店)", result: "已中标", product: "印度珍桂白米25kg", channel: "建行龙存管", paid: "10000.00", refunded: "0", deducted: "0", remain: "10000.00", sceneStatus: "平台取消", depositStatus: "已冻结(可申请退款)", danger: true },
  { id: "1781271837791-ryAd20260612214358", payTime: "2025-11-21 14:59:06", sceneNo: "JP2512110046", title: "2026年2月8日10点30分惠州库粮食竞价交易", payer: "数科有限公司(数科粮油子店)", result: "已中标", product: "印度珍桂白米25kg", channel: "建行龙存管", paid: "10000.00", refunded: "0", deducted: "0", remain: "10000.00", sceneStatus: "已关闭", depositStatus: "已冻结(可申请退款)", danger: true },
  { id: "1781271837791-ryAd20260612214358", payTime: "2025-11-21 14:59:06", sceneNo: "JP2512110046", title: "2026年2月9日10点30分惠州库粮食竞价交易", payer: "数科有限公司(数科粮油子店)", result: "已中标", product: "印度珍桂白米25kg", channel: "工行安心付", paid: "10000.00", refunded: "0", deducted: "0", remain: "10000.00", sceneStatus: "已结束", depositStatus: "已冻结(可申请退款)" },
  { id: "1781271837791-ryAd20260612214358", payTime: "2025-11-21 14:59:06", sceneNo: "JP2512110046", title: "2026年2月10日10点30分惠州库粮食竞价交易", payer: "数科有限公司(数科粮油子店)", result: "已中标", product: "印度珍桂白米25kg", channel: "工行安心付", paid: "10000.00", refunded: "10000.00", deducted: "0", remain: "0", sceneStatus: "已结束", depositStatus: "已完成(全额已退款)" },
  { id: "1781271837791-ryAd20260612214351", payTime: "2025-11-21 14:59:06", sceneNo: "JP2512110046", title: "2026年2月11日10点30分惠州库粮食竞价交易", payer: "数科有限公司(数科粮油子店)", result: "已中标", product: "印度珍桂白米25kg", channel: "建行龙存管", paid: "10000.00", refunded: "10000.00", deducted: "4000.00", remain: "0.00", sceneStatus: "已结束", depositStatus: "已完成(部分退回、部分扣罚)" },
  { id: "1781271837791-ryAd20260612214351", payTime: "2025-11-21 14:59:06", sceneNo: "JP2512110046", title: "2026年2月11日10点30分惠州库粮食竞价交易", payer: "数科有限公司(数科粮油子店)", result: "未中标", product: "印度珍桂白米25kg", channel: "建行龙存管", paid: "10000.00", refunded: "10000.00", deducted: "4000.00", remain: "0.00", sceneStatus: "已结束", depositStatus: "已冻结(可申请退款)", danger: true },
]

const statusTabs = ["全部", "已冻结(锁定中)", "已冻结(可申请退款)", "已完成(全额已退款)", "已完成(部分退回、部分扣罚)"]

const inputCls = "h-8 px-2 border border-[#d9d9d9] rounded text-[13px] text-[#1a1a2e] placeholder:text-[#bbb] focus:outline-none focus:border-[#1a5fa8] w-full"

function DepositTable({ tip }: { tip: React.ReactNode }) {
  const [tab, setTab] = useState("全部")
  const rows = tab === "全部" ? baseRows : baseRows.filter(r => r.depositStatus === tab)

  return (
    <div>
      <div className="bg-[#fff7e6] border border-[#ffe0a3] rounded px-4 py-3 mb-4 text-[12px] text-[#d46b08] leading-6">
        {tip}
      </div>

      <div className="bg-[#f7f9fc] border border-[#eef1f5] rounded p-4 mb-4">
        <div className="grid grid-cols-4 gap-x-4 gap-y-3">
          <div><label className="block text-[12px] text-[#666] mb-1">保证金编号</label><input placeholder="请输入" className={inputCls} /></div>
          <div><label className="block text-[12px] text-[#666] mb-1">关联的专场编号</label><input placeholder="请输入" className={inputCls} /></div>
          <div><label className="block text-[12px] text-[#666] mb-1">竞拍专场标题</label><input placeholder="请输入" className={inputCls} /></div>
          <div><label className="block text-[12px] text-[#666] mb-1">竞拍角色</label><select className={inputCls}><option>请选择</option></select></div>
          <div><label className="block text-[12px] text-[#666] mb-1">付款方</label><input placeholder="请输入" className={inputCls} /></div>
          <div><label className="block text-[12px] text-[#666] mb-1">结算渠道</label><select className={inputCls}><option>请选择</option></select></div>
          <div><label className="block text-[12px] text-[#666] mb-1">专场状态</label><select className={inputCls}><option>请选择</option></select></div>
          <div><label className="block text-[12px] text-[#666] mb-1">保证金状态</label><select className={inputCls}><option>请选择</option></select></div>
        </div>
        <div className="flex items-end gap-2 mt-3">
          <div className="flex items-center gap-2">
            <label className="text-[12px] text-[#666]">支付时间</label>
            <input placeholder="请选择时间" className={inputCls + " w-36"} />
            <span className="text-[12px] text-[#666]">至</span>
            <input placeholder="请选择时间" className={inputCls + " w-36"} />
          </div>
          <button className="h-8 px-5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]">查询</button>
          <button className="h-8 px-5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]">导出</button>
        </div>
      </div>

      <div className="flex items-center gap-10 mb-4 text-[15px]">
        <span className="text-[#1a1a2e]">当前冻结保证金：<b className="text-[#1a5fa8] text-[20px]">¥ 50000.00</b></span>
        <span className="text-[#1a1a2e]">已退回保证金总金额：<b className="text-[#1a5fa8] text-[20px]">¥ 30000.00</b></span>
        <span className="text-[#1a1a2e]">违约扣除总金额：<b className="text-[#1a5fa8] text-[20px]">¥ 30000.00</b></span>
      </div>

      <div className="flex border-b border-[#e8e8e8] mb-3">
        {statusTabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 h-9 text-[13px] -mb-px border-b-2 ${tab === t ? "border-[#1a5fa8] text-[#1a5fa8] font-medium" : "border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto border border-[#eef1f5] rounded">
        <table className="w-full text-[12px] border-collapse min-w-[1500px]">
          <thead>
            <tr className="bg-[#f7f9fc] text-[#666] text-left">
              {["保证金编号","支付时间","关联的专场编号","竞拍专场标题","付款方","竞拍结果","中标商品","结算渠道","缴纳的总金额(元)","已退款总金额(元)","违约扣除总金额(元)","剩余可退总金额(元)","专场状态","保证金状态","操作"].map(h => (
                <th key={h} className="px-3 py-3 font-medium whitespace-nowrap border-b border-[#eef1f5]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-[#f0f2f5] hover:bg-[#fafbfc]">
                <td className="px-3 py-3 font-mono text-[11px] text-[#1a1a2e] max-w-[160px] break-all">{r.id}</td>
                <td className="px-3 py-3 whitespace-nowrap text-[#666]">{r.payTime}</td>
                <td className="px-3 py-3 text-[#1a5fa8]">{r.sceneNo}</td>
                <td className={`px-3 py-3 min-w-[220px] ${r.danger ? "text-[#e34d59]" : "text-[#1a1a2e]"}`}>{r.title}</td>
                <td className="px-3 py-3 whitespace-nowrap text-[#1a1a2e]">{r.payer}</td>
                <td className={`px-3 py-3 whitespace-nowrap ${r.result === "未中标" ? "text-[#e34d59]" : "text-[#1a1a2e]"}`}>{r.result}</td>
                <td className="px-3 py-3 whitespace-nowrap text-[#1a1a2e]">{r.product}</td>
                <td className="px-3 py-3 whitespace-nowrap text-[#1a1a2e]">{r.channel}</td>
                <td className="px-3 py-3 whitespace-nowrap text-[#1a1a2e]">{r.paid}</td>
                <td className="px-3 py-3 whitespace-nowrap text-[#1a1a2e]">{r.refunded}</td>
                <td className="px-3 py-3 whitespace-nowrap text-[#1a1a2e]">{r.deducted}</td>
                <td className="px-3 py-3 whitespace-nowrap text-[#1a1a2e]">{r.remain}</td>
                <td className={`px-3 py-3 whitespace-nowrap ${["平台取消","已关闭"].includes(r.sceneStatus) ? "text-[#e34d59]" : "text-[#1a1a2e]"}`}>{r.sceneStatus}</td>
                <td className={`px-3 py-3 min-w-[140px] ${r.danger ? "text-[#e34d59]" : "text-[#1a1a2e]"}`}>{r.depositStatus}</td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <div className="flex flex-col gap-0.5">
                    <button className="text-[#1a5fa8] hover:underline text-left">查看详情</button>
                    {r.depositStatus === "已冻结(可申请退款)" && <button className="text-[#1a5fa8] hover:underline text-left">保证金处理</button>}
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

export default function DepositView({ role }: { role: "fabu" | "baoming" }) {
  const [topTab, setTopTab] = useState<"mine" | "other">("mine")

  if (role === "baoming") {
    return (
      <div className="p-6 bg-white">
        <h2 className="text-[15px] font-semibold text-[#1a5fa8] mb-4">我缴纳的保证金</h2>
        <DepositTable tip={
          <>
            1、本页面仅展示您报名竞拍时所缴纳的保证金。<br />
            2、您作为报名方缴纳的保证金，在竞拍结束后，未中标情况下保证金将于 1-3 个工作日内原路退回；中标情况下，完成履约后可在本页面向发布方发起退回申请，经发布方审核通过后，保证金将于 2 个工作日内原路退回。
          </>
        } />
      </div>
    )
  }

  return (
    <div className="p-6 bg-white">
      <div className="flex gap-6 border-b border-[#e8e8e8] mb-5">
        {[
          { k: "mine", label: "我缴纳的保证金" },
          { k: "other", label: "对方缴纳的保证金" },
        ].map(t => (
          <button key={t.k} onClick={() => setTopTab(t.k as "mine" | "other")}
            className={`pb-2 -mb-px text-[15px] border-b-2 ${topTab === t.k ? "border-[#1a5fa8] text-[#1a5fa8] font-semibold" : "border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {topTab === "mine" ? (
        <DepositTable tip={
          <>
            1、本页面仅展示您在发布竞拍时所缴纳的保证金。<br />
            2、您作为发布方缴纳的保证金，待该场次所有中标方保证金退回后，将于 1-3 个工作日内原路退回。<br />
            3、您作为发布方查询或处理中标方的保证金退回进度，可在【对方缴纳的保证金】页面中查看。
          </>
        } />
      ) : (
        <DepositTable tip={
          <>
            1、本页面仅展示您作为发布方，所发布的竞拍场次中全部报名方缴纳的保证金。<br />
            2、您发布的竞拍场次结束后，中标者的保证金需报名方主动发起退回申请，您审核通过后于 2 个工作日内退回；未中标者的保证金无需申请于 2 个工作日内自动退回。
          </>
        } />
      )}
    </div>
  )
}
