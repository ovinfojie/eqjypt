"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Download, X, Upload, FileText, CheckSquare } from "lucide-react"

const ORDERS = [
  { id:"2434059405460956", time:"2026-04-20 22:05:48", product:"南晶香占", spec:"吨", amount:2300, deposit:230, source:"订单农业服务", buyer:"广东新供销天润粮油集团有限公司", receiver:"张悦", phone:"136****9768", address:"广州市越秀区荣园东路80号", delivery:"卖家配送", planTime:"2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement:"建行龙存款", status:"待卖方确认", action:"确认订单" },
  { id:"2434059405460957", time:"2026-04-20 22:05:48", product:"丝苗米",   spec:"吨", amount:5000, deposit:500, source:"订单农业服务", buyer:"广东新供销天润粮油集团有限公司", receiver:"偶奇", phone:"138****8888", address:"上海市浦东新区市镇区2888号", delivery:"卖家配送", planTime:"2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement:"建行龙存款", status:"待付预付款", action:"提醒" },
  { id:"2434059405460958", time:"2026-04-20 22:05:48", product:"大豆",     spec:"吨", amount:27000, deposit:270, source:"订单农业服务", buyer:"湛江天润粮油有限公司", receiver:"张翰", phone:"1234567898", address:"广东省肇庆市云顶花园83号", delivery:"卖家配送", planTime:"2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement:"工行安心付", status:"待发货", action:"发货" },
  { id:"2434059405460959", time:"2026-04-20 22:05:48", product:"小麦",     spec:"吨", amount:6000, deposit:600, source:"订单农业服务", buyer:"阳西天润粮油有限公司", receiver:"张含", phone:"13453679768", address:"广州市越秀区荣园东路79号", delivery:"卖家配送", planTime:"2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement:"工行安心付", status:"待收货", action:null },
  { id:"2434059405460960", time:"2026-04-20 22:05:48", product:"象牙香占", spec:"吨", amount:7000, deposit:700, source:"订单农业服务", buyer:"四会天润粮油有限公司", receiver:"张启明", phone:"13457379768", address:"广州市越秀区荣园东路66号", delivery:"卖家配送", planTime:"2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement:"工行安心付", status:"待结算", action:"发起对账" },
  { id:"2434059405460961", time:"2026-04-20 22:05:48", product:"象牙香占", spec:"吨", amount:7000, deposit:700, source:"订单农业服务", buyer:"四会天润粮油有限公司", receiver:"张明明", phone:"13457379768", address:"广州市越秀区荣园东路66号", delivery:"卖家配送", planTime:"2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement:"工行安心付", status:"生产履约", action:"查看履约情况" },
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

/* ─── 订单变更弹窗 ─── */
function OrderChangeModal({ onClose }: { onClose: () => void }) {
  const [reason, setReason] = useState("")
  const [qty, setQty] = useState("")
  const [price, setPrice] = useState("")
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-lg w-[520px] shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
          <h3 className="text-[15px] font-bold text-[#1a1a2e]">订单变更</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-[#999]" /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="bg-[#f5f7fa] rounded p-3 text-[13px] space-y-1">
            <div className="flex gap-4"><span className="text-[#999] w-[72px]">订单编号</span><span className="text-[#333]">2434059405460958</span></div>
            <div className="flex gap-4"><span className="text-[#999] w-[72px]">商品</span><span className="text-[#333]">大豆（吨）</span></div>
            <div className="flex gap-4"><span className="text-[#999] w-[72px]">当前数量</span><span className="text-[#333]">27000吨</span></div>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1.5">变更原因 <span className="text-red-500">*</span></label>
            <div className="space-y-2">
              {["数量变更", "价格调整", "交货时间变更", "其他原因"].map(r => (
                <label key={r} className="flex items-center gap-2 text-[13px] text-[#444] cursor-pointer">
                  <input type="radio" name="xs_change_reason" value={r} onChange={() => setReason(r)} className="accent-[#1a5fa8]" />{r}
                </label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">变更后数量</label>
              <input value={qty} onChange={e => setQty(e.target.value)} className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入（吨）" />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">变更后单价</label>
              <input value={price} onChange={e => setPrice(e.target.value)} className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入（元/吨）" />
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1.5">补充说明</label>
            <textarea rows={3} className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] resize-none focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入补充说明（选填）" />
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#e8edf5]">
          <button onClick={onClose} className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">取消</button>
          <button className="px-6 py-2 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded hover:bg-[#0d4a8a]">提交变更</button>
        </div>
      </div>
    </div>
  )
}

/* ─── 申请取消弹窗 ─── */
function ApplyCancelModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-lg w-[480px] shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
          <h3 className="text-[15px] font-bold text-[#1a1a2e]">申请取消</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-[#999]" /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="bg-[#fff8e6] border border-[#f5d78e] rounded px-4 py-3 text-[13px] text-[#8a6a00]">
            申请取消后需等待对方同意，预付款将在对方同意后3个工作日内原路退回。
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1.5">取消原因 <span className="text-red-500">*</span></label>
            <div className="space-y-2">
              {["价格变动，重新协商", "货源不足，无法履约", "买方要求取消", "其他原因"].map(r => (
                <label key={r} className="flex items-center gap-2 text-[13px] text-[#444] cursor-pointer">
                  <input type="radio" name="xs_apply_cancel_reason" value={r} className="accent-[#1a5fa8]" />{r}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1.5">备注说明</label>
            <textarea className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] resize-none focus:outline-none focus:border-[#1a5fa8]" rows={3} placeholder="请输入备注（选填）" />
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#e8edf5]">
          <button onClick={onClose} className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">取消</button>
          <button className="px-6 py-2 bg-[#e04040] text-white text-[13px] font-semibold rounded hover:bg-[#c03030]">提交申请</button>
        </div>
      </div>
    </div>
  )
}

export default function WoXiaoshouPage() {
  const [activeTab, setActiveTab] = useState("全部")
  const [shippingModal, setShippingModal] = useState(false)
  const [contractModal, setContractModal] = useState(false)
  const [changeModal, setChangeModal] = useState(false)
  const [applyCancelModal, setApplyCancelModal] = useState(false)

  const getMainBtn = (order: typeof ORDERS[0]) => {
    const map: Record<string, { label: string; color: string; onClick: () => void }> = {
      "确认订单":     { label: "确认订单",     color: "text-[#1a5fa8]", onClick: () => {}                     },
      "提醒":         { label: "提醒付款",     color: "text-[#e8831a]", onClick: () => {}                     },
      "发货":         { label: "发货",         color: "text-[#1a5fa8]", onClick: () => setShippingModal(true) },
      "发起对账":     { label: "发起对账",     color: "text-[#1a5fa8]", onClick: () => {}                     },
      "查看履约情况": { label: "查看履约情况", color: "text-[#1a5fa8]", onClick: () => {}                     },
    }
    return order.action ? (map[order.action] ?? null) : null
  }

  // 卖方：待付预付款/待发货/生产履约 才允许变更和申请取消；
  // 待卖方确认直接确认或拒绝，无需变更/取消；待收货/待结算订单已履行不可取消
  const CHANGEABLE_STATUSES = new Set(["待付预付款", "待发货", "生产履约"])
  const CANCELABLE_STATUSES = new Set(["待付预付款", "待发货", "生产履约"])

  return (
    <div>
      <div className="flex items-center gap-2 text-[13px] text-[#999] mb-4">
        <span>订单管理</span>
        <span>/</span>
        <span className="text-[#1a5fa8] font-medium">我销售</span>
      </div>

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
          const canChange = CHANGEABLE_STATUSES.has(order.status)
          const canCancel = CANCELABLE_STATUSES.has(order.status)
          return (
            <div key={order.id} className="border-b border-[#e8edf5] last:border-0">
              <div className="px-4 py-2 bg-[#fafbfc] flex items-center gap-4 text-[12px] text-[#666]">
                <span>订单编号：{order.id}</span>
                <span>下单时间：{order.time}</span>
                <div className="ml-auto flex gap-2">
                  <Link href={`/merchant/dingdan-nongye/order-mgmt/wo-xiaoshou/${order.id}`} className="text-[#1a5fa8] hover:underline">查看详情</Link>
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
                  {canChange && (
                    <button onClick={() => setChangeModal(true)} className="text-[#1a5fa8] hover:underline text-[12px] text-left">订单变更</button>
                  )}
                  {canCancel && (
                    <button onClick={() => setApplyCancelModal(true)} className="text-[#e04040] hover:underline text-[12px] text-left">申请取消</button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {shippingModal    && <ShippingModal onClose={() => setShippingModal(false)} />}
      {changeModal      && <OrderChangeModal onClose={() => setChangeModal(false)} />}
      {applyCancelModal && <ApplyCancelModal onClose={() => setApplyCancelModal(false)} />}
    </div>
  )
}
