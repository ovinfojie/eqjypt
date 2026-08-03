"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ChevronRight, Search, X, Plus, Minus } from "lucide-react"

/* ─── Types ─── */
type InfoType = "采购" | "供应"

interface InfoRow {
  id: string
  type: InfoType
  company: string
  product: string
  qty: string
  supplyStart: string
  supplyEnd: string
  delivery: string
  publishTime: string
  area: string
  price: string
}

interface SubCategory {
  name: string
  totalQty: string
  totalAmt: string
}

interface CatData {
  name: string
  totalQty: string
  totalAmt: string
  subs: SubCategory[]
  rows: InfoRow[]
}

/* ─── Mock data ─── */
const allData: Record<string, CatData> = {
  粮食: {
    name: "粮食", totalQty: "10000吨", totalAmt: "1000000万元",
    subs: [
      { name: "南晶香占", totalQty: "1200吨", totalAmt: "480万元" },
      { name: "大豆",     totalQty: "2000吨", totalAmt: "1000万元" },
      { name: "玉米",     totalQty: "3000吨", totalAmt: "600万元" },
      { name: "象牙香占", totalQty: "800吨",  totalAmt: "560万元" },
      { name: "丝苗米",   totalQty: "900吨",  totalAmt: "720万元" },
      { name: "小麦",     totalQty: "1500吨", totalAmt: "450万元" },
      { name: "花生",     totalQty: "600吨",  totalAmt: "360万元" },
    ],
    rows: [
      { id: "CG001", type: "采购", company: "广东新天润粮油有限公司",   product: "大米",     qty: "8000公斤", supplyStart: "2026-03-02", supplyEnd: "2026-03-26", delivery: "买家自提",         publishTime: "2026-04-05", area: "广州市", price: "面议" },
      { id: "XS001", type: "供应", company: "韶关某某粮油有限公司",     product: "大豆",     qty: "7000公斤", supplyStart: "2026-03-02", supplyEnd: "2026-04-26", delivery: "买家自提、卖家配送", publishTime: "2026-04-03", area: "韶关市", price: "2.80元/kg" },
      { id: "XS002", type: "供应", company: "清远某某农业有限公司",     product: "玉米",     qty: "9000公斤", supplyStart: "2026-03-02", supplyEnd: "2026-03-26", delivery: "买家自提",         publishTime: "2026-03-30", area: "清远市", price: "1.60元/kg" },
      { id: "CG002", type: "采购", company: "广东某某粮食储备有限公司", product: "大米",     qty: "6000公斤", supplyStart: "2026-03-10", supplyEnd: "2026-05-19", delivery: "买家自提",         publishTime: "2026-03-29", area: "广州市", price: "面议" },
      { id: "XS003", type: "供应", company: "揭阳某某农业发展有限公司", product: "花生",     qty: "5000公斤", supplyStart: "2026-03-08", supplyEnd: "2026-04-18", delivery: "卖家配送",         publishTime: "2026-03-28", area: "揭阳市", price: "7.20元/kg" },
      { id: "CG003", type: "采购", company: "广东天富冷链物流有限公司", product: "象牙香占", qty: "3000公斤", supplyStart: "2026-04-01", supplyEnd: "2026-06-30", delivery: "卖家配送",         publishTime: "2026-03-25", area: "广州市", price: "面议" },
      { id: "XS004", type: "供应", company: "梅州某某粮油合作社",       product: "丝苗米",   qty: "4000公斤", supplyStart: "2026-04-10", supplyEnd: "2026-05-10", delivery: "买家自提、卖家配送", publishTime: "2026-03-22", area: "梅州市", price: "4.30元/kg" },
      { id: "XS005", type: "供应", company: "惠州某某农业有限公司",     product: "小麦",     qty: "12000公斤",supplyStart: "2026-04-15", supplyEnd: "2026-07-15", delivery: "买家自提",         publishTime: "2026-03-20", area: "惠州市", price: "2.30元/kg" },
      { id: "CG004", type: "采购", company: "中信供销润农农产品有限公司",product: "玉米",    qty: "20000公斤",supplyStart: "2026-05-01", supplyEnd: "2026-08-01", delivery: "买家自提",         publishTime: "2026-03-18", area: "广州市", price: "面议" },
      { id: "XS006", type: "供应", company: "肇庆某某农业科技有限公司", product: "大豆",     qty: "8000公斤", supplyStart: "2026-05-10", supplyEnd: "2026-06-10", delivery: "卖家配送",         publishTime: "2026-03-15", area: "肇庆市", price: "3.10元/kg" },
      { id: "CG005", type: "采购", company: "广东天润米业有限公司",     product: "南晶香占", qty: "5000公斤", supplyStart: "2026-06-01", supplyEnd: "2026-09-01", delivery: "卖家配送",         publishTime: "2026-03-12", area: "广州市", price: "面议" },
      { id: "XS007", type: "供应", company: "云浮某某农业合作社",       product: "花生",     qty: "3500公斤", supplyStart: "2026-06-15", supplyEnd: "2026-07-15", delivery: "买家自提",         publishTime: "2026-03-10", area: "云浮市", price: "6.80元/kg" },
    ],
  },
  特色农产品: {
    name: "特色农产品", totalQty: "8000吨", totalAmt: "50000万元",
    subs: [
      { name: "荔枝",   totalQty: "500吨",  totalAmt: "2500万元" },
      { name: "龙眼",   totalQty: "800吨",  totalAmt: "2400万元" },
      { name: "菠萝",   totalQty: "1200吨", totalAmt: "1800万元" },
      { name: "沙糖桔", totalQty: "2000吨", totalAmt: "4000万元" },
      { name: "草莓",   totalQty: "300吨",  totalAmt: "3000万元" },
      { name: "芒果",   totalQty: "600吨",  totalAmt: "1800万元" },
    ],
    rows: [
      { id: "CG010", type: "采购", company: "广东新天润有限公司",       product: "荔枝",   qty: "500公斤",  supplyStart: "2026-06-01", supplyEnd: "2026-07-15", delivery: "卖家配送",         publishTime: "2026-04-05", area: "广州市", price: "面议" },
      { id: "XS010", type: "供应", company: "茂名某某荔枝种植合作社",   product: "荔枝",   qty: "3000公斤", supplyStart: "2026-06-01", supplyEnd: "2026-07-10", delivery: "买家自提、卖家配送", publishTime: "2026-04-03", area: "茂名市", price: "8.50元/kg" },
      { id: "XS011", type: "供应", company: "汕头某某农业科技有限公司", product: "菠萝",   qty: "5000公斤", supplyStart: "2026-04-01", supplyEnd: "2026-05-31", delivery: "卖家配送",         publishTime: "2026-03-30", area: "汕头市", price: "2.20元/kg" },
      { id: "CG011", type: "采购", company: "广州某某果品贸易有限公司", product: "沙糖桔", qty: "8000公斤", supplyStart: "2026-11-01", supplyEnd: "2027-01-31", delivery: "买家自提",         publishTime: "2026-03-29", area: "广州市", price: "面议" },
      { id: "XS012", type: "供应", company: "高州市社村合作农业发展有限公司", product: "草莓", qty: "1000公斤",supplyStart: "2026-12-01", supplyEnd: "2027-02-28", delivery: "买家自提、卖家配送", publishTime: "2026-03-28", area: "茂名市", price: "12.00元/kg" },
      { id: "XS013", type: "供应", company: "番禺某某水果配送有限公司", product: "龙眼",   qty: "2000公斤", supplyStart: "2026-07-01", supplyEnd: "2026-08-15", delivery: "卖家配送",         publishTime: "2026-03-25", area: "广州市", price: "5.60元/kg" },
      { id: "CG012", type: "采购", company: "深圳某某超市采购中心",     product: "芒果",   qty: "3000公斤", supplyStart: "2026-05-01", supplyEnd: "2026-06-30", delivery: "卖家配送",         publishTime: "2026-03-22", area: "深圳市", price: "面议" },
      { id: "XS014", type: "供应", company: "阳江某某农业有限公司",     product: "芒果",   qty: "4500公斤", supplyStart: "2026-05-01", supplyEnd: "2026-06-15", delivery: "买家自提",         publishTime: "2026-03-20", area: "阳江市", price: "4.80元/kg" },
    ],
  },
  农资: {
    name: "农资", totalQty: "5000吨", totalAmt: "8000万元",
    subs: [
      { name: "BB肥",   totalQty: "800吨",  totalAmt: "1200万元" },
      { name: "复合肥", totalQty: "1200吨", totalAmt: "1800万元" },
      { name: "有机肥", totalQty: "1000吨", totalAmt: "2000万元" },
      { name: "氮肥",   totalQty: "600吨",  totalAmt: "600万元" },
      { name: "钾肥",   totalQty: "400吨",  totalAmt: "600万元" },
    ],
    rows: [
      { id: "CG020", type: "采购", company: "广东新天润有限公司",         product: "BB肥",   qty: "8000公斤",  supplyStart: "2026-03-02", supplyEnd: "2026-03-26", delivery: "买家自提",         publishTime: "2026-04-05", area: "广州市", price: "面议" },
      { id: "XS020", type: "供应", company: "广东某某农资有限公司",       product: "复合肥", qty: "15000公斤", supplyStart: "2026-03-02", supplyEnd: "2026-04-26", delivery: "买家自提、卖家配送", publishTime: "2026-04-03", area: "广州市", price: "2.80元/kg" },
      { id: "XS021", type: "供应", company: "佛山某某化肥销售有限公司",   product: "有机肥", qty: "20000公斤", supplyStart: "2026-03-02", supplyEnd: "2026-03-26", delivery: "买家自提",         publishTime: "2026-03-30", area: "佛山市", price: "1.20元/kg" },
      { id: "CG021", type: "采购", company: "广东某某农业集团有限公司",   product: "氮肥",   qty: "5000公斤",  supplyStart: "2026-03-10", supplyEnd: "2026-05-19", delivery: "买家自提",         publishTime: "2026-03-29", area: "广州市", price: "面议" },
      { id: "XS022", type: "供应", company: "东莞某某农化有限公司",       product: "钾肥",   qty: "8000公斤",  supplyStart: "2026-03-08", supplyEnd: "2026-04-18", delivery: "卖家配送",         publishTime: "2026-03-28", area: "东莞市", price: "3.60元/kg" },
      { id: "XS023", type: "供应", company: "中山某某肥业科技有限公司",   product: "BB肥",   qty: "10000公斤", supplyStart: "2026-04-01", supplyEnd: "2026-05-31", delivery: "买家自提、卖家配送", publishTime: "2026-03-25", area: "中山市", price: "2.50元/kg" },
      { id: "CG022", type: "采购", company: "珠海某某农业发展有限公司",   product: "复合肥", qty: "3000公斤",  supplyStart: "2026-04-15", supplyEnd: "2026-06-15", delivery: "卖家配送",         publishTime: "2026-03-22", area: "珠海市", price: "面议" },
    ],
  },
}

