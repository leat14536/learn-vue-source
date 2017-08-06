/**
 * Created by Administrator on 2017/8/6 0006.
 */
import config from '../config'
import {ASSET_TYPES} from 'shared/constants'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import builtInComponents from '../components/index'

export function initGlobalAPI(Vue) {
  const configDef = {
    get() {
      return config
    },
    set() {
      console.warn('Vue.config 不可改变')
    }
  }

  Object.defineProperty(Vue, 'config', configDef)

  // 非公共API
  Vue.util = {}

  Vue.set = () => console.log('set')
  Vue.del = () => console.log('del')
  Vue.nextTick = () => console.log('nextTick')

  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // 可能在weex中使用
  Vue.options._base = Vue

  // keep-alive
  Object.assign(Vue.options.components, builtInComponents)

  // 给vue扩展插件的方法
  // Vue.use
  initUse(Vue)

  // mixin 方法 类似Object.assign
  // Vue.mixin
  initMixin(Vue)

  // extend 方法 暂时不知道干什么的
  // 挂载Vue.extend
  initExtend(Vue)

  // 暂时不知道干什么的
  // 可能是挂载 Vue.component Vue.directive Vue.filter
  initAssetRegisters(Vue)
}
