"use client"

import { useState } from "react"
import { Shield, Upload, CheckCircle2, ChevronLeft } from "lucide-react"
import Link from "next/link"

const STEPS = ["填写认证信息", "上传证明材料", "提交审核"]

export default function SealCertPage() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="max-w-[640px] space-y-5">
      <div className="flex items-center gap-2">
        <Link href="/merchant/account/info" className="flex items-center gap-1 text-[13px] text-[#6b7c93] hover:text-[#1a5fa8] transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" />账号信息
        </Link>
        <span className="text-[#ccc]">/</span>
        <span className="text-[13px] text-[#1a1a2e] font-medium">申请签章认证</span>
      </div>

      <div className="bg-white rounded-xl border border-[#e8edf5] p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#e8f4fd] flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#1a5fa8]" />
          </div>
          <div>
            <h1 className="text-[16px] font-bold text-[#1a1a2e]">电子签章认证申请</h1>
            <p className="text-[12px] text-[#6b7c93]">完成认证后，可在平台合同中使用具有法律效力的电子印章</p>
          </div>
        </div>

        {/* 进度条 */}
        <div className="flex items-center mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={`flex items-center gap-2 ${i <= step ? "text-[#1a5fa8]" : "text-[#aaa]"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold border-2 ${i < step ? "bg-[#1a5fa8] border-[#1a5fa8] text-white" : i === step ? "border-[#1a5fa8] text-[#1a5fa8]" : "border-[#dde3ec] text-[#aaa]"}`}>
                  {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className="text-[13px] font-medium whitespace-nowrap">{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-3 ${i < step ? "bg-[#1a5fa8]" : "bg-[#e8edf5]"}`} />}
            </div>
          ))}
        </div>

        {!submitted ? (
          <>
            {step === 0 && (
              <div className="space-y-4">
                {[
                  { label: "企业名称",     placeholder: "请输入企业全称（与营业执照一致）", required: true },
                  { label: "统一社会信用代码", placeholder: "请输入18位统一社会信用代码", required: true },
                  { label: "法定代表人",   placeholder: "请输入法定代表人姓名", required: true },
                  { label: "法人身份证号", placeholder: "请输入法定代表人身份证号码", required: true },
                  { label: "联系人姓名",   placeholder: "请输入经办人姓名", required: false },
                  { label: "联系人电话",   placeholder: "请输入经办人手机号", required: false },
                ].map(f => (
                  <div key={f.label} className="flex items-start gap-4">
                    <label className="text-[13px] text-[#444] w-32 shrink-0 pt-2">
                      {f.required && <span className="text-red-500 mr-1">*</span>}{f.label}
                    </label>
                    <input className="flex-1 border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder={f.placeholder} />
                  </div>
                ))}
                <div className="flex justify-end pt-2">
                  <button onClick={() => setStep(1)} className="px-8 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">下一步</button>
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="space-y-4">
                {["营业执照原件扫描件", "法人身份证正反面", "企业公章印模（可选）"].map(label => (
                  <div key={label} className="flex items-center gap-4">
                    <span className="text-[13px] text-[#444] w-44 shrink-0">{label}</span>
                    <label className="flex items-center gap-2 px-4 py-8 border-2 border-dashed border-[#dde3ec] rounded-lg cursor-pointer hover:border-[#1a5fa8] hover:bg-[#f8faff] transition-all flex-1 justify-center">
                      <Upload className="w-4 h-4 text-[#aaa]" />
                      <span className="text-[12px] text-[#aaa]">点击上传，支持 JPG/PNG/PDF</span>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                ))}
                <div className="flex gap-3 justify-end pt-2">
                  <button onClick={() => setStep(0)} className="px-6 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:bg-[#f5f7fa] transition-colors">上一步</button>
                  <button onClick={() => setStep(2)} className="px-8 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">下一步</button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div className="bg-[#f8faff] rounded-lg p-4 text-[13px] text-[#444] space-y-2">
                  <div className="flex justify-between"><span className="text-[#999]">企业名称</span><span>盒马超市采购部</span></div>
                  <div className="flex justify-between"><span className="text-[#999]">统一社会信用代码</span><span>91440101MA5XXXXXXX</span></div>
                  <div className="flex justify-between"><span className="text-[#999]">法定代表人</span><span>张某某</span></div>
                  <div className="flex justify-between"><span className="text-[#999]">已上传材料</span><span className="text-[#3a8c3f]">3份</span></div>
                </div>
                <p className="text-[12px] text-[#6b7c93] bg-[#fff8f0] rounded p-3">提交后，平台将在 3 个工作日内完成审核。审核通过后，您的电子封章将自动激活并可用于合同签署。</p>
                <div className="flex gap-3 justify-end pt-2">
                  <button onClick={() => setStep(1)} className="px-6 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:bg-[#f5f7fa] transition-colors">上一步</button>
                  <button onClick={() => setSubmitted(true)} className="px-8 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">提交申请</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle2 className="w-14 h-14 text-[#3a8c3f] mx-auto mb-4" />
            <h2 className="text-[16px] font-bold text-[#1a1a2e] mb-2">申请已提交</h2>
            <p className="text-[13px] text-[#6b7c93] mb-6">平台将在 3 个工作日内完成审核，审核结果将通过短信通知您。</p>
            <Link href="/merchant/account/info" className="px-8 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">返回账号信息</Link>
          </div>
        )}
      </div>
    </div>
  )
}
