"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  Search,
  ClipboardList,
  FileText,
  CheckCircle,
  BarChart2,
  ChevronRight,
  MapPin,
  Calendar,
  Package,
  Plus,
  Filter,
} from "lucide-react"

/* ─── Types ─── */
type StatusFilter = "全部" | "需求发布" | "报价中" | "已签约" | "履约中" | "已完成"
type CategoryFilter = "全部" | "粮油" | "蔬菜" | "水果" | "畜禽" | "水产" | "其他"

/* ─── Mock Data ─── */
const demandList = [
  {
    id: "DD20251230006",
    title: "优质大米（粳米）批量采购需求",
    category: "粮油",
    quantity: "50吨",
    unit: "吨",
    budget: "18万元",
    region: "广州市",
    deadline: "2026-01-15",
    status: "报价中",
    buyer: "广州某食品有限公司",
    desc: "需求长粒粳米，含水量≤14%，整精米率≥65%，要求有绿色食品认证。",
    quoteCount: 3,
  },
  {
    id: "DD20251230005",
    title: "饲料用玉米大批量长期采购",
    category: "粮油",
    quantity: "120吨/月",
    unit: "吨",
    budget: "面议",
    region: "佛山市",
    deadline: "2026-01-20",
    status: "需求发布",
    buyer: "佛山某养殖合作社",
    desc: "长期稳定需求，饲料用玉米，容重≥720g/L，水分≤14%，杂质≤1%。",
    quoteCount: 0,
  },
  {
    id: "DD20251229003",
    title: "非转基因大豆采购",
    category: "粮油",
    quantity: "30吨",
    unit: "吨",
    budget: "12万元",
    region: "深圳市",
    deadline: "2026-01-10",
    status: "已签约",
    buyer: "深圳某豆制品厂",
    desc: "用于豆腐、豆浆生产，要求非转基因认证，蛋白质含量≥38%。",
    quoteCount: 5,
  },
  {
    id: "DD20251229001",
    title: "冷冻猪肉（前腿肉）采购",
    category: "畜禽",
    quantity: "8吨",
    unit: "吨",
    budget: "16万元",
    region: "东莞市",
    deadline: "2025-12-31",
    status: "履约中",
    buyer: "东莞某连锁超市集团",
    desc: "冷冻前腿肉，要求检疫合格，包装完整，需提供溯源码及检验报告。",
    quoteCount: 4,
  },
  {
    id: "DD20251228004",
    title: "新鲜应季蔬菜长期供应合作",
    category: "蔬菜",
    quantity: "500公斤/天",
    unit: "公斤",
    budget: "面议",
    region: "广州市",
    deadline: "2026-02-01",
    status: "需求发布",
    buyer: "广州某连锁餐饮企业",
    desc: "需要叶菜类、根茎类等应季蔬菜，配送到店，要求新鲜、无农残超标。",
    quoteCount: 1,
  },
  {
    id: "DD20251228002",
    title: "新鲜荔枝产地直采合作",
    category: "水果",
    quantity: "20吨",
    unit: "吨",
    budget: "30万元",
    region: "茂名市",
    deadline: "2026-06-01",
    status: "需求发布",
    buyer: "某电商平台广东区",
    desc: "合作茂名白糖罂荔枝产地，签订预购合同，要求提前签订种植订单。",
    quoteCount: 0,
  },
]

const statusColor: Record<string, string> = {
  需求发布: "text-[#e8831a] bg-[#fff3e0] border-[#e8831a]/20",
  报价中: "text-[#1a5fa8] bg-[#e8f4fd] border-[#1a5fa8]/20",
  已签约: "text-[#3a8c3f] bg-[#e8f5e9] border-[#3a8c3f]/20",
  履约中: "text-[#8b5cf6] bg-[#f3f0ff] border-[#8b5cf6]/20",
  已完成: "text-[#6b7c93] bg-[#f0f4f8] border-[#6b7c93]/20",
}

const steps = [
  { icon: ClipboardList, label: "发布需求", desc: "买方发布采购需求" },
  { icon: Search, label: "供应商报价", desc: "供应商在线响应报价" },
  { icon: FileText, label: "签订合同", desc: "双方在线签署合同" },
  { icon: Package, label: "发货履约", desc: "供应商发货执行" },
  { icon: CheckCircle, label: "确认收货", desc: "买方验收确认" },
  { icon: BarChart2, label: "评价结算", desc: "完成评价与结算" },
]

const statusFilters: StatusFilter[] = ["全部", "需求发布", "报价中", "已签约", "履约中", "已完成"]
const categoryFilters: CategoryFilter[] = ["全部", "粮油", "蔬菜", "水果", "畜禽", "水产", "其他"]

