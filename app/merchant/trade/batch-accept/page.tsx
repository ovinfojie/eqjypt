"use client"

import { useState } from "react"
import { Search, CheckCircle2, XCircle, AlertTriangle, Upload, Package } from "lucide-react"

const batches = [
  { id: "BA2026080101", orderNo: "PO2026080100123", supplier: "广东供销农产品股份有限公司", product: "台山丝苗米（精装）", spec: "25kg/袋", qty: 10, unit: "袋", arrivedAt: "2026-08-02 09:30", status: "pending" as const, driver: "张师傅", plate: "粤A12345" },
  { id: "BA2026073101", orderNo: "PO2026073100098", supplier: "茂名荔枝产地直供中心", product: "妃子笑荔枝", spec: "5kg/箱", qty: 20, unit: "箱", arrivedAt: "2026-08-01 14:00", status: "pending" as const, driver: "李师傅", plate: "粤B56789" },
  { id: "BA2026072801", orderNo: "PO2026072800076", supplier: "广东供销农产品股份有限公司", product: "江门鲜活南美白对虾", spec: "1kg/盒", qty: 50, unit: "盒", arrivedAt: "2026-07-29 08:15", status: "accepted" as const, driver: "王师傅", plate: "粤C11111" },
  { id: "BA2026072501", orderNo: "PO2026072500045", supplier: "广东供销农产品股份有限公司", product: "罗氏虾（鲜活）", spec: "2.5kg/箱", qty: 30, unit: "箱", arrivedAt: "2026-07-26 10:00", status: "rejected" as const, driver: "陈师傅", plate: "粤D22222" },
]

const STATUS_MAP = {
  pending:  { label: "待验收", color: "#e8831a", bg: "#fff8f0" },
  accepted: { label: "已验收", color: "#3a8c3f", bg: "#e8f5e9" },
  rejected: { label: "已驳回", color: "#ef4444", bg: "#fef2f2" },
}

