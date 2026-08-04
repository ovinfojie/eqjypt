"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  ChevronRight, ChevronDown, Info,
} from "lucide-react"

/* ─── Types ─── */
type ServiceTab = "logistics" | "warehouse" | "processing"

/* ─── Mock data ─── */
const LINKED_PRODUCT = {
  orderId: "YFK2026062700001",
  name: "广东特色海丰油占米",
  spec: "5kg/袋，10kg/袋",
  totalWeight: "150吨",
}

const SERVICE_PROVIDERS = [
  {
    id: "l1",
    name: "广州市广百物流有限公司",
    region: "广东省内",
    types: "半箱粮油、小批量农产品、样品",
    capacity: "零担拼车，最小接货 0.5 吨，最大单车载重 8 吨",
    price: "2.6 元/吨·天起",
  },
  {
    id: "l2",
    name: "广东天起冷链物流有限公司",
    region: "广东省汕头市某区xx路xx号（距您约110km）",
    types: "半箱粮油、生鲜农产品",
    capacity: "可用容量：5,200 吨 / 总容量：15,000 吨（最大单仓 2000 吨）",
    price: "2.6 元/吨·天起",
  },
  {
    id: "l3",
    name: "广州某某加工服务商",
    region: "广州市某区xx路xx号（距您约60km）",
    types: "稻谷、大米、糯米、胚芽米",
    capacity: "设备：糙米加工生产线1套，色选机2台，抛光机3台，最大单批次 30 吨",
    price: "待报价",
  },
]

const TRANSPORT_MODES = ["汽运", "水运", "铁运", "航空"]
const VEHICLE_TYPES = ["9.6米厢式车(载重18吨)", "6.8米冷藏车(载重8吨)", "13.5米平板车(载重30吨)"]
const TIME_OPTIONS = ["经济时效（3-5天·10%运费）", "标准时效（1-2天·20%运费）", "急速时效（次日达·50%运费）"]

interface LogisticsForm {
  origin: string
  destination: string
  transportMode: string
  vehicleType: string
  unitPrice: number
  vehicleCount: number
  timeOption: string
  merchantDiscount: number
  platformDiscount: number
  loadingUnitPrice: number
  totalWeight: number
}

interface WarehouseForm {
  warehouseId: string
  startDate: string
  endDate: string
  warehouseType: string
  qty: number
}

interface ProcessingForm {
  processorId: string
  processType: string
  qty: number
  remark: string
}

