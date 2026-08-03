"use client"

import { useState } from "react"
import { Search, AlertTriangle, Package, ArrowUpDown, History } from "lucide-react"

const stockList = [
  { id: "P001", name: "台山丝苗米（精装）",   category: "粮油/大米", unit: "袋", stock: 320, warnLine: 50,  cost: 68.00,  location: "A仓-02区", lastIn: "2026-07-28", lastOut: "2026-08-01" },
  { id: "P002", name: "江门南美白对虾（鲜活）", category: "水产/对虾", unit: "盒", stock: 38,  warnLine: 50,  cost: 62.00,  location: "冷库-01区", lastIn: "2026-07-30", lastOut: "2026-08-02" },
  { id: "P003", name: "妃子笑荔枝",           category: "水果/荔枝", unit: "箱", stock: 120, warnLine: 30,  cost: 88.00,  location: "B仓-05区", lastIn: "2026-07-25", lastOut: "2026-07-31" },
  { id: "P004", name: "梅州金柚（大果）",       category: "水果/柚子", unit: "个", stock: 8,   warnLine: 20,  cost: 38.00,  location: "B仓-06区", lastIn: "2026-07-10", lastOut: "2026-07-28" },
  { id: "P005", name: "肇庆新兴走地鸡",         category: "禽蛋/活禽", unit: "只", stock: 55,  warnLine: 20,  cost: 35.00,  location: "活禽区-01", lastIn: "2026-08-01", lastOut: "2026-08-01" },
]

type ModalType = "in" | "out" | "adjust" | null

