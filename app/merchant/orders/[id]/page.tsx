"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { MerchantLayout } from "@/components/merchant/merchant-layout"
import Image from "next/image"
import {
  ChevronLeft, Package, Truck, CheckCircle2, XCircle,
  CreditCard, Clock, MapPin, Phone, FileText, RefreshCw, Download,
} from "lucide-react"

const ORDER = {
  id: "o1",
  orderNo: "PO2026080100123",
  createdAt: "2026-08-01 10:32:15",
  payDeadline: "2026-08-01 22:32:15",
  status: "pending_confirm" as const,
  supplier: "广东供销农产品股份有限公司",
  supplierContact: "李经理",
  supplierPhone: "020-8899****",
  deliveryType: "卖家配送",
  paymentMethod: "平台担保付款",
  tradeMode: "担保交易",
  settlement: "建行龙存管",
  prepayRatio: "30%",
  address: "广东省广州市越秀区大东街道莱园东路78号",
  addressContact: "陈先生",
  addressPhone: "178****5566",
  remark: "请附送质检报告，分2批次配送。",
  invoice: "增值税专用发票，抬头：广州盒马超市有限公司，税号：914401011234567890",
  items: [
    { name: "台山丝苗米（精装）", spec: "25kg/袋", qty: 10, unit: "袋", price: 128.00, img: "/images/products/simiao-rice.png" },
    { name: "某某优选鸡蛋",        spec: "30枚/盒", qty: 5,  unit: "盒", price: 31.12, img: "/images/products/eggs.png" },
  ],
  goodsTotal: 1435.60,
  freight: 0,
  discount: 0,
  total: 1435.60,
  prepayAmount: 430.68,
  logs: [
    { time: "2026-08-01 10:32:15", event: "订单创建成功，等待供应商确认" },
    { time: "2026-08-01 10:32:00", event: "成功加入采购车" },
  ],
}

const STATUS_CONFIG = {
  pending_confirm: { label: "待供应商确认", color: "#e8831a", bg: "#fff8f0", icon: Clock },
  pending_payment: { label: "待付款",        color: "#1a5fa8", bg: "#e8f4fd", icon: CreditCard },
  shipping:        { label: "配送中",         color: "#3a8c3f", bg: "#e8f5e9", icon: Truck },
  completed:       { label: "已完成",         color: "#6b7c93", bg: "#f5f7fa", icon: CheckCircle2 },
  cancelled:       { label: "已取消",         color: "#ef4444", bg: "#fef2f2", icon: XCircle },
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-5 py-3 bg-[#f8fafc] border-b border-[#e8edf5] flex items-center gap-2">
      <span className="w-0.5 h-4 bg-[#1a5fa8] rounded-full inline-block" />
      <span className="text-[13px] font-semibold text-[#333]">{children}</span>
    </div>
  )
}

function Row({ label, value, highlight }: { label: string; value: React.ReactNode; highlight?: boolean }) {
  return (
    <div className="flex gap-3 py-2 border-b border-[#f5f7fa] last:border-0 text-[13px]">
      <span className="text-[#999] w-24 shrink-0 text-right">{label}</span>
      <span className={highlight ? "text-[#e8831a] font-semibold" : "text-[#333]"}>{value}</span>
    </div>
  )
}

