/**
 * Created by Administrator on 2017/8/25 0025.
 */
export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

export function forEachValue(obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isPromise(val) {
  return val && typeof val.then === 'function'
}
