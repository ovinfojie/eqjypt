"use client"

import { useState } from "react"
import { MerchantLayout } from "@/components/merchant/merchant-layout"
import { CheckCircle, ChevronRight, Landmark, ShieldCheck, FileText } from "lucide-react"

const PRODUCTS = [
  { id: "1", name: "供销惠农贷", bank: "广东农村信用合作联社", amount: "最高 200 万元", rate: "3.65%起/年", type: "贷款", minScore: 700 },
  { id: "2", name: "农产品仓单质押贷", bank: "广州农商银行", amount: "最高 500 万元", rate: "4.20%起/年", type: "贷款", minScore: 750 },
  { id: "3", name: "农产品价格指数险", bank: "中华联合财险", amount: "保额最高 100 万元", rate: "0.8%起/季", type: "保险", minScore: 650 },
  { id: "4", name: "农业生产综合险", bank: "中国人保财险", amount: "保额最高 50 万元", rate: "1.2%起/年", type: "保险", minScore: 600 },
  { id: "5", name: "农业经营担保", bank: "广东省农业融资担保", amount: "最高 1000 万元", rate: "0.5%起/年", type: "担保", minScore: 800 },
  { id: "6", name: "订单农业专项贷", bank: "邮储银行广东省分行", amount: "最高 300 万元", rate: "3.85%起/年", type: "贷款", minScore: 720 },
]

const MY_SCORE = 826

