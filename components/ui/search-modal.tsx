import React, { useEffect, useRef, useState } from "react"
import cn from "classnames"
import { useSanityData } from "@/contexts/data-context"
import * as Collapsible from "@radix-ui/react-collapsible"
import OutsideClickHandler from "react-outside-click-handler"
import Image from "next/image"
import Search from "./search"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { breakpoints } from "@/lib/constants"
import { usePathname, useSearchParams } from "next/navigation"

type Props = {
  modalState?: (open: boolean) => void
  className?: string
}

const SearchModal = ({ modalState, className }: Props) => {
  const [open, setOpen] = React.useState(false)
  const closeAll = () => {
    setOpen(false)
  }
  const isDesktop = useMediaQuery(breakpoints.lg)
  const isLgScreen = useMediaQuery(breakpoints.xl)
  const isTablet = useMediaQuery(breakpoints.md)
  const isPhone = useMediaQuery(breakpoints.sm)
  const { homeContent, searchContent } = useSanityData()
  const ref = useRef<HTMLDivElement>(null)
  const [translateY, setTranslateY] = useState(0)
  const [searchBoxActive, setSearchBoxActive] = useState(false)
  const searchPlaceholder = isLgScreen
    ? homeContent?.search.placeholder
    : homeContent?.search.placeholderShort
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const setModalOpen = () => {
    setOpen(true)
  }
  useEffect(() => {
    setOpen(false)
  }, [pathname, searchParams])
  useEffect(() => {
    if (modalState) {
      modalState(open)
    }
  }, [modalState, open])
  useEffect(() => {
    if (open) {
      setOpen(false)
    }
  }, [isDesktop, isLgScreen, isTablet, isPhone])
  return (
    <Collapsible.Root
      className={cn(
        "CollapsibleRoot flex flex-col gap-5 md:gap-7 lg:gap-14 font-medium h-full hover:text-brand-green transition-colors",
        !isDesktop && " z-[60] pl-[60px] pr-[20px] lg:pl-[300px]",
        className ?? "mr-12"
      )}
      open={open}
      onOpenChange={setModalOpen}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Collapsible.Trigger asChild>
          <button
            type="button"
            onClick={setModalOpen}
            aria-label={homeContent?.search.menuTitle ?? "Search"}
            className={`flex items-center justify-center ${
              !isDesktop
                ? "text-white text-xl md:text-2xl lg:text-4xl font-medium tracking-wide"
                : "mr-0 w-10 h-10 rounded-full hover:bg-grey-100 transition-colors"
            }`}
          >
            {isDesktop ? (
              <Image
                src={"/images/icon-search.svg"}
                alt=""
                width={18}
                height={18}
                className="w-[18px] h-[18px]"
              />
            ) : (
              (homeContent?.search.menuTitle ?? "Search")
            )}
          </button>
        </Collapsible.Trigger>
      </div>
      <div
        className={`h-[100vh] w-[100vw] fixed  display: ${
          open ? "inline bg-white top-0 left-0 bottom-0 right-0 overflow-hidden" : "hidden"
        } ${!isDesktop && open ? 'bg-white' : 'bg-white/95'} </Collapsible.Root>'} z-80 ${open && "transition ease-in-out delay-50 duration-150"}`}
      >
        <OutsideClickHandler onOutsideClick={() => closeAll()}>
          <Collapsible.Content className="z-60 collapseContent text-grey-600">
            <div
              id="modal"
              ref={ref}
              className={`${
                !isDesktop ? "absolute" : "fixed"
              } top-[50%] left-0 h-full w-full flex justify-center align-middle ${
                open && "transition ease-in-out delay-150 duration-300"
              }`}
            >
              <div
                id="search-container"
                style={{ transform: `translateY(${translateY}px)` }}
                className={` ${
                  isDesktop ? "w-[849px]" : "w-[343px]"
                } transition-transform`}
              >
                {searchContent && (
                  <Search
                    data={searchContent}
                    placeholder={searchPlaceholder}
                    searchBoxActive={searchBoxActive}
                    setSearchBoxActive={setSearchBoxActive}
                  />
                )}
              </div>
            </div>
          </Collapsible.Content>
        </OutsideClickHandler>
      </div>
    </Collapsible.Root>
  )
}

export default SearchModal
