"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Search, Clock, CheckCircle, XCircle, Eye, Globe, Truck, ShoppingBag, BarChart2, Users, Handshake, TrendingUp } from "lucide-react"

const STATS = [
  { label: "待处理申请", value: "12",   icon: Clock,    color: "text-[#b45309]", bg: "bg-[#fffbeb]" },
  { label: "本月新增",   value: "38",   icon: TrendingUp, color: "text-[#3a8c3f]", bg: "bg-[#e8fdf0]" },
  { label: "合作伙伴",   value: "1,284", icon: Users,    color: "text-[#1a5fa8]", bg: "bg-[#e8f4fd]" },
  { label: "总申请量",   value: "2,176", icon: Handshake, color: "text-[#6366f1]", bg: "bg-[#ede9fe]" },
]

const TYPE_ICONS: Record<string, React.ElementType> = {
  "平台入驻合作": Globe,
  "渠道经销合作": Truck,
  "采购供应合作": ShoppingBag,
  "数据技术合作": BarChart2,
}

const APPLICATIONS = [
  { id: "HZ-20260801A", name: "广州绿橙科技有限公司",   type: "数据技术合作",   contact: "李明", phone: "138xxxx1234", industry: "农业科技",   scale: "200-500人",  submitTime: "2026-08-01 10:30", status: "待审核" },
  { id: "HZ-20260731B", name: "深圳盒马供应链管理中心",  type: "采购供应合作",   contact: "王芳", phone: "139xxxx5678", industry: "农产品贸易",  scale: "1000人以上", submitTime: "2026-07-31 15:20", status: "待审核" },
  { id: "HZ-20260730C", name: "茂名荔枝协会",           type: "平台入驻合作",   contact: "陈健", phone: "137xxxx9012", industry: "农业生产",   scale: "50人以下",   submitTime: "2026-07-30 09:15", status: "待审核" },
  { id: "HZ-20260729D", name: "顺丰控股冷链事业部",     type: "渠道经销合作",   contact: "张伟", phone: "136xxxx3456", industry: "农业物流",   scale: "1000人以上", submitTime: "2026-07-29 14:40", status: "已通过" },
  { id: "HZ-20260728E", name: "华南农业大学科技服务中心", type: "数据技术合作",   contact: "刘洋", phone: "135xxxx7890", industry: "农业科技",   scale: "50-200人",  submitTime: "2026-07-28 11:05", status: "已通过" },
  { id: "HZ-20260727F", name: "某注销企业",             type: "平台入驻合作",   contact: "赵六", phone: "134xxxx0011", industry: "农产品贸易",  scale: "50人以下",   submitTime: "2026-07-27 08:55", status: "已拒绝" },
]

const STATUS_STYLE: Record<string, string> = {
  "待审核": "bg-[#fffbeb] text-[#b45309]",
  "已通过": "bg-[#e8fdf0] text-[#3a8c3f]",
  "已拒绝": "bg-[#fde8e8] text-[#d9534f]",
}

