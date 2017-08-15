/**
 * Created by Administrator on 2017/8/6 0006.
 */
import {mergeOptions} from '../util/index'
import {initLifecycle, callHook} from './lifecycle'
import {initProvide, initInjections} from './inject'
import {initEvents} from './events'
import {initRender} from './render'
import {initState} from './state'

let uid = 0

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this

    vm._uid = uid++
    vm._isVue = true

    // 合并options
    if (options && options._isComponent) {
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options, vm)
    }

    vm._renderProxy = vm
    vm._self = vm

    // 初始化
    // 挂载:
    // $parent $root $children $refs
    // _watcher _inactive _directInactive
    // _isMounted _isDestroyed _isBeingDestroyed
    initLifecycle(vm)

    // 挂载: _events _hasHookEvent $vnode $slots $scopedSlots $createElement
    // definepropoty: $attrs $listeners
    initEvents(vm)

    // 挂载 _vnode _staticTrees
    initRender(vm)

    // 调用 beforeCreate钩子
    callHook(vm, 'beforeCreate')

    // 高阶组件用
    initInjections(vm) // resolve injections before data/props

    // 挂载 _watcher + initProps initMethods initData initComputed initWatcher
    initState(vm)

    // 高阶组件用
    initProvide(vm) // resolve provide after data/props

    // 调用 created钩子
    callHook(vm, 'created')

    // 渲染
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}

/*
 *   返回Vue的静态options
 *   组件调用时返回
 * */
export function resolveConstructorOptions(Ctor) {
  let options = Ctor.options
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      debugger
      // 组件调整, 暂时不知道干什么的
      console.log('----------------------------')
      console.log('superoption !== cachedSuperOptions')
    }
  }
  return options
}
