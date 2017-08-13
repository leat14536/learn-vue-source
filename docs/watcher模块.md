# vue 的$watch模块

例子: 

	let app = new Vue({
	  el: '#app',
	  data: {
	    a: 1,
	    b: [1, 2, 3]
	  }
	})
	
	app.$watch('a', () => {
	  alert(9)
	})
	
	app.$watch('a', () => {
	  alert(90)
	})
	
	app.a = 5
	// alert 9
	// alert 90

首先来看一下挂载$watcher的位置 ```src\core\instance\state.js``` 
	
	 Vue.prototype.$watch = function (expOrFn, cb, options) {
	    const vm = this
	    if (isPlainObject(cb)) {
	      // ...
	    }
	    option = options || {}
	    options.user = true
	    const watcher = new Watcher(vm, expOrFn, cb, options)

	    if (options.immediate) {
	      // ... 立即执行cb
	    }
	
	    // 返回取消观察函数
	    return function unwatchFn() {
	      watcher.teardown()
	    }
	  }

做的事情不多, 将options.user设为true并创建Watcher的实例. 接下来来看Watcher的构造函数  ```src\core\observer\watcher.js```

	constructor(vm, expOrFn, cb, options) {
	    this.vm = vm
	    if (options) {
	      this.deep = !!options.deep
	      this.user = !!options.user
	      this.lazy = !!options.lazy
	      this.sync = !!options.sync
	    } else {
	      this.deep = this.user = this.lazy = this.sync = false
	    }
	    this.cb = cb
	    this.id = ++uid // uid for batching
	    this.active = true
	    this.dirty = this.lazy // for lazy watchers
	    this.deps = []
	    this.newDeps = []
	    this.depIds = new Set()
	    this.newDepIds = new Set()
	    this.expression = expOrFn.toString()
	    if (typeof expOrFn === 'function') {
	      this.getter = expOrFn
	    } else {
			// getter函数在这里创建
			// 返回一个函数 传入obj返回exp相应的值
	      this.getter = parsePath(expOrFn)
	      if(!this.getter) {
	        this.getter = function () {
	        }
	        warn('watcher warn')
	      }
	    }
	    this.value = this.lazy ? undefined : this.get()
	  }

	get() {
		//
	    pushTarget(this)
	    let value
	    const vm = this.vm
	    try {
	      value = this.getter.call(vm, vm)
	    } catch (e) {
	      throw e
	    } finally {
	      // "touch" every property so they are all tracked as
	      // dependencies for deep watching
	       if (this.deep) {
	       	// watcher冒泡相关
	       } 
	      popTarget()
	      this.cleanupDeps()
	    }
	    return value
	}

get方法为dep设置了target 在this.getter.call(vm, vm)时触发get方法
再回头看get	

	get: function reactiveGetter() {
	      const value = getter ? getter.call(obj) : val
	
	      // computed 收集依赖
	      if (Dep.target) {
	        dep.depend()
	        if (childOb) {
	          childOb.dep.depend()
	        }
	        if (Array.isArray(value)) {
	          dependArray(value)
	        }
	      }
	      return value
	    },

在target有值时触发dep实例的depend方法

	 depend () {
	    if (Dep.target) {
	      Dep.target.addDep(this)
	    }
	  }

depend又触发watcher的 addDep 并把对应值的的dep实例传入watcher

	addDep(dep) {
	    const id = dep.id
	    if (!this.newDepIds.has(id)) {
	      this.newDepIds.add(id)
	      this.newDeps.push(dep)
	      if (!this.depIds.has(id)) {
	        dep.addSub(this)
	      }
	    }
	  }

addDep 将dep实例压入newDeps中并调用 dep的addSub方法 dep最终将这个watcher压入data相应dep实例的subs中, computed应该和这个方法同理

在data的值改变时会循环调用dep.sub[x]的update方法

	  update() {
	    if (this.lazy) {
	      // ...
	    } else if(this.sync){
	      // ...
	    } else {
	       queueWatcher(this)
	    }
	  }

queueWatcher的作用是保证触发update的watcher按照创建顺序, 并使用promise.then延迟执行执行
	
	  