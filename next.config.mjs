/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.dropbox.com",
      },
      {
        protocol: "https",
        hostname: "tastic.s3.amazonaws.com",
      },
      {
        protocol: "http",
        hostname: "10.10.0.254",
      },
    ],
  },
};

export default nextConfig;
