(() => {
  const key = 'audit116-theme'
  const system = window.matchMedia('(prefers-color-scheme: dark)')
  const root = document.documentElement
  function preference(value) {
    return value === 'dark' || value === 'light' ? value : 'system'
  }
  let selected = 'system'
  try { selected = preference(localStorage.getItem(key)) } catch { /* Storage can be disabled. */ }

  function apply() {
    const dark = selected === 'dark' || (selected === 'system' && system.matches)
    root.dataset.theme = dark ? 'dark' : 'light'
    const control = document.querySelector('[data-theme-select]')
    if (control) control.value = selected
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#211d1c' : '#f7f1eb')
  }
  apply()
  document.addEventListener('DOMContentLoaded', apply, { once: true })
  document.addEventListener('change', event => {
    if (!event.target.matches('[data-theme-select]')) return
    selected = preference(event.target.value)
    try {
      if (selected === 'system') localStorage.removeItem(key)
      else localStorage.setItem(key, selected)
    } catch { /* Keep the selected theme for this page. */ }
    apply()
  })
  system.addEventListener('change', apply)
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return
    selected = preference(event.newValue)
    apply()
  })
})()
