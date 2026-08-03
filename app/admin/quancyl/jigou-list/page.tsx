"use client"

import { useState } from "react"
import {
  Search, Plus, CheckCircle, XCircle, Pause,
  MapPin, Leaf, Wheat, Warehouse, Truck, Building2, Eye, Edit2,
} from "lucide-react"

const typeIconMap: Record<string, React.ElementType> = {
  "乡镇服务站":   MapPin,
  "农资服务":     Leaf,
  "粮食加工":     Wheat,
  "冷链仓储":     Warehouse,
  "直供配送":     Truck,
  "综合服务":     Building2,
}

const institutions = [
  {
    id: "JG001", name: "梅州兴宁XX农产品综合服务站",
    type: "乡镇服务站", region: "梅州市兴宁市", status: "active" as const,
    contact: "张站长", phone: "138xxxx1234",
    joinDate: "2025-03-01", monthlyVol: "86.5万元", orders: 128,
  },
  {
    id: "JG002", name: "广州花都XX冷链物流公司",
    type: "冷链仓储", region: "广州市花都区", status: "active" as const,
    contact: "李总", phone: "139xxxx5678",
    joinDate: "2025-01-15", monthlyVol: "128万元", orders: 52,
  },
  {
    id: "JG003", name: "韶关南雄XX粮食集团",
    type: "粮食加工", region: "韶关市南雄市", status: "active" as const,
    contact: "王总", phone: "137xxxx9012",
    joinDate: "2025-06-20", monthlyVol: "320万元", orders: 35,
  },
  {
    id: "JG004", name: "惠州博罗XX农业合作社",
    type: "综合服务", region: "惠州市博罗县", status: "paused" as const,
    contact: "陈主任", phone: "136xxxx3456",
    joinDate: "2024-12-01", monthlyVol: "--", orders: 0,
  },
  {
    id: "JG005", name: "东莞长安XX农资服务中心",
    type: "农资服务", region: "东莞市长安镇", status: "active" as const,
    contact: "刘经理", phone: "135xxxx7890",
    joinDate: "2025-04-10", monthlyVol: "45万元", orders: 210,
  },
  {
    id: "JG006", name: "深圳南山XX配送公司",
    type: "直供配送", region: "深圳市南山区", status: "inactive" as const,
    contact: "赵经理", phone: "134xxxx2345",
    joinDate: "2024-09-01", monthlyVol: "--", orders: 0,
  },
]

const statusMap = {
  active:   { label: "运营中", color: "text-[#3a8c3f] bg-[#edf7ee]" },
  paused:   { label: "暂停中", color: "text-[#c47d0e] bg-[#fef3e0]" },
  inactive: { label: "已退出", color: "text-[#999]    bg-[#f5f5f5]" },
}

export default function JiGouListPage() {
  const [keyword, setKeyword] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filtered = institutions.filter(i => {
    if (typeFilter !== "all" && i.type !== typeFilter) return false
    if (keyword && !i.name.includes(keyword) && !i.region.includes(keyword)) return false
    return true
  })

  const stats = [
    { label: "服务机构总数", value: institutions.length,                                     color: "#1a5fa8" },
    { label: "运营中",       value: institutions.filter(i => i.status === "active").length,  color: "#3a8c3f" },
    { label: "暂停中",       value: institutions.filter(i => i.status === "paused").length,  color: "#c47d0e" },
    { label: "本月交易额",   value: "580万",                                                  color: "#6b3fa8" },
  ]

  return (
<div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[18px] font-bold text-[#1a1a2e]">全产业链服务机构管理</h1>
          <p className="text-[13px] text-[#6b7c93] mt-0.5">管理已入驻的全产业链服务机构</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded-lg hover:bg-[#0d4a8a] transition-colors">
          <Plus className="w-4 h-4" />
          新增机构
        </button>
      </div>

      {/* 统计 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-[#e0e6ef] p-4">
            <div className="text-[24px] font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[12px] text-[#999] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* 筛选 */}
      <div className="bg-white rounded-xl border border-[#e0e6ef] p-4 mb-5 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
          <input
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="搜索机构名称或地区"
            className="w-full pl-9 pr-3 py-2 border border-[#dde3ec] rounded-lg text-[13px] outline-none focus:border-[#1a5fa8]"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {["all", "乡镇服务站", "农资服务", "粮食加工", "冷链仓储", "直供配送", "综合服务"].map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 text-[12px] rounded-lg transition-colors ${
                typeFilter === t ? "bg-[#1a5fa8] text-white" : "bg-[#f5f7fa] text-[#666] hover:bg-[#e8edf5]"
              }`}
            >
              {t === "all" ? "全部类型" : t}
            </button>
          ))}
        </div>
      </div>

      {/* 机构列表 */}
      <div className="bg-white rounded-xl border border-[#e0e6ef] overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-[#e8edf5] bg-[#f8fafc]">
              {["机构编号", "机构名称", "服务类型", "所在地区", "联系人", "入驻时间", "本月交易", "状态", "操作"].map(h => (
                <th key={h} className="text-left py-3 px-3 font-semibold text-[#6b7c93]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((inst, idx) => {
              const Icon = typeIconMap[inst.type] ?? Building2
              const S = statusMap[inst.status]
              return (
                <tr key={inst.id} className={`border-b border-[#f0f3f8] hover:bg-[#f8fafc] transition-colors ${idx % 2 === 0 ? "" : "bg-[#fafbfc]"}`}>
                  <td className="py-3 px-3 text-[#1a5fa8] font-mono text-[12px]">{inst.id}</td>
                  <td className="py-3 px-3 font-medium text-[#1a1a2e] max-w-[180px] truncate">{inst.name}</td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 text-[12px] text-[#555]">
                      <Icon className="w-3.5 h-3.5 text-[#1a5fa8]" />
                      {inst.type}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#6b7c93]">{inst.region}</td>
                  <td className="py-3 px-3 text-[#6b7c93]">{inst.contact}</td>
                  <td className="py-3 px-3 text-[#999]">{inst.joinDate}</td>
                  <td className="py-3 px-3 font-semibold text-[#3a8c3f]">{inst.monthlyVol}</td>
                  <td className="py-3 px-3">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${S.color}`}>{S.label}</span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex gap-2">
                      <button className="text-[#1a5fa8] hover:underline flex items-center gap-0.5">
                        <Eye className="w-3.5 h-3.5" />查看
                      </button>
                      <button className="text-[#6b7c93] hover:text-[#1a5fa8] flex items-center gap-0.5">
                        <Edit2 className="w-3.5 h-3.5" />编辑
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#999] text-[13px]">暂无符合条件的机构</div>
        )}
      </div>
)
}
