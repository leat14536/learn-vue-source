/**
 * Created by Administrator on 2017/8/7 0007.
 */
import VNode from './vnode'
import {
  isDef,
  isTrue,
  isUndef,
  isPrimitive
} from '../util/index'
import config from '../config'

/* eslint-disable no-unused-vars */
const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2

export function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children
    children = data
    data = undefined
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE
  }
  return _createElement(context, tag, data, children, normalizationType)
}

// Vue, 'div', {attrs:{"id":"app"}}, (子节点vnode){text: 1} undefined false
function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.is)) {
    // ...
  }
  if (!tag) {
    // ...
  }
  if (Array.isArray(children) && typeof children[0] === 'function') {
    // ...
  }

  let vnode, ns
  if (typeof tag === 'string') {
    // let Ctor
    // @return tag === SVG || Math ?
    ns = config.getTagNamespace(tag)
    // true
    if (config.isReservedTag(tag)) {
      vnode = new VNode(tag, data, children, undefined, undefined, context)
    } else {
      // ...
    }
  } else {
    // ...
  }

  if (isDef(vnode)) {
    if (ns) applyNS(vnode, ns)
    return vnode
  } else {
    // ...
  }
}

function applyNS(vnode, ns) {
  vnode.ns = ns
  if (vnode.tag === 'foreignObject') {
    return
  }

  if (isDef(vnode.children)) {
    for (let i = 0, l = vnode.children.length; i < l; i++) {
      const child = vnode.children[i]
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns)
      }
    }
  }
}
