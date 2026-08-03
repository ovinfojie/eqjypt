"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Download, X, Upload, FileText, CheckSquare } from "lucide-react"

/* ─── 模拟数据 ─── */
const ORDERS = [
  { id: "2434059405460956", time: "2026-04-20 22:05:48", product: "南晶香占", spec: "吨", amount: 2300, deposit: 230, source: "订单农业服务", seller: "南雄市社村合作农业发展有限公司（粮油业务部）", receiver: "张悦", phone: "13647589768", address: "广州市越秀区荣园东路80号", delivery: "卖家配送", planTime: "2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement: "建行龙存款", status: "待卖方确认", action: "取消订单" },
  { id: "2434059405460957", time: "2026-04-20 22:05:48", product: "丝苗米", spec: "吨", amount: 5000, deposit: 500, source: "订单农业服务", seller: "高州市社村合作农业发展有限公司（粮油业务部）", receiver: "偶奇", phone: "138****8888", address: "上海市浦东新区市镇区2888号", delivery: "卖家配送", planTime: "2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement: "建行龙存款", status: "待付预付款", action: "付预付款" },
  { id: "2434059405460958", time: "2026-04-20 22:05:48", product: "大豆", spec: "吨", amount: 27000, deposit: 270, source: "订单农业服务", seller: "佛山市社村合作农业发展有限公司（粮油业务部）", receiver: "张翰", phone: "1234567898", address: "广东省肇庆市云顶花园83号", delivery: "卖家配送", planTime: "2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement: "工行安心付", status: "待发货", action: "终止发货" },
  { id: "2434059405460959", time: "2026-04-20 22:05:48", product: "小麦", spec: "吨", amount: 6000, deposit: 600, source: "订单农业服务", seller: "湛江市社村合作农业发展有限公司（粮油业务部）", receiver: "张含", phone: "13453679768", address: "广州市越秀区荣园东路79号", delivery: "卖家配送", planTime: "2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement: "工行安心付", status: "待收货", action: "验收" },
  { id: "2434059405460960", time: "2026-04-20 22:05:48", product: "象牙香占", spec: "吨", amount: 7000, deposit: 700, source: "订单农业服务", seller: "汕尾市社村合作农业发展有限公司（粮油业务部）", receiver: "张启明", phone: "13457379768", address: "广州市越秀区荣园东路66号", delivery: "卖家配送", planTime: "2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement: "工行安心付", status: "待结算", action: "查看对账单" },
  { id: "2434059405460961", time: "2026-04-20 22:05:48", product: "象牙香占", spec: "吨", amount: 7000, deposit: 700, source: "订单农业服务", seller: "四会市社村合作农业发展有限公司（粮油业务部）", receiver: "张明明", phone: "13457379768", address: "广州市越秀区荣园东路66号", delivery: "卖家配送", planTime: "2026-04-23 00:00:00 至 2026-04-25 23:59:59", settlement: "工行安心付", status: "生产履约", action: "查看履约情况" },
]

const STATUS_TABS = ["全部", "待卖方确认", "待付预付款", "待发货", "待收货", "待结算", "已完成", "已关闭"]

/* ─── 取消订单弹窗 ─── */
function CancelModal({ onClose }: { onClose: () => void }) {
  const [reason, setReason] = useState("")
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-lg w-[480px] shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
          <h3 className="text-[15px] font-bold text-[#1a1a2e]">取消订单</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-[#999]" /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="bg-[#fff8e6] border border-[#f5d78e] rounded px-4 py-3 text-[13px] text-[#8a6a00]">
            取消订单后，预付款将在3个工作日内原路退回。
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#333] mb-1.5">取消原因 <span className="text-red-500">*</span></label>
            <div className="space-y-2">
              {["价格变动，重新协商", "货源不足，无法履约", "买方要求取消", "其他原因"].map(r => (
                <label key={r} className="flex items-center gap-2 text-[13px] text-[#444] cursor-pointer">
                  <input type="radio" name="cancel_reason" value={r} onChange={() => setReason(r)} className="accent-[#1a5fa8]" />
                  {r}
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
          <button className="px-6 py-2 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded hover:bg-[#0d4a8a]">确认取消</button>
        </div>
      </div>
    </div>
  )
}

/* ─── 种植发货弹窗（仅采购侧查看发货状态） ─── */
function ShippingViewModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-lg w-[560px] shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
          <h3 className="text-[15px] font-bold text-[#1a1a2e]">发货信息</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-[#999]" /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-[13px]">
            {[["物流公司","天业冷链物流"],["物流单号","WL598760431760"],["发货时间","2026-07-08 10:40:45"],["发货数量","2.00吨"],["发货人","张悦"],["发货人电话","15527522832"],["发货地址","广东省南雄市珠玑镇下冯村委会赤珠塘村879号"],["收货地址","广州市越秀区大东街道荣园东路78号"]].map(([k,v]) => (
              <div key={k}>
                <div className="text-[#999] mb-0.5">{k}</div>
                <div className="text-[#333] font-medium">{v}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="text-[#999] text-[13px] mb-1.5">发货凭证</div>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#f5f7fa] rounded border border-[#e8edf5] text-[13px] text-[#1a5fa8]">
              <FileText className="w-4 h-4" />
              发货凭证.pdf
            </div>
          </div>
        </div>
        <div className="flex justify-end px-6 py-4 border-t border-[#e8edf5]">
          <button onClick={onClose} className="px-6 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]">关闭</button>
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
                {[["发票抬头","广东新供销天润粮油集团有限公司"],["纳税人识别号","91440101MA5D0F0E0K"],["发票类型","增值税专用发票"],["联系电话","020-88886666"],["注册地址","广东省广州市天河区天河路198号"],["开户银行","中国工商银行股份有限公司广州天河支行"],["银行账号","440000800015"],["接收邮箱","168722@qq.com"]].map(([k,v]) => (
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
                      <option>农产品购销合同模板</option>
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

/* ─── 主页面 ─── */
export default function WoCaigouPage() {
  const [activeTab, setActiveTab] = useState("全部")
  const [cancelModal, setCancelModal] = useState(false)
  const [shippingModal, setShippingModal] = useState(false)
  const [reconcileModal, setReconcileModal] = useState(false)
  const [contractModal, setContractModal] = useState(false)

  const getActionBtn = (order: typeof ORDERS[0]) => {
    const map: Record<string, { label: string; color: string; onClick: () => void }> = {
      "取消订单":     { label: "取消订单",   color: "text-[#e04040]", onClick: () => setCancelModal(true)    },
      "付预付款":     { label: "付预付款",   color: "text-[#e8831a]", onClick: () => {}                      },
      "终止发货":     { label: "终止发货",   color: "text-[#e04040]", onClick: () => setShippingModal(true)  },
      "验收":         { label: "验收",       color: "text-[#1a5fa8]", onClick: () => {}                      },
      "查看对账单":   { label: "查看对账单", color: "text-[#1a5fa8]", onClick: () => setReconcileModal(true) },
      "查看履约情况": { label: "查看履约情况",color: "text-[#1a5fa8]",onClick: () => {}                      },
    }
    return map[order.action] ?? null
  }

  return (
    <div>
      <div className="flex items-center gap-2 text-[13px] text-[#999] mb-4">
        <span>订单管理</span>
        <span>/</span>
        <span className="text-[#1a5fa8] font-medium">我采购</span>
      </div>

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
          const actionBtn = getActionBtn(order)
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
                  <span className={`text-[11px] font-medium ${order.status==="生产履约"?"text-[#1a5fa8]":"text-[#666]"}`}>{order.status}</span>
                </div>
                <div className="px-3 py-3">
                  {actionBtn && (
                    <button onClick={actionBtn.onClick} className={`${actionBtn.color} hover:underline text-[12px]`}>{actionBtn.label}</button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {cancelModal     && <CancelModal onClose={() => setCancelModal(false)} />}
      {shippingModal   && <ShippingViewModal onClose={() => setShippingModal(false)} />}
      {reconcileModal  && <ReconciliationModal onClose={() => setReconcileModal(false)} />}
      {contractModal   && <ContractModal onClose={() => setContractModal(false)} />}
    </div>
  )
}
