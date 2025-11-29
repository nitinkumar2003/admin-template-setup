'use client';

import { NextIntlClientProvider } from 'next-intl';
import React, { ReactNode } from 'react';
import { useLocalization } from '@/hooks/useLocalization';

interface LocalizationProviderProps {
  children: ReactNode;
}

export default function LocalizationProvider({ children }: LocalizationProviderProps) {
  const { locale, messages } = useLocalization();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
