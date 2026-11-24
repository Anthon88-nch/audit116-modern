const dialog = document.getElementById('callback-dialog')
let returnFocus
let backdropPressed = false

function openDialog(trigger) {
  if (dialog.open) return
  returnFocus = document.getElementById(trigger.dataset.callbackReturn || '') || trigger
  dialog.showModal()
  dialog.querySelector('#ac-title').focus({ preventScroll: true })
}

document.addEventListener('click', event => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const trigger = event.composedPath().find(node => node instanceof Element && node.hasAttribute('data-callback'))
  if (!trigger) return
  event.preventDefault()
  requestAnimationFrame(() => openDialog(trigger))
}, true)

dialog.addEventListener('close', () => {
  if (!dialog.open && returnFocus?.isConnected) returnFocus.focus({ preventScroll: true })
})

function outsideDialog(event) {
  const rect = dialog.getBoundingClientRect()
  return event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)
}
dialog.addEventListener('pointerdown', event => { backdropPressed = outsideDialog(event) })
dialog.addEventListener('click', event => {
  if (event.target.closest('[data-ac-close]') || (backdropPressed && outsideDialog(event))) dialog.close()
  backdropPressed = false
})
