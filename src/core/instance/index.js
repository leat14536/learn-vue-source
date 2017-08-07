/**
 * Created by Administrator on 2017/8/6 0006.
 */
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'

function Vue(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    console.warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
// 挂载 _init
initMixin(Vue)

// 将$data $props设为不可改变
// 挂载 $set $delete $watch
stateMixin(Vue)

// 订阅模式
// 挂载 $on $off $once $emit
eventsMixin(Vue)

// 更新节点的方法
// 挂载 _updata $forceUpdate $destroy
lifecycleMixin(Vue)

// 渲染方法
// 挂载 $nextTick _render 和优化渲染方法
renderMixin(Vue)

export default Vue
