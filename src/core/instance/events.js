/**
 * Created by Administrator on 2017/8/6 0006.
 */

export function eventsMixin(Vue) {
  Vue.prototype.$on = function(event, fn) { console.log('on') }
  Vue.prototype.$once = function(event, fn) { console.log('once') }
  Vue.prototype.$off = function(event, fn) { console.log('off') }
  Vue.prototype.$emit = function(event, fn) { console.log('emit') }
}
