"use client"

import { useEffect } from "react"

/**
 * 全局捕获 unhandledrejection 事件，避免第三方库（如 @vercel/analytics）
 * 在非 Vercel 环境下产生的 Promise rejection 直接冒泡到控制台报错。
 */
export function PromiseErrorHandler() {
  useEffect(() => {
    const handler = (event: PromiseRejectionEvent) => {
      // 静默处理来自分析/追踪脚本的网络错误，不影响业务逻辑
      const reason = event.reason
      const msg = reason?.message ?? String(reason ?? "")
      const isAnalyticsError =
        msg.includes("va.vercel-scripts") ||
        msg.includes("vercel/analytics") ||
        msg.includes("Failed to fetch") ||
        msg.includes("NetworkError") ||
        msg.includes("Load failed")
      if (isAnalyticsError) {
        event.preventDefault()
      }
    }
    window.addEventListener("unhandledrejection", handler)
    return () => window.removeEventListener("unhandledrejection", handler)
  }, [])

  return null
}
