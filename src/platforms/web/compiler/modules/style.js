/**
 * Created by Administrator on 2017/8/20 0020.
 */

export default {
  staticKeys: ['staticStyle'],
  transformNode() {
    console.log('staticStyle transformNode')
  },
  genData() {
    console.log('staticStyle genData')
  }
}
