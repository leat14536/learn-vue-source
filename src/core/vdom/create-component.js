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

const componentVNodeHooks = {
  init(vnode, hydration, parentElm, refElm) {
    console.log('componentVNodeHooks init')
  },
  prepatch(oldVnode, vnode) {
    console.log('componentVNodeHooks prepatch')
  },
  insert(vnode) {
    console.log('componentVNodeHooks insert')
  },
  destory(vnode) {
    console.log('componentVNodeHooks destory')
  }
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
