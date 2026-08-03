"use client"

import { CheckCircle2 } from "lucide-react"

export default function AccountInfoPersonalPage() {
  return (
    <div className="space-y-5">
      {/* 基本信息 */}
      <div className="bg-white rounded-lg border border-[#e8edf5]">
        <div className="px-6 py-4 border-b border-[#f0f4f8]">
          <span className="text-[15px] font-bold text-[#1a1a2e]">基本信息</span>
        </div>
        <div className="px-8 py-6">
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 rounded-full bg-[#dde3ec] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 40 40" className="w-10 h-10 text-[#aaa]" fill="currentColor">
                <circle cx="20" cy="14" r="7" />
                <path d="M4 36c0-8.837 7.163-16 16-16s16 7.163 16 16" />
              </svg>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-x-8 gap-y-4 text-[13px]">
              <div className="flex items-center gap-2">
                <span className="text-[#6b7c93]">用户名：</span>
                <span className="text-[#1a1a2e] font-medium">吴珍</span>
                <span className="flex items-center gap-1 px-1.5 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[11px] rounded border border-[#b8d9f5]">
                  <CheckCircle2 className="w-3 h-3" /> 已实名认证
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#6b7c93]">认证企业名称：</span>
                <span className="text-[#999]">-</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#6b7c93]">登录账号：</span>
                <span className="text-[#1a1a2e]">178****7980</span>
                <button className="text-[#1a5fa8] text-[12px] hover:underline">修改</button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#6b7c93]">联系邮箱：</span>
                <span className="text-[#1a1a2e]">1687118382@qq.com</span>
                <button className="text-[#1a5fa8] text-[12px] hover:underline">修改</button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#6b7c93]">登录密码：</span>
                <span className="text-[#1a1a2e]">已设置，建议定期更换</span>
                <button className="text-[#1a5fa8] text-[12px] hover:underline">修改</button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#6b7c93] shrink-0">注册时间：</span>
                <span className="text-[#1a1a2e]">2024-03-15 09:30:57</span>
              </div>
              <div className="flex items-center gap-2 col-start-2">
                <span className="text-[#6b7c93] shrink-0">最后登录：</span>
                <span className="text-[#1a1a2e]">2026-06-10 09:30:57</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 企业信息 - 空状态 */}
      <div className="bg-white rounded-lg border border-[#e8edf5]">
        <div className="px-6 py-4 border-b border-[#f0f4f8]">
          <span className="text-[15px] font-bold text-[#1a1a2e]">企业信息</span>
        </div>
        <div className="py-16 flex flex-col items-center gap-4">
          <svg viewBox="0 0 80 80" className="w-20 h-20 text-[#dde3ec]" fill="currentColor">
            <rect x="10" y="20" width="60" height="50" rx="4" opacity="0.4" />
            <rect x="18" y="10" width="44" height="55" rx="4" opacity="0.7" />
            <rect x="26" y="26" width="28" height="3" rx="1.5" opacity="0.5" />
            <rect x="26" y="34" width="20" height="3" rx="1.5" opacity="0.5" />
            <rect x="26" y="42" width="24" height="3" rx="1.5" opacity="0.5" />
          </svg>
          <div className="text-center">
            <div className="text-[15px] font-semibold text-[#444]">您还未认证企业</div>
            <div className="text-[13px] text-[#999] mt-1">
              认证后您将作为认证用户参与平台交易。<br />
              如：商城下单、参与竞拍、订单农业、询价交易。
            </div>
          </div>
          <button className="px-8 py-2 bg-[#1a5fa8] text-white text-[14px] rounded hover:bg-[#0d4a8a] transition-colors">
            立即认证
          </button>
        </div>
      </div>
    </div>
  )
}
