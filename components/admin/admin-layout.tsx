"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, ClipboardList, Gavel, Calendar,
  Users, BarChart2, Package, Settings, ChevronRight, ArrowLeft,
  Star, MapPin, ShieldCheck, Building2, Link2,
  Monitor, TrendingUp, Layers, Wallet, Bell, Tag, Gift,
} from "lucide-react"

const menuGroups = [
  {
    label: "工作台",
    items: [
      { label: "运营工作台", href: "/admin",                  icon: LayoutDashboard },
      { label: "监察大屏",   href: "/admin/jianchajiance",    icon: Monitor         },
    ],
  },
  {
    label: "供销严选管理",
    items: [
      { label: "产地管理",     href: "/admin/yanxuan/chandi-list",     icon: MapPin      },
      { label: "产地商品管理", href: "/admin/yanxuan/chandi-product",  icon: Package     },
      { label: "大单品专区",   href: "/admin/yanxuan/dadan-zone",      icon: Star        },
      { label: "商品审核",     href: "/admin/yanxuan/shangpin-shenhe", icon: ShieldCheck },
      { label: "供应商审核",   href: "/admin/yanxuan/supplier-shenhe", icon: Building2   },
    ],
  },
  {
    label: "竞价交易管理",
    items: [
      { label: "专场管理",   href: "/admin/jingjia/session-list", icon: Gavel        },
      { label: "发布竞拍",   href: "/admin/fabu-jingpai",         icon: ClipboardList },
      { label: "保证金管理", href: "/admin/jingjia/deposit",      icon: Wallet        },
    ],
  },
  {
    label: "订单农业管理",
    items: [
      { label: "需求管理",         href: "/admin/xunjia-list",                icon: ClipboardList },
      { label: "订单种植需求管理", href: "/admin/dingdan-nongye/xq-list",     icon: ClipboardList },
      { label: "订单种植供应管理", href: "/admin/dingdan-nongye/gy-list",     icon: Package       },
      { label: "已成交订单管理",   href: "/admin/dingdan-nongye/order-list",  icon: Star          },
      { label: "预约管理",         href: "/admin/yuyue",                      icon: Calendar      },
    ],
  },
  {
    label: "全产业链服务",
    items: [
      { label: "服务机构管理", href: "/admin/quancyl/jigou-list", icon: Building2   },
      { label: "合作申请审核", href: "/admin/quancyl/shenhe",     icon: ShieldCheck },
    ],
  },
  {
    label: "农业信用服务",
    items: [
      { label: "信用档案管理", href: "/admin/xinyong/dangan-list", icon: Users       },
      { label: "金融产品管理", href: "/admin/xinyong/jrcp-list",   icon: Layers      },
      { label: "金融申请审核", href: "/admin/xinyong/jrcp-shenhe", icon: ShieldCheck },
    ],
  },
  {
    label: "开放合作共赢",
    items: [
      { label: "合作申请审核", href: "/admin/kaifang-hezuo/shenhe", icon: Link2 },
    ],
  },
  {
    label: "会员管理",
    items: [
      { label: "会员列表",     href: "/admin/member/list",    icon: Users       },
      { label: "企业升级审核", href: "/admin/member/upgrade", icon: ShieldCheck },
    ],
  },
  {
    label: "二级运营管理",
    items: [
      { label: "运营管理列表", href: "/admin/yunying/list", icon: Building2 },
    ],
  },
  {
    label: "价格指数管理",
    items: [
      { label: "价格指数列表", href: "/admin/jiage/index-list", icon: TrendingUp },
    ],
  },
  {
    label: "补贴管理",
    items: [
      { label: "补贴列表",   href: "/admin/butie/list",    icon: Gift     },
    ],
  },
  {
    label: "营销管理",
    items: [
      { label: "营销总览", href: "/admin/marketing/overview", icon: Gift },
    ],
  },
  {
    label: "财务管理",
    items: [
      { label: "结算总览", href: "/admin/finance/settlement", icon: Wallet },
    ],
  },
  {
    label: "报表",
    items: [
      { label: "补贴报表", href: "/admin/report/butie", icon: BarChart2 },
    ],
  },
  {
    label: "平台配置",
    items: [
      { label: "消息公告管理", href: "/admin/platform/notice", icon: Bell     },
      { label: "参数配置",     href: "/admin/platform/config", icon: Settings },
      { label: "店铺标签管理", href: "/admin/platform/tags",   icon: Tag      },
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