/* ─── 加入采购车弹窗（复用同款） ─── */
interface CartModalRow { id: string; company: string; product: string; delivery: string }
function AddToCartModal({ row, onClose }: { row: CartModalRow; onClose: () => void }) {
  const [deliveryMethod, setDeliveryMethod] = useState<"卖家配送" | "买家自提">("卖家配送")
  const [address, setAddress] = useState("")
  const [settlement, setSettlement] = useState<"建行龙存管" | "工行安心付">("建行龙存管")
  const [qty, setQty] = useState(0)
  const [added, setAdded] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-lg w-[680px] max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
          <h3 className="text-[16px] font-bold text-[#1a1a2e]">快速加入购物车</h3>
          <button onClick={onClose} className="text-[#999] hover:text-[#333]"><X className="w-5 h-5" /></button>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div>
            <div className="text-[13px] text-[#6b7c93] mb-1">{row.company}</div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[20px] font-bold text-[#1a1a2e]">{row.product}</span>
              <span className="px-2.5 py-0.5 bg-[#e8831a] text-white text-[12px] rounded font-medium">询价</span>
            </div>
            <div className="text-[13px] text-[#999]">平台严选优质农产品</div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[#555] w-[72px] shrink-0">配送方式</span>
            <div className="flex gap-2">
              {(["卖家配送", "买家自提"] as const).map(m => (
                <button key={m} onClick={() => setDeliveryMethod(m)}
                  className={`px-4 py-1.5 rounded border text-[13px] transition-colors ${deliveryMethod === m ? "border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8] font-medium" : "border-[#dde3ec] text-[#555]"}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>
          {deliveryMethod === "卖家配送" && (
            <div className="flex items-center gap-4">
              <span className="text-[13px] text-[#555] w-[72px] shrink-0">收货地址</span>
              <div className="flex-1 flex gap-2">
                <select value={address} onChange={e => setAddress(e.target.value)} className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] text-[#999]">
                  <option value="">请选择地址</option>
                  <option value="a1">广州市天河区珠江新城花城大道88号</option>
                  <option value="a2">广州市番禺区大石镇石岗路99号冷链仓储中心</option>
                </select>
                <button className="px-3 py-1.5 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded hover:bg-[#e8f4fd] shrink-0">新增</button>
              </div>
            </div>
          )}
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[#555] w-[72px] shrink-0">结算渠道</span>
            <div className="flex gap-2">
              {(["建行龙存管", "工行安心付"] as const).map(s => (
                <button key={s} onClick={() => setSettlement(s)}
                  className={`px-4 py-1.5 rounded border text-[13px] transition-colors ${settlement === s ? "border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8] font-medium" : "border-[#dde3ec] text-[#555]"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[#555] w-[72px] shrink-0">结算方式</span>
            <span className="text-[13px] text-[#333]">全款全货</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[#555] w-[72px] shrink-0">交易方式</span>
            <button className="px-4 py-1.5 rounded border border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8] text-[13px] font-medium">担保交易</button>
          </div>
          <div className="border border-[#e8edf5] rounded overflow-hidden">
            <table className="w-full">
              <thead><tr className="bg-[#f5f7fa]">
                {["规格", "价格", "预估供应量", "起批量", "数量"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[12px] text-[#666] font-semibold">{h}</th>
                ))}
              </tr></thead>
              <tbody><tr className="border-t border-[#e8edf5]">
                <td className="px-4 py-3 text-[13px] text-[#333]">斤</td>
                <td className="px-4 py-3 text-[13px] text-[#333]">1.20元</td>
                <td className="px-4 py-3 text-[13px] text-[#333]">100 斤</td>
                <td className="px-4 py-3 text-[13px] text-[#333]">1 斤</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => setQty(Math.max(0, qty - 1))} className="w-6 h-6 rounded border border-[#dde3ec] flex items-center justify-center hover:border-[#1a5fa8]"><Minus className="w-3 h-3 text-[#555]" /></button>
                    <span className="w-10 text-center text-[13px] font-medium">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="w-6 h-6 rounded border border-[#dde3ec] flex items-center justify-center hover:border-[#1a5fa8]"><Plus className="w-3 h-3 text-[#555]" /></button>
                  </div>
                </td>
              </tr></tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#e8edf5]">
          <button onClick={onClose} className="px-6 py-2 border border-[#dde3ec] text-[#555] text-[14px] rounded hover:border-[#999]">取消</button>
          <button onClick={() => { setAdded(true); setTimeout(onClose, 800) }} disabled={added}
            className="px-8 py-2 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] disabled:opacity-70">
            {added ? "已加入" : "加入购物车"}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Page ─── */
export default function ChanxiaoDuijieMorePage() {
  const params = useParams()
  const catName = decodeURIComponent(params.cat as string)
  const data = allData[catName] ?? allData["粮食"]

  const [activeSub, setActiveSub] = useState<string>("全部")
  const [filterType, setFilterType] = useState<"全部" | "仅看采购信息" | "仅看供应信息">("全部")
  const [keyword, setKeyword] = useState("")
  const [page, setPage] = useState(1)
  const [cartModalRow, setCartModalRow] = useState<CartModalRow | null>(null)
  const PAGE_SIZE = 8

  const filtered = data.rows.filter(r => {
    if (filterType === "仅看采购信息" && r.type !== "采购") return false
    if (filterType === "仅看供应信息" && r.type !== "供应") return false
    if (activeSub !== "全部" && r.product !== activeSub) return false
    if (keyword && !r.product.includes(keyword) && !r.company.includes(keyword)) return false
    return true
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#f0f4f8]">
        {/* 面包屑 */}
        <div className="bg-white border-b border-[#e8edf5]">
          <div className="max-w-[1200px] mx-auto px-4 py-2.5 flex items-center gap-1.5 text-[12px] text-[#6b7c93]">
            <Link href="/portal" className="hover:text-[#1a5fa8]">首页</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/portal/chanxiao-duijie" className="hover:text-[#1a5fa8]">产销对接</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1a1a2e]">{data.name}产销信息</span>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-4">
          {/* 标题统计 */}
          <div className="text-center pb-2">
            <h1 className="text-[22px] font-bold text-[#1a1a2e] mb-1">{data.name}</h1>
            <div className="flex items-center justify-center gap-6 text-[14px]">
              <span className="text-[#555]">总量：<span className="text-[#1a5fa8] font-bold">{data.totalQty}</span></span>
              <span className="text-[#555]">总额：<span className="text-[#1a5fa8] font-bold">{data.totalAmt}</span></span>
            </div>
          </div>

          {/* 子品种导航 */}
          <div className="bg-white rounded-lg border border-[#e8edf5] px-4 py-3">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => { setActiveSub("全部"); setPage(1) }}
                className={`px-4 py-1.5 rounded text-[13px] border transition-colors ${activeSub === "全部" ? "bg-[#1a5fa8] text-white border-[#1a5fa8]" : "border-[#dde3ec] text-[#555] hover:border-[#1a5fa8] hover:text-[#1a5fa8]"}`}
              >
                全部
              </button>
              {data.subs.map(s => (
                <button
                  key={s.name}
                  onClick={() => { setActiveSub(s.name); setPage(1) }}
                  className={`px-4 py-1.5 rounded border text-[13px] transition-colors ${activeSub === s.name ? "bg-[#1a5fa8] text-white border-[#1a5fa8]" : "border-[#dde3ec] text-[#555] hover:border-[#1a5fa8] hover:text-[#1a5fa8]"}`}
                >
                  {s.name}
                  <span className="ml-1.5 text-[11px] opacity-80">{s.totalQty}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 筛选栏 */}
          <div className="bg-white rounded-lg border border-[#e8edf5] p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {(["全部信息", "仅看采购信息", "仅看供应信息"] as const).map(t => {
                  const val = t === "全部信息" ? "全部" : t
                  return (
                    <button
                      key={t}
                      onClick={() => { setFilterType(val as typeof filterType); setPage(1) }}
                      className={`px-3 py-1.5 rounded border text-[13px] transition-colors ${filterType === val ? "border-[#1a5fa8] bg-[#e8f4fd] text-[#1a5fa8] font-medium" : "border-[#dde3ec] text-[#555] hover:border-[#1a5fa8]/60"}`}
                    >
                      {t}
                    </button>
                  )
                })}
              </div>
              <div className="flex items-center gap-2">
                <input
                  value={keyword}
                  onChange={e => { setKeyword(e.target.value); setPage(1) }}
                  placeholder="请输入商品名称"
                  className="w-[220px] border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]"
                />
                <button className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5" />搜索
                </button>
                <Link
                  href="/merchant/chanxiao/fabu-xiaoshou"
                  className="px-4 py-1.5 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded hover:bg-[#e8f4fd] transition-colors"
                >
                  + 发布{data.name}信息
                </Link>
              </div>
            </div>
          </div>

          {/* 列表主体 */}
          <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
            {/* 表头 */}
            <div className="grid grid-cols-[160px_80px_100px_90px_220px_140px_100px_160px] px-4 py-2.5 bg-[#f5f7fa] border-b border-[#e8edf5]">
              {["采购/供应方", "类型", "商品", "数量", "采购/供应时间", "配送方式", "发布时间", "操作"].map(h => (
                <span key={h} className="text-[12px] font-semibold text-[#555]">{h}</span>
              ))}
            </div>

            {paged.length === 0 ? (
              <div className="py-16 text-center text-[14px] text-[#999]">暂无相关信息</div>
            ) : (
              paged.map((row, i) => {
                const isCaigou = row.type === "采购"
                return (
                  <div
                    key={row.id}
                    className={`grid grid-cols-[160px_80px_100px_90px_220px_140px_100px_160px] px-4 py-3.5 items-center border-b border-[#f0f4f8] hover:bg-[#fafbfd] transition-colors ${i % 2 === 0 ? "" : "bg-[#fafbfd]"}`}
                  >
                    <div>
                      <div className="text-[13px] text-[#1a1a2e] font-medium leading-snug line-clamp-2">{row.company}</div>
                      <div className="text-[11px] text-[#999] mt-0.5">{row.area}</div>
                    </div>
                    <div>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold text-white ${isCaigou ? "bg-[#1a5fa8]" : "bg-[#2e9e57]"}`}>
                        {row.type}
                      </span>
                    </div>
                    <div className="text-[13px] text-[#333]">{row.product}</div>
                    <div className="text-[13px] text-[#333]">{row.qty}</div>
                    <div className="text-[12px] text-[#555]">
                      {row.supplyStart} 至<br />{row.supplyEnd}
                    </div>
                    <div className="text-[12px] text-[#555]">{row.delivery}</div>
                    <div className="text-[12px] text-[#999]">{row.publishTime}</div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        href={isCaigou ? `/portal/chanxiao-duijie/caigou-detail?id=${row.id}` : `/portal/chanxiao-duijie/xiaoshou-detail?id=${row.id}`}
                        className="text-[#1a5fa8] text-[12px] hover:underline"
                      >
                        详情
                      </Link>
                      {isCaigou ? (
                        <Link href={`/portal/chanxiao-duijie/caigou-baojia?id=${row.id}`} className="text-[#e8831a] text-[12px] hover:underline">
                          去报价
                        </Link>
                      ) : (
                        <>
                          <button
                            onClick={() => setCartModalRow({ id: row.id, company: row.company, product: row.product, delivery: row.delivery })}
                            className="text-[#1a5fa8] text-[12px] hover:underline"
                          >
                            加入采购车
                          </button>
                          <Link href={`/portal/checkout?id=${row.id}`} className="text-[#e8831a] text-[12px] hover:underline">
                            立即下单
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* 分页 */}
          <div className="flex items-center justify-between py-2">
            <span className="text-[13px] text-[#6b7c93]">共 {filtered.length} 条记录</span>
            <div className="flex items-center gap-1.5">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-3 py-1.5 border border-[#dde3ec] rounded text-[13px] text-[#555] disabled:opacity-40 hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
              >
                上一页
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-8 h-8 rounded border text-[13px] transition-colors ${page === n ? "bg-[#1a5fa8] text-white border-[#1a5fa8]" : "border-[#dde3ec] text-[#555] hover:border-[#1a5fa8] hover:text-[#1a5fa8]"}`}
                >
                  {n}
                </button>
              ))}
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 border border-[#dde3ec] rounded text-[13px] text-[#555] disabled:opacity-40 hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
              >
                下一页
              </button>
            </div>
          </div>
        </div>

        {/* 加入采购车弹窗 */}
        {cartModalRow && <AddToCartModal row={cartModalRow} onClose={() => setCartModalRow(null)} />}
      </main>
      <SiteFooter />
    </>
  )
}
