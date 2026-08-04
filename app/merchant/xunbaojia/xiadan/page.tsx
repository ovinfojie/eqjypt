"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Minus, Plus, ChevronDown, Check } from "lucide-react"

const PRODUCT = {
  name: "丝苗米",
  spec: "吨",
  unitPrice: 3000,
  qty: 5,
  freight: 0,
}

const PLATFORM_COUPONS = [
  { amount: 10, cond: "满100元可用", title: "平台全品类通用券", scope: "所有品类", goods: "全场通用，不限条件…", usable: true, selected: false },
  { amount: 8, cond: "满100元可用", title: "商户专属优惠券", scope: "粮油类", goods: "丝苗米、象牙香占…", usable: true, selected: true },
  { amount: 5, cond: "满50元可用", title: "商户专属优惠券", scope: "粮油类", goods: "丝苗米、象牙香占…", usable: true, selected: false },
  { amount: 15, cond: "满50元可用", title: "农资品类通用券", scope: "农资品类", goods: "化肥", usable: false, selected: false },
  { amount: 15, cond: "满50元可用", title: "农资品类通用券", scope: "农资品类", goods: "化肥", usable: false, selected: false },
]

const MERCHANT_COUPONS = [
  { amount: 10, cond: "满100元可用", title: "平台全品类通用券", scope: "所有品类", goods: "全场通用，不限条件…", usable: true, selected: false },
  { amount: 8, cond: "满100元可用", title: "商户专属优惠券", scope: "粮油类", goods: "丝苗米、象牙香占…", usable: true, selected: true },
  { amount: 5, cond: "满50元可用", title: "商户专属优惠券", scope: "粮油类", goods: "丝苗米、象牙香占…", usable: true, selected: false },
  { amount: 15, cond: "满50元可用", title: "农资品类通用券", scope: "农资品类", goods: "化肥", usable: false, selected: false },
  { amount: 15, cond: "满50元可用", title: "农资品类通用券", scope: "农资品类", goods: "化肥", usable: false, selected: false },
]

function CouponCard({ c, accent }: { c: (typeof PLATFORM_COUPONS)[number]; accent: "platform" | "merchant" }) {
  const active = c.usable
  const tagColor = accent === "platform" ? "#e04040" : "#e8831a"
  return (
    <div className={`relative rounded overflow-hidden border ${active ? "border-[#1a5fa8]/30" : "border-[#e2e2e2]"}`}>
      {/* 角标 */}
      <div className="absolute right-0 top-0 px-2 py-0.5 text-[10px] text-white" style={{ background: active ? tagColor : "#c4c4c4" }}>
        {accent === "platform" ? "平台优惠" : "商家优惠"}
      </div>
      <div className={`px-3 pt-4 pb-2 ${active ? "bg-[#1a5fa8] text-white" : "bg-[#eee] text-[#aaa]"}`}>
        <div className="text-[22px] font-bold leading-none">¥ {c.amount}</div>
        <div className="text-[11px] mt-1 opacity-90">{c.cond}</div>
        <div className="text-[9px] mt-2 opacity-70">有效期至：2026-06-01 20：42：12</div>
      </div>
      <div className="px-3 py-2 bg-white text-[11px] text-[#666] relative">
        <div className="font-medium text-[#333] text-[12px]">{c.title}</div>
        <div className="mt-1">适用品类：{c.scope}</div>
        <div>可用商品：{c.goods}</div>
        <div className="absolute right-2 bottom-2">
          {c.selected
            ? <div className="w-5 h-5 rounded-full bg-[#1a5fa8] flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>
            : <div className={`w-5 h-5 rounded-full border-2 ${active ? "border-[#1a5fa8]" : "border-[#ccc]"}`} />}
        </div>
      </div>
    </div>
  )
}

