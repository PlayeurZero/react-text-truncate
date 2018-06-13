export default function getLineHeight(node: HTMLElement) {
  if (!(node instanceof HTMLElement)) {
    return null
  }

  const div: HTMLElement = document.body.appendChild(node.cloneNode()) as HTMLElement
  div.innerText = '\u00a0'

  const lineHeight = div.offsetHeight

  div.parentNode.removeChild(div)

  return lineHeight
}
