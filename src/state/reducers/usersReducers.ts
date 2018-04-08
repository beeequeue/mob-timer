// tslint:disable:interface-over-type-literal
import { RootAction } from '@state/actions/usersActions'

export type IStateUsers = {
  readonly list: ReadonlyArray<string>
}

const initialState: IStateUsers = {
  list: [],
}

export const usersReducers = (state = initialState, action: RootAction) => {
  switch (action.type) {
    default:
      return state
  }
}
