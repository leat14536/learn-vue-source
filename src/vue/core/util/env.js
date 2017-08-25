/**
 * Created by Administrator on 2017/8/6 0006.
 */

// Browser environment sniffing
export const inBrowser = typeof window !== 'undefined'
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isIE = UA && /msie|trident/.test(UA)
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isEdge = UA && UA.indexOf('edge/') > 0
export const isAndroid = UA && UA.indexOf('android') > 0
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge

let _isServer
export const isServerRendering = () => {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server'
    } else {
      _isServer = false
    }
  }
  return _isServer
}

export const hasProto = '__proto__' in {}

export class ISet {
  constructor() {
    this.set = Object.create(null)
  }

  has(key) {
    return this.set[key] === true
  }

  add(key) {
    this.set[key] = true
  }

  clear() {
    this.set = Object.create(null)
  }
}

export const nextTick = (function () {
  const callbacks = []
  let pending = false
  let timerFunc

  function nextTickHandler() {
    pending = false
    const copies = callbacks.slice(0)
    for (let i = 0; i < copies.length; i++) {
      copies[i]()
    }
  }

  if (typeof Promise !== 'undefined') {
    let p = Promise.resolve()
    let logErr = err => {
      console.error(err)
    }
    timerFunc = () => {
      p.then(nextTickHandler).catch(logErr)
      // ... if(isIos)
    }
  }
  // ... else

  return function queueNextTick(cb, ctx) {
    let _resolve
    callbacks.push(() => {
      if (cb) {
        try {
          cb.call(ctx)
        } catch (e) {
          console.warn(e)
        }
      } else if (_resolve) {
        // ...
      }
    })

    if (!pending) {
      pending = true
      timerFunc()
    }

    if (!cb && typeof Promise !== 'undefined') {
      // ...
    }
  }
})()

export const devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__
