"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, FileText, TrendingUp, ShoppingCart,
  Package, Users, Settings, ChevronRight, ArrowLeft,
} from "lucide-react"

const menuGroups = [
  {
    label: "订单农业",
    items: [
      { label: "发起采购询价", href: "/merchant/caigou-xunjia", icon: FileText },
      { label: "发起供应报价", href: "/merchant/gongying-baojia", icon: TrendingUp },
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
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
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
