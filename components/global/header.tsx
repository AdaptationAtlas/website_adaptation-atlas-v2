'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Menu from './menu'
import cn from 'classnames'
import LanguageSelect from '@/components/ui/language-select'
import { useLanguageContext } from '@/contexts/language-context'
import { useSanityData } from '@/contexts/data-context'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { breakpoints } from '@/lib/constants'
import DropdownExpandMenu from '../ui/menu'
import SearchModal from '../ui/search-modal'
import { useState } from 'react'

type Props = {
  menuActive: boolean
  setMenuActive: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({ menuActive, setMenuActive }: Props) {
  const pathname = usePathname();
  const isDesktop = useMediaQuery(breakpoints.lg);
  const isHome = pathname === '/';
  const headerClass = (isHome) ? 'absolute top-0' : 'relative';
  const {
    spotlights,
    insights,
    impacts,
    siteSettings,
  } = useSanityData()
  const { setLocale, locale } = useLanguageContext()
  const [, setModalState] = useState(false)
  const handleModalState = setModalState
  return (
    <header className={cn(
      headerClass,
      'flex items-center justify-between w-full z-50 pr-5 py-4'
    )}>
      {isDesktop ? (
        <>
          <div className='flex items-center'>
            <Link href='/' className='flex items-center justify-center ml-5 mr-7'>
              <Image // logo
                src={'/images/atlas-a.svg'}
                alt={'Atlas logo'}
                width={50}
                height={50}
                className=''
              />
            </Link>
            <div>
              <div className='flex'>
                <Link  href={`${locale === 'fr' ? '/about-fr' : '/about'} `} className='mr-11 text-l font-medium text-grey-600 hover:text-brand-green transition-colors'>
                  {siteSettings?.menu.aboutTitle.toUpperCase()} 
                </Link>
                <DropdownExpandMenu />
                <Link href={`${locale === 'fr' ? '/get-involved-fr' : '/get-involved'} `}  className='mr-11 text-l font-medium text-grey-600 hover:text-brand-green transition-colors'>
                  {siteSettings?.menu.getInvolvedTitle.toUpperCase()}
                </Link>

                <Link href={`${locale === 'fr' ? '/resources-fr' : '/resources'}`} className='mr-11 text-l font-medium text-grey-600 hover:text-brand-green transition-colors'>
                  RESOURCES
                </Link>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-4 mr-5'>
            <LanguageSelect setLanguage={setLocale} isHome={isHome} triggerClassName='relative top-0 right-0' />
            <SearchModal modalState={handleModalState} className='mr-0' />
          </div>
        </>
      ) : (
        <>
          {(spotlights && insights && impacts && siteSettings) &&
            <Menu
              spotlights={spotlights}
              insights={insights}
              impacts={impacts}
              siteSettings={siteSettings}
              menuActive={menuActive}
              setMenuActive={setMenuActive}
            />
          }
          <LanguageSelect setLanguage={setLocale} isHome={isHome} />
        </>
      )}

    </header>
  )
}
