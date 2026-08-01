"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Upload, X } from "lucide-react"

const submitted = {
  needTitle: "2026年广东省内计划大量采购丝苗米",
  needId: "ID0001120x",
  id: "BJ20260601001",
  unit: "公斤",
  priceMin: "78",
  priceMax: "88",
  supplyQty: "9000",
  qualityStd: "GB/T 1354 大米三等及以上，水分≤14.5%，整精米率≥65%。",
  capability: "年产能5万吨，拥有2000亩自有种植基地，通过GAP认证",
  tradeMode: ["担保交易"],
  settlement: ["建行龙存管"],
  delivery: ["卖家配送"],
  contactName: "张经理",
  contactPhone: "138****8888",
  remark: "可提供质检报告及产地溯源证明，支持实地考察",
  files: ["供应资质证明.pdf"],
}

function Section({ title, color = "#1a5fa8", children }: { title: string; color?: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#e8edf5]">
        <span className="w-0.5 h-4 rounded" style={{ background: color }} />
        <span className="text-[13px] font-semibold" style={{ color }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

export default function XqBaojiaEditPage() {
  const [priceMin, setPriceMin] = useState(submitted.priceMin)
  const [priceMax, setPriceMax] = useState(submitted.priceMax)
  const [supplyQty, setSupplyQty] = useState(submitted.supplyQty)
  const [qualityStd, setQualityStd] = useState(submitted.qualityStd)
  const [capability, setCapability] = useState(submitted.capability)
  const [tradeMode, setTradeMode] = useState<string[]>(submitted.tradeMode)
  const [settlement, setSettlement] = useState<string[]>(submitted.settlement)
  const [delivery, setDelivery] = useState<string[]>(submitted.delivery)
  const [contactName, setContactName] = useState(submitted.contactName)
  const [contactPhone, setContactPhone] = useState(submitted.contactPhone)
  const [remark, setRemark] = useState(submitted.remark)
  const [files, setFiles] = useState<string[]>(submitted.files)
  const [submitted2, setSubmitted2] = useState(false)

  if (submitted2) {
    return (
      <div className="max-w-[820px]">
        <div className="bg-white rounded-lg border border-[#dde3ec] p-12 text-center">
          <div className="w-14 h-14 rounded-full bg-[#e8f4fd] flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-[#1a5fa8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <div className="text-[18px] font-semibold text-[#333] mb-2">报价修改成功</div>
          <div className="text-[13px] text-[#999] mb-6">您的报价已更新，买方将看到最新报价信息</div>
          <div className="flex items-center justify-center gap-3">
            <Link href="/merchant/dingdan-nongye/xq-baojia/detail" className="px-6 h-9 border border-[#dde3ec] text-[#666] text-[13px] rounded flex items-center hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">查看详情</Link>
            <Link href="/merchant/xunbaojia/wo-faqide" className="px-6 h-9 bg-[#1a5fa8] text-white text-[13px] rounded flex items-center hover:bg-[#0d4a8a] transition-colors">返回列表</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[820px]">
      {/* Breadcrumb */}
      <div className="text-[13px] text-[#999] mb-4 flex items-center gap-1">
        <Link href="/merchant/dingdan-nongye/xq-baojia/detail" className="flex items-center gap-1 hover:text-[#1a5fa8]">
          <ChevronLeft className="w-3.5 h-3.5" /> 报价详情
        </Link>
        <span>›</span>
        <span className="text-[#333]">修改报价</span>
      </div>

      <div className="bg-white rounded-lg border border-[#dde3ec] p-6">
        {/* Title bar */}
        <div className="mb-5 pb-3 border-b border-[#e8edf5]">
          <div className="text-[15px] font-semibold text-[#1a1a2e]">{submitted.needTitle}</div>
          <div className="flex items-center gap-4 mt-1 text-[12px] text-[#999]">
            <span>报价单号：{submitted.id}</span>
            <span>关联需求：{submitted.needId}</span>
          </div>
        </div>

        <div className="max-w-[620px]">
          <Section title="报价内容">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right"><span className="text-red-500">*</span> 报价（含税）</label>
                <div className="flex items-center gap-2 flex-1">
                  <input value={priceMin} onChange={e => setPriceMin(e.target.value)}
                    className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] flex-1 focus:outline-none focus:border-[#1a5fa8]" />
                  <span className="text-[#999]">~</span>
                  <input value={priceMax} onChange={e => setPriceMax(e.target.value)}
                    className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] flex-1 focus:outline-none focus:border-[#1a5fa8]" />
                  <span className="text-[13px] text-[#666]">元/{submitted.unit}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right"><span className="text-red-500">*</span> 可供应量</label>
                <div className="flex items-center gap-2">
                  <input value={supplyQty} onChange={e => setSupplyQty(e.target.value)}
                    className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] w-40 focus:outline-none focus:border-[#1a5fa8]" />
                  <span className="text-[13px] text-[#666]">{submitted.unit}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right pt-2">质检标准</label>
                <textarea value={qualityStd} onChange={e => setQualityStd(e.target.value)} rows={2}
                  className="border border-[#dde3ec] rounded px-3 py-2 text-[13px] flex-1 resize-none focus:outline-none focus:border-[#1a5fa8]" />
              </div>

              <div className="flex items-start gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right pt-2">产能说明</label>
                <textarea value={capability} onChange={e => setCapability(e.target.value)} rows={2}
                  className="border border-[#dde3ec] rounded px-3 py-2 text-[13px] flex-1 resize-none focus:outline-none focus:border-[#1a5fa8]" />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right"><span className="text-red-500">*</span> 交易模式</label>
                <div className="flex items-center gap-4">
                  {["担保交易", "非担保交易"].map(v => (
                    <label key={v} className="flex items-center gap-1.5 cursor-pointer text-[13px]">
                      <input type="checkbox" checked={tradeMode.includes(v)}
                        onChange={() => setTradeMode(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v])}
                        className="accent-[#1a5fa8]" />
                      {v}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right"><span className="text-red-500">*</span> 结算渠道</label>
                <div className="flex items-center gap-4">
                  {["建行龙存管", "工行安心付"].map(v => (
                    <label key={v} className="flex items-center gap-1.5 cursor-pointer text-[13px]">
                      <input type="checkbox" checked={settlement.includes(v)}
                        onChange={() => setSettlement(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v])}
                        className="accent-[#1a5fa8]" />
                      {v}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right"><span className="text-red-500">*</span> 配送方式</label>
                <div className="flex items-center gap-4">
                  {["卖家配送", "买家自提", "无需物流"].map(v => (
                    <label key={v} className="flex items-center gap-1.5 cursor-pointer text-[13px]">
                      <input type="checkbox" checked={delivery.includes(v)}
                        onChange={() => setDelivery(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v])}
                        className="accent-[#1a5fa8]" />
                      {v}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section title="卖方联系人信息">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right"><span className="text-red-500">*</span> 联系人姓名</label>
                <input value={contactName} onChange={e => setContactName(e.target.value)}
                  className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] flex-1 focus:outline-none focus:border-[#1a5fa8]" />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right"><span className="text-red-500">*</span> 联系人电话</label>
                <input value={contactPhone} onChange={e => setContactPhone(e.target.value)}
                  className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] flex-1 focus:outline-none focus:border-[#1a5fa8]" />
              </div>
            </div>
          </Section>

          <Section title="其他信息">
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right pt-2">备注说明</label>
                <div className="flex-1">
                  <textarea value={remark} onChange={e => setRemark(e.target.value)} rows={3}
                    className="border border-[#dde3ec] rounded px-3 py-2 text-[13px] w-full resize-none focus:outline-none focus:border-[#1a5fa8]" />
                  <div className="text-right text-[11px] text-[#999]">{remark.length} / 500</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right pt-2">附件</label>
                <div className="flex-1">
                  <button className="flex items-center gap-1.5 px-4 h-8 border border-[#dde3ec] rounded text-[13px] text-[#666] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
                    <Upload className="w-3.5 h-3.5" /> 上传附件
                  </button>
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center justify-between mt-2 px-3 py-2 bg-[#f5f7fa] rounded text-[13px]">
                      <span className="text-[#333]">{f}</span>
                      <button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-[#999] hover:text-[#e53935]">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <div className="flex items-center justify-center gap-4 mt-6">
            <Link href="/merchant/dingdan-nongye/xq-baojia/detail"
              className="px-8 h-10 border border-[#dde3ec] text-[#666] text-[14px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors flex items-center">
              取消
            </Link>
            <button onClick={() => setSubmitted2(true)}
              className="px-10 h-10 bg-[#1a5fa8] text-white text-[14px] rounded hover:bg-[#0d4a8a] transition-colors">
              确认修改
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
