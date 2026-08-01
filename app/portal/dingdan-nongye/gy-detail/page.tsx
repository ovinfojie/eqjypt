"use client"

import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MapPin, Calendar, Building2, Package, Clock, CreditCard, Truck, ChevronRight } from "lucide-react"

const supply = {
  id: "GY20251230008",
  title: "广东优质丝苗米产地直供供应",
  status: "报价中",
  category: "粮油",
  publishType: "公开发布",
  description: "本公司位于广东省粮食主产区，长期种植优质丝苗米，年产能约500吨。产品符合国标GB/T1350，通过绿色食品认证，可提供完整溯源体系。欢迎各大食品企业、商超及学校食堂前来洽谈长期供应合作。",
  productName: "丝苗米",
  spec: "整精米率≥65%，含水量≤14%",
  quantity: "1000吨/年",
  priceRange: "3.5 ~ 4.0元/斤",
  qualityStd: "符合国标GB/T1350，绿色食品认证",
  capacity: "年产能500吨，可扩大至1000吨",
  city: "惠州市",
  deliveryPeriod: "2026-01-01 至 2026-12-31",
  deadline: "2026-02-01",
  prepayRatio: "20%",
  tradeMode: "担保交易",
  deliveryMethod: "卖家配送、买家自提",
  settlement: "建行龙存管",
  contact: "王总",
  phone: "139****6666",
  company: "惠州新供销天润供应链有限公司",
  remark: "可提供样品，欢迎实地考察。长期合作价格优惠，量大可议价。",
  publishTime: "2025-12-30 10:08",
  inquiryCount: 5,
}

const statusColor: Record<string, string> = {
  "报价中": "bg-[#fff3e0] text-[#e8831a] border-[#ffd8a8]",
  "需求发布": "bg-[#e3f2fd] text-[#1565c0] border-[#bbdefb]",
  "已签约": "bg-[#e8f5e9] text-[#2e7d32] border-[#c8e6c9]",
  "履约中": "bg-[#f3e5f5] text-[#7b1fa2] border-[#e1bee7]",
  "已完成": "bg-[#f5f5f5] text-[#757575] border-[#e0e0e0]",
}

