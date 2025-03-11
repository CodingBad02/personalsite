/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath: '/personalsite',       // Use if deploying under a repo subpath
  assetPrefix: '/personalsite/',    // Use if deploying under a repo subpath
};

module.exports = nextConfig;