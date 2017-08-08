# 通过$mount的源码来看Vue的VNode

Vue.prototype.$mount 在 ```src\platforms\web\runtime\index.js``` 处挂载

	Vue.prototype.$mount = (el, hydrating) => {
	  el = el && inBrowser ? query(el) : undefined
	  return mountComponent(this, el, hydrating)
	}

在```src\platforms\web\entry-runtime-with-compiler.js``` 处覆盖

	// 缓存 mount
	const mount = Vue.prototype.$mount
	Vue.prototype.$mount = function (el, hydrating) {
	  el = el && query(el)
	
	  // 纠错
	  if (el === document.body || el === document.documentElement) {
	    process.env.NODE_ENV !== 'production' && warn(
	      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
	    )
	    return this
	  }
	
	  const options = this.$options
	  if (!options.render) {
	    let template = options.template
	    if (template) {
	      // template
	      // ...
	    } else if (el) {
	      template = getOuterHTML(el)
	    }
	    
	    if (template) {
	      const { render, staticRenderFns } = compileToFunctions(template, {
	        shouldDecodeNewlines,
	        delimiters: options.delimiters,
	        comments: options.comments
	      }, this)
	      options.render = render
	      options.staticRenderFns = staticRenderFns
	    }
	  }
	  return mount.call(this, el, hydrating)
	}

今天跑偏了, 后边都是错误的方向

选择el 然后返回 mountComponent() ->
 ```src\core\instance\lifecycle.js```

	export function mountComponent(vm, el, hydrating) {
	  vm.$el = el
	
	  // 挂载 $options.render 为一个制造VNode的函数
	  if (!vm.$options.render) {
	    vm.$options.render = createEmptyVNode
	  }
	
	  callHook(vm, 'beforeMount')
	
	  let updateComponent = () => {
	    vm._update(vm._render(), hydrating)
	  }
	
	  /*
	   *  watcher 内部会调用一次 updateComponent
	   * */
	  vm._watcher = new Watcher(vm, updateComponent, noop)
	  hydrating = false
	
	  if (vm.$vnode == null) {
	    vm._isMounted = true
	    callHook(vm, 'mounted')
	  }
	  return vm
	}


接下来寻找 _render() 和 _update() 的挂载位置, _render在renderMixin()中挂载 -> ```src\core\instance\render.js``` 作用是返回一个VNode节点
_update() -> lifecycleMixin() 挂载 -> ```src\core\instance\lifecycle.js```

	Vue.prototype._update = function (vnode, hydrating) {
	    console.log('update')
	    const vm = this
	    debugger
	
	    // 选择出的dom节点
	    const prevEl = vm.$el
	
	    // null
	    const prevVnode = vm._vnode
	    const prevActiveInstance = activeInstance
	
	    activeInstance = vm
	    // 空的 VNode 实例
	    vm._vnode = vnode
	
	    if (!prevVnode) {
	      // initial render
	      vm.$el = vm.__patch__(
	        vm.$el, vnode, hydrating, false /* removeOnly */,
	        vm.$options._parentElm,
	        vm.$options._refElm
	      )
	
	      vm.$options._parentElm = vm.$options._refElm = null
	    } else{
	      console.log('update render')
	    }
	    activeInstance = prevActiveInstance
	    if (prevEl) {
	      prevEl.__vue__ = null
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm
	    }
	    // 如果父节点是临时的 更新父节点
	    // ...
	  }

这里调用```__path__``` 更新节点 ```__path__``` 在```src/platforms/web/runtime/index.js``` 挂载

	import { patch } from './patch'
	Vue.prototype.__patch__ = patch
#


```src/platforms/web/runtime/patch.js```

	import * as nodeOps from 'web/runtime/node-ops'
	import { createPatchFunction } from 'core/vdom/patch'
	import baseModules from 'core/vdom/modules/index'
	import platformModules from 'web/runtime/modules/index'
	import { createPatchFunction } from 'core/vdom/patch'
	
	const modules = platformModules.concat(baseModules)
	
	export const patch = createPatchFunction({nodeOps, modules})

一个一个来分析:

1. baseModules -> [ref, directive] 的create + update + destroy 方法
2. platformModules [attrs,klass,events,domProps,style,transition] 的create + update 方法 transition 多一个 remove 方法
3. modules = [...baseModules, ...platformModules]
4. nodeOps dom节点的操作方法
5. createPatchFunction -> ```src/core/vdom/patch```