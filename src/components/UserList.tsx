import * as React from 'react'
import styled from 'styled-components'
import { List } from 'react-md/lib/Lists'
import { Divider } from 'react-md/lib/Dividers'
import { Button } from 'react-md/lib/Buttons'

import { DraggableUser } from './User'
import { AddUserDialog } from './AddUserDialog'

const Container = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
`

interface IProps {
  readonly users: ReadonlyArray<string>
  readonly activeUser: number
  readonly moveUser: (dragIndex: number, hoverIndex: number) => void
  readonly addUser: (name: string) => void
  readonly removeUser: (index: number) => void
}

interface IState {
  dialogVisible: boolean
}

export class UserList extends React.PureComponent<IProps, IState> {
  public state = {
    dialogVisible: false,
  }

  private showDialog = () => {
    this.setState({ dialogVisible: true })
  }

  private hideDialog = () => {
    this.setState({ dialogVisible: false })
  }

  public render() {
    return (
      <Container>
        <List>
          {this.props.users.map((user, i) => (
            <React.Fragment key={user}>
              {i !== 0 && <Divider />}

              <DraggableUser
                user={user}
                active={this.props.activeUser === i}
                index={i}
                moveUser={this.props.moveUser}
                removeUser={this.props.removeUser}
              />
            </React.Fragment>
          ))}
        </List>

        <Button
          raised
          primary
          iconChildren="add"
          style={{ margin: '5px 10px 0' }}
          onClick={this.showDialog}
        >
          Add User
        </Button>

        <AddUserDialog
          visible={this.state.dialogVisible}
          hide={this.hideDialog}
          addUser={this.props.addUser}
        />
      </Container>
    )
  }
}
