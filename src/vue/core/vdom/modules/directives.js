/**
 * Created by Administrator on 2017/8/8 0008.
 */

function log(str = '') {
  console.log(str)
}

export default {
  create: log.bind(null, 'dir create'),
  update: log.bind(null, 'dir update'),
  destroy: log.bind(null, 'dir destroy')
}
