import {
  ADD_USER,
  REMOVE_USER,
  SET_ORDER,
  SET_ACTIVE,
  SET_ENABLED,
} from './types'

export const addUser = (payload: string) => ({
  type: ADD_USER,
  payload,
})

export const removeUser = (payload: number) => ({
  type: REMOVE_USER,
  payload,
})

export const setOrder = (payload: string[]) => ({
  type: SET_ORDER,
  payload,
})

export const setActive = (payload: number) => ({
  type: SET_ACTIVE,
  payload,
})

export const setEnabled = (payload: number) => ({
  type: SET_ENABLED,
  payload,
})

export const countDownOneSecond = () => ({ type: 'COUNT_DOWN_ONE_SECOND' })
