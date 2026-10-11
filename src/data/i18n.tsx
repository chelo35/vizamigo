/**
 * Backward compatibility bridge:
 * Re-exports the modular, scalable i18n architecture from /src/i18n
 */

export * from '../i18n';
export { I18nProvider as LanguageProvider } from '../i18n';
export type { AppTranslations as Translations } from '../i18n/types';
export { LOCALES as TRANSLATIONS } from '../i18n';
