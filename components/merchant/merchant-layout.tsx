"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, FileText, TrendingUp, ShoppingCart,
  Package, Users, Settings, ChevronRight, ArrowLeft,
  MessageSquare, ChevronDown, Handshake, Star, Gavel, Link2,
  Layers, ClipboardList, FileSignature, Wallet, Gift, UserCircle,
  Bookmark, Bell, XCircle, Building2, ShieldCheck, Store,
} from "lucide-react"
import { useState } from "react"

/* ─── 店铺管理菜单组 ─── */
const shopMenuGroups = [
  /* 1. 工作台 */
  {
    label: "工作台",
    items: [
      { label: "工作台",             href: "/merchant",                          icon: LayoutDashboard },
      { label: "消息通知",           href: "/merchant/message-center",           icon: Bell            },
      { label: "账号信息",           href: "/merchant/account/info",             icon: UserCircle      },
      { label: "账号信息（仅企管）", href: "/merchant/account/info-admin",       icon: UserCircle      },
      { label: "账号信息（个人）",   href: "/merchant/account/info-personal",    icon: UserCircle      },
      { label: "账号信息（店员）",   href: "/merchant/account/info-staff",       icon: UserCircle      },
    ],
  },

  /* 2. 商户设置 */
  {
    label: "商户设置",
    items: [
      { label: "商户装修", href: "/merchant/settings/decoration", icon: Layers },
    ],
  },

  /* 3. 商品 */
  {
    label: "商品",
    items: [
      { label: "商品基础档案", href: "/merchant/product/archive", icon: Package },
      { label: "新增商品",     href: "/merchant/product/add",     icon: Package },
      { label: "库存管理",     href: "/merchant/product/stock",   icon: Layers  },
      {
        label: "供销严选", icon: Star,
        children: [
          { label: "我的商品", href: "/merchant/yanxuan/shangpin-list" },
          { label: "发布商品", href: "/merchant/yanxuan/fabu-shangpin" },
        ],
      },
    ],
  },

  /* 4. 订单 */
  {
    label: "订单",
    items: [
      { label: "我的采购订单", href: "/merchant/trade/caigou-orders",   icon: ShoppingCart  },
      { label: "我的销售订单", href: "/merchant/trade/xiaoshou-orders", icon: ClipboardList },
      { label: "批次验收",     href: "/merchant/trade/batch-accept",    icon: ClipboardList },
    ],
  },

  /* 5. 订单农业 */
  {
    label: "订单农业",
    items: [
      { label: "订单种植需求", href: "/merchant/dingdan-nongye/xq-list", icon: FileText     },
      { label: "订单种植供应", href: "/merchant/dingdan-nongye/gy-list", icon: TrendingUp   },
      {
        label: "询报价管理", icon: MessageSquare,
        children: [
          { label: "我发起的", href: "/merchant/xunbaojia/wo-faqide"   },
          { label: "我收到的", href: "/merchant/xunbaojia/wo-shoudaode"},
        ],
      },
      {
        label: "订单管理", icon: ClipboardList,
        children: [
          { label: "我采购", href: "/merchant/dingdan-nongye/order-mgmt/wo-caigou"   },
          { label: "我销售", href: "/merchant/dingdan-nongye/order-mgmt/wo-xiaoshou" },
        ],
      },
    ],
  },

  /* 6. 合同 */
  {
    label: "合同",
    items: [
      {
        label: "合同管理", icon: FileSignature,
        children: [
          { label: "我发起的", href: "/merchant/contract/list/wo-faqide"    },
          { label: "我收到的", href: "/merchant/contract/list/wo-shoudaode" },
        ],
      },
      { label: "合同模板管理", href: "/merchant/contract/template", icon: FileText },
    ],
  },

  /* 7. 竞价 */
  {
    label: "竞价",
    items: [
      { label: "我参与的竞拍", href: "/merchant/jingjia/wo-canjia",  icon: Gavel         },
      { label: "我发布的竞拍", href: "/merchant/jingjia/wo-fabu",    icon: Gavel         },
      { label: "中标通知书",   href: "/merchant/jingjia/win-notice", icon: FileText      },
      { label: "保证金管理",   href: "/merchant/jingjia/deposit",    icon: Wallet        },
    ],
  },

  /* 8. 集采 */
  {
    label: "集采",
    items: [
      { label: "集采活动", href: "/merchant/jicai/huodong-list",  icon: Layers        },
      { label: "我销售",   href: "/merchant/jicai/wo-xiaoshou",   icon: ClipboardList },
      { label: "我采购",   href: "/merchant/jicai/wo-caigou",     icon: ClipboardList },
      { label: "客户分组", href: "/merchant/jicai/kehu-fenzu",    icon: Users         },
    ],
  },

  /* 9. 产销 */
  {
    label: "产销",
    items: [
      {
        label: "发布管理", icon: FileText,
        children: [
          { label: "采购需求", href: "/merchant/chanxiao/caigou-list"   },
          { label: "供应信息", href: "/merchant/chanxiao/supply-list"   },
        ],
      },
      {
        label: "询报价管理", icon: MessageSquare,
        children: [
          { label: "我发起的", href: "/merchant/chanxiao/xunbaojia/wo-faqide"    },
          { label: "我收到的", href: "/merchant/chanxiao/xunbaojia/wo-shoudaode" },
        ],
      },
      {
        label: "订单管理", icon: ClipboardList,
        children: [
          { label: "我采购", href: "/merchant/chanxiao/orders/wo-caigou"   },
          { label: "我销售", href: "/merchant/chanxiao/orders/wo-xiaoshou" },
        ],
      },
      { label: "撤回需求/信息", href: "/merchant/chanxiao/withdraw",       icon: XCircle  },
      { label: "撤回报价",      href: "/merchant/chanxiao/quote-withdraw", icon: XCircle  },
      { label: "我的收藏",      href: "/merchant/chanxiao/favorites",      icon: Bookmark },
    ],
  },

  /* 10. 财务 */
  {
    label: "财务",
    items: [
      { label: "结算与对账",   href: "/merchant/finance/settlement",     icon: Wallet   },
      { label: "发票申请管理", href: "/merchant/finance/invoice-apply",  icon: FileText },
      { label: "发票抬头管理", href: "/merchant/finance/invoice-header", icon: FileText },
    ],
  },

  /* 11. 会员v3.1 */
  {
    label: "会员v3.1",
    items: [
      { label: "客户列表", href: "/merchant/member/list", icon: Users },
    ],
  },

  /* 12. 营销 */
  {
    label: "营销",
    items: [
      { label: "营销权益总览", href: "/merchant/marketing/overview", icon: Gift },
      { label: "红包管理",     href: "/merchant/marketing/hongbao",  icon: Gift },
      { label: "卡券管理",     href: "/merchant/marketing/coupon",   icon: Gift },
      { label: "积分管理",     href: "/merchant/marketing/points",   icon: Gift },
    ],
  },
]

