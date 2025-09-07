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
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n'
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
  // i18n configuration
  i18n: {
    locales: [
      {
        code: 'zh-CN',
        name: '中文',
        file: 'zh-CN.json'
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      }
    ],
    lazy: true,
    langDir: './locales/', // Path is relative to the project root
    defaultLocale: 'zh-CN',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    // 添加配置以避免在URL中添加语言前缀
    strategy: 'no_prefix',
    // 禁用语言切换时的重定向
    skipSettingLocaleOnNavigate: true
  }
})