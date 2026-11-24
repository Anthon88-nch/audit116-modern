const widget = document.querySelector('.contact-widget')
const panel = widget.querySelector('.cw-panel')

if (typeof panel.hidePopover === 'function') {
  // Keep the form and the footer's final links usable even on small screens.
  let frame = 0
  function checkPosition() {
    frame = 0
    const button = widget.getBoundingClientRect()
    const overlaps = [...document.querySelectorAll('#contacts, .af-legal')].some(section => {
      const box = section.getBoundingClientRect()
      return button.bottom >= box.top && button.top <= box.bottom && button.right >= box.left && button.left <= box.right
    })
    if (overlaps && panel.matches(':popover-open')) panel.hidePopover()
    widget.toggleAttribute('data-obscured', overlaps)
  }
  function scheduleCheck() {
    if (!frame) frame = requestAnimationFrame(checkPosition)
  }
  new ResizeObserver(scheduleCheck).observe(document.body)
  window.addEventListener('scroll', scheduleCheck, { passive: true })
  window.addEventListener('resize', scheduleCheck)
  scheduleCheck()

  widget.addEventListener('focusout', event => {
    if (event.relatedTarget && !widget.contains(event.relatedTarget) && panel.matches(':popover-open')) panel.hidePopover()
  })
  panel.addEventListener('click', event => {
    if (event.target.closest('a')) panel.hidePopover()
  })
}
