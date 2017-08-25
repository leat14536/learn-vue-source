/**
 * Created by Administrator on 2017/8/8 0008.
 */

import {
  isDef,
  isUndef
} from 'shared/util'

import {
  concat,
  stringfyClass,
  genClassForVnode
} from 'web/util/index'

function updateClass(oldVnode, vnode) {
  const el = vnode.el
  const data = vnode.data
  const oldData = oldVnode.data
  if (isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldVnode) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  let cls = genClassForVnode(vnode)
  const transitionClass = el._transitionClasses
  if (isDef(transitionClass)) {
    cls = concat(cls, stringfyClass(transitionClass))
  }

  if (cls !== el._prevClass) {
    el.setAttribute('class', cls)
    el._prevClass = cls
  }
}

export default {
  create: updateClass,
  update: updateClass
}
