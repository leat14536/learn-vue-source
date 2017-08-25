/**
 * Created by Administrator on 2017/8/8 0008.
 */
import { warn } from 'core/util/index'

/*
*   getTagNamespace
*   isReservedTag
* */
export * from './element'

/*
*  isBooleanAttr
*  isEnumeratedAttr
*  isXlink
*  mustUseProp
* */
export * from './attrs'

export function query(el) {
  if (typeof el === 'string') {
    const selected = document.querySelector(el)
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      )
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}
