/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.microcms-assets.io"], // ✅ microCMS の画像ホストを許可
    deviceSizes: [320, 420, 768, 1024, 1200], // ✅ 画像サイズの制限
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // ✅ 許可する画像サイズ
    formats: ["image/avif", "image/webp"], // ✅ 画像フォーマットを指定（最適化）
  },
};

export default nextConfig;
