"use client"

import { useState } from "react"
import { Plus, Search, X } from "lucide-react"

type Group = {
  id: number
  name: string
  customers: number
  status: "应用" | "禁用"
  phone: string
  createdAt: string
  desc: string
}

const initialGroups: Group[] = [
  { id: 1, name: "越秀区客户分组", customers: 23, status: "应用", phone: "13900139002", createdAt: "2026-05-22 14:15:30", desc: "广州市越秀区采购商集合" },
  { id: 2, name: "海珠区客户分组", customers: 17, status: "应用", phone: "13700137003", createdAt: "2026-05-23 10:45:22", desc: "广州市海珠区采购商集合" },
  { id: 3, name: "天河区客户分组", customers: 28, status: "禁用", phone: "13500135005", createdAt: "2026-05-24 16:20:10", desc: "广州市天河区采购商集合" },
  { id: 4, name: "白云区客户分组", customers: 49, status: "禁用", phone: "13400134006", createdAt: "2026-05-25 11:05:45", desc: "广州市白云区采购商集合" },
]

const CUSTOMER_OPTIONS = ["A客户", "B客户", "C客户", "D客户", "E客户", "F客户", "G客户"]

type PanelMode = "add" | "edit" | null

export default function KehufenzuPage() {
  const [groups, setGroups] = useState<Group[]>(initialGroups)
  const [keyword, setKeyword] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const [panelMode, setPanelMode] = useState<PanelMode>(null)
  const [editingGroup, setEditingGroup] = useState<Group | null>(null)

  // Form state
  const [formName, setFormName] = useState("")
  const [formStatus, setFormStatus] = useState<"应用" | "禁用">("应用")
  const [formCustomers, setFormCustomers] = useState<string[]>(["A客户", "B客户", "C客户"])
  const [formDesc, setFormDesc] = useState("")

  function openAdd() {
    setPanelMode("add")
    setEditingGroup(null)
    setFormName("")
    setFormStatus("应用")
    setFormCustomers(["A客户", "B客户", "C客户"])
    setFormDesc("")
  }

  function openEdit(g: Group) {
    setPanelMode("edit")
    setEditingGroup(g)
    setFormName(g.name)
    setFormStatus(g.status)
    setFormCustomers(["A客户", "B客户"])
    setFormDesc(g.desc)
  }

  function closePanel() {
    setPanelMode(null)
    setEditingGroup(null)
  }

  function handleConfirm() {
    if (!formName.trim()) return
    if (panelMode === "add") {
      const next: Group = {
        id: Date.now(),
        name: formName,
        customers: formCustomers.length * 8,
        status: formStatus,
        phone: "138" + Math.floor(Math.random() * 90000000 + 10000000),
        createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
        desc: formDesc,
      }
      setGroups((prev) => [...prev, next])
    } else if (panelMode === "edit" && editingGroup) {
      setGroups((prev) =>
        prev.map((g) =>
          g.id === editingGroup.id ? { ...g, name: formName, status: formStatus, desc: formDesc } : g
        )
      )
    }
    closePanel()
  }

  function handleDelete(id: number) {
    setGroups((prev) => prev.filter((g) => g.id !== id))
  }

  function toggleCustomer(c: string) {
    setFormCustomers((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    )
  }

  const setQuick = (days: number) => {
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - days)
    setStartDate(start.toISOString().slice(0, 10))
    setEndDate(end.toISOString().slice(0, 10))
  }

  const filtered = groups.filter((g) => {
    const kw = !keyword || g.name.includes(keyword)
    const st = !statusFilter || g.status === statusFilter
    return kw && st
  })

  return (
    <div className="flex gap-0">
      {/* Main panel */}
      <div className="flex-1 min-w-0">
        {/* Breadcrumb */}
        <div className="text-[12px] text-[#6b7c93] mb-4">
          集采 <span className="mx-1">›</span>
          <span className="text-[#1a1a2e]">客户分组</span>
        </div>

        {/* Search bar */}
        <div className="bg-white border border-[#e8edf5] rounded p-4 mb-4 space-y-3">
          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className="text-[12px] text-[#6b7c93] mb-1 block">分组名称：</label>
              <input
                type="text"
                placeholder="请输入"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] outline-none focus:border-[#1a5fa8]"
              />
            </div>
            <div>
              <label className="text-[12px] text-[#6b7c93] mb-1 block">应用状态：</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] outline-none focus:border-[#1a5fa8] bg-white"
              >
                <option value="">请选择</option>
                <option value="应用">应用</option>
                <option value="禁用">禁用</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-[12px] text-[#6b7c93] mb-1 block">创建时间：</label>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 border border-[#dde3ec] rounded px-2 py-1.5 flex-1">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flex-1 text-[13px] outline-none"
                  />
                </div>
                <span className="text-[12px] text-[#999]">至</span>
                <div className="flex items-center gap-1 border border-[#dde3ec] rounded px-2 py-1.5 flex-1">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flex-1 text-[13px] outline-none"
                  />
                </div>
                <button onClick={() => setQuick(0)} className="text-[12px] text-[#1a5fa8] hover:underline whitespace-nowrap">今天</button>
                <button onClick={() => setQuick(1)} className="text-[12px] text-[#1a5fa8] hover:underline whitespace-nowrap">昨天</button>
                <button onClick={() => setQuick(7)} className="text-[12px] text-[#1a5fa8] hover:underline whitespace-nowrap">近7天</button>
                <button onClick={() => setQuick(30)} className="text-[12px] text-[#1a5fa8] hover:underline whitespace-nowrap">近30天</button>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {}}
              className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]"
            >
              查询
            </button>
            <button
              onClick={() => { setKeyword(""); setStatusFilter(""); setStartDate(""); setEndDate("") }}
              className="px-4 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]"
            >
              清空
            </button>
          </div>
        </div>

        {/* New button */}
        <div className="mb-3">
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]"
          >
            <Plus className="w-4 h-4" />
            新增客户分组
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#e8edf5] rounded overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-[12px] text-[#6b7c93] bg-[#f8fafc] border-b border-[#e8edf5]">
                <th className="px-4 py-2.5 text-center w-16">序号</th>
                <th className="px-4 py-2.5 text-left">分组名称</th>
                <th className="px-4 py-2.5 text-center">关联客户</th>
                <th className="px-4 py-2.5 text-center">应用状态</th>
                <th className="px-4 py-2.5 text-center">联系电话</th>
                <th className="px-4 py-2.5 text-center">创建时间</th>
                <th className="px-4 py-2.5 text-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((g, idx) => (
                <tr key={g.id} className="border-b border-[#f0f4f8] hover:bg-[#f8fafc] text-[13px]">
                  <td className="px-4 py-3 text-center text-[#6b7c93]">{idx + 1}</td>
                  <td className="px-4 py-3 font-medium text-[#1a1a2e]">{g.name}</td>
                  <td className="px-4 py-3 text-center text-[#1a5fa8] font-semibold">{g.customers}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                      g.status === "应用"
                        ? "bg-[#e8f5e9] text-[#3a8c3f]"
                        : "bg-[#f5f5f5] text-[#999]"
                    }`}>
                      {g.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-[#6b7c93]">{g.phone}</td>
                  <td className="px-4 py-3 text-center text-[#6b7c93]">{g.createdAt}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button className="text-[12px] text-[#1a5fa8] hover:underline">详情</button>
                    <button
                      onClick={() => openEdit(g)}
                      className="text-[12px] text-[#1a5fa8] hover:underline"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDelete(g.id)}
                      className="text-[12px] text-[#ef4444] hover:underline"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-[#999] text-[13px]">暂无数据</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right panel */}
      {panelMode && (
        <div className="w-[300px] shrink-0 ml-4 bg-white border border-[#e8edf5] rounded shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#e8edf5]">
            <span className="text-[14px] font-semibold text-[#1a1a2e]">
              {panelMode === "add" ? "新增分组" : "编辑分组"}
            </span>
            <button onClick={closePanel}>
              <X className="w-4 h-4 text-[#999] hover:text-[#555]" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* 分组名称 */}
            <div>
              <label className="text-[13px] text-[#1a1a2e] mb-1.5 block">
                <span className="text-[#ef4444] mr-0.5">*</span>分组名称
              </label>
              <input
                type="text"
                placeholder="请输入"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] outline-none focus:border-[#1a5fa8]"
              />
            </div>

            {/* 状态 */}
            <div>
              <label className="text-[13px] text-[#1a1a2e] mb-1.5 block">
                <span className="text-[#ef4444] mr-0.5">*</span>状态
              </label>
              <div className="flex items-center gap-4">
                {(["应用", "禁用"] as const).map((s) => (
                  <label key={s} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      checked={formStatus === s}
                      onChange={() => setFormStatus(s)}
                      className="accent-[#1a5fa8]"
                    />
                    <span className="text-[13px] text-[#444]">{s}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 选择客户 */}
            <div>
              <label className="text-[13px] text-[#1a1a2e] mb-1.5 block">
                <span className="text-[#ef4444] mr-0.5">*</span>选择客户
              </label>
              <div className="border border-[#dde3ec] rounded px-3 py-2 min-h-[40px] flex flex-wrap gap-1.5">
                {formCustomers.map((c) => (
                  <span
                    key={c}
                    className="flex items-center gap-1 px-2 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[12px] rounded-full"
                  >
                    {c}
                    <button onClick={() => toggleCustomer(c)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <div className="relative group">
                  <button className="text-[12px] text-[#1a5fa8] hover:underline px-1">+ 添加</button>
                  <div className="hidden group-hover:block absolute left-0 top-full z-10 bg-white border border-[#e8edf5] rounded shadow-lg w-28 py-1">
                    {CUSTOMER_OPTIONS.filter((c) => !formCustomers.includes(c)).map((c) => (
                      <button
                        key={c}
                        onClick={() => toggleCustomer(c)}
                        className="w-full text-left px-3 py-1.5 text-[13px] hover:bg-[#f5f7fa]"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 分组说明 */}
            <div>
              <label className="text-[13px] text-[#1a1a2e] mb-1.5 block">分组说明</label>
              <textarea
                placeholder="请输入"
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                maxLength={300}
                rows={4}
                className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] outline-none focus:border-[#1a5fa8] resize-none"
              />
              <div className="text-right text-[11px] text-[#aaa]">{formDesc.length}/300</div>
            </div>
          </div>

          <div className="flex justify-end gap-2 px-4 py-3 border-t border-[#e8edf5]">
            <button
              onClick={closePanel}
              className="px-4 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]"
            >
              取消
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]"
            >
              确定
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
