"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  ChevronRight, MapPin, Clock, Users, Eye, Download,
  Phone, Mail, CheckCircle, AlertCircle, FileText,
} from "lucide-react"

const DEMAND = {
  id: "1",
  title: "广州市某机关单位2026年下半年食堂大米采购需求",
  buyer: "广州市某机关单位",
  publishDate: "2026-07-20",
  deadline: "2026-08-15 17:00",
  region: "广州市越秀区",
  status: "招标中",
  views: 328,
  bids: 12,
  budget: "面议",
  amount: "5,000 kg/月",
  deliveryFreq: "每月配送2次",
  payType: "月结（次月10日前）",
  contractTerm: "2026年8月 - 2027年7月（12个月）",
  contact: "李主任",
  contactPhone: "020-****1234",
  contactEmail: "caigou@example.gov.cn",
  attachments: [
    { name: "采购需求说明书.pdf", size: "2.3 MB" },
    { name: "供应商资质要求.pdf", size: "1.1 MB" },
  ],
  requirements: [
    "供应商须具备食品经营许可证（有效期内）",
    "产品须符合 GB/T 1354 大米国家标准",
    "须提供最近6个月内的第三方检测报告",
    "具备冷链/常温仓储及配送能力",
    "优先考虑供销系统内供应商",
    "能开具增值税专用发票",
  ],
  desc: `本单位食堂日均供餐约500人次，需采购优质大米作为主食原料。要求产品品质稳定，口感好，无异味，符合国家食品安全标准。
  
  采购品种：台山丝苗米、东北大米（各约50%比例），具体品种及比例可在签约前与供应商协商确定。
  
  配送要求：每次配送提前1天通知，配送至指定地点，提供装卸服务。遇节假日等特殊情况需提前协调配送时间。
  
  结算方式：月结，次月10日前完成上月货款结算，通过银行转账支付。`,
}

const EXISTING_BIDS = [
  { supplier: "广州某粮油贸易有限公司", price: "138元/50kg", deliveryAble: true, cert: true, submitTime: "2026-07-22 14:30" },
  { supplier: "台山市某米业有限公司", price: "142元/50kg（产地直供）", deliveryAble: true, cert: true, submitTime: "2026-07-23 09:15" },
  { supplier: "广东供销农产品股份有限公司", price: "面议", deliveryAble: true, cert: true, submitTime: "2026-07-25 16:00" },
]

