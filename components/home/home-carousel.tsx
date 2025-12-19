"use client"

import Image from "next/image"
import Link from "next/link"
import { Spotlight } from "@/types/sanity.types"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { LiaArrowRightSolid } from "react-icons/lia"
import { useSanityData } from "@/contexts/data-context"

const HomeCarousel = () => {
  const { homeContent, spotlights } = useSanityData()
  const publishedSpotlights = spotlights?.filter(
    (spotlight: Spotlight) => !spotlight.comingSoon || !spotlight.underMaintenance
  )

  if (homeContent && spotlights)
    return (
      <div id="home-carousel">
        <Carousel type="hero">
          <CarouselContent className="h-[600px] lg:h-[800px]">
            {publishedSpotlights.map((spotlight: Spotlight) => (
              <CarouselItem
                key={spotlight._id}
                className="relative flex justify-center items-center"
              >
                <Image
                  src={spotlight.featuredImage}
                  alt={spotlight.featuredImageAlt}
                  layout="fill"
                  objectFit="cover"
                />
                {spotlight.prototype && homeContent.pageHeaders.prototypeLabel && (
                  <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center gap-1 px-4 py-3 bg-white/70 z-40">
                    <span className="font-medium mb-1 font-semibold uppercase tracking-wide text-grey-900">
                      {homeContent.pageHeaders.prototypeLabel}
                    </span>
                    {homeContent.pageHeaders.prototypeHelperText && (
                      <p className="text-sm text-grey-900 leading-snug">
                        {homeContent.pageHeaders.prototypeHelperText}
                      </p>
                    )}
                    {homeContent.pageHeaders.prototypeFeedbackLabel &&
                      homeContent.pageHeaders.prototypeFeedbackLink && (
                        <a
                          href={homeContent.pageHeaders.prototypeFeedbackLink}
                          className="font-medium text-brand-green font-semibold"
                        >
                          {homeContent.pageHeaders.prototypeFeedbackLabel}
                        </a>
                      )}
                  </div>
                )}
                <div
                  id="carousel-content"
                  className="relative h-[340px] w-[340px] p-[40px] lg:h-[575px] lg:w-[575px] lg:p-[100px] flex justify-center items-center flex-col text-center rounded-full bg-white z-50"
                >
                  <h3 className="uppercase text-grey-600 font-medium mb-0.5">
                    {homeContent.spotlightCarousel?.kicker}
                  </h3>
                  {spotlight.carousel?.title && (
                    <h2 className="carousel-header">
                      {spotlight.carousel?.title}
                    </h2>
                  )}
                  {spotlight.carousel?.description && (
                    <p className="hidden lg:block text-lg text-grey-600 mb-5">
                      {spotlight.carousel.description}
                    </p>
                  )}
                  <Button
                    variant={"link"}
                    size={"lg"}
                    asChild
                    className="group"
                  >
                    <div>
                      <Link href={`/data-explorations/${spotlight.slug}`}>
                        {homeContent.spotlightCarousel?.buttonLabel}
                      </Link>
                      <LiaArrowRightSolid className="scale-125 ml-2 transition-transform group-hover:translate-x-2" />
                    </div>
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    )
}

export default HomeCarousel
