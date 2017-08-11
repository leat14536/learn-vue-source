/**
 * Created by Administrator on 2017/8/6 0006.
 */
import {
  noop,
  no
} from 'shared/util'
export default ({
  optionMergeStrategies: Object.create(null),
  silent: false,
  productionTip: process.env.NODE_ENV !== 'production',
  devtools: process.env.NODE_ENV !== 'production',
  performance: false,
  errorHandler: null,
  warnHandler: null,
  ignoredElements: [],
  keyCodes: Object.create(null),
  isReservedTag: no,
  isReservedAttr: no,
  isUnknownElement: no,
  getTagNamespace: noop,
  // parsePlatformTagName: identity,
  mustUseProp: no
  // _lifecycleHooks: LIFECYCLE_HOOKS
})
