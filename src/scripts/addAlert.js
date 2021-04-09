export default (id, content) => {
  const alert = document.getElementById(id)
  alert.querySelector('span').innerText = content
  alert.style.display = ''
}

export const removeAlert = (id) => {
  if (document.getElementById(id))
    document.getElementById(id).style.display = 'none'
}
