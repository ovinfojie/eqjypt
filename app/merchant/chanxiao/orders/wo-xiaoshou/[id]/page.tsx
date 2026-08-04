"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, FileText, Download, Upload } from "lucide-react"

const STEPS_SALE = ["提交订单","商家确认","付预付款","生产履约","发货","收货","对账结算","订单完成"]

export default function WoXiaoshouDetailPage() {
  const [activeTab, setActiveTab] = useState<"info"|"contract"|"production">("info")
  const currentStep = 2 // 待商家确认

  return (
    <div>
      <div className="flex items-center gap-2 text-[13px] text-[#999] mb-4">
        <Link href="/merchant/chanxiao/orders/wo-xiaoshou" className="hover:text-[#1a5fa8] flex items-center gap-1"><ChevronLeft className="w-3.5 h-3.5" />我销售</Link>
        <span>/</span>
        <span className="text-[#1a5fa8] font-medium">订单详情</span>
      </div>

      <div className="space-y-4">
        {/* 状态卡 */}
        <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
          <div className="flex items-center gap-4 mb-4 text-[13px] text-[#666]">
            <span>订单编号：<span className="text-[#1a1a2e] font-medium">YFK622579765392</span></span>
            <span>下单时间：<span className="text-[#1a1a2e]">2026-06-11 13:36:49</span></span>
          </div>

          <div className="flex items-start gap-6 mb-4">
            <div className="flex flex-col gap-2 min-w-[120px]">
              <div className="text-[18px] font-bold text-[#1a5fa8]">待商家确认</div>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] font-medium rounded hover:bg-[#0d4a8a]">确认接单</button>
                <button className="px-4 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">拒绝接单</button>
              </div>
            </div>
            <div className="flex-1 flex items-center">
              {STEPS_SALE.map((s,i) => (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold border-2 ${i<currentStep?"bg-[#1a5fa8] border-[#1a5fa8] text-white":i===currentStep?"border-[#1a5fa8] text-[#1a5fa8]":"border-[#dde3ec] text-[#ccc]"}`}>{i+1}</div>
                    <div className={`text-[11px] mt-1 text-center whitespace-nowrap ${i<=currentStep?"text-[#1a5fa8] font-medium":"text-[#bbb]"}`}>{s}</div>
                    {i<currentStep && <div className="text-[10px] text-[#999]">2026-06-{11+i}</div>}
                  </div>
                  {i<STEPS_SALE.length-1 && <div className={`flex-1 h-0.5 mx-1 mb-4 ${i<currentStep-1?"bg-[#1a5fa8]":"bg-[#e8edf5]"}`} />}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#fff8e6] border border-[#f5d78e] rounded px-4 py-2.5 flex items-center justify-between text-[13px]">
            <span className="text-[#8a6a00]">该交易订单的合同待签订，如未确定，可先跳过！</span>
            <button className="text-[#1a5fa8] hover:underline">去处理 &gt;&gt;&gt;</button>
          </div>
        </div>

        {/* Tab内容区 */}
        <div className="bg-white rounded-lg border border-[#e8edf5]">
          <div className="flex border-b border-[#e8edf5]">
            {([["info","订单信息"],["contract","合同、发票"],["production","生产履约情况"]] as const).map(([t,l])=>(
              <button key={t} onClick={()=>setActiveTab(t)} className={`px-5 py-3 text-[13px] border-b-2 transition-colors ${activeTab===t?"border-[#1a5fa8] text-[#1a5fa8] font-semibold":"border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>{l}</button>
            ))}
          </div>

          <div className="p-5 space-y-6">
            {activeTab === "info" && (
              <>
                <div>
                  <h4 className="text-[13px] font-bold text-[#1a1a2e] border-l-4 border-[#1a5fa8] pl-3 mb-3">商品信息</h4>
                  <table className="w-full text-[13px] border border-[#e8edf5]">
                    <thead className="bg-[#f5f7fa]"><tr>{["商品","下单数量(单位)","下单单价(元)","下单金额(元)"].map(h=><th key={h} className="px-4 py-2.5 text-left font-semibold text-[#666]">{h}</th>)}</tr></thead>
                    <tbody>
                      <tr className="border-t border-[#e8edf5]">
                        <td className="px-4 py-3"><div className="font-medium">丝苗米</div><div className="text-[#999] text-[12px]">规格：吨</div></td>
                        <td className="px-4 py-3">10.00(吨)</td>
                        <td className="px-4 py-3">3000.00</td>
                        <td className="px-4 py-3">30000.00</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-right text-[12px] text-[#666] mt-1.5">商品种类：1 种，数量总计：10 吨，商品总重量：10000.00kg  总体积：0m³</div>
                </div>
                <div>
                  <h4 className="text-[13px] font-medium text-[#1a1a2e] mb-2">订单金额</h4>
                  <div className="bg-[#f5f7fa] rounded p-4 text-[13px] space-y-1.5">
                    <div className="text-center">商品总金额：<span className="text-[#e04040] font-semibold">¥30000.00</span> + 运费合计：<span className="text-[#e04040]">¥0.00</span> - 商家优惠：<span className="text-[#e04040]">¥0.00</span> - 平台优惠：<span className="text-[#e04040]">¥0.00</span> = 订单总金额：<span className="text-[#e04040] font-bold">¥300000.00</span></div>
                    <div className="text-center">需支付<span className="text-[#e04040]">预付款 10%</span>，应付货款：<span className="text-[#e04040] font-semibold">¥30000.00</span> + 应付运费：<span className="text-[#e04040]">¥0.00</span> = <span className="text-[#e04040] font-bold">¥30000.00</span></div>
                  </div>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#1a1a2e] border-l-4 border-[#1a5fa8] pl-3 mb-3">订单明细</h4>
                  <div className="grid grid-cols-3 gap-x-8 gap-y-4 text-[13px]">
                    {[["买方","广东新供销天润粮油集团有限公司"],["商家","南雄市社村合作农业发展有限公司\n(南雄市社村合作农业发展有限公司)"],["供应商","——"],["买方联系人信息","王汉  18978907891"],["商家联系人信息","张悦  15527522832"],["供应商联系人信息","王鹏  15527522832"],["收货计划","2026-06-11 00:00:00 至 2026-06-12 23:59:59"],["配送方式","卖家配送"],["收货人信息","广东省广州市越秀区大东街道荣园东路78号\n陈先生  17878907890"],["定价方式","固定价"],["交易模式","担保交易"],["结算方式","预付款"],["支付渠道","工行安心付"],["买方订单备注","无"]].map(([k,v])=>(
                      <div key={k}><div className="text-[#999] mb-0.5">{k}</div><div className="text-[#333] whitespace-pre-line">{v}</div></div>
                    ))}
                  </div>
                </div>
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
              <div className="text-center py-10 text-[#999] text-[14px]">
                <div className="mb-2">暂无生产履约数据</div>
                <div className="text-[12px]">待商家确认接单后，将显示生产履约情况</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
