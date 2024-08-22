// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: false,

// };

// export default nextConfig;


import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};

export default nextConfig;

