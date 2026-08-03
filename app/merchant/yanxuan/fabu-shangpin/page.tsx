"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Plus, Trash2, Upload, CheckCircle2 } from "lucide-react"

const REGIONS = ["江门产地直供中心", "南雄产地直供中心", "茂名产地直供中心", "肇庆产地直供中心", "韶关产地直供中心", "遂溪产地直供中心"]
const CATEGORIES = ["水产/对虾", "水产/淡水虾", "水产/鱼类", "粮油/大米", "粮油/食用油", "水果/荔枝", "水果/菠萝", "蔬菜/叶菜", "禽蛋/活禽", "加工/腊味"]
const DELIVERY = ["卖家配送", "买家自提", "卖家配送、买家自提"]
const SETTLEMENT = ["建行龙存管", "工行安心付", "平台担保"]
const TRADE_MODES = ["担保交易", "非担保交易"]

interface SkuRow { spec: string; price: string; minQty: string; maxQty: string }

export default function FabuShangpinPage() {
  const [submitted, setSubmitted] = useState(false)
  const [skus, setSkus] = useState<SkuRow[]>([
    { spec: "5kg/袋", price: "", minQty: "", maxQty: "" },
  ])

  const addSku = () => setSkus([...skus, { spec: "", price: "", minQty: "", maxQty: "" }])
  const removeSku = (i: number) => setSkus(skus.filter((_, idx) => idx !== i))

  const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
    <div className="grid grid-cols-[140px_1fr] items-start gap-3 mb-4">
      <label className="text-[13px] text-[#444] pt-1.5 text-right">
        {required && <span className="text-red-500 mr-0.5">*</span>}{label}：
      </label>
      <div>{children}</div>
    </div>
  )

  const Input = ({ placeholder, width }: { placeholder?: string; width?: string }) => (
    <input
      placeholder={placeholder}
      className={`border border-[#dde3ec] rounded px-3 h-8 text-[13px] focus:outline-none focus:border-[#1a5fa8] ${width ?? "w-[320px]"}`}
    />
  )

  const Select = ({ options, width }: { options: string[]; width?: string }) => (
    <select className={`border border-[#dde3ec] rounded px-3 h-8 text-[13px] text-[#444] focus:outline-none focus:border-[#1a5fa8] bg-white ${width ?? "w-[240px]"}`}>
      <option value="">请选择</option>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  )

  if (submitted) {
    return (
  <>
    <div className="max-w-[560px] mx-auto mt-16 text-center">
          <CheckCircle2 className="w-16 h-16 text-[#1a7a3c] mx-auto mb-4" />
          <h2 className="text-[22px] font-bold text-[#1a1a2e] mb-2">商品已提交审核</h2>
          <p className="text-[14px] text-[#6b7c93] mb-8">
            您的商品已提交至平台运营端审核，预计 1-2 个工作日内完成审核。<br />
            审核结果将通过站内消息通知您。
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/merchant/yanxuan/shangpin-list" className="px-6 h-9 flex items-center bg-[#1a5fa8] text-white text-[14px] rounded hover:bg-[#0d4a8a] transition-colors">
              返回商品列表
            </Link>
            <button onClick={() => setSubmitted(false)} className="px-6 h-9 border border-[#1a5fa8] text-[#1a5fa8] text-[14px] rounded hover:bg-[#e8f4fd] transition-colors">
              继续发布
            </button>
          </div>
        </div>
  </>
)
  }

  return (
  <>
    <div className="mb-5 flex items-center gap-3">
        <Link href="/merchant/yanxuan/shangpin-list" className="flex items-center gap-1 text-[#6b7c93] hover:text-[#1a5fa8] text-[13px]">
          <ChevronLeft className="w-4 h-4" />我的商品列表
        </Link>
        <span className="text-[#ccc]">/</span>
        <span className="text-[14px] font-semibold text-[#1a1a2e]">发布供销严选商品</span>
      </div>

      <div className="max-w-[820px] bg-white rounded-lg border border-[#dde3ec] p-6">

        {/* Section: 基本信息 */}
        <div className="mb-5 pb-1 border-b border-[#e8edf5]">
          <span className="text-[13px] font-semibold text-[#1a5fa8] border-l-2 border-[#1a5fa8] pl-2">基本信息</span>
        </div>

        <Field label="商品名称" required>
          <Input placeholder="请输入商品名称" width="w-[320px]" />
        </Field>
        <Field label="所属产地中心" required>
          <Select options={REGIONS} width="w-[240px]" />
        </Field>
        <Field label="商品分类" required>
          <Select options={CATEGORIES} width="w-[240px]" />
        </Field>
        <Field label="商品简介" required>
          <textarea
            placeholder="请输入商品简介，不超过200字"
            rows={3}
            className="w-[480px] border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none"
          />
        </Field>
        <Field label="商品图片" required>
          <div className="flex gap-3">
            {[0,1,2].map((i) => (
              <div key={i} className="w-20 h-20 border-2 border-dashed border-[#dde3ec] rounded flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#1a5fa8] text-[#999] hover:text-[#1a5fa8] transition-colors">
                <Upload className="w-5 h-5" />
                <span className="text-[11px]">上传图片</span>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-[#999] mt-1">支持 JPG/PNG，建议尺寸 800×800，最多上传5张</div>
        </Field>
        <Field label="计划供应时间" required>
          <div className="flex items-center gap-2">
            <input type="date" className="border border-[#dde3ec] rounded px-3 h-8 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
            <span className="text-[13px] text-[#999]">至</span>
            <input type="date" className="border border-[#dde3ec] rounded px-3 h-8 text-[13px] focus:outline-none focus:border-[#1a5fa8]" />
          </div>
        </Field>

        {/* Section: 规格与价格 */}
        <div className="mb-5 mt-6 pb-1 border-b border-[#e8edf5]">
          <span className="text-[13px] font-semibold text-[#1a5fa8] border-l-2 border-[#1a5fa8] pl-2">规格与价格</span>
        </div>

        <div className="mb-4">
          <table className="w-full text-[13px] border border-[#e8edf5] rounded overflow-hidden">
            <thead>
              <tr className="bg-[#f5f7fa] text-[12px] text-[#6b7c93]">
                <th className="px-4 py-2.5 text-left font-medium">规格</th>
                <th className="px-4 py-2.5 text-left font-medium">价格（元）</th>
                <th className="px-4 py-2.5 text-left font-medium">起批量</th>
                <th className="px-4 py-2.5 text-left font-medium">预估供应量</th>
                <th className="px-4 py-2.5 text-left font-medium w-10"></th>
              </tr>
            </thead>
            <tbody>
              {skus.map((sku, i) => (
                <tr key={i} className="border-t border-[#e8edf5]">
                  <td className="px-3 py-2">
                    <input value={sku.spec} onChange={(e) => { const s=[...skus]; s[i].spec=e.target.value; setSkus(s) }}
                      placeholder="如：5kg/袋" className="border border-[#dde3ec] rounded px-2 h-7 text-[13px] w-[120px] focus:outline-none focus:border-[#1a5fa8]" />
                  </td>
                  <td className="px-3 py-2">
                    <input value={sku.price} onChange={(e) => { const s=[...skus]; s[i].price=e.target.value; setSkus(s) }}
                      placeholder="0.00" className="border border-[#dde3ec] rounded px-2 h-7 text-[13px] w-[100px] focus:outline-none focus:border-[#1a5fa8]" />
                  </td>
                  <td className="px-3 py-2">
                    <input value={sku.minQty} onChange={(e) => { const s=[...skus]; s[i].minQty=e.target.value; setSkus(s) }}
                      placeholder="100件" className="border border-[#dde3ec] rounded px-2 h-7 text-[13px] w-[100px] focus:outline-none focus:border-[#1a5fa8]" />
                  </td>
                  <td className="px-3 py-2">
                    <input value={sku.maxQty} onChange={(e) => { const s=[...skus]; s[i].maxQty=e.target.value; setSkus(s) }}
                      placeholder="8000件" className="border border-[#dde3ec] rounded px-2 h-7 text-[13px] w-[100px] focus:outline-none focus:border-[#1a5fa8]" />
                  </td>
                  <td className="px-3 py-2">
                    {skus.length > 1 && (
                      <button onClick={() => removeSku(i)} className="text-[#b91c1c] hover:opacity-70">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={addSku} className="mt-2 flex items-center gap-1.5 text-[#1a5fa8] text-[13px] hover:underline">
            <Plus className="w-3.5 h-3.5" />添加规格
          </button>
        </div>

        {/* Section: 交易信息 */}
        <div className="mb-5 mt-6 pb-1 border-b border-[#e8edf5]">
          <span className="text-[13px] font-semibold text-[#1a5fa8] border-l-2 border-[#1a5fa8] pl-2">交易信息</span>
        </div>

        <Field label="配送方式" required>
          <Select options={DELIVERY} width="w-[240px]" />
        </Field>
        <Field label="结算渠道" required>
          <div className="flex gap-3">
            {SETTLEMENT.map((s) => (
              <label key={s} className="flex items-center gap-1.5 text-[13px] text-[#444] cursor-pointer">
                <input type="checkbox" className="accent-[#1a5fa8]" />
                {s}
              </label>
            ))}
          </div>
        </Field>
        <Field label="交易模式" required>
          <div className="flex gap-4">
            {TRADE_MODES.map((m) => (
              <label key={m} className="flex items-center gap-1.5 text-[13px] text-[#444] cursor-pointer">
                <input type="radio" name="trade" className="accent-[#1a5fa8]" />
                {m}
              </label>
            ))}
          </div>
        </Field>
        <Field label="结算方式">
          <Input placeholder="如：预付款10%" width="w-[240px]" />
        </Field>
        <Field label="自提地点">
          <Input placeholder="请输入自提地址" width="w-[400px]" />
        </Field>

        {/* Section: 详情描述 */}
        <div className="mb-5 mt-6 pb-1 border-b border-[#e8edf5]">
          <span className="text-[13px] font-semibold text-[#1a5fa8] border-l-2 border-[#1a5fa8] pl-2">商品详情描述</span>
        </div>
        <Field label="详情内容">
          <textarea
            placeholder="请输入商品详情描述（支持换行），将显示在商品详情页下方"
            rows={5}
            className="w-[480px] border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none"
          />
        </Field>
        <Field label="备注说明">
          <textarea
            rows={2}
            placeholder="其他补充说明"
            className="w-[480px] border border-[#dde3ec] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#1a5fa8] resize-none"
          />
        </Field>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-[#e8edf5] mt-6">
          <button
            onClick={() => setSubmitted(true)}
            className="px-8 h-9 bg-[#1a5fa8] text-white text-[14px] rounded hover:bg-[#0d4a8a] transition-colors font-medium"
          >
            提交审核
          </button>
          <button className="px-8 h-9 border border-[#dde3ec] text-[#555] text-[14px] rounded hover:bg-[#f5f7fa] transition-colors">
            保存草稿
          </button>
          <Link href="/merchant/yanxuan/shangpin-list" className="text-[13px] text-[#6b7c93] hover:text-[#1a5fa8]">
            取消
          </Link>
        </div>
      </div>
  </>
)
}
