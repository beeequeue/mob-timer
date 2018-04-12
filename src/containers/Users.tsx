import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { IState } from '@state/index'
import { setOrder } from '@state/actions/usersActions'
import { UserList } from '../components/UserList'

interface IStateProps {
  users: ReadonlyArray<string>
}

interface IActionProps {
  setOrder: typeof setOrder
}

const mapState = ({ users }: IState): IStateProps => ({
  users: users.list,
})

const mapActions = { setOrder }

class UserComponent extends React.PureComponent<IStateProps & IActionProps> {
  private moveUser = (dragIndex: number, hoverIndex: number) => {
    console.log(dragIndex, hoverIndex)
    const users = [...this.props.users]
    const [movingUser] = users.splice(dragIndex, 1)
    users.splice(hoverIndex, 0, movingUser)

    this.props.setOrder(users)
  }

  public render() {
    return (
      <UserList
        users={this.props.users}
        moveUser={this.moveUser}
      />
    )
  }
}

export const UserContainer = compose(connect(mapState, mapActions))(
  UserComponent
)
