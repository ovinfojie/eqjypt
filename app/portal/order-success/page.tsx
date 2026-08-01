"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CheckCircle2, Package, Truck, CreditCard, Star, ArrowRight, ClipboardList } from "lucide-react"

const steps = [
  { icon: ClipboardList, label: "供应商确认",    desc: "供应商确认库存及价格",    time: "预计 2 小时内" },
  { icon: CreditCard,    label: "完成付款",       desc: "按支付方式完成款项",       time: "确认后 1 个工作日" },
  { icon: Package,       label: "备货发货",       desc: "供应商备货并发出",          time: "付款后 1-2 个工作日" },
  { icon: Truck,         label: "收货验货",        desc: "确认收货后完成交易",       time: "发货后 3-5 个工作日" },
]

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderNo = searchParams.get("no") || "PO2026080100123"
  const now = new Date().toLocaleString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-[800px] mx-auto px-6 py-12">

          {/* 成功卡片 */}
          <div className="bg-white rounded-xl border border-[#e8edf5] shadow-sm overflow-hidden mb-6">
            {/* 顶部绿色区域 */}
            <div className="bg-gradient-to-r from-[#2d8a4e] to-[#3a8c3f] px-8 py-10 text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-[26px] font-bold text-white mb-2">采购申请已提交成功</h1>
              <p className="text-[15px] text-white/80">请等待供应商确认，我们将第一时间通知您</p>
            </div>

            {/* 订单信息 */}
            <div className="px-8 py-6">
              <div className="grid grid-cols-3 gap-6 text-center mb-6 pb-6 border-b border-[#f0f4f8]">
                <div>
                  <div className="text-[12px] text-[#6b7c93] mb-1">采购单号</div>
                  <div className="text-[15px] font-bold text-[#1a1a2e] font-mono">{orderNo}</div>
                </div>
                <div>
                  <div className="text-[12px] text-[#6b7c93] mb-1">提交时间</div>
                  <div className="text-[14px] font-medium text-[#1a1a2e]">{now}</div>
                </div>
                <div>
                  <div className="text-[12px] text-[#6b7c93] mb-1">支付方式</div>
                  <div className="text-[14px] font-medium text-[#1a1a2e]">平台担保付款</div>
                </div>
              </div>

              {/* 后续流程 */}
              <h2 className="text-[15px] font-bold text-[#1a1a2e] mb-5">后续流程</h2>
              <div className="relative">
                {/* 连接线 */}
                <div className="absolute left-[19px] top-9 bottom-9 w-0.5 bg-[#e8edf5]" />
                <div className="space-y-5">
                  {steps.map((s, i) => (
                    <div key={s.label} className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 relative z-10 ${i === 0 ? "bg-[#1a5fa8]" : "bg-[#e8edf5]"}`}>
                        <s.icon className={`w-5 h-5 ${i === 0 ? "text-white" : "text-[#6b7c93]"}`} />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center gap-3">
                          <span className={`text-[14px] font-semibold ${i === 0 ? "text-[#1a5fa8]" : "text-[#1a1a2e]"}`}>{s.label}</span>
                          {i === 0 && <span className="text-[11px] px-2 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] border border-[#1a5fa8]/20 rounded-full">当前步骤</span>}
                        </div>
                        <div className="text-[13px] text-[#6b7c93] mt-0.5">{s.desc}</div>
                        <div className="text-[12px] text-[#aaa] mt-0.5">{s.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 提示说明 */}
          <div className="bg-[#fffbe6] border border-[#ffe58f] rounded-lg p-4 mb-6">
            <div className="flex items-start gap-2">
              <Star className="w-4 h-4 text-[#e8831a] mt-0.5 shrink-0" />
              <div className="text-[13px] text-[#8a6200] leading-relaxed">
                <span className="font-semibold">温馨提示：</span>
                供应商确认后将与您联系商定配送细节。担保付款方式下，款项将由平台托管，收货验货满意后再确认放款，保障您的采购安全。
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/merchant/orders"
              className="flex items-center gap-2 px-6 py-3 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded-lg hover:bg-[#0d4a8a] transition-colors"
            >
              <ClipboardList className="w-4 h-4" />
              查看我的订单
            </Link>
            <Link
              href="/portal/jicai"
              className="flex items-center gap-2 px-6 py-3 border border-[#1a5fa8] text-[#1a5fa8] text-[14px] font-semibold rounded-lg hover:bg-[#e8f4fd] transition-colors"
            >
              继续采购
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portal"
              className="px-6 py-3 border border-[#dde3ec] text-[#6b7c93] text-[14px] rounded-lg hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
            >
              返回首页
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  )
}
