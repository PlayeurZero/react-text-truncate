export default function previousSibling(node, count) {
  while (node && count--) {
    node = node.previousElementSibling
  }

  return node
}
