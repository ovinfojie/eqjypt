"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Eye, ShoppingCart, Pencil, XCircle, X } from "lucide-react"

type Tab = "caigou" | "gongying"
type Status = "all" | "pending" | "quoted" | "ordered" | "notordered" | "expired" | "closed"

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  pending:    { label: "待报价", color: "#e8831a", bg: "#fff8f0" },
  quoted:     { label: "已报价", color: "#1a5fa8", bg: "#e8f4fd" },
  ordered:    { label: "已下单", color: "#16a34a", bg: "#f0fdf4" },
  notordered: { label: "未下单", color: "#e8831a", bg: "#fff8f0" },
  expired:    { label: "已过期", color: "#dc2626", bg: "#fff1f1" },
  closed:     { label: "已关闭", color: "#999",    bg: "#f5f5f5" },
}

// 状态 Tab 随主 Tab 切换：采购需求报价 vs 供应信息报价
const CAIGOU_STATUS_TABS: { key: Status; label: string }[] = [
  { key: "all",     label: "全部"   },
  { key: "pending", label: "待报价" },
  { key: "quoted",  label: "已报价" },
  { key: "ordered", label: "已下单" },
  { key: "expired", label: "已过期" },
  { key: "closed",  label: "已关闭" },
]
const GONGYING_STATUS_TABS: { key: Status; label: string }[] = [
  { key: "all",        label: "全部"   },
  { key: "notordered", label: "未下单" },
  { key: "ordered",    label: "已下单" },
  { key: "closed",     label: "已关闭" },
  { key: "expired",    label: "已过期" },
]

// 我发起的采购需求报价（我方作为买方发出采购需求，供应商报价，我可下单）
const CAIGOU_ROWS = [
  {
    quoteNo: "q793247234897", quoteTime: "2026-06-01 20:42:12",
    shop: "字鹏1", company: "字鹏互联网科技(上海)有限公司",
    products: "韭菜、杀虫、测试等4种商品",
    total: 255.0, delivery: "买家自提", settlement: "建行龙存管",
    validStart: "2026-06-01 20:42:12", validEnd: "2026-06-25 23:59:59",
    status: "ordered" as Status, orderedCount: 3,
  },
  {
    quoteNo: "q793247234898", quoteTime: "2026-05-21 15:45:41",
    shop: "字鹏1", company: "字鹏互联网科技(上海)有限公司",
    products: "桂味荔枝",
    total: 34.0, delivery: "卖家配送", settlement: "建行龙存管",
    validStart: "2026-05-21 15:45:41", validEnd: "2026-05-22 23:59:59",
    status: "quoted" as Status, orderedCount: 0,
  },
  {
    quoteNo: "q793247234899", quoteTime: "2026-05-18 10:05:16",
    shop: "字鹏1", company: "字鹏互联网科技(上海)有限公司",
    products: "韭菜、杀虫、测试等4种商品",
    total: 222.0, delivery: "卖家配送", settlement: "建行龙存管",
    validStart: "2026-05-18 10:05:16", validEnd: "2026-05-19 23:59:59",
    status: "pending" as Status, orderedCount: 0,
  },
  {
    quoteNo: "q793247234900", quoteTime: "2026-05-15 21:19:11",
    shop: "饶平种植专业合作社", company: "矩阵信息技术(上海)有限公司",
    products: "茂名妃子笑",
    total: 120.0, delivery: "卖家配送", settlement: "建行龙存管",
    validStart: "2026-05-15 21:19:11", validEnd: "2026-05-30 23:59:59",
    status: "expired" as Status, orderedCount: 0,
  },
  {
    quoteNo: "q793247234901", quoteTime: "2026-05-10 09:11:20",
    shop: "饶平种植专业合作社", company: "矩阵信息技术(上海)有限公司",
    products: "沙糖桔",
    total: 88.0, delivery: "卖家配送", settlement: "工行安心付",
    validStart: "2026-05-10 09:11:20", validEnd: "2026-05-12 23:59:59",
    status: "closed" as Status, orderedCount: 0,
  },
]

// 我发起的供应信息报价（我方作为卖方发布供应信息，买方基于报价下单）
const GONGYING_ROWS = [
  {
    quoteNo: "q893247234801", quoteTime: "2026-06-01 20:42:12",
    shop: "字鹏1", company: "字鹏互联网科技(上海)有限公司",
    products: "韭菜、杀虫、测试等4种商品",
    total: 255.0, delivery: "买家自提", settlement: "建行龙存管",
    validStart: "2026-06-01 20:42:12", validEnd: "2026-06-25 23:59:59",
    status: "ordered" as Status, orderedCount: 2,
  },
  {
    quoteNo: "q893247234802", quoteTime: "2026-05-21 15:45:41",
    shop: "字鹏1", company: "字鹏互联网科技(上海)有限公司",
    products: "桂味荔枝",
    total: 34.0, delivery: "卖家配送", settlement: "建行龙存管",
    validStart: "2026-05-21 15:45:41", validEnd: "2026-05-22 23:59:59",
    status: "notordered" as Status, orderedCount: 0,
  },
  {
    quoteNo: "q893247234803", quoteTime: "2026-05-16 11:20:08",
    shop: "饶平种植专业合作社", company: "矩阵信息技术(上海)有限公司",
    products: "茂名妃子笑",
    total: 120.0, delivery: "卖家配送", settlement: "建行龙存管",
    validStart: "2026-05-16 11:20:08", validEnd: "2026-05-28 23:59:59",
    status: "closed" as Status, orderedCount: 0,
  },
  {
    quoteNo: "q893247234804", quoteTime: "2026-05-08 14:33:50",
    shop: "饶平种植专业合作社", company: "矩阵信息技术(上海)有限公司",
    products: "沙糖桔",
    total: 88.0, delivery: "卖家配送", settlement: "工行安心付",
    validStart: "2026-05-08 14:33:50", validEnd: "2026-05-10 23:59:59",
    status: "expired" as Status, orderedCount: 0,
  },
]

