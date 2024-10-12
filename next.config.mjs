// @ts-check
 
/**
 * @type {import('next').NextConfig}*/
const nextConfig = {
  compress: true,
  webpack: (config, { isServer }) => {
    config.externals = [...config.externals, { canvas: "canvas" }]; // required to make Konva & react-konva work
    config.resolve.fallback = {
      fs: false,
      path: false,
    };
    if (!isServer) {
      config.externals.push({
        bufferutil: "bufferutil",
        "utf-8-validate": "utf-8-validate",
        "supports-color": "supports-color",
      });
    }
    return config;
  },
  reactStrictMode: true,
}
 
export default nextConfig