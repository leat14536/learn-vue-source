/**
 * Created by Administrator on 2017/8/9 0009.
 */
import {inBrowser} from 'core/util/index'

export const shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false

// 检测浏览器是否自动转码
function shouldDecode(content, ecoded) {
  const div = document.createElement('div')
  div.innerHTML = `<div a="${content}/}`
  return div.innerHTML.indexOf(ecoded) > 0
}
