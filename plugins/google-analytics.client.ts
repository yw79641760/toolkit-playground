import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const id = config.public.googleAnalyticsId

  if (!id) {
    console.warn('Google Analytics ID not configured')
    return
  }

  // Create script element
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(script)

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
})