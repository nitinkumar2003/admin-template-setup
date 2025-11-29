'use client';

import { localization_keys_name } from '@/constant/constant_keys';
import { IsObject } from '@/utils/commonUtils';
import { useTranslations, useLocale } from 'next-intl';
export const useLocaleTranslation = (namespace?: string) => {
  const t = useTranslations(namespace);

  const t_commmon = useTranslations(localization_keys_name.common);
  const t_validation = useTranslations(localization_keys_name.validation);
  const t_signIn = useTranslations(localization_keys_name.signIn);
  const t_placeholder = useTranslations(localization_keys_name.placeholders);
  const t_errors = useTranslations(localization_keys_name.errors);
  const t_sidebar = useTranslations(localization_keys_name.sidebar);
  const t_are_you_sure = useTranslations(localization_keys_name.are_you_sure);
  const lang = useLocale();

  const returnCurrentLocale = (obj: any) => {
    if (IsObject(obj)) {
      return obj[lang as string] || obj['en'];
    }
    return obj ? obj : ''

  };


  return { t, t_commmon, t_validation, t_signIn, t_are_you_sure, returnCurrentLocale, t_placeholder, lang, t_errors, t_sidebar };
};
