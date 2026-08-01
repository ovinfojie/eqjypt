"use client"

import { useState } from "react"
import Link from "next/link"
import { Upload, X, ChevronLeft } from "lucide-react"

export default function FabuGyPage() {
  const [publishType, setPublishType] = useState<"public" | "directed">("directed")
  const [contentType, setContentType] = useState<"desc" | "product">("desc")
  const [tradeMode, setTradeMode] = useState<string[]>([])
  const [settlement, setSettlement] = useState<string[]>([])
  const [delivery, setDelivery] = useState<string[]>([])
  const [files, setFiles] = useState<string[]>(["附件文件.pdf"])
  const [remark, setRemark] = useState("")

  const toggle = (arr: string[], val: string, set: (v: string[]) => void) => {
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  const Field = ({ label, required, children, col = false }: { label: string; required?: boolean; children: React.ReactNode; col?: boolean }) => (
    <div className={`flex ${col ? "items-start" : "items-center"} gap-2 mb-4`}>
      <label className="text-[13px] text-[#555] w-24 shrink-0 pt-2 text-right">
        {required && <span className="text-red-500 mr-0.5">*</span>}{label}
      </label>
      <div className="flex-1">{children}</div>
    </div>
  )

  return (
    <div>
      <div className="text-[13px] text-[#999] mb-4 flex items-center gap-1">
        <Link href="/merchant/dingdan-nongye/gy-list" className="flex items-center gap-1 hover:text-[#1a5fa8]">
          <ChevronLeft className="w-3.5 h-3.5" /> 订单种植供应
        </Link>
        <span>›</span>
        <span className="text-[#1a5fa8]">发布订单种植供应</span>
      </div>

      <div className="flex gap-5">
        <div className="flex-1 bg-white rounded border border-[#e8edf5] p-6">
          <h2 className="text-[16px] font-semibold text-[#333] mb-6 text-center">发布订单种植供应</h2>

          {/* Section: 供应内容 */}
          <div className="mb-4 pb-1 border-b border-[#e8edf5]">
            <span className="text-[13px] font-semibold text-[#3a8c3f] border-l-2 border-[#3a8c3f] pl-2">供应内容</span>
          </div>

          <div className="mt-4">
            <Field label="供应信息标题" required>
              <input placeholder="请输入" className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] w-full focus:outline-none focus:border-[#3a8c3f]" />
            </Field>

            <Field label="发布方式" required>
              <div className="flex items-center gap-6">
                {(["public", "directed"] as const).map(t => (
                  <label key={t} className="flex items-center gap-1.5 cursor-pointer text-[13px]">
                    <input type="radio" checked={publishType === t} onChange={() => setPublishType(t)} className="accent-[#3a8c3f]" />
                    {t === "public" ? "公开发布" : "定向发布"}
                  </label>
                ))}
              </div>
            </Field>

            {publishType === "directed" && (
              <Field label="指定采购商" required>
                <input placeholder="请输入" className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] w-full focus:outline-none focus:border-[#3a8c3f]" />
              </Field>
            )}

            {/* Content type toggle */}
            <div className="mb-4">
              <div className="flex gap-3 mb-3">
                {[
                  { key: "desc", label: "供应信息描述", sub: "直接描述供应信息，适合快速发布简要供应信息的情况" },
                  { key: "product", label: "选择商品", sub: "关联已有商品档案，适合已有明确商品规格的供应信息" },
                ].map(opt => (
                  <button key={opt.key} onClick={() => setContentType(opt.key as "desc" | "product")}
                    className={`flex-1 p-3 rounded border-2 text-left transition-colors ${contentType === opt.key ? "border-[#3a8c3f] bg-[#f0f9f0]" : "border-[#e8edf5] bg-white"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${contentType === opt.key ? "border-[#3a8c3f]" : "border-[#bbb]"}`}>
                        {contentType === opt.key && <div className="w-2 h-2 rounded-full bg-[#3a8c3f]" />}
                      </div>
                      <span className={`text-[13px] font-semibold ${contentType === opt.key ? "text-[#3a8c3f]" : "text-[#333]"}`}>{opt.label}</span>
                    </div>
                    <p className="text-[11px] text-[#888] pl-6">{opt.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            <Field label="供应信息描述" required col>
              <div className="border border-[#dde3ec] rounded">
                <div className="flex items-center gap-1 px-2 py-1.5 border-b border-[#e8edf5] flex-wrap">
                  {["↩", "↪", "B", "I", "U", "S", "A", "T↑", "T↓"].map(t => (
                    <button key={t} className="w-6 h-6 text-[11px] text-[#666] hover:bg-[#f0f0f0] rounded flex items-center justify-center">{t}</button>
                  ))}
                </div>
                <textarea placeholder="请详细描述您的供应信息，包括商品分类、规格要求、采购数量、商品详情情况、收购标准等信息...."
                  className="w-full h-32 px-3 py-2 text-[13px] text-[#333] resize-none focus:outline-none" />
                <div className="px-3 py-1 text-right text-[11px] text-[#999]">100/5000</div>
              </div>
            </Field>

            {/* Section: 商品信息 */}
            <div className="mb-4 pb-1 border-b border-[#e8edf5]">
              <span className="text-[13px] font-semibold text-[#3a8c3f] border-l-2 border-[#3a8c3f] pl-2">商品信息</span>
            </div>
            <div className="mt-4">
              <div className="border border-[#e8edf5] rounded p-4 mb-4 bg-[#fafafa]">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-[#e8edf5] rounded flex items-center justify-center text-[#ccc] shrink-0">
                    <span className="text-[30px]">🌾</span>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] text-[#555] w-16 shrink-0"><span className="text-red-500">*</span> 商品名称</span>
                      <input placeholder="请输入" className="border border-[#dde3ec] rounded px-3 h-8 text-[13px] flex-1 focus:outline-none focus:border-[#3a8c3f]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] text-[#555] w-16 shrink-0"><span className="text-red-500">*</span> 商品规格</span>
                      <input placeholder="请输入" className="border border-[#dde3ec] rounded px-3 h-8 text-[13px] flex-1 focus:outline-none focus:border-[#3a8c3f]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] text-[#555] w-16 shrink-0"><span className="text-red-500">*</span> 供应数量</span>
                      <input placeholder="请输入" className="border border-[#dde3ec] rounded px-3 h-8 text-[13px] flex-1 focus:outline-none focus:border-[#3a8c3f]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] text-[#555] w-16 shrink-0"><span className="text-red-500">*</span> 价格区间</span>
                      <div className="flex items-center gap-1 flex-1">
                        <input placeholder="最低" className="border border-[#dde3ec] rounded px-2 h-8 text-[13px] w-20 focus:outline-none focus:border-[#3a8c3f]" />
                        <span className="text-[#999]">~</span>
                        <input placeholder="最高" className="border border-[#dde3ec] rounded px-2 h-8 text-[13px] w-20 focus:outline-none focus:border-[#3a8c3f]" />
                        <span className="text-[12px] text-[#666]">元</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <span className="text-[13px] text-[#555] w-16 shrink-0 pt-1">收购质量标准</span>
                    <textarea placeholder="请输入质量标准..." className="border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] flex-1 h-12 resize-none focus:outline-none focus:border-[#3a8c3f]" />
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[13px] text-[#555] w-16 shrink-0 pt-1">产能说明</span>
                    <textarea placeholder="请输入产能..." className="border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] flex-1 h-12 resize-none focus:outline-none focus:border-[#3a8c3f]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="交付周期" required>
                <div className="flex items-center gap-2">
                  <input type="date" className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] flex-1 focus:outline-none focus:border-[#3a8c3f]" />
                  <span className="text-[#999]">至</span>
                  <input type="date" className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] flex-1 focus:outline-none focus:border-[#3a8c3f]" />
                </div>
              </Field>
              <Field label="报价截止日期" required>
                <input type="date" className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] w-full focus:outline-none focus:border-[#3a8c3f]" />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="预付款比例" required>
                <div className="flex items-center gap-2">
                  <input placeholder="请输入" className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] flex-1 focus:outline-none focus:border-[#3a8c3f]" />
                  <span className="text-[#999]">%</span>
                </div>
              </Field>
              <Field label="交易模式" required>
                <div className="flex items-center gap-4">
                  {["担保交易", "非担保交易"].map(v => (
                    <label key={v} className="flex items-center gap-1.5 cursor-pointer text-[13px]">
                      <input type="checkbox" checked={tradeMode.includes(v)} onChange={() => toggle(tradeMode, v, setTradeMode)} className="accent-[#3a8c3f]" />
                      {v}
                    </label>
                  ))}
                </div>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="结算渠道" required>
                <div className="flex items-center gap-4">
                  {["建行龙存管", "工行安心付"].map(v => (
                    <label key={v} className="flex items-center gap-1.5 cursor-pointer text-[13px]">
                      <input type="checkbox" checked={settlement.includes(v)} onChange={() => toggle(settlement, v, setSettlement)} className="accent-[#3a8c3f]" />
                      {v}
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="配送方式" required>
                <div className="flex items-center gap-3 flex-wrap">
                  {["卖家配送", "买家自提", "无需物流"].map(v => (
                    <label key={v} className="flex items-center gap-1.5 cursor-pointer text-[13px]">
                      <input type="checkbox" checked={delivery.includes(v)} onChange={() => toggle(delivery, v, setDelivery)} className="accent-[#3a8c3f]" />
                      {v}
                    </label>
                  ))}
                </div>
              </Field>
            </div>
          </div>

          {/* Section: 卖方联系人 */}
          <div className="mb-4 pb-1 border-b border-[#e8edf5]">
            <span className="text-[13px] font-semibold text-[#3a8c3f] border-l-2 border-[#3a8c3f] pl-2">卖方联系人信息</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field label="联系人姓名" required>
              <input placeholder="请输入" className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] w-full focus:outline-none focus:border-[#3a8c3f]" />
            </Field>
            <Field label="联系人电话" required>
              <input placeholder="输入手机号码" className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] w-full focus:outline-none focus:border-[#3a8c3f]" />
            </Field>
          </div>

          {/* Section: 其他信息 */}
          <div className="mb-4 pb-1 border-b border-[#e8edf5]">
            <span className="text-[13px] font-semibold text-[#3a8c3f] border-l-2 border-[#3a8c3f] pl-2">其他信息</span>
          </div>
          <div className="mt-4">
            <Field label="备注说明" col>
              <textarea value={remark} onChange={e => setRemark(e.target.value)} placeholder="请输入"
                className="border border-[#dde3ec] rounded px-3 py-2 text-[13px] w-full h-20 resize-none focus:outline-none focus:border-[#3a8c3f]" />
              <div className="text-right text-[11px] text-[#999]">{remark.length} / 500</div>
            </Field>
            <Field label="附件" col>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1.5 px-4 h-8 border border-[#dde3ec] rounded text-[13px] text-[#666] hover:border-[#3a8c3f] hover:text-[#3a8c3f] transition-colors">
                  <Upload className="w-3.5 h-3.5" /> 上传附件
                </button>
                <span className="text-[12px] text-[#999]">支持png/jpg/pdf/zip文件等，不超过100M</span>
              </div>
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between mt-2 px-3 py-2 bg-[#f5f7fa] rounded text-[13px]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#e53935] text-[15px]">📄</span>
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
            <button className="px-10 h-10 bg-[#3a8c3f] text-white text-[14px] rounded hover:bg-[#2d7032] transition-colors">
              申请发布
            </button>
          </div>
        </div>

        {/* Right nav */}
        <div className="w-52 shrink-0">
          <div className="bg-white rounded border border-[#e8edf5] p-4 sticky top-4">
            <div className="text-[13px] font-semibold text-[#3a8c3f] border-l-2 border-[#3a8c3f] pl-2 mb-3">供应内容</div>
            <div className="space-y-2 text-[12px] text-[#666]">
              {["供应信息标题", "发布方式", "指定采购商", "供应信息描述"].map(f => (
                <div key={f} className="flex items-center gap-1"><span className="text-red-500 text-[10px]">*</span>{f}</div>
              ))}
            </div>
            <div className="text-[13px] font-semibold text-[#3a8c3f] border-l-2 border-[#3a8c3f] pl-2 mt-4 mb-3">商品信息</div>
            <div className="space-y-2 text-[12px] text-[#666]">
              {["交付周期", "预付款比例", "交易模式", "结算渠道", "配送方式"].map(f => (
                <div key={f} className="flex items-center gap-1"><span className="text-red-500 text-[10px]">*</span>{f}</div>
              ))}
            </div>
            <div className="text-[13px] font-semibold text-[#3a8c3f] border-l-2 border-[#3a8c3f] pl-2 mt-4 mb-3">卖方联系人信息</div>
            <div className="text-[13px] font-semibold text-[#3a8c3f] border-l-2 border-[#3a8c3f] pl-2 mt-4 mb-3">其他信息</div>
          </div>
        </div>
      </div>
    </div>
  )
}
