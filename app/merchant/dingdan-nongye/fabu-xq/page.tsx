"use client"

import { useState } from "react"
import Link from "next/link"
import { Upload, X, ChevronLeft } from "lucide-react"

export default function FabuXqPage() {
  const [publishType, setPublishType] = useState<"public" | "directed">("directed")
  const [contentType, setContentType] = useState<"desc" | "product">("desc")
  const [quoteMode, setQuoteMode] = useState<"editable" | "fixed">("editable")
  const [deliveryMethod, setDeliveryMethod] = useState<string[]>([])
  const [settlement, setSettlement] = useState<string[]>([])
  const [tradeMode, setTradeMode] = useState<string[]>([])
  const [files, setFiles] = useState<string[]>(["附件文件.pdf"])

  const toggleArr = (arr: string[], val: string, set: (v: string[]) => void) => {
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
    <div className="flex items-start gap-2 mb-4">
      <label className="text-[13px] text-[#555] w-24 shrink-0 pt-2 text-right">
        {required && <span className="text-red-500 mr-0.5">*</span>}{label}
      </label>
      <div className="flex-1">{children}</div>
    </div>
  )

  const Input = ({ placeholder, className = "" }: { placeholder?: string; className?: string }) => (
    <input placeholder={placeholder} className={`border border-[#dde3ec] rounded px-3 h-9 text-[13px] focus:outline-none focus:border-[#1a5fa8] w-full ${className}`} />
  )

  return (
    <div>
      <div className="text-[13px] text-[#999] mb-4 flex items-center gap-1">
        <Link href="/merchant/dingdan-nongye/xq-list" className="flex items-center gap-1 hover:text-[#1a5fa8]">
          <ChevronLeft className="w-3.5 h-3.5" /> 订单种植需求
        </Link>
        <span>›</span>
        <span className="text-[#1a5fa8]">发布订单种植需求</span>
      </div>

      <div className="flex gap-5">
        {/* Main form */}
        <div className="flex-1 bg-white rounded border border-[#e8edf5] p-6">
          <h2 className="text-[16px] font-semibold text-[#333] mb-6 text-center">发布订单种植需求</h2>

          {/* Section: 需求内容 */}
          <div className="mb-1 pb-1 border-b border-[#e8edf5]">
            <span className="text-[13px] font-semibold text-[#1a5fa8] border-l-2 border-[#1a5fa8] pl-2">需求内容</span>
          </div>
          <div className="mt-4">
            <Field label="需求标题" required>
              <Input placeholder="请输入" />
            </Field>
            <Field label="发布方式" required>
              <div className="flex items-center gap-6 h-9">
                {(["public", "directed"] as const).map(t => (
                  <label key={t} className="flex items-center gap-1.5 cursor-pointer text-[13px]">
                    <input type="radio" checked={publishType === t} onChange={() => setPublishType(t)}
                      className="accent-[#1a5fa8]" />
                    {t === "public" ? "公开发布" : "定向发布"}
                  </label>
                ))}
              </div>
            </Field>
            {publishType === "directed" && (
              <Field label="指定供应商" required>
                <Input placeholder="请输入" />
              </Field>
            )}

            {/* Content type toggle */}
            <div className="mb-4">
              <div className="flex gap-3 mb-3">
                {[
                  { key: "desc", label: "商品描述", sub: "直接描述需求，适合需求较灵活或尚未确定具体商品的情况" },
                  { key: "product", label: "选择商品", sub: "关联已有商品档案，适合已有明确商品规格的需求" },
                ].map(opt => (
                  <button key={opt.key} onClick={() => setContentType(opt.key as "desc" | "product")}
                    className={`flex-1 p-3 rounded border-2 text-left transition-colors ${contentType === opt.key ? "border-[#1a5fa8] bg-[#f0f7ff]" : "border-[#e8edf5] bg-white"}`}>
                    <div className={`flex items-center gap-2 mb-1`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${contentType === opt.key ? "border-[#1a5fa8]" : "border-[#bbb]"}`}>
                        {contentType === opt.key && <div className="w-2 h-2 rounded-full bg-[#1a5fa8]" />}
                      </div>
                      <span className={`text-[13px] font-semibold ${contentType === opt.key ? "text-[#1a5fa8]" : "text-[#333]"}`}>{opt.label}</span>
                    </div>
                    <p className="text-[11px] text-[#888] pl-6">{opt.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            <Field label="需求描述" required>
              <div className="border border-[#dde3ec] rounded">
                <div className="flex items-center gap-1 px-2 py-1.5 border-b border-[#e8edf5] flex-wrap">
                  {["↩", "↪", "B", "I", "U", "S", "A", "T↑", "T↓"].map(t => (
                    <button key={t} className="w-6 h-6 text-[11px] text-[#666] hover:bg-[#f0f0f0] rounded flex items-center justify-center">{t}</button>
                  ))}
                </div>
                <textarea placeholder="请详细描述您的需求，包括商品分类、规格要求、采购数量、商品详情情况、收购标准等信息..."
                  className="w-full h-32 px-3 py-2 text-[13px] text-[#333] resize-none focus:outline-none" />
                <div className="px-3 py-1 text-right text-[11px] text-[#999]">100/5000</div>
              </div>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="期望收货时间" required>
                <div className="flex items-center gap-2">
                  <input type="date" className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] flex-1 focus:outline-none focus:border-[#1a5fa8]" />
                  <span className="text-[#999] text-[13px]">至</span>
                  <input type="date" className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] flex-1 focus:outline-none focus:border-[#1a5fa8]" />
                </div>
              </Field>
              <Field label="报价截止日期" required>
                <input type="date" className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] w-full focus:outline-none focus:border-[#1a5fa8]" />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="预付款比例" required>
                <div className="flex items-center gap-2">
                  <input placeholder="请输入" className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] flex-1 focus:outline-none focus:border-[#1a5fa8]" />
                  <span className="text-[#999] text-[13px]">%</span>
                </div>
              </Field>
              <Field label="报价模式" required>
                <div className="flex items-center gap-6 h-9">
                  {[["editable", "可以修改报价"], ["fixed", "一次报价不可修改"]].map(([val, label]) => (
                    <label key={val} className="flex items-center gap-1.5 cursor-pointer text-[13px]">
                      <input type="radio" checked={quoteMode === val} onChange={() => setQuoteMode(val as "editable" | "fixed")}
                        className="accent-[#1a5fa8]" />
                      {label}
                    </label>
                  ))}
                </div>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="交易模式" required>
                <div className="flex items-center gap-4 h-9 flex-wrap">
                  {["担保交易", "非担保交易"].map(v => (
                    <label key={v} className="flex items-center gap-1.5 cursor-pointer text-[13px]">
                      <input type="checkbox" checked={tradeMode.includes(v)} onChange={() => toggleArr(tradeMode, v, setTradeMode)}
                        className="accent-[#1a5fa8]" />
                      {v}
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="配送方式" required>
                <div className="flex items-center gap-4 h-9 flex-wrap">
                  {["卖家配送", "买家自提", "无需物流"].map(v => (
                    <label key={v} className="flex items-center gap-1.5 cursor-pointer text-[13px]">
                      <input type="checkbox" checked={deliveryMethod.includes(v)} onChange={() => toggleArr(deliveryMethod, v, setDeliveryMethod)}
                        className="accent-[#1a5fa8]" />
                      {v}
                    </label>
                  ))}
                </div>
              </Field>
            </div>

            <Field label="结算渠道" required>
              <div className="flex items-center gap-4 h-9 flex-wrap">
                {["建行龙存管", "工行安心付"].map(v => (
                  <label key={v} className="flex items-center gap-1.5 cursor-pointer text-[13px]">
                    <input type="checkbox" checked={settlement.includes(v)} onChange={() => toggleArr(settlement, v, setSettlement)}
                      className="accent-[#1a5fa8]" />
                    {v}
                  </label>
                ))}
              </div>
            </Field>
          </div>

          {/* Section: 买方联系人 */}
          <div className="mb-4 pb-1 border-b border-[#e8edf5]">
            <span className="text-[13px] font-semibold text-[#1a5fa8] border-l-2 border-[#1a5fa8] pl-2">买方联系人信息</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field label="联系人姓名" required><Input placeholder="请输入" /></Field>
            <Field label="联系人电话" required><Input placeholder="输入手机号码" /></Field>
          </div>

          {/* Section: 其他信息 */}
          <div className="mb-4 pb-1 border-b border-[#e8edf5]">
            <span className="text-[13px] font-semibold text-[#1a5fa8] border-l-2 border-[#1a5fa8] pl-2">其他信息</span>
          </div>
          <div className="mt-4">
            <Field label="备注说明">
              <textarea placeholder="请输入" className="border border-[#dde3ec] rounded px-3 py-2 text-[13px] w-full h-20 resize-none focus:outline-none focus:border-[#1a5fa8]" />
              <div className="text-right text-[11px] text-[#999] mt-0.5">0 / 500</div>
            </Field>
            <Field label="附件">
              <div className="flex items-center gap-3 flex-wrap">
                <button className="flex items-center gap-1.5 px-4 h-8 border border-[#dde3ec] rounded text-[13px] text-[#666] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
                  <Upload className="w-3.5 h-3.5" /> 上传附件
                </button>
                <span className="text-[12px] text-[#999]">支持png/jpg/pdf/zip文件等，不超过100M</span>
              </div>
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between mt-2 px-3 py-2 bg-[#f5f7fa] rounded text-[13px]">
                  <div className="flex items-center gap-2 text-[#e53935]">
                    <span className="text-[16px]">📄</span>
                    <span className="text-[#333]">{f}</span>
                  </div>
                  <button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-[#999] hover:text-[#e53935]">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </Field>
          </div>

          <div className="text-center mt-6">
            <button className="px-10 h-10 bg-[#1a5fa8] text-white text-[14px] rounded hover:bg-[#0d4a8a] transition-colors">
              提交
            </button>
          </div>
        </div>

        {/* Right panel: quick nav */}
        <div className="w-52 shrink-0">
          <div className="bg-white rounded border border-[#e8edf5] p-4 sticky top-4">
            <div className="text-[13px] font-semibold text-[#1a5fa8] border-l-2 border-[#1a5fa8] pl-2 mb-3">需求内容</div>
            <div className="space-y-2 text-[12px] text-[#666]">
              {["需求标题", "发布方式", "指定供应商", "需求描述", "期望收货时间", "预付款比例", "报价模式", "交易模式", "结算渠道"].map(f => (
                <div key={f} className="flex items-center gap-1">
                  <span className="text-red-500 text-[10px]">*</span>{f}
                </div>
              ))}
            </div>
            <div className="text-[13px] font-semibold text-[#1a5fa8] border-l-2 border-[#1a5fa8] pl-2 mt-4 mb-3">买方联系人信息</div>
            <div className="text-[13px] font-semibold text-[#1a5fa8] border-l-2 border-[#1a5fa8] pl-2 mt-4 mb-3">其他信息</div>
          </div>
        </div>
      </div>
    </div>
  )
}
