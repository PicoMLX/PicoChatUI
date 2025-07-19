const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

const withPWA = require("next-pwa")({
  dest: "public"
})

module.exports = withBundleAnalyzer(
  withPWA({
    reactStrictMode: true,
    output: 'export',
    trailingSlash: true,
    experimental: {
      excludeDefaultMomentLocales: false,
    },
    webpack: (config, { isServer }) => {
      // Exclude backend-reference directory from build
      config.resolve.alias = {
        ...config.resolve.alias,
        '@/backend-reference': false,
      }
      return config
    },
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: "http",
          hostname: "localhost"
        },
        {
          protocol: "http",
          hostname: "127.0.0.1"
        },
        {
          protocol: "https",
          hostname: "**"
        }
      ]
    },
    serverExternalPackages: ["sharp", "onnxruntime-node"]
  })
)
