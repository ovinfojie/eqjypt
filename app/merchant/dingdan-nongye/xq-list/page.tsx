"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Download } from "lucide-react"

const mockData = [
  {
    id: "ID0001120x", publisher: "平远新供销天润粮油有限公司", dept: "粮油业务部",
    title: "2026年广东省内计划大量采购丝苗米", product: "丝苗米", spec: "公斤",
    qty: "9000公斤", progress: 6630, total: 9000, status: "正在进行", deadline: "2026-04-25",
  },
  {
    id: "ID0001120x", publisher: "江门新供销天润农业发展有限公司", dept: "粮油业务部",
    title: "2026年广东省内计划大量采购菠萝干", product: "菠萝干", spec: "公斤",
    qty: "8000公斤", progress: 0, total: 8000, status: "待审核", deadline: "2026-04-25",
  },
  {
    id: "ID0001120x", publisher: "东莞新供销天润农产品有限公司", dept: "粮油业务部",
    title: "2026年广东省内计划大量采购象牙香占", product: "象牙香占", spec: "吨",
    qty: "2吨", progress: 0, total: 2, status: "已结束", deadline: "2026-04-20",
  },
  {
    id: "ID0001120x", publisher: "广东汕头潮阳天润粮油有限公司", dept: "粮油业务部",
    title: "2026年广东省内计划大量采购恩平土豆", product: "土豆", spec: "公斤",
    qty: "7000公斤", progress: 7000, total: 7000, status: "已结束", deadline: "2026-04-20",
  },
  {
    id: "ID0001120x", publisher: "广州供销数字科技有限公司", dept: "粮油业务部",
    title: "2026年广东省内计划大量采购新鲜荔枝", product: "荔枝", spec: "公斤",
    qty: "5000公斤", progress: 1200, total: 5000, status: "正在进行", deadline: "2026-05-10",
  },
  {
    id: "ID0001120x", publisher: "深圳新供销农业科技有限公司", dept: "粮油业务部",
    title: "2026年广东省内计划大量采购冬瓜", product: "冬瓜", spec: "公斤",
    qty: "12000公斤", progress: 0, total: 12000, status: "驳回待修改", deadline: "2026-05-15",
  },
]

const tabs = ["全部", "待审核", "驳回待修改", "正在进行", "已结束", "已关闭"]
const statusColors: Record<string, string> = {
  "正在进行": "text-[#1a5fa8] bg-[#e8f4fd]",
  "待审核": "text-[#e8831a] bg-[#fff4e6]",
  "驳回待修改": "text-[#e53935] bg-[#fdecea]",
  "已结束": "text-[#666] bg-[#f0f0f0]",
  "已关闭": "text-[#666] bg-[#f0f0f0]",
}

