"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, X, MapPin, Truck, Package, CheckCircle, Circle } from "lucide-react"

const STEPS = [
  { label: "提交订单",   date: "2026-02-14 14:23:41" },
  { label: "商家确认",   date: "2026-02-14 15:23:13" },
  { label: "付预付款",   date: "2026-02-15 16:43:13" },
  { label: "运输中",     date: "2026-02-16 11:43:18" },
  { label: "对账结算",   date: null },
  { label: "订单完成",   date: null },
]

const BATCH_LIST = [
  { id:"YS20260221600001", services:"冷链专线+装卸", vehicle:"13.6米冷藏半挂车", transport:"公路冷链运输", plate:"粤G-88XXX", amt:"12800.00", status:"已完成",    accountNo:"DZD20260221800001", settlementNo:"DZD20260221800001" },
  { id:"YS20260221600002", services:"冷链专线+装卸", vehicle:"13.6米冷藏半挂车", transport:"公路冷链运输", plate:"粤G-18XXX", amt:"12800.00", status:"待买方付款",  accountNo:"DZD20260221800002", settlementNo:"DZD20260221800002" },
  { id:"YS20260221600003", services:"冷链专线+装卸", vehicle:"13.6米冷藏半挂车", transport:"公路冷链运输", plate:"粤G-28XXX", amt:"12800.00", status:"待买方确认对账", accountNo:"DZD20260221800003", settlementNo:""                  },
  { id:"YS20260221600004", services:"冷链专线+装卸", vehicle:"13.6米冷藏半挂车", transport:"公路冷链运输", plate:"粤G-38XXX", amt:"12800.00", status:"待卖方确认对账", accountNo:"",                   settlementNo:""                  },
  { id:"YS20260221600005", services:"冷链专线+装卸", vehicle:"13.6米冷藏半挂车", transport:"公路冷链运输", plate:"粤G-89XXX", amt:"12800.00", status:"待卖方确认验收结果", accountNo:"",               settlementNo:""                  },
  { id:"YS20260221600006", services:"冷链专线+装卸", vehicle:"13.6米冷藏半挂车", transport:"公路冷链运输", plate:"粤G-68XXX", amt:"12800.00", status:"待验收",     accountNo:"",                   settlementNo:""                  },
]

const STATUS_OPS: Record<string, string[]> = {
  "已完成":         ["查看物流信息","下载运单","分享"],
  "待买方付款":     ["查看结账信息","查看物流信息","下载运单","分享"],
  "待买方确认对账": ["查看对账","查看物流信息","下载运单","分享"],
  "待卖方确认对账": ["查看对账","查看物流信息","下载运单","分享"],
  "待卖方确认验收结果": ["查看物流信息","下载运单","分享"],
  "待验收":         ["验收","查看物流信息","下载运单","分享"],
}

const LOGISTICS_TIMELINE = [
  { done:true,  icon: Package, title:"批次单创建",    time:"2026-02-17 12:00", desc:"批次运输订单平台已下单" },
  { done:true,  icon: Truck,   title:"车辆匹配",      time:"2026-02-16 15:00", desc:"车辆已匹配，车牌号：粤G-88xxx，司机：陈小松" },
  { done:true,  icon: Package, title:"装车发运",      time:"2026-02-17 13:30", desc:"商品已从发货地发出，请注意货物状态" },
  { done:true,  icon: Truck,   title:"在途运输",      time:null, desc:"车辆行至广州越秀，车厢温度：29°C，设定温度：18℃至-22℃" },
  { done:false, icon: MapPin,  title:"到达目的地",    time:null, desc:"预计到达上海外高桥冷链仓库" },
  { done:false, icon: CheckCircle, title:"签收确认", time:null, desc:"收货方完成签收" },
]

