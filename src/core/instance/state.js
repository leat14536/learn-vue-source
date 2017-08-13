/**
 * Created by Administrator on 2017/8/6 0006.
 */
import {observe} from '../observer/index'
import Watcher from '../observer/watcher'
import {
  isPlainObject,
  warn,
  hasOwn,
  isReserved,
  noop
} from '../util/index'

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

export function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

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
  Vue.prototype.$watch = function (expOrFn, cb, options) {
    const vm = this
    if (isPlainObject(cb)) {
      // ...
    }
    options = options || {}
    options.user = true
    const watcher = new Watcher(vm, expOrFn, cb, options)

    if (options.immediate) {
      // ... 立即执行cb
    }

    // 返回取消观察函数
    return function unwatchFn() {
      watcher.teardown()
    }
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
  // 处理data -> 对象/函数/未传入
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
  const props = vm.$options.props || {}
  // const props = vm.$options.props
  // const methods = vm.$options.methods
  let i = keys.length

  while (i--) {
    const key = keys[i]
    // 判断 method 和 data 是否有相同key
    // ...
    if (props && hasOwn(props, key)) {
      // ...
    } else if (!isReserved(key)) {
      // 将data 绑在vm上
      proxy(vm, `_data`, key)
    }
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
