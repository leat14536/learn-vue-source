/**
 * Created by Administrator on 2017/8/6 0006.
 */
import {createElement} from '../vdom/create-element'
import {defineReactive, emptyObject, warn} from '../util/index'
import {isUpdatingChildComponent} from './lifecycle'

function log() {
  console.log('优化渲染方法')
}

export function renderMixin(Vue) {
  Vue.prototype.$nextTick = function () {
    console.log('$nextTick')
  }
  Vue.prototype._render = function () {
    console.log('_render')
  }

  Vue.prototype._o = log
  Vue.prototype._n = log
  Vue.prototype._s = log
  Vue.prototype._l = log
  Vue.prototype._t = log
  Vue.prototype._q = log
  Vue.prototype._i = log
  Vue.prototype._m = log
  Vue.prototype._f = log
  Vue.prototype._k = log
  Vue.prototype._b = log
  Vue.prototype._v = log
  Vue.prototype._e = log
  Vue.prototype._u = log
  Vue.prototype._g = log
}

export function initRender(vm) {
  vm._vnode = null // the root of the child tree
  vm._staticTrees = null
  const parentVnode = vm.$vnode = vm.$options._parentVnode // the placeholder node in parent tree
  // const renderContext = parentVnode && parentVnode.context

  vm.$slots = {}

  // 冻结对象
  vm.$scopedSlots = emptyObject

  /*
   virtual DOM分为三个步骤
   一、createElement(): 用 JavaScript对象(虚拟树) 描述 真实DOM对象(真实树)
   二、diff(oldNode, newNode) : 对比新旧两个虚拟树的区别，收集差异
   三、patch() : 将差异应用到真实DOM树
   * */
  // bind the createElement fn to this instance
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // 绑定this
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)

  // render函数相关
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)
  const parentData = parentVnode && parentVnode.data
  // vm.$attrs = null
  defineReactive(vm, '$attrs', parentData && parentData.attrs, () => {
    !isUpdatingChildComponent && warn(`$attrs is readonly.`, vm)
  }, true)
  defineReactive(vm, '$listeners', vm.$options._parentListeners, () => {
    !isUpdatingChildComponent && warn(`$listeners is readonly.`, vm)
  }, true)
}
