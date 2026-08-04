"use client"

import { useState } from "react"
import { X, Plus } from "lucide-react"

const subs = [
  {
    id: "634999292804", name: "交易服务组", type: "批发与大宗销售",
    manager: "吴玲", managerPhone: "138****4564",
    applyTime: "2026-07-02 20:23:03",
    status: "营业中", infoStatus: "未完善", signStatus: "未完善",
  },
  {
    id: "634999292802", name: "生产服务组", type: "零售与个人销售",
    manager: "管文蔚", managerPhone: "187****1111",
    applyTime: "2026-07-02 16:33:19",
    status: "营业中", infoStatus: "审核中", signStatus: "审核中",
  },
  {
    id: "634999292801", name: "流通服务组", type: "批发与大宗销售",
    manager: "程秋奢", managerPhone: "177****1910",
    applyTime: "2026-06-26 11:23:02",
    status: "停业中", infoStatus: "已完善", signStatus: "已完善",
  },
]

const subStaffData = [
  { id: "634999292804", name: "吴玲",  phone: "13900139002", role: "客户管理员", status: "启用", createdAt: "2026-05-22 14:15:30" },
  { id: "634999292802", name: "张悦",  phone: "13700137003", role: "订单员",     status: "启用", createdAt: "2026-05-23 10:45:22" },
  { id: "634999292801", name: "林伟峰", phone: "13000135005", role: "产品经理", status: "禁用", createdAt: "2026-05-24 16:20:10" },
  { id: "634999292800", name: "王通",  phone: "13400134006", role: "信息专员", status: "启用", createdAt: "2026-05-25 11:05:45" },
  { id: "634999292814", name: "司徒健", phone: "13905139302", role: "财务",      status: "禁用", createdAt: "2026-05-25 11:05:45" },
]

