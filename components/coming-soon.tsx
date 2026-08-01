"use client"

import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Construction, ArrowLeft } from "lucide-react"

interface ComingSoonProps {
  title: string
  description?: string
  backHref?: string
  backLabel?: string
}

export function ComingSoon({
  title,
  description = "该功能模块正在设计开发中，敬请期待。",
  backHref = "/portal",
  backLabel = "返回首页",
}: ComingSoonProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center max-w-[480px] px-6">
          <div className="w-20 h-20 rounded-full bg-[#e8f4fd] flex items-center justify-center mx-auto mb-6">
            <Construction className="w-9 h-9 text-[#1a5fa8]" />
          </div>
          <h1 className="text-[24px] font-bold text-[#1a1a2e] mb-3">{title}</h1>
          <p className="text-[14px] text-[#6b7c93] leading-relaxed mb-8">{description}</p>
          <div className="flex gap-3 justify-center">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {backLabel}
            </Link>
            <Link
              href="/portal/dingdan-nongye"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#dde3ec] text-[14px] text-[#333] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
            >
              订单农业服务
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
