"use client"

import { useState } from "react"
import { Upload, ChevronLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

const categories = ["粮油/大米", "粮油/面粉", "水产/对虾", "水产/淡水鱼", "水果/荔枝", "水果/柚子", "禽蛋/活禽", "禽蛋/鸡蛋", "蔬菜/叶菜", "蔬菜/根茎"]

export default function AddProductPage() {
  const [specs, setSpecs] = useState([{ name: "", value: "" }])
  const [activeTab, setActiveTab] = useState("basic")

  return (
    <div className="max-w-[800px] space-y-5">
      <div className="flex items-center gap-2">
        <Link href="/merchant/product/archive" className="flex items-center gap-1 text-[13px] text-[#6b7c93] hover:text-[#1a5fa8]">
          <ChevronLeft className="w-3.5 h-3.5" />商品档案
        </Link>
        <span className="text-[#ccc]">/</span>
        <span className="text-[13px] text-[#1a1a2e] font-medium">新建商品档案</span>
      </div>

      {/* Tab */}
      <div className="flex border-b border-[#e8edf5]">
        {[
          { key: "basic",  label: "基本信息" },
          { key: "spec",   label: "规格参数" },
          { key: "images", label: "图片资料" },
          { key: "cert",   label: "质检认证" },
        ].map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`px-5 py-2.5 text-[13px] border-b-2 -mb-px transition-colors ${activeTab === t.key ? "border-[#1a5fa8] text-[#1a5fa8] font-semibold" : "border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#e8edf5] p-6">
        {activeTab === "basic" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "商品名称", placeholder: "请输入商品全称", required: true, span: 2 },
                { label: "所属分类", type: "select", required: true },
                { label: "计量单位", placeholder: "斤/个/箱/只", required: true },
                { label: "条形码/编码", placeholder: "商品条形码（可选）" },
                { label: "品牌/品种", placeholder: "如：妃子笑/南美白对虾" },
                { label: "产地/来源", placeholder: "如：江门鹤山市" },
                { label: "保质期", placeholder: "如：冷藏7天" },
                { label: "存储条件", placeholder: "如：0-4°C冷藏" },
              ].map(f => (
                <div key={f.label} className={f.span === 2 ? "col-span-2" : ""}>
                  <label className="block text-[12px] text-[#6b7c93] mb-1">
                    {f.required && <span className="text-red-500 mr-0.5">*</span>}{f.label}
                  </label>
                  {f.type === "select" ? (
                    <select className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]">
                      <option value="">请选择分类</option>
                      {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                  ) : (
                    <input className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder={f.placeholder} />
                  )}
                </div>
              ))}
              <div className="col-span-2">
                <label className="block text-[12px] text-[#6b7c93] mb-1">商品描述</label>
                <textarea className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none h-24" placeholder="请描述商品的主要特点和卖点" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "spec" && (
          <div className="space-y-4">
            <div className="space-y-3">
              {specs.map((s, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <input value={s.name} onChange={e => { const ns = [...specs]; ns[i].name = e.target.value; setSpecs(ns) }}
                    className="w-[160px] border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="参数名（如：净重）" />
                  <input value={s.value} onChange={e => { const ns = [...specs]; ns[i].value = e.target.value; setSpecs(ns) }}
                    className="flex-1 border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="参数值（如：25kg/袋）" />
                  {specs.length > 1 && <button onClick={() => setSpecs(specs.filter((_, j) => j !== i))} className="text-[#ef4444]"><Trash2 className="w-4 h-4" /></button>}
                </div>
              ))}
            </div>
            <button onClick={() => setSpecs([...specs, { name: "", value: "" }])}
              className="flex items-center gap-1.5 text-[13px] text-[#1a5fa8] hover:underline">
              <Plus className="w-3.5 h-3.5" />添加规格参数
            </button>
          </div>
        )}

        {activeTab === "images" && (
          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-[#1a1a2e] mb-2">商品主图</label>
              <label className="flex flex-col items-center justify-center w-[140px] h-[140px] border-2 border-dashed border-[#dde3ec] rounded-lg cursor-pointer hover:border-[#1a5fa8] hover:bg-[#f8faff] transition-all">
                <Upload className="w-6 h-6 text-[#aaa] mb-2" />
                <span className="text-[12px] text-[#aaa]">上传主图</span>
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#1a1a2e] mb-2">商品详情图（最多8张）</label>
              <div className="flex flex-wrap gap-3">
                {[1,2,3].map(i => (
                  <label key={i} className="flex flex-col items-center justify-center w-[100px] h-[100px] border-2 border-dashed border-[#dde3ec] rounded-lg cursor-pointer hover:border-[#1a5fa8] hover:bg-[#f8faff] transition-all">
                    <Upload className="w-5 h-5 text-[#aaa] mb-1" />
                    <span className="text-[11px] text-[#aaa]">上传</span>
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "cert" && (
          <div className="space-y-4">
            <p className="text-[13px] text-[#6b7c93]">上传商品相关的质量认证、检测报告等证明材料。</p>
            {["质量检测报告", "有机认证证书", "地理标志证明", "食品安全证明"].map(label => (
              <div key={label} className="flex items-center gap-4">
                <span className="text-[13px] text-[#444] w-40 shrink-0">{label}</span>
                <label className="flex items-center gap-2 px-4 py-5 border-2 border-dashed border-[#dde3ec] rounded-lg cursor-pointer hover:border-[#1a5fa8] hover:bg-[#f8faff] transition-all flex-1 justify-center">
                  <Upload className="w-4 h-4 text-[#aaa]" />
                  <span className="text-[12px] text-[#aaa]">点击上传 PDF/JPG/PNG</span>
                  <input type="file" className="hidden" />
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3 justify-end">
        <Link href="/merchant/product/archive" className="px-6 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:bg-[#f5f7fa] transition-colors">取消</Link>
        <button className="px-6 py-2 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded hover:bg-[#e8f4fd] transition-colors">保存草稿</button>
        <button className="px-8 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">提交发布</button>
      </div>
    </div>
  )
}
