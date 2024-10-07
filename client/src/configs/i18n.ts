export const i18n = {
  defaultLocale: 'vi',
  locales: ['vi', 'en'],
  langDirection: {
    en: 'ltr',
    vi: 'ltr'
  }
} as const

export type Locale = (typeof i18n)['locales'][number]
