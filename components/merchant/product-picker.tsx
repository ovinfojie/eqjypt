"use client"

import { useState } from "react"
import { X, Search, Package } from "lucide-react"

export interface PickedProduct {
  id: string
  name: string
  category: string
  spuMarket: string
  spuMaster: string
  tag?: string
}

const MOCK_PRODUCTS: PickedProduct[] = [
  { id: "1", name: "五常大米",          category: "粮油米面/食用油/花生油",    spuMarket: "P626342237328", spuMaster: "P123456789" },
  { id: "2", name: "丝苗米",            category: "粮油米面/谷类作物/稻谷",    spuMarket: "P484876690560", spuMaster: "P234567891", tag: "实物商品" },
  { id: "3", name: "南雄玉米油",        category: "粮油米面/食用油/花生油",    spuMarket: "P626342237328", spuMaster: "P345678912" },
  { id: "4", name: "五常大米（精品）",  category: "粮油米面/食用油/花生油",    spuMarket: "P626342237328", spuMaster: "P456789123" },
  { id: "5", name: "广东韶关仁化鸭稻丝苗米", category: "粮油米面/面食米食/丝苗米", spuMarket: "P491851883648", spuMaster: "P567891234" },
  { id: "6", name: "桂味荔枝（优等品）",category: "水果/热带水果/荔枝",       spuMarket: "P712345678901", spuMaster: "P678912345", tag: "实物商品" },
  { id: "7", name: "妃子笑荔枝",        category: "水果/热带水果/荔枝",       spuMarket: "P823456789012", spuMaster: "P789123456" },
  { id: "8", name: "丝苗米（一级）",    category: "粮油类/大米类/籼米",       spuMarket: "P626342237328", spuMaster: "P123456789", tag: "实物商品" },
  { id: "9", name: "BB肥",              category: "农资/肥料/复合肥",         spuMarket: "P934567890123", spuMaster: "P891234567" },
  { id:"10", name: "有机肥",            category: "农资/肥料/有机肥",         spuMarket: "P045678901234", spuMaster: "P912345678" },
]

const CATEGORIES = ["全部分类", "粮油米面", "水果", "蔬菜", "农资", "特色农产品"]

interface Props {
  value: PickedProduct | null
  onChange: (p: PickedProduct) => void
}

export function ProductPicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("全部分类")
  const [selected, setSelected] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const pageSize = 5

  const filtered = MOCK_PRODUCTS.filter((p) => {
    const matchCat = category === "全部分类" || p.category.startsWith(category)
    const matchKw = !search || p.name.includes(search) || p.spuMarket.includes(search)
    return matchCat && matchKw
  })
  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize)

  function handleConfirm() {
    const p = MOCK_PRODUCTS.find((x) => x.id === selected)
    if (p) { onChange(p); setOpen(false) }
  }

  function openModal() {
    setSelected(value?.id ?? null)
    setSearch("")
    setCategory("全部分类")
    setPage(1)
    setOpen(true)
  }

  return (
    <>
      {/* Trigger / selected card */}
      {!value ? (
        <button
          type="button"
          onClick={openModal}
          className="w-full border-2 border-dashed border-[#c8d6e8] rounded-lg py-8 flex flex-col items-center gap-2 text-[#6b7c93] hover:border-[#1a5fa8] hover:text-[#1a5fa8] hover:bg-[#f8fbff] transition-colors"
        >
          <Package className="w-8 h-8" />
          <span className="text-[14px]">选择商品</span>
        </button>
      ) : (
        <div className="border border-[#1a5fa8] bg-[#f0f7ff] rounded-lg p-3 flex items-center gap-3">
          <div className="w-12 h-12 bg-[#dde3ec] rounded flex items-center justify-center shrink-0 overflow-hidden">
            <Package className="w-6 h-6 text-[#6b7c93]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[14px] font-semibold text-[#1a1a2e] truncate">{value.name}</span>
              {value.tag && (
                <span className="px-1.5 py-0.5 rounded text-[11px] bg-[#e8f4fd] text-[#1a5fa8] border border-[#b8d8f0] shrink-0">
                  {value.tag}
                </span>
              )}
            </div>
            <div className="text-[12px] text-[#6b7c93]">{value.category}</div>
            <div className="flex items-center gap-4 mt-1 text-[11px] text-[#999]">
              <span>市集SPU编码{value.spuMarket}</span>
              <span>主数据SPU编码{value.spuMaster}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={openModal}
            className="text-[13px] text-[#1a5fa8] hover:underline shrink-0"
          >
            更换商品
          </button>
        </div>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-[480px] h-full bg-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8edf5]">
              <span className="text-[15px] font-semibold text-[#1a1a2e]">选择商品</span>
              <button onClick={() => setOpen(false)} className="text-[#999] hover:text-[#333]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filters */}
            <div className="px-5 py-3 border-b border-[#e8edf5] flex items-center gap-2">
              <select
                value={category}
                onChange={(e) => { setCategory(e.target.value); setPage(1) }}
                className="h-8 border border-[#dde3ec] rounded px-2 text-[13px] outline-none focus:border-[#1a5fa8] bg-white w-32"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                placeholder="请输入商品名称/平台SPU编码"
                className="flex-1 h-8 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]"
              />
              <button className="flex items-center gap-1 px-3 h-8 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]">
                <Search className="w-3.5 h-3.5" /> 搜索
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#f0f2f5]">
              {paged.map((p) => (
                <label
                  key={p.id}
                  className={`flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-colors ${
                    selected === p.id ? "bg-[#f0f7ff]" : "hover:bg-[#fafbfc]"
                  }`}
                >
                  <input
                    type="radio"
                    name="product-picker"
                    checked={selected === p.id}
                    onChange={() => setSelected(p.id)}
                    className="accent-[#1a5fa8] shrink-0"
                  />
                  <div className="w-10 h-10 bg-[#e8edf5] rounded flex items-center justify-center shrink-0">
                    <Package className="w-5 h-5 text-[#6b7c93]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-[#1a1a2e] truncate">{p.name}</div>
                    <div className="text-[12px] text-[#6b7c93] truncate">{p.category}</div>
                    <div className="text-[11px] text-[#aaa]">平台SPU编码：{p.spuMarket}</div>
                  </div>
                </label>
              ))}
              {paged.length === 0 && (
                <div className="py-12 text-center text-[13px] text-[#999]">暂无匹配商品</div>
              )}
            </div>

            {/* Pagination */}
            <div className="px-5 py-3 border-t border-[#e8edf5] flex items-center justify-between">
              <span className="text-[12px] text-[#6b7c93]">共 {total} 项数据</span>
              <div className="flex items-center gap-1">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(p => p - 1)}
                  className="w-7 h-7 rounded border border-[#dde3ec] text-[12px] disabled:opacity-40 hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
                >
                  {"<"}
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-7 h-7 rounded border text-[12px] transition-colors ${
                      page === n
                        ? "border-[#1a5fa8] bg-[#1a5fa8] text-white"
                        : "border-[#dde3ec] hover:border-[#1a5fa8] hover:text-[#1a5fa8]"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="w-7 h-7 rounded border border-[#dde3ec] text-[12px] disabled:opacity-40 hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
                >
                  {">"}
                </button>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="px-5 py-4 border-t border-[#e8edf5] flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:bg-[#f5f7fa] transition-colors"
              >
                取消
              </button>
              <button
                disabled={!selected}
                onClick={handleConfirm}
                className="px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] disabled:opacity-50 transition-colors"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