export default function KaifangHezuoShenhePage() {
  const [tab, setTab] = useState("全部")
  const [keyword, setKeyword] = useState("")
  const [modalId, setModalId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [rejectModalId, setRejectModalId] = useState<string | null>(null)

  const pending = APPLICATIONS.filter(a => a.status === "待审核").length
  const filtered = APPLICATIONS.filter(a => {
    const matchTab = tab === "全部" || a.status === tab
    const matchKw = !keyword || a.name.includes(keyword) || a.id.includes(keyword) || a.type.includes(keyword)
    return matchTab && matchKw
  })
  const modalApp = APPLICATIONS.find(a => a.id === modalId)

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-bold text-[#1a1a2e]">合作申请审核</h1>
            <p className="text-[13px] text-[#888] mt-0.5">审核外部企业提交的合作申请，管理合作伙伴关系</p>
          </div>
          {pending > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-[#fffbeb] border border-[#fde68a] rounded-lg text-[13px] text-[#b45309]">
              <Clock className="w-4 h-4" />
              <span>有 <strong>{pending}</strong> 笔申请待处理</span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-[#e8edf5] p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.bg}`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <div className="text-[22px] font-bold text-[#1a1a2e]">{s.value}</div>
                <div className="text-[12px] text-[#888]">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-[#e8edf5] p-4 flex items-center gap-4">
          <div className="flex gap-1">
            {["全部", "待审核", "已通过", "已拒绝"].map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded text-[13px] font-medium transition-colors ${tab === t ? "bg-[#1a5fa8] text-white" : "text-[#555] hover:bg-[#f5f7fa]"}`}>
                {t}{t === "待审核" && pending > 0 && <span className="ml-1.5 inline-flex w-4 h-4 rounded-full bg-[#d9534f] text-white text-[10px] items-center justify-center font-bold">{pending}</span>}
              </button>
            ))}
          </div>
          <div className="relative ml-auto max-w-[260px] w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbb]" />
            <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="搜索企业名称或单号" className="w-full pl-9 pr-3 py-2 border border-[#dde3ec] rounded text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead className="bg-[#f8fafc] border-b border-[#e8edf5]">
              <tr>
                {["申请编号", "企业名称", "合作类型", "联系人", "所属行业", "企业规模", "提交时间", "状态", "操作"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[12px] font-semibold text-[#555]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f8]">
              {filtered.map(a => {
                const Icon = TYPE_ICONS[a.type] || Globe
                return (
                  <tr key={a.id} className="hover:bg-[#f8fafc]">
                    <td className="px-4 py-3.5 font-mono text-[#888] text-[12px]">{a.id}</td>
                    <td className="px-4 py-3.5 font-medium text-[#1a1a2e]">{a.name}</td>
                    <td className="px-4 py-3.5">
                      <span className="flex items-center gap-1.5 text-[#555]">
                        <Icon className="w-3.5 h-3.5 text-[#1a5fa8]" />
                        {a.type}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#666]">{a.contact}</td>
                    <td className="px-4 py-3.5 text-[#666]">{a.industry}</td>
                    <td className="px-4 py-3.5 text-[#888]">{a.scale}</td>
                    <td className="px-4 py-3.5 text-[#888]">{a.submitTime}</td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${STATUS_STYLE[a.status]}`}>{a.status}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setModalId(a.id)} className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]">
                          <Eye className="w-3.5 h-3.5" />查看
                        </button>
                        {a.status === "待审核" && (
                          <>
                            <button className="flex items-center gap-1 text-[#3a8c3f] hover:underline text-[12px]">
                              <CheckCircle className="w-3.5 h-3.5" />通过
                            </button>
                            <button onClick={() => setRejectModalId(a.id)} className="flex items-center gap-1 text-[#d9534f] hover:underline text-[12px]">
                              <XCircle className="w-3.5 h-3.5" />拒绝
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="px-4 py-3 border-t border-[#e8edf5] flex items-center justify-between text-[12px] text-[#888]">
            <span>共 {filtered.length} 条记录</span>
            <div className="flex gap-1">
              {[1, 2, 3].map(p => (
                <button key={p} className={`w-7 h-7 rounded text-[12px] ${p === 1 ? "bg-[#1a5fa8] text-white" : "hover:bg-[#f5f7fa]"}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {modalId && modalApp && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setModalId(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-[520px] p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[16px] font-bold text-[#1a1a2e]">申请详情</h3>
              <button onClick={() => setModalId(null)} className="text-[#bbb] hover:text-[#555] text-[20px] leading-none">×</button>
            </div>
            <div className="space-y-2.5 text-[13px]">
              {[
                { label: "申请编号", value: modalApp.id },
                { label: "企业名称", value: modalApp.name },
                { label: "合作类型", value: modalApp.type },
                { label: "联系人",   value: modalApp.contact },
                { label: "联系电话", value: modalApp.phone },
                { label: "所属行业", value: modalApp.industry },
                { label: "企业规模", value: modalApp.scale },
                { label: "提交时间", value: modalApp.submitTime },
                { label: "当前状态", value: modalApp.status },
              ].map(item => (
                <div key={item.label} className="flex gap-4 py-2 border-b border-[#f0f4f8] last:border-0">
                  <span className="w-20 text-[#888] shrink-0">{item.label}</span>
                  <span className="font-medium text-[#1a1a2e]">{item.value}</span>
                </div>
              ))}
            </div>
            {modalApp.status === "待审核" && (
              <div className="flex gap-3 mt-5">
                <button className="flex-1 py-2.5 bg-[#1a5fa8] text-white rounded text-[14px] font-medium hover:bg-[#1550a0] transition-colors">审核通过</button>
                <button onClick={() => { setModalId(null); setRejectModalId(modalApp.id) }} className="flex-1 py-2.5 bg-white border border-[#d9534f] text-[#d9534f] rounded text-[14px] font-medium hover:bg-[#fde8e8] transition-colors">审核拒绝</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reject reason modal */}
      {rejectModalId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setRejectModalId(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-[440px] p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-[16px] font-bold text-[#1a1a2e] mb-4">填写拒绝原因</h3>
            <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} rows={4} placeholder="请说明拒绝该合作申请的原因（将通过短信/邮件通知申请方）" className="w-full px-3 py-2 border border-[#dde3ec] rounded text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none mb-4" />
            <div className="flex gap-3">
              <button onClick={() => setRejectModalId(null)} className="flex-1 py-2.5 border border-[#dde3ec] text-[#555] rounded text-[14px] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">取消</button>
              <button disabled={!rejectReason} onClick={() => setRejectModalId(null)} className="flex-1 py-2.5 bg-[#d9534f] text-white rounded text-[14px] font-medium hover:bg-[#c0392b] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">确认拒绝</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
