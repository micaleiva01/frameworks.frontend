/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: "/:path*",
          headers: [
            { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" },
            { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
            { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
            { key: "Access-Control-Allow-Credentials", value: "true" },
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  