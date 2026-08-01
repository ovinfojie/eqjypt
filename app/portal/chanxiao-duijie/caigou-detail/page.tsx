"use client"

import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ChevronRight, MapPin, Calendar, Eye, MessageCircle, Phone, FileText, Package, Truck, CreditCard, ShieldCheck } from "lucide-react"

const detail = {
  id: "CG20260601001",
  status: "采购中",
  category: "粮油",
  title: "2026年广东省大批量优质丝苗米长期采购",
  buyer: "广州荣食品有限公司",
  buyerNo: "no.112233",
  publishTime: "2026-06-01 10:32",
  deadline: "2026-06-30",
  city: "广州市",
  views: 238,
  inquiries: 12,
  /* 需求内容 */
  qty: "50吨",
  unit: "吨",
  budget: "18万元",
  deliveryStart: "2026-07-01",
  deliveryEnd: "2026-07-31",
  quoteMode: "可以修改报价",
  tradeMode: "担保交易",
  deliveryMethod: "买家自提 / 卖家配送均可",
  settlement: "建行龙存管",
  depositRatio: "30%",
  /* 描述 */
  desc: "要求粒粒整齐，含水量≤14%，整精米率≥65%，要求有绿色食品认证。需提供质检报告及产地溯源证明，支持实地考察。",
  qualityStd: "GB/T 1354 大米三等及以上，水分≤14.5%，整精米率≥65%。",
  remark: "需求方长期稳定合作意向，优先考虑有供销社背景的供应商，可分批交货。",
  /* 联系人 */
  contact: "张经理",
  phone: "138****8888",
  dept: "采购部",
}

const similar = [
  { id: "CG20260601002", title: "饲料用玉米大批量长期采购", city: "佛山市", qty: "120吨/月", status: "采购中" },
  { id: "CG20260601003", title: "非转基因大豆采购", city: "深圳市", qty: "30吨", status: "已完成" },
  { id: "CG20260601004", title: "有机蔬菜长期稳定供货", city: "广州市", qty: "500公斤/天", status: "采购中" },
]

const statusColor: Record<string, { text: string; bg: string }> = {
  "采购中": { text: "#1a5fa8", bg: "#e8f4fd" },
  "已完成": { text: "#6b7c93", bg: "#f0f2f5" },
  "即将结束": { text: "#e8831a", bg: "#fff4e6" },
}

