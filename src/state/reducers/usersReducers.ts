import { Action } from 'redux'
import {} from '@state/actions/types'

export interface IStateUsers {
  list: string[]
}

const initialState: IStateUsers = {
  list: [],
}

export const usersReducers = (state = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state
  }
}
