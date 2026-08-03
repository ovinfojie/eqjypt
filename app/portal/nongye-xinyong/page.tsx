"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  ShieldCheck, TrendingUp, FileText, Banknote, ChevronRight,
  Star, CheckCircle, Clock, Phone, ArrowRight, BarChart2,
  Users, Award, Landmark,
} from "lucide-react"

const PRODUCTS = [
  {
    id: "1", type: "贷款", tag: "推荐",
    name: "供销惠农贷", bank: "广东农村信用合作联社",
    amount: "最高 200 万元", rate: "3.65%起/年", period: "12个月",
    desc: "面向平台注册农业经营主体，凭借平台交易数据即可申请，无需抵押，最快1个工作日放款。",
    tags: ["无抵押", "线上申请", "快速放款"],
  },
  {
    id: "2", type: "贷款", tag: "",
    name: "农产品仓单质押贷", bank: "广州农商银行",
    amount: "最高 500 万元", rate: "4.20%起/年", period: "6个月",
    desc: "以平台认证仓库存储的农产品仓单作为质押物，灵活满足农产品流通企业短期资金需求。",
    tags: ["仓单质押", "灵活额度", "产地直供"],
  },
  {
    id: "3", type: "保险", tag: "",
    name: "农产品价格指数险", bank: "中华联合财险",
    amount: "保额最高 100 万元", rate: "0.8%起/季", period: "按季承保",
    desc: "针对大宗农产品价格波动风险，以市场价格指数为基础，当价格跌至触发价时自动赔付。",
    tags: ["价格保障", "自动理赔", "大宗农产品"],
  },
  {
    id: "4", type: "保险", tag: "",
    name: "农业生产综合险", bank: "中国人保财险",
    amount: "保额最高 50 万元", rate: "1.2%起/年", period: "按年承保",
    desc: "覆盖自然灾害、病虫害、市场风险等多种农业生产风险，为农户提供全方位生产保障。",
    tags: ["综合保障", "政策补贴", "快速理赔"],
  },
  {
    id: "5", type: "担保", tag: "",
    name: "农业经营担保", bank: "广东省农业融资担保",
    amount: "最高 1000 万元", rate: "0.5%起/年担保费", period: "1-3年",
    desc: "省级农业担保机构背书，帮助农业经营主体获得银行贷款，有效降低融资门槛和成本。",
    tags: ["省级担保", "降低门槛", "银担合作"],
  },
  {
    id: "6", type: "贷款", tag: "",
    name: "订单农业专项贷", bank: "邮储银行广东省分行",
    amount: "最高 300 万元", rate: "3.85%起/年", period: "18个月",
    desc: "针对平台订单农业合同，以订单为信用背书，帮助农业经营主体快速获得生产资金支持。",
    tags: ["订单背书", "专项支持", "快速审批"],
  },
]

const CREDIT_STEPS = [
  { step: "01", title: "注册认证", desc: "在平台完成企业/农户注册，提交营业执照或身份证等基础资料进行实名认证" },
  { step: "02", title: "积累交易数据", desc: "通过平台开展产销对接、订单农业、供销严选等交易，系统自动积累您的信用数据" },
  { step: "03", title: "申请信用评估", desc: "系统基于您的交易记录、履约情况、经营规模等多维度数据，生成综合信用评分" },
  { step: "04", title: "获取金融服务", desc: "凭借平台信用评分，一键申请银行贷款、保险、担保等多种金融产品，享受专属优惠" },
]

const STATS = [
  { value: "12,800+", label: "授信农业主体" },
  { value: "86亿元", label: "累计授信金额" },
  { value: "23家", label: "合作金融机构" },
  { value: "98.6%", label: "按时还款率" },
]

const PRODUCT_TYPES = ["全部", "贷款", "保险", "担保"]

