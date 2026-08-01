"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Plus, Trash2, Info, Download, Upload, HelpCircle, ChevronDown } from "lucide-react"

type Round = {
  id: number
  items: { name: string; spec: string; qty: string; startPrice: string; increment: string; settlement: string; delivery: string }[]
}

const defaultItem = { name: "", spec: "", qty: "", startPrice: "", increment: "", settlement: "建行龙存管、工行安心付", delivery: "卖家配送" }

export default function FabuJingpaiPage() {
  const [bidType, setBidType] = useState("升价拍(英式拍)")
  const [demandType, setDemandType] = useState<"normal" | "fixed" | "combo">("combo")
  const [allowExtend, setAllowExtend] = useState(true)
  const [hidePrice, setHidePrice] = useState(false)
  const [singleGuarantee, setSingleGuarantee] = useState(true)
  const [rounds, setRounds] = useState<Round[]>([
    {
      id: 1,
      items: [
        { name: "优选青苗软香米", spec: "25KG/袋", qty: "1000吨", startPrice: "2010元/吨", increment: "10元/吨", settlement: "建行龙存管、工行安心付", delivery: "买家自提" },
        { name: "粮芯谷稻油粘米", spec: "25KG/袋", qty: "900吨", startPrice: "2000元/吨", increment: "5元/吨", settlement: "建行龙存管、工行安心付", delivery: "买家自提" },
      ],
    },
    {
      id: 2,
      items: [
        { name: "优选南晶香占", spec: "15KG/袋", qty: "800吨", startPrice: "2120元/吨", increment: "15元/吨", settlement: "建行龙存管、工行安心付", delivery: "卖家配送" },
        { name: "优选某某米", spec: "25KG/袋", qty: "1200吨", startPrice: "2180元/吨", increment: "10元/吨", settlement: "建行龙存管、工行安心付", delivery: "卖家配送" },
        { name: "黄花占米", spec: "25KG/袋", qty: "2000吨", startPrice: "2030元/吨", increment: "20元/吨", settlement: "建行龙存管、工行安心付", delivery: "卖家配送" },
      ],
    },
  ])

  const addRound = () => {
    setRounds([...rounds, { id: rounds.length + 1, items: [{ ...defaultItem }] }])
  }

  const deleteRound = (roundId: number) => {
    setRounds(rounds.filter((r) => r.id !== roundId))
  }

  const addItem = (roundId: number) => {
    setRounds(rounds.map((r) => r.id === roundId ? { ...r, items: [...r.items, { ...defaultItem }] } : r))
  }

  return (
    <AdminLayout>
      <div className="max-w-[1000px]">
        <div className="mb-6">
          <h1 className="text-[20px] font-bold text-[#1a1a2e]">发布销售竞拍</h1>
          <p className="text-[13px] text-[#6b7c93] mt-1">创建竞拍专场，设置商品信息和竞拍规则</p>
        </div>

        {/* Hint panel */}
        <div className="bg-[#e8f4fd] border border-[#b3d4f5] rounded-lg p-4 mb-6">
          <div className="text-[13px] font-semibold text-[#1a5fa8] mb-2">说明：</div>
          <ol className="space-y-1 text-[13px] text-[#444] list-decimal list-inside">
            <li>组合商品的交易规则？</li>
            <li>支持担保交易和非担保交易？</li>
            <li>结算方式？？</li>
            <li>交易规则是否需要前置（关联订单）</li>
          </ol>
        </div>

        <div className="bg-white rounded-lg border border-[#dde3ec] p-6">
          {/* 基本信息 */}
          <h2 className="text-[16px] font-bold text-[#1a1a2e] mb-5">基本信息</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-6">
            {/* 专场标题 */}
            <div className="col-span-2">
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                <span className="text-red-500 mr-1">*</span>专场标题
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="请输入"
                  maxLength={80}
                  className="w-full h-9 border border-[#dde3ec] rounded px-3 pr-16 text-[13px] outline-none focus:border-[#1a5fa8]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#999]">0 / 80</span>
              </div>
            </div>

            {/* 竞价类型 */}
            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                <span className="text-red-500 mr-1">*</span>竞价类型
              </label>
              <div className="relative">
                <select
                  value={bidType}
                  onChange={(e) => setBidType(e.target.value)}
                  className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8] bg-white appearance-none"
                >
                  <option>升价拍(英式拍)</option>
                  <option>降价拍(荷兰拍)</option>
                  <option>密封拍</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999] pointer-events-none" />
              </div>
            </div>

            {/* 发布方需求 */}
            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                <span className="text-red-500 mr-1">*</span>发布方需求
                <HelpCircle className="inline w-3.5 h-3.5 text-[#999] ml-1" />
              </label>
              <div className="flex items-center gap-5">
                {[
                  { key: "normal", label: "普通销售" },
                  { key: "fixed", label: "定购竞销" },
                  { key: "combo", label: "组合销售" },
                ].map((opt) => (
                  <label key={opt.key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="demandType"
                      checked={demandType === opt.key}
                      onChange={() => setDemandType(opt.key as "normal" | "fixed" | "combo")}
                      className="accent-[#1a5fa8]"
                    />
                    <span className="text-[13px]">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 是否允许增加交易节时长 */}
            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                <span className="text-red-500 mr-1">*</span>是否允许增加交易节时长
                <HelpCircle className="inline w-3.5 h-3.5 text-[#999] ml-1" />
              </label>
              <div className="flex items-center gap-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="allowExtend" checked={allowExtend} onChange={() => setAllowExtend(true)} className="accent-[#1a5fa8]" />
                  <span className="text-[13px]">允许</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="allowExtend" checked={!allowExtend} onChange={() => setAllowExtend(false)} className="accent-[#1a5fa8]" />
                  <span className="text-[13px]">不允许</span>
                </label>
              </div>
            </div>

            {/* 一个交易节时长 */}
            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                <span className="text-red-500 mr-1">*</span>一个交易节时长(秒)
                <HelpCircle className="inline w-3.5 h-3.5 text-[#999] ml-1" />
              </label>
              <input
                type="number"
                placeholder="请输入"
                className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]"
              />
            </div>

            {/* 保证金 */}
            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                <span className="text-red-500 mr-1">*</span>保证金
                <HelpCircle className="inline w-3.5 h-3.5 text-[#999] ml-1" />
              </label>
              <input
                type="number"
                placeholder="请输入"
                className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]"
              />
            </div>

            {/* 单边保证金模式 */}
            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                <span className="text-red-500 mr-1">*</span>单边保证金模式
                <HelpCircle className="inline w-3.5 h-3.5 text-[#999] ml-1" />
              </label>
              <div className="flex items-center gap-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="singleGuarantee" checked={singleGuarantee} onChange={() => setSingleGuarantee(true)} className="accent-[#1a5fa8]" />
                  <span className="text-[13px]">是</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="singleGuarantee" checked={!singleGuarantee} onChange={() => setSingleGuarantee(false)} className="accent-[#1a5fa8]" />
                  <span className="text-[13px]">否</span>
                </label>
              </div>
            </div>

            {/* 开场前是否隐藏价格 */}
            <div>
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                <span className="text-red-500 mr-1">*</span>开场前是否隐藏价格
                <HelpCircle className="inline w-3.5 h-3.5 text-[#999] ml-1" />
              </label>
              <div className="flex items-center gap-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="hidePrice" checked={hidePrice} onChange={() => setHidePrice(true)} className="accent-[#1a5fa8]" />
                  <span className="text-[13px]">隐藏</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="hidePrice" checked={!hidePrice} onChange={() => setHidePrice(false)} className="accent-[#1a5fa8]" />
                  <span className="text-[13px]">不隐藏</span>
                </label>
              </div>
            </div>

            {/* 参拍用户 */}
            <div className="col-span-2">
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">参拍用户</label>
              <input
                type="text"
                placeholder="请输入"
                className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]"
              />
            </div>
          </div>

          {/* 添加商品 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[16px] font-bold text-[#1a1a2e]">
                添加商品
                <span className="text-[13px] font-normal text-[#6b7c93] ml-2">（专场开始后将按照商品列表顺序竞拍）</span>
              </h2>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#dde3ec] rounded text-[13px] text-[#444] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  下载模板
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a5fa8] text-white rounded text-[13px] hover:bg-[#0d4a8a] transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  批量导入商品
                </button>
              </div>
            </div>

            {demandType === "combo" && (
              <div className="flex items-start gap-2 mb-3 p-3 bg-[#fff7ed] border border-[#f0d9b5] rounded text-[13px] text-[#e8831a]">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>一个轮次包含多个商品，各商品分开出价，中标根据该轮次商品总价确定。</span>
              </div>
            )}

            {/* Rounds */}
            <div className="space-y-4">
              {rounds.map((round) => (
                <div key={round.id} className="border border-[#dde3ec] rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between bg-[#f5f7fa] px-4 py-2.5 border-b border-[#dde3ec]">
                    <span className="text-[14px] font-semibold text-[#1a5fa8]">第{round.id}轮</span>
                    <button
                      onClick={() => deleteRound(round.id)}
                      className="text-[12px] text-red-500 hover:underline flex items-center gap-1"
                    >
                      删除该轮次
                    </button>
                  </div>
                  <table className="w-full text-[13px]">
                    <thead className="bg-[#fafbfc]">
                      <tr>
                        {["竞拍的商品名称", "竞拍的商品规格", "竞拍数量(单位)", "起拍价", "加价幅度", "结算渠道", "配送方式", "操作"].map((h) => (
                          <th key={h} className="px-3 py-2.5 text-left font-medium text-[#444] border-b border-[#dde3ec]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {round.items.map((item, idx) => (
                        <tr key={idx} className="border-b border-[#dde3ec] last:border-0">
                          <td className="px-3 py-2.5 font-medium">{item.name}</td>
                          <td className="px-3 py-2.5 text-[#6b7c93]">{item.spec}</td>
                          <td className="px-3 py-2.5">{item.qty}</td>
                          <td className="px-3 py-2.5 text-[#e8831a] font-medium">{item.startPrice}</td>
                          <td className="px-3 py-2.5 text-[#6b7c93]">{item.increment}</td>
                          <td className="px-3 py-2.5 text-[#6b7c93]">{item.settlement}</td>
                          <td className="px-3 py-2.5 text-[#6b7c93]">{item.delivery}</td>
                          <td className="px-3 py-2.5">
                            <div className="flex gap-2">
                              <button className="text-[#1a5fa8] hover:underline text-[12px]">编辑</button>
                              <button className="text-red-500 hover:underline text-[12px]">删除</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-3 py-2 border-t border-[#dde3ec]">
                    <button
                      onClick={() => addItem(round.id)}
                      className="flex items-center gap-1.5 text-[13px] text-[#1a5fa8] hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      添加组合商品
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addRound}
              className="mt-3 flex items-center gap-2 px-4 py-2 border border-dashed border-[#1a5fa8] text-[#1a5fa8] rounded text-[13px] hover:bg-[#e8f4fd] transition-colors"
            >
              <Plus className="w-4 h-4" />
              添加竞拍轮次
            </button>
          </div>

          {/* 竞拍公告 */}
          <div className="mb-6">
            <h2 className="text-[16px] font-bold text-[#1a1a2e] mb-3">竞拍公告</h2>
            <div className="border border-[#dde3ec] rounded overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center gap-1 px-3 py-2 bg-[#f5f7fa] border-b border-[#dde3ec] flex-wrap">
                {["↩", "↪", "B", "I", "U", "S", "A", "T↕", "T↔", "🔗", "≡", "≡", "≡", "≡", "≡", "≡", "⊞", "⬜", "⊞", "⊠"].map((btn, i) => (
                  <button
                    key={i}
                    className="w-7 h-7 flex items-center justify-center rounded text-[12px] text-[#444] hover:bg-[#e8f4fd] transition-colors"
                  >
                    {btn}
                  </button>
                ))}
              </div>
              <div className="relative">
                <textarea
                  placeholder="这是一段很长的内容详情描述..."
                  rows={6}
                  maxLength={5000}
                  defaultValue="这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述。这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述，这是一段很长的内容详情描述。"
                  className="w-full px-4 py-3 text-[13px] outline-none resize-none"
                />
                <span className="absolute bottom-2 right-3 text-[11px] text-[#999]">100/5000</span>
              </div>
            </div>
          </div>

          {/* 联系人信息 */}
          <div className="mb-6">
            <h2 className="text-[16px] font-bold text-[#1a1a2e] mb-4">联系人信息</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                  <span className="text-red-500 mr-1">*</span>联系人姓名
                </label>
                <input
                  type="text"
                  placeholder="请输入"
                  className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#333] mb-1.5">
                  <span className="text-red-500 mr-1">*</span>联系人电话
                </label>
                <input
                  type="text"
                  placeholder="请输入"
                  className="w-full h-9 border border-[#dde3ec] rounded px-3 text-[13px] outline-none focus:border-[#1a5fa8]"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-center gap-4 pt-4 border-t border-[#dde3ec]">
            <button className="px-10 py-2.5 border border-[#dde3ec] text-[#444] text-[14px] rounded hover:bg-[#f5f7fa] transition-colors">
              取消
            </button>
            <button className="px-12 py-2.5 bg-[#1a5fa8] text-white text-[14px] font-semibold rounded hover:bg-[#0d4a8a] transition-colors">
              申请发布
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
