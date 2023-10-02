/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "fakestoreapi.com",
      "cdn-icons-png.flaticon.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "ldsound.info",
    ],
  },
};

module.exports = nextConfig;
