import type { Ref } from 'vue'

type Gsap = typeof import('gsap').gsap
type ScrollTriggerType = typeof import('gsap/ScrollTrigger').ScrollTrigger

export interface MotionKit {
  gsap: Gsap
  ScrollTrigger: ScrollTriggerType
  el: HTMLElement
  /** True at the lg breakpoint, where stacked layouts become rows. */
  row: boolean
}

export const EASE_OUT = 'power4.out'

// Content already on screen stays put: hiding it now would flash it out and back in.
export const belowFold = (top: number) => top > window.innerHeight

// Runs a page's scroll motion. GSAP loads only after mount and only when the motion will run, so it never
// delays first paint, never reaches pages without motion, and never downloads for reduced-motion readers
// or on a return visit. `setup` may return a cleanup for anything GSAP does not track itself.
export function useMotion(root: Ref<HTMLElement | null>, enabled: boolean, setup: (kit: MotionKit) => void | (() => void)) {
  let revert: (() => void) | undefined
  let unmounted = false

  onMounted(async () => {
    if (!enabled || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
    const el = root.value
    if (unmounted || !el) return
    gsap.registerPlugin(ScrollTrigger)

    // Reverting restores the static page, so a breakpoint change or a mid-session switch to reduced
    // motion re-runs from a clean state instead of stacking tweens.
    const mm = gsap.matchMedia()
    mm.add({ row: '(min-width: 1024px)', motion: '(prefers-reduced-motion: no-preference)' }, (ctx) => {
      const { row, motion } = ctx.conditions as { row: boolean; motion: boolean }
      if (motion) return setup({ gsap, ScrollTrigger, el, row })
    })
    revert = () => mm.revert()
  })
  onBeforeUnmount(() => {
    unmounted = true
    revert?.()
  })
}
