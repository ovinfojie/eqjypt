"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, FileText, TrendingUp, ShoppingCart,
  Package, Users, Settings, ChevronRight, ArrowLeft,
  MessageSquare, ChevronDown, Handshake, Star, Gavel, Link2, ShieldCheck,
  Building2, Layers, ClipboardList, FileSignature, Wallet, Gift, UserCircle,
} from "lucide-react"
import { useState } from "react"

const menuGroups = [
  {
    label: "工作台",
    items: [
      { label: "工作台", href: "/merchant", icon: LayoutDashboard },
    ],
  },
  {
    label: "商品管理",
    items: [
      { label: "商品基础档案", href: "/merchant/product/archive", icon: Package },
      { label: "新增商品",     href: "/merchant/product/add",     icon: Package },
      { label: "库存管理",     href: "/merchant/product/stock",   icon: Layers },
    ],
  },
  {
    label: "交易订单",
    items: [
      { label: "我的采购订单", href: "/merchant/trade/caigou-orders",  icon: ShoppingCart },
      { label: "我的销售订单", href: "/merchant/trade/xiaoshou-orders", icon: ClipboardList },
      { label: "批次验收",     href: "/merchant/trade/batch-accept",   icon: ClipboardList },
    ],
  },
  {
    label: "供销严选",
    items: [
      {
        label: "供销严选", icon: Star,
        children: [
          { label: "我的商品", href: "/merchant/yanxuan/shangpin-list" },
          { label: "发布商品", href: "/merchant/yanxuan/fabu-shangpin" },
        ],
      },
    ],
  },
  {
    label: "集采专区",
    items: [
      { label: "集采活动",   href: "/merchant/jicai/huodong-list", icon: Layers },
      { label: "发布集采",   href: "/merchant/jicai/fabu",         icon: ClipboardList },
      { label: "集采统单",   href: "/merchant/jicai/tongdan",      icon: ClipboardList },
    ],
  },
  {
    label: "竞价交易",
    items: [
      {
        label: "竞价交易", icon: Gavel,
        children: [
          { label: "我参与的竞拍", href: "/merchant/jingjia/wo-canjia" },
          { label: "我发布的竞拍", href: "/merchant/jingjia/wo-fabu" },
          { label: "中标通知书",   href: "/merchant/jingjia/win-notice" },
          { label: "保证金管理",   href: "/merchant/jingjia/deposit" },
        ],
      },
    ],
  },
  {
    label: "产销对接",
    items: [
      {
        label: "采购管理", icon: ShoppingCart,
        children: [
          { label: "我的采购需求", href: "/merchant/chanxiao/caigou-list" },
          { label: "发布采购需求", href: "/merchant/chanxiao/fabu-caigou" },
        ],
      },
      {
        label: "销售管理", icon: Handshake,
        children: [
          { label: "我的销售信息", href: "/merchant/chanxiao/xiaoshou-list" },
          { label: "发布销售信息", href: "/merchant/chanxiao/fabu-xiaoshou" },
        ],
      },
      { label: "订单管理", href: "/merchant/chanxiao/orders", icon: ClipboardList },
    ],
  },
  {
    label: "订单农业",
    items: [
      { label: "订单种植需求", href: "/merchant/dingdan-nongye/xq-list",   icon: FileText },
      { label: "订单种植供应", href: "/merchant/dingdan-nongye/gy-list",   icon: TrendingUp },
      {
        label: "询报价管理", icon: MessageSquare,
        children: [
          { label: "我发起的", href: "/merchant/xunbaojia/wo-faqide" },
          { label: "我收到的", href: "/merchant/xunbaojia/wo-shoudaode" },
        ],
      },
      { label: "提交订单", href: "/merchant/xiadan", icon: ShoppingCart },
    ],
  },
  {
    label: "合同管理",
    items: [
      { label: "合同列表", href: "/merchant/contract/list", icon: FileSignature },
    ],
  },
  {
    label: "全产业链服务",
    items: [
      {
        label: "全产业链服务", icon: Link2,
        children: [
          { label: "我的服务", href: "/merchant/quancyl/wo-de-fuwu" },
          { label: "申请入驻", href: "/merchant/quancyl/shenqing" },
        ],
      },
    ],
  },
  {
    label: "农业信用服务",
    items: [
      {
        label: "农业信用", icon: ShieldCheck,
        children: [
          { label: "我的信用档案", href: "/merchant/xinyong/dangan" },
          { label: "申请金融授信", href: "/merchant/xinyong/shenqing" },
        ],
      },
    ],
  },
  {
    label: "财务管理",
    items: [
      { label: "结算与对账",   href: "/merchant/finance/settlement",     icon: Wallet },
      { label: "发票申请管理", href: "/merchant/finance/invoice-apply",  icon: FileText },
      { label: "发票抬头管理", href: "/merchant/finance/invoice-header", icon: FileText },
    ],
  },
  {
    label: "会员管理",
    items: [
      { label: "客户列表", href: "/merchant/member/list", icon: Users },
    ],
  },
  {
    label: "营销管理",
    items: [
      { label: "营销权益总览", href: "/merchant/marketing/overview", icon: Gift },
      { label: "红包管理",     href: "/merchant/marketing/hongbao",  icon: Gift },
      { label: "卡券管理",     href: "/merchant/marketing/coupon",   icon: Gift },
      { label: "积分管理",     href: "/merchant/marketing/points",   icon: Gift },
    ],
  },
  {
    label: "企业与账号",
    items: [
      { label: "企业信息",   href: "/merchant/enterprise/info",  icon: Building2 },
      { label: "员工管理",   href: "/merchant/enterprise/staff", icon: Users },
      { label: "子商户管理", href: "/merchant/enterprise/sub",   icon: Users },
      { label: "角色权限",   href: "/merchant/enterprise/roles", icon: Settings },
      { label: "账号信息",   href: "/merchant/account/info",     icon: UserCircle },
      { label: "签章认证",   href: "/merchant/account/seal-cert", icon: ShieldCheck },
      { label: "商户设置",   href: "/merchant/settings",          icon: Settings },
    ],
  },
]

