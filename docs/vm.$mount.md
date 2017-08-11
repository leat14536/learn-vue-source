# 通过$mount的源码来看Vue的VNode

Vue.prototype.$mount 在 ```src\platforms\web\runtime\index.js``` 处第一次挂载

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
	      // 这里非常复杂
	      // 将节点通过parse转换为对象形式表达
	      // 判断节点是否为静态, 如果节点的children为动态, 那么节点也是动态
	      // 获取遍历节点的属性通过拼接字符串new Function转换为render函数
	      // 静态节点使用staticRenderFns
	      const {render, staticRenderFns} = compileToFunctions(template, {
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

这里将render方法挂载在options内
接下来回到第一个 $mount -> ```src\platforms\web\runtime\index.js```


	import {mountComponent} from 'core/instance/lifecycle'
	Vue.prototype.$mount = function (el, hydrating) {
	  el = el && inBrowser ? query(el) : undefined
	  return mountComponent(this, el, hydrating)
	}

 ```src\core\instance\lifecycle.js```

	export function mountComponent(vm, el, hydrating) {
	  vm.$el = el
	
	  if (!vm.$options.render) {
	    // ...
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


接下来寻找 _render() 和 _update() 的挂载位置, _render在renderMixin()中挂载 -> ```src\core\instance\render.js``` 作用是利用parse模块将el转换为vnode实例
_update() -> lifecycleMixin() 挂载 -> ```src\core\instance\lifecycle.js```

	Vue.prototype._update = function (vnode, hydrating) {
	    console.log('update')
	    const vm = this
	
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

上面这段代码最重要的是 ```vm.$el = vm.__patch__(...)``` 负责创造新的dom元素并替换初始dom

```__path__``` 在```src/platforms/web/runtime/index.js``` 挂载

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

这个函数有点大, 600多行

	export function createPatchFunction (backend) {
	  // 函数内部使用的全局变量
	  let i, j
	  const cbs = {}
	  const {modules, nodeOps} = backend
	
	  // 按hook归类
	  for (i = 0; i < hooks.length; i++) {
	    cbs[hooks[i]] = []
	    for (j = 0; j < modules.length; j++) {
	      if (isDef(modules[j][hooks[i]])) {
	        cbs[hooks[i]].push(modules[j][hooks[i]])
	      }
	    }
	  }
	
	// ... 函数内部方法

	return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
		// 判断是否存在
	    if (isUndef(vnode)) {
	      // ...
	      console.warn('[VNode] is UnDef')
	      return
	    }
	    let isInitialPatch = false
	    const insertedVnodeQueue = []
	
	    if (isUndef(oldVnode)) {
	      // oldNode 不存在
	    } else {
	      // 分析dom节点的情况
	      const isRealElement = isDef(oldVnode.nodeType)
	      if (isRealElement) {
	        if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
	          // 服务端渲染相关
	          // ...
	        }
	
	        if (isTrue(hydrating)) {
	          // ...
	        }
	
			// oldnode转换为一个表示空div的vnode
	        // initial return -> VNode tag: div, elm: div#app
	        oldVnode = emptyNodeAt(oldVnode)
	      }
	
	      const oldElm = oldVnode.elm
	      // ubdefined
	      const parentElm = nodeOps.parentNode(oldElm)
	      // 创建并添加新节点
	      createElm(vnode,
	        insertedVnodeQueue,
	        oldElm._leaveCb ? null : parentElm,
	        nodeOps.nextSibling(oldElm))
	
	      if (isDef(vnode.parent)) {
	        // ...
	      }
	
		  // 移除原始节点
	      if (isDef(parentElm)) {
	        removeVnodes(parentElm, [oldVnode], 0, 0)
	      }
	    }
	    // 插入节点 暂时不知道干什么的
	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
	    return vnode.elm
	  }
	}