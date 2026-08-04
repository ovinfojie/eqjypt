"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, X, CheckSquare, Upload, FileText, Download, ChevronDown, ChevronUp, RefreshCw } from "lucide-react"

const STEPS = ["提交订单","商家确认","付预付款","生产履约","发货","收货","对账结算","订单完成"]
const FARMER_TASKS = [
  { id:"ZZRW1781072816710", name:"张建国", area:100, supply:5,  paid:0,  period:"2026-06-11 至 2026-06-12", status:"待作业" },
  { id:"ZZRW1781072816711", name:"王虎",   area:200, supply:8,  paid:0,  period:"2026-06-11 至 2026-06-12", status:"作业中" },
  { id:"ZZRW1781072816712", name:"王秀兰", area:300, supply:15, paid:15, period:"2026-06-11 至 2026-06-12", status:"已完成" },
  { id:"ZZRW1781072816713", name:"程晓",   area:50,  supply:2,  paid:0,  period:"2026-06-11 至 2026-06-12", status:"已逾期" },
  { id:"ZZRW1781072816714", name:"宋玉",   area:50,  supply:2,  paid:1,  period:"2026-06-11 至 2026-06-12", status:"收购中" },
]

/* ─── 批次验收弹窗 ─── */
function BatchAcceptModal({ onClose }: { onClose: () => void }) {
  const [allChecked, setAllChecked] = useState(false)
  const [rows, setRows] = useState([
    { id:"IN20260720-01", plate:"粤A12345", grade:"一等粮", price:"1000.00", qty:"1吨",  total:"1000.00", checked:false },
    { id:"IN20260720-02", plate:"粤B67890", grade:"一等粮", price:"1000.00", qty:"1吨",  total:"1000.00", checked:false },
    { id:"IN20260720-03", plate:"粤B67840", grade:"一等粮", price:"1000.00", qty:"0.5吨",total:"500.00",  checked:false },
    { id:"IN20260720-04", plate:"粤B67790", grade:"二等粮", price:"900.00",  qty:"0.5吨",total:"450.00",  checked:false },
  ])
  const [reject, setReject] = useState<"yes"|"no">("no")
  const [note, setNote] = useState("")
  const checkedCount = rows.filter(r=>r.checked).reduce((_,r)=>{
    const n = parseFloat(r.qty); return _ + (isNaN(n)?0:n)
  }, 0)
  const checkedTotal = rows.filter(r=>r.checked).reduce((_,r)=>_+parseFloat(r.total||"0"),0)

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 overflow-y-auto py-8" onClick={onClose}>
      <div className="bg-white rounded-lg w-[820px] shadow-2xl" onClick={e=>e.stopPropagation()}>
        <div className="px-6 py-5 border-b border-[#e8edf5] flex items-start justify-between">
          <div>
            <h3 className="text-[18px] font-bold text-[#1a1a2e] mb-2">批次验收</h3>
            <div className="flex gap-6 text-[13px] text-[#666]">
              <span>批次单编号：<span className="text-[#1a1a2e] font-medium">PB489238696064</span></span>
              <span>交易订单编号：<span className="text-[#1a1a2e] font-medium">YFK495341494400</span></span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select className="border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]">
              <option>按单价和总价验收</option>
              <option>仅按单价验收</option>
              <option>仅按总价验收</option>
            </select>
            <button onClick={onClose}><X className="w-5 h-5 text-[#999]" /></button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div>
            <h4 className="text-[14px] font-bold text-[#1a5fa8] border-l-4 border-[#1a5fa8] pl-3 mb-4">验收信息</h4>
            <table className="w-full text-[13px] border border-[#e8edf5]">
              <thead className="bg-[#f5f7fa]">
                <tr>
                  <th className="px-3 py-2.5 text-left w-8">
                    <input type="checkbox" checked={allChecked} onChange={e=>{setAllChecked(e.target.checked);setRows(rows.map(r=>({...r,checked:e.target.checked})))}} className="accent-[#1a5fa8]" />
                  </th>
                  {["入库单号","车牌号","质检等级","验收单价(单位)","验收数量(单位)","验收总价(元)"].map(h=><th key={h} className="px-3 py-2.5 text-left font-semibold text-[#666]">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.map((r,i)=>(
                  <tr key={r.id} className="border-t border-[#e8edf5]">
                    <td className="px-3 py-3"><input type="checkbox" checked={r.checked} onChange={e=>setRows(rows.map((row,j)=>j===i?{...row,checked:e.target.checked}:row))} className="accent-[#1a5fa8]" /></td>
                    <td className="px-3 py-3 text-[#1a1a2e]">{r.id}</td>
                    <td className="px-3 py-3 text-[#666]">{r.plate}</td>
                    <td className="px-3 py-3 text-[#666]">{r.grade}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <input defaultValue={r.price} className="w-20 border border-[#dde3ec] rounded px-2 py-1 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
                        <span className="text-[#999] text-[12px]">元/吨</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-[#666]">{r.qty}</td>
                    <td className="px-3 py-3">
                      <input defaultValue={r.total} className="w-24 border border-[#dde3ec] rounded px-2 py-1 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right mt-2 text-[13px] text-[#666]">
              本次验收数量合计：<span className="text-[#1a5fa8] font-semibold">{checkedCount}吨</span>
              {"  "}验收金额合计：<span className="text-[#e04040] font-semibold">¥{checkedTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[13px] font-medium text-[#333] w-[64px] shrink-0">上传凭证</span>
            <label className="flex items-center gap-2 px-4 py-1.5 border border-[#dde3ec] rounded text-[13px] text-[#555] cursor-pointer hover:border-[#1a5fa8] hover:text-[#1a5fa8]">
              <Upload className="w-3.5 h-3.5" />上传附件
            </label>
            <span className="text-[12px] text-[#999]">支持png/jpg/pdf/word/excel文件等，不超过100M</span>
          </div>

          <div className="flex gap-4">
            <span className="text-[13px] font-medium text-[#333] w-[64px] shrink-0 pt-1.5">验收备注</span>
            <textarea value={note} onChange={e=>setNote(e.target.value)} rows={3} className="flex-1 border border-[#dde3ec] rounded px-3 py-2 text-[13px] resize-none focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
          </div>

          <div className="flex items-center gap-6 text-[13px]">
            <span className="font-medium text-[#333]">是否拒收本批次：</span>
            <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="reject" value="yes" checked={reject==="yes"} onChange={()=>setReject("yes")} className="accent-[#1a5fa8]" />是</label>
            <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="reject" value="no" checked={reject==="no"} onChange={()=>setReject("no")} className="accent-[#1a5fa8]" />否</label>
          </div>
        </div>

        <div className="flex justify-center gap-6 px-6 py-5 border-t border-[#e8edf5]">
          <button onClick={onClose} className="px-10 py-2.5 border border-[#dde3ec] text-[#555] text-[14px] rounded hover:border-[#999]">取消</button>
          <button className="px-10 py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a]">确认��收</button>
        </div>
      </div>
    </div>
  )
}

export default function WoCaigouDetailPage() {
  const [activeTab, setActiveTab] = useState<"info"|"contract"|"production">("info")
  const [farmerFilter, setFarmerFilter] = useState("全部")
  const [batchModal, setBatchModal] = useState(false)
  const [orderInfoCollapsed, setOrderInfoCollapsed] = useState(false)
  const currentStep = 4

  return (
    <div>
      <div className="flex items-center gap-2 text-[13px] text-[#999] mb-4">
        <Link href="/merchant/dingdan-nongye/order-mgmt/wo-caigou" className="hover:text-[#1a5fa8] flex items-center gap-1"><ChevronLeft className="w-3.5 h-3.5" />我采购</Link>
        <span>/</span>
        <span className="text-[#1a5fa8] font-medium">订单详情</span>
      </div>

      <div className="space-y-4">
        {/* 标题行 */}
        <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
          <div className="flex items-center gap-4 mb-4 text-[13px] text-[#666]">
            <span>订单编号：<span className="text-[#1a1a2e] font-medium">YFK622579765392</span></span>
            <span>下单时间：<span className="text-[#1a1a2e]">2026-06-11 13:36:49</span></span>
          </div>

          {/* 步骤条 */}
          <div className="flex items-start gap-0">
            <div className="flex flex-col items-center mr-4">
              <div className="text-[13px] font-bold text-[#1a5fa8] leading-tight">生产履约</div>
            </div>
            <div className="flex-1 flex items-center">
              {STEPS.map((s,i) => (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold border-2 ${i<currentStep?"bg-[#1a5fa8] border-[#1a5fa8] text-white":i===currentStep?"border-[#1a5fa8] text-[#1a5fa8]":"border-[#dde3ec] text-[#ccc]"}`}>{i+1}</div>
                    <div className={`text-[11px] mt-1 text-center ${i<=currentStep?"text-[#1a5fa8] font-medium":"text-[#bbb]"}`}>{s}</div>
                    {i<currentStep && <div className="text-[10px] text-[#999]">2026-06-{11+i}</div>}
                  </div>
                  {i<STEPS.length-1 && <div className={`flex-1 h-0.5 mx-1 mb-4 ${i<currentStep-1?"bg-[#1a5fa8]":"bg-[#e8edf5]"}`} />}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 bg-[#fff8e6] border border-[#f5d78e] rounded px-4 py-2.5 flex items-center justify-between text-[13px]">
            <span className="text-[#8a6a00]">该交易订单的合同待签订，如未确定，可先跳过！</span>
            <button className="text-[#1a5fa8] hover:underline">去处理 &gt;&gt;&gt;</button>
          </div>
        </div>

        {/* 批次单 / 对账单 / 结算单 — 始终显示 */}
        <BatchPanel />

        {/* Tab内容 */}
        <div className="bg-white rounded-lg border border-[#e8edf5]">

          {/* Tab切换按钮 */}
          <div className="flex border-b border-[#e8edf5]">
            {([["info","订单信息"],["contract","合同、发票"],["production","生产履约情况"]] as const).map(([t,l])=>(
              <button key={t} onClick={()=>setActiveTab(t)} className={`px-5 py-3 text-[13px] border-b-2 transition-colors ${activeTab===t?"border-[#1a5fa8] text-[#1a5fa8] font-semibold":"border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>{l}</button>
            ))}
          </div>

          <div className="p-5 space-y-6">
            {activeTab === "info" && (
              <>
                {/* 折叠/展开控制行 */}
                <div className="flex items-center justify-between -mt-1 mb-1">
                  <span className="text-[13px] font-semibold text-[#1a1a2e]">订单信息</span>
                  <button
                    onClick={() => setOrderInfoCollapsed(c => !c)}
                    className="flex items-center gap-1 text-[13px] text-[#1a5fa8] hover:opacity-80 transition-opacity"
                  >
                    {orderInfoCollapsed ? <><ChevronDown className="w-4 h-4" />展开</> : <><ChevronUp className="w-4 h-4" />收起</>}
                  </button>
                </div>
                {!orderInfoCollapsed && <>
                {/* 商品信息 */}
                <div>
                  <h4 className="text-[13px] font-bold text-[#1a1a2e] border-l-4 border-[#1a5fa8] pl-3 mb-3">商品信息</h4>
                  <table className="w-full text-[13px] border border-[#e8edf5]">
                    <thead className="bg-[#f5f7fa]"><tr>{["商品","下单数量(单位)","下单单价(元)","下单金额(元)","已验收数量(单位)","已到账金额(元)","已结算金额(元)"].map(h=><th key={h} className="px-4 py-2.5 text-left font-semibold text-[#666]">{h}</th>)}</tr></thead>
                    <tbody>
                      <tr className="border-t border-[#e8edf5]">
                        <td className="px-4 py-3"><div className="font-medium text-[#1a1a2e]">丝苗米</div><div className="text-[#999] text-[12px]">规格：吨</div></td>
                        <td className="px-4 py-3">10.00(吨)</td><td className="px-4 py-3">3000.00</td><td className="px-4 py-3">30000.00</td>
                        <td className="px-4 py-3">2.00(吨)</td><td className="px-4 py-3">3000.00</td><td className="px-4 py-3">3000.00</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-right text-[12px] text-[#666] mt-1.5">商品种类：1 种，数量总计：10 吨，商品总重量：10000.00kg  总体积：0m³</div>
                </div>
                {/* 订单金额 */}
                <div>
                  <h4 className="text-[13px] font-medium text-[#1a1a2e] mb-2">订单金额</h4>
                  <div className="bg-[#f5f7fa] rounded p-4 text-[13px] space-y-1.5">
                    <div className="text-center">商品总金额：<span className="text-[#e04040] font-semibold">¥30000.00</span> + 运费合计：<span className="text-[#e04040]">¥0.00</span> - 商家优惠：<span className="text-[#e04040]">¥0.00</span> - 平台优惠：<span className="text-[#e04040]">¥0.00</span> = 订单总金额：<span className="text-[#e04040] font-bold">¥300000.00</span></div>
                    <div className="text-center">需支付<span className="text-[#e04040]">预付款 10%</span>，应付货款：<span className="text-[#e04040] font-semibold">¥30000.00</span> + 应付运费：<span className="text-[#e04040]">¥0.00</span> = <span className="text-[#e04040] font-bold">¥30000.00</span></div>
                  </div>
                </div>
                {/* 订单明细 */}
                <div>
                  <h4 className="text-[13px] font-bold text-[#1a1a2e] border-l-4 border-[#1a5fa8] pl-3 mb-3">订单明细</h4>
                  <div className="grid grid-cols-3 gap-x-8 gap-y-4 text-[13px]">
                    {[["买方","广东新供销天润粮油集团有限公司"],["商家","南雄市社村合作农业发展有限公司\n(南雄市社村合作农业发展有限公司)"],["供应商","——"],["买方联系人信息","王汉  18978907891"],["商家联系人信息","张悦  15527522832"],["供应商联系人信息","王鹏  15527522832"],["收货计划","2026-06-11 00:00:00 至 2026-06-12 23:59:59"],["配送方式","卖家配送"],["收货人信息","广东省广州市越秀区大东街道荣园东路78号\n陈先生  17878907890"],["定价方式","固定价"],["交易模式","担保交易"],["结算方式","预付款"],["支付渠道","工行安心付"],["买方订单备注","无"]].map(([k,v])=>(
                      <div key={k}><div className="text-[#999] mb-0.5">{k}</div><div className="text-[#333] whitespace-pre-line">{v}</div></div>
                    ))}
                  </div>
                </div>
                </>}
              </>
            )}

            {activeTab === "contract" && (
              <>
                <div>
                  <h4 className="text-[13px] font-bold text-[#1a1a2e] border-l-4 border-[#1a5fa8] pl-3 mb-3">合同信息</h4>
                  <div className="border border-[#e8edf5] rounded p-4 flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#e8f4fd] rounded-lg flex items-center justify-center"><FileText className="w-5 h-5 text-[#1a5fa8]" /></div>
                      <div><div className="text-[13px] font-medium">2026年粮食采购合同</div><div className="text-[12px] text-[#999]">HT-2026-06001</div></div>
                    </div>
                    <button className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a]">查看合同</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[["甲方（买方）","广东新供销天润粮油集团有限公司","待处理"],["乙方（卖方）","南雄市社村合作农业发展有限公司","已签章"]].map(([side,name,status])=>(
                      <div key={side} className="border border-[#e8edf5] rounded p-4">
                        <div className="flex justify-between mb-2"><span className="text-[12px] text-[#666]">{side}</span><span className={`text-[11px] px-2 py-0.5 rounded-full ${status==="已签章"?"bg-[#e6f9f0] text-[#0a7a45]":"bg-[#fff3e0] text-[#e8831a]"}`}>{status}</span></div>
                        <div className="text-[13px] font-medium mb-2">{name}</div>
                        {status==="待处理"&&<button className="px-3 py-1 border border-[#1a5fa8] text-[#1a5fa8] text-[12px] rounded">签章/签字</button>}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#1a1a2e] border-l-4 border-[#1a5fa8] pl-3 mb-3">发票信息</h4>
                  <div className="grid grid-cols-3 gap-x-6 gap-y-3 text-[13px]">
                    {[["发票抬头","广东新供销天润粮油集团有限公司"],["纳税人识别号","91440101MA5D0F0E0K"],["发票类型","增值税专用发票"],["联系电话","020-88886666"],["注册地址","广东省广州市天河区天河路198号"],["开户银行","中国工商银行股份有限公司广州天河支行"],["银行账号","440000800015"],["接收邮箱","168722@qq.com"]].map(([k,v])=>(
                      <div key={k}><div className="text-[#999] mb-0.5">{k}</div><div className="text-[#333] font-medium">{v}</div></div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <div className="text-[13px] text-[#999] mb-1.5">电子发票</div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#f5f7fa] rounded border border-[#e8edf5] text-[13px]">
                      <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center text-white text-[9px] font-bold">PDF</div>
                      <span className="text-[#1a5fa8]">发票文件.pdf</span>
                      <Download className="w-4 h-4 text-[#999] ml-auto cursor-pointer hover:text-[#1a5fa8]" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "production" && (
              <>
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#e8f4fd] rounded-lg flex items-center justify-center text-[#1a5fa8] font-bold text-lg">米</div>
                    <div><div className="font-medium text-[#1a1a2e]">丝苗米</div><div className="text-[12px] text-[#999]">规格：吨</div></div>
                  </div>
                  <div className="ml-auto text-right text-[13px]">
                    <div className="text-[#999] mb-1">买家收货计划</div>
                    <div className="text-[#1a1a2e]">2026-06-11 00:00:00 至 2026-06-12 23:59:59</div>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-4 text-center">
                  {[["计划供应产量","50吨"],["种植总亩数","5000亩"],["签约农户","20户"],["已认领总量","30吨"],["已收购量","32吨"],["待收购量","18吨"]].map(([k,v],i)=>(
                    <div key={k} className="bg-[#f5f7fa] rounded p-3">
                      <div className="text-[12px] text-[#999] mb-1">{k}</div>
                      <div className={`text-[16px] font-bold ${i===5?"text-[#e04040]":"text-[#1a1a2e]"}`}>{v}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {[["农户认领进度",60,"已认领总量 30 吨","目标产量 50 吨"],["收购进度",64,"已收购 32 吨","计划收购量 50 吨"]].map(([label,pct,left,right])=>(
                    <div key={label as string}>
                      <div className="flex justify-between text-[13px] mb-1"><span className="font-semibold text-[#1a1a2e]">{label}</span></div>
                      <div className="h-2.5 bg-[#e8edf5] rounded-full mb-1.5"><div className="h-full bg-[#1a5fa8] rounded-full" style={{width:`${pct}%`}} /></div>
                      <div className="flex justify-between text-[12px] text-[#999]">
                        <span className="text-[#1a5fa8] font-bold text-[16px]">{pct}%</span>
                        <span>{left}</span><span>{right}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 border-b border-[#e8edf5] pb-0 mb-3">
                  {["全部","待作业","作业中","收购中","已完成","已逾期"].map(f=>(
                    <button key={f} onClick={()=>setFarmerFilter(f)} className={`px-4 py-1.5 text-[13px] rounded border transition-colors ${farmerFilter===f?"bg-[#1a5fa8] text-white border-[#1a5fa8]":"border-[#dde3ec] text-[#666] hover:border-[#1a5fa8]"}`}>{f}</button>
                  ))}
                </div>
                <table className="w-full text-[13px] border border-[#e8edf5]">
                  <thead className="bg-[#f5f7fa]"><tr>{["种植任务编号","农户姓名","认领种植量(亩)","认领供应量(吨)","已交付量(吨)","交付周期","状态","操作"].map(h=><th key={h} className="px-4 py-2.5 text-left font-semibold text-[#666]">{h}</th>)}</tr></thead>
                  <tbody>
                    {FARMER_TASKS.filter(t=>farmerFilter==="全部"||t.status===farmerFilter).map(t=>(
                      <tr key={t.id} className="border-t border-[#e8edf5]">
                        <td className="px-4 py-3 text-[#1a1a2e]">{t.id}</td>
                        <td className="px-4 py-3">{t.name}</td>
                        <td className="px-4 py-3">{t.area}.00</td>
                        <td className="px-4 py-3">{t.supply}</td>
                        <td className="px-4 py-3">{t.paid}</td>
                        <td className="px-4 py-3 text-[12px] text-[#666]">{t.period}</td>
                        <td className="px-4 py-3"><span className={`text-[12px] font-medium ${t.status==="已完成"?"text-[#0a7a45]":t.status==="已逾期"?"text-[#e04040]":t.status==="收购中"?"text-[#1a5fa8]":"text-[#666]"}`}>{t.status}</span></td>
                        <td className="px-4 py-3">{t.status!=="待作业"?<button className="text-[#1a5fa8] text-[12px] hover:underline">查看服务详情</button>:<span className="text-[#ccc]">——</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
      {batchModal && <BatchAcceptModal onClose={()=>setBatchModal(false)} />}
    </div>
  )
}

const BATCH_ROWS = [
  { id:"PB489238696064", time:"2026-07-08\n10:40:45", logistics:"天业冷链物流", trackNo:"WL598760431760", product:"丝苗米\n规格：吨", status:"待卖家确认验收", accountNo:"CSOA46125430 3744", settlementNo:"SO5903718236 32", qty:"2.00吨", total:"3000.00", checked:"3000.00" },
  { id:"PB489238696065", time:"2026-07-08\n10:40:45", logistics:"天业冷链物流", trackNo:"WL598760431760", product:"丝苗米\n规格：吨", status:"待卖家确认验收", accountNo:"CSOA46125430 3744", settlementNo:"SO5903718236 32", qty:"2.00吨", total:"3000.00", checked:"3000.00" },
]

/* ─── 批次详情抽屉 ─── */
function BatchDetailDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex" onClick={onClose}>
      <div className="flex-1 bg-black/30" />
      <div className="w-[780px] bg-white h-full overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5] sticky top-0 bg-white z-10">
          <h2 className="text-[18px] font-bold text-[#1a1a2e]">批次详情</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-[#999] hover:text-[#333]" /></button>
        </div>
        <div className="px-6 py-5 space-y-5">
          {/* 基本信息 */}
          <div className="border border-[#e8edf5] rounded-lg p-5">
            <h3 className="text-[14px] font-bold text-[#1a5fa8] mb-4">基本信息</h3>
            <div className="grid grid-cols-3 gap-x-8 gap-y-4 text-[13px]">
              {[["批次单编号","P6489238630528"],["交易订单号","YFK48604141712"],["批次状态","待卖家确认验收结果"],["买家","广东新供销天润粮油集团有限公司"],["商家","南雄市社村合作农业发展有限公司"],["交易方式","担保交易"],["批次验收总金额","¥ 10000.00"],["批次发货总金额","¥ 10000.00"],["结算渠道","建行龙存管"]].map(([k,v])=>(
                <div key={k}><div className="text-[#999] text-[12px] mb-0.5">{k}</div><div className="text-[#1a1a2e] font-medium">{v}</div></div>
              ))}
            </div>
          </div>
          {/* 批次验收信息 */}
          <div className="border border-[#e8edf5] rounded-lg p-5">
            <h3 className="text-[14px] font-bold text-[#1a5fa8] mb-4">批次验收信息</h3>
            <table className="w-full text-[13px] border border-[#e8edf5]">
              <thead className="bg-[#f5f7fa]">
                <tr>{["商品","批次发货信息","批次验收信息","操作"].map(h=><th key={h} className="px-4 py-2.5 text-center font-semibold text-[#666]">{h}</th>)}</tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#e8edf5] bg-[#fafbfc]">
                  <td colSpan={4} className="px-4 py-2 text-[12px] text-[#666]">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">南雄市社村合作农业发展有限公司</span>
                      <span className="w-4 h-4 rounded-full bg-[#e8f4fd] text-[#1a5fa8] text-[10px] flex items-center justify-center cursor-pointer">↻</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-t border-[#e8edf5]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 bg-[#e8f4fd] rounded flex items-center justify-center text-[#1a5fa8] text-[10px] font-bold shrink-0">丝苗米</div>
                      <div><div className="text-[#1a1a2e] font-medium">丝苗米</div><div className="text-[12px] text-[#999]">规格：吨</div></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-[#555]">
                    <div>单价：¥ 1000.00</div><div>数量：3(吨)</div><div>总价：¥ 3000.00</div>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-[#555]">
                    <div>单价：¥ 1000.00</div><div>数量：3(吨)</div><div>总价：¥ 2950.00</div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-[#1a5fa8] text-[13px] hover:underline">详情</button>
                  </td>
                </tr>
                <tr className="border-t border-[#e8edf5] bg-[#fafbfc]">
                  <td colSpan={4} className="px-4 py-3 text-[13px]">
                    <div className="flex gap-8">
                      <div><span className="text-[#999]">买家凭证：</span><span className="text-[#1a5fa8] flex items-center gap-1 inline-flex"><span className="text-red-500 font-bold text-[10px]">PDF</span> 买家凭证.pdf</span></div>
                      <div><span className="text-[#999]">买家验收备注：</span><span>——</span></div>
                      <div><span className="text-[#999]">是否拒收本批次：</span><span>否</span></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* 其他相关信息 */}
          <div className="border border-[#e8edf5] rounded-lg p-5">
            <h3 className="text-[14px] font-bold text-[#1a5fa8] mb-4">其他相关信息</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-[13px]">
              {[["发货时间","2026-07-08 10:40:45"],["物流信息","无"],["快递/物流公司","广东天业冷链物流有限公司"],["物流单号","WL598760431760"],["收货人信息","广东省广州市越秀区菜园东路78号  张悦  155****2732"],[""],["装货时间","2026-06-09 00:00:00"],["到货时间","2026-06-18 00:00:00"],["运输要求","常温"],["发货备注","-"]].map(([k,v],i)=>(
                k ? <div key={i}><span className="text-[#999]">{k}：</span><span className="text-[#333]">{v}</span></div> : <div key={i} />
              ))}
              <div className="col-span-2">
                <span className="text-[#999]">商家发货凭证：</span>
                <span className="text-[#1a5fa8] inline-flex items-center gap-1"><span className="text-red-500 font-bold text-[10px]">PDF</span> 商家发货凭证.pdf</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── 批次单/对账单/结算单 独立区块 ─── */
function BatchPanel() {
  const [activeTab, setActiveTab] = useState<"batch"|"account"|"settlement">("batch")
  const [synced, setSynced] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)

  function handleSync() {
    setSyncing(true)
    setTimeout(() => { setSyncing(false); setSynced(true) }, 800)
  }

  const tabs = [
    { key: "batch" as const,      label: "批次单列表" },
    { key: "account" as const,    label: "关联对账单" },
    { key: "settlement" as const, label: "关联结算单" },
  ]

  return (
    <>
      <div className="bg-white rounded-lg border border-[#e8edf5]">
        <div className="flex items-center border-b border-[#e8edf5] px-5 pt-1">
          <div className="flex flex-1">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-4 py-2.5 text-[13px] border-b-2 mr-1 transition-colors ${
                  activeTab === t.key
                    ? "border-[#1a5fa8] text-[#1a5fa8] font-semibold"
                    : "border-transparent text-[#666] hover:text-[#1a5fa8]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {activeTab === "batch" && (
            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center gap-1.5 px-3 py-1.5 mb-1 border border-[#1a5fa8] text-[#1a5fa8] text-[12px] rounded hover:bg-[#e8f4fd] transition-colors disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "同步中..." : "同步"}
            </button>
          )}
        </div>
        <div className="px-5 py-4">
          {activeTab === "batch" && (
            synced ? (
              <div className="overflow-x-auto">
                <table className="w-full text-[12px] border border-[#e8edf5]">
                  <thead className="bg-[#f5f7fa]">
                    <tr>
                      {["批次单编号","发货时间","快递/物流公司","物流单号","商品","批次状态","关联对账单编号","关联结算单编号","发货数量(单位)","发货总金额(元)","验收总金额(元)","操作"].map(h=>(
                        <th key={h} className="px-2.5 py-2.5 text-left font-semibold text-[#666] whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {BATCH_ROWS.map(b => (
                      <tr key={b.id} className="border-t border-[#e8edf5] hover:bg-[#fafbfc]">
                        <td className="px-2.5 py-3 text-[#1a1a2e] whitespace-nowrap">{b.id}</td>
                        <td className="px-2.5 py-3 text-[#666] whitespace-pre-line">{b.time}</td>
                        <td className="px-2.5 py-3 text-[#666] whitespace-nowrap">{b.logistics}</td>
                        <td className="px-2.5 py-3 text-[#1a5fa8] whitespace-nowrap">{b.trackNo}</td>
                        <td className="px-2.5 py-3 text-[#666] whitespace-pre-line">{b.product}</td>
                        <td className="px-2.5 py-3 text-[#e8831a] whitespace-nowrap">{b.status}</td>
                        <td className="px-2.5 py-3 text-[#666] whitespace-nowrap">{b.accountNo}</td>
                        <td className="px-2.5 py-3 text-[#666] whitespace-nowrap">{b.settlementNo}</td>
                        <td className="px-2.5 py-3 text-[#1a1a2e]">{b.qty}</td>
                        <td className="px-2.5 py-3 text-[#1a1a2e]">{b.total}</td>
                        <td className="px-2.5 py-3 text-[#1a1a2e]">{b.checked}</td>
                        <td className="px-2.5 py-3">
                          <button onClick={() => setDetailOpen(true)} className="text-[#1a5fa8] hover:underline whitespace-nowrap">详情</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex items-center gap-3 px-4 py-3 bg-[#f0f7ff] border border-[#c6deff] rounded-lg text-[13px] text-[#3a6fa8]">
                <svg className="w-4 h-4 shrink-0 text-[#1a5fa8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span>货物正在入库处理中，批次单将在入库完成后自动同步至此，请稍后查看。</span>
              </div>
            )
          )}
          {activeTab === "account" && (
            <div className="text-[13px] text-[#999] text-center py-6">暂无关联对账单</div>
          )}
          {activeTab === "settlement" && (
            <div className="text-[13px] text-[#999] text-center py-6">暂无关联结算单</div>
          )}
        </div>
      </div>
      {detailOpen && <BatchDetailDrawer onClose={() => setDetailOpen(false)} />}
    </>
  )
}
