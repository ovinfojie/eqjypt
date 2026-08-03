"use client"

import { useState } from "react"
import { ChevronLeft, CheckCircle, Leaf, MapPin, Wheat, Building2, Truck, Warehouse } from "lucide-react"
import Link from "next/link"

const serviceTypes = [
  { id: "station", icon: MapPin,      label: "乡镇农产品综合服务站", desc: "申请在乡镇设立农产品综合服务站" },
  { id: "farm",    icon: Leaf,        label: "供销农场合作基地",    desc: "申请成为供销认证合作种植/养殖基地" },
  { id: "grain",   icon: Wheat,       label: "粮食收购加工合作",    desc: "申请加入粮食全产业链收购加工服务" },
  { id: "cold",    icon: Warehouse,   label: "冷链仓储服务入驻",    desc: "申请提供冷链仓储服务" },
  { id: "delivery",icon: Truck,       label: "农产品直供配送",      desc: "申请提供农产品配送服务" },
  { id: "service", icon: Building2,   label: "综合服务机构入驻",    desc: "申请提供综合农业社会化服务" },
]

export default function ShenQingPage() {
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
  <>
    <div className="max-w-[480px] mx-auto py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-[#3a8c3f]/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-[#3a8c3f]" />
          </div>
          <h2 className="text-[20px] font-bold text-[#1a1a2e] mb-2">申请已提交</h2>
          <p className="text-[13px] text-[#6b7c93] mb-6">
            申请编号：QCY2026080112345<br />
            平台将在 1-3 个工作日内审核您的申请，结果将通过站内消息和短信通知。
          </p>
          <Link
            href="/merchant/quancyl/wo-de-fuwu"
            className="inline-block px-6 py-2.5 bg-[#1a5fa8] text-white text-[13px] rounded-lg hover:bg-[#0d4a8a] transition-colors"
          >
            查看我的服务
          </Link>
        </div>
  </>
)
  }

  return (
  <>
    {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/merchant/quancyl/wo-de-fuwu" className="flex items-center gap-1 text-[13px] text-[#6b7c93] hover:text-[#1a5fa8]">
          <ChevronLeft className="w-4 h-4" />
          返回我的服务
        </Link>
        <span className="text-[#dde3ec]">|</span>
        <h1 className="text-[16px] font-bold text-[#1a1a2e]">申请全产业链服务合作</h1>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-0 mb-8">
        {["选择服务类型", "填写申请信息", "提交审核"].map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`flex items-center gap-2 ${step > i + 1 ? "text-[#3a8c3f]" : step === i + 1 ? "text-[#1a5fa8]" : "text-[#bbb]"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold border-2 ${
                step > i + 1 ? "border-[#3a8c3f] bg-[#3a8c3f] text-white" :
                step === i + 1 ? "border-[#1a5fa8] text-[#1a5fa8]" : "border-[#dde3ec] text-[#bbb]"
              }`}>
                {step > i + 1 ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className="text-[13px] font-medium">{s}</span>
            </div>
            {i < 2 && <div className="w-16 h-px bg-[#e0e6ef] mx-3" />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#e0e6ef] p-6">
        {/* Step 1: 选择类型 */}
        {step === 1 && (
          <>
            <h3 className="text-[15px] font-semibold text-[#1a1a2e] mb-5">请选择申请的服务类型</h3>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {serviceTypes.map(t => {
                const Icon = t.icon
                const isSelected = selectedType === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedType(t.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected ? "border-[#1a5fa8] bg-[#e8f4fd]" : "border-[#e0e6ef] hover:border-[#1a5fa8]/40"
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-2.5 ${isSelected ? "text-[#1a5fa8]" : "text-[#999]"}`} />
                    <div className={`text-[13px] font-semibold mb-1 ${isSelected ? "text-[#1a5fa8]" : "text-[#333]"}`}>
                      {t.label}
                    </div>
                    <div className="text-[11px] text-[#999] leading-relaxed">{t.desc}</div>
                  </button>
                )
              })}
            </div>
            <div className="flex justify-end">
              <button
                disabled={!selectedType}
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0d4a8a] transition-colors"
              >
                下一步
              </button>
            </div>
          </>
        )}

        {/* Step 2: 填写信息 */}
        {step === 2 && (
          <>
            <h3 className="text-[15px] font-semibold text-[#1a1a2e] mb-5">填写申请信息</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { label: "申请主体名称",   placeholder: "企业或机构全称",   span: 2 },
                { label: "统一社会信用代码", placeholder: "18位信用代码",   span: 1 },
                { label: "所在地区",       placeholder: "省 / 市 / 县",    span: 1 },
                { label: "联系人",         placeholder: "联系人姓名",      span: 1 },
                { label: "联系电话",       placeholder: "手机号码",        span: 1 },
                { label: "现有规模说明",   placeholder: "如：年产量、仓储规模、服务能力等", span: 2 },
              ].map(f => (
                <div key={f.label} className={f.span === 2 ? "col-span-2" : ""}>
                  <label className="text-[12px] font-medium text-[#333] mb-1.5 flex items-center gap-1">
                    <span className="text-red-500">*</span>{f.label}
                  </label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] outline-none focus:border-[#1a5fa8] transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="text-[12px] font-medium text-[#333] mb-1.5 block">合作意向说明</label>
              <textarea
                rows={3}
                placeholder="请简述您的合作意向和期望获得的支持..."
                className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] outline-none focus:border-[#1a5fa8] transition-colors resize-none"
              />
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 border border-[#dde3ec] text-[#666] text-[13px] rounded-lg hover:bg-[#f5f7fa] transition-colors"
              >
                上一步
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded-lg hover:bg-[#0d4a8a] transition-colors"
              >
                下一步
              </button>
            </div>
          </>
        )}

        {/* Step 3: 确认提交 */}
        {step === 3 && (
          <>
            <h3 className="text-[15px] font-semibold text-[#1a1a2e] mb-5">确认提交</h3>
            <div className="bg-[#f8fafc] rounded-xl p-5 mb-6 space-y-3 text-[13px]">
              {[
                { label: "服务类型", value: serviceTypes.find(t => t.id === selectedType)?.label ?? "" },
                { label: "申请主体", value: "广东XX农业科技有限公司" },
                { label: "联系人",   value: "张总 / 138xxxx1234" },
                { label: "所在地区", value: "广东省广州市番禺区" },
              ].map(item => (
                <div key={item.label} className="flex gap-3">
                  <span className="text-[#999] w-16 shrink-0">{item.label}</span>
                  <span className="text-[#1a1a2e] font-medium">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-2 mb-6">
              <input type="checkbox" id="agree" className="mt-1" />
              <label htmlFor="agree" className="text-[12px] text-[#6b7c93]">
                我确认以上信息真实有效，并同意平台
                <span className="text-[#1a5fa8] cursor-pointer">《合作服务协议》</span>
              </label>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 border border-[#dde3ec] text-[#666] text-[13px] rounded-lg hover:bg-[#f5f7fa] transition-colors"
              >
                上一步
              </button>
              <button
                onClick={() => setSubmitted(true)}
                className="px-6 py-2.5 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded-lg hover:bg-[#0d4a8a] transition-colors"
              >
                提交申请
              </button>
            </div>
          </>
        )}
      </div>
  </>
)
}