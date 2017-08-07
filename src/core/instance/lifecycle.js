/**
 * Created by Administrator on 2017/8/6 0006.
 */

export let isUpdatingChildComponent = false

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    console.log('update')
  }

  // 强制更新
  Vue.prototype.$forceUpdate = function (vnode, hydrating) {
    console.log('$forceUpdate')
  }

  // 销毁
  Vue.prototype.$destroy = function (vnode, hydrating) {
    console.log('$destroy')
  }
}

export function initLifecycle(vm) {
  const options = vm.$options

  // 找到第一个非父抽象类
  let parent = options.parent
  if (parent) {
  }

  vm.$parent = parent
  vm.$root = parent ? parent.$root : vm

  vm.$children = []
  vm.$refs = {}

  vm._watcher = null
  vm._inactive = null
  vm._directInactive = false
  vm._isMounted = false
  vm._isDestroyed = false
  vm._isBeingDestroyed = false
}

export function callHook(vm, hook) {
  console.log(hook)
}
