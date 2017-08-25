/**
 * Created by Administrator on 2017/8/24 0024.
 */
import {Store, install} from './store'
import {mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers} from './helpers'

export default {
  Store,
  install,
  version: '__VERSION__',
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers
}
