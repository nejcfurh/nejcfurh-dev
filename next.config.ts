import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'graphql.app-api.prod.aws.mybirdbuddy.com',
      },
    ],
  },
};

export default nextConfig;
