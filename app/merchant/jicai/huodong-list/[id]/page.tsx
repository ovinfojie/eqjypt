"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function JicaiHuodongDetailPage() {
  const [activeTab, setActiveTab] = useState<"info"|"orders"|"stats">("info")

  return (
    <div className="space-y-4">
      {/* 面包屑 */}
      <div className="flex items-center gap-2 text-[13px] text-[#999]">
        <Link href="/merchant/jicai/huodong-list" className="flex items-center gap-1 hover:text-[#1a5fa8]">
          <ChevronLeft className="w-3.5 h-3.5" />集采活动
        </Link>
        <span>/</span>
        <span className="text-[#1a5fa8]">活动详情</span>
      </div>

      {/* 基本信息卡片 */}
      <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[11px] font-semibold rounded border border-[#1a5fa8]">进行中</span>
              <h2 className="text-[16px] font-bold text-[#1a1a2e]">霸王花粤供河源米粉集采活动</h2>
            </div>
            <div className="text-[12px] text-[#999]">市集SPU编码：sj-xxx-3554 &nbsp;|&nbsp; 创建时间：2024-10-18 09:28:36 &nbsp;|&nbsp; 创建商家：鸿途大宗店铺</div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-[#e04040] text-[#e04040] text-[12px] rounded hover:bg-[#fff5f5]">结束活动</button>
            <button className="px-3 py-1.5 border border-[#1a5fa8] text-[#1a5fa8] text-[12px] rounded hover:bg-[#e8f4fd]">复制活动</button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-8 gap-y-3 text-[13px]">
          {[
            ["商品名称","霸王花粤供河源米粉"],
            ["平台分类","食品(标品)类/粮油类/粉面类"],
            ["审核状态","审核通过"],
            ["主数据SPU编码","zsj-xxxx-07"],
            ["主数据SKU编码","zsj-sku-40008 zsj-sku-40348 等2个"],
            ["活动状态","进行中"],
            ["活动开始时间","2026-04-15 10:51:43"],
            ["活动结束时间","2026-05-15 10:51:43"],
            ["集采进度","223/280（79%）"],
          ].map(([k,v])=>(
            <div key={k}><span className="text-[#999]">{k}：</span><span className="text-[#1a1a2e] font-medium">{v}</span></div>
          ))}
        </div>

        {/* 进度条 */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[12px] mb-1.5">
            <span className="text-[#999]">集采进度</span>
            <span className="text-[#1a5fa8] font-medium">223 / 280 &nbsp;（79%）</span>
          </div>
          <div className="w-full bg-[#e8edf5] rounded-full h-2.5">
            <div className="h-2.5 rounded-full bg-[#1a5fa8]" style={{width:"79%"}} />
          </div>
        </div>
      </div>

      {/* Tab 区域 */}
      <div className="bg-white rounded-lg border border-[#e8edf5]">
        <div className="flex border-b border-[#e8edf5] px-5 pt-1">
          {([["info","商品规格信息"],["orders","集采订单"],["stats","集采统计"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setActiveTab(key)}
              className={`px-4 py-2.5 text-[13px] border-b-2 mr-2 transition-colors ${activeTab===key?"border-[#1a5fa8] text-[#1a5fa8] font-semibold":"border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>
              {label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === "info" && (
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-[14px] font-semibold text-[#1a1a2e]">规格列表</h3>
              </div>
              <table className="w-full text-[13px] border border-[#e8edf5]">
                <thead className="bg-[#f5f7fa]">
                  <tr>{["市集SKU编码","主数据SKU编码","规格名称","规格描述","预估供应量","定价方式","销售价(元)"].map(h=>(
                    <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#666]">{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {[
                    ["sj-sku-40001","zsj-sku-40008","500g/袋","袋装","1000件","固定价","12.80"],
                    ["sj-sku-40002","zsj-sku-40348","1kg/袋","袋装","500件","阶梯价","—"],
                  ].map((row,i)=>(
                    <tr key={i} className="border-t border-[#e8edf5] hover:bg-[#fafbfc]">
                      {row.map((cell,j)=><td key={j} className="px-3 py-2.5 text-[#555]">{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-[13px] text-[#555]">共 <span className="text-[#1a5fa8] font-semibold">18</span> 笔订单</div>
                <Link href="/merchant/jicai/wo-xiaoshou" className="px-3 py-1.5 bg-[#1a5fa8] text-white text-[12px] rounded hover:bg-[#0d4a8a]">查看全部订单</Link>
              </div>
              <table className="w-full text-[13px] border border-[#e8edf5]">
                <thead className="bg-[#f5f7fa]">
                  <tr>{["订单编号","买方","商品","下单金额(元)","下单时间","状态","操作"].map(h=>(
                    <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#666]">{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {[
                    ["2434059405460956","广州番禺供销农产品配送有限公司","霸王花米粉等3种","11000.00","2026-01-01 16:18:33","已完成"],
                    ["2434059405460957","广州番禺供销农产品配送有限公司","霸王花米粉等2种","21000.00","2026-02-01 15:28:36","待发货"],
                  ].map((row,i)=>(
                    <tr key={i} className="border-t border-[#e8edf5] hover:bg-[#fafbfc]">
                      {row.map((cell,j)=><td key={j} className="px-3 py-2.5 text-[#555]">{cell}</td>)}
                      <td className="px-3 py-2.5">
                        <button className="text-[#1a5fa8] hover:underline text-[12px]">查看详情</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="grid grid-cols-4 gap-4">
              {[
                ["参与企业","18家","#1a5fa8"],
                ["订单总数","18笔","#3a8c3f"],
                ["已完成订单","5笔","#6b7c93"],
                ["成交总额","¥890,239","#e8831a"],
              ].map(([label, val, color]) => (
                <div key={label} className="border border-[#e8edf5] rounded-lg p-4 text-center">
                  <div className="text-[22px] font-bold mb-1" style={{color}}>{val}</div>
                  <div className="text-[13px] text-[#999]">{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
