/**
 * Created by Administrator on 2017/8/6 0006.
 */
function log() {
  console.log('优化渲染方法')
}

export function renderMixin(Vue) {
  Vue.prototype.$nextTick = function () {
    console.log('$nextTick')
  }
  Vue.prototype._render = function () {
    console.log('_render')
  }

  Vue.prototype._o = log
  Vue.prototype._n = log
  Vue.prototype._s = log
  Vue.prototype._l = log
  Vue.prototype._t = log
  Vue.prototype._q = log
  Vue.prototype._i = log
  Vue.prototype._m = log
  Vue.prototype._f = log
  Vue.prototype._k = log
  Vue.prototype._b = log
  Vue.prototype._v = log
  Vue.prototype._e = log
  Vue.prototype._u = log
  Vue.prototype._g = log
}
