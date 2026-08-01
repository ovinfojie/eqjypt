import { ComingSoon } from "@/components/coming-soon"

export default function Page() {
  return (
    <ComingSoon
      title="竞价交易"
      description="竞价交易模块正在设计开发中，将支持降价拍、升价拍、定购竞销等多种灵活交易模式，敬请期待。"
      backHref="/portal"
      backLabel="返回首页"
    />
  )
}
