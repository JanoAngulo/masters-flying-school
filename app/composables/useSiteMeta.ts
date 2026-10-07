export function useSiteMeta({ title, description }: { title: string; description: string }) {
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
    ogImage: `${siteUrl}/img/og-image.jpg`,
    ogImageType: 'image/jpeg',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: 'Two Masters Flying School Cessnas in red and white livery parked on the Plaridel flight line',
    twitterCard: 'summary_large_image',
    twitterImageAlt: 'Two Masters Flying School Cessnas in red and white livery parked on the Plaridel flight line',
    robots: indexable ? 'index, follow, max-image-preview:large' : 'noindex, nofollow',
  })
  useHead({
    link: [{ rel: 'canonical', href: url }],
    // Inner pages name themselves in the title before " | ", e.g. "Fleet | Masters Flying School".
    script: path === '/' ? [] : [{ key: 'ld-breadcrumb', type: 'application/ld+json', innerHTML: toJsonLd(breadcrumbSchema(siteUrl, { name: title.split(' | ')[0]!, path })) }],
  })
}
