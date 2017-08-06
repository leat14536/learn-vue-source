/**
 * Created by Administrator on 2017/8/6 0006.
 */

import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'

initGlobalAPI(Vue)

// 服务端渲染相关
/*
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})
*/

Vue.version = '__VERSION__'

export default Vue