export default function StockPage() {
  const [keyword, setKeyword] = useState("")
  const [modal, setModal] = useState<ModalType>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [historyId, setHistoryId] = useState<string | null>(null)

  const filtered = stockList.filter(s => !keyword || s.name.includes(keyword) || s.id.includes(keyword))
  const lowStock = stockList.filter(s => s.stock < s.warnLine)

  const openModal = (type: ModalType, id: string) => { setModal(type); setSelectedId(id) }

  return (
    <div className="max-w-[1000px] space-y-5">
      <div>
        <h1 className="text-[20px] font-bold text-[#1a1a2e] mb-1">库存管理</h1>
        <p className="text-[13px] text-[#6b7c93]">实时管理商品库存数量、出入库记录及预警阈值设置。</p>
      </div>

      {/* 统计 */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "在库商品种类", value: stockList.length, color: "#1a5fa8" },
          { label: "库存预警商品", value: lowStock.length,  color: "#e8831a" },
          { label: "今日入库笔数", value: 3,               color: "#3a8c3f" },
          { label: "今日出库笔数", value: 5,               color: "#6b7c93" },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-lg border border-[#e8edf5] p-4 flex items-center gap-3">
            <div className="text-[24px] font-bold" style={{ color: c.color }}>{c.value}</div>
            <div className="text-[12px] text-[#6b7c93]">{c.label}</div>
          </div>
        ))}
      </div>

      {/* 预警条 */}
      {lowStock.length > 0 && (
        <div className="flex items-center gap-3 bg-[#fff8f0] border border-[#f5d0a0] rounded-lg px-4 py-3">
          <AlertTriangle className="w-4 h-4 text-[#e8831a] shrink-0" />
          <span className="text-[13px] text-[#e8831a]">
            以下商品库存低于预警线：{lowStock.map(s => s.name).join("、")}，请及时补货。
          </span>
        </div>
      )}

      <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#f0f4f8] flex items-center gap-3">
          <div className="flex items-center gap-2 border border-[#e8edf5] rounded px-3 py-1.5 w-[220px]">
            <Search className="w-3.5 h-3.5 text-[#aaa]" />
            <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="搜索商品名称/编号" className="flex-1 text-[13px] outline-none placeholder:text-[#aaa]" />
          </div>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[12px] text-[#6b7c93] bg-[#f8fafc] border-b border-[#f0f4f8]">
              {["商品编号","商品名称","分类","当前库存","预警线","成本价","库位","最近入库","最近出库","操作"].map(h => (
                <th key={h} className="px-3 py-2.5 text-left font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => {
              const isLow = s.stock < s.warnLine
              return (
                <tr key={s.id} className={`border-b border-[#f8fafc] hover:bg-[#fafbfc] ${isLow ? "bg-[#fffcf0]" : ""}`}>
                  <td className="px-3 py-3 text-[12px] text-[#999] font-mono">{s.id}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1.5">
                      {isLow && <AlertTriangle className="w-3.5 h-3.5 text-[#e8831a] shrink-0" />}
                      <span className="font-medium text-[#1a1a2e]">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-[#6b7c93]">{s.category}</td>
                  <td className="px-3 py-3">
                    <span className={`font-bold ${isLow ? "text-[#e8831a]" : "text-[#1a1a2e]"}`}>{s.stock}</span>
                    <span className="text-[11px] text-[#999] ml-0.5">{s.unit}</span>
                  </td>
                  <td className="px-3 py-3 text-[#999]">{s.warnLine}{s.unit}</td>
                  <td className="px-3 py-3 text-[#1a5fa8] font-semibold">¥{s.cost.toFixed(2)}</td>
                  <td className="px-3 py-3 text-[#555]">{s.location}</td>
                  <td className="px-3 py-3 text-[#999]">{s.lastIn}</td>
                  <td className="px-3 py-3 text-[#999]">{s.lastOut}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-1.5 flex-wrap">
                      <button onClick={() => openModal("in", s.id)} className="px-2 py-1 text-[11px] bg-[#e8f5e9] text-[#3a8c3f] rounded hover:bg-[#d4ede8]">入库</button>
                      <button onClick={() => openModal("out", s.id)} className="px-2 py-1 text-[11px] bg-[#e8f4fd] text-[#1a5fa8] rounded hover:bg-[#d4e9f7]">出库</button>
                      <button onClick={() => openModal("adjust", s.id)} className="px-2 py-1 text-[11px] bg-[#f3f4f6] text-[#555] rounded hover:bg-[#e8edf5]">调整</button>
                      <button onClick={() => setHistoryId(historyId === s.id ? null : s.id)} className="px-2 py-1 text-[11px] bg-[#f3f4f6] text-[#6b7c93] rounded flex items-center gap-0.5 hover:bg-[#e8edf5]"><History className="w-3 h-3" />记录</button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 操作弹窗 */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[380px] shadow-xl">
            <div className="px-6 py-4 border-b border-[#f0f4f8] flex items-center justify-between">
              <span className="text-[15px] font-semibold">
                {modal === "in" ? "商品入库" : modal === "out" ? "商品出库" : "库存调整"}
              </span>
              <button onClick={() => setModal(null)} className="text-[#aaa] text-lg">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[12px] text-[#6b7c93] mb-1">商品</label>
                <div className="text-[13px] font-medium text-[#1a1a2e]">{stockList.find(s => s.id === selectedId)?.name}</div>
              </div>
              <div>
                <label className="block text-[12px] text-[#6b7c93] mb-1"><span className="text-red-500">*</span>{modal === "adjust" ? "调整后数量" : "数量"}</label>
                <div className="flex items-center gap-2">
                  <input type="number" min="1" className="flex-1 border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入数量" />
                  <span className="text-[13px] text-[#555]">{stockList.find(s => s.id === selectedId)?.unit}</span>
                </div>
              </div>
              {modal !== "adjust" && (
                <div>
                  <label className="block text-[12px] text-[#6b7c93] mb-1">单价（元）</label>
                  <input type="number" className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入单价" />
                </div>
              )}
              <div>
                <label className="block text-[12px] text-[#6b7c93] mb-1">备注</label>
                <textarea className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none h-16" placeholder="请输入操作原因或备注" />
              </div>
            </div>
            <div className="px-6 pb-5 flex gap-3 justify-end">
              <button onClick={() => setModal(null)} className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded">取消</button>
              <button onClick={() => setModal(null)} className="px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded">确认提交</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
