"use client"

import { useState } from "react"
import Link from "next/link"
import { MerchantLayout } from "@/components/merchant/merchant-layout"
import { ChevronLeft, CheckCircle } from "lucide-react"

const categories = ["粮油", "蔬菜", "水果", "畜禽", "水产", "其他"]
const tradeModes = ["担保交易", "直接交易"]
const deliveryMethods = ["卖家配送", "买家自提", "均可"]
const settlements = ["建行龙存管", "农行存管", "线下结算"]

export default function FabuXiaoshouPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    title: "", category: "", productName: "", spec: "",
    qty: "", unit: "吨", minOrder: "",
    priceMin: "", priceMax: "", priceUnit: "元/斤",
    validUntil: "", deliveryCycle: "",
    depositRatio: "", tradeMode: tradeModes[0],
    deliveryMethod: deliveryMethods[0], settlement: settlements[0],
    qualityStd: "", capacity: "", cert: "", desc: "", remark: "",
    contact: "", phone: "", dept: "",
  })

  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }))

  if (submitted) {
    return (
      <MerchantLayout>
        <div className="max-w-[560px] mx-auto mt-16 bg-white rounded-xl border border-[#e8edf5] p-10 text-center">
          <CheckCircle className="w-14 h-14 text-[#3a8c3f] mx-auto mb-4" />
          <div className="text-[20px] font-bold text-[#333] mb-2">销售信息发布成功</div>
          <div className="text-[14px] text-[#888] mb-8">您的销售信息已提交，买方可在产销对接大厅查看并询价。</div>
          <div className="flex gap-3 justify-center">
            <Link href="/merchant/chanxiao/xiaoshou-list" className="px-6 py-2.5 bg-[#3a8c3f] text-white text-[13px] rounded-lg hover:bg-[#2d6e32] transition-colors">
              查看我的销售
            </Link>
            <Link href="/portal/chanxiao-duijie" className="px-6 py-2.5 border border-[#dde3ec] text-[#555] text-[13px] rounded-lg hover:bg-[#f5f7fa] transition-colors">
              前往产销对接大厅
            </Link>
          </div>
        </div>
      </MerchantLayout>
    )
  }

  return (
    <MerchantLayout>
      <div className="max-w-[860px]">
        <div className="text-[13px] text-[#999] mb-4 flex items-center gap-1">
          <Link href="/merchant/chanxiao/xiaoshou-list" className="flex items-center gap-1 hover:text-[#1a5fa8]">
            <ChevronLeft className="w-3.5 h-3.5" />产销对接 · 销售管理
          </Link>
          <span>›</span>
          <span className="text-[#333]">发布销售信息</span>
        </div>

        <div className="bg-white rounded-xl border border-[#dde3ec]">
          <div className="px-7 py-5 border-b border-[#e8edf5]">
            <h1 className="text-[18px] font-bold text-[#1a1a2e]">发布销售信息</h1>
            <p className="text-[13px] text-[#888] mt-1">向买方发布您的销售供应信息，买方可查看并发起询价</p>
          </div>

          <div className="p-7 space-y-8">
            {/* 基本信息 */}
            <section>
              <h2 className="text-[14px] font-semibold text-[#333] mb-4 pb-2 border-b border-[#f0f2f5]">基本信息</h2>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="col-span-2">
                  <label className="block text-[13px] text-[#555] mb-1.5"><span className="text-red-500">*</span> 销售标题</label>
                  <input value={form.title} onChange={(e) => set("title", e.target.value)}
                    placeholder="请输入销售信息标题，如：2026年新产丰两优大米大量供应"
                    className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5"><span className="text-red-500">*</span> 商品分类</label>
                  <select value={form.category} onChange={(e) => set("category", e.target.value)}
                    className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8] bg-white">
                    <option value="">请选择分类</option>
                    {categories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5"><span className="text-red-500">*</span> 商品名称</label>
                  <input value={form.productName} onChange={(e) => set("productName", e.target.value)}
                    placeholder="请输入商品名称"
                    className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5">规格</label>
                  <input value={form.spec} onChange={(e) => set("spec", e.target.value)}
                    placeholder="如：25kg/袋"
                    className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5"><span className="text-red-500">*</span> 可供应量</label>
                  <div className="flex gap-2">
                    <input value={form.qty} onChange={(e) => set("qty", e.target.value)} placeholder="请输入数量"
                      className="flex-1 px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                    <select value={form.unit} onChange={(e) => set("unit", e.target.value)}
                      className="w-20 px-2 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8] bg-white">
                      {["吨", "公斤", "斤", "件", "箱"].map((u) => <option key={u}>{u}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5">最小起订量</label>
                  <input value={form.minOrder} onChange={(e) => set("minOrder", e.target.value)}
                    placeholder="如：5吨"
                    className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5"><span className="text-red-500">*</span> 销售价格区间</label>
                  <div className="flex items-center gap-2">
                    <input value={form.priceMin} onChange={(e) => set("priceMin", e.target.value)} placeholder="最低价"
                      className="flex-1 px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                    <span className="text-[#666]">~</span>
                    <input value={form.priceMax} onChange={(e) => set("priceMax", e.target.value)} placeholder="最高价"
                      className="flex-1 px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                    <select value={form.priceUnit} onChange={(e) => set("priceUnit", e.target.value)}
                      className="w-24 px-2 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8] bg-white">
                      {["元/斤", "元/公斤", "元/吨", "元/件"].map((u) => <option key={u}>{u}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5"><span className="text-red-500">*</span> 信息有效期至</label>
                  <input type="date" value={form.validUntil} onChange={(e) => set("validUntil", e.target.value)}
                    className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5">交货周期</label>
                  <input value={form.deliveryCycle} onChange={(e) => set("deliveryCycle", e.target.value)}
                    placeholder="如：签约后7天内发货"
                    className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
              </div>
            </section>

            {/* 交易条款 */}
            <section>
              <h2 className="text-[14px] font-semibold text-[#333] mb-4 pb-2 border-b border-[#f0f2f5]">交易条款</h2>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5">预付款比例</label>
                  <div className="flex items-center gap-2">
                    <input value={form.depositRatio} onChange={(e) => set("depositRatio", e.target.value)} placeholder="如：20"
                      className="flex-1 px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                    <span className="text-[13px] text-[#666]">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5">交易模式</label>
                  <select value={form.tradeMode} onChange={(e) => set("tradeMode", e.target.value)}
                    className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8] bg-white">
                    {tradeModes.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5">配送方式</label>
                  <select value={form.deliveryMethod} onChange={(e) => set("deliveryMethod", e.target.value)}
                    className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8] bg-white">
                    {deliveryMethods.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5">结算渠道</label>
                  <select value={form.settlement} onChange={(e) => set("settlement", e.target.value)}
                    className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8] bg-white">
                    {settlements.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </section>

            {/* 供应描述 */}
            <section>
              <h2 className="text-[14px] font-semibold text-[#333] mb-4 pb-2 border-b border-[#f0f2f5]">供应描述</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5">质量标准</label>
                  <input value={form.qualityStd} onChange={(e) => set("qualityStd", e.target.value)}
                    placeholder="如：GB/T 1354 大米三等及以上，水分≤14%"
                    className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5">产能说明</label>
                  <input value={form.capacity} onChange={(e) => set("capacity", e.target.value)}
                    placeholder="如：年产能5万吨，自有种植基地2000亩"
                    className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5">认证资质</label>
                  <input value={form.cert} onChange={(e) => set("cert", e.target.value)}
                    placeholder="如：GAP认证、绿色食品认证"
                    className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5"><span className="text-red-500">*</span> 供应描述</label>
                  <textarea value={form.desc} onChange={(e) => set("desc", e.target.value)}
                    rows={4} placeholder="请详细描述您的供应信息，包括商品特点、产地、存储条件等..."
                    className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none" />
                </div>
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5">备注说明</label>
                  <textarea value={form.remark} onChange={(e) => set("remark", e.target.value)}
                    rows={2} placeholder="其他补充说明..."
                    className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none" />
                </div>
              </div>
            </section>

            {/* 联系人 */}
            <section>
              <h2 className="text-[14px] font-semibold text-[#333] mb-4 pb-2 border-b border-[#f0f2f5]">卖方联系人信息</h2>
              <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5"><span className="text-red-500">*</span> 联系人姓名</label>
                  <input value={form.contact} onChange={(e) => set("contact", e.target.value)} placeholder="请输入联系人姓名"
                    className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5"><span className="text-red-500">*</span> 联系电话</label>
                  <input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="请输入联系电话"
                    className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5">所属部门</label>
                  <input value={form.dept} onChange={(e) => set("dept", e.target.value)} placeholder="如：销售部"
                    className="w-full px-3 py-2.5 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
              </div>
            </section>
          </div>

          <div className="px-7 py-4 border-t border-[#e8edf5] flex items-center justify-end gap-3">
            <Link href="/merchant/chanxiao/xiaoshou-list" className="px-6 py-2.5 border border-[#dde3ec] text-[#555] text-[13px] rounded-lg hover:bg-[#f5f7fa] transition-colors">
              取消
            </Link>
            <button onClick={() => setSubmitted(true)}
              className="px-8 py-2.5 bg-[#3a8c3f] text-white text-[13px] font-semibold rounded-lg hover:bg-[#2d6e32] transition-colors">
              发布销售信息
            </button>
          </div>
        </div>
      </div>
    </MerchantLayout>
  )
}
