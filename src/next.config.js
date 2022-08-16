const env = {
  GRAPHQL_SERVER:
    "https://xhyntnjiffgmxfu7aux3ohr24q.appsync-api.eu-west-1.amazonaws.com/graphql",
};

const nextConfig = {
  reactStrictMode: false,
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
    path: "/",
  },
  env,
};

module.exports = nextConfig;
