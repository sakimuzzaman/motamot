const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Disable image optimization
    domains: ['admin.motamot.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.motamot.io',
        pathname: '/poll_images/**',
      },
    ],
  },
};
export default nextConfig;
