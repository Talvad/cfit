/** @type {import('next').NextConfig} */
const mediaHost = process.env.NEXT_PUBLIC_MEDIA_HOST; // e.g. d1234abcd.cloudfront.net

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: mediaHost ? [{ protocol: 'https', hostname: mediaHost }] : [],
  },
};

module.exports = nextConfig;
