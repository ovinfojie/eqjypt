"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, ClipboardList, Gavel, Calendar,
  Users, BarChart2, Package, Settings, ChevronRight, ArrowLeft,
} from "lucide-react"

const menuGroups = [
  {
    label: "订单农业管理",
    items: [
      { label: "需求管理列表", href: "/admin/xunjia-list", icon: ClipboardList },
      { label: "发布销售竞拍", href: "/admin/fabu-jingpai", icon: Gavel },
      { label: "预约管理", href: "/admin/yuyue", icon: Calendar },
    ],
  },
  {
    label: "平台运营",
    items: [
      { label: "运营总览", href: "/admin", icon: LayoutDashboard },
      { label: "商家管理", href: "/admin/merchants", icon: Users },
      { label: "商品管理", href: "/admin/products", icon: Package },
      { label: "数据统计", href: "/admin/analytics", icon: BarChart2 },
      { label: "系统设置", href: "/admin/settings", icon: Settings },
    ],
  },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
      {/* Top nav */}
      <header className="bg-[#1a1a2e] h-12 flex items-center px-6 gap-4 shrink-0">
        <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white text-[13px] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          总控台
        </Link>
        <span className="text-white/30">|</span>
        <span className="text-white font-semibold text-[14px]">平台运营管理端</span>
        <span className="ml-auto text-[12px] text-white/50">超级管理员</span>
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
                            ? "bg-[#1a1a2e] text-white font-semibold"
                            : "text-[#444] hover:bg-[#f5f7fa] hover:text-[#1a1a2e]"
                        )}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                        {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
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
