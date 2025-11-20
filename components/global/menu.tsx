import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import cn from "classnames"
import Share from "@/components/ui/share"
import { BiX, BiMenu, BiChevronLeft } from "react-icons/bi"
import { Spotlight, Insight, Impact, Settings } from "@/types/sanity.types"
import SearchModal from "../ui/search-modal"
import { usePathname, useSearchParams } from "next/navigation"

type Props = {
  spotlights: Spotlight[]
  insights: Insight[]
  impacts: Impact[]
  siteSettings: Settings
  menuActive: boolean
  setMenuActive: React.Dispatch<React.SetStateAction<boolean>>
}

const Menu = ({
  spotlights,
  insights,
  impacts,
  siteSettings,
  menuActive,
  setMenuActive,
}: Props) => {
  const filteredSpotlights = spotlights.filter((item) => !item.comingSoon || !item.underMaintenance)
  const [menuLevelActive, setMenuLevelActive] = useState<
    "primary" | "secondary" | "tertiary"
  >("primary")
  const [tertiaryMenuContent, setTertiaryMenuContent] = useState<
    | {
        id: string
        slug: string
        title: string
        posts: Spotlight[] | Insight[] | Impact[]
      }
    | undefined
  >()
  const secondaryMenuLinks = [
    {
      id: "spotlights",
      slug: "data-explorations",
      title: siteSettings.contentTypes.spotlightsTitle,
      posts: filteredSpotlights,
    },
    {
      id: "insights",
      slug: "quick-reads",
      title: siteSettings.contentTypes.insightsTitle,
      posts: insights,
    },
    {
      id: "impacts",
      slug: "use-cases",
      title: siteSettings.contentTypes.impactsTitle,
      posts: impacts,
    },
  ]

  const handleToggleMenu = () => {
    setMenuActive(!menuActive)
    // Reset nested menus on main menu toggle
    setMenuLevelActive("primary")
  }

  const activatePrimaryMenu = () => {
    setMenuLevelActive("primary")
  }

  const activateSecondaryMenu = () => {
    setMenuLevelActive("secondary")
  }

  const activateTertiaryMenu = (menuType: any) => {
    setMenuLevelActive("tertiary")
    const menuContent = secondaryMenuLinks.find((item) => item.id === menuType)
    setTertiaryMenuContent(menuContent)
  }

  const menuLinks = [
    { id: "our-work", link: "/", title: siteSettings.menu.workTitle },
    {
      id: "about",
      link: `/${siteSettings.menu.aboutSlug}`,
      title: siteSettings.menu.aboutTitle,
    },
    {
      id: "get-involved",
      link: `/${siteSettings.menu.getInvolvedSlug}`,
      title: siteSettings.menu.getInvolvedTitle,
    },
    {
      id: "resources",
      link: `/resources`,
      title: "Resources",
    },
  ]

  const year = new Date().getFullYear()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [modalState, setModalState] = useState(false)
  const handleModalState = (bool: boolean) => {
    setModalState(bool)
  }

  useEffect(() => {
    setMenuActive(false) 
  }, [pathname, searchParams]);

  return (
    <nav className="fixed z-50">
      <button
        className={cn(
          "fixed top-5 left-5 bg-brand-green text-white p-2 rounded-full cursor-pointer",
          "hover:bg-grey-100 hover:text-brand-green transition-colors duration-300 ease-in-out"
        )}
        onClick={handleToggleMenu}
      >
        <BiMenu className="h-6 w-6" />
      </button>
      {/* Menu container */}
      <div
        className={cn(
          menuActive
            ? "opacity-100 pointer-events-default"
            : "opacity-0 pointer-events-none",
          "fixed z-50 top-0 right-0 bottom-0 left-0 bg-brand-green transition duration-400"
        )}
      >
        {/* <div className='flex items-center h-3/4 md:h-full md:w-3/4 absolute top-0 ml-[45px] md:ml-[300px]'> */}
        <div className="relative flex items-center h-3/4 lg:h-full top-0">  
          <div className="absolute flex flex-col gap-5 md:gap-7 lg:gap-14">
          {/* Primary menu */}
          <div
            className={cn(
              "flex flex-col gap-5 md:gap-7 lg:gap-14",
              "transition-all duration-300 ease-in-out transform",
              "pl-[60px] pr-[20px] lg:pl-[300px] mt-[100px]",
              {
                "opacity-100 translate-x-0": menuLevelActive === "primary", // Active state classes
                "-translate-x-[100%] opacity-0": menuLevelActive !== "primary", // Inactive state classes
                "pointer-events-auto":
                  menuActive && menuLevelActive === "primary", // Pointer events when active
                "pointer-events-none": !(
                  menuActive && menuLevelActive === "primary"
                ), // Pointer events when not active
              }
            )}
          >
            {menuLinks.map((item) => (
              <div
                key={item.id}
                className="text-white text-xl md:text-2xl lg:text-4xl font-medium tracking-wide"
              >
                {/* Handle click for Our Work to toggle the nested menu */}
                {item.id === "our-work" ? (
                  <button onClick={activateSecondaryMenu}>{item.title}</button>
                ) : (
                  <Link href={item.link} onClick={handleToggleMenu}>
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
            
          </div>
          {menuActive && <SearchModal modalState={handleModalState} />}
          </div>
          {/* Secondary menu */}
          <div
            className={cn(
              "absolute flex flex-col gap-5 md:gap-7 lg:gap-14",
              "transition-all duration-300 ease-in-out transform",
              "pl-[60px] pr-[20px] lg:pl-[300px] my-[100px]",
              {
                "opacity-100 translate-x-0": menuLevelActive === "secondary", // Active state classes
                "translate-x-[100%] opacity-0": menuLevelActive === "primary", // Inactive state classes
                "-translate-x-[100%] opacity-0": menuLevelActive === "tertiary", // Inactive state classes
                "pointer-events-auto":
                  menuActive && menuLevelActive === "secondary", // Pointer events when active
                "pointer-events-none": !(
                  menuActive && menuLevelActive === "secondary"
                ), // Pointer events when not active
              }
            )}
          >
            <div className="relative">
              <h2 className="text-white text-xl md:text-2xl lg:text-4xl font-medium tracking-wide opacity-70">
                {siteSettings.menu.workTitle}
              </h2>
              <button
                className="absolute -left-12 -top-0.5 lg:top-1 bg-white rounded-full transition-opacity opacity-70 hover:opacity-100"
                onClick={activatePrimaryMenu}
              >
                <BiChevronLeft className="text-brand-green h-8 w-8" />
              </button>
            </div>

            {secondaryMenuLinks.map((item) => (
              <button
                key={item.id}
                className="text-white text-xl md:text-2xl lg:text-4xl font-medium tracking-wide text-left"
                onClick={() => activateTertiaryMenu(item.id)}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Tertiary menu */}
          <div
            className={cn(
              "absolute flex flex-col gap-5 md:gap-7 lg:gap-14 menu-tertiary",
              "pt-[100px] pb-[200px] h-full w-full overflow-y-auto overflow-x-hidden",
              "pl-[60px] pr-[20px] lg:pl-[300px] md:pr-[50px] lg:pr-[150px] xl:pr-[250px] my-[100px]",
              "transition-all duration-300 ease-in-out transform",
              {
                "opacity-100 translate-x-0": menuLevelActive === "tertiary", // Active state classes
                "translate-x-[100%] opacity-0": menuLevelActive !== "tertiary", // Inactive state classes
                "pointer-events-auto":
                  menuActive && menuLevelActive === "tertiary", // Pointer events when active
                "pointer-events-none": !(
                  menuActive && menuLevelActive === "tertiary"
                ), // Pointer events when not active
              }
            )}
          >
            <div className="relative lg:mt-[160px]">
              <h2 className="text-white text-xl md:text-2xl lg:text-4xl font-medium tracking-wide opacity-70">
                {tertiaryMenuContent?.title}
              </h2>
              <button
                className="absolute -left-12 -top-0.5 lg:top-1 bg-white rounded-full transition-opacity opacity-70 hover:opacity-100"
                onClick={activateSecondaryMenu}
              >
                <BiChevronLeft className="text-brand-green h-8 w-8" />
              </button>
            </div>

            {tertiaryMenuContent?.posts.map((item) => (
              <Link
                key={item.slug}
                href={`/${tertiaryMenuContent?.slug}/${item.slug}`}
                className="text-white text-xl md:text-2xl lg:text-4xl font-medium tracking-wide"
                onClick={handleToggleMenu}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Menu header */}
        <div
          id="menu-logo"
          className={`${modalState ? "opacity-0" : "fixed top-0 z-40 flex items-center justify-center w-full pt-6"}`}
        >
          <Link href="/" onClick={handleToggleMenu}>
            <Image
              src={siteSettings.logoLight}
              alt={siteSettings.logoLightAlt}
              width={170}
              height={170}
            />
          </Link>
        </div>
        <button
          className="absolute z-50 top-5 left-5 hover:opacity-100 opacity-90 transition-opacity duration-300 ease-in-out"
          onClick={handleToggleMenu}
        >
          <BiX className="text-white h-10 w-10" />
        </button>

        {/* Menu footer */}
        <div className="fixed right-0 bottom-0 left-0 z-50">
          <footer className="flex flex-col lg:flex-row justify-between w-full p-5 text-white">
            <p className="order-2 lg:order-1">
              © {year} {siteSettings.footer.copyright}
            </p>
            <div className="relative flex flex-col lg:flex-row order-1 lg:order-2 gap-0 md:gap-4 mb-1 md:mb-5">
              <a
                href={siteSettings.footer.mailingListLink}
                className="font-medium text-white opacity-90 hover:opacity-100 transition-opacity"
              >
                {siteSettings.footer.mailingListLabel}
              </a>
              <a
                href={siteSettings.footer.feedbackLink}
                className="font-medium text-white opacity-90 hover:opacity-100 transition-opacity"
              >
                {siteSettings.footer.feedbackLabel}
              </a>
              <a
                href={siteSettings.footer.contactLink}
                className="font-medium text-white opacity-90 hover:opacity-100 transition-opacity"
              >
                {siteSettings.footer.contactLabel}
              </a>
              <Share type="light" />
            </div>
          </footer>
        </div>
      </div>
    </nav>
  )
}
export default Menu
