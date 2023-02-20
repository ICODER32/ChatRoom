/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'www.pngmart.com',
        port: '',
        pathname: '/files/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.britannica.com',
        port: '',
        pathname: '/45/**',
      },
    ],
  },
  experimental: {
    appDir: true
  }
}
// https://static.wixstatic.com/media/940aab_35ae0a50ad4148ed93917abf1239df11~mv2.png