export default function CaigouDetailPage() {
  const sc = statusColor[detail.status] ?? statusColor["采购中"]

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-[#e8edf5]">
          <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center gap-1.5 text-[13px] text-[#888]">
            <Link href="/portal" className="hover:text-[#1a5fa8]">首页</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/portal/chanxiao-duijie" className="hover:text-[#1a5fa8]">产销对接</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#333]">采购信息详情</span>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 py-6 flex gap-6 items-start">
          {/* ── Left: main content ── */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Header card */}
            <div className="bg-white rounded-xl border border-[#e8edf5] p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded text-[12px] font-semibold" style={{ color: sc.text, background: sc.bg }}>
                  {detail.status}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#f0f2f5] text-[#666] text-[12px]">{detail.category}</span>
                <span className="text-[12px] text-[#bbb]">{detail.id}</span>
              </div>
              <h1 className="text-[22px] font-bold text-[#1a1a2e] mb-3 leading-snug">{detail.title}</h1>
              <div className="flex items-center gap-6 text-[13px] text-[#888]">
                <span className="font-medium text-[#555]">{detail.buyer}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{detail.city}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />发布：{detail.publishTime}</span>
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{detail.views} 次浏览</span>
                <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" />{detail.inquiries} 家报价</span>
              </div>
            </div>

            {/* Requirement details */}
            <div className="bg-white rounded-xl border border-[#e8edf5] p-6">
              <h2 className="text-[15px] font-semibold text-[#333] mb-4 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#1a5fa8]" />采购需求
              </h2>
              <div className="grid grid-cols-3 gap-x-8 gap-y-4 text-[13px]">
                {[
                  { label: "采购数量", value: detail.qty },
                  { label: "预算金额", value: detail.budget },
                  { label: "截止日期", value: detail.deadline },
                  { label: "期望交货期", value: `${detail.deliveryStart} 至 ${detail.deliveryEnd}` },
                  { label: "预付款比例", value: detail.depositRatio },
                  { label: "报价模式", value: detail.quoteMode },
                  { label: "交易模式", value: detail.tradeMode },
                  { label: "配送方式", value: detail.deliveryMethod },
                  { label: "结算渠道", value: detail.settlement },
                ].map((f) => (
                  <div key={f.label}>
                    <div className="text-[#999] mb-0.5">{f.label}</div>
                    <div className="text-[#333] font-medium">{f.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality & description */}
            <div className="bg-white rounded-xl border border-[#e8edf5] p-6">
              <h2 className="text-[15px] font-semibold text-[#333] mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1a5fa8]" />质量标准与需求描述
              </h2>
              <div className="space-y-4 text-[13px]">
                <div>
                  <div className="text-[#999] mb-1">收购标准</div>
                  <div className="text-[#333] bg-[#f8f9fc] rounded-lg p-3">{detail.qualityStd}</div>
                </div>
                <div>
                  <div className="text-[#999] mb-1">需求描述</div>
                  <div className="text-[#333] bg-[#f8f9fc] rounded-lg p-3 leading-relaxed">{detail.desc}</div>
                </div>
                <div>
                  <div className="text-[#999] mb-1">备注说明</div>
                  <div className="text-[#333] bg-[#f8f9fc] rounded-lg p-3">{detail.remark}</div>
                </div>
              </div>
            </div>

            {/* Transaction terms */}
            <div className="bg-white rounded-xl border border-[#e8edf5] p-6">
              <h2 className="text-[15px] font-semibold text-[#333] mb-4 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#1a5fa8]" />交易条款
              </h2>
              <div className="grid grid-cols-2 gap-4 text-[13px]">
                {[
                  { label: "交易模式", value: detail.tradeMode, icon: ShieldCheck },
                  { label: "配送方式", value: detail.deliveryMethod, icon: Truck },
                  { label: "结算渠道", value: detail.settlement, icon: CreditCard },
                  { label: "预付款比例", value: detail.depositRatio, icon: FileText },
                ].map((t) => {
                  const Icon = t.icon
                  return (
                    <div key={t.label} className="flex items-start gap-3 p-3 bg-[#f8f9fc] rounded-lg">
                      <Icon className="w-4 h-4 text-[#1a5fa8] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[#999]">{t.label}</div>
                        <div className="text-[#333] font-medium mt-0.5">{t.value}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-xl border border-[#e8edf5] p-6">
              <h2 className="text-[15px] font-semibold text-[#333] mb-4 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#1a5fa8]" />买方联系信息
              </h2>
              <div className="flex items-center gap-8 text-[13px]">
                <div>
                  <div className="text-[#999] mb-0.5">联系人</div>
                  <div className="text-[#333] font-medium">{detail.contact}</div>
                </div>
                <div>
                  <div className="text-[#999] mb-0.5">所属部门</div>
                  <div className="text-[#333] font-medium">{detail.dept}</div>
                </div>
                <div>
                  <div className="text-[#999] mb-0.5">联系电话</div>
                  <div className="text-[#333] font-medium">{detail.phone}</div>
                </div>
                <div>
                  <div className="text-[#999] mb-0.5">买方单位</div>
                  <div className="text-[#333] font-medium">{detail.buyer}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="w-[280px] shrink-0 space-y-4">
            {/* Action card */}
            <div className="bg-white rounded-xl border border-[#e8edf5] p-5">
              <div className="text-center mb-4">
                <div className="text-[28px] font-bold text-[#e8831a]">{detail.budget}</div>
                <div className="text-[12px] text-[#999]">预算金额</div>
              </div>
              <div className="flex justify-between text-center mb-5 py-3 border-t border-b border-[#f0f2f5]">
                <div>
                  <div className="text-[18px] font-semibold text-[#333]">{detail.inquiries}</div>
                  <div className="text-[11px] text-[#999]">已有报价</div>
                </div>
                <div>
                  <div className="text-[18px] font-semibold text-[#333]">{detail.views}</div>
                  <div className="text-[11px] text-[#999]">浏览次数</div>
                </div>
                <div>
                  <div className="text-[18px] font-semibold text-[#333]">{detail.qty}</div>
                  <div className="text-[11px] text-[#999]">采购量</div>
                </div>
              </div>
              <Link
                href="/portal/chanxiao-duijie/baojia-form"
                className="block w-full text-center py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded-lg hover:bg-[#0d4a8a] transition-colors mb-2"
              >
                立即报价
              </Link>
              <button className="w-full py-2.5 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded-lg hover:bg-[#e8f4fd] transition-colors">
                联系买方
              </button>
            </div>

            {/* Key info */}
            <div className="bg-white rounded-xl border border-[#e8edf5] p-5">
              <div className="text-[13px] font-semibold text-[#333] mb-3">关键信息</div>
              <div className="space-y-2.5 text-[12px]">
                {[
                  { label: "报价截止", value: detail.deadline },
                  { label: "交货城市", value: detail.city },
                  { label: "预付款", value: detail.depositRatio },
                  { label: "报价模式", value: detail.quoteMode },
                ].map((k) => (
                  <div key={k.label} className="flex justify-between">
                    <span className="text-[#999]">{k.label}</span>
                    <span className="text-[#333] font-medium">{k.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar */}
            <div className="bg-white rounded-xl border border-[#e8edf5] p-5">
              <div className="text-[13px] font-semibold text-[#333] mb-3">相似采购</div>
              <div className="space-y-3">
                {similar.map((s) => {
                  const sc2 = statusColor[s.status] ?? statusColor["采购中"]
                  return (
                    <Link key={s.id} href={`/portal/chanxiao-duijie/caigou-detail?id=${s.id}`} className="block group">
                      <div className="text-[12px] font-medium text-[#333] group-hover:text-[#1a5fa8] line-clamp-2 mb-1">{s.title}</div>
                      <div className="flex items-center gap-2 text-[11px] text-[#999]">
                        <span>{s.city}</span>
                        <span>{s.qty}</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px]" style={{ color: sc2.text, background: sc2.bg }}>{s.status}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
