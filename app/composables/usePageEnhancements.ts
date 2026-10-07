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
    cleanups.push(initYoutube(el), initTermTips(el), initDetailsLinks(el))
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
    // Keep Vue Router's history state, or Back stops working.
    if (push) history.replaceState(history.state, '', `#${panels[i].id}`)
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

// Term explanations (toggletips). Each note is a status region that is filled only once it is
// visible, so screen readers announce the explanation when it opens.
function initTermTips(el: HTMLElement): Cleanup {
  const tips = [...el.querySelectorAll<HTMLButtonElement>('[data-tip]')]
  if (!tips.length) return () => {}
  const noteOf = (btn: HTMLButtonElement) => document.getElementById(btn.getAttribute('aria-controls')!)!
  const text = new Map<HTMLElement, string>()
  tips.forEach((btn) => {
    const note = noteOf(btn)
    text.set(note, note.textContent ?? '')
    note.setAttribute('role', 'status')
    note.textContent = ''
  })

  const close = (btn: HTMLButtonElement) => {
    btn.setAttribute('aria-expanded', 'false')
    const note = noteOf(btn)
    note.hidden = true
    note.textContent = ''
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
      note.style.left = '0px'
      requestAnimationFrame(() => {
        note.textContent = text.get(note) ?? ''
        // Keep the note inside the viewport on narrow screens.
        const overflow = note.getBoundingClientRect().right - (document.documentElement.clientWidth - 12)
        if (overflow > 0) note.style.left = `${-overflow}px`
      })
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
