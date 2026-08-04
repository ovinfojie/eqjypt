"use client"

import { useState } from "react"
import { Search, Download, X, ChevronLeft, ChevronRight } from "lucide-react"

const STATUS_TABS = ["全部", "待卖方确认", "待付预付款", "待发货", "待收货", "已完成/已取消"]

const ORDERS = [
  { id: "2434059405460956", buyer: "广州番禺供销农产品配送有限公司", goods: "丝苗米、食用油 等3种", amt: 11000.00, phone: "17878907890", time: "2026-01-01 16:18:33", planTime: "2026-01-08 至 2026-02-11", status: "已完成" },
  { id: "2434059405460957", buyer: "广州番禺供销农产品配送有限公司", goods: "土豆、面条 等10种", amt: 21000.00, phone: "17878907891", time: "2026-02-01 15:28:36", planTime: "2026-02-27 至 2026-03-18", status: "待发货" },
  { id: "2434059405460958", buyer: "广州番禺供销农产品配送有限公司", goods: "有机红富士、食用油 等5种", amt: 68000.00, phone: "17878907892", time: "2026-02-08 15:28:36", planTime: "2026-02-18 至 2026-02-28", status: "已完成" },
]

/* ── 集采统单弹窗 ── */
function TongdanModal({ onClose }: { onClose: () => void }) {
  const [viewMode, setViewMode] = useState<"summary"|"raw">("summary")
  const [needProxy, setNeedProxy] = useState(true)

  const SKU_DATA = [
    { sjSku: "sjpt-sku-102032", mainSku: "zsu-sku-822323", name: "某某牌花生油",  category: "粮油米面/食用油/花生油", spec: "4kg/瓶",  qty: "2008瓶", avgPrice: "31.10", amt: "102323.12", orders: 45 },
    { sjSku: "sjpt-sku-102033", mainSku: "zsu-sku-822324", name: "某某牌玉米油",  category: "粮油米面/食用油/玉米油", spec: "4kg/瓶",  qty: "1001瓶", avgPrice: "23.60", amt: "82324.00",  orders: 21 },
    { sjSku: "sjpt-sku-102034", mainSku: "zsu-sku-822325", name: "有机红富士",    category: "生鲜/水果/苹果",        spec: "10kg/箱", qty: "109箱",  avgPrice: "31.10", amt: "102323.12", orders: 18 },
    { sjSku: "sjpt-sku-102035", mainSku: "zsu-sku-822326", name: "土鸡蛋",        category: "禽畜肉蛋/蛋类/鸡蛋",    spec: "10kg/盒", qty: "201盒",  avgPrice: "31.10", amt: "102323.12", orders: 87 },
    { sjSku: "sjpt-sku-102036", mainSku: "zsu-sku-822327", name: "新鲜牛腩",      category: "禽畜肉蛋/肉类/牛肉",    spec: "500g/份", qty: "300份",  avgPrice: "31.10", amt: "102323.12", orders: 99 },
    { sjSku: "sjpt-sku-102037", mainSku: "zsu-sku-822328", name: "某某商品",      category: "禽畜肉蛋/肉类/牛肉",    spec: "500g/份", qty: "300份",  avgPrice: "31.10", amt: "102323.12", orders: 89 },
    { sjSku: "sjpt-sku-102038", mainSku: "zsu-sku-822329", name: "某某商品",      category: "禽畜肉蛋/肉类/牛肉",    spec: "500g/份", qty: "300份",  avgPrice: "31.10", amt: "102323.12", orders: 19 },
    { sjSku: "sjpt-sku-102039", mainSku: "zsu-sku-822320", name: "某某商品",      category: "禽畜肉蛋/肉类/牛肉",    spec: "500g/份", qty: "300份",  avgPrice: "31.10", amt: "102323.12", orders: 78 },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 overflow-y-auto py-6">
      <div className="bg-white rounded-lg shadow-2xl w-[900px] mx-auto" onClick={e => e.stopPropagation()}>
        {/* 标题 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
          <h2 className="text-[18px] font-bold text-[#1a1a2e]">集采统单</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-[#999] hover:text-[#333]" /></button>
        </div>

        <div className="px-6 py-5">
          {/* 统计卡片 */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            {[["订单数量","18单"],["商品种类","88种"],["客农户","69个"]].map(([label, val]) => (
              <div key={label} className="border border-[#e8edf5] rounded-lg p-4 text-center">
                <div className="text-[13px] text-[#999] mb-1">{label}</div>
                <div className="text-[22px] font-bold text-[#1a1a2e]">{val}</div>
              </div>
            ))}
          </div>

          {/* 视图切换 + 导出/生成 */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-4">
              <button onClick={() => setViewMode("summary")}
                className={`text-[13px] pb-1 border-b-2 transition-colors ${viewMode==="summary"?"border-[#1a5fa8] text-[#1a5fa8] font-semibold":"border-transparent text-[#666]"}`}>
                按商品汇总
              </button>
              <button onClick={() => setViewMode("raw")}
                className={`text-[13px] pb-1 border-b-2 transition-colors ${viewMode==="raw"?"border-[#1a5fa8] text-[#1a5fa8] font-semibold":"border-transparent text-[#666]"}`}>
                原始订单
              </button>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-[#1a5fa8] text-[#1a5fa8] text-[12px] rounded hover:bg-[#e8f4fd]">导出Excel</button>
              <button className="px-3 py-1.5 bg-[#1a5fa8] text-white text-[12px] rounded hover:bg-[#0d4a8a]">生成采购单</button>
            </div>
          </div>

          {/* SKU 汇总表格 */}
          <div className="border border-[#e8edf5] rounded overflow-hidden mb-5">
            <table className="w-full text-[12px]">
              <thead className="bg-[#f5f7fa]">
                <tr>{["平台SKU编码","主数据SKU编码","商品名称","分类","规格","数量(单位)","均价(元)","金额(元)","订单数"].map(h=>(
                  <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#666]">{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {SKU_DATA.map((row,i) => (
                  <tr key={i} className="border-t border-[#e8edf5] hover:bg-[#fafbfc]">
                    <td className="px-3 py-2.5 text-[#555]">{row.sjSku}</td>
                    <td className="px-3 py-2.5 text-[#555]">{row.mainSku}</td>
                    <td className="px-3 py-2.5 text-[#1a1a2e] font-medium">{row.name}</td>
                    <td className="px-3 py-2.5 text-[#555]">{row.category}</td>
                    <td className="px-3 py-2.5 text-[#555]">{row.spec}</td>
                    <td className="px-3 py-2.5 text-[#1a1a2e]">{row.qty}</td>
                    <td className="px-3 py-2.5 text-[#1a1a2e]">{row.avgPrice}</td>
                    <td className="px-3 py-2.5 text-[#1a1a2e]">{row.amt}</td>
                    <td className="px-3 py-2.5 text-[#1a1a2e]">{row.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* 分页 */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-[#e8edf5] bg-[#fafbfc]">
              <span className="text-[12px] text-[#999]">共 24 条</span>
              <div className="flex items-center gap-1">
                <select className="border border-[#dde3ec] rounded px-2 py-1 text-[12px]"><option>10条/页</option><option>20条/页</option></select>
                <button className="w-7 h-7 flex items-center justify-center border border-[#dde3ec] rounded hover:border-[#1a5fa8] text-[#555]"><ChevronLeft className="w-3.5 h-3.5" /></button>
                <button className="w-7 h-7 flex items-center justify-center bg-[#1a5fa8] text-white rounded text-[12px] font-medium">1</button>
                <button className="w-7 h-7 flex items-center justify-center border border-[#dde3ec] rounded hover:border-[#1a5fa8] text-[#555] text-[12px]">2</button>
                <button className="w-7 h-7 flex items-center justify-center border border-[#dde3ec] rounded hover:border-[#1a5fa8] text-[#555] text-[12px]">3</button>
                <button className="w-7 h-7 flex items-center justify-center border border-[#dde3ec] rounded hover:border-[#1a5fa8] text-[#555]"><ChevronRight className="w-3.5 h-3.5" /></button>
                <span className="text-[12px] text-[#999]">前往</span>
                <input type="number" defaultValue={1} className="w-10 border border-[#dde3ec] rounded px-1.5 py-1 text-[12px] text-center focus:outline-none focus:border-[#1a5fa8]" />
                <span className="text-[12px] text-[#999]">页</span>
              </div>
            </div>
          </div>

          {/* 底部表单 */}
          <div className="border border-[#e8edf5] rounded-lg p-4 space-y-3 bg-[#fafbfc]">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] font-medium"><span className="text-[#e04040]">*</span>商家：</label>
                <input defaultValue="农产品省平台" className="w-48 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] font-medium"><span className="text-[#e04040]">*</span>是否需要一件代发：</label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" checked={needProxy} onChange={() => setNeedProxy(true)} className="accent-[#1a5fa8]" />
                  <span className="text-[13px]">是</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" checked={!needProxy} onChange={() => setNeedProxy(false)} className="accent-[#1a5fa8]" />
                  <span className="text-[13px]">否</span>
                </label>
              </div>
              {needProxy && (
                <div className="flex items-center gap-2">
                  <label className="text-[13px] text-[#555]">收货地址：</label>
                  <select className="w-52 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] text-[#999] focus:outline-none focus:border-[#1a5fa8]">
                    <option value="">请选择收货地址</option>
                  </select>
                  <button className="px-3 py-1.5 border border-[#1a5fa8] text-[#1a5fa8] text-[12px] rounded hover:bg-[#e8f4fd]">新增</button>
                </div>
              )}
            </div>
            {needProxy && (
              <div className="text-[12px] text-[#6b7c93] -mt-1 ml-2 flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-[#1a5fa8] text-white flex items-center justify-center text-[10px] shrink-0">i</span>
                一件代发：由上游直发至订单收货地址
              </div>
            )}
            <div className="flex items-center gap-2">
              <label className="text-[13px] text-[#555] font-medium"><span className="text-[#e04040]">*</span>收货计划：</label>
              <div className="flex items-center gap-2">
                <input type="date" className="border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                <span className="text-[#999]">→</span>
                <input type="date" className="border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              </div>
            </div>
            <div className="flex items-start gap-2">
              <label className="text-[13px] text-[#555] shrink-0 pt-1.5">留言：</label>
              <textarea rows={3} maxLength={200} placeholder="选填，最多200字"
                className="flex-1 border border-[#dde3ec] rounded px-2.5 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none" />
            </div>
            <div className="flex items-center justify-end gap-4 pt-1">
              <div className="text-[14px] text-[#555]">统单总金额 <span className="text-[#e04040] text-[20px] font-bold ml-2">¥ 890,239.18</span></div>
              <button onClick={onClose} className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">取消</button>
              <button className="px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] font-medium">确认统单并采购</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── 主页面 ── */
export default function JicaiWoXiaoshouPage() {
  const [activeTab, setActiveTab] = useState("全部")
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [tongdanOpen, setTongdanOpen] = useState(false)
  const [searchNo, setSearchNo] = useState("")
  const [searchBuyer, setSearchBuyer] = useState("")
  const [searchStatus, setSearchStatus] = useState("")

  const filtered = ORDERS.filter(o => {
    const matchTab = activeTab === "全部" || o.status.includes(activeTab.replace("已完成/已取消","已完成")) || o.status === activeTab
    const matchNo = !searchNo || o.id.includes(searchNo)
    const matchBuyer = !searchBuyer || o.buyer.includes(searchBuyer)
    const matchStatus = !searchStatus || o.status === searchStatus
    return matchTab && matchNo && matchBuyer && matchStatus
  })

  const allSelected = filtered.length > 0 && filtered.every(o => selected.has(o.id))
  function toggleAll() {
    if (allSelected) {
      const next = new Set(selected)
      filtered.forEach(o => next.delete(o.id))
      setSelected(next)
    } else {
      const next = new Set(selected)
      filtered.forEach(o => next.add(o.id))
      setSelected(next)
    }
  }
  function toggleOne(id: string) {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id); else next.add(id)
    setSelected(next)
  }

  return (
    <div className="space-y-4">
      {/* 搜索区 */}
      <div className="bg-white rounded-lg border border-[#e8edf5] p-4 space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">编号：</label>
            <input value={searchNo} onChange={e=>setSearchNo(e.target.value)}
              className="flex-1 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入订单编号" />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">买方：</label>
            <input value={searchBuyer} onChange={e=>setSearchBuyer(e.target.value)}
              className="flex-1 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">状态：</label>
            <select value={searchStatus} onChange={e=>setSearchStatus(e.target.value)}
              className="flex-1 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] text-[#999] focus:outline-none focus:border-[#1a5fa8]">
              <option value="">请选择</option>
              {STATUS_TABS.slice(1).map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">下单时间：</label>
            <div className="flex items-center gap-1">
              <input type="date" className="border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
              <span className="text-[#999]">至</span>
              <input type="date" className="border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
              {["今日","昨日","近7天","近30天"].map(d=>(
                <button key={d} className="px-2 py-1 text-[12px] border border-[#dde3ec] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8]">{d}</button>
              ))}
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] flex items-center gap-1.5"><Search className="w-3.5 h-3.5" />查询</button>
            <button className="px-4 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">清空</button>
            <button className="px-4 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999] flex items-center gap-1.5"><Download className="w-3.5 h-3.5" />导出</button>
          </div>
        </div>
      </div>

      {/* 状态 Tab + 统单按钮 */}
      <div className="bg-white rounded-lg border border-[#e8edf5]">
        <div className="flex items-center border-b border-[#e8edf5] px-2">
          <div className="flex flex-1">
            {STATUS_TABS.map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-4 py-3 text-[13px] border-b-2 transition-colors whitespace-nowrap ${activeTab===t?"border-[#1a5fa8] text-[#1a5fa8] font-semibold":"border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>
                {t}
              </button>
            ))}
          </div>
          <button onClick={() => setTongdanOpen(true)}
            className="mx-3 px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]">
            统单
          </button>
        </div>

        {/* 表格 */}
        <table className="w-full text-[13px]">
          <thead className="bg-[#f5f7fa] border-b border-[#e8edf5]">
            <tr>
              <th className="px-4 py-2.5 w-10">
                <input type="checkbox" checked={allSelected} onChange={toggleAll} className="accent-[#1a5fa8]" />
              </th>
              {["编号","买方","商品","下单金额(元)","联系人电话","下单时间","计划收货时间","状态","操作"].map(h=>(
                <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#666]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} className="border-t border-[#e8edf5] hover:bg-[#fafbfc]">
                <td className="px-4 py-3">
                  <input type="checkbox" checked={selected.has(o.id)} onChange={() => toggleOne(o.id)} className="accent-[#1a5fa8]" />
                </td>
                <td className="px-3 py-3 text-[#555]">{o.id}</td>
                <td className="px-3 py-3 text-[#555]">{o.buyer}</td>
                <td className="px-3 py-3 text-[#555]">{o.goods}</td>
                <td className="px-3 py-3 text-[#1a1a2e]">{o.amt.toFixed(2)}</td>
                <td className="px-3 py-3 text-[#555]">{o.phone}</td>
                <td className="px-3 py-3 text-[#555]">{o.time}</td>
                <td className="px-3 py-3 text-[#555]">{o.planTime}</td>
                <td className={`px-3 py-3 font-medium ${o.status==="已完成"?"text-[#3a8c3f]":o.status==="待发货"?"text-[#1a5fa8]":"text-[#e8831a]"}`}>{o.status}</td>
                <td className="px-3 py-3">
                  <div className="flex gap-2 flex-wrap">
                    <button className="text-[#1a5fa8] hover:underline text-[12px]">查看详情</button>
                    {o.status === "待发货" && <button className="text-[#e8831a] hover:underline text-[12px]">发货</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 分页 */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#e8edf5]">
          <span className="text-[12px] text-[#999]">共 24 条</span>
          <div className="flex items-center gap-1">
            <select className="border border-[#dde3ec] rounded px-2 py-1 text-[12px]"><option>10条/页</option><option>20条/页</option></select>
            <button className="w-7 h-7 flex items-center justify-center border border-[#dde3ec] rounded hover:border-[#1a5fa8]"><ChevronLeft className="w-3.5 h-3.5 text-[#555]" /></button>
            <button className="w-7 h-7 flex items-center justify-center bg-[#1a5fa8] text-white rounded text-[12px]">1</button>
            <button className="w-7 h-7 flex items-center justify-center border border-[#dde3ec] rounded text-[12px] text-[#555] hover:border-[#1a5fa8]">2</button>
            <button className="w-7 h-7 flex items-center justify-center border border-[#dde3ec] rounded text-[12px] text-[#555] hover:border-[#1a5fa8]">3</button>
            <button className="w-7 h-7 flex items-center justify-center border border-[#dde3ec] rounded hover:border-[#1a5fa8]"><ChevronRight className="w-3.5 h-3.5 text-[#555]" /></button>
            <span className="text-[12px] text-[#999]">前往</span>
            <input type="number" defaultValue={1} className="w-10 border border-[#dde3ec] rounded px-1.5 py-1 text-[12px] text-center" />
            <span className="text-[12px] text-[#999]">页</span>
          </div>
        </div>
      </div>

      {tongdanOpen && <TongdanModal onClose={() => setTongdanOpen(false)} />}
    </div>
  )
}
