"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Plus } from "lucide-react"

type StatusKey = "all" | "pending" | "rejected" | "active" | "ended" | "closed"

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  active:   { label: "正在进行", color: "#1a5fa8", bg: "#e8f4fd" },
  pending:  { label: "待审核",   color: "#e8831a", bg: "#fff8f0" },
  rejected: { label: "驳回待修改", color: "#dc2626", bg: "#fff1f1" },
  ended:    { label: "已结束",   color: "#6b7c93", bg: "#f5f7fa" },
  closed:   { label: "已关闭",   color: "#999",    bg: "#f5f5f5" },
}

const STATUS_TABS: { key: StatusKey; label: string }[] = [
  { key: "all",      label: "全部"     },
  { key: "pending",  label: "待审核"   },
  { key: "rejected", label: "驳回待修改" },
  { key: "active",   label: "正在进行" },
  { key: "ended",    label: "已结束"   },
  { key: "closed",   label: "已关闭"   },
]

const ROWS = [
  {
    id: "ID0001120x", company: "惠州新供销天润粮油储备有限公司",
    products: "丝苗米、南晶香占", estQty: "9000公斤",
    filled: 6630, total: 9000,
    price: "8元/斤",
    planStart: "2026-01", planEnd: "2026-07",
    contact: "张悦", phone: "13900139002",
    status: "active" as const,
    createdAt: "2026-05-22 14:15:30", auditAt: "2026-05-22 14:25:30",
    actions: ["详情", "询价记录", "查看销售订单", "撤回"],
  },
  {
    id: "ID0001120x", company: "惠州仲恺供销闸丰农产品有限公司",
    products: "菠萝、土豆", estQty: "8000公斤",
    filled: 0, total: 8000,
    price: "5元/公斤",
    planStart: "2026-03", planEnd: "2026-06",
    contact: "汪通", phone: "13700137003",
    status: "pending" as const,
    createdAt: "2026-05-23 10:45:22", auditAt: "——",
    actions: ["详情", "撤回"],
  },
  {
    id: "ID0001120x", company: "广东新供销天润天源米业有限公司",
    products: "象牙香占、香雪", estQty: "2吨",
    filled: 0, total: 2000,
    price: "8元/公斤",
    planStart: "2026-05", planEnd: "2026-08",
    contact: "陈伟", phone: "13500135005",
    status: "rejected" as const,
    createdAt: "2026-05-24 16:20:10", auditAt: "2026-05-25 14:15:30",
    actions: ["编辑", "详情"],
  },
  {
    id: "ID0001120x", company: "广东天龙冷链物流有限公司",
    products: "土豆、豇豆", estQty: "7000公斤",
    filled: 7000, total: 7000,
    price: "1.2元/公斤",
    planStart: "2026-08", planEnd: "2026-11",
    contact: "方正", phone: "13400134006",
    status: "ended" as const,
    createdAt: "2026-05-25 11:05:45", auditAt: "2026-05-26 11:05:45",
    actions: ["详情", "询价记录", "查看销售订单"],
  },
]

const STAT_CARDS = [
  { label: "供应发布总场次", value: "100 场" },
  { label: "正在进行场次",   value: "89 场"  },
  { label: "参与采购商数",   value: "1887 家" },
  { label: "累计供应量",     value: "328391 吨" },
  { label: "达成交易额",     value: "18879877 元", highlight: true },
]

