/**
 * Created by Administrator on 2017/8/6 0006.
 */

export function initMixin(Vue) {
  Vue.mixin = function (mixin) {
    console.log('mixin')
  }
}
