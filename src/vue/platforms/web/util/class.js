/**
 * Created by Administrator on 2017/8/21 0021.
 */
import {isDef, isObject} from 'shared/util'

export function genClassForVnode(vnode) {
  let data = vnode.data
  let parentNode = vnode
  let childNode = vnode
  // 组件相关
  while (isDef(childNode.componentInstance)) {
    console.log('-----------------')
  }
  while (isDef(parentNode = parentNode.parent)) {
    console.log('-----------------')
  }

  return renderClass(data.staticClass, data.class)
}

function renderClass(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}
