// tslint:disable:interface-over-type-literal
import { RootAction, SET_ORDER } from '@state/actions/usersActions'

export type IStateUsers = {
  readonly list: ReadonlyArray<string>
}

const initialState: IStateUsers = {
  list: ['Adam', 'Johan', 'Aleksandra', 'Siret'],
}

export const usersReducers = (state = initialState, action: RootAction) => {
  switch (action.type) {
    case SET_ORDER:
      return Object.assign({}, state, {
        list: action.payload,
      })

    default:
      return state
  }
}
