"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Home, Spotlight, Tag } from "@/types/sanity.types"
import Filter from "@/components/ui/filter"
import Tags from "@/components/ui/tags"
import {
  Carousel,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { incrementUpvote } from "@/utils/incrementUpvote"
import { BiUpArrowAlt } from "react-icons/bi"

type Props = {
  homeContent: Home
  spotlights: Spotlight[]
  tags: Tag[]
}

const SpotlightGrid = ({ homeContent, spotlights, tags }: Props) => {
  const [filteredSpotlights, setFilteredSpotlights] = useState(spotlights)
  const [activeTags, setActiveTags] = useState<Tag[]>([])
  const [query, setQuery] = useState("")
  // State to track voting, initialized with each spotlight ID set to false
  const [votes, setVotes] = useState<{ [key: string]: boolean }>(() =>
    spotlights.reduce(
      (acc, spotlight) => ({ ...acc, [spotlight._id]: false }),
      {}
    )
  )

  // Reset search query and show all items
  const resetFilter = () => {
    if (query.length) {
      setQuery("") // reset query if present
    }
  }

  // Reset the active tags and show all items
  const resetTags = () => {
    // setFilteredSpotlights(spotlights) // reset filter
    setActiveTags([])
  }

  const handleUpvote = (id: string) => {
    if (!votes[id]) {
      incrementUpvote(id)
      // Update the voted state for the specific spotlight
      setVotes((prevVotes) => ({
        ...prevVotes,
        [id]: true,
      }))
      // Optionally, refresh the spotlight data to show the updated upvote count
    }
  }

  return (
    <div id="spotlight-grid" className="pt-20">
      <div id="spotlight-grid-header" className="mb-5">
        <h1 className="mb-2">{homeContent.pageHeaders.spotlightTitle}</h1>
        <h3 className="max-w-[720px]">{homeContent.pageHeaders.spotlightSubtitle}</h3>
      </div>
      <div id="spotlight-filter-search" className="mb-5 -mx-2.5">
        <h4 className="uppercase text-sm mb-2 px-2.5">
          {homeContent.pageHeaders.filterLabel}
        </h4>
        <div className="flex justify-between items-center flex-wrap">
          <div
            id="spotlight-tags"
            className="w-full md:w-3/4 pl-2.5 pr-5 mb-5 md:mb-0"
          >
            <Carousel type="tags" opts={{ align: "start" }}>
              <Tags
                data={spotlights}
                tags={tags}
                setFilteredData={setFilteredSpotlights}
                activeTags={activeTags}
                setActiveTags={setActiveTags}
                resetFilter={resetFilter}
              />
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div id="spotlight-search" className="w-full md:w-1/4 px-3">
            <Filter
              data={spotlights}
              query={query}
              setQuery={setQuery}
              setFilteredData={setFilteredSpotlights}
              placeholder={homeContent.pageHeaders.searchPlaceholder}
              resetFilter={resetFilter}
              resetTags={resetTags}
            />
          </div>
        </div>
      </div>
      <div id="grid" className="flex flex-wrap -mx-3">
        {filteredSpotlights &&
          filteredSpotlights.map((spotlight: Spotlight) => {
            const isUnavailable = spotlight.comingSoon || spotlight.underMaintenance
            const isPrototype = Boolean(spotlight.prototype)
            const prototypeLabel = homeContent.pageHeaders.prototypeLabel
            const prototypeHelperText = homeContent.pageHeaders.prototypeHelperText
            const prototypeFeedbackLabel = homeContent.pageHeaders.prototypeFeedbackLabel
            const prototypeFeedbackLink = homeContent.pageHeaders.prototypeFeedbackLink

            return (
              <div
                key={spotlight._id}
                className="block basis-full sm:basis-1/2 md:basis-1/3 xl:basis-1/4 px-2.5 mb-10"
              >
                {isUnavailable ? (
                  <div className="relative">
                    {/* Coming soon or maintenance post */}
                    <div className="flex justify-center items-center h-[240px] xl:h-[280px] mb-2 relative">
                      <div className="absolute z-10 flex justify-center items-center h-10 w-10 top-3 right-3 bg-grey-600 opacity-30">
                        <Image // icon
                          src={"/images/icon-bars.svg"}
                          alt={"Bars icon"}
                          width={20}
                          height={20}
                        />
                      </div>
                      <Image
                        src={spotlight.featuredImage}
                        alt={spotlight.featuredImageAlt}
                        layout="fill"
                        objectFit="cover"
                        className="object-center opacity-30"
                      />
                      <div className="relative z-10 flex flex-col justify-center items-center ">
                        <h3 className="uppercase font-medium mb-1">
                          {spotlight.underMaintenance
                            ? homeContent.pageHeaders.underMaintenanceLabel
                            : homeContent.pageHeaders.comingSoonLabel}
                        </h3>
                        <button
                          onClick={() => {
                            handleUpvote(spotlight._id)
                          }}
                          disabled={votes[spotlight._id]}
                          className="flex justify-between items-center gap-0.5 text-brand-green disabled:opacity-50"
                        >
                          <span className="font-semibold">
                            {homeContent.pageHeaders?.upvoteLabel}{" "}
                            {!votes[spotlight._id]
                              ? spotlight.upvotes
                              : spotlight.upvotes + 1}
                          </span>
                          <BiUpArrowAlt className="scale-125" />
                        </button>
                        <a
                          href={homeContent.pageHeaders.notifyMeLink}
                          className="text-brand-green font-medium"
                        >
                          {homeContent.pageHeaders.notifyMeLabel}
                        </a>
                      </div>
                    </div>
                    <h3 className="uppercase font-medium mb-2">
                      {spotlight.title}
                    </h3>
                  </div>
                ) : (
                  <Link
                    href={spotlight.url ? spotlight.url : `/data-explorations/${spotlight.slug}`}
                    className="transition-opacity hover:opacity-90"
                  >
                    {/* Published post */}
                    <div className="relative flex justify-center items-center h-[240px] xl:h-[280px] mb-2 overflow-hidden">
                      <div className="absolute z-10 flex justify-center items-center h-10 w-10 top-3 right-3 bg-grey-600">
                        <Image // icon
                          src={"/images/icon-bars.svg"}
                          alt={"Bars icon"}
                          width={20}
                          height={20}
                        />
                      </div>
                      <Image
                        src={spotlight.featuredImage}
                        alt={spotlight.featuredImageAlt}
                        layout="fill"
                        objectFit="cover"
                        className="object-center"
                      />
                      {isPrototype && prototypeLabel && (
                        <div className="absolute z-10 bottom-0 left-0 right-0 flex flex-col items-center text-center gap-1 px-3 py-3 bg-white/70">
                          <span className="font-medium mb-1 font-semibold uppercase tracking-wide text-grey-900">
                            {prototypeLabel}
                          </span>
                          {prototypeHelperText && (
                            <p className="text-sm text-grey-900 leading-snug">
                              {prototypeHelperText}
                            </p>
                          )}
                          {prototypeFeedbackLabel && prototypeFeedbackLink && (
                            <a
                              href={prototypeFeedbackLink}
                              className="font-medium text-brand-green font-semibold"
                            >
                              {prototypeFeedbackLabel}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                    <h3 className="uppercase font-medium mb-2">
                      {spotlight.title}
                    </h3>
                  </Link>
                )}
                <div className="flex gap-x-3 gap-y-1 flex-wrap">
                  {spotlight.featuredTags &&
                    spotlight.featuredTags.map((tag) => {
                      return (
                        <p
                          key={tag._id}
                          className="text-brand-green text-sm font-medium"
                        >
                          {tag.name}
                        </p>
                      )
                    })}
                </div>
              </div>
            )
          })}

        {!filteredSpotlights.length && (
          <div className="mx-auto my-20">
            <p className="text-base">
              {homeContent.pageHeaders.noResultsMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SpotlightGrid
