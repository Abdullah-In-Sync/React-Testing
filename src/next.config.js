const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  basePath: "/v2",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/v2",
        basePath: false,
        permanent: false,
      },
    ];
  },
  images: {
    loader: "akamai",
    path: "/v2",
  },
};

module.exports = nextConfig;
