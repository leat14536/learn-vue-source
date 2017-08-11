/**
 * Created by Administrator on 2017/8/7 0007.
 */
import VNode from './vnode'
import {
  isDef
} from '../util/index'
import config from '../config'

// Vue, 'div', {attrs:{"id":"app"}}, (子节点vnode){text: 1} undefined false
export function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
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
    if (ns) {
      // ...
    }
    return vnode
  } else {
    // ...
  }
}