/* ─── 子商户员工管理弹窗 ─── */
function StaffModal({ subName, onClose }: { subName: string; onClose: () => void }) {
  const [showAdd, setShowAdd] = useState(false)
  const [addTab, setAddTab] = useState<"new" | "existing">("new")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-xl w-[760px] max-h-[85vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5] shrink-0">
          <span className="text-[15px] font-bold text-[#1a1a2e]">员工管理 · {subName}</span>
          <button onClick={onClose}><X className="w-5 h-5 text-[#999]" /></button>
        </div>

        <div className="p-5 overflow-y-auto flex-1">
          {/* 搜索栏 */}
          <div className="bg-[#f5f7fa] rounded p-3 mb-4 flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#555]">员工编号：</span>
              <input className="border border-[#dde3ec] rounded px-2.5 py-1 text-[12px] w-[120px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#555]">手机号：</span>
              <input className="border border-[#dde3ec] rounded px-2.5 py-1 text-[12px] w-[120px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#555]">员工姓名：</span>
              <input className="border border-[#dde3ec] rounded px-2.5 py-1 text-[12px] w-[120px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-1 bg-[#1a5fa8] text-white text-[12px] rounded hover:bg-[#0d4a8a]">查询</button>
              <button className="px-4 py-1 border border-[#dde3ec] text-[#555] text-[12px] rounded hover:border-[#999]">清空</button>
              <button className="px-4 py-1 border border-[#dde3ec] text-[#555] text-[12px] rounded hover:border-[#999]">导出</button>
            </div>
          </div>

          <button onClick={() => setShowAdd(true)} className="mb-3 px-4 py-1.5 bg-[#1a5fa8] text-white text-[12px] rounded hover:bg-[#0d4a8a]">
            新增员工
          </button>

          {/* 表格 */}
          <table className="w-full text-[12px] border border-[#e8edf5] rounded overflow-hidden">
            <thead>
              <tr className="bg-[#f5f7fa] border-b border-[#e8edf5]">
                {["员工编号","员工姓名","手机号","所属角色","状态","创建时间","操作"].map(h => (
                  <th key={h} className="px-3 py-2 text-left font-medium text-[#555]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subStaffData.map(s => (
                <tr key={s.id} className="border-b border-[#f0f4f8] hover:bg-[#fafbfc]">
                  <td className="px-3 py-2.5 text-[#999] font-mono text-[11px]">{s.id}</td>
                  <td className="px-3 py-2.5 font-medium text-[#1a1a2e]">{s.name}</td>
                  <td className="px-3 py-2.5 text-[#555]">{s.phone}</td>
                  <td className="px-3 py-2.5 text-[#555]">{s.role}</td>
                  <td className="px-3 py-2.5">
                    <span className={`px-1.5 py-0.5 rounded text-[11px] ${s.status === "启用" ? "bg-[#e8f5e9] text-[#3a8c3f]" : "bg-[#f3f4f6] text-[#999]"}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-[#999]">{s.createdAt}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex gap-2">
                      <button className="text-[#1a5fa8] hover:underline">编辑</button>
                      <button className={s.status === "启用" ? "text-[#e04040] hover:underline" : "text-[#3a8c3f] hover:underline"}>
                        {s.status === "启用" ? "禁用" : "启用"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 分页 */}
          <div className="flex items-center justify-between mt-3 text-[12px] text-[#999]">
            <span>共 {subStaffData.length} 员，10条/页</span>
            <div className="flex items-center gap-1">
              <button className="px-2 py-0.5 border border-[#dde3ec] rounded hover:border-[#1a5fa8]">&lt;</button>
              <button className="px-2.5 py-0.5 bg-[#1a5fa8] text-white rounded">1</button>
              <button className="px-2 py-0.5 border border-[#dde3ec] rounded hover:border-[#1a5fa8]">&gt;</button>
            </div>
          </div>
        </div>
      </div>

      {/* 新增员工侧边面板 */}
      {showAdd && (
        <div className="fixed inset-0 z-[60] flex items-start justify-end bg-black/20" onClick={() => setShowAdd(false)}>
          <div className="bg-white w-[340px] min-h-full shadow-2xl border-l border-[#e8edf5]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8edf5]">
              <span className="text-[15px] font-semibold text-[#1a1a2e]">新增员工</span>
              <button onClick={() => setShowAdd(false)}><X className="w-4 h-4 text-[#999]" /></button>
            </div>
            <div className="flex border-b border-[#e8edf5]">
              {(["new", "existing"] as const).map(t => (
                <button key={t} onClick={() => setAddTab(t)}
                  className={`flex-1 py-2.5 text-[12px] transition-colors border-b-2 -mb-px ${addTab === t ? "border-[#1a5fa8] text-[#1a5fa8] font-medium" : "border-transparent text-[#666]"}`}>
                  {t === "new" ? "新建账号" : "添加企业已有员工"}
                </button>
              ))}
            </div>
            <div className="p-5 space-y-3.5">
              <div>
                <label className="block text-[12px] text-[#555] mb-1">*员工姓名</label>
                <input className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
              </div>
              <div>
                <label className="block text-[12px] text-[#555] mb-1">*手机号</label>
                <input className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
              </div>
              <div>
                <label className="block text-[12px] text-[#555] mb-1">*所属角色</label>
                <div className="flex flex-wrap gap-1.5 border border-[#dde3ec] rounded px-3 py-1.5 min-h-[34px]">
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[11px] rounded">
                    店长<X className="w-3 h-3 cursor-pointer" />
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-[12px] text-[#555] mb-1">*状态</label>
                <div className="flex gap-4">
                  {["启用", "禁用"].map(s => (
                    <label key={s} className="flex items-center gap-1.5 text-[12px] cursor-pointer">
                      <input type="radio" name="sub_staff_status" defaultChecked={s === "启用"} className="accent-[#1a5fa8]" />{s}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-5 py-4 border-t border-[#e8edf5]">
              <button onClick={() => setShowAdd(false)} className="px-5 py-1.5 border border-[#dde3ec] text-[#555] text-[12px] rounded">取消</button>
              <button className="px-6 py-1.5 bg-[#1a5fa8] text-white text-[12px] rounded hover:bg-[#0d4a8a]">确定</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── 主页面 ─── */
export default function SubMerchantPage() {
  const [staffTarget, setStaffTarget] = useState<typeof subs[0] | null>(null)
  const [showAdd, setShowAdd] = useState(false)

  const statusColor: Record<string, { text: string; bg: string }> = {
    "营业中": { text: "#3a8c3f", bg: "#e8f5e9" },
    "停业中": { text: "#999",    bg: "#f3f4f6" },
  }
  const infoColor: Record<string, { text: string; bg: string }> = {
    "未完善": { text: "#e8831a", bg: "#fff8f0" },
    "审核中": { text: "#1a5fa8", bg: "#e8f4fd" },
    "已完善": { text: "#3a8c3f", bg: "#e8f5e9" },
  }

  return (
    <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
      {/* 搜索栏 */}
      <div className="px-5 py-4 border-b border-[#e8edf5] bg-[#f8fafc]">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#555]">编号</span>
            <input className="border border-[#dde3ec] rounded px-2.5 py-1 text-[12px] w-[120px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#555]">子商户名称</span>
            <input className="border border-[#dde3ec] rounded px-2.5 py-1 text-[12px] w-[140px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#555]">商户管理员姓名</span>
            <input className="border border-[#dde3ec] rounded px-2.5 py-1 text-[12px] w-[130px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#555]">子商户状态</span>
            <select className="border border-[#dde3ec] rounded px-2.5 py-1 text-[12px] w-[130px] focus:outline-none focus:border-[#1a5fa8] text-[#999]">
              <option value="">请选择店铺状态</option>
              <option>营业中</option>
              <option>停业中</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#555]">子商户类型</span>
            <select className="border border-[#dde3ec] rounded px-2.5 py-1 text-[12px] w-[130px] focus:outline-none focus:border-[#1a5fa8] text-[#999]">
              <option value="">请选择店铺类型</option>
              <option>批发与大宗销售</option>
              <option>零售与个人销售</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#555]">申请开店时间：</span>
            <div className="flex items-center gap-1">
              <input type="date" className="border border-[#dde3ec] rounded px-2 py-1 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
              <span className="text-[#999] text-[12px]">至</span>
              <input type="date" className="border border-[#dde3ec] rounded px-2 py-1 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
              {["今日","昨日","近7天","近30天"].map(d => (
                <button key={d} className="px-2 py-0.5 border border-[#dde3ec] text-[11px] text-[#555] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8]">{d}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-5 py-1.5 bg-[#1a5fa8] text-white text-[12px] rounded hover:bg-[#0d4a8a]">查询</button>
            <button className="px-5 py-1.5 border border-[#dde3ec] text-[#555] text-[12px] rounded hover:border-[#999]">清空</button>
            <button className="px-5 py-1.5 border border-[#dde3ec] text-[#555] text-[12px] rounded hover:border-[#999]">导出</button>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        <button onClick={() => setShowAdd(true)} className="mb-4 flex items-center gap-1.5 px-4 py-1.5 bg-[#1a5fa8] text-white text-[12px] rounded hover:bg-[#0d4a8a] transition-colors">
          <Plus className="w-3.5 h-3.5" />新增子商户
        </button>

        {/* 表格 */}
        <table className="w-full text-[12px] border border-[#e8edf5] rounded overflow-hidden">
          <thead>
            <tr className="bg-[#f5f7fa] border-b border-[#e8edf5]">
              {["编号","子商户名称","子商户类型","商户管理员姓名","管理员手机号","申请开店时间","子商户状态","基本信息状态","签约信息状态","操作"].map(h => (
                <th key={h} className="px-3 py-2.5 text-left font-medium text-[#555] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subs.map(s => (
              <tr key={s.id} className="border-b border-[#f0f4f8] hover:bg-[#fafbfc]">
                <td className="px-3 py-3 text-[#999] font-mono text-[11px]">{s.id}</td>
                <td className="px-3 py-3 font-medium text-[#1a1a2e]">{s.name}</td>
                <td className="px-3 py-3 text-[#555]">{s.type}</td>
                <td className="px-3 py-3 text-[#555]">{s.manager}</td>
                <td className="px-3 py-3 text-[#555]">{s.managerPhone}</td>
                <td className="px-3 py-3 text-[#999]">{s.applyTime}</td>
                <td className="px-3 py-3">
                  <span className="px-1.5 py-0.5 rounded text-[11px]" style={{ color: statusColor[s.status]?.text, background: statusColor[s.status]?.bg }}>{s.status}</span>
                </td>
                <td className="px-3 py-3">
                  <span className="px-1.5 py-0.5 rounded text-[11px]" style={{ color: infoColor[s.infoStatus]?.text, background: infoColor[s.infoStatus]?.bg }}>{s.infoStatus}</span>
                </td>
                <td className="px-3 py-3">
                  <span className="px-1.5 py-0.5 rounded text-[11px]" style={{ color: infoColor[s.signStatus]?.text, background: infoColor[s.signStatus]?.bg }}>{s.signStatus}</span>
                </td>
                <td className="px-3 py-3">
                  <div className="flex gap-2">
                    <button className="text-[#1a5fa8] hover:underline">详情</button>
                    <button className="text-[#1a5fa8] hover:underline">编辑</button>
                    <button className="text-[#1a5fa8] hover:underline">设置</button>
                    {(s.infoStatus === "未完善" || s.infoStatus === "审核中") && (
                      <button onClick={() => setStaffTarget(s)} className="text-[#1a5fa8] hover:underline">员工管理</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 分页 */}
        <div className="flex items-center justify-between mt-4 text-[12px] text-[#999]">
          <span>共 {subs.length} 条，10条/页</span>
          <div className="flex items-center gap-1.5">
            <button className="px-2 py-1 border border-[#dde3ec] rounded hover:border-[#1a5fa8]">&lt;</button>
            <button className="px-2.5 py-1 bg-[#1a5fa8] text-white rounded">1</button>
            <button className="px-2 py-1 border border-[#dde3ec] rounded hover:border-[#1a5fa8]">&gt;</button>
          </div>
        </div>
      </div>

      {staffTarget && <StaffModal subName={staffTarget.name} onClose={() => setStaffTarget(null)} />}
    </div>
  )
}
