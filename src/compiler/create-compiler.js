/**
 * Created by Administrator on 2017/8/9 0009.
 */
import {createCompileToFunctionFn} from './to-function'

export function createCompilerCreator(baseCompile) {
  return function createCompiler(baseOptions) {
    // 第一次调用时 传入template , options = {shouldDecodeNewlines: false, delimiters: undefined ,comments:undefined }
    function compile(template, options) {
      const finalOptions = Object.create(baseOptions)
      const errors = []
      const tips = []
      finalOptions.warn = (msg, tip) => {
        (tip ? tips : errors).push(msg)
      }
      if (options) {
        if (options.modules) {
          // ...
        }

        if (options.directives) {
          // ...
        }

        // 把选项拷贝到 finalOptions
        for (const key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key]
          }
        }

        // baseCompile 返回{ast: 表示dom节点的对象, render:str 渲染方法(可能需要eval), staticRenderFns: [] 静态渲染方法}
        const compiled = baseCompile(template, finalOptions)
        compiled.errors = errors
        compiled.tips = tips
        return compiled
      }
    }

    return {
      compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}
