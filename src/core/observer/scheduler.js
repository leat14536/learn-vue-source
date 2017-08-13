/**
 * Created by Administrator on 2017/8/13 0013.
 */
import {
  nextTick,
  devtools
} from '../util/index'
import config from '../config'

let has = {}
let flushing = false
const queue = []
const activatedChildren = []
let index = 0
let waiting = false

function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0
  has = {}
  waiting = flushing = false
}

function flushSchedulerQueue() {
  flushing = true
  let watcher, id

  queue.sort((a, b) => a.id - b.id)

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    id = watcher.id
    has[id] = null
    watcher.run()
  }

  const activatedQueue = activatedChildren.slice()
  const updatedQueue = queue.slice()

  resetSchedulerState()

  if (devtools && config.devtools) {
    // ...
  }
}

export function queueWatcher(watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      queue.push(watcher)
    } else {
      let i = queue.length - 1
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }

    if (!waiting) {
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}
