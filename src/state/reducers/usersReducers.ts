import { Reducer } from 'redux'

import { IRootActions } from '@state/index'
import { ICachedState } from '@state/epics/cacheEpics'
import {
  ADD_USER,
  REMOVE_USER,
  SET_ACTIVE,
  SET_ACTIVE_NEXT,
  SET_ORDER,
  TOGGLE_HIDE_USER_LIST,
} from '@state/actions/constants'

export interface IStateUsers {
  list: ReadonlyArray<string>
  activeUser: number
  hideUserList: boolean
}

const initialState: IStateUsers = {
  list: [],
  activeUser: 0,
  hideUserList: true,
}

const { users: cachedUsers } = JSON.parse(
  localStorage.getItem('cache') || '{ "users": null }'
) as ICachedState

if (cachedUsers) {
  initialState.list = cachedUsers.list
  initialState.activeUser = cachedUsers.activeUser
}

export const usersReducers: Reducer<IStateUsers, IRootActions> = (
  state = { ...initialState },
  action
) => {
  switch (action.type) {
    case SET_ORDER:
      return {
        ...state,
        list: action.payload,
      }

    case SET_ACTIVE_NEXT:
      const nextUser = state.activeUser + 1

      return {
        ...state,
        activeUser: nextUser < state.list.length ? nextUser : 0,
      }

    case ADD_USER:
      return {
        ...state,
        list: [...state.list, action.payload],
      }

    case REMOVE_USER:
      const list = [...state.list]
      list.splice(action.payload, 1)

      return { ...state, list }

    case SET_ACTIVE:
      return {
        ...state,
        activeUser: action.payload,
      }

    case TOGGLE_HIDE_USER_LIST:
      return {
        ...state,
        hideUserList: !state.hideUserList,
      }

    default:
      return state
  }
}
