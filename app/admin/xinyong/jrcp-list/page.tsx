"use client"

import { useState } from "react"
import { Plus, Pencil, Eye, ToggleLeft, ToggleRight } from "lucide-react"
import Link from "next/link"

const products = [
  { id: "JR001", name: "农业经营贷",       bank: "广东农商银行", type: "信贷",   amount: "10-500万",  rate: "4.35%",  term: "1-3年", target: "种植/养殖企业", status: "active",   apps: 128, approved: 96  },
  { id: "JR002", name: "粮食收购贷",       bank: "中国农业银行", type: "信贷",   amount: "50-2000万", rate: "3.85%",  term: "6-12月", target: "粮食收购商",  status: "active",   apps: 64,  approved: 52  },
  { id: "JR003", name: "供应链金融",       bank: "建设银行",     type: "供应链", amount: "100-5000万", rate: "3.65%", term: "90-180天", target: "供应链核心企业", status: "active", apps: 45, approved: 38 },
  { id: "JR004", name: "农产品仓单融资",   bank: "浦发银行",     type: "融资",   amount: "20-1000万", rate: "4.80%",  term: "30-90天", target: "仓储企业",   status: "active",   apps: 32,  approved: 28  },
  { id: "JR005", name: "农业设备融资租赁", bank: "平安租赁",     type: "租赁",   amount: "50-500万",  rate: "5.50%",  term: "2-5年",   target: "农机购置企业", status: "inactive", apps: 18, approved: 15 },
]

