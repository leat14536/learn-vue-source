/**
 * Created by Administrator on 2017/8/20 0020.
 */

export default {
  staticKeys: ['staticClass'],
  transformNode() {
    console.log('class transformNode')
  },
  genData() {
    console.log('class genData')
  }
}
