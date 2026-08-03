"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Plus, Trash2 } from "lucide-react"

type PriceMode = "ladder" | "oneprice"

interface LadderRow { minQty: string; maxQty: string; price: string }

export default function FabuJicaiPage() {
  const [priceMode, setPriceMode] = useState<PriceMode>("ladder")
  const [ladderRows, setLadderRows] = useState<LadderRow[]>([
    { minQty: "1", maxQty: "10", price: "" },
    { minQty: "10", maxQty: "50", price: "" },
  ])

  const addRow = () => setLadderRows(r => [...r, { minQty: "", maxQty: "", price: "" }])
  const removeRow = (i: number) => setLadderRows(r => r.filter((_, idx) => idx !== i))
  const updateRow = (i: number, key: keyof LadderRow, val: string) =>
    setLadderRows(r => r.map((row, idx) => idx === i ? { ...row, [key]: val } : row))

  return (
    <div className="max-w-[780px] mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/merchant/jicai/huodong-list" className="flex items-center gap-1.5 text-[13px] text-[#6b7c93] hover:text-[#1a5fa8] transition-colors">
          <ChevronLeft className="w-4 h-4" /> 返回列表
        </Link>
        <h1 className="text-[20px] font-bold text-[#1a1a2e]">发布集采活动</h1>
      </div>

      <div className="bg-white rounded-xl border border-[#e8edf5] divide-y divide-[#f0f4f8]">
        {/* 基本信息 */}
        <section className="p-6">
          <h2 className="text-[14px] font-semibold text-[#1a1a2e] mb-4">基本信息</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <label className="text-[13px] text-[#6b7c93] w-24 text-right pt-2 shrink-0">活动标题 <span className="text-red-500">*</span></label>
              <input type="text" placeholder="请输入集采活动标题，最多50字" maxLength={50}
                className="flex-1 border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] transition-colors" />
            </div>
            <div className="flex items-start gap-4">
              <label className="text-[13px] text-[#6b7c93] w-24 text-right pt-2 shrink-0">商品品类 <span className="text-red-500">*</span></label>
              <div className="flex gap-3 flex-1">
                <select className="border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] w-36">
                  <option>粮食</option>
                  <option>蔬菜</option>
                  <option>水果</option>
                  <option>水产</option>
                  <option>肉禽蛋</option>
                </select>
                <input type="text" placeholder="具体商品名称" className="flex-1 border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              </div>
            </div>
            <div className="flex items-start gap-4">
              <label className="text-[13px] text-[#6b7c93] w-24 text-right pt-2 shrink-0">规格说明</label>
              <input type="text" placeholder="如：统货 / 25kg/袋 / 一级品" className="flex-1 border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
            </div>
            <div className="flex items-start gap-4">
              <label className="text-[13px] text-[#6b7c93] w-24 text-right pt-2 shrink-0">集采总量 <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2">
                <input type="number" placeholder="0" className="w-32 border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                <select className="border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]">
                  <option>吨</option><option>千克</option><option>斤</option><option>箱</option><option>袋</option>
                </select>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <label className="text-[13px] text-[#6b7c93] w-24 text-right pt-2 shrink-0">活动时间 <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-3">
                <input type="date" className="border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                <span className="text-[#6b7c93]">至</span>
                <input type="date" className="border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              </div>
            </div>
            <div className="flex items-start gap-4">
              <label className="text-[13px] text-[#6b7c93] w-24 text-right pt-2 shrink-0">配送方式 <span className="text-red-500">*</span></label>
              <div className="flex gap-3 flex-wrap">
                {["卖家配送", "平台冷链专送", "买家自提"].map(m => (
                  <label key={m} className="flex items-center gap-1.5 text-[13px] text-[#555] cursor-pointer">
                    <input type="checkbox" className="rounded" /> {m}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 定价方式 */}
        <section className="p-6">
          <h2 className="text-[14px] font-semibold text-[#1a1a2e] mb-4">定价方式</h2>
          <div className="flex gap-4 mb-4">
            {([["ladder", "阶梯定价"], ["oneprice", "一客一价"]] as [PriceMode, string][]).map(([k, label]) => (
              <button key={k} onClick={() => setPriceMode(k)}
                className={`px-5 py-2 rounded-lg border text-[13px] font-medium transition-colors ${priceMode === k ? "border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8]" : "border-[#e8edf5] text-[#555] hover:border-[#1a5fa8]"}`}>
                {label}
              </button>
            ))}
          </div>

          {priceMode === "ladder" ? (
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-3 text-[12px] text-[#6b7c93] px-1">
                <span>最小数量</span><span>最大数量</span><span>单价（元）</span><span></span>
              </div>
              {ladderRows.map((row, i) => (
                <div key={i} className="grid grid-cols-4 gap-3 items-center">
                  <input type="number" value={row.minQty} onChange={e => updateRow(i, "minQty", e.target.value)}
                    className="border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="最小" />
                  <input type="number" value={row.maxQty} onChange={e => updateRow(i, "maxQty", e.target.value)}
                    className="border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="最大" />
                  <input type="number" value={row.price} onChange={e => updateRow(i, "price", e.target.value)}
                    className="border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="0.00" />
                  <button onClick={() => removeRow(i)} disabled={ladderRows.length <= 1}
                    className="flex items-center justify-center w-8 h-8 rounded-lg border border-[#e8edf5] text-[#6b7c93] hover:border-red-300 hover:text-red-500 disabled:opacity-30 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button onClick={addRow} className="flex items-center gap-1.5 text-[13px] text-[#1a5fa8] hover:underline mt-1">
                <Plus className="w-3.5 h-3.5" /> 添加阶梯
              </button>
            </div>
          ) : (
            <p className="text-[13px] text-[#6b7c93]">一客一价：系统将在买家报名后，由您针对每位买家单独报价。</p>
          )}
        </section>

        {/* 支付与备注 */}
        <section className="p-6">
          <h2 className="text-[14px] font-semibold text-[#1a1a2e] mb-4">支付与备注</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <label className="text-[13px] text-[#6b7c93] w-24 text-right pt-2 shrink-0">支付方式</label>
              <div className="flex gap-3 flex-wrap">
                {["平台担保付款", "银行转账", "月结授信"].map(m => (
                  <label key={m} className="flex items-center gap-1.5 text-[13px] text-[#555] cursor-pointer">
                    <input type="checkbox" className="rounded" defaultChecked={m === "平台担保付款"} /> {m}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <label className="text-[13px] text-[#6b7c93] w-24 text-right pt-2 shrink-0">活动说明</label>
              <textarea rows={3} placeholder="填写活动详情、品质说明、注意事项等..."
                className="flex-1 border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none" />
            </div>
          </div>
        </section>
      </div>

      <div className="flex justify-end gap-3">
        <Link href="/merchant/jicai/huodong-list" className="px-6 py-2.5 border border-[#e8edf5] text-[13px] text-[#555] rounded-lg hover:bg-[#f5f7fa] transition-colors">
          取消
        </Link>
        <button className="px-6 py-2.5 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded-lg hover:bg-[#e8f4fd] transition-colors">
          保存草稿
        </button>
        <button className="px-6 py-2.5 bg-[#1a5fa8] text-white text-[13px] rounded-lg hover:bg-[#0d4a8a] transition-colors">
          发布集采
        </button>
      </div>
    </div>
  )
}
