# component 基础流程

	js:
	let todo = Vue.component('todo-item', {
	  template: '<li>这是个待办项</li>'
	})

	let app = new Vue({
	  el: '#app',
	  data: {
	    a: 1
	  },
	  components: {
	    todo
	  }
	})

	html:
	<div id="app">
	  <span>{{a}}</span>
	  <ol>
	    <todo-item></todo-item>
	  </ol>
	</div>

Vue.component()这个方法会返回一个VueComponent继承了Vue构造函数, 并将第一个参数作为name及第二个参数内部属性挂载在静态VueComponent.options和Vue.options.components上

接下来,进入new Vue(). mergeOptions时会通过Object.create()方法将Vue.options.components挂载在vm实例的__proto__上,将传入option的components挂载在vm.options上

	vm.options.components = {
		todo: Vuecomponent //name:'todo-item'
		__proto__:{
			'todo-item': Vuecomponent  //name:'todo-item'
			...
		}
	}

这样就保证了html中使用 ```<todo-item>``` 和 ```<todo>``` 都能找到同一个component

parseNode的时候会将```<todo-item>``` 转化为 ```tag: "todo-item",type: 1```

接下来经过一系列的处理到_createElement处理tag为todo-item时

	function _createElement(context, tag, data, children, normalizationType) {
	  ...

	  let vnode, ns
	  if (typeof tag === 'string') {
	    let Ctor
	    // @return (tag === (SVG || Math)) ? true : false
	    ns = config.getTagNamespace(tag)
	    if (config.isReservedTag(tag)) {
	      vnode = new VNode(tag, data, children, undefined, undefined, context)
	    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // Ctor 为返回的component组件
	      // components
	      vnode = createComponent(Ctor, data, context, children, tag)
	    } else {
	      // ...
	    }
	  } else {
	    // ...
	  }

	  ...
	}

会进入 else if 分支. resolveAsset 方法会在内部将tag转化 todo-item => todoItem => TodoItem 并返回相应的VueComponent

然后调用 createComponent() 这个函数内部将VueComponent的内部使用的钩子方法
destory,
init(创建VueComponent实例并挂载),
insert(调用mount钩子, 处理keep-alive),
prepatch
放在data.hook下
最后创建构造component的VNode实例并返回
```vnode{data:{hook:{...}}, tag:'vue-component-1-todo-item'}``` 作为```<ol>```下的child

patch -> createElm (div) -> createChild -> crateElm(ol) -> createChild(todo-item) -> createElm -> createComponent  在这里调用vnode.data.hook.init 钩子

	init(vnode, hydrating, parentElm, refElm) {
	    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
	      // 创建vuecomponent实例 并返回
	      const child = vnode.componentInstance = createComponentInstanceForVnode(
	        vnode, activeInstance, parentElm, refElm
	      )
	      child.$mount(hydrating ? vnode.elm : undefined, hydrating)
	    } else if (vnode.data.keepAlive) {
	      // ... keep-alive
	    }
	  }

```createComponentInstanceForVnode``` 内部创建并返回VueComponent实例 传入组件分支专用的options

	function VueComponent(options) {
      this._init(options)
    }

VueComponent继承自Vue, 传入options会进入Vue._init的组件分支, 在合并options时调用initInternalComponent方法, 将组件的静态方法挂在```vm.$option.__proto__```上 将组件用options挂在$options上. initLifecycle(vm) 会把当前vm push进parent实例的$childeren中

因为没有传入el所以并不会调用$mount, 最后返回VueComponent实例, child再调用```child.$mount(hydrating ? vnode.elm : undefined, hydrating)```
第一层$mount和Vue干的事情一样, 第二层$mount -> patch()时 因为组件没有挂载$el, 所以oldVnode不存在, createElm会直接将创建好的dom节点挂载在parentElm中patch快结束调用invokeInsertHook时将组件的insert钩子缓存起来

在经过一层一层回溯渲染完所有dom以后调用invokeInsertHook时会调用组件的insert内部钩子 -> call('component mounted')生命周期钩子
