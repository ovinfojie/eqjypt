"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ChevronDown, Eye } from "lucide-react"

type Tab = "caigou" | "gongying"
type Status = "all" | "pending" | "quoted" | "ordered" | "closed" | "expired"

const CAIGOU_ROWS = [
  { id: "XJ20260601001", title: "2026年广东省内计划大量采购丝苗米", product: "丝苗米", spec: "吨", qty: "100吨", seller: "汕头潮阳区社村合作农业发展有限公司", buyer: "盒马超市采购部", deadline: "2026-04-25", status: "pending" as const },
  { id: "XJ20260520002", title: "饲料用玉米大批量长期采购", product: "玉米", spec: "吨", qty: "120吨/月", seller: "广东新供销天润粮油集团有限公司", buyer: "盒马超市采购部", deadline: "2026-05-10", status: "quoted" as const },
  { id: "XJ20260510003", title: "优质大米（籼米）批量采购需求", product: "大米", spec: "吨", qty: "50吨", seller: "平远新供销天润粮油有限公司", buyer: "盒马超市采购部", deadline: "2026-04-15", status: "ordered" as const },
]

const GONGYING_ROWS = [
  { id: "BJ20260601001", title: "2026年广东省内计划大量采购丝苗米", product: "丝苗米（一级）", spec: "吨", qty: "120吨", buyer: "广东新供销天润粮油集团有限公司", seller: "南雄市社村合作农业发展有限公司", deadline: "2026-04-25", unitPrice: "80元/公斤", status: "pending" as const },
  { id: "BJ20260520002", title: "2026年广东省内计划大量采购菠萝干", product: "菠萝干", spec: "公斤", qty: "8000公斤", buyer: "平远新供销天润粮油有限公司", seller: "茂名市社村合作农业发展有限公司", deadline: "2026-03-26", unitPrice: "9元/公斤", status: "ordered" as const },
]

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "未下单", color: "#e8831a", bg: "#fff8f0" },
  quoted:  { label: "已报价", color: "#1a5fa8", bg: "#e8f4fd" },
  ordered: { label: "已下单", color: "#16a34a", bg: "#f0fdf4" },
  closed:  { label: "已关闭", color: "#999",    bg: "#f5f5f5" },
  expired: { label: "已过期", color: "#dc2626", bg: "#fff1f1" },
}

