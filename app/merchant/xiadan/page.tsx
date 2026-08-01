"use client"

import { useState } from "react"
import { MerchantLayout } from "@/components/merchant/merchant-layout"
import { MessageCircle, Minus, Plus, ChevronRight } from "lucide-react"

const steps = [
  { num: "01", label: "确认订单信息" },
  { num: "02", label: "支付预付款" },
  { num: "03", label: "完成下单" },
]

const skuRows = [
  { spec: "5kg / 袋", unitPrice: 88, qty: 1000, unit: "袋", discount: 0, platformDiscount: 0, subtotal: 88000 },
  { spec: "10kg / 袋", unitPrice: 160, qty: 1000, unit: "袋", discount: 0, platformDiscount: 0, subtotal: 160000 },
]

export default function XiadanPage() {
  const [rows, setRows] = useState(skuRows)
  const [note, setNote] = useState("")

  const totalQty = rows.reduce((s, r) => s + r.qty, 0)
  const totalAmount = rows.reduce((s, r) => s + r.unitPrice * r.qty, 0)
  const prepayRatio = 0.1
  const prepayAmount = totalAmount * prepayRatio

  const updateQty = (idx: number, val: number) => {
    setRows(rows.map((r, i) => i === idx ? { ...r, qty: Math.max(1, val), subtotal: r.unitPrice * Math.max(1, val) } : r))
  }

  return (
    <MerchantLayout>
      <div className="max-w-[1100px]">
        <div className="mb-6">
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">提交订单</h1>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-8 bg-white rounded-lg border border-[#dde3ec] px-8 py-4">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold ${
                  i === 0 ? "bg-[#1a5fa8] text-white" : "bg-[#f0f4f8] text-[#999]"
                }`}>
                  {step.num}
                </div>
                <span className={`text-[13px] font-medium ${i === 0 ? "text-[#1a5fa8]" : "text-[#999]"}`}>
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-px bg-[#dde3ec] mx-4" />
              )}
            </div>
          ))}
          <div className="ml-auto text-right">
            <div className="text-[11px] text-[#999]">step 01</div>
            <div className="text-[12px] text-[#444] font-medium">确认订单信息</div>
          </div>
        </div>

        {/* Order card */}
        <div className="bg-white rounded-lg border border-[#dde3ec] overflow-hidden mb-4">
          {/* Buyer / Seller bar */}
          <div className="flex items-center gap-6 px-6 py-3 bg-[#f5f7fa] border-b border-[#dde3ec] text-[13px]">
            <span className="text-[#444]">买家：盒马超市采购部 <span className="text-[#999]">no.122438</span></span>
            <span className="text-[#444]">商家：天润粮油销售部 <span className="text-[#999]">no.122434</span></span>
            <button className="flex items-center gap-1.5 px-3 py-1 border border-[#1a5fa8] text-[#1a5fa8] rounded text-[12px] hover:bg-[#e8f4fd] transition-colors ml-2">
              <MessageCircle className="w-3.5 h-3.5" />
              联系商家
            </button>
          </div>

          <div className="p-6">
            {/* Product info */}
            <div className="flex items-start gap-4 mb-5 pb-5 border-b border-[#dde3ec]">
              <div className="w-16 h-16 rounded overflow-hidden border border-[#dde3ec] shrink-0 flex items-center justify-center bg-[#f0f4f8]">
                <span className="text-[10px] text-[#ccc]">商品图</span>
              </div>
              <div className="flex-1">
                <div className="text-[15px] font-semibold text-[#1a1a2e] mb-2">广东特色海丰油占米</div>
                <div className="grid grid-cols-3 gap-x-8 gap-y-1 text-[13px] text-[#6b7c93]">
                  <span>配送方式：卖家配送</span>
                  <span>自提点：广州市荔湾区某某街道xx路xx号 王先生 1788900****（下单后显示联系电话）</span>
                  <span></span>
                  <span>结算渠道：工行安心付</span>
                  <span>结算方式：预付款（10%）</span>
                  <span></span>
                  <span>交易模式：担保交易</span>
                </div>
              </div>
            </div>

            {/* SKU table */}
            <div className="mb-5">
              <table className="w-full text-[13px] border border-[#dde3ec] rounded overflow-hidden">
                <thead className="bg-[#f5f7fa]">
                  <tr>
                    {["规格", "单价(元)", "下单数量", "", "商家优惠(元)", "平台优惠(元)", "预估总价(元)", "预估总计"].map((h, i) => (
                      <th key={i} className="px-4 py-2.5 text-left font-medium text-[#444] border-b border-[#dde3ec]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} className="border-b border-[#dde3ec] last:border-0">
                      <td className="px-4 py-3">{row.spec}</td>
                      <td className="px-4 py-3 font-medium">{row.unitPrice}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQty(i, row.qty - 1)}
                            className="w-6 h-6 border border-[#dde3ec] rounded flex items-center justify-center hover:bg-[#f0f4f8]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <input
                            type="number"
                            value={row.qty}
                            onChange={(e) => updateQty(i, Number(e.target.value))}
                            className="w-16 h-6 border border-[#dde3ec] rounded text-center text-[13px] outline-none focus:border-[#1a5fa8]"
                          />
                          <button
                            onClick={() => updateQty(i, row.qty + 1)}
                            className="w-6 h-6 border border-[#dde3ec] rounded flex items-center justify-center hover:bg-[#f0f4f8]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#6b7c93]">{row.unit}</td>
                      <td className="px-4 py-3 text-[#6b7c93]">{row.discount}</td>
                      <td className="px-4 py-3 text-[#6b7c93]">{row.platformDiscount}</td>
                      <td className="px-4 py-3 font-medium">{(row.unitPrice * row.qty).toFixed(2)}</td>
                      <td className="px-4 py-3"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Other order fields */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-5">
              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                  <span className="text-red-500 mr-1">*</span>计划收货时间
                </label>
                <input
                  type="text"
                  placeholder="开始时间 - 结束时间"
                  className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                  <span className="text-red-500 mr-1">*</span>收货信息
                </label>
                <div className="flex items-center gap-2">
                  <select className="flex-1 h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8] bg-white">
                    <option value="">请选择</option>
                  </select>
                  <button className="text-[13px] text-[#1a5fa8] hover:underline shrink-0">编辑</button>
                  <button className="text-[13px] text-[#1a5fa8] hover:underline shrink-0">|</button>
                  <button className="text-[13px] text-[#1a5fa8] hover:underline shrink-0">新增</button>
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                  <span className="text-red-500 mr-1">*</span>联系人姓名
                </label>
                <input
                  type="text"
                  placeholder="请输入"
                  className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                  <span className="text-red-500 mr-1">*</span>联系人电话
                </label>
                <input
                  type="text"
                  placeholder="请输入手机号码"
                  className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">给商家留言</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="请输入"
                rows={3}
                className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] outline-none focus:border-[#1a5fa8] resize-none"
              />
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-[#fffbf5] border border-[#f0d9b5] rounded-lg p-5 mb-4">
          <div className="text-[13px] text-[#6b7c93] mb-1">
            总计：商品种类：1种 &nbsp;&nbsp; 数量总计：{totalQty} 件
          </div>
          <div className="flex flex-col items-end gap-1 text-[13px]">
            <div className="flex gap-6">
              <span className="text-[#6b7c93]">商品总金额</span>
              <span className="text-[#1a1a2e] font-medium w-32 text-right">¥{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex gap-6">
              <span className="text-[#6b7c93]">商家优惠</span>
              <span className="text-[#1a1a2e] w-32 text-right">¥0.00</span>
            </div>
            <div className="flex gap-6">
              <span className="text-[#6b7c93]">平台优惠</span>
              <span className="text-[#1a1a2e] w-32 text-right">¥0.00</span>
            </div>
            <div className="flex gap-6">
              <span className="text-[#6b7c93]">运费</span>
              <span className="text-[#1a1a2e] w-32 text-right">¥0.00</span>
            </div>
            <div className="flex gap-6 border-t border-[#f0d9b5] pt-2 mt-1">
              <span className="text-[#6b7c93]">订单总金额</span>
              <span className="text-[#1a1a2e] font-bold w-32 text-right">¥{totalAmount.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#f0d9b5] text-[13px] text-[#6b7c93]">
            本次商品总金额 ¥{totalAmount.toFixed(2)} 元，需支付预付款10%，应付货款
            <span className="text-[#e8831a] font-bold"> ¥{prepayAmount.toFixed(2)}</span>
            {" "}+ 应付运费 ¥0.00
          </div>
        </div>

        {/* Bottom total + submit */}
        <div className="bg-white rounded-lg border border-[#dde3ec] p-5 flex items-center justify-between">
          <div className="text-[13px] text-[#6b7c93]">
            共 <span className="text-[#1a1a2e] font-bold">{rows.length}</span> 件商品，
            应付总额：
          </div>
          <div className="flex items-center gap-6">
            <div>
              <span className="text-[#6b7c93] text-[13px]">应付金额：</span>
              <span className="text-[#e8831a] text-[22px] font-bold">¥{prepayAmount.toFixed(2)}</span>
              <span className="text-[12px] text-[#999] ml-1">（预付款10%）</span>
            </div>
            <button className="px-10 py-3 bg-[#e8831a] text-white text-[15px] font-bold rounded hover:bg-[#d4751a] transition-colors">
              提交订单
            </button>
          </div>
        </div>
      </div>
    </MerchantLayout>
  )
}
