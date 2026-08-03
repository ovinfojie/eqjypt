"use client"

import { useState } from "react"
import { Building2, Upload, CheckCircle2, Clock, ChevronRight } from "lucide-react"
import Link from "next/link"

const certStatus = { label: "已认证", color: "#3a8c3f", bg: "#e8f5e9", icon: CheckCircle2 }

export default function EnterpriseInfoPage() {
  const [editing, setEditing] = useState(false)

  return (
    <div className="max-w-[800px] space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a2e] mb-1">企业信息</h1>
          <p className="text-[13px] text-[#6b7c93]">管理企业基本信息、资质认证及相关证件。</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium" style={{ color: certStatus.color, background: certStatus.bg }}>
            <certStatus.icon className="w-3.5 h-3.5" />{certStatus.label}
          </span>
          {!editing && (
            <button onClick={() => setEditing(true)} className="px-4 py-1.5 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded hover:bg-[#e8f4fd] transition-colors">编辑信息</button>
          )}
        </div>
      </div>

      {/* 基本信息 */}
      <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#f0f4f8] flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#1a5fa8]" />
          <span className="text-[14px] font-semibold text-[#1a1a2e]">企业基本信息</span>
        </div>
        <div className="p-6 grid grid-cols-2 gap-x-8 gap-y-4">
          {[
            { label: "企业名称",     value: "盒马超市采购部",           field: "name" },
            { label: "统一社会信用代码", value: "91440101MA5XXXXXXX",  field: "creditCode" },
            { label: "企业类型",     value: "有限责任公司",             field: "type" },
            { label: "注册资本",     value: "5000 万元",               field: "capital" },
            { label: "成立日期",     value: "2018-06-20",              field: "foundDate" },
            { label: "营业期限",     value: "2018-06-20 至 2048-06-19", field: "bizPeriod" },
            { label: "注册地址",     value: "广东省广州市天河区XX路XX号", field: "address" },
            { label: "经营范围",     value: "食品批发、农产品采购、仓储物流", field: "scope" },
            { label: "法定代表人",   value: "张某某",                   field: "legalPerson" },
            { label: "联系电话",     value: "020-88888888",             field: "tel" },
            { label: "企业邮箱",     value: "procurement@hemashop.com", field: "email" },
            { label: "企业官网",     value: "www.hemashop.com",         field: "website" },
          ].map(f => (
            <div key={f.label} className="flex gap-3">
              <span className="text-[13px] text-[#6b7c93] w-32 shrink-0">{f.label}</span>
              {editing ? (
                <input defaultValue={f.value} className="flex-1 border border-[#dde3ec] rounded px-3 py-1 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              ) : (
                <span className="text-[13px] text-[#1a1a2e]">{f.value}</span>
              )}
            </div>
          ))}
        </div>
        {editing && (
          <div className="px-6 pb-5 flex gap-3">
            <button onClick={() => setEditing(false)} className="px-6 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">保存修改</button>
            <button onClick={() => setEditing(false)} className="px-6 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:bg-[#f5f7fa] transition-colors">取消</button>
          </div>
        )}
      </div>

      {/* 证件资质 */}
      <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#f0f4f8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-[#1a5fa8]" />
            <span className="text-[14px] font-semibold text-[#1a1a2e]">证件资质</span>
          </div>
          <button className="px-3 py-1.5 bg-[#1a5fa8] text-white text-[12px] rounded hover:bg-[#0d4a8a] transition-colors">上传证件</button>
        </div>
        <div className="p-6 space-y-4">
          {[
            { label: "营业执照", status: "valid",   expiry: "2048-06-19", uploaded: "2024-03-15" },
            { label: "食品经营许可证", status: "valid", expiry: "2026-12-31", uploaded: "2024-03-15" },
            { label: "税务登记证",   status: "merged", expiry: "—",         uploaded: "2024-03-15" },
          ].map(c => (
            <div key={c.label} className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg border border-[#f0f4f8]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#e8f4fd] rounded flex items-center justify-center text-[10px] font-bold text-[#1a5fa8]">PDF</div>
                <div>
                  <div className="text-[13px] font-medium text-[#1a1a2e]">{c.label}</div>
                  <div className="text-[12px] text-[#6b7c93]">上传时间：{c.uploaded} · 有效期至：{c.expiry}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[12px] px-2 py-0.5 rounded-full text-[#3a8c3f] bg-[#e8f5e9]">
                  {c.status === "valid" ? "有效" : "已并入营业执照"}
                </span>
                <button className="text-[12px] text-[#1a5fa8] hover:underline">查看</button>
                <button className="text-[12px] text-[#6b7c93] hover:underline">更换</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 快速跳转 */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "企业员工管理", href: "/merchant/enterprise/staff",    desc: "管理企业账号下的员工信息与权限" },
          { label: "子商户管理",   href: "/merchant/enterprise/sub",      desc: "管理挂靠在本企业下的子商户" },
          { label: "角色权限管理", href: "/merchant/enterprise/roles",    desc: "设置员工角色及各模块操作权限" },
        ].map(q => (
          <Link key={q.label} href={q.href} className="bg-white rounded-xl border border-[#e8edf5] p-4 hover:shadow-sm hover:border-[#1a5fa8] transition-all group">
            <div className="text-[13px] font-semibold text-[#1a1a2e] mb-1 group-hover:text-[#1a5fa8]">{q.label}</div>
            <div className="text-[12px] text-[#6b7c93]">{q.desc}</div>
            <ChevronRight className="w-3.5 h-3.5 text-[#ccc] group-hover:text-[#1a5fa8] mt-2" />
          </Link>
        ))}
      </div>
    </div>
  )
}
