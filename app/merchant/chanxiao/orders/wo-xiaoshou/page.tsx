"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Download, X, Upload } from "lucide-react"

const ORDERS = [
  { id:"2434059405460956", time:"2026-04-20 22:05:48", product:"南晶香占", spec:"吨", amount:2300, deposit:230, source:"订单农业服务", buyer:"广东新供销天润粮油集团有限公司", receiver:"张悦", phone:"136****9768", address:"广州市越秀区荣园东路80号", delivery:"卖家配送", planTime:"2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement:"建行龙存款", status:"待卖方确认", action:"确认订单" },
  { id:"2434059405460957", time:"2026-04-20 22:05:48", product:"丝苗米",   spec:"吨", amount:5000, deposit:500, source:"订单农业服务", buyer:"广东新供销天润粮油集团有限公司", receiver:"偶奇", phone:"138****8888", address:"上海市浦东新区市镇区2888号", delivery:"卖家配送", planTime:"2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement:"建行龙存款", status:"待付预付款", action:"提醒" },
  { id:"2434059405460958", time:"2026-04-20 22:05:48", product:"大豆",     spec:"吨", amount:27000, deposit:270, source:"订单农业服务", buyer:"湛江天润粮油有限公司", receiver:"张翰", phone:"1234567898", address:"广东省肇庆市云顶花园83号", delivery:"卖家配送", planTime:"2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement:"工行安心付", status:"待发货", action:"发货" },
  { id:"2434059405460959", time:"2026-04-20 22:05:48", product:"小麦",     spec:"吨", amount:6000, deposit:600, source:"订单农业服务", buyer:"阳西天润粮油有限公司", receiver:"张含", phone:"13453679768", address:"广州市越秀区荣园东路79号", delivery:"卖家配送", planTime:"2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement:"工行安心付", status:"待收货", action:null },
  { id:"2434059405460960", time:"2026-04-20 22:05:48", product:"象牙香占", spec:"吨", amount:7000, deposit:700, source:"订单农业服务", buyer:"四会天润粮油有限公司", receiver:"张启明", phone:"13457379768", address:"广州市越秀区荣园东路66号", delivery:"卖家配送", planTime:"2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement:"工行安心付", status:"待结算", action:"发起对账" },
]

const STATUS_TABS = ["全部","待卖方确认","待付预付款","待发货","待收货","待结算","已完成","已关闭"]

/* ─── 发货弹窗 ─── */
function ShippingModal({ onClose }: { onClose: () => void }) {
  const [multiAccept, setMultiAccept] = useState<"yes"|"no">("yes")
  const [method, setMethod] = useState("下单物流发货")
  const [logistics, setLogistics] = useState("粤供销配送服务")
  const [qty, setQty] = useState(200)
  const [note, setNote] = useState("")

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 overflow-y-auto py-8" onClick={onClose}>
      <div className="bg-white rounded-lg w-[680px] shadow-2xl" onClick={e=>e.stopPropagation()}>
        <div className="px-6 py-5 border-b border-[#e8edf5]">
          <h3 className="text-[18px] font-bold text-[#1a1a2e]">发货</h3>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* 是否支持多次验收 */}
          <div className="flex items-center gap-6 text-[13px]">
            <span className="font-medium text-[#333]"><span className="text-red-500">*</span>该批次发货是否支持多次验收：</span>
            <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="multi" value="yes" checked={multiAccept==="yes"} onChange={()=>setMultiAccept("yes")} className="accent-[#1a5fa8]" />是</label>
            <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="multi" value="no" checked={multiAccept==="no"} onChange={()=>setMultiAccept("no")} className="accent-[#1a5fa8]" />否</label>
          </div>
          <div className="text-[12px] text-[#888] leading-5 -mt-2">
            <span className="font-medium text-[#555]">是：</span>发货单与批次单为一对多关系，货物入库后由粮库系统自动同步批次单；
            <span className="font-medium text-[#555] ml-3">否：</span>发货单与批次单为一对一关系，发货时即自动创建对应批次单。
          </div>

          {/* 发货商品数量 */}
          <div>
            <div className="text-[13px] font-medium text-[#333] mb-2"><span className="text-red-500">*</span>发货商品数量：</div>
            <table className="w-full text-[13px] border border-[#e8edf5]">
              <thead className="bg-[#f5f7fa]"><tr>{["商品","规格","下单数量（单位）","已发货数量（单位）","本次发货数量（单位）"].map(h=><th key={h} className="px-4 py-2.5 text-left font-semibold text-[#666]">{h}</th>)}</tr></thead>
              <tbody>
                <tr className="border-t border-[#e8edf5]">
                  <td className="px-4 py-3">丝苗米</td>
                  <td className="px-4 py-3">吨</td>
                  <td className="px-4 py-3">200(吨)</td>
                  <td className="px-4 py-3">0(吨)</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button onClick={()=>setQty(Math.max(0,qty-1))} className="w-6 h-6 border border-[#dde3ec] rounded flex items-center justify-center hover:border-[#1a5fa8] text-[#555]">−</button>
                      <input value={qty} onChange={e=>setQty(Number(e.target.value))} className="w-16 border border-[#dde3ec] rounded px-2 py-1 text-[13px] text-center focus:outline-none focus:border-[#1a5fa8]" />
                      <button onClick={()=>setQty(qty+1)} className="w-6 h-6 border border-[#dde3ec] rounded flex items-center justify-center hover:border-[#1a5fa8] text-[#555]">+</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 请选择方式 */}
          <div className="flex items-center gap-6 text-[13px]">
            <span className="font-medium text-[#333] w-[80px] shrink-0"><span className="text-red-500">*</span>请选择方式：</span>
            {["下单物流发货","已发货、绑定物流信息","无物流单号"].map(m=>(
              <label key={m} className="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" name="method" value={m} checked={method===m} onChange={()=>setMethod(m)} className="accent-[#1a5fa8]" />{m}
              </label>
            ))}
          </div>

          {/* 物流渠道 */}
          <div className="flex items-center gap-6 text-[13px]">
            <span className="font-medium text-[#333] w-[80px] shrink-0"><span className="text-red-500">*</span>请选择物流渠道：</span>
            {["粤供销配送服务","快递100","顺丰速运"].map(l=>(
              <label key={l} className="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" name="logistics" value={l} checked={logistics===l} onChange={()=>setLogistics(l)} className="accent-[#1a5fa8]" />{l}
              </label>
            ))}
          </div>

          {/* 发货人信息 */}
          <div>
            <div className="text-[13px] font-medium text-[#333] mb-3">发货人信息：</div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-[13px] text-[#555] w-[48px] shrink-0"><span className="text-red-500">*</span>姓名：</label>
                  <input className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入姓名" />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-[13px] text-[#555] w-[56px] shrink-0"><span className="text-red-500">*</span>手机号：</label>
                  <input className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入手机号" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] w-[48px] shrink-0"><span className="text-red-500">*</span>地区：</label>
                <select className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] text-[#999]"><option>请选择省</option><option>广东省</option></select>
                <select className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] text-[#999]"><option>请选择市</option><option>广州市</option></select>
                <select className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] text-[#999]"><option>请选择区</option><option>荔湾区</option></select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] w-[56px] shrink-0"><span className="text-red-500">*</span>详细地址：</label>
                <input className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入详细地址" />
              </div>
            </div>
          </div>

          {/* 收货人信息 */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[13px] font-medium text-[#333]">收货人信息：</span>
              <span className="text-[12px] text-[#e8831a] bg-[#fff3e0] px-2 py-0.5 rounded">请与用户协商一致后，再修改信息</span>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-[13px] text-[#555] w-[48px] shrink-0"><span className="text-red-500">*</span>姓名：</label>
                  <input defaultValue="1" className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-[13px] text-[#555] w-[56px] shrink-0"><span className="text-red-500">*</span>手机号：</label>
                  <input defaultValue="14789562311" className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] w-[48px] shrink-0"><span className="text-red-500">*</span>地区：</label>
                <select className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]"><option>广东省</option></select>
                <select className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]"><option>广州市</option></select>
                <select className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]"><option>荔湾区</option></select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] w-[56px] shrink-0"><span className="text-red-500">*</span>详细地址：</label>
                <input defaultValue="11" className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-[13px] text-[#555] w-[56px] shrink-0"><span className="text-red-500">*</span>装货时间：</label>
                  <input type="datetime-local" className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] text-[#999]" />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-[13px] text-[#555] w-[56px] shrink-0"><span className="text-red-500">*</span>到货时间：</label>
                  <input type="datetime-local" className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] text-[#999]" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#555] w-[56px] shrink-0"><span className="text-red-500">*</span>运输要求：</label>
                <input className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请选择运输要求" />
              </div>
            </div>
          </div>

          {/* 物流公司 */}
          <div>
            <div className="text-[13px] font-medium text-[#333] mb-2">请选择物流公司</div>
            <div className="flex gap-3">
              <div className="w-[90px] h-[90px] border-2 border-[#1a5fa8] rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer">
                <div className="w-8 h-8 bg-[#dde3ec] rounded-full flex items-center justify-center text-[#666] font-bold">天</div>
                <span className="text-[12px] text-[#1a1a2e]">天业冷链</span>
              </div>
            </div>
          </div>

          {/* 发货凭证 */}
          <div className="flex items-center gap-4">
            <span className="text-[13px] font-medium text-[#333] w-[64px] shrink-0">发货凭证</span>
            <label className="flex items-center gap-2 px-4 py-1.5 border border-[#dde3ec] rounded text-[13px] text-[#555] cursor-pointer hover:border-[#1a5fa8]">
              <Upload className="w-3.5 h-3.5" />上传附件
            </label>
            <span className="text-[12px] text-[#999]">支持png/jpg/pdf/word/excel文件等，不超过100M</span>
          </div>

          {/* 备注 */}
          <div className="flex gap-4">
            <span className="text-[13px] font-medium text-[#333] w-[48px] shrink-0 pt-1.5">备注：</span>
            <div className="flex-1">
              <textarea value={note} onChange={e=>setNote(e.target.value.slice(0,100))} rows={3} className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] resize-none focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入备注" />
              <div className="text-right text-[12px] text-[#999]">{note.length}/100</div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#e8edf5]">
          <button onClick={onClose} className="px-6 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">取消</button>
          <button className="px-8 py-2 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded hover:bg-[#0d4a8a]">确定</button>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   批次单列表组件
   ────────────────────────────────────────────── */
const BATCH_STATUS_TABS = ["全部","待买家验收","待卖家发起对账","待买家确认对账","待买家付款","待卖家确认收款","已完成","已关闭"]

const BATCH_DATA = [
  {
    batchNo: "PB457559072784", shipTime: "2026-08-03 22:49:39", orderNo: "PO637075481616",
    product: "核桃", img: "",
    shipAmt: "¥1.00", acceptAmt: "¥1.00",
    delivery: "买家自提", settlement: "工行安心付",
    buyer: "创正信息技术有限公司", seller: "矩正信息技术（上海）有限公司",
    expectTime: "2026-08-13 23:59:59", tradeMode: "担保交易", orderStatus: "待买家付款",
    accountNo: "CSOA622047207568", accountTime: "2026-08-03 22:52:20",
    settlementNo: "SO491851817104", settlementTime: "2026-08-03 22:53:42",
  },
  {
    batchNo: "PB457559072768", shipTime: "2026-08-03 22:49:33", orderNo: "PO637075481616",
    product: "丝苗米", img: "",
    shipAmt: "¥3000.00", acceptAmt: "¥3000.00",
    delivery: "卖家配送", settlement: "建行龙存管",
    buyer: "广东新供销天润粮油集团有限公司", seller: "南雄市社村合作农业发展有限公司",
    expectTime: "2026-08-20 23:59:59", tradeMode: "担保交易", orderStatus: "待买家验收",
    accountNo: "", accountTime: "",
    settlementNo: "", settlementTime: "",
  },
]

function BatchDanList() {
  const [statusTab, setStatusTab] = useState("全部")
  const [batchDetailOpen, setBatchDetailOpen] = useState(false)

  return (
    <div>
      {/* 搜索区 */}
      <div className="bg-white rounded-lg border border-[#e8edf5] p-4 mb-4 space-y-3">
        <div className="grid grid-cols-4 gap-3">
          {[["销售订单编号","请输入销售订单编号"],["商品名称","请输入商品名称"],["批次单编号","请输入批次单编号"],["买家","请输入"]].map(([label, ph]) => (
            <div key={label} className="flex items-center gap-2">
              <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">{label}：</label>
              <input className="flex-1 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] min-w-0" placeholder={ph} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[["对账单编号","请输入对账单编号"],["结算单编号","请输入结算单编号"]].map(([label, ph]) => (
            <div key={label} className="flex items-center gap-2">
              <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">{label}：</label>
              <input className="flex-1 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] min-w-0" placeholder={ph} />
            </div>
          ))}
          <div className="flex items-center gap-2">
            <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">交易模式：</label>
            <select className="flex-1 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] text-[#999] min-w-0">
              <option value="">请选择交易模式</option>
              <option>担保交易</option><option>非担保交易</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">结算渠道：</label>
            <select className="flex-1 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] text-[#999] min-w-0">
              <option value="">请选择结算渠道</option>
              <option>建行龙存管</option><option>工行安心付</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">时间：</label>
            <div className="flex items-center gap-1">
              <input type="date" className="border border-[#dde3ec] rounded px-2 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              <span className="text-[#999]">-</span>
              <input type="date" className="border border-[#dde3ec] rounded px-2 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] flex items-center gap-1.5"><Search className="w-3.5 h-3.5" />查询</button>
            <button className="px-4 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">清空</button>
            <button className="px-4 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999] flex items-center gap-1.5"><Download className="w-3.5 h-3.5" />导出</button>
          </div>
        </div>
      </div>

      {/* 状态 Tab */}
      <div className="bg-white rounded-lg border border-[#e8edf5]">
        <div className="flex border-b border-[#e8edf5] overflow-x-auto">
          {BATCH_STATUS_TABS.map(t => (
            <button key={t} onClick={() => setStatusTab(t)}
              className={`px-4 py-3 text-[12px] whitespace-nowrap border-b-2 transition-colors ${statusTab===t?"border-[#1a5fa8] text-[#1a5fa8] font-semibold":"border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="grid text-[12px] font-semibold text-[#666] bg-[#f5f7fa] border-b border-[#e8edf5]"
          style={{gridTemplateColumns:"1.8fr 1fr 1fr 1fr 1fr 1.4fr 1.4fr 1.2fr 1fr 1fr 1fr"}}>
          {["商品","批次发货总额(元)","批次验收总额(元)","配送方式","结算渠道","买家","卖家","期望收货时间","交易模式","订单状态","操作"].map(h=>(
            <div key={h} className="px-3 py-2.5">{h}</div>
          ))}
        </div>

        {BATCH_DATA.map((b) => (
          <div key={b.batchNo} className="border-b border-[#e8edf5] last:border-0">
            <div className="px-4 py-2 bg-[#fafbfc] flex items-center gap-6 text-[12px] text-[#666]">
              <span>批次单编号：<span className="font-medium text-[#1a1a2e]">{b.batchNo}</span></span>
              <span>发货时间：{b.shipTime}</span>
              <span className="ml-auto">销售订单编号：<span className="text-[#1a5fa8] cursor-pointer hover:underline">{b.orderNo}</span></span>
            </div>
            <div className="grid items-center text-[12px]"
              style={{gridTemplateColumns:"1.8fr 1fr 1fr 1fr 1fr 1.4fr 1.4fr 1.2fr 1fr 1fr 1fr"}}>
              <div className="px-3 py-3 flex items-center gap-2">
                <div className="w-12 h-12 shrink-0 rounded overflow-hidden bg-[#e8f4fd] flex items-center justify-center text-[#1a5fa8] text-[10px] font-bold">
                  {b.img ? <img src={b.img || "/placeholder.svg"} alt={b.product} className="w-full h-full object-cover" /> : b.product.slice(0,2)}
                </div>
                <span className="font-medium text-[#1a1a2e]">{b.product}</span>
              </div>
              <div className="px-3 py-3 text-[#1a1a2e]">{b.shipAmt}</div>
              <div className="px-3 py-3 text-[#1a1a2e]">{b.acceptAmt}</div>
              <div className="px-3 py-3 text-[#666]">{b.delivery}</div>
              <div className="px-3 py-3 text-[#666]">{b.settlement}</div>
              <div className="px-3 py-3 text-[11px] text-[#666] whitespace-pre-line">{b.buyer}</div>
              <div className="px-3 py-3 text-[11px] text-[#666] whitespace-pre-line">{b.seller}</div>
              <div className="px-3 py-3 text-[11px] text-[#666]">{b.expectTime}</div>
              <div className="px-3 py-3 text-[#666]">{b.tradeMode}</div>
              <div className="px-3 py-3 text-[#1a5fa8] font-medium text-[11px]">{b.orderStatus}</div>
              <div className="px-3 py-3 flex flex-col gap-1">
                <button onClick={() => setBatchDetailOpen(true)} className="text-[#1a5fa8] hover:underline text-left">查看详情</button>
                {b.orderStatus === "待卖家发起对账" && (
                  <button className="text-[#e8831a] hover:underline text-left font-medium">发起对账</button>
                )}
              </div>
            </div>
            {(b.accountNo || b.settlementNo) && (
              <div className="px-4 pb-3 flex items-center gap-8 text-[12px]">
                {b.accountNo && (
                  <div className="flex items-center gap-3 ml-auto">
                    <span className="text-[#999]">{b.accountTime}</span>
                    <span className="text-[#999]">对账单编号：<span className="font-medium text-[#333]">{b.accountNo}</span></span>
                    <button className="px-3 py-1 bg-[#1a5fa8] text-white text-[12px] rounded hover:bg-[#0d4a8a]">查看对账单</button>
                  </div>
                )}
                {b.settlementNo && (
                  <div className="flex items-center gap-3">
                    <span className="text-[#999]">{b.settlementTime}</span>
                    <span className="text-[#999]">结算单编号：<span className="font-medium text-[#333]">{b.settlementNo}</span></span>
                    <button className="px-3 py-1 bg-[#1a5fa8] text-white text-[12px] rounded hover:bg-[#0d4a8a]">查看结算单</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {batchDetailOpen && <BatchDetailDrawerInline onClose={() => setBatchDetailOpen(false)} />}
    </div>
  )
}

function BatchDetailDrawerInline({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex" onClick={onClose}>
      <div className="flex-1 bg-black/30" />
      <div className="w-[780px] bg-white h-full overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5] sticky top-0 bg-white z-10">
          <h2 className="text-[18px] font-bold text-[#1a1a2e]">批次详情</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-[#999] hover:text-[#333]" /></button>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div className="border border-[#e8edf5] rounded-lg p-5">
            <h3 className="text-[14px] font-bold text-[#1a5fa8] mb-4">基本信息</h3>
            <div className="grid grid-cols-3 gap-x-8 gap-y-4 text-[13px]">
              {[["批次单编号","PB457559072784"],["交易订单号","PO637075481616"],["批次状态","待买家验收"],["买家","广东新供销天润粮油集团有限公司"],["商家","南雄市社村合作农业发展有限公司"],["交易方式","担保交易"],["批次验收总金额","¥ 3000.00"],["批次发货总金额","¥ 3000.00"],["结算渠道","工行安心付"]].map(([k,v])=>(
                <div key={k}><div className="text-[#999] text-[12px] mb-0.5">{k}</div><div className="text-[#1a1a2e] font-medium">{v}</div></div>
              ))}
            </div>
          </div>
          <div className="border border-[#e8edf5] rounded-lg p-5">
            <h3 className="text-[14px] font-bold text-[#1a5fa8] mb-4">批次验收信息</h3>
            <table className="w-full text-[13px] border border-[#e8edf5]">
              <thead className="bg-[#f5f7fa]"><tr>{["商品","批次发货信息","批次验收信息","操作"].map(h=><th key={h} className="px-4 py-2.5 text-center font-semibold text-[#666]">{h}</th>)}</tr></thead>
              <tbody>
                <tr className="border-t border-[#e8edf5]">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-12 h-12 bg-[#e8f4fd] rounded flex items-center justify-center text-[#1a5fa8] text-[10px] font-bold shrink-0">丝苗</div><div><div className="text-[#1a1a2e] font-medium">丝苗米</div><div className="text-[12px] text-[#999]">规格：吨</div></div></div></td>
                  <td className="px-4 py-3 text-[13px] text-[#555]"><div>单价：¥3000.00</div><div>数量：1(吨)</div><div>总价：¥3000.00</div></td>
                  <td className="px-4 py-3 text-[13px] text-[#555]"><div>单价：¥3000.00</div><div>数量：1(吨)</div><div>总价：¥3000.00</div></td>
                  <td className="px-4 py-3 text-center"><button className="text-[#1a5fa8] text-[13px] hover:underline">详情</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="border border-[#e8edf5] rounded-lg p-5">
            <h3 className="text-[14px] font-bold text-[#1a5fa8] mb-4">其他相关信息</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-[13px]">
              {[["发货时间","2026-08-03 22:49:39"],["物流信息","无"],["快递/物流公司","广东天业冷链物流有限公司"],["物流单号","WL598760431760"],["收货人信息","广东省广州市越秀区菜园东路78号  张悦  155****2732"],[""],["装货时间","2026-08-01 00:00:00"],["到货时间","2026-08-13 00:00:00"],["运输要求","常温"],["发货备注","-"]].map(([k,v],i)=>(
                k ? <div key={i}><span className="text-[#999]">{k}：</span><span className="text-[#333]">{v}</span></div> : <div key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   对账记录列表
   ────────────────────────────────────────────── */
const RECONCILE_RECORDS = [
  { no: "CSOA462125430374", orderNo: "PO637075481616", batchNo: "PB457559072784", product: "丝苗米", buyer: "广东新供销天润粮油集团有限公司", acceptQty: "2.00吨", acceptAmt: "6000.00", prepaid: "3000.00", balance: "3000.00", settlement: "工行安心付", time: "2026-08-03 22:52:20", status: "待买家确认" },
  { no: "CSOA462125430375", orderNo: "PO637075481617", batchNo: "PB457559072785", product: "象牙香占", buyer: "湛江天润粮油有限公司", acceptQty: "5.00吨", acceptAmt: "35000.00", prepaid: "700.00", balance: "34300.00", settlement: "建行龙存管", time: "2026-08-01 10:12:30", status: "已确认" },
  { no: "CSOA462125430376", orderNo: "PO637075481618", batchNo: "PB457559072786", product: "大豆", buyer: "阳西天润粮油有限公司", acceptQty: "8.00吨", acceptAmt: "21600.00", prepaid: "270.00", balance: "21330.00", settlement: "工行安心付", time: "2026-07-28 16:40:05", status: "待卖家发起" },
]
const RECONCILE_STATUS: Record<string, string> = { "待买家确认": "text-[#e8831a]", "已确认": "text-[#16a34a]", "待卖家发起": "text-[#1a5fa8]" }

function ReconcileRecordList() {
  return (
    <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
      <div className="px-4 py-3 border-b border-[#e8edf5] flex items-center gap-3">
        <div className="flex items-center gap-2 border border-[#e8edf5] rounded px-3 py-1.5 w-[260px]">
          <Search className="w-3.5 h-3.5 text-[#aaa]" />
          <input placeholder="搜索对账单号/订单号/买方" className="flex-1 text-[13px] outline-none placeholder:text-[#aaa]" />
        </div>
        <button className="px-4 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999] flex items-center gap-1.5 ml-auto"><Download className="w-3.5 h-3.5" />导出</button>
      </div>
      <table className="w-full text-[12px]">
        <thead className="bg-[#f5f7fa] border-b border-[#e8edf5]">
          <tr>{["对账单号", "关联订单", "批次单号", "商品", "买方", "已验收数量", "已验收金额(元)", "预付款(元)", "待结算尾款(元)", "结算渠道", "对账时间", "状态", "操作"].map(h => <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#666] whitespace-nowrap">{h}</th>)}</tr>
        </thead>
        <tbody>
          {RECONCILE_RECORDS.map(r => (
            <tr key={r.no} className="border-b border-[#e8edf5] last:border-0 hover:bg-[#fafbfc]">
              <td className="px-3 py-3 text-[#1a5fa8] font-medium">{r.no}</td>
              <td className="px-3 py-3 text-[#1a5fa8]">{r.orderNo}</td>
              <td className="px-3 py-3 text-[#666]">{r.batchNo}</td>
              <td className="px-3 py-3 text-[#1a1a2e] font-medium">{r.product}</td>
              <td className="px-3 py-3 text-[#666]">{r.buyer}</td>
              <td className="px-3 py-3 text-[#333]">{r.acceptQty}</td>
              <td className="px-3 py-3 text-[#333]">¥{r.acceptAmt}</td>
              <td className="px-3 py-3 text-[#333]">¥{r.prepaid}</td>
              <td className="px-3 py-3 text-[#e8831a] font-medium">¥{r.balance}</td>
              <td className="px-3 py-3 text-[#666]">{r.settlement}</td>
              <td className="px-3 py-3 text-[#999]">{r.time}</td>
              <td className="px-3 py-3"><span className={`font-medium ${RECONCILE_STATUS[r.status] ?? "text-[#666]"}`}>{r.status}</span></td>
              <td className="px-3 py-3"><button className="text-[#1a5fa8] hover:underline">查看对账单</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between px-4 py-3 border-t border-[#e8edf5]">
        <span className="text-[13px] text-[#999]">共 {RECONCILE_RECORDS.length} 条记录</span>
        <button className="w-7 h-7 rounded text-[13px] bg-[#1a5fa8] text-white">1</button>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   结算记录列表
   ────────────────────────────────────────────── */
const SETTLEMENT_RECORDS = [
  { no: "SO491851817104", orderNo: "PO637075481616", reconcileNo: "CSOA462125430374", product: "丝苗米", buyer: "广东新供销天润粮油集团有限公司", amount: "6000.00", type: "尾款结算", channel: "工行安心付", payTime: "2026-08-03 22:53:42", status: "已结算" },
  { no: "SO491851817105", orderNo: "PO637075481617", reconcileNo: "CSOA462125430375", product: "象牙香占", buyer: "湛江天润粮油有限公司", amount: "35000.00", type: "尾款结算", channel: "建行龙存管", payTime: "2026-08-01 11:05:18", status: "已结算" },
  { no: "SO491851817106", orderNo: "PO637075481618", reconcileNo: "CSOA462125430376", product: "大豆", buyer: "阳西天润粮油有限公司", amount: "21600.00", type: "预付款", channel: "工行安心付", payTime: "", status: "待付款" },
]
const SETTLEMENT_STATUS: Record<string, string> = { "已结算": "text-[#16a34a]", "待付款": "text-[#e8831a]" }

function SettlementRecordList() {
  return (
    <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
      <div className="px-4 py-3 border-b border-[#e8edf5] flex items-center gap-3">
        <div className="flex items-center gap-2 border border-[#e8edf5] rounded px-3 py-1.5 w-[260px]">
          <Search className="w-3.5 h-3.5 text-[#aaa]" />
          <input placeholder="搜索结算单号/订单号/买方" className="flex-1 text-[13px] outline-none placeholder:text-[#aaa]" />
        </div>
        <button className="px-4 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999] flex items-center gap-1.5 ml-auto"><Download className="w-3.5 h-3.5" />导出</button>
      </div>
      <table className="w-full text-[12px]">
        <thead className="bg-[#f5f7fa] border-b border-[#e8edf5]">
          <tr>{["结算单号", "关联订单", "对账单号", "商品", "买方", "结算金额(元)", "结算类型", "结算渠道", "支付时间", "状态", "操作"].map(h => <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#666] whitespace-nowrap">{h}</th>)}</tr>
        </thead>
        <tbody>
          {SETTLEMENT_RECORDS.map(r => (
            <tr key={r.no} className="border-b border-[#e8edf5] last:border-0 hover:bg-[#fafbfc]">
              <td className="px-3 py-3 text-[#1a5fa8] font-medium">{r.no}</td>
              <td className="px-3 py-3 text-[#1a5fa8]">{r.orderNo}</td>
              <td className="px-3 py-3 text-[#666]">{r.reconcileNo}</td>
              <td className="px-3 py-3 text-[#1a1a2e] font-medium">{r.product}</td>
              <td className="px-3 py-3 text-[#666]">{r.buyer}</td>
              <td className="px-3 py-3 text-[#1a1a2e] font-medium">¥{r.amount}</td>
              <td className="px-3 py-3 text-[#666]">{r.type}</td>
              <td className="px-3 py-3 text-[#666]">{r.channel}</td>
              <td className="px-3 py-3 text-[#999]">{r.payTime || "-"}</td>
              <td className="px-3 py-3"><span className={`font-medium ${SETTLEMENT_STATUS[r.status] ?? "text-[#666]"}`}>{r.status}</span></td>
              <td className="px-3 py-3"><button className="text-[#1a5fa8] hover:underline">查看结算单</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between px-4 py-3 border-t border-[#e8edf5]">
        <span className="text-[13px] text-[#999]">共 {SETTLEMENT_RECORDS.length} 条记录</span>
        <button className="w-7 h-7 rounded text-[13px] bg-[#1a5fa8] text-white">1</button>
      </div>
    </div>
  )
}

const MAIN_TABS = ["商品订单", "批次单", "对账记录", "结算记录"] as const
type MainTab = typeof MAIN_TABS[number]

export default function WoXiaoshouPage() {
  const [mainTab, setMainTab] = useState<MainTab>("商品订单")
  const [activeTab, setActiveTab] = useState("全部")
  const [shippingModal, setShippingModal] = useState(false)
  const [contractModal, setContractModal] = useState(false)

  const getMainBtn = (order: typeof ORDERS[0]) => {
    const map: Record<string, { label: string; color: string; onClick: () => void }> = {
      "确认订单":     { label: "确认订单",     color: "text-[#1a5fa8]", onClick: () => {}                     },
      "提醒":         { label: "提醒付款",     color: "text-[#e8831a]", onClick: () => {}                     },
      "发货":         { label: "发货",         color: "text-[#1a5fa8]", onClick: () => setShippingModal(true) },
      "发起对账":     { label: "发起对账",     color: "text-[#1a5fa8]", onClick: () => {}                     },
    }
    return order.action ? (map[order.action] ?? null) : null
  }

  return (
    <div>
      <div className="flex items-center gap-2 text-[13px] text-[#999] mb-4">
        <span>订单管理</span>
        <span>/</span>
        <span className="text-[#1a5fa8] font-medium">我销售</span>
      </div>

      {/* 主 Tab 切换 */}
      <div className="flex border-b border-[#e8edf5] mb-5 bg-white rounded-t-lg">
        {MAIN_TABS.map(t => (
          <button key={t} onClick={() => setMainTab(t)}
            className={`px-6 py-3 text-[14px] border-b-2 transition-colors font-medium ${mainTab===t?"border-[#1a5fa8] text-[#1a5fa8]":"border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>
            {t}
          </button>
        ))}
      </div>

      {mainTab === "批次单" && <BatchDanList />}
      {mainTab === "对账记录" && <ReconcileRecordList />}
      {mainTab === "结算记录" && <SettlementRecordList />}
      {mainTab === "商品订单" && <>

      {/* 搜索栏 */}
      <div className="bg-white rounded-lg border border-[#e8edf5] p-4 mb-4 space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <label className="text-[13px] text-[#555] w-[88px] shrink-0">交易订单编号</label>
            <input className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入交易订单编号" />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[13px] text-[#555] w-[32px] shrink-0">买方</label>
            <input className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[13px] text-[#555] w-[56px] shrink-0">商品名称</label>
            <input className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <label className="text-[13px] text-[#555] w-[56px] shrink-0">订单状态</label>
            <select className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] text-[#999]">
              <option value="">请选择</option>
              {STATUS_TABS.slice(1).map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[13px] text-[#555] w-[56px] shrink-0">下单时间</label>
            <div className="flex-1 flex items-center gap-1">
              <input type="date" className="flex-1 border border-[#dde3ec] rounded px-2 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              <span className="text-[#999]">至</span>
              <input type="date" className="flex-1 border border-[#dde3ec] rounded px-2 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[13px] text-[#555] w-[72px] shrink-0">要求收货时间</label>
            <div className="flex-1 flex items-center gap-1">
              <input type="date" className="flex-1 border border-[#dde3ec] rounded px-2 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              <span className="text-[#999]">至</span>
              <input type="date" className="flex-1 border border-[#dde3ec] rounded px-2 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] flex items-center gap-1.5"><Search className="w-3.5 h-3.5" />查询</button>
          <button className="px-4 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">清空</button>
          <button className="px-4 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999] flex items-center gap-1.5"><Download className="w-3.5 h-3.5" />导出</button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#e8edf5]">
        <div className="flex border-b border-[#e8edf5] overflow-x-auto">
          {STATUS_TABS.map(t=>(
            <button key={t} onClick={()=>setActiveTab(t)} className={`px-5 py-3 text-[13px] whitespace-nowrap border-b-2 transition-colors ${activeTab===t?"border-[#1a5fa8] text-[#1a5fa8] font-semibold":"border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>{t}</button>
          ))}
        </div>

        <div className="grid text-[12px] font-semibold text-[#666] bg-[#f5f7fa] border-b border-[#e8edf5]" style={{gridTemplateColumns:"2fr 1fr 1fr 2fr 2fr 2fr 1fr 2fr 1fr 1fr 1.5fr"}}>
          {["订单信息","订单金额","预付款金额","订单来源","买方","收货人信息","配送方式","计划收货时间","结算渠道","订单状态","操作"].map(h=><div key={h} className="px-3 py-2.5">{h}</div>)}
        </div>

        {ORDERS.map(order => {
          const mainBtn = getMainBtn(order)
          return (
            <div key={order.id} className="border-b border-[#e8edf5] last:border-0">
              <div className="px-4 py-2 bg-[#fafbfc] flex items-center gap-4 text-[12px] text-[#666]">
                <span>订单编号：{order.id}</span>
                <span>下单时间：{order.time}</span>
                <div className="ml-auto flex gap-2">
                  <Link href={`/merchant/chanxiao/orders/wo-xiaoshou/${order.id}`} className="text-[#1a5fa8] hover:underline">查看详情</Link>
                  <span className="text-[#dde3ec]">|</span>
                  <button onClick={()=>setContractModal(true)} className="text-[#1a5fa8] hover:underline">合同/发票</button>
                  <span className="text-[#dde3ec]">|</span>
                  <span className="text-[#999]">联系买方</span>
                </div>
              </div>
              <div className="grid items-center text-[12px]" style={{gridTemplateColumns:"2fr 1fr 1fr 2fr 2fr 2fr 1fr 2fr 1fr 1fr 1.5fr"}}>
                <div className="px-3 py-3"><div className="font-medium text-[#1a1a2e]">{order.product}</div><div className="text-[#999]">规格：{order.spec}</div></div>
                <div className="px-3 py-3 text-[#1a1a2e]">¥{order.amount.toLocaleString()}.00</div>
                <div className="px-3 py-3 text-[#1a1a2e]">¥{order.deposit}.00</div>
                <div className="px-3 py-3 text-[#666]">{order.source}</div>
                <div className="px-3 py-3 text-[11px] text-[#666]">{order.buyer}</div>
                <div className="px-3 py-3 text-[11px] text-[#666] space-y-0.5">
                  <div>收货人：{order.receiver}</div><div>手机号：{order.phone}</div><div>收货地址：{order.address}</div>
                </div>
                <div className="px-3 py-3 text-[#666]">{order.delivery}</div>
                <div className="px-3 py-3 text-[11px] text-[#666]">{order.planTime}</div>
                <div className="px-3 py-3 text-[#666]">{order.settlement}</div>
                <div className="px-3 py-3"><span className={`text-[11px] font-medium ${order.status==="生产履约"?"text-[#1a5fa8]":order.status==="待发货"?"text-[#e8831a]":"text-[#666]"}`}>{order.status}</span></div>
                <div className="px-3 py-3 flex flex-col gap-1">
                  {mainBtn && <button onClick={mainBtn.onClick} className={`${mainBtn.color} hover:underline text-[12px] text-left`}>{mainBtn.label}</button>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      </>}

      {shippingModal && <ShippingModal onClose={() => setShippingModal(false)} />}
    </div>
  )
}
