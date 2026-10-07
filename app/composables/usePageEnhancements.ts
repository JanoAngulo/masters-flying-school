import type { Ref } from 'vue'

type Cleanup = () => void

// Attaches behavior to the ported static markup. The markup itself is static, so Vue never re-renders
// these nodes and the DOM changes made here persist until the page unmounts.
export function usePageEnhancements(root: Ref<HTMLElement | null>) {
  const route = useRoute()
  const cleanups: Cleanup[] = []

  onMounted(() => {
    const el = root.value
    if (!el) return
    cleanups.push(initYoutube(el), initTermTips(el), initDetailsLinks(el), initScrollSpy(el))
    const tabs = initTabs(el)
    if (tabs) {
      tabs.showHash(route.hash)
      cleanups.push(watch(() => route.hash, (hash) => tabs.showHash(hash)))
      const onHash = () => tabs.showHash(location.hash)
      window.addEventListener('hashchange', onHash)
      cleanups.push(() => window.removeEventListener('hashchange', onHash))
    }
  })
  onBeforeUnmount(() => cleanups.splice(0).forEach((fn) => fn()))
}

// Fleet tabs. The tab bar ships hidden so the page still works, all panels stacked, without JS.
function initTabs(el: HTMLElement) {
  const root = el.querySelector<HTMLElement>('[data-tabs]')
  if (!root) return null
  const list = root.querySelector<HTMLElement>('[role="tablist"]')!
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
  const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')!)!)

  const select = (i: number, { focus = false, push = false } = {}) => {
    tabs.forEach((t, j) => {
      const on = j === i
      t.setAttribute('aria-selected', String(on))
      t.tabIndex = on ? 0 : -1
      panels[j].hidden = !on
    })
    if (focus) tabs[i].focus()
    if (push) {
      // Record the hash in Vue Router's own state too, or its next navigation rewrites this entry
      // back to the old URL and Back loses the chosen aircraft.
      const url = `${location.pathname}${location.search}#${panels[i].id}`
      history.replaceState({ ...history.state, current: url }, '', url)
    }
  }

  list.hidden = false
  panels.forEach((p, i) => p.setAttribute('aria-labelledby', tabs[i].id))
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(i, { push: true }))
    t.addEventListener('keydown', (e) => {
      const step = ({ ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 } as Record<string, number>)[e.key]
      let n: number
      if (step) n = (i + step + tabs.length) % tabs.length
      else if (e.key === 'Home') n = 0
      else if (e.key === 'End') n = tabs.length - 1
      else return
      e.preventDefault()
      select(n, { focus: true, push: true })
    })
  })

  return {
    showHash(hash: string) {
      const i = panels.findIndex((p) => `#${p.id}` === hash)
      if (i >= 0) {
        select(i)
        requestAnimationFrame(() => root.scrollIntoView({ block: 'start' }))
      } else if (!tabs.some((t) => t.getAttribute('aria-selected') === 'true')) {
        select(0)
      }
    },
  }
}

