// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  // 添加构建配置以解决可能的构建问题
  build: {
    transpile: []
  },
  // 添加modules配置
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  app: {
    head: {
      link: [
        { 
          rel: 'icon', 
          type: 'image/x-icon', 
          href: '/favicon.ico' 
        }
      ]
    }
  },
  // 添加插件配置
  plugins: [
    '~/plugins/i18n.ts'
  ]

})