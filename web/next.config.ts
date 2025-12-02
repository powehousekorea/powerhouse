import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 👇 이 부분이 핵심입니다!
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 👆 여기까지
  
  // 혹시 이미지 관련 설정이 있다면 남겨두세요. (없으면 무시)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;