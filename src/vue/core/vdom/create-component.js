/**
 * Created by Administrator on 2017/8/15 0015.
 */
import {
  isDef,
  isTrue,
  isUndef,
  isObject
} from '../util/index'
import {resolveConstructorOptions} from 'core/instance/init'
import VNode from './vnode'
import {
  extractPropsFromVNodeData
} from './helpers/index'
import {
  callHook,
  activeInstance
} from '../instance/lifecycle'

const componentVNodeHooks = {
  init(vnode, hydrating, parentElm, refElm) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      // 创建vuecomponent实例 并返回
      const child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode, activeInstance, parentElm, refElm
      )
      child.$mount(hydrating ? vnode.elm : undefined, hydrating)
    } else if (vnode.data.keepAlive) {
      // ... keep-alive
    }
  },
  prepatch(oldVnode, vnode) {
    console.log('componentVNodeHooks prepatch')
  },
  insert(vnode) {
    // 调用已经渲染完的组件的生命钩子
    /* eslint-disable no-unused-vars */
    const {context, componentInstance} = vnode
    if (!componentInstance._isMounted) {
      // ...
      componentInstance._isMounted = true
      callHook(componentInstance, 'mounted')
    }
    if (vnode.data.keepAlive) {
      // ... keep-alive 暂时不管
    }
  },
  destory(vnode) {
    console.log('componentVNodeHooks destory')
  }
}

export function createComponentInstanceForVnode(vnode, parent, parentElm, refElm) {
  const vnodeComponentOptions = vnode.componentOptions
  const options = {
    _isComponent: true,
    parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  }
  const inlineTemplate = vnode.data.inlineTemplate
  if (isDef(inlineTemplate)) {
    // ...
  }
  // 将当前选项传入构造函数
  // 当前组件构造函数 vm._init _isComponent = true的分支
  return new vnodeComponentOptions.Ctor(options)
}

const hooksToMerge = Object.keys(componentVNodeHooks)
// 创建组件的 vnode
export function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) return

  // Vue
  /* eslint-disable no-unused-vars */
  const baseCtor = context.$options._base

  if (isObject(Ctor)) {
    // 对象组件
  }

  if (typeof Ctor !== 'function') {
    console.error('createComponent Ctor typeError')
    return
  }

  let asyncFactory
  if (isUndef(Ctor.cid)) {
    // ...
  }

  data = data || {}

  // 调整组件挂载
  // 暂时不知道有什么用
  resolveConstructorOptions(Ctor)

  if (isDef(data.model)) {
    // ...
  }

  // prop传值相关 暂不考虑 undefined
  const propsData = extractPropsFromVNodeData(data, Ctor, tag)

  if (isTrue(Ctor.options.functional)) {
    // 暂时放下
  }

  // 获取事件监听
  const listeners = data.on

  // 覆盖掉
  data.on = data.nativeOn

  if (isTrue(Ctor.options.abstract)) {
    // 抽象组件 slot
  }

  // 合并钩子函数
  mergeHooks(data)

  const name = Ctor.options.name || tag

  debugger
  // 到这里了
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data, undefined, undefined, undefined, context,
    {Ctor, propsData, listeners, tag, children},
    asyncFactory
  )
  return vnode
}

function mergeHooks(data) {
  if (!data.hook) {
    data.hook = {}
  }
  for (let i = 0; i < hooksToMerge.length; i++) {
    const key = hooksToMerge[i]
    const fromParent = data.hook[key]
    const ours = componentVNodeHooks[key]
    // 把两个方法合并到一个函数内
    data.hook[key] = fromParent ? mergeHook(ours, fromParent) : ours
  }
}

function mergeHook(one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d)
    two(a, b, c, d)
  }
}
