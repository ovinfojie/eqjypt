"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Eye, Edit2, Trash2 } from "lucide-react"

type StatusFilter = "全部" | "待审核" | "采购中" | "已完成" | "已关闭" | "已驳回"

type Row = {
  id: string
  title: string
  mode: "商品描述" | "选择商品"
  goods: string
  publishType: "公开发布" | "定向发布"
  deliveryTime: string
  deadline: string
  contact: string
  phone: string
  status: string
  createdAt: string
  auditAt: string
}

const rows: Row[] = [
  { id: "CG20260601001", title: "2026年广东省大批量优质丝苗米长期采购", mode: "选择商品", goods: "丝苗米 等2种", publishType: "公开发布", deliveryTime: "2026-06-15 至 2026-06-30", deadline: "2026-06-30", contact: "张伟", phone: "13800138001", status: "采购中", createdAt: "2026-06-01 09:12", auditAt: "2026-06-01 10:05" },
  { id: "CG20260601002", title: "饲料用玉米大批量长期采购", mode: "商品描述", goods: "需求描述", publishType: "公开发布", deliveryTime: "2026-07-01 至 2026-07-20", deadline: "2026-07-20", contact: "李娜", phone: "13800138002", status: "待审核", createdAt: "2026-06-01 14:30", auditAt: "-" },
  { id: "CG20260601003", title: "非转基因大豆采购", mode: "选择商品", goods: "非转基因大豆", publishType: "定向发布", deliveryTime: "2026-06-05 至 2026-06-10", deadline: "2026-06-10", contact: "王强", phone: "13800138003", status: "已完成", createdAt: "2026-05-28 11:20", auditAt: "2026-05-28 15:40" },
  { id: "CG20260601004", title: "广东省内优质有机蔬菜长期稳定供货", mode: "商品描述", goods: "需求描述", publishType: "公开发布", deliveryTime: "2026-06-10 至 2026-12-31", deadline: "2026-12-31", contact: "赵敏", phone: "13800138004", status: "采购中", createdAt: "2026-06-02 08:45", auditAt: "2026-06-02 09:30" },
  { id: "CG20260601005", title: "2026年应季荔枝大量收购", mode: "选择商品", goods: "妃子笑荔枝 等3种", publishType: "公开发布", deliveryTime: "2026-07-01 至 2026-07-15", deadline: "2026-07-15", contact: "陈刚", phone: "13800138005", status: "已驳回", createdAt: "2026-06-03 16:00", auditAt: "2026-06-03 17:12" },
]

const statusColors: Record<string, { text: string; bg: string }> = {
  "待审核": { text: "#e8831a", bg: "#fff4e6" },
  "采购中": { text: "#1a5fa8", bg: "#e8f4fd" },
  "已完成": { text: "#6b7c93", bg: "#f0f2f5" },
  "已关闭": { text: "#888", bg: "#f5f5f5" },
  "已驳回": { text: "#e53e3e", bg: "#fdecec" },
}

const statusFilters: StatusFilter[] = ["全部", "待审核", "采购中", "已完成", "已关闭", "已驳回"]

