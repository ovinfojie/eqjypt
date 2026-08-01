import Link from "next/link"
import { FileText, TrendingUp, ShoppingCart, ArrowRight } from "lucide-react"

const modules = [
  {
    label: "发起采购询价",
    desc: "向供应商发起农产品采购询价，填写采购需求、收货计划、报价截止日期等信息。",
    href: "/merchant/caigou-xunjia",
    icon: FileText,
    color: "#1a5fa8",
    bg: "#e8f4fd",
  },
  {
    label: "发起供应报价",
    desc: "作为供应商对采购方的询价进行响应，填写供应量、价格区间、质检标准等信息。",
    href: "/merchant/gongying-baojia",
    icon: TrendingUp,
    color: "#2e7d32",
    bg: "#e8f5e9",
  },
  {
    label: "提交订单",
    desc: "确认采购意向后提交正式订单，含商品明细、预付款比例、收货信息、合同附件。",
    href: "/merchant/xiadan",
    icon: ShoppingCart,
    color: "#e8831a",
    bg: "#fff3e0",
  },
]

export default function MerchantHomePage() {
  return (
    <div>
      <div className="mb-7">
        <h1 className="text-[22px] font-bold text-[#1a1a2e] mb-1.5">工作台</h1>
        <p className="text-[13px] text-[#6b7c93]">欢迎使用商家中心，请选择业务模块开始操作。</p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {modules.map((m) => {
          const Icon = m.icon
          return (
            <Link
              key={m.label}
              href={m.href}
              className="bg-white rounded-xl border border-[#dde3ec] p-6 hover:shadow-md transition-shadow group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: m.bg }}
              >
                <Icon className="w-6 h-6" style={{ color: m.color }} />
              </div>
              <h2 className="text-[15px] font-semibold text-[#1a1a2e] mb-2">{m.label}</h2>
              <p className="text-[13px] text-[#6b7c93] leading-relaxed mb-4">{m.desc}</p>
              <div
                className="flex items-center gap-1 text-[13px] font-medium"
                style={{ color: m.color }}
              >
                立即操作 <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
