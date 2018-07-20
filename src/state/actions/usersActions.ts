import { action } from 'typesafe-actions'
import {
  ADD_USER,
  REMOVE_USER,
  SET_ACTIVE,
  SET_ACTIVE_NEXT,
  SET_ORDER,
  TOGGLE_HIDE_USER_LIST,
} from '@state/actions/constants'

export const addUser = (name: string) => action(ADD_USER, name)

export const removeUser = (name: number) => action(REMOVE_USER, name)

export const setOrder = (names: string[]) => action(SET_ORDER, names)

export const setActive = (index: number) => action(SET_ACTIVE, index)

export const setActiveNext = () => action(SET_ACTIVE_NEXT)

export const toggleHideUserList = () => action(TOGGLE_HIDE_USER_LIST)