export default function FuwudanPage() {
  const [selectedProvider, setSelectedProvider] = useState("l1")
  const [activeTab, setActiveTab] = useState<ServiceTab>("logistics")

  // Logistics form
  const [lgForm, setLgForm] = useState<LogisticsForm>({
    origin: "",
    destination: "",
    transportMode: "汽运",
    vehicleType: "9.6米厢式车(载重18吨)",
    unitPrice: 3000,
    vehicleCount: 4,
    timeOption: "经济时效（3-5天·10%运费）",
    merchantDiscount: 0,
    platformDiscount: 0,
    loadingUnitPrice: 15,
    totalWeight: 150,
  })

  // Warehouse form
  const [whForm, setWhForm] = useState<WarehouseForm>({
    warehouseId: "w1", startDate: "", endDate: "",
    warehouseType: "常温仓", qty: 150,
  })

  // Processing form
  const [pcForm, setPcForm] = useState<ProcessingForm>({
    processorId: "p1", processType: "精深加工", qty: 100, remark: "",
  })

  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [transportRemark, setTransportRemark] = useState("")
  const [submitted, setSubmitted] = useState(false)

  // Cost calculation (logistics)
  const lgTransportAmt = lgForm.unitPrice * lgForm.vehicleCount
  const lgLoadingAmt = lgForm.loadingUnitPrice * lgForm.totalWeight
  const lgServiceAmt = lgTransportAmt
  const lgTotal = lgTransportAmt + lgLoadingAmt

  // warehouse cost mock
  const whServiceAmt = 35200
  const whRepairAmt = 2250
  // processing
  const pcServiceAmt = 0 // pending

  const totalOrderAmt = lgTotal + whServiceAmt + whRepairAmt

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-lg p-10 text-center shadow">
            <div className="w-12 h-12 rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#3a8c3f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-[16px] font-bold text-[#1a1a2e] mb-2">服务单提交成功！</p>
            <p className="text-[13px] text-[#999] mb-6">服务商将尽快确认并安排服务</p>
            <div className="flex gap-3 justify-center">
              <Link href="/portal/chanxiao-duijie" className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#1a5fa8]">继续浏览</Link>
              <Link href="/portal" className="px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]">返回首页</Link>
            </div>
          </div>
        </div>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e8edf5]">
        <div className="max-w-[1200px] mx-auto px-6 py-2.5 flex items-center gap-1.5 text-[12px] text-[#888]">
          <Link href="/portal" className="hover:text-[#1a5fa8]">首页</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/portal/chanxiao-duijie" className="hover:text-[#1a5fa8]">产销对接</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/portal/chanxiao-duijie/xiadan" className="hover:text-[#1a5fa8]">提交订单</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#333]">全链服务</span>
        </div>
      </div>

      <main className="flex-1">
        <div className="max-w-[1000px] mx-auto px-6 py-5">

          {/* Title */}
          <div className="flex items-center gap-2 mb-5">
            <svg className="w-5 h-5 text-[#1a5fa8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h1 className="text-[18px] font-bold text-[#1a1a2e]">全链服务</h1>
          </div>

          {/* ── 关联商品信息 ── */}
          <div className="bg-white border border-[#e8edf5] rounded mb-4">
            <div className="px-4 py-2.5 border-b border-[#e8edf5] flex items-center gap-2">
              <span className="text-[12px] text-[#1a5fa8]">@</span>
              <span className="text-[13px] font-semibold text-[#1a1a2e]">关联商品信息</span>
            </div>
            <div className="grid grid-cols-4 divide-x divide-[#f0f3f8] text-[12px]">
              {[
                { label: "关联商品订单", value: LINKED_PRODUCT.orderId },
                { label: "商品名称", value: LINKED_PRODUCT.name },
                { label: "商品规格", value: LINKED_PRODUCT.spec },
                { label: "总重量", value: LINKED_PRODUCT.totalWeight },
              ].map(f => (
                <div key={f.label} className="px-4 py-3">
                  <div className="text-[#999] mb-1">{f.label}</div>
                  <div className="text-[#333] font-medium">{f.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 一、选择服务类型 ── */}
          <div className="bg-white border border-[#e8edf5] rounded mb-4">
            <div className="px-4 py-3 border-b border-[#e8edf5]">
              <h2 className="text-[13px] font-bold text-[#333]">
                <span className="text-[#1a5fa8] mr-1">@</span>
                一、选择服务类型（至少选择一项）
              </h2>
            </div>
            <div className="p-4 grid grid-cols-3 gap-3">
              {SERVICE_PROVIDERS.map(prov => (
                <label key={prov.id}
                  className={`flex items-start gap-2.5 p-3 rounded border-2 cursor-pointer transition-colors ${selectedProvider === prov.id ? "border-[#1a5fa8] bg-[#f0f6ff]" : "border-[#dde3ec] hover:border-[#1a5fa8]/40"}`}
                  onClick={() => setSelectedProvider(prov.id)}>
                  <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selectedProvider === prov.id ? "border-[#1a5fa8]" : "border-[#bbb]"}`}>
                    {selectedProvider === prov.id && <div className="w-2 h-2 rounded-full bg-[#1a5fa8]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold text-[#1a1a2e] mb-1">{prov.name}</div>
                    <div className="text-[11px] text-[#666] space-y-0.5">
                      <div>地点：{prov.region}</div>
                      <div>适用：{prov.types}</div>
                      <div>运力/容量：{prov.capacity}</div>
                      <div>计费：{prov.price}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* ── 二、设置服务信息 ── */}
          <div className="bg-white border border-[#e8edf5] rounded mb-4">
            <div className="px-4 py-3 border-b border-[#e8edf5]">
              <h2 className="text-[13px] font-bold text-[#333]">
                <span className="text-[#1a5fa8] mr-1">@</span>
                二、设置服务信息
              </h2>
            </div>
            <div className="p-4">
              {/* Service sub-tabs */}
              <div className="flex gap-0 border-b border-[#e8edf5] mb-4">
                {([
                  { key: "logistics", label: "物流服务", icon: "🚛" },
                  { key: "warehouse", label: "仓储服务", icon: "🏭" },
                  { key: "processing", label: "加工服务", icon: "🏠" },
                ] as { key: ServiceTab; label: string; icon: string }[]).map(t => (
                  <button key={t.key} onClick={() => setActiveTab(t.key)}
                    className={`flex items-center gap-1.5 px-5 py-2.5 text-[13px] font-medium border-b-2 transition-colors ${activeTab === t.key ? "border-[#1a5fa8] text-[#1a5fa8] bg-[#f0f6ff]" : "border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>

              {/* ── 物流服务 ── */}
              {activeTab === "logistics" && (
                <div className="space-y-4">
                  {/* 运输路线 */}
                  <div>
                    <div className="text-[12px] text-[#555] mb-2 font-medium">
                      * 运输路线（不支持多点装卸）：
                    </div>
                    <div className="border border-[#e8edf5] rounded overflow-hidden">
                      <div className="grid text-[12px] bg-[#f5f7fa] font-medium text-[#555]" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                        <div className="px-3 py-2 text-center">起点（装货地址）</div>
                        <div className="px-3 py-2 text-center">终点（卸货地址）</div>
                        <div className="px-3 py-2 text-center">预估距离(km)</div>
                      </div>
                      <div className="grid border-t border-[#e8edf5]" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                        <div className="px-3 py-2 border-r border-[#e8edf5]">
                          <select value={lgForm.origin} onChange={e => setLgForm(p => ({ ...p, origin: e.target.value }))}
                            className="w-full text-[12px] focus:outline-none">
                            <option value="">选择起点</option>
                            <option value="广州市越秀区">广州市越秀区</option>
                            <option value="汕头市潮阳区">汕头市潮阳区</option>
                          </select>
                        </div>
                        <div className="px-3 py-2 border-r border-[#e8edf5]">
                          <select value={lgForm.destination} onChange={e => setLgForm(p => ({ ...p, destination: e.target.value }))}
                            className="w-full text-[12px] focus:outline-none">
                            <option value="">选择终点</option>
                            <option value="广州市天河区">广州市天河区</option>
                            <option value="深圳市南山区">深圳市南山区</option>
                          </select>
                        </div>
                        <div className="px-3 py-2 text-center text-[12px] text-[#333]">2250</div>
                      </div>
                    </div>
                  </div>

                  {/* 运力选择 */}
                  <div>
                    <div className="text-[12px] text-[#555] mb-2 font-medium flex items-center gap-1">
                      * 运力选择
                      <span className="text-[#e8831a] font-normal">（系统已根据您的货物重量（100吨）推荐以下运力方案，您可手动调整）：</span>
                    </div>
                    <div className="border border-[#e8edf5] rounded overflow-hidden">
                      <div className="grid text-[12px] bg-[#f5f7fa] font-medium text-[#555]"
                        style={{ gridTemplateColumns: "90px 180px 80px 140px 160px 90px 90px" }}>
                        {["运输方式", "车型 / 船型", "单价", "车辆 / 船数量", "时效要求", "商家优惠(元)", "平台优惠(元)"].map(h => (
                          <div key={h} className="px-2 py-2 text-center">{h}</div>
                        ))}
                      </div>
                      <div className="grid items-center border-t border-[#e8edf5] text-[12px]"
                        style={{ gridTemplateColumns: "90px 180px 80px 140px 160px 90px 90px" }}>
                        {/* 运输方式 */}
                        <div className="px-2 py-2 border-r border-[#e8edf5]">
                          <div className="relative">
                            <select value={lgForm.transportMode}
                              onChange={e => setLgForm(p => ({ ...p, transportMode: e.target.value }))}
                              className="w-full text-[12px] appearance-none pr-5 focus:outline-none">
                              {TRANSPORT_MODES.map(m => <option key={m}>{m}</option>)}
                            </select>
                            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-[#999] pointer-events-none" />
                          </div>
                        </div>
                        {/* 车型 */}
                        <div className="px-2 py-2 border-r border-[#e8edf5]">
                          <div className="relative">
                            <select value={lgForm.vehicleType}
                              onChange={e => setLgForm(p => ({ ...p, vehicleType: e.target.value }))}
                              className="w-full text-[11px] appearance-none pr-5 focus:outline-none">
                              {VEHICLE_TYPES.map(v => <option key={v}>{v}</option>)}
                            </select>
                            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-[#999] pointer-events-none" />
                          </div>
                        </div>
                        {/* 单价 */}
                        <div className="px-2 py-2 text-center border-r border-[#e8edf5]">
                          <span className="text-[#333]">{lgForm.unitPrice}元</span>
                        </div>
                        {/* 数量 */}
                        <div className="px-2 py-2 flex items-center justify-center gap-1 border-r border-[#e8edf5]">
                          <button onClick={() => setLgForm(p => ({ ...p, vehicleCount: Math.max(1, p.vehicleCount - 1) }))}
                            className="w-5 h-5 border border-[#dde3ec] rounded text-[#555] hover:border-[#1a5fa8]">−</button>
                          <span className="w-8 text-center font-semibold text-[#1a5fa8]">{lgForm.vehicleCount}</span>
                          <button onClick={() => setLgForm(p => ({ ...p, vehicleCount: p.vehicleCount + 1 }))}
                            className="w-5 h-5 border border-[#dde3ec] rounded text-[#555] hover:border-[#1a5fa8]">+</button>
                        </div>
                        {/* 时效 */}
                        <div className="px-2 py-2 border-r border-[#e8edf5]">
                          <div className="relative">
                            <select value={lgForm.timeOption}
                              onChange={e => setLgForm(p => ({ ...p, timeOption: e.target.value }))}
                              className="w-full text-[11px] appearance-none pr-5 focus:outline-none">
                              {TIME_OPTIONS.map(t => <option key={t}>{t}</option>)}
                            </select>
                            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-[#999] pointer-events-none" />
                          </div>
                        </div>
                        {/* 商家优惠 */}
                        <div className="px-2 py-2 text-center border-r border-[#e8edf5] text-[#333]">0</div>
                        {/* 平台优惠 */}
                        <div className="px-2 py-2 text-center text-[#333]">0</div>
                      </div>
                    </div>
                  </div>

                  {/* 装卸费 */}
                  <div>
                    <div className="text-[12px] text-[#555] mb-2">装卸费（可选）：</div>
                    <div className="border border-[#e8edf5] rounded overflow-hidden">
                      <div className="grid text-[12px] bg-[#f5f7fa] font-medium text-[#555]" style={{ gridTemplateColumns: "1fr 1fr 1fr 40px" }}>
                        {["单价", "总重量(吨)", "预估总价(元)", ""].map(h => (
                          <div key={h} className="px-3 py-2 text-center">{h}</div>
                        ))}
                      </div>
                      <div className="grid border-t border-[#e8edf5] items-center" style={{ gridTemplateColumns: "1fr 1fr 1fr 40px" }}>
                        <div className="px-3 py-2.5 text-center text-[12px] text-[#333]">{lgForm.loadingUnitPrice}元 / 吨</div>
                        <div className="px-3 py-2.5 text-center text-[12px] text-[#333]">{lgForm.totalWeight}</div>
                        <div className="px-3 py-2.5 text-center text-[12px] text-[#e8831a] font-semibold">{lgLoadingAmt}</div>
                        <div className="px-2 py-2.5 text-center">
                          <button className="w-5 h-5 rounded border border-[#dde3ec] flex items-center justify-center text-[#999] hover:border-[#1a5fa8]">
                            <svg viewBox="0 0 12 12" className="w-3 h-3" fill="currentColor"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 费用预估 */}
                  <div className="bg-[#fffbe6] border border-[#f5d78e] rounded p-4 text-[12px]">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
                      <div className="text-right">预估运输服务总额：<span className="font-semibold">{lgServiceAmt.toFixed(2)}元</span></div>
                      <div>预估装卸费总额：<span className="font-semibold">{lgLoadingAmt.toFixed(2)}元</span></div>
                      <div className="text-right">商家优惠：<span className="text-[#3a8c3f]">0 元</span></div>
                      <div>平台优惠：<span className="text-[#3a8c3f]">0 元</span></div>
                      <div className="col-span-2 text-right font-semibold">合计：<span className="text-[#1a1a2e]">{lgTotal.toFixed(2)}元</span></div>
                    </div>
                    <div className="mt-2 text-[#e04040]">
                      本次总金额{lgTotal.toFixed(2)}元，需支付预付款10%，应付预付款{(lgServiceAmt * 0.1).toFixed(2)}元 + 应付装卸费{lgLoadingAmt.toFixed(2)}元 =
                      <span className="font-bold"> {(lgServiceAmt * 0.1 + lgLoadingAmt).toFixed(2)}元</span>
                    </div>
                    <div className="mt-1 text-[#1a5fa8] underline cursor-pointer">根据实际运输重量/车次数量计算</div>
                  </div>

                  {/* 联系人 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <label className="text-[12px] text-[#555] shrink-0 w-[80px]"><span className="text-red-500">*</span>联系人姓名</label>
                      <input value={contactName} onChange={e => setContactName(e.target.value)}
                        placeholder="请输入"
                        className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-[12px] text-[#555] shrink-0 w-[70px]"><span className="text-red-500">*</span>联系人电话</label>
                      <input value={contactPhone} onChange={e => setContactPhone(e.target.value)}
                        placeholder="请输入手机号码"
                        className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
                    </div>
                    <div className="col-span-2 flex items-start gap-3">
                      <label className="text-[12px] text-[#555] shrink-0 w-[80px] pt-1.5">运输要求</label>
                      <textarea value={transportRemark} onChange={e => setTransportRemark(e.target.value)}
                        rows={3} placeholder="请输入"
                        className="flex-1 border border-[#dde3ec] rounded px-3 py-2 text-[12px] resize-none focus:outline-none focus:border-[#1a5fa8]" />
                    </div>
                  </div>
                </div>
              )}

              {/* ── 仓储服务 ── */}
              {activeTab === "warehouse" && (
                <div className="space-y-4 text-[13px]">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <label className="text-[12px] text-[#555] shrink-0 w-[80px]"><span className="text-red-500">*</span>仓库选择</label>
                      <select value={whForm.warehouseId} onChange={e => setWhForm(p => ({ ...p, warehouseId: e.target.value }))}
                        className="flex-1 border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]">
                        <option value="w1">广东天起冷储物流有限公司</option>
                        <option value="w2">南京百豚冷储物流有限公司</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-[12px] text-[#555] shrink-0 w-[80px]"><span className="text-red-500">*</span>仓储类型</label>
                      <select value={whForm.warehouseType} onChange={e => setWhForm(p => ({ ...p, warehouseType: e.target.value }))}
                        className="flex-1 border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]">
                        <option>常温仓</option>
                        <option>冷藏仓</option>
                        <option>冷冻仓</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-[12px] text-[#555] shrink-0 w-[80px]"><span className="text-red-500">*</span>入库时间</label>
                      <input type="date" value={whForm.startDate} onChange={e => setWhForm(p => ({ ...p, startDate: e.target.value }))}
                        className="flex-1 border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-[12px] text-[#555] shrink-0 w-[80px]"><span className="text-red-500">*</span>出库时间</label>
                      <input type="date" value={whForm.endDate} onChange={e => setWhForm(p => ({ ...p, endDate: e.target.value }))}
                        className="flex-1 border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-[12px] text-[#555] shrink-0 w-[80px]"><span className="text-red-500">*</span>存储数量(吨)</label>
                      <input type="number" value={whForm.qty} onChange={e => setWhForm(p => ({ ...p, qty: Number(e.target.value) }))}
                        className="flex-1 border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
                    </div>
                  </div>
                  <div className="bg-[#fffbe6] border border-[#f5d78e] rounded p-4 text-[12px] grid grid-cols-2 gap-y-1.5">
                    <div>仓储服务费：<span className="font-semibold text-[#e8831a]">¥{whServiceAmt.toFixed(2)}</span></div>
                    <div>仓储装卸修费：<span className="font-semibold text-[#e8831a]">¥{whRepairAmt.toFixed(2)}</span></div>
                    <div className="col-span-2 text-[#555]">仓储费用按实际库存量和天数计算</div>
                  </div>
                </div>
              )}

              {/* ── 加工服务 ── */}
              {activeTab === "processing" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <label className="text-[12px] text-[#555] shrink-0 w-[80px]"><span className="text-red-500">*</span>加工服务商</label>
                      <select value={pcForm.processorId} onChange={e => setPcForm(p => ({ ...p, processorId: e.target.value }))}
                        className="flex-1 border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]">
                        <option value="p1">广州某某加工服务商</option>
                        <option value="p2">汕头某某加工服务商</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-[12px] text-[#555] shrink-0 w-[80px]"><span className="text-red-500">*</span>加工类型</label>
                      <select value={pcForm.processType} onChange={e => setPcForm(p => ({ ...p, processType: e.target.value }))}
                        className="flex-1 border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]">
                        <option>精深加工</option>
                        <option>初级加工</option>
                        <option>定制加工</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-[12px] text-[#555] shrink-0 w-[80px]"><span className="text-red-500">*</span>加工数量(吨)</label>
                      <input type="number" value={pcForm.qty} onChange={e => setPcForm(p => ({ ...p, qty: Number(e.target.value) }))}
                        className="flex-1 border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
                    </div>
                    <div className="flex items-start gap-3">
                      <label className="text-[12px] text-[#555] shrink-0 w-[80px] pt-1.5">加工要求</label>
                      <textarea value={pcForm.remark} onChange={e => setPcForm(p => ({ ...p, remark: e.target.value }))}
                        rows={3} placeholder="请输入加工要求"
                        className="flex-1 border border-[#dde3ec] rounded px-3 py-2 text-[12px] resize-none focus:outline-none focus:border-[#1a5fa8]" />
                    </div>
                  </div>
                  <div className="bg-[#fffbe6] border border-[#f5d78e] rounded p-4 text-[12px]">
                    <div className="flex items-center gap-2 text-[#8a6a00]">
                      <Info className="w-4 h-4" />
                      加工服务费需要供应商另行报价，提交后服务商将与您联系确认价格。
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── 三、费用汇总 ── */}
          <div className="bg-white border border-[#e8edf5] rounded mb-4">
            <div className="px-4 py-3 border-b border-[#e8edf5]">
              <h2 className="text-[13px] font-bold text-[#333]">
                <span className="text-[#1a5fa8] mr-1">@</span>
                三、费用汇总
              </h2>
            </div>
            <div className="p-4">
              {/* Tips */}
              <div className="border border-[#dde3ec] rounded p-3 text-[12px] text-[#1a5fa8] space-y-1 mb-4">
                <div className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 shrink-0" />仓储费用按实际库存量和天数计算
                </div>
                <div className="pl-5 text-[#666]">运输支持多点装卸，需额外沟通</div>
                <div className="pl-5 text-[#666]">加工服务需预付定金，具体以合同为准</div>
              </div>

              {/* Cost grid */}
              <div className="grid grid-cols-4 gap-3 text-[12px]">
                {[
                  { label: "仓储服务费", value: `¥${whServiceAmt.toFixed(2)}`, colored: true },
                  { label: "运输服务费", value: `¥${lgServiceAmt.toFixed(2)}`, colored: true },
                  { label: "加工服务费", value: "待报价", colored: false },
                  { label: "仓储装卸修费", value: `¥${whRepairAmt.toFixed(2)}`, colored: true },
                  { label: "运输装卸费", value: "¥0.00", colored: true },
                  { label: "", value: "", colored: false },
                ].map((c, i) => c.label ? (
                  <div key={i} className="border border-[#e8edf5] rounded px-3 py-2.5 text-center">
                    <div className="text-[#555] mb-1">{c.label}</div>
                    <div className={c.colored ? "font-semibold text-[#e8831a]" : "text-[#999]"}>{c.value}</div>
                  </div>
                ) : <div key={i} />)}
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="sticky bottom-0 bg-white border border-[#e8edf5] rounded px-6 py-3 flex items-center justify-between shadow-lg">
            <span className="text-[12px] text-[#999]">
              商家优惠 <span className="text-[#3a8c3f]">0 元</span>，平台优惠 <span className="text-[#3a8c3f]">0 元</span>
            </span>
            <div className="flex items-center gap-5">
              <span className="text-[13px] text-[#555]">
                应付总金额：<span className="text-[#e04040] text-[20px] font-bold">¥{totalOrderAmt.toFixed(2)}</span>元
              </span>
              <button onClick={() => setSubmitted(true)}
                className="px-8 py-2.5 bg-[#1a5fa8] text-white text-[14px] font-bold rounded hover:bg-[#0d4a8a] transition-colors">
                提交订单
              </button>
            </div>
          </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
