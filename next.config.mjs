/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ["storage.googleapis.com", "coinpayments.net"],
    minimumCacheTTL: 1500000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: '"storage.googleapis.com"',
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "coinpayments.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "mir-s3-cdn-cf.behance.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.mds.yandex.net",
        pathname: "**",
      },
    ],
  },
  compiler: {
    removeConsole: false,
  },
};

export default nextConfig;
