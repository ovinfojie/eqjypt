"use client"

import { useState } from "react"
import { Settings, Save, RefreshCw, ChevronRight } from "lucide-react"

const CONFIG_GROUPS = [
  {
    key: "basic", label: "基础配置",
    items: [
      { key: "platform_name", label: "平台名称", type: "text", value: "粤供销公共型农产品产地交易服务平台" },
      { key: "platform_domain", label: "平台域名", type: "text", value: "https://gzeryx.example.com" },
      { key: "support_phone", label: "客服电话", type: "text", value: "400-888-8888" },
      { key: "support_email", label: "客服邮箱", type: "text", value: "support@gzeryx.com" },
      { key: "icp", label: "ICP备案号", type: "text", value: "粤ICP备20260001号" },
    ],
  },
  {
    key: "trade", label: "交易配置",
    items: [
      { key: "service_fee", label: "平台服务费率（%）", type: "number", value: "1.5" },
      { key: "min_order", label: "最小起订金额（元）", type: "number", value: "500" },
      { key: "auto_confirm_days", label: "自动确认收货天数", type: "number", value: "7" },
      { key: "invoice_rate", label: "增值税发票税率（%）", type: "number", value: "9" },
      { key: "deposit_ratio", label: "竞拍保证金比例（%）", type: "number", value: "10" },
    ],
  },
  {
    key: "auth", label: "认证配置",
    items: [
      { key: "real_name_required", label: "强制实名认证", type: "switch", value: "true" },
      { key: "enterprise_required", label: "强制企业认证", type: "switch", value: "true" },
      { key: "seal_required", label: "合同签署要求签章认证", type: "switch", value: "false" },
      { key: "credit_threshold", label: "信用评分最低门槛", type: "number", value: "600" },
    ],
  },
  {
    key: "notify", label: "通知配置",
    items: [
      { key: "sms_enabled", label: "短信通知", type: "switch", value: "true" },
      { key: "email_enabled", label: "邮件通知", type: "switch", value: "true" },
      { key: "push_enabled", label: "APP推送通知", type: "switch", value: "false" },
      { key: "order_notify", label: "订单状态变更通知", type: "switch", value: "true" },
    ],
  },
]

export default function PlatformConfigPage() {
  const [activeGroup, setActiveGroup] = useState("basic")
  const [configs, setConfigs] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {}
    CONFIG_GROUPS.forEach(g => g.items.forEach(i => { map[i.key] = i.value }))
    return map
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const current = CONFIG_GROUPS.find(g => g.key === activeGroup)!

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-bold text-[#1a1a2e]">参数配置</h1>
          <p className="text-[13px] text-[#999] mt-0.5">管理平台基础参数、交易规则及系统配置</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#dde3ec] text-[13px] text-[#666] rounded-lg hover:bg-[#f5f7fa]">
            <RefreshCw className="w-4 h-4" />重置默认
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] text-white text-[13px] rounded-lg hover:bg-[#2d2d4e] transition-colors">
            <Save className="w-4 h-4" />{saved ? "已保存" : "保存配置"}
          </button>
        </div>
      </div>

      <div className="flex gap-5">
        {/* Left nav */}
        <div className="w-44 shrink-0 space-y-1">
          {CONFIG_GROUPS.map(g => (
            <button key={g.key} onClick={() => setActiveGroup(g.key)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-[13px] transition-colors ${activeGroup === g.key ? "bg-[#1a1a2e] text-white font-semibold" : "text-[#444] hover:bg-white"}`}>
              <div className="flex items-center gap-2">
                <Settings className="w-3.5 h-3.5" />
                {g.label}
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </button>
          ))}
        </div>

        {/* Right form */}
        <div className="flex-1 bg-white rounded-xl border border-[#dde3ec] p-6">
          <h2 className="text-[15px] font-bold text-[#1a1a2e] mb-5">{current.label}</h2>
          <div className="space-y-5">
            {current.items.map(item => (
              <div key={item.key} className="flex items-center gap-4">
                <label className="w-48 text-[13px] text-[#555] font-medium shrink-0">{item.label}</label>
                {item.type === "switch" ? (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={configs[item.key] === "true"}
                      onChange={e => setConfigs(c => ({ ...c, [item.key]: String(e.target.checked) }))}
                      className="sr-only peer" />
                    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#1a5fa8] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                    <span className="ml-2 text-[13px] text-[#666]">{configs[item.key] === "true" ? "已开启" : "已关闭"}</span>
                  </label>
                ) : (
                  <input type={item.type} value={configs[item.key]}
                    onChange={e => setConfigs(c => ({ ...c, [item.key]: e.target.value }))}
                    className="flex-1 max-w-sm border border-[#dde3ec] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#1a5fa8]" />
                )}
              </div>
            ))}
          </div>

          {saved && (
            <div className="mt-6 flex items-center gap-2 text-[13px] text-[#2e7d32] bg-[#e8f5e9] px-4 py-2.5 rounded-lg">
              <Save className="w-4 h-4" />配置已保存成功
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
