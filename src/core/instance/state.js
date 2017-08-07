/**
 * Created by Administrator on 2017/8/6 0006.
 */
import { observe } from '../observer/index'
import { isPlainObject, warn } from '../util/index'

export function stateMixin(Vue) {
  const dataDef = {
    get() {
      return this._data
    },
    set(newData) {
      console.warn('$data is readonly')
    }
  }
  const propsDef = {
    get() {
      return this._props
    },
    set(newData) {
      console.warn('$props is readonly')
    }
  }

  Object.defineProperty(Vue.prototype, '$data', dataDef)
  Object.defineProperty(Vue.prototype, '$props', propsDef)

  Vue.prototype.$set = function () {
    console.log('set')
  }
  Vue.prototype.$delete = function () {
    console.log('set')
  }
  Vue.prototype.$watch = function (expOrFn, cb, oprions) {
    console.log('watch')
  }
}

export function initState(vm) {
  vm._watcher = []
  const opts = vm.$options

  // initProps initMethods
  // ...

  // initData
  if (opts.data) {
    initData(vm)
  }

  // initComputed initWatcher
  // ...
}

function initData(vm) {
  let data = vm.$options.data
  //处理data -> 对象/函数/未传入
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }

  const keys = Object.keys(data)
  // const props = vm.$options.props
  // const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    // 判断 method 和 data 是否有相同key
    // ...
    // 判断 prop 和 data 是否有相同key
    // ...
  }
  observe(data, true /* asRootData */)
}

function getData(data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    console.error(e, 'getData err')
    return {}
  }
}
