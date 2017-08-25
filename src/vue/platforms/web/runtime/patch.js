/**
 * Created by Administrator on 2017/8/8 0008.
 */

import * as nodeOps from 'web/runtime/node-ops'
import {createPatchFunction} from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

const modules = platformModules.concat(baseModules)

export const patch = createPatchFunction({nodeOps, modules})
