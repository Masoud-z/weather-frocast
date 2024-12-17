/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.weatherbit.io",
        pathname: "/static/img/icons/**",
      },
    ],
  },
};

export default nextConfig;
