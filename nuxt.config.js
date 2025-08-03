// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // Отключаем SSR для виджета
  ssr: false,

  // Настройки роутера
  router: {
    options: {
      mode: 'hash'
    }
  },

  // Модули
  modules: [
    '@pinia/nuxt'
  ],

  // CSS
  css: ['~/widgets/org-chart/assets/css/main.css'],

  // Плагины
  plugins: [],

  // Настройки сборки
  build: {
    transpile: ['@heroicons/vue']
  },

  // Настройки приложения
  app: {
    head: {
      title: 'Organization Chart Widget',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Organization Chart Widget' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Nitro настройки
  nitro: {
    compatibilityDate: '2025-08-04'
  }
})
