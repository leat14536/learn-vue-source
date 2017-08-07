/**
 *  合并options 的方法
 */
import config from '../config'
import {warn} from './debug'
import {isPlainObject, hasOwn} from 'shared/util'
import { set } from '../observer/index'

// 初始为 {}
// 合并各种属性的策略
const strats = config.optionMergeStrategies

// 暂时不用
// el的合并方法
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        `option "${key}" can only be used during instance ` +
        'creation with the `new` keyword.'
      )
    }
    return defaultStrat(parent, child)
  }
}

// data 的合并方法
strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      )

      return parentVal
    }
    return mergeDataOrFn.call(this, parentVal, childVal)
  }
}

// 默认方法
const defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal
}

// 递归合并两个对象
export function mergeData(to, from) {
  if (!from) return to
  let key, toVal, fromVal
  const keys = Object.keys(from)
  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    toVal = to[key]
    fromVal = from[key]
    if (!hasOwn(to, key)) {
      set(to, key, fromVal)
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal)
    }
  }
  return to
}

// 合并两个可能是function的对象
export function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    return function mergedDataFn() {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this) : parentVal
      )
    }
  } else if (parentVal || childVal) {
    // 合并实例
    return function mergedInstanceDataFn() {
      const instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal
      const defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined

      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

export function mergeOptions(parent, child, vm) {
  if (process.env.NODE_ENV !== 'production') {
    // 组件相关, 暂时放下
    checkComponents(child)
  }

  if (typeof child === 'function') {
    child = child.options
  }

  // props 相关
  normalizeProps(child)

  // 主要为高阶插件/组件库提供用例
  normalizeInject(child)

  // directive 相关
  normalizeDirectives(child)

  // extend 相关
  const extendsFrom = child.extends
  if (extendsFrom) {
  }

  // mixin 相关
  if (child.mixins) {
  }

  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }

  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }

  function mergeField(key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }

  return options
}

function checkComponents(options) {
}

function normalizeProps(options) {
}

function normalizeInject(options) {
}

function normalizeDirectives(child) {
}