export default function DingdanNongyePage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("全部")
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("全部")
  const [keyword, setKeyword] = useState("")

  const filtered = demandList.filter((item) => {
    const matchStatus = statusFilter === "全部" || item.status === statusFilter
    const matchCat = categoryFilter === "全部" || item.category === categoryFilter
    const matchKw = !keyword || item.title.includes(keyword) || item.buyer.includes(keyword)
    return matchStatus && matchCat && matchKw
  })

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">
        {/* Page Banner */}
        <div className="bg-[#0d4a8a] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 1400 200" preserveAspectRatio="xMidYMid slice">
              <circle cx="1200" cy="100" r="180" fill="none" stroke="white" strokeWidth="40" />
              <circle cx="200" cy="160" r="100" fill="none" stroke="white" strokeWidth="20" />
            </svg>
          </div>
          <div className="max-w-[1400px] mx-auto px-6 py-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[12px] text-white/60 mb-3">
              <a href="/" className="hover:text-white transition-colors">首页</a>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">订单农业服务</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-[28px] font-bold text-white mb-2">订单农业服务</h1>
                <p className="text-[14px] text-white/70">
                  产销精准对接，全程订单管理 —— 让每一笔农产品交易都有保障
                </p>
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#e8831a] text-white text-[14px] font-semibold rounded hover:bg-[#d4751a] transition-colors">
                <Plus className="w-4 h-4" />
                发布采购需求
              </button>
            </div>
          </div>
        </div>

        {/* Flow Steps */}
        <div className="bg-white border-b border-border">
          <div className="max-w-[1400px] mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              {steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={step.label} className="flex items-center gap-3 flex-1">
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-10 h-10 rounded-full bg-[#e8f4fd] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#1a5fa8]" />
                      </div>
                      <span className="text-[13px] font-semibold text-[#1a1a2e]">{step.label}</span>
                      <span className="text-[11px] text-[#6b7c93]">{step.desc}</span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="flex-1 h-px bg-[#dde3ec] mx-2 mb-6" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex gap-5">
            {/* Left: Filters sidebar */}
            <aside className="w-[200px] shrink-0">
              <div className="bg-white border border-border rounded p-4 mb-4">
                <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1a1a2e] mb-3">
                  <Filter className="w-4 h-4 text-[#1a5fa8]" />
                  订单状态
                </div>
                <ul className="space-y-1">
                  {statusFilters.map((s) => (
                    <li key={s}>
                      <button
                        onClick={() => setStatusFilter(s)}
                        className={`w-full text-left px-3 py-2 text-[13px] rounded transition-colors ${
                          statusFilter === s
                            ? "bg-[#1a5fa8] text-white font-medium"
                            : "text-[#333] hover:bg-[#f5f7fa]"
                        }`}
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-border rounded p-4">
                <div className="text-[13px] font-semibold text-[#1a1a2e] mb-3">商品分类</div>
                <ul className="space-y-1">
                  {categoryFilters.map((c) => (
                    <li key={c}>
                      <button
                        onClick={() => setCategoryFilter(c)}
                        className={`w-full text-left px-3 py-2 text-[13px] rounded transition-colors ${
                          categoryFilter === c
                            ? "bg-[#1a5fa8] text-white font-medium"
                            : "text-[#333] hover:bg-[#f5f7fa]"
                        }`}
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Right: Main content */}
            <div className="flex-1 min-w-0">
              {/* Search bar */}
              <div className="bg-white border border-border rounded p-4 mb-4 flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2 border border-border rounded px-3 py-2">
                  <Search className="w-4 h-4 text-[#6b7c93]" />
                  <input
                    type="text"
                    placeholder="搜索采购需求标题、买方名称..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="flex-1 text-[13px] outline-none bg-transparent placeholder:text-[#6b7c93]"
                  />
                </div>
                <button className="px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
                  搜索
                </button>
              </div>

              {/* Result count + sort */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[13px] text-[#6b7c93]">
                  共 <span className="text-[#1a5fa8] font-semibold">{filtered.length}</span> 条需求
                </span>
                <div className="flex items-center gap-2 text-[13px] text-[#6b7c93]">
                  <span>排序：</span>
                  <button className="text-[#1a5fa8] font-medium">最新发布</button>
                  <span>|</span>
                  <button className="hover:text-[#1a5fa8]">报价数量</button>
                </div>
              </div>

              {/* Demand cards */}
              <div className="space-y-3">
                {filtered.length === 0 ? (
                  <div className="bg-white border border-border rounded p-12 text-center text-[#6b7c93] text-[14px]">
                    暂无符合条件的采购需求
                  </div>
                ) : (
                  filtered.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-border rounded p-5 hover:border-[#1a5fa8]/40 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`text-[11px] px-2 py-0.5 rounded border ${statusColor[item.status] ?? ""}`}
                            >
                              {item.status}
                            </span>
                            <span className="text-[11px] px-2 py-0.5 rounded bg-[#f0f4f8] text-[#6b7c93] border border-border">
                              {item.category}
                            </span>
                            <span className="text-[12px] text-[#6b7c93]">{item.id}</span>
                          </div>

                          <h3 className="text-[15px] font-semibold text-[#1a1a2e] mb-2 hover:text-[#1a5fa8] transition-colors">
                            {item.title}
                          </h3>

                          <p className="text-[13px] text-[#6b7c93] mb-3 line-clamp-1">{item.desc}</p>

                          <div className="flex items-center gap-5 text-[12px] text-[#6b7c93]">
                            <span className="flex items-center gap-1">
                              <Package className="w-3.5 h-3.5" />
                              采购量：<span className="text-[#333] font-medium">{item.quantity}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {item.region}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              截止：{item.deadline}
                            </span>
                            <span className="text-[#6b7c93]">
                              买方：<span className="text-[#333]">{item.buyer}</span>
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0 flex flex-col items-end gap-3">
                          <div className="text-right">
                            <div className="text-[18px] font-bold text-[#e8831a]">{item.budget}</div>
                            <div className="text-[11px] text-[#6b7c93]">预算金额</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[14px] font-semibold text-[#1a5fa8]">{item.quoteCount}</div>
                            <div className="text-[11px] text-[#6b7c93]">家供应商报价</div>
                          </div>
                          <button className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
                            {item.status === "需求发布" || item.status === "报价中" ? "立即报价" : "查看详情"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {[1, 2, 3, "...", 8].map((page, i) => (
                  <button
                    key={i}
                    className={`w-8 h-8 text-[13px] rounded border transition-colors ${
                      page === 1
                        ? "bg-[#1a5fa8] text-white border-[#1a5fa8]"
                        : "bg-white text-[#333] border-border hover:border-[#1a5fa8] hover:text-[#1a5fa8]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
