"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Download } from "lucide-react"

const ORDERS = [
  { id: "2434059405460956", time: "2026-04-20 22:05:48", product: "丝苗米、南晶香占", amount: 2300, deposit: 230, buyer: "广州增城供销农产品配送有限公司", receiver: "偶奇", phone: "138****8888", address: "上海市浦东新区市镇区2888号", delivery: "卖家配送", planTime: "2026-04-23 00:00:00 至 2026-04-25 23:59:59", status: "待发货", isGroup: true },
  { id: "2434059405460957", time: "2026-04-10 22:05:48", product: "菠萝、土豆", amount: 5000, deposit: 500, buyer: "广州番禺供销农产品配送有限公司", receiver: "张悦", phone: "13647589768", address: "广州市越秀区荣园东路80号", delivery: "买家自提", planTime: "2026-04-13 00:00:00 至 2026-04-16 23:59:59", status: "待发货", isGroup: false },
  { id: "2434059405460958", time: "2026-04-09 22:05:48", product: "象牙香占、香雪", amount: 27000, deposit: 270, buyer: "广州市海珠区供销农产品有限公司", receiver: "张翰", phone: "1234567898", address: "广东省肇庆市云顶花园83号", delivery: "卖家配送", planTime: "2026-04-23 00:00:00 至 2026-04-25 23:59:59", status: "待发货", isGroup: true },
  { id: "2434059405460955", time: "2026-04-06 22:05:48", product: "土豆、豇豆", amount: 6000, deposit: 600, buyer: "汕尾吉康供销农产品有限公司", receiver: "张含", phone: "13453679768", address: "广州市越秀区荣园东路79号", delivery: "卖家配送", planTime: "2026-04-23 00:00:00 至 2026-04-25 23:59:59", status: "待卖方确认", isGroup: true },
  { id: "2434059405460955", time: "2026-04-05 22:05:48", product: "菜心", amount: 7000, deposit: 700, buyer: "广州白云供销农产品配送有限公司", receiver: "张启明", phone: "13457379768", address: "广州市越秀区荣园东路66号", delivery: "卖家配送", planTime: "2026-04-23 00:00:00 至 2026-04-25 23:59:59", status: "待付预付款", isGroup: false },
]

const STATUS_TABS = ["全部", "待卖方确认", "待付预付款", "待发货", "待收货", "待结算", "已完成/已取消"]

const CHANGEABLE = new Set(["待付预付款", "待发货", "生产履约"])
const CANCELABLE = new Set(["待付预付款", "待发货", "生产履约"])

const MAIN_ACTIONS: Record<string, { label: string; color: string }> = {
  "待卖方确认": { label: "确认订单", color: "text-[#1a5fa8]"  },
  "待付预付款": { label: "提醒付款", color: "text-[#e8831a]"  },
  "待发货":     { label: "发货",     color: "text-[#1a5fa8]"  },
  "待结算":     { label: "发起对账", color: "text-[#1a5fa8]"  },
}

