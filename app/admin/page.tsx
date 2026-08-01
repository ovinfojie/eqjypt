import Link from "next/link"
import { ClipboardList, Gavel, Calendar, ArrowRight } from "lucide-react"

const modules = [
  {
    label: "需求管理列表",
    desc: "查看并审核买方发起的采购询价需求，支持审核通过、驳回及查看详情操作。",
    href: "/admin/xunjia-list",
    icon: ClipboardList,
    color: "#1a5fa8",
    bg: "#e8f4fd",
  },
  {
    label: "发布销售竞拍",
    desc: "管理员发布农产品销售竞拍活动，配置竞价类型、保证金、交易规则及商品信息。",
    href: "/admin/fabu-jingpai",
    icon: Gavel,
    color: "#6a1a8a",
    bg: "#f3e8fd",
  },
  {
    label: "预约管理",
    desc: "查看和管理平台预约申请，支持日历视图与列表视图切换，处理预约状态。",
    href: "/admin/yuyue",
    icon: Calendar,
    color: "#2e7d32",
    bg: "#e8f5e9",
  },
]

export default function AdminHomePage() {
  return (
    <div>
      <div className="mb-7">
        <h1 className="text-[22px] font-bold text-[#1a1a2e] mb-1.5">运营总览</h1>
        <p className="text-[13px] text-[#6b7c93]">欢迎使用平台运营管理端，请选择订单农业管理模块开始操作。</p>
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
                进入管理 <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
