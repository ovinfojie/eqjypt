"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MapPin, Calendar, Building2, Package, Clock, CreditCard, Truck, ChevronRight, ImageIcon } from "lucide-react"

const demandDesc = {
  id: "DD20251230005",
  title: "饲料用玉米大批量长期采购",
  status: "需求发布",
  category: "粮油",
  contentType: "desc" as const,
  publishType: "公开发布",
  description: "长期稳定需求，饲料用玉米，容重≥720g/L，水分≤14%，杂质≤1%。要求产地为广东省或周边地区，具备完整质检报告，可提供溯源证明。优先考虑有长期合作意愿的规模化供应商。",
  quantity: "120吨/月",
  city: "佛山市",
  deadline: "2026-01-20",
  buyer: "佛山某养殖合作社",
  budget: "面议",
  deliveryPeriod: "2026-02-01 至 2026-12-31",
  prepayRatio: "20%",
  quoteMode: "可以修改报价",
  tradeMode: "担保交易",
  deliveryMethod: "卖家配送",
  settlement: "建行龙存管",
  contact: "张总",
  phone: "137****5555",
  remark: "需提供近三个月内的质检报告，可安排实地考察。",
  publishTime: "2025-12-30 09:15",
  quoteCount: 0,
}

const demandProduct = {
  id: "DD20251230006",
  title: "优质大米（糙米）批量采购需求",
  status: "报价中",
  category: "粮油",
  contentType: "product" as const,
  publishType: "公开发布",
  product: {
    name: "丝苗米",
    category: "粮油类/大米类/籼米",
    spec: "25kg/袋",
    quantity: "50吨",
    priceRange: "2800～3000元/吨",
    qualityStd: "GB/T 1354 大米，整精米率≥65%，含水量≤14%，无霉变，需提供质检报告。",
  },
  city: "广州市",
  deadline: "2026-01-15",
  buyer: "广州某食品有限公司",
  budget: "18万元",
  deliveryPeriod: "2026-01-01 至 2026-03-01",
  prepayRatio: "30%",
  quoteMode: "可以修改报价",
  tradeMode: "担保交易",
  deliveryMethod: "卖家配送",
  settlement: "建行龙存管",
  contact: "李经理",
  phone: "138****8888",
  remark: "需要提供完整的质检报告和产地证明，到货后5个工作日内完成验收。",
  publishTime: "2025-12-30 14:22",
  quoteCount: 3,
}

const statusColor: Record<string, string> = {
  "报价中": "bg-[#fff3e0] text-[#e8831a] border-[#ffd8a8]",
  "需求发布": "bg-[#e3f2fd] text-[#1565c0] border-[#bbdefb]",
  "已签约": "bg-[#e8f5e9] text-[#2e7d32] border-[#c8e6c9]",
  "履约中": "bg-[#f3e5f5] text-[#7b1fa2] border-[#e1bee7]",
  "已完成": "bg-[#f5f5f5] text-[#757575] border-[#e0e0e0]",
}

function XqDetailContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") === "product" ? "product" : "desc"
  const demand = type === "product" ? demandProduct : demandDesc

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
      <SiteHeader />
      <div className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-6">
        <div className="flex items-center gap-1.5 text-[13px] text-[#999] mb-5">
          <Link href="/portal" className="hover:text-[#1a5fa8]">首页</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/portal/dingdan-nongye" className="hover:text-[#1a5fa8]">订单农业服务</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1a5fa8]">需求详情</span>
        </div>

        <div className="flex gap-5">
          <div className="flex-1 space-y-4">
            {/* Title card */}
            <div className="bg-white rounded border border-[#e8edf5] p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 text-[12px] rounded border font-medium ${statusColor[demand.status]}`}>{demand.status}</span>
                  <span className="px-2 py-0.5 text-[12px] rounded border border-[#dde3ec] text-[#666] bg-[#f8f9fb]">{demand.category}</span>
                  <span className="text-[13px] text-[#999]">{demand.id}</span>
                </div>
                <span className="text-[12px] text-[#999] shrink-0">发布时间：{demand.publishTime}</span>
              </div>
              <h1 className="text-[20px] font-bold text-[#1a2a3a] mb-4">{demand.title}</h1>
              <div className="flex items-center gap-5 flex-wrap text-[13px] text-[#666]">
                {demand.contentType === "product"
                  ? <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5 text-[#1a5fa8]" /> 采购量：{(demand as typeof demandProduct).product.quantity}</span>
                  : <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5 text-[#1a5fa8]" /> 采购量：{(demand as typeof demandDesc).quantity}</span>
                }
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#1a5fa8]" /> {demand.city}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#1a5fa8]" /> 截止：{demand.deadline}</span>
                <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-[#1a5fa8]" /> 买方：{demand.buyer}</span>
              </div>
            </div>

            {/* Main content: product table OR description */}
            {demand.contentType === "product" ? (
              <div className="bg-white rounded border border-[#e8edf5] p-6">
                <h2 className="text-[15px] font-semibold text-[#1a2a3a] mb-5 flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#1a5fa8] rounded-full inline-block" />商品信息
                </h2>
                {/* Header info */}
                <div className="flex items-center gap-3 mb-4 p-3 bg-[#f5f8ff] rounded border border-[#dce8f8]">
                  <div className="w-8 h-8 rounded-full bg-[#dce8f8] flex items-center justify-center shrink-0">
                    <Package className="w-4 h-4 text-[#1a5fa8]" />
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-[#1a2a3a]">{demand.title}</div>
                    <div className="text-[12px] text-[#888]">{demand.buyer}</div>
                  </div>
                </div>
                {/* Product table */}
                <div className="border border-[#e8edf5] rounded overflow-hidden mb-5">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="bg-[#f5f7fa] border-b border-[#e8edf5]">
                        <th className="text-left px-4 py-2.5 text-[#555] font-medium w-20">商品图片</th>
                        <th className="text-left px-4 py-2.5 text-[#555] font-medium">商品名称</th>
                        <th className="text-left px-4 py-2.5 text-[#555] font-medium">平台分类</th>
                        <th className="text-left px-4 py-2.5 text-[#555] font-medium">规格</th>
                        <th className="text-left px-4 py-2.5 text-[#555] font-medium">计划采购量（单位）</th>
                        <th className="text-left px-4 py-2.5 text-[#555] font-medium">收购价区间（单位）</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="px-4 py-4">
                          <div className="w-14 h-14 bg-[#f0f3f8] border border-[#e8edf5] rounded flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-[#bbb]" />
                          </div>
                        </td>
                        <td className="px-4 py-4 font-medium text-[#1a2a3a]">{(demand as typeof demandProduct).product.name}</td>
                        <td className="px-4 py-4 text-[#666]">{(demand as typeof demandProduct).product.category}</td>
                        <td className="px-4 py-4 text-[#666]">{(demand as typeof demandProduct).product.spec}</td>
                        <td className="px-4 py-4 font-semibold text-[#1a5fa8]">{(demand as typeof demandProduct).product.quantity}</td>
                        <td className="px-4 py-4 font-semibold text-[#e8831a]">{(demand as typeof demandProduct).product.priceRange}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Extra fields below table */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {[
                    { label: "期望收货周期", value: demand.deliveryPeriod },
                    { label: "报价截止时间", value: demand.deadline + " 23:59:59" },
                    { label: "报价模式", value: demand.quoteMode },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-2">
                      <span className="text-[13px] text-[#888] w-28 shrink-0">{item.label}</span>
                      <span className="text-[13px] text-[#333] font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-start gap-2">
                  <span className="text-[13px] text-[#888] w-28 shrink-0">收购标准</span>
                  <span className="text-[13px] text-[#333]">{(demand as typeof demandProduct).product.qualityStd}</span>
                </div>
                <div className="mt-3 flex items-start gap-2">
                  <span className="text-[13px] text-[#888] w-28 shrink-0">备注说明</span>
                  <span className="text-[13px] text-[#333]">{demand.remark}</span>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded border border-[#e8edf5] p-6">
                <h2 className="text-[15px] font-semibold text-[#1a2a3a] mb-5 flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#1a5fa8] rounded-full inline-block" />需求内容
                </h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-5">
                  {[
                    { label: "发布方式", value: demand.publishType },
                    { label: "采购量", value: (demand as typeof demandDesc).quantity },
                    { label: "预算金额", value: demand.budget },
                    { label: "期望收货时间", value: demand.deliveryPeriod },
                    { label: "报价截止日期", value: demand.deadline },
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
                <div className="border-t border-[#f0f3f8] pt-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-[13px] text-[#888] w-24 shrink-0">需求描述</span>
                    <p className="text-[13px] text-[#333] leading-relaxed flex-1">{(demand as typeof demandDesc).description}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[13px] text-[#888] w-24 shrink-0">备注说明</span>
                    <p className="text-[13px] text-[#333] flex-1">{demand.remark}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Contact info */}
            <div className="bg-white rounded border border-[#e8edf5] p-6">
              <h2 className="text-[15px] font-semibold text-[#1a2a3a] mb-5 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#1a5fa8] rounded-full inline-block" />买方联系人信息
              </h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {[
                  { label: "联系人姓名", value: demand.contact },
                  { label: "联系电话", value: demand.phone },
                  { label: "采购单位", value: demand.buyer },
                  { label: "所在城市", value: demand.city },
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
                <div className="text-[28px] font-bold text-[#e8831a]">{demand.budget}</div>
                <div className="text-[12px] text-[#888]">预算金额</div>
              </div>
              <div className="text-center mb-4">
                <div className="text-[28px] font-bold text-[#1a5fa8]">{demand.quoteCount}</div>
                <div className="text-[12px] text-[#888]">家供应商已报价</div>
              </div>
              <Link href="/portal/dingdan-nongye/gongying-baojia"
                className="block w-full py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold text-center rounded hover:bg-[#0d4a8a] transition-colors mb-2">
                立即报价
              </Link>
              <button className="w-full py-2.5 border border-[#1a5fa8] text-[#1a5fa8] text-[14px] rounded hover:bg-[#f0f7ff] transition-colors">
                联系买方
              </button>
            </div>

            <div className="bg-white rounded border border-[#e8edf5] p-4">
              <h3 className="text-[13px] font-semibold text-[#1a2a3a] mb-3 flex items-center gap-1.5">
                <span className="w-1 h-3.5 bg-[#1a5fa8] rounded-full inline-block" />关键信息
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Clock, label: "报价截止", value: demand.deadline },
                  { icon: Calendar, label: "收货时间", value: demand.deliveryPeriod.split(" ")[0] },
                  { icon: CreditCard, label: "预付款", value: demand.prepayRatio },
                  { icon: Truck, label: "配送方式", value: demand.deliveryMethod },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-2">
                    <item.icon className="w-3.5 h-3.5 text-[#1a5fa8] mt-0.5 shrink-0" />
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
                <span className="w-1 h-3.5 bg-[#1a5fa8] rounded-full inline-block" />相似需求
              </h3>
              <div className="space-y-2.5">
                {[
                  { title: "非转基因大豆采购", budget: "12万元", status: "已签约", type: "desc" },
                  { title: "优质蔬菜批量采购", budget: "8万元", status: "报价中", type: "product" },
                  { title: "有机水果直采合作", budget: "面议", status: "需求发布", type: "desc" },
                ].map((item, i) => (
                  <Link key={i} href={`/portal/dingdan-nongye/xq-detail?type=${item.type}`}
                    className="block p-2.5 rounded border border-[#f0f3f8] hover:border-[#1a5fa8] transition-colors">
                    <div className="text-[12px] text-[#333] font-medium leading-snug mb-1 line-clamp-1">{item.title}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#e8831a] font-semibold">{item.budget}</span>
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

export default function XqDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f7fa]" />}>
      <XqDetailContent />
    </Suspense>
  )
}
