/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        // optional: match any path
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
