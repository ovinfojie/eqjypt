"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MapPin, Calendar, Building2, Package, Clock, CreditCard, Truck, ChevronRight, ImageIcon } from "lucide-react"

const supplyDesc = {
  id: "GY20251230009",
  title: "广东高山有机茶叶长期供应",
  status: "需求发布",
  category: "其他",
  contentType: "desc" as const,
  publishType: "公开发布",
  description: "本基地位于广东省梅州山区，海拔800米以上，常年云雾缭绕，种植有机茶叶10年以上。产品符合有机食品认证标准，年产能约50吨，可提供散装或礼盒包装。欢迎茶叶企业、连锁茶馆及商超洽谈长期采购合作。",
  priceRange: "120～280元/斤",
  quantity: "50吨/年",
  city: "梅州市",
  deadline: "2026-02-15",
  company: "梅州某农业发展有限公司",
  deliveryPeriod: "2026-03-01 至 2026-12-31",
  prepayRatio: "20%",
  tradeMode: "担保交易",
  deliveryMethod: "卖家配送、买家自提",
  settlement: "建行龙存管",
  contact: "陈总",
  phone: "136****4444",
  remark: "可提供样品，欢迎实地参观茶园。长期合作可提供定制化包装服务。",
  publishTime: "2025-12-30 11:30",
  inquiryCount: 2,
}

