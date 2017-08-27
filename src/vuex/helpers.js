/**
 * Created by Administrator on 2017/8/24 0024.
 */
export const mapState = normalizeNamespace((namespace, state) => {
  const res = {}
  normalizeMap(state).forEach(({key, val}) => {
    res[key] = function mapState() {
      let state = this.$store.state
      let getters = this.$store.getters
      if (namespace) {
        console.log('==================')
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    }
    res[key].vuex = true
  })
  return res
})

/* 返回mutations */
export const mapMutations = normalizeNamespace((namespace, state) => {
  const res = {}
  normalizeMap(state).forEach(({key, val}) => {
    val = namespace + val
    res[key] = function mappedMutation(...args) {
      if (namespace && !getModuleByNamespace(this.$store, 'mapMutations', namespace)) {
        return
      }
      return this.$store.commit.apply(this.$store, [val].concat(args))
    }
  })
  return res
})

export const mapGetters = normalizeNamespace((namespace, getters) => {
  const res = {}
  normalizeMap(getters).forEach(({key, val}) => {
    val = namespace + val
    res[key] = function mappedGetter() {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
        console.error(`[vuex] unknown getter: ${val}`)
        return
      }
      return this.$store.getters[val]
    }
    res[key].vuex = true
  })
  return res
})

export const mapActions = normalizeNamespace((namespace, actions) => {
  const res = {}
  normalizeMap(actions).forEach(({key, val}) => {
    val = namespace + val
    res[key] = function mapAction(...args) {
      if (namespace && !getModuleByNamespace(this.$store, 'mapActions', namespace)) {
        return
      }
      return this.$store.dispatch.apply(this.$store, [val].concat(args))
    }
  })
  return res
})

export const createNamespacedHelpers = (namespace) => ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
})

function normalizeNamespace(fn) {
  return (namespace, map) => {
    if (typeof namespace !== 'string') {
      map = namespace
      namespace = ''
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/'
    }

    return fn(namespace, map)
  }
}

function normalizeMap(map) {
  return Array.isArray(map)
    ? map.map(key => ({key, val: key}))
    : Object.keys(map).map(key => ({key, val: map[key]}))
}

function getModuleByNamespace(store, helper, namespace) {
  const module = store._modulesNamspaceMap[namespace]
  if (process.env.NODE_ENV !== 'production' && !module) {
    console.error(`[vuex] module namespace not found in ${helper}(): ${namespace}`)
  }
  return module
}