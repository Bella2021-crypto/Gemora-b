/** @type {import('next').NextConfig} */
module.exports={reactStrictMode:true,images:{remotePatterns:[{protocol:'https',hostname:'**'}]}};
// next.config.js
module.exports = {
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false, // 👈 tells Webpack to ignore fs on client
    };
    return config;
  },
};
