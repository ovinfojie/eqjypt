"use client"

import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ChevronLeft } from "lucide-react"

const detail = {
  id: "d465817702544",
  status: "已报价",
  title: "高州市杜村公司6月份采购荔枝3000吨",
  buyer: "高州市社村合作农业发展有限公司02(南雄市社村合作农业发展有限公司)",
  publishTime: "2026-05-21 15:02:46",
  quoteMode: "可以修改报价",
  quoteDeadline: "2026-06-30 23:59:59",
  bizMode: "交易服务",
  delivery: "卖家配送、买家自提",
  recipient: "广东省广州市荔湾区某某某",
  recipientContact: "陈先生 17878907890",
  deliveryStart: "2026-05-25",
  deliveryEnd: "2026-06-27",
  depositRatio: "0%",
  tradeMode: "担保交易",
  settlement: "建行龙存管、工行安心付",
  products: [
    { img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=60&h=60&fit=crop", name: "桂味荔枝",   category: "水果/热带水果/荔枝", spec: "吨", qty: "800吨" },
    { img: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=60&h=60&fit=crop", name: "妃子笑荔枝", category: "水果/热带水果/荔枝", spec: "吨", qty: "620吨" },
    { img: "https://images.unsplash.com/photo-1502741126161-b048400d085d?w=60&h=60&fit=crop", name: "白糖罂荔枝", category: "水果/热带水果/荔枝", spec: "吨", qty: "890吨" },
  ],
  remark: "—",
  attachment: "—",
}

const statusColors: Record<string, { text: string; bg: string }> = {
  "已报价": { text: "#1a5fa8", bg: "#e8f4fd" },
  "采购中": { text: "#3a8c3f", bg: "#f0fdf4" },
  "已完成": { text: "#6b7c93", bg: "#f0f2f5" },
}

export default function CaigouDetailPage() {
  const sc = statusColors[detail.status] ?? statusColors["采购中"]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1 max-w-[900px] mx-auto px-6 py-8 w-full">

        {/* Breadcrumb */}
        <div className="text-[13px] text-[#888] mb-6 flex items-center gap-1">
          <Link href="/portal/chanxiao-duijie" className="flex items-center gap-1 hover:text-[#1a5fa8]">
            <ChevronLeft className="w-3.5 h-3.5" /> 产销对接
          </Link>
          <span>›</span>
          <span className="text-[#333]">采购需求详细信息</span>
        </div>

        {/* Page title */}
        <h1 className="text-[20px] font-bold text-center text-[#1a1a2e] mb-8">采购需求详细信息</h1>

        {/* Basic info block */}
        <div className="mb-6 space-y-2.5 text-[14px]">
          <div>
            <span className="font-semibold text-[#333]">需求：</span>
            <span className="text-[#333]">{detail.title}</span>
          </div>
          <div>
            <span className="font-semibold text-[#333]">买家：</span>
            <span className="text-[#555]">{detail.buyer}</span>
          </div>
          <div>
            <span className="font-semibold text-[#333]">发布时间：</span>
            <span className="text-[#555]">{detail.publishTime}</span>
          </div>
          {/* Two column row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-[#333]">需求编号：</span>
              <span className="text-[#555]">{detail.id}</span>
            </div>
            <div>
              <span className="font-semibold text-[#333]">需求状态：</span>
              <span className="font-medium" style={{ color: sc.text }}>{detail.status}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-[#333]">报价模式：</span>
              <span className="text-[#555]">{detail.quoteMode}</span>
            </div>
            <div>
              <span className="font-semibold text-[#333]">报价截止日期：</span>
              <span className="text-[#555]">{detail.quoteDeadline}</span>
            </div>
          </div>
          <div>
            <span className="font-semibold text-[#333]">业务模式：</span>
            <span className="text-[#555]">{detail.bizMode}</span>
          </div>
          <div>
            <span className="font-semibold text-[#333]">配送方式：</span>
            <span className="text-[#555]">{detail.delivery}</span>
          </div>
          <div>
            <span className="font-semibold text-[#333]">收货人信息：</span>
            <span className="text-[#555]">{detail.recipient}</span>
            <span className="ml-4 text-[#555]">{detail.recipientContact}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-[#333]">期望收货日期：</span>
              <span className="text-[#555]">{detail.deliveryStart} ~{detail.deliveryEnd}</span>
            </div>
            <div>
              <span className="font-semibold text-[#333]">预付款比例：</span>
              <span className="text-[#555]">{detail.depositRatio}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-[#333]">交易模式：</span>
              <span className="text-[#555]">{detail.tradeMode}</span>
            </div>
            <div>
              <span className="font-semibold text-[#333]">结算渠道：</span>
              <span className="text-[#555]">{detail.settlement}</span>
            </div>
          </div>
        </div>

        {/* Product table */}
        <div className="mb-6 border border-[#dde3ec] rounded overflow-hidden">
          <div className="bg-[#f0f4f8] px-4 py-2.5 text-[13px] font-semibold text-[#333]">商品信息</div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#dde3ec]">
                {["商品图片", "商品名称", "分类", "规格", "采购数量(单位)"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[13px] text-[#555] font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {detail.products.map((p, i) => (
                <tr key={i} className="border-b border-[#f0f2f5] last:border-0">
                  <td className="px-4 py-3">
                    <img src={p.img} alt={p.name} crossOrigin="anonymous" className="w-12 h-12 object-cover rounded border border-[#e8edf5]" />
                  </td>
                  <td className="px-4 py-3 text-[13px] text-[#333]">{p.name}</td>
                  <td className="px-4 py-3 text-[13px] text-[#555]">{p.category}</td>
                  <td className="px-4 py-3 text-[13px] text-[#555]">{p.spec}</td>
                  <td className="px-4 py-3 text-[13px] font-medium text-[#333]">{p.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Other info */}
        <div className="mb-10 border border-[#dde3ec] rounded overflow-hidden">
          <div className="bg-[#f0f4f8] px-4 py-2.5 text-[13px] font-semibold text-[#333]">其他信息</div>
          <div className="px-4 py-4 space-y-2 text-[13px]">
            <div><span className="text-[#666]">备注说明：</span><span className="text-[#333]">{detail.remark}</span></div>
            <div><span className="text-[#666]">附件：</span><span className="text-[#333]">{detail.attachment}</span></div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/portal/chanxiao-duijie/caigou-baojia"
            className="inline-block px-16 py-3 bg-[#1a5fa8] text-white text-[15px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors"
          >
            立即报价
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
