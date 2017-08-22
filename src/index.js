/**
 * Created by Administrator on 2017/8/6 0006.
 */
import Vue from './platforms/web/entry-runtime-with-compiler.js'

debugger
let app = new Vue({
  el: '#app',
  data: {
    object: {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
    }
  }
})

app.object.age = 31
console.log(app)
