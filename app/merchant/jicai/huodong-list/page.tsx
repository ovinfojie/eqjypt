"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Download } from "lucide-react"

const STATUS_TABS = ["全部", "审核中", "审核通过", "驳回待修改", "已撤回"]

const ACTIVITIES = [
  {
    id: "jc001",
    spuCode: "sj-xxx-001", mainSpuCode: "zsj-xxxx-02",
    skuCodes: ["zsj-sku-01012", "zsj-sku-00123"], skuExtra: "等4个",
    name: "茶心", img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=60&h=60&fit=crop",
    category: "生鲜类/蔬菜类/根茎类",
    startTime: "2026-04-15 10:51:43", endTime: "2026-05-15 10:51:43",
    auditStatus: "审核通过", activityStatus: "未开始",
    progress: 0, totalQty: 80,
    creator: "鸿途大宗店铺", createTime: "2025-03-06 11:34:21",
    ops: ["详情", "撤销", "复制", "集采订单"],
  },
  {
    id: "jc002",
    spuCode: "sj-xxx-002", mainSpuCode: "zsj-xxxx-03",
    skuCodes: ["zsj-sku-16012", "zsj-sku-70423"], skuExtra: "等3个",
    name: "去皮猪五花肉", img: "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=60&h=60&fit=crop",
    category: "生鲜类/肉品类/猪肉类",
    startTime: "2026-04-15 10:51:43", endTime: "2026-05-15 10:51:43",
    auditStatus: "已撤回", activityStatus: "已结束",
    progress: 80, totalQty: 80,
    creator: "鸿途大宗店铺", createTime: "2024-10-18 09:28:36",
    ops: ["详情", "编辑", "复制", "集采订单"],
  },
  {
    id: "jc003",
    spuCode: "sj-xxx-9304", mainSpuCode: "zsj-xxxx-05",
    skuCodes: ["zsj-sku-49808"], skuExtra: "等1个",
    name: "徐府山珍鸡蛋", img: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=60&h=60&fit=crop",
    category: "生鲜类/蛋品类/鲜蛋类",
    startTime: "2026-04-15 10:51:43", endTime: "2026-05-15 10:51:43",
    auditStatus: "审核中", activityStatus: "未开始",
    progress: 0, totalQty: 80,
    creator: "鸿途大宗店铺", createTime: "2025-03-06 11:34:21",
    ops: ["详情", "撤回", "复制"],
  },
  {
    id: "jc004",
    spuCode: "sj-xxx-3434", mainSpuCode: "zsj-xxxx-08",
    skuCodes: ["zsj-sku-63043", "zsj-sku-89202"], skuExtra: "等3个",
    name: "泓海带鱼段", img: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=60&h=60&fit=crop",
    category: "生鲜类/水产类/海水鱼",
    startTime: "2026-04-15 10:51:43", endTime: "2026-05-15 10:51:43",
    auditStatus: "驳回待修改", activityStatus: "未开始",
    progress: 0, totalQty: 80,
    creator: "鸿途大宗店铺", createTime: "2024-10-18 09:28:36",
    ops: ["详情", "编辑", "复制"],
  },
  {
    id: "jc005",
    spuCode: "sj-xxx-3554", mainSpuCode: "zsj-xxxx-07",
    skuCodes: ["zsj-sku-40008", "zsj-sku-40348"], skuExtra: "等2个",
    name: "霸王花粤供河源米粉", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=60&h=60&fit=crop",
    category: "食品(标品)类/粮油类/粉面类",
    startTime: "2026-04-15 10:51:43", endTime: "2026-05-15 10:51:43",
    auditStatus: "审核通过", activityStatus: "进行中",
    progress: 223, totalQty: 280,
    creator: "鸿途大宗店铺", createTime: "2024-10-18 09:28:36",
    ops: ["详情", "结束", "复制", "集采订单"],
  },
]

