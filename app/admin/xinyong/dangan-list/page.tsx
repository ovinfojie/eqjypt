"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Search, ShieldCheck, TrendingUp, Users, BarChart2, ChevronDown } from "lucide-react"

const STATS = [
  { label: "已建档主体", value: "12,847", icon: Users,     color: "text-[#1a5fa8]", bg: "bg-[#e8f4fd]" },
  { label: "平均信用分",  value: "742",    icon: BarChart2, color: "text-[#3a8c3f]", bg: "bg-[#e8fdf0]" },
  { label: "本月授信额",  value: "3.2亿",  icon: TrendingUp, color: "text-[#e65c00]", bg: "bg-[#fff3e0]" },
  { label: "AA级以上",   value: "28.4%",  icon: ShieldCheck, color: "text-[#6366f1]", bg: "bg-[#ede9fe]" },
]

const RECORDS = [
  { id: "C001", name: "广东粮油贸易有限公司",  type: "贸易商",  score: 826, grade: "AA", loans: 2, amount: "130万", lastUpdate: "2026-07-28", status: "正常" },
  { id: "C002", name: "江门市鑫虾水产养殖场",  type: "养殖户",  score: 761, grade: "A",  loans: 1, amount: "80万",  lastUpdate: "2026-07-25", status: "正常" },
  { id: "C003", name: "南雄丝苗米合作社",      type: "合作社",  score: 718, grade: "A",  loans: 0, amount: "—",    lastUpdate: "2026-07-20", status: "正常" },
  { id: "C004", name: "茂名南方荔枝发展公司",  type: "生产企业", score: 685, grade: "B",  loans: 1, amount: "50万",  lastUpdate: "2026-07-18", status: "正常" },
  { id: "C005", name: "广州盒马生鲜采购中心",  type: "采购商",  score: 893, grade: "AAA", loans: 3, amount: "450万", lastUpdate: "2026-07-15", status: "正常" },
  { id: "C006", name: "肇庆莲藕种植专业户",    type: "农户",   score: 612, grade: "B",  loans: 0, amount: "—",    lastUpdate: "2026-07-10", status: "预警" },
  { id: "C007", name: "遂溪甘蔗糖业加工厂",    type: "加工企业", score: 779, grade: "A",  loans: 2, amount: "200万", lastUpdate: "2026-07-08", status: "正常" },
  { id: "C008", name: "韶关有机蔬菜基地",      type: "生产企业", score: 543, grade: "C",  loans: 1, amount: "30万",  lastUpdate: "2026-06-30", status: "预警" },
]

const GRADE_COLORS: Record<string, string> = {
  "AAA": "bg-[#6366f1] text-white",
  "AA":  "bg-[#1a5fa8] text-white",
  "A":   "bg-[#3a8c3f] text-white",
  "B":   "bg-[#e65c00] text-white",
  "C":   "bg-[#d9534f] text-white",
}

export default function XinyongDanganListPage() {
  const [keyword, setKeyword] = useState("")
  const [gradeFilter, setGradeFilter] = useState("全部")

  const filtered = RECORDS.filter(r => {
    const matchKw = !keyword || r.name.includes(keyword) || r.id.includes(keyword)
    const matchGrade = gradeFilter === "全部" || r.grade === gradeFilter
    return matchKw && matchGrade
  })

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-bold text-[#1a1a2e]">信用档案管理</h1>
            <p className="text-[13px] text-[#888] mt-0.5">管理平台农业经营主体信用档案与评分</p>
          </div>
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
        <div className="bg-white rounded-xl border border-[#e8edf5] p-4 flex items-center gap-3">
          <div className="relative flex-1 max-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbb]" />
            <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="搜索企业名称或档案编号" className="w-full pl-9 pr-3 py-2 border border-[#dde3ec] rounded text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
          </div>
          <div className="flex gap-2">
            {["全部", "AAA", "AA", "A", "B", "C"].map(g => (
              <button key={g} onClick={() => setGradeFilter(g)} className={`px-3 py-1.5 rounded text-[12px] font-medium transition-colors ${gradeFilter === g ? "bg-[#1a5fa8] text-white" : "bg-[#f5f7fa] text-[#555] hover:bg-[#e8f4fd] hover:text-[#1a5fa8]"}`}>{g}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead className="bg-[#f8fafc] border-b border-[#e8edf5]">
              <tr>
                {["档案编号", "企业/主体名称", "类型", "信用评分", "信用等级", "贷款笔数", "授信金额", "最近更新", "状态", "操作"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[12px] font-semibold text-[#555]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f8]">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-[#f8fafc]">
                  <td className="px-4 py-3.5 text-[#888] font-mono">{r.id}</td>
                  <td className="px-4 py-3.5 font-medium text-[#1a1a2e]">{r.name}</td>
                  <td className="px-4 py-3.5 text-[#666]">{r.type}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-[#e8edf5] rounded-full h-1.5">
                        <div className="bg-[#1a5fa8] h-1.5 rounded-full" style={{ width: `${((r.score - 300) / 650) * 100}%` }} />
                      </div>
                      <span className="font-bold text-[#1a1a2e]">{r.score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${GRADE_COLORS[r.grade] || "bg-[#f0f4f8] text-[#666]"}`}>{r.grade}</span>
                  </td>
                  <td className="px-4 py-3.5 text-[#666]">{r.loans} 笔</td>
                  <td className="px-4 py-3.5 font-medium text-[#1a5fa8]">{r.amount}</td>
                  <td className="px-4 py-3.5 text-[#888]">{r.lastUpdate}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${r.status === "正常" ? "bg-[#e8fdf0] text-[#3a8c3f]" : "bg-[#fde8e8] text-[#d9534f]"}`}>{r.status}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button className="text-[#1a5fa8] hover:underline text-[12px]">查看</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-3 border-t border-[#e8edf5] flex items-center justify-between text-[12px] text-[#888]">
            <span>共 {filtered.length} 条记录</span>
            <div className="flex gap-1">
              {[1, 2, 3, "..."].map((p, i) => (
                <button key={i} className={`w-7 h-7 rounded text-[12px] ${p === 1 ? "bg-[#1a5fa8] text-white" : "hover:bg-[#f5f7fa]"}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
