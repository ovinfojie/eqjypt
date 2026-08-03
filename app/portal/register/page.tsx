"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Phone, Lock, Eye, EyeOff, User, ChevronRight, CheckCircle } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const STEPS = ["填写基本信息", "完善企业信息", "等待审核"]

export default function RegisterPage() {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPwd, setConfirmPwd] = useState("")
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [codeSent, setCodeSent] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [roleType, setRoleType] = useState<"buyer" | "seller" | "">("")

  const handleSendCode = () => {
    if (!phone || countdown > 0) return
    setCodeSent(true)
    setCountdown(60)
    const t = setInterval(() => {
      setCountdown((c) => { if (c <= 1) { clearInterval(t); return 0 } return c - 1 })
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/portal/register/complete")
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1 py-10 px-4">
        <div className="max-w-[560px] mx-auto">
          {/* Steps */}
          <div className="flex items-center justify-center mb-8">
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold border-2 transition-colors ${
                    i === 0
                      ? "bg-[#1a5fa8] border-[#1a5fa8] text-white"
                      : "bg-white border-border text-[#6b7c93]"
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`text-[12px] whitespace-nowrap ${i === 0 ? "text-[#1a5fa8] font-medium" : "text-[#6b7c93]"}`}>
                    {step}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-24 h-px bg-border mx-3 mb-5" />
                )}
              </div>
            ))}
          </div>

          {/* Card */}
          <div className="bg-white rounded-xl shadow-md px-8 py-7">
            <h2 className="text-[18px] font-bold text-[#1a1a2e] mb-5">填写基本信息</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role type */}
              <div>
                <label className="block text-[13px] text-[#333] mb-2 font-medium">注册身份 <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 gap-3">
                  {([["buyer", "采购商", "机关/学校/企事业单位"], ["seller", "供应商", "农业生产经营主体"]] as const).map(([key, label, desc]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setRoleType(key)}
                      className={`p-4 border-2 rounded-lg text-left transition-colors ${
                        roleType === key
                          ? "border-[#1a5fa8] bg-[#e8f4fd]"
                          : "border-border hover:border-[#1a5fa8]/40"
                      }`}
                    >
                      <div className={`text-[14px] font-semibold mb-0.5 ${roleType === key ? "text-[#1a5fa8]" : "text-[#1a1a2e]"}`}>
                        {label}
                      </div>
                      <div className="text-[12px] text-[#6b7c93]">{desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[13px] text-[#333] mb-1.5 font-medium">手机号码 <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2.5 focus-within:border-[#1a5fa8] transition-colors">
                  <Phone className="w-4 h-4 text-[#6b7c93] shrink-0" />
                  <input
                    type="tel"
                    placeholder="请输入手机号码"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 text-[14px] outline-none placeholder:text-[#bbb]"
                    required
                  />
                </div>
              </div>

              {/* SMS code */}
              <div>
                <label className="block text-[13px] text-[#333] mb-1.5 font-medium">短信验证码 <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center gap-2 border border-border rounded-lg px-3 py-2.5 focus-within:border-[#1a5fa8] transition-colors">
                    <input
                      type="text"
                      placeholder="请输入验证码"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      maxLength={6}
                      className="flex-1 text-[14px] outline-none placeholder:text-[#bbb]"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={countdown > 0 || !phone}
                    className={`px-4 py-2.5 rounded-lg text-[13px] font-medium whitespace-nowrap border transition-colors ${
                      countdown > 0 || !phone
                        ? "bg-[#f5f7fa] text-[#6b7c93] border-border cursor-not-allowed"
                        : "bg-[#e8f4fd] text-[#1a5fa8] border-[#1a5fa8]/30 hover:bg-[#1a5fa8] hover:text-white"
                    }`}
                  >
                    {countdown > 0 ? `${countdown}s后重发` : codeSent ? "重新发送" : "获取验证码"}
                  </button>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[13px] text-[#333] mb-1.5 font-medium">设置密码 <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2.5 focus-within:border-[#1a5fa8] transition-colors">
                  <Lock className="w-4 h-4 text-[#6b7c93] shrink-0" />
                  <input
                    type={showPwd ? "text" : "password"}
                    placeholder="8-20位，含字母和数字"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 text-[14px] outline-none placeholder:text-[#bbb]"
                    required
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="text-[#6b7c93] hover:text-[#333]">
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label className="block text-[13px] text-[#333] mb-1.5 font-medium">确认密码 <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2.5 focus-within:border-[#1a5fa8] transition-colors">
                  <Lock className="w-4 h-4 text-[#6b7c93] shrink-0" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="请再次输入密码"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    className="flex-1 text-[14px] outline-none placeholder:text-[#bbb]"
                    required
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-[#6b7c93] hover:text-[#333]">
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {confirmPwd && password !== confirmPwd && (
                  <p className="text-[12px] text-red-500 mt-1">两次输入的密码不一致</p>
                )}
              </div>

              {/* Agreement */}
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 accent-[#1a5fa8]" />
                <span className="text-[12px] text-[#6b7c93] leading-5">
                  我已阅读并同意
                  <Link href="#" className="text-[#1a5fa8] hover:underline">《平台用户协议》</Link>、
                  <Link href="#" className="text-[#1a5fa8] hover:underline">《隐私政策》</Link>
                  和
                  <Link href="#" className="text-[#1a5fa8] hover:underline">《担保交易规则》</Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={!agreed || !roleType}
                className={`w-full py-3 text-[15px] font-semibold rounded-lg transition-colors ${
                  agreed && roleType
                    ? "bg-[#1a5fa8] text-white hover:bg-[#0d4a8a]"
                    : "bg-[#6b7c93]/30 text-white cursor-not-allowed"
                }`}
              >
                下一步，完善企业信息
              </button>
            </form>

            <p className="text-center text-[13px] text-[#6b7c93] mt-4">
              已有账号？
              <Link href="/portal/login" className="text-[#1a5fa8] hover:underline font-medium">立即登录</Link>
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
