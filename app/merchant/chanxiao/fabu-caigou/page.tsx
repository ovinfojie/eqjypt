"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronLeft, CheckCircle, Upload, FileText, X,
  Undo2, Redo2, Bold, Italic, Underline, Strikethrough,
  List, ListOrdered, Link2, Image as ImageIcon, Table, Code,
} from "lucide-react"

const platformCategories = ["生鲜类/肉品类/牛肉类", "水果/核果仁果类/苹果", "粮油/大米类", "蔬菜/叶菜类"]
const specOptions = ["500g / 份", "4kg / 箱", "1kg / 袋", "吨", "50kg / 袋"]
const quoteModes = ["可以修改报价", "一次报价不可修改"]
const tradeModeOptions = ["担保交易", "非担保交易"]
const deliveryOptions = ["卖家配送", "买家自提", "无需物流"]
const settlementOptions = ["建行龙存管", "工行安心付"]

type GoodsRow = { id: number; name: string; category: string; spec: string; qty: string; unit: string }

let uid = 3
const initGoods: GoodsRow[] = [
  { id: 1, name: "牛腩", category: "生鲜类/肉品类/牛肉类", spec: "500g / 份", qty: "500", unit: "份" },
  { id: 2, name: "有机红富士", category: "水果/核果仁果类/苹果", spec: "4kg / 箱", qty: "5", unit: "箱" },
]