export default function NongyeXinyongPage() {
  const [activeType, setActiveType] = useState("全部")

  const filtered = activeType === "全部"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.type === activeType)

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <SiteHeader />

      {/* Hero Banner */}
      <section className="relative h-[320px] overflow-hidden">
        <Image src="/images/xinyong/hero-bg.png" alt="农业信用服务" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d3b6e]/85 via-[#1a5fa8]/70 to-[#1a5fa8]/30" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 h-full flex items-center">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-[#4dd0a0]" />
              <span className="text-[#4dd0a0] text-[14px] font-medium">农业信用服务体系</span>
            </div>
            <h1 className="text-[42px] font-bold text-white leading-tight mb-3">
              农业信用服务
            </h1>
            <p className="text-white/80 text-[16px] max-w-[480px] leading-relaxed mb-6">
              依托平台交易大数据构建农业信用评估体系，联合金融机构提供贷款、保险、担保等一站式金融服务，助力农业经营主体解决融资难题。
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/portal/login"
                className="px-6 py-2.5 bg-[#1a5fa8] text-white rounded text-[14px] font-medium hover:bg-[#1550a0] transition-colors"
              >
                申请信用评估
              </Link>
              <Link
                href="#products"
                className="px-6 py-2.5 bg-white/20 text-white border border-white/40 rounded text-[14px] font-medium hover:bg-white/30 transition-colors"
              >
                查看金融产品
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#1a5fa8] py-5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-4 divide-x divide-white/20">
            {STATS.map(s => (
              <div key={s.label} className="text-center px-4">
                <div className="text-[26px] font-bold text-white">{s.value}</div>
                <div className="text-white/70 text-[13px] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-[26px] font-bold text-[#1a1a2e]">如何获取信用服务</h2>
          <p className="text-[#666] mt-2 text-[14px]">四步完成信用建档，轻松获取金融支持</p>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {CREDIT_STEPS.map((s, i) => (
            <div key={s.step} className="relative">
              {i < CREDIT_STEPS.length - 1 && (
                <div className="absolute top-8 left-[calc(100%-8px)] w-full h-[2px] bg-[#dde3ec] z-0" />
              )}
              <div className="relative z-10 bg-white rounded-xl p-5 border border-[#e8edf5] shadow-sm">
                <div className="w-14 h-14 rounded-full bg-[#e8f4fd] flex items-center justify-center mb-4">
                  <span className="text-[22px] font-bold text-[#1a5fa8]">{s.step}</span>
                </div>
                <h3 className="text-[15px] font-bold text-[#1a1a2e] mb-2">{s.title}</h3>
                <p className="text-[13px] text-[#666] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Credit score intro */}
      <section className="bg-white py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-12">
            <div className="flex-1">
              <div className="text-[#1a5fa8] text-[13px] font-medium mb-2">供销农信分</div>
              <h2 className="text-[26px] font-bold text-[#1a1a2e] mb-4">多维数据构建农业信用画像</h2>
              <p className="text-[#555] text-[14px] leading-relaxed mb-6">
                供销农信分基于企业在平台的交易记录、履约情况、经营规模、认证信息、业务覆盖范围等多维度数据，综合评定企业信用等级，分值范围 300-950 分，分数越高代表信用越好，可享受更多、更优惠的金融产品。
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: BarChart2, title: "交易数据", desc: "交易量、交易金额、交易频次" },
                  { icon: CheckCircle, title: "履约记录", desc: "按时交货率、投诉率、纠纷率" },
                  { icon: Users, title: "经营规模", desc: "注册资本、员工人数、年营业额" },
                  { icon: Award, title: "认证等级", desc: "平台认证、行业资质、荣誉证书" },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-3 p-4 bg-[#f8fafc] rounded-lg border border-[#e8edf5]">
                    <div className="w-8 h-8 rounded-lg bg-[#e8f4fd] flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-[#1a5fa8]" />
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-[#1a1a2e]">{item.title}</div>
                      <div className="text-[12px] text-[#888] mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[360px] shrink-0">
              <div className="bg-gradient-to-br from-[#1a5fa8] to-[#0d3b6e] rounded-2xl p-6 text-white">
                <div className="text-center mb-6">
                  <div className="text-[13px] text-white/70 mb-1">广东粮油贸易有限公司</div>
                  <div className="relative w-40 h-40 mx-auto">
                    <Image src="/images/xinyong/credit-score.png" alt="信用评分" fill className="object-contain" />
                  </div>
                  <div className="mt-2">
                    <span className="text-[42px] font-bold">826</span>
                    <span className="text-[16px] ml-1 text-white/80">分</span>
                  </div>
                  <div className="inline-block px-3 py-1 bg-[#4dd0a0]/20 text-[#4dd0a0] text-[12px] rounded-full mt-1">AA 优质信用</div>
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: "可申请贷款额度", value: "最高 300 万元" },
                    { label: "贷款利率优惠", value: "下浮 0.5%-1%" },
                    { label: "已合作金融机构", value: "8 家" },
                    { label: "信用更新时间", value: "实时更新" },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between text-[13px]">
                      <span className="text-white/70">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/portal/login"
                  className="mt-5 block w-full text-center py-2.5 bg-white text-[#1a5fa8] rounded-lg text-[14px] font-semibold hover:bg-white/90 transition-colors"
                >
                  申请我的信用评估
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial products */}
      <section id="products" className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[26px] font-bold text-[#1a1a2e]">金融产品</h2>
            <p className="text-[#666] mt-1 text-[14px]">联合 23 家金融机构，提供多样化农业金融产品</p>
          </div>
          <div className="flex gap-2">
            {PRODUCT_TYPES.map(t => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-4 py-1.5 rounded text-[13px] font-medium transition-colors ${
                  activeType === t
                    ? "bg-[#1a5fa8] text-white"
                    : "bg-white border border-[#dde3ec] text-[#555] hover:border-[#1a5fa8] hover:text-[#1a5fa8]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {filtered.map(p => (
            <div key={p.id} className="bg-white rounded-xl border border-[#e8edf5] shadow-sm hover:shadow-md hover:border-[#1a5fa8]/30 transition-all overflow-hidden">
              <div className="px-5 pt-5 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                        p.type === "贷款" ? "bg-[#e8f4fd] text-[#1a5fa8]"
                        : p.type === "保险" ? "bg-[#e8fdf0] text-[#3a8c3f]"
                        : "bg-[#fff3e0] text-[#e65c00]"
                      }`}>{p.type}</span>
                      {p.tag && <span className="text-[11px] px-2 py-0.5 rounded bg-[#fef3cd] text-[#b45309] font-medium">{p.tag}</span>}
                    </div>
                    <h3 className="text-[16px] font-bold text-[#1a1a2e]">{p.name}</h3>
                    <div className="text-[12px] text-[#888] flex items-center gap-1 mt-0.5">
                      <Landmark className="w-3 h-3" />
                      {p.bank}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3 py-3 border-y border-[#f0f4f8]">
                  <div className="text-center">
                    <div className="text-[13px] font-bold text-[#1a5fa8]">{p.amount.split(" ")[1] || p.amount}</div>
                    <div className="text-[11px] text-[#999] mt-0.5">额度</div>
                  </div>
                  <div className="text-center border-x border-[#f0f4f8]">
                    <div className="text-[13px] font-bold text-[#e65c00]">{p.rate}</div>
                    <div className="text-[11px] text-[#999] mt-0.5">利率/费率</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[13px] font-bold text-[#1a1a2e]">{p.period}</div>
                    <div className="text-[11px] text-[#999] mt-0.5">期限</div>
                  </div>
                </div>
                <p className="text-[13px] text-[#666] leading-relaxed mb-3">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map(tag => (
                    <span key={tag} className="text-[11px] px-2 py-0.5 bg-[#f5f7fa] text-[#555] rounded border border-[#e8edf5]">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="px-5 pb-4">
                <Link
                  href="/merchant/xinyong/shenqing"
                  className="block w-full text-center py-2 bg-[#1a5fa8] text-white rounded text-[13px] font-medium hover:bg-[#1550a0] transition-colors"
                >
                  立即申请
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="bg-white py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-[22px] font-bold text-[#1a1a2e] text-center mb-6">合作金融机构</h2>
          <div className="grid grid-cols-6 gap-4">
            {[
              "广东农村信用合作联社", "广州农商银行", "邮储银行广东省分行",
              "中国农业银行", "广东省农业融资担保", "中华联合财险",
              "中国人保财险", "农业发展银行", "广发银行", "中信银行",
              "招商银行", "平安普惠",
            ].map(bank => (
              <div key={bank} className="flex items-center justify-center h-14 bg-[#f8fafc] rounded-lg border border-[#e8edf5] px-3">
                <span className="text-[12px] text-[#555] text-center leading-tight font-medium">{bank}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1a5fa8] py-12">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-[26px] font-bold text-white mb-3">立即申请信用评估，获取专属金融支持</h2>
          <p className="text-white/70 text-[14px] mb-6">已有 12,800+ 家农业经营主体通过信用评估，获得共计 86 亿元授信支持</p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/portal/login"
              className="px-8 py-3 bg-white text-[#1a5fa8] rounded text-[15px] font-semibold hover:bg-white/90 transition-colors"
            >
              申请信用评估
            </Link>
            <Link
              href="/portal/nongye-xinyong"
              className="px-8 py-3 bg-transparent text-white border border-white/50 rounded text-[15px] font-medium hover:bg-white/10 transition-colors"
            >
              查看全部产品
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
