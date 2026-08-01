"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Trash2, Plus, Minus, ChevronRight, ShoppingCart, Package } from "lucide-react"

interface CartItem {
  id: string
  name: string
  spec: string
  unit: string
  price: number
  qty: number
  img: string
  supplier: string
  delivery: string
  checked: boolean
}

interface SupplierGroup {
  supplierId: string
  supplierName: string
  items: CartItem[]
  checked: boolean
}

const INITIAL_GROUPS: SupplierGroup[] = [
  {
    supplierId: "s1",
    supplierName: "广东供销农产品股份有限公司",
    checked: true,
    items: [
      { id: "1", name: "台山丝苗米（精装）", spec: "25kg/袋", unit: "袋", price: 128.00, qty: 10, img: "/images/products/simiao-rice.png", supplier: "广东供销农产品股份有限公司", delivery: "卖家配送", checked: true },
      { id: "2", name: "某某优选鸡蛋", spec: "30枚/盒", unit: "盒", price: 31.12, qty: 5, img: "/images/products/eggs.png", supplier: "广东供销农产品股份有限公司", delivery: "卖家配送+买家自提", checked: true },
      { id: "3", name: "江门鲜活南美白对虾", spec: "1kg/盒", unit: "盒", price: 68.00, qty: 20, img: "/images/products/shrimp-fresh.png", supplier: "广东供销农产品股份有限公司", delivery: "卖家配送", checked: false },
    ],
  },
  {
    supplierId: "s2",
    supplierName: "茂名荔枝产地直供中心",
    checked: true,
    items: [
      { id: "4", name: "妃子笑荔枝（产地直供）", spec: "5kg/箱", unit: "箱", price: 98.00, qty: 8, img: "/images/products/sanhuali.png", supplier: "茂名荔枝产地直供中心", delivery: "卖家配送", checked: true },
      { id: "5", name: "梅州金柚（大果）", spec: "3kg/个", unit: "个", price: 45.00, qty: 12, img: "/images/products/pomelo.png", supplier: "茂名荔枝产地直供中心", delivery: "卖家配送", checked: true },
    ],
  },
]

