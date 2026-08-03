"use client"

import { useState } from "react"
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Eye, Pencil, Monitor, Smartphone } from "lucide-react"

/* ─── 颜色方案数据 ─── */
const colorSchemes = [
  ["#1a5fa8", "#cde8ff"],
  ["#e53e3e", "#fed7d7"],
  ["#e8831a", "#feebc8"],
  ["#d63384", "#fce4ec"],
  ["#e91e8c", "#fce4f0"],
  ["#c0392b", "#f5b7b1"],
  ["#4a4a4a", "#e0e0e0"],
  ["#f5a623", "#1a1a2e"],
  ["#1de9b6", "#004d40"],
  ["#80cbc4", "#e0f2f1"],
  ["#43a047", "#1b5e20"],
  ["#388e3c", "#c8e6c9"],
  ["#4a4a4a", "#c8e6c9"],
  ["#66bb6a", "#e8f5e9"],
  ["#b5a642", "#f5f0dc"],
  ["#f0f0e0", "#d4c9a0"],
  ["#1a1a2e", "#f0f0f0"],
  ["#f5f5f5", "#bdbdbd"],
  ["#7b1fa2", "#ce93d8"],
  ["#e8c4d0", "#f8bbd0"],
  ["#e53e3e", "#f5a623"],
]

