"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, FileText, TrendingUp, ShoppingCart,
  Package, Users, Settings, ChevronRight, ArrowLeft,
  MessageSquare, ChevronDown,
} from "lucide-react"
import { useState } from "react"

const menuGroups = [
  {
    label: "订单农业",
    items: [
      { label: "订单种植需求", href: "/merchant/dingdan-nongye/xq-list", icon: FileText },
      { label: "订单种植供应", href: "/merchant/dingdan-nongye/gy-list", icon: TrendingUp },
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
    label: "我的业务",
    items: [
      { label: "工作台", href: "/merchant", icon: LayoutDashboard },
      { label: "我的订单", href: "/merchant/orders", icon: Package },
      { label: "商品管理", href: "/merchant/products", icon: Package },
      { label: "企业信息", href: "/merchant/profile", icon: Users },
      { label: "账号设置", href: "/merchant/settings", icon: Settings },
    ],
  },
]

export function MerchantLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["询报价管理"])

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
                    const isActive = pathname === item.href
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
                        <span>{item.label}</span>
                        {isActive && <ChevronRight className="w-3 h-3 ml-auto text-[#1a5fa8]" />}
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
