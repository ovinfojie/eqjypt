import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // 禁用开发模式 source map，大幅减少编译产物体积
  productionBrowserSourceMaps: false,
  // 避免重型服务端库被错误打包进客户端 bundle
  serverExternalPackages: [],
  experimental: {
    // 开启模块 ID 稳定性，减少 HMR 时的全量重编译
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
}

export default nextConfig
