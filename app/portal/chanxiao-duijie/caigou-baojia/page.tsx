"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ChevronDown, HelpCircle, Upload, Download, AlertCircle } from "lucide-react"

/* ─── mock data ─── */
const demand = {
  id: "d465817702544",
  title: "高州市杜村公司6月份采购荔枝3000吨",
  buyer: "高州市社村合作农业发展有限公司02",
  quoteMode: "可以修改报价",
  products: [
    {
      img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=60&h=60&fit=crop",
      name: "丰两优米.",
      spec: "吨（散装）",
      qty: "500",
      unit: "吨",
      lastPrice: "1.00",
    },
  ],
  bizMode: "交易服务",
  delivery: "卖家配送、买家自提",
  recipient: "广东省广州市荔湾区某某某",
  recipientContact: "陈先生 17878907890",
  deliveryStart: "2026-05-25",
  deliveryEnd: "2026-06-27",
  depositRatio: "0%",
  tradeMode: "担保交易",
  settlement: "建行龙存管、工行安心付",
  publishTime: "2026-05-21 15:02:46",
  quoteDeadline: "2026-06-30 23:59:59",
  remark: "—",
}

type Tab = "baojia" | "detail"
type Settlement = "jianhang" | "gonghang" | "other"

export default function CaigouBaoJiaPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>("baojia")
  const [settlement, setSettlement] = useState<Settlement>("jianhang")
  const [tradeMode, setTradeMode] = useState("")
  const [delivery, setDelivery] = useState("")
  const [startTime] = useState("2026-08-03 18:35:11")
  const [endTime, setEndTime] = useState("")
  const [contactName, setContactName] = useState("沈阳东1")
  const [contactPhone, setContactPhone] = useState("14789562311")
  const [remark, setRemark] = useState("")
  const [prices, setPrices] = useState<Record<number, string>>({ 0: "" })
  const [submitted, setSubmitted] = useState(false)

  /* compute amount */
  const getAmount = (idx: number) => {
    const p = parseFloat(prices[idx] ?? "")
    const q = parseFloat(demand.products[idx]?.qty ?? "")
    if (!isNaN(p) && !isNaN(q)) return (p * q).toLocaleString("zh-CN")
    return "-"
  }

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => router.push("/portal/chanxiao-duijie"), 1500)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />

      <main className="flex-1 py-6">
        <div className="max-w-[1000px] mx-auto px-4">

          {/* Card */}
          <div className="bg-white rounded border border-[#dde3ec] overflow-hidden">

            {/* Tab bar + 返回 */}
            <div className="flex items-center border-b border-[#dde3ec] px-4">
              {(["baojia", "detail"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-4 py-3.5 text-[14px] border-b-2 transition-colors mr-2 ${
                    activeTab === t
                      ? "border-[#1a5fa8] text-[#1a5fa8] font-medium"
                      : "border-transparent text-[#555] hover:text-[#1a5fa8]"
                  }`}
                >
                  {t === "baojia" ? "报价" : "采购需求详情"}
                </button>
              ))}
              <div className="ml-auto">
                <button
                  onClick={() => router.back()}
                  className="px-5 py-1.5 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded hover:bg-[#e8f4fd] transition-colors"
                >
                  返回
                </button>
              </div>
            </div>

            {/* ── Tab: 报价 ── */}
            {activeTab === "baojia" && (
              <div className="p-6">

                {/* 报价模式提示 */}
                <div className="text-[13px] text-[#555] mb-5">
                  报价模式：<span className="text-[#1a1a2e] font-medium">{demand.quoteMode}</span>
                </div>

                {/* 报价生效期 */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[13px] text-[#e53e3e] shrink-0">*</span>
                  <span className="text-[13px] text-[#333] shrink-0 w-20">报价生效期</span>
                  <div className="flex items-center gap-1 border border-[#dde3ec] rounded px-3 h-9 text-[13px] text-[#333] bg-[#fafbfc] min-w-[200px]">
                    <span className="text-[#aaa] mr-1">⏱</span>
                    {startTime}
                  </div>
                  <span className="text-[#999] text-[13px]">至</span>
                  <div className="flex items-center gap-1 border border-[#dde3ec] rounded px-3 h-9 bg-white min-w-[200px]">
                    <span className="text-[#aaa] mr-1">⏱</span>
                    <input
                      type="text"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      placeholder="选择结束时间"
                      className="flex-1 text-[13px] outline-none bg-transparent text-[#555] placeholder-[#bbb]"
                    />
                  </div>
                </div>

                {/* 结算渠道 */}
                <div className="flex items-center gap-6 mb-5">
                  <span className="text-[13px] text-[#333] w-20 shrink-0">结算渠道</span>
                  {(
                    [
                      { value: "jianhang", label: "建行龙存管" },
                      { value: "gonghang", label: "工行安心付" },
                      { value: "other",    label: "其他" },
                    ] as { value: Settlement; label: string }[]
                  ).map((opt) => (
                    <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="settlement"
                        value={opt.value}
                        checked={settlement === opt.value}
                        onChange={() => setSettlement(opt.value)}
                        className="accent-[#1a5fa8] w-3.5 h-3.5"
                      />
                      <span
                        className={`text-[13px] font-medium ${
                          settlement === opt.value ? "text-[#1a5fa8]" : "text-[#555]"
                        }`}
                      >
                        {opt.label}
                      </span>
                      {opt.value === "other" && (
                        <HelpCircle className="w-3.5 h-3.5 text-[#999]" />
                      )}
                    </label>
                  ))}
                </div>

                {/* 交易模式 */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[13px] text-[#e53e3e] shrink-0">*</span>
                  <span className="text-[13px] text-[#333] w-20 shrink-0 flex items-center gap-1">
                    交易模式
                    <HelpCircle className="w-3.5 h-3.5 text-[#999]" />
                  </span>
                  <div className="relative w-56">
                    <select
                      value={tradeMode}
                      onChange={(e) => setTradeMode(e.target.value)}
                      className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8] bg-white appearance-none text-[#555]"
                    >
                      <option value="">请选择交易模式</option>
                      <option value="guarantee">担保交易</option>
                      <option value="noguarantee">非担保交易</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999] pointer-events-none" />
                  </div>
                </div>

                {/* 配送方式 */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[13px] text-[#e53e3e] shrink-0">*</span>
                  <span className="text-[13px] text-[#333] w-20 shrink-0">配送方式</span>
                  <div className="relative w-56">
                    <select
                      value={delivery}
                      onChange={(e) => setDelivery(e.target.value)}
                      className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8] bg-white appearance-none text-[#555]"
                    >
                      <option value="">请选择配送方式</option>
                      <option value="seller">卖家配送</option>
                      <option value="buyer">买家自提</option>
                      <option value="both">卖家配送、买家自提</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999] pointer-events-none" />
                  </div>
                </div>

                {/* 黄色提示横幅 */}
                <div className="flex items-center gap-2 bg-[#fffbeb] border border-[#f6e05e] rounded px-4 py-2.5 mb-4 text-[13px] text-[#744210]">
                  <AlertCircle className="w-4 h-4 text-[#d97706] shrink-0" />
                  当前报价提交后，买家没有下交易订单前商家都可以修改报价单
                </div>

                {/* 导入/导出 */}
                <div className="flex justify-end gap-2 mb-2">
                  <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#1550a0] transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    导入
                  </button>
                  <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#1550a0] transition-colors">
                    <Download className="w-3.5 h-3.5" />
                    导出
                  </button>
                </div>

                {/* 商品报价明细表 */}
                <table className="w-full text-[13px] border border-[#dde3ec] rounded overflow-hidden mb-6">
                  <thead className="bg-[#f5f7fa]">
                    <tr>
                      {["商品", "规格", "采购数量（单位）", "上一次报价（元）", "报价单价（元）", "金额（元）"].map((h) => (
                        <th
                          key={h}
                          className="px-3 py-2.5 text-center text-[13px] font-medium text-[#444] border-b border-[#dde3ec]"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {demand.products.map((p, i) => (
                      <tr key={i} className="border-b border-[#f0f2f5] last:border-0">
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={p.img}
                              alt={p.name}
                              crossOrigin="anonymous"
                              className="w-10 h-10 object-cover rounded border border-[#e8edf5] shrink-0"
                            />
                            <span className="text-[#333]">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-center text-[#555]">{p.spec}</td>
                        <td className="px-3 py-3 text-center text-[#333]">
                          {p.qty}（{p.unit}）
                        </td>
                        <td className="px-3 py-3 text-center text-[#555]">{p.lastPrice}</td>
                        <td className="px-3 py-3 text-center">
                          <input
                            type="text"
                            value={prices[i] ?? ""}
                            onChange={(e) =>
                              setPrices({ ...prices, [i]: e.target.value })
                            }
                            placeholder="请输入单价"
                            className="w-28 h-8 border border-[#dde3ec] rounded px-2 text-[13px] outline-none focus:border-[#1a5fa8] text-center"
                          />
                        </td>
                        <td className="px-3 py-3 text-center font-medium text-[#1a1a2e]">
                          {getAmount(i)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* 联系人信息 */}
                <div className="grid grid-cols-2 gap-x-6 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-[#e53e3e] shrink-0">*</span>
                    <span className="text-[13px] text-[#333] shrink-0 w-24">联系人姓名：</span>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="flex-1 h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-[#e53e3e] shrink-0">*</span>
                    <span className="text-[13px] text-[#333] shrink-0 w-24">联系人电话：</span>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="flex-1 h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]"
                    />
                  </div>
                </div>

                {/* 其他说明 */}
                <div className="flex items-start gap-2 mb-6">
                  <span className="text-[13px] text-[#333] shrink-0 w-[5.5rem] pt-2">其他说明</span>
                  <div className="flex-1 relative">
                    <textarea
                      value={remark}
                      onChange={(e) => setRemark(e.target.value.slice(0, 300))}
                      placeholder="请输入其他说明"
                      rows={4}
                      className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] outline-none focus:border-[#1a5fa8] resize-none"
                    />
                    <span className="absolute bottom-2 right-3 text-[12px] text-[#aaa]">
                      {remark.length}/300
                    </span>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex justify-center gap-4 pt-4 border-t border-[#dde3ec]">
                  <Link
                    href="/portal/chanxiao-duijie"
                    className="px-10 py-2.5 border border-[#dde3ec] text-[#555] text-[14px] rounded hover:bg-[#f5f7fa] transition-colors"
                  >
                    取消
                  </Link>
                  <button
                    onClick={handleSubmit}
                    disabled={submitted}
                    className="px-12 py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#1550a0] transition-colors disabled:opacity-70"
                  >
                    {submitted ? "提交中..." : "提交"}
                  </button>
                </div>
              </div>
            )}

            {/* ── Tab: 采购需求详情 ── */}
            {activeTab === "detail" && (
              <div className="p-6">
                <h2 className="text-[16px] font-bold text-center text-[#1a1a2e] mb-6">采购需求详细信息</h2>
                <div className="space-y-3 text-[14px]">
                  {[
                    ["需求", demand.title],
                    ["买家", demand.buyer],
                    ["发布时间", demand.publishTime],
                    ["需求编号", demand.id],
                    ["需求状态", "已报价"],
                    ["报价模式", demand.quoteMode],
                    ["报价截止时间", demand.quoteDeadline],
                    ["业务模式", demand.bizMode],
                    ["配送方式", demand.delivery],
                    ["期望收货地址", demand.recipient],
                    ["收货联系人", demand.recipientContact],
                    ["期望收货时间", `${demand.deliveryStart} 至 ${demand.deliveryEnd}`],
                    ["预付款比例", demand.depositRatio],
                    ["交易模式", demand.tradeMode],
                    ["结算渠道", demand.settlement],
                    ["备注", demand.remark],
                  ].map(([label, value]) => (
                    <div key={label} className="flex gap-2">
                      <span className="text-[#6b7c93] shrink-0 w-28">{label}：</span>
                      <span className="text-[#333]">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <div className="text-[14px] font-semibold text-[#333] mb-3">商品清单</div>
                  <table className="w-full text-[13px] border border-[#dde3ec] rounded overflow-hidden">
                    <thead className="bg-[#f5f7fa]">
                      <tr>
                        {["商品", "规格", "采购数量"].map((h) => (
                          <th key={h} className="px-4 py-2.5 text-left font-medium text-[#444] border-b border-[#dde3ec]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {demand.products.map((p, i) => (
                        <tr key={i} className="border-b border-[#f0f2f5] last:border-0">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <img src={p.img} alt={p.name} crossOrigin="anonymous" className="w-9 h-9 rounded border border-[#e8edf5] object-cover" />
                              <span className="text-[#333]">{p.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-[#555]">{p.spec}</td>
                          <td className="px-4 py-3 font-medium text-[#333]">{p.qty}{p.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setActiveTab("baojia")}
                    className="px-10 py-2.5 bg-[#1a5fa8] text-white text-[14px] rounded hover:bg-[#1550a0] transition-colors"
                  >
                    去报价
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