export default function CaigouDetailPage() {
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [quotePrice, setQuotePrice] = useState("")
  const [quoteNote, setQuoteNote] = useState("")
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb + header */}
        <div className="bg-white border-b border-border">
          <div className="max-w-[1200px] mx-auto px-6 py-4">
            <div className="flex items-center gap-1.5 text-[12px] text-[#6b7c93] mb-3">
              <Link href="/portal" className="hover:text-[#1a5fa8]">首页</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/portal/caigou" className="hover:text-[#1a5fa8]">采购专区</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#1a1a2e]">需求详情</span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[12px] px-2 py-0.5 bg-[#e8f5e9] text-[#3a8c3f] border border-[#3a8c3f]/20 rounded font-medium">
                    {DEMAND.status}
                  </span>
                  <span className="text-[12px] px-2 py-0.5 bg-[#f5f7fa] text-[#6b7c93] border border-border rounded">
                    {DEMAND.buyer}
                  </span>
                </div>
                <h1 className="text-[20px] font-bold text-[#1a1a2e] mb-2 text-pretty">{DEMAND.title}</h1>
                <div className="flex items-center gap-4 text-[13px] text-[#6b7c93]">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{DEMAND.region}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />截止：{DEMAND.deadline}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{DEMAND.views} 次浏览</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{DEMAND.bids} 家供应商已报价</span>
                </div>
              </div>
              <button
                onClick={() => setShowQuoteModal(true)}
                className="shrink-0 px-6 py-3 bg-[#1a5fa8] text-white text-[15px] font-semibold rounded-lg hover:bg-[#0d4a8a] transition-colors"
              >
                立即报价
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 py-5">
          <div className="grid grid-cols-3 gap-5">
            {/* Left: main content */}
            <div className="col-span-2 space-y-4">
              {/* Key info cards */}
              <div className="bg-white border border-border rounded-lg p-5">
                <h2 className="text-[15px] font-semibold text-[#1a1a2e] mb-4 pb-3 border-b border-border">采购基本信息</h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-[14px]">
                  {[
                    ["采购单位", DEMAND.buyer],
                    ["采购品类", "粮油副食 · 大米"],
                    ["采购数量", DEMAND.amount],
                    ["配送频次", DEMAND.deliveryFreq],
                    ["结算方式", DEMAND.payType],
                    ["合同期限", DEMAND.contractTerm],
                    ["预算范围", DEMAND.budget],
                    ["发布时间", DEMAND.publishDate],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-3">
                      <span className="text-[#6b7c93] shrink-0 w-[80px]">{k}</span>
                      <span className="text-[#1a1a2e] font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desc */}
              <div className="bg-white border border-border rounded-lg p-5">
                <h2 className="text-[15px] font-semibold text-[#1a1a2e] mb-4 pb-3 border-b border-border">需求详细说明</h2>
                <div className="text-[14px] text-[#333] leading-relaxed whitespace-pre-line">
                  {DEMAND.desc}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white border border-border rounded-lg p-5">
                <h2 className="text-[15px] font-semibold text-[#1a1a2e] mb-4 pb-3 border-b border-border">供应商资质要求</h2>
                <ul className="space-y-2">
                  {DEMAND.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-[14px] text-[#333]">
                      <CheckCircle className="w-4 h-4 text-[#3a8c3f] shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Attachments */}
              <div className="bg-white border border-border rounded-lg p-5">
                <h2 className="text-[15px] font-semibold text-[#1a1a2e] mb-4 pb-3 border-b border-border">附件下载</h2>
                <div className="space-y-2">
                  {DEMAND.attachments.map((file) => (
                    <div key={file.name} className="flex items-center justify-between p-3 bg-[#f5f7fa] rounded border border-border">
                      <div className="flex items-center gap-2 text-[13px]">
                        <FileText className="w-4 h-4 text-[#1a5fa8]" />
                        <span className="text-[#1a1a2e] font-medium">{file.name}</span>
                        <span className="text-[#6b7c93]">（{file.size}）</span>
                      </div>
                      <button className="flex items-center gap-1 text-[12px] text-[#1a5fa8] hover:underline">
                        <Download className="w-3.5 h-3.5" />
                        下载
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Existing bids */}
              <div className="bg-white border border-border rounded-lg p-5">
                <h2 className="text-[15px] font-semibold text-[#1a1a2e] mb-4 pb-3 border-b border-border">
                  已报价供应商（{EXISTING_BIDS.length} 家）
                </h2>
                <div className="space-y-3">
                  {EXISTING_BIDS.map((bid, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-[#f5f7fa] rounded border border-border text-[13px]">
                      <div className="flex-1 font-medium text-[#1a1a2e]">{bid.supplier}</div>
                      <div className="text-[#e8831a] font-semibold">{bid.price}</div>
                      <div className="flex items-center gap-1 text-[#3a8c3f]">
                        <CheckCircle className="w-3.5 h-3.5" />已认证
                      </div>
                      <div className="text-[#6b7c93]">{bid.submitTime}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-4">
              {/* Countdown */}
              <div className="bg-white border border-border rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-[#e8831a]" />
                  <span className="text-[14px] font-semibold text-[#1a1a2e]">报价截止倒计时</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center mb-4">
                  {[["13", "天"], ["05", "时"], ["42", "分"]].map(([v, u]) => (
                    <div key={u} className="bg-[#1a5fa8] rounded py-2">
                      <div className="text-[22px] font-bold text-white">{v}</div>
                      <div className="text-[11px] text-white/70">{u}</div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="w-full py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded-lg hover:bg-[#0d4a8a] transition-colors"
                >
                  立即报价
                </button>
              </div>

              {/* Contact */}
              <div className="bg-white border border-border rounded-lg p-5">
                <h3 className="text-[14px] font-semibold text-[#1a1a2e] mb-3">联系方式</h3>
                <div className="space-y-2.5 text-[13px]">
                  <div className="flex items-center gap-2 text-[#333]">
                    <Users className="w-4 h-4 text-[#6b7c93]" />
                    <span>联系人：{DEMAND.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#333]">
                    <Phone className="w-4 h-4 text-[#6b7c93]" />
                    <span>{DEMAND.contactPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#333]">
                    <Mail className="w-4 h-4 text-[#6b7c93]" />
                    <span>{DEMAND.contactEmail}</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#6b7c93] mt-3 leading-5">
                  登录后可查看完整联系方式
                </p>
              </div>

              {/* Tips */}
              <div className="bg-[#fffbf0] border border-[#e8831a]/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[#e8831a] shrink-0 mt-0.5" />
                  <div className="text-[12px] text-[#6b7c93] leading-5 space-y-1">
                    <p className="font-medium text-[#e8831a]">温馨提示</p>
                    <p>报价前请仔细阅读需求说明书及资质要求</p>
                    <p>需提前完成供应商认证方可参与报价</p>
                    <p>平台担保交易，资金安全有保障</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-[480px] p-6 shadow-xl">
            {submitted ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-[#3a8c3f]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#1a1a2e] mb-2">报价已提交</h3>
                <p className="text-[13px] text-[#6b7c93] mb-5">采购方将在截止日期后统一审核，请保持手机畅通</p>
                <button
                  onClick={() => { setShowQuoteModal(false); setSubmitted(false) }}
                  className="px-6 py-2.5 bg-[#1a5fa8] text-white rounded-lg hover:bg-[#0d4a8a] transition-colors"
                >
                  关闭
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-[17px] font-bold text-[#1a1a2e] mb-4">提交报价</h3>
                <div className="text-[13px] text-[#6b7c93] bg-[#f5f7fa] rounded p-3 mb-4 line-clamp-2">
                  {DEMAND.title}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[13px] text-[#333] mb-1.5 font-medium">报价金额 <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2.5 focus-within:border-[#1a5fa8]">
                      <input
                        type="text"
                        placeholder="请输入报价，如：138元/50kg"
                        value={quotePrice}
                        onChange={(e) => setQuotePrice(e.target.value)}
                        className="flex-1 text-[14px] outline-none placeholder:text-[#bbb]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#333] mb-1.5 font-medium">补充说明</label>
                    <textarea
                      placeholder="可说明产品特点、配送能力、售后服务等"
                      value={quoteNote}
                      onChange={(e) => setQuoteNote(e.target.value)}
                      rows={3}
                      className="w-full border border-border rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-[#1a5fa8] resize-none placeholder:text-[#bbb]"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => setShowQuoteModal(false)}
                    className="flex-1 py-2.5 border border-border text-[#333] text-[14px] rounded-lg hover:border-[#1a5fa8] transition-colors"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => setSubmitted(true)}
                    disabled={!quotePrice}
                    className={`flex-1 py-2.5 text-white text-[14px] font-semibold rounded-lg transition-colors ${
                      quotePrice ? "bg-[#1a5fa8] hover:bg-[#0d4a8a]" : "bg-[#6b7c93]/40 cursor-not-allowed"
                    }`}
                  >
                    确认提交
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  )
}
