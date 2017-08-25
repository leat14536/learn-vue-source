/**
 * Created by Administrator on 2017/8/15 0015.
 */
import {
  isUndef
} from 'core/util/index'

// props传值相关, 暂不考虑
export function extractPropsFromVNodeData(data, Ctor, tag) {
  const propOptions = Ctor.options.props
  if (isUndef(propOptions)) {
    return undefined
  }
}
