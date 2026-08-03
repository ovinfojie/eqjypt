"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, X, Tag } from "lucide-react"

const INIT_TAGS = [
  { id: 1, name: "产地直供",   category: "供应商标签", color: "#1a5fa8", count: 128, sort: 1 },
  { id: 2, name: "绿色认证",   category: "供应商标签", color: "#2e7d32", count: 89,  sort: 2 },
  { id: 3, name: "有机产品",   category: "商品标签",   color: "#7b1fa2", count: 56,  sort: 1 },
  { id: 4, name: "限时特惠",   category: "商品标签",   color: "#e65100", count: 234, sort: 2 },
  { id: 5, name: "集采优选",   category: "商品标签",   color: "#c62828", count: 67,  sort: 3 },
  { id: 6, name: "冷链配送",   category: "服务标签",   color: "#0277bd", count: 145, sort: 1 },
  { id: 7, name: "当日达",     category: "服务标签",   color: "#00695c", count: 78,  sort: 2 },
  { id: 8, name: "大宗采购",   category: "采购商标签", color: "#4527a0", count: 43,  sort: 1 },
  { id: 9, name: "优质买家",   category: "采购商标签", color: "#1565c0", count: 91,  sort: 2 },
]

const CATEGORIES = ["供应商标签", "商品标签", "服务标签", "采购商标签"]
const COLORS = ["#1a5fa8", "#2e7d32", "#7b1fa2", "#e65100", "#c62828", "#0277bd", "#00695c", "#4527a0", "#1565c0", "#e8831a"]

export default function TagsPage() {
  const [tags, setTags] = useState(INIT_TAGS)
  const [catFilter, setCatFilter] = useState("")
  const [modal, setModal] = useState<null | "add" | "edit">(null)
  const [editing, setEditing] = useState<typeof INIT_TAGS[0] | null>(null)
  const [form, setForm] = useState({ name: "", category: "供应商标签", color: "#1a5fa8", sort: 1 })

  const filtered = tags.filter(t => !catFilter || t.category === catFilter)

  const openAdd = () => { setForm({ name: "", category: "供应商标签", color: "#1a5fa8", sort: 1 }); setEditing(null); setModal("add") }
  const openEdit = (t: typeof INIT_TAGS[0]) => { setEditing(t); setForm({ name: t.name, category: t.category, color: t.color, sort: t.sort }); setModal("edit") }
  const handleSubmit = () => {
    if (modal === "add") {
      setTags(prev => [...prev, { id: Date.now(), ...form, count: 0 }])
    } else if (editing) {
      setTags(prev => prev.map(t => t.id === editing.id ? { ...t, ...form } : t))
    }
    setModal(null)
  }
  const handleDelete = (id: number) => setTags(prev => prev.filter(t => t.id !== id))

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-bold text-[#1a1a2e]">店铺标签管理</h1>
          <p className="text-[13px] text-[#999] mt-0.5">管理供应商、商品、采购商等标签体系</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] text-white text-[13px] rounded-lg hover:bg-[#2d2d4e] transition-colors">
          <Plus className="w-4 h-4" />新增标签
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2">
        {["", ...CATEGORIES].map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            className={`px-4 py-2 rounded-lg text-[13px] transition-colors ${catFilter === c ? "bg-[#1a1a2e] text-white font-semibold" : "bg-white border border-[#dde3ec] text-[#555] hover:bg-[#f5f7fa]"}`}>
            {c || "全部"}
            <span className="ml-1.5 text-[11px] opacity-60">({c ? tags.filter(t=>t.category===c).length : tags.length})</span>
          </button>
        ))}
      </div>

      {/* Tag cards grouped by category */}
      {CATEGORIES.filter(c => !catFilter || c === catFilter).map(cat => {
        const catTags = filtered.filter(t => t.category === cat)
        if (!catTags.length) return null
        return (
          <div key={cat} className="bg-white rounded-xl border border-[#dde3ec] p-5">
            <h3 className="text-[14px] font-semibold text-[#333] mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#1a5fa8]" />{cat}
            </h3>
            <div className="flex flex-wrap gap-3">
              {catTags.sort((a,b)=>a.sort-b.sort).map(tag => (
                <div key={tag.id} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#dde3ec] hover:border-[#1a5fa8] group transition-colors">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: tag.color }} />
                  <span className="text-[13px] text-[#333] font-medium">{tag.name}</span>
                  <span className="text-[11px] text-[#999]">{tag.count}个</span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                    <button onClick={()=>openEdit(tag)} className="text-[#1a5fa8] hover:text-[#0d4a8a]"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={()=>handleDelete(tag.id)} className="text-[#c62828] hover:text-[#8b0000]"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
              <button onClick={openAdd} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-[#dde3ec] text-[13px] text-[#999] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
                <Plus className="w-3.5 h-3.5" />添加
              </button>
            </div>
          </div>
        )
      })}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[440px] shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#dde3ec]">
              <h2 className="text-[16px] font-bold text-[#1a1a2e]">{modal==="add"?"新增标签":"编辑标签"}</h2>
              <button onClick={()=>setModal(null)}><X className="w-5 h-5 text-[#999]" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[13px] font-medium text-[#333] block mb-1.5">标签名称 <span className="text-red-500">*</span></label>
                <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} className="w-full border border-[#dde3ec] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#1a5fa8]" placeholder="请输入标签名称" />
              </div>
              <div>
                <label className="text-[13px] font-medium text-[#333] block mb-1.5">所属分类</label>
                <select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} className="w-full border border-[#dde3ec] rounded-lg px-3 py-2 text-[13px] outline-none">
                  {CATEGORIES.map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[13px] font-medium text-[#333] block mb-2">标签颜色</label>
                <div className="flex gap-2 flex-wrap">
                  {COLORS.map(c => (
                    <button key={c} onClick={()=>setForm(f=>({...f,color:c}))}
                      className={`w-7 h-7 rounded-full transition-all ${form.color===c?"ring-2 ring-offset-2 ring-gray-400 scale-110":""}`}
                      style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full" style={{ backgroundColor: form.color }} />
                  <span className="text-[12px] text-[#666]">预览：</span>
                  <span className="px-2 py-0.5 rounded text-white text-[12px]" style={{ backgroundColor: form.color }}>{form.name || "标签名称"}</span>
                </div>
              </div>
              <div>
                <label className="text-[13px] font-medium text-[#333] block mb-1.5">排序权重</label>
                <input type="number" value={form.sort} onChange={e=>setForm(f=>({...f,sort:Number(e.target.value)}))} className="w-32 border border-[#dde3ec] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#1a5fa8]" min={1} />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#dde3ec] flex justify-end gap-3">
              <button onClick={()=>setModal(null)} className="px-4 py-2 border border-[#dde3ec] text-[13px] text-[#666] rounded-lg hover:bg-[#f5f7fa]">取消</button>
              <button onClick={handleSubmit} disabled={!form.name} className="px-4 py-2 bg-[#1a1a2e] text-white text-[13px] rounded-lg hover:bg-[#2d2d4e] disabled:opacity-50 disabled:cursor-not-allowed">确认保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