export default function JicaiOrderDetailPage() {
  const [logisticsOpen, setLogisticsOpen] = useState(false)
  const currentStep = 3

  return (
    <div className="space-y-4">
      {/* 面包屑 */}
      <div className="flex items-center gap-2 text-[13px] text-[#999]">
        <Link href="/merchant/jicai/wo-caigou" className="flex items-center gap-1 hover:text-[#1a5fa8]">
          <ChevronLeft className="w-3.5 h-3.5" />我采购
        </Link>
        <span>/</span>
        <span className="text-[#1a5fa8]">订单详情</span>
      </div>

      {/* 标题 + 基本信息 */}
      <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
        <h2 className="text-[16px] font-bold text-[#1a1a2e] mb-3">南美白对虾订单详情</h2>
        <div className="grid grid-cols-3 gap-3 text-[13px] mb-4">
          <div><span className="text-[#999]">运输订单编号：</span><span className="text-[#1a1a2e] font-medium">YS20260214000001</span></div>
          <div><span className="text-[#999]">下单时间：</span><span className="text-[#1a1a2e]">2026-02-14 15:56:21</span></div>
          <div />
          <div className="flex items-center gap-1">
            <span className="text-[#999]">关联的商品订单编号：</span>
            <span className="text-[#1a5fa8] cursor-pointer hover:underline">SP20260213010001</span>
            <button className="text-[12px] border border-[#1a5fa8] text-[#1a5fa8] px-1.5 py-0.5 rounded hover:bg-[#e8f4fd] ml-1">查看</button>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#999]">关联的加订订单编号：</span>
            <span className="text-[#1a5fa8] cursor-pointer hover:underline">JG20260224010001</span>
            <button className="text-[12px] border border-[#1a5fa8] text-[#1a5fa8] px-1.5 py-0.5 rounded hover:bg-[#e8f4fd] ml-1">查看</button>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#999]">关联的合同订单编号：</span>
            <span className="text-[#1a5fa8] cursor-pointer hover:underline">CC20260224010001</span>
            <button className="text-[12px] border border-[#1a5fa8] text-[#1a5fa8] px-1.5 py-0.5 rounded hover:bg-[#e8f4fd] ml-1">查看</button>
          </div>
        </div>

        {/* 步骤条 */}
        <div className="flex items-start gap-2">
          <div className="flex-shrink-0 mt-1">
            <span className="px-2.5 py-1 bg-[#1a5fa8] text-white text-[11px] font-bold rounded-full">运输中</span>
          </div>
          <div className="flex-1 flex items-start overflow-x-auto">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center shrink-0">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold border-2 ${i <= currentStep ? "bg-[#1a5fa8] border-[#1a5fa8] text-white" : "bg-white border-[#d1dce8] text-[#aaa]"}`}>
                    {i + 1}
                  </div>
                  <div className={`text-[11px] mt-1 font-medium ${i <= currentStep ? "text-[#1a5fa8]" : "text-[#aaa]"}`}>{s.label}</div>
                  {s.date && <div className="text-[10px] text-[#999] mt-0.5">{s.date}</div>}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-16 h-0.5 mx-1 mb-5 ${i < currentStep ? "bg-[#1a5fa8]" : "bg-[#d1dce8]"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 商家 / 买方 + 商品表格 */}
      <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
        <div className="text-[13px] text-[#555] mb-3">
          <span className="font-medium">商家：</span>广东天业冷链有限公司(NO.001203232) &nbsp;&nbsp;
          <span className="font-medium">买方：</span>广东超级粤军集贸交易有限公司(NO.101203233)
        </div>
        <table className="w-full text-[13px] border border-[#e8edf5]">
          <thead className="bg-[#f5f7fa]">
            <tr>
              <th className="px-3 py-2.5 text-left font-semibold text-[#666]">服务</th>
              <th className="px-3 py-2.5 text-left font-semibold text-[#666]">下单单价(元)</th>
              <th className="px-3 py-2.5 text-left font-semibold text-[#666]">下单数量(单位)</th>
              <th className="px-3 py-2.5 text-left font-semibold text-[#666]">下单金额(元)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-[#e8edf5]">
              <td className="px-3 py-3 text-[#1a1a2e]">冷链专线<br /><span className="text-[11px] text-[#999]">规格：1000kg/车次</span></td>
              <td className="px-3 py-3 text-[#1a1a2e]">12000.00</td>
              <td className="px-3 py-3 text-[#1a1a2e]">10车次</td>
              <td className="px-3 py-3 text-[#1a1a2e] font-medium">120000.00</td>
            </tr>
            <tr className="border-t border-[#e8edf5]">
              <td className="px-3 py-3 text-[#1a1a2e]">装卸<br /><span className="text-[11px] text-[#999]">规格：10kg/次</span></td>
              <td className="px-3 py-3 text-[#1a1a2e]">5.00</td>
              <td className="px-3 py-3 text-[#1a1a2e]">1000次</td>
              <td className="px-3 py-3 text-[#1a1a2e] font-medium">5000.00</td>
            </tr>
          </tbody>
        </table>

        {/* 金额汇总 */}
        <div className="mt-3 text-[12px] text-[#555] grid grid-cols-3 gap-2">
          {[["商品总金额","125000.00"],["商家优惠","0元"],["平台优惠","0元"],["下单合计","125000.00"],["需支付预付款1%","12500.00元"],["预付款支付时间","2026-02-06 14:18:06"],["已完成结算金额","0元"]].map(([k,v])=>(
            <div key={k}><span className="text-[#999]">{k}：</span><span className={k.includes("预付款") && !k.includes("时间") ? "text-[#e04040] font-semibold" : ""}>{v}</span></div>
          ))}
        </div>

        {/* 货物 + 路线 */}
        <div className="mt-4 grid grid-cols-2 gap-4 border border-[#e8edf5] rounded-lg p-4">
          <div>
            <div className="text-[13px] font-semibold text-[#1a5fa8] mb-2">货物信息：</div>
            <div className="text-[12px] text-[#555] space-y-1">
              {[["名称","南美白对虾（冻洗整虾）"],["规格","50/60（5/kg）"],["货物总量","100000kg"],["包装方式","20kg/箱 x5000箱"],["温度要求","-18℃至-22℃"],["货值","8000000.00元"]].map(([k,v])=>(
                <div key={k}><span className="text-[#999]">{k}：</span>{v}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[13px] font-semibold text-[#1a5fa8] mb-2">路线信息：</div>
            <div className="text-[12px] text-[#555] space-y-1">
              {[["发货地","广东湛江市麻章区恒兴冷库"],["收货地","上海市浦东区外高桥外高桥仓库"],["建议路线","G15 沈海高速→G60 沪昆高速"],["全程距离","约 1,850 公里"]].map(([k,v])=>(
                <div key={k}><span className="text-[#999]">{k}：</span>{v}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 批次单列表 */}
      <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-4 border-b border-[#e8edf5] w-full pb-0">
            {["批次单列表","关联的对账单列表","关联的结算单列表"].map((t,i)=>(
              <button key={t} className={`pb-2.5 text-[13px] border-b-2 mr-2 ${i===0?"border-[#1a5fa8] text-[#1a5fa8] font-semibold":"border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>{t}</button>
            ))}
          </div>
        </div>
        <table className="w-full text-[12px] border border-[#e8edf5]">
          <thead className="bg-[#f5f7fa]">
            <tr>
              {["运输编单号","服务码","车辆类型","运输方式","车牌号","输总金额(元)","状态","关联对账单编号","关联结算单编号","操作"].map(h=>(
                <th key={h} className="px-2.5 py-2.5 text-left font-semibold text-[#666] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BATCH_LIST.map(b => {
              const ops = STATUS_OPS[b.status] ?? ["查看物流信息"]
              return (
                <tr key={b.id} className="border-t border-[#e8edf5] hover:bg-[#fafbfc]">
                  <td className="px-2.5 py-3 text-[#1a1a2e]">{b.id}</td>
                  <td className="px-2.5 py-3 text-[#555]">{b.services}</td>
                  <td className="px-2.5 py-3 text-[#555]">{b.vehicle}</td>
                  <td className="px-2.5 py-3 text-[#555]">{b.transport}</td>
                  <td className="px-2.5 py-3 text-[#555]">{b.plate}</td>
                  <td className="px-2.5 py-3 text-[#1a1a2e]">{b.amt}</td>
                  <td className="px-2.5 py-3">
                    <span className={`text-[11px] font-medium ${b.status==="已完成"?"text-[#3a8c3f]":b.status.includes("待")?"text-[#e8831a]":"text-[#1a5fa8]"}`}>{b.status}</span>
                  </td>
                  <td className="px-2.5 py-3 text-[#1a5fa8]">{b.accountNo||"—"}</td>
                  <td className="px-2.5 py-3 text-[#1a5fa8]">{b.settlementNo||"—"}</td>
                  <td className="px-2.5 py-3">
                    <div className="flex flex-wrap gap-1">
                      {ops.map(op => (
                        <button key={op} onClick={() => op.includes("物流") && setLogisticsOpen(true)}
                          className="text-[#1a5fa8] hover:underline whitespace-nowrap text-[11px]">{op}</button>
                      ))}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 订单底部详情 */}
      <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
        <div className="grid grid-cols-3 gap-x-8 gap-y-3 text-[13px]">
          {[
            ["收货计划","2026-02-27 至 2026-03-29"],
            ["配送方式","卖家配送"],
            ["收货人信息","广东省广州市越秀区大东街道菜园东路78号 陈先生 17878907890"],
            ["买方联系人信息","王汉：18978907891"],
            ["买方订单备注","无"],
            ["支付渠道","工行安心付"],
            ["定价方式","固定价"],
            ["交易模式","担保交易"],
            ["结算方式","预付款"],
            ["合同信息","【查看】"],
            ["发票信息","【查看】"],
          ].map(([k,v]) => (
            <div key={k}>
              <span className="text-[#999]">{k}：</span>
              {v === "【查看】" ? (
                <button className="text-[#1a5fa8] hover:underline">{v}</button>
              ) : (
                <span className="text-[#1a1a2e]">{v}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 物流信息侧边面板 */}
      {logisticsOpen && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setLogisticsOpen(false)}>
          <div className="flex-1 bg-black/30" />
          <div className="w-[400px] bg-white h-full overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8edf5] sticky top-0 bg-white">
              <h3 className="text-[16px] font-bold text-[#1a1a2e]">物流信息</h3>
              <button onClick={() => setLogisticsOpen(false)}><X className="w-5 h-5 text-[#999] hover:text-[#333]" /></button>
            </div>
            <div className="px-5 py-4">
              {/* 顶部数据 */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[["总里程","1850公里"],["已行驶","520公里"],["预计用时","约41小时"],["已用时","9.5小时"]].map(([k,v]) => (
                  <div key={k} className="text-[13px]">
                    <div className="text-[#999] text-[12px]">{k}</div>
                    <div className="font-semibold text-[#1a1a2e]">{v}</div>
                  </div>
                ))}
              </div>
              <div className="text-[13px] text-[#555] mb-4">
                <span className="text-[#999]">司机：</span>陈小松 &nbsp;
                <span className="text-[#999]">车牌：</span>粤G-88xxx &nbsp;
                <span className="text-[#999]">联系电话：</span>17878907890
                <button className="ml-2 px-2 py-0.5 bg-[#1a5fa8] text-white text-[12px] rounded">联系司机</button>
              </div>

              {/* 时间线 */}
              <div className="space-y-0">
                {LOGISTICS_TIMELINE.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${item.done ? "bg-[#1a5fa8] text-white" : "bg-[#f0f4f8] text-[#aaa]"}`}>
                        <item.icon className="w-3 h-3" />
                      </div>
                      {i < LOGISTICS_TIMELINE.length - 1 && (
                        <div className={`w-0.5 h-10 ${item.done ? "bg-[#1a5fa8]" : "bg-[#e8edf5]"}`} />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className={`text-[13px] font-medium ${item.done ? "text-[#1a1a2e]" : "text-[#aaa]"}`}>{item.title}</div>
                      {item.time && <div className="text-[11px] text-[#999]">{item.time}</div>}
                      <div className={`text-[12px] mt-0.5 ${item.done ? "text-[#555]" : "text-[#aaa]"}`}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
