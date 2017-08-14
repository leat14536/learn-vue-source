/**
 * Created by Administrator on 2017/8/6 0006.
 */
import {ASSET_TYPES} from 'shared/constants'
import {isPlainObject} from '../util/index'

export function initAssetRegisters(Vue) {
  ASSET_TYPES.forEach(type => {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id
          definition = this.options._base.extend(definition)
        }
        // directive
        // ...
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
