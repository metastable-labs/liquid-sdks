/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["@liquid/react-sdk", "@liquid/web-sdk", "@liquid/core"],
};

module.exports = nextConfig;
