/*
 1、覆盖 Vue.config 的属性，将其设置为平台特有的一些方法
 2、Vue.options.directives 和 Vue.options.components 安装平台特有的指令和组件
 3、在 Vue.prototype 上定义 __patch__ 和 $mount
 */

import Vue from 'core/index'
import platformDirectives from './directives/index'
import platformComponents from './components/index'
import {inBrowser} from 'core/util/index'
import {mountComponent} from 'core/instance/lifecycle'
import {patch} from './patch'
import {extend} from 'shared/util'
import {
  query,
  getTagNamespace,
  isReservedTag
} from 'web/util/index'

// 一些验证方法
Vue.config.mustUseProp = () => console.log('mustUseProp')
Vue.config.isReservedTag = () => isReservedTag
Vue.config.isReservedAttr = () => console.log('isReservedAttr')
Vue.config.getTagNamespace = () => getTagNamespace
Vue.config.isUnknownElement = () => console.log('isUnknownElement')

// model show指令
extend(Vue.options.directives, platformDirectives)

// Transition TransitionGroup
extend(Vue.options.components, platformComponents)

// 安装平台补丁
// ...

// 渲染节点
Vue.prototype.__patch__ = patch
// 渲染视图
Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}

setTimeout(() => {
  // 派发一个'init' 事件
}, 0)

export default Vue
