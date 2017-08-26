/**
 * Created by Administrator on 2017/8/24 0024.
 */
import Vue from 'vue'
import store from './store/index'
import vuex from 'vuex1'
import {SET_SINGER} from './store/mutation-types'

let {mapMutations, mapGetters} = vuex
let app = new Vue({
  store,
  computed: {...mapGetters(['singer'])},
  methods: {
    ...mapMutations({setSinger: SET_SINGER})
  }
})

setTimeout(() => {
  debugger
  console.log(app.singer)
  app.setSinger(5)
  console.log(app.singer)
}, 3000)

debugger
console.log(app)
