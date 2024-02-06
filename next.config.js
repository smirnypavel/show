/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        // pathname: '/account123/**',
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
        // pathname: '/account123/**',
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        // pathname: '/account123/**',
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        // pathname: '/account123/**',
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        // pathname: '/account123/**',
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
        port: "",
        // pathname: '/account123/**',
      },
    ],
  },

  // remotePatterns: [
  //   "https://fakestoreapi.com/*",
  //   "https://cdn-icons-png.flaticon.com/*",
  //   "https://lh3.googleusercontent.com/*",
  //   "https://res.cloudinary.com/*",
  //   "https://ldsound.info/*",
  //   "https://via.placeholder.com/*",
  //   "https://platform-lookaside.fbsbx.com/*",
  // ],
};

module.exports = nextConfig;
