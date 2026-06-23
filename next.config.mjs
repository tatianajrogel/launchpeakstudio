/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'd64gsuwffb70l.cloudfront.net' },
    ],
  },
};

export default nextConfig;
