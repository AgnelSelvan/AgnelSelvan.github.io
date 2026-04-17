import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = ''; // Repository name is AgnelSelvan.github.io, so it's a root domain.

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // For AgnelSelvan.github.io, basePath should be empty as it's the root domain.
  basePath: isProd ? (repoName ? `/${repoName}` : '') : '',
  assetPrefix: isProd ? (repoName ? `/${repoName}/` : '') : '',
  trailingSlash: true,
};

export default nextConfig;