export default function XinyongShenqingPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [amount, setAmount] = useState("")
  const [period, setPeriod] = useState("")
  const [purpose, setPurpose] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const product = PRODUCTS.find(p => p.id === selectedProduct)

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <MerchantLayout>
        <div className="max-w-[560px] mx-auto mt-16 text-center">
          <div className="w-20 h-20 rounded-full bg-[#e8fdf0] flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-[#3a8c3f]" />
          </div>
          <h2 className="text-[22px] font-bold text-[#1a1a2e] mb-2">申请已提交</h2>
          <p className="text-[14px] text-[#666] leading-relaxed mb-6">
            您的金融产品申请已成功提交，合作金融机构将在 1-3 个工作日内与您联系，请保持手机畅通。
          </p>
          <div className="bg-[#f8fafc] rounded-xl border border-[#e8edf5] p-5 text-left mb-6">
            <div className="space-y-2.5 text-[13px]">
              <div className="flex justify-between"><span className="text-[#888]">申请产品</span><span className="font-medium text-[#1a1a2e]">{product?.name}</span></div>
              <div className="flex justify-between"><span className="text-[#888]">合作机构</span><span className="font-medium text-[#1a1a2e]">{product?.bank}</span></div>
              <div className="flex justify-between"><span className="text-[#888]">申请金额</span><span className="font-medium text-[#1a5fa8]">{amount} 万元</span></div>
              <div className="flex justify-between"><span className="text-[#888]">申请单号</span><span className="font-medium text-[#1a1a2e]">FIN-{Date.now().toString().slice(-8)}</span></div>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setSubmitted(false); setStep(1); setSelectedProduct(null) }} className="px-6 py-2.5 border border-[#dde3ec] text-[#555] rounded text-[14px] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
              继续申请
            </button>
            <button onClick={() => window.location.href = "/merchant/xinyong/dangan"} className="px-6 py-2.5 bg-[#1a5fa8] text-white rounded text-[14px] font-medium hover:bg-[#1550a0] transition-colors">
              查看信用档案
            </button>
          </div>
        </div>
      </MerchantLayout>
    )
  }

  return (
    <MerchantLayout>
      <div className="max-w-[860px] mx-auto space-y-6">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">申请金融授信</h1>
          <p className="text-[13px] text-[#888] mt-0.5">当前信用评分：<span className="font-bold text-[#1a5fa8]">{MY_SCORE} 分（AA级）</span>，可申请以下产品</p>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2">
          {[["1", "选择产品"], ["2", "填写申请"], ["3", "确认提交"]].map(([n, label], i) => (
            <div key={n} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 ${Number(n) <= step ? "text-[#1a5fa8]" : "text-[#bbb]"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold ${Number(n) < step ? "bg-[#1a5fa8] text-white" : Number(n) === step ? "bg-[#1a5fa8] text-white" : "bg-[#f0f4f8] text-[#bbb]"}`}>{Number(n) < step ? "✓" : n}</div>
                <span className="text-[13px] font-medium">{label}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-px w-16 ${Number(n) < step ? "bg-[#1a5fa8]" : "bg-[#dde3ec]"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <div className="grid grid-cols-2 gap-4">
              {PRODUCTS.map(p => {
                const eligible = MY_SCORE >= p.minScore
                const selected = selectedProduct === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => eligible && setSelectedProduct(p.id)}
                    disabled={!eligible}
                    className={`text-left p-5 rounded-xl border-2 transition-all ${
                      selected ? "border-[#1a5fa8] bg-[#e8f4fd]"
                      : eligible ? "border-[#e8edf5] bg-white hover:border-[#1a5fa8]/50"
                      : "border-[#e8edf5] bg-[#f8fafc] opacity-60 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${p.type === "贷款" ? "bg-[#e8f4fd] text-[#1a5fa8]" : p.type === "保险" ? "bg-[#e8fdf0] text-[#3a8c3f]" : "bg-[#fff3e0] text-[#e65c00]"}`}>{p.type}</span>
                      </div>
                      {selected && <CheckCircle className="w-5 h-5 text-[#1a5fa8]" />}
                      {!eligible && <span className="text-[11px] text-[#d9534f] bg-[#fde8e8] px-2 py-0.5 rounded">需{p.minScore}分</span>}
                    </div>
                    <div className="text-[15px] font-bold text-[#1a1a2e] mb-0.5">{p.name}</div>
                    <div className="text-[12px] text-[#888] mb-3 flex items-center gap-1"><Landmark className="w-3 h-3" />{p.bank}</div>
                    <div className="flex gap-4 text-[12px]">
                      <div><span className="text-[#888]">额度 </span><span className="font-semibold text-[#1a5fa8]">{p.amount.replace("最高 ", "")}</span></div>
                      <div><span className="text-[#888]">利率 </span><span className="font-semibold text-[#e65c00]">{p.rate}</span></div>
                    </div>
                  </button>
                )
              })}
            </div>
            <div className="flex justify-end mt-4">
              <button
                disabled={!selectedProduct}
                onClick={() => setStep(2)}
                className="px-8 py-2.5 bg-[#1a5fa8] text-white rounded text-[14px] font-medium hover:bg-[#1550a0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                下一步
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && product && (
          <div className="bg-white rounded-xl border border-[#e8edf5] p-6 space-y-5">
            <div className="p-4 bg-[#f8fafc] rounded-lg border border-[#e8edf5] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#e8f4fd] flex items-center justify-center shrink-0">
                <Landmark className="w-5 h-5 text-[#1a5fa8]" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-[#1a1a2e]">{product.name}</div>
                <div className="text-[12px] text-[#888]">{product.bank} · {product.amount} · {product.rate}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] font-medium text-[#555] mb-1.5">申请金额（万元）<span className="text-[#d9534f]">*</span></label>
                <input value={amount} onChange={e => setAmount(e.target.value)} type="number" placeholder="请输入申请金额" className="w-full px-3 py-2 border border-[#dde3ec] rounded text-[14px] focus:outline-none focus:border-[#1a5fa8]" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#555] mb-1.5">申请期限（月）<span className="text-[#d9534f]">*</span></label>
                <select value={period} onChange={e => setPeriod(e.target.value)} className="w-full px-3 py-2 border border-[#dde3ec] rounded text-[14px] focus:outline-none focus:border-[#1a5fa8] bg-white">
                  <option value="">请选择期限</option>
                  {[3, 6, 9, 12, 18, 24, 36].map(m => <option key={m} value={m}>{m} 个月</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#555] mb-1.5">资金用途<span className="text-[#d9534f]">*</span></label>
              <textarea value={purpose} onChange={e => setPurpose(e.target.value)} rows={3} placeholder="请描述本次申请资金的具体用途（如：采购农产品原材料、扩大种植规模等）" className="w-full px-3 py-2 border border-[#dde3ec] rounded text-[14px] focus:outline-none focus:border-[#1a5fa8] resize-none" />
            </div>
            <div className="flex justify-between pt-2">
              <button onClick={() => setStep(1)} className="px-6 py-2.5 border border-[#dde3ec] text-[#555] rounded text-[14px] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">上一步</button>
              <button disabled={!amount || !period || !purpose} onClick={() => setStep(3)} className="px-8 py-2.5 bg-[#1a5fa8] text-white rounded text-[14px] font-medium hover:bg-[#1550a0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">下一步</button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && product && (
          <div className="bg-white rounded-xl border border-[#e8edf5] p-6 space-y-5">
            <h3 className="text-[15px] font-bold text-[#1a1a2e]">确认申请信息</h3>
            <div className="space-y-3 text-[13px]">
              {[
                { label: "申请产品", value: product.name },
                { label: "合作机构", value: product.bank },
                { label: "申请金额", value: `${amount} 万元` },
                { label: "申请期限", value: `${period} 个月` },
                { label: "参考利率", value: product.rate },
                { label: "资金用途", value: purpose },
                { label: "申请人信用分", value: `${MY_SCORE} 分（AA级）` },
              ].map(item => (
                <div key={item.label} className="flex gap-4 py-2.5 border-b border-[#f0f4f8] last:border-0">
                  <span className="w-28 text-[#888] shrink-0">{item.label}</span>
                  <span className="font-medium text-[#1a1a2e]">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-[#fffbeb] border border-[#fde68a] rounded-lg text-[12px] text-[#92400e] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
              提交申请后，平台将授权金融机构查询您的信用档案，合作机构将在1-3个工作日内联系您进一步核实信息。
            </div>
            <div className="flex justify-between pt-2">
              <button onClick={() => setStep(2)} className="px-6 py-2.5 border border-[#dde3ec] text-[#555] rounded text-[14px] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">上一步</button>
              <button onClick={handleSubmit} className="px-8 py-2.5 bg-[#1a5fa8] text-white rounded text-[14px] font-medium hover:bg-[#1550a0] transition-colors">确认提交</button>
            </div>
          </div>
        )}
      </div>
    </MerchantLayout>
  )
}
