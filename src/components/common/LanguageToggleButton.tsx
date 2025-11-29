'use client';

import React from 'react';
import { useLocalization } from '@/hooks/useLocalization';
import { Languages, Globe } from 'lucide-react';
interface LanguageToggleButtonProps{
  ref_from:'layout' | 'header'
}

export const LanguageToggleButton: React.FC<LanguageToggleButtonProps> = ({ref_from}) => {
  const { locale, switchLocale } = useLocalization();

  const handleToggle = () => {
    switchLocale(locale === 'en' ? 'de' : 'en');
  };

  return (
    <>{ref_from=='header' ? 
    <button
      onClick={handleToggle}
      className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      title={`Switch to ${locale === 'en' ? 'Hindi' : 'English'}`}
    >
      {locale === 'en' ? (
        // 🌐 Hindi icon
         <Languages className="w-5 h-5" />
        // <svg
        //   xmlns="http://www.w3.org/2000/svg"
        //   width="20"
        //   height="20"
        //   fill="currentColor"
        //   viewBox="0 0 24 24"
        // >
        //   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-2.83-.47-5.06-2.7-5.53-5.53H6v-2h1.47C7.94 9.7 10.17 7.47 13 7v2h2V5h-2v.09C9.61 5.56 7 8.47 7 12s2.61 6.44 6 6.91V19.93z" />
        // </svg>
      ) : (
        // 🇬🇧 English icon
      <Globe className="w-5 h-5" />   
      )}
    </button>:
     <button
      onClick={handleToggle}
      className="inline-flex size-14 items-center justify-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-600"
      title={`Switch to ${locale === 'en' ? 'German' : 'English'}`}
    >
      {/* Show icon depending on language */}
      {locale === 'en' ? (
        <Languages className="w-5 h-5" />
      ) : (
        <Globe className="w-5 h-5" />      
      )}
    </button>
    }
    </>
  );
};
