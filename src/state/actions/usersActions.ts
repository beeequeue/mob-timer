import { action, ActionType } from 'typesafe-actions'

export const ADD_USER = 'ADD_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_ORDER = 'SET_ORDER'
export const SET_ACTIVE = 'SET_ACTIVE'
export const SET_ACTIVE_NEXT = 'SET_ACTIVE_NEXT'
export const TOGGLE_HIDE_USER_LIST = 'TOGGLE_HIDE_USER_LIST'

export const addUser = (name: string) => action(ADD_USER, name)

export const removeUser = (name: number) => action(REMOVE_USER, name)

export const setOrder = (names: string[]) => action(SET_ORDER, names)

export const setActive = (index: number) => action(SET_ACTIVE, index)

export const setActiveNext = () => action(SET_ACTIVE_NEXT)

export const toggleHideUserList = () => action(TOGGLE_HIDE_USER_LIST)

export type UserActions = ActionType<
  typeof addUser &
    typeof removeUser &
    typeof setOrder &
    typeof setActive &
    typeof setActiveNext &
    typeof toggleHideUserList
>
