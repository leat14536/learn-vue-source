/**
 * Created by Administrator on 2017/8/6 0006.
 */

import Vue from './runtime/index'
import { warn, cached } from 'core/util/index'
import { compileToFunctions } from './compiler/index'

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
      // template
      // ...
    } else if (el) {
      template = getOuterHTML(el)
    }

    if (template) {
      const { render, staticRenderFns } = compileToFunctions(template, {
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
