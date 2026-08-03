"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Phone, Lock, User, ChevronRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

type TabType = "password" | "sms"

export default function LoginPage() {
  const [tab, setTab] = useState<TabType>("password")
  const [showPwd, setShowPwd] = useState(false)
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [smsCode, setSmsCode] = useState("")
  const [codeSent, setCodeSent] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [agreed, setAgreed] = useState(false)

  const handleSendCode = () => {
    if (!phone || countdown > 0) return
    setCodeSent(true)
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(timer); return 0 }
        return c - 1
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-[440px]">
          {/* Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Top banner */}
            <div className="bg-[#1a5fa8] px-8 pt-8 pb-6">
              <h1 className="text-[22px] font-bold text-white mb-1">欢迎登录</h1>
              <p className="text-[13px] text-white/70">粤供销公共型农产品产地交易服务平台</p>
            </div>

            <div className="px-8 py-6">
              {/* Tab */}
              <div className="flex border-b border-border mb-6">
                {([["password", "密码登录"], ["sms", "验证码登录"]] as [TabType, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    className={`flex-1 pb-3 text-[14px] font-medium transition-colors border-b-2 -mb-px ${
                      tab === key
                        ? "text-[#1a5fa8] border-[#1a5fa8]"
                        : "text-[#6b7c93] border-transparent hover:text-[#333]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {/* Phone */}
                <div>
                  <label className="block text-[13px] text-[#333] mb-1.5 font-medium">手机号码</label>
                  <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2.5 focus-within:border-[#1a5fa8] transition-colors bg-white">
                    <Phone className="w-4 h-4 text-[#6b7c93] shrink-0" />
                    <input
                      type="tel"
                      placeholder="请输入手机号码"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 text-[14px] outline-none placeholder:text-[#bbb]"
                    />
                  </div>
                </div>

                {/* Password or SMS */}
                {tab === "password" ? (
                  <div>
                    <label className="block text-[13px] text-[#333] mb-1.5 font-medium">登录密码</label>
                    <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2.5 focus-within:border-[#1a5fa8] transition-colors bg-white">
                      <Lock className="w-4 h-4 text-[#6b7c93] shrink-0" />
                      <input
                        type={showPwd ? "text" : "password"}
                        placeholder="请输入登录密码"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="flex-1 text-[14px] outline-none placeholder:text-[#bbb]"
                      />
                      <button onClick={() => setShowPwd(!showPwd)} className="text-[#6b7c93] hover:text-[#333] transition-colors">
                        {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="flex justify-end mt-1.5">
                      <Link href="#" className="text-[12px] text-[#1a5fa8] hover:underline">忘记密码?</Link>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-[13px] text-[#333] mb-1.5 font-medium">短信验证码</label>
                    <div className="flex gap-2">
                      <div className="flex-1 flex items-center gap-2 border border-border rounded-lg px-3 py-2.5 focus-within:border-[#1a5fa8] transition-colors bg-white">
                        <input
                          type="text"
                          placeholder="请输入验证码"
                          value={smsCode}
                          onChange={(e) => setSmsCode(e.target.value)}
                          maxLength={6}
                          className="flex-1 text-[14px] outline-none placeholder:text-[#bbb]"
                        />
                      </div>
                      <button
                        onClick={handleSendCode}
                        disabled={countdown > 0 || !phone}
                        className={`px-4 py-2.5 rounded-lg text-[13px] font-medium whitespace-nowrap transition-colors border ${
                          countdown > 0 || !phone
                            ? "bg-[#f5f7fa] text-[#6b7c93] border-border cursor-not-allowed"
                            : "bg-[#e8f4fd] text-[#1a5fa8] border-[#1a5fa8]/30 hover:bg-[#1a5fa8] hover:text-white"
                        }`}
                      >
                        {countdown > 0 ? `${countdown}s后重发` : codeSent ? "重新发送" : "获取验证码"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Agreement */}
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 accent-[#1a5fa8]"
                  />
                  <span className="text-[12px] text-[#6b7c93] leading-5">
                    我已阅读并同意
                    <Link href="#" className="text-[#1a5fa8] hover:underline">《用户协议》</Link>
                    和
                    <Link href="#" className="text-[#1a5fa8] hover:underline">《隐私政策》</Link>
                  </span>
                </label>

                {/* Submit */}
                <Link
                  href="/portal"
                  className={`block w-full py-3 text-center text-[15px] font-semibold rounded-lg transition-colors ${
                    agreed
                      ? "bg-[#1a5fa8] text-white hover:bg-[#0d4a8a]"
                      : "bg-[#6b7c93]/30 text-white cursor-not-allowed pointer-events-none"
                  }`}
                >
                  立即登录
                </Link>
              </div>

              {/* Divider */}
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-[12px] text-[#6b7c93]">还没有账号？</span>
                </div>
              </div>

              <Link
                href="/portal/register"
                className="flex items-center justify-center gap-1 w-full py-2.5 border border-[#1a5fa8] text-[#1a5fa8] text-[14px] font-medium rounded-lg hover:bg-[#e8f4fd] transition-colors"
              >
                免费注册 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Other login methods */}
          <p className="text-center text-[12px] text-[#6b7c93] mt-4">
            如需帮助，请联系客服：
            <span className="text-[#1a5fa8] font-medium">400-000-0000</span>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
