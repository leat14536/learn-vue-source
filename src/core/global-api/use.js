/**
 * Created by Administrator on 2017/8/6 0006.
 */

export function initUse(Vue) {
  Vue.use = function () {
    console.log('use')
  }
}
