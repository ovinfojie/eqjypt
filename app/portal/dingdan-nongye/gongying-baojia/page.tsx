"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Info, Download, Eye, ChevronDown, ChevronRight, Package, MapPin, Calendar, Building2, Clock, CreditCard, Truck } from "lucide-react"

const demand = {
  id: "DD20251230006",
  title: "2026年广东省内计划大量采购丝苗米",
  buyer: "广东新供销天润粮油集团有限公司",
  status: "报价中",
  category: "粮油",
  publishType: "公开发布",
  description: "需求大粒稠米，含水量≤14%，整稻米率≥65%，要求有绿色食品认证。要求产地为广东省内，具备完善的质检报告，可提供溯源证明。优先考虑规模化农业合作社或专业农场。",
  quantity: "100吨",
  city: "广州市",
  deadline: "2026-04-25",
  budget: "2800~3000元/吨",
  deliveryPeriod: "2026-04-23 至 2026-04-25",
  prepayRatio: "30%",
  quoteMode: "可以修改报价",
  tradeMode: "担保交易",
  deliveryMethod: "卖家配送",
  settlement: "建行龙存管",
  qualityStd: "GB/T 1354 大米",
  remark: "要求米粒完整、无霉变，水分含量≤14.5%，垩白度≤5%。需提供质检报告。",
  publishTime: "2025-12-30 14:22",
}

const skuRows = [
  { sku: "K463401718928", masterSku: "——", spec: "吨", estQty: "5.00", unit: "吨", lastPrice: "1500", price: "2000", amount: "——" },
  { sku: "K345678971898", masterSku: "——", spec: "千克", estQty: "100.00", unit: "千克", lastPrice: "——", price: "2000", amount: "100000.00" },
]

