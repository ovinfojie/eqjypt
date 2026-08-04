"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, ChevronLeft, ChevronRight } from "lucide-react"

const CONTRACTS = [
  { id: "COC2601201749172670", name: "广供销平台2026年采购合同",  amount: 38000.00, orderId: "2601201749172670", orderType: "采购订单", goods: "丝苗米、南昌香占",     orderStatus: "待发货",       buyer: "广东供销数字科技有限公司", seller: "广东新供销天润粮油集团有限公司", contractStatus: "待我方签章",  created: "2026-04-22 10:15:30" },
  { id: "COC2601201749172671", name: "豇豆大宗采购框架协议",       amount: 26000.00, orderId: "2601201749172671", orderType: "销售订单", goods: "豇豆、土豆",             orderStatus: "待卖方确认",   buyer: "广东供销数字科技有限公司", seller: "汕尾吉康供销农产品有限公司",     contractStatus: "待对方签章",  created: "2026-04-15 08:40:22" },
  { id: "COC2601201749172672", name: "象牙香占2026年度供应合同",   amount: 85000.00, orderId: "2601201749172672", orderType: "采购订单", goods: "象牙香占、象牙粘显谷",   orderStatus: "待收货",       buyer: "广东供销数字科技有限公司", seller: "广州市海珠区供销农产品有限公司", contractStatus: "签章完成",    created: "2026-04-11 16:20:10" },
  { id: "COC2601201749172673", name: "菜心冷链直供合同2026Q2",     amount: 12000.00, orderId: "2601201749172673", orderType: "销售订单", goods: "菜心",                   orderStatus: "待结算",       buyer: "广东供销数字科技有限公司", seller: "广州白云供销农产品配送有限公司", contractStatus: "已完成",      created: "2026-04-08 09:05:12" },
]

const STATUS_STYLE: Record<string, { color: string; bg: string }> = {
  "待我方签章": { color: "#e8831a", bg: "#fff8f0" },
  "待对方签章": { color: "#1a5fa8", bg: "#e8f4fd" },
  "签章完成":   { color: "#3a8c3f", bg: "#e8f5e9" },
  "已完成":     { color: "#999",    bg: "#f3f4f6" },
}

const TABS = ["全部", "待我方签章", "待对方签章", "已完成"]

