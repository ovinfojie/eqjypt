"use client"

import { useState } from "react"
import { Search, X, Eye, Pencil, ShoppingCart, XCircle } from "lucide-react"

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

// 状态 Tab 随主 Tab 切换
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

// 我收到的采购需求报价（我作为供应方收到采购方发来的需求，我来报价）
const CAIGOU_ROWS = [
  {
    quoteNo: "q793247234897", quoteTime: "2026-06-01 20:42:12",
    shop: "字鹏1", company: "字鹏互联网科技(上海)有限公司",
    products: "韭菜、杀虫、测试等4种商品",
    total: 255.00, delivery: "买家自提", settlement: "建行龙存管",
    validStart: "2026-06-01 20:42:12", validEnd: "2026-06-25 23:59:59",
    status: "ordered" as Status, orderedCount: 3,
  },
  {
    quoteNo: "q793247234898", quoteTime: "2026-05-21 15:45:41",
    shop: "字鹏1", company: "字鹏互联网科技(上海)有限公司",
    products: "桂味荔枝",
    total: 34.00, delivery: "卖家配送", settlement: "建行龙存管",
    validStart: "2026-05-21 15:45:41", validEnd: "2026-05-22 23:59:59",
    status: "pending" as Status, orderedCount: 0,
  },
  {
    quoteNo: "q793247234899", quoteTime: "2026-05-18 10:05:16",
    shop: "字鹏1", company: "字鹏互联网科技(上海)有限公司",
    products: "韭菜、杀虫、测试等4种商品",
    total: 222.00, delivery: "卖家配送", settlement: "建行龙存管",
    validStart: "2026-05-18 10:05:16", validEnd: "2026-05-19 23:59:59",
    status: "quoted" as Status, orderedCount: 0,
  },
  {
    quoteNo: "q793247234900", quoteTime: "2026-05-15 21:19:11",
    shop: "饶平种植专业合作社", company: "矩阵信息技术(上海)有限公司",
    products: "茂名妃子笑",
    total: 120.00, delivery: "卖家配送", settlement: "建行龙存管",
    validStart: "2026-05-15 21:19:11", validEnd: "2026-05-30 23:59:59",
    status: "expired" as Status, orderedCount: 0,
  },
  {
    quoteNo: "q793247234901", quoteTime: "2026-05-10 09:11:20",
    shop: "饶平种植专业合作社", company: "矩阵信息技术(上海)有限公司",
    products: "沙糖桔",
    total: 88.00, delivery: "卖家配送", settlement: "工行安心付",
    validStart: "2026-05-10 09:11:20", validEnd: "2026-05-12 23:59:59",
    status: "closed" as Status, orderedCount: 0,
  },
]

// 我收到的供应信息报价（我作为需求方收到供应方提交的报价，我来提交订单）
const GONGYING_ROWS = [
  {
    quoteNo: "q893247234801", quoteTime: "2026-06-01 20:42:12",
    shop: "字鹏1", company: "字鹏互联网科技(上海)有限公司",
    products: "韭菜、杀虫、测试等4种商品",
    total: 255.00, delivery: "买家自提", settlement: "建行龙存管",
    validStart: "2026-06-01 20:42:12", validEnd: "2026-06-25 23:59:59",
    status: "ordered" as Status, orderedCount: 2,
  },
  {
    quoteNo: "q893247234802", quoteTime: "2026-05-21 15:45:41",
    shop: "饶平种植专业合作社", company: "矩阵信息技术(上海)有限公司",
    products: "怪味荔枝",
    total: 10000.00, delivery: "卖家配送", settlement: "建行龙存管",
    validStart: "2026-05-21 15:45:41", validEnd: "2026-05-22 23:59:59",
    status: "notordered" as Status, orderedCount: 0,
  },
  {
    quoteNo: "q893247234803", quoteTime: "2026-05-16 11:20:08",
    shop: "饶平种植专业合作社", company: "矩阵信息技术(上海)有限公司",
    products: "茂名妃子笑",
    total: 120.00, delivery: "卖家配送", settlement: "建行龙存管",
    validStart: "2026-05-16 11:20:08", validEnd: "2026-05-28 23:59:59",
    status: "closed" as Status, orderedCount: 0,
  },
  {
    quoteNo: "q893247234804", quoteTime: "2026-05-08 14:33:50",
    shop: "饶平种植专业合作社", company: "矩阵信息技术(上海)有限公司",
    products: "沙糖桔",
    total: 88.00, delivery: "卖家配送", settlement: "工行安心付",
    validStart: "2026-05-08 14:33:50", validEnd: "2026-05-10 23:59:59",
    status: "expired" as Status, orderedCount: 0,
  },
]

