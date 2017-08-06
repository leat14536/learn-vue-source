/**
 * Created by Administrator on 2017/8/6 0006.
 */

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
  Vue.prototype.$watch = function (expOrFn, cb, oprions) {
    console.log('watch')
  }
}