export default function CartPage() {
  const [groups, setGroups] = useState<SupplierGroup[]>(INITIAL_GROUPS)

  // 全选/反选
  const allChecked = groups.every(g => g.checked && g.items.every(i => i.checked))
  const toggleAll = () => {
    setGroups(groups.map(g => ({
      ...g,
      checked: !allChecked,
      items: g.items.map(i => ({ ...i, checked: !allChecked })),
    })))
  }

  // 供应商级勾选
  const toggleSupplier = (supplierId: string) => {
    setGroups(groups.map(g => {
      if (g.supplierId !== supplierId) return g
      const next = !g.checked
      return { ...g, checked: next, items: g.items.map(i => ({ ...i, checked: next })) }
    }))
  }

  // 商品级勾选
  const toggleItem = (supplierId: string, itemId: string) => {
    setGroups(groups.map(g => {
      if (g.supplierId !== supplierId) return g
      const items = g.items.map(i => i.id === itemId ? { ...i, checked: !i.checked } : i)
      return { ...g, items, checked: items.every(i => i.checked) }
    }))
  }

  // 数量调整
  const changeQty = (supplierId: string, itemId: string, delta: number) => {
    setGroups(groups.map(g => {
      if (g.supplierId !== supplierId) return g
      return {
        ...g,
        items: g.items.map(i => {
          if (i.id !== itemId) return i
          return { ...i, qty: Math.max(1, i.qty + delta) }
        }),
      }
    }))
  }

  // 删除
  const removeItem = (supplierId: string, itemId: string) => {
    setGroups(groups.map(g => {
      if (g.supplierId !== supplierId) return g
      return { ...g, items: g.items.filter(i => i.id !== itemId) }
    }).filter(g => g.items.length > 0))
  }

  // 统计
  const checkedItems = groups.flatMap(g => g.items.filter(i => i.checked))
  const totalQty = checkedItems.reduce((s, i) => s + i.qty, 0)
  const totalPrice = checkedItems.reduce((s, i) => s + i.price * i.qty, 0)
  const totalCount = groups.flatMap(g => g.items).length

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-6 py-6">

          {/* 面包屑 */}
          <div className="flex items-center gap-1.5 text-[13px] text-[#6b7c93] mb-5">
            <Link href="/portal" className="hover:text-[#1a5fa8]">首页</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1a1a2e]">采购车</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <ShoppingCart className="w-6 h-6 text-[#1a5fa8]" />
            <h1 className="text-[22px] font-bold text-[#1a1a2e]">我的采购车</h1>
            <span className="text-[14px] text-[#6b7c93]">共 {totalCount} 件商品</span>
          </div>

          <div className="flex gap-5 items-start">
            {/* 左侧商品列表 */}
            <div className="flex-1 min-w-0 space-y-4">

              {/* 列表表头 */}
              <div className="bg-white rounded-lg border border-[#e8edf5] px-5 py-3 flex items-center gap-4 text-[13px] text-[#6b7c93]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    className="w-4 h-4 accent-[#1a5fa8] cursor-pointer"
                  />
                  <span>全选</span>
                </label>
                <span className="flex-1">商品信息</span>
                <span className="w-[100px] text-center">单价</span>
                <span className="w-[120px] text-center">数量</span>
                <span className="w-[100px] text-center">小计</span>
                <span className="w-[60px] text-center">操作</span>
              </div>

              {groups.length === 0 ? (
                <div className="bg-white rounded-lg border border-[#e8edf5] p-16 text-center">
                  <Package className="w-16 h-16 text-[#dde3ec] mx-auto mb-4" />
                  <p className="text-[15px] text-[#6b7c93] mb-6">采购车为空</p>
                  <Link href="/portal/jicai" className="px-6 py-2.5 bg-[#1a5fa8] text-white text-[14px] rounded hover:bg-[#0d4a8a] transition-colors">
                    去选购商品
                  </Link>
                </div>
              ) : (
                groups.map(group => (
                  <div key={group.supplierId} className="bg-white rounded-lg border border-[#e8edf5] overflow-hidden">
                    {/* 供应商行 */}
                    <div className="px-5 py-3 bg-[#f8fafc] border-b border-[#e8edf5] flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={group.checked}
                        onChange={() => toggleSupplier(group.supplierId)}
                        className="w-4 h-4 accent-[#1a5fa8] cursor-pointer"
                      />
                      <span className="text-[14px] font-semibold text-[#1a1a2e]">{group.supplierName}</span>
                    </div>

                    {/* 商品行 */}
                    {group.items.map(item => (
                      <div key={item.id} className="px-5 py-4 border-b border-[#f0f4f8] last:border-0 flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleItem(group.supplierId, item.id)}
                          className="w-4 h-4 accent-[#1a5fa8] cursor-pointer shrink-0"
                        />
                        {/* 图片 */}
                        <div className="relative w-16 h-16 rounded border border-[#e8edf5] overflow-hidden shrink-0">
                          <Image src={item.img} alt={item.name} fill className="object-cover" />
                        </div>
                        {/* 名称+规格 */}
                        <div className="flex-1 min-w-0">
                          <div className="text-[14px] font-medium text-[#1a1a2e] line-clamp-2">{item.name}</div>
                          <div className="text-[12px] text-[#6b7c93] mt-0.5">规格：{item.spec}</div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[11px] px-1.5 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] border border-[#1a5fa8]/20 rounded">担保交易</span>
                            <span className="text-[11px] text-[#6b7c93]">{item.delivery}</span>
                          </div>
                        </div>
                        {/* 单价 */}
                        <div className="w-[100px] text-center">
                          <span className="text-[15px] font-semibold text-[#e8831a]">¥{item.price.toFixed(2)}</span>
                          <div className="text-[11px] text-[#6b7c93]">/{item.unit}</div>
                        </div>
                        {/* 数量 */}
                        <div className="w-[120px] flex items-center justify-center gap-2">
                          <button
                            onClick={() => changeQty(group.supplierId, item.id, -1)}
                            className="w-7 h-7 border border-[#dde3ec] rounded flex items-center justify-center text-[#333] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-10 text-center text-[14px] font-medium">{item.qty}</span>
                          <button
                            onClick={() => changeQty(group.supplierId, item.id, 1)}
                            className="w-7 h-7 border border-[#dde3ec] rounded flex items-center justify-center text-[#333] hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        {/* 小计 */}
                        <div className="w-[100px] text-center">
                          <span className="text-[15px] font-semibold text-[#e8831a]">¥{(item.price * item.qty).toFixed(2)}</span>
                        </div>
                        {/* 删除 */}
                        <div className="w-[60px] flex justify-center">
                          <button
                            onClick={() => removeItem(group.supplierId, item.id)}
                            className="text-[#6b7c93] hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>

            {/* 右侧结算栏 */}
            <div className="w-[280px] shrink-0 sticky top-[80px] space-y-3">
              <div className="bg-white rounded-lg border border-[#e8edf5] p-5">
                <h3 className="text-[15px] font-bold text-[#1a1a2e] mb-4 pb-3 border-b border-[#f0f4f8]">订单汇总</h3>
                <div className="space-y-2.5 mb-4">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#6b7c93]">已选商品</span>
                    <span className="text-[#1a1a2e] font-medium">{checkedItems.length} 种</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#6b7c93]">商品总量</span>
                    <span className="text-[#1a1a2e] font-medium">{totalQty} 件</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#6b7c93]">商品总额</span>
                    <span className="text-[#e8831a] font-semibold">¥{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#6b7c93]">配送费</span>
                    <span className="text-[#3a8c3f] font-medium">待确认</span>
                  </div>
                </div>
                <div className="border-t border-[#f0f4f8] pt-3 mb-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[14px] font-semibold text-[#1a1a2e]">预计总额</span>
                    <div className="text-right">
                      <div className="text-[22px] font-bold text-[#e8831a]">¥{totalPrice.toFixed(2)}</div>
                      <div className="text-[11px] text-[#6b7c93]">（不含配送费）</div>
                    </div>
                  </div>
                </div>
                <Link
                  href={checkedItems.length > 0 ? "/portal/checkout" : "#"}
                  className={`block w-full py-3 text-center text-[15px] font-semibold rounded transition-colors ${
                    checkedItems.length > 0
                      ? "bg-[#1a5fa8] text-white hover:bg-[#0d4a8a]"
                      : "bg-[#dde3ec] text-[#999] cursor-not-allowed"
                  }`}
                >
                  提交采购申请
                </Link>
                {checkedItems.length === 0 && (
                  <p className="text-[12px] text-[#6b7c93] text-center mt-2">请先选择要采购的商品</p>
                )}
              </div>

              {/* 担保说明 */}
              <div className="bg-[#e8f4fd] rounded-lg border border-[#1a5fa8]/20 p-4">
                <div className="text-[13px] font-semibold text-[#1a5fa8] mb-2">担保交易保障</div>
                <ul className="space-y-1.5 text-[12px] text-[#555]">
                  <li className="flex items-start gap-1.5"><span className="text-[#3a8c3f] font-bold shrink-0">✓</span>平台资金担保，安全可信</li>
                  <li className="flex items-start gap-1.5"><span className="text-[#3a8c3f] font-bold shrink-0">✓</span>收货验货后确认付款</li>
                  <li className="flex items-start gap-1.5"><span className="text-[#3a8c3f] font-bold shrink-0">✓</span>7日无理由退换货</li>
                  <li className="flex items-start gap-1.5"><span className="text-[#3a8c3f] font-bold shrink-0">✓</span>一票溯源，品质可追</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
