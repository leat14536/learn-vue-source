/**
 * Created by Administrator on 2017/8/9 0009.
 */

import {makeMap, cached, no} from 'shared/util'
/* eslint-disable no-unused-vars */
let isStaticKey
let isPlatformReservedTag
/* eslint-disable no-unused-vars */

const genStaticKeysCached = cached(genStaticKeys)

export function optimize(root, options) {
  if (!root) return
  isStaticKey = genStaticKeysCached(options.staticKeys || '')
  isPlatformReservedTag = options.isReservedTag || no
  // 标记非静态节点
  markStatic(root)

  // 标记静态根节点
  // 第一次运行无视
  markStaticRoots(root, false)
}

function genStaticKeys(keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic(node) {
  // 判断静态节点
  node.static = isStatic(node)
  if (node.type === 1) {
    // slot相关
    if (isPlatformReservedTag(node.tag) && node.tag !== 'slot' && node.attrsMap['inline-template'] == null) {
      // ...
      return
    }

    for (let i = 0, l = node.children.length; i < l; i++) {
      const child = node.children[i]
      markStatic(child)
      if (!child.static) {
        node.static = false
      }
    }

    if (node.ifConditions) {
      // ...
    }
  }
}

function markStaticRoots(node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      // ...
    }
    if (node.static && node.children.length && !(node.children.length === 1 && node.children[0].type === 3)) {
      // ...
    }

    if (node.children) {
      for (let i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for)
      }
    }
    if (node.ifConditions) {
      // ...
    }
  }
}

function isStatic(node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre)
  /* (
   !node.hasBindings &&
   !node.if && !node.for &&
   !isBuiltInTag(node.tag) &&
   isPlatformReservedTag(node.tag) &&
   !isDirectChildOfTemplateFor(node) &&
   Object.keys(node).every(isStaticKey)
   )) */
}
