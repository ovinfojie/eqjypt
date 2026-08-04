"use client"

import { useState } from "react"
import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react"

const MAIN_TABS = ["采购订单", "批次单", "对账记录", "结算记录"] as const
type MainTab = typeof MAIN_TABS[number]

const STATUS_TABS = ["全部", "待卖方确认", "待付预付款", "待发货", "待收货", "待结算"]

const ORDERS = [
  { id: "HZ-2434059405460665", buyer: "河源市和供农产品配送有限公司", orderCount: 15, amt: 32800.00, goodsTypes: 88, goodsCount: 100, farmers: 69, isProxy: true,  planTime: "2026-04-23 00:00:00 至 2026-04-25 23:59:59", shipPct: "-", status: "待卖方确认" },
  { id: "HZ-2434059405460665", buyer: "河源市和供农产品配送有限公司", orderCount: 20, amt: 17800.00, goodsTypes: 88, goodsCount: 100, farmers: 69, isProxy: false, planTime: "2026-04-23 00:00:00 至 2026-04-25 23:59:59", shipPct: "-", status: "待付预付款" },
  { id: "HZ-2434059405460665", buyer: "河源市和供农产品配送有限公司", orderCount: 12, amt: 302800.00, goodsTypes: 88, goodsCount: 100, farmers: 69, isProxy: true,  planTime: "2026-04-23 00:00:00 至 2026-04-25 23:59:59", shipPct: "-", status: "待发货" },
  { id: "HZ-2434059405460665", buyer: "河源市和供农产品配送有限公司", orderCount: 44, amt: 342800.00, goodsTypes: 88, goodsCount: 100, farmers: 69, isProxy: false, planTime: "2026-04-23 00:00:00 至 2026-04-25 23:59:59", shipPct: "-", status: "待收货" },
  { id: "HZ-2434059405460665", buyer: "河源市和供农产品配送有限公司", orderCount: 10, amt: 45800.00, goodsTypes: 88, goodsCount: 100, farmers: 69, isProxy: true,  planTime: "2026-04-23 00:00:00 至 2026-04-25 23:59:59", shipPct: "-", status: "待结算" },
]

const STATUS_COLOR: Record<string, string> = {
  "待卖方确认": "text-[#e8831a]",
  "待付预付款": "text-[#e04040]",
  "待发货":     "text-[#1a5fa8]",
  "待收货":     "text-[#1a5fa8]",
  "待结算":     "text-[#6b7c93]",
}