const supplyProduct = {
  id: "GY20251230008",
  title: "广东优质丝苗米产地直供供应",
  status: "报价中",
  category: "粮油",
  contentType: "product" as const,
  publishType: "公开发布",
  product: {
    name: "丝苗米",
    category: "粮油类/大米类/籼米",
    spec: "25kg/袋",
    quantity: "2000kg",
    priceRange: "78.00～88.00元/kg",
    qualityStd: "三等粮，整精米率≥65%，含水量≤14%",
  },
  city: "惠州市",
  deadline: "2026-02-01",
  company: "惠州新供销天润供应链有限公司",
  deliveryPeriod: "2026-01-01 至 2026-12-31",
  prepayRatio: "20%",
  tradeMode: "担保交易",
  deliveryMethod: "卖家配送、买家自提",
  settlement: "建行龙存管",
  contact: "王总",
  phone: "139****6666",
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

function GyDetailContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") === "product" ? "product" : "desc"
  const supply = type === "product" ? supplyProduct : supplyDesc

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
      <SiteHeader />
      <div className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-6">
        <div className="flex items-center gap-1.5 text-[13px] text-[#999] mb-5">
          <Link href="/portal" className="hover:text-[#3a8c3f]">首页</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/portal/dingdan-nongye" className="hover:text-[#3a8c3f]">订单农业服务</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#3a8c3f]">供应详情</span>
        </div>

        <div className="flex gap-5">
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
                <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5 text-[#3a8c3f]" />
                  {supply.contentType === "product" ? `供应量：${(supply as typeof supplyProduct).product.quantity}` : `供应量：${(supply as typeof supplyDesc).quantity}`}
                </span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#3a8c3f]" /> {supply.city}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#3a8c3f]" /> 截止：{supply.deadline}</span>
                <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-[#3a8c3f]" /> 卖方：{supply.company}</span>
              </div>
            </div>

            {/* Main content: product table OR description */}
            {supply.contentType === "product" ? (
              <div className="bg-white rounded border border-[#e8edf5] p-6">
                <h2 className="text-[15px] font-semibold text-[#1a2a3a] mb-5 flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#3a8c3f] rounded-full inline-block" />商品信息
                </h2>
                <div className="flex items-center gap-3 mb-4 p-3 bg-[#f5fdf5] rounded border border-[#c8e6c9]">
                  <div className="w-8 h-8 rounded-full bg-[#c8e6c9] flex items-center justify-center shrink-0">
                    <Package className="w-4 h-4 text-[#3a8c3f]" />
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-[#1a2a3a]">{supply.title}</div>
                    <div className="text-[12px] text-[#888]">{supply.company}</div>
                  </div>
                </div>
                <div className="border border-[#e8edf5] rounded overflow-hidden mb-5">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="bg-[#f5f7fa] border-b border-[#e8edf5]">
                        <th className="text-left px-4 py-2.5 text-[#555] font-medium w-20">商品图片</th>
                        <th className="text-left px-4 py-2.5 text-[#555] font-medium">商品名称</th>
                        <th className="text-left px-4 py-2.5 text-[#555] font-medium">平台分类</th>
                        <th className="text-left px-4 py-2.5 text-[#555] font-medium">规格</th>
                        <th className="text-left px-4 py-2.5 text-[#555] font-medium">计划供应量（单位）</th>
                        <th className="text-left px-4 py-2.5 text-[#555] font-medium">销售价区间（单位）</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="px-4 py-4">
                          <div className="w-14 h-14 bg-[#f0f3f8] border border-[#e8edf5] rounded flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-[#bbb]" />
                          </div>
                        </td>
                        <td className="px-4 py-4 font-medium text-[#1a2a3a]">{(supply as typeof supplyProduct).product.name}</td>
                        <td className="px-4 py-4 text-[#666]">{(supply as typeof supplyProduct).product.category}</td>
                        <td className="px-4 py-4 text-[#666]">{(supply as typeof supplyProduct).product.spec}</td>
                        <td className="px-4 py-4 font-semibold text-[#3a8c3f]">{(supply as typeof supplyProduct).product.quantity}</td>
                        <td className="px-4 py-4 font-semibold text-[#e8831a]">{(supply as typeof supplyProduct).product.priceRange}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-3">
                  {[
                    { label: "收货计划", value: supply.deliveryPeriod },
                    { label: "报价截止日期", value: supply.deadline },
                    { label: "配送方式", value: supply.deliveryMethod },
                    { label: "预付款比例", value: supply.prepayRatio },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-2">
                      <span className="text-[13px] text-[#888] w-24 shrink-0">{item.label}</span>
                      <span className="text-[13px] text-[#333] font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2 mb-3">
                  <span className="text-[13px] text-[#888] w-24 shrink-0">质量标准</span>
                  <span className="text-[13px] text-[#333]">{(supply as typeof supplyProduct).product.qualityStd}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[13px] text-[#888] w-24 shrink-0">备注说明</span>
                  <span className="text-[13px] text-[#333]">{supply.remark}</span>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded border border-[#e8edf5] p-6">
                <h2 className="text-[15px] font-semibold text-[#1a2a3a] mb-5 flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#3a8c3f] rounded-full inline-block" />供应内容
                </h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-5">
                  {[
                    { label: "发布方式", value: supply.publishType },
                    { label: "供应数量", value: (supply as typeof supplyDesc).quantity },
                    { label: "价格区间", value: (supply as typeof supplyDesc).priceRange },
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
                    <p className="text-[13px] text-[#333] leading-relaxed flex-1">{(supply as typeof supplyDesc).description}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[13px] text-[#888] w-24 shrink-0">备注说明</span>
                    <p className="text-[13px] text-[#333] flex-1">{supply.remark}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Contact info */}
            <div className="bg-white rounded border border-[#e8edf5] p-6">
              <h2 className="text-[15px] font-semibold text-[#1a2a3a] mb-5 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#3a8c3f] rounded-full inline-block" />卖方联系人信息
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
                <div className="text-[20px] font-bold text-[#3a8c3f]">
                  {supply.contentType === "product" ? (supply as typeof supplyProduct).product.priceRange : (supply as typeof supplyDesc).priceRange}
                </div>
                <div className="text-[12px] text-[#888]">供应价格区间</div>
              </div>
              <div className="text-center mb-4">
                <div className="text-[28px] font-bold text-[#1a5fa8]">{supply.inquiryCount}</div>
                <div className="text-[12px] text-[#888]">家采购商已询价</div>
              </div>
              <Link href="/portal/dingdan-nongye/caigou-xunjia"
                className="block w-full py-2.5 bg-[#3a8c3f] text-white text-[14px] font-semibold text-center rounded hover:bg-[#2d7032] transition-colors mb-2">
                立即询价
              </Link>
              <button className="w-full py-2.5 border border-[#3a8c3f] text-[#3a8c3f] text-[14px] rounded hover:bg-[#f0f9f0] transition-colors">
                联系卖方
              </button>
            </div>

            <div className="bg-white rounded border border-[#e8edf5] p-4">
              <h3 className="text-[13px] font-semibold text-[#1a2a3a] mb-3 flex items-center gap-1.5">
                <span className="w-1 h-3.5 bg-[#3a8c3f] rounded-full inline-block" />关键信息
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Clock, label: "询价截止", value: supply.deadline },
                  { icon: Calendar, label: "交付周期", value: supply.deliveryPeriod.split(" ")[0] },
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
                <span className="w-1 h-3.5 bg-[#3a8c3f] rounded-full inline-block" />相似供应
              </h3>
              <div className="space-y-2.5">
                {[
                  { title: "广东优质菠萝产地供应", price: "1.2元/斤", status: "报价中", type: "product" },
                  { title: "东莞特色荔枝批量供应", price: "5.0元/斤", status: "需求发布", type: "product" },
                  { title: "惠州高山茶叶直供", price: "面议", status: "报价中", type: "desc" },
                ].map((item, i) => (
                  <Link key={i} href={`/portal/dingdan-nongye/gy-detail?type=${item.type}`}
                    className="block p-2.5 rounded border border-[#f0f3f8] hover:border-[#3a8c3f] transition-colors">
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

export default function GyDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f7fa]" />}>
      <GyDetailContent />
    </Suspense>
  )
}