const AUDIT_COLOR: Record<string, string> = {
  "审核通过": "text-[#3a8c3f]",
  "审核中":   "text-[#e8831a]",
  "驳回待修改": "text-[#e04040]",
  "已撤回":   "text-[#6b7c93]",
}

const ACTIVITY_STATUS_STYLE: Record<string, { color: string; border: string }> = {
  "未开始": { color: "#e04040", border: "#e04040" },
  "进行中": { color: "#3a8c3f", border: "#3a8c3f" },
  "已结束": { color: "#6b7c93", border: "#6b7c93" },
}

export default function JicaiHuodongListPage() {
  const [activeTab, setActiveTab] = useState("全部")

  const filtered = activeTab === "全部"
    ? ACTIVITIES
    : ACTIVITIES.filter(a => a.auditStatus === activeTab)

  return (
    <div className="space-y-4">
      {/* 搜索区 */}
      <div className="bg-white rounded-lg border border-[#e8edf5] p-4 space-y-3">
        <div className="grid grid-cols-4 gap-3">
          {[
            ["商品名称", "请输入商品名称"],
            ["平台分类", null],
            ["市集SPU编码", "请输入SPU"],
            ["主数据SPU编码", "请输入SPU"],
          ].map(([label, ph]) => (
            <div key={label as string} className="flex items-center gap-2">
              <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">{label}：</label>
              {ph ? (
                <input className="flex-1 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] min-w-0" placeholder={ph as string} />
              ) : (
                <select className="flex-1 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] text-[#999] focus:outline-none focus:border-[#1a5fa8] min-w-0">
                  <option value="">请选择</option>
                  <option>生鲜类</option><option>食品类</option>
                </select>
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            ["主数据SKU编码", "请输入SKU"],
            ["审核状态", null],
            ["活动状态", null],
          ].map(([label, ph]) => (
            <div key={label as string} className="flex items-center gap-2">
              <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">{label}：</label>
              {ph ? (
                <input className="flex-1 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8] min-w-0" placeholder={ph as string} />
              ) : (
                <select className="flex-1 border border-[#dde3ec] rounded px-2.5 py-1.5 text-[13px] text-[#999] focus:outline-none focus:border-[#1a5fa8] min-w-0">
                  <option value="">请选择</option>
                </select>
              )}
            </div>
          ))}
          <div className="flex items-center gap-2">
            <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">活动周期：</label>
            <div className="flex-1 flex items-center gap-1 min-w-0">
              <input type="date" className="flex-1 border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8] min-w-0" />
              <span className="text-[#999] shrink-0">至</span>
              <input type="date" className="flex-1 border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8] min-w-0" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-[13px] text-[#555] whitespace-nowrap shrink-0">创建时间：</label>
            <div className="flex items-center gap-1">
              <input type="date" className="border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
              <span className="text-[#999]">至</span>
              <input type="date" className="border border-[#dde3ec] rounded px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#1a5fa8]" />
              {["今日","昨日","近7天","近30天"].map(d=>(
                <button key={d} className="px-2 py-1 text-[12px] border border-[#dde3ec] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8]">{d}</button>
              ))}
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] flex items-center gap-1.5"><Search className="w-3.5 h-3.5" />查询</button>
            <button className="px-4 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">清空</button>
            <button className="px-4 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999] flex items-center gap-1.5"><Download className="w-3.5 h-3.5" />导出</button>
          </div>
        </div>
      </div>

      {/* 发布集采按钮 */}
      <div>
        <Link href="/merchant/jicai/fabu" className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] inline-block">
          发布集采
        </Link>
      </div>

      {/* 状态 Tab */}
      <div className="bg-white rounded-lg border border-[#e8edf5]">
        <div className="flex border-b border-[#e8edf5]">
          {STATUS_TABS.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-5 py-2.5 text-[13px] border-b-2 transition-colors ${activeTab===t?"border-[#1a5fa8] text-[#1a5fa8] font-semibold":"border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* 表头 */}
        <div className="grid text-[12px] font-semibold text-[#666] bg-[#f5f7fa] border-b border-[#e8edf5]"
          style={{gridTemplateColumns:"100px 110px 200px 120px 100px 140px 140px 90px 100px 100px 80px 100px 120px 100px"}}>
          {["市集SPU编码","主数据SPU编码","主数据SKU编码","商品名称","图片","平台分类","开始时间","结束时间","审核状态","活动状态","集采进度","创建商家","创建时间","操作"].map(h=>(
            <div key={h} className="px-2.5 py-2.5">{h}</div>
          ))}
        </div>

        {/* 数据行 */}
        {filtered.map(row => {
          const pct = row.totalQty > 0 ? Math.round(row.progress / row.totalQty * 100) : 0
          const actStyle = ACTIVITY_STATUS_STYLE[row.activityStatus] ?? { color: "#6b7c93", border: "#6b7c93" }
          return (
            <div key={row.id} className="grid items-center border-b border-[#e8edf5] last:border-0 hover:bg-[#fafbfc] text-[12px]"
              style={{gridTemplateColumns:"100px 110px 200px 120px 100px 140px 140px 90px 100px 100px 80px 100px 120px 100px"}}>
              <div className="px-2.5 py-3 text-[#1a1a2e]">{row.spuCode}</div>
              <div className="px-2.5 py-3 text-[#1a1a2e]">{row.mainSpuCode}</div>
              <div className="px-2.5 py-3 text-[#555]">
                {row.skuCodes.join(" ")}
                {row.skuExtra && <span className="text-[#1a5fa8] ml-1">{row.skuExtra}</span>}
              </div>
              <div className="px-2.5 py-3 text-[#1a1a2e] font-medium">{row.name}</div>
              <div className="px-2.5 py-3">
                <img src={row.img} alt={row.name} className="w-10 h-10 object-cover rounded border border-[#e8edf5]" crossOrigin="anonymous" />
              </div>
              <div className="px-2.5 py-3 text-[#555]">{row.category}</div>
              <div className="px-2.5 py-3 text-[#555]">{row.startTime}</div>
              <div className="px-2.5 py-3 text-[#555]">{row.endTime}</div>
              <div className={`px-2.5 py-3 font-medium ${AUDIT_COLOR[row.auditStatus] ?? "text-[#555]"}`}>{row.auditStatus}</div>
              <div className="px-2.5 py-3">
                <span className="px-2 py-0.5 rounded border text-[11px] font-medium"
                  style={{color: actStyle.color, borderColor: actStyle.border}}>
                  {row.activityStatus}
                </span>
              </div>
              <div className="px-2.5 py-3">
                <div className="text-[11px] text-[#555] mb-1">{row.progress}/{row.totalQty}</div>
                <div className="w-full bg-[#e8edf5] rounded-full h-1.5">
                  <div className="h-1.5 rounded-full transition-all"
                    style={{width:`${pct}%`, backgroundColor: pct>=100?"#3a8c3f":"#1a5fa8"}} />
                </div>
                <div className="text-[11px] text-[#555] mt-0.5 text-right">{pct}%</div>
              </div>
              <div className="px-2.5 py-3 text-[#555]">{row.creator}</div>
              <div className="px-2.5 py-3 text-[#555]">{row.createTime}</div>
              <div className="px-2.5 py-3 flex flex-wrap gap-1">
                {row.ops.map(op => (
                  op === "详情" ? (
                    <Link key={op} href={`/merchant/jicai/huodong-list/${row.id}`}
                      className="text-[#1a5fa8] hover:underline whitespace-nowrap">{op}</Link>
                  ) : op === "集采订单" ? (
                    <Link key={op} href={`/merchant/jicai/wo-xiaoshou`}
                      className="text-[#1a5fa8] hover:underline whitespace-nowrap">{op}</Link>
                  ) : (
                    <button key={op} className="text-[#1a5fa8] hover:underline whitespace-nowrap">{op}</button>
                  )
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
