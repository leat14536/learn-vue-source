/**
 * Created by Administrator on 2017/8/6 0006.
 */
import Vue from './platforms/web/entry-runtime-with-compiler.js'

let app = new Vue({
  el: '#app',
  data: {
    a: 1,
    b: [1, 2, 3]
  }
})

console.log(app)
