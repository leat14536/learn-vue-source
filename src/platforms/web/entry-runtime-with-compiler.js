/**
 * Created by Administrator on 2017/8/6 0006.
 */

import Vue from './runtime/index'
import {warn} from 'core/util/index'
import {query} from './util/index'
import {compileToFunctions} from './compiler/index'

// 检测浏览器是否自动转码('\n' -> &#10;) type: Boolean chrome下为false
import {shouldDecodeNewlines} from './util/compat'

// 缓存 mount
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (el, hydrating) {
  el = el && query(el)

  // 纠错
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options
  if (!options.render) {
    let template = options.template
    if (template) {
      // template 字符串模板
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          // ...
        }
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    if (template) {
      // 这里非常复杂
      // 将节点通过parse转换为对象形式表达
      // 判断节点是否为静态, 如果节点的children为动态, 那么节点也是动态
      // 获取遍历节点的属性通过拼接字符串new Function转换为render函数
      // 静态节点使用staticRenderFns
      const {render, staticRenderFns} = compileToFunctions(template, {
        shouldDecodeNewlines,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns
    }
  }
  return mount.call(this, el, hydrating)
}

export default Vue

function getOuterHTML(el) {
  // 不判断特殊情况
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    warn('getOutHTML warn')
  }
}
