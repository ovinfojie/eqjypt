"use client"

import { useState } from "react"
import Link from "next/link"
import { Bookmark, ShoppingCart, Tag, Trash2, MessageCircle, ExternalLink, Search } from "lucide-react"

type FavType = "all" | "caigou" | "xiaoshou"

interface FavItem {
  id: string
  type: "caigou" | "xiaoshou"
  title: string
  company: string
  category: string
  qty: string
  price: string
  area: string
  validUntil: string
  savedAt: string
  status: "进行中" | "即将结束" | "已结束"
  link: string
}

const FAVORITES: FavItem[] = [
  {
    id: "f1", type: "caigou",
    title: "2026年广东省大批量优质丝苗米长期采购",
    company: "广州越秀粮食储备有限公司",
    category: "粮油", qty: "50吨", price: "预算18万元",
    area: "广东省广州市", validUntil: "2026-06-30",
    savedAt: "2026-06-02 10:30", status: "进行中",
    link: "/portal/chanxiao-duijie/caigou-detail?id=CG20260601001",
  },
  {
    id: "f2", type: "caigou",
    title: "鲜活南美白对虾长期采购合作",
    company: "深圳盒马鲜生供应链有限公司",
    category: "水产", qty: "5吨/周", price: "预算面议",
    area: "广东省深圳市", validUntil: "2026-07-15",
    savedAt: "2026-06-03 14:00", status: "进行中",
    link: "/portal/chanxiao-duijie/caigou-detail?id=CG20260601004",
  },
  {
    id: "f3", type: "xiaoshou",
    title: "茂名荔枝大量供应，糯米糍、桂味、白糖罂",
    company: "茂名市荔枝产业合作联社",
    category: "水果", qty: "200吨", price: "15~28元/斤",
    area: "广东省茂名市", validUntil: "2026-07-20",
    savedAt: "2026-06-04 09:15", status: "进行中",
    link: "/portal/chanxiao-duijie/xiaoshou-detail?id=XS20260601003",
  },
  {
    id: "f4", type: "xiaoshou",
    title: "云浮咖啡豆（精品级）批量出售",
    company: "云浮咖啡种植专业合作社",
    category: "农特产", qty: "8吨", price: "60~80元/斤",
    area: "广东省云浮市", validUntil: "2026-08-31",
    savedAt: "2026-06-05 16:20", status: "进行中",
    link: "/portal/chanxiao-duijie/xiaoshou-detail?id=XS20260601008",
  },
  {
    id: "f5", type: "caigou",
    title: "有机蔬菜长期定向采购",
    company: "北京有机生活科技有限公司",
    category: "蔬菜", qty: "200公斤/天", price: "预算面议",
    area: "北京市朝阳区", validUntil: "2026-06-08",
    savedAt: "2026-06-01 11:00", status: "即将结束",
    link: "/portal/chanxiao-duijie/caigou-detail?id=CG20260601003",
  },
]

