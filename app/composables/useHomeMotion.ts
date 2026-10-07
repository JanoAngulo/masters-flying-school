import type { Ref } from 'vue'
import type { MotionKit } from './useMotion'

type Timeline = ReturnType<MotionKit['gsap']['timeline']>

// Homepage: the training route draws itself waypoint by waypoint, and the alumni bars grow to their
// share. Both explain something (order, proportion), so both earn their motion.
export function useHomeMotion(root: Ref<HTMLElement | null>, enabled: boolean) {
  useMotion(root, enabled, (kit) => {
    drawRoute(kit)
    growBars(kit)
  })
}

function drawRoute({ gsap, ScrollTrigger, el, row }: MotionKit) {
  const steps = [...el.querySelectorAll<HTMLElement>('.route-step')]
  if (!steps.length) return
  const dots = steps.map((s) => s.querySelector<HTMLElement>('.route-dot')!)
  const legs = steps.slice(0, -1).map((s) => s.querySelector<HTMLElement>('.route-leg')!)
  const hidden = row ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 100% 0%)'
  const shown = 'inset(0% 0% 0% 0%)'

  // Arriving at step i: the leg from the previous waypoint draws, then the waypoint lights up as the
  // line reaches it. The next leg starts on that same beat, so the route reads as one continuous line.
  const arrive = (tl: Timeline, i: number, at: number, legTime: number, legEase: string) => {
    if (i) {
      tl.fromTo(legs[i - 1], { clipPath: hidden }, { clipPath: shown, duration: legTime, ease: legEase, clearProps: 'clipPath' }, at)
      at += legTime
    }
    tl.fromTo(dots[i], { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.25, ease: EASE_OUT, clearProps: 'opacity,transform' }, at)
    return at
  }

  if (row) {
    // Side by side, the whole route fits one screen: draw it in one pass at a steady speed.
    if (!belowFold(steps[0].getBoundingClientRect().top)) return
    const tl = gsap.timeline({ scrollTrigger: { trigger: steps[0].parentElement, start: 'top 75%', once: true } })
    steps.reduce((at, _, i) => arrive(tl, i, at, 0.18, 'none'), 0)
    return
  }

  // Stacked, the route is taller than the screen: each leg draws down to its waypoint as that step
  // comes into view, so the line keeps pace with the reader. A fast scroll brings several steps in at
  // once; each waits for the line to reach the waypoint before it, so the route never skips ahead.
  const legTime = 0.4
  let free = 0
  steps.forEach((step, i) => {
    const firstHidden = i ? steps[i - 1].getBoundingClientRect().top + 36 : step.getBoundingClientRect().top
    if (!belowFold(firstHidden)) return
    const tl = gsap.timeline({ paused: true })
    arrive(tl, i, 0, legTime, 'power2.inOut')
    ScrollTrigger.create({
      trigger: step, start: 'top 85%', once: true,
      onEnter: () => {
        const now = gsap.ticker.time
        const wait = Math.max(0, free - now)
        free = now + wait + (i ? legTime : 0.1)
        tl.delay(wait).restart(true)
      },
    })
  })
}

function growBars({ gsap, el }: MotionKit) {
  const list = el.querySelector<HTMLElement>('[data-bars]')
  if (!list || !belowFold(list.getBoundingClientRect().top)) return
  // Clipping keeps the rounded ends round while the bar grows; scaling would squash them.
  const fills = list.querySelectorAll<HTMLElement>('[aria-hidden="true"] > span')
  gsap.fromTo(fills,
    { clipPath: 'inset(0% 100% 0% 0% round 9999px)' },
    {
      clipPath: 'inset(0% 0% 0% 0% round 9999px)', duration: 0.7, ease: EASE_OUT, stagger: 0.06, clearProps: 'clipPath',
      scrollTrigger: { trigger: list, start: 'top 80%', once: true },
    })
}
