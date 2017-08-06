/**
 * Created by Administrator on 2017/8/6 0006.
 */

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) { console.log('update') }

  // 强制更新
  Vue.prototype.$forceUpdate = function (vnode, hydrating) { console.log('$forceUpdate') }

  // 销毁
  Vue.prototype.$destroy = function (vnode, hydrating) { console.log('$destroy') }
}
