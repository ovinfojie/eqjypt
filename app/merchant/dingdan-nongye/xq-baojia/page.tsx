"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Upload, X, MessageCircle } from "lucide-react"

// Mock demand detail
const demand = {
  id: "ID0001120x",
  title: "2026年广东省内计划大量采购丝苗米",
  publisher: "平远新供销天润粮油有限公司（粮油业务部）",
  product: "丝苗米",
  spec: "公斤",
  qty: "9000公斤",
  deadline: "2026-04-25",
  deliveryStart: "2026-04-23",
  deliveryEnd: "2026-04-25",
  prepay: "30%",
  tradeMode: "担保交易",
  settlement: "建行龙存管",
  delivery: "卖家配送",
  quoteMode: "可以修改报价",
  desc: "需要优质丝苗米，规格为公斤装，符合国家粮食卫生标准，具体要求详见附件。收购标准参照广东省地方标准DB44/T 2162-2019。",
  status: "正在进行",
  progress: 6630,
  total: 9000,
}


export default function XqBaojiaPage() {
  const [priceMin, setPriceMin] = useState("")
  const [priceMax, setPriceMax] = useState("")
  const [supplyQty, setSupplyQty] = useState("")
  const [qualityStd, setQualityStd] = useState("")
  const [capability, setCapability] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [remark, setRemark] = useState("")
  const [files, setFiles] = useState<string[]>(["供应资质证明.pdf"])
  const [tradeMode, setTradeMode] = useState<string[]>(["担保交易"])
  const [settlement, setSettlement] = useState<string[]>(["建行龙存管"])
  const [delivery, setDelivery] = useState<string[]>(["卖家配送"])

  const pct = Math.round(demand.progress / demand.total * 100)

  return (
    <div>
      <div className="text-[13px] text-[#999] mb-4 flex items-center gap-1">
        <Link href="/merchant/dingdan-nongye/xq-list" className="flex items-center gap-1 hover:text-[#1a5fa8]">
          <ChevronLeft className="w-3.5 h-3.5" /> 订单种植需求
        </Link>
        <span>›</span>
        <span className="text-[#1a5fa8]">供应报价</span>
      </div>

      <div className="flex gap-5">
        {/* Left: demand detail + quotes */}
        <div className="w-80 shrink-0 space-y-4">
          {/* Demand info card */}
          <div className="bg-white rounded border border-[#e8edf5] p-4">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[14px] font-semibold text-[#333] leading-snug flex-1 pr-2">{demand.title}</h3>
              <span className="px-2 py-0.5 rounded text-[11px] bg-[#e8f4fd] text-[#1a5fa8] font-medium whitespace-nowrap">{demand.status}</span>
            </div>
            <div className="text-[12px] text-[#888] mb-3">{demand.publisher}</div>

            {/* Progress */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-[12px] text-[#666] mb-1">
                <span>需求进度</span>
                <span>{demand.progress}/{demand.total}{demand.spec} ({pct}%)</span>
              </div>
              <div className="h-2 bg-[#e8edf5] rounded-full overflow-hidden">
                <div className="h-full bg-[#1a5fa8] rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </div>

            <div className="space-y-1.5 text-[12px]">
              {[
                ["商品", demand.product],
                ["需求数量", demand.qty],
                ["期望收货", `${demand.deliveryStart} 至 ${demand.deliveryEnd}`],
                ["报价截止", demand.deadline],
                ["预付款比例", demand.prepay],
                ["交易模式", demand.tradeMode],
                ["结算渠道", demand.settlement],
                ["配送方式", demand.delivery],
                ["报价模式", demand.quoteMode],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span className="text-[#999] w-20 shrink-0">{k}</span>
                  <span className="text-[#333]">{v}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-[#f0f0f0]">
              <div className="text-[12px] text-[#999] mb-1">需求描述</div>
              <div className="text-[12px] text-[#555] leading-relaxed">{demand.desc}</div>
            </div>
          </div>

        </div>

        {/* Right: quote form */}
        <div className="flex-1 bg-white rounded border border-[#e8edf5] p-6">
          <h2 className="text-[16px] font-semibold text-[#333] mb-6 text-center">提交供应报价</h2>

          <div className="max-w-[620px]">
            {/* Section: 报价内容 */}
            <div className="mb-4 pb-1 border-b border-[#e8edf5]">
              <span className="text-[13px] font-semibold text-[#1a5fa8] border-l-2 border-[#1a5fa8] pl-2">报价内容</span>
            </div>

            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right"><span className="text-red-500">*</span> 报价（含税）</label>
                <div className="flex items-center gap-2 flex-1">
                  <input value={priceMin} onChange={e => setPriceMin(e.target.value)} placeholder="最低价"
                    className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] flex-1 focus:outline-none focus:border-[#1a5fa8]" />
                  <span className="text-[#999]">~</span>
                  <input value={priceMax} onChange={e => setPriceMax(e.target.value)} placeholder="最高价"
                    className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] flex-1 focus:outline-none focus:border-[#1a5fa8]" />
                  <span className="text-[13px] text-[#666]">元/{demand.spec}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right"><span className="text-red-500">*</span> 可供应量</label>
                <div className="flex items-center gap-2 flex-1">
                  <input value={supplyQty} onChange={e => setSupplyQty(e.target.value)} placeholder="请输入"
                    className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] w-48 focus:outline-none focus:border-[#1a5fa8]" />
                  <span className="text-[13px] text-[#666]">{demand.spec}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right pt-2">质检标准</label>
                <textarea value={qualityStd} onChange={e => setQualityStd(e.target.value)} placeholder="请描述质量标准、检测要求等"
                  className="border border-[#dde3ec] rounded px-3 py-2 text-[13px] flex-1 h-16 resize-none focus:outline-none focus:border-[#1a5fa8]" />
              </div>

              <div className="flex items-start gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right pt-2">产能说明</label>
                <textarea value={capability} onChange={e => setCapability(e.target.value)} placeholder="请描述生产能力、种植基地规模等"
                  className="border border-[#dde3ec] rounded px-3 py-2 text-[13px] flex-1 h-16 resize-none focus:outline-none focus:border-[#1a5fa8]" />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right"><span className="text-red-500">*</span> 交易模式</label>
                <div className="flex items-center gap-4 flex-1">
                  {["担保交易", "非担保交易"].map(v => (
                    <label key={v} className="flex items-center gap-1.5 cursor-pointer text-[13px]">
                      <input type="checkbox" checked={tradeMode.includes(v)}
                        onChange={() => setTradeMode(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])}
                        className="accent-[#1a5fa8]" />
                      {v}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right"><span className="text-red-500">*</span> 结算渠道</label>
                <div className="flex items-center gap-4 flex-1">
                  {["建行龙存管", "工行安心付"].map(v => (
                    <label key={v} className="flex items-center gap-1.5 cursor-pointer text-[13px]">
                      <input type="checkbox" checked={settlement.includes(v)}
                        onChange={() => setSettlement(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])}
                        className="accent-[#1a5fa8]" />
                      {v}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right"><span className="text-red-500">*</span> 配送方式</label>
                <div className="flex items-center gap-4 flex-1">
                  {["卖家配送", "买家自提", "无需物流"].map(v => (
                    <label key={v} className="flex items-center gap-1.5 cursor-pointer text-[13px]">
                      <input type="checkbox" checked={delivery.includes(v)}
                        onChange={() => setDelivery(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])}
                        className="accent-[#1a5fa8]" />
                      {v}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Section: 卖方联系人 */}
            <div className="mt-6 mb-4 pb-1 border-b border-[#e8edf5]">
              <span className="text-[13px] font-semibold text-[#1a5fa8] border-l-2 border-[#1a5fa8] pl-2">卖方联系人信息</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right"><span className="text-red-500">*</span> 联系人姓名</label>
                <input value={contactName} onChange={e => setContactName(e.target.value)} placeholder="请输入"
                  className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] flex-1 focus:outline-none focus:border-[#1a5fa8]" />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right"><span className="text-red-500">*</span> 联系人电话</label>
                <input value={contactPhone} onChange={e => setContactPhone(e.target.value)} placeholder="输入手机号码"
                  className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] flex-1 focus:outline-none focus:border-[#1a5fa8]" />
              </div>
            </div>

            {/* Section: 其他信息 */}
            <div className="mt-6 mb-4 pb-1 border-b border-[#e8edf5]">
              <span className="text-[13px] font-semibold text-[#1a5fa8] border-l-2 border-[#1a5fa8] pl-2">其他信息</span>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right pt-2">备注说明</label>
                <div className="flex-1">
                  <textarea value={remark} onChange={e => setRemark(e.target.value)} placeholder="请输入"
                    className="border border-[#dde3ec] rounded px-3 py-2 text-[13px] w-full h-20 resize-none focus:outline-none focus:border-[#1a5fa8]" />
                  <div className="text-right text-[11px] text-[#999]">{remark.length} / 500</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right pt-2">附件</label>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1.5 px-4 h-8 border border-[#dde3ec] rounded text-[13px] text-[#666] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
                      <Upload className="w-3.5 h-3.5" /> 上传附件
                    </button>
                    <span className="text-[12px] text-[#999]">支持png/jpg/pdf/zip等，不超过100M</span>
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
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button className="flex items-center gap-1.5 px-6 h-10 border border-[#dde3ec] text-[#666] text-[14px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
                <MessageCircle className="w-4 h-4" /> 在线沟通
              </button>
              <button className="px-10 h-10 bg-[#1a5fa8] text-white text-[14px] rounded hover:bg-[#0d4a8a] transition-colors">
                提交报价
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
