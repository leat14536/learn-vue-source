/**
 * Created by Administrator on 2017/8/9 0009.
 */
import { noop } from 'shared/util'

// 第一次调用时直传入一个参数 -> 函数 compile
export function createCompileToFunctionFn(compile) {
  const cache = Object.create(null)

  // 第一次调用时 传入template: string options = {shouldDecodeNewlines: false, delimiters: undefined ,comments:undefined } vm
  return function compileToFunctions(template, options, vm) {
    options = {}

    const key = template

    if (cache[key]) return cache[key]

    // {ast, render, staticRenderFns, errors, tips}
    const compiled = compile(template, options)
    let res = {}
    const fnGenErrors = []

    // 将code 转换为 fn
    res.render = createFunction(compiled.render, fnGenErrors)
    res.staticRenderFns = []
    return (cache[key] = res)
  }
}

function createFunction(code, errors) {
  try {
    /* eslint-disable no-new-func */
    return new Function(code)
  } catch (err) {
    errors.push({ err, code })
    return noop
  }
}
