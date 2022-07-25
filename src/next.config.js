/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/v2',
  images: {
    loader: 'akamai',
    path: '',
  },
}

module.exports = nextConfig
