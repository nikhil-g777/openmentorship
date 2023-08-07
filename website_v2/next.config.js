/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.licdn.com",
      },
    ],
  },
};

module.exports = nextConfig;
