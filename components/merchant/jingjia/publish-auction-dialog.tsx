"use client"

import { useState } from "react"
import { X, Plus, Trash2, HelpCircle } from "lucide-react"

export type PublishMode = "sale" | "purchase"

/* 竞价类型：销售可升价/降价，采购仅降价 */
const BID_TYPES: Record<PublishMode, string[]> = {
  sale: ["升价拍(英式拍)", "降价拍(荷兰拍)"],
  purchase: ["降价拍(荷兰拍)"],
}

/* 发布方需求：销售 / 采购 各三种 */
const DEMANDS: Record<PublishMode, { key: string; label: string; kind: "normal" | "bundle" | "combo" }[]> = {
  sale: [
    { key: "normal-sale", label: "普通销售", kind: "normal" },
    { key: "bundle-sale", label: "定购竞销", kind: "bundle" },
    { key: "combo-sale", label: "组合销售", kind: "combo" },
  ],
  purchase: [
    { key: "normal-buy", label: "普通采购", kind: "normal" },
    { key: "bundle-buy", label: "定销竞购", kind: "bundle" },
    { key: "combo-buy", label: "组合采购", kind: "combo" },
  ],
}

interface RoundProduct {
  name: string
  spec: string
  qty: string
  startPrice: string
  step: string
  role?: "sale" | "buy" // 用于捆绑/展示区分
}
interface Round {
  products: RoundProduct[]
}

const inputCls =
  "w-full h-9 px-3 border border-[#dde3ec] rounded text-[13px] text-[#333] focus:outline-none focus:border-[#1a5fa8] placeholder:text-[#bbb]"
const labelCls = "text-[13px] text-[#333] mb-1.5 block"
const req = <span className="text-[#e34d59]">*</span>

