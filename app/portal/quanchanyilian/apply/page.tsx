"use client"

import Link from "next/link"
import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ChevronRight, CheckCircle, Leaf, MapPin, Wheat, Building2 } from "lucide-react"

const types = [
  { id: "farm",    icon: Leaf,      label: "供销农场合作",    desc: "生产基地共建共商共享" },
  { id: "base",    icon: Wheat,     label: "合作种植养殖基地", desc: "订单种植/养殖合作" },
  { id: "service", icon: Building2, label: "服务机构入驻",    desc: "加工/仓储/运输服务商" },
  { id: "station", icon: MapPin,    label: "乡镇服务站合作",  desc: "基层综合服务站加盟" },
]

export default function ApplyPage() {
  const [applyType, setApplyType] = useState("farm")
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#3a8c3f]/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-[#3a8c3f]" />
            </div>
            <h2 className="text-[22px] font-bold text-[#1a1a2e] mb-2">申请已提交</h2>
            <p className="text-[14px] text-[#6b7c93] mb-6">我们的服务团队将在 1-3 个工作日内与您联系</p>
            <Link
              href="/portal/quanchanyilian"
              className="inline-block px-6 py-2.5 bg-[#1a5fa8] text-white text-[14px] rounded-lg hover:bg-[#0d4a8a] transition-colors"
            >
              返回全产业链服务
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <SiteHeader />

      <div className="bg-white border-b border-[#e8edf5]">
        <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center gap-1.5 text-[13px] text-[#6b7c93]">
          <Link href="/portal" className="hover:text-[#1a5fa8]">首页</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/portal/quanchanyilian" className="hover:text-[#1a5fa8]">全产业链服务</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1a1a2e]">申请合作入驻</span>
        </div>
      </div>

      <div className="max-w-[760px] mx-auto px-6 py-10 w-full">
        <div className="text-center mb-8">
          <h1 className="text-[26px] font-bold text-[#1a1a2e] mb-2">申请合作入驻</h1>
          <p className="text-[14px] text-[#6b7c93]">选择合作类型，填写信息后提交，1-3个工作日内回复</p>
        </div>

        {/* 合作类型选择 */}
        <div className="bg-white rounded-xl border border-[#e0e6ef] p-6 mb-5">
          <h3 className="text-[14px] font-semibold text-[#1a1a2e] mb-4">
            <span className="text-red-500 mr-1">*</span>选择合作类型
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {types.map(t => {
              const Icon = t.icon
              const isActive = applyType === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setApplyType(t.id)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    isActive
                      ? "border-[#1a5fa8] bg-[#e8f4fd]"
                      : "border-[#e0e6ef] hover:border-[#1a5fa8]/40"
                  }`}
                >
                  <Icon className={`w-5 h-5 mx-auto mb-2 ${isActive ? "text-[#1a5fa8]" : "text-[#999]"}`} />
                  <div className={`text-[12px] font-semibold mb-0.5 ${isActive ? "text-[#1a5fa8]" : "text-[#333]"}`}>
                    {t.label}
                  </div>
                  <div className="text-[11px] text-[#999]">{t.desc}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* 申请表单 */}
        <div className="bg-white rounded-xl border border-[#e0e6ef] p-6">
          <h3 className="text-[14px] font-semibold text-[#1a1a2e] mb-5">填写申请信息</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              { label: "企业/机构名称", placeholder: "请输入企业或机构全称", span: 2 },
              { label: "统一社会信用代码", placeholder: "18位统一社会信用代码", span: 1 },
              { label: "营业执照注册地",   placeholder: "省/市/县",            span: 1 },
              { label: "联系人姓名",       placeholder: "请输入联系人姓名",   span: 1 },
              { label: "联系人职务",       placeholder: "如：总经理",          span: 1 },
              { label: "联系电话",         placeholder: "请输入手机号码",     span: 1 },
              { label: "电子邮箱",         placeholder: "请输入邮箱",         span: 1 },
            ].map(f => (
              <div key={f.label} className={f.span === 2 ? "col-span-2" : ""}>
                <label className="text-[13px] font-medium text-[#333] mb-1.5 flex items-center gap-1">
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
            <label className="text-[13px] font-medium text-[#333] mb-1.5 block">
              业务规模及合作意向说明
            </label>
            <textarea
              rows={4}
              placeholder="请简述您的业务规模、现有资源和合作意向，有助于我们为您提供更精准的服务方案..."
              className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] outline-none focus:border-[#1a5fa8] transition-colors resize-none"
            />
          </div>
          <div className="mb-6 flex items-start gap-2">
            <input type="checkbox" id="agree" className="mt-1" />
            <label htmlFor="agree" className="text-[12px] text-[#6b7c93]">
              我已阅读并同意
              <Link href="#" className="text-[#1a5fa8] mx-0.5">《平台合作协议》</Link>
              及
              <Link href="#" className="text-[#1a5fa8] mx-0.5">《隐私政策》</Link>
            </label>
          </div>
          <button
            onClick={() => setSubmitted(true)}
            className="w-full py-3 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded-lg hover:bg-[#0d4a8a] transition-colors"
          >
            提交申请
          </button>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
