import * as React from 'react'
import { connect } from 'react-redux'

import { IRootState } from '@state/index'
import {
  setOrder,
  addUser,
  removeUser,
  setActive,
  toggleHideUserList,
} from '@state/actions/usersActions'
import { UserList } from '../components/UserList'

interface IStateProps {
  readonly users: ReadonlyArray<string>
  readonly activeUser: number
  readonly hideUserList: boolean
}

interface IActionProps {
  setOrder: typeof setOrder
  addUser: typeof addUser
  removeUser: typeof removeUser
  setActive: typeof setActive
  toggleHideUserList: typeof toggleHideUserList
}

const mapState = ({ users }: IRootState): IStateProps => ({
  users: users.list,
  activeUser: users.activeUser,
  hideUserList: users.hideUserList,
})

const mapActions: IActionProps = {
  setOrder,
  addUser,
  removeUser,
  setActive,
  toggleHideUserList,
}

class UserComponent extends React.PureComponent<IStateProps & IActionProps> {
  private moveUser = (dragIndex: number, hoverIndex: number) => {
    const users = [...this.props.users]
    const [movingUser] = users.splice(dragIndex, 1)
    users.splice(hoverIndex, 0, movingUser)

    this.props.setOrder(users)
  }

  public render() {
    return (
      <UserList
        users={this.props.users}
        activeUser={this.props.activeUser}
        hideUserList={this.props.hideUserList}
        moveUser={this.moveUser}
        addUser={this.props.addUser}
        removeUser={this.props.removeUser}
        setActive={this.props.setActive}
        toggleHideUserList={this.props.toggleHideUserList}
      />
    )
  }
}

export const UserContainer = connect(mapState, mapActions)(UserComponent)
