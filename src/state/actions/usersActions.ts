import { createStandardAction } from 'typesafe-actions'
import {
  ADD_USER,
  REMOVE_USER,
  SET_ACTIVE,
  SET_ACTIVE_NEXT,
  SET_ORDER,
  TOGGLE_HIDE_USER_LIST,
} from '@state/actions/constants'

export const addUser = createStandardAction(ADD_USER)<string>()

export const removeUser = createStandardAction(REMOVE_USER)<number>()

export const setOrder = createStandardAction(SET_ORDER)<string[]>()

export const setActive = createStandardAction(SET_ACTIVE)<number>()

export const setActiveNext = createStandardAction(SET_ACTIVE_NEXT)()

export const toggleHideUserList = createStandardAction(TOGGLE_HIDE_USER_LIST)()
