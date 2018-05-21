export default function getFitText(node, text, rows, lineHeight = 16, fallbackText = '') {
  // if lineHeight < max height
  const maxLineHeight = lineHeight * rows
  const localFallbackText = fallbackText.replace(' ', '\u00a0')

  const clone = node.cloneNode()
  node.parentNode.replaceChild(clone, node)

  clone.innerText = text

  if (clone.offsetHeight <= maxLineHeight) {
    clone.parentNode.replaceChild(node, clone)
    return text
  }

  let lastIndex
  let previousLastIndex

  while (clone.scrollHeight > maxLineHeight) {
    previousLastIndex = lastIndex
    lastIndex = clone.innerText.slice(0, Math.floor(clone.innerText.length / 2)).lastIndexOf(' ')

    if (lastIndex > -1) {
      clone.innerText = `${clone.innerText.substring(0, lastIndex)}${localFallbackText}`
    }
  }

  /**
   * if the previous height trim function has not reach all characters, it means it stays characters to remove
   * we need to roll back to the previous `lastIndex` innerText
   */
  if (lastIndex > -1) {
    clone.innerText = text.slice(0, previousLastIndex)
  }

  while (clone.scrollHeight > maxLineHeight) {
    lastIndex = clone.innerText.lastIndexOf(' ')

    if (lastIndex > -1) {
      clone.innerText = `${clone.innerText.substring(0, lastIndex)}${localFallbackText}`
    } else {
      clone.parentNode.replaceChild(node, clone)
      return ''
    }
  }

  const fitText = clone.innerText.slice(0, -fallbackText.length)

  clone.parentNode.replaceChild(node, clone)
  return fitText
}
