"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Info, ChevronRight, ChevronDown, Download, Eye } from "lucide-react"
import { ProductPicker, type PickedProduct } from "@/components/merchant/product-picker"

/* ─── Demand data (mirrors caigou-detail) ─── */
const demand = {
  id: "d465817702544",
  status: "已报价",
  title: "高州市杜村公司6月份采购荔枝3000吨",
  buyer: "高州市社村合作农业发展有限公司02(南雄市社村合作农业发展有限公司)",
  publishTime: "2026-05-21 15:02:46",
  quoteMode: "可以修改报价",
  quoteDeadline: "2026-06-30 23:59:59",
  bizMode: "交易服务",
  delivery: "卖家配送、买家自提",
  recipient: "广东省广州市荔湾区某某某",
  recipientContact: "陈先生 17878907890",
  deliveryStart: "2026-05-25",
  deliveryEnd: "2026-06-27",
  depositRatio: "0%",
  tradeMode: "担保交易",
  settlement: "建行龙存管、工行安心付",
  products: [
    { img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=60&h=60&fit=crop", name: "桂味荔枝",   category: "水果/热带水果/荔枝", spec: "吨", qty: "800吨" },
    { img: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=60&h=60&fit=crop", name: "妃子笑荔枝", category: "水果/热带水果/荔枝", spec: "吨", qty: "620吨" },
    { img: "https://images.unsplash.com/photo-1502741126161-b048400d085d?w=60&h=60&fit=crop", name: "白糖罂荔枝", category: "水果/热带水果/荔枝", spec: "吨", qty: "890吨" },
  ],
  remark: "—",
  attachment: "—",
}

const skuRows = [
  { sku: "K463401718928", spec: "5kg/袋", estQty: "5000", unit: "袋", lastPrice: "—",    price: "88.00" },
  { sku: "K345678971898", spec: "10kg/袋", estQty: "3000", unit: "袋", lastPrice: "160", price: "170.00" },
]

export default function CaigouBaoJiaPage() {
  const [activeTab, setActiveTab]         = useState<"baojia" | "detail">("baojia")
  const [tradeMode, setTradeMode]         = useState<"guarantee" | "noguarantee">("guarantee")
  const [settlement, setSettlement]       = useState({ jianlonglong: true, gonghang: false })
  const [pickedProduct, setPickedProduct] = useState<PickedProduct | null>(null)

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-[#dde3ec]">
          <div className="max-w-[1100px] mx-auto px-6 py-3 flex items-center gap-1.5 text-[12px] text-[#6b7c93]">
            <Link href="/portal" className="hover:text-[#1a5fa8]">首页</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/portal/chanxiao-duijie" className="hover:text-[#1a5fa8]">产销对接</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/portal/chanxiao-duijie/caigou-detail" className="hover:text-[#1a5fa8]">采购需求详细信息</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1a1a2e]">发起供应报价</span>
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto px-6 py-6">
          <div className="max-w-[1000px]">
            <div className="mb-5">
              <h1 className="text-[20px] font-bold text-[#1a1a2e]">发起供应报价</h1>
              <p className="text-[13px] text-[#6b7c93] mt-1">针对采购方的采购需求进行报价，填写供应信息和价格后提交</p>
            </div>

            <div className="bg-white rounded-lg border border-[#dde3ec] overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-[#dde3ec]">
                {[
                  { key: "baojia", label: "发起供应报价" },
                  { key: "detail", label: "采购需求详情" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as "baojia" | "detail")}
                    className={`px-6 py-3.5 text-[14px] font-medium border-b-2 transition-colors ${
                      activeTab === tab.key
                        ? "border-[#1a5fa8] text-[#1a5fa8]"
                        : "border-transparent text-[#666] hover:text-[#1a5fa8]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* ── Tab: 发起供应报价 ── */}
              {activeTab === "baojia" && (
                <div className="p-6">
                  {/* Demand summary card */}
                  <div className="border border-[#dde3ec] rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#e8f4fd] rounded flex items-center justify-center shrink-0">
                        <Info className="w-5 h-5 text-[#1a5fa8]" />
                      </div>
                      <div>
                        <div className="text-[14px] font-semibold text-[#1a1a2e]">{demand.title}</div>
                        <div className="text-[12px] text-[#6b7c93] mt-0.5">{demand.buyer}</div>
                      </div>
                    </div>

                    {/* Products table */}
                    <table className="w-full text-[13px] border border-[#dde3ec] rounded overflow-hidden mb-4">
                      <thead className="bg-[#f5f7fa]">
                        <tr>
                          {["商品图片", "商品名称", "分类", "规格", "采购数量(单位)"].map((h) => (
                            <th key={h} className="px-3 py-2 text-left font-medium text-[#444] border-b border-[#dde3ec]">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {demand.products.map((p, i) => (
                          <tr key={i} className="border-b border-[#f0f2f5] last:border-0">
                            <td className="px-3 py-2.5">
                              <img src={p.img} alt={p.name} crossOrigin="anonymous" className="w-10 h-10 object-cover rounded border border-[#e8edf5]" />
                            </td>
                            <td className="px-3 py-2.5 font-medium text-[#333]">{p.name}</td>
                            <td className="px-3 py-2.5 text-[#6b7c93]">{p.category}</td>
                            <td className="px-3 py-2.5 text-[#555]">{p.spec}</td>
                            <td className="px-3 py-2.5 font-medium text-[#333]">{p.qty}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-[13px]">
                      <div>
                        <span className="text-[#6b7c93]">报价模式：</span>
                        <span className="text-[#333]">{demand.quoteMode}</span>
                      </div>
                      <div>
                        <span className="text-[#6b7c93]">报价截止时间：</span>
                        <span className="text-[#333]">{demand.quoteDeadline}</span>
                      </div>
                      <div>
                        <span className="text-[#6b7c93]">业务模式：</span>
                        <span className="text-[#333]">{demand.bizMode}</span>
                      </div>
                      <div>
                        <span className="text-[#6b7c93]">期望收货：</span>
                        <span className="text-[#333]">{demand.deliveryStart} 至 {demand.deliveryEnd}</span>
                      </div>
                      <div>
                        <span className="text-[#6b7c93]">预付款比例：</span>
                        <span className="text-[#333]">{demand.depositRatio}</span>
                      </div>
                      <div>
                        <span className="text-[#6b7c93]">配送方式：</span>
                        <span className="text-[#333]">{demand.delivery}</span>
                      </div>
                    </div>
                    {/* Attachment */}
                    <div className="mt-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f5f7fa] border border-[#dde3ec] rounded text-[13px]">
                        <div className="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center">
                          <span className="text-white text-[7px] font-bold">PDF</span>
                        </div>
                        <span>质检要求说明.pdf</span>
                        <button className="ml-1 text-[#6b7c93] hover:text-[#1a5fa8]"><Download className="w-3.5 h-3.5" /></button>
                        <button className="text-[#6b7c93] hover:text-[#1a5fa8]"><Eye className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </div>

                  {/* Select supply product */}
                  <div className="mb-6">
                    <h3 className="text-[14px] font-semibold text-[#1a1a2e] mb-3">
                      <span className="text-red-500 mr-1">*</span>选择供应商品
                    </h3>
                    <ProductPicker value={pickedProduct} onChange={setPickedProduct} />
                  </div>

                  {/* SKU / price table */}
                  <div className="mb-6">
                    <h3 className="text-[14px] font-semibold text-[#1a1a2e] mb-3">
                      <span className="text-red-500 mr-1">*</span>选择规格及报价
                    </h3>
                    <table className="w-full text-[13px] border border-[#dde3ec] rounded overflow-hidden">
                      <thead className="bg-[#f5f7fa]">
                        <tr>
                          <th className="w-8 px-3 py-2 border-b border-[#dde3ec]">
                            <input type="checkbox" className="accent-[#1a5fa8]" defaultChecked />
                          </th>
                          {["平台SKU编码", "规格名称", "预估供应量", "单位", "上次报价(元)", "本次报价(元)", "金额(元)"].map((h) => (
                            <th key={h} className="px-3 py-2 text-left font-medium text-[#444] border-b border-[#dde3ec]">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {skuRows.map((row, i) => (
                          <tr key={i} className="border-b border-[#dde3ec] last:border-0">
                            <td className="px-3 py-3"><input type="checkbox" className="accent-[#1a5fa8]" defaultChecked /></td>
                            <td className="px-3 py-3 text-[#6b7c93]">{row.sku}</td>
                            <td className="px-3 py-3">{row.spec}</td>
                            <td className="px-3 py-3">{row.estQty}</td>
                            <td className="px-3 py-3">{row.unit}</td>
                            <td className="px-3 py-3 text-[#6b7c93]">{row.lastPrice}</td>
                            <td className="px-3 py-3">
                              <input
                                type="text"
                                defaultValue={row.price}
                                className="w-24 h-7 border border-[#dde3ec] rounded px-2 text-[13px] outline-none focus:border-[#1a5fa8]"
                              />
                            </td>
                            <td className="px-3 py-3 font-medium text-[#1a1a2e]">—</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="text-right mt-2 text-[13px] text-[#6b7c93]">
                      已选 <span className="text-[#1a1a2e] font-medium">2</span> 个规格，
                      报价合计 <span className="text-[#1a5fa8] font-bold text-[14px]">¥—</span>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-6">
                    <div>
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                        <span className="text-red-500 mr-1">*</span>报价有效期
                      </label>
                      <div className="flex items-center gap-2">
                        <input type="date" className="flex-1 h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
                        <span className="text-[#999] shrink-0">至</span>
                        <input type="date" className="flex-1 h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                        <span className="text-red-500 mr-1">*</span>可供货时间
                      </label>
                      <div className="flex items-center gap-2">
                        <input type="date" className="flex-1 h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
                        <span className="text-[#999] shrink-0">至</span>
                        <input type="date" className="flex-1 h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                        <span className="text-red-500 mr-1">*</span>结算渠道
                      </label>
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
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                        <span className="text-red-500 mr-1">*</span>交易模式
                        <Info className="inline w-3.5 h-3.5 text-[#999] ml-1" />
                      </label>
                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="tradeMode" checked={tradeMode === "guarantee"} onChange={() => setTradeMode("guarantee")} className="accent-[#1a5fa8]" />
                          <span className="text-[13px]">担保交易</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="tradeMode" checked={tradeMode === "noguarantee"} onChange={() => setTradeMode("noguarantee")} className="accent-[#1a5fa8]" />
                          <span className="text-[13px]">非担保交易</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                        <span className="text-red-500 mr-1">*</span>预付款比例
                      </label>
                      <div className="relative">
                        <input type="text" placeholder="请输入" className="w-full h-9 border border-[#dde3ec] rounded px-3 pr-8 text-[13px] outline-none focus:border-[#1a5fa8]" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] text-[13px]">%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                        <span className="text-red-500 mr-1">*</span>配送方式
                      </label>
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

                  <div className="mb-5">
                    <label className="block text-[13px] font-medium text-[#333] mb-1.5">产能说明</label>
                    <textarea
                      placeholder="请输入产能说明，如年产能、产地、认证情况等"
                      rows={3}
                      className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] outline-none focus:border-[#1a5fa8] resize-none"
                    />
                  </div>

                  {/* Seller contact */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-6">
                    <div>
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                        <span className="text-red-500 mr-1">*</span>卖方联系人姓名
                      </label>
                      <input type="text" placeholder="请输入联系人姓名" className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                        <span className="text-red-500 mr-1">*</span>卖方联系人电话
                      </label>
                      <input type="text" placeholder="请输入联系人电话" className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 pt-4 border-t border-[#dde3ec]">
                    <Link
                      href="/portal/chanxiao-duijie/caigou-detail"
                      className="px-8 py-2.5 border border-[#dde3ec] text-[#444] text-[14px] rounded hover:bg-[#f5f7fa] transition-colors"
                    >
                      取消
                    </Link>
                    <button className="px-12 py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors">
                      提交报价
                    </button>
                  </div>
                </div>
              )}

              {/* ── Tab: 采购需求详情 ── */}
              {activeTab === "detail" && (
                <div className="p-6">
                  <h2 className="text-[16px] font-bold text-center text-[#1a1a2e] mb-6">采购需求详细信息</h2>

                  <div className="space-y-2.5 text-[14px] mb-6">
                    <div><span className="font-semibold text-[#333]">需求：</span><span className="text-[#333]">{demand.title}</span></div>
                    <div><span className="font-semibold text-[#333]">买家：</span><span className="text-[#555]">{demand.buyer}</span></div>
                    <div><span className="font-semibold text-[#333]">发布时间：</span><span className="text-[#555]">{demand.publishTime}</span></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><span className="font-semibold text-[#333]">需求编号：</span><span className="text-[#555]">{demand.id}</span></div>
                      <div><span className="font-semibold text-[#333]">需求状态：</span><span className="text-[#1a5fa8] font-medium">{demand.status}</span></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><span className="font-semibold text-[#333]">报价模式：</span><span className="text-[#555]">{demand.quoteMode}</span></div>
                      <div><span className="font-semibold text-[#333]">报价截止日期：</span><span className="text-[#555]">{demand.quoteDeadline}</span></div>
                    </div>
                    <div><span className="font-semibold text-[#333]">业务模式：</span><span className="text-[#555]">{demand.bizMode}</span></div>
                    <div><span className="font-semibold text-[#333]">配送方式：</span><span className="text-[#555]">{demand.delivery}</span></div>
                    <div>
                      <span className="font-semibold text-[#333]">收货人信息：</span>
                      <span className="text-[#555]">{demand.recipient}</span>
                      <span className="ml-4 text-[#555]">{demand.recipientContact}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><span className="font-semibold text-[#333]">期望收货日期：</span><span className="text-[#555]">{demand.deliveryStart} ~ {demand.deliveryEnd}</span></div>
                      <div><span className="font-semibold text-[#333]">预付款比例：</span><span className="text-[#555]">{demand.depositRatio}</span></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><span className="font-semibold text-[#333]">交易模式：</span><span className="text-[#555]">{demand.tradeMode}</span></div>
                      <div><span className="font-semibold text-[#333]">结算渠道：</span><span className="text-[#555]">{demand.settlement}</span></div>
                    </div>
                  </div>

                  {/* Product table */}
                  <div className="mb-6 border border-[#dde3ec] rounded overflow-hidden">
                    <div className="bg-[#f0f4f8] px-4 py-2.5 text-[13px] font-semibold text-[#333]">商品信息</div>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#dde3ec]">
                          {["商品图片", "商品名称", "分类", "规格", "采购数量(单位)"].map((h) => (
                            <th key={h} className="px-4 py-2.5 text-left text-[13px] text-[#555] font-semibold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {demand.products.map((p, i) => (
                          <tr key={i} className="border-b border-[#f0f2f5] last:border-0">
                            <td className="px-4 py-3">
                              <img src={p.img} alt={p.name} crossOrigin="anonymous" className="w-12 h-12 object-cover rounded border border-[#e8edf5]" />
                            </td>
                            <td className="px-4 py-3 text-[13px] text-[#333]">{p.name}</td>
                            <td className="px-4 py-3 text-[13px] text-[#555]">{p.category}</td>
                            <td className="px-4 py-3 text-[13px] text-[#555]">{p.spec}</td>
                            <td className="px-4 py-3 text-[13px] font-medium text-[#333]">{p.qty}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Other info */}
                  <div className="border border-[#dde3ec] rounded overflow-hidden mb-6">
                    <div className="bg-[#f0f4f8] px-4 py-2.5 text-[13px] font-semibold text-[#333]">其他信息</div>
                    <div className="px-4 py-4 space-y-2 text-[13px]">
                      <div><span className="text-[#666]">备注说明：</span><span className="text-[#333]">{demand.remark}</span></div>
                      <div><span className="text-[#666]">附件：</span><span className="text-[#333]">{demand.attachment}</span></div>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setActiveTab("baojia")}
                      className="px-12 py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors"
                    >
                      立即报价
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
