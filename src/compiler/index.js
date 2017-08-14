/**
 * Created by Administrator on 2017/8/9 0009.
 */
import { createCompilerCreator } from './create-compiler'
import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'

export const createCompiler = createCompilerCreator(function baseCompile(template, options) {
  // 第一次调用时传入 template, baseoptions + $mount传入的参数
  // parse 将模板转换为一个描述节点的对象 因为传入的baseopion为空对象 所以当前返回的对象少了两个属性
  // static: false staticRoot: false
  const ast = parse(template.trim(), options)

  debugger
  // 标记静态节点
  optimize(ast, options)

  debugger
  // code = {render : string, staticRenderFns: []}
  const code = generate(ast, options)

  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
