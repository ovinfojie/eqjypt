"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Info, Upload, X, Plus, Minus, ChevronDown, ChevronRight, Package, MapPin, Calendar, Building2, Clock, CreditCard, Truck } from "lucide-react"

const supply = {
  id: "GY20251230008",
  title: "广东优质丝苗米产地直供供应",
  company: "汕头潮阳区社村合作农业发展有限公司",
  status: "报价中",
  category: "粮油",
  publishType: "公开发布",
  description: "本公司位于广东省粮食主产区，长期种植优质丝苗米，年产能约500吨。产品符合国标GB/T1350，通过绿色食品认证，可提供完整溯源体系。",
  productName: "丰两优大米",
  spec: "25kg/袋",
  quantity: "2000kg",
  priceRange: "78.00~88.00元/kg",
  qualityStd: "三等粮",
  city: "汕头市",
  deliveryPeriod: "2026-01-01 至 2026-12-31",
  deadline: "2026-02-01",
  prepayRatio: "20%",
  tradeMode: "担保交易",
  deliveryMethod: "卖家配送",
  settlement: "建行龙存管",
  contact: "张总",
  phone: "137****5555",
  remark: "可提供样品，欢迎实地考察。长期合作价格优惠，量大可议价。",
  publishTime: "2025-12-30 10:08",
  inquiryCount: 5,
}

