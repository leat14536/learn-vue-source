import {pushTarget, popTarget} from './dep'
import {queueWatcher} from './scheduler'
import {
  warn,
  ISet as Set,
  parsePath
} from '../util/index'

let uid = 0

export default class Wacher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = expOrFn.toString()
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = function () {
        }
        warn('watcher warn')
      }
    }
    this.value = this.lazy ? undefined : this.get()
  }

  get() {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      throw e
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      // 暂时不关心 watcher 冒泡
      if (this.deep) {
        // ... 冒泡相关
      }
      popTarget()
      this.cleanupDeps()
    }
    return value
  }

  cleanupDeps() {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    let tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }

  addDep(dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }

  update() {
    if (this.lazy) {
      // ...
    } else if (this.sync) {
      // ...
    } else {
      queueWatcher(this)
    }
  }

  run () {
    if(this.active) {
      const value = this.get()
      if(value !== this.value || isObject(value) || this.deep) {
        // ...
      }
    }
  }
}
