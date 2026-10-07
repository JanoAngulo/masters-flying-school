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
    ogSiteName: 'Masters Flying School',
    ogLocale: 'en_PH',
    ogUrl: url,
    ogImage: `${siteUrl}/img/hero-cessna-line.webp`,
    ogImageAlt: 'Two Masters Flying School Cessnas in red and white livery parked on the Plaridel flight line',
    twitterCard: 'summary_large_image',
    robots: indexable ? 'index, follow' : 'noindex, nofollow',
  })
  useHead({ link: [{ rel: 'canonical', href: url }] })
}
