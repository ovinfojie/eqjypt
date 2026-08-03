"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell, ShoppingCart, Handshake, Gavel, FileText,
  Settings, CheckCheck, Trash2, ChevronRight, Circle,
} from "lucide-react"

type MsgType = "all" | "chanxiao" | "jingjia" | "dingdan" | "system"

interface Msg {
  id: string
  type: Exclude<MsgType, "all">
  title: string
  content: string
  time: string
  read: boolean
  link?: string
}

const MESSAGES: Msg[] = [
  {
    id: "m1", type: "chanxiao", read: false,
    title: "您的采购需求收到新报价",
    content: "「2026年广东省大批量优质丝苗米长期采购」收到惠州新供销天润粮油储备有限公司的报价：3600元/吨，可供50吨。",
    time: "2026-06-08 14:22",
    link: "/merchant/chanxiao/caigou-list/CG20260601001",
  },
  {
    id: "m2", type: "chanxiao", read: false,
    title: "您的销售信息收到询价",
    content: "「2026年粤西荔枝火热供应中」收到广州越秀粮食储备有限公司的询价，对方需求500吨，请及时回复。",
    time: "2026-06-08 11:05",
    link: "/merchant/chanxiao/xiaoshou-list/XS20260601003",
  },
  {
    id: "m3", type: "chanxiao", read: false,
    title: "报价被接受",
    content: "您向「鲜活海鲜大批量采购」提交的报价已被采购方接受，请尽快确认订单详情并安排发货。",
    time: "2026-06-07 16:40",
    link: "/merchant/chanxiao/orders",
  },
  {
    id: "m4", type: "jingjia", read: false,
    title: "竞拍即将开始",
    content: "您关注的「2026年夏季新鲜荔枝竞拍专场（第三场）」将于30分钟后开始，请做好参拍准备。",
    time: "2026-06-08 09:30",
    link: "/merchant/jingjia/wo-canjia",
  },
  {
    id: "m5", type: "jingjia", read: true,
    title: "恭喜您竞拍成功",
    content: "您以4.8万元/吨的价格成功竞得「江门大闸蟹竞拍专场（第一场）」5吨，请在48小时内完成付款。",
    time: "2026-06-07 15:20",
    link: "/merchant/jingjia/win-notice",
  },
  {
    id: "m6", type: "jingjia", read: true,
    title: "保证金解冻通知",
    content: "「荔枝专场（第二场）」已流拍，您缴纳的保证金5000元已自动解冻，可在账户中查看。",
    time: "2026-06-06 18:00",
    link: "/merchant/jingjia/deposit",
  },
  {
    id: "m7", type: "dingdan", read: true,
    title: "订单变更申请待确认",
    content: "广州越秀粮食储备有限公司对订单 DN20260601001 发起变更申请：交货日期由2026-06-15延期至2026-06-20，请在48小时内确认。",
    time: "2026-06-06 10:15",
    link: "/merchant/dingdan-nongye/change-confirm",
  },
  {
    id: "m8", type: "dingdan", read: true,
    title: "订单已确认收货",
    content: "订单 DN20260601002「丰两优大米 30吨」买方已确认收货，款项将于3个工作日内到账。",
    time: "2026-06-05 14:30",
    link: "/merchant/dingdan-nongye/xq-list",
  },
  {
    id: "m9", type: "system", read: true,
    title: "平台公告：集采专区规则更新",
    content: "平台集采专区参与规则已于2026-06-01起更新，新增阶梯报价功能，请查阅新规则详情。",
    time: "2026-06-01 09:00",
    link: "/merchant/jicai/huodong-list",
  },
  {
    id: "m10", type: "system", read: true,
    title: "您的企业信息审核通过",
    content: "您提交的企业资质更新申请已审核通过，企业信用等级已更新为 AA，可参与更多竞拍专场。",
    time: "2026-05-30 16:45",
    link: "/merchant/enterprise/info",
  },
]

const TYPE_TABS: { key: MsgType; label: string; icon: React.ElementType }[] = [
  { key: "all",      label: "全部",     icon: Bell      },
  { key: "chanxiao", label: "产销对接", icon: Handshake },
  { key: "jingjia",  label: "竞价交易", icon: Gavel     },
  { key: "dingdan",  label: "订单农业", icon: FileText  },
  { key: "system",   label: "系统通知", icon: Settings  },
]

