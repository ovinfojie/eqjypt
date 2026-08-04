"use client"

import { useState } from "react"
import { Plus, Search, Pencil, X } from "lucide-react"

/* ─── 工商信息Tab ─── */
function GongshanginfoTab() {
  const [editing, setEditing] = useState(false)

  const fields = [
    { label: "企业名称",         value: "广州供销数字科技有限公司" },
    { label: "企业类型",         value: "基础企业",              extra: true },
    { label: "登录账号",         value: "178****7980" },
    { label: "统一社会信用代码", value: "91440000692443696Y" },
    { label: "注册资本(万元)",   value: "25102.84" },
    { label: "登记机关",         value: "——" },
    { label: "成立日期",         value: "2009-08-04" },
    { label: "营业执照所在地",   value: "——" },
    { label: "经营范围",         value: "收购、加工、连锁经营批发、零售及网上销售：农产品、农副产品、粮油、水产、三鸟禽兽、干鲜果品、蔬菜、干茶；连锁、批发和零售：日用百货、饲料、包装材料、酒；仓储、物业管理、出租；设计、制作、代理、发布国内外各类广告；商贸信息咨询服务；货物进出口、技术进出口（法律、行政法规禁止的项目除外；法律、行政法规限制的项目须取得许可后方可经营）；批发兼零售预包装食品（含酒精饮料、乳制品）、茶叶作物及饮料作物批发及零售；非酒精饮料及茶叶批发零售；散装食品（不含现场制售）。普通货运（以上各项凭本公司有效许可证经营）；物流代理服务；仓储代理服务；为船舶提供码头、过驳锚地服务；为委托人提供货物装卸服务。", wide: true },
    { label: "法人姓名",         value: "张悦" },
    { label: "法人电话",         value: "15527522832" },
    { label: "法人身份证号",     value: "440***************" },
    { label: "身份证有效日期",   value: "——" },
  ]

  return (
    <div className="px-6 py-5">
      {/* 平台审核状态 */}
      <div className="mb-5 flex items-center gap-3 text-[14px] text-[#333]">
        <span>平台审核状态：</span>
        <span className="text-[#3a8c3f] font-semibold">审核通过</span>
      </div>

      {/* 编辑按钮 */}
      {!editing && (
        <button
          onClick={() => setEditing(true)}
          className="mb-5 px-5 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors"
        >
          编辑
        </button>
      )}

      <div className="space-y-3.5">
        {fields.map(f => (
          <div key={f.label} className={`flex gap-4 ${f.wide ? "items-start" : "items-center"}`}>
            <span className="text-[13px] text-[#999] w-[130px] shrink-0 text-right">{f.label}：</span>
            {editing ? (
              f.wide
                ? <textarea defaultValue={f.value} className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none" rows={5} />
                : <input defaultValue={f.value} className="w-[260px] border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#333]">{f.value}</span>
                {f.extra && (
                  <span className="px-2 py-0.5 bg-[#fff8e6] border border-[#f5d78e] text-[#e8831a] text-[11px] rounded cursor-pointer hover:bg-[#fff0cc]">
                    升级 &gt;&gt;
                  </span>
                )}
              </div>
            )}
          </div>
        ))}

        {/* 营业执照电子版图片 */}
        <div className="flex gap-4 items-start">
          <span className="text-[13px] text-[#999] w-[130px] shrink-0 text-right">营业执照电子版：</span>
          <div className="w-[160px] h-[120px] border-2 border-dashed border-[#c8d6e5] rounded flex flex-col items-center justify-center bg-[#dbeeff] text-[#7aafd4]">
            <div className="text-[24px]">⛰</div>
            <div className="text-[11px] mt-1 text-[#aac4d8]">图片</div>
          </div>
        </div>

        {/* 法人身份证 */}
        <div className="flex gap-4 items-start">
          <span className="text-[13px] text-[#999] w-[130px] shrink-0 text-right">法人身份证：</span>
          <div className="flex gap-3">
            <div className="flex flex-col items-center gap-1">
              <div className="w-[140px] h-[100px] border-2 border-dashed border-[#c8d6e5] rounded flex flex-col items-center justify-center bg-[#dbeeff] text-[#7aafd4]">
                <div className="text-[22px]">⛰</div>
              </div>
              <span className="text-[11px] text-[#999]">人像面</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-[140px] h-[100px] border-2 border-dashed border-[#c8d6e5] rounded flex flex-col items-center justify-center bg-[#dbeeff] text-[#7aafd4]">
                <div className="text-[22px]">⛰</div>
              </div>
              <span className="text-[11px] text-[#999]">国徽面</span>
            </div>
          </div>
        </div>
      </div>

      {editing && (
        <div className="mt-6 flex gap-3">
          <button onClick={() => setEditing(false)} className="px-6 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]">保存</button>
          <button onClick={() => setEditing(false)} className="px-6 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:bg-[#f5f7fa]">取消</button>
        </div>
      )}
    </div>
  )
}

/* ─── 新增员工弹窗 ─── */
function AddStaffModal({ onClose }: { onClose: () => void }) {
  const [subTab, setSubTab] = useState<"new" | "existing">("new")
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/20" onClick={onClose}>
      <div className="bg-white w-[360px] min-h-full shadow-2xl border-l border-[#e8edf5]" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8edf5]">
          <span className="text-[15px] font-semibold text-[#1a1a2e]">新增员工</span>
          <button onClick={onClose}><X className="w-4.5 h-4.5 text-[#999]" /></button>
        </div>
        {/* 两个子Tab */}
        <div className="flex border-b border-[#e8edf5]">
          {(["new", "existing"] as const).map(t => (
            <button key={t} onClick={() => setSubTab(t)}
              className={`flex-1 py-2.5 text-[13px] transition-colors border-b-2 -mb-px ${subTab === t ? "border-[#1a5fa8] text-[#1a5fa8] font-medium" : "border-transparent text-[#666] hover:text-[#333]"}`}>
              {t === "new" ? "新建账号" : "添加企业已有员工"}
            </button>
          ))}
        </div>
        <div className="p-5 space-y-4">
          {subTab === "new" ? (
            <>
              <div>
                <label className="block text-[12px] text-[#555] mb-1">*员工姓名</label>
                <input className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] text-[#555] mb-1">*手机号</label>
                  <input className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
                </div>
                <div>
                  <label className="block text-[12px] text-[#555] mb-1">*验证码</label>
                  <div className="flex gap-1">
                    <input className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
                    <button className="px-2 py-1.5 border border-[#1a5fa8] text-[#1a5fa8] text-[11px] rounded whitespace-nowrap hover:bg-[#e8f4fd]">获取验证码</button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[12px] text-[#555] mb-1">*所属角色</label>
                <div className="flex flex-wrap gap-1.5 border border-[#dde3ec] rounded px-3 py-2 min-h-[36px]">
                  {["订单员", "财务"].map(r => (
                    <span key={r} className="flex items-center gap-1 px-2 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[12px] rounded">
                      {r}<X className="w-3 h-3 cursor-pointer" />
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[12px] text-[#555] mb-1">帮号备注</label>
                <textarea rows={4} className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] resize-none focus:outline-none focus:border-[#1a5fa8]" placeholder="这是一段很长的内容详述描述..." />
              </div>
              <div>
                <label className="block text-[12px] text-[#555] mb-1">*状态</label>
                <div className="flex gap-4">
                  {["启用", "禁用"].map(s => (
                    <label key={s} className="flex items-center gap-1.5 text-[13px] cursor-pointer">
                      <input type="radio" name="status_new" defaultChecked={s === "启用"} className="accent-[#1a5fa8]" />{s}
                    </label>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-[12px] text-[#555] mb-1">员工姓名</label>
                <select className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] text-[#999]">
                  <option value="">请选择</option>
                  <option>吴玲</option>
                  <option>张悦</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] text-[#555] mb-1">*手机号</label>
                <input className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] bg-[#f5f7fa] text-[#999]" placeholder="自动填入" readOnly />
              </div>
              <div>
                <label className="block text-[12px] text-[#555] mb-1">*所属角色</label>
                <div className="flex flex-wrap gap-1.5 border border-[#dde3ec] rounded px-3 py-2 min-h-[36px]">
                  {["店长"].map(r => (
                    <span key={r} className="flex items-center gap-1 px-2 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[12px] rounded">
                      {r}<X className="w-3 h-3 cursor-pointer" />
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[12px] text-[#555] mb-1">帮号备注</label>
                <textarea rows={4} className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] resize-none focus:outline-none focus:border-[#1a5fa8]" placeholder="这是一段很长的内容详述描述..." />
              </div>
              <div>
                <label className="block text-[12px] text-[#555] mb-1">*状态</label>
                <div className="flex gap-4">
                  {["启用", "禁用"].map(s => (
                    <label key={s} className="flex items-center gap-1.5 text-[13px] cursor-pointer">
                      <input type="radio" name="status_existing" defaultChecked={s === "启用"} className="accent-[#1a5fa8]" />{s}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex justify-end gap-3 px-5 py-4 border-t border-[#e8edf5]">
          <button onClick={onClose} className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">取消</button>
          <button className="px-6 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]">确定</button>
        </div>
      </div>
    </div>
  )
}

/* ─── 企业员工管理Tab ─── */
const staffData = [
  { id: "634999292804", name: "吴玲",  phone: "13900139002", role: "客户管理员", status: "启用", createdAt: "2026-05-22 14:15:30" },
  { id: "634999292802", name: "张悦",  phone: "13700137003", role: "订单员",   status: "启用", createdAt: "2026-05-23 10:45:22" },
  { id: "634999292801", name: "林伟峰", phone: "13000135005", role: "产品经理", status: "禁用", createdAt: "2026-05-24 16:20:10" },
  { id: "634999292800", name: "王通",  phone: "13400134006", role: "信息专员", status: "启用", createdAt: "2026-05-25 11:05:45" },
  { id: "634999292814", name: "司徒健", phone: "13905139302", role: "财务",    status: "禁用", createdAt: "2026-05-25 11:05:45" },
]

function QiyeStaffTab() {
  const [keyword, setKeyword] = useState("")
  const [showAdd, setShowAdd] = useState(false)
  const filtered = staffData.filter(s => !keyword || s.name.includes(keyword) || s.id.includes(keyword))

  return (
    <div className="px-6 py-5">
      {/* 搜索栏 */}
      <div className="bg-[#f5f7fa] rounded p-4 mb-4 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[#555]">员工编号：</span>
          <input className="border border-[#dde3ec] rounded px-2.5 py-1 text-[12px] w-[140px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[#555]">手机号：</span>
          <input className="border border-[#dde3ec] rounded px-2.5 py-1 text-[12px] w-[140px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[#555]">员工姓名：</span>
          <input value={keyword} onChange={e => setKeyword(e.target.value)} className="border border-[#dde3ec] rounded px-2.5 py-1 text-[12px] w-[140px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[#555]">所属角色：</span>
          <select className="border border-[#dde3ec] rounded px-2.5 py-1 text-[12px] w-[140px] focus:outline-none focus:border-[#1a5fa8] text-[#999]">
            <option value=""></option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[#555]">状态：</span>
          <select className="border border-[#dde3ec] rounded px-2.5 py-1 text-[12px] w-[120px] focus:outline-none focus:border-[#1a5fa8] text-[#999]">
            <option value=""></option>
          </select>
        </div>
        <div className="flex items-center gap-2 col-span-full">
          <span className="text-[12px] text-[#555]">创建时间：</span>
          <div className="flex items-center gap-1">
            <input type="date" className="border border-[#dde3ec] rounded px-2.5 py-1 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
            <span className="text-[#999]">至</span>
            <input type="date" className="border border-[#dde3ec] rounded px-2.5 py-1 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
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

      <button onClick={() => setShowAdd(true)} className="mb-4 px-4 py-1.5 bg-[#1a5fa8] text-white text-[12px] rounded hover:bg-[#0d4a8a] transition-colors">
        新增员工
      </button>

      {/* 表格 */}
      <table className="w-full text-[12px] border border-[#e8edf5] rounded overflow-hidden">
        <thead>
          <tr className="bg-[#f5f7fa] border-b border-[#e8edf5]">
            {["员工编号","员工姓名","手机号","所属角色","状态","创建时间","操作"].map(h => (
              <th key={h} className="px-3 py-2.5 text-left font-medium text-[#555]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map(s => (
            <tr key={s.id} className="border-b border-[#f0f4f8] hover:bg-[#fafbfc]">
              <td className="px-3 py-3 text-[#999] font-mono">{s.id}</td>
              <td className="px-3 py-3 text-[#1a1a2e] font-medium">{s.name}</td>
              <td className="px-3 py-3 text-[#555]">{s.phone}</td>
              <td className="px-3 py-3 text-[#555]">{s.role}</td>
              <td className="px-3 py-3">
                <span className={`px-1.5 py-0.5 rounded text-[11px] ${s.status === "启用" ? "bg-[#e8f5e9] text-[#3a8c3f]" : "bg-[#f3f4f6] text-[#999]"}`}>
                  {s.status}
                </span>
              </td>
              <td className="px-3 py-3 text-[#999]">{s.createdAt}</td>
              <td className="px-3 py-3">
                <div className="flex gap-3">
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
      <div className="flex items-center justify-between mt-4 text-[12px] text-[#999]">
        <span>共 {filtered.length} 员，10条/页</span>
        <div className="flex items-center gap-1.5">
          <button className="px-2 py-1 border border-[#dde3ec] rounded hover:border-[#1a5fa8]">&lt;</button>
          <button className="px-2.5 py-1 bg-[#1a5fa8] text-white rounded">1</button>
          <button className="px-2 py-1 border border-[#dde3ec] rounded hover:border-[#1a5fa8]">&gt;</button>
          <span className="ml-2">前往 <input className="w-10 border border-[#dde3ec] rounded px-1.5 py-0.5 text-center text-[#333] focus:outline-none" defaultValue="1" /> 页</span>
        </div>
      </div>

      {showAdd && <AddStaffModal onClose={() => setShowAdd(false)} />}
    </div>
  )
}

/* ─── 主页面 ─── */
export default function EnterpriseInfoPage() {
  const [tab, setTab] = useState<"gongshang" | "staff">("gongshang")

  return (
    <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
      {/* Tab 导航 */}
      <div className="flex border-b border-[#e8edf5]">
        {([
          { key: "gongshang", label: "工商信息" },
          { key: "staff",     label: "企业员工管理" },
        ] as const).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-8 py-3.5 text-[14px] font-medium transition-colors border-b-2 -mb-px ${
              tab === t.key
                ? "border-[#1a5fa8] text-[#1a5fa8]"
                : "border-transparent text-[#666] hover:text-[#333]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "gongshang" ? <GongshanginfoTab /> : <QiyeStaffTab />}
    </div>
  )
}
