/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Configuração para imagens otimizadas na Vercel
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  // Compressão para melhor performance
  compress: true,
  // Otimizações para Vercel
  poweredByHeader: false,
}

module.exports = nextConfig
