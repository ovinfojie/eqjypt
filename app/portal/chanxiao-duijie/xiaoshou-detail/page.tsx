"use client"

import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ChevronRight, MapPin, Calendar, Eye, MessageCircle, Phone, Package, Truck, CreditCard, ShieldCheck, Leaf } from "lucide-react"

const detail = {
  id: "XS20260601001",
  status: "销售中",
  category: "粮油",
  title: "2026年新产丰两优大米大量供应",
  seller: "韶关新供销天润粮油有限公司",
  sellerNo: "no.334455",
  publishTime: "2026-06-01 09:15",
  validUntil: "2026-08-31",
  city: "韶关市",
  views: 178,
  inquiries: 8,
  /* 供应信息 */
  qty: "300吨",
  unit: "吨",
  minOrder: "5吨",
  priceRange: "2.8~3.2元/斤",
  deliveryCycle: "签约后7天内发货",
  depositRatio: "20%",
  tradeMode: "担保交易",
  deliveryMethod: "卖家配送 / 买家自提",
  settlement: "建行龙存管",
  /* 商品信息 */
  productName: "丰两优大米",
  spec: "25kg/袋",
  qualityStd: "GB/T 1354 大米三等及以上，水分≤14%，整精米率≥70%，透明度好，无异味。",
  capacity: "年产能5万吨，自有种植基地2000亩，通过GAP认证",
  cert: "GAP认证、绿色食品认证",
  /* 描述 */
  desc: "自有种植基地，全程可追溯，含水量≤14%，整精米率≥70%，可提供质检报告及产地溯源证明，支持实地考察，欢迎大宗采购合作。",
  remark: "可分批发货，最小起订量5吨，量大价优，欢迎长期合作。",
  /* 联系人 */
  contact: "陈经理",
  phone: "136****6666",
  dept: "销售部",
}

const similar = [
  { id: "XS20260601002", title: "有机菜心、芥兰周年稳定供应", city: "清远市", qty: "2000公斤/天", status: "销售中" },
  { id: "XS20260601006", title: "花生油产地直供，量大从优", city: "揭阳市", qty: "100吨", status: "销售中" },
  { id: "XS20260601005", title: "土鸡蛋特价批量出售", city: "梅州市", qty: "5000枚/周", status: "即将结束" },
]

const statusColor: Record<string, { text: string; bg: string }> = {
  "销售中":   { text: "#3a8c3f", bg: "#f0fdf4" },
  "即将结束": { text: "#e8831a", bg: "#fff4e6" },
  "已完成":   { text: "#6b7c93", bg: "#f0f2f5" },
}