export default function CaigouXunjiaPage() {
  const [activeTab, setActiveTab] = useState<"xunjia" | "detail">("xunjia")
  const [qty, setQty] = useState(300)
  const [deliveryMode, setDeliveryMode] = useState<"seller" | "buyer">("seller")

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">
        <div className="bg-white border-b border-[#dde3ec]">
          <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center gap-1.5 text-[12px] text-[#6b7c93]">
            <Link href="/portal" className="hover:text-[#1a5fa8] transition-colors">首页</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/portal/dingdan-nongye" className="hover:text-[#1a5fa8] transition-colors">订单农业服务</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1a1a2e]">发起采购询价</span>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="max-w-[1000px]">
            <div className="mb-6">
              <h1 className="text-[20px] font-bold text-[#1a1a2e]">发起采购询价</h1>
              <p className="text-[13px] text-[#6b7c93] mt-1">向供应商发起采购需求，填写需求信息后提交，供应商将在截止日期前报价</p>
            </div>

            <div className="bg-white rounded-lg border border-[#dde3ec] overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-[#dde3ec]">
                {[
                  { key: "xunjia", label: "发起采购询价" },
                  { key: "detail", label: "订单种植供应详情" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as "xunjia" | "detail")}
                    className={`px-6 py-3.5 text-[14px] font-medium border-b-2 transition-colors ${
                      activeTab === tab.key ? "border-[#1a5fa8] text-[#1a5fa8]" : "border-transparent text-[#666] hover:text-[#1a5fa8]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab: 发起采购询价 */}
              {activeTab === "xunjia" && (
                <div className="p-6">
                  {/* Buyer / Seller info bar */}
                  <div className="bg-[#f5f7fa] border border-[#dde3ec] rounded px-4 py-3 flex gap-8 text-[13px] text-[#444] mb-6">
                    <span>买方：盒马超市采购部 <span className="text-[#999]">(no.122438)</span></span>
                    <span>商家：{supply.company} <span className="text-[#999]">(no.122434)</span></span>
                  </div>

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
                      <tr>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-[#f0f4f8] border border-[#dde3ec] rounded flex items-center justify-center text-[#ccc] text-[10px]">图片</div>
                            <span className="font-medium">{supply.productName}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-[#6b7c93]">{supply.category}类/大米类/籼米</td>
                        <td className="px-3 py-3">{supply.spec}</td>
                        <td className="px-3 py-3">{supply.quantity}</td>
                        <td className="px-3 py-3">{supply.priceRange}</td>
                        <td className="px-3 py-3">{supply.qualityStd}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-7 h-7 border border-[#dde3ec] rounded flex items-center justify-center hover:bg-[#f0f4f8] transition-colors">
                              <Minus className="w-3 h-3" />
                            </button>
                            <input type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} className="w-16 h-7 border border-[#dde3ec] rounded text-center text-[13px] outline-none focus:border-[#1a5fa8]" />
                            <button onClick={() => setQty(qty + 1)} className="w-7 h-7 border border-[#dde3ec] rounded flex items-center justify-center hover:bg-[#f0f4f8] transition-colors">
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
                    <div>
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>收货计划</label>
                      <div className="flex items-center gap-2">
                        <input type="text" placeholder="选择开始日期" className="flex-1 h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8] bg-white" />
                        <span className="text-[#999]">至</span>
                        <input type="text" placeholder="选择结束日期" className="flex-1 h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8] bg-white" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>报价截止日期</label>
                      <input type="text" placeholder="请选择" className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8] bg-white" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>配送方式</label>
                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" checked={deliveryMode === "seller"} onChange={() => setDeliveryMode("seller")} className="accent-[#1a5fa8]" />
                          <span className="text-[13px]">卖家配送</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" checked={deliveryMode === "buyer"} onChange={() => setDeliveryMode("buyer")} className="accent-[#1a5fa8]" />
                          <span className="text-[13px]">买家自提</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>收货地址</label>
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

                  <div className="mb-5">
                    <h3 className="text-[14px] font-semibold text-[#1a5fa8] pl-3 border-l-[3px] border-[#1a5fa8] mb-4">买方联系人信息</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>联系人姓名</label>
                        <input type="text" placeholder="请输入" className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
                      </div>
                      <div>
                        <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>联系人电话</label>
                        <input type="text" placeholder="请输入手机号码" className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-[14px] font-semibold text-[#1a5fa8] pl-3 border-l-[3px] border-[#1a5fa8] mb-4">其他信息</h3>
                    <div className="mb-4">
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5">备注说明</label>
                      <div className="relative">
                        <textarea placeholder="请输入" rows={4} maxLength={500} className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] outline-none focus:border-[#1a5fa8] resize-none" />
                        <span className="absolute bottom-2 right-3 text-[11px] text-[#999]">0 / 500</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5">附件</label>
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#dde3ec] rounded text-[13px] text-[#444] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
                          <Upload className="w-4 h-4" />上传附件
                        </button>
                        <span className="text-[12px] text-[#999]">支持png/jpg/pdf/zip文件等，不超过100M</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between px-4 py-2.5 bg-[#f5f7fa] border border-[#dde3ec] rounded">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-red-500 rounded-sm flex items-center justify-center">
                            <span className="text-white text-[8px] font-bold">PDF</span>
                          </div>
                          <span className="text-[13px] text-[#333]">附件文件.pdf</span>
                        </div>
                        <button className="text-[#999] hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 pt-2 border-t border-[#dde3ec]">
                    <Link href="/portal/dingdan-nongye" className="px-8 py-2.5 border border-[#dde3ec] text-[#444] text-[14px] rounded hover:bg-[#f5f7fa] transition-colors">
                      取消
                    </Link>
                    <button className="px-12 py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors">
                      确认提交
                    </button>
                  </div>
                </div>
              )}

              {/* Tab: 订单种植供应详情 */}
              {activeTab === "detail" && (
                <div className="p-6 space-y-5">
                  {/* Title */}
                  <div className="border border-[#e8edf5] rounded p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[12px] rounded border font-medium bg-[#fff3e0] text-[#e8831a] border-[#ffd8a8]">{supply.status}</span>
                        <span className="px-2 py-0.5 text-[12px] rounded border border-[#dde3ec] text-[#666] bg-[#f8f9fb]">{supply.category}</span>
                        <span className="text-[13px] text-[#999]">{supply.id}</span>
                      </div>
                      <span className="text-[12px] text-[#999]">发布时间：{supply.publishTime}</span>
                    </div>
                    <h2 className="text-[18px] font-bold text-[#1a2a3a] mb-3">{supply.title}</h2>
                    <div className="flex items-center gap-5 flex-wrap text-[13px] text-[#666]">
                      <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5 text-[#3a8c3f]" /> 供应量：{supply.quantity}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#3a8c3f]" /> {supply.city}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#3a8c3f]" /> 截止：{supply.deadline}</span>
                      <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-[#3a8c3f]" /> 卖方：{supply.company}</span>
                    </div>
                  </div>

                  {/* Supply details */}
                  <div className="border border-[#e8edf5] rounded p-5">
                    <h3 className="text-[14px] font-semibold text-[#1a2a3a] mb-4 flex items-center gap-2">
                      <span className="w-1 h-4 bg-[#3a8c3f] rounded-full inline-block"></span>供应内容
                    </h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-4">
                      {[
                        { label: "商品分类", value: supply.category },
                        { label: "供应数量", value: supply.quantity },
                        { label: "价格区间", value: supply.priceRange },
                        { label: "交付周期", value: supply.deliveryPeriod },
                        { label: "询价截止", value: supply.deadline },
                        { label: "预付款比例", value: supply.prepayRatio },
                        { label: "交易模式", value: supply.tradeMode },
                        { label: "配送方式", value: supply.deliveryMethod },
                        { label: "结算渠道", value: supply.settlement },
                      ].map(item => (
                        <div key={item.label} className="flex items-start gap-2">
                          <span className="text-[13px] text-[#888] w-24 shrink-0">{item.label}</span>
                          <span className="text-[13px] text-[#333] font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-[#f0f3f8] pt-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-[13px] text-[#888] w-24 shrink-0">供应描述</span>
                        <p className="text-[13px] text-[#333] leading-relaxed flex-1">{supply.description}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[13px] text-[#888] w-24 shrink-0">备注说明</span>
                        <p className="text-[13px] text-[#333] flex-1">{supply.remark}</p>
                      </div>
                    </div>
                  </div>

                  {/* Product info */}
                  <div className="border border-[#e8edf5] rounded p-5">
                    <h3 className="text-[14px] font-semibold text-[#1a2a3a] mb-4 flex items-center gap-2">
                      <span className="w-1 h-4 bg-[#3a8c3f] rounded-full inline-block"></span>商品信息
                    </h3>
                    <div className="flex items-start gap-4 p-4 bg-[#f8fdf8] rounded border border-[#d4edda]">
                      <div className="w-14 h-14 bg-[#e8f5e9] rounded flex items-center justify-center text-[#3a8c3f] shrink-0">
                        <Package className="w-6 h-6" />
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-2">
                        {[
                          { label: "商品名称", value: supply.productName },
                          { label: "商品规格", value: supply.spec },
                          { label: "供应数量", value: supply.quantity },
                          { label: "价格区间", value: supply.priceRange },
                          { label: "质量标准", value: supply.qualityStd },
                        ].map(item => (
                          <div key={item.label} className="flex items-start gap-2">
                            <span className="text-[13px] text-[#888] w-16 shrink-0">{item.label}</span>
                            <span className="text-[13px] text-[#333] font-medium">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Key info bar */}
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { icon: Clock, label: "询价截止", value: supply.deadline },
                      { icon: Calendar, label: "交付周期", value: "2026年全年" },
                      { icon: CreditCard, label: "预付款比例", value: supply.prepayRatio },
                      { icon: Truck, label: "配送方式", value: supply.deliveryMethod },
                    ].map(item => (
                      <div key={item.label} className="bg-[#f5f7fa] rounded p-3 flex items-start gap-2">
                        <item.icon className="w-4 h-4 text-[#3a8c3f] mt-0.5 shrink-0" />
                        <div>
                          <div className="text-[11px] text-[#888]">{item.label}</div>
                          <div className="text-[12px] text-[#333] font-medium">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setActiveTab("xunjia")}
                      className="px-6 py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors"
                    >
                      立即询价
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
