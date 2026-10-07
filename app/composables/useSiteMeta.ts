const DEFAULT_IMAGE = { src: '/img/og-image.jpg', alt: 'Two Masters Flying School Cessnas in red and white livery parked on the Plaridel flight line' }

// `image` is the link-preview picture: a 1200x630 JPEG from scripts/og-images.mjs.
export function useSiteMeta({ title, description, image = DEFAULT_IMAGE }: { title: string; description: string; image?: { src: string; alt: string } }) {
  const { siteUrl, indexable } = useRuntimeConfig().public
  const path = useRoute().path.replace(/\/$/, '') || '/'
  const url = `${siteUrl}${path === '/' ? '/' : path}`

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogSiteName: SITE_NAME,
    ogLocale: 'en_PH',
    ogUrl: url,
    ogImage: `${siteUrl}${image.src}`,
    ogImageType: 'image/jpeg',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: image.alt,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: `${siteUrl}${image.src}`,
    twitterImageAlt: image.alt,
    robots: indexable ? 'index, follow, max-image-preview:large' : 'noindex, nofollow',
  })
  useHead({
    link: [{ rel: 'canonical', href: url }],
    // Inner pages name themselves in the title before " | ", e.g. "Fleet | Masters Flying School".
    script: path === '/' ? [] : [{ key: 'ld-breadcrumb', type: 'application/ld+json', innerHTML: toJsonLd(breadcrumbSchema(siteUrl, { name: title.split(' | ')[0]!, path })) }],
  })
}
