"use client"

import { useState } from "react"
import {
  Search, CheckCircle, XCircle, Clock, AlertCircle,
  Eye, ChevronDown, Filter,
} from "lucide-react"

const statusMap = {
  pending:  { label: "待审核", color: "text-[#c47d0e] bg-[#fef3e0]", icon: Clock       },
  approved: { label: "已通过", color: "text-[#3a8c3f] bg-[#edf7ee]", icon: CheckCircle },
  rejected: { label: "已驳回", color: "text-[#d9363e] bg-[#fff1f0]", icon: XCircle     },
  info:     { label: "需补充", color: "text-[#1a5fa8] bg-[#e8f4fd]", icon: AlertCircle },
}

const applications = [
  {
    id: "QCY2026080001", type: "乡镇农产品综合服务站",
    company: "广东XX农业科技有限公司", region: "梅州市XX县", contact: "张总 / 138xxxx1234",
    submitTime: "2026-08-01 09:12", status: "pending" as const,
    scale: "服务覆盖3个乡镇，年服务农户2000户",
  },
  {
    id: "QCY2026079998", type: "冷链仓储服务入驻",
    company: "XX冷链物流有限公司", region: "广州市花都区", contact: "李经理 / 139xxxx5678",
    submitTime: "2026-07-31 14:30", status: "pending" as const,
    scale: "冷库容量5000吨，配套运输车辆20辆",
  },
  {
    id: "QCY2026079995", type: "粮食收购加工合作",
    company: "韶关市XX粮食集团", region: "韶关市南雄市", contact: "王总 / 137xxxx9012",
    submitTime: "2026-07-30 10:45", status: "approved" as const,
    scale: "年收购粮食5万吨，建有标准化烘干房6座",
  },
  {
    id: "QCY2026079992", type: "供销农场合作基地",
    company: "惠州市XX农业合作社", region: "惠州市博罗县", contact: "陈主任 / 136xxxx3456",
    submitTime: "2026-07-29 16:20", status: "info" as const,
    scale: "种植面积3000亩，主要种植水稻、蔬菜",
  },
  {
    id: "QCY2026079988", type: "农产品直供配送",
    company: "深圳市XX配送有限公司", region: "深圳市南山区", contact: "刘经理 / 135xxxx7890",
    submitTime: "2026-07-28 11:00", status: "rejected" as const,
    scale: "日配送量50吨，服务商超50家",
  },
  {
    id: "QCY2026079985", type: "综合服务机构入驻",
    company: "东莞市XX农业服务公司", region: "东莞市长安镇", contact: "赵总 / 134xxxx2345",
    submitTime: "2026-07-27 15:35", status: "approved" as const,
    scale: "提供农资、农机、技术指导等综合服务",
  },
]