export default function XqListPage() {
  const [activeTab, setActiveTab] = useState("全部")
  const [searchId, setSearchId] = useState("")
  const [searchCompany, setSearchCompany] = useState("")

  const filtered = mockData.filter(r => {
    if (activeTab !== "全部" && r.status !== activeTab) return false
    if (searchId && !r.id.includes(searchId)) return false
    if (searchCompany && !r.publisher.includes(searchCompany)) return false
    return true
  })

  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-[13px] text-[#999] mb-4">
        发布管理 <span className="mx-1">›</span>
        <span className="text-[#1a5fa8]">订单种植需求</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-5">
        {[
          { label: "需求发布总场次", value: "100 场" },
          { label: "正在进行场次", value: "89 场" },
          { label: "参与供应商数", value: "1887 家" },
          { label: "累计需求量", value: "328391 吨" },
          { label: "达成交易额", value: "18879877 元" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded border border-[#e8edf5] p-4 text-center">
            <div className="text-[13px] text-[#888] mb-1">{s.label}</div>
            <div className="text-[18px] font-bold text-[#1a5fa8]">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Search filters */}
      <div className="bg-white rounded border border-[#e8edf5] p-4 mb-4">
        <div className="flex flex-wrap gap-4 items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-[#666] w-12 shrink-0">编号</span>
            <input value={searchId} onChange={e => setSearchId(e.target.value)}
              placeholder="请输入专场编号" className="border border-[#dde3ec] rounded px-3 h-8 text-[13px] w-36 focus:outline-none focus:border-[#1a5fa8]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-[#666] w-14 shrink-0">企业名称</span>
            <input value={searchCompany} onChange={e => setSearchCompany(e.target.value)}
              placeholder="请输入企业名称" className="border border-[#dde3ec] rounded px-3 h-8 text-[13px] w-44 focus:outline-none focus:border-[#1a5fa8]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-[#666] w-12 shrink-0">需求</span>
            <input placeholder="请输入" className="border border-[#dde3ec] rounded px-3 h-8 text-[13px] w-36 focus:outline-none focus:border-[#1a5fa8]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-[#666] w-10 shrink-0">商品</span>
            <input placeholder="请输入" className="border border-[#dde3ec] rounded px-3 h-8 text-[13px] w-36 focus:outline-none focus:border-[#1a5fa8]" />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-[#666] w-20 shrink-0">计划采购时间</span>
            <input type="date" className="border border-[#dde3ec] rounded px-3 h-8 text-[13px] w-36 focus:outline-none focus:border-[#1a5fa8]" />
            <span className="text-[#999]">至</span>
            <input type="date" className="border border-[#dde3ec] rounded px-3 h-8 text-[13px] w-36 focus:outline-none focus:border-[#1a5fa8]" />
            {["今天", "昨天", "近7天", "近30天"].map(d => (
              <button key={d} className="px-3 h-8 border border-[#dde3ec] rounded text-[13px] text-[#666] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">{d}</button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-5 h-8 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5" /> 查询
          </button>
          <button className="px-5 h-8 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">清空</button>
          <button className="px-5 h-8 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> 导出
          </button>
        </div>
      </div>

      {/* Action + tabs */}
      <div className="bg-white rounded border border-[#e8edf5]">
        <div className="p-4 border-b border-[#e8edf5] flex items-center gap-3">
          <Link href="/merchant/dingdan-nongye/fabu-xq"
            className="px-4 h-8 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors flex items-center">
            发布订单种植需求
          </Link>
          <div className="flex border-b border-[#e8edf5] ml-4">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 h-8 text-[13px] border-b-2 transition-colors ${activeTab === tab ? "border-[#1a5fa8] text-[#1a5fa8] font-semibold" : "border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-[#f5f7fa] border-b border-[#e8edf5]">
              {["编号", "发布方(买方)", "需求标题", "商品", "数量", "需求进度", "报价截止", "状态", "操作"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-semibold text-[#555] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => {
              const pct = row.total > 0 ? Math.round(row.progress / row.total * 100) : 0
              return (
                <tr key={i} className="border-b border-[#f0f0f0] hover:bg-[#fafcff] transition-colors">
                  <td className="px-4 py-3 text-[#1a5fa8]">{row.id}</td>
                  <td className="px-4 py-3">
                    <div className="text-[#333]">{row.publisher}</div>
                    <div className="text-[11px] text-[#999]">({row.dept})</div>
                  </td>
                  <td className="px-4 py-3 text-[#333] max-w-[220px]">{row.title}</td>
                  <td className="px-4 py-3">
                    <div className="text-[#333]">{row.product}</div>
                    <div className="text-[11px] text-[#999]">规格：{row.spec}</div>
                  </td>
                  <td className="px-4 py-3 text-[#333]">{row.qty}</td>
                  <td className="px-4 py-3 w-40">
                    <div className="text-[12px] text-[#666] mb-1">{row.progress}/{row.total}{row.spec}</div>
                    <div className="h-2 bg-[#e8edf5] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${pct >= 100 ? "bg-[#3a8c3f]" : "bg-[#1a5fa8]"}`}
                        style={{ width: `${Math.min(pct, 100)}%` }} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#666]">{row.deadline}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[12px] font-medium ${statusColors[row.status]}`}>{row.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <Link href={`/merchant/dingdan-nongye/xq-baojia-list?id=${row.id}`}
                        className="text-[12px] text-[#1a5fa8] hover:underline">查看报价</Link>
                      <button className="text-[12px] text-[#666] hover:text-[#1a5fa8] text-left">查看详情</button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="px-4 py-3 flex items-center justify-between text-[13px] text-[#666]">
          <span>共 {filtered.length} 条</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-7 h-7 rounded text-[12px] ${p === 1 ? "bg-[#1a5fa8] text-white" : "border border-[#dde3ec] hover:border-[#1a5fa8] hover:text-[#1a5fa8]"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
