import { SET_TIME } from './types'

export const setTime = (payload: string) => ({
  type: SET_TIME,
  payload,
})
