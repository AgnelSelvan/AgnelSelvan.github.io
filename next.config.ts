import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'personal_website'; // TODO: Update this to your repository name

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If you are deploying to username.github.io/repo-name,
  // set basePath to /repo-name. If deploying to custom domain, leave empty.
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
};

export default nextConfig;