export default function BatchAcceptPage() {
  const [keyword, setKeyword] = useState("")
  const [activeId, setActiveId] = useState<string | null>(null)
  const [acceptQty, setAcceptQty] = useState("")
  const [rejectReason, setRejectReason] = useState("")

  const activeBatch = batches.find(b => b.id === activeId)
  const filtered = batches.filter(b => !keyword || b.product.includes(keyword) || b.orderNo.includes(keyword) || b.supplier.includes(keyword))

  return (
    <div className="max-w-[1000px] space-y-5">
      <div>
        <h1 className="text-[20px] font-bold text-[#1a1a2e] mb-1">批次验收</h1>
        <p className="text-[13px] text-[#6b7c93]">对到货的采购批次进行逐一验收，确认实收数量与质量情况。</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "待验收批次", value: batches.filter(b => b.status === "pending").length, color: "#e8831a" },
          { label: "已验收批次", value: batches.filter(b => b.status === "accepted").length, color: "#3a8c3f" },
          { label: "已驳回批次", value: batches.filter(b => b.status === "rejected").length, color: "#ef4444" },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-lg border border-[#e8edf5] p-4 flex items-center gap-3">
            <div className="text-[26px] font-bold" style={{ color: c.color }}>{c.value}</div>
            <div className="text-[12px] text-[#6b7c93]">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#f0f4f8] flex items-center gap-3">
          <div className="flex items-center gap-2 border border-[#e8edf5] rounded px-3 py-1.5 w-[240px]">
            <Search className="w-3.5 h-3.5 text-[#aaa]" />
            <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="搜索商品/订单号/供应商" className="flex-1 text-[13px] outline-none placeholder:text-[#aaa]" />
          </div>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[12px] text-[#6b7c93] bg-[#f8fafc] border-b border-[#f0f4f8]">
              {["批次号","关联订单","供应商","商品/规格","应收数量","到货时间","配送司机","状态","操作"].map(h => (
                <th key={h} className="px-3 py-2.5 text-left font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => {
              const s = STATUS_MAP[b.status]
              return (
                <tr key={b.id} className="border-b border-[#f8fafc] hover:bg-[#fafbfc]">
                  <td className="px-3 py-3 text-[12px] text-[#999] font-mono">{b.id}</td>
                  <td className="px-3 py-3 text-[12px] text-[#1a5fa8] font-mono">{b.orderNo}</td>
                  <td className="px-3 py-3 text-[#555]">{b.supplier}</td>
                  <td className="px-3 py-3">
                    <div className="font-medium text-[#1a1a2e]">{b.product}</div>
                    <div className="text-[11px] text-[#999]">{b.spec}</div>
                  </td>
                  <td className="px-3 py-3 font-semibold text-[#1a1a2e]">{b.qty}{b.unit}</td>
                  <td className="px-3 py-3 text-[#999]">{b.arrivedAt}</td>
                  <td className="px-3 py-3 text-[#555]">{b.driver} · {b.plate}</td>
                  <td className="px-3 py-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium" style={{ color: s.color, background: s.bg }}>{s.label}</span>
                  </td>
                  <td className="px-3 py-3">
                    {b.status === "pending" ? (
                      <button onClick={() => setActiveId(b.id)} className="px-3 py-1 bg-[#1a5fa8] text-white text-[12px] rounded hover:bg-[#0d4a8a]">去验收</button>
                    ) : (
                      <button className="text-[12px] text-[#1a5fa8] hover:underline">查看记录</button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 验收弹窗 */}
      {activeId && activeBatch && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[540px] shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-[#f0f4f8] flex items-center justify-between">
              <span className="text-[15px] font-semibold">批次验收操作</span>
              <button onClick={() => setActiveId(null)} className="text-[#aaa] text-lg">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-[#f8fafc] rounded-lg p-4 space-y-2 text-[13px]">
                <div className="flex justify-between"><span className="text-[#999]">批次号</span><span className="font-mono">{activeBatch.id}</span></div>
                <div className="flex justify-between"><span className="text-[#999]">商品</span><span>{activeBatch.product} / {activeBatch.spec}</span></div>
                <div className="flex justify-between"><span className="text-[#999]">应收数量</span><span className="font-bold text-[#1a5fa8]">{activeBatch.qty}{activeBatch.unit}</span></div>
                <div className="flex justify-between"><span className="text-[#999]">供应商</span><span>{activeBatch.supplier}</span></div>
                <div className="flex justify-between"><span className="text-[#999]">配送司机</span><span>{activeBatch.driver} · {activeBatch.plate}</span></div>
              </div>

              <div>
                <label className="block text-[12px] text-[#6b7c93] mb-1"><span className="text-red-500">*</span>实收数量</label>
                <div className="flex items-center gap-2">
                  <input value={acceptQty} onChange={e => setAcceptQty(e.target.value)} type="number" className="flex-1 border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请填写实际验收数量" />
                  <span className="text-[13px] text-[#555]">{activeBatch.unit}</span>
                </div>
              </div>

              <div>
                <label className="block text-[12px] text-[#6b7c93] mb-2">质量检查项</label>
                <div className="space-y-2">
                  {["外包装完好无破损","商品规格符合约定","商品新鲜度符合要求","数量与送货单一致"].map(item => (
                    <label key={item} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#1a5fa8]" />
                      <span className="text-[13px] text-[#444]">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[12px] text-[#6b7c93] mb-1">验收照片（可选）</label>
                <label className="flex items-center gap-2 px-4 py-4 border-2 border-dashed border-[#dde3ec] rounded-lg cursor-pointer hover:border-[#1a5fa8] hover:bg-[#f8faff] transition-all">
                  <Upload className="w-4 h-4 text-[#aaa]" />
                  <span className="text-[12px] text-[#aaa]">上传到货照片（JPG/PNG）</span>
                  <input type="file" className="hidden" accept="image/*" multiple />
                </label>
              </div>

              <div>
                <label className="block text-[12px] text-[#6b7c93] mb-1">备注/异常说明</label>
                <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none h-16" placeholder="如有异常（短重、破损等）请详细说明" />
              </div>
            </div>
            <div className="px-6 pb-5 flex gap-3 justify-end border-t border-[#f0f4f8] pt-4">
              <button onClick={() => setActiveId(null)} className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded">取消</button>
              <button onClick={() => setActiveId(null)} className="flex items-center gap-1.5 px-5 py-2 border border-[#ef4444] text-[#ef4444] text-[13px] rounded hover:bg-[#fef2f2]">
                <XCircle className="w-3.5 h-3.5" />驳回拒收
              </button>
              <button onClick={() => setActiveId(null)} className="flex items-center gap-1.5 px-5 py-2 bg-[#3a8c3f] text-white text-[13px] rounded hover:bg-[#2d7a33]">
                <CheckCircle2 className="w-3.5 h-3.5" />确认验收
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
