/**
 * Created by Administrator on 2017/8/6 0006.
 */
export function initExtend(Vue) {
  Vue.extend = function (extendOptions) {
    console.log('extend')
  }
}
