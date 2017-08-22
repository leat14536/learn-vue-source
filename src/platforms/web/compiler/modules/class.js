/**
 * Created by Administrator on 2017/8/20 0020.
 */

function genData(el) {
  let data = ''
  if (el.staticClass) {
    data += `staticClass:${el.staticClass}`
  }
  if (el.classBinding) {
    data += `class:${el.classBinding}`
  }
  return data
}

export default {
  staticKeys: ['staticClass'],
  transformNode() {
    console.log('class transformNode')
  },
  genData
}