export default function FabuCaigouPage() {
  const [submitted, setSubmitted] = useState(false)
  const [publishType, setPublishType] = useState<"公开发布" | "定向发布">("公开发布")
  const [supplier, setSupplier] = useState("")
  const [reqMode, setReqMode] = useState<"商品描述" | "选择商品">("商品描述")
  const [desc, setDesc] = useState("")
  const [goods, setGoods] = useState<GoodsRow[]>(initGoods)
  const [remark, setRemark] = useState("")
  const [attachments, setAttachments] = useState<string[]>(["附件文件.pdf"])

  // 交易条款（复选）
  const [tradeMode, setTradeMode] = useState<string[]>([])
  const [delivery, setDelivery] = useState<string[]>([])
  const [settlement, setSettlement] = useState<string[]>([])

  const toggle = (arr: string[], setArr: (v: string[]) => void, v: string) =>
    setArr(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])

  const addGoods = () => setGoods((p) => [...p, { id: uid++, name: "", category: "", spec: "", qty: "", unit: "" }])
  const removeGoods = (id: number) => setGoods((p) => p.filter((g) => g.id !== id))
  const updateGoods = (id: number, k: keyof GoodsRow, v: string) =>
    setGoods((p) => p.map((g) => (g.id === id ? { ...g, [k]: v } : g)))

  if (submitted) {
    return (
      <div className="max-w-[560px] mx-auto mt-16 bg-white rounded-xl border border-[#e8edf5] p-10 text-center">
        <CheckCircle className="w-14 h-14 text-[#3a8c3f] mx-auto mb-4" />
        <div className="text-[20px] font-bold text-[#333] mb-2">采购需求提交成功</div>
        <div className="text-[14px] text-[#888] mb-8">您的采购需求已提交，平台审核通过后供应商即可查看并报价。</div>
        <div className="flex gap-3 justify-center">
          <Link href="/merchant/chanxiao/caigou-list" className="px-6 py-2.5 bg-[#1a5fa8] text-white text-[13px] rounded-lg hover:bg-[#0d4a8a] transition-colors">
            查看我的采购需求
          </Link>
          <Link href="/portal/chanxiao-duijie" className="px-6 py-2.5 border border-[#dde3ec] text-[#555] text-[13px] rounded-lg hover:bg-[#f5f7fa] transition-colors">
            前往产销对接大厅
          </Link>
        </div>
      </div>
    )
  }

  const toolbarIcons = [Undo2, Redo2, Bold, Italic, Underline, Strikethrough, Link2, List, ListOrdered, ImageIcon, Table, Code]

  return (
    <div className="max-w-[1000px] mx-auto">
      {/* Breadcrumb */}
      <div className="text-[13px] text-[#999] mb-4 flex items-center gap-1">
        <Link href="/merchant/chanxiao/caigou-list" className="flex items-center gap-1 hover:text-[#1a5fa8]">
          <ChevronLeft className="w-3.5 h-3.5" />产销对接 · 采购管理
        </Link>
        <span>›</span>
        <span className="text-[#333]">发布采购需求</span>
      </div>

      <div className="bg-white rounded-xl border border-[#dde3ec]">
        <div className="px-7 py-5 border-b border-[#e8edf5] text-center">
          <h1 className="text-[18px] font-bold text-[#1a1a2e]">发布采购需求</h1>
        </div>

        <div className="p-7 space-y-8">
          {/* 需求内容 */}
          <section>
            <SectionTitle>需求内容</SectionTitle>
            <div className="space-y-4">
              <Field label="需求标题" required labelWidth>
                <input placeholder="请输入"
                  className="w-full max-w-[640px] px-3 py-2 border border-[#dde3ec] rounded text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              </Field>

              <Field label="发布方式" required labelWidth>
                <div className="flex gap-8 pt-1">
                  {(["公开发布", "定向发布"] as const).map((t) => (
                    <label key={t} className="flex items-center gap-1.5 text-[13px] text-[#555] cursor-pointer">
                      <input type="radio" name="publishType" checked={publishType === t} onChange={() => setPublishType(t)} className="accent-[#1a5fa8]" />
                      {t}
                    </label>
                  ))}
                </div>
              </Field>

              {publishType === "定向发布" && (
                <Field label="指定供应商" required labelWidth>
                  <input value={supplier} onChange={(e) => setSupplier(e.target.value)} placeholder="请输入"
                    className="w-full max-w-[640px] px-3 py-2 border border-[#dde3ec] rounded text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </Field>
              )}

              {/* 模式选择卡片 */}
              <div className="grid grid-cols-2 gap-4">
                <ModeCard
                  active={reqMode === "商品描述"}
                  title="需求描述"
                  desc="直接描述需求，适合需求较灵活或尚未确定具体商品的情况"
                  onClick={() => setReqMode("商品描述")}
                />
                <ModeCard
                  active={reqMode === "选择商品"}
                  title="选择商品"
                  desc="关联已有商品档案，适合已有明确商品规格的需求"
                  onClick={() => setReqMode("选择商品")}
                />
              </div>

              {/* 商品描述模式 */}
              {reqMode === "商品描述" && (
                <div>
                  <label className="block text-[13px] text-[#555] mb-1.5"><span className="text-red-500">*</span> 需求描述</label>
                  <div className="border border-[#dde3ec] rounded overflow-hidden">
                    <div className="flex items-center gap-1 px-2 py-1.5 bg-[#f8f9fc] border-b border-[#e8edf5] flex-wrap">
                      {toolbarIcons.map((Icon, i) => (
                        <button key={i} type="button" className="p-1 text-[#666] hover:text-[#1a5fa8] hover:bg-[#eef3fa] rounded">
                          <Icon className="w-3.5 h-3.5" />
                        </button>
                      ))}
                    </div>
                    <textarea value={desc} onChange={(e) => setDesc(e.target.value.slice(0, 5000))}
                      rows={6} placeholder="请详细描述您的需求，包括商品分类、规格要求、采购数量、商品详细情况、收购标准等信息..."
                      className="w-full px-3 py-2.5 text-[13px] focus:outline-none resize-none" />
                    <div className="text-right px-3 py-1 text-[12px] text-[#bbb]">{desc.length}/5000</div>
                  </div>
                </div>
              )}

              {/* 选择商品模式 */}
              {reqMode === "选择商品" && (
                <div>
                  <SectionTitle sub>商品信息</SectionTitle>
                  <div className="border border-[#e8edf5] rounded-lg overflow-hidden">
                    <table className="w-full text-[13px]">
                      <thead>
                        <tr className="bg-[#f8f9fc] text-[12px] text-[#888] text-center">
                          <th className="px-3 py-2.5 font-medium">商品图片</th>
                          <th className="px-3 py-2.5 font-medium">商品名称</th>
                          <th className="px-3 py-2.5 font-medium">平台分类</th>
                          <th className="px-3 py-2.5 font-medium">规格</th>
                          <th className="px-3 py-2.5 font-medium">计划采购量(单位)</th>
                          <th className="px-3 py-2.5 font-medium">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f0f2f5]">
                        {goods.map((g) => (
                          <tr key={g.id} className="text-center">
                            <td className="px-3 py-3">
                              <div className="w-12 h-12 mx-auto bg-[#f0f2f5] rounded border border-[#e8edf5] flex items-center justify-center">
                                <ImageIcon className="w-5 h-5 text-[#c5ccd6]" />
                              </div>
                            </td>
                            <td className="px-3 py-3">
                              {g.name ? (
                                <span className="text-[#333]">{g.name}</span>
                              ) : (
                                <select value={g.name} onChange={(e) => updateGoods(g.id, "name", e.target.value)}
                                  className="px-2 py-1.5 border border-[#dde3ec] rounded text-[13px] focus:outline-none focus:border-[#1a5fa8] bg-white text-[#999]">
                                  <option value="">请选择商品</option>
                                  <option>丝苗米</option><option>象牙香占</option><option>荔枝</option>
                                </select>
                              )}
                            </td>
                            <td className="px-3 py-3 text-[#666]">{g.category || "-"}</td>
                            <td className="px-3 py-3">
                              <select value={g.spec} onChange={(e) => updateGoods(g.id, "spec", e.target.value)}
                                className="px-2 py-1.5 border border-[#dde3ec] rounded text-[13px] focus:outline-none focus:border-[#1a5fa8] bg-white">
                                <option value="">请选择规格</option>
                                {specOptions.map((s) => <option key={s}>{s}</option>)}
                              </select>
                            </td>
                            <td className="px-3 py-3">
                              <div className="flex items-center justify-center gap-1.5">
                                <input value={g.qty} onChange={(e) => updateGoods(g.id, "qty", e.target.value)}
                                  placeholder="请输入数量"
                                  className="w-24 px-2 py-1.5 border border-[#dde3ec] rounded text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                                <span className="text-[13px] text-[#666]">{g.unit || "-"}</span>
                              </div>
                            </td>
                            <td className="px-3 py-3">
                              <button type="button" onClick={() => removeGoods(g.id)} className="text-[13px] text-[#1a5fa8] hover:underline">删除</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="p-4 flex justify-center border-t border-[#f0f2f5]">
                      <button type="button" onClick={addGoods}
                        className="px-8 py-2 border border-[#1a5fa8] text-[#1a5fa8] text-[13px] rounded hover:bg-[#eef3fa] transition-colors">
                        + 添加商品
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 时间 */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <Field label="期望收货时间" required labelWidth>
                  <div className="flex items-center gap-2">
                    <input type="date" className="px-2 py-2 border border-[#dde3ec] rounded text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                    <span className="text-[13px] text-[#999]">至</span>
                    <input type="date" className="px-2 py-2 border border-[#dde3ec] rounded text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                  </div>
                </Field>
                <Field label="报价截止日期" required labelWidth>
                  <input type="date" className="w-full max-w-[240px] px-3 py-2 border border-[#dde3ec] rounded text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                </Field>

                <Field label="预付款比例" required labelWidth>
                  <div className="flex items-center gap-2">
                    <input placeholder="请输入" className="w-40 px-3 py-2 border border-[#dde3ec] rounded text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
                    <span className="text-[13px] text-[#666]">%</span>
                  </div>
                </Field>
                <Field label="报价模式" required labelWidth>
                  <div className="flex gap-6 pt-1">
                    {quoteModes.map((m, i) => (
                      <label key={m} className="flex items-center gap-1.5 text-[13px] text-[#555] cursor-pointer">
                        <input type="radio" name="quoteMode" defaultChecked={i === 0} className="accent-[#1a5fa8]" />{m}
                      </label>
                    ))}
                  </div>
                </Field>

                <Field label="交易模式" required labelWidth>
                  <div className="flex gap-6 pt-1">
                    {tradeModeOptions.map((m) => (
                      <label key={m} className="flex items-center gap-1.5 text-[13px] text-[#555] cursor-pointer">
                        <input type="checkbox" checked={tradeMode.includes(m)} onChange={() => toggle(tradeMode, setTradeMode, m)} className="accent-[#1a5fa8]" />{m}
                      </label>
                    ))}
                  </div>
                </Field>
                <Field label="配送方式" required labelWidth>
                  <div className="flex gap-6 pt-1">
                    {deliveryOptions.map((m) => (
                      <label key={m} className="flex items-center gap-1.5 text-[13px] text-[#555] cursor-pointer">
                        <input type="checkbox" checked={delivery.includes(m)} onChange={() => toggle(delivery, setDelivery, m)} className="accent-[#1a5fa8]" />{m}
                      </label>
                    ))}
                  </div>
                </Field>

                <Field label="结算渠道" required labelWidth>
                  <div className="flex gap-6 pt-1">
                    {settlementOptions.map((m) => (
                      <label key={m} className="flex items-center gap-1.5 text-[13px] text-[#555] cursor-pointer">
                        <input type="checkbox" checked={settlement.includes(m)} onChange={() => toggle(settlement, setSettlement, m)} className="accent-[#1a5fa8]" />{m}
                      </label>
                    ))}
                  </div>
                </Field>
              </div>
            </div>
          </section>

          {/* 买方联系人信息 */}
          <section>
            <SectionTitle>买方联系人信息</SectionTitle>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <Field label="联系人姓名" required labelWidth>
                <input placeholder="请输入" className="w-full max-w-[280px] px-3 py-2 border border-[#dde3ec] rounded text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              </Field>
              <Field label="联系人电话" required labelWidth>
                <input placeholder="请输入手机号码" className="w-full max-w-[280px] px-3 py-2 border border-[#dde3ec] rounded text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              </Field>
            </div>
          </section>

          {/* 其他信息 */}
          <section>
            <SectionTitle>其他信息</SectionTitle>
            <div className="space-y-4">
              <Field label="备注说明" labelWidth align="top">
                <div className="w-full max-w-[720px]">
                  <textarea value={remark} onChange={(e) => setRemark(e.target.value.slice(0, 500))}
                    rows={3} placeholder="请输入"
                    className="w-full px-3 py-2.5 border border-[#dde3ec] rounded text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none" />
                  <div className="text-right text-[12px] text-[#bbb] mt-0.5">{remark.length} / 500</div>
                </div>
              </Field>
              <Field label="附件" labelWidth align="top">
                <div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 px-4 py-2 border border-[#dde3ec] rounded text-[13px] text-[#555] cursor-pointer hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
                      <Upload className="w-3.5 h-3.5" />上传附件
                      <input type="file" multiple className="hidden"
                        onChange={(e) => setAttachments((p) => [...p, ...Array.from(e.target.files ?? []).map((f) => f.name)])} />
                    </label>
                    <span className="text-[12px] text-[#aaa]">支持png/jpg/pdf/zip文件等，不超过100M</span>
                  </div>
                  {attachments.length > 0 && (
                    <div className="mt-3 space-y-2 max-w-[720px]">
                      {attachments.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-2 bg-[#f8f9fc] border border-[#e8edf5] rounded text-[13px]">
                          <FileText className="w-4 h-4 text-[#e53e3e]" />
                          <span className="text-[#555] flex-1">{f}</span>
                          <button type="button" onClick={() => setAttachments((p) => p.filter((_, idx) => idx !== i))}>
                            <X className="w-4 h-4 text-[#bbb] hover:text-[#e53e3e]" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Field>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-7 py-5 border-t border-[#e8edf5] flex items-center justify-center gap-3">
          <Link href="/merchant/chanxiao/caigou-list" className="px-6 py-2.5 border border-[#dde3ec] text-[#555] text-[13px] rounded-lg hover:bg-[#f5f7fa] transition-colors">
            取消
          </Link>
          <button onClick={() => setSubmitted(true)}
            className="px-10 py-2.5 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded-lg hover:bg-[#0d4a8a] transition-colors">
            提交
          </button>
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: boolean }) {
  return (
    <h2 className={`flex items-center gap-2 font-semibold text-[#1a5fa8] ${sub ? "text-[13px] mb-3" : "text-[14px] mb-4"}`}>
      <span className="w-1 h-4 bg-[#1a5fa8] rounded-full" />
      {children}
    </h2>
  )
}

function ModeCard({ active, title, desc, onClick }: { active: boolean; title: string; desc: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className={`flex items-start gap-3 text-left p-4 rounded-lg border transition-colors ${
        active ? "border-[#1a5fa8] bg-[#eef5fc]" : "border-[#dde3ec] bg-white hover:border-[#b8c4d6]"
      }`}>
      <span className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${active ? "border-[#1a5fa8]" : "border-[#c5ccd6]"}`}>
        {active && <span className="w-2 h-2 rounded-full bg-[#1a5fa8]" />}
      </span>
      <span>
        <div className={`text-[14px] font-semibold ${active ? "text-[#1a5fa8]" : "text-[#333]"}`}>{title}</div>
        <div className="text-[12px] text-[#999] mt-1 leading-relaxed">{desc}</div>
      </span>
    </button>
  )
}

function Field({
  label, required, children, labelWidth, align = "center",
}: {
  label: string; required?: boolean; children: React.ReactNode; labelWidth?: boolean; align?: "center" | "top"
}) {
  return (
    <div className={`flex gap-3 ${align === "top" ? "items-start" : "items-center"}`}>
      <label className={`text-[13px] text-[#555] shrink-0 text-right ${labelWidth ? "w-[92px]" : ""} ${align === "top" ? "pt-2" : ""}`}>
        {required && <span className="text-red-500">*</span>} {label}
      </label>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}
