"use client"

import { useState } from "react"
import { FileText, Plus, ChevronLeft, ChevronRight } from "lucide-react"

const CONTRACTS = [
  { id: "COC2601201749172660", name: "丝苗米订单农业合同",      amount: 51000.34, orderId: "2601201749172660", orderType: "采购订单", goods: "丝苗米、南昌香占、及校等3件商品", orderStatus: "待卖方确认", buyer: "广东供销数字科技有限公司", seller: "广东新供销天润粮油集团有限公司",     contractStatus: "待我方签章",  created: "2026-04-20 22:05:48" },
  { id: "COC2601201749172661", name: "菠萝干直供框架合同",      amount: 62000.34, orderId: "2601201749172661", orderType: "销售订单", goods: "菠萝、土豆",                         orderStatus: "待付预付款",   buyer: "广东供销数字科技有限公司", seller: "广东新供销天润粮油集团有限公司",     contractStatus: "待对方签章",  created: "2026-04-10 22:05:48" },
  { id: "COC2601201749172662", name: "象牙香占农业合同",        amount: 73000.34, orderId: "2601201749172662", orderType: "采购订单", goods: "象牙香占、象牙粘显谷",               orderStatus: "待发货",       buyer: "广东供销数字科技有限公司", seller: "广东新供销天润粮油集团有限公司",     contractStatus: "签章完成",    created: "2026-04-09 22:05:48" },
  { id: "COC2601201749172663", name: "豇豆+土豆联合采购合同",  amount: 19000.34, orderId: "2601201749172663", orderType: "销售订单", goods: "土豆、豇豆",                         orderStatus: "待收货",       buyer: "广东供销数字科技有限公司", seller: "广东新供销天润粮油集团有限公司",     contractStatus: "已完成",      created: "2026-04-06 22:05:48" },
]

const STATUS_STYLE: Record<string, { color: string; bg: string }> = {
  "待我方签章": { color: "#e8831a", bg: "#fff8f0" },
  "待对方签章": { color: "#1a5fa8", bg: "#e8f4fd" },
  "签章完成":   { color: "#3a8c3f", bg: "#e8f5e9" },
  "已完成":     { color: "#999",    bg: "#f3f4f6" },
}

const TABS = ["全部", "待我方签章", "待对方签章", "已完成"]