// Term explanations (toggletips). Screen readers only announce changes to a live region that was
// already in the page, so one always-rendered, visually hidden status region repeats the open note.
function initTermTips(el: HTMLElement): Cleanup {
  const tips = [...el.querySelectorAll<HTMLButtonElement>('[data-tip]')]
  if (!tips.length) return () => {}
  const noteOf = (btn: HTMLButtonElement) => document.getElementById(btn.getAttribute('aria-controls')!)!
  const live = document.createElement('div')
  live.className = 'sr-only'
  live.setAttribute('role', 'status')
  live.dataset.tipAnnouncer = ''
  el.appendChild(live)

  const close = (btn: HTMLButtonElement) => {
    btn.setAttribute('aria-expanded', 'false')
    noteOf(btn).hidden = true
    live.textContent = ''
  }

  tips.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const isOpen = btn.getAttribute('aria-expanded') === 'true'
      tips.forEach((b) => b !== btn && close(b))
      if (isOpen) return close(btn)
      const note = noteOf(btn)
      btn.setAttribute('aria-expanded', 'true')
      note.hidden = false
      // Keep the note inside the viewport on narrow screens. Measured from layout, not the box on screen,
      // which is still scaled down while the note grows in.
      const right = note.parentElement!.getBoundingClientRect().left + note.offsetWidth
      const left = Math.min(0, document.documentElement.clientWidth - 12 - right)
      note.style.left = `${left}px`
      // Grow from the button even when the note has shifted left of it.
      note.style.transformOrigin = `${btn.offsetLeft + btn.offsetWidth / 2 - left}px 0`
      // Set the text on the next frame so the change registers even when the same note reopens.
      requestAnimationFrame(() => { live.textContent = note.textContent ?? '' })
    })
  })

  const onClick = (e: MouseEvent) => {
    tips.forEach((b) => { if (!b.parentElement!.contains(e.target as Node)) close(b) })
  }
  const onKeydown = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return
    const open = tips.find((b) => b.getAttribute('aria-expanded') === 'true')
    if (open) { close(open); open.focus() }
  }
  document.addEventListener('click', onClick)
  document.addEventListener('keydown', onKeydown)
  return () => {
    document.removeEventListener('click', onClick)
    document.removeEventListener('keydown', onKeydown)
  }
}

// Click-to-load YouTube, so no YouTube scripts load until asked.
function initYoutube(el: HTMLElement): Cleanup {
  el.querySelectorAll<HTMLElement>('[data-yt]').forEach((box) => {
    const id = box.dataset.yt
    const title = box.dataset.title || 'Video'
    const img = box.querySelector('img')
    img?.addEventListener('error', () => img.remove())
    box.querySelector('button')?.addEventListener('click', () => {
      const iframe = document.createElement('iframe')
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
      iframe.title = title
      iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      iframe.allowFullscreen = true
      box.replaceChildren(iframe)
      iframe.focus()
    })
  })
  return () => {}
}

// Links that point at a <details> open it before jumping there.
function initDetailsLinks(el: HTMLElement): Cleanup {
  el.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    const target = document.getElementById(a.getAttribute('href')!.slice(1))
    if (target instanceof HTMLDetailsElement) a.addEventListener('click', () => { target.open = true })
  })
  return () => {}
}

// In-page nav marks the section being read. A section is current once its top crosses a reading line
// 40% down the viewport, until the next one does. Sections laid out side by side cross together, so
// both stay marked. Past the end of the last section nothing is marked.
function initScrollSpy(el: HTMLElement): Cleanup {
  const nav = el.querySelector<HTMLElement>('[data-scrollspy]')
  if (!nav) return () => {}
  const links = [...nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')]
  const bar = nav.querySelector<HTMLElement>('.spy-bar')
  const targets = links.map((a) => document.getElementById(a.hash.slice(1))!)
  let frame = 0

  const update = () => {
    frame = 0
    const line = window.innerHeight * 0.4
    const boxes = targets.map((t) => t.getBoundingClientRect())
    const passed = boxes.map((b) => Math.round(b.top)).filter((top) => top <= line)
    const past = boxes.every((b) => b.bottom < line)
    const top = passed.length && !past ? Math.max(...passed) : null
    const active = links.filter((_, i) => Math.round(boxes[i].top) === top)
    links.forEach((a) => (active.includes(a) ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current')))
    if (!active.length) return void delete nav.dataset.spyActive
    const origin = nav.getBoundingClientRect().top
    const first = active[0].getBoundingClientRect()
    const last = active[active.length - 1].getBoundingClientRect()
    // Set on the bar itself: a custom property on the nav would restyle every link on each scroll frame.
    if (bar) bar.style.transform = `translateY(${first.top - origin}px) scaleY(${last.bottom - first.top})`
    nav.dataset.spyActive = ''
  }
  const schedule = () => { frame ||= requestAnimationFrame(update) }

  update()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  return () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
  }
}
