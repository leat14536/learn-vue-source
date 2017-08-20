/**
 * Created by Administrator on 2017/8/20 0020.
 */

import {isObject, isDef} from 'core/util/index'

export function renderList(val, render) {
  let ret, i, l, keys, key
  if (Array.isArray(val) || typeof val === 'string') {

    // ... 数组渲染
  } else if (typeof val === 'number') {
    // ...
  } else if (isObject(val)) {
    keys = Object.keys(val)
    ret = new Array(keys.length)
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i]
      ret[i] = render(val[key], key, i)
    }
  }
  if (isDef(ret)) {
    ret._isVList = true
  }
  return ret
}
