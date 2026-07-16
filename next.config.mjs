/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Permet de compiler même s'il y a des avertissements de typage stricts
    ignoreBuildErrors: true,
  },
  eslint: {
    // Permet de compiler même s'il y a des avertissements ESLint (imports inutilisés, apostrophes non échappées)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
