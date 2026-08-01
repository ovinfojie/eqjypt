"use client"

import { useState } from "react"
import Link from "next/link"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ChevronLeft, Plus, Trash2, Upload, CheckCircle2 } from "lucide-react"

const CAPABILITIES = ["数字化交易与撮合能力", "品控与流通体系", "柔性与合规", "金融赋能能力", "政策与拓利优势", "生态与环境保障"]

export default function ChandiEditPage() {
  const [saved, setSaved] = useState(false)
  const [caps, setCaps] = useState([
    { title: "数字化交易与撮合能力", desc: "通过数字化平台实现供需精准匹配，帮助买卖双方高效成交。" },
    { title: "品控与流通体系",       desc: "建立完整的品控管理体系，从采购到入库全链路可见。" },
  ])

  const addCap = () => setCaps([...caps, { title: "", desc: "" }])
  const removeCap = (i: number) => setCaps(caps.filter((_, idx) => idx !== i))

  const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
    <div className="grid grid-cols-[140px_1fr] items-start gap-3 mb-4">
      <label className="text-[13px] text-[#444] pt-1.5 text-right">
        {required && <span className="text-red-500 mr-0.5">*</span>}{label}：
      </label>
      <div>{children}</div>
    </div>
  )

  const Input = ({ placeholder, width, defaultValue }: { placeholder?: string; width?: string; defaultValue?: string }) => (
    <input defaultValue={defaultValue} placeholder={placeholder}
      className={`border border-[#dde3ec] rounded px-3 h-8 text-[13px] focus:outline-none focus:border-[#1a5fa8] ${width ?? "w-[320px]"}`} />
  )

  if (saved) {
    return (
      <AdminLayout>
        <div className="max-w-[560px] mx-auto mt-16 text-center">
          <CheckCircle2 className="w-16 h-16 text-[#1a7a3c] mx-auto mb-4" />
          <h2 className="text-[22px] font-bold text-[#1a1a2e] mb-2">保存成功</h2>
          <p className="text-[14px] text-[#6b7c93] mb-8">产地信息已更新，前台展示将立即生效。</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/admin/yanxuan/chandi-list" className="px-6 h-9 flex items-center bg-[#1a1a2e] text-white text-[14px] rounded hover:bg-[#2d2d4e] transition-colors">
              返回产地列表
            </Link>
            <button onClick={() => setSaved(false)} className="px-6 h-9 border border-[#1a1a2e] text-[#1a1a2e] text-[14px] rounded hover:bg-[#f5f7fa] transition-colors">
              继续编辑
            </button>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="mb-5 flex items-center gap-3">
        <Link href="/admin/yanxuan/chandi-list" className="flex items-center gap-1 text-[#6b7c93] hover:text-[#1a1a2e] text-[13px]">
          <ChevronLeft className="w-4 h-4" />产地列表
        </Link>
        <span className="text-[#ccc]">/</span>
        <span className="text-[14px] font-semibold text-[#1a1a2e]">编辑产地信息</span>
      </div>

      <div className="max-w-[820px] bg-white rounded-lg border border-[#dde3ec] p-6">

        {/* 基本信息 */}
        <div className="mb-5 pb-1 border-b border-[#e8edf5]">
          <span className="text-[13px] font-semibold text-[#1a1a2e] border-l-2 border-[#1a1a2e] pl-2">基本信息</span>
        </div>
        <Field label="产地名称" required><Input defaultValue="江门产地直供中心" /></Field>
        <Field label="所在地区" required><Input defaultValue="广东省江门市新会区" /></Field>
        <Field label="面包屑描述" required>
          <Input defaultValue="广东省江门市新会区大蟹镇核心产区" width="w-[420px]" />
        </Field>
        <Field label="产地简介" required>
          <textarea defaultValue="江门拥有丰富的水产资源，养殖面积近22万亩，罗非鱼、对虾年产量超过20万吨。"
            rows={3} className="w-[480px] border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none" />
        </Field>
        <Field label="Banner 背景图" required>
          <div className="w-full h-32 max-w-[480px] border-2 border-dashed border-[#dde3ec] rounded flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#1a5fa8] text-[#999] hover:text-[#1a5fa8] transition-colors">
            <Upload className="w-6 h-6" />
            <span className="text-[12px]">上传 Banner 图片（推荐 1920×540）</span>
          </div>
        </Field>

        {/* 统计数据 */}
        <div className="mb-5 mt-6 pb-1 border-b border-[#e8edf5]">
          <span className="text-[13px] font-semibold text-[#1a1a2e] border-l-2 border-[#1a1a2e] pl-2">统计数据</span>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[
            { label: "养殖面积", val: "50万亩" }, { label: "年产量", val: "70万吨" },
            { label: "总产值",   val: "20亿+"  }, { label: "合作农户", val: "1万户+" },
            { label: "生态养殖占比", val: "50%+" }, { label: "核心养殖面积", val: "11.16万亩" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="text-[12px] text-[#6b7c93]">{s.label}</span>
              <input defaultValue={s.val} className="border border-[#dde3ec] rounded px-3 h-8 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
            </div>
          ))}
        </div>

        {/* 产地能力 */}
        <div className="mb-5 mt-6 pb-1 border-b border-[#e8edf5]">
          <span className="text-[13px] font-semibold text-[#1a1a2e] border-l-2 border-[#1a1a2e] pl-2">产地能力介绍</span>
        </div>
        <div className="space-y-3 mb-3">
          {caps.map((cap, i) => (
            <div key={i} className="border border-[#e8edf5] rounded p-3 bg-[#fafbfc]">
              <div className="flex items-center gap-3 mb-2">
                <input value={cap.title} onChange={(e) => { const c=[...caps]; c[i].title=e.target.value; setCaps(c) }}
                  placeholder="能力标题" className="border border-[#dde3ec] rounded px-3 h-8 text-[13px] w-[240px] focus:outline-none focus:border-[#1a5fa8]" />
                {caps.length > 1 && (
                  <button onClick={() => removeCap(i)} className="text-[#b91c1c] hover:opacity-70 ml-auto">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <textarea value={cap.desc} onChange={(e) => { const c=[...caps]; c[i].desc=e.target.value; setCaps(c) }}
                placeholder="能力描述" rows={2}
                className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none" />
            </div>
          ))}
        </div>
        <button onClick={addCap} className="flex items-center gap-1.5 text-[#1a5fa8] text-[13px] hover:underline mb-2">
          <Plus className="w-3.5 h-3.5" />添加能力项
        </button>

        {/* 产地故事 */}
        <div className="mb-5 mt-6 pb-1 border-b border-[#e8edf5]">
          <span className="text-[13px] font-semibold text-[#1a1a2e] border-l-2 border-[#1a1a2e] pl-2">产地故事</span>
        </div>
        <Field label="故事内容">
          <textarea rows={5} placeholder="介绍产地的背景、历史和特色，将显示在详情页底部"
            className="w-[480px] border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none"
            defaultValue="江门市是中南华地区主要的产区，养殖虾类年产量近30万吨..." />
        </Field>
        <Field label="配图上传">
          <div className="flex gap-3">
            {[0,1,2].map((i) => (
              <div key={i} className="w-24 h-20 border-2 border-dashed border-[#dde3ec] rounded flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#1a5fa8] text-[#999] hover:text-[#1a5fa8] transition-colors">
                <Upload className="w-5 h-5" />
                <span className="text-[10px]">上传</span>
              </div>
            ))}
          </div>
        </Field>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-[#e8edf5] mt-6">
          <button onClick={() => setSaved(true)}
            className="px-8 h-9 bg-[#1a1a2e] text-white text-[14px] rounded hover:bg-[#2d2d4e] transition-colors font-medium">
            保存并发布
          </button>
          <button className="px-8 h-9 border border-[#dde3ec] text-[#555] text-[14px] rounded hover:bg-[#f5f7fa] transition-colors">
            仅保存
          </button>
          <Link href="/admin/yanxuan/chandi-list" className="text-[13px] text-[#6b7c93] hover:text-[#1a1a2e]">取消</Link>
        </div>
      </div>
    </AdminLayout>
  )
}
