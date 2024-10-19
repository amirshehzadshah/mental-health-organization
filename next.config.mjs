/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true, // Disable Next.js image optimization for static sites
    },
    reactStrictMode: true,
    distDir: 'dist',
};

export default nextConfig;
