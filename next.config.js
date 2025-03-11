/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export'    // Use if deploying under a repo subpath
};

module.exports = nextConfig;