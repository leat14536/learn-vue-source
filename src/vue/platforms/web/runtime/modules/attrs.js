/**
 * Created by Administrator on 2017/8/8 0008.
 */
import {
  isDef,
  isUndef
} from 'shared/util'

import {
  isXlink,
  isBooleanAttr,
  isEnumeratedAttr,
  isFalsyAttrValue
} from 'web/util/index'

function updateAttrs(oldVnode, vnode) {
  const opts = vnode.componentOptions
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  /* eslint-disable */
  let key, cur, old
  const elm = vnode.elm
  const oldAttrs = oldVnode.data.attrs || {}
  let attrs = vnode.data.attrs || {}
  if (isDef(attrs.__ob__)) {
    // ...
  }

  for (key in attrs) {
    cur = attrs[key]
    old = oldAttrs[key]
    if (old !== cur) {
      setAttr(elm, key, cur)
    }
  }

  // 暂时不管ie9
  // ...
}

function setAttr(el, key, value) {
  if (isBooleanAttr(key)) {
    // 类型是boolean的attr
    console.log('attr setAttr isBooleanAttr ...')
  } else if (isEnumeratedAttr(key)) {
    // h5新增属性 可编辑 / 可拖动 / 是否进行拼写检查
  } else if(isXlink(key)) {
    // 猜测跟xml
  } else {
    // val 是null 或 false
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key)
    } else {
      el.setAttribute(key, value)
    }
  }
}

export default {
  create: updateAttrs,
  update: updateAttrs
}
