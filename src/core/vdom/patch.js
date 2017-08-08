/**
 * Created by Administrator on 2017/8/8 0008.
 */
import {isDef, isUndef, isTrue} from '../util/index'
import {SSR_ATTR} from 'shared/constants'
import VNode from './vnode'

const hooks = ['create', 'activate', 'update', 'remove', 'destroy']

export function createPatchFunction(backend) {
  let i, j
  const cbs = {}
  /* eslint-disable no-unused-vars */
  const {modules, nodeOps} = backend

  //  cbs{
  //   'create': [
  //      module['create']['create']?: function,
  //      module['create']['update']?: function
  //   ],
  //    ...}
  for (i = 0; i < hooks.length; i++) {
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; j++) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]])
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  // initial vnode [] body parentElement undefined
  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested

    // false
    // 组件
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    const data = vnode.data
    const children = vnode.children
    const tag = vnode.tag

    // false
    if (isDef(tag)) {
      vnode.elm = vnode.ns
    } else if (isTrue(vnode.isComment)) {
      // 创造一个注释节点 添加到#app后边
      vnode.elm = nodeOps.createComment(vnode.text)
      insert(parentElm, vnode.elm, refElm)
    } else {
      // ...
    }
  }

  function createComponent(vnode) {
    let i = vnode.data
    if (isDef(i)) {
      // ...
    }
  }

  function insert(parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
        if (ref.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref)
        }
      } else {
        nodeOps.appendChild(parent, elm)
      }
    }
  }

  // initial
  // 初始dom vnode false false undefined undefined
  return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    debugger
    if (isUndef(vnode)) {
      // ...
      console.warn('[VNode] is UnDef')
      return
    }
    let isInitialPatch = false
    const insertedVnodeQueue = []

    if (isUndef(oldVnode)) {
      // oldNode 不存在
    } else {
      // 暂时分析dom节点的情况
      // true
      const isRealElement = isDef(oldVnode.nodeType)
      if (isRealElement) {
        /*
         *   nodeType: 1 元素 3. 文本
         * */
        if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
          // 服务端渲染相关
          // ...
        }

        if (isTrue(hydrating)) {
          // ...
        }

        // initial return -> VNode tag: div, elm: div#app
        oldVnode = emptyNodeAt(oldVnode)
      }

      // 更换现有元素
      const oldElm = oldVnode.elm
      const parentElm = nodeOps.parentNode(oldElm)

      createElm(vnode,
        insertedVnodeQueue,
        oldElm._leaveCb ? null : parentElm,
        nodeOps.nextSibling(oldElm))

      if (isDef(vnode.parent)) {
        // ...
      }

      if (isDef(parentElm)) {
      }
    }
  }
}
