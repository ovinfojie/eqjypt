"use client"

import Link from "next/link"
import {
  Users, Package, BarChart2, TrendingUp, ShoppingCart,
  ClipboardList, AlertCircle, CheckCircle, Clock, ArrowRight,
  Gavel, Star, FileText, ShieldCheck,
} from "lucide-react"

const stats = [
  { label: "平台注册企业", value: "3,847",  unit: "家", color: "#1a5fa8", bg: "#e8f4fd",  delta: "+12 今日" },
  { label: "本月成交订单", value: "12,360", unit: "单", color: "#2e7d32", bg: "#e8f5e9",  delta: "+284 今日" },
  { label: "本月成交金额", value: "¥4.2亿", unit: "",   color: "#b45309", bg: "#fff7ed",  delta: "+¥380万 今日" },
  { label: "待处理事项",   value: "38",     unit: "项", color: "#dc2626", bg: "#fef2f2",  delta: "需立即处理" },
]

const pending = [
  { label: "商品待审核",   count: 8,  href: "/admin/yanxuan/shangpin-shenhe", color: "#1a5fa8" },
  { label: "供应商待审核", count: 3,  href: "/admin/yanxuan/supplier-shenhe", color: "#7c3aed" },
  { label: "询价待审核",   count: 5,  href: "/admin/xunjia-list",             color: "#e8831a" },
  { label: "补贴申请待审", count: 12, href: "/admin/butie/shenhe",            color: "#dc2626" },
  { label: "会员升级待审", count: 6,  href: "/admin/member/upgrade",          color: "#0891b2" },
  { label: "合作申请待审", count: 4,  href: "/admin/kaifang-hezuo/shenhe",    color: "#2e7d32" },
]

const shortcuts = [
  { label: "产地管理",     href: "/admin/yanxuan/chandi-list",      icon: Star,          color: "#1a5fa8" },
  { label: "价格指数",     href: "/admin/jiage/index-list",          icon: TrendingUp,    color: "#2e7d32" },
  { label: "竞拍管理",     href: "/admin/jingjia/session-list",      icon: Gavel,         color: "#7c3aed" },
  { label: "补贴管理",     href: "/admin/butie/list",                icon: ShoppingCart,  color: "#e8831a" },
  { label: "会员管理",     href: "/admin/member/list",               icon: Users,         color: "#0891b2" },
  { label: "财务结算",     href: "/admin/finance/settlement",        icon: BarChart2,     color: "#b45309" },
  { label: "营销管理",     href: "/admin/marketing/overview",        icon: Package,       color: "#dc2626" },
  { label: "平台配置",     href: "/admin/settings/params",          icon: ClipboardList, color: "#374151" },
]

const recentOrders = [
  { id: "PO2026080100123", buyer: "盒马超市采购部",     product: "台山丝苗米",  amt: "¥1,435.60", status: "待确认", statusColor: "#e8831a" },
  { id: "PO2026080100122", buyer: "广州粮食集团",       product: "玉米原粮",    amt: "¥82,500",   status: "配送中", statusColor: "#1a5fa8" },
  { id: "PO2026080100121", buyer: "永辉超市采购部",     product: "大米",        amt: "¥24,000",   status: "已完成", statusColor: "#2e7d32" },
  { id: "PO2026080100120", buyer: "华润万家广州",       product: "花生油",      amt: "¥56,000",   status: "已完成", statusColor: "#2e7d32" },
  { id: "PO2026080100119", buyer: "深圳农产品流通",     product: "冬瓜",        amt: "¥8,400",    status: "已取消", statusColor: "#999"    },
]

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-[#1a1a2e]">运营工作台</h1>
          <p className="text-[13px] text-[#6b7c93] mt-0.5">2026年8月2日 星期日 · 今日天气：广州 晴 32°C</p>
        </div>
        <Link href="/admin/jianchajiance" className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] text-white text-[13px] rounded hover:bg-[#2d2d4e] transition-colors">
          <BarChart2 className="w-4 h-4" />
          监察大屏
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-[#dde3ec] p-5">
            <div className="text-[13px] text-[#6b7c93] mb-2">{s.label}</div>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-[28px] font-bold leading-none" style={{ color: s.color }}>{s.value}</span>
              {s.unit && <span className="text-[13px] text-[#999] mb-0.5">{s.unit}</span>}
            </div>
            <div className="text-[12px]" style={{ color: s.color }}>{s.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Pending tasks */}
        <div className="bg-white rounded-xl border border-[#dde3ec] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-semibold text-[#1a1a2e] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#dc2626]" />待处理事项
            </h2>
          </div>
          <div className="space-y-2">
            {pending.map((p) => (
              <Link key={p.label} href={p.href} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#f5f7fa] transition-colors group">
                <span className="text-[13px] text-[#333] group-hover:text-[#1a5fa8]">{p.label}</span>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold text-white" style={{ backgroundColor: p.color }}>{p.count}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#ccc] group-hover:text-[#1a5fa8]" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="bg-white rounded-xl border border-[#dde3ec] p-5">
          <h2 className="text-[15px] font-semibold text-[#1a1a2e] mb-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#2e7d32]" />快捷入口
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {shortcuts.map((s) => {
              const Icon = s.icon
              return (
                <Link key={s.label} href={s.href} className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-[#f5f7fa] transition-colors">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.color + "18" }}>
                    <Icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <span className="text-[11px] text-[#555] text-center leading-tight">{s.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* System status */}
        <div className="bg-white rounded-xl border border-[#dde3ec] p-5">
          <h2 className="text-[15px] font-semibold text-[#1a1a2e] mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1a5fa8]" />系统状态
          </h2>
          <div className="space-y-3">
            {[
              { label: "API 服务",     status: "正常", ok: true  },
              { label: "数据库",       status: "正常", ok: true  },
              { label: "文件存储",     status: "正常", ok: true  },
              { label: "消息推送",     status: "正常", ok: true  },
              { label: "支付通道",     status: "正常", ok: true  },
              { label: "短信服务",     status: "降级", ok: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-[13px] text-[#555]">{item.label}</span>
                <span className={`flex items-center gap-1 text-[12px] font-medium ${item.ok ? "text-[#2e7d32]" : "text-[#e8831a]"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${item.ok ? "bg-[#2e7d32]" : "bg-[#e8831a]"}`} />
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-xl border border-[#dde3ec]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#dde3ec]">
          <h2 className="text-[15px] font-semibold text-[#1a1a2e] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#6b7c93]" />最新订单
          </h2>
          <Link href="/admin/dingdan-nongye/order-list" className="text-[13px] text-[#1a5fa8] hover:underline flex items-center gap-1">
            查看全部 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[#999] text-[12px] border-b border-[#f0f4f9]">
              {["订单号", "买家", "商品", "金额", "状态"].map(h => (
                <th key={h} className="px-5 py-2.5 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <tr key={o.id} className="border-b border-[#f0f4f9] last:border-0 hover:bg-[#fafbfc]">
                <td className="px-5 py-3 text-[#1a5fa8] font-medium">{o.id}</td>
                <td className="px-5 py-3 text-[#333]">{o.buyer}</td>
                <td className="px-5 py-3 text-[#555]">{o.product}</td>
                <td className="px-5 py-3 font-semibold text-[#b45309]">{o.amt}</td>
                <td className="px-5 py-3">
                  <span className="text-[12px] font-medium" style={{ color: o.statusColor }}>{o.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
