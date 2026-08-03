"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, CheckCircle2 } from "lucide-react"

const headers = [
  { id: "h1", type: "company", name: "盒马超市采购部", taxNo: "91440100MA5DXXXX12", bank: "中国工商银行广州天河支行", bankNo: "6222021234567890", addr: "广州市天河区天河路123号", phone: "020-88886666", isDefault: true },
  { id: "h2", type: "company", name: "盒马超市（个体）", taxNo: "91440100MA5DXXXX99", bank: "招商银行广州分行", bankNo: "6225882200000001", addr: "广州市天河区体育西路", phone: "020-77775555", isDefault: false },
]

export default function InvoiceHeaderPage() {
  const [showForm, setShowForm] = useState(false)
  const [items, setItems] = useState(headers)

  return (
    <div className="max-w-[800px] mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-bold text-[#1a1a2e]">发票抬头管理</h1>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-1.5 px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
          <Plus className="w-4 h-4" /> 新增抬头
        </button>
      </div>

      <div className="space-y-3">
        {items.map(h => (
          <div key={h.id} className={`bg-white rounded-lg border p-5 ${h.isDefault ? "border-[#1a5fa8]" : "border-[#e8edf5]"}`}>
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  {h.isDefault && <span className="px-2 py-0.5 bg-[#1a5fa8] text-white text-[11px] rounded">默认</span>}
                  <span className="text-[15px] font-semibold text-[#1a1a2e]">{h.name}</span>
                  <span className="px-2 py-0.5 bg-[#f0f4f8] text-[#6b7c93] text-[11px] rounded">增值税专用发票</span>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-[13px] text-[#555]">
                  <div><span className="text-[#6b7c93]">税号：</span>{h.taxNo}</div>
                  <div><span className="text-[#6b7c93]">银行：</span>{h.bank}</div>
                  <div><span className="text-[#6b7c93]">账号：</span>{h.bankNo}</div>
                  <div><span className="text-[#6b7c93]">电话：</span>{h.phone}</div>
                  <div className="col-span-2"><span className="text-[#6b7c93]">地址：</span>{h.addr}</div>
                </div>
              </div>
              <div className="flex flex-col gap-2 ml-4 shrink-0">
                <button className="flex items-center gap-1 text-[12px] text-[#1a5fa8] hover:underline">
                  <Pencil className="w-3.5 h-3.5" /> 编辑
                </button>
                {!h.isDefault && (
                  <>
                    <button onClick={() => setItems(items.map(x => ({ ...x, isDefault: x.id === h.id })))}
                      className="flex items-center gap-1 text-[12px] text-[#3a8c3f] hover:underline">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 设为默认
                    </button>
                    <button onClick={() => setItems(items.filter(x => x.id !== h.id))}
                      className="flex items-center gap-1 text-[12px] text-red-500 hover:underline">
                      <Trash2 className="w-3.5 h-3.5" /> 删除
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 新增弹窗 */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[560px] p-6">
            <h2 className="text-[16px] font-bold text-[#1a1a2e] mb-4">新增发票抬头</h2>
            <div className="space-y-3">
              {[
                { label: "抬头名称", placeholder: "请输入企业名称" },
                { label: "统一社会信用代码", placeholder: "请输入税号" },
                { label: "开户银行", placeholder: "请输入开户银行名称" },
                { label: "银行账号", placeholder: "请输入银行账号" },
                { label: "注册地址", placeholder: "请输入企业注册地址" },
                { label: "注册电话", placeholder: "请输入注册电话" },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-3">
                  <label className="text-[13px] text-[#6b7c93] w-24 text-right shrink-0">{f.label}</label>
                  <input type="text" placeholder={f.placeholder} className="flex-1 border border-[#e8edf5] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setShowForm(false)} className="px-5 py-2 border border-[#e8edf5] text-[13px] rounded hover:bg-[#f5f7fa]">取消</button>
              <button onClick={() => setShowForm(false)} className="px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]">保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
