"use client"

import Link from "next/link"
import {
  ShoppingCart, Package, TrendingUp, FileText, Gavel,
  Star, Users, AlertCircle, ChevronRight, ArrowUpRight,
  Clock, CheckCircle2, Truck, CreditCard,
} from "lucide-react"

const statCards = [
  { label: "待确认订单", value: 3,  unit: "笔", color: "#e8831a", bg: "#fff8f0", href: "/merchant/trade/caigou-orders?tab=pending_confirm", icon: Clock },
  { label: "待付款订单", value: 1,  unit: "笔", color: "#1a5fa8", bg: "#e8f4fd", href: "/merchant/trade/caigou-orders?tab=pending_payment", icon: CreditCard },
  { label: "配送中订单", value: 2,  unit: "笔", color: "#3a8c3f", bg: "#e8f5e9", href: "/merchant/trade/caigou-orders?tab=shipping", icon: Truck },
  { label: "待审核商品", value: 2,  unit: "件", color: "#7c3aed", bg: "#f3e8ff", href: "/merchant/yanxuan/shangpin-list?tab=pending", icon: Package },
  { label: "本月采购额", value: "¥68,240", unit: "", color: "#1a5fa8", bg: "#e8f4fd", href: "/merchant/trade/caigou-orders", icon: ShoppingCart },
  { label: "本月销售额", value: "¥32,180", unit: "", color: "#3a8c3f", bg: "#e8f5e9", href: "/merchant/trade/xiaoshou-orders", icon: TrendingUp },
]

const quickLinks = [
  { label: "发布采购需求",  href: "/merchant/chanxiao/fabu-caigou",          icon: ShoppingCart, color: "#1a5fa8", bg: "#e8f4fd" },
  { label: "发布销售信息",  href: "/merchant/chanxiao/fabu-xiaoshou",         icon: TrendingUp,   color: "#3a8c3f", bg: "#e8f5e9" },
  { label: "发布竞拍活动",  href: "/merchant/jingjia/wo-fabu",               icon: Gavel,        color: "#7c3aed", bg: "#f3e8ff" },
  { label: "上架供销严选",  href: "/merchant/yanxuan/fabu-shangpin",          icon: Star,         color: "#e8831a", bg: "#fff8f0" },
  { label: "发布订单农业",  href: "/merchant/dingdan-nongye/fabu-xq",         icon: FileText,     color: "#0891b2", bg: "#e0f7fa" },
  { label: "查看合同",      href: "/merchant/contract/list",                  icon: FileText,     color: "#6b7c93", bg: "#f5f7fa" },
]

const notices = [
  { type: "warning", text: "您有 1 份合同待签署，请尽快处理", time: "10分钟前" },
  { type: "info",    text: "订单 PO2026080100123 已被供应商确认，请及时付款",  time: "1小时前" },
  { type: "success", text: "商品「台山丝苗米」已通过审核，正式上架供销严选", time: "2小时前" },
  { type: "info",    text: "您参与的竞拍「第18期粮食专场」将于明日9:00开始",  time: "3小时前" },
  { type: "warning", text: "企业营业执照将于30天后到期，请提前更新资质",        time: "1天前" },
]

const noticeStyle: Record<string, { color: string; bg: string; dot: string }> = {
  warning: { color: "#e8831a", bg: "#fff8f0", dot: "#e8831a" },
  info:    { color: "#1a5fa8", bg: "#e8f4fd", dot: "#1a5fa8" },
  success: { color: "#3a8c3f", bg: "#e8f5e9", dot: "#3a8c3f" },
}

const recentOrders = [
  { no: "PO2026080100123", supplier: "广东供销农产品股份有限公司", amount: "¥1,435.60", status: "待确认", statusColor: "#e8831a" },
  { no: "PO2026073100098", supplier: "茂名荔枝产地直供中心",       amount: "¥1,324.00", status: "待付款", statusColor: "#1a5fa8" },
  { no: "PO2026072800076", supplier: "广东供销农产品股份有限公司", amount: "¥680.00",   status: "配送中", statusColor: "#3a8c3f" },
]

export default function MerchantDashboard() {
  return (
    <div className="space-y-5 max-w-[1100px]">
      {/* 欢迎栏 */}
      <div className="bg-[#1a5fa8] rounded-xl px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-white text-[18px] font-bold mb-0.5">欢迎回来，盒马超市采购部</h1>
          <p className="text-white/70 text-[13px]">企业编号：no.122438 · 认证企业 · 高级会员</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/merchant/account/info" className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-[13px] rounded-lg transition-colors">
            账号设置
          </Link>
          <Link href="/merchant/enterprise/info" className="px-4 py-2 bg-white text-[#1a5fa8] text-[13px] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            企业信息
          </Link>
        </div>
      </div>

      {/* 数据统计 */}
      <div className="grid grid-cols-6 gap-3">
        {statCards.map(c => {
          const Icon = c.icon
          return (
            <Link key={c.label} href={c.href}
              className="bg-white rounded-lg border border-[#e8edf5] p-4 hover:shadow-sm transition-shadow group">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: c.bg }}>
                  <Icon className="w-4 h-4" style={{ color: c.color }} />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#ccc] group-hover:text-[#1a5fa8] transition-colors" />
              </div>
              <div className="text-[20px] font-bold" style={{ color: c.color }}>{c.value}<span className="text-[12px] font-normal text-[#999] ml-0.5">{c.unit}</span></div>
              <div className="text-[12px] text-[#6b7c93] mt-0.5">{c.label}</div>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* 快捷操作 */}
        <div className="col-span-1 bg-white rounded-xl border border-[#e8edf5] p-5">
          <h2 className="text-[14px] font-semibold text-[#1a1a2e] mb-4">快捷操作</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {quickLinks.map(q => {
              const Icon = q.icon
              return (
                <Link key={q.label} href={q.href}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg border border-[#f0f4f8] hover:border-[#1a5fa8] hover:bg-[#f8faff] transition-all text-center group">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: q.bg }}>
                    <Icon className="w-4.5 h-4.5" style={{ color: q.color }} />
                  </div>
                  <span className="text-[12px] text-[#555] group-hover:text-[#1a5fa8]">{q.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* 消息通知 */}
        <div className="col-span-1 bg-white rounded-xl border border-[#e8edf5] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-semibold text-[#1a1a2e]">消息通知</h2>
            <span className="text-[12px] text-[#1a5fa8] hover:underline cursor-pointer">全部消息</span>
          </div>
          <div className="space-y-2.5">
            {notices.map((n, i) => {
              const s = noticeStyle[n.type]
              return (
                <div key={i} className="flex gap-2.5 p-2.5 rounded-lg" style={{ background: s.bg }}>
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: s.dot }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] leading-relaxed" style={{ color: s.color }}>{n.text}</p>
                    <p className="text-[11px] text-[#aaa] mt-0.5">{n.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 最近订单 */}
        <div className="col-span-1 bg-white rounded-xl border border-[#e8edf5] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-semibold text-[#1a1a2e]">最近订单</h2>
            <Link href="/merchant/trade/caigou-orders" className="text-[12px] text-[#1a5fa8] hover:underline flex items-center gap-0.5">
              查看全部 <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((o, i) => (
              <div key={i} className="pb-3 border-b border-[#f0f4f8] last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-mono text-[#1a5fa8]">{o.no}</span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded" style={{ color: o.statusColor, background: o.statusColor + "18" }}>{o.status}</span>
                </div>
                <div className="text-[12px] text-[#555]">{o.supplier}</div>
                <div className="text-[13px] font-bold text-[#e8831a] mt-0.5">{o.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