/* ─── 下采购单弹窗 ─── */
interface OrderRow { product: string; qty: number; quotePrice: number; lastPrice: number }
function PlaceOrderModal({ shop, onClose }: { shop: string; onClose: () => void }) {
  const [rows, setRows] = useState<OrderRow[]>([
    { product: "怪味荔枝", qty: 0, quotePrice: 1.00, lastPrice: 0.04 },
  ])
  const [message, setMessage] = useState("")
  const [planStart, setPlanStart] = useState("")
  const [planEnd, setPlanEnd] = useState("")
  const [contact, setContact] = useState("")
  const [phone, setPhone] = useState("")

  const subtotal = rows.reduce((s, r) => s + r.qty * r.quotePrice, 0)
  const total = subtotal

  const setQty = (i: number, v: number) => {
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, qty: Math.max(0, v) } : r))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-lg w-[780px] max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
          <h3 className="text-[16px] font-bold text-[#1a1a2e]">提交订单</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-[#999]" /></button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* 商品信息 */}
          <div>
            <div className="text-[14px] font-semibold text-[#1a1a2e] mb-3">商品信息</div>
            <div className="border border-[#e8edf5] rounded overflow-hidden">
              <div className="bg-[#f5f7fa] px-4 py-2 text-[13px] font-medium text-[#555]">
                店铺：{shop}
              </div>
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-[#fafbfc] border-b border-[#e8edf5]">
                    <th className="px-4 py-2 w-8"></th>
                    <th className="px-4 py-2 text-left font-medium text-[#555]">商品名称</th>
                    <th className="px-4 py-2 text-center font-medium text-[#555]">采购数量(单位)</th>
                    <th className="px-4 py-2 text-right font-medium text-[#555]">报价单价</th>
                    <th className="px-4 py-2 text-right font-medium text-[#555]">上一次报价</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className="border-b border-[#e8edf5] last:border-0">
                      <td className="px-4 py-3 text-center">
                        <div className="w-5 h-5 rounded-full bg-[#1a5fa8] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#1a1a2e] font-medium">{r.product}</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={r.qty || ""}
                          onChange={e => setQty(i, Number(e.target.value))}
                          placeholder="请输入单价"
                          className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] text-center focus:outline-none focus:border-[#1a5fa8]"
                        />
                      </td>
                      <td className="px-4 py-3 text-right text-[#1a5fa8] font-medium">{r.quotePrice.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right text-[#6b7c93]">{r.lastPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* 小计 */}
              <div className="flex justify-end items-center gap-6 px-4 py-2 bg-[#fafbfc] border-t border-[#e8edf5] text-[13px]">
                <span className="text-[#666]">商品总金额：<span className="text-[#e04040] font-semibold">¥ {subtotal.toFixed(2)}</span></span>
                <span className="text-[#666]">运费合计: 0.00元</span>
                <span className="text-[#666]">碰智费辅优惠: 0.00元</span>
                <span className="text-[#666]">平粮即蕉台优惠: 0.00元</span>
                <span className="text-[#666] font-medium">合计：<span className="text-[#e04040] font-semibold">¥ {total.toFixed(2)}</span></span>
              </div>
            </div>
          </div>

          {/* 给商家留言 + 收款计划 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[13px] text-[#555] block mb-1.5">给商家留言：</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="选填，最多200字"
                maxLength={200}
                rows={4}
                className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] resize-none focus:outline-none focus:border-[#1a5fa8]"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <label className="text-[13px] font-medium text-[#e04040] mb-1.5 block">* 收款计划：</label>
                <div className="flex items-center gap-2">
                  <input type="text" value={planStart} onChange={e => setPlanStart(e.target.value)} placeholder="选择开始日期" className="flex-1 h-8 border border-[#dde3ec] rounded px-3 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                  <span className="text-[#999]">至</span>
                  <input type="text" value={planEnd} onChange={e => setPlanEnd(e.target.value)} placeholder="选择结束日期" className="flex-1 h-8 border border-[#dde3ec] rounded px-3 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
              </div>
              <div className="text-right text-[13px] text-[#6b7c93] space-y-0.5">
                <div>本次商品总金额 {total.toFixed(2)} 元，需支付预付款 0%，应付货款 0.00</div>
                <div>元+应付运费0.00元=<span className="text-[#e04040] font-semibold">0.00元</span></div>
              </div>
            </div>
          </div>

          {/* 自提点信息 */}
          <div>
            <div className="text-[13px] font-medium text-[#555] mb-1.5">自提点信息</div>
            <div className="border border-[#e8edf5] rounded px-4 py-3 text-[13px] text-[#555] bg-[#fafbfc]">
              山东省 济南市 市中区山东省济南市市中区某街道火灵邪神店联系人：饶平种植专业合作社 电话：18790363303
            </div>
          </div>

          {/* 总计 */}
          <div className="border border-[#f5d5d5] rounded bg-[#fff8f8]">
            <div className="px-4 py-3 border-b border-[#f5d5d5]">
              <span className="text-[13px] font-semibold text-[#1a1a2e]">总计</span>
              <span className="text-[13px] text-[#6b7c93] ml-3">商品种类：1 种&nbsp;&nbsp;数量总计：<span className="text-[#e04040] font-semibold">{rows.reduce((s, r) => s + r.qty, 0)} 件</span></span>
            </div>
            <div className="px-4 py-3 flex justify-end">
              <div className="text-[13px] space-y-1 text-right">
                <div className="text-[#555]">商品总金额：{total.toFixed(2)} 元</div>
                <div className="text-[#555]">商家优惠共计：0.00 元</div>
                <div className="text-[#555]">平台优惠：0.00 元</div>
                <div className="text-[#555]">运费总计：0.00 元</div>
                <div className="text-[#555]">订单总金额：0.00 元</div>
                <div className="text-[#e04040] font-semibold">本次应付总额：0.00 元</div>
              </div>
            </div>
          </div>

          {/* 联系人 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 flex-1">
              <label className="text-[13px] text-[#555] whitespace-nowrap">买方联系人姓名：</label>
              <input type="text" value={contact} onChange={e => setContact(e.target.value)} placeholder="请输入联系人姓名" className="flex-1 h-8 border border-[#dde3ec] rounded px-3 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
            </div>
            <div className="flex items-center gap-2 flex-1">
              <label className="text-[13px] text-[#555] whitespace-nowrap">联系人电话：</label>
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="请输入联系人电话" className="flex-1 h-8 border border-[#dde3ec] rounded px-3 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#e8edf5] bg-[#fafbfc]">
          <div className="text-[14px]">应付总金额：<span className="text-[#e04040] font-bold text-[18px]">¥{total.toFixed(2)}</span></div>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">取消</button>
            <button className="px-6 py-2 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded hover:bg-[#0d4a8a]">确认提交订单</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ChanxiaoXunbaojiaShoudaodePage() {
  const [tab, setTab] = useState<Tab>("caigou")
  const [statusTab, setStatusTab] = useState<Status>("all")
  const [orderModal, setOrderModal] = useState<{ open: boolean; shop: string }>({ open: false, shop: "" })
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
        <span className="text-[#333] font-medium">我收到的</span>
      </div>

      <div className="bg-white rounded-lg border border-[#dde3ec] overflow-hidden">
        {/* 主Tab */}
        <div className="flex border-b border-[#dde3ec]">
          {([["caigou", "采购需求报价"], ["gongying", "供应信息报价"]] as [Tab, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setTab(key as Tab); setStatusTab("all") }}
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
                                <button className="flex items-center gap-1 text-[12px] text-[#1a5fa8] hover:underline text-left">
                                  <Eye className="w-3.5 h-3.5" />查看详情
                                </button>
                                {/* 采购需求报价：待报价可去报价；已报价可修改价格/取消报价 */}
                                {tab === "caigou" && row.status === "pending" && (
                                  <button className="flex items-center gap-1 text-[12px] text-[#e8831a] hover:underline text-left">
                                    <Pencil className="w-3.5 h-3.5" />去报价
                                  </button>
                                )}
                                {tab === "caigou" && row.status === "quoted" && (
                                  <>
                                    <button className="flex items-center gap-1 text-[12px] text-[#e8831a] hover:underline text-left">
                                      <Pencil className="w-3.5 h-3.5" />修改价格
                                    </button>
                                    <button onClick={() => setCancelNo(row.quoteNo)} className="flex items-center gap-1 text-[12px] text-[#dc2626] hover:underline text-left">
                                      <XCircle className="w-3.5 h-3.5" />取消报价
                                    </button>
                                  </>
                                )}
                                {/* 供应信息报价：未下单可提交订单 */}
                                {tab === "gongying" && row.status === "notordered" && (
                                  <button onClick={() => setOrderModal({ open: true, shop: row.shop })} className="flex items-center gap-1 text-[12px] text-[#16a34a] hover:underline text-left">
                                    <ShoppingCart className="w-3.5 h-3.5" />提交订单
                                  </button>
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

      {orderModal.open && (
        <PlaceOrderModal shop={orderModal.shop} onClose={() => setOrderModal({ open: false, shop: "" })} />
      )}

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
