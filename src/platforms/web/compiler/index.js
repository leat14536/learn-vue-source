/**
 * Created by Administrator on 2017/8/8 0008.
 */
import { baseOptions } from './options'
import { createCompiler } from 'compiler/index'

const {comple, compileToFunctions} = createCompiler(baseOptions)

export {comple, compileToFunctions}
