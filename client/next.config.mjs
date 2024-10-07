/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/vi/home',
        permanent: true,
        locale: false
      },
      {
        source: '/:lang(vi|en)',
        destination: '/:lang/home',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
