'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useLanguageContext } from '@/contexts/language-context'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
type Props = {
  setLanguage: React.Dispatch<React.SetStateAction<string>>
  isHome: boolean
  triggerClassName?: string
}
function useForceUpdate() {
    let [value, setState] = useState(true);
    return () => setState(!value);
}
const LanguageSelect = ({ setLanguage, isHome, triggerClassName }: Props) => {
  
  const { setLocale, locale } = useLanguageContext()
  const router = useRouter()
  const handleForceupdateMethod = useForceUpdate();
  const handleLanguageSelect = (value: string) => {
    setLanguage(value)
    handleForceupdateMethod()
    if (!isHome) router.push('/')
  }
  return (
    <Select onValueChange={handleLanguageSelect}>
      <SelectTrigger className={triggerClassName ?? 'fixed top-5 right-5'}>
        <SelectValue placeholder={locale === 'fr' ? 'FRANÇAIS' : 'ENGLISH'} />
      </SelectTrigger>
      <SelectContent className='bg-white'>
        <SelectItem value='en'>ENGLISH</SelectItem>
        <SelectItem value='fr'>FRANÇAIS</SelectItem>
      </SelectContent>
    </Select>

  )
}

export default LanguageSelect