export default function ContractWoShoudaoePage() {
  const [tab, setTab] = useState("全部")

  const filtered = CONTRACTS.filter(c => tab === "全部" || c.contractStatus === tab)

  return (
    <div className="space-y-4">
      <div className="text-[13px] text-[#6b7c93] flex items-center gap-1">
        <span>合同管理</span>
        <span className="mx-1 text-[#ccc]">&gt;</span>
        <span className="text-[#1a1a2e] font-medium">我收到的</span>
      </div>

      {/* 搜索区 */}
      <div className="bg-white rounded-xl border border-[#e8edf5] px-5 py-4">
        <div className="grid grid-cols-4 gap-3 mb-3">
          {[
            { label: "订单编号",  placeholder: "请输入" },
            { label: "订单类型",  placeholder: "请输入", type: "select" },
            { label: "商品名称",  placeholder: "请输入" },
            { label: "订单状态",  placeholder: "请选择", type: "select" },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-[12px] text-[#555] mb-1">{f.label}</label>
              {f.type === "select"
                ? <select className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] text-[#999] focus:outline-none focus:border-[#1a5fa8]"><option value="">{f.placeholder}</option></select>
                : <input className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder={f.placeholder} />
              }
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3 mb-3">
          {[
            { label: "合同编号",  placeholder: "请输入" },
            { label: "合同名称",  placeholder: "请输入" },
            { label: "买方",      placeholder: "请输入" },
            { label: "卖方",      placeholder: "请输入" },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-[12px] text-[#555] mb-1">{f.label}</label>
              <input className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder={f.placeholder} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div>
            <label className="block text-[12px] text-[#555] mb-1">合同状态</label>
            <select className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] text-[#999] focus:outline-none focus:border-[#1a5fa8]"><option value="">请选择</option></select>
          </div>
          <div className="col-span-2">
            <label className="block text-[12px] text-[#555] mb-1">创建时间</label>
            <div className="flex items-center gap-2">
              <input type="date" className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              <span className="text-[#999] text-[12px]">至</span>
              <input type="date" className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              {["今日","昨日","近7天","近30天"].map(d => (
                <button key={d} className="px-2.5 py-1.5 text-[12px] text-[#555] border border-[#dde3ec] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors whitespace-nowrap">{d}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-1.5 bg-[#1a5fa8] text-white text-[13px] font-medium rounded hover:bg-[#0d4a8a]">查询</button>
          <button className="px-5 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">清空</button>
          <button className="px-5 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">导出</button>
        </div>
      </div>

      {/* 列表区 */}
      <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
        <div className="flex border-b border-[#e8edf5]">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2.5 text-[13px] border-b-2 -mb-px transition-colors ${tab === t ? "border-[#1a5fa8] text-[#1a5fa8] font-semibold" : "border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="bg-[#f8fafc] text-[#6b7c93] border-b border-[#f0f4f8]">
                {["合同编号","合同名称","合同金额(元)","订单编号","订单类型","商品名称","订单状态","买方","卖方","合同状态","创建时间","操作"].map(h => (
                  <th key={h} className="px-3 py-2.5 text-left font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => {
                const ss = STATUS_STYLE[c.contractStatus] ?? { color: "#999", bg: "#f3f4f6" }
                return (
                  <tr key={c.id} className="border-b border-[#f8fafc] hover:bg-[#fafbfc]">
                    <td className="px-3 py-2.5 text-[#999] font-mono whitespace-nowrap">{c.id}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#6b7c93] shrink-0" />
                        <span className="font-medium text-[#1a1a2e] whitespace-nowrap">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 font-semibold text-[#e8831a] whitespace-nowrap">{c.amount.toFixed(2)}</td>
                    <td className="px-3 py-2.5 text-[#999] font-mono whitespace-nowrap">{c.orderId}</td>
                    <td className="px-3 py-2.5"><span className="px-2 py-0.5 bg-[#f0f4f8] text-[#555] rounded whitespace-nowrap">{c.orderType}</span></td>
                    <td className="px-3 py-2.5 text-[#555] max-w-[120px] truncate">{c.goods}</td>
                    <td className="px-3 py-2.5 text-[#555] whitespace-nowrap">{c.orderStatus}</td>
                    <td className="px-3 py-2.5 text-[#555] whitespace-nowrap">{c.buyer}</td>
                    <td className="px-3 py-2.5 text-[#555] whitespace-nowrap">{c.seller}</td>
                    <td className="px-3 py-2.5">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap" style={{ color: ss.color, background: ss.bg }}>{c.contractStatus}</span>
                    </td>
                    <td className="px-3 py-2.5 text-[#999] whitespace-nowrap">{c.created}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex gap-2 whitespace-nowrap">
                        <Link href="/merchant/dingdan-nongye/contract-view" className="text-[#1a5fa8] hover:underline">详情</Link>
                        {c.contractStatus === "待我方签章" && <button className="text-[#1a5fa8] hover:underline">签章</button>}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#e8edf5]">
          <span className="text-[12px] text-[#999]">共 {filtered.length} 条</span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center rounded border border-[#dde3ec] hover:border-[#1a5fa8] text-[#666]"><ChevronLeft className="w-3.5 h-3.5" /></button>
            <button className="w-7 h-7 flex items-center justify-center rounded bg-[#1a5fa8] text-white text-[12px] font-semibold">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-[#dde3ec] hover:border-[#1a5fa8] text-[#666]"><ChevronRight className="w-3.5 h-3.5" /></button>
            <span className="text-[12px] text-[#999] ml-1">共 1 页</span>
          </div>
        </div>
      </div>
    </div>
  )
}
