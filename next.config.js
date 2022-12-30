/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.cdc$/i,
      use: 'raw-loader',
    });

    return config;
  }
}

module.exports = nextConfig
