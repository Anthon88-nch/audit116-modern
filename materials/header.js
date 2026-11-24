const companyMenu = document.getElementById('company-menu')
const companyTrigger = document.querySelector('[popovertarget="company-menu"]')
function alignCompanyMenu() {
  const left = Math.min(companyTrigger.getBoundingClientRect().left, window.innerWidth - 242)
  companyMenu.style.setProperty('--menu-left', Math.max(12, left) + 'px')
}
companyMenu.addEventListener('beforetoggle', alignCompanyMenu)
window.addEventListener('resize', alignCompanyMenu)
document.querySelectorAll('.audit-head [popover]').forEach(menu => {
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) menu.hidePopover()
  })
})

const mobileMenu = document.getElementById('mobile-menu')
window.matchMedia('(max-width: 1119px)').addEventListener('change', () => {
  document.querySelectorAll('.audit-head :popover-open').forEach(menu => menu.hidePopover())
})
mobileMenu.addEventListener('toggle', event => {
  if (event.newState === 'closed') mobileMenu.querySelectorAll('details[open]').forEach(group => { group.open = false })
})

// A tall sidebar scrolls with the article until its last link fits in the viewport.
const readingSidebar = document.querySelector('.columns > aside, .bl-reading > aside')
if (readingSidebar && 'ResizeObserver' in window) {
  const header = document.querySelector('.audit-head')
  const bounds = new ResizeObserver(() => {
    readingSidebar.style.setProperty('--reading-header-offset', (header.offsetHeight + 16) + 'px')
    readingSidebar.style.setProperty('--reading-sidebar-height', readingSidebar.offsetHeight + 'px')
  })
  bounds.observe(header)
  bounds.observe(readingSidebar)
}
