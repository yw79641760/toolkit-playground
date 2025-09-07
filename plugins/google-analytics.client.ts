import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const id = config.public.googleAnalyticsId

  if (!id) {
    console.warn('Google Analytics ID not configured')
    return
  }

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  
  function gtag() {
    // @ts-ignore
    dataLayer.push(arguments)
  }
  
  // @ts-ignore
  window.gtag = gtag
  
  gtag('js', new Date())
  gtag('config', id)
  
  // 添加路由变化跟踪
  const router = useRouter()
  router.afterEach((to) => {
    gtag('config', id, {
      page_path: to.fullPath,
    })
  })
})