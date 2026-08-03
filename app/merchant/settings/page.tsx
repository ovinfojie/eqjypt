"use client"

import { useState } from "react"
import { Bell, Lock, CreditCard, Smartphone, ShieldCheck, Save } from "lucide-react"

type TabKey = "notification" | "security" | "payment" | "decoration"

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "notification", label: "消息通知",   icon: Bell },
  { key: "security",     label: "账号安全",   icon: Lock },
  { key: "payment",      label: "收款设置",   icon: CreditCard },
  { key: "decoration",   label: "店铺装修",   icon: Smartphone },
]

export default function MerchantSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("notification")
  const [notifications, setNotifications] = useState({
    newOrder: true, orderStatus: true, payment: true,
    contract: true, system: true, marketing: false,
  })

  const toggle = (key: keyof typeof notifications) =>
    setNotifications(n => ({ ...n, [key]: !n[key] }))

  return (
    <div className="max-w-[860px] mx-auto space-y-5">
      <h1 className="text-[20px] font-bold text-[#1a1a2e]">商户设置</h1>

      <div className="flex gap-5">
        {/* 左侧 Tab 导航 */}
        <aside className="w-44 shrink-0">
          <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
            {TABS.map(tab => {
              const Icon = tab.icon
              return (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 text-[13px] transition-colors border-b border-[#f0f4f8] last:border-0 ${activeTab === tab.key ? "bg-[#e8f4fd] text-[#1a5fa8] font-semibold" : "text-[#555] hover:bg-[#f8fafc]"}`}>
                  <Icon className="w-4 h-4 shrink-0" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </aside>

        {/* 右侧内容 */}
        <div className="flex-1 min-w-0">
          {activeTab === "notification" && (
            <div className="bg-white rounded-lg border border-[#e8edf5] p-6 space-y-4">
              <h2 className="text-[14px] font-semibold text-[#1a1a2e] border-b border-[#f0f4f8] pb-3">消息通知设置</h2>
              {[
                { key: "newOrder" as const, label: "新订单通知", desc: "有买家下单时，通过站内信和短信提醒" },
                { key: "orderStatus" as const, label: "订单状态变更", desc: "订单确认、付款、配送状态变化通知" },
                { key: "payment" as const, label: "收款提醒", desc: "账户收到款项时发送通知" },
                { key: "contract" as const, label: "合同待办提醒", desc: "有合同待签署或到期时提醒" },
                { key: "system" as const, label: "系统公告", desc: "平台重要更新和维护通知" },
                { key: "marketing" as const, label: "营销活动推送", desc: "平台营销活动和优惠信息" },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-[13px] font-medium text-[#1a1a2e]">{item.label}</div>
                    <div className="text-[12px] text-[#6b7c93] mt-0.5">{item.desc}</div>
                  </div>
                  <button onClick={() => toggle(item.key)}
                    className={`w-10 h-5.5 rounded-full transition-colors relative ${notifications[item.key] ? "bg-[#1a5fa8]" : "bg-[#dde3ec]"}`}
                    style={{ height: "22px", width: "40px" }}>
                    <span className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-transform ${notifications[item.key] ? "translate-x-[18px]" : "translate-x-0.5"}`}
                      style={{ width: "18px", height: "18px" }} />
                  </button>
                </div>
              ))}
              <div className="pt-3 flex justify-end">
                <button className="flex items-center gap-1.5 px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded-lg hover:bg-[#0d4a8a]">
                  <Save className="w-3.5 h-3.5" /> 保存设置
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-white rounded-lg border border-[#e8edf5] p-6 space-y-4">
              <h2 className="text-[14px] font-semibold text-[#1a1a2e] border-b border-[#f0f4f8] pb-3">账号安全</h2>
              {[
                { label: "登录密码", value: "已设置 · 上次修改：2025-12-01", action: "修改密码", icon: Lock },
                { label: "手机绑定", value: "138****2222（已绑定）", action: "更换手机", icon: Smartphone },
                { label: "实名认证", value: "已通过实名认证", action: "查看", icon: ShieldCheck },
                { label: "登录设备管理", value: "当前 2 台设备在线", action: "管理设备", icon: Lock },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-[#f0f4f8] last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#f0f4f8] flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-[#6b7c93]" />
                    </div>
                    <div>
                      <div className="text-[13px] font-medium text-[#1a1a2e]">{item.label}</div>
                      <div className="text-[12px] text-[#6b7c93]">{item.value}</div>
                    </div>
                  </div>
                  <button className="text-[13px] text-[#1a5fa8] hover:underline">{item.action}</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "payment" && (
            <div className="bg-white rounded-lg border border-[#e8edf5] p-6 space-y-4">
              <h2 className="text-[14px] font-semibold text-[#1a1a2e] border-b border-[#f0f4f8] pb-3">收款账户设置</h2>
              <div className="space-y-3">
                {[
                  { label: "银行名称", placeholder: "招商银行" },
                  { label: "支行名称", placeholder: "广州天河支行" },
                  { label: "账户名称", placeholder: "盒马超市采购部" },
                  { label: "银行账号", placeholder: "621588xxxxxxxx" },
                ].map(f => (
                  <div key={f.label} className="flex items-center gap-4">
                    <label className="text-[13px] text-[#6b7c93] w-24 text-right shrink-0">{f.label}</label>
                    <input type="text" defaultValue={f.placeholder} className="flex-1 border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-2">
                <button className="flex items-center gap-1.5 px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded-lg hover:bg-[#0d4a8a]">
                  <Save className="w-3.5 h-3.5" /> 保存收款信息
                </button>
              </div>
            </div>
          )}

          {activeTab === "decoration" && (
            <div className="bg-white rounded-lg border border-[#e8edf5] p-6 space-y-4">
              <h2 className="text-[14px] font-semibold text-[#1a1a2e] border-b border-[#f0f4f8] pb-3">店铺装修</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <label className="text-[13px] text-[#6b7c93] w-24 text-right pt-2 shrink-0">店铺Logo</label>
                  <div className="w-20 h-20 rounded-lg border-2 border-dashed border-[#e8edf5] flex flex-col items-center justify-center text-[#aaa] text-[12px] cursor-pointer hover:border-[#1a5fa8] transition-colors">
                    <span className="text-2xl mb-1">+</span>上传
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <label className="text-[13px] text-[#6b7c93] w-24 text-right pt-1 shrink-0">店铺名称</label>
                  <input type="text" defaultValue="盒马超市采购部" className="flex-1 border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
                <div className="flex items-start gap-4">
                  <label className="text-[13px] text-[#6b7c93] w-24 text-right pt-1 shrink-0">店铺简介</label>
                  <textarea rows={3} defaultValue="盒马超市官方采购中心，专注优质农产品采购" className="flex-1 border border-[#e8edf5] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none" />
                </div>
                <div className="flex items-start gap-4">
                  <label className="text-[13px] text-[#6b7c93] w-24 text-right pt-1 shrink-0">主营类目</label>
                  <div className="flex gap-2 flex-wrap">
                    {["粮食", "水果", "水产", "蔬菜"].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-[#e8f4fd] text-[#1a5fa8] text-[12px] rounded-full">{tag} ×</span>
                    ))}
                    <button className="px-3 py-1 border border-dashed border-[#e8edf5] text-[#6b7c93] text-[12px] rounded-full hover:border-[#1a5fa8]">+ 添加</button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button className="flex items-center gap-1.5 px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded-lg hover:bg-[#0d4a8a]">
                  <Save className="w-3.5 h-3.5" /> 保存装修信息
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
