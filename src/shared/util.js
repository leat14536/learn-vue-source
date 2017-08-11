/**
 * Created by Administrator on 2017/8/7 0007.
 */

const hasOwnProperty = Object.prototype.hasOwnProperty
const _toString = Object.prototype.toString

export function noop(a, b, c) {
}

// 判断是不是object
// return Boolean
export function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]'
}

export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

// 在 arr(数组) 中移除 item
export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexof(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

// return Boolean
export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

// 是不是数组索引
// return Boolean
export function isValidArrayIndex(val) {
  const n = parseFloat(val)
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

export function isDef(v) {
  return v !== undefined && v !== null
}

export function isUndef(v) {
  return v === undefined || v === null
}

export function isTrue(v) {
  return v === true
}

export const no = (a, b, c) => false

export function makeMap(str, expectsLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}

export function cached(fn) {
  const cache = Object.create(null)
  return function cachedFn (str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

export function extend(to, from) {
  return Object.assign(to, from)
}

export function toString(val) {
  return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val)
}

export function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  )
}
