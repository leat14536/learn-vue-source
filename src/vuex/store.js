/**
 * Created by Administrator on 2017/8/24 0024.
 */
/* eslint-disable no-unused-vars */
import applyMixin from './mixin'
import ModuleCollection from './module/module-collection'
import devtoolPlugin from './plugins/devtool'
import {isPromise, forEachValue} from './util'

let Vue

export class Store {
  constructor(options = {}) {
    // 判断是否 使用Vue.use
    // 判断Promise是否存在
    // 判断是不是使用new
    const {plugins = [], strict = false} = options
    let {state = {}} = options
    if (typeof state === 'function') state = state()

    // store internal state
    // modules模块化
    this._committing = false
    this._actions = Object.create(null)
    this._mutations = Object.create(null)
    this._wrappedGetters = Object.create(null)
    this._modules = new ModuleCollection(options)
    this._modulesNamespaceMap = Object.create(null)
    this._subscribers = []
    this._watcherVM = new Vue()

    // dispatch, commit绑定this
    const store = this
    const {dispatch, commit} = this
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit(type, payload, options) {
      return commit.call(store, type, payload, options)
    }

    this.strict = strict

    // 传进去了 this 当前state [] 当前options
    installModule(this, state, [], this._modules.root)

    resetStoreVM(this, state)

    plugins.forEach(plugin => plugin(this))
  }

  dispatch(_type, _payload, _options) {
    console.log('==============')
  }

  commit(_type, _payload) {
    console.log('===============')
  }
}

function resetStoreVM(store, state, hot) {
  const oldVm = store._vm
  store.getters = {}
  const wrappedGetters = store._wrappedGetters
  const computed = {}
  forEachValue(wrappedGetters, (fn, key) => {
    computed[key] = () => fn(store)
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true
    })
  })

  // 使用vue实例存储状态树
  // 防止用户的乱用mixin 影响结果
  const silent = Vue.config.silent
  Vue.config.slient = true
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
  Vue.config.slient = silent

  // 使用严格模式
  if (store.strict) {
    enableStrictMode(store)
  }

  if (oldVm) {
    if (hot) {
      console.log('=============')
    }
    console.log('-------------')
  }

  // 使用devtools检查代码
  // 开发版本默认为true
  if (Vue.config.devtools) {
    devtoolPlugin(this)
  }
}

function enableStrictMode(store) {
  store._vm.$watch(function () {
    return this._data.$$store
  }, () => {
    !store._committing && console.error('Do not mutate vuex store state outside mutation handlers.')
  }, {deep: true, sync: true})
}

function installModule(store, rootState, path, module, hot) {
  const isRoot = !path.length
  const namespace = store._modules.getNamespace(path)

  if (module.namespaced) console.log('-----------')

  if (!isRoot && !hot) console.log('-----------')

  // 返回dispatch 和 commit 方法
  const local = module.context = makeLocalContext(store, namespace, path)

  debugger
  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local)
  })

  module.forEachAction((action, key) => {
    const namespacedType = namespace + key
    registerAction(store, namespacedType, action, local)
  })

  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })

  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot)
  })
}

function registerGetter(store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[vuex] duplicate getter key: ${type}`)
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGettetype(store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  }
}

function registerAction(store, type, handler, local) {
  const entry = store._actions[type] || (store._actions[type] = [])
  entry.push(function wrappedActionHandler(payload, cb) {
    let res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb)
    if (!isPromise(res)) {
      res = Promise.resolve(res)
    }
    if (store._devtoolHook) {
      return res.catch(err => {
        console.error('[vuex] error ' + err)
        throw err
      })
    } else {
      return res
    }
  })
}

function registerMutation(store, type, handler, local) {
  const entry = store._mutations[type] || (store._mutations[type] = [])
  entry.push(function wrappedMutationHandler(payload) {
    handler.call(store, local.state, payload)
  })
}

function makeLocalContext(store, namespace, path) {
  const noNamespace = namespace === ''
  const local = {
    dispatch: noNamespace ? store.dispatch : (_type, _payload, _options) => {
      console.log('==============')
    },
    commit: noNamespace ? store.commit : (_type, _payload, _options) => {
      console.log('===============')
    }
  }

  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? () => store.getters
        : () => makeLocalGetters(store, namespace)
    },
    state: {
      get: () => getNestedState(store.state, path)
    }
  })

  return local
}

function makeLocalGetters(store, namespace) {
  const gettersProxy = {}

  const splitPos = namespace.length
  Object.keys(store.getters).forEach(type => {
    if (type.slice(0, splitPos) !== namespace) return
    const localType = type.slice(splitPos)
    Object.defineProperty(gettersProxy, localType, {
      get: () => store.getters[type],
      enumerable: true
    })
  })

  return gettersProxy
}

function getNestedState(state, path) {
  return path.length
    ? path.reduce((state, key) => state[key], state)
    : state
}

export function install(_Vue) {
  if (Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.err('[vuex] Vue.use(Vuex) should be called only once.')
    }
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}
