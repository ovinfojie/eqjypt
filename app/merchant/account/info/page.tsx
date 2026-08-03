"use client"

import { useState } from "react"
import { CheckCircle2, X } from "lucide-react"

/* ── 认证状态四种 ── */
type AuthState = "未认证个人_未认证企业" | "已认证个人_未认证企业" | "已认证个人_认证基础企业" | "已认证个人_认证超级企业"

const AUTH_STATES: AuthState[] = [
  "未认证个人_未认证企业",
  "已认证个人_未认证企业",
  "已认证个人_认证基础企业",
  "已认证个人_认证超级企业",
]

const AUTH_STATE_LABELS: Record<AuthState, string> = {
  "未认证个人_未认证企业":   "未认证个人、未认证企业",
  "已认证个人_未认证企业":   "已认证个人、未认证企业",
  "已认证个人_认证基础企业": "已认证个人、认证基础企业",
  "已认证个人_认证超级企业": "已认证个人、认证超级企业",
}

/* ── 企业信息行 ── */
type EnterpriseRow = {
  name: string; type: string; role: string; status: string; createdAt: string
  ops: Array<"查看" | "编辑" | "禁用" | "查看认证">
}

const ENTERPRISE_DATA: Record<AuthState, EnterpriseRow[]> = {
  "未认证个人_未认证企业": [],
  "已认证个人_未认证企业": [],
  "已认证个人_认证基础企业": [
    { name: "广东供销数字科技有限公司", type: "超级企业", role: "企业管理员", status: "启用", createdAt: "2026-05-22 14:15:30", ops: ["查看", "编辑", "禁用"] },
    { name: "南雄市社村合作农业发展有限公司", type: "基础企业", role: "企业员工", status: "启用", createdAt: "2026-05-23 10:45:22", ops: ["查看"] },
  ],
  "已认证个人_认证超级企业": [
    { name: "广东供销数字科技有限公司", type: "超级企业", role: "企业管理员", status: "启用", createdAt: "2026-05-22 14:15:30", ops: ["查看", "编辑", "禁用"] },
    { name: "南雄市社村合作农业发展有限公司", type: "基础企业", role: "企业员工", status: "启用", createdAt: "2026-05-23 10:45:22", ops: ["查看"] },
  ],
}

/* ── 签章认证行 ── */
type SealRow = { user: string; type: string; sealStatus: string; autoStatus: string; singleStatus: string }
const SEAL_DATA: Record<AuthState, SealRow[]> = {
  "未认证个人_未认证企业": [],
  "已认证个人_未认证企业": [
    { user: "吴珍", type: "个人认证", sealStatus: "已认证", autoStatus: "已授权", singleStatus: "已授权" },
  ],
  "已认证个人_认证基础企业": [
    { user: "吴珍", type: "个人认证", sealStatus: "已认证", autoStatus: "已授权", singleStatus: "已授权" },
    { user: "广东供销数字科技有限公司", type: "企业认证", sealStatus: "未认证", autoStatus: "未授权", singleStatus: "未授权" },
  ],
  "已认证个人_认证超级企业": [
    { user: "吴珍", type: "个人认证", sealStatus: "已认证", autoStatus: "已授权", singleStatus: "已授权" },
    { user: "广东供销数字科技有限公司", type: "企业认证", sealStatus: "已认证", autoStatus: "已授权", singleStatus: "已授权" },
  ],
}

