"use client"

import { useState } from "react"
import { Plus, FileText, ChevronLeft, ChevronRight } from "lucide-react"

const TEMPLATES = [
  { id: "M02601201749172660", name: "xxxx采购合同模板",    type: "采购合同", category: "粮油类", status: "启用", created: "2026-04-20 22:05:48" },
  { id: "M02601201749172661", name: "xxxxx销售合同模板",   type: "销售合同", category: "农产品类", status: "启用", created: "2026-04-10 22:05:48" },
  { id: "M02601201749172662", name: "xxxx通用合同模板",    type: "通用合同", category: "农资类",  status: "禁用", created: "2026-04-09 22:05:48" },
  { id: "M02601201749172663", name: "xxxxx合同模板",       type: "其他",     category: "服务类",  status: "禁用", created: "2026-04-06 22:05:48" },
]

const TYPE_OPTIONS  = ["采购合同", "销售合同", "通用合同", "其他"]
const CATEGORY_OPTIONS = ["粮油类", "农产品类", "农资类", "服务类"]
const STATUS_OPTIONS   = ["启用", "禁用"]

/* ──── 新增模板侧面板 ──── */
function NewTemplatePanel({ onClose }: { onClose: () => void }) {
  const [signers, setSigners] = useState([
    { id: 1, certType: "企业认证用户", name: "广东供销数字科技有限公司" },
    { id: 2, certType: "个人认证用户", name: "张悦" },
  ])

  const addSigner = () => setSigners(prev => [...prev, { id: Date.now(), certType: "企业认证用户", name: "" }])
  const removeSigner = (id: number) => setSigners(prev => prev.filter(s => s.id !== id))

  return (
    <div className="fixed inset-0 z-40 flex justify-end" onClick={onClose}>
      <div className="w-[440px] bg-white h-full shadow-2xl overflow-y-auto flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8edf5] shrink-0">
          <h3 className="text-[15px] font-bold text-[#1a1a2e]">新增合同模板</h3>
          <button onClick={onClose} className="text-[#999] hover:text-[#555] text-[20px] leading-none">&times;</button>
        </div>
        <div className="flex-1 px-5 py-4 space-y-4 overflow-y-auto">
          {/* 模板名称 */}
          <div>
            <label className="block text-[12px] text-[#555] mb-1">* 模板名称</label>
            <input className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
          </div>
          {/* 模板类型 */}
          <div>
            <label className="block text-[12px] text-[#555] mb-1">* 模板类型</label>
            <select className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] text-[#999] focus:outline-none focus:border-[#1a5fa8]">
              <option value="">请选择</option>
              {TYPE_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          {/* 上传合同模板 */}
          <div>
            <label className="block text-[12px] text-[#555] mb-1">* 上传合同模板</label>
            <div className="border-2 border-dashed border-[#dde3ec] rounded p-4 text-center cursor-pointer hover:border-[#1a5fa8] transition-colors">
              <div className="text-[13px] text-[#999]">上传附件&nbsp;&nbsp;支持png/jpg/word/excel文件，不超过100M</div>
            </div>
            {/* 已上传文件示例 */}
            <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-[#f8fafc] border border-[#e8edf5] rounded">
              <FileText className="w-4 h-4 text-[#e04040]" />
              <span className="flex-1 text-[12px] text-[#555]">2026年粮食采购年模板.doc</span>
              <button className="text-[#999] hover:text-[#e04040] text-[16px] leading-none">&times;</button>
            </div>
          </div>
          {/* 合同模板预览/编辑 */}
          <div>
            <label className="block text-[12px] text-[#555] mb-1">合同模板预览、编辑</label>
            <div className="border border-[#dde3ec] rounded h-[120px] bg-[#f8fafc] flex items-center justify-center text-[12px] text-[#bbb] cursor-pointer hover:border-[#1a5fa8] transition-colors">
              点击预览/编辑模板内容
            </div>
          </div>
          {/* 模板说明 */}
          <div>
            <label className="block text-[12px] text-[#555] mb-1">模板说明</label>
            <textarea className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] resize-none focus:outline-none focus:border-[#1a5fa8]" rows={3} placeholder="请输入" />
          </div>
          {/* 签署对象 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[12px] text-[#555] font-medium">* 签署对象</label>
              <button onClick={addSigner} className="text-[12px] text-[#1a5fa8] hover:underline">新增</button>
            </div>
            <table className="w-full text-[12px] border border-[#e8edf5] rounded overflow-hidden">
              <thead>
                <tr className="bg-[#f8fafc] text-[#6b7c93]">
                  <th className="px-3 py-2 text-left font-medium w-8">序号</th>
                  <th className="px-3 py-2 text-left font-medium">认证用户类型</th>
                  <th className="px-3 py-2 text-left font-medium">签署对象名称</th>
                  <th className="px-3 py-2 text-left font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {signers.map((s, i) => (
                  <tr key={s.id} className="border-t border-[#e8edf5]">
                    <td className="px-3 py-2">{i + 1}</td>
                    <td className="px-3 py-2">
                      <select
                        value={s.certType}
                        onChange={e => setSigners(prev => prev.map(p => p.id === s.id ? { ...p, certType: e.target.value } : p))}
                        className="w-full border border-[#dde3ec] rounded px-2 py-1 text-[12px] focus:outline-none focus:border-[#1a5fa8]">
                        <option>企业认证用户</option>
                        <option>个人认证用户</option>
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <select
                        className="w-full border border-[#dde3ec] rounded px-2 py-1 text-[12px] focus:outline-none focus:border-[#1a5fa8]">
                        <option>{s.name || "请选择"}</option>
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <button onClick={() => removeSigner(s.id)} className="text-[#e04040] hover:underline">删除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* 状态 */}
          <div>
            <label className="block text-[12px] text-[#555] mb-2">* 状态</label>
            <div className="flex gap-4">
              {["启用", "禁用"].map(s => (
                <label key={s} className="flex items-center gap-1.5 text-[13px] text-[#555] cursor-pointer">
                  <input type="radio" name="tpl_status" value={s} defaultChecked={s === "启用"} className="accent-[#1a5fa8]" />
                  {s}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-5 py-4 border-t border-[#e8edf5] shrink-0">
          <button onClick={onClose} className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">取消</button>
          <button className="px-6 py-2 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded hover:bg-[#0d4a8a]">确认</button>
        </div>
      </div>
    </div>
  )
}

export default function ContractTemplatePage() {
  const [showPanel, setShowPanel] = useState(false)

  return (
    <div className="space-y-4">
      <div className="text-[13px] text-[#6b7c93]">
        <span className="text-[#1a1a2e] font-medium">合同模板</span>
      </div>

      {/* 搜索区 */}
      <div className="bg-white rounded-xl border border-[#e8edf5] px-5 py-4">
        <div className="grid grid-cols-4 gap-3 mb-3">
          <div>
            <label className="block text-[12px] text-[#555] mb-1">合同编号</label>
            <input className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
          </div>
          <div>
            <label className="block text-[12px] text-[#555] mb-1">模板名称</label>
            <input className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
          </div>
          <div>
            <label className="block text-[12px] text-[#555] mb-1">模板类型</label>
            <select className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] text-[#999] focus:outline-none focus:border-[#1a5fa8]">
              <option value=""></option>
              {TYPE_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[12px] text-[#555] mb-1">分类</label>
            <select className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] text-[#999] focus:outline-none focus:border-[#1a5fa8]">
              <option value=""></option>
              {CATEGORY_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div>
            <label className="block text-[12px] text-[#555] mb-1">状态</label>
            <select className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] text-[#999] focus:outline-none focus:border-[#1a5fa8]">
              <option value=""></option>
              {STATUS_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-[12px] text-[#555] mb-1">创建时间</label>
            <div className="flex items-center gap-2">
              <input type="date" className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              <span className="text-[#999] text-[12px]">至</span>
              <input type="date" className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              {["今日","昨日","近7天","近30天"].map(d => (
                <button key={d} className="px-2.5 py-1.5 text-[12px] text-[#555] border border-[#dde3ec] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors whitespace-nowrap">{d}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-1.5 bg-[#1a5fa8] text-white text-[13px] font-medium rounded hover:bg-[#0d4a8a]">查询</button>
          <button className="px-5 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">清空</button>
          <button className="px-5 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">导出</button>
        </div>
      </div>

      {/* 新增按钮 */}
      <button onClick={() => setShowPanel(true)} className="flex items-center gap-1.5 px-4 py-2 bg-[#1a5fa8] text-white text-[13px] font-medium rounded hover:bg-[#0d4a8a]">
        <Plus className="w-3.5 h-3.5" />
        新增合同模板
      </button>

      {/* 列表 */}
      <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="bg-[#f8fafc] text-[#6b7c93] border-b border-[#f0f4f8]">
                {["模板编号","模板名称","模板类型","分类","状态","创建时间","操作"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TEMPLATES.map(t => (
                <tr key={t.id} className="border-b border-[#f8fafc] hover:bg-[#fafbfc]">
                  <td className="px-4 py-3 text-[#999] font-mono">{t.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#6b7c93] shrink-0" />
                      <span className="font-medium text-[#1a1a2e]">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 bg-[#f0f4f8] text-[#555] rounded">{t.type}</span></td>
                  <td className="px-4 py-3 text-[#555]">{t.category}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${t.status === "启用" ? "bg-[#e8f5e9] text-[#3a8c3f]" : "bg-[#f3f4f6] text-[#999]"}`}>{t.status}</span>
                  </td>
                  <td className="px-4 py-3 text-[#999]">{t.created}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 whitespace-nowrap">
                      <button className="text-[#1a5fa8] hover:underline">详情</button>
                      <button className="text-[#1a5fa8] hover:underline">编辑</button>
                      <button className={`hover:underline ${t.status === "启用" ? "text-[#e04040]" : "text-[#3a8c3f]"}`}>{t.status === "启用" ? "禁用" : "启用"}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#e8edf5]">
          <span className="text-[12px] text-[#999]">共 {TEMPLATES.length} 条</span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center rounded border border-[#dde3ec] hover:border-[#1a5fa8] text-[#666]"><ChevronLeft className="w-3.5 h-3.5" /></button>
            <button className="w-7 h-7 flex items-center justify-center rounded bg-[#1a5fa8] text-white text-[12px] font-semibold">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-[#dde3ec] hover:border-[#1a5fa8] text-[#666]"><ChevronRight className="w-3.5 h-3.5" /></button>
            <span className="text-[12px] text-[#999] ml-1">共 1 页</span>
          </div>
        </div>
      </div>

      {showPanel && <NewTemplatePanel onClose={() => setShowPanel(false)} />}
    </div>
  )
}
