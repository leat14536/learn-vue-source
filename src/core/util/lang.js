/**
 * Created by Administrator on 2017/8/7 0007.
 */

export let emptyObject = Object.freeze({})

export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}