export default function XiaoshouDetailPage() {
  const sc = statusColor[detail.status] ?? statusColor["销售中"]

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
            <span className="text-[#333]">销售信息详情</span>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 py-6 flex gap-6 items-start">
          {/* ── Left ── */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Header */}
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
                <span className="font-medium text-[#555]">{detail.seller}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{detail.city}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />发布：{detail.publishTime}</span>
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{detail.views} 次浏览</span>
                <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" />{detail.inquiries} 家询价</span>
              </div>
            </div>

            {/* Product info */}
            <div className="bg-white rounded-xl border border-[#e8edf5] p-6">
              <h2 className="text-[15px] font-semibold text-[#333] mb-4 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#3a8c3f]" />商品信息
              </h2>
              <div className="grid grid-cols-3 gap-x-8 gap-y-4 text-[13px]">
                {[
                  { label: "商品名称", value: detail.productName },
                  { label: "商品规格", value: detail.spec },
                  { label: "可供应量", value: detail.qty },
                  { label: "最小起订量", value: detail.minOrder },
                  { label: "销售价格区间", value: detail.priceRange },
                  { label: "有效期至", value: detail.validUntil },
                  { label: "产能说明", value: detail.capacity },
                  { label: "认证资质", value: detail.cert },
                ].map((f) => (
                  <div key={f.label}>
                    <div className="text-[#999] mb-0.5">{f.label}</div>
                    <div className="text-[#333] font-medium">{f.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality & desc */}
            <div className="bg-white rounded-xl border border-[#e8edf5] p-6">
              <h2 className="text-[15px] font-semibold text-[#333] mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#3a8c3f]" />质量标准与供应描述
              </h2>
              <div className="space-y-4 text-[13px]">
                <div>
                  <div className="text-[#999] mb-1">质量标准</div>
                  <div className="text-[#333] bg-[#f8f9fc] rounded-lg p-3">{detail.qualityStd}</div>
                </div>
                <div>
                  <div className="text-[#999] mb-1">供应描述</div>
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
                <CreditCard className="w-4 h-4 text-[#3a8c3f]" />交易条款
              </h2>
              <div className="grid grid-cols-2 gap-4 text-[13px]">
                {[
                  { label: "交易模式", value: detail.tradeMode, icon: ShieldCheck },
                  { label: "配送方式", value: detail.deliveryMethod, icon: Truck },
                  { label: "结算渠道", value: detail.settlement, icon: CreditCard },
                  { label: "预付款比例", value: detail.depositRatio, icon: Package },
                  { label: "交货周期", value: detail.deliveryCycle, icon: Calendar },
                ].map((t) => {
                  const Icon = t.icon
                  return (
                    <div key={t.label} className="flex items-start gap-3 p-3 bg-[#f8f9fc] rounded-lg">
                      <Icon className="w-4 h-4 text-[#3a8c3f] shrink-0 mt-0.5" />
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
                <Phone className="w-4 h-4 text-[#3a8c3f]" />卖方联系信息
              </h2>
              <div className="flex items-center gap-8 text-[13px]">
                <div><div className="text-[#999] mb-0.5">联系人</div><div className="text-[#333] font-medium">{detail.contact}</div></div>
                <div><div className="text-[#999] mb-0.5">所属部门</div><div className="text-[#333] font-medium">{detail.dept}</div></div>
                <div><div className="text-[#999] mb-0.5">联系电话</div><div className="text-[#333] font-medium">{detail.phone}</div></div>
                <div><div className="text-[#999] mb-0.5">卖方单位</div><div className="text-[#333] font-medium">{detail.seller}</div></div>
              </div>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="w-[280px] shrink-0 space-y-4">
            <div className="bg-white rounded-xl border border-[#e8edf5] p-5">
              <div className="text-center mb-4">
                <div className="text-[22px] font-bold text-[#e8831a]">{detail.priceRange}</div>
                <div className="text-[12px] text-[#999]">销售价格区间</div>
              </div>
              <div className="flex justify-between text-center mb-5 py-3 border-t border-b border-[#f0f2f5]">
                <div>
                  <div className="text-[18px] font-semibold text-[#333]">{detail.inquiries}</div>
                  <div className="text-[11px] text-[#999]">已有询价</div>
                </div>
                <div>
                  <div className="text-[18px] font-semibold text-[#333]">{detail.views}</div>
                  <div className="text-[11px] text-[#999]">浏览次数</div>
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-[#333]">{detail.qty}</div>
                  <div className="text-[11px] text-[#999]">可供应量</div>
                </div>
              </div>
              <Link
                href="/portal/chanxiao-duijie/xunjia-form"
                className="block w-full text-center py-2.5 bg-[#3a8c3f] text-white text-[14px] font-semibold rounded-lg hover:bg-[#2d6e32] transition-colors mb-2"
              >
                立即询价
              </Link>
              <button className="w-full py-2.5 border border-[#3a8c3f] text-[#3a8c3f] text-[13px] rounded-lg hover:bg-[#f0fdf4] transition-colors">
                联系卖方
              </button>
            </div>

            <div className="bg-white rounded-xl border border-[#e8edf5] p-5">
              <div className="text-[13px] font-semibold text-[#333] mb-3">关键信息</div>
              <div className="space-y-2.5 text-[12px]">
                {[
                  { label: "有效期至", value: detail.validUntil },
                  { label: "供货城市", value: detail.city },
                  { label: "最小起订", value: detail.minOrder },
                  { label: "交货周期", value: detail.deliveryCycle },
                ].map((k) => (
                  <div key={k.label} className="flex justify-between">
                    <span className="text-[#999]">{k.label}</span>
                    <span className="text-[#333] font-medium">{k.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#e8edf5] p-5">
              <div className="text-[13px] font-semibold text-[#333] mb-3">相似供应</div>
              <div className="space-y-3">
                {similar.map((s) => {
                  const sc2 = statusColor[s.status] ?? statusColor["销售中"]
                  return (
                    <Link key={s.id} href={`/portal/chanxiao-duijie/xiaoshou-detail?id=${s.id}`} className="block group">
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
