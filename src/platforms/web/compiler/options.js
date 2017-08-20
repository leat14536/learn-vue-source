/**
 * Created by Administrator on 2017/8/9 0009.
 */
import {
  isPreTag,
  mustUseProp,
  isReservedTag,
  getTagNamespace
} from '../util/index'
import modules from './modules/index'
import directives from './directives/index'
import { genStaticKeys } from 'shared/util'
import { isUnaryTag, canBeLeftOpenTag } from './util'
/*
*   modules: class 和 style的处理方法
*   directives: v-html v-text v-model
*   isPreTag: 判断是不是pre
*   isUnaryTag
*   mustUseProp: v-model内部判断用
*   canBeLeftOpenTag
*   isReservedTag: html|svg
*   getTagNamespace: svg|match @return: Boolean
* */
export const baseOptions = {
  expectHTML: true,
  modules,
  directives,
  isPreTag,
  isUnaryTag,
  mustUseProp,
  canBeLeftOpenTag,
  isReservedTag,
  getTagNamespace,
  staticKeys: genStaticKeys(modules)
}
