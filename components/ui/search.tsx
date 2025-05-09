"use client"

import { useState } from "react"
import Image from "next/image"
import Fuse from "fuse.js"
import { Combobox } from "@headlessui/react"
import { BiX } from "react-icons/bi"
import { SearchItem } from "@/types/sanity.types"
import { useRouter } from "next/navigation"
import { useSanityData } from "@/contexts/data-context"

type Props = {
  data: SearchItem[]
  placeholder: string
  size?: string
  searchBoxActive: boolean
  setSearchBoxActive: React.Dispatch<React.SetStateAction<boolean>>
}

const fuseOptions = {
  minMatchCharLength: 3, // Only the matches whose length exceeds this value will be returned
  threshold: 0.3, // A threshold of 0.0 requires a perfect match, a threshold of 1.0 would match anything
  ignoreLocation: true,
  keys: [
    { name: "title", weight: 1 },
    { name: "featuredTags.name", weight: 0.75 },
    { name: "primaryTags.name", weight: 0.75 },
    { name: "secondaryTags.name", weight: 0.75 },
    { name: "searchableText", weight: 0.5 },
  ],
}

const searchPaths = [
  {
    type: "spotlight",
    path: "data-explorations",
    image: "/images/icon-bars-dark.svg",
  },
  {
    type: "insight",
    path: "quick-reads",
    image: "/images/icon-badge-dark.svg",
  },
  {
    type: "impact",
    path: "use-cases",
    image: "/images/icon-page-dark.svg",
  },
]

const Search = ({
  data,
  placeholder,
  searchBoxActive,
  setSearchBoxActive,
}: Props) => {
  const [query, setQuery] = useState("")
  const router = useRouter()
  const { homeContent } = useSanityData()

  // Preprocess post data to include body text
  const processedData = data.map((post) => ({
    ...post,
    searchableText: post.content
      .filter((block) => block._type === "block")
      .map((block: any) =>
        block.children?.map((child: any) => child.text).join(" ")
      )
      .join(" "),
  }))

  // Define fuse object and filter data by query
  const fuse = new Fuse(processedData, fuseOptions)
  const filteredData = fuse.search(query)

  const focusSearchBox = () => {
    setSearchBoxActive(true)
  }

  const blurSearchBox = () => {
    if (!query.length) {
      setSearchBoxActive(false) // Only close search box if no query is present
    }
  }

  const resetSearchBox = () => {
    setSearchBoxActive(false) // reset search box
    setQuery("") // reset query
  }

  return (
    <div id="search" className="w-full">
      <Combobox
        value={query}
        onChange={(selectedSlug) => {
          // Find the full post object or additional data needed for routing
          const post = data.find((p) => p.slug === selectedSlug)
          if (post) {
            const type = searchPaths.find((type) => type.type === post._type)
            if (type) {
              router.push(`/${type.path}/${post.slug}`)
              resetSearchBox() // Reset search box after selection
            }
          }
        }}
      >
        <div className="relative">
          <div
            id="search-input"
            className="flex items-center gap-3 bg-[#F6F6F6] w-full py-[15px] px-[25px]"
          >
            <Image
              src={"/images/icon-search.svg"}
              alt="Search"
              width={15}
              height={15}
            />
            <Combobox.Input
              onChange={(event) => setQuery(event.target.value)}
              onFocus={focusSearchBox}
              onBlur={blurSearchBox}
              placeholder={placeholder}
              className="w-full bg-[#F6F6F6] outline-none text-lg"
            />
            {searchBoxActive && (
              <button
                className="absolute right-[20px]"
                onClick={resetSearchBox}
              >
                <BiX className="text-grey-300 h-6 w-6" />
              </button>
            )}
          </div>
          {query.length > 0 && (
            <Combobox.Options className="absolute bg-[#F6F6F6] w-full pt-[10px] pb-[20px] px-[25px] max-h-[200px] lg:max-h-[320px] overflow-y-auto">
              {filteredData.length > 0 &&
                filteredData.map((post: any) => {
                  const type = searchPaths.find(
                    (item: any) => item.type === post.item._type
                  )
                  return (
                    <Combobox.Option
                      key={post.item.slug}
                      value={post.item.slug}
                      className="list-none cursor-pointer"
                    >
                      <div className="group flex gap-3 text-base mb-3">
                        <Image // icon
                          src={type!.image}
                          alt={"Icon"}
                          width={18}
                          height={18}
                        />
                        <span className="truncate">{post.item.title}</span>
                        <Image // icon
                          src={"/images/icon-arrow-dark.svg"}
                          alt={"Arrow icon"}
                          width={22}
                          height={22}
                          className="scale-90 transition-transform group-hover:translate-x-2"
                        />
                      </div>
                    </Combobox.Option>
                  )
                })}
              {homeContent && filteredData.length === 0 && query.length > 0 && (
                <div className="text-base">
                  {homeContent.search.noResultsMessage}
                </div>
              )}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  )
}

export default Search