/* ── 个人实名信息弹窗 ── */
function PersonalAuthModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-lg w-[520px] shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
          <h3 className="text-[15px] font-bold text-[#1a1a2e]">查看个人实名认证信息</h3>
          <button onClick={onClose} className="text-[#999] hover:text-[#333]"><X className="w-5 h-5" /></button>
        </div>
        <div className="px-6 py-5 space-y-3 text-[13px]">
          <div className="flex gap-2"><span className="text-[#6b7c93] w-24 shrink-0">姓名：</span><span className="text-[#1a1a2e] font-medium">吴珍</span></div>
          <div className="flex gap-2"><span className="text-[#6b7c93] w-24 shrink-0">身份证号：</span><span className="text-[#1a1a2e]">46000********5633</span></div>
          <div className="flex gap-2"><span className="text-[#6b7c93] w-24 shrink-0">身份证有效期：</span><span className="text-[#1a1a2e]">2021-02-2031-02</span></div>
          <div className="flex gap-2"><span className="text-[#6b7c93] w-24 shrink-0">认证时间：</span><span className="text-[#1a1a2e]">2026-05-22 14:15:30</span></div>
          <div>
            <div className="text-[#6b7c93] mb-2">身份证照片：</div>
            <div className="flex gap-4">
              {["人像面", "国徽面"].map(label => (
                <div key={label} className="text-center">
                  <div className="w-36 h-24 bg-[#e8edf5] rounded border border-[#dde3ec] flex items-center justify-center text-[#aaa] text-[12px]">图片示意</div>
                  <div className="text-[12px] text-[#6b7c93] mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end px-6 py-4 border-t border-[#e8edf5]">
          <button onClick={onClose} className="px-6 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">关闭</button>
        </div>
      </div>
    </div>
  )
}

/* ── 企业认证信息弹窗 ── */
function EnterpriseAuthModal({ name, onClose }: { name: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-lg w-[580px] max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf5]">
          <h3 className="text-[15px] font-bold text-[#1a1a2e]">查看企业认证信息</h3>
          <button onClick={onClose} className="text-[#999] hover:text-[#333]"><X className="w-5 h-5" /></button>
        </div>
        <div className="px-6 py-5 space-y-3 text-[13px]">
          {[
            ["企业名称：", name],
            ["统一社会信用代码：", "91440000024436087"],
            ["注册资本(万元)：", "26162.84"],
            ["营业执照：", "——"],
            ["成立日期：", "2009-08-04"],
            ["营业执照期限：", "有期限"],
            ["经营范围：", "有机、无机化肥批发零售；经营互联网上粮食、农产品、农具、水产、仓储香料、干鲜蔬果、食品、粮油管理、仓储、供应链管理……"],
            ["法人姓名：", "张恒"],
            ["法人证件号：", "150275Z392"],
            ["法人手机号：", "46000829811016222"],
            ["营业执照签子：", "2021-03-03"],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-2">
              <span className="text-[#6b7c93] shrink-0 w-40">{label}</span>
              <span className="text-[#1a1a2e]">{value}</span>
            </div>
          ))}
          <div>
            <div className="text-[#6b7c93] mb-2">营业执照图片：</div>
            <div className="w-32 h-20 bg-[#e8edf5] rounded border border-[#dde3ec] flex items-center justify-center text-[#aaa] text-[12px]">图片示意</div>
          </div>
          <div>
            <div className="text-[#6b7c93] mb-2">法人身份证：</div>
            <div className="flex gap-4">
              {["人像面", "国徽面"].map(label => (
                <div key={label} className="text-center">
                  <div className="w-32 h-20 bg-[#e8edf5] rounded border border-[#dde3ec] flex items-center justify-center text-[#aaa] text-[12px]">图片示意</div>
                  <div className="text-[12px] text-[#6b7c93] mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end px-6 py-4 border-t border-[#e8edf5]">
          <button onClick={onClose} className="px-6 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">关闭</button>
        </div>
      </div>
    </div>
  )
}

export default function AccountInfoPage() {
  const [authState, setAuthState] = useState<AuthState>("已认证个人_认证超级企业")
  const [showPersonalModal, setShowPersonalModal] = useState(false)
  const [enterpriseModal, setEnterpriseModal] = useState<string | null>(null)

  const isPersonalAuth = authState !== "未认证个人_未认证企业"
  const enterpriseRows = ENTERPRISE_DATA[authState]
  const sealRows = SEAL_DATA[authState]

  return (
    <div className="space-y-5">
      {/* 状态切换器 */}
      <div className="bg-[#fff8e6] border border-[#f5d78e] rounded-lg px-5 py-3 flex items-center gap-3 flex-wrap">
        <span className="text-[12px] text-[#8a6a00] font-medium shrink-0">认证状态演示切换：</span>
        {AUTH_STATES.map(s => (
          <button
            key={s}
            onClick={() => setAuthState(s)}
            className={`px-3 py-1 rounded text-[12px] border transition-colors ${
              authState === s
                ? "bg-[#1a5fa8] text-white border-[#1a5fa8]"
                : "bg-white text-[#555] border-[#dde3ec] hover:border-[#1a5fa8] hover:text-[#1a5fa8]"
            }`}
          >
            {AUTH_STATE_LABELS[s]}
          </button>
        ))}
      </div>

      {/* 基本信息 */}
      <div className="bg-white rounded-lg border border-[#e8edf5]">
        <div className="px-6 py-4 border-b border-[#f0f4f8]">
          <span className="text-[15px] font-bold text-[#1a1a2e]">基本信息</span>
        </div>
        <div className="px-8 py-6">
          <div className="flex items-start gap-6">
            {/* 头像 */}
            <div className="w-14 h-14 rounded-full bg-[#dde3ec] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 40 40" className="w-10 h-10 text-[#aaa]" fill="currentColor">
                <circle cx="20" cy="14" r="7" />
                <path d="M4 36c0-8.837 7.163-16 16-16s16 7.163 16 16" />
              </svg>
            </div>
            {/* 信息网格 */}
            <div className="flex-1 grid grid-cols-3 gap-x-8 gap-y-4 text-[13px]">
              <div className="flex items-center gap-2">
                <span className="text-[#6b7c93]">用户名：</span>
                <span className="text-[#1a1a2e] font-medium">吴珍</span>
                {isPersonalAuth ? (
                  <span className="flex items-center gap-1 px-1.5 py-0.5 bg-[#e8f4fd] text-[#1a5fa8] text-[11px] rounded border border-[#b8d9f5]">
                    <CheckCircle2 className="w-3 h-3" /> 已实名认证
                  </span>
                ) : (
                  <button className="px-2 py-0.5 bg-[#1a5fa8] text-white text-[11px] rounded hover:bg-[#0d4a8a] transition-colors">
                    去认证
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#6b7c93]">认证企业名称：</span>
                <span className="text-[#1a1a2e]">
                  {authState.includes("基础企业") || authState.includes("超级企业")
                    ? "广东供销数字科技有限公司"
                    : "-"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#6b7c93]">登录账号：</span>
                <span className="text-[#1a1a2e]">178****7980</span>
                <button className="text-[#1a5fa8] text-[12px] hover:underline">修改</button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#6b7c93]">联系邮箱：</span>
                <span className="text-[#1a1a2e]">1687118382@qq.com</span>
                <button className="text-[#1a5fa8] text-[12px] hover:underline">修改</button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#6b7c93]">登录密码：</span>
                <span className="text-[#1a1a2e]">已设置，建议定期更换</span>
                <button className="text-[#1a5fa8] text-[12px] hover:underline">修改</button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#6b7c93] shrink-0">注册时间：</span>
                <span className="text-[#1a1a2e]">2024-03-15 09:30:57</span>
              </div>
              <div className="flex items-center gap-2 col-start-2">
                <span className="text-[#6b7c93] shrink-0">最后登录：</span>
                <span className="text-[#1a1a2e]">2026-06-10 09:30:57</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 企业信息 */}
      <div className="bg-white rounded-lg border border-[#e8edf5]">
        <div className="px-6 py-4 border-b border-[#f0f4f8]">
          <span className="text-[15px] font-bold text-[#1a1a2e]">企业信息</span>
        </div>
        {enterpriseRows.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-4">
            <svg viewBox="0 0 80 80" className="w-20 h-20 text-[#dde3ec]" fill="currentColor">
              <rect x="10" y="20" width="60" height="50" rx="4" opacity="0.4" />
              <rect x="18" y="10" width="44" height="55" rx="4" opacity="0.7" />
              <rect x="26" y="26" width="28" height="3" rx="1.5" opacity="0.5" />
              <rect x="26" y="34" width="20" height="3" rx="1.5" opacity="0.5" />
              <rect x="26" y="42" width="24" height="3" rx="1.5" opacity="0.5" />
            </svg>
            <div className="text-center">
              <div className="text-[15px] font-semibold text-[#444]">您还未认证企业</div>
              <div className="text-[13px] text-[#999] mt-1">
                认证后您将作为认证用户参与平台交易。<br />
                如：商城下单、参与竞拍、订单农业、询价交易。
              </div>
            </div>
            <button className="px-8 py-2 bg-[#1a5fa8] text-white text-[14px] rounded hover:bg-[#0d4a8a] transition-colors">
              立即认证
            </button>
          </div>
        ) : (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#f5f7fa] text-[#6b7c93]">
                {["企业名称", "企业类型", "身份", "状态", "创建时间", "操作"].map(h => (
                  <th key={h} className="px-5 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f8]">
              {enterpriseRows.map((row, i) => (
                <tr key={i} className="hover:bg-[#fafbfc]">
                  <td className="px-5 py-3 text-[#1a1a2e]">{row.name}</td>
                  <td className="px-5 py-3 text-[#555]">{row.type}</td>
                  <td className="px-5 py-3 text-[#555]">{row.role}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 bg-[#e6f9f0] text-[#16a34a] text-[12px] rounded">{row.status}</span>
                  </td>
                  <td className="px-5 py-3 text-[#999]">{row.createdAt}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      {row.ops.map(op => (
                        <button
                          key={op}
                          onClick={() => op === "查看" || op === "查看认证" ? setEnterpriseModal(row.name) : undefined}
                          className={`text-[12px] hover:underline ${op === "禁用" ? "text-[#e8831a]" : "text-[#1a5fa8]"}`}
                        >
                          {op === "查看认证" ? "查看" : op}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 签章认证 */}
      {sealRows.length > 0 && (
        <div className="bg-white rounded-lg border border-[#e8edf5]">
          <div className="px-6 py-4 border-b border-[#f0f4f8]">
            <span className="text-[15px] font-bold text-[#1a1a2e]">签章认证</span>
          </div>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#f5f7fa] text-[#6b7c93]">
                {["认证用户/机构", "认证类型", "签章认证状态", "自动章状态", "签章单章状态", "操作"].map(h => (
                  <th key={h} className="px-5 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f8]">
              {sealRows.map((row, i) => {
                const isAuth = row.sealStatus === "已认证"
                return (
                  <tr key={i} className="hover:bg-[#fafbfc]">
                    <td className="px-5 py-3 text-[#1a1a2e]">{row.user}</td>
                    <td className="px-5 py-3 text-[#555]">{row.type}</td>
                    <td className="px-5 py-3">
                      <span className={`text-[12px] px-2 py-0.5 rounded ${isAuth ? "bg-[#e6f9f0] text-[#16a34a]" : "bg-[#fef3e2] text-[#e8831a]"}`}>
                        {row.sealStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[12px] px-2 py-0.5 rounded ${row.autoStatus === "已授权" ? "bg-[#e6f9f0] text-[#16a34a]" : "bg-[#f0f4f8] text-[#999]"}`}>
                        {row.autoStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[12px] px-2 py-0.5 rounded ${row.singleStatus === "已授权" ? "bg-[#e6f9f0] text-[#16a34a]" : "bg-[#f0f4f8] text-[#999]"}`}>
                        {row.singleStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {isAuth ? (
                        <button
                          onClick={() => row.type === "个人认证" ? setShowPersonalModal(true) : setEnterpriseModal(row.user)}
                          className="text-[#1a5fa8] text-[12px] hover:underline"
                        >
                          查看
                        </button>
                      ) : (
                        <button className="text-[#1a5fa8] text-[12px] hover:underline">签章认证</button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {/* 未设置签章提示 */}
          {authState === "已认证个人_认证基础企业" && (
            <div className="mx-5 my-3 px-4 py-3 bg-[#fff8e6] border border-[#f5d78e] rounded flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#e8831a] text-white text-[11px] font-bold flex items-center justify-center shrink-0">!</span>
              <span className="text-[13px] text-[#8a6a00]">未必须签署警告：设置签章密钥才能签发已批准签发</span>
              <button className="ml-auto px-4 py-1.5 bg-[#1a5fa8] text-white text-[12px] rounded hover:bg-[#0d4a8a] transition-colors shrink-0">
                去设置签章
              </button>
            </div>
          )}
        </div>
      )}

      {/* 弹窗 */}
      {showPersonalModal && <PersonalAuthModal onClose={() => setShowPersonalModal(false)} />}
      {enterpriseModal && <EnterpriseAuthModal name={enterpriseModal} onClose={() => setEnterpriseModal(null)} />}
    </div>
  )
}
