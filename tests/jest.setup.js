import { config } from '@vue/test-utils'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

// Create Vue app instance
const app = createApp({})

// Create i18n mock
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {}
  }
})

// Configure Vue Test Utils
config.global.plugins = [app, i18n]
config.global.mocks = {
  $t: (key) => key // Simple translation mock
}
