import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['127.0.0.1'], // ここに許可するホスト名を追加。storageローカルのホスト追加
  },
};

export default nextConfig;
