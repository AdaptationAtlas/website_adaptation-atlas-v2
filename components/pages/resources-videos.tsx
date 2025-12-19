import { VideosSection } from '@/types/sanity.types'

type Props = {
  videosSection?: VideosSection
}

const ResourcesVideos = ({ videosSection }: Props) => {
  const hasVideos = videosSection?.videos && videosSection.videos.length > 0

  if (!hasVideos) return null

  return (
    <section className='max-w-[940px] mx-auto w-full'>
      <div className='flex flex-col gap-4 mb-6'>
        {videosSection?.title && (
          <h2 className='text-3xl font-semibold leading-tight'>{videosSection.title}</h2>
        )}
        {videosSection?.description && (
          <p className='text-lg text-slate-700 max-w-[780px]'>{videosSection.description}</p>
        )}
      </div>
      <div className='grid gap-10 md:grid-cols-2'>
        {videosSection?.videos?.map((video, index) => {
          if (!video?.src) return null

          const videoTitle = video.title || `Resource video ${index + 1}`

          return (
            <article key={video.src || index} className='flex flex-col gap-3'>
              {(video.title || video.description) && (
                <div className='flex flex-col gap-2'>
                  {video.title && <h3 className='text-xl font-semibold leading-snug'>{video.title}</h3>}
                  {video.description && <p className='text-base text-slate-700'>{video.description}</p>}
                </div>
              )}
              <div className='aspect-video w-full overflow-hidden rounded-2xl shadow-lg bg-slate-900/60'>
                <iframe
                  src={video.src}
                  title={videoTitle}
                  className='h-full w-full border-0'
                  allow='autoplay; fullscreen; picture-in-picture; clipboard-write'
                  allowFullScreen
                />
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default ResourcesVideos
