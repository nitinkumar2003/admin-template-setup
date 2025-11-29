'use client'
import { FC } from 'react';
import { useLocaleTranslation } from '@/hooks/useLocaleTranslation';

interface PageBreadcrumbTitleProps{
    pageTitle:any
}
const PageBreadcrumbTitle:FC<PageBreadcrumbTitleProps> = ({pageTitle}) => {
  const {t_commmon}=useLocaleTranslation()
    return t_commmon(pageTitle)
}

export default PageBreadcrumbTitle