"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Plus, Trash2, ChevronDown, X, Check, Info } from "lucide-react"

type ServiceItem = {
  id: number
  product: string
  spec: string
  qty: string
  unitPrice: string
  note: string
}

const existingServices: ServiceItem[] = [
  { id: 1, product: "初加工包装", spec: "标准箱", qty: "1000", unitPrice: "2.5元/箱", note: "需要定制包装" },
  { id: 2, product: "清洗分拣", spec: "按重量", qty: "500kg", unitPrice: "0.8元/kg", note: "" },
  { id: 3, product: "冷链仓储", spec: "托盘位/天", qty: "30", unitPrice: "5元/托盘/天", note: "需要保温" },
  { id: 4, product: "物流配送", spec: "车次", qty: "2", unitPrice: "800元/次", note: "配送到广州市区" },
]

export default function YuyuePage() {
  const [services, setServices] = useState(existingServices)
  const [selectedProduct, setSelectedProduct] = useState("初加工包装")
  const [selectedSpec, setSelectedSpec] = useState("")
  const [qty, setQty] = useState("")
  const [note, setNote] = useState("")

  const deleteService = (id: number) => {
    setServices(services.filter((s) => s.id !== id))
  }

  return (
    <AdminLayout>
      <div className="max-w-[900px]">
        <div className="mb-6">
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">预约管理</h1>
          <p className="text-[13px] text-[#6b7c93] mt-1">管理用户的全产业链服务预约请求，审核并安排服务</p>
        </div>

        {/* 预约表单 */}
        <div className="bg-white rounded-lg border border-[#dde3ec] overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-[#dde3ec] bg-[#f5f7fa]">
            <h2 className="text-[15px] font-bold text-[#1a1a2e]">我要预约</h2>
            <p className="text-[12px] text-[#6b7c93] mt-0.5">请选择供应商可提供的服务，并填写对应的预约信息</p>
          </div>

          <div className="p-6">
            {/* Provider info */}
            <div className="flex items-center gap-2 mb-5 text-[13px]">
              <span className="text-[#444]">服务商：四会市天润仓储有限公司</span>
            </div>

            {/* Info hint */}
            <div className="flex items-center gap-2 mb-5 p-3 bg-[#e8f4fd] border border-[#b3d4f5] rounded text-[13px] text-[#1a5fa8]">
              <Info className="w-4 h-4 shrink-0" />
              <span>原料可来自平台商品订单，也可自行送达加工厂</span>
            </div>

            {/* 选择服务 */}
            <div className="mb-6">
              <h3 className="text-[14px] font-semibold text-[#1a5fa8] border-l-2 border-[#1a5fa8] pl-2 mb-4">| 选择服务</h3>
              <div className="border border-[#dde3ec] rounded-lg p-4">
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                      <span className="text-red-500 mr-1">*</span>商品名称
                    </label>
                    <div className="relative">
                      <select
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8] bg-white appearance-none"
                      >
                        <option>初加工包装</option>
                        <option>清洗分拣</option>
                        <option>冷链仓储</option>
                        <option>物流配送</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999] pointer-events-none" />
                    </div>
                    {/* Dropdown options preview */}
                    <div className="mt-1 border border-[#dde3ec] rounded bg-white shadow-sm overflow-hidden">
                      {["初加工包装", "清洗分拣", "xx"].map((opt) => (
                        <div
                          key={opt}
                          className={`flex items-center justify-between px-3 py-2 text-[13px] cursor-pointer hover:bg-[#f5f7fa] ${
                            selectedProduct === opt ? "bg-[#e8f4fd] text-[#1a5fa8]" : ""
                          }`}
                          onClick={() => setSelectedProduct(opt)}
                        >
                          <span>{opt}</span>
                          {selectedProduct === opt && <Check className="w-3.5 h-3.5 text-[#1a5fa8]" />}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                      <span className="text-red-500 mr-1">*</span>规格
                    </label>
                    <div className="relative">
                      <select
                        value={selectedSpec}
                        onChange={(e) => setSelectedSpec(e.target.value)}
                        className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8] bg-white appearance-none"
                      >
                        <option value="">请选择/搜索</option>
                        <option>标准箱</option>
                        <option>按重量</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999] pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                      <span className="text-red-500 mr-1">*</span>计划采购量
                    </label>
                    <input
                      type="text"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      placeholder="请输入数量"
                      className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#333] mb-1.5">单价（元）</label>
                    <div className="h-9 flex items-center text-[#999] text-[13px]">——</div>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                    <span className="text-red-500 mr-1">*</span>备注说明
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="如特殊说明"
                    className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]"
                  />
                </div>
                <div className="flex justify-center">
                  <button className="px-8 py-2 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors">
                    保存
                  </button>
                </div>
              </div>
            </div>

            {/* 已添加服务 */}
            <div>
              <h3 className="text-[14px] font-semibold text-[#1a5fa8] border-l-2 border-[#1a5fa8] pl-2 mb-4">
                | 已添加的服务
                <span className="ml-2 text-[13px] font-normal text-[#6b7c93]">（共 {services.length} 种）</span>
              </h3>
              <table className="w-full text-[13px] border border-[#dde3ec] rounded overflow-hidden">
                <thead className="bg-[#f5f7fa]">
                  <tr>
                    {["商品名称", "规格", "单价（元）", "计划采购量", "备注说明", "操作"].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left font-medium text-[#444] border-b border-[#dde3ec]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {services.map((svc) => (
                    <tr key={svc.id} className="border-b border-[#dde3ec] last:border-0 hover:bg-[#fafbfc]">
                      <td className="px-4 py-3 font-medium">{svc.product}</td>
                      <td className="px-4 py-3 text-[#6b7c93]">{svc.spec}</td>
                      <td className="px-4 py-3 text-[#e8831a] font-medium">{svc.unitPrice}</td>
                      <td className="px-4 py-3">{svc.qty}</td>
                      <td className="px-4 py-3 text-[#6b7c93]">{svc.note || "——"}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-3">
                          <button className="text-[#1a5fa8] hover:underline text-[12px]">编辑</button>
                          <button
                            onClick={() => deleteService(svc.id)}
                            className="text-red-500 hover:underline text-[12px]"
                          >
                            删除
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination hint */}
              <div className="mt-3 text-right text-[12px] text-[#999]">
                共 658 项
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center gap-4">
          <button className="px-10 py-2.5 border border-[#dde3ec] text-[#444] text-[14px] rounded hover:bg-[#f5f7fa] transition-colors">
            取消
          </button>
          <button className="px-12 py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors">
            提交预约
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
