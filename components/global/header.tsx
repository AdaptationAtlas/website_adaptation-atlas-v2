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
  const [modalState, setModalState] = useState(false)
  const handleModalState = (bool: boolean) => {
    setModalState(bool)
  }
  return (
    <header className={cn(
      headerClass,
      'flex items-center  z-50'
    )}>
      { isDesktop && (
        <Link href='/' className='flex items-center justify-center mt-4 ml-5 mr-7'>
          <Image // logo
            src={'/images/atlas-a.svg'}
            alt={'Atlas logo'}
            width={50}
            height={50}
            className=''
          />
        </Link>
      )}
      {
        isDesktop && <div className='mt-4'>
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

            <SearchModal modalState={handleModalState} />
          </div>
        </div>
      }
      {!isDesktop && (spotlights && insights && impacts && siteSettings) &&
        <Menu
          spotlights={spotlights}
          insights={insights}
          impacts={impacts}
          siteSettings={siteSettings}
          menuActive={menuActive}
          setMenuActive={setMenuActive}
        />
      }

      {/* localizationEnabled variable check temporarily disabled for the development site to preview French content */}
      {/* IMPORTANT: be sure to re-enable this when pushing to production */}
      {/* {siteSettings && siteSettings?.localiztionEnabled &&
        <LanguageSelect setLanguage={setLocale} isHome={isHome} />
      } */}

      {/* Temporarily enabled for the development site to preview French content */}
      {/* IMPORTANT: remove this line before pushing to production */}
      <LanguageSelect setLanguage={setLocale} isHome={isHome} />
    </header>
  )
}