const statusStyle: Record<string, { text: string; bg: string }> = {
  "进行中":   { text: "#3a8c3f", bg: "#f0fdf4" },
  "即将结束": { text: "#e8831a", bg: "#fff4e6" },
  "已结束":   { text: "#888",    bg: "#f5f5f5" },
}

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState<FavType>("all")
  const [keyword, setKeyword] = useState("")
  const [items, setItems] = useState<FavItem[]>(FAVORITES)

  const filtered = items.filter(item =>
    (activeTab === "all" || item.type === activeTab) &&
    (keyword === "" || item.title.includes(keyword) || item.company.includes(keyword))
  )

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id))

  const caigouCount = items.filter(i => i.type === "caigou").length
  const xiaoshouCount = items.filter(i => i.type === "xiaoshou").length

  return (
    <div className="max-w-[860px]">
      {/* 页头 */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-[18px] font-bold text-[#1a1a2e]">我的收藏</h1>
          <p className="text-[13px] text-[#888] mt-0.5">收藏感兴趣的采购需求和销售信息，方便快速联系</p>
        </div>
        <div className="flex items-center gap-1.5 text-[13px] text-[#888]">
          <Bookmark className="w-4 h-4 text-[#1a5fa8]" />
          共 {items.length} 条收藏
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="bg-white rounded-xl border border-[#e8edf5] p-4 mb-4 flex items-center gap-3">
        <div className="flex gap-2">
          {([
            { key: "all" as FavType,      label: `全部 (${items.length})` },
            { key: "caigou" as FavType,   label: `采购需求 (${caigouCount})` },
            { key: "xiaoshou" as FavType, label: `销售信息 (${xiaoshouCount})` },
          ]).map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${
                activeTab === tab.key
                  ? "bg-[#1a5fa8] text-white"
                  : "bg-[#f0f2f5] text-[#555] hover:bg-[#e8f4fd] hover:text-[#1a5fa8]"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aab]" />
          <input value={keyword} onChange={e => setKeyword(e.target.value)}
            placeholder="搜索标题或企业名称..."
            className="w-full pl-9 pr-4 py-2 border border-[#dde3ec] rounded-lg text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
        </div>
      </div>

      {/* 收藏列表 */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#e8edf5] py-16 text-center">
          <Bookmark className="w-10 h-10 text-[#dde3ec] mx-auto mb-3" />
          <p className="text-[14px] text-[#bbb] mb-1">暂无收藏记录</p>
          <Link href="/portal/chanxiao-duijie"
            className="text-[13px] text-[#1a5fa8] hover:underline">
            去浏览产销信息
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(item => {
            const ss = statusStyle[item.status]
            const isExpired = item.status === "已结束"
            return (
              <div key={item.id} className={`bg-white rounded-xl border border-[#e8edf5] p-5 transition-colors hover:border-[#c8d9ee] ${isExpired ? "opacity-70" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* 标题行 */}
                    <div className="flex items-start gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium shrink-0 ${
                        item.type === "caigou"
                          ? "text-[#1a5fa8] bg-[#e8f4fd]"
                          : "text-[#3a8c3f] bg-[#f0fdf4]"
                      }`}>
                        {item.type === "caigou"
                          ? <><ShoppingCart className="w-3 h-3" />采购需求</>
                          : <><Tag className="w-3 h-3" />销售信息</>
                        }
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded font-medium shrink-0"
                        style={{ color: ss.text, background: ss.bg }}>
                        {item.status}
                      </span>
                    </div>
                    <Link href={item.link}
                      className="text-[15px] font-semibold text-[#1a1a2e] hover:text-[#1a5fa8] transition-colors line-clamp-1 mb-1">
                      {item.title}
                    </Link>
                    <div className="text-[13px] text-[#888] mb-3">{item.company}</div>
                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-[#6b7c93]">
                      <span>分类：{item.category}</span>
                      <span>数量：{item.qty}</span>
                      <span>价格：<span className="text-[#e8831a] font-medium">{item.price}</span></span>
                      <span>地区：{item.area}</span>
                      <span>有效期：{item.validUntil}</span>
                    </div>
                  </div>
                  {/* 操作 */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center gap-2">
                      {!isExpired && (
                        <Link href={item.link}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a5fa8] text-white text-[12px] rounded-lg hover:bg-[#1550a0] transition-colors">
                          <MessageCircle className="w-3.5 h-3.5" />联系对方
                        </Link>
                      )}
                      <Link href={item.link}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-[#dde3ec] text-[#555] text-[12px] rounded-lg hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />查看详情
                      </Link>
                      <button onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1 px-3 py-1.5 border border-[#dde3ec] text-[#999] text-[12px] rounded-lg hover:border-red-300 hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />取消收藏
                      </button>
                    </div>
                    <span className="text-[11px] text-[#ccc]">收藏于 {item.savedAt}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
