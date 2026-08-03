"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Upload, Building2, MapPin, User, CheckCircle } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const STEPS = ["填写基本信息", "完善企业信息", "等待审核"]

const PROVINCES = ["广东省", "广西壮族自治区", "湖南省", "湖北省", "福建省", "浙江省"]
const CITIES: Record<string, string[]> = {
  "广东省": ["广州市", "深圳市", "佛山市", "东莞市", "中山市", "珠海市", "江门市", "肇庆市", "清远市", "韶关市"],
  "广西壮族自治区": ["南宁市", "桂林市", "柳州市"],
}
const BIZ_TYPES = ["农业龙头企业", "农民专业合作社", "家庭农场", "农业企业", "国有企业", "机关单位", "学校", "企事业单位", "其他"]
const CATEGORIES = ["粮油副食", "蔬菜水果", "肉禽蛋奶", "海鲜水产", "干货调味", "特色农产品", "有机农产品"]

export default function RegisterCompletePage() {
  const router = useRouter()
  const [companyName, setCompanyName] = useState("")
  const [creditCode, setCreditCode] = useState("")
  const [bizType, setBizType] = useState("")
  const [province, setProvince] = useState("")
  const [city, setCity] = useState("")
  const [address, setAddress] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [selectedCats, setSelectedCats] = useState<string[]>([])
  const [licenseUploaded, setLicenseUploaded] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const toggleCat = (cat: string) => {
    setSelectedCats(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="max-w-[480px] w-full bg-white rounded-xl shadow-md px-8 py-10 text-center">
            {/* Steps */}
            <div className="flex items-center justify-center mb-8">
              {STEPS.map((step, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold border-2 ${
                      i < 2 ? "bg-[#3a8c3f] border-[#3a8c3f] text-white" : "bg-[#1a5fa8] border-[#1a5fa8] text-white"
                    }`}>
                      {i < 2 ? <CheckCircle className="w-4 h-4" /> : i + 1}
                    </div>
                    <span className={`text-[12px] whitespace-nowrap ${i === 2 ? "text-[#1a5fa8] font-medium" : "text-[#3a8c3f]"}`}>{step}</span>
                  </div>
                  {i < STEPS.length - 1 && <div className="w-20 h-px bg-[#3a8c3f] mx-3 mb-5" />}
                </div>
              ))}
            </div>

            <div className="w-16 h-16 rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-9 h-9 text-[#3a8c3f]" />
            </div>
            <h2 className="text-[20px] font-bold text-[#1a1a2e] mb-2">注册申请已提交</h2>
            <p className="text-[14px] text-[#6b7c93] mb-1">平台将在 <span className="text-[#1a5fa8] font-medium">1-3 个工作日</span> 内完成审核</p>
            <p className="text-[13px] text-[#6b7c93] mb-6">审核结果将以短信形式通知您，请保持手机畅通</p>

            <div className="bg-[#f5f7fa] rounded-lg p-4 mb-6 text-left space-y-2">
              <div className="flex items-center gap-2 text-[13px]">
                <div className="w-2 h-2 rounded-full bg-[#3a8c3f]" />
                <span className="text-[#333]">资质审核：平台运营人员将核验营业执照真实性</span>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <div className="w-2 h-2 rounded-full bg-[#3a8c3f]" />
                <span className="text-[#333]">审核通过后可登录平台开展业务</span>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <div className="w-2 h-2 rounded-full bg-[#e8831a]" />
                <span className="text-[#333]">如有疑问请拨打客服热线：400-000-0000</span>
              </div>
            </div>

            <Link
              href="/portal"
              className="block w-full py-3 bg-[#1a5fa8] text-white text-[15px] font-semibold rounded-lg hover:bg-[#0d4a8a] transition-colors"
            >
              返回平台首页
            </Link>
            <Link href="/portal/login" className="block text-center text-[13px] text-[#1a5fa8] hover:underline mt-3">
              前往登录
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1 py-10 px-4">
        <div className="max-w-[600px] mx-auto">
          {/* Steps */}
          <div className="flex items-center justify-center mb-8">
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold border-2 ${
                    i === 0 ? "bg-[#3a8c3f] border-[#3a8c3f] text-white"
                    : i === 1 ? "bg-[#1a5fa8] border-[#1a5fa8] text-white"
                    : "bg-white border-border text-[#6b7c93]"
                  }`}>
                    {i === 0 ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-[12px] whitespace-nowrap ${
                    i === 1 ? "text-[#1a5fa8] font-medium" : i === 0 ? "text-[#3a8c3f]" : "text-[#6b7c93]"
                  }`}>{step}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-20 h-px mx-3 mb-5 ${i === 0 ? "bg-[#3a8c3f]" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-md px-8 py-7">
            <h2 className="text-[18px] font-bold text-[#1a1a2e] mb-5">完善企业信息</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Section: 企业基本信息 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-4 h-4 text-[#1a5fa8]" />
                  <span className="text-[14px] font-semibold text-[#1a1a2e]">企业基本信息</span>
                </div>
                <div className="space-y-3 pl-6">
                  <div>
                    <label className="block text-[13px] text-[#333] mb-1.5">企业名称 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="请输入营业执照上的企业全称"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full border border-border rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-[#1a5fa8] transition-colors placeholder:text-[#bbb]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#333] mb-1.5">统一社会信用代码 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="18位统一社会信用代码"
                      value={creditCode}
                      onChange={(e) => setCreditCode(e.target.value)}
                      maxLength={18}
                      className="w-full border border-border rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-[#1a5fa8] transition-colors placeholder:text-[#bbb] font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#333] mb-1.5">企业类型 <span className="text-red-500">*</span></label>
                    <div className="flex flex-wrap gap-2">
                      {BIZ_TYPES.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setBizType(t)}
                          className={`px-3 py-1.5 text-[13px] rounded-full border transition-colors ${
                            bizType === t
                              ? "bg-[#1a5fa8] text-white border-[#1a5fa8]"
                              : "text-[#333] border-border hover:border-[#1a5fa8]"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: 地址信息 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-[#1a5fa8]" />
                  <span className="text-[14px] font-semibold text-[#1a1a2e]">注册地址</span>
                </div>
                <div className="space-y-3 pl-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[13px] text-[#333] mb-1.5">省份 <span className="text-red-500">*</span></label>
                      <select
                        value={province}
                        onChange={(e) => { setProvince(e.target.value); setCity("") }}
                        className="w-full border border-border rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-[#1a5fa8] transition-colors bg-white"
                        required
                      >
                        <option value="">请选择省份</option>
                        {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[13px] text-[#333] mb-1.5">城市 <span className="text-red-500">*</span></label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full border border-border rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-[#1a5fa8] transition-colors bg-white"
                        required
                      >
                        <option value="">请选择城市</option>
                        {(CITIES[province] || []).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#333] mb-1.5">详细地址 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="区/县 + 街道/乡镇 + 门牌号"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full border border-border rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-[#1a5fa8] transition-colors placeholder:text-[#bbb]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section: 联系人 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-[#1a5fa8]" />
                  <span className="text-[14px] font-semibold text-[#1a1a2e]">平台对接联系人</span>
                </div>
                <div className="grid grid-cols-2 gap-3 pl-6">
                  <div>
                    <label className="block text-[13px] text-[#333] mb-1.5">联系人姓名 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="请输入姓名"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full border border-border rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-[#1a5fa8] transition-colors placeholder:text-[#bbb]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#333] mb-1.5">联系电话 <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      placeholder="请输入联系电话"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full border border-border rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-[#1a5fa8] transition-colors placeholder:text-[#bbb]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 主营品类 */}
              <div>
                <label className="block text-[13px] text-[#333] mb-2 font-medium">主营品类（可多选）</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCat(cat)}
                      className={`px-3 py-1.5 text-[13px] rounded-full border transition-colors ${
                        selectedCats.includes(cat)
                          ? "bg-[#3a8c3f] text-white border-[#3a8c3f]"
                          : "text-[#333] border-border hover:border-[#3a8c3f]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 营业执照上传 */}
              <div>
                <label className="block text-[13px] text-[#333] mb-1.5 font-medium">营业执照 <span className="text-red-500">*</span></label>
                <button
                  type="button"
                  onClick={() => setLicenseUploaded(true)}
                  className={`w-full h-[100px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 transition-colors ${
                    licenseUploaded
                      ? "border-[#3a8c3f] bg-[#e8f5e9]"
                      : "border-border hover:border-[#1a5fa8] bg-[#f5f7fa]"
                  }`}
                >
                  {licenseUploaded ? (
                    <>
                      <CheckCircle className="w-6 h-6 text-[#3a8c3f]" />
                      <span className="text-[13px] text-[#3a8c3f] font-medium">已上传营业执照</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-[#6b7c93]" />
                      <span className="text-[13px] text-[#6b7c93]">点击上传营业执照扫描件</span>
                      <span className="text-[11px] text-[#999]">支持 JPG / PNG / PDF，不超过 10MB</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1a5fa8] text-white text-[15px] font-semibold rounded-lg hover:bg-[#0d4a8a] transition-colors"
              >
                提交注册申请
              </button>
            </form>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
