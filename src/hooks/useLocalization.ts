'use client';

import { useState, useEffect, useCallback } from 'react';
import en from '@/messages/en.json';

import de from '@/messages/de.json';
import { LocaleType, storage_keys } from '@/constant/constant_keys';


export type Messages = Record<string, any>;

const messages: Record<LocaleType, Messages> = { en, de };

export function useLocalization() {
    const [locale, setLocale] = useState<LocaleType>('en');
    const [currentMessages, setCurrentMessages] = useState<Messages>(messages.en);

    // Load saved language or detect from browser
    useEffect(() => {
        const saved = localStorage.getItem(storage_keys.language_locale) as LocaleType | null;
        if (saved && messages[saved]) {
            setLocale(saved);
            setCurrentMessages(messages[saved]);
        } else {
            const browserLang = navigator.language.split('-')[0] as LocaleType;
            if (messages[browserLang]) {
                setLocale(browserLang);
                setCurrentMessages(messages[browserLang]);
            }
        }
    }, []);

    // Function to switch locale
    const switchLocale = useCallback((newLocale: LocaleType) => {
        if (messages[newLocale]) {
            setLocale(newLocale);
            setCurrentMessages(messages[newLocale]);
            localStorage.setItem(storage_keys.language_locale, newLocale);
        }
        window.location.reload();
    }, []);




    return { locale, messages: currentMessages, switchLocale };
}
