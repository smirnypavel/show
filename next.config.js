/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "fakestoreapi.com",
      "cdn-icons-png.flaticon.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "ldsound.info",
      "via.placeholder.com",
      "platform-lookaside.fbsbx.com",
    ],
  },
};

module.exports = nextConfig;
