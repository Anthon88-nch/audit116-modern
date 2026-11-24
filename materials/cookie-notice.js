const notice = document.getElementById('cookie-notice')
const settings = document.querySelector('[data-cookie-settings]')
const title = notice.querySelector('h2')
const copy = notice.querySelector('[data-cookie-copy]')
const save = notice.querySelector('[data-cookie-save]')
const close = notice.querySelector('[data-cookie-close]')
const initialCopy = copy.textContent
const preference = 'audit116_cookie_notice'
let fromSettings = false
let dismissed = location.pathname === "/audit116-modern/privacy/" && location.hash === '#cookies'

function isSaved() {
  try {
    return document.cookie.split(';').some(item => item.trim() === preference + '=v1')
  } catch {
    return false
  }
}

function setSaved(remember) {
  try {
    const age = remember ? 180 * 24 * 60 * 60 : 0
    const secure = location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = preference + "=v1; Path=/audit116-modern/; Max-Age=" + age + '; SameSite=Lax' + secure
  } catch {
    // The visitor can still dismiss the notice when browser storage is blocked.
  }
}

function refresh() {
  const saved = isSaved()
  notice.hidden = !fromSettings && (dismissed || saved)
  close.textContent = saved ? 'Закрыть' : 'Только сейчас'
  save.textContent = saved ? 'Удалить настройку' : 'Скрыть на 180 дней'
  copy.textContent = saved
    ? 'Вы скрыли это уведомление. Если удалить настройку, оно появится при следующем посещении.'
    : initialCopy
  settings.setAttribute('aria-expanded', String(!notice.hidden))
}

function dismiss() {
  const returnFocus = fromSettings
  dismissed = true
  fromSettings = false
  refresh()
  if (returnFocus) settings.focus({ preventScroll: true })
}

settings.setAttribute('aria-controls', notice.id)
settings.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  fromSettings = true
  refresh()
  title.focus({ preventScroll: true })
})
close.addEventListener('click', dismiss)
save.addEventListener('click', () => {
  setSaved(!isSaved())
  dismiss()
})
notice.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    event.preventDefault()
    dismiss()
  }
})
new ResizeObserver(() => {
  document.documentElement.style.setProperty('--cookie-height', notice.offsetHeight + 'px')
}).observe(notice)
window.addEventListener('pageshow', refresh)
window.addEventListener('focus', refresh)
refresh()