export function MerchantLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["询报价管理", "采购管理", "销售管理", "供销严选", "竞价交易", "全产业链服务", "农业信用"])

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
      {/* Top nav bar */}
      <header className="bg-[#1a5fa8] h-12 flex items-center px-6 gap-4 shrink-0">
        <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white text-[13px] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          总控台
        </Link>
        <span className="text-white/30">|</span>
        <span className="text-white font-semibold text-[14px]">商家中心</span>
        <span className="ml-auto text-[12px] text-white/50">盒马超市采购部（no.122438）</span>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-52 bg-white border-r border-[#dde3ec] shrink-0">
          <div className="p-4">
            {menuGroups.map((group) => (
              <div key={group.label} className="mb-4">
                <div className="text-[11px] font-semibold text-[#999] uppercase tracking-wide px-2 mb-1.5">
                  {group.label}
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon
                    // Item with children (expandable group)
                    if ("children" in item && item.children) {
                      const isExpanded = expandedGroups.includes(item.label)
                      const isChildActive = item.children.some((c) => pathname.startsWith(c.href))
                      return (
                        <div key={item.label}>
                          <button
                            onClick={() => toggleGroup(item.label)}
                            className={cn(
                              "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors",
                              isChildActive
                                ? "bg-[#e8f4fd] text-[#1a5fa8] font-semibold"
                                : "text-[#444] hover:bg-[#f5f7fa] hover:text-[#1a5fa8]"
                            )}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="flex-1 text-left">{item.label}</span>
                            <ChevronDown className={cn(
                              "w-3.5 h-3.5 transition-transform",
                              isExpanded ? "rotate-180" : ""
                            )} />
                          </button>
                          {isExpanded && (
                            <div className="ml-4 mt-0.5 space-y-0.5 border-l-2 border-[#dde3ec] pl-2">
                              {item.children.map((child) => {
                                const isActive = pathname.startsWith(child.href)
                                return (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className={cn(
                                      "flex items-center gap-2 px-2.5 py-1.5 rounded text-[13px] transition-colors",
                                      isActive
                                        ? "text-[#1a5fa8] font-semibold bg-[#e8f4fd]"
                                        : "text-[#555] hover:text-[#1a5fa8] hover:bg-[#f5f7fa]"
                                    )}
                                  >
                                    <span className="w-1 h-1 rounded-full bg-current shrink-0" />
                                    {child.label}
                                  </Link>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    }
                    // Regular item
                    const isActive = pathname === (item as { href: string }).href
                    const badge = (item as { badge?: number }).badge
                    return (
                      <Link
                        key={(item as { href: string }).href}
                        href={(item as { href: string }).href}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors",
                          isActive
                            ? "bg-[#e8f4fd] text-[#1a5fa8] font-semibold"
                            : "text-[#444] hover:bg-[#f5f7fa] hover:text-[#1a5fa8]"
                        )}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="flex-1">{item.label}</span>
                        {badge ? (
                          <span className="w-4 h-4 rounded-full bg-[#e8831a] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                            {badge}
                          </span>
                        ) : isActive ? (
                          <ChevronRight className="w-3 h-3 ml-auto text-[#1a5fa8]" />
                        ) : null}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
