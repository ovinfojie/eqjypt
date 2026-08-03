"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

type Category = "稻谷" | "玉米" | "大豆" | "冻肉"

const priceData: Record<Category, Array<{month: string; sell: number; buy: number; collect: number}>> = {
  稻谷: [
    { month: "1月", sell: 110.2, buy: 106.1, collect: 104.5 },
    { month: "2月", sell: 110.5, buy: 106.3, collect: 104.8 },
    { month: "3月", sell: 110.8, buy: 106.5, collect: 105.0 },
    { month: "4月", sell: 110.6, buy: 106.4, collect: 104.9 },
    { month: "5月", sell: 110.3, buy: 106.2, collect: 104.6 },
    { month: "6月", sell: 110.2, buy: 106.1, collect: 106.9 },
    { month: "7月", sell: 110.8, buy: 106.5, collect: 105.2 },
    { month: "8月", sell: 110.9, buy: 106.6, collect: 105.4 },
    { month: "9月", sell: 111.0, buy: 106.7, collect: 105.6 },
    { month: "10月", sell: 111.2, buy: 106.8, collect: 105.8 },
    { month: "11月", sell: 111.0, buy: 106.7, collect: 105.6 },
    { month: "12月", sell: 110.8, buy: 106.5, collect: 105.4 },
  ],
  玉米: [
    { month: "1月", sell: 105.2, buy: 102.1, collect: 100.5 },
    { month: "2月", sell: 105.5, buy: 102.3, collect: 100.8 },
    { month: "3月", sell: 106.0, buy: 102.8, collect: 101.2 },
    { month: "4月", sell: 106.2, buy: 103.0, collect: 101.4 },
    { month: "5月", sell: 105.8, buy: 102.6, collect: 101.0 },
    { month: "6月", sell: 105.5, buy: 102.3, collect: 100.8 },
    { month: "7月", sell: 105.9, buy: 102.7, collect: 101.1 },
    { month: "8月", sell: 106.1, buy: 102.9, collect: 101.3 },
    { month: "9月", sell: 106.4, buy: 103.2, collect: 101.6 },
    { month: "10月", sell: 106.5, buy: 103.3, collect: 101.7 },
    { month: "11月", sell: 106.3, buy: 103.1, collect: 101.5 },
    { month: "12月", sell: 106.0, buy: 102.8, collect: 101.2 },
  ],
  大豆: [
    { month: "1月", sell: 108.0, buy: 104.5, collect: 102.8 },
    { month: "2月", sell: 108.3, buy: 104.7, collect: 103.0 },
    { month: "3月", sell: 108.6, buy: 105.0, collect: 103.3 },
    { month: "4月", sell: 108.4, buy: 104.8, collect: 103.1 },
    { month: "5月", sell: 108.1, buy: 104.6, collect: 102.9 },
    { month: "6月", sell: 108.0, buy: 104.5, collect: 102.8 },
    { month: "7月", sell: 108.5, buy: 104.9, collect: 103.2 },
    { month: "8月", sell: 108.7, buy: 105.1, collect: 103.4 },
    { month: "9月", sell: 109.0, buy: 105.4, collect: 103.7 },
    { month: "10月", sell: 109.2, buy: 105.6, collect: 103.9 },
    { month: "11月", sell: 109.0, buy: 105.4, collect: 103.7 },
    { month: "12月", sell: 108.7, buy: 105.1, collect: 103.4 },
  ],
  冻肉: [
    { month: "1月", sell: 115.0, buy: 110.5, collect: 108.0 },
    { month: "2月", sell: 115.5, buy: 111.0, collect: 108.5 },
    { month: "3月", sell: 116.0, buy: 111.5, collect: 109.0 },
    { month: "4月", sell: 115.8, buy: 111.3, collect: 108.8 },
    { month: "5月", sell: 115.3, buy: 110.8, collect: 108.3 },
    { month: "6月", sell: 115.0, buy: 110.5, collect: 108.0 },
    { month: "7月", sell: 115.6, buy: 111.1, collect: 108.6 },
    { month: "8月", sell: 116.1, buy: 111.6, collect: 109.1 },
    { month: "9月", sell: 116.5, buy: 112.0, collect: 109.5 },
    { month: "10月", sell: 116.8, buy: 112.3, collect: 109.8 },
    { month: "11月", sell: 116.5, buy: 112.0, collect: 109.5 },
    { month: "12月", sell: 116.2, buy: 111.7, collect: 109.2 },
  ],
}

const categories: Category[] = ["稻谷", "玉米", "大豆", "冻肉"]

export function PriceIndexSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("稻谷")
  const data = priceData[activeCategory]

  return (
    <div className="bg-white rounded border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#1a5fa8]" />
          <h3 className="text-[16px] font-bold text-[#1a1a2e]">农产品价格指数走势</h3>
          <span className="text-[12px] text-[#6b7c93] ml-1">基准值 100</span>
        </div>
        <a href="/portal/jiage-daping" className="text-[13px] text-[#1a5fa8] hover:underline">
          查看全部 →
        </a>
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 text-[13px] rounded border transition-colors ${
              activeCategory === cat
                ? "bg-[#1a5fa8] text-white border-[#1a5fa8]"
                : "bg-white text-[#333] border-border hover:border-[#1a5fa8] hover:text-[#1a5fa8]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-2 text-[12px]">
        <span className="flex items-center gap-1.5">
          <span className="w-8 h-0.5 bg-[#e34040] inline-block" />
          <span className="text-[#e34040]">销售价格指数（向下游卖出）</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-8 h-0.5 bg-[#1a5fa8] inline-block border-dashed border-t border-[#1a5fa8]" />
          <span className="text-[#1a5fa8]">采购价格指数（从批发市场买入）</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-8 h-0.5 bg-[#3a8c3f] inline-block border-dashed border-t border-[#3a8c3f]" />
          <span className="text-[#3a8c3f]">收购价格指数（从农户收购）</span>
        </span>
        <span className="text-[#6b7c93] ml-auto">来源：中国供销总社</span>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7c93" }} axisLine={false} tickLine={false} />
          <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12, fill: "#6b7c93" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ fontSize: 12, border: "1px solid #dde3ec", borderRadius: 4 }}
            formatter={(value, name) => {
              const labels: Record<string, string> = {
                sell: "销售价格指数",
                buy: "采购价格指数",
                collect: "收购价格指数",
              }
              return [Number(value).toFixed(1), labels[String(name)] || String(name)]
            }}
          />
          <Line type="monotone" dataKey="sell" stroke="#e34040" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="buy" stroke="#1a5fa8" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
          <Line type="monotone" dataKey="collect" stroke="#3a8c3f" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
