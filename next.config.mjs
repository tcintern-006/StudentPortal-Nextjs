/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

images: {
  remotePatterns: [
    { protocol: 'https', hostname: '**' }, // matches ANY https hostname
  ],
},
};

export default nextConfig;