export default function JicaiWoCaigouPage() {
  const [mainTab, setMainTab] = useState<MainTab>("采购订单")
  const [activeTab, setActiveTab] = useState("全部")

  const filtered = activeTab === "全部" ? ORDERS : ORDERS.filter(o => o.status === activeTab)

  return (
    <div className="space-y-4">
      {/* 主 Tab */}
      <div className="flex border-b border-[#e8edf5] bg-white rounded-t-lg">
        {MAIN_TABS.map(t => (
          <button key={t} onClick={() => setMainTab(t)}
            className={`px-6 py-3 text-[14px] border-b-2 transition-colors font-medium ${mainTab===t?"border-[#1a5fa8] text-[#1a5fa8]":"border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>
            {t}
          </button>
        ))}
      </div>

      {(mainTab === "批次单" || mainTab === "对账记录" || mainTab === "结算记录") && (
        <div className="bg-white rounded-lg border border-[#e8edf5] py-16 text-center text-[14px] text-[#999]">
          {mainTab}功能建设中
        </div>
      )}

      {mainTab === "采购订单" && <>
        {/* 搜索区 */}
        <div className="bg-white rounded-lg border border-[#e8edf5] p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">交易订单编号：</label>
              <input className="flex-1 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] min-w-0" placeholder="请输入交易订单编号" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">买方：</label>
              <input className="flex-1 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] min-w-0" placeholder="请输入" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">卖方：</label>
              <input className="flex-1 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] min-w-0" placeholder="请输入" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">商品名称：</label>
              <input className="flex-1 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] min-w-0" placeholder="请输入" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">是否集采下单：</label>
              <select className="flex-1 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] text-[#999] focus:outline-none focus:border-[#1a5fa8] min-w-0">
                <option value="">请选择</option>
                <option>是</option><option>否</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">订单状态：</label>
              <select className="flex-1 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] text-[#999] focus:outline-none focus:border-[#1a5fa8] min-w-0">
                <option value="">请选择</option>
                {STATUS_TABS.slice(1).map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">下单时间：</label>
              <div className="flex items-center gap-1">
                <input type="date" className="border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
                <span className="text-[#999]">至</span>
                <input type="date" className="border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
                {["今日","昨日","近7天","近30天"].map(d=>(
                  <button key={d} className="px-2 py-1 text-[12px] border border-[#dde3ec] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8]">{d}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">要求收货时间：</label>
              <div className="flex items-center gap-1">
                <input type="date" className="border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
                <span className="text-[#999]">至</span>
                <input type="date" className="border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
                {["今日","昨日","近7天","近30天"].map(d=>(
                  <button key={d} className="px-2 py-1 text-[12px] border border-[#dde3ec] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8]">{d}</button>
                ))}
              </div>
            </div>
            <div className="ml-auto flex gap-2">
              <button className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] flex items-center gap-1.5"><Search className="w-3.5 h-3.5" />查询</button>
              <button className="px-4 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">清空</button>
              <button className="px-4 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999] flex items-center gap-1.5"><Download className="w-3.5 h-3.5" />导出</button>
            </div>
          </div>
        </div>

        {/* 状态 Tab + 表格 */}
        <div className="bg-white rounded-lg border border-[#e8edf5]">
          <div className="flex border-b border-[#e8edf5]">
            {STATUS_TABS.map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-4 py-3 text-[13px] border-b-2 transition-colors whitespace-nowrap ${activeTab===t?"border-[#1a5fa8] text-[#1a5fa8] font-semibold":"border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>
                {t}
              </button>
            ))}
          </div>

          <table className="w-full text-[13px]">
            <thead className="bg-[#f5f7fa] border-b border-[#e8edf5]">
              <tr>
                {["订单编号","买方","订单数(单)","订单总金额(元)","商品种类数(个)","商品数(个)","客农户(个)","是否一件代发","收货计划","发货进度(%)","订单状态","下单时间","操作"].map(h=>(
                  <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#666] text-[12px] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o, i) => (
                <tr key={i} className="border-t border-[#e8edf5] hover:bg-[#fafbfc]">
                  <td className="px-3 py-3 text-[#555] text-[12px]">{o.id}</td>
                  <td className="px-3 py-3 text-[#555] text-[12px]">{o.buyer}</td>
                  <td className="px-3 py-3 text-[#1a1a2e] text-[12px]">{o.orderCount}</td>
                  <td className="px-3 py-3 text-[#1a1a2e] text-[12px]">¥{o.amt.toFixed(2)}</td>
                  <td className="px-3 py-3 text-[#1a1a2e] text-[12px]">{o.goodsTypes}</td>
                  <td className="px-3 py-3 text-[#1a1a2e] text-[12px]">{o.goodsCount}</td>
                  <td className="px-3 py-3 text-[#1a1a2e] text-[12px]">{o.farmers}</td>
                  <td className="px-3 py-3 text-[12px]">
                    <span className={o.isProxy?"text-[#3a8c3f]":"text-[#6b7c93]"}>{o.isProxy?"是":"否"}</span>
                  </td>
                  <td className="px-3 py-3 text-[#555] text-[11px]">{o.planTime}</td>
                  <td className="px-3 py-3 text-[#555] text-[12px]">{o.shipPct}</td>
                  <td className={`px-3 py-3 text-[12px] font-medium ${STATUS_COLOR[o.status]??""}`}>{o.status}</td>
                  <td className="px-3 py-3 text-[#555] text-[11px]">2026-04-10 23:59:59</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-col gap-1">
                      <button className="text-[#1a5fa8] hover:underline text-[12px] text-left">查看详情</button>
                      {o.status === "待付预付款" && <button className="text-[#e04040] hover:underline text-[12px] text-left">取消订单</button>}
                      {o.status === "待付预付款" && <button className="text-[#e8831a] hover:underline text-[12px] text-left">付预付款</button>}
                      {o.status === "待发货" && <button className="text-[#e04040] hover:underline text-[12px] text-left">终止发货</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 分页 */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#e8edf5]">
            <span className="text-[12px] text-[#999]">共 24 条</span>
            <div className="flex items-center gap-1">
              <select className="border border-[#dde3ec] rounded px-2 py-1 text-[12px]"><option>10条/页</option><option>20条/页</option></select>
              <button className="w-7 h-7 flex items-center justify-center border border-[#dde3ec] rounded hover:border-[#1a5fa8]"><ChevronLeft className="w-3.5 h-3.5 text-[#555]" /></button>
              <button className="w-7 h-7 flex items-center justify-center bg-[#1a5fa8] text-white rounded text-[12px]">1</button>
              <button className="w-7 h-7 flex items-center justify-center border border-[#dde3ec] rounded text-[12px] text-[#555] hover:border-[#1a5fa8]">2</button>
              <button className="w-7 h-7 flex items-center justify-center border border-[#dde3ec] rounded text-[12px] text-[#555] hover:border-[#1a5fa8]">3</button>
              <button className="w-7 h-7 flex items-center justify-center border border-[#dde3ec] rounded hover:border-[#1a5fa8]"><ChevronRight className="w-3.5 h-3.5 text-[#555]" /></button>
              <span className="text-[12px] text-[#999]">前往</span>
              <input type="number" defaultValue={1} className="w-10 border border-[#dde3ec] rounded px-1.5 py-1 text-[12px] text-center" />
              <span className="text-[12px] text-[#999]">页</span>
            </div>
          </div>
        </div>
      </>}
    </div>
  )
}