const typeIcon: Record<Exclude<MsgType, "all">, { icon: React.ElementType; color: string; bg: string }> = {
  chanxiao: { icon: Handshake, color: "#1a5fa8", bg: "#e8f4fd" },
  jingjia:  { icon: Gavel,     color: "#e8831a", bg: "#fff4e6" },
  dingdan:  { icon: ShoppingCart, color: "#3a8c3f", bg: "#f0fdf4" },
  system:   { icon: Settings,  color: "#6b7c93", bg: "#f0f2f5" },
}

export default function MessageCenterPage() {
  const [activeTab, setActiveTab] = useState<MsgType>("all")
  const [messages, setMessages] = useState<Msg[]>(MESSAGES)

  const filtered = activeTab === "all" ? messages : messages.filter(m => m.type === activeTab)
  const unreadCount = messages.filter(m => !m.read).length
  const tabUnread = (key: MsgType) =>
    key === "all" ? unreadCount : messages.filter(m => m.type === key && !m.read).length

  const markAllRead = () => setMessages(prev => prev.map(m => ({ ...m, read: true })))
  const markRead = (id: string) => setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
  const deleteMsg = (id: string) => setMessages(prev => prev.filter(m => m.id !== id))

  return (
    <div className="max-w-[860px]">
      {/* 页头 */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-[18px] font-bold text-[#1a1a2e] flex items-center gap-2">
            消息通知中心
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-[#e53e3e] text-white text-[11px] font-bold rounded-full">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-[13px] text-[#888] mt-0.5">查看所有业务通知、系统消息</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead}
            className="flex items-center gap-1.5 px-4 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded-lg hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
            <CheckCheck className="w-4 h-4" />全部已读
          </button>
        )}
      </div>

      <div className="flex gap-4">
        {/* 左侧分类 */}
        <div className="w-40 shrink-0 space-y-1">
          {TYPE_TABS.map(tab => {
            const cnt = tabUnread(tab.key)
            const Icon = tab.icon
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] transition-colors ${
                  activeTab === tab.key
                    ? "bg-[#e8f4fd] text-[#1a5fa8] font-semibold"
                    : "text-[#555] hover:bg-[#f5f7fa]"
                }`}>
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-left">{tab.label}</span>
                {cnt > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#e53e3e] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {cnt}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* 右侧消息列表 */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#e8edf5] py-16 text-center">
              <Bell className="w-10 h-10 text-[#dde3ec] mx-auto mb-3" />
              <p className="text-[14px] text-[#bbb]">暂无消息</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#e8edf5] divide-y divide-[#f0f2f5]">
              {filtered.map(msg => {
                const ti = typeIcon[msg.type]
                const Icon = ti.icon
                return (
                  <div key={msg.id} className={`flex items-start gap-4 px-5 py-4 hover:bg-[#fafbfc] transition-colors group ${
                    !msg.read ? "bg-[#fdfeff]" : ""
                  }`}>
                    {/* 图标 */}
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: ti.bg }}>
                      <Icon className="w-4 h-4" style={{ color: ti.color }} />
                    </div>

                    {/* 内容 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          {!msg.read && <Circle className="w-2 h-2 fill-[#e53e3e] text-[#e53e3e] shrink-0" />}
                          <span className={`text-[14px] ${!msg.read ? "font-semibold text-[#1a1a2e]" : "text-[#333]"}`}>
                            {msg.title}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#bbb] shrink-0">{msg.time}</span>
                      </div>
                      <p className="text-[13px] text-[#888] leading-relaxed line-clamp-2 mb-2">{msg.content}</p>
                      <div className="flex items-center gap-3">
                        {msg.link && (
                          <Link href={msg.link} onClick={() => markRead(msg.id)}
                            className="flex items-center gap-1 text-[12px] text-[#1a5fa8] hover:underline">
                            查看详情 <ChevronRight className="w-3 h-3" />
                          </Link>
                        )}
                        {!msg.read && (
                          <button onClick={() => markRead(msg.id)}
                            className="text-[12px] text-[#999] hover:text-[#555] transition-colors">
                            标为已读
                          </button>
                        )}
                        <button onClick={() => deleteMsg(msg.id)}
                          className="flex items-center gap-1 text-[12px] text-[#ccc] hover:text-[#e53e3e] transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 className="w-3 h-3" />删除
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
