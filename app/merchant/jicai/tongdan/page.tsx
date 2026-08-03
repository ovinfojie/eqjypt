"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, CheckCircle2, Clock, Package, Printer, Download } from "lucide-react"

const buyers = [
  { id: "b1", name: "盒马超市采购部", contact: "李经理 13800001111", qty: 5, unit: "吨", amt: "16,000", status: "confirmed", addr: "广州市天河区天河路123号" },
  { id: "b2", name: "广州大润发配送中心", contact: "王主任 13800002222", qty: 8, unit: "吨", amt: "25,600", status: "confirmed", addr: "广州市番禺区市桥镇" },
  { id: "b3", name: "深圳沃尔玛采购", contact: "张总 13800003333", qty: 12, unit: "吨", amt: "38,400", status: "pending", addr: "深圳市南山区前海路88号" },
  { id: "b4", name: "东莞永辉超市", contact: "陈采购 13800004444", qty: 6, unit: "吨", amt: "19,200", status: "confirmed", addr: "东莞市南城区宏远路" },
  { id: "b5", name: "佛山家乐福", contact: "刘主管 13800005555", qty: 10, unit: "吨", amt: "32,000", status: "pending", addr: "佛山市禅城区季华路" },
]

export default function JicaiTongdanPage() {
  const [selected, setSelected] = useState<string[]>(buyers.map(b => b.id))

  const toggleAll = () => setSelected(selected.length === buyers.length ? [] : buyers.map(b => b.id))
  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const selectedBuyers = buyers.filter(b => selected.includes(b.id))
  const totalQty = selectedBuyers.reduce((s, b) => s + b.qty, 0)
  const totalAmt = selectedBuyers.reduce((s, b) => s + parseInt(b.amt.replace(/,/g, "")), 0)

  return (
    <div className="max-w-[980px] mx-auto space-y-5">
      {/* 顶部 */}
      <div className="flex items-center gap-3">
        <Link href="/merchant/jicai/huodong-list" className="flex items-center gap-1.5 text-[13px] text-[#6b7c93] hover:text-[#1a5fa8] transition-colors">
          <ChevronLeft className="w-4 h-4" /> 返回列表
        </Link>
        <h1 className="text-[20px] font-bold text-[#1a1a2e]">集采统单</h1>
      </div>

      {/* 活动信息 */}
      <div className="bg-[#e8f4fd] border border-[#b8d4f0] rounded-lg p-4">
        <div className="text-[14px] font-semibold text-[#1a5fa8] mb-2">2026年8月优质大米集采专项</div>
        <div className="flex gap-6 text-[12px] text-[#6b7c93]">
          <span>集采总量：<b className="text-[#1a1a2e]">50吨</b></span>
          <span>参考单价：<b className="text-[#e8831a]">3,200元/吨</b></span>
          <span>活动截止：<b className="text-[#1a1a2e]">2026-08-15</b></span>
          <span>已确认订单：<b className="text-[#3a8c3f]">3单</b></span>
        </div>
      </div>

      {/* 买家订单汇总表 */}
      <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
        <div className="px-5 py-3 bg-[#f8fafc] border-b border-[#e8edf5] flex items-center justify-between">
          <span className="text-[14px] font-semibold text-[#1a1a2e]">买家订单明细</span>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e8edf5] rounded text-[12px] text-[#555] hover:border-[#1a5fa8]">
              <Printer className="w-3.5 h-3.5" /> 打印统单
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a5fa8] text-white rounded text-[12px] hover:bg-[#0d4a8a]">
              <Download className="w-3.5 h-3.5" /> 导出Excel
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-[12px] text-[#6b7c93] border-b border-[#e8edf5]">
              <th className="px-4 py-2.5 text-left w-10">
                <input type="checkbox" checked={selected.length === buyers.length} onChange={toggleAll} className="rounded" />
              </th>
              <th className="px-4 py-2.5 text-left">采购商</th>
              <th className="px-4 py-2.5 text-left">联系人</th>
              <th className="px-4 py-2.5 text-left">收货地址</th>
              <th className="px-4 py-2.5 text-right">订购数量</th>
              <th className="px-4 py-2.5 text-right">金额</th>
              <th className="px-4 py-2.5 text-center">状态</th>
              <th className="px-4 py-2.5 text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map(b => (
              <tr key={b.id} className="border-b border-[#f0f4f8] hover:bg-[#f8fafc] transition-colors">
                <td className="px-4 py-3">
                  <input type="checkbox" checked={selected.includes(b.id)} onChange={() => toggle(b.id)} className="rounded" />
                </td>
                <td className="px-4 py-3 text-[13px] font-medium text-[#1a1a2e]">{b.name}</td>
                <td className="px-4 py-3 text-[13px] text-[#555]">{b.contact}</td>
                <td className="px-4 py-3 text-[13px] text-[#555] max-w-[160px] truncate">{b.addr}</td>
                <td className="px-4 py-3 text-[13px] font-semibold text-right">{b.qty}{b.unit}</td>
                <td className="px-4 py-3 text-[13px] font-semibold text-[#e8831a] text-right">¥{b.amt}</td>
                <td className="px-4 py-3 text-center">
                  {b.status === "confirmed" ? (
                    <span className="inline-flex items-center gap-1 text-[12px] text-[#3a8c3f]"><CheckCircle2 className="w-3.5 h-3.5" />已确认</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[12px] text-[#e8831a]"><Clock className="w-3.5 h-3.5" />待确认</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="text-[12px] text-[#1a5fa8] hover:underline">查看</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* 合计行 */}
        <div className="px-5 py-3 bg-[#f8fafc] border-t border-[#e8edf5] flex items-center justify-between">
          <span className="text-[13px] text-[#6b7c93]">已选 <b className="text-[#1a1a2e]">{selected.length}</b> 家，合计</span>
          <div className="flex items-center gap-6 text-[13px]">
            <span>数量：<b className="text-[#1a1a2e]">{totalQty}吨</b></span>
            <span>金额：<b className="text-[#e8831a] text-[16px]">¥{totalAmt.toLocaleString()}</b></span>
            <button className="px-5 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors" disabled={selected.length === 0}>
              生成发货统单
            </button>
          </div>
        </div>
      </div>

      {/* 配送安排 */}
      <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
        <h2 className="text-[14px] font-semibold text-[#1a1a2e] mb-4">配送安排</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] text-[#6b7c93] mb-1.5">发货日期</label>
            <input type="date" defaultValue="2026-08-16" className="w-full border border-[#e8edf5] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
          </div>
          <div>
            <label className="block text-[12px] text-[#6b7c93] mb-1.5">配送方式</label>
            <select className="w-full border border-[#e8edf5] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]">
              <option>平台冷链专送</option>
              <option>卖家自配</option>
              <option>买家自提</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-[12px] text-[#6b7c93] mb-1.5">备注说明</label>
            <textarea rows={2} className="w-full border border-[#e8edf5] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none" placeholder="填写配送备注..." />
          </div>
        </div>
      </div>
    </div>
  )
}
