import { ComingSoon } from "@/components/coming-soon"

export default function Page() {
  return (
    <ComingSoon
      title="用户登录"
      description="登录功能正在开发中，敬请期待。"
      backHref="/portal"
      backLabel="返回首页"
    />
  )
}