/* ─── 企业管理菜单组 ─── */
const enterpriseMenuGroups = [
  {
    label: "工作台",
    items: [
      { label: "工作台", href: "/merchant", icon: LayoutDashboard },
    ],
  },
  {
    label: "企业管理",
    items: [
      { label: "企业管理", href: "/merchant/enterprise/info", icon: Building2 },
    ],
  },
  {
    label: "子商户管理",
    items: [
      { label: "子商户信息", href: "/merchant/enterprise/sub",   icon: Store   },
      { label: "角色权限",   href: "/merchant/enterprise/roles", icon: ShieldCheck },
    ],
  },
]

/* ─── 企业管理模式判断 ─── */
const ENTERPRISE_PATHS = [
  "/merchant/enterprise/info",
  "/merchant/enterprise/staff",
  "/merchant/enterprise/sub",
  "/merchant/enterprise/roles",
]

type MenuItem =
  | { label: string; href: string; icon: React.ComponentType<{ className?: string }>; children?: undefined; badge?: number }
  | { label: string; icon: React.ComponentType<{ className?: string }>; children: { label: string; href: string }[]; href?: undefined }

function SidebarMenu({
  groups,
  pathname,
  expandedGroups,
  toggleGroup,
}: {
  groups: { label: string; items: MenuItem[] }[]
  pathname: string
  expandedGroups: string[]
  toggleGroup: (label: string) => void
}) {
  return (
    <div className="p-4">
      {groups.map((group) => (
        <div key={group.label} className="mb-4">
          <div className="text-[11px] font-semibold text-[#999] uppercase tracking-wide px-2 mb-1.5">
            {group.label}
          </div>
          <div className="space-y-0.5">
            {group.items.map((item) => {
              const Icon = item.icon
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
                      <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", isExpanded ? "rotate-180" : "")} />
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
  )
}

export function MerchantLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  /* 根据当前路径判断默认模式 */
  const defaultMode = ENTERPRISE_PATHS.some(p => pathname.startsWith(p)) ? "enterprise" : "shop"
  const [mode, setMode] = useState<"enterprise" | "shop">(defaultMode)

  const [expandedGroups, setExpandedGroups] = useState<string[]>(["询报价管理", "采购管理", "销售管理", "供销严选", "竞价交易", "全产业链服务", "农业信用"])

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    )
  }

  const handleModeSwitch = (newMode: "enterprise" | "shop") => {
    setMode(newMode)
    if (newMode === "enterprise") {
      router.push("/merchant/enterprise/info")
    } else {
      router.push("/merchant")
    }
  }

  const currentGroups = mode === "enterprise" ? enterpriseMenuGroups : shopMenuGroups

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

        {/* 企业/店铺 切换 */}
        <div className="flex items-center gap-1 ml-3 bg-white/15 rounded-lg p-0.5">
          <button
            onClick={() => handleModeSwitch("enterprise")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-all",
              mode === "enterprise"
                ? "bg-white text-[#1a5fa8] shadow-sm"
                : "text-white/80 hover:text-white"
            )}
          >
            <Building2 className="w-3.5 h-3.5" />
            企业管理
          </button>
          <button
            onClick={() => handleModeSwitch("shop")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-all",
              mode === "shop"
                ? "bg-white text-[#1a5fa8] shadow-sm"
                : "text-white/80 hover:text-white"
            )}
          >
            <Store className="w-3.5 h-3.5" />
            店铺管理
          </button>
        </div>

        {/* 当前身份 */}
        <div className="flex items-center gap-2 ml-3">
          <span className="text-white/60 text-[12px]">当前身份：</span>
          <div className="flex items-center gap-1.5 bg-white/10 rounded px-2.5 py-1">
            <Building2 className="w-3.5 h-3.5 text-white/80" />
            <span className="text-white text-[12px]">广州供销数字科技有限公司(交易服务组)</span>
          </div>
          <span className="px-2 py-0.5 bg-white/20 text-white text-[11px] rounded border border-white/30 font-medium">产品经理</span>
          <ChevronDown className="w-3.5 h-3.5 text-white/60" />
        </div>

        {/* 右侧用户信息 */}
        <div className="ml-auto flex items-center gap-4 text-[12px] text-white/80">
          <span>吴玲&nbsp;&nbsp;17878907980</span>
          <button className="hover:text-white transition-colors flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" />
            咨服
          </button>
          <Link href="/portal" className="hover:text-white transition-colors">公共交易服务平台</Link>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-52 bg-white border-r border-[#dde3ec] shrink-0">
          <SidebarMenu
            groups={currentGroups as { label: string; items: MenuItem[] }[]}
            pathname={pathname}
            expandedGroups={expandedGroups}
            toggleGroup={toggleGroup}
          />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
