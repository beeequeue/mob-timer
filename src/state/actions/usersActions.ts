// tslint:disable:interface-over-type-literal
export const ADD_USER = 'ADD_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_ORDER = 'SET_ORDER'
export const SET_ACTIVE = 'SET_ACTIVE'
export const SET_ACTIVE_NEXT = 'SET_ACTIVE_NEXT'
export const TOGGLE_HIDE_USER_LIST = 'TOGGLE_HIDE_USER_LIST'

export type Actions = {
  readonly ADD_USER: {
    type: typeof ADD_USER
    payload: string
  }
  readonly REMOVE_USER: {
    type: typeof REMOVE_USER
    payload: number
  }
  readonly SET_ORDER: {
    type: typeof SET_ORDER
    payload: string[]
  }
  readonly SET_ACTIVE: {
    type: typeof SET_ACTIVE
    payload: number
  }
  readonly SET_ACTIVE_NEXT: {
    type: typeof SET_ACTIVE_NEXT
  }
  readonly TOGGLE_HIDE_USER_LIST: {
    type: typeof TOGGLE_HIDE_USER_LIST
  }
}

export type RootAction = Actions[keyof Actions]

export const addUser = (payload: string): Actions[typeof ADD_USER] => ({
  type: ADD_USER,
  payload,
})

export const removeUser = (payload: number): Actions[typeof REMOVE_USER] => ({
  type: REMOVE_USER,
  payload,
})

export const setOrder = (payload: string[]): Actions[typeof SET_ORDER] => ({
  type: SET_ORDER,
  payload,
})

export const setActive = (payload: number): Actions[typeof SET_ACTIVE] => ({
  type: SET_ACTIVE,
  payload,
})

export const setActiveNext = (): Actions[typeof SET_ACTIVE_NEXT] => ({
  type: SET_ACTIVE_NEXT,
})

export const toggleHideUserList = (): Actions[typeof TOGGLE_HIDE_USER_LIST] => ({
  type: TOGGLE_HIDE_USER_LIST,
})
