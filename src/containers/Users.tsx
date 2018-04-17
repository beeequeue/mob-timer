import * as React from 'react'
import { connect } from 'react-redux'

import { IState } from '@state/index'
import {
  setOrder,
  addUser,
  removeUser,
  setActive,
} from '@state/actions/usersActions'
import { UserList } from '../components/UserList'

interface IStateProps {
  readonly users: ReadonlyArray<string>
  readonly activeUser: number
}

interface IActionProps {
  setOrder: typeof setOrder
  addUser: typeof addUser
  removeUser: typeof removeUser
  setActive: typeof setActive
}

const mapState = ({ users }: IState): IStateProps => ({
  users: users.list,
  activeUser: users.activeUser,
})

const mapActions = { setOrder, addUser, removeUser, setActive }

class UserComponent extends React.PureComponent<IStateProps & IActionProps> {
  private moveUser = (dragIndex: number, hoverIndex: number) => {
    const users = [...this.props.users]
    const [movingUser] = users.splice(dragIndex, 1)
    users.splice(hoverIndex, 0, movingUser)

    this.props.setOrder(users)
  }

  public render() {
    return (
      <React.Fragment>
        <UserList
          users={this.props.users}
          activeUser={this.props.activeUser}
          moveUser={this.moveUser}
          addUser={this.props.addUser}
          removeUser={this.props.removeUser}
          setActive={this.props.setActive}
        />
      </React.Fragment>
    )
  }
}

export const UserContainer = connect(mapState, mapActions)(UserComponent)
