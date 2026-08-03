"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Search, Filter, ChevronRight, MapPin, Clock, Tag, Users, TrendingUp } from "lucide-react"

/* ── Types ── */
type StatusType = "全部" | "招标中" | "已截止" | "已成交"
type CatType = "全部品类" | "粮油副食" | "蔬菜水果" | "肉禽蛋奶" | "海鲜水产" | "干货调味"
type SortType = "最新发布" | "截止时间最近" | "需求量最大"

/* ── Mock data ── */
const STATUSES: StatusType[] = ["全部", "招标中", "已截止", "已成交"]
const CATS: CatType[] = ["全部品类", "粮油副食", "蔬菜水果", "肉禽蛋奶", "海鲜水产", "干货调味"]
const SORTS: SortType[] = ["最新发布", "截止时间最近", "需求量最大"]

const DEMANDS = [
  {
    id: "1",
    title: "广州市某机关单位2026年下半年食堂大米采购需求",
    buyer: "广州市某机关单位",
    cat: "粮油副食",
    status: "招标中",
    amount: "5,000 kg/月",
    budget: "面议",
    deadline: "2026-08-15",
    publishDate: "2026-07-20",
    region: "广州市",
    views: 328,
    bids: 12,
    tags: ["长期采购", "担保交易", "月度结算"],
    desc: "需要采购优质大米，要求符合国家食品安全标准，能提供产品质量检测报告，优先考虑供销系统供应商。",
  },
  {
    id: "2",
    title: "深圳某学校2026年秋季学期蔬菜配送采购公告",
    buyer: "深圳市某中学",
    cat: "蔬菜水果",
    status: "招标中",
    amount: "200 kg/天",
    budget: "12-15万元/月",
    deadline: "2026-08-10",
    publishDate: "2026-07-25",
    region: "深圳市",
    views: 256,
    bids: 8,
    tags: ["学校食堂", "日配", "有机认证优先"],
    desc: "学校食堂蔬菜日常配送，品种包含叶菜、根茎类、茄果类等20余种，需要稳定的供货渠道。",
  },
  {
    id: "3",
    title: "东莞某医院后勤部门肉禽蛋采购需求",
    buyer: "东莞市某医院",
    cat: "肉禽蛋奶",
    status: "招标中",
    amount: "300 kg/天",
    budget: "8-10万元/月",
    deadline: "2026-08-20",
    publishDate: "2026-07-28",
    region: "东莞市",
    views: 198,
    bids: 6,
    tags: ["医院后勤", "食品溯源", "冷链配送"],
    desc: "包含猪肉、禽肉、鸡蛋等品类，要求供应商具备食品经营许可证及冷链运输资质。",
  },
  {
    id: "4",
    title: "佛山某企业员工餐厅海鲜食材年度采购",
    buyer: "佛山某制造企业",
    cat: "海鲜水产",
    status: "已截止",
    amount: "100 kg/周",
    budget: "约50万元/年",
    deadline: "2026-07-31",
    publishDate: "2026-07-01",
    region: "佛山市",
    views: 412,
    bids: 15,
    tags: ["年度合同", "定期配送", "活鲜优先"],
    desc: "包含对虾、鲈鱼、蟹类等品种，要求供应稳定、质量可追溯，优先产地直供。",
  },
  {
    id: "5",
    title: "惠州某连锁餐饮集团食用油批量采购",
    buyer: "惠州某餐饮集团",
    cat: "粮油副食",
    status: "已成交",
    amount: "2,000 L/月",
    budget: "约18万元/年",
    deadline: "2026-07-15",
    publishDate: "2026-06-20",
    region: "惠州市",
    views: 366,
    bids: 20,
    tags: ["长期合作", "品牌供货", "稳定货源"],
    desc: "采购花生油、大豆油、芥花油等多品种食用油，要求品质稳定，每月定时配送。",
  },
  {
    id: "6",
    title: "珠海某政府机关办公区域水果福利采购需求",
    buyer: "珠海市某政府单位",
    cat: "蔬菜水果",
    status: "招标中",
    amount: "500 kg/次",
    budget: "约6万元/季",
    deadline: "2026-08-25",
    publishDate: "2026-08-01",
    region: "珠海市",
    views: 143,
    bids: 4,
    tags: ["季度采购", "礼盒包装", "应季水果"],
    desc: "季度性采购当季优质水果，配送至各部门，要求品相好、附产品质量证明文件。",
  },
]

const STATS = [
  { label: "本月采购需求", value: "1,248", unit: "条", icon: TrendingUp, color: "#1a5fa8" },
  { label: "参与供应商", value: "386", unit: "家", icon: Users, color: "#3a8c3f" },
  { label: "本月成交金额", value: "4,820", unit: "万元", icon: Tag, color: "#e8831a" },
]

const STATUS_COLORS: Record<string, string> = {
  "招标中": "bg-[#e8f5e9] text-[#3a8c3f] border-[#3a8c3f]/20",
  "已截止": "bg-[#f5f7fa] text-[#6b7c93] border-border",
  "已成交": "bg-[#e8f4fd] text-[#1a5fa8] border-[#1a5fa8]/20",
}

