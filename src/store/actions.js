/**
 * Created by Administrator on 2017/7/3 0003.
 */
import * as types from './mutation-types'

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, 1)
}

export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, 1)
}
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, 1)
}

export const deleteSongList = function ({commit}) {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}
