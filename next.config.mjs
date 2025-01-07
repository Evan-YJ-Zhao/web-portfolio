/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['api', 'app', 'components', 'hooks', 'reducers', 'utils', '__tests__']
  }
};

export default nextConfig;
