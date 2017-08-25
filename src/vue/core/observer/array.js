/**
 * Created by Administrator on 2017/8/7 0007.
 */
import {def} from '../util/lang'

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto);

['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
  const original = arrayProto[method]
  def(arrayMethods, method, mutator)

  function mutator(...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result
  }
})
