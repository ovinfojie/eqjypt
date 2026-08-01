"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Info, Download, Eye, ChevronDown, ChevronRight } from "lucide-react"

const skuRows = [
  { sku: "K463401718928", masterSku: "——", spec: "吨", estQty: "5.00", unit: "吨", lastPrice: "1500", price: "2000", amount: "——" },
  { sku: "K345678971898", masterSku: "——", spec: "千克", estQty: "100.00", unit: "千克", lastPrice: "——", price: "2000", amount: "100000.00" },
]

export default function GongyingBaoJiaPage() {
  const [activeTab, setActiveTab] = useState<"baojia" | "detail">("baojia")
  const [transactionMode, setTransactionMode] = useState<"noguarantee" | "guarantee">("guarantee")
  const [settlement, setSettlement] = useState({ jianlonglong: true, gonghang: false })

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-[#dde3ec]">
          <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center gap-1.5 text-[12px] text-[#6b7c93]">
            <Link href="/portal" className="hover:text-[#1a5fa8] transition-colors">首页</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/portal/dingdan-nongye" className="hover:text-[#1a5fa8] transition-colors">订单农业服务</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1a1a2e]">发起供应报价</span>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="max-w-[1000px]">
            <div className="mb-6">
              <h1 className="text-[20px] font-bold text-[#1a1a2e]">发起供应报价</h1>
              <p className="text-[13px] text-[#6b7c93] mt-1">针对采购方的询价需求进行报价，填写供应信息和价格后提交</p>
            </div>

            <div className="bg-white rounded-lg border border-[#dde3ec] overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-[#dde3ec]">
                {[
                  { key: "baojia", label: "发起供应报价" },
                  { key: "detail", label: "订单种植需求详情" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as "baojia" | "detail")}
                    className={`px-6 py-3.5 text-[14px] font-medium border-b-2 transition-colors ${
                      activeTab === tab.key ? "border-[#1a5fa8] text-[#1a5fa8]" : "border-transparent text-[#666] hover:text-[#1a5fa8]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Demand overview card */}
                <div className="border border-[#dde3ec] rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#e8f4fd] rounded flex items-center justify-center shrink-0">
                      <Info className="w-5 h-5 text-[#1a5fa8]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[14px] font-semibold text-[#1a1a2e] mb-0.5">2026年广东省内计划大量采购丝苗米</div>
                      <div className="text-[12px] text-[#6b7c93]">广东新供销天润粮油集团有限公司</div>
                    </div>
                  </div>
                  <table className="w-full text-[13px] mt-4 border border-[#dde3ec] rounded overflow-hidden">
                    <thead className="bg-[#f5f7fa]">
                      <tr>
                        {["商品图片", "商品名称", "平台分类", "规格", "计划采购量(单位)", "收购价区间(单位)"].map((h) => (
                          <th key={h} className="px-3 py-2 text-left font-medium text-[#444] border-b border-[#dde3ec]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-3"><div className="w-10 h-10 bg-[#f0f4f8] border border-[#dde3ec] rounded flex items-center justify-center text-[#ccc] text-[10px]">图片</div></td>
                        <td className="px-3 py-3 font-medium">丝苗米</td>
                        <td className="px-3 py-3 text-[#6b7c93]">粮油类/大米类/籼米</td>
                        <td className="px-3 py-3">吨</td>
                        <td className="px-3 py-3">100吨</td>
                        <td className="px-3 py-3 text-[#1a5fa8] font-medium">2800~3000元/吨</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="grid grid-cols-3 gap-4 mt-4 text-[13px]">
                    <div><span className="text-[#6b7c93]">期望收货周期：</span><span className="text-[#333]">2026-04-23 至 2026-04-25</span></div>
                    <div>
                      <span className="text-[#6b7c93]">报价模式：</span><span className="text-[#333]">可以修改报价</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Info className="w-3.5 h-3.5 text-[#1a5fa8]" />
                        <span className="text-[12px] text-[#1a5fa8]">买方未下单前可随时修改报价</span>
                      </div>
                    </div>
                    <div><span className="text-[#6b7c93]">报价截止时间：</span><span className="text-[#333]">2026-04-25 23:59:59</span></div>
                    <div>
                      <span className="text-[#6b7c93]">收购标准：</span><span className="text-[#333]">GB/T 1354 大米</span>
                      <button className="ml-2 text-[#1a5fa8] text-[12px] hover:underline">查看标准详情</button>
                    </div>
                    <div className="col-span-2"><span className="text-[#6b7c93]">备注信息：</span><span className="text-[#333]">要求米粒完整、无霉变，水分含量≤14.5%，垩白度≤5%。需提供质检报告。</span></div>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f5f7fa] border border-[#dde3ec] rounded text-[13px]">
                      <div className="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center"><span className="text-white text-[7px] font-bold">PDF</span></div>
                      <span>质检要求说明.pdf</span>
                      <button className="ml-1 text-[#6b7c93] hover:text-[#1a5fa8]"><Download className="w-3.5 h-3.5" /></button>
                      <button className="text-[#6b7c93] hover:text-[#1a5fa8]"><Eye className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                </div>

                {/* Select supply product */}
                <div className="mb-6">
                  <h3 className="text-[14px] font-semibold text-[#1a1a2e] mb-3">选择供应商品</h3>
                  <div className="border border-[#1a5fa8] rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-[#1a5fa8] rounded flex items-center justify-center shrink-0">
                        <span className="text-white text-[10px]">图片</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[13px] font-semibold">丝苗米（一级）</span>
                          <span className="px-2 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[11px] rounded">实物商品</span>
                        </div>
                        <button className="text-[12px] text-[#1a5fa8] hover:underline">更换商品</button>
                      </div>
                    </div>
                    <div className="mt-2 text-[12px] text-[#6b7c93]">
                      粮油类/大米类/籼米 · 市集SPU编码P626342237328 · 主数据SPU编码P123456789
                    </div>
                  </div>
                </div>

                {/* SKU table */}
                <div className="mb-6">
                  <h3 className="text-[14px] font-semibold text-[#1a1a2e] mb-3"><span className="text-red-500 mr-1">*</span>选择规格</h3>
                  <table className="w-full text-[13px] border border-[#dde3ec] rounded overflow-hidden">
                    <thead className="bg-[#f5f7fa]">
                      <tr>
                        <th className="w-8 px-3 py-2 border-b border-[#dde3ec]"><input type="checkbox" className="accent-[#1a5fa8]" defaultChecked /></th>
                        {["平台SKU编码", "主数据SKU编码", "规格名称", "预估供应量", "单位", "上次报价(元)", "本次报价(元)", "金额(元)"].map((h) => (
                          <th key={h} className="px-3 py-2 text-left font-medium text-[#444] border-b border-[#dde3ec]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {skuRows.map((row, i) => (
                        <tr key={i} className="border-b border-[#dde3ec] last:border-0">
                          <td className="px-3 py-3"><input type="checkbox" className="accent-[#1a5fa8]" defaultChecked /></td>
                          <td className="px-3 py-3 text-[#6b7c93]">{row.sku}</td>
                          <td className="px-3 py-3 text-[#6b7c93]">{row.masterSku}</td>
                          <td className="px-3 py-3">{row.spec}</td>
                          <td className="px-3 py-3">{row.estQty}</td>
                          <td className="px-3 py-3">{row.unit}</td>
                          <td className="px-3 py-3 text-[#6b7c93]">{row.lastPrice}</td>
                          <td className="px-3 py-3">
                            <input type="text" defaultValue={row.price} className="w-20 h-7 border border-[#dde3ec] rounded px-2 text-[13px] outline-none focus:border-[#1a5fa8]" />
                          </td>
                          <td className="px-3 py-3 font-medium text-[#1a1a2e]">{row.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-right mt-2 text-[13px] text-[#6b7c93]">
                    已选 <span className="text-[#1a1a2e] font-medium">2</span> 个规格，总供货量 <span className="text-[#1a1a2e] font-medium">5100 kg</span>，报价合计 <span className="text-[#1a5fa8] font-bold text-[14px]">¥100,000.00</span>
                  </div>
                </div>

                {/* Other fields */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-6">
                  <div>
                    <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>报价有效期</label>
                    <div className="flex items-center gap-2">
                      <input type="text" placeholder="选择开始日期" className="flex-1 h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
                      <span className="text-[#999]">至</span>
                      <input type="text" placeholder="选择结束日期" className="flex-1 h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>可供货时间</label>
                    <div className="flex items-center gap-2">
                      <input type="text" placeholder="选择开始日期" className="flex-1 h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
                      <span className="text-[#999]">至</span>
                      <input type="text" placeholder="选择结束日期" className="flex-1 h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>结算渠道</label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={settlement.jianlonglong} onChange={(e) => setSettlement({ ...settlement, jianlonglong: e.target.checked })} className="accent-[#1a5fa8]" />
                        <span className="text-[13px]">建行龙存管</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={settlement.gonghang} onChange={(e) => setSettlement({ ...settlement, gonghang: e.target.checked })} className="accent-[#1a5fa8]" />
                        <span className="text-[13px]">工行安心付</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>交易模式 <Info className="inline w-3.5 h-3.5 text-[#999] ml-1" /></label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="transMode" checked={transactionMode === "noguarantee"} onChange={() => setTransactionMode("noguarantee")} className="accent-[#1a5fa8]" />
                        <span className="text-[13px]">非担保交易</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="transMode" checked={transactionMode === "guarantee"} onChange={() => setTransactionMode("guarantee")} className="accent-[#1a5fa8]" />
                        <span className="text-[13px]">担保交易</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>预付款比例</label>
                    <div className="relative">
                      <input type="text" placeholder="请输入" className="w-full h-9 border border-[#dde3ec] rounded px-3 pr-8 text-[13px] outline-none focus:border-[#1a5fa8]" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] text-[13px]">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>配送方式</label>
                    <div className="relative">
                      <select className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8] bg-white appearance-none">
                        <option value="">请选择配送方式</option>
                        <option>卖家配送</option>
                        <option>买家自提</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999] pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* 产能说明 */}
                <div className="mb-5">
                  <label className="block text-[13px] font-medium text-[#333] mb-1.5">产能说明</label>
                  <textarea placeholder="请输入产能说明" rows={3} className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] outline-none focus:border-[#1a5fa8] resize-none" />
                </div>

                {/* 收购标准 */}
                <div className="mb-6 p-4 bg-[#f5f7fa] rounded border border-[#dde3ec]">
                  <label className="block text-[13px] font-medium text-[#333] mb-2"><span className="text-red-500 mr-1">*</span>收购标准</label>
                  <div className="text-[13px] text-[#444] mb-2">
                    本需求绑定丝苗米收购标准 GB/T 1354
                    <button className="ml-2 text-[#1a5fa8] hover:underline">查看收购标准</button>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-[#1a5fa8]" />
                    <span className="text-[13px] text-[#444]">我已阅读并承诺按收购标准交付</span>
                  </label>
                </div>

                {/* 卖方联系人 */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-6">
                  <div>
                    <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>卖方联系人姓名</label>
                    <input type="text" placeholder="请输入联系人姓名" className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#333] mb-1.5"><span className="text-red-500 mr-1">*</span>卖方联系人电话</label>
                    <input type="text" placeholder="请输入联系人电话" className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-center gap-4 pt-2 border-t border-[#dde3ec]">
                  <Link href="/portal/dingdan-nongye" className="px-8 py-2.5 border border-[#dde3ec] text-[#444] text-[14px] rounded hover:bg-[#f5f7fa] transition-colors">
                    取消
                  </Link>
                  <button className="px-12 py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors">
                    提交报价
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