export default function XiadanPage() {
  const router = useRouter()
  const [qty, setQty] = useState(PRODUCT.qty)
  const [delivery, setDelivery] = useState<"seller" | "buyer">("seller")
  const [payChannel, setPayChannel] = useState("微信支付")
  const [settlement, setSettlement] = useState("建行龙存管")
  const [useCoupon, setUseCoupon] = useState(true)
  const [usePoints, setUsePoints] = useState(true)

  const goodsAmount = PRODUCT.unitPrice * qty
  const freight = PRODUCT.freight
  const merchantDiscount = 8
  const platformDiscount = 10
  const pointsDiscount = 10
  const orderTotal = goodsAmount
  const prepayRatio = 0.1
  const payable = Math.round(orderTotal * prepayRatio)

  const label = "text-[13px] font-medium text-[#333] shrink-0"
  const req = <span className="text-red-500 mr-1">*</span>

  return (
    <div className="max-w-[1180px]">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-[13px] text-[#666] hover:text-[#1a5fa8] mb-4">
        <ChevronLeft className="w-4 h-4" /> 返回
      </button>

      {/* 商品信息 */}
      <div className="bg-white rounded-lg border border-[#dde3ec] overflow-hidden mb-4">
        <div className="px-5 py-3 border-b border-[#e8edf5]">
          <h3 className="text-[15px] font-bold text-[#1a5fa8] border-l-4 border-[#1a5fa8] pl-2">商品信息</h3>
        </div>
        <div className="bg-[#f5f7fa] px-5 py-2.5 text-[13px] text-[#444] flex gap-8">
          <span>买方：平远新供销天润粮油有限公司(粮油业务部)</span>
          <span>卖方：南雄市社村合作农业发展有限公司(南雄市社村合作农业发展有限公司)</span>
        </div>
        <table className="w-full text-[13px]">
          <thead className="bg-[#fafbfc] text-[#666]">
            <tr>
              {["商品", "报价单价(元)", "采购数量(单位)", "金额(元)", "运费(元)"].map((h, i) => (
                <th key={h} className={`px-5 py-2.5 font-semibold ${i === 0 ? "text-left" : "text-center"}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-[#e8edf5]">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded bg-[#f0ede4] border border-[#e8edf5] flex items-center justify-center text-[10px] text-[#c4a86a]">丝苗米</div>
                  <div>
                    <div className="font-medium text-[#1a1a2e]">{PRODUCT.name}</div>
                    <div className="text-[12px] text-[#999]">规格：{PRODUCT.spec}</div>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 text-center text-[#1a1a2e]">{PRODUCT.unitPrice.toFixed(2)}</td>
              <td className="px-5 py-4">
                <div className="flex items-center justify-center gap-1.5">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-7 h-7 border border-[#dde3ec] rounded flex items-center justify-center hover:border-[#1a5fa8] text-[#555]"><Minus className="w-3 h-3" /></button>
                  <input value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value) || 1))} className="w-14 h-7 border border-[#dde3ec] rounded text-center text-[13px] outline-none focus:border-[#1a5fa8]" />
                  <button onClick={() => setQty(qty + 1)} className="w-7 h-7 border border-[#dde3ec] rounded flex items-center justify-center hover:border-[#1a5fa8] text-[#555]"><Plus className="w-3 h-3" /></button>
                  <span className="text-[#999] ml-1">吨</span>
                </div>
              </td>
              <td className="px-5 py-4 text-center text-[#1a1a2e]">{goodsAmount.toFixed(2)}</td>
              <td className="px-5 py-4 text-center text-[#1a1a2e]">{freight.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <div className="px-5 py-3 text-[13px] text-[#666] text-right border-t border-[#e8edf5]">
          商品种类：<b className="text-[#1a5fa8]">1</b> 种，数量总计：<b className="text-[#1a5fa8]">{qty}</b> 吨，商品总重量：<b className="text-[#1a5fa8]">{(qty * 1000).toFixed(2)}</b> kg，总体积：<b className="text-[#1a5fa8]">0</b> m³
        </div>
      </div>

      {/* 订单信息表单 */}
      <div className="bg-white rounded-lg border border-[#dde3ec] p-5 mb-4 space-y-5">
        {/* 给卖方留言 */}
        <div className="flex gap-3">
          <label className={`${label} w-[90px]`}>给卖方留言：</label>
          <textarea rows={3} maxLength={200} placeholder="选填，最多200字" className="flex-1 border border-[#dde3ec] rounded px-3 py-2 text-[13px] outline-none focus:border-[#1a5fa8] resize-none" />
        </div>
        {/* 收货计划 */}
        <div className="flex items-center gap-3">
          <label className={`${label} w-[90px]`}>{req}收货计划</label>
          <div className="flex items-center gap-2">
            <input placeholder="选择开始日期" className="w-[180px] h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
            <span className="text-[#999]">至</span>
            <input placeholder="选择结束日期" className="w-[180px] h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
          </div>
        </div>
        {/* 配送方式 + 收货地址 */}
        <div className="flex items-center gap-3">
          <label className={`${label} w-[90px]`}>{req}配送方式</label>
          <div className="flex gap-2">
            {([["seller", "卖家配送"], ["buyer", "买家自提"]] as const).map(([k, l]) => (
              <button key={k} onClick={() => setDelivery(k)} className={`px-5 py-1.5 rounded border text-[13px] transition-colors ${delivery === k ? "border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8] font-medium" : "border-[#dde3ec] text-[#555] hover:border-[#1a5fa8]/60"}`}>{l}</button>
            ))}
          </div>
          {delivery === "seller" && (
            <>
              <label className={`${label} ml-6`}>{req}收货地址</label>
              <div className="relative w-[360px]">
                <select className="w-full h-9 border border-[#dde3ec] rounded px-3 pr-8 text-[13px] outline-none focus:border-[#1a5fa8] appearance-none bg-white">
                  <option>广东省广州市越秀区大东街道菜园东路78号　陈先生　17878907890</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999] pointer-events-none" />
              </div>
              <button className="text-[13px] text-[#1a5fa8] hover:underline">编辑</button>
              <button className="text-[13px] text-[#1a5fa8] hover:underline">新增</button>
            </>
          )}
        </div>
        {/* 支付渠道 + 结算渠道 + 交易模式 */}
        <div className="flex items-center gap-3 flex-wrap">
          <label className={`${label} w-[90px]`}>{req}支付渠道</label>
          <div className="flex gap-2">
            {["微信支付", "支付宝", "线下支付"].map(m => (
              <button key={m} onClick={() => setPayChannel(m)} className={`px-5 py-1.5 rounded border text-[13px] transition-colors ${payChannel === m ? "border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8] font-medium" : "border-[#dde3ec] text-[#555] hover:border-[#1a5fa8]/60"}`}>{m}</button>
            ))}
          </div>
          <label className={`${label} ml-6`}>{req}结算渠道</label>
          <div className="flex gap-2">
            {["建行龙存管", "工行安心付"].map(m => (
              <button key={m} onClick={() => setSettlement(m)} className={`px-5 py-1.5 rounded border text-[13px] transition-colors ${settlement === m ? "border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8] font-medium" : "border-[#dde3ec] text-[#555] hover:border-[#1a5fa8]/60"}`}>{m}</button>
            ))}
          </div>
          <label className={`${label} ml-6`}>{req}交易模式</label>
          <span className="px-5 py-1.5 rounded border border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8] text-[13px] font-medium">非担保交易</span>
        </div>
      </div>

      {/* 买方联系人信息 */}
      <div className="bg-white rounded-lg border border-[#dde3ec] p-5 mb-4">
        <h3 className="text-[15px] font-bold text-[#1a5fa8] border-l-4 border-[#1a5fa8] pl-2 mb-4">买方联系人信息</h3>
        <div className="flex gap-10">
          <div className="flex items-center gap-3">
            <label className={label}>{req}联系人姓名</label>
            <input defaultValue="张悦" className="w-[240px] h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
          </div>
          <div className="flex items-center gap-3">
            <label className={label}>{req}联系人电话</label>
            <input defaultValue="15527522832" className="w-[240px] h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
          </div>
        </div>
      </div>

      {/* 发票信息 */}
      <div className="bg-white rounded-lg border border-[#dde3ec] p-5 mb-4">
        <h3 className="text-[15px] font-bold text-[#1a5fa8] border-l-4 border-[#1a5fa8] pl-2 mb-4">发票信息</h3>
        <div className="flex items-center gap-3">
          <label className={label}>开票信息</label>
          <div className="relative w-[280px]">
            <select className="w-full h-9 border border-[#dde3ec] rounded px-3 pr-8 text-[13px] outline-none focus:border-[#1a5fa8] appearance-none bg-white text-[#999]">
              <option>请选择</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999] pointer-events-none" />
          </div>
          <button className="text-[13px] text-[#1a5fa8] hover:underline">新建</button>
        </div>
      </div>

      {/* 合同信息 */}
      <div className="bg-white rounded-lg border border-[#dde3ec] p-5 mb-4">
        <h3 className="text-[15px] font-bold text-[#1a5fa8] border-l-4 border-[#1a5fa8] pl-2 mb-4">合同信息</h3>
        <div className="flex items-center gap-3 mb-4">
          <label className={label}>选择合同模板</label>
          <div className="relative w-[280px]">
            <select className="w-full h-9 border border-[#dde3ec] rounded px-3 pr-8 text-[13px] outline-none focus:border-[#1a5fa8] appearance-none bg-white">
              <option>2026年粮食采购合同模板</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999] pointer-events-none" />
          </div>
          <button className="text-[13px] text-[#1a5fa8] hover:underline">新建</button>
        </div>
        <div className="flex items-center gap-4">
          <label className={label}>合同预览</label>
          <div className="w-[300px] h-[110px] border border-[#dde3ec] rounded bg-[#fafbfc] flex items-center justify-center text-[#ccc] text-[12px]">合同预览</div>
          <div className="flex flex-col gap-2">
            <button className="px-5 py-1.5 border border-[#dde3ec] rounded text-[13px] text-[#1a5fa8] hover:border-[#1a5fa8]">编辑</button>
            <button className="px-5 py-1.5 border border-[#dde3ec] rounded text-[13px] text-[#1a5fa8] hover:border-[#1a5fa8]">签章</button>
          </div>
        </div>
      </div>

      {/* 使用优惠券/积分 */}
      <div className="bg-white rounded-lg border border-[#dde3ec] p-5 mb-4">
        <h3 className="text-[15px] font-bold text-[#1a5fa8] border-l-4 border-[#1a5fa8] pl-2 mb-4">使用优惠券/积分</h3>
        <label className="flex items-center gap-2 text-[13px] text-[#333] mb-4 cursor-pointer">
          <input type="checkbox" checked={useCoupon} onChange={e => setUseCoupon(e.target.checked)} className="accent-[#1a5fa8]" /> 使用优惠券
        </label>
        {useCoupon && (
          <div className="border border-[#dde3ec] rounded p-4 space-y-4">
            <div>
              <div className="text-[13px] font-medium text-[#333] mb-2">平台优惠券</div>
              <div className="flex gap-3 items-start">
                {PLATFORM_COUPONS.map((c, i) => <div key={i} className="w-[200px]"><CouponCard c={c} accent="platform" /></div>)}
                <button className="text-[12px] text-[#1a5fa8] shrink-0 self-end pb-2">展开更多 ∨</button>
              </div>
            </div>
            <div>
              <div className="text-[13px] font-medium text-[#333] mb-2">商户优惠券</div>
              <div className="flex gap-3 items-start">
                {MERCHANT_COUPONS.map((c, i) => <div key={i} className="w-[200px]"><CouponCard c={c} accent="merchant" /></div>)}
                <button className="text-[12px] text-[#1a5fa8] shrink-0 self-end pb-2">展开更多 ∨</button>
              </div>
            </div>
          </div>
        )}
        <div className="mt-4">
          <label className="flex items-center gap-2 text-[13px] text-[#333] mb-2 cursor-pointer">
            <input type="checkbox" checked={usePoints} onChange={e => setUsePoints(e.target.checked)} className="accent-[#1a5fa8]" />
            使用积分　<span className="text-[#999]">当前账户共有 <b className="text-[#1a5fa8]">1000000</b> 平台积分，80000 商户积分</span>
          </label>
          {usePoints && (
            <div className="text-[13px] text-[#666] pl-6 space-y-1">
              <div className="flex items-center gap-2">
                使用 <input defaultValue="10000" className="w-24 h-8 border border-[#dde3ec] rounded px-2 text-[13px] outline-none focus:border-[#1a5fa8]" /> 平台积分，
                使用 <input defaultValue="60" className="w-20 h-8 border border-[#dde3ec] rounded px-2 text-[13px] outline-none focus:border-[#1a5fa8]" /> 商户积分　共抵扣 <span className="text-[#e04040] font-medium">¥10.00</span>
              </div>
              <div className="text-[12px] text-[#999]">该订单最多可用 1000 平台积分，600 商户积分</div>
            </div>
          )}
        </div>
      </div>

      {/* 总计 */}
      <div className="bg-[#fdf0f0] border border-[#f3d0d0] rounded-lg p-5 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-[15px] font-bold text-[#1a1a2e] mb-2">总计</div>
            <div className="text-[13px] text-[#666]">
              商品种类：<b className="text-[#1a5fa8]">1</b> 种，数量总计：<b className="text-[#1a5fa8]">{qty}</b> 吨，商品总重量：<b className="text-[#1a5fa8]">{(qty * 1000).toFixed(2)}</b> kg，总体积：<b className="text-[#1a5fa8]">0</b> m³
            </div>
          </div>
          <div className="text-[13px] text-[#666] space-y-1.5 text-right">
            <div>商品总金额：¥{goodsAmount.toFixed(2)}</div>
            <div>+ 运费总计：¥{freight.toFixed(2)}</div>
            <div>- 商家优惠：¥{merchantDiscount.toFixed(2)}</div>
            <div>- 平台优惠：¥{platformDiscount.toFixed(2)}</div>
            <div>- 积分减免：¥{pointsDiscount.toFixed(2)}</div>
            <div>= 订单总金额：<b className="text-[#1a1a2e]">¥{orderTotal.toFixed(2)}</b></div>
            <div className="text-[#e04040]">本次需支付预付款 {prepayRatio * 100}%，本次应付总额：<b>¥{payable.toFixed(2)}</b></div>
          </div>
        </div>
      </div>

      {/* 底部提交 */}
      <div className="bg-white rounded-lg border border-[#dde3ec] px-5 py-4 flex items-center justify-end gap-6 sticky bottom-0">
        <span className="text-[14px] text-[#666]">应付总金额：<span className="text-[#e04040] text-[20px] font-bold">¥{payable.toFixed(2)}</span></span>
        <button onClick={() => router.push("/merchant/dingdan-nongye/order-mgmt/wo-caigou")} className="px-10 py-2.5 bg-[#1a5fa8] text-white text-[15px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors">确认提交订单</button>
      </div>
    </div>
  )
}
