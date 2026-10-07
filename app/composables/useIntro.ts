// Whether this page's opening motion should play: the first time each page is shown in a visit, not on
// every return to it. The list is serialized with the page, so the server and the hydrating client agree.
export function useIntro() {
  const path = useRoute().path.replace(/\/$/, '') || '/'
  const seen = useState<string[]>('intro-seen', () => [])
  const intro = !seen.value.includes(path)
  onMounted(() => { if (intro) seen.value.push(path) })
  return intro
}
