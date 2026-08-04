"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Download, X, Upload, FileText } from "lucide-react"

/* ─── 模拟数据 ─── */
const ORDERS = [
  { id: "2434059405460956", time: "2026-04-20 22:05:48", product: "南晶香占", spec: "吨", amount: 2300, deposit: 230, source: "订单农业服务", seller: "南雄市社村合作农业发展有限公司（粮油业务部）", receiver: "张悦", phone: "13647589768", address: "广州市越秀区荣园东路80号", delivery: "卖家配送", planTime: "2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement: "建行龙存款", status: "待卖方确认", action: "取消订单" },
  { id: "2434059405460957", time: "2026-04-20 22:05:48", product: "丝苗米", spec: "吨", amount: 5000, deposit: 500, source: "订单农业服务", seller: "高州市社村合作农业发展有限公司（粮油业务部）", receiver: "偶奇", phone: "138****8888", address: "上海市浦东新区市镇区2888号", delivery: "卖家配送", planTime: "2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement: "建行龙存款", status: "待付预付款", action: "付预付款" },
  { id: "2434059405460958", time: "2026-04-20 22:05:48", product: "大豆", spec: "吨", amount: 27000, deposit: 270, source: "订单农业服务", seller: "佛山市社村合作农业发展有限公司（粮油业务部）", receiver: "张翰", phone: "1234567898", address: "广东省肇庆市云顶花园83号", delivery: "卖家配送", planTime: "2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement: "工行安心付", status: "待发货", action: "终止发货" },
  { id: "2434059405460959", time: "2026-04-20 22:05:48", product: "小麦", spec: "吨", amount: 6000, deposit: 600, source: "订单农业服务", seller: "湛江市社村合作农业发展有限公司（粮油业务部）", receiver: "张含", phone: "13453679768", address: "广州市越秀区荣园东路79号", delivery: "卖家配送", planTime: "2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement: "工行安心付", status: "待收货", action: "验收" },
  { id: "2434059405460960", time: "2026-04-20 22:05:48", product: "象牙香占", spec: "吨", amount: 7000, deposit: 700, source: "订单农业服务", seller: "汕尾市社村合作农业发展有限公司（粮油业务部）", receiver: "张启明", phone: "13457379768", address: "广州市越秀区荣园东路66号", delivery: "卖家配送", planTime: "2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement: "工行安心付", status: "待结算", action: "查看对账单" },
]

const STATUS_TABS = ["全部", "待卖方确认", "待付预付款", "待发货", "待收货", "待结算", "已完成", "已关闭"]

/* ─── 终止发货申请弹窗（填写理由 + 上传附件） ─── */
function TerminateShippingModal({ onClose }: { onClose: () => void }) {
  const [reason, setReason] = useState("")
  const [files, setFiles] = useState<string[]>([])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-lg w-[520px] shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
          <h3 className="text-[15px] font-bold text-[#1a1a2e]">终止发货申请</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-[#999]" /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="bg-[#fff8e6] border border-[#f5d78e] rounded px-4 py-3 text-[13px] text-[#8a6a00]">
            终止发货为申请操作，提交后需等待卖方及平台确认，确认通过后订单将终止后续发货流程。
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1.5">终止理由 <span className="text-red-500">*</span></label>
            <textarea value={reason} onChange={e => setReason(e.target.value)} rows={4} maxLength={200}
              className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] resize-none focus:outline-none focus:border-[#1a5fa8]"
              placeholder="请填写终止发货的具体理由" />
            <div className="text-right text-[12px] text-[#999]">{reason.length}/200</div>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1.5">上传附件</label>
            <label className="flex items-center gap-2 px-4 py-4 border-2 border-dashed border-[#dde3ec] rounded-lg cursor-pointer hover:border-[#1a5fa8] hover:bg-[#f8faff] transition-all">
              <Upload className="w-4 h-4 text-[#aaa]" />
              <span className="text-[12px] text-[#999]">支持 png/jpg/pdf/word/excel 文件，不超过 100M</span>
              <input type="file" className="hidden" multiple
                onChange={e => setFiles(Array.from(e.target.files ?? []).map(f => f.name))} />
            </label>
            {files.length > 0 && (
              <div className="mt-2 space-y-1">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-[#f5f7fa] rounded text-[12px] text-[#1a5fa8]">
                    <FileText className="w-3.5 h-3.5" />{f}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#e8edf5]">
          <button onClick={onClose} className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">取消</button>
          <button disabled={!reason.trim()} onClick={onClose}
            className={`px-6 py-2 text-white text-[13px] font-semibold rounded ${reason.trim() ? "bg-[#e04040] hover:bg-[#c03030]" : "bg-[#e0a0a0] cursor-not-allowed"}`}>提交申请</button>
        </div>
      </div>
    </div>
  )
}

/* ─── 批次验收弹窗（按图2样式） ─── */
const ACCEPT_ROWS = [
  { inNo: "IN20260720-01", plate: "粤A12345", grade: "一等粮", price: "1000.00", qty: "1吨", total: "1000.00" },
  { inNo: "IN20260720-02", plate: "粤B67890", grade: "一等粮", price: "1000.00", qty: "1吨", total: "1000.00" },
  { inNo: "IN20260720-03", plate: "粤B67840", grade: "一等粮", price: "1000.00", qty: "0.5吨", total: "500.00" },
  { inNo: "IN20260720-04", plate: "粤B67790", grade: "二等粮", price: "900.00", qty: "0.5吨", total: "450.00" },
]
function BatchAcceptModal({ onClose }: { onClose: () => void }) {
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const [reject, setReject] = useState<"yes" | "no" | "">("")
  const allChecked = checked.size === ACCEPT_ROWS.length
  const toggleAll = () => setChecked(allChecked ? new Set() : new Set(ACCEPT_ROWS.map((_, i) => i)))
  const toggle = (i: number) => {
    const next = new Set(checked)
    next.has(i) ? next.delete(i) : next.add(i)
    setChecked(next)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-lg w-[900px] max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
          <h3 className="text-[18px] font-bold text-[#1a1a2e]">批次验收</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-[#999]" /></button>
        </div>
        <div className="px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-8 text-[13px] text-[#666]">
              <span>批次单编号：<span className="text-[#333]">PB489238696064</span></span>
              <span>交易订单编号：<span className="text-[#333]">YFK495341494400</span></span>
            </div>
            <select className="border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] text-[#333] focus:outline-none focus:border-[#1a5fa8]">
              <option>按单价和总价验收</option>
              <option>按总价验收</option>
            </select>
          </div>
          <h4 className="text-[14px] font-bold text-[#1a5fa8] border-l-4 border-[#1a5fa8] pl-2 mb-3">验收信息</h4>
          <table className="w-full text-[13px] border border-[#e8edf5] mb-3">
            <thead className="bg-[#f5f7fa]">
              <tr>
                <th className="px-3 py-2.5 text-left font-semibold text-[#666]">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" checked={allChecked} onChange={toggleAll} className="accent-[#1a5fa8]" />全选
                  </label>
                </th>
                {["入库单号", "车牌号", "质检等级", "验收单价(单位)", "验收数量(单位)", "验收总价(元)"].map(h => (
                  <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#666]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ACCEPT_ROWS.map((r, i) => (
                <tr key={r.inNo} className="border-t border-[#e8edf5]">
                  <td className="px-3 py-3"><input type="checkbox" checked={checked.has(i)} onChange={() => toggle(i)} className="accent-[#1a5fa8]" /></td>
                  <td className="px-3 py-3 text-[#333]">{r.inNo}</td>
                  <td className="px-3 py-3 text-[#333]">{r.plate}</td>
                  <td className="px-3 py-3 text-[#333]">{r.grade}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <input defaultValue={r.price} className="w-20 border border-[#dde3ec] rounded px-2 py-1 text-[13px] text-center focus:outline-none focus:border-[#1a5fa8]" />
                      <span className="text-[12px] text-[#999]">元/吨</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-[#333]">{r.qty}</td>
                  <td className="px-3 py-3"><input defaultValue={r.total} className="w-24 border border-[#dde3ec] rounded px-2 py-1 text-[13px] text-center focus:outline-none focus:border-[#1a5fa8]" /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right text-[13px] mb-5">
            本次验收数量合计：<span className="text-[#e04040] font-semibold">3吨</span>　验收金额合计：<span className="text-[#e04040] font-semibold">¥2950.00</span>
          </div>
          <div className="flex items-start gap-4 mb-4">
            <label className="text-[13px] text-[#555] w-[72px] shrink-0 pt-1">上传凭证</label>
            <div>
              <label className="inline-flex items-center gap-2 px-4 py-2 border border-[#dde3ec] rounded cursor-pointer hover:border-[#1a5fa8] text-[13px] text-[#555]">
                <Upload className="w-4 h-4" />上传附件
                <input type="file" className="hidden" multiple />
              </label>
              <span className="ml-3 text-[12px] text-[#999]">支持png/jpg/pdf/word/excel文件等，不超过100M</span>
            </div>
          </div>
          <div className="flex items-start gap-4 mb-4">
            <label className="text-[13px] text-[#555] w-[72px] shrink-0 pt-1">验收备注</label>
            <textarea rows={3} placeholder="请输入" className="flex-1 border border-[#dde3ec] rounded px-3 py-2 text-[13px] resize-none focus:outline-none focus:border-[#1a5fa8]" />
          </div>
          <div className="flex items-center gap-6 mb-2">
            <label className="text-[13px] text-[#555]">是否拒收本批次：</label>
            {[["yes", "是"], ["no", "否"]].map(([v, l]) => (
              <label key={v} className="flex items-center gap-1.5 text-[13px] text-[#444] cursor-pointer">
                <input type="radio" name="reject_batch" checked={reject === v} onChange={() => setReject(v as "yes" | "no")} className="accent-[#1a5fa8]" />{l}
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-4 px-6 py-5 border-t border-[#e8edf5]">
          <button onClick={onClose} className="px-10 py-2.5 border border-[#dde3ec] text-[#555] text-[14px] rounded hover:border-[#999]">取消</button>
          <button onClick={onClose} className="px-10 py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a]">确认验收</button>
        </div>
      </div>
    </div>
  )
}

/* ─── 对账单弹窗 ─── */
function ReconciliationModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-lg w-[680px] max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
          <div>
            <h3 className="text-[15px] font-bold text-[#1a1a2e]">对账单</h3>
            <div className="text-[12px] text-[#999] mt-0.5">对账单编号：CSOA46125430 3744</div>
          </div>
          <button onClick={onClose}><X className="w-5 h-5 text-[#999]" /></button>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div className="grid grid-cols-3 gap-x-6 gap-y-3 text-[13px]">
            {[["订单编号","YFK622579765392"],["商品","丝苗米（吨）"],["下单数量","10.00吨"],["下单金额","¥30,000.00"],["已验收数量","2.00吨"],["已验收金额","¥6,000.00"],["待收货数量","8.00吨"],["结算方式","预付款"],["支付渠道","工行安心付"]].map(([k,v]) => (
              <div key={k}>
                <div className="text-[#999] mb-0.5">{k}</div>
                <div className="text-[#333] font-medium">{v}</div>
              </div>
            ))}
          </div>
          <div>
            <h4 className="text-[13px] font-semibold text-[#1a1a2e] mb-3">批次验收明细</h4>
            <table className="w-full text-[12px] border border-[#e8edf5] rounded overflow-hidden">
              <thead className="bg-[#f5f7fa]">
                <tr>{["批次编号","验收时间","验收数量","验收单价","验收金额","状态"].map(h => <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#666]">{h}</th>)}</tr>
              </thead>
              <tbody>
                {[["PB489238696064","2026-07-08 10:40:45","1.00吨","¥3,000.00","¥3,000.00","已确认"],["PB489238696065","2026-07-09 14:20:00","1.00吨","¥3,000.00","¥3,000.00","已确认"]].map((r,i) => (
                  <tr key={i} className="border-t border-[#e8edf5]">
                    {r.map((c,j) => <td key={j} className="px-3 py-2.5 text-[#333]">{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-[#f5f7fa] rounded p-4 text-[13px]">
            <div className="flex justify-between mb-1.5"><span className="text-[#666]">已验收金额合计</span><span className="font-semibold text-[#1a1a2e]">¥6,000.00</span></div>
            <div className="flex justify-between mb-1.5"><span className="text-[#666]">预付款</span><span className="font-semibold text-[#1a1a2e]">¥3,000.00</span></div>
            <div className="flex justify-between border-t border-[#e8edf5] pt-1.5 mt-1.5"><span className="text-[#666] font-medium">待支付尾款</span><span className="font-bold text-[#e8831a] text-[15px]">¥3,000.00</span></div>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#e8edf5]">
          <button onClick={onClose} className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">关闭</button>
          <button className="px-6 py-2 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded hover:bg-[#0d4a8a]">确认对账</button>
        </div>
      </div>
    </div>
  )
}

/* ─── 合同弹窗 ─── */
function ContractModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"view" | "add">("view")
  const [addTab, setAddTab] = useState<"standard" | "upload">("standard")
  const [contractName, setContractName] = useState("")
  const [contractTerms, setContractTerms] = useState("")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-lg w-[720px] max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
          <div className="flex items-center gap-4">
            <h3 className="text-[15px] font-bold text-[#1a1a2e]">合同 / 发票</h3>
            <div className="flex gap-1 bg-[#f5f7fa] rounded p-0.5">
              {(["view","add"] as const).map(t => (
                <button key={t} onClick={() => setTab(t)} className={`px-4 py-1 rounded text-[13px] transition-colors ${tab===t?"bg-white text-[#1a5fa8] font-semibold shadow-sm":"text-[#666] hover:text-[#1a5fa8]"}`}>
                  {t==="view"?"查看合同":"新增合同"}
                </button>
              ))}
            </div>
          </div>
          <button onClick={onClose}><X className="w-5 h-5 text-[#999]" /></button>
        </div>

        {tab === "view" ? (
          <div className="px-6 py-5 space-y-5">
            {/* 合同信息 */}
            <div>
              <h4 className="text-[13px] font-semibold text-[#1a1a2e] flex items-center gap-2 mb-3">
                <span className="w-1 h-4 bg-[#1a5fa8] rounded inline-block" />
                合同信息
              </h4>
              <div className="border border-[#e8edf5] rounded p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#e8f4fd] rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#1a5fa8]" />
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-[#1a1a2e]">2026年粮食采购合同</div>
                    <div className="text-[12px] text-[#999]">HT-2026-06001</div>
                  </div>
                </div>
                <button className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]">查看合同</button>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {[["甲方（买方）","广东新供销天润粮油集团有限公司","待处理"],["乙方（卖方）","南雄市社村合作农业发展有限公司","已签章"]].map(([side,name,status]) => (
                  <div key={side} className="border border-[#e8edf5] rounded p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[12px] text-[#666]">{side}</span>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${status==="已签章"?"bg-[#e6f9f0] text-[#0a7a45]":"bg-[#fff3e0] text-[#e8831a]"}`}>{status}</span>
                    </div>
                    <div className="text-[13px] font-medium text-[#1a1a2e] mb-3">{name}</div>
                    {status === "待处理" && (
                      <button className="px-3 py-1 border border-[#1a5fa8] text-[#1a5fa8] text-[12px] rounded hover:bg-[#e8f4fd]">签章/签字</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* 发票信息 */}
            <div>
              <h4 className="text-[13px] font-semibold text-[#1a1a2e] flex items-center gap-2 mb-3">
                <span className="w-1 h-4 bg-[#1a5fa8] rounded inline-block" />
                发票信息
              </h4>
              <div className="grid grid-cols-3 gap-x-6 gap-y-3 text-[13px]">
                {[["发票抬头","广东新供销天润粮油集团有限公司"],["纳税人识别号","91440101MA5D0F0E0K"],["发票类型","增值税专用发票"],["联系电话","020-88886666"],["注册地址","广东省广州市天河区天河路198号"],["���户银行","中国工商银行股份有限公司广州天河支行"],["银行账号","440000800015"],["接收邮箱","168722@qq.com"]].map(([k,v]) => (
                  <div key={k}>
                    <div className="text-[#999] mb-0.5">{k}</div>
                    <div className="text-[#333] font-medium">{v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <div className="text-[13px] text-[#999] mb-1.5">电子发票</div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#f5f7fa] rounded border border-[#e8edf5] text-[13px]">
                  <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center text-white text-[9px] font-bold">PDF</div>
                  <span className="text-[#1a5fa8]">发票文件.pdf</span>
                  <span className="ml-auto flex gap-2 text-[#999]">
                    <Download className="w-4 h-4 cursor-pointer hover:text-[#1a5fa8]" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-6 py-5">
            <div className="flex border-b border-[#e8edf5] mb-5">
              {(["standard","upload"] as const).map(t => (
                <button key={t} onClick={() => setAddTab(t)} className={`px-4 py-2.5 text-[13px] border-b-2 transition-colors ${addTab===t?"border-[#1a5fa8] text-[#1a5fa8] font-semibold":"border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>
                  {t==="standard"?"标准合同模板":"上传盖章合同"}
                </button>
              ))}
            </div>
            {addTab === "standard" ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#333] mb-1.5">选择合同模板 <span className="text-red-500">*</span></label>
                  <div className="flex gap-2">
                    <select className="flex-1 border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] text-[#999]">
                      <option value="">请选择</option>
                      <option>2026年粮食采购合同模板</option>
                      <option>农产品购销合同�����板</option>
                    </select>
                    <button className="px-3 py-2 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded hover:bg-[#e8f4fd]">新增</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#333] mb-1.5">关联订单编号 <span className="text-red-500">*</span></label>
                    <select className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] text-[#999]">
                      <option value="">请输入</option>
                      <option>YFK622579765392</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#333] mb-1.5">订单类型</label>
                    <input className="w-full border border-[#e8edf5] bg-[#f5f7fa] rounded px-3 py-2 text-[13px] text-[#999]" placeholder="根据所选订单自动获取" readOnly />
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#333] mb-1.5">商品信息</label>
                  <table className="w-full border border-[#e8edf5] rounded text-[12px]">
                    <thead className="bg-[#f5f7fa]"><tr>{["序号","商品SKU编码","商品名称","采购数量(单位)","采购单价(元/吨)","含税金额(元)"].map(h=><th key={h} className="px-3 py-2 text-left font-semibold text-[#666]">{h}</th>)}</tr></thead>
                    <tbody>
                      <tr className="border-t border-[#e8edf5]"><td className="px-3 py-2">1</td><td className="px-3 py-2">K463401788544</td><td className="px-3 py-2">象牙粘湿谷</td><td className="px-3 py-2">8.85吨</td><td className="px-3 py-2">2840</td><td className="px-3 py-2">25134</td></tr>
                      <tr className="border-t border-[#e8edf5]"><td className="px-3 py-2">2</td><td className="px-3 py-2">K463401788545</td><td className="px-3 py-2">粮发香丝干谷</td><td className="px-3 py-2">47.2吨</td><td className="px-3 py-2">3840</td><td className="px-3 py-2">181248</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#333] mb-1.5">甲方（买方）</label>
                    <input className="w-full border border-[#e8edf5] bg-[#f5f7fa] rounded px-3 py-2 text-[13px] text-[#999]" placeholder="根据所选订单自动获取" readOnly />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#333] mb-1.5">乙方（卖方）</label>
                    <input className="w-full border border-[#e8edf5] bg-[#f5f7fa] rounded px-3 py-2 text-[13px] text-[#999]" placeholder="根据所选订单自动获取" readOnly />
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#333] mb-1.5">订单金额</label>
                  <input className="w-full border border-[#e8edf5] bg-[#f5f7fa] rounded px-3 py-2 text-[13px] text-[#999]" placeholder="根据所选订单自动获取" readOnly />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#333] mb-1.5">合同名称 <span className="text-red-500">*</span></label>
                  <input value={contractName} onChange={e=>setContractName(e.target.value)} className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#333] mb-1.5">合同条款 <span className="text-red-500">*</span></label>
                  <textarea value={contractTerms} onChange={e=>setContractTerms(e.target.value)} rows={4} className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] resize-none focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" maxLength={300} />
                  <div className="text-right text-[12px] text-[#999]">{contractTerms.length}/300</div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-[#dde3ec] rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-[#bbb] mx-auto mb-2" />
                  <div className="text-[13px] text-[#666] mb-1">点击或拖拽上传盖章合同文件</div>
                  <div className="text-[12px] text-[#999]">支持 PDF、Word 格式，不超过 50MB</div>
                  <button className="mt-3 px-5 py-1.5 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded hover:bg-[#e8f4fd]">选择文件</button>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#333] mb-1.5">关联订单编号 <span className="text-red-500">*</span></label>
                  <select className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] text-[#999]">
                    <option value="">请输入</option>
                    <option>YFK622579765392</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#333] mb-1.5">合同名称 <span className="text-red-500">*</span></label>
                  <input className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#e8edf5]">
          <button onClick={onClose} className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">取消</button>
          <button className="px-6 py-2 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded hover:bg-[#0d4a8a]">确定</button>
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
                  <input type="radio" name="apply_cancel_reason" value={r} className="accent-[#1a5fa8]" />{r}
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

/* ──────────────────────────────────────────────
   批次单列表组件
   ────────────────────────────────────────────── */
const BATCH_STATUS_TABS = ["全部","待买家验收","待卖家确认验收结果","待卖家发起对账","待买家确认对账","待买家付款","待卖家确认收款","已完成","已关闭"]

const BATCH_DATA = [
  {
    batchNo: "PB457559072784", shipTime: "2026-08-03 22:49:39", orderNo: "PO637075481616",
    product: "核桃", img: "/images/hetao.jpg",
    shipAmt: "¥1.00", acceptAmt: "¥1.00",
    delivery: "买家自提", settlement: "工行安心付",
    buyer: "创正信息技术有限公司\n创正信息技术有限公司", seller: "矩正1\n矩正信息技术（上海）有限公司",
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
          {[["采购订单编号","请输入采购订单编号"],["商品名称","请输入商品名称"],["批次单编号","请输入批次单编号"],["买家","请输入"]].map(([label, ph]) => (
            <div key={label} className="flex items-center gap-2">
              <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">{label}：</label>
              <input className="flex-1 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] min-w-0" placeholder={ph} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[["卖家","请输入"],["对账单编号","请输入对账单编号"],["结算单编号","请输入结算单编号"]].map(([label, ph]) => (
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
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="flex items-center gap-2">
            <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">数据来源：</label>
            <select className="flex-1 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] text-[#999] min-w-0">
              <option value="">请选择数据来源</option>
              <option>订单农业</option><option>电商平台</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">结算渠道：</label>
            <select className="flex-1 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] text-[#999] min-w-0">
              <option value="">请选择结算渠道</option>
              <option>建行龙存管</option><option>工行安心付</option>
            </select>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">时间：</label>
            <div className="flex-1 flex items-center gap-1">
              <input type="date" className="flex-1 border border-[#dde3ec] rounded px-2 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] min-w-0" />
              <span className="text-[#999] shrink-0">-</span>
              <input type="date" className="flex-1 border border-[#dde3ec] rounded px-2 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] min-w-0" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">期望收货时间：</label>
            <div className="flex items-center gap-1">
              <input type="datetime-local" className="border border-[#dde3ec] rounded px-2 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              <span className="text-[#999]">-</span>
              <input type="datetime-local" className="border border-[#dde3ec] rounded px-2 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
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

        {/* 列表表头 */}
        <div className="grid text-[12px] font-semibold text-[#666] bg-[#f5f7fa] border-b border-[#e8edf5]"
          style={{gridTemplateColumns:"1.8fr 1fr 1fr 1fr 1fr 1.4fr 1.4fr 1.2fr 1fr 1fr 1fr"}}>
          {["商品","批次发货总额(元)","批次验收总额(元)","配送方式","结算渠道","买家","卖家","期望收货时间","交易模式","订单状态","操作"].map(h=>(
            <div key={h} className="px-3 py-2.5">{h}</div>
          ))}
        </div>

        {/* 批次单列表 */}
        {BATCH_DATA.map((b) => (
          <div key={b.batchNo} className="border-b border-[#e8edf5] last:border-0">
            {/* 批次单头行 */}
            <div className="px-4 py-2 bg-[#fafbfc] flex items-center gap-6 text-[12px] text-[#666]">
              <span>批次单编号：<span className="font-medium text-[#1a1a2e]">{b.batchNo}</span></span>
              <span>发货时间：{b.shipTime}</span>
              <span className="ml-auto">采购订单编号：<span className="text-[#1a5fa8] cursor-pointer hover:underline">{b.orderNo}</span></span>
            </div>
            {/* 主数据行 */}
            <div className="grid items-center text-[12px]"
              style={{gridTemplateColumns:"1.8fr 1fr 1fr 1fr 1fr 1.4fr 1.4fr 1.2fr 1fr 1fr 1fr"}}>
              <div className="px-3 py-3 flex items-center gap-2">
                <div className="w-12 h-12 shrink-0 rounded overflow-hidden bg-[#e8f4fd] flex items-center justify-center text-[#1a5fa8] text-[10px] font-bold">
                  {b.img ? <img src={b.img} alt={b.product} className="w-full h-full object-cover" /> : b.product.slice(0,2)}
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
                {b.orderStatus === "待买家验收" && (
                  <button className="text-[#e8831a] hover:underline text-left font-medium">批量验收</button>
                )}
              </div>
            </div>
            {/* 对账单/结算单行 */}
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

/* 复用批次详情抽屉（inline版，避免跨文件依赖） */
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
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-12 h-12 bg-[#e8f4fd] rounded flex items-center justify-center text-[#1a5fa8] text-[10px] font-bold shrink-0">核桃</div><div><div className="text-[#1a1a2e] font-medium">核桃</div><div className="text-[12px] text-[#999]">规格：吨</div></div></div></td>
                  <td className="px-4 py-3 text-[13px] text-[#555]"><div>单价：¥1.00</div><div>数量：1(吨)</div><div>总价：¥1.00</div></td>
                  <td className="px-4 py-3 text-[13px] text-[#555]"><div>单价：¥1.00</div><div>数量：1(吨)</div><div>总价：¥1.00</div></td>
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
  { no: "CSOA462125430374", orderNo: "PO637075481616", batchNo: "PB457559072784", product: "丝苗米", seller: "南雄市社村合作农业发展有限公司", acceptQty: "2.00吨", acceptAmt: "6000.00", prepaid: "3000.00", balance: "3000.00", settlement: "工行安心付", time: "2026-08-03 22:52:20", status: "待买家确认" },
  { no: "CSOA462125430375", orderNo: "PO637075481617", batchNo: "PB457559072785", product: "象牙香占", seller: "汕尾市社村合作农业发展有限公司", acceptQty: "5.00吨", acceptAmt: "35000.00", prepaid: "700.00", balance: "34300.00", settlement: "建行龙存管", time: "2026-08-01 10:12:30", status: "已确认" },
  { no: "CSOA462125430376", orderNo: "PO637075481618", batchNo: "PB457559072786", product: "大豆", seller: "佛山市社村合作农业发展有限公司", acceptQty: "8.00吨", acceptAmt: "21600.00", prepaid: "270.00", balance: "21330.00", settlement: "工行安心付", time: "2026-07-28 16:40:05", status: "待卖家发起" },
]
const RECONCILE_STATUS: Record<string, string> = { "待买家确认": "text-[#e8831a]", "已确认": "text-[#16a34a]", "待卖家发起": "text-[#1a5fa8]" }

function ReconcileRecordList() {
  return (
    <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
      <div className="px-4 py-3 border-b border-[#e8edf5] flex items-center gap-3">
        <div className="flex items-center gap-2 border border-[#e8edf5] rounded px-3 py-1.5 w-[260px]">
          <Search className="w-3.5 h-3.5 text-[#aaa]" />
          <input placeholder="搜索对账单号/订单号/卖方" className="flex-1 text-[13px] outline-none placeholder:text-[#aaa]" />
        </div>
        <button className="px-4 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999] flex items-center gap-1.5 ml-auto"><Download className="w-3.5 h-3.5" />导出</button>
      </div>
      <table className="w-full text-[12px]">
        <thead className="bg-[#f5f7fa] border-b border-[#e8edf5]">
          <tr>{["对账单号", "关联订单", "批次单号", "商品", "卖方", "已验收数量", "已验收金额(元)", "预付款(元)", "待结算尾款(元)", "结算渠道", "对账时间", "状态", "操作"].map(h => <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#666] whitespace-nowrap">{h}</th>)}</tr>
        </thead>
        <tbody>
          {RECONCILE_RECORDS.map(r => (
            <tr key={r.no} className="border-b border-[#e8edf5] last:border-0 hover:bg-[#fafbfc]">
              <td className="px-3 py-3 text-[#1a5fa8] font-medium">{r.no}</td>
              <td className="px-3 py-3 text-[#1a5fa8]">{r.orderNo}</td>
              <td className="px-3 py-3 text-[#666]">{r.batchNo}</td>
              <td className="px-3 py-3 text-[#1a1a2e] font-medium">{r.product}</td>
              <td className="px-3 py-3 text-[#666]">{r.seller}</td>
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
  { no: "SO491851817104", orderNo: "PO637075481616", reconcileNo: "CSOA462125430374", product: "丝苗米", seller: "南雄市社村合作农业发展有限公司", amount: "6000.00", type: "尾款结算", channel: "工行安心付", payTime: "2026-08-03 22:53:42", status: "已结算" },
  { no: "SO491851817105", orderNo: "PO637075481617", reconcileNo: "CSOA462125430375", product: "象牙香占", seller: "汕尾市社村合作农业发展有限公司", amount: "35000.00", type: "尾款结算", channel: "建行龙存管", payTime: "2026-08-01 11:05:18", status: "已结算" },
  { no: "SO491851817106", orderNo: "PO637075481618", reconcileNo: "CSOA462125430376", product: "大豆", seller: "佛山市社村合作农业发展有限公司", amount: "21600.00", type: "预付款", channel: "工行安心付", payTime: "", status: "待付款" },
]
const SETTLEMENT_STATUS: Record<string, string> = { "已结算": "text-[#16a34a]", "待付款": "text-[#e8831a]" }

function SettlementRecordList() {
  return (
    <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
      <div className="px-4 py-3 border-b border-[#e8edf5] flex items-center gap-3">
        <div className="flex items-center gap-2 border border-[#e8edf5] rounded px-3 py-1.5 w-[260px]">
          <Search className="w-3.5 h-3.5 text-[#aaa]" />
          <input placeholder="搜索结算单号/订单号/卖方" className="flex-1 text-[13px] outline-none placeholder:text-[#aaa]" />
        </div>
        <button className="px-4 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999] flex items-center gap-1.5 ml-auto"><Download className="w-3.5 h-3.5" />导出</button>
      </div>
      <table className="w-full text-[12px]">
        <thead className="bg-[#f5f7fa] border-b border-[#e8edf5]">
          <tr>{["结算单号", "关联订单", "对账单号", "商品", "卖方", "结算金额(元)", "结算类型", "结算渠道", "支付时间", "状态", "操作"].map(h => <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#666] whitespace-nowrap">{h}</th>)}</tr>
        </thead>
        <tbody>
          {SETTLEMENT_RECORDS.map(r => (
            <tr key={r.no} className="border-b border-[#e8edf5] last:border-0 hover:bg-[#fafbfc]">
              <td className="px-3 py-3 text-[#1a5fa8] font-medium">{r.no}</td>
              <td className="px-3 py-3 text-[#1a5fa8]">{r.orderNo}</td>
              <td className="px-3 py-3 text-[#666]">{r.reconcileNo}</td>
              <td className="px-3 py-3 text-[#1a1a2e] font-medium">{r.product}</td>
              <td className="px-3 py-3 text-[#666]">{r.seller}</td>
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

/* ─── 主页面 ─── */
const MAIN_TABS = ["商品订单", "批次单", "对账记录", "结算记录"] as const
type MainTab = typeof MAIN_TABS[number]

export default function WoCaigouPage() {
  const [mainTab, setMainTab] = useState<MainTab>("商品订单")
  const [activeTab, setActiveTab] = useState("全部")
  const [terminateModal, setTerminateModal] = useState(false)
  const [acceptModal, setAcceptModal] = useState(false)
  const [reconcileModal, setReconcileModal] = useState(false)
  const [contractModal, setContractModal] = useState(false)
  const [applyCancelModal, setApplyCancelModal] = useState(false)

  // 主操作按钮（按状态显示）
  const getMainBtn = (order: typeof ORDERS[0]) => {
    const map: Record<string, { label: string; color: string; onClick: () => void }> = {
      "付预付款":     { label: "付预付款",     color: "text-[#e8831a]", onClick: () => {}                      },
      "终止发货":     { label: "终止发货",     color: "text-[#e04040]", onClick: () => setTerminateModal(true) },
      "验收":         { label: "验收",         color: "text-[#1a5fa8]", onClick: () => setAcceptModal(true)    },
      "查看对账单":   { label: "查看对账单",   color: "text-[#1a5fa8]", onClick: () => setReconcileModal(true) },
    }
    return map[order.action] ?? null
  }

  // 哪些状态允许"申请取消"
  const CANCELABLE_STATUSES  = new Set(["待卖方确认", "待付预付款", "待发货"])

  return (
    <div>
      <div className="flex items-center gap-2 text-[13px] text-[#999] mb-4">
        <span>订单管理</span>
        <span>/</span>
        <span className="text-[#1a5fa8] font-medium">我采购</span>
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
            <label className="text-[13px] text-[#555] w-[32px] shrink-0">卖方</label>
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
              {STATUS_TABS.slice(1).map(s => <option key={s}>{s}</option>)}
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

      {/* Tab栏 */}
      <div className="bg-white rounded-lg border border-[#e8edf5]">
        <div className="flex border-b border-[#e8edf5] overflow-x-auto">
          {STATUS_TABS.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-5 py-3 text-[13px] whitespace-nowrap border-b-2 transition-colors ${activeTab===t?"border-[#1a5fa8] text-[#1a5fa8] font-semibold":"border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>{t}</button>
          ))}
        </div>

        {/* 表头 */}
        <div className="grid text-[12px] font-semibold text-[#666] bg-[#f5f7fa] border-b border-[#e8edf5]" style={{gridTemplateColumns:"2fr 1fr 1fr 2fr 2fr 2fr 1fr 2fr 1fr 1fr 1.5fr"}}>
          {["订单信息","订单金额","预付款金额","订单来源","卖方","收货人信息","配送方式","计划收货时间","结算渠道","订单状态","操作"].map(h=><div key={h} className="px-3 py-2.5">{h}</div>)}
        </div>

        {/* 订单列表 */}
        {ORDERS.map(order => {
          const mainBtn = getMainBtn(order)
          const canCancel = CANCELABLE_STATUSES.has(order.status)
          return (
            <div key={order.id} className="border-b border-[#e8edf5] last:border-0">
              <div className="px-4 py-2 bg-[#fafbfc] flex items-center gap-4 text-[12px] text-[#666]">
                <span>订单编号：{order.id}</span>
                <span>下单时间：{order.time}</span>
                <div className="ml-auto flex gap-2">
                  <Link href={`/merchant/dingdan-nongye/order-mgmt/wo-caigou/${order.id}`} className="text-[#1a5fa8] hover:underline">查看详情</Link>
                  <span className="text-[#dde3ec]">|</span>
                  <button onClick={() => setContractModal(true)} className="text-[#1a5fa8] hover:underline">合同/发票</button>
                  <span className="text-[#dde3ec]">|</span>
                  <span className="text-[#999]">联系卖方</span>
                </div>
              </div>
              <div className="grid items-center text-[12px]" style={{gridTemplateColumns:"2fr 1fr 1fr 2fr 2fr 2fr 1fr 2fr 1fr 1fr 1.5fr"}}>
                <div className="px-3 py-3">
                  <div className="font-medium text-[#1a1a2e]">{order.product}</div>
                  <div className="text-[#999]">规格：{order.spec}</div>
                </div>
                <div className="px-3 py-3 text-[#1a1a2e]">¥{order.amount.toLocaleString()}.00</div>
                <div className="px-3 py-3 text-[#1a1a2e]">¥{order.deposit}.00</div>
                <div className="px-3 py-3 text-[#666]">{order.source}</div>
                <div className="px-3 py-3 text-[#666] text-[11px]">{order.seller}</div>
                <div className="px-3 py-3 text-[11px] text-[#666] space-y-0.5">
                  <div>收货人：{order.receiver}</div>
                  <div>手机号：{order.phone}</div>
                  <div>收货地址：{order.address}</div>
                </div>
                <div className="px-3 py-3 text-[#666]">{order.delivery}</div>
                <div className="px-3 py-3 text-[11px] text-[#666]">{order.planTime}</div>
                <div className="px-3 py-3 text-[#666]">{order.settlement}</div>
                <div className="px-3 py-3">
                  <span className="text-[11px] font-medium text-[#666]">{order.status}</span>
                </div>
                <div className="px-3 py-3 flex flex-col gap-1">
                  {mainBtn && (
                    <button onClick={mainBtn.onClick} className={`${mainBtn.color} hover:underline text-[12px] text-left`}>{mainBtn.label}</button>
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

      {terminateModal   && <TerminateShippingModal onClose={() => setTerminateModal(false)} />}
      {acceptModal      && <BatchAcceptModal onClose={() => setAcceptModal(false)} />}
      {reconcileModal   && <ReconciliationModal onClose={() => setReconcileModal(false)} />}
      {contractModal    && <ContractModal onClose={() => setContractModal(false)} />}
      {applyCancelModal && <ApplyCancelModal onClose={() => setApplyCancelModal(false)} />}
      </>}
    </div>
  )
}
