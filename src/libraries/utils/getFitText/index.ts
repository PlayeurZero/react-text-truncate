export default function getFitText(node, lines = 1, lineHeight = 16, fallbackText = '') {
  // if lineHeight < max height
  const maxLineHeight = lineHeight * lines

  if (node.offsetHeight <= maxLineHeight) {
    return node.innerText
  }

  const div = document.body.appendChild(document.createElement('div'))

  const clone = div.appendChild(node.cloneNode(true))
  clone.style.maxHeight = `${maxLineHeight}px`

  let lastIndex

  while (clone.scrollHeight > clone.offsetHeight) {
    lastIndex = clone.innerText.lastIndexOf(' ')

    if (lastIndex > -1) {
      clone.innerText = `${clone.innerText.substring(0, lastIndex)}${fallbackText}`
    } else {
      div.parentNode.removeChild(div)
      return null
    }
  }

  div.parentNode.removeChild(div)
  return clone.innerText
}
