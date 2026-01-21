import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   experimental: {
    serverActions: {
      bodySizeLimit: '4mb',
    },
    
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jbkztfnqiynralakdpqa.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  
};

export default nextConfig;
