"use client"

import { useState } from "react"
import { User, Phone, Lock, Shield, CheckCircle2, Clock, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function AccountInfoPage() {
  const [editPhone, setEditPhone] = useState(false)
  const [editPwd, setEditPwd] = useState(false)

  return (
    <div className="max-w-[760px] space-y-5">
      <div>
        <h1 className="text-[20px] font-bold text-[#1a1a2e] mb-1">账号信息</h1>
        <p className="text-[13px] text-[#6b7c93]">管理您的登录账号、手机号与密码安全设置。</p>
      </div>

      {/* 账号基本信息 */}
      <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#f0f4f8] flex items-center gap-2">
          <User className="w-4 h-4 text-[#1a5fa8]" />
          <span className="text-[14px] font-semibold text-[#1a1a2e]">账号基本信息</span>
        </div>
        <div className="divide-y divide-[#f0f4f8]">
          {[
            { label: "登录账号", value: "hm_caigou_dept", editable: false },
            { label: "账号类型", value: "企业主账号", editable: false },
            { label: "注册时间", value: "2024-03-15", editable: false },
            { label: "最近登录", value: "2026-08-02 09:31（广州市）", editable: false },
          ].map(row => (
            <div key={row.label} className="px-6 py-4 flex items-center justify-between">
              <span className="text-[13px] text-[#6b7c93] w-28 shrink-0">{row.label}</span>
              <span className="flex-1 text-[13px] text-[#1a1a2e]">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 手机号 */}
      <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#f0f4f8] flex items-center gap-2">
          <Phone className="w-4 h-4 text-[#1a5fa8]" />
          <span className="text-[14px] font-semibold text-[#1a1a2e]">手机号码</span>
        </div>
        <div className="px-6 py-4">
          {!editPhone ? (
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[15px] font-semibold text-[#1a1a2e]">138****8888</div>
                <div className="text-[12px] text-[#6b7c93] mt-0.5">用于登录验证与重要通知接收</div>
              </div>
              <button onClick={() => setEditPhone(true)}
                className="px-4 py-1.5 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded hover:bg-[#e8f4fd] transition-colors">
                修改手机号
              </button>
            </div>
          ) : (
            <div className="space-y-3 max-w-[400px]">
              <div>
                <label className="block text-[12px] text-[#6b7c93] mb-1">原手机号验证码</label>
                <div className="flex gap-2">
                  <input className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入验证码" />
                  <button className="px-3 py-1.5 bg-[#e8f4fd] text-[#1a5fa8] text-[12px] rounded whitespace-nowrap">发送验证码</button>
                </div>
              </div>
              <div>
                <label className="block text-[12px] text-[#6b7c93] mb-1">新手机号</label>
                <input className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入新手机号" />
              </div>
              <div>
                <label className="block text-[12px] text-[#6b7c93] mb-1">新手机号验证码</label>
                <div className="flex gap-2">
                  <input className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入验证码" />
                  <button className="px-3 py-1.5 bg-[#e8f4fd] text-[#1a5fa8] text-[12px] rounded whitespace-nowrap">发送验证码</button>
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button className="px-5 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">确认修改</button>
                <button onClick={() => setEditPhone(false)} className="px-5 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:bg-[#f5f7fa] transition-colors">取消</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 登录密码 */}
      <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#f0f4f8] flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#1a5fa8]" />
          <span className="text-[14px] font-semibold text-[#1a1a2e]">登录密码</span>
        </div>
        <div className="px-6 py-4">
          {!editPwd ? (
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[15px] font-semibold text-[#1a1a2e]">••••••••</div>
                <div className="text-[12px] text-[#6b7c93] mt-0.5">上次修改：2025-12-01</div>
              </div>
              <button onClick={() => setEditPwd(true)}
                className="px-4 py-1.5 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded hover:bg-[#e8f4fd] transition-colors">
                修改密码
              </button>
            </div>
          ) : (
            <div className="space-y-3 max-w-[400px]">
              {["原密码", "新密码", "确认新密码"].map(label => (
                <div key={label}>
                  <label className="block text-[12px] text-[#6b7c93] mb-1">{label}</label>
                  <input type="password" className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder={`请输入${label}`} />
                </div>
              ))}
              <div className="flex gap-2 pt-1">
                <button className="px-5 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">确认修改</button>
                <button onClick={() => setEditPwd(false)} className="px-5 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:bg-[#f5f7fa] transition-colors">取消</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 封章认证 */}
      <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#f0f4f8] flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#1a5fa8]" />
          <span className="text-[14px] font-semibold text-[#1a1a2e]">电子封章认证</span>
        </div>
        <div className="px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#fff8f0] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#e8831a]" />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-[#1a1a2e]">尚未申请电子封章</div>
              <div className="text-[12px] text-[#6b7c93] mt-0.5">申请后可在平台合同中使用电子印章，具备法律效力</div>
            </div>
          </div>
          <Link href="/merchant/account/seal-cert"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
            申请签章认证 <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
