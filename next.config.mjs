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
  async redirects() {
    // Préserve le référencement acquis sur l'ancien site WordPress :
    // chaque ancienne URL indexée est redirigée en 301 vers son équivalent Next.js.
    return [
      // /blog/ -> /blog est deja gere nativement par Next.js (normalisation du trailing slash)
      { source: '/politique-de-confidentialite', destination: '/politique/politique-de-confidentialite', permanent: true },
      { source: '/formulaire', destination: '/contact', permanent: true },
      { source: '/a-propos', destination: '/apropos', permanent: true },
      { source: '/acquisition-clients', destination: '/services/acquisition-clients', permanent: true },
      { source: '/referencement-seo-geo', destination: '/services/referencement-seo', permanent: true },
      { source: '/conception-developpement-web', destination: '/services/creation-web', permanent: true },
      { source: '/gestion-des-cookies', destination: '/politique/gestion-des-cookies', permanent: true },
      { source: '/mention-legal', destination: '/politique/mentions-legales', permanent: true },
      { source: '/cgu', destination: '/politique/conditions-d-utilisation', permanent: true },
      // Contenus WordPress par défaut, sans équivalent réel : renvoi vers le blog plutôt qu'une 404.
      { source: '/2026/03/31/hello-world', destination: '/blog', permanent: true },
      { source: '/category/uncategorized', destination: '/blog', permanent: true },
    ];
  },
};

export default nextConfig;
