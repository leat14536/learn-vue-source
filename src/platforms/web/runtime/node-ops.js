/**
 * Created by Administrator on 2017/8/8 0008.
 */
export function createElement() {
  console.log('createElement')
}

export function createElementNS() {
  console.log('createElementNS')
}

export function createTextNode(text) {
  return document.createTextNode(text)
}

export function createComment(text) {
  return document.createComment(text)
}

export function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode)
}

export function removeChild() {
  console.log('removeChild')
}

export function appendChild() {
  console.log('appendChild')
}

export function parentNode(node) {
  return node.parentNode
}

export function nextSibling(node) {
  return node.nextSibling
}

export function tagName(node) {
  return node.tagName
}

export function setTextContent() {
  console.log('setTextContent')
}

export function setAttribute() {
  console.log('setAttribute')
}
