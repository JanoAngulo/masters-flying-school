import type { Ref } from 'vue'

// Students: the track joining the training stages follows the reader down the page, and each stage's
// number lights up as the line reaches it. It shows where a stage sits in the whole course, so scrolling
// back up retracts the line and dims the stages again.
export function useStudentsMotion(root: Ref<HTMLElement | null>, enabled: boolean) {
  useMotion(root, enabled, ({ gsap, el }) => {
    const track = el.querySelector<HTMLElement>('.route-track-v')
    const list = track?.parentElement?.querySelector<HTMLOListElement>(':scope > ol')
    if (!track || !list || !belowFold(track.getBoundingClientRect().top)) return
    // The line's tip and the stage numbers both meet this reading line.
    const line = 'top 60%'

    gsap.fromTo(track, { clipPath: 'inset(0% 0% 100% 0%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
      scrollTrigger: { trigger: track, start: line, end: 'bottom 60%', scrub: 0.4 },
    })
    list.querySelectorAll<HTMLElement>(':scope > li > span:first-child').forEach((dot) => {
      gsap.fromTo(dot, { opacity: 0, scale: 0.9 }, {
        opacity: 1, scale: 1, duration: 0.25, ease: EASE_OUT,
        scrollTrigger: { trigger: dot, start: line, toggleActions: 'play none none reverse' },
      })
    })
  })
}
