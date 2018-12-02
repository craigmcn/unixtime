export default (before, id, type, content) => {
  removeAlert(id)
  const newNode = document.createElement('div')
  let icon
  newNode.setAttribute('id', id)
  newNode.classList.add('alert')
  if (type === 'warning') {
    newNode.classList.add('alert--warning')
    icon = 'fa-exclamation-triangle'
  } else {
    newNode.classList.add('alert--danger')
    icon = 'fa-exclamation-circle'
  }
  newNode.innerHTML = `<i class="far ${icon}" aria-hidden="true"></i> ${content}`
  before.parentNode.insertBefore(newNode, before)
}

export const removeAlert = id => {
  if (document.getElementById(id)) document.getElementById(id).remove()
}
