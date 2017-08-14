/**
 * Created by Administrator on 2017/8/6 0006.
 */
import {ASSET_TYPES} from 'shared/constants'
import {extend, mergeOptions} from '../util/index'

export function initExtend(Vue) {
  Vue.cid = 0
  let cid = 1

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {}
    const Super = this
    const SuperId = Super.cid
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})

    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    const name = extendOptions.name || Super.options.name

    const Sub = function VueComponent(options) {
      this._init(options)
    }

    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )
    Sub['super'] = Super

    // prop
    // computed

    // 静态方法
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type]
    })

    if (name) {
      Sub.options.components[name] = Sub
    }

    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)

    cachedCtors[SuperId] = Sub
    return Sub
  }
}
