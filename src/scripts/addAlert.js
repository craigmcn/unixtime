export default (before, id, type, content) => {
  removeAlert(id)
  const newNode = document.createElement('div')
  let icon
  newNode.classList.add('alert', 'alert--sm')
  newNode.setAttribute('id', id)
  if (type === 'warning') {
    newNode.classList.add('alert--warning')
    icon = 'fa-exclamation-triangle'
  } else {
    newNode.classList.add('alert--danger')
    icon = 'fa-exclamation-circle'
  }
  newNode.innerHTML = `<div class="alert__icon">
      <span class="fad ${icon}" aria-hidden="true"></span>
    </div>
    <div class="alert__text">${content}</div>`
  before.parentNode.insertBefore(newNode, before)
}

export const removeAlert = id => {
  if (document.getElementById(id)) document.getElementById(id).remove()
}
