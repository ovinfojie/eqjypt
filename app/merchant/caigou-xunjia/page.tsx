"use client"

import { useState } from "react"
import { MerchantLayout } from "@/components/merchant/merchant-layout"
import { Info, Upload, X, Plus, Minus, ChevronDown } from "lucide-react"

const mockProduct = {
  image: null,
  name: "丰两优大米",
  category: "粮油类/大米类/籼米",
  spec: "25kg/袋",
  supplyQty: "2000kg",
  priceRange: "78.00~88.00元/kg",
  standard: "三等粮",
}

export default function CaigouXunjiaPage() {
  const [qty, setQty] = useState(300)
  const [deliveryMode, setDeliveryMode] = useState<"seller" | "buyer">("seller")

  return (
    <MerchantLayout>
      <div className="max-w-[900px]">
        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">发起采购询价</h1>
          <p className="text-[13px] text-[#6b7c93] mt-1">向供应商发起采购需求，填写需求信息后提交，供应商将在截止日期前报价</p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-lg border border-[#dde3ec] overflow-hidden">
          {/* Buyer / Seller info bar */}
          <div className="bg-[#f5f7fa] border-b border-[#dde3ec] px-6 py-3 flex gap-8 text-[13px] text-[#444]">
            <span>买方：盒马超市采购部 <span className="text-[#999]">(no.122438)</span></span>
            <span>商家：汕头潮阳区社村合作农业发展有限公司 <span className="text-[#999]">(no.122434)</span></span>
          </div>

          <div className="p-6">
            {/* Product table */}
            <table className="w-full text-[13px] mb-6 border border-[#dde3ec] rounded overflow-hidden">
              <thead className="bg-[#f5f7fa]">
                <tr>
                  {["商品", "平台分类", "规格", "计划供应量(单位)", "销售价区间(单位)", "收购标准", "计划采购量(单位)"].map((h) => (
                    <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#444] border-b border-[#dde3ec]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#dde3ec]">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-[#f0f4f8] border border-[#dde3ec] rounded flex items-center justify-center text-[#ccc] text-[10px]">
                        图片
                      </div>
                      <span className="font-medium">{mockProduct.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-[#6b7c93]">{mockProduct.category}</td>
                  <td className="px-3 py-3">{mockProduct.spec}</td>
                  <td className="px-3 py-3">{mockProduct.supplyQty}</td>
                  <td className="px-3 py-3">{mockProduct.priceRange}</td>
                  <td className="px-3 py-3">{mockProduct.standard}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="w-7 h-7 border border-[#dde3ec] rounded flex items-center justify-center hover:bg-[#f0f4f8] transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <input
                        type="number"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="w-16 h-7 border border-[#dde3ec] rounded text-center text-[13px] outline-none focus:border-[#1a5fa8]"
                      />
                      <button
                        onClick={() => setQty(qty + 1)}
                        className="w-7 h-7 border border-[#dde3ec] rounded flex items-center justify-center hover:bg-[#f0f4f8] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <span className="text-[#6b7c93] ml-1">kg</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Form fields */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-6">
              {/* 收货计划 */}
              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                  <span className="text-red-500 mr-1">*</span>收货计划
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="选择开始日期"
                      className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8] bg-white"
                    />
                  </div>
                  <span className="text-[#999]">至</span>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="选择结束日期"
                      className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8] bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* 报价截止日期 */}
              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                  <span className="text-red-500 mr-1">*</span>报价截止日期
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="请选择"
                    className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8] bg-white"
                  />
                </div>
              </div>

              {/* 配送方式 */}
              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                  <span className="text-red-500 mr-1">*</span>配送方式
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={deliveryMode === "seller"}
                      onChange={() => setDeliveryMode("seller")}
                      className="accent-[#1a5fa8]"
                    />
                    <span className="text-[13px]">卖家配送</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={deliveryMode === "buyer"}
                      onChange={() => setDeliveryMode("buyer")}
                      className="accent-[#1a5fa8]"
                    />
                    <span className="text-[13px]">买家自提</span>
                  </label>
                </div>
              </div>

              {/* 收货地址 */}
              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                  <span className="text-red-500 mr-1">*</span>收货地址
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <select className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8] bg-white appearance-none">
                      <option>广东省广州市越秀区大东街道菜园东路78号 陈先生 17878907890</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999] pointer-events-none" />
                  </div>
                  <button className="text-[13px] text-[#1a5fa8] hover:underline shrink-0">编辑</button>
                  <button className="text-[13px] text-[#1a5fa8] hover:underline shrink-0">新增</button>
                </div>
              </div>
            </div>

            {/* 买方联系人信息 */}
            <div className="mb-5">
              <h3 className="text-[14px] font-semibold text-[#1a5fa8] border-l-3 border-[#1a5fa8] pl-2 mb-4">
                | 买方联系人信息
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
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
            </div>

            {/* 其他信息 */}
            <div className="mb-6">
              <h3 className="text-[14px] font-semibold text-[#1a5fa8] border-l-3 border-[#1a5fa8] pl-2 mb-4">
                | 其他信息
              </h3>
              <div className="mb-4">
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">备注说明</label>
                <div className="relative">
                  <textarea
                    placeholder="请输入"
                    rows={4}
                    maxLength={500}
                    className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] outline-none focus:border-[#1a5fa8] resize-none"
                  />
                  <span className="absolute bottom-2 right-3 text-[11px] text-[#999]">0 / 500</span>
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">附件</label>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 border border-[#dde3ec] rounded text-[13px] text-[#444] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
                    <Upload className="w-4 h-4" />
                    上传附件
                  </button>
                  <span className="text-[12px] text-[#999]">支持png/jpg/pdf/zip文件等，不超过100M</span>
                </div>
                {/* Sample attachment */}
                <div className="mt-2 flex items-center justify-between px-4 py-2.5 bg-[#f5f7fa] border border-[#dde3ec] rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-red-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">PDF</span>
                    </div>
                    <span className="text-[13px] text-[#333]">附件文件.pdf</span>
                  </div>
                  <button className="text-[#999] hover:text-red-500 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center pt-2 border-t border-[#dde3ec]">
              <button className="px-12 py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors">
                确认提交
              </button>
            </div>
          </div>
        </div>
      </div>
    </MerchantLayout>
  )
}