export default function GyDetailPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
      <SiteHeader />
      <div className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[13px] text-[#999] mb-5">
          <Link href="/portal" className="hover:text-[#3a8c3f]">首页</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/portal/dingdan-nongye" className="hover:text-[#3a8c3f]">订单农业服务</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#3a8c3f]">供应详情</span>
        </div>

        <div className="flex gap-5">
          {/* Left main */}
          <div className="flex-1 space-y-4">
            {/* Title card */}
            <div className="bg-white rounded border border-[#e8edf5] p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 text-[12px] rounded border font-medium ${statusColor[supply.status]}`}>{supply.status}</span>
                  <span className="px-2 py-0.5 text-[12px] rounded border border-[#dde3ec] text-[#666] bg-[#f8f9fb]">{supply.category}</span>
                  <span className="text-[13px] text-[#999]">{supply.id}</span>
                </div>
                <span className="text-[12px] text-[#999] shrink-0">发布时间：{supply.publishTime}</span>
              </div>
              <h1 className="text-[20px] font-bold text-[#1a2a3a] mb-4">{supply.title}</h1>
              <div className="flex items-center gap-5 flex-wrap text-[13px] text-[#666]">
                <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5 text-[#3a8c3f]" /> 供应量：{supply.quantity}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#3a8c3f]" /> {supply.city}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#3a8c3f]" /> 截止：{supply.deadline}</span>
                <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-[#3a8c3f]" /> 卖方：{supply.company}</span>
              </div>
            </div>

            {/* Supply details */}
            <div className="bg-white rounded border border-[#e8edf5] p-6">
              <h2 className="text-[15px] font-semibold text-[#1a2a3a] mb-5 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#3a8c3f] rounded-full inline-block"></span>供应内容
              </h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-5">
                {[
                  { label: "供应标题", value: supply.title },
                  { label: "发布方式", value: supply.publishType },
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
              <div className="border-t border-[#f0f3f8] pt-4 space-y-3">
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
            <div className="bg-white rounded border border-[#e8edf5] p-6">
              <h2 className="text-[15px] font-semibold text-[#1a2a3a] mb-5 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#3a8c3f] rounded-full inline-block"></span>商品信息
              </h2>
              <div className="flex items-start gap-5 p-4 bg-[#f8fdf8] rounded border border-[#d4edda]">
                <div className="w-16 h-16 bg-[#e8f5e9] rounded flex items-center justify-center text-[#3a8c3f] shrink-0">
                  <Package className="w-7 h-7" />
                </div>
                <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-3">
                  {[
                    { label: "商品名称", value: supply.productName },
                    { label: "商品规格", value: supply.spec },
                    { label: "供应数量", value: supply.quantity },
                    { label: "价格区间", value: supply.priceRange },
                    { label: "质量标准", value: supply.qualityStd },
                    { label: "产能说明", value: supply.capacity },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-2">
                      <span className="text-[13px] text-[#888] w-16 shrink-0">{item.label}</span>
                      <span className="text-[13px] text-[#333] font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact info */}
            <div className="bg-white rounded border border-[#e8edf5] p-6">
              <h2 className="text-[15px] font-semibold text-[#1a2a3a] mb-5 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#3a8c3f] rounded-full inline-block"></span>卖方联系人信息
              </h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {[
                  { label: "联系人姓名", value: supply.contact },
                  { label: "联系电话", value: supply.phone },
                  { label: "所在单位", value: supply.company },
                  { label: "所在城市", value: supply.city },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="text-[13px] text-[#888] w-24 shrink-0">{item.label}</span>
                    <span className="text-[13px] text-[#333] font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="w-60 shrink-0 space-y-4">
            <div className="bg-white rounded border border-[#e8edf5] p-4">
              <div className="text-center mb-4">
                <div className="text-[20px] font-bold text-[#3a8c3f]">{supply.priceRange}</div>
                <div className="text-[12px] text-[#888]">供应价格区间</div>
              </div>
              <div className="text-center mb-4">
                <div className="text-[28px] font-bold text-[#1a5fa8]">{supply.inquiryCount}</div>
                <div className="text-[12px] text-[#888]">家采购商已询价</div>
              </div>
              <Link
                href="/portal/dingdan-nongye/caigou-xunjia"
                className="block w-full py-2.5 bg-[#3a8c3f] text-white text-[14px] font-semibold text-center rounded hover:bg-[#2d7032] transition-colors mb-2"
              >
                立即询价
              </Link>
              <button className="w-full py-2.5 border border-[#3a8c3f] text-[#3a8c3f] text-[14px] rounded hover:bg-[#f0f9f0] transition-colors">
                联系卖方
              </button>
            </div>

            <div className="bg-white rounded border border-[#e8edf5] p-4">
              <h3 className="text-[13px] font-semibold text-[#1a2a3a] mb-3 flex items-center gap-1.5">
                <span className="w-1 h-3.5 bg-[#3a8c3f] rounded-full inline-block"></span>关键信息
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Clock, label: "询价截止", value: supply.deadline },
                  { icon: Calendar, label: "交付周期", value: "2026年全年" },
                  { icon: CreditCard, label: "预付款", value: supply.prepayRatio },
                  { icon: Truck, label: "配送方式", value: "卖家配送/自提" },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-2">
                    <item.icon className="w-3.5 h-3.5 text-[#3a8c3f] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[11px] text-[#888]">{item.label}</div>
                      <div className="text-[12px] text-[#333] font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded border border-[#e8edf5] p-4">
              <h3 className="text-[13px] font-semibold text-[#1a2a3a] mb-3 flex items-center gap-1.5">
                <span className="w-1 h-3.5 bg-[#3a8c3f] rounded-full inline-block"></span>相似供应
              </h3>
              <div className="space-y-2.5">
                {[
                  { title: "广东优质菠萝产地供应", price: "1.2元/斤", status: "报价中" },
                  { title: "东莞特色荔枝批量供应", price: "5.0元/斤", status: "需求发布" },
                  { title: "惠州高山茶叶直供", price: "面议", status: "报价中" },
                ].map((item, i) => (
                  <Link key={i} href="#" className="block p-2.5 rounded border border-[#f0f3f8] hover:border-[#3a8c3f] transition-colors">
                    <div className="text-[12px] text-[#333] font-medium leading-snug mb-1 line-clamp-1">{item.title}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#3a8c3f] font-semibold">{item.price}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${statusColor[item.status]}`}>{item.status}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