export default function CaigouListPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("全部")
  const [keyword, setKeyword] = useState("")

  const filtered = rows.filter(r =>
    (statusFilter === "全部" || r.status === statusFilter) &&
    (keyword === "" || r.title.includes(keyword) || r.id.includes(keyword))
  )

  return (
    <div className="max-w-[1200px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-[18px] font-bold text-[#1a1a2e]">我的采购需求</h1>
          <p className="text-[13px] text-[#888] mt-0.5">管理您发布的采购需求，查看供应商报价</p>
        </div>
        <Link
          href="/merchant/chanxiao/fabu-caigou"
          className="flex items-center gap-1.5 px-4 py-2 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded-lg hover:bg-[#0d4a8a] transition-colors"
        >
          <Plus className="w-4 h-4" />发布采购需求
        </Link>
      </div>

      {/* Search + status filter */}
      <div className="bg-white rounded-xl border border-[#e8edf5] p-4 mb-4">
        <div className="flex gap-3 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aab]" />
            <input value={keyword} onChange={(e) => setKeyword(e.target.value)}
              placeholder="搜索需求标题 / 编号..."
              className="w-full pl-9 pr-4 py-2 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
          </div>
          <button className="px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded-lg hover:bg-[#0d4a8a] transition-colors">搜索</button>
        </div>
        <div className="flex gap-2">
          {statusFilters.map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 rounded-full text-[12px] transition-colors ${
                statusFilter === s ? "bg-[#1a5fa8] text-white" : "bg-[#f0f2f5] text-[#555] hover:bg-[#e8f4fd] hover:text-[#1a5fa8]"
              }`}
            >{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1120px]">
            <thead>
              <tr className="bg-[#f8f9fc] border-b border-[#e8edf5] text-[12px] text-[#888] whitespace-nowrap">
                <th className="text-left px-4 py-3 font-medium">编号</th>
                <th className="text-left px-4 py-3 font-medium">需求标题</th>
                <th className="text-left px-4 py-3 font-medium">商品/需求</th>
                <th className="text-left px-4 py-3 font-medium">发布方式</th>
                <th className="text-left px-4 py-3 font-medium">期望收货时间</th>
                <th className="text-left px-4 py-3 font-medium">报价截止日期</th>
                <th className="text-left px-4 py-3 font-medium">联系人</th>
                <th className="text-left px-4 py-3 font-medium">联系电话</th>
                <th className="text-center px-4 py-3 font-medium">状态</th>
                <th className="text-left px-4 py-3 font-medium">创建时间</th>
                <th className="text-left px-4 py-3 font-medium">平台审核时间</th>
                <th className="text-center px-4 py-3 font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f2f5]">
              {filtered.map((row) => {
                const sc = statusColors[row.status] ?? statusColors["采购中"]
                return (
                  <tr key={row.id} className="hover:bg-[#fafbfc] transition-colors align-top">
                    <td className="px-4 py-3.5 text-[12px] text-[#999] whitespace-nowrap">{row.id}</td>
                    <td className="px-4 py-3.5 min-w-[200px]">
                      <Link href={`/merchant/chanxiao/caigou-list/${row.id}`}
                        className="text-[13px] font-medium text-[#333] hover:text-[#1a5fa8] line-clamp-2">{row.title}</Link>
                    </td>
                    <td className="px-4 py-3.5 text-[13px] text-[#666] whitespace-nowrap">
                      <span className={`px-1.5 py-0.5 rounded text-[11px] mr-1 ${row.mode === "选择商品" ? "bg-[#e8f4fd] text-[#1a5fa8]" : "bg-[#f0f2f5] text-[#888]"}`}>{row.mode}</span>
                      {row.goods}
                    </td>
                    <td className="px-4 py-3.5 text-[13px] text-[#666] whitespace-nowrap">{row.publishType}</td>
                    <td className="px-4 py-3.5 text-[12px] text-[#666] whitespace-nowrap">{row.deliveryTime}</td>
                    <td className="px-4 py-3.5 text-[13px] text-[#666] whitespace-nowrap">{row.deadline}</td>
                    <td className="px-4 py-3.5 text-[13px] text-[#666] whitespace-nowrap">{row.contact}</td>
                    <td className="px-4 py-3.5 text-[13px] text-[#666] whitespace-nowrap">{row.phone}</td>
                    <td className="px-4 py-3.5 text-center whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium" style={{ color: sc.text, background: sc.bg }}>{row.status}</span>
                    </td>
                    <td className="px-4 py-3.5 text-[12px] text-[#999] whitespace-nowrap">{row.createdAt}</td>
                    <td className="px-4 py-3.5 text-[12px] text-[#999] whitespace-nowrap">{row.auditAt}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-3">
                        <Link href={`/merchant/chanxiao/caigou-list/${row.id}`}
                          className="flex items-center gap-1 text-[12px] text-[#1a5fa8] hover:underline">
                          <Eye className="w-3.5 h-3.5" />查看
                        </Link>
                        {(row.status === "采购中" || row.status === "待审核" || row.status === "已驳回") && (
                          <button className="flex items-center gap-1 text-[12px] text-[#e8831a] hover:underline">
                            <Edit2 className="w-3.5 h-3.5" />编辑
                          </button>
                        )}
                        {row.status !== "已完成" && (
                          <button className="flex items-center gap-1 text-[12px] text-[#e53e3e] hover:underline">
                            <Trash2 className="w-3.5 h-3.5" />关闭
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={12} className="px-4 py-12 text-center text-[13px] text-[#bbb]">暂无采购需求</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