/* ─── Tab 1: 主题风格 ─── */
function ThemeTab() {
  const [schemeMode, setSchemeMode] = useState<"system" | "custom">("system")
  const [selectedScheme, setSelectedScheme] = useState(0)
  const [customPrimary, setCustomPrimary] = useState("#1a5fa8")
  const [customSecondary, setCustomSecondary] = useState("#cde8ff")

  const primary = schemeMode === "system" ? colorSchemes[selectedScheme][0] : customPrimary
  const secondary = schemeMode === "system" ? colorSchemes[selectedScheme][1] : customSecondary

  return (
    <div className="flex gap-6">
      {/* 左侧配置区 */}
      <div className="w-[380px] shrink-0 space-y-5">
        {/* 配色方案 */}
        <div>
          <div className="flex items-center gap-6 mb-3">
            <span className="text-[13px] text-[#333]">配色方案</span>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" name="scheme" checked={schemeMode === "system"} onChange={() => setSchemeMode("system")} className="accent-[#1a5fa8]" />
              <span className="text-[13px] text-[#333]">系统配色</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" name="scheme" checked={schemeMode === "custom"} onChange={() => setSchemeMode("custom")} className="accent-[#1a5fa8]" />
              <span className="text-[13px] text-[#333]">自定义配色</span>
            </label>
          </div>

          {schemeMode === "system" ? (
            <div className="grid grid-cols-7 gap-2">
              {colorSchemes.map((scheme, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedScheme(i)}
                  className={`w-10 h-7 rounded border-2 overflow-hidden flex transition-all ${selectedScheme === i ? "border-[#1a5fa8] scale-110 shadow" : "border-transparent hover:border-[#1a5fa8]/40"}`}
                >
                  <div className="flex-1 h-full" style={{ background: scheme[0] }} />
                  <div className="flex-1 h-full" style={{ background: scheme[1] }} />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex gap-6 mt-2">
              <div>
                <div className="text-[12px] text-[#666] mb-1">主色</div>
                <div className="flex items-center gap-2">
                  <input type="color" value={customPrimary} onChange={e => setCustomPrimary(e.target.value)} className="w-10 h-8 rounded border border-[#dde3ec] cursor-pointer" />
                  <span className="text-[12px] font-mono text-[#555]">{customPrimary.toUpperCase()}</span>
                </div>
              </div>
              <div>
                <div className="text-[12px] text-[#666] mb-1">辅色</div>
                <div className="flex items-center gap-2">
                  <input type="color" value={customSecondary} onChange={e => setCustomSecondary(e.target.value)} className="w-10 h-8 rounded border border-[#dde3ec] cursor-pointer" />
                  <span className="text-[12px] font-mono text-[#555]">{customSecondary.toUpperCase()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 导入/保存 */}
        <div className="flex items-center gap-3 pt-2 border-t border-[#e8edf5]">
          <button className="px-4 py-1.5 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#1a5fa8] transition-colors">
            导入配色码
          </button>
          <button className="px-6 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
            保存
          </button>
        </div>
      </div>

      {/* 右侧预览 */}
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-[#333] mb-4">预览效果</div>
        <div className="flex gap-8 items-start">
          {/* 移动端预览 */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-[180px] rounded-2xl border-4 border-[#333] overflow-hidden shadow-lg bg-white" style={{ fontFamily: "sans-serif" }}>
              {/* 顶部 */}
              <div className="flex items-center justify-between px-3 py-2 text-[10px]" style={{ background: primary, color: "#fff" }}>
                <span>店铺详情</span>
              </div>
              {/* Banner */}
              <div className="h-16 flex items-center justify-center text-white text-[11px] font-bold" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}>
                粤供销农产品
              </div>
              {/* 店铺信息 */}
              <div className="p-2 border-b border-[#f0f0f0]">
                <div className="text-[9px] font-bold text-[#222]">广东供销数字科技有限公司02</div>
                <div className="text-[8px] text-[#666] mt-0.5">台山市大江供销社新</div>
                <div className="flex gap-1 mt-1">
                  <button className="px-1.5 py-0.5 border text-[8px] rounded" style={{ borderColor: primary, color: primary }}>收藏店铺</button>
                  <button className="px-1.5 py-0.5 border text-[8px] rounded" style={{ borderColor: primary, color: primary }}>联系商家</button>
                </div>
              </div>
              {/* Tab */}
              <div className="flex border-b border-[#f0f0f0]">
                {["商品", "采购需求", "竞拍"].map((t, i) => (
                  <div key={t} className={`flex-1 text-center py-1.5 text-[8px] ${i === 0 ? "border-b-2 font-bold" : "text-[#666]"}`} style={i === 0 ? { borderColor: primary, color: primary } : {}}>
                    {t}
                  </div>
                ))}
              </div>
              {/* 商品列表 */}
              <div className="p-1.5 space-y-1">
                {["测试大米", "大米", "大米"].map((name, i) => (
                  <div key={i} className="flex items-center gap-1.5 p-1 rounded" style={{ background: i === 0 ? secondary + "44" : "transparent" }}>
                    <div className="w-7 h-7 rounded bg-[#e0e0e0] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[8px] font-medium text-[#222] truncate">{name}</div>
                      <div className="text-[7px] text-[#999]">散装 全款全货</div>
                      <div className="text-[8px] font-bold" style={{ color: primary }}>¥{i === 0 ? "80.00" : i === 1 ? "1.00" : "0.00"}起</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] text-[#666]">
              <Smartphone className="w-3.5 h-3.5" />移动端
            </div>
          </div>

          {/* PC端预览 */}
          <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
            <div className="w-full rounded-lg border border-[#e0e0e0] overflow-hidden shadow bg-white">
              {/* header */}
              <div className="flex items-center gap-2 px-3 py-1.5 text-[10px] text-white" style={{ background: primary }}>
                <div className="w-5 h-5 rounded-full bg-white/20 shrink-0" />
                <span className="font-bold">广东供销数字科技有限公司02</span>
                <span className="ml-auto opacity-70">NO.12567 | 超级企业</span>
              </div>
              {/* Banner */}
              <div className="h-10 flex items-center px-4" style={{ background: `linear-gradient(90deg,${primary},${secondary})` }}>
                <span className="text-white text-[10px] font-bold">店铺banner 自定义宣传图</span>
              </div>
              {/* Nav */}
              <div className="flex gap-4 px-4 py-1.5 border-b border-[#f0f0f0]">
                {["商品", "采购", "竞拍"].map((t, i) => (
                  <span key={t} className={`text-[9px] pb-0.5 ${i === 0 ? "border-b-2 font-bold" : "text-[#666]"}`} style={i === 0 ? { borderColor: primary, color: primary } : {}}>
                    {t}
                  </span>
                ))}
              </div>
              {/* Content */}
              <div className="flex gap-2 p-2">
                <div className="w-16 shrink-0 space-y-0.5">
                  {["全部", "柚子"].map((c, i) => (
                    <div key={c} className="text-[8px] px-1.5 py-0.5 rounded" style={i === 0 ? { background: primary, color: "#fff" } : { color: "#666" }}>{c}</div>
                  ))}
                </div>
                <div className="flex-1 grid grid-cols-3 gap-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="border border-[#f0f0f0] rounded p-1">
                      <div className="w-full h-8 bg-[#e0e0e0] rounded mb-0.5" />
                      <div className="text-[7px] text-[#222]">商品名称</div>
                      <div className="text-[7px] font-bold" style={{ color: primary }}>¥99.00</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* footer */}
              <div className="flex gap-4 px-4 py-1.5 text-[8px] text-white justify-center" style={{ background: primary }}>
                <span>商品</span><span>采购</span><span>我的</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] text-[#666]">
              <Monitor className="w-3.5 h-3.5" />PC端
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Tab 2: 页面管理 ─── */
type PageItem = { id: number; name: string; type: string; status: "启用" | "停用"; isHome?: boolean }

function PageManageTab() {
  const [pages, setPages] = useState<PageItem[]>([
    { id: 1, name: "店铺首页", type: "自定义页面", status: "启用", isHome: true },
    { id: 2, name: "商品详情页", type: "系统页面", status: "启用" },
    { id: 3, name: "采购需求页", type: "自定义页面", status: "启用" },
    { id: 4, name: "活动专题页", type: "自定义页面", status: "停用" },
    { id: 5, name: "关于我们", type: "自定义页面", status: "停用" },
  ])

  const toggle = (id: number) => {
    setPages(prev => prev.map(p => p.id === id ? { ...p, status: p.status === "启用" ? "停用" : "启用" } : p))
  }
  const remove = (id: number) => setPages(prev => prev.filter(p => p.id !== id))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-[13px] text-[#666]">共 {pages.length} 个页面，点击"编辑"可拖拽组件自由搭建页面</div>
        <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
          <Plus className="w-3.5 h-3.5" />新建页面
        </button>
      </div>

      <div className="border border-[#e8edf5] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f5f7fa] text-[12px] text-[#666] font-semibold">
              <th className="px-4 py-2.5 text-left w-10"></th>
              <th className="px-4 py-2.5 text-left">页面名称</th>
              <th className="px-4 py-2.5 text-left">页面类型</th>
              <th className="px-4 py-2.5 text-left">状态</th>
              <th className="px-4 py-2.5 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id} className="border-t border-[#e8edf5] hover:bg-[#fafbfc] group">
                <td className="px-4 py-3 text-[#ccc] cursor-grab">
                  <GripVertical className="w-4 h-4" />
                </td>
                <td className="px-4 py-3 text-[13px] text-[#1a1a2e]">
                  {page.name}
                  {page.isHome && <span className="ml-2 px-1.5 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[11px] rounded">首页</span>}
                </td>
                <td className="px-4 py-3 text-[13px] text-[#666]">{page.type}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[12px] font-medium ${page.status === "启用" ? "bg-[#e6f7ee] text-[#0d8a4c]" : "bg-[#f5f5f5] text-[#999]"}`}>
                    {page.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3 text-[12px]">
                    <button className="flex items-center gap-1 text-[#1a5fa8] hover:underline">
                      <Eye className="w-3.5 h-3.5" />预览
                    </button>
                    <button className="flex items-center gap-1 text-[#1a5fa8] hover:underline">
                      <Pencil className="w-3.5 h-3.5" />编辑
                    </button>
                    <button onClick={() => toggle(page.id)} className="text-[#e8831a] hover:underline">
                      {page.status === "启用" ? "停用" : "启用"}
                    </button>
                    {!page.isHome && (
                      <button onClick={() => remove(page.id)} className="text-[#e53e3e] hover:underline">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ─── Tab 3: 主导航栏 ─── */
type NavItem = { id: number; label: string; url: string; visible: boolean }

function MainNavTab() {
  const [navItems, setNavItems] = useState<NavItem[]>([
    { id: 1, label: "首页",     url: "/",              visible: true  },
    { id: 2, label: "商品",     url: "/products",      visible: true  },
    { id: 3, label: "采购需求", url: "/purchase",      visible: true  },
    { id: 4, label: "竞拍专场", url: "/auction",       visible: true  },
    { id: 5, label: "关于我们", url: "/about",         visible: false },
  ])
  const [editId, setEditId] = useState<number | null>(null)
  const [editLabel, setEditLabel] = useState("")
  const [editUrl, setEditUrl] = useState("")

  const startEdit = (item: NavItem) => {
    setEditId(item.id)
    setEditLabel(item.label)
    setEditUrl(item.url)
  }
  const saveEdit = () => {
    setNavItems(prev => prev.map(n => n.id === editId ? { ...n, label: editLabel, url: editUrl } : n))
    setEditId(null)
  }
  const toggleVisible = (id: number) => setNavItems(prev => prev.map(n => n.id === id ? { ...n, visible: !n.visible } : n))
  const removeNav = (id: number) => setNavItems(prev => prev.filter(n => n.id !== id))
  const move = (id: number, dir: "up" | "down") => {
    setNavItems(prev => {
      const idx = prev.findIndex(n => n.id === id)
      if (dir === "up" && idx === 0) return prev
      if (dir === "down" && idx === prev.length - 1) return prev
      const arr = [...prev]
      const swap = dir === "up" ? idx - 1 : idx + 1
      ;[arr[idx], arr[swap]] = [arr[swap], arr[idx]]
      return arr
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-[13px] text-[#666]">设置店铺页面顶部导航项，最多支持 8 个导航</div>
        <button
          onClick={() => setNavItems(prev => [...prev, { id: Date.now(), label: "新导航", url: "/", visible: true }])}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />添加导航
        </button>
      </div>

      <div className="border border-[#e8edf5] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f5f7fa] text-[12px] text-[#666] font-semibold">
              <th className="px-4 py-2.5 text-left w-10">排序</th>
              <th className="px-4 py-2.5 text-left">导航名称</th>
              <th className="px-4 py-2.5 text-left">链接地址</th>
              <th className="px-4 py-2.5 text-left">显示</th>
              <th className="px-4 py-2.5 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {navItems.map((item, idx) => (
              <tr key={item.id} className="border-t border-[#e8edf5] hover:bg-[#fafbfc]">
                <td className="px-4 py-2.5">
                  <div className="flex flex-col gap-0.5">
                    <button onClick={() => move(item.id, "up")} className="text-[#999] hover:text-[#1a5fa8] disabled:opacity-30" disabled={idx === 0}>
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => move(item.id, "down")} className="text-[#999] hover:text-[#1a5fa8] disabled:opacity-30" disabled={idx === navItems.length - 1}>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  {editId === item.id ? (
                    <input value={editLabel} onChange={e => setEditLabel(e.target.value)} className="border border-[#1a5fa8] rounded px-2 py-1 text-[13px] w-28 focus:outline-none" />
                  ) : (
                    <span className="text-[13px] text-[#1a1a2e]">{item.label}</span>
                  )}
                </td>
                <td className="px-4 py-2.5">
                  {editId === item.id ? (
                    <input value={editUrl} onChange={e => setEditUrl(e.target.value)} className="border border-[#1a5fa8] rounded px-2 py-1 text-[13px] w-44 focus:outline-none" />
                  ) : (
                    <span className="text-[13px] text-[#666] font-mono">{item.url}</span>
                  )}
                </td>
                <td className="px-4 py-2.5">
                  <button
                    onClick={() => toggleVisible(item.id)}
                    className={`relative w-9 h-5 rounded-full transition-colors ${item.visible ? "bg-[#1a5fa8]" : "bg-[#dde3ec]"}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.visible ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-3 text-[12px]">
                    {editId === item.id ? (
                      <>
                        <button onClick={saveEdit} className="text-[#0d8a4c] hover:underline">保存</button>
                        <button onClick={() => setEditId(null)} className="text-[#999] hover:underline">取消</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(item)} className="text-[#1a5fa8] hover:underline">编辑</button>
                        <button onClick={() => removeNav(item.id)} className="text-[#e53e3e] hover:underline">删除</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 导航预览 */}
      <div className="border border-[#e8edf5] rounded-lg p-4 bg-[#f5f7fa]">
        <div className="text-[12px] text-[#666] mb-2">导航预览</div>
        <div className="flex items-center gap-1 bg-[#1a5fa8] rounded px-3 py-1.5 w-fit">
          {navItems.filter(n => n.visible).map((n, i) => (
            <span key={n.id} className={`px-3 py-1 text-[12px] rounded ${i === 0 ? "bg-white text-[#1a5fa8] font-semibold" : "text-white hover:bg-white/20"}`}>
              {n.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Tab 4: 分类页 ─── */
type Category = { id: number; name: string; icon: string; productCount: number; visible: boolean; children?: Category[] }

function CategoryTab() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "全部商品", icon: "🏪", productCount: 38, visible: true },
    {
      id: 2, name: "粮食", icon: "🌾", productCount: 12, visible: true,
      children: [
        { id: 21, name: "大米", icon: "", productCount: 5, visible: true },
        { id: 22, name: "玉米", icon: "", productCount: 4, visible: true },
        { id: 23, name: "大豆", icon: "", productCount: 3, visible: false },
      ],
    },
    { id: 3, name: "特色农产品", icon: "🥬", productCount: 16, visible: true,
      children: [
        { id: 31, name: "蔬菜", icon: "", productCount: 8, visible: true },
        { id: 32, name: "水果", icon: "", productCount: 8, visible: true },
      ],
    },
    { id: 4, name: "农资", icon: "🧪", productCount: 10, visible: false },
  ])
  const [expanded, setExpanded] = useState<number[]>([2, 3])

  const toggleExpand = (id: number) => setExpanded(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  const toggleCatVisible = (id: number, parentId?: number) => {
    if (parentId) {
      setCategories(prev => prev.map(c => c.id === parentId
        ? { ...c, children: c.children?.map(ch => ch.id === id ? { ...ch, visible: !ch.visible } : ch) }
        : c))
    } else {
      setCategories(prev => prev.map(c => c.id === id ? { ...c, visible: !c.visible } : c))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-[13px] text-[#666]">设置店铺商品分类，支持两级分类结构</div>
        <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">
          <Plus className="w-3.5 h-3.5" />添加分类
        </button>
      </div>

      <div className="border border-[#e8edf5] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f5f7fa] text-[12px] text-[#666] font-semibold">
              <th className="px-4 py-2.5 text-left w-8"></th>
              <th className="px-4 py-2.5 text-left">分类名称</th>
              <th className="px-4 py-2.5 text-left">商品数量</th>
              <th className="px-4 py-2.5 text-left">显示状态</th>
              <th className="px-4 py-2.5 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <>
                <tr key={cat.id} className="border-t border-[#e8edf5] hover:bg-[#fafbfc]">
                  <td className="px-4 py-2.5">
                    {cat.children && (
                      <button onClick={() => toggleExpand(cat.id)} className="text-[#999] hover:text-[#1a5fa8]">
                        {expanded.includes(cat.id) ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{cat.icon}</span>
                      <span className="text-[13px] font-medium text-[#1a1a2e]">{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-[13px] text-[#666]">{cat.productCount} 件</td>
                  <td className="px-4 py-2.5">
                    <button
                      onClick={() => toggleCatVisible(cat.id)}
                      className={`relative w-9 h-5 rounded-full transition-colors ${cat.visible ? "bg-[#1a5fa8]" : "bg-[#dde3ec]"}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${cat.visible ? "translate-x-4" : "translate-x-0.5"}`} />
                    </button>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-3 text-[12px]">
                      <button className="text-[#1a5fa8] hover:underline">编辑</button>
                      {cat.children && <button className="text-[#0d8a4c] hover:underline">添加子分类</button>}
                      <button className="text-[#e53e3e] hover:underline">删除</button>
                    </div>
                  </td>
                </tr>
                {cat.children && expanded.includes(cat.id) && cat.children.map(child => (
                  <tr key={child.id} className="border-t border-[#e8edf5] bg-[#fafbfc]">
                    <td className="px-4 py-2"></td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2 pl-5 border-l-2 border-[#dde3ec]">
                        <span className="text-[13px] text-[#555]">{child.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-[13px] text-[#999]">{child.productCount} 件</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => toggleCatVisible(child.id, cat.id)}
                        className={`relative w-9 h-5 rounded-full transition-colors ${child.visible ? "bg-[#1a5fa8]" : "bg-[#dde3ec]"}`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${child.visible ? "translate-x-4" : "translate-x-0.5"}`} />
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-3 text-[12px]">
                        <button className="text-[#1a5fa8] hover:underline">编辑</button>
                        <button className="text-[#e53e3e] hover:underline">删除</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ─── 主页面 ─── */
type Tab = "theme" | "pages" | "nav" | "category"

export default function DecorationPage() {
  const [tab, setTab] = useState<Tab>("theme")

  const tabs: { key: Tab; label: string }[] = [
    { key: "theme",    label: "主题风格" },
    { key: "pages",    label: "页面管理" },
    { key: "nav",      label: "主导航栏" },
    { key: "category", label: "分类页"   },
  ]

  return (
    <div className="space-y-4">
      {/* 面包屑 */}
      <div className="text-[13px] text-[#999]">店铺装修</div>

      {/* Tab 栏 */}
      <div className="bg-white rounded-lg border border-[#e8edf5]">
        <div className="flex border-b border-[#e8edf5]">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-6 py-3 text-[14px] font-medium transition-colors border-b-2 -mb-px ${
                tab === t.key
                  ? "border-[#1a5fa8] text-[#1a5fa8]"
                  : "border-transparent text-[#666] hover:text-[#1a5fa8]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {tab === "theme"    && <ThemeTab />}
          {tab === "pages"    && <PageManageTab />}
          {tab === "nav"      && <MainNavTab />}
          {tab === "category" && <CategoryTab />}
        </div>
      </div>
    </div>
  )
}
