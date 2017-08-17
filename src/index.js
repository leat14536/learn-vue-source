/**
 * Created by Administrator on 2017/8/6 0006.
 */
import Vue from './platforms/web/entry-runtime-with-compiler.js'

debugger

let todo = Vue.component('todo-item', {
  template: '<li>这是个待办项</li>'
})

let app = new Vue({
  el: '#app',
  data: {
    a: 1
  },
  components: {
    todo
  }
})

app.a = 5
/*
 app.$watch('a', () => {
 alert(9)
 })

 app.$watch('a', () => {
 alert(90)
 })

 app.a = 5
 */

/*
 app.$watch('c.a', () => {
 alert('c.a改变了')
 })

 app.$watch('c', () => {
 alert('c 改变了')
 }, {
 deep: true,
 sync: true
 })
 */
