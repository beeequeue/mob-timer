// tslint:disable:interface-over-type-literal
import {
  RootAction,
  SET_ORDER,
  SET_ACTIVE_NEXT,
  REMOVE_USER,
  ADD_USER,
  SET_ACTIVE,
} from '@state/actions/usersActions'

export type IStateUsers = {
  readonly list: ReadonlyArray<string>
  readonly activeUser: number
}

const initialState: IStateUsers = {
  list: ['Adam', 'Johan', 'Aleksandra', 'Siret'],
  activeUser: 0,
}

const cachedSettings = JSON.parse(
  localStorage.getItem('cache') || '{ "users": null }'
).users

export const usersReducers = (
  state = Object.assign({}, initialState, cachedSettings),
  action: RootAction
) => {
  switch (action.type) {
    case SET_ORDER:
      return Object.assign({}, state, {
        list: action.payload,
      })

    case SET_ACTIVE_NEXT:
      const nextUser = state.activeUser + 1

      return Object.assign({}, state, {
        activeUser: nextUser < state.list.length ? nextUser : 0,
      })

    case ADD_USER:
      return Object.assign({}, state, { list: [...state.list, action.payload] })

    case REMOVE_USER:
      const list = [...state.list]
      list.splice(action.payload, 1)

      return Object.assign({}, state, { list })

    case SET_ACTIVE:
      return Object.assign({}, state, {
        activeUser: action.payload,
      })

    default:
      return state
  }
}
