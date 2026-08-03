import Link from "next/link"
import { ClipboardList, FileText, Search, BarChart2, ArrowRight } from "lucide-react"

const features = [
  {
    icon: ClipboardList,
    title: "需求发布",
    desc: "采购方发布农产品采购需求，供应商在线响应报价",
    href: "/portal/dingdan-nongye",
  },
  {
    icon: FileText,
    title: "订单签约",
    desc: "买卖双方在线签订采购合同，支持电子签章",
    href: "/portal/dingdan-nongye",
  },
  {
    icon: Search,
    title: "履约追踪",
    desc: "全程可追溯，实时掌握订单执行情况",
    href: "/portal/dingdan-nongye",
  },
  {
    icon: BarChart2,
    title: "数据分析",
    desc: "多维度数据报表，助力决策优化",
    href: "/portal/dingdan-nongye",
  },
]

const latestOrders = [
  { id: "DD20251230001", product: "大米（粳米）", quantity: "50吨", buyer: "广州某食品有限公司", status: "履约中" },
  { id: "DD20251229003", product: "玉米（饲料用）", quantity: "120吨", buyer: "佛山某养殖合作社", status: "已签约" },
  { id: "DD20251229001", product: "大豆（非转基因）", quantity: "30吨", buyer: "深圳某豆制品厂", status: "报价中" },
  { id: "DD20251228005", product: "冷冻猪肉", quantity: "8吨", buyer: "东莞某连锁超市", status: "履约中" },
]

const statusColor: Record<string, string> = {
  履约中: "text-[#3a8c3f] bg-[#e8f5e9]",
  已签约: "text-[#1a5fa8] bg-[#e8f4fd]",
  报价中: "text-[#e8831a] bg-[#fff3e0]",
  已完成: "text-[#6b7c93] bg-[#f0f4f8]",
}

export function OrderAgricultureEntry() {
  return (
    <section className="mt-8">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-[#1a5fa8] rounded-full" />
          <h2 className="text-[18px] font-bold text-[#1a1a2e]">订单农业服务</h2>
          <span className="text-[13px] text-[#6b7c93] ml-2">产销精准对接，订单全程管理</span>
        </div>
        <Link href="/portal/dingdan-nongye" className="flex items-center gap-1 text-[13px] text-[#1a5fa8] hover:underline">
          进入订单农业 <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Feature cards */}
        <div className="col-span-1 grid grid-cols-2 gap-3">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <Link
                key={f.title}
                href={f.href}
                className="bg-white border border-border rounded p-4 hover:border-[#1a5fa8] hover:shadow-sm transition-all group"
              >
                <div className="w-9 h-9 rounded bg-[#e8f4fd] flex items-center justify-center mb-3 group-hover:bg-[#1a5fa8] transition-colors">
                  <Icon className="w-5 h-5 text-[#1a5fa8] group-hover:text-white transition-colors" />
                </div>
                <div className="text-[14px] font-semibold text-[#1a1a2e] mb-1">{f.title}</div>
                <div className="text-[12px] text-[#6b7c93] leading-relaxed">{f.desc}</div>
              </Link>
            )
          })}
        </div>

        {/* Latest orders table */}
        <div className="col-span-2 bg-white border border-border rounded p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[14px] font-semibold text-[#1a1a2e]">最新订单动态</h4>
            <Link href="/portal/dingdan-nongye" className="text-[12px] text-[#1a5fa8] hover:underline">
              查看全部
            </Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["订单编号", "商品名称", "数量", "采购方", "状态"].map((h) => (
                  <th key={h} className="text-left text-[12px] text-[#6b7c93] pb-2 font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {latestOrders.map((order) => (
                <tr key={order.id} className="border-b border-border/50 hover:bg-[#f5f7fa] transition-colors">
                  <td className="py-3 text-[13px] text-[#1a5fa8] pr-4">{order.id}</td>
                  <td className="py-3 text-[13px] text-[#333] pr-4">{order.product}</td>
                  <td className="py-3 text-[13px] text-[#333] pr-4">{order.quantity}</td>
                  <td className="py-3 text-[13px] text-[#333] pr-4">{order.buyer}</td>
                  <td className="py-3">
                    <span className={`text-[12px] px-2 py-0.5 rounded ${statusColor[order.status] ?? ""}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