export default function ShenHePage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [keyword, setKeyword] = useState("")
  const [reviewId, setReviewId] = useState<string | null>(null)

  const filtered = applications.filter(a => {
    if (statusFilter !== "all" && a.status !== statusFilter) return false
    if (keyword && !a.company.includes(keyword) && !a.id.includes(keyword)) return false
    return true
  })

  const reviewing = applications.find(a => a.id === reviewId)

  return (
<div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[18px] font-bold text-[#1a1a2e]">全产业链合作申请审核</h1>
          <p className="text-[13px] text-[#6b7c93] mt-0.5">审核各类全产业链服务合作入驻申请</p>
        </div>
        <div className="flex items-center gap-2 text-[13px]">
          <span className="px-3 py-1.5 bg-[#fef3e0] text-[#c47d0e] rounded-lg font-semibold">
            待审核 {applications.filter(a => a.status === "pending").length}
          </span>
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="bg-white rounded-xl border border-[#e0e6ef] p-4 mb-5 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
          <input
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="搜索申请编号或企业名称"
            className="w-full pl-9 pr-3 py-2 border border-[#dde3ec] rounded-lg text-[13px] outline-none focus:border-[#1a5fa8]"
          />
        </div>
        <div className="flex gap-1">
          {[
            { key: "all",      label: "全部" },
            { key: "pending",  label: "待审核" },
            { key: "approved", label: "已通过" },
            { key: "rejected", label: "已驳回" },
            { key: "info",     label: "需补充" },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              className={`px-3 py-1.5 text-[12px] rounded-lg transition-colors ${
                statusFilter === f.key
                  ? "bg-[#1a5fa8] text-white"
                  : "bg-[#f5f7fa] text-[#666] hover:bg-[#e8edf5]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* 申请列表 */}
      <div className="bg-white rounded-xl border border-[#e0e6ef] overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-[#e8edf5] bg-[#f8fafc]">
              <th className="text-left py-3 px-4 font-semibold text-[#6b7c93]">申请编号</th>
              <th className="text-left py-3 px-4 font-semibold text-[#6b7c93]">申请类型</th>
              <th className="text-left py-3 px-4 font-semibold text-[#6b7c93]">企业名称</th>
              <th className="text-left py-3 px-4 font-semibold text-[#6b7c93]">所在地区</th>
              <th className="text-left py-3 px-4 font-semibold text-[#6b7c93]">提交时间</th>
              <th className="text-left py-3 px-4 font-semibold text-[#6b7c93]">状态</th>
              <th className="text-left py-3 px-4 font-semibold text-[#6b7c93]">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, idx) => {
              const S = statusMap[a.status]
              const StatusIcon = S.icon
              return (
                <tr key={a.id} className={`border-b border-[#f0f3f8] hover:bg-[#f8fafc] transition-colors ${idx % 2 === 0 ? "" : "bg-[#fafbfc]"}`}>
                  <td className="py-3 px-4 text-[#1a5fa8] font-mono">{a.id}</td>
                  <td className="py-3 px-4 text-[#333]">{a.type}</td>
                  <td className="py-3 px-4 font-medium text-[#1a1a2e]">{a.company}</td>
                  <td className="py-3 px-4 text-[#6b7c93]">{a.region}</td>
                  <td className="py-3 px-4 text-[#999]">{a.submitTime}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${S.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {S.label}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setReviewId(a.id)}
                      className="flex items-center gap-1 text-[#1a5fa8] hover:underline"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {a.status === "pending" ? "审核" : "查看"}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#999] text-[13px]">暂无符合条件的申请</div>
        )}
      </div>

      {/* 审核弹窗 */}
      {reviewing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-[600px] max-h-[85vh] overflow-y-auto">
            <div className="p-6 border-b border-[#e8edf5] flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-[#1a1a2e]">审核申请</h3>
              <button onClick={() => setReviewId(null)} className="text-[#999] hover:text-[#333]">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-[13px]">
              {[
                { label: "申请编号", value: reviewing.id },
                { label: "申请类型", value: reviewing.type },
                { label: "企业名称", value: reviewing.company },
                { label: "所在地区", value: reviewing.region },
                { label: "联系方式", value: reviewing.contact },
                { label: "规模说明", value: reviewing.scale },
                { label: "提交时间", value: reviewing.submitTime },
              ].map(item => (
                <div key={item.label} className="flex gap-4">
                  <span className="text-[#999] w-16 shrink-0">{item.label}</span>
                  <span className="text-[#1a1a2e] font-medium">{item.value}</span>
                </div>
              ))}
              {reviewing.status === "pending" && (
                <>
                  <div className="border-t border-[#f0f3f8] pt-4">
                    <label className="text-[13px] font-medium text-[#333] mb-1.5 block">审核意见</label>
                    <textarea
                      rows={3}
                      placeholder="请输入审核意见（驳回时必填）..."
                      className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] outline-none focus:border-[#1a5fa8] resize-none"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setReviewId(null)}
                      className="flex-1 py-2.5 bg-[#3a8c3f] text-white text-[13px] font-semibold rounded-lg hover:bg-[#2d7032] transition-colors"
                    >
                      通过申请
                    </button>
                    <button
                      onClick={() => setReviewId(null)}
                      className="flex-1 py-2.5 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded-lg hover:bg-[#0d4a8a] transition-colors"
                    >
                      要求补充材料
                    </button>
                    <button
                      onClick={() => setReviewId(null)}
                      className="flex-1 py-2.5 bg-[#d9363e] text-white text-[13px] font-semibold rounded-lg hover:bg-[#b52d34] transition-colors"
                    >
                      驳回申请
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
)
}
