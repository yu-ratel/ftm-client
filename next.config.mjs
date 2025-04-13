/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // 크로스 도메인 요청 허용
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: `${process.env.NEXT_PUBLIC_API_URL}/api/users/:path*`,
  //     },
  //   ];
  // },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
