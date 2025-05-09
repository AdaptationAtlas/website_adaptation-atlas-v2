import Image from 'next/image'
import { getClient } from '@/lib/sanity.client'
import imageUrlBuilder from '@sanity/image-url'
import { PortableText } from '@portabletext/react'

const builder = imageUrlBuilder(getClient);

function urlFor(source: any) {
  return builder.image(source)
}

const ImageFullComponent = ({ value }: any) => {
  // Directly access the '_ref' property of the asset object
  const imageRef = value.asset?._ref;
  // Use 'urlFor' to generate the URL from the reference
  const imageUrl = imageRef ? urlFor({_type: 'reference', _ref: imageRef}).url() : '';

  // If image URL doesn't exist, don't render
  if (!imageUrl) return

  return (
    <div className='mb-20'>
      <Image
        src={imageUrl}
        alt={value.alt}
        layout='responsive'
        width={1920}
        height={1080}
      />
      {value.caption &&
        <div id='image-caption' className='caption'>
          <PortableText value={value.caption} />
        </div>
      }
    </div>
  )
}

const ImageCaptionComponent = ({ value }: any) => {
  // Directly access the '_ref' property of the asset object
  const imageRef = value.asset?._ref;
  // Use 'urlFor' to generate the URL from the reference
  const imageUrl = imageRef ? urlFor({_type: 'reference', _ref: imageRef}).url() : '';

  // If image URL doesn't exist, don't render
  if (!imageUrl) return

  return (
    <div className='max-w-[940px] mx-auto mb-20'>
      <Image
        src={imageUrl}
        alt={value.alt || 'Missing image'}
        layout='responsive'
        width={1920}
        height={1080}
      />
      {value.caption &&
        <div id='image-caption' className='text-lg leading-normal mt-5'>
          <PortableText value={value.caption} />
        </div>
      }
    </div>
  )
}

export const portableTextPost = {
  types: {
    imageFull: ImageFullComponent,
    imageCaption: ImageCaptionComponent,
  },

  block: {
    h2: ({ children }: any) => <h2 className='max-w-[940px] mx-auto mb-6'>{children}</h2>,
    blockquote: ({ children }: any) => <blockquote className='max-w-[940px] mx-auto text-2xl font-medium tracking-normal leading-[42px] mb-2'>{children}</blockquote>,
    // bullet: ({ children }: any) => <li className='max-w-[940px] mx-auto text-2xl font-normal tracking-normal leading-[42px] mb-16'>{children}</li>,
    normal: ({ children }: any) => {
      if (children[0]) {
        return <p className='page-text max-w-[940px] mx-auto'>{children}</p>
      } else {
        return <br />
      }
    },
  },

  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      const target = !value.href.startsWith('/') ? '_blank' : undefined
      return (
        <a href={value.href} rel={rel} target={target} className='underline hover:text-brand-green transition-colors'>
          {children}
        </a>
      )
    },
  },
}