export default function ChanxiaoWoXiaoshouPage() {
  const [statusTab, setStatusTab] = useState("全部")
  const [keyword, setKeyword] = useState("")

  const filtered = ORDERS.filter(o => {
    const matchStatus = statusTab === "全部" || o.status === statusTab
    const matchKw = !keyword || o.product.includes(keyword) || o.id.includes(keyword)
    return matchStatus && matchKw
  })

  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-[13px] text-[#999] mb-4 flex items-center gap-1">
        <span>订单管理</span>
        <span className="mx-1">&gt;</span>
        <span className="text-[#1a5fa8] font-medium">我销售</span>
      </div>

      <div className="bg-white rounded-lg border border-[#dde3ec] overflow-hidden">
        {/* 搜索区 */}
        <div className="p-4 border-b border-[#e8edf5]">
          <div className="grid grid-cols-4 gap-3 mb-3">
            <div>
              <label className="text-[12px] text-[#666] block mb-1">交易订单编号</label>
              <input placeholder="请输入交易订单编号" value={keyword} onChange={e => setKeyword(e.target.value)}
                className="w-full h-8 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
            </div>
            <div>
              <label className="text-[12px] text-[#666] block mb-1">买方</label>
              <input placeholder="请输入" className="w-full h-8 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
            </div>
            <div>
              <label className="text-[12px] text-[#666] block mb-1">商品名称</label>
              <input placeholder="请输入" className="w-full h-8 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]" />
            </div>
            <div>
              <label className="text-[12px] text-[#666] block mb-1">订单状态</label>
              <select className="w-full h-8 border border-[#dde3ec] rounded px-2 text-[13px] outline-none focus:border-[#1a5fa8] text-[#999]">
                <option value="">请选择</option>
                {STATUS_TABS.slice(1).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-2">
              <label className="text-[12px] text-[#666] block mb-1">下单时间</label>
              <div className="flex items-center gap-1">
                <input type="text" placeholder="开始日期" className="flex-1 h-8 border border-[#dde3ec] rounded px-2 text-[12px] outline-none focus:border-[#1a5fa8]" />
                <span className="text-[#999] text-[12px]">至</span>
                <input type="text" placeholder="结束日期" className="flex-1 h-8 border border-[#dde3ec] rounded px-2 text-[12px] outline-none focus:border-[#1a5fa8]" />
                {(["今日","昨日","近7天","近30天"] as const).map(d => (
                  <button key={d} className="h-8 px-2 border border-[#dde3ec] rounded text-[12px] text-[#666] hover:border-[#1a5fa8] hover:text-[#1a5fa8] whitespace-nowrap transition-colors">{d}</button>
                ))}
              </div>
            </div>
            <div className="col-span-2">
              <label className="text-[12px] text-[#666] block mb-1">要求收货时间</label>
              <div className="flex items-center gap-1">
                <input type="text" placeholder="开始日期" className="flex-1 h-8 border border-[#dde3ec] rounded px-2 text-[12px] outline-none focus:border-[#1a5fa8]" />
                <span className="text-[#999] text-[12px]">至</span>
                <input type="text" placeholder="结束日期" className="flex-1 h-8 border border-[#dde3ec] rounded px-2 text-[12px] outline-none focus:border-[#1a5fa8]" />
                {(["今日","昨日","近7天","近30天"] as const).map(d => (
                  <button key={d} className="h-8 px-2 border border-[#dde3ec] rounded text-[12px] text-[#666] hover:border-[#1a5fa8] hover:text-[#1a5fa8] whitespace-nowrap transition-colors">{d}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <button className="h-8 px-5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] flex items-center gap-1.5"><Search className="w-3.5 h-3.5" />查询</button>
            <button className="h-8 px-4 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">清空</button>
            <button className="h-8 px-4 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999] flex items-center gap-1"><Download className="w-3.5 h-3.5" />导出</button>
          </div>
        </div>

        {/* 状态 Tab */}
        <div className="flex border-b border-[#e8edf5] px-4">
          {STATUS_TABS.map(t => (
            <button key={t} onClick={() => setStatusTab(t)}
              className={`px-4 py-2.5 text-[13px] border-b-2 transition-colors whitespace-nowrap ${statusTab === t ? "border-[#1a5fa8] text-[#1a5fa8] font-medium" : "border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* 表头 */}
        <div className="grid text-[12px] text-[#6b7c93] bg-[#f8fafc] border-b border-[#e8edf5] px-4 py-2"
          style={{ gridTemplateColumns: "2fr 1fr 1fr 2fr 2fr 2fr 2fr 1fr 1fr 1.5fr" }}>
          {["商品","下单金额","预付款金额","买方","收货人信息","配送方式","计划收货时间","是否集采下单","订单状态","操作"].map(h => (
            <div key={h} className="px-3 font-medium">{h}</div>
          ))}
        </div>

        {/* 列表 */}
        <div className="divide-y divide-[#e8edf5]">
          {filtered.map(order => {
            const mainBtn = MAIN_ACTIONS[order.status]
            const canChange = CHANGEABLE.has(order.status)
            const canCancel = CANCELABLE.has(order.status)
            return (
              <div key={order.id + order.time} className="border-b border-[#e8edf5] last:border-0">
                <div className="px-4 py-2 bg-[#fafbfc] flex items-center gap-4 text-[12px] text-[#666]">
                  <span>订单编号：{order.id}</span>
                  <span>下单时间：{order.time}</span>
                  <div className="ml-auto flex gap-2">
                    <Link href={`/merchant/chanxiao/orders/wo-xiaoshou/${order.id}`} className="text-[#1a5fa8] hover:underline">查看详情</Link>
                    <span className="text-[#dde3ec]">|</span>
                    <span className="text-[#999] cursor-pointer hover:text-[#1a5fa8]">联系买方</span>
                  </div>
                </div>
                <div className="grid items-center text-[12px] px-4" style={{ gridTemplateColumns: "2fr 1fr 1fr 2fr 2fr 2fr 2fr 1fr 1fr 1.5fr" }}>
                  <div className="px-3 py-3 font-medium text-[#1a1a2e]">{order.product}</div>
                  <div className="px-3 py-3 text-[#1a1a2e]">¥{order.amount.toLocaleString()}.00</div>
                  <div className="px-3 py-3 text-[#1a1a2e]">¥{order.deposit}.00</div>
                  <div className="px-3 py-3 text-[#666] text-[11px]">{order.buyer}</div>
                  <div className="px-3 py-3 text-[11px] text-[#666] space-y-0.5">
                    <div>收货人：{order.receiver}</div>
                    <div>手机号：{order.phone}</div>
                    <div>收货地址：{order.address}</div>
                  </div>
                  <div className="px-3 py-3 text-[#666]">{order.delivery}</div>
                  <div className="px-3 py-3 text-[11px] text-[#666]">{order.planTime}</div>
                  <div className="px-3 py-3 text-center">{order.isGroup ? <span className="text-[#1a5fa8]">是</span> : "否"}</div>
                  <div className="px-3 py-3">
                    <span className={`text-[11px] font-medium ${order.status === "待发货" ? "text-[#e8831a]" : "text-[#666]"}`}>{order.status}</span>
                  </div>
                  <div className="px-3 py-3 flex flex-col gap-1">
                    {mainBtn && (
                      <button className={`${mainBtn.color} hover:underline text-[12px] text-left`}>{mainBtn.label}</button>
                    )}
                    {canChange && (
                      <button className="text-[#1a5fa8] hover:underline text-[12px] text-left">订单变更</button>
                    )}
                    {canCancel && (
                      <button className="text-[#e04040] hover:underline text-[12px] text-left">申请取消</button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* 分页 */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#e8edf5]">
          <span className="text-[13px] text-[#999]">共 {filtered.length} 条记录，10条/页</span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded text-[13px] bg-[#1a5fa8] text-white">1</button>
          </div>
        </div>
      </div>
    </div>
  )
}
