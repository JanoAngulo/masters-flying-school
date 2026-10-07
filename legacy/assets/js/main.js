(() => {
  // Mobile menu
  const toggle = document.querySelector('[data-menu-toggle]');
  const panel = document.getElementById('mobile-menu');
  if (toggle && panel) {
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      panel.hidden = !open;
      document.body.classList.toggle('overflow-hidden', open);
      toggle.querySelector('[data-icon-open]').classList.toggle('hidden', open);
      toggle.querySelector('[data-icon-close]').classList.toggle('hidden', !open);
      if (open) panel.querySelector('a')?.focus();
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
    });
    panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
  }

  // Header hairline after scrolling
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.setAttribute('data-scrolled', String(window.scrollY > 8));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Click-to-load YouTube
  document.querySelectorAll('[data-yt]').forEach((box) => {
    const id = box.dataset.yt;
    const title = box.dataset.title || 'Video';
    const btn = box.querySelector('button');
    const img = box.querySelector('img');
    img?.addEventListener('error', () => { img.remove(); });
    btn?.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      iframe.title = title;
      iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      box.replaceChildren(iframe);
      iframe.focus();
    });
  });

  // Tabs (fleet). The tab bar is hidden in the HTML so the page still works, all panels stacked, without JS.
  document.querySelectorAll('[data-tabs]').forEach((root) => {
    const list = root.querySelector('[role="tablist"]');
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));
    const select = (i, { focus = false, push = false } = {}) => {
      tabs.forEach((t, j) => {
        const on = j === i;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
      });
      if (focus) tabs[i].focus();
      if (push) history.replaceState(null, '', `#${panels[i].id}`);
    };
    list.hidden = false;
    panels.forEach((p) => p.setAttribute('aria-labelledby', tabs[panels.indexOf(p)].id));
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i, { push: true }));
      t.addEventListener('keydown', (e) => {
        const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        let n;
        if (step) n = (i + step + tabs.length) % tabs.length;
        else if (e.key === 'Home') n = 0;
        else if (e.key === 'End') n = tabs.length - 1;
        else return;
        e.preventDefault();
        select(n, { focus: true, push: true });
      });
    });
    const fromHash = () => {
      const i = panels.findIndex((p) => `#${p.id}` === location.hash);
      if (i < 0) return false;
      select(i);
      requestAnimationFrame(() => root.scrollIntoView({ block: 'start' }));
      return true;
    };
    if (!fromHash()) select(0);
    window.addEventListener('hashchange', fromHash);
  });

  // Term explanations (toggletips): tap to open, tap again, Escape or tap elsewhere to close.
  const tips = [...document.querySelectorAll('[data-tip]')];
  const closeTip = (btn) => {
    btn.setAttribute('aria-expanded', 'false');
    document.getElementById(btn.getAttribute('aria-controls')).hidden = true;
  };
  tips.forEach((btn) => {
    const note = document.getElementById(btn.getAttribute('aria-controls'));
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = btn.getAttribute('aria-expanded') === 'true';
      tips.forEach((b) => b !== btn && closeTip(b));
      if (open) { closeTip(btn); return; }
      btn.setAttribute('aria-expanded', 'true');
      note.hidden = false;
      note.style.left = '0px';
      // Keep the note inside the viewport on narrow screens.
      const r = note.getBoundingClientRect();
      const overflow = r.right - (document.documentElement.clientWidth - 12);
      if (overflow > 0) note.style.left = `${-overflow}px`;
    });
  });
  document.addEventListener('click', (e) => {
    tips.forEach((b) => { if (!b.parentElement.contains(e.target)) closeTip(b); });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = tips.find((b) => b.getAttribute('aria-expanded') === 'true');
    if (open) { closeTip(open); open.focus(); }
  });

  // Links that point at a <details> open it before jumping there.
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (target?.tagName === 'DETAILS') a.addEventListener('click', () => { target.open = true; });
  });

  // Year in footer
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  // Inquiry form
  // TODO: replace the mailto handoff with a POST to the school's inquiry endpoint once one exists.
  const form = document.getElementById('inquiry-form');
  if (form) {
    const status = document.getElementById('inquiry-status');
    const submit = form.querySelector('[type="submit"]');
    const rules = {
      name: (v) => (v.trim().length >= 2 ? '' : 'Enter your full name.'),
      email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter an email address like name@example.com.'),
      phone: (v) => (!v.trim() || /^[+\d][\d\s()-]{6,}$/.test(v.trim()) ? '' : 'Use digits only, for example +63 917 123 4567.'),
      message: (v) => (v.trim().length >= 10 ? '' : 'Tell us a little more, at least 10 characters.'),
    };
    const check = (field) => {
      const rule = rules[field.name];
      if (!rule) return true;
      const msg = rule(field.value);
      const err = document.getElementById(`${field.name}-error`);
      field.setAttribute('aria-invalid', msg ? 'true' : 'false');
      field.classList.toggle('border-red', !!msg);
      if (err) { err.textContent = msg; err.hidden = !msg; }
      return !msg;
    };
    form.querySelectorAll('input, textarea').forEach((f) => {
      f.addEventListener('blur', () => { if (f.value) check(f); });
      f.addEventListener('input', () => { if (f.getAttribute('aria-invalid') === 'true') check(f); });
    });

    // Prefill course from ?course= links on the courses page
    const preset = new URLSearchParams(location.search).get('course');
    if (preset && form.course) {
      const opt = [...form.course.options].find((o) => o.value === preset);
      if (opt) form.course.value = preset;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = [...form.querySelectorAll('input, textarea')].filter((f) => rules[f.name]);
      const invalid = fields.filter((f) => !check(f));
      if (invalid.length) {
        status.className = 'mt-6 rounded-md border border-red bg-red-tint p-4 text-ink';
        status.textContent = invalid.length === 1 ? 'One field needs fixing before we can send this.' : `${invalid.length} fields need fixing before we can send this.`;
        status.hidden = false;
        invalid[0].focus();
        return;
      }
      submit.disabled = true;
      submit.dataset.label = submit.textContent;
      submit.textContent = 'Preparing your email…';
      const d = new FormData(form);
      const course = form.course.options[form.course.selectedIndex].text;
      const body = [
        `Name: ${d.get('name')}`,
        `Email: ${d.get('email')}`,
        d.get('phone') ? `Phone: ${d.get('phone')}` : null,
        `Course: ${course}`,
        '',
        d.get('message'),
      ].filter((l) => l !== null).join('\n');
      const subject = `Inquiry: ${course}`;
      window.location.href = `mailto:info@mastersflyingschool.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setTimeout(() => {
        submit.disabled = false;
        submit.textContent = submit.dataset.label;
        status.className = 'mt-6 rounded-md border border-navy bg-apron p-4 text-ink';
        status.innerHTML = 'Your email app should now be open with this inquiry filled in. Press send there to reach us. If nothing opened, email <a class="font-semibold text-red underline underline-offset-2" href="mailto:info@mastersflyingschool.com">info@mastersflyingschool.com</a> or call <a class="font-semibold text-red underline underline-offset-2" href="tel:+6328517042">(02) 851-7042</a>.';
        status.hidden = false;
        status.focus();
      }, 600);
    });
  }
})();