function OrderDetailContent() {
  const { id } = useParams<{ id: string }>()
  const order = ORDER // 实际项目中按 id 查询
  const sc = STATUS_CONFIG[order.status]
  const StatusIcon = sc.icon

  return (
    <MerchantLayout>
      <div className="max-w-[920px] space-y-4">
        {/* 面包屑 */}
        <div className="flex items-center gap-1.5 text-[13px] text-[#999]">
          <Link href="/merchant/orders" className="flex items-center gap-1 hover:text-[#1a5fa8] transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />我的采购订单
          </Link>
          <span>›</span>
          <span className="text-[#333]">订单详情</span>
        </div>

        {/* 状态横幅 */}
        <div
          className="rounded-lg p-5 flex items-center justify-between"
          style={{ background: sc.bg }}
        >
          <div className="flex items-center gap-3">
            <StatusIcon className="w-8 h-8" style={{ color: sc.color }} />
            <div>
              <div className="text-[16px] font-bold" style={{ color: sc.color }}>{sc.label}</div>
              {order.status === "pending_payment" && (
                <div className="text-[12px] text-[#e8831a] mt-0.5">
                  请在 {order.payDeadline} 前完成付款，逾期订单将自动取消
                </div>
              )}
              {order.status === "pending_confirm" && (
                <div className="text-[12px]" style={{ color: sc.color }}>等待供应商确认接单，通常在2小时内处理</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {order.status === "pending_payment" && (
              <button className="px-6 h-9 bg-[#e8831a] text-white text-[13px] font-semibold rounded hover:bg-[#d4741a] transition-colors">
                立即付款
              </button>
            )}
            {order.status === "shipping" && (
              <button className="px-6 h-9 bg-[#3a8c3f] text-white text-[13px] font-semibold rounded hover:bg-[#2d7a33] transition-colors">
                确认收货
              </button>
            )}
            {(order.status === "pending_confirm" || order.status === "pending_payment") && (
              <button className="px-6 h-9 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-red-300 hover:text-red-500 transition-colors">
                取消订单
              </button>
            )}
            {order.status === "completed" && (
              <button className="flex items-center gap-1.5 px-5 h-9 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
                <Download className="w-3.5 h-3.5" />下载凭证
              </button>
            )}
          </div>
        </div>

        {/* 物流时间线（配送中/已完成时显示） */}
        {(order.status === "shipping" || order.status === "completed") && (
          <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
            <SectionTitle>物流信息</SectionTitle>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4 text-[13px]">
                <Truck className="w-4 h-4 text-[#1a5fa8]" />
                <span className="text-[#333]">顺丰快运 · 运单号：SF2026080100123456</span>
                <button className="text-[#1a5fa8] hover:underline">复制</button>
              </div>
              <div className="relative pl-6 space-y-4 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-[#dde3ec]">
                {[
                  { time: "2026-08-01 18:30", desc: "货物已由广州荔湾网点发出，预计明日送达" },
                  { time: "2026-08-01 15:20", desc: "货物已完成打包，待揽件" },
                  { time: "2026-08-01 14:05", desc: "供应商已确认订单，开始备货" },
                ].map((log, i) => (
                  <div key={i} className="relative flex gap-3">
                    <div className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 ${i === 0 ? "border-[#1a5fa8] bg-[#1a5fa8]" : "border-[#dde3ec] bg-white"}`} />
                    <div>
                      <div className="text-[13px] text-[#333]">{log.desc}</div>
                      <div className="text-[11px] text-[#999] mt-0.5">{log.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 商品清单 */}
        <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
          <SectionTitle>
            <span>商品清单</span>
            <span className="ml-auto text-[12px] font-normal text-[#999]">供应商：{order.supplier}</span>
          </SectionTitle>
          <div className="p-5 space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded border border-[#e8edf5] overflow-hidden shrink-0">
                  <Image src={item.img} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-medium text-[#1a1a2e]">{item.name}</div>
                  <div className="text-[12px] text-[#6b7c93]">{item.spec}</div>
                </div>
                <div className="text-[13px] text-[#6b7c93]">× {item.qty} {item.unit}</div>
                <div className="text-[13px] text-[#6b7c93]">单价 ¥{item.price.toFixed(2)}</div>
                <div className="text-[14px] font-semibold text-[#e8831a]">
                  ¥{(item.price * item.qty).toFixed(2)}
                </div>
              </div>
            ))}
            {/* 费用汇总 */}
            <div className="border-t border-[#f0f4f8] pt-4 space-y-1.5 text-[13px]">
              <div className="flex justify-between text-[#6b7c93]">
                <span>商品总额</span>
                <span>¥{order.goodsTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6b7c93]">
                <span>运费</span>
                <span>{order.freight === 0 ? "免运费" : `¥${order.freight.toFixed(2)}`}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#3a8c3f]">
                  <span>优惠减免</span>
                  <span>-¥{order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-[#1a1a2e] text-[14px] pt-1 border-t border-[#f0f4f8]">
                <span>订单总金额</span>
                <span className="text-[#e8831a]">¥{order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6b7c93]">
                <span>本次应付（预付{order.prepayRatio}）</span>
                <span className="text-[#1a5fa8] font-semibold">¥{order.prepayAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* 收货信息 */}
          <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
            <SectionTitle>收货信息</SectionTitle>
            <div className="p-5">
              <Row label="收货地址" value={<span className="flex items-start gap-1"><MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#1a5fa8]" />{order.address}</span>} />
              <Row label="联系人" value={order.addressContact} />
              <Row label="联系电话" value={<span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#1a5fa8]" />{order.addressPhone}</span>} />
              <Row label="配送方式" value={order.deliveryType} />
            </div>
          </div>

          {/* 结算与发票 */}
          <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
            <SectionTitle>结算与发票</SectionTitle>
            <div className="p-5">
              <Row label="交易模式" value={order.tradeMode} />
              <Row label="支付方式" value={order.paymentMethod} />
              <Row label="结算渠道" value={order.settlement} />
              <Row label="发票信息" value={<span className="flex items-start gap-1"><FileText className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#1a5fa8]" />{order.invoice}</span>} />
              {order.remark && <Row label="买家备注" value={order.remark} />}
            </div>
          </div>
        </div>

        {/* 供应商信息 */}
        <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
          <SectionTitle>供应商信息</SectionTitle>
          <div className="p-5">
            <div className="grid grid-cols-3 gap-4 text-[13px]">
              <Row label="供应商" value={order.supplier} />
              <Row label="联系人" value={order.supplierContact} />
              <Row label="联系电话" value={order.supplierPhone} />
            </div>
          </div>
        </div>

        {/* 订单基本信息 */}
        <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
          <SectionTitle>订单信息</SectionTitle>
          <div className="p-5 grid grid-cols-2 gap-x-8">
            <Row label="订单编号" value={<span className="font-mono">{order.orderNo}</span>} />
            <Row label="下单时间" value={order.createdAt} />
          </div>
        </div>

        {/* 订单日志 */}
        <div className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
          <div className="px-5 py-3 bg-[#f8fafc] border-b border-[#e8edf5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-0.5 h-4 bg-[#1a5fa8] rounded-full inline-block" />
              <span className="text-[13px] font-semibold text-[#333]">操作记录</span>
            </div>
            <button className="flex items-center gap-1 text-[12px] text-[#6b7c93] hover:text-[#1a5fa8] transition-colors">
              <RefreshCw className="w-3 h-3" />刷新
            </button>
          </div>
          <div className="p-5 space-y-3">
            {order.logs.map((log, i) => (
              <div key={i} className="flex items-start gap-3 text-[13px]">
                <span className="text-[#999] shrink-0 w-36">{log.time}</span>
                <span className="text-[#555]">{log.event}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 底部操作区 */}
        <div className="flex items-center gap-3 pt-2 pb-4">
          <Link
            href="/merchant/orders"
            className="flex items-center gap-1.5 px-5 h-9 border border-[#dde3ec] text-[#666] text-[13px] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
          >
            <Package className="w-3.5 h-3.5" />返回订单列表
          </Link>
        </div>
      </div>
    </MerchantLayout>
  )
}

export default function OrderDetailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-[#999] text-[13px]">加载中…</div>}>
      <OrderDetailContent />
    </Suspense>
  )
}
