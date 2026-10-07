import type { Ref } from 'vue'

// Fleet: each takeoff and landing bar runs out along the runway drawn above it, the ground run first and
// the climb or descent to 50 ft carrying on from it, so the reader sees how much of Plaridel's runway the
// aircraft uses. It plays the first time an aircraft is shown. A tab switch is not animated itself: the
// tabs move with the arrow keys, and only the first look at each spec sheet gets the motion.
export function useFleetMotion(root: Ref<HTMLElement | null>, enabled: boolean) {
  useMotion(root, enabled, ({ gsap, el }) => {
    // An observer rather than ScrollTrigger: it also notices a hidden panel becoming visible.
    const plays = new Map<Element, { play: () => unknown }>()
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return
      io.unobserve(e.target)
      plays.get(e.target)?.play()
    }), { threshold: 0.5 })

    el.querySelectorAll<HTMLElement>('figure').forEach((fig) => {
      const rows = [...fig.querySelectorAll<HTMLElement>('dd[aria-hidden="true"]')]
      if (!rows.length) return
      const shown = fig.getClientRects().length > 0
      if (shown && !belowFold(fig.getBoundingClientRect().top)) return

      // Every segment grows at the same speed from the runway threshold, so where the darker ground run
      // stops the lighter one keeps going: one bar that changes shade at lift-off or touchdown.
      const tl = gsap.timeline({ paused: true })
      rows.forEach((row, i) => {
        row.querySelectorAll<HTMLElement>(':scope > span').forEach((seg) => {
          const share = parseFloat(seg.style.width) / 100 || 1
          tl.fromTo(seg, { clipPath: 'inset(0% 100% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6 * share, ease: 'none', clearProps: 'clipPath' }, i * 0.15)
        })
      })
      // One ease across the whole timeline keeps the segments in step while the run still settles.
      plays.set(fig, gsap.to(tl, { progress: 1, duration: tl.duration(), ease: 'power2.out', paused: true }))
      io.observe(fig)
    })
    return () => io.disconnect()
  })
}
