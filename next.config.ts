import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY
  },
  devIndicators: false

};

export default nextConfig;