export default function CaigouPage() {
  const [status, setStatus] = useState<StatusType>("全部")
  const [cat, setCat] = useState<CatType>("全部品类")
  const [sort, setSort] = useState<SortType>("最新发布")
  const [keyword, setKeyword] = useState("")

  const filtered = DEMANDS.filter((d) => {
    const matchStatus = status === "全部" || d.status === status
    const matchCat = cat === "全部品类" || d.cat === cat
    const matchKw = !keyword || d.title.includes(keyword) || d.buyer.includes(keyword)
    return matchStatus && matchCat && matchKw
  })

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">
        {/* Banner */}
        <div className="bg-[#1a5fa8]">
          <div className="max-w-[1400px] mx-auto px-6 py-8">
            <div className="flex items-center gap-1.5 text-[12px] text-white/60 mb-3">
              <Link href="/portal" className="hover:text-white transition-colors">首页</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">采购专区</span>
            </div>
            <h1 className="text-[26px] font-bold text-white mb-2">采购需求专区</h1>
            <p className="text-[14px] text-white/70 mb-5">机关、学校、企事业单位农产品采购需求集中发布平台，供应商一站式响应</p>
            <div className="grid grid-cols-3 gap-4 max-w-[600px]">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white/15 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
                    <s.icon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <div className="text-[20px] font-bold text-white leading-none">{s.value}<span className="text-[13px] font-normal ml-0.5">{s.unit}</span></div>
                    <div className="text-[11px] text-white/60 mt-0.5">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-b border-border sticky top-16 z-40">
          <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center gap-3 flex-wrap">
            {/* Status tabs */}
            <div className="flex gap-1.5">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-3 py-1.5 text-[13px] rounded-full border transition-colors ${
                    status === s
                      ? "bg-[#1a5fa8] text-white border-[#1a5fa8]"
                      : "text-[#333] border-border hover:border-[#1a5fa8]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="w-px h-5 bg-border mx-1" />

            {/* Category */}
            <div className="flex gap-1.5 flex-wrap">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-3 py-1.5 text-[13px] rounded-full border transition-colors ${
                    cat === c
                      ? "bg-[#3a8c3f] text-white border-[#3a8c3f]"
                      : "text-[#333] border-border hover:border-[#3a8c3f]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-2">
              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortType)}
                className="border border-border rounded px-2 py-1.5 text-[13px] text-[#333] outline-none focus:border-[#1a5fa8] bg-white"
              >
                {SORTS.map((s) => <option key={s}>{s}</option>)}
              </select>
              {/* Search */}
              <div className="flex items-center gap-2 border border-border rounded px-3 py-1.5 focus-within:border-[#1a5fa8] transition-colors bg-white">
                <Search className="w-3.5 h-3.5 text-[#6b7c93]" />
                <input
                  type="text"
                  placeholder="搜索采购需求"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-[180px] text-[13px] outline-none placeholder:text-[#bbb]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="max-w-[1400px] mx-auto px-6 py-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] text-[#6b7c93]">共 <span className="text-[#1a1a2e] font-medium">{filtered.length}</span> 条采购需求</span>
          </div>

          <div className="space-y-3">
            {filtered.map((item) => (
              <Link
                key={item.id}
                href={`/portal/caigou/${item.id}`}
                className="block bg-white border border-border rounded-lg p-5 hover:shadow-md hover:border-[#1a5fa8]/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-2">
                      <span className={`shrink-0 text-[11px] px-2 py-0.5 rounded border font-medium ${STATUS_COLORS[item.status]}`}>
                        {item.status}
                      </span>
                      <h3 className="text-[15px] font-semibold text-[#1a1a2e] group-hover:text-[#1a5fa8] transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[13px] text-[#6b7c93] mb-3 line-clamp-2">{item.desc}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-[11px] px-2 py-0.5 bg-[#f5f7fa] text-[#6b7c93] rounded border border-border">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 text-right w-[200px]">
                    <div className="text-[13px] text-[#6b7c93] mb-3 space-y-1">
                      <div className="flex items-center justify-end gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.region}</span>
                        <span className="mx-1 text-border">·</span>
                        <span>{item.buyer}</span>
                      </div>
                      <div className="flex items-center justify-end gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>截止 {item.deadline}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center mb-3">
                      <div className="bg-[#f5f7fa] rounded p-2">
                        <div className="text-[12px] text-[#6b7c93] mb-0.5">采购量</div>
                        <div className="text-[13px] font-semibold text-[#1a1a2e]">{item.amount}</div>
                      </div>
                      <div className="bg-[#f5f7fa] rounded p-2">
                        <div className="text-[12px] text-[#6b7c93] mb-0.5">已报价</div>
                        <div className="text-[13px] font-semibold text-[#1a5fa8]">{item.bids} 家</div>
                      </div>
                    </div>
                    <div className={`w-full py-1.5 text-center text-[13px] font-medium rounded transition-colors ${
                      item.status === "招标中"
                        ? "bg-[#1a5fa8] text-white group-hover:bg-[#0d4a8a]"
                        : "bg-[#f5f7fa] text-[#6b7c93]"
                    }`}>
                      {item.status === "招标中" ? "立即报价" : "查看详情"}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-5">
            <span className="text-[13px] text-[#6b7c93]">共 {filtered.length} 条</span>
            <div className="flex gap-1.5">
              {[1, 2, 3].map((p) => (
                <button key={p} className={`w-8 h-8 text-[13px] rounded border transition-colors ${
                  p === 1 ? "bg-[#1a5fa8] text-white border-[#1a5fa8]" : "bg-white text-[#333] border-border hover:border-[#1a5fa8]"
                }`}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