export default function JrcpListPage() {
  const [data, setData] = useState(products)
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState<typeof products[0] | null>(null)

  const toggle = (id: string) => setData(data.map(r => r.id === id ? { ...r, status: r.status === "active" ? "inactive" : "active" } : r))

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">金融产品管理</h1>
          <p className="text-[13px] text-[#6b7c93] mt-0.5">管理平台展示的金融产品，配置贷款、融资等产品信息</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/xinyong/jrcp-shenhe" className="px-4 py-2 border border-[#dde3ec] text-[#1a5fa8] text-[13px] rounded hover:border-[#1a5fa8]">
            申请审核
          </Link>
          <button onClick={() => { setEditTarget(null); setShowModal(true) }} className="flex items-center gap-1.5 px-4 py-2 bg-[#1a1a2e] text-white text-[13px] rounded hover:bg-[#2d2d4e]">
            <Plus className="w-3.5 h-3.5" />新增金融产品
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "产品总数",   value: data.length,                                   color: "#1a1a2e" },
          { label: "已上架",     value: data.filter(r => r.status === "active").length, color: "#2e7d32" },
          { label: "本月申请数", value: data.reduce((s, r) => s + r.apps, 0),           color: "#1a5fa8" },
          { label: "本月审批通过", value: data.reduce((s, r) => s + r.approved, 0),    color: "#e8831a" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-[#dde3ec] p-4 flex items-center gap-4">
            <div className="text-[28px] font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[13px] text-[#6b7c93]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-3 gap-4">
        {data.filter(p => p.status === "active").map(p => (
          <div key={p.id} className="bg-white rounded-xl border border-[#dde3ec] p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-[15px] font-bold text-[#1a1a2e]">{p.name}</h3>
                <div className="text-[12px] text-[#6b7c93] mt-0.5">{p.bank}</div>
              </div>
              <span className="px-2 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[11px] rounded-full">{p.type}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-[#f5f7fa] rounded-lg p-3 text-center">
                <div className="text-[18px] font-bold text-[#dc2626]">{p.rate}</div>
                <div className="text-[11px] text-[#999] mt-0.5">年化利率</div>
              </div>
              <div className="bg-[#f5f7fa] rounded-lg p-3 text-center">
                <div className="text-[14px] font-bold text-[#1a5fa8]">{p.amount}</div>
                <div className="text-[11px] text-[#999] mt-0.5">可贷金额</div>
              </div>
            </div>
            <div className="text-[12px] text-[#6b7c93]">适用对象：{p.target}</div>
            <div className="text-[12px] text-[#6b7c93] mt-0.5">贷款期限：{p.term}</div>
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#f0f4f9]">
              <span className="text-[12px] text-[#555]">申请 <strong className="text-[#1a1a2e]">{p.apps}</strong></span>
              <span className="text-[12px] text-[#555]">通过 <strong className="text-[#2e7d32]">{p.approved}</strong></span>
              <button onClick={() => { setEditTarget(p); setShowModal(true) }} className="ml-auto text-[12px] text-[#e8831a] hover:underline flex items-center gap-1">
                <Pencil className="w-3 h-3" />编辑
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#dde3ec]">
        <div className="px-5 py-3 border-b border-[#dde3ec]">
          <span className="text-[14px] font-semibold text-[#1a1a2e]">全部产品列表</span>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[#999] text-[12px] border-b border-[#f0f4f9]">
              {["编号","产品名称","合作机构","类型","可贷金额","利率","期限","申请数","状态","操作"].map(h => (
                <th key={h} className="px-4 py-2.5 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id} className="border-b border-[#f0f4f9] last:border-0 hover:bg-[#fafbfc]">
                <td className="px-4 py-3 text-[#999] text-[12px]">{row.id}</td>
                <td className="px-4 py-3 font-medium text-[#1a1a2e]">{row.name}</td>
                <td className="px-4 py-3 text-[#555]">{row.bank}</td>
                <td className="px-4 py-3 text-[#6b7c93]">{row.type}</td>
                <td className="px-4 py-3 text-[#555]">{row.amount}</td>
                <td className="px-4 py-3 font-bold text-[#dc2626]">{row.rate}</td>
                <td className="px-4 py-3 text-[#555]">{row.term}</td>
                <td className="px-4 py-3 text-[#1a5fa8] font-semibold">{row.apps}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-[11px] font-medium ${row.status === "active" ? "text-[#2e7d32] bg-[#e8f5ee]" : "text-[#6b7280] bg-[#f3f4f6]"}`}>{row.status === "active" ? "已上架" : "已下架"}</span></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setEditTarget(row); setShowModal(true) }} className="flex items-center gap-1 text-[#1a5fa8] hover:underline text-[12px]"><Eye className="w-3.5 h-3.5" />详情</button>
                    <button onClick={() => { setEditTarget(row); setShowModal(true) }} className="flex items-center gap-1 text-[#e8831a] hover:underline text-[12px]"><Pencil className="w-3.5 h-3.5" />编辑</button>
                    <button onClick={() => toggle(row.id)} className={`flex items-center gap-1 text-[12px] ${row.status === "active" ? "text-[#dc2626]" : "text-[#2e7d32]"} hover:underline`}>
                      {row.status === "active" ? <><ToggleRight className="w-3.5 h-3.5" />下架</> : <><ToggleLeft className="w-3.5 h-3.5" />上架</>}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl shadow-xl p-6 w-[520px]" onClick={e => e.stopPropagation()}>
            <h3 className="text-[16px] font-bold text-[#1a1a2e] mb-5">{editTarget ? "编辑金融产品" : "新增金融产品"}</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "产品名称",   placeholder: "如：农业经营贷",    def: editTarget?.name || "" },
                { label: "合作机构",   placeholder: "如：广东农商银行",  def: editTarget?.bank || "" },
                { label: "产品类型",   placeholder: "如：信贷",          def: editTarget?.type || "" },
                { label: "年化利率",   placeholder: "如：4.35%",          def: editTarget?.rate || "" },
                { label: "可贷金额范围", placeholder: "如：10-500万",    def: editTarget?.amount || "" },
                { label: "贷款期限",   placeholder: "如：1-3年",          def: editTarget?.term || "" },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-[13px] font-medium text-[#444] mb-1.5">{f.label}</label>
                  <input defaultValue={f.def} placeholder={f.placeholder} className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-[13px] font-medium text-[#444] mb-1.5">适用对象</label>
              <input defaultValue={editTarget?.target || ""} placeholder="如：种植/养殖企业" className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-[#dde3ec] rounded text-[13px] text-[#555]">取消</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-[#1a5fa8] text-white rounded text-[13px] hover:bg-[#0d4a8a]">保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
