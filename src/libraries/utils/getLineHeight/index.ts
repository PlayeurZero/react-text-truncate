export default function getLineHeight(node) {
  const div = document.body.appendChild(document.createElement('div'))
  div.innerText = '\u00a0'

  const lineHeight = div.offsetHeight

  div.parentNode.removeChild(div)

  return lineHeight
}
