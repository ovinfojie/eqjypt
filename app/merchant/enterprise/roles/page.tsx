"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"

const roles = [
  { id: "R001", name: "超级管理员", desc: "拥有全部功能的最高权限", memberCount: 1, isSystem: true },
  { id: "R002", name: "采购经理",   desc: "可操作采购订单、询报价、合同管理等模块", memberCount: 2, isSystem: false },
  { id: "R003", name: "销售专员",   desc: "可操作销售信息发布、产销对接、订单查看", memberCount: 3, isSystem: false },
  { id: "R004", name: "财务专员",   desc: "可查看和处理财务结算、发票管理等模块", memberCount: 1, isSystem: false },
  { id: "R005", name: "仓储专员",   desc: "可操作库存管理、批次验收等模块", memberCount: 2, isSystem: false },
]

const modules = [
  { key: "dashboard",  label: "工作台" },
  { key: "yanxuan",    label: "供销严选" },
  { key: "jingjia",    label: "竞价交易" },
  { key: "chanxiao",   label: "产销对接" },
  { key: "dingdan",    label: "订单农业" },
  { key: "trade",      label: "交易订单" },
  { key: "stock",      label: "库存管理" },
  { key: "contract",   label: "合同管理" },
  { key: "finance",    label: "财务结算" },
  { key: "jicai",      label: "集采专区" },
  { key: "member",     label: "会员管理" },
  { key: "marketing",  label: "营销工具" },
  { key: "enterprise", label: "企业管理" },
  { key: "account",    label: "账号设置" },
]

const permissions: Record<string, Record<string, { view: boolean; edit: boolean; delete: boolean }>> = {
  R002: { dashboard: { view: true, edit: false, delete: false }, trade: { view: true, edit: true, delete: false }, contract: { view: true, edit: true, delete: false }, dingdan: { view: true, edit: true, delete: false }, stock: { view: true, edit: true, delete: false }, finance: { view: true, edit: false, delete: false }, yanxuan: { view: false, edit: false, delete: false }, jingjia: { view: false, edit: false, delete: false }, chanxiao: { view: false, edit: false, delete: false }, jicai: { view: false, edit: false, delete: false }, member: { view: false, edit: false, delete: false }, marketing: { view: false, edit: false, delete: false }, enterprise: { view: true, edit: false, delete: false }, account: { view: true, edit: false, delete: false } },
}

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState("R002")
  const [showAdd, setShowAdd] = useState(false)

  const perm = permissions[selectedRole]

  return (
    <div className="max-w-[1000px] space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a2e] mb-1">角色权限管理</h1>
          <p className="text-[13px] text-[#6b7c93]">创建和管理操作角色，精细控制各角色对各模块的查看、编辑、删除权限。</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-1.5 px-4 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
          <Plus className="w-3.5 h-3.5" />新建角色
        </button>
      </div>

      <div className="flex gap-4">
        {/* 角色列表 */}
        <div className="w-[220px] shrink-0 space-y-2">
          {roles.map(r => (
            <button key={r.id} onClick={() => setSelectedRole(r.id)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${selectedRole === r.id ? "border-[#1a5fa8] bg-[#e8f4fd]" : "border-[#e8edf5] bg-white hover:border-[#1a5fa8]/50"}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[13px] font-semibold text-[#1a1a2e]">{r.name}</span>
                {r.isSystem && <span className="text-[10px] px-1.5 py-0.5 bg-[#f0f4f8] text-[#6b7c93] rounded">系统</span>}
              </div>
              <div className="text-[11px] text-[#999]">{r.memberCount} 名成员</div>
            </button>
          ))}
        </div>

        {/* 权限配置 */}
        <div className="flex-1 bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#f0f4f8] flex items-center justify-between">
            <div>
              <span className="text-[14px] font-semibold text-[#1a1a2e]">{roles.find(r => r.id === selectedRole)?.name}</span>
              <span className="ml-2 text-[12px] text-[#6b7c93]">{roles.find(r => r.id === selectedRole)?.desc}</span>
            </div>
            {!roles.find(r => r.id === selectedRole)?.isSystem && (
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 border border-[#e8edf5] text-[12px] text-[#555] rounded hover:border-[#1a5fa8]"><Pencil className="w-3 h-3" />编辑</button>
                <button className="flex items-center gap-1 px-3 py-1.5 border border-[#e8edf5] text-[12px] text-[#ef4444] rounded hover:border-red-300"><Trash2 className="w-3 h-3" />删除</button>
              </div>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-[12px] text-[#6b7c93] bg-[#f8fafc] border-b border-[#f0f4f8]">
                  <th className="px-5 py-2.5 text-left font-medium w-32">功能模块</th>
                  <th className="px-5 py-2.5 text-center font-medium">查看</th>
                  <th className="px-5 py-2.5 text-center font-medium">编辑/操作</th>
                  <th className="px-5 py-2.5 text-center font-medium">删除/审批</th>
                </tr>
              </thead>
              <tbody>
                {modules.map(m => {
                  const p = perm?.[m.key] ?? { view: selectedRole === "R001", edit: selectedRole === "R001", delete: selectedRole === "R001" }
                  return (
                    <tr key={m.key} className="border-b border-[#f8fafc] hover:bg-[#fafbfc]">
                      <td className="px-5 py-2.5 font-medium text-[#1a1a2e]">{m.label}</td>
                      {["view", "edit", "delete"].map(type => (
                        <td key={type} className="px-5 py-2.5 text-center">
                          <input type="checkbox" defaultChecked={(p as Record<string, boolean>)[type]}
                            disabled={selectedRole === "R001"}
                            className="w-4 h-4 accent-[#1a5fa8] cursor-pointer disabled:opacity-50" />
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {selectedRole !== "R001" && (
            <div className="px-5 py-4 border-t border-[#f0f4f8] flex justify-end">
              <button className="px-6 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">保存权限设置</button>
            </div>
          )}
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[460px] shadow-xl">
            <div className="px-6 py-4 border-b border-[#f0f4f8] flex items-center justify-between">
              <span className="text-[15px] font-semibold">新建角色</span>
              <button onClick={() => setShowAdd(false)} className="text-[#aaa] text-lg">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[12px] text-[#6b7c93] mb-1"><span className="text-red-500">*</span>角色名称</label>
                <input className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入角色名称" />
              </div>
              <div>
                <label className="block text-[12px] text-[#6b7c93] mb-1">角色描述</label>
                <textarea className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none h-20" placeholder="简要描述该角色的职责范围" />
              </div>
              <div>
                <label className="block text-[12px] text-[#6b7c93] mb-1">复制权限自</label>
                <select className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]">
                  <option value="">从空白开始</option>
                  {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>
            </div>
            <div className="px-6 pb-5 flex gap-3 justify-end">
              <button onClick={() => setShowAdd(false)} className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded">取消</button>
              <button onClick={() => setShowAdd(false)} className="px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded">创建角色</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
