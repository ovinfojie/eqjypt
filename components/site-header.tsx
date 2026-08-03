"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ShoppingCart } from "lucide-react"

const navItems = [
  { label: "订单农业服务", href: "/portal/dingdan-nongye" },
  { label: "产销对接", href: "/portal/chanxiao-duijie" },
  { label: "采购专区", href: "/portal/caigou" },
  { label: "供销严选", href: "/portal/gongxiao-yanxuan" },
  { label: "集采专区", href: "/portal/jicai" },
  { label: "竞价交易", href: "/portal/jingjia-jiaoyi" },
  { label: "全产业链服务", href: "/portal/quanchanyilian" },
  { label: "农业信用服务", href: "/portal/nongye-xinyong" },
  { label: "开放合作共赢", href: "/portal/kaifang-hezuo" },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="w-full bg-white border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center gap-8">
        {/* Logo + Platform Name */}
        <Link href="/portal" className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5">
            {/* China CO-OP logo placeholder */}
            <div className="w-10 h-10 flex items-center justify-center">
              <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <circle cx="20" cy="20" r="19" stroke="#3a8c3f" strokeWidth="2" fill="white" />
                <text x="20" y="15" textAnchor="middle" fontSize="7" fill="#3a8c3f" fontWeight="bold">中国供销</text>
                <text x="20" y="24" textAnchor="middle" fontSize="6" fill="#3a8c3f">合作社社</text>
                <text x="20" y="32" textAnchor="middle" fontSize="5" fill="#3a8c3f">CHINA CO-OP</text>
              </svg>
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
              <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <rect width="40" height="40" rx="4" fill="#e8831a" />
                <text x="20" y="26" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">粤</text>
                <text x="20" y="35" textAnchor="middle" fontSize="6" fill="white">供销</text>
              </svg>
            </div>
          </div>
          <div className="leading-tight">
            <div className="text-[13px] font-bold text-[#1a5fa8]">粤供销公共型农产品</div>
            <div className="text-[13px] font-bold text-[#1a5fa8]">产地交易服务平台</div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 ml-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-[14px] whitespace-nowrap transition-colors rounded",
                  isActive
                    ? "text-[#1a5fa8] font-semibold border-b-2 border-[#1a5fa8]"
                    : "text-[#333] hover:text-[#1a5fa8] hover:bg-[#e8f4fd]"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-3 shrink-0">
          <Link
            href="/portal/jiage-daping"
            className="px-3 py-1.5 border border-[#dde3ec] text-[12px] text-[#6b7c93] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
          >
            价格大屏
          </Link>
          <Link
            href="/"
            className="px-3 py-1.5 border border-[#dde3ec] text-[12px] text-[#6b7c93] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
          >
            总控台
          </Link>
          {/* 购物车入口 */}
          <Link
            href="/portal/cart"
            className="relative flex items-center justify-center w-9 h-9 rounded hover:bg-[#e8f4fd] transition-colors"
            aria-label="采购车"
          >
            <ShoppingCart className="w-5 h-5 text-[#1a5fa8]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#e8831a] text-white text-[10px] font-bold flex items-center justify-center">
              4
            </span>
          </Link>
          <Link
            href="/portal/login"
            className="text-[14px] text-[#1a5fa8] hover:underline"
          >
            登录
          </Link>
          <Link
            href="/portal/register"
            className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[14px] rounded hover:bg-[#0d4a8a] transition-colors"
          >
            注册
          </Link>
        </div>
      </div>
    </header>
  )
}
