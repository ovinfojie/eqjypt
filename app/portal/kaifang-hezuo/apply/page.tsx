"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CheckCircle, ChevronLeft, Globe, Truck, ShoppingBag, BarChart2 } from "lucide-react"

const TYPES = [
  { id: "platform", icon: Globe,       label: "平台入驻合作", desc: "农产品生产商、供应商、采购商入驻" },
  { id: "channel",  icon: Truck,       label: "渠道经销合作", desc: "渠道经销商、基层网点合作" },
  { id: "supply",   icon: ShoppingBag, label: "采购供应合作", desc: "大型商超、电商平台直采合作" },
  { id: "tech",     icon: BarChart2,   label: "数据技术合作", desc: "科研机构、技术服务商合作" },
]

const INDUSTRY_OPTIONS = ["农业生产", "农产品加工", "农产品贸易", "农业物流", "农业金融", "农业科技", "政府/机构", "其他"]

export default function KaifangHezuoApplyPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [coopType, setCoopType] = useState("")
  const [form, setForm] = useState({ companyName: "", contact: "", phone: "", email: "", industry: "", scale: "", desc: "" })
  const [submitted, setSubmitted] = useState(false)

  const update = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }))

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f5f7fa]">
        <SiteHeader />
        <div className="max-w-[600px] mx-auto py-24 text-center px-6">
          <div className="w-20 h-20 rounded-full bg-[#e8fdf0] flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-[#3a8c3f]" />
          </div>
          <h2 className="text-[24px] font-bold text-[#1a1a2e] mb-2">合作申请已提交</h2>
          <p className="text-[15px] text-[#666] leading-relaxed mb-6">
            感谢您的合作意向！我们的商务团队将在 3 个工作日内与您联系，请保持电话畅通。
          </p>
          <div className="bg-white rounded-xl border border-[#e8edf5] p-5 text-left mb-8 text-[13px] space-y-2.5">
            <div className="flex justify-between"><span className="text-[#888]">合作类型</span><span className="font-medium">{TYPES.find(t => t.id === coopType)?.label}</span></div>
            <div className="flex justify-between"><span className="text-[#888]">企业名称</span><span className="font-medium">{form.companyName}</span></div>
            <div className="flex justify-between"><span className="text-[#888]">联系人</span><span className="font-medium">{form.contact}</span></div>
            <div className="flex justify-between"><span className="text-[#888]">申请编号</span><span className="font-medium text-[#1a5fa8]">HZ-{Date.now().toString().slice(-8)}</span></div>
          </div>
          <div className="flex gap-3 justify-center">
            <Link href="/portal/kaifang-hezuo" className="px-6 py-2.5 border border-[#dde3ec] text-[#555] rounded text-[14px] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
              返回合作页
            </Link>
            <Link href="/portal" className="px-6 py-2.5 bg-[#1a5fa8] text-white rounded text-[14px] font-medium hover:bg-[#1550a0] transition-colors">
              回到首页
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <SiteHeader />
      <div className="max-w-[760px] mx-auto px-6 py-10">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/portal/kaifang-hezuo" className="flex items-center gap-1 text-[#888] hover:text-[#1a5fa8] text-[13px] transition-colors">
            <ChevronLeft className="w-4 h-4" />
            开放合作共赢
          </Link>
          <span className="text-[#ddd]">/</span>
          <span className="text-[#1a1a2e] text-[13px] font-medium">申请合作</span>
        </div>

        <h1 className="text-[24px] font-bold text-[#1a1a2e] mb-1">申请合作</h1>
        <p className="text-[14px] text-[#888] mb-6">填写以下信息，我们将尽快与您联系洽谈合作细节</p>

        {/* Steps */}
        <div className="flex items-center gap-3 mb-8">
          {[["1", "选择合作类型"], ["2", "填写企业信息"], ["3", "确认提交"]].map(([n, label], i) => (
            <div key={n} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 ${Number(n) <= step ? "text-[#1a5fa8]" : "text-[#bbb]"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0 ${Number(n) < step ? "bg-[#1a5fa8] text-white" : Number(n) === step ? "bg-[#1a5fa8] text-white" : "bg-[#f0f4f8] text-[#bbb]"}`}>{Number(n) < step ? "✓" : n}</div>
                <span className="text-[13px] font-medium whitespace-nowrap">{label}</span>
              </div>
              {i < 2 && <div className={`w-12 h-px ${Number(n) < step ? "bg-[#1a5fa8]" : "bg-[#dde3ec]"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {TYPES.map(t => {
                const Icon = t.icon
                const selected = coopType === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => setCoopType(t.id)}
                    className={`text-left p-5 rounded-xl border-2 transition-all bg-white ${selected ? "border-[#1a5fa8] shadow-md" : "border-[#e8edf5] hover:border-[#1a5fa8]/40"}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#e8f4fd] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#1a5fa8]" />
                      </div>
                      {selected && <CheckCircle className="w-5 h-5 text-[#1a5fa8]" />}
                    </div>
                    <div className="text-[15px] font-bold text-[#1a1a2e] mb-1">{t.label}</div>
                    <div className="text-[13px] text-[#888]">{t.desc}</div>
                  </button>
                )
              })}
            </div>
            <div className="flex justify-end">
              <button disabled={!coopType} onClick={() => setStep(2)} className="px-8 py-2.5 bg-[#1a5fa8] text-white rounded text-[14px] font-medium hover:bg-[#1550a0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                下一步
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="bg-white rounded-xl border border-[#e8edf5] p-6 space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2">
                <label className="block text-[13px] font-medium text-[#555] mb-1.5">企业/机构名称<span className="text-[#d9534f]">*</span></label>
                <input value={form.companyName} onChange={e => update("companyName", e.target.value)} placeholder="请输入企业或机构全称" className="w-full px-3 py-2 border border-[#dde3ec] rounded text-[14px] focus:outline-none focus:border-[#1a5fa8]" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#555] mb-1.5">联系人姓名<span className="text-[#d9534f]">*</span></label>
                <input value={form.contact} onChange={e => update("contact", e.target.value)} placeholder="请输入联系人姓名" className="w-full px-3 py-2 border border-[#dde3ec] rounded text-[14px] focus:outline-none focus:border-[#1a5fa8]" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#555] mb-1.5">联系电话<span className="text-[#d9534f]">*</span></label>
                <input value={form.phone} onChange={e => update("phone", e.target.value)} type="tel" placeholder="请输入联系电话" className="w-full px-3 py-2 border border-[#dde3ec] rounded text-[14px] focus:outline-none focus:border-[#1a5fa8]" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#555] mb-1.5">电子邮箱</label>
                <input value={form.email} onChange={e => update("email", e.target.value)} type="email" placeholder="请输入邮箱地址" className="w-full px-3 py-2 border border-[#dde3ec] rounded text-[14px] focus:outline-none focus:border-[#1a5fa8]" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#555] mb-1.5">所属行业<span className="text-[#d9534f]">*</span></label>
                <select value={form.industry} onChange={e => update("industry", e.target.value)} className="w-full px-3 py-2 border border-[#dde3ec] rounded text-[14px] focus:outline-none focus:border-[#1a5fa8] bg-white">
                  <option value="">请选择行业</option>
                  {INDUSTRY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#555] mb-1.5">企业规模</label>
                <select value={form.scale} onChange={e => update("scale", e.target.value)} className="w-full px-3 py-2 border border-[#dde3ec] rounded text-[14px] focus:outline-none focus:border-[#1a5fa8] bg-white">
                  <option value="">请选择规模</option>
                  {["50人以下", "50-200人", "200-500人", "500-1000人", "1000人以上"].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-[13px] font-medium text-[#555] mb-1.5">合作意向描述<span className="text-[#d9534f]">*</span></label>
                <textarea value={form.desc} onChange={e => update("desc", e.target.value)} rows={4} placeholder="请简要描述您的合作意向、主营业务以及期望合作方式（不少于50字）" className="w-full px-3 py-2 border border-[#dde3ec] rounded text-[14px] focus:outline-none focus:border-[#1a5fa8] resize-none" />
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <button onClick={() => setStep(1)} className="px-6 py-2.5 border border-[#dde3ec] text-[#555] rounded text-[14px] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">上一步</button>
              <button disabled={!form.companyName || !form.contact || !form.phone || !form.industry || !form.desc} onClick={() => setStep(3)} className="px-8 py-2.5 bg-[#1a5fa8] text-white rounded text-[14px] font-medium hover:bg-[#1550a0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">下一步</button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="bg-white rounded-xl border border-[#e8edf5] p-6 space-y-5">
            <h3 className="text-[15px] font-bold text-[#1a1a2e]">确认申请信息</h3>
            <div className="space-y-2.5 text-[13px]">
              {[
                { label: "合作类型", value: TYPES.find(t => t.id === coopType)?.label || "" },
                { label: "企业名称", value: form.companyName },
                { label: "联系人",   value: form.contact },
                { label: "联系电话", value: form.phone },
                { label: "电子邮箱", value: form.email || "（未填写）" },
                { label: "所属行业", value: form.industry },
                { label: "企业规模", value: form.scale || "（未填写）" },
                { label: "合作意向", value: form.desc },
              ].map(item => (
                <div key={item.label} className="flex gap-4 py-2.5 border-b border-[#f0f4f8] last:border-0">
                  <span className="w-20 text-[#888] shrink-0">{item.label}</span>
                  <span className="font-medium text-[#1a1a2e]">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-2">
              <button onClick={() => setStep(2)} className="px-6 py-2.5 border border-[#dde3ec] text-[#555] rounded text-[14px] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">上一步</button>
              <button onClick={() => setSubmitted(true)} className="px-8 py-2.5 bg-[#1a5fa8] text-white rounded text-[14px] font-medium hover:bg-[#1550a0] transition-colors">确认提交</button>
            </div>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  )
}
