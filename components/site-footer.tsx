import Link from "next/link"

const footerLinks = [
  {
    title: "关于平台",
    links: ["平台简介", "发展历程", "联系我们", "加入我们"],
  },
  {
    title: "业务中心",
    links: ["订单农业服务", "产销对接", "供销严选", "竞价交易"],
  },
  {
    title: "服务支持",
    links: ["帮助中心", "操作指南", "常见问题", "意见反馈"],
  },
  {
    title: "合规信息",
    links: ["用户协议", "隐私政策", "免责声明", "风险提示"],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-[#1a2d4a] text-white mt-12">
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="grid grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-1">
            <div className="text-[16px] font-bold mb-2 text-white leading-tight">
              粤供销公共型农产品<br />产地交易服务平台
            </div>
            <p className="text-[13px] text-gray-400 mt-3 leading-relaxed">
              整合粮食和重要农产品生产、加工、仓储、物流以及全程冷链、金融保险等全产业链资源，构建"源头直采+平台交易+产地直供"的产地供应链模式。
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-[14px] font-semibold text-white mb-3 pb-2 border-b border-white/20">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-[13px] text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
          <p className="text-[12px] text-gray-500">
            © 2025 粤供销公共型农产品产地交易服务平台 版权所有
          </p>
          <p className="text-[12px] text-gray-500">
            粤ICP备XXXXXXXX号 | 粤公网安备 XXXXXXXXXXXXXXXX号
          </p>
        </div>
      </div>
    </footer>
  )
}
