/**
 * Created by Administrator on 2017/8/8 0008.
 */
import {
  resolveTransition
} from '../transition-util'

import {
  isDef,
  isUndef
} from 'shared/util'

function leave(vnode, rm) {
  const el = vnode.elm

  if (isDef(el._enterCb)) {
    // ...
  }

  // undefined
  const data = resolveTransition(vnode.data.transition)

  if (isUndef(data)) {
    return rm()
  }

  // ...
}

export default {
  create() {
    console.log('transition create')
  },
  update() {
    console.log('transition update')
  },
  remove(vnode, rm) {
    if (vnode.data.show !== true) {
      leave(vnode, rm)
    } else {
      // ...
    }
  }
}
