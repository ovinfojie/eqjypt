"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, CheckCircle2, AlertCircle } from "lucide-react"

const demand = {
  id: "DD20260001",
  title: "2026年广东省内计划大量采购丝苗米",
  product: "丝苗米",
  spec: "公斤",
  qty: "9000公斤",
  priceRange: "2.70 ~ 3.20 元/公斤",
  deliveryStart: "2026-04-23",
  deliveryEnd: "2026-04-25",
  prepay: "30%",
  tradeMode: "担保交易",
  settlement: "建行龙存管",
  delivery: "卖家配送",
  quoteMode: "可以修改报价",
  publisher: "平远新供销天润粮油有限公司（粮油业务部）",
  publisherContact: "陈先生",
  publisherPhone: "135****7890",
}

const supplier = {
  company: "惠州新供销天润粮油储备有限公司",
  creditLevel: "AAA",
  contact: "张经理",
  phone: "138****8888",
  priceMin: 2.70,
  priceMax: 3.20,
  supplyQty: "9000公斤",
  quoteId: "Q001",
  deliveryTime: "2026-04-23",
  qualityStd: "GB/T 1354 大米三等及以上，水分≤14.5%，整精米率≥65%",
}

type Step = "confirm" | "sign" | "done"

export default function JieshouDingdanPage() {
  const [step, setStep] = useState<Step>("confirm")
  const [confirmQty, setConfirmQty] = useState("9000")
  const [confirmPriceMin, setConfirmPriceMin] = useState("2.70")
  const [confirmPriceMax, setConfirmPriceMax] = useState("3.20")
  const [confirmDelivery, setConfirmDelivery] = useState(demand.deliveryStart)
  const [agreedTerms, setAgreedTerms] = useState(false)

  const totalMin = (parseFloat(confirmQty) * parseFloat(confirmPriceMin)).toLocaleString()
  const totalMax = (parseFloat(confirmQty) * parseFloat(confirmPriceMax)).toLocaleString()
  const prepayMin = (parseFloat(confirmQty) * parseFloat(confirmPriceMin) * 0.3).toLocaleString()

  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-[13px] text-[#999] mb-4 flex items-center gap-1">
        <Link href="/merchant/dingdan-nongye/xq-list" className="hover:text-[#1a5fa8] flex items-center gap-1 transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" /> 订单种植需求
        </Link>
        <span className="mx-1">›</span>
        <Link href="/merchant/dingdan-nongye/xq-baojia-list" className="hover:text-[#1a5fa8] transition-colors">查看报价</Link>
        <span className="mx-1">›</span>
        <span className="text-[#333]">确认接单</span>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-0 mb-8">
        {[
          { key: "confirm", label: "核对订单信息" },
          { key: "sign", label: "签订合同" },
          { key: "done", label: "接单完成" },
        ].map((s, i) => {
          const isDone = (step === "sign" && i === 0) || (step === "done" && i <= 1)
          const isActive = s.key === step
          return (
            <div key={s.key} className="flex items-center">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold transition-colors ${
                  isDone ? "bg-[#3a8c3f] text-white"
                  : isActive ? "bg-[#1a5fa8] text-white"
                  : "bg-[#e8edf5] text-[#999]"
                }`}>
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-[13px] ${isActive ? "text-[#1a5fa8] font-semibold" : isDone ? "text-[#3a8c3f]" : "text-[#999]"}`}>
                  {s.label}
                </span>
              </div>
              {i < 2 && <div className="w-16 h-[1px] bg-[#dde3ec] mx-3" />}
            </div>
          )
        })}
      </div>

      {step === "confirm" && (
        <div className="max-w-[780px] mx-auto space-y-4">
          {/* Demand info */}
          <div className="bg-white border border-[#e8edf5] rounded-lg overflow-hidden">
            <div className="px-5 py-3 bg-[#f5f7fa] border-b border-[#e8edf5] flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#1a5fa8] rounded-full inline-block" />
              <span className="text-[13px] font-semibold text-[#333]">采购需求信息</span>
              <span className="text-[12px] text-[#999] ml-2">{demand.id}</span>
            </div>
            <div className="p-5">
              <h3 className="text-[15px] font-semibold text-[#333] mb-3">{demand.title}</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[13px]">
                {[
                  ["采购方", demand.publisher],
                  ["采购联系人", `${demand.publisherContact} ${demand.publisherPhone}`],
                  ["采购商品", `${demand.product}（${demand.spec}）`],
                  ["采购数量", demand.qty],
                  ["收货时间", `${demand.deliveryStart} 至 ${demand.deliveryEnd}`],
                  ["预付款比例", demand.prepay],
                  ["交易模式", demand.tradeMode],
                  ["结算渠道", demand.settlement],
                  ["配送方式", demand.delivery],
                  ["报价模式", demand.quoteMode],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3">
                    <span className="text-[#999] w-24 shrink-0">{k}</span>
                    <span className="text-[#555]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Supplier quote */}
          <div className="bg-white border border-[#e8edf5] rounded-lg overflow-hidden">
            <div className="px-5 py-3 bg-[#f5f7fa] border-b border-[#e8edf5] flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#e8831a] rounded-full inline-block" />
              <span className="text-[13px] font-semibold text-[#333]">供应商报价信息</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[15px] font-semibold text-[#333]">{supplier.company}</span>
                <span className="px-1.5 py-0.5 rounded text-[11px] font-semibold text-[#c8961a] bg-[#fff8e1]">{supplier.creditLevel}</span>
                <span className="text-[12px] text-[#999]">报价单号：{supplier.quoteId}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[13px]">
                {[
                  ["联系人", `${supplier.contact} ${supplier.phone}`],
                  ["供应数量", supplier.supplyQty],
                  ["报价范围", `${supplier.priceMin.toFixed(2)} ~ ${supplier.priceMax.toFixed(2)} 元/${demand.spec}`],
                  ["预计交货", supplier.deliveryTime],
                  ["质检标准", supplier.qualityStd],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3">
                    <span className="text-[#999] w-24 shrink-0">{k}</span>
                    <span className="text-[#555]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Confirm/adjust order */}
          <div className="bg-white border border-[#1a5fa8] rounded-lg overflow-hidden">
            <div className="px-5 py-3 bg-[#f0f7ff] border-b border-[#dce8f8] flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#1a5fa8] rounded-full inline-block" />
              <span className="text-[13px] font-semibold text-[#1a5fa8]">确认本次接单数量与价格</span>
              <span className="flex items-center gap-1 text-[12px] text-[#e8831a] ml-2">
                <AlertCircle className="w-3.5 h-3.5" />
                如协商有调整可在此修改
              </span>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex items-center gap-3">
                  <label className="text-[13px] text-[#555] w-24 shrink-0 text-right">
                    <span className="text-red-500">*</span> 确认数量
                  </label>
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      value={confirmQty}
                      onChange={e => setConfirmQty(e.target.value)}
                      className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] w-full focus:outline-none focus:border-[#1a5fa8]"
                    />
                    <span className="text-[13px] text-[#666] shrink-0">{demand.spec}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-[13px] text-[#555] w-24 shrink-0 text-right">
                    <span className="text-red-500">*</span> 确认交货日期
                  </label>
                  <input
                    type="date"
                    value={confirmDelivery}
                    onChange={e => setConfirmDelivery(e.target.value)}
                    className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] flex-1 focus:outline-none focus:border-[#1a5fa8]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-[13px] text-[#555] w-24 shrink-0 text-right">
                  <span className="text-red-500">*</span> 确认价格
                </label>
                <div className="flex items-center gap-2">
                  <input
                    value={confirmPriceMin}
                    onChange={e => setConfirmPriceMin(e.target.value)}
                    placeholder="最低价"
                    className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] w-28 focus:outline-none focus:border-[#1a5fa8]"
                  />
                  <span className="text-[#999]">~</span>
                  <input
                    value={confirmPriceMax}
                    onChange={e => setConfirmPriceMax(e.target.value)}
                    placeholder="最高价"
                    className="border border-[#dde3ec] rounded px-3 h-9 text-[13px] w-28 focus:outline-none focus:border-[#1a5fa8]"
                  />
                  <span className="text-[13px] text-[#666]">元/{demand.spec}</span>
                </div>
              </div>

              {/* Order summary */}
              <div className="bg-[#f5f7fa] rounded-lg p-4 grid grid-cols-3 gap-4">
                {[
                  { label: "订单总额（预计）", value: `${totalMin} ~ ${totalMax} 元`, highlight: true },
                  { label: "预付款（30%）", value: `${prepayMin} 元起`, highlight: false },
                  { label: "结算渠道", value: demand.settlement, highlight: false },
                ].map(item => (
                  <div key={item.label} className="text-center">
                    <div className="text-[12px] text-[#999] mb-1">{item.label}</div>
                    <div className={`text-[15px] font-bold ${item.highlight ? "text-[#e8831a]" : "text-[#333]"}`}>{item.value}</div>
                  </div>
                ))}
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={e => setAgreedTerms(e.target.checked)}
                  className="mt-0.5 accent-[#1a5fa8]"
                />
                <span className="text-[13px] text-[#666]">
                  我已阅读并同意
                  <span className="text-[#1a5fa8] underline cursor-pointer mx-1">《订单种植服务协议》</span>
                  和
                  <span className="text-[#1a5fa8] underline cursor-pointer mx-1">《平台交易规则》</span>
                  中的各项条款
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <Link
              href="/merchant/dingdan-nongye/xq-baojia-list"
              className="px-8 h-10 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors flex items-center"
            >
              返回修改
            </Link>
            <button
              disabled={!agreedTerms}
              onClick={() => setStep("sign")}
              className={`px-10 h-10 text-white text-[13px] rounded transition-colors ${
                agreedTerms ? "bg-[#1a5fa8] hover:bg-[#0d4a8a]" : "bg-[#aac3de] cursor-not-allowed"
              }`}
            >
              下一步：签订合同
            </button>
          </div>
        </div>
      )}

      {step === "sign" && (
        <div className="max-w-[780px] mx-auto">
          <div className="bg-white border border-[#e8edf5] rounded-lg overflow-hidden mb-4">
            <div className="px-5 py-3 bg-[#f5f7fa] border-b border-[#e8edf5] flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#1a5fa8] rounded-full inline-block" />
              <span className="text-[13px] font-semibold text-[#333]">合同预览</span>
            </div>
            <div className="p-8 text-[13px] leading-relaxed text-[#444] space-y-4">
              <h3 className="text-[16px] font-bold text-center text-[#1a3a5c]">订单种植合同</h3>
              <p className="text-center text-[#999] text-[12px]">合同编号：HT{demand.id}</p>
              <div className="grid grid-cols-2 gap-4 border border-[#e8edf5] rounded p-4 bg-[#fafcff]">
                <div><span className="text-[#999]">需求方（甲方）：</span>{demand.publisher}</div>
                <div><span className="text-[#999]">供应方（乙方）：</span>{supplier.company}</div>
              </div>
              <div className="space-y-2 border-t border-[#f0f0f0] pt-4">
                {[
                  ["第一条", "供应商品", `${demand.product}，规格：${demand.spec}`],
                  ["第二条", "合同数量", `${confirmQty} ${demand.spec}`],
                  ["第三条", "成交价格", `${confirmPriceMin} ~ ${confirmPriceMax} 元/${demand.spec}，含税`],
                  ["第四条", "交货时间", `${confirmDelivery} 前完成交货`],
                  ["第五条", "交货地点", "按采购方指定收货地址"],
                  ["第六条", "预付款", `合同金额的 ${demand.prepay}，签订后3个工作日内通过${demand.settlement}支付`],
                  ["第七条", "质量标准", supplier.qualityStd],
                  ["第八条", "交易模式", `${demand.tradeMode}，通过平台资金监管账户结算`],
                ].map(([no, title, content]) => (
                  <div key={no} className="flex gap-3">
                    <span className="text-[#1a5fa8] font-semibold shrink-0">{no}【{title}】</span>
                    <span>{content}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#f0f0f0] pt-4 text-[12px] text-[#999]">
                本合同经双方电子签署后生效，具有法律效力。合同纠纷适用中华人民共和国相关法律，争议提交平台仲裁或向合同签署地法院提起诉讼解决。
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#e8edf5] rounded-lg p-5 mb-4">
            <div className="text-[13px] font-semibold text-[#333] mb-3">电子签名</div>
            <div className="grid grid-cols-2 gap-6">
              {["甲方（采购方）签署", "乙方（供应方）签署"].map((label, i) => (
                <div key={label}>
                  <div className="text-[12px] text-[#999] mb-2">{label}</div>
                  <div className={`h-20 border-2 border-dashed rounded-lg flex items-center justify-center text-[13px] text-[#999] ${
                    i === 0 ? "border-[#1a5fa8] bg-[#f0f7ff]" : "border-[#dde3ec]"
                  }`}>
                    {i === 0 ? "✓ 已签署（当前用户）" : "等待供应方签署..."}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setStep("confirm")}
              className="px-8 h-10 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
            >
              上一步
            </button>
            <button
              onClick={() => setStep("done")}
              className="px-10 h-10 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors"
            >
              确认签署，完成接单
            </button>
          </div>
        </div>
      )}

      {step === "done" && (
        <div className="max-w-[500px] mx-auto text-center py-12">
          <div className="w-16 h-16 rounded-full bg-[#e8f7eb] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9 text-[#3a8c3f]" />
          </div>
          <h3 className="text-[20px] font-bold text-[#333] mb-2">接单成功！</h3>
          <p className="text-[14px] text-[#888] mb-2">合同已签署，订单已进入履约阶段</p>
          <p className="text-[13px] text-[#999] mb-8">请关注预付款支付通知，供应方将在收到预付款后制定种植任务</p>
          <div className="bg-[#f5f7fa] rounded-lg p-4 text-[13px] text-left space-y-2 mb-8">
            {[
              ["订单编号", `HT${demand.id}`],
              ["采购商品", demand.product],
              ["成交数量", `${confirmQty} ${demand.spec}`],
              ["成交价格", `${confirmPriceMin} ~ ${confirmPriceMax} 元/${demand.spec}`],
              ["供应商", supplier.company],
              ["预计交货", confirmDelivery],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-4">
                <span className="text-[#999] w-20 shrink-0">{k}</span>
                <span className="text-[#333] font-medium">{v}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/merchant/dingdan-nongye/xq-list"
              className="px-6 h-10 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors flex items-center"
            >
              返回需求列表
            </Link>
            <Link
              href="/merchant"
              className="px-8 h-10 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors flex items-center"
            >
              前往工作台查看订单
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
