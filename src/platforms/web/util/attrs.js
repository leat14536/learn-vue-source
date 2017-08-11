/**
 * Created by Administrator on 2017/8/11 0011.
 */
import {makeMap} from 'shared/util'

export const isXlink = (name) => {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
}

export const isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
)

export const isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck')

export const isFalsyAttrValue = (val) => {
  return val == null || val === false
}
