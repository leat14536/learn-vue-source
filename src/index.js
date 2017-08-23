/**
 * Created by Administrator on 2017/8/6 0006.
 */
import Vue from './platforms/web/entry-runtime-with-compiler.js'

debugger
let app = new Vue({
  el: '#app',
  data: {
    level: 1
  },
  render (createElement) {
    return createElement(
      'h' + this.level,
      {attrs: {id: 1, class: 2}}
    )
  }
})

console.log(app)