export function PublishAuctionDialog({ mode, onClose }: { mode: PublishMode; onClose: () => void }) {
  const title = mode === "sale" ? "发布销售竞拍" : "发布采购竞拍"
  const bidTypeOptions = BID_TYPES[mode]
  const demandOptions = DEMANDS[mode]

  const [bidType, setBidType] = useState(bidTypeOptions[0])
  const [demand, setDemand] = useState(demandOptions[0].key)
  const [allowExtend, setAllowExtend] = useState(true)
  const [singleDeposit, setSingleDeposit] = useState(true)
  const [hidePrice, setHidePrice] = useState(false)
  const [rounds, setRounds] = useState<Round[]>([])
  const [showAdd, setShowAdd] = useState(false)

  const currentDemand = demandOptions.find((d) => d.key === demand)!

  const handleAddRound = (round: Round) => {
    setRounds((r) => [...r, round])
    setShowAdd(false)
  }
  const removeRound = (idx: number) => setRounds((r) => r.filter((_, i) => i !== idx))

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 overflow-y-auto py-8">
      <div className="bg-white rounded-lg w-[1000px] max-w-[95vw] shadow-2xl mb-8">
        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5] sticky top-0 bg-white z-10 rounded-t-lg">
          <h2 className="text-[17px] font-bold text-[#1a1a2e]">{title}</h2>
          <button onClick={onClose} aria-label="关闭">
            <X className="w-5 h-5 text-[#999] hover:text-[#333]" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* ── 基本信息 ── */}
          <section>
            <h3 className="text-[15px] font-bold text-[#1a1a2e] mb-4">基本信息</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="col-span-2">
                <label className={labelCls}>{req} 专场标题</label>
                <input className={inputCls} placeholder="请输入专场标题" maxLength={80} />
              </div>

              <div>
                <label className={labelCls}>{req} 竞价类型</label>
                <select value={bidType} onChange={(e) => setBidType(e.target.value)} className={inputCls}>
                  {bidTypeOptions.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                {mode === "purchase" && (
                  <p className="text-[11px] text-[#999] mt-1">采购竞拍仅支持降价拍(荷兰拍)</p>
                )}
              </div>

              <div>
                <label className={labelCls}>{req} 发布方需求</label>
                <div className="flex items-center gap-4 h-9">
                  {demandOptions.map((d) => (
                    <label key={d.key} className="flex items-center gap-1.5 text-[13px] text-[#333] cursor-pointer">
                      <input
                        type="radio"
                        name="demand"
                        checked={demand === d.key}
                        onChange={() => {
                          setDemand(d.key)
                          setRounds([])
                        }}
                        className="accent-[#1a5fa8]"
                      />
                      {d.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelCls}>{req} 是否允许增加交易节时长</label>
                <div className="flex items-center gap-4 h-9">
                  <label className="flex items-center gap-1.5 text-[13px] cursor-pointer">
                    <input type="radio" checked={allowExtend} onChange={() => setAllowExtend(true)} className="accent-[#1a5fa8]" />允许
                  </label>
                  <label className="flex items-center gap-1.5 text-[13px] cursor-pointer">
                    <input type="radio" checked={!allowExtend} onChange={() => setAllowExtend(false)} className="accent-[#1a5fa8]" />不允许
                  </label>
                </div>
              </div>

              <div>
                <label className={labelCls}>{req} 一个交易节时长(秒)</label>
                <input className={inputCls} placeholder="请输入" type="number" />
              </div>

              <div>
                <label className={labelCls}>{req} 保证金</label>
                <input className={inputCls} placeholder="请输入" type="number" />
              </div>

              <div>
                <label className={labelCls}>
                  {req} 单边保证金模式 <HelpCircle className="inline w-3.5 h-3.5 text-[#bbb]" />
                </label>
                <div className="flex items-center gap-4 h-9">
                  <label className="flex items-center gap-1.5 text-[13px] cursor-pointer">
                    <input type="radio" checked={singleDeposit} onChange={() => setSingleDeposit(true)} className="accent-[#1a5fa8]" />是
                  </label>
                  <label className="flex items-center gap-1.5 text-[13px] cursor-pointer">
                    <input type="radio" checked={!singleDeposit} onChange={() => setSingleDeposit(false)} className="accent-[#1a5fa8]" />否
                  </label>
                </div>
              </div>

              <div>
                <label className={labelCls}>{req} 开场前是否隐藏价格</label>
                <div className="flex items-center gap-4 h-9">
                  <label className="flex items-center gap-1.5 text-[13px] cursor-pointer">
                    <input type="radio" checked={hidePrice} onChange={() => setHidePrice(true)} className="accent-[#1a5fa8]" />隐藏
                  </label>
                  <label className="flex items-center gap-1.5 text-[13px] cursor-pointer">
                    <input type="radio" checked={!hidePrice} onChange={() => setHidePrice(false)} className="accent-[#1a5fa8]" />不隐藏
                  </label>
                </div>
              </div>

              <div className="col-span-2">
                <label className={labelCls}>参拍用户</label>
                <input className={inputCls} placeholder="不填写则所有认证用户均可参拍" />
              </div>
            </div>
          </section>

          {/* ── 添加商品 ── */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-bold text-[#1a1a2e]">
                添加商品 <span className="text-[12px] font-normal text-[#999]">(专场开始后将按照商品列表顺序竞拍)</span>
              </h3>
              <div className="flex items-center gap-2">
                <button className="h-8 px-3 border border-[#dde3ec] rounded text-[12px] text-[#555] hover:border-[#1a5fa8]">下载模板</button>
                <button className="h-8 px-3 bg-[#1a5fa8] text-white rounded text-[12px] hover:bg-[#0d4a8a]">批量导入商品</button>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={() => setShowAdd(true)}
                className="flex items-center gap-1.5 h-9 px-4 bg-[#1a5fa8] text-white rounded text-[13px] hover:bg-[#0d4a8a]"
              >
                <Plus className="w-4 h-4" />
                {currentDemand.kind === "combo" ? "添加组合商品" : "添加商品"}
              </button>
              <span className="text-[12px] text-[#e8831a]">
                {currentDemand.kind === "combo" && "一个轮次包含多个商品，各商品分开出价，中标根据该轮次商品总价确定。"}
                {currentDemand.kind === "bundle" && "一个轮次绑定销售与采购各一个商品，对其一竞拍，中标须同时履约两种商品。"}
                {currentDemand.kind === "normal" && "一个轮次只包含一个商品。"}
              </span>
            </div>

            {rounds.length === 0 ? (
              <div className="border border-dashed border-[#dde3ec] rounded-lg py-10 text-center text-[13px] text-[#999]">
                暂无商品，请点击上方按钮添加
              </div>
            ) : (
              <div className="space-y-4">
                {rounds.map((round, idx) => (
                  <div key={idx} className="border border-[#e8edf5] rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#eaf2fb]">
                      <span className="text-[13px] font-bold text-[#1a5fa8]">第{idx + 1}轮</span>
                      <button onClick={() => removeRound(idx)} className="text-[12px] text-[#e34d59] hover:underline">删除该轮次</button>
                    </div>
                    <table className="w-full text-[13px]">
                      <thead>
                        <tr className="bg-[#f8fafc] text-[#6b7c93]">
                          <th className="text-left font-medium px-4 py-2">竞拍的商品名称</th>
                          <th className="text-left font-medium px-4 py-2">规格</th>
                          <th className="text-left font-medium px-4 py-2">数量(单位)</th>
                          <th className="text-left font-medium px-4 py-2">{mode === "sale" ? "起拍价" : "采购价"}</th>
                          <th className="text-left font-medium px-4 py-2">加价幅度</th>
                          {currentDemand.kind === "bundle" && <th className="text-left font-medium px-4 py-2">类型</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {round.products.map((p, i) => (
                          <tr key={i} className="border-t border-[#f0f4f8]">
                            <td className="px-4 py-2 text-[#1a1a2e]">{p.name}</td>
                            <td className="px-4 py-2">{p.spec}</td>
                            <td className="px-4 py-2">{p.qty}</td>
                            <td className="px-4 py-2">{p.startPrice}</td>
                            <td className="px-4 py-2">{p.step}</td>
                            {currentDemand.kind === "bundle" && (
                              <td className="px-4 py-2">
                                <span className={`px-2 py-0.5 rounded text-[11px] ${p.role === "sale" ? "bg-[#e8f4fd] text-[#1a5fa8]" : "bg-[#fff8f0] text-[#e8831a]"}`}>
                                  {p.role === "sale" ? "销售" : "采购"}
                                </span>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── 竞拍公告 ── */}
          <section>
            <h3 className="text-[15px] font-bold text-[#1a1a2e] mb-3">竞拍公告</h3>
            <textarea
              className="w-full border border-[#dde3ec] rounded p-3 text-[13px] resize-none h-28 focus:outline-none focus:border-[#1a5fa8] placeholder:text-[#bbb]"
              placeholder="请输入竞拍公告内容"
              maxLength={5000}
            />
          </section>

          {/* ── 联系人信息 ── */}
          <section>
            <h3 className="text-[15px] font-bold text-[#1a1a2e] mb-3">联系人信息</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className={labelCls}>{req} 联系人姓名</label>
                <input className={inputCls} placeholder="请输入" />
              </div>
              <div>
                <label className={labelCls}>{req} 联系人电话</label>
                <input className={inputCls} placeholder="请输入" />
              </div>
            </div>
          </section>
        </div>

        {/* footer */}
        <div className="flex items-center justify-center gap-4 px-6 py-4 border-t border-[#e8edf5] sticky bottom-0 bg-white rounded-b-lg">
          <button onClick={onClose} className="h-9 px-8 border border-[#dde3ec] rounded text-[13px] text-[#555] hover:border-[#999]">取消</button>
          <button onClick={onClose} className="h-9 px-8 bg-[#1a5fa8] text-white rounded text-[13px] hover:bg-[#0d4a8a]">申请发布</button>
        </div>
      </div>

      {showAdd && (
        <AddProductDialog
          mode={mode}
          kind={currentDemand.kind}
          onClose={() => setShowAdd(false)}
          onSave={handleAddRound}
        />
      )}
    </div>
  )
}

/* ─────────────── 添加商品弹窗（按发布方需求切换布局） ─────────────── */

const CATEGORIES = ["粮食", "蔬菜", "水果", "禽畜"]
const PRODUCTS = ["南晶香占", "黄花占米", "小麦", "大豆", "丰两优大米", "妃子笑荔枝"]
const SPECS = ["25KG/袋", "15KG/袋", "50KG/袋"]
const DELIVERY = ["买家自提", "卖家配送"]
const UNITS = ["吨", "公斤", "袋"]

function AddProductDialog({
  mode,
  kind,
  onClose,
  onSave,
}: {
  mode: PublishMode
  kind: "normal" | "bundle" | "combo"
  onClose: () => void
  onSave: (round: Round) => void
}) {
  // 组合：多商品项
  const [comboItems, setComboItems] = useState<number[]>([0, 1])

  const priceLabel = mode === "sale" ? "起拍价" : "采购价"

  const buildDemo = (): Round => {
    if (kind === "normal") {
      return { products: [{ name: "南晶香占", spec: "25KG/袋", qty: "1000吨", startPrice: "2010元/吨", step: "10元/吨" }] }
    }
    if (kind === "bundle") {
      return {
        products: [
          { name: "南晶香占", spec: "25KG/袋", qty: "1000吨", startPrice: "2010元/吨", step: "10元/吨", role: "sale" },
          { name: "小麦", spec: "50KG/袋", qty: "800吨", startPrice: "2000元/吨", step: "—", role: "buy" },
        ],
      }
    }
    return {
      products: comboItems.map((_, i) => ({
        name: PRODUCTS[i % PRODUCTS.length],
        spec: "25KG/袋",
        qty: "900吨",
        startPrice: "2000元/吨",
        step: "5元/吨",
      })),
    }
  }

  /* 单个商品编辑区块 */
  const ProductFields = ({ heading, showStep = true }: { heading?: string; showStep?: boolean }) => (
    <div>
      {heading && <h4 className="text-[14px] font-bold text-[#666] mb-3">{heading}</h4>}
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <label className={labelCls}>{req} 分类</label>
          <select className={inputCls}><option value="">请选择</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
        </div>
        <div>
          <label className={labelCls}>{req} 商品名称</label>
          <select className={inputCls}><option value="">请选择</option>{PRODUCTS.map((p) => <option key={p}>{p}</option>)}</select>
        </div>
        <div>
          <label className={labelCls}>{req} 规格</label>
          <select className={inputCls}><option value="">请选择</option>{SPECS.map((s) => <option key={s}>{s}</option>)}</select>
        </div>
        <div>
          <label className={labelCls}>{req} 数量(单位)</label>
          <div className="flex gap-2">
            <input className={inputCls} type="number" defaultValue={1} />
            <select className="h-9 px-2 border border-[#dde3ec] rounded text-[13px] w-24">{UNITS.map((u) => <option key={u}>{u}</option>)}</select>
          </div>
        </div>
        <div>
          <label className={labelCls}>{req} {priceLabel}</label>
          <div className="flex items-center gap-2">
            <input className={inputCls} type="number" defaultValue={0.01} />
            <span className="text-[13px] text-[#666] whitespace-nowrap">元/吨</span>
          </div>
        </div>
        {showStep ? (
          <div>
            <label className={labelCls}>{req} 加价幅度</label>
            <div className="flex items-center gap-2">
              <input className={inputCls} type="number" defaultValue={0.01} />
              <span className="text-[13px] text-[#666] whitespace-nowrap">元/吨</span>
            </div>
          </div>
        ) : (
          <div>
            <label className={labelCls}>{req} 交货时间</label>
            <input className={inputCls} placeholder="开始时间 至 结束时间" />
          </div>
        )}
        <div>
          <label className={labelCls}>{req} 配送方式</label>
          <select className={inputCls}><option value="">请选择</option>{DELIVERY.map((d) => <option key={d}>{d}</option>)}</select>
        </div>
        <div>
          <label className={labelCls}>{req} 预付款比例</label>
          <div className="flex items-center gap-2">
            <input className={inputCls} type="number" defaultValue={0} />
            <span className="text-[13px] text-[#666]">%</span>
          </div>
          <p className="text-[11px] text-[#e34d59] mt-1">仅供参考，最终以合同约定为准</p>
        </div>
        <div className="col-span-2">
          <label className={labelCls}>备注</label>
          <textarea className="w-full border border-[#dde3ec] rounded p-2.5 text-[13px] resize-none h-16 focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" maxLength={100} />
        </div>
        <div className="col-span-2">
          <button className="text-[13px] text-[#1a5fa8] hover:underline">商品详情 &gt;</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 overflow-y-auto py-8">
      <div className="bg-white rounded-lg w-[1000px] max-w-[95vw] shadow-2xl mb-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5] sticky top-0 bg-white z-10 rounded-t-lg">
          <h2 className="text-[17px] font-bold text-[#1a1a2e]">添加商品</h2>
          <button onClick={onClose} aria-label="关闭"><X className="w-5 h-5 text-[#999] hover:text-[#333]" /></button>
        </div>

        <div className="px-6 py-5 space-y-8">
          {/* 普通：单商品 */}
          {kind === "normal" && (
            <div>
              <h3 className="text-[15px] font-bold text-[#666] mb-4">
                {mode === "sale" ? "发布方销售竞拍的商品" : "发布方采购的商品"}
              </h3>
              <ProductFields />
            </div>
          )}

          {/* 捆绑：销售 + 采购 */}
          {kind === "bundle" && (
            <>
              <ProductFields heading="发布方销售竞拍的商品" />
              <div className="border-t border-[#e8edf5]" />
              <ProductFields heading="发布方采购的商品" showStep={false} />
            </>
          )}

          {/* 组合：多商品项 */}
          {kind === "combo" && (
            <div>
              <h3 className="text-[15px] font-bold text-[#666] mb-4">
                {mode === "sale" ? "发布方销售竞拍的商品" : "发布方采购的商品"}
              </h3>
              <div className="space-y-4">
                {comboItems.map((item, i) => (
                  <div key={item} className="bg-[#f8fafc] rounded-lg p-4 relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[14px] font-bold text-[#1a1a2e]">商品{i + 1}</span>
                      {comboItems.length > 1 && (
                        <button onClick={() => setComboItems((c) => c.filter((x) => x !== item))} className="text-[12px] text-[#e34d59] hover:underline flex items-center gap-1">
                          <Trash2 className="w-3.5 h-3.5" />删除
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <label className={labelCls}>{req} 分类</label>
                        <select className={inputCls}><option value="">请选择</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
                      </div>
                      <div>
                        <label className={labelCls}>{req} 商品名称</label>
                        <select className={inputCls}><option value="">请选择</option>{PRODUCTS.map((p) => <option key={p}>{p}</option>)}</select>
                      </div>
                      <div>
                        <label className={labelCls}>{req} 规格</label>
                        <select className={inputCls}><option value="">请选择</option>{SPECS.map((s) => <option key={s}>{s}</option>)}</select>
                      </div>
                      <div>
                        <label className={labelCls}>{req} 数量(单位)</label>
                        <div className="flex gap-2">
                          <input className={inputCls} type="number" defaultValue={1} />
                          <select className="h-9 px-2 border border-[#dde3ec] rounded text-[13px] w-24">{UNITS.map((u) => <option key={u}>{u}</option>)}</select>
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>{req} {priceLabel}</label>
                        <div className="flex items-center gap-2">
                          <input className={inputCls} type="number" defaultValue={0.01} />
                          <span className="text-[13px] text-[#666] whitespace-nowrap">元/吨</span>
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>{req} 加价幅度</label>
                        <div className="flex items-center gap-2">
                          <input className={inputCls} type="number" defaultValue={0.01} />
                          <span className="text-[13px] text-[#666] whitespace-nowrap">元/吨</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setComboItems((c) => [...c, (c[c.length - 1] ?? 0) + 1])}
                  className="h-9 px-4 border border-[#1a5fa8] text-[#1a5fa8] rounded text-[13px] hover:bg-[#e8f4fd]"
                >
                  + 新增商品项
                </button>
              </div>
            </div>
          )}

          {/* 其他交易设置 */}
          <div className="border-t border-[#e8edf5] pt-5">
            <h3 className="text-[15px] font-bold text-[#1a1a2e] mb-4">其他交易设置</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <label className={labelCls}>{req} 结算方式</label>
                <label className="flex items-center gap-1.5 text-[13px] h-9"><input type="radio" defaultChecked className="accent-[#1a5fa8]" />预付款</label>
              </div>
              <div>
                <label className={labelCls}>{req} 交易模式</label>
                <label className="flex items-center gap-1.5 text-[13px] h-9"><input type="radio" defaultChecked className="accent-[#1a5fa8]" />非担保交易</label>
              </div>
              <div className="col-span-2">
                <label className={labelCls}>{req} 结算渠道</label>
                <div className="flex items-center gap-6 h-9">
                  <label className="flex items-center gap-1.5 text-[13px]"><input type="checkbox" className="accent-[#1a5fa8]" />建行龙存管</label>
                  <label className="flex items-center gap-1.5 text-[13px]"><input type="checkbox" className="accent-[#1a5fa8]" />工行安心付</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-[#e8edf5] sticky bottom-0 bg-white rounded-b-lg">
          <button onClick={onClose} className="h-9 px-8 border border-[#dde3ec] rounded text-[13px] text-[#555] hover:border-[#999]">取消</button>
          <button onClick={() => onSave(buildDemo())} className="h-9 px-8 bg-[#1a5fa8] text-white rounded text-[13px] hover:bg-[#0d4a8a]">保存</button>
        </div>
      </div>
    </div>
  )
}