export default function SupplyListPage() {
  const [statusTab, setStatusTab] = useState<StatusKey>("all")

  const filtered = statusTab === "all" ? ROWS : ROWS.filter(r => r.status === statusTab)

  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-[13px] text-[#999] mb-4 flex items-center gap-1">
        <span>发布管理</span>
        <span className="mx-1">&gt;</span>
        <span className="text-[#333] font-medium">供应信息</span>
      </div>

      <div className="bg-white rounded-lg border border-[#dde3ec] overflow-hidden">
        {/* 统计卡片 */}
        <div className="flex gap-0 border-b border-[#dde3ec]">
          {STAT_CARDS.map((c) => (
            <div key={c.label} className="flex-1 px-6 py-4 border-r border-[#dde3ec] last:border-r-0">
              <div className={`text-[18px] font-bold mb-0.5 ${c.highlight ? "text-[#e8831a]" : "text-[#1a5fa8]"}`}>{c.value}</div>
              <div className="text-[12px] text-[#6b7c93]">{c.label}</div>
            </div>
          ))}
        </div>

        <div className="p-5">
          {/* 搜索区 */}
          <div className="grid grid-cols-5 gap-3 mb-3">
            <div>
              <label className="text-[12px] text-[#666] block mb-1">编号</label>
              <input placeholder="请输入场次编号" className="w-full h-8 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
            </div>
            <div>
              <label className="text-[12px] text-[#666] block mb-1">企业名称</label>
              <input placeholder="请输入企业名称" className="w-full h-8 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
            </div>
            <div>
              <label className="text-[12px] text-[#666] block mb-1">商品</label>
              <input placeholder="请输入" className="w-full h-8 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
            </div>
            <div>
              <label className="text-[12px] text-[#666] block mb-1">联系人</label>
              <input placeholder="请输入" className="w-full h-8 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
            </div>
            <div></div>
          </div>
          <div className="grid grid-cols-5 gap-3 mb-4">
            <div className="col-span-2">
              <label className="text-[12px] text-[#666] block mb-1">计划供应时间</label>
              <div className="flex items-center gap-1">
                <input type="text" placeholder="开始时间" className="flex-1 h-8 border border-[#dde3ec] rounded px-2 text-[12px] outline-none focus:border-[#1a5fa8]" />
                <span className="text-[#999] text-[12px]">至</span>
                <input type="text" placeholder="结束时间" className="flex-1 h-8 border border-[#dde3ec] rounded px-2 text-[12px] outline-none focus:border-[#1a5fa8]" />
              </div>
            </div>
            <div className="col-span-2">
              <label className="text-[12px] text-[#666] block mb-1">创建时间</label>
              <div className="flex items-center gap-1">
                <input type="text" placeholder="开始时间" className="flex-1 h-8 border border-[#dde3ec] rounded px-2 text-[12px] outline-none focus:border-[#1a5fa8]" />
                <span className="text-[#999] text-[12px]">至</span>
                <input type="text" placeholder="结束时间" className="flex-1 h-8 border border-[#dde3ec] rounded px-2 text-[12px] outline-none focus:border-[#1a5fa8]" />
                {(["今天","昨天","近7天","近30天"] as const).map(d => (
                  <button key={d} className="h-8 px-2 border border-[#dde3ec] rounded text-[12px] text-[#666] hover:border-[#1a5fa8] hover:text-[#1a5fa8] whitespace-nowrap transition-colors">{d}</button>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-2">
              <button className="h-8 px-5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" />查询
              </button>
              <button className="h-8 px-4 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">清空</button>
              <button className="h-8 px-4 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">导出</button>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="mb-4">
            <button className="flex items-center gap-1.5 h-8 px-4 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]">
              <Plus className="w-3.5 h-3.5" />发布供应信息
            </button>
          </div>

          {/* 状态 Tab */}
          <div className="flex border-b border-[#dde3ec] mb-4">
            {STATUS_TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setStatusTab(t.key)}
                className={`px-5 py-2 text-[13px] border-b-2 transition-colors ${
                  statusTab === t.key ? "border-[#1a5fa8] text-[#1a5fa8] font-medium" : "border-transparent text-[#666] hover:text-[#1a5fa8]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* 表格 */}
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] border-collapse">
              <thead>
                <tr className="bg-[#f5f7fa] text-[#444]">
                  {["编号","发布方(卖方)","商品","预估供应量","供应进度","供应价","计划供应时间","联系人","联系电话","状态","创建时间","平台审核时间","操作"].map(h => (
                    <th key={h} className="px-3 py-2.5 text-left font-semibold border border-[#e8edf5] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => {
                  const s = STATUS_MAP[row.status]
                  const pct = Math.round((row.filled / row.total) * 100)
                  return (
                    <tr key={i} className="border-b border-[#e8edf5] hover:bg-[#fafbfd]">
                      <td className="px-3 py-3 text-[#1a5fa8] font-mono text-[12px]">{row.id}</td>
                      <td className="px-3 py-3 max-w-[140px]"><div className="text-[#1a1a2e] leading-tight">{row.company}</div></td>
                      <td className="px-3 py-3 whitespace-nowrap">{row.products}</td>
                      <td className="px-3 py-3 whitespace-nowrap">{row.estQty}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2 min-w-[120px]">
                          <div className="flex-1 h-2 rounded-full bg-[#e8edf5] overflow-hidden">
                            <div className="h-full rounded-full bg-[#1a5fa8]" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-[12px] text-[#6b7c93] whitespace-nowrap">{row.filled}/{row.total}公斤</span>
                          <span className="text-[12px] font-medium text-[#1a5fa8]">{pct}%</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">{row.price}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-[12px] text-[#6b7c93]">{row.planStart} - {row.planEnd}</td>
                      <td className="px-3 py-3">{row.contact}</td>
                      <td className="px-3 py-3 text-[12px] text-[#6b7c93]">{row.phone}</td>
                      <td className="px-3 py-3">
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap" style={{ color: s.color, background: s.bg }}>{s.label}</span>
                      </td>
                      <td className="px-3 py-3 text-[12px] text-[#6b7c93] whitespace-nowrap">{row.createdAt}</td>
                      <td className="px-3 py-3 text-[12px] text-[#6b7c93] whitespace-nowrap">{row.auditAt}</td>
                      <td className="px-3 py-3">
                        <div className="flex flex-col gap-1">
                          {row.actions.map(a => (
                            <button key={a} className="text-[12px] text-[#1a5fa8] hover:underline text-left whitespace-nowrap">{a}</button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* 分页 */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#dde3ec]">
            <span className="text-[13px] text-[#999]">共 {filtered.length} 条记录，10条/页</span>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded border border-[#dde3ec] text-[13px] text-[#666]">&lt;</button>
              <button className="w-7 h-7 rounded text-[13px] bg-[#1a5fa8] text-white">1</button>
              <button className="w-7 h-7 rounded border border-[#dde3ec] text-[13px] text-[#666]">&gt;</button>
              <span className="text-[13px] text-[#999] ml-2">前往</span>
              <input className="w-10 h-7 border border-[#dde3ec] rounded px-2 text-[13px] text-center" defaultValue="1" />
              <span className="text-[13px] text-[#999]">页</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
