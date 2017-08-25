/**
 * Created by Administrator on 2017/8/24 0024.
 */
export default function (Vue) {
  const version = Number(Vue.version.split('.')[0])

  if (version >= 2) {
    Vue.mixin({beforeCreate: vuexInit})
  }

  function vuexInit() {
    const options = this.$options

    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}