export default function WoFaqidePage() {
  const [tab, setTab] = useState<Tab>("caigou")
  const [status, setStatus] = useState<Status>("all")

  const statusTabs: { key: Status; label: string }[] = [
    { key: "all",     label: "全部" },
    { key: "pending", label: "未下单" },
    { key: "quoted",  label: "已报价" },
    { key: "ordered", label: "已下单" },
    { key: "closed",  label: "已关闭" },
    { key: "expired", label: "已过期" },
  ]

  return (
    <div className="max-w-[1100px]">
      {/* Breadcrumb */}
      <div className="text-[13px] text-[#999] mb-4 flex items-center gap-1.5">
        <span>询报价管理</span>
        <span>&gt;</span>
        <span className="text-[#333]">我发起的</span>
      </div>

      <div className="bg-white rounded-lg border border-[#dde3ec] overflow-hidden">
        {/* Main tabs */}
        <div className="flex border-b border-[#dde3ec]">
          {([["caigou", "采购询价"], ["gongying", "供应报价"]] as [Tab, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setTab(key); setStatus("all") }}
              className={`px-8 py-3.5 text-[15px] font-medium border-b-2 transition-colors ${
                tab === key ? "border-[#1a5fa8] text-[#1a5fa8]" : "border-transparent text-[#666] hover:text-[#1a5fa8]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {/* Search filters */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div className="relative">
              <input placeholder={tab === "caigou" ? "订单种植供应编号" : "订单种植需求编号"}
                className="w-full h-8 border border-[#dde3ec] rounded px-3 pr-8 text-[13px] outline-none focus:border-[#1a5fa8]" />
            </div>
            <div className="relative">
              <input placeholder={tab === "caigou" ? "供应标题" : "需求标题"}
                className="w-full h-8 border border-[#dde3ec] rounded px-3 pr-8 text-[13px] outline-none focus:border-[#1a5fa8]" />
            </div>
            <div className="relative">
              <input placeholder={tab === "caigou" ? "询价单编号" : "报价单编号"}
                className="w-full h-8 border border-[#dde3ec] rounded px-3 pr-8 text-[13px] outline-none focus:border-[#1a5fa8]" />
            </div>
            <button className="h-8 px-4 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" /> 搜索
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-5">
            <div>
              <label className="text-[12px] text-[#666] mr-2">收货计划</label>
              <div className="flex items-center gap-1 mt-1">
                <input type="text" placeholder="开始日期" className="flex-1 h-8 border border-[#dde3ec] rounded px-2 text-[12px] outline-none focus:border-[#1a5fa8]" />
                <span className="text-[#999] text-[12px]">至</span>
                <input type="text" placeholder="结束日期" className="flex-1 h-8 border border-[#dde3ec] rounded px-2 text-[12px] outline-none focus:border-[#1a5fa8]" />
              </div>
            </div>
            <div>
              <label className="text-[12px] text-[#666] mr-2">{tab === "caigou" ? "询价时间" : "报价时间"}</label>
              <div className="flex items-center gap-1 mt-1">
                <input type="text" placeholder="开始日期" className="flex-1 h-8 border border-[#dde3ec] rounded px-2 text-[12px] outline-none focus:border-[#1a5fa8]" />
                <span className="text-[#999] text-[12px]">至</span>
                <input type="text" placeholder="结束日期" className="flex-1 h-8 border border-[#dde3ec] rounded px-2 text-[12px] outline-none focus:border-[#1a5fa8]" />
              </div>
            </div>
            <div className="col-span-2 flex items-end gap-2">
              {(["今日","昨日","近7天","近30天"] as const).map((d) => (
                <button key={d} className="h-8 px-3 border border-[#dde3ec] rounded text-[12px] text-[#666] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">{d}</button>
              ))}
            </div>
          </div>

          {/* Status tabs */}
          <div className="flex gap-1 mb-4 border-b border-[#dde3ec]">
            {statusTabs.map((s) => (
              <button
                key={s.key}
                onClick={() => setStatus(s.key)}
                className={`px-5 py-2 text-[13px] border-b-2 transition-colors ${
                  status === s.key ? "border-[#1a5fa8] text-[#1a5fa8] font-medium" : "border-transparent text-[#666] hover:text-[#1a5fa8]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Table */}
          {tab === "caigou" ? (
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[#f5f7fa] text-[#444]">
                  {["订单种植供应标题","供应商品","规格","询价数量","卖方","买方","截止日期","状态","操作"].map((h) => (
                    <th key={h} className="px-3 py-2.5 text-left font-semibold border-b border-[#dde3ec]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CAIGOU_ROWS.map((row) => {
                  const s = STATUS_LABELS[row.status]
                  return (
                    <tr key={row.id} className="border-b border-[#dde3ec] hover:bg-[#fafbfd] transition-colors">
                      <td className="px-3 py-3">
                        <div className="font-medium text-[#1a1a2e] leading-tight">{row.title}</div>
                        <div className="text-[11px] text-[#999] mt-0.5">{row.id}</div>
                      </td>
                      <td className="px-3 py-3">{row.product}</td>
                      <td className="px-3 py-3 text-[#6b7c93]">{row.spec}</td>
                      <td className="px-3 py-3 font-medium">{row.qty}</td>
                      <td className="px-3 py-3 text-[#6b7c93] text-[12px] max-w-[120px]">{row.seller}</td>
                      <td className="px-3 py-3 text-[#6b7c93] text-[12px] max-w-[120px]">{row.buyer}</td>
                      <td className="px-3 py-3 text-[#6b7c93]">{row.deadline}</td>
                      <td className="px-3 py-3">
                        <span className="px-2 py-0.5 rounded text-[12px] font-medium" style={{ color: s.color, background: s.bg }}>{s.label}</span>
                      </td>
                      <td className="px-3 py-3">
                        <Link href="/merchant/dingdan-nongye/gy-xunjia" className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                          <Eye className="w-3.5 h-3.5" />查看
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[#f5f7fa] text-[#444]">
                  {["订单种植需求标题","供应商品","报价单价(单位)","买方","卖方","截止日期","状态","操作"].map((h) => (
                    <th key={h} className="px-3 py-2.5 text-left font-semibold border-b border-[#dde3ec]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GONGYING_ROWS.map((row) => {
                  const s = STATUS_LABELS[row.status]
                  return (
                    <tr key={row.id} className="border-b border-[#dde3ec] hover:bg-[#fafbfd] transition-colors">
                      <td className="px-3 py-3">
                        <div className="font-medium text-[#1a1a2e] leading-tight">{row.title}</div>
                        <div className="text-[11px] text-[#999] mt-0.5">{row.id}</div>
                      </td>
                      <td className="px-3 py-3">{row.product}</td>
                      <td className="px-3 py-3 font-medium text-[#1a5fa8]">{row.unitPrice}</td>
                      <td className="px-3 py-3 text-[#6b7c93] text-[12px] max-w-[120px]">{row.buyer}</td>
                      <td className="px-3 py-3 text-[#6b7c93] text-[12px] max-w-[120px]">{row.seller}</td>
                      <td className="px-3 py-3 text-[#6b7c93]">{row.deadline}</td>
                      <td className="px-3 py-3">
                        <span className="px-2 py-0.5 rounded text-[12px] font-medium" style={{ color: s.color, background: s.bg }}>{s.label}</span>
                      </td>
                      <td className="px-3 py-3">
                        <Link href="/merchant/dingdan-nongye/xq-baojia" className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                          <Eye className="w-3.5 h-3.5" />查看
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#dde3ec]">
            <span className="text-[13px] text-[#999]">共 {tab === "caigou" ? 3 : 2} 条记录</span>
            <div className="flex items-center gap-1">
              {[1].map((p) => (
                <button key={p} className="w-7 h-7 rounded text-[13px] bg-[#1a5fa8] text-white">{p}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
