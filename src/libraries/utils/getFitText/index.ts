export default function getFitText(node, text, rows, lineHeight = 16, fallbackText = '') {
  // if lineHeight < max height
  const maxLineHeight = lineHeight * rows

  const clone = node.cloneNode()
  node.parentNode.replaceChild(clone, node)

  clone.innerText = text
  clone.style.maxHeight = null

  if (clone.offsetHeight <= maxLineHeight) {
    clone.parentNode.replaceChild(node, clone)
    return text
  }

  clone.style.maxHeight = `${maxLineHeight}px`

  let lastIndex

  while (clone.scrollHeight > clone.offsetHeight) {
    lastIndex = clone.innerText.lastIndexOf(' ')

    if (lastIndex > -1) {
      clone.innerText = `${clone.innerText.substring(0, lastIndex)}${fallbackText}`
    } else {
      clone.parentNode.replaceChild(clone, clone)
      return ''
    }
  }

  const fitText =  clone.innerText.slice(0, -fallbackText.length)

  clone.parentNode.replaceChild(node, clone)
  return fitText
}