export default function ChanxiaoXunbaojiaFaqidePage() {
  const [tab, setTab] = useState<Tab>("caigou")
  const [statusTab, setStatusTab] = useState<Status>("all")
  const [cancelNo, setCancelNo] = useState<string | null>(null)

  const rows = tab === "caigou" ? CAIGOU_ROWS : GONGYING_ROWS
  const statusTabs = tab === "caigou" ? CAIGOU_STATUS_TABS : GONGYING_STATUS_TABS
  const filtered = statusTab === "all" ? rows : rows.filter(r => r.status === statusTab)

  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-[13px] text-[#999] mb-4 flex items-center gap-1">
        <span>产销</span>
        <span className="mx-1">&gt;</span>
        <span className="text-[#333] font-medium">我发起的</span>
      </div>

      <div className="bg-white rounded-lg border border-[#dde3ec] overflow-hidden">
        {/* 主Tab */}
        <div className="flex border-b border-[#dde3ec]">
          {([["caigou", "采购需求报价"], ["gongying", "供应信息报价"]] as [Tab, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setTab(key); setStatusTab("all") }}
              className={`px-8 py-3.5 text-[15px] font-medium border-b-2 transition-colors ${
                tab === key ? "border-[#1a5fa8] text-[#1a5fa8]" : "border-transparent text-[#666] hover:text-[#1a5fa8]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {/* 搜索区 */}
          <div className="grid grid-cols-6 gap-3 mb-3">
            <div>
              <label className="text-[12px] text-[#666] block mb-1">采购需求编号</label>
              <input placeholder="请输入采购需求编号" className="w-full h-8 border border-[#dde3ec] rounded px-3 text-[12px] outline-none focus:border-[#1a5fa8]" />
            </div>
            <div>
              <label className="text-[12px] text-[#666] block mb-1">报价单编号</label>
              <input placeholder="请输入报价单编号" className="w-full h-8 border border-[#dde3ec] rounded px-3 text-[12px] outline-none focus:border-[#1a5fa8]" />
            </div>
            <div>
              <label className="text-[12px] text-[#666] block mb-1">买方</label>
              <input placeholder="请输入公司名称" className="w-full h-8 border border-[#dde3ec] rounded px-3 text-[12px] outline-none focus:border-[#1a5fa8]" />
            </div>
            <div>
              <label className="text-[12px] text-[#666] block mb-1">商品名称</label>
              <input placeholder="请输入商品名称" className="w-full h-8 border border-[#dde3ec] rounded px-3 text-[12px] outline-none focus:border-[#1a5fa8]" />
            </div>
            <div>
              <label className="text-[12px] text-[#666] block mb-1">业务模式</label>
              <select className="w-full h-8 border border-[#dde3ec] rounded px-2 text-[12px] outline-none focus:border-[#1a5fa8] text-[#999]">
                <option value="">请选择</option>
                <option>批发与大宗销售</option>
                <option>零售与个人销售</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button className="h-8 px-4 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] flex items-center gap-1">
                <Search className="w-3.5 h-3.5" />查询
              </button>
              <button className="h-8 px-4 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">清空</button>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 mb-5">
            <div className="col-span-2">
              <label className="text-[12px] text-[#666] block mb-1">结算渠道</label>
              <select className="w-full h-8 border border-[#dde3ec] rounded px-2 text-[12px] outline-none focus:border-[#1a5fa8] text-[#999]">
                <option value="">请选择</option>
                <option>建行龙存管</option>
                <option>工行安心付</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-[12px] text-[#666] block mb-1">时间</label>
              <div className="flex items-center gap-1">
                <input type="text" placeholder="选择时间" className="flex-1 h-8 border border-[#dde3ec] rounded px-2 text-[12px] outline-none focus:border-[#1a5fa8]" />
                <span className="text-[#999] text-[12px]">至</span>
                <input type="text" placeholder="选择时间" className="flex-1 h-8 border border-[#dde3ec] rounded px-2 text-[12px] outline-none focus:border-[#1a5fa8]" />
              </div>
            </div>
          </div>

          {/* 状态 Tab */}
          <div className="flex border-b border-[#dde3ec] mb-4">
            {statusTabs.map(t => (
              <button
                key={t.key}
                onClick={() => setStatusTab(t.key)}
                className={`px-5 py-2 text-[13px] border-b-2 transition-colors ${
                  statusTab === t.key ? "border-[#1a5fa8] text-[#1a5fa8] font-medium" : "border-transparent text-[#666] hover:text-[#1a5fa8]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* 表格 */}
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="bg-[#f5f7fa]">
                {["商家","商品","总金额(元)","配送方式","结算渠道","报价有效时间","状态","操作"].map(h => (
                  <th key={h} className="px-3 py-2.5 text-left font-semibold border border-[#e8edf5] text-[#444]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => {
                const s = STATUS_MAP[row.status]
                return (
                  <tr key={i} className="border-b border-[#e8edf5] hover:bg-[#fafbfd]">
                    <td className="px-3 py-3 border border-[#e8edf5]" colSpan={8}>
                      <div className="text-[12px] text-[#999] mb-2">
                        报价编号：{row.quoteNo}&nbsp;&nbsp;&nbsp;报价时间：{row.quoteTime}
                      </div>
                      <table className="w-full">
                        <tbody>
                          <tr>
                            <td className="w-[180px] align-top py-1">
                              <div className="text-[13px] font-medium text-[#1a1a2e]">{row.shop}</div>
                              <div className="text-[12px] text-[#6b7c93] mt-0.5">{row.company}</div>
                            </td>
                            <td className="align-top py-1 px-3">
                              <span className="text-[13px] text-[#555]">{row.products}</span>
                            </td>
                            <td className="w-[100px] align-top py-1 text-right">
                              <span className="text-[13px] font-medium">{row.total.toFixed(2)}</span>
                            </td>
                            <td className="w-[100px] align-top py-1 px-3 text-center">
                              <span className="text-[13px] text-[#555]">{row.delivery}</span>
                            </td>
                            <td className="w-[120px] align-top py-1 px-3 text-center">
                              <span className="text-[13px] text-[#555]">{row.settlement}</span>
                            </td>
                            <td className="w-[280px] align-top py-1 px-3">
                              <span className="text-[12px] text-[#6b7c93]">{row.validStart}至{row.validEnd}</span>
                            </td>
                            <td className="w-[100px] align-top py-1 px-3">
                              <div className="flex flex-col gap-0.5">
                                <span className="px-2 py-0.5 rounded text-[11px] font-medium w-fit" style={{ color: s.color, background: s.bg }}>
                                  {s.label}{row.status === "ordered" && row.orderedCount > 0 ? `(${row.orderedCount}次)` : ""}
                                </span>
                                {row.status === "ordered" && row.orderedCount > 0 && (
                                  <button className="text-[12px] text-[#1a5fa8] hover:underline text-left">查看订单</button>
                                )}
                              </div>
                            </td>
                            <td className="w-[130px] align-top py-1 px-3">
                              <div className="flex flex-col gap-1">
                                <Link href="#" className="flex items-center gap-1 text-[12px] text-[#1a5fa8] hover:underline text-left">
                                  <Eye className="w-3.5 h-3.5" />查看详情
                                </Link>
                                {/* 采购需求报价：已报价可下单 */}
                                {tab === "caigou" && row.status === "quoted" && (
                                  <Link href="/merchant/xunbaojia/xiadan" className="flex items-center gap-1 text-[12px] text-[#16a34a] hover:underline text-left">
                                    <ShoppingCart className="w-3.5 h-3.5" />下单
                                  </Link>
                                )}
                                {/* 供应信息报价：未下单可修改报价 / 取消报价 */}
                                {tab === "gongying" && row.status === "notordered" && (
                                  <>
                                    <button className="flex items-center gap-1 text-[12px] text-[#e8831a] hover:underline text-left">
                                      <Pencil className="w-3.5 h-3.5" />修改报价
                                    </button>
                                    <button onClick={() => setCancelNo(row.quoteNo)} className="flex items-center gap-1 text-[12px] text-[#dc2626] hover:underline text-left">
                                      <XCircle className="w-3.5 h-3.5" />取消报价
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* 分页 */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#dde3ec]">
            <span className="text-[13px] text-[#999]">共 {filtered.length} 条记录</span>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded text-[13px] bg-[#1a5fa8] text-white">1</button>
            </div>
          </div>
        </div>
      </div>

      {/* 取消报价确认弹窗 */}
      {cancelNo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setCancelNo(null)}>
          <div className="bg-white rounded-lg w-[420px] shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
              <h3 className="text-[15px] font-bold text-[#1a1a2e]">取消报价</h3>
              <button onClick={() => setCancelNo(null)}><X className="w-5 h-5 text-[#999]" /></button>
            </div>
            <div className="px-6 py-6 text-[13px] text-[#555] leading-relaxed">
              确认取消报价单 <b className="text-[#1a1a2e]">{cancelNo}</b> 吗？取消后该报价将失效，买方将无法基于此报价下单。
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#e8edf5]">
              <button onClick={() => setCancelNo(null)} className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">再想想</button>
              <button onClick={() => setCancelNo(null)} className="px-6 py-2 bg-[#dc2626] text-white text-[13px] font-semibold rounded hover:bg-[#b91c1c]">确认取消报价</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
