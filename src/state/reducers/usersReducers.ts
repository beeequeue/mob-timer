// tslint:disable:interface-over-type-literal
import {
  RootAction,
  SET_ORDER,
  SET_ACTIVE_NEXT,
} from '@state/actions/usersActions'

export type IStateUsers = {
  readonly list: ReadonlyArray<string>
  readonly activeUser: number
}

const initialState: IStateUsers = {
  list: ['Adam', 'Johan', 'Aleksandra', 'Siret'],
  activeUser: 0,
}

export const usersReducers = (state = initialState, action: RootAction) => {
  switch (action.type) {
    case SET_ORDER:
      return Object.assign({}, state, {
        list: action.payload,
      })

    case SET_ACTIVE_NEXT:
      let nextUser = state.activeUser + 1

      if (nextUser >= state.list.length) {
        nextUser = 0
      }

      return Object.assign({}, state, {
        activeUser: nextUser,
      })

    default:
      return state
  }
}