export default function GongyingBaoJiaPage() {
  const [activeTab, setActiveTab] = useState<"baojia" | "detail">("baojia")
  const [transactionMode, setTransactionMode] = useState<"noguarantee" | "guarantee">("guarantee")
  const [settlement, setSettlement] = useState({ jianlonglong: true, gonghang: false })

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
            <span className="text-[#1a1a2e]">发起供应报价</span>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="max-w-[1000px]">
            <div className="mb-6">
              <h1 className="text-[20px] font-bold text-[#1a1a2e]">发起供应报价</h1>
              <p className="text-[13px] text-[#6b7c93] mt-1">针对采购方的询价需求进行报价，填写供应信息和价格后提交</p>
            </div>

            <div className="bg-white rounded-lg border border-[#dde3ec] overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-[#dde3ec]">
                {[
                  { key: "baojia", label: "发起供应报价" },
                  { key: "detail", label: "订单种植需求详情" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as "baojia" | "detail")}
                    className={`px-6 py-3.5 text-[14px] font-medium border-b-2 transition-colors ${
                      activeTab === tab.key ? "border-[#1a5fa8] text-[#1a5fa8]" : "border-transparent text-[#666] hover:text-[#1a5fa8]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab: 发起供应报价 */}
              {activeTab === "baojia" && (
                <div className="p-6">
                  {/* Demand overview card */}
                  <div className="border border-[#dde3ec] rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#e8f4fd] rounded flex items-center justify-center shrink-0">
                        <Info className="w-5 h-5 text-[#1a5fa8]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[14px] font-semibold text-[#1a1a2e] mb-0.5">{demand.title}</div>
                        <div className="text-[12px] text-[#6b7c93]">{demand.buyer}</div>
                      </div>
                    </div>
                    <table className="w-full text-[13px] mt-4 border border-[#dde3ec] rounded overflow-hidden">
                      <thead className="bg-[#f5f7fa]">
                        <tr>
                          {["商品图片", "商品名称", "平台分类", "规格", "计划采购量(单位)", "收购价区间(单位)"].map((h) => (
                            <th key={h} className="px-3 py-2 text-left font-medium text-[#444] border-b border-[#dde3ec]">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-3 py-3"><div className="w-10 h-10 bg-[#f0f4f8] border border-[#dde3ec] rounded flex items-center justify-center text-[#ccc] text-[10px]">图片</div></td>
                          <td className="px-3 py-3 font-medium">丝苗米</td>
                          <td className="px-3 py-3 text-[#6b7c93]">粮油类/大米类/籼米</td>
                          <td className="px-3 py-3">吨</td>
                          <td className="px-3 py-3">{demand.quantity}</td>
                          <td className="px-3 py-3 text-[#1a5fa8] font-medium">{demand.budget}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="grid grid-cols-3 gap-4 mt-4 text-[13px]">
                      <div><span className="text-[#6b7c93]">期望收货周期：</span><span className="text-[#333]">{demand.deliveryPeriod}</span></div>
                      <div>
                        <span className="text-[#6b7c93]">报价模式：</span><span className="text-[#333]">{demand.quoteMode}</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Info className="w-3.5 h-3.5 text-[#1a5fa8]" />
                          <span className="text-[12px] text-[#1a5fa8]">买方未下单前可随时修改报价</span>
                        </div>
                      </div>
                      <div><span className="text-[#6b7c93]">报价截止时间：</span><span className="text-[#333]">{demand.deadline} 23:59:59</span></div>
                      <div>
                        <span className="text-[#6b7c93]">收购标准：</span><span className="text-[#333]">{demand.qualityStd}</span>
                        <button className="ml-2 text-[#1a5fa8] text-[12px] hover:underline">查看标准详情</button>
                      </div>
                      <div className="col-span-2"><span className="text-[#6b7c93]">备注信息：</span><span className="text-[#333]">{demand.remark}</span></div>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f5f7fa] border border-[#dde3ec] rounded text-[13px]">
                        <div className="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center"><span className="text-white text-[7px] font-bold">PDF</span></div>
                        <span>质检要求说明.pdf</span>
                        <button className="ml-1 text-[#6b7c93] hover:text-[#1a5fa8]"><Download className="w-3.5 h-3.5" /></button>
                        <button className="text-[#6b7c93] hover:text-[#1a5fa8]"><Eye className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </div>

                  {/* Select supply product */}
                  <div className="mb-6">
                    <h3 className="text-[14px] font-semibold text-[#1a1a2e] mb-3">选择供应商品</h3>
                    <div className="border border-[#1a5fa8] rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-[#1a5fa8] rounded flex items-center justify-center shrink-0">
                          <span className="text-white text-[10px]">图片</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[13px] font-semibold">丝苗米（一级）</span>
                            <span className="px-2 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[11px] rounded">实物商品</span>
                          </div>
                          <button className="text-[12px] text-[#1a5fa8] hover:underline">更换商品</button>
                        </div>
                      </div>
                      <div className="mt-2 text-[12px] text-[#6b7c93]">粮油类/大米类/籼米 · 市集SPU编码P626342237328 · 主数据SPU编码P123456789</div>
                    </div>
                  </div>

                  {/* SKU table */}
                  <div className="mb-6">
                    <h3 className="text-[14px] font-semibold text-[#1a1a2e] mb-3"><span className="text-red-500 mr-1">*</span>选择规格</h3>
                    <table className="w-full text-[13px] border border-[#dde3ec] rounded overflow-hidden">
                      <thead className="bg-[#f5f7fa]">
                        <tr>
                          <th className="w-8 px-3 py-2 border-b border-[#dde3ec]"><input type="checkbox" className="accent-[#1a5fa8]" defaultChecked /></th>
                          {["平台SKU编码", "主数据SKU编码", "规格名称", "预估供应量", "单位", "上次报价(元)", "本次报价(元)", "金额(元)"].map((h) => (
                            <th key={h} className="px-3 py-2 text-left font-medium text-[#444] border-b border-[#dde3ec]">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {skuRows.map((row, i) => (
                          <tr key={i} className="border-b border-[#dde3ec] last:border-0">
                            <td className="px-3 py-3"><input type="checkbox" className="accent-[#1a5fa8]" defaultChecked /></td>
                            <td className="px-3 py-3 text-[#6b7c93]">{row.sku}</td>
                            <td className="px-3 py-3 text-[#6b7c93]">{row.masterSku}</td>
                            <td className="px-3 py-3">{row.spec}</td>
                            <td className="px-3 py-3">{row.estQty}</td>
                            <td className="px-3 py-3">{row.unit}</td>
                            <td className="px-3 py-3 text-[#6b7c93]">{row.lastPrice}</td>
                            <td className="px-3 py-3">
                              <input type="text" defaultValue={row.price} className="w-20 h-7 border border-[#dde3ec] rounded px-2 text-[13px] outline-none focus:border-[#1a5fa8]" />
                            </td>
                            <td className="px-3 py-3 font-medium text-[#1a1a2e]">{row.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="text-right mt-2 text-[13px] text-[#6b7c93]">
                      已选 <span className="text-[#1a1a2e] font-medium">2</span> 个规格，总供货量 <span className="text-[#1a1a2e] font-medium">5100 kg</span>，报价合计 <span className="text-[#1a5fa8] font-bold text-[14px]">¥100,000.00</span>
                    </div>
                  </div>

                  {/* Other fields */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-6">
                    <div>
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>报价有效期</label>
                      <div className="flex items-center gap-2">
                        <input type="text" placeholder="选择开始日期" className="flex-1 h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
                        <span className="text-[#999]">至</span>
                        <input type="text" placeholder="选择结束日期" className="flex-1 h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>可供货时间</label>
                      <div className="flex items-center gap-2">
                        <input type="text" placeholder="选择开始日期" className="flex-1 h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
                        <span className="text-[#999]">至</span>
                        <input type="text" placeholder="选择结束日期" className="flex-1 h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>结算渠道</label>
                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={settlement.jianlonglong} onChange={(e) => setSettlement({ ...settlement, jianlonglong: e.target.checked })} className="accent-[#1a5fa8]" />
                          <span className="text-[13px]">建行龙存管</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={settlement.gonghang} onChange={(e) => setSettlement({ ...settlement, gonghang: e.target.checked })} className="accent-[#1a5fa8]" />
                          <span className="text-[13px]">工行安心付</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>交易模式 <Info className="inline w-3.5 h-3.5 text-[#999] ml-1" /></label>
                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="transMode" checked={transactionMode === "noguarantee"} onChange={() => setTransactionMode("noguarantee")} className="accent-[#1a5fa8]" />
                          <span className="text-[13px]">非担保交易</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="transMode" checked={transactionMode === "guarantee"} onChange={() => setTransactionMode("guarantee")} className="accent-[#1a5fa8]" />
                          <span className="text-[13px]">担保交易</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>预付款比例</label>
                      <div className="relative">
                        <input type="text" placeholder="请输入" className="w-full h-9 border border-[#dde3ec] rounded px-3 pr-8 text-[13px] outline-none focus:border-[#1a5fa8]" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] text-[13px]">%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>配送方式</label>
                      <div className="relative">
                        <select className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8] bg-white appearance-none">
                          <option value="">请选择配送方式</option>
                          <option>卖家配送</option>
                          <option>买家自提</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999] pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-[13px] font-medium text-[#333] mb-1.5">产能说明</label>
                    <textarea placeholder="请输入产能说明" rows={3} className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] outline-none focus:border-[#1a5fa8] resize-none" />
                  </div>

                  <div className="mb-6 p-4 bg-[#f5f7fa] rounded border border-[#dde3ec]">
                    <label className="block text-[13px] font-medium text-[#333] mb-2"><span className="text-red-500 mr-1">*</span>收购标准</label>
                    <div className="text-[13px] text-[#444] mb-2">
                      本需求绑定丝苗米收购标准 {demand.qualityStd}
                      <button className="ml-2 text-[#1a5fa8] hover:underline">查看收购标准</button>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-[#1a5fa8]" />
                      <span className="text-[13px] text-[#444]">我已阅读并承诺按收购标准交付</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-6">
                    <div>
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>卖方联系人姓名</label>
                      <input type="text" placeholder="请输入联系人姓名" className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>卖方联系人电话</label>
                      <input type="text" placeholder="请输入联系人电话" className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 pt-2 border-t border-[#dde3ec]">
                    <Link href="/portal/dingdan-nongye" className="px-8 py-2.5 border border-[#dde3ec] text-[#444] text-[14px] rounded hover:bg-[#f5f7fa] transition-colors">
                      取消
                    </Link>
                    <button className="px-12 py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors">
                      提交报价
                    </button>
                  </div>
                </div>
              )}

              {/* Tab: 订单种植需求详情 */}
              {activeTab === "detail" && (
                <div className="p-6 space-y-5">
                  {/* Title */}
                  <div className="border border-[#e8edf5] rounded p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[12px] rounded border font-medium bg-[#fff3e0] text-[#e8831a] border-[#ffd8a8]">{demand.status}</span>
                        <span className="px-2 py-0.5 text-[12px] rounded border border-[#dde3ec] text-[#666] bg-[#f8f9fb]">{demand.category}</span>
                        <span className="text-[13px] text-[#999]">{demand.id}</span>
                      </div>
                      <span className="text-[12px] text-[#999]">发布时间：{demand.publishTime}</span>
                    </div>
                    <h2 className="text-[18px] font-bold text-[#1a2a3a] mb-3">{demand.title}</h2>
                    <div className="flex items-center gap-5 flex-wrap text-[13px] text-[#666]">
                      <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5 text-[#1a5fa8]" /> 采购量：{demand.quantity}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#1a5fa8]" /> {demand.city}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#1a5fa8]" /> 截止：{demand.deadline}</span>
                      <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-[#1a5fa8]" /> 买方：{demand.buyer}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="border border-[#e8edf5] rounded p-5">
                    <h3 className="text-[14px] font-semibold text-[#1a2a3a] mb-4 flex items-center gap-2">
                      <span className="w-1 h-4 bg-[#1a5fa8] rounded-full inline-block"></span>需求内容
                    </h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-4">
                      {[
                        { label: "商品分类", value: demand.category },
                        { label: "采购数量", value: demand.quantity },
                        { label: "预算金额", value: demand.budget },
                        { label: "期望收货时间", value: demand.deliveryPeriod },
                        { label: "报价截止", value: demand.deadline },
                        { label: "预付款比例", value: demand.prepayRatio },
                        { label: "报价模式", value: demand.quoteMode },
                        { label: "交易模式", value: demand.tradeMode },
                        { label: "配送方式", value: demand.deliveryMethod },
                        { label: "结算渠道", value: demand.settlement },
                      ].map(item => (
                        <div key={item.label} className="flex items-start gap-2">
                          <span className="text-[13px] text-[#888] w-24 shrink-0">{item.label}</span>
                          <span className="text-[13px] text-[#333] font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-[#f0f3f8] pt-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-[13px] text-[#888] w-24 shrink-0">需求描述</span>
                        <p className="text-[13px] text-[#333] leading-relaxed flex-1">{demand.description}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[13px] text-[#888] w-24 shrink-0">备注说明</span>
                        <p className="text-[13px] text-[#333] flex-1">{demand.remark}</p>
                      </div>
                    </div>
                  </div>

                  {/* Key info bar */}
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { icon: Clock, label: "报价截止", value: demand.deadline },
                      { icon: Calendar, label: "收货时间", value: demand.deliveryPeriod },
                      { icon: CreditCard, label: "预付款比例", value: demand.prepayRatio },
                      { icon: Truck, label: "配送方式", value: demand.deliveryMethod },
                    ].map(item => (
                      <div key={item.label} className="bg-[#f5f7fa] rounded p-3 flex items-start gap-2">
                        <item.icon className="w-4 h-4 text-[#1a5fa8] mt-0.5 shrink-0" />
                        <div>
                          <div className="text-[11px] text-[#888]">{item.label}</div>
                          <div className="text-[12px] text-[#333] font-medium">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setActiveTab("baojia")}
                      className="px-6 py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors"
                    >
                      立即报价
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
