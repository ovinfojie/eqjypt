"use client"

import { CheckCircle2 } from "lucide-react"

export default function AccountInfoAdminPage() {
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
                <span className="text-[#1a1a2e]">广东供销数字科技有限公司</span>
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

      {/* 企业信息 */}
      <div className="bg-white rounded-lg border border-[#e8edf5]">
        <div className="px-6 py-4 border-b border-[#f0f4f8]">
          <span className="text-[15px] font-bold text-[#1a1a2e]">企业信息</span>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-[#f5f7fa] text-[#6b7c93]">
              {["企业名称", "企业类型", "身份", "状态", "创建时间", "操作"].map(h => (
                <th key={h} className="px-5 py-3 text-left font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-[#f0f4f8] hover:bg-[#fafbfc]">
              <td className="px-5 py-3 text-[#1a1a2e]">广东供销数字科技有限公司</td>
              <td className="px-5 py-3 text-[#555]">超级企业</td>
              <td className="px-5 py-3 text-[#555]">企业管理员</td>
              <td className="px-5 py-3">
                <span className="px-2 py-0.5 bg-[#e6f9f0] text-[#16a34a] text-[12px] rounded">启用</span>
              </td>
              <td className="px-5 py-3 text-[#999]">2026-05-22 14:15:30</td>
              <td className="px-5 py-3">
                <div className="flex items-center gap-2">
                  <button className="text-[#1a5fa8] text-[12px] hover:underline">查看</button>
                  <button className="text-[#1a5fa8] text-[12px] hover:underline">编辑</button>
                  <button className="text-[#e8831a] text-[12px] hover:underline">禁用</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
