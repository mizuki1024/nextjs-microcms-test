import { NextConfig } from "next";

/** 
 * @type {import('next').NextConfig} 
 * Next.jsの設定ファイル
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // 許可する外部画像のプロトコル
        protocol: "https", 
        // 許可する外部画像のホスト名
        hostname: "images.microcms-assets.io",
      },
    ],
  },
};

export default nextConfig;