/* ──── 新增合同侧面板 ──── */
function NewContractPanel({ onClose }: { onClose: () => void }) {
  const [panelTab, setPanelTab] = useState<"template" | "upload">("template")
  return (
    <div className="fixed inset-0 z-40 flex justify-end" onClick={onClose}>
      <div className="w-[440px] bg-white h-full shadow-2xl overflow-y-auto flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8edf5] shrink-0">
          <h3 className="text-[15px] font-bold text-[#1a1a2e]">新增合同</h3>
          <button onClick={onClose} className="text-[#999] hover:text-[#555] text-[20px] leading-none">&times;</button>
        </div>
        {/* 两个子Tab */}
        <div className="flex border-b border-[#e8edf5] shrink-0">
          {(["template", "upload"] as const).map((t, i) => (
            <button key={t} onClick={() => setPanelTab(t)}
              className={`flex-1 py-3 text-[13px] font-medium border-b-2 -mb-px transition-colors ${panelTab === t ? "border-[#1a5fa8] text-[#1a5fa8]" : "border-transparent text-[#999]"}`}>
              {i === 0 ? "选择合同模板" : "上传盖章合同"}
            </button>
          ))}
        </div>
        <div className="flex-1 px-5 py-4 space-y-4">
          {panelTab === "template" ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] text-[#555] mb-1">* 关联合同模板</label>
                  <select className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] text-[#999] focus:outline-none focus:border-[#1a5fa8]">
                    <option value="">请选择</option>
                    <option>xxxx采购合同模板</option>
                    <option>xxxx销售合同模板</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] text-[#555] mb-1">模板关联类型</label>
                  <input readOnly className="w-full border border-[#e8edf5] rounded px-3 py-2 text-[13px] bg-[#f8fafc] text-[#999]" placeholder="选择模板后自动显示" />
                </div>
              </div>
              <div>
                <label className="block text-[12px] text-[#555] mb-1">* 合同名称</label>
                <input className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] text-[#555] mb-1">* 关联订单号</label>
                  <select className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] text-[#999] focus:outline-none focus:border-[#1a5fa8]">
                    <option value="">请选择</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] text-[#555] mb-1">订单类型</label>
                  <input readOnly className="w-full border border-[#e8edf5] rounded px-3 py-2 text-[13px] bg-[#f8fafc] text-[#999]" placeholder="选择订单后自动显示" />
                </div>
              </div>
              {/* 商品信息表 */}
              <div>
                <label className="block text-[12px] text-[#555] mb-1">商品信息</label>
                <table className="w-full text-[12px] border border-[#e8edf5] rounded">
                  <thead>
                    <tr className="bg-[#f8fafc] text-[#6b7c93]">
                      <th className="px-3 py-2 text-left font-medium">序号</th>
                      <th className="px-3 py-2 text-left font-medium">商品SKU编码</th>
                      <th className="px-3 py-2 text-left font-medium">商品名称</th>
                      <th className="px-3 py-2 text-left font-medium">采购数量(单位)</th>
                      <th className="px-3 py-2 text-left font-medium">采购单价(元)</th>
                      <th className="px-3 py-2 text-left font-medium">含税金额(元)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#e8edf5]">
                      <td className="px-3 py-2">1</td>
                      <td className="px-3 py-2 text-[#999]">K463401788544</td>
                      <td className="px-3 py-2">象牙粘显谷</td>
                      <td className="px-3 py-2">8.85吨</td>
                      <td className="px-3 py-2">2848</td>
                      <td className="px-3 py-2">25134</td>
                    </tr>
                    <tr className="border-t border-[#e8edf5]">
                      <td className="px-3 py-2">2</td>
                      <td className="px-3 py-2 text-[#999]">K463401788545</td>
                      <td className="px-3 py-2">粗发香丝干谷</td>
                      <td className="px-3 py-2">47.3吨</td>
                      <td className="px-3 py-2">3848</td>
                      <td className="px-3 py-2">181248</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] text-[#555] mb-1">买方</label>
                  <input readOnly className="w-full border border-[#e8edf5] rounded px-3 py-2 text-[13px] bg-[#f8fafc] text-[#999]" placeholder="根据订单自动填入" />
                </div>
                <div>
                  <label className="block text-[12px] text-[#555] mb-1">卖方</label>
                  <input readOnly className="w-full border border-[#e8edf5] rounded px-3 py-2 text-[13px] bg-[#f8fafc] text-[#999]" placeholder="根据订单自动填入" />
                </div>
              </div>
              <div>
                <label className="block text-[12px] text-[#555] mb-1">合同金额</label>
                <input className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="根据订单自动填入，可修改" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] text-[#555] mb-1">* 合同生效时间</label>
                  <div className="flex items-center border border-[#dde3ec] rounded px-3 py-2 gap-2">
                    <input type="date" className="flex-1 text-[13px] outline-none text-[#999]" />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] text-[#555] mb-1">* 合同到期时间</label>
                  <div className="flex items-center border border-[#dde3ec] rounded px-3 py-2 gap-2">
                    <input type="date" className="flex-1 text-[13px] outline-none text-[#999]" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] text-[#555] mb-1">* 合同名称</label>
                <input className="w-full border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder="请输入" />
              </div>
              <div>
                <label className="block text-[12px] text-[#555] mb-1">* 上传盖章合同</label>
                <div className="border-2 border-dashed border-[#dde3ec] rounded p-6 text-center cursor-pointer hover:border-[#1a5fa8] transition-colors">
                  <div className="text-[13px] text-[#999]">点击上传 png/jpg/pdf/word/excel文件，不超过100M</div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-3 px-5 py-4 border-t border-[#e8edf5] shrink-0">
          <button onClick={onClose} className="px-5 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">取消</button>
          <button className="px-6 py-2 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded hover:bg-[#0d4a8a]">确认</button>
        </div>
      </div>
    </div>
  )
}

export default function ContractWoFaqidePage() {
  const [tab, setTab]           = useState("全部")
  const [showPanel, setShowPanel] = useState(false)

  const filtered = CONTRACTS.filter(c => tab === "全部" || c.contractStatus === tab)

  return (
    <div className="space-y-4">
      <div className="text-[13px] text-[#6b7c93] flex items-center gap-1">
        <span>合同管理</span>
        <span className="mx-1 text-[#ccc]">&gt;</span>
        <span className="text-[#1a1a2e] font-medium">我发起的</span>
      </div>

      {/* 搜索区 */}
      <div className="bg-white rounded-xl border border-[#e8edf5] px-5 py-4">
        <div className="grid grid-cols-4 gap-3 mb-3">
          {[
            { label: "订单编号",  placeholder: "请输入" },
            { label: "订单类型",  placeholder: "请输入", type: "select" },
            { label: "商品名称",  placeholder: "请输入" },
            { label: "订单状态",  placeholder: "请选择", type: "select" },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-[12px] text-[#555] mb-1">{f.label}</label>
              {f.type === "select"
                ? <select className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] text-[#999] focus:outline-none focus:border-[#1a5fa8]"><option value="">{f.placeholder}</option></select>
                : <input className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder={f.placeholder} />
              }
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3 mb-3">
          {[
            { label: "合同编号",  placeholder: "请输入" },
            { label: "合同名称",  placeholder: "请输入" },
            { label: "买方",      placeholder: "请输入" },
            { label: "卖方",      placeholder: "请输入" },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-[12px] text-[#555] mb-1">{f.label}</label>
              <input className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" placeholder={f.placeholder} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div>
            <label className="block text-[12px] text-[#555] mb-1">合同状态</label>
            <select className="w-full border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] text-[#999] focus:outline-none focus:border-[#1a5fa8]"><option value="">请选择</option></select>
          </div>
          <div className="col-span-2">
            <label className="block text-[12px] text-[#555] mb-1">创建时间</label>
            <div className="flex items-center gap-2">
              <input type="date" className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              <span className="text-[#999] text-[12px]">至</span>
              <input type="date" className="flex-1 border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
              {["今日","昨日","近7天","近30天"].map(d => (
                <button key={d} className="px-2.5 py-1.5 text-[12px] text-[#555] border border-[#dde3ec] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors whitespace-nowrap">{d}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-1.5 bg-[#1a5fa8] text-white text-[13px] font-medium rounded hover:bg-[#0d4a8a]">查询</button>
          <button className="px-5 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">清空</button>
          <button className="px-5 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">导出</button>
        </div>
      </div>

      {/* 操作栏 */}
      <div className="flex items-center justify-between">
        <button onClick={() => setShowPanel(true)} className="flex items-center gap-1.5 px-4 py-2 bg-[#1a5fa8] text-white text-[13px] font-medium rounded hover:bg-[#0d4a8a]">
          <Plus className="w-3.5 h-3.5" />
          新增合同
        </button>
      </div>

      {/* 列表区 */}
      <div className="bg-white rounded-xl border border-[#e8edf5] overflow-hidden">
        {/* Tab */}
        <div className="flex border-b border-[#e8edf5]">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2.5 text-[13px] border-b-2 -mb-px transition-colors ${tab === t ? "border-[#1a5fa8] text-[#1a5fa8] font-semibold" : "border-transparent text-[#666] hover:text-[#1a5fa8]"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="bg-[#f8fafc] text-[#6b7c93] border-b border-[#f0f4f8]">
                {["合同编号","合同名称","合同金额(元)","订单编号","订单类型","商品名称","订单状态","买方","卖方","合同状态","创建时间","操作"].map(h => (
                  <th key={h} className="px-3 py-2.5 text-left font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => {
                const ss = STATUS_STYLE[c.contractStatus] ?? { color: "#999", bg: "#f3f4f6" }
                return (
                  <tr key={c.id} className="border-b border-[#f8fafc] hover:bg-[#fafbfc]">
                    <td className="px-3 py-2.5 text-[#999] font-mono whitespace-nowrap">{c.id}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#6b7c93] shrink-0" />
                        <span className="font-medium text-[#1a1a2e] whitespace-nowrap">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 font-semibold text-[#e8831a] whitespace-nowrap">{c.amount.toFixed(2)}</td>
                    <td className="px-3 py-2.5 text-[#999] font-mono whitespace-nowrap">{c.orderId}</td>
                    <td className="px-3 py-2.5"><span className="px-2 py-0.5 bg-[#f0f4f8] text-[#555] rounded whitespace-nowrap">{c.orderType}</span></td>
                    <td className="px-3 py-2.5 text-[#555] max-w-[120px] truncate">{c.goods}</td>
                    <td className="px-3 py-2.5 text-[#555] whitespace-nowrap">{c.orderStatus}</td>
                    <td className="px-3 py-2.5 text-[#555] whitespace-nowrap">{c.buyer}</td>
                    <td className="px-3 py-2.5 text-[#555] whitespace-nowrap">{c.seller}</td>
                    <td className="px-3 py-2.5">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap" style={{ color: ss.color, background: ss.bg }}>{c.contractStatus}</span>
                    </td>
                    <td className="px-3 py-2.5 text-[#999] whitespace-nowrap">{c.created}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex gap-2 whitespace-nowrap">
                        <button className="text-[#1a5fa8] hover:underline">详情</button>
                        {c.contractStatus === "待我方签章" && <button className="text-[#1a5fa8] hover:underline">签章</button>}
                        {(c.contractStatus === "待我方签章" || c.contractStatus === "待对方签章") && (
                          <button className="text-[#1a5fa8] hover:underline">修改合同</button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {/* 分页 */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#e8edf5]">
          <span className="text-[12px] text-[#999]">共 {filtered.length} 条</span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center rounded border border-[#dde3ec] hover:border-[#1a5fa8] text-[#666]"><ChevronLeft className="w-3.5 h-3.5" /></button>
            <button className="w-7 h-7 flex items-center justify-center rounded bg-[#1a5fa8] text-white text-[12px] font-semibold">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-[#dde3ec] hover:border-[#1a5fa8] text-[#666]"><ChevronRight className="w-3.5 h-3.5" /></button>
            <span className="text-[12px] text-[#999] ml-1">共 1 页</span>
          </div>
        </div>
      </div>

      {showPanel && <NewContractPanel onClose={() => setShowPanel(false)} />}
    </div>
  )
}
