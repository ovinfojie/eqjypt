"use client"

import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MapPin, Calendar, Building2, Package, FileText, Clock, CreditCard, Truck, ChevronRight } from "lucide-react"

const demand = {
  id: "DD20251230006",
  title: "优质大米（糙米）批量采购需求",
  status: "报价中",
  category: "粮油",
  publishType: "公开发布",
  description: "需求大粒稠米，含水量≤14%，整稻米率≥65%，要求有绿色食品认证。要求产地为广东省内，具备完善的质检报告，可提供溯源证明。优先考虑规模化农业合作社或专业农场。",
  quantity: "50吨",
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

const quotes = [
  { id: "BJ001", supplier: "惠州新供销天润供应链有限公司", price: "3.6元/斤", quantity: "50吨", totalAmt: "18万元", deliveryTime: "2026-02-01", qualityStd: "符合国标GB/T1350", status: "待确认", time: "2026-01-02 09:15" },
  { id: "BJ002", supplier: "广东天嘉冷链物流有限公司", price: "3.5元/斤", quantity: "50吨", totalAmt: "17.5万元", deliveryTime: "2026-01-28", qualityStd: "符合国标GB/T1350，有机认证", status: "待确认", time: "2026-01-03 11:30" },
  { id: "BJ003", supplier: "广东新供销丰水米业有限公司", price: "3.8元/斤", quantity: "50吨", totalAmt: "19万元", deliveryTime: "2026-02-05", qualityStd: "绿色食品认证，符合国标", status: "待确认", time: "2026-01-04 15:45" },
]

const statusColor: Record<string, string> = {
  "报价中": "bg-[#fff3e0] text-[#e8831a] border-[#ffd8a8]",
  "需求发布": "bg-[#e3f2fd] text-[#1565c0] border-[#bbdefb]",
  "已签约": "bg-[#e8f5e9] text-[#2e7d32] border-[#c8e6c9]",
  "履约中": "bg-[#f3e5f5] text-[#7b1fa2] border-[#e1bee7]",
  "已完成": "bg-[#f5f5f5] text-[#757575] border-[#e0e0e0]",
}

export default function XqDetailPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
      <SiteHeader />

      <div className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[13px] text-[#999] mb-5">
          <Link href="/portal" className="hover:text-[#1a5fa8]">首页</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/portal/dingdan-nongye" className="hover:text-[#1a5fa8]">订单农业服务</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1a5fa8]">需求详情</span>
        </div>

        <div className="flex gap-5">
          {/* Left main content */}
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
                <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5 text-[#1a5fa8]" /> 采购量：{demand.quantity}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#1a5fa8]" /> {demand.city}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#1a5fa8]" /> 截止：{demand.deadline}</span>
                <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-[#1a5fa8]" /> 买方：{demand.buyer}</span>
              </div>
            </div>

            {/* Demand details */}
            <div className="bg-white rounded border border-[#e8edf5] p-6">
              <h2 className="text-[15px] font-semibold text-[#1a2a3a] border-l-3 border-[#1a5fa8] pl-3 mb-5 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#1a5fa8] rounded-full inline-block"></span>需求内容
              </h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-5">
                {[
                  { label: "需求标题", value: demand.title },
                  { label: "发布方式", value: demand.publishType },
                  { label: "商品分类", value: demand.category },
                  { label: "采购数量", value: demand.quantity },
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
              <div className="border-t border-[#f0f3f8] pt-4">
                <div className="flex items-start gap-2">
                  <span className="text-[13px] text-[#888] w-24 shrink-0">需求描述</span>
                  <p className="text-[13px] text-[#333] leading-relaxed flex-1">{demand.description}</p>
                </div>
              </div>
              {demand.remark && (
                <div className="flex items-start gap-2 mt-3">
                  <span className="text-[13px] text-[#888] w-24 shrink-0">备注说明</span>
                  <p className="text-[13px] text-[#333] flex-1">{demand.remark}</p>
                </div>
              )}
            </div>

            {/* Contact info */}
            <div className="bg-white rounded border border-[#e8edf5] p-6">
              <h2 className="text-[15px] font-semibold text-[#1a2a3a] mb-5 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#1a5fa8] rounded-full inline-block"></span>买方联系人信息
              </h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-[#888] w-24 shrink-0">联系人姓名</span>
                  <span className="text-[13px] text-[#333] font-medium">{demand.contact}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-[#888] w-24 shrink-0">联系电话</span>
                  <span className="text-[13px] text-[#333] font-medium">{demand.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-[#888] w-24 shrink-0">采购单位</span>
                  <span className="text-[13px] text-[#333] font-medium">{demand.buyer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-[#888] w-24 shrink-0">所在城市</span>
                  <span className="text-[13px] text-[#333] font-medium">{demand.city}</span>
                </div>
              </div>
            </div>

            {/* Quote list */}
            <div className="bg-white rounded border border-[#e8edf5] p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[15px] font-semibold text-[#1a2a3a] flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#1a5fa8] rounded-full inline-block"></span>
                  供应商报价
                  <span className="ml-1 px-2 py-0.5 bg-[#1a5fa8] text-white text-[12px] rounded-full">{quotes.length}</span>
                </h2>
              </div>
              <div className="space-y-3">
                {quotes.map((q, i) => (
                  <div key={q.id} className={`border rounded p-4 ${i === 0 ? "border-[#e8831a] bg-[#fffdf8]" : "border-[#e8edf5]"}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        {i === 0 && <span className="inline-block px-2 py-0.5 bg-[#e8831a] text-white text-[11px] rounded mr-2">最优报价</span>}
                        <span className="text-[14px] font-semibold text-[#1a2a3a]">{q.supplier}</span>
                      </div>
                      <span className="text-[12px] text-[#999]">{q.time}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mb-3">
                      <div>
                        <div className="text-[12px] text-[#888] mb-0.5">报价单价</div>
                        <div className="text-[16px] font-bold text-[#e8831a]">{q.price}</div>
                      </div>
                      <div>
                        <div className="text-[12px] text-[#888] mb-0.5">供应数量</div>
                        <div className="text-[14px] font-semibold text-[#333]">{q.quantity}</div>
                      </div>
                      <div>
                        <div className="text-[12px] text-[#888] mb-0.5">总金额</div>
                        <div className="text-[14px] font-semibold text-[#333]">{q.totalAmt}</div>
                      </div>
                      <div>
                        <div className="text-[12px] text-[#888] mb-0.5">预计交货</div>
                        <div className="text-[14px] font-semibold text-[#333]">{q.deliveryTime}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[12px] text-[#666]">
                        <FileText className="w-3.5 h-3.5" />
                        质量标准：{q.qualityStd}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[12px] border border-[#dde3ec] rounded text-[#666]">{q.status}</span>
                        <button className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[12px] rounded hover:bg-[#0d4a8a] transition-colors">确认报价</button>
                        <button className="px-4 py-1.5 border border-[#dde3ec] text-[#666] text-[12px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">联系供应商</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right sidebar */}
          <div className="w-60 shrink-0 space-y-4">
            {/* Action card */}
            <div className="bg-white rounded border border-[#e8edf5] p-4">
              <div className="text-center mb-4">
                <div className="text-[28px] font-bold text-[#e8831a]">{demand.budget}</div>
                <div className="text-[12px] text-[#888]">预算金额</div>
              </div>
              <div className="text-center mb-4">
                <div className="text-[28px] font-bold text-[#1a5fa8]">{demand.quoteCount}</div>
                <div className="text-[12px] text-[#888]">家供应商已报价</div>
              </div>
              <Link
                href="/portal/dingdan-nongye/gongying-baojia"
                className="block w-full py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold text-center rounded hover:bg-[#0d4a8a] transition-colors mb-2"
              >
                立即报价
              </Link>
              <button className="w-full py-2.5 border border-[#1a5fa8] text-[#1a5fa8] text-[14px] rounded hover:bg-[#f0f7ff] transition-colors">
                联系买方
              </button>
            </div>

            {/* Key info */}
            <div className="bg-white rounded border border-[#e8edf5] p-4">
              <h3 className="text-[13px] font-semibold text-[#1a2a3a] mb-3 flex items-center gap-1.5">
                <span className="w-1 h-3.5 bg-[#1a5fa8] rounded-full inline-block"></span>关键信息
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Clock, label: "报价截止", value: demand.deadline },
                  { icon: Calendar, label: "收货时间", value: demand.deliveryPeriod },
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

            {/* Similar demands */}
            <div className="bg-white rounded border border-[#e8edf5] p-4">
              <h3 className="text-[13px] font-semibold text-[#1a2a3a] mb-3 flex items-center gap-1.5">
                <span className="w-1 h-3.5 bg-[#1a5fa8] rounded-full inline-block"></span>相似需求
              </h3>
              <div className="space-y-2.5">
                {[
                  { title: "饲料用玉米大批量长期采购", budget: "面议", status: "需求发布" },
                  { title: "非转基因大豆采购", budget: "12万元", status: "已签约" },
                  { title: "有机蔬菜批量供应合作", budget: "8万元", status: "报价中" },
                ].map((item, i) => (
                  <Link key={i} href="#" className="block p-2.5 rounded border border-[#f0f3f8] hover:border-[#1a5fa8] transition-colors">
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
