/**
 * Created by Administrator on 2017/8/10 0010.
 */
import {baseWarn, pluckModuleFunction} from '../helpers'
import baseDirectives from '../directives/index'
import {no, extend} from 'shared/util'
// import { genHandlers } from './events'

export function generate(ast, options) {
  const state = new CodegenState(options)
  const code = ast ? genElement(ast, state) : '_c("div")'

  // 第一次运行staticRenderFns: []
  return {
    render: `with(this){return ${code}}`,
    staticRenderFns: state.staticRenderFns
  }
}

function genOnce() {
  console.log('genOnce')
}

export function genIf(el, state, altGen, altEmpty) {
  el.ifProcessed = true
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions(conditions, state, altGen, altEmpty) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  const condition = conditions.shift()
  if (condition.exp) {
    return `(${condition.exp})?${genTernaryExp(condition.block)}
    :${genIfConditions(conditions, state, altGen)}`
  } else {
    return `${genTernaryExp(condition.block)}`
  }

  function genTernaryExp(el) {
    return altGen ? altGen(el, state)
      : el.once ? genOnce(el, state)
        : genElement(el, state)
  }
}

export function genFor(el, state, altGen, altHelper) {
  const exp = el.for
  const alias = el.alias
  const iterator1 = el.iterator1 ? `,${el.iterator1}` : ''
  const iterator2 = el.iterator2 ? `,${el.iterator2}` : ''

  el.forProcessed = true
  return `${altHelper || '_l'}((${exp}),` +
    `function(${alias}${iterator1}${iterator2}){` +
    `return ${(altGen || genElement)(el, state)}` +
    '})'
}

export class CodegenState {
  constructor(options) {
    this.options = options
    this.warn = options.warn || baseWarn
    // 第一次运行返回 空数组
    this.transforms = pluckModuleFunction(options.modules, 'transformCode')
    this.dataGenFns = pluckModuleFunction(options.modules, 'genData')
    // 指令系统 暂时无视
    this.directives = extend(extend({}, baseDirectives), options.directives)
    // no
    const isReservedTag = options.isReservedTag || no
    // false
    this.maybeComponent = (el) => !isReservedTag(el.tag)
    this.onceId = 0
    this.staticRenderFns = []
  }
}

export function genElement(el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    // ...
  } else if (el.once && !el.onceProcessed) {
    // ...
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    // ...
  } else if (el.tag === 'slot') {
    // ...
  } else {
    let code
    // 组件
    if (el.component) {
      // ...
    } else {
      // 第一次调用返回 {attrs:{"id":"app"}}
      const data = el.plain ? undefined : genData(el, state)

      // "[_v(_s(a))]"
      const children = el.inlineTemplate ? null : genChildren(el, state, true)
      // _c('div',{attrs:{"id":"app"}}[_v(_s(a))]
      code = `_c('${el.tag}'${data ? `,${data}` : ''}${children ? `,${children}` : ''})`
    }
    // ... module transforms
    return code
  }
}

function genDirectives(el, state) {
  const dirs = el.directives
  if (!dirs) {
  }
}

function genData(el, state) {
  let data = '{'
  debugger
  const dirs = genDirectives(el, state)

  if (dirs) data += dirs + ','

  // ... dir
  // ... key
  // ... ref
  // ... refInFor
  // ... pre
  // ... component

  // 静态class
  for (let i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el)
  }

  // attr
  if (el.attrs) {
    data += `attrs:{${genProps(el.attrs)}},`
  }
  // ... props
  // ... events
  // ... nativeEvents
  // ... slotTarget
  // ... scopedSlots
  // ... v-model
  // ... inline-template

  data = data.replace(/,$/, '') + '}'
  // ... v-bind data wrap
  // ... v-on data wrap
  return data
}

function genChildren(el, state, checkSkip, altGenElement, altGenNode) {
  const children = el.children
  if (children.length) {
    const el = children[0]
    // v-for
    if (children.length === 1 && el.for && el.tag !== 'template' && el.tag !== 'slot') {
      // ...
      debugger
      return (altGenElement || genElement)(el, state)
    }

    // 0
    const normalizationType = checkSkip ? getNormalizationType(children, state.maybeComponent) : 0
    const gen = altGenNode || genNode

    return `[${children.map(c => gen(c, state)).join(',')}]${normalizationType ? `,${normalizationType}` : ''}`
  }
}

function genNode(node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } else if (node.type === 3 && node.isComment) {
    // ...
  } else {
    return getText(node)
  }
}

function getText(text) {
  return `_v(${text.type === 2
    ? text.expression
    : transformSpecialNewlines(JSON.stringify(text.text))})`
}

// 返回字符串 key: val, key: val
function genProps(props) {
  let res = ''
  for (let i = 0; i < props.length; i++) {
    const prop = props[i]
    res += `"${prop.name}":${transformSpecialNewlines(prop.value)},`
  }
  return res.slice(0, -1)
}

function getNormalizationType(children, maybeComponent) {
  let res = 0
  for (let i = 0; i < children.length; i++) {
    const el = children[i]
    if (el.type !== 1) {
      continue
    }
    // ...
    if (maybeComponent(el) ||
      (el.ifConditions && el.ifConditions.some(c => maybeComponent(c.block)))) {
      res = 1
    }
  }
  return res
}

// 替换2028 / 2029
function transformSpecialNewlines(text: string): string {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}
