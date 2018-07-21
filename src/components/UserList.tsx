import { hot } from 'react-hot-loader'
import * as React from 'react'
import styled, { StyledComponentClass } from 'styled-components'
import { List } from 'react-md/lib/Lists'
import { Button, ButtonProps } from 'react-md/lib/Buttons'
import { Divider } from 'react-md/lib/Dividers'

import { DraggableUser } from './User'
import { AddUserDialog } from './AddUserDialog'

interface IContainerProps {
  hidden: boolean
}

const Container = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  min-width: 175px;
  height: 100%;
  background: #fff;

  @media only screen and (max-width: 600px) {
    left: 0;
    opacity: ${(p: IContainerProps) => (p.hidden ? 1 : 0)};
    pointer-events: ${(p: IContainerProps) => (p.hidden ? 'all' : 'none')};
    transition: opacity 0.25s;
  }

  @media only screen and (min-width: 1025px) {
    min-width: 225px;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0;
  max-height: 100%;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`

const ButtonHideOnBigDevices: StyledComponentClass<ButtonProps, {}> = styled(
  Button
)`
  @media only screen and (min-width: 600px) {
    display: none;
  }
`

interface IProps {
  readonly users: ReadonlyArray<string>
  readonly activeUser: number
  readonly hideUserList: boolean
  readonly moveUser: (dragIndex: number, hoverIndex: number) => void
  readonly addUser: (name: string) => void
  readonly removeUser: (index: number) => void
  readonly setActive: (index: number) => void
  readonly toggleHideUserList: () => void
}

interface IState {
  dialogVisible: boolean
}

class UserListComponent extends React.PureComponent<IProps, IState> {
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
      <Container hidden={this.props.hideUserList}>
        <Wrapper>
          <List style={{ overflowY: 'auto' }}>
            {this.props.users.map((user, i) => (
              <React.Fragment key={user}>
                {i !== 0 && <Divider />}

                <DraggableUser
                  user={user}
                  active={this.props.activeUser === i}
                  index={i}
                  moveUser={this.props.moveUser}
                  removeUser={this.props.removeUser}
                  setActive={this.props.setActive}
                />
              </React.Fragment>
            ))}
          </List>

          <Divider />

          <ButtonWrapper>
            <Button
              raised
              primary
              iconChildren="add"
              style={{ margin: '15px', width: '100%' }}
              onClick={this.showDialog}
            >
              Add User
            </Button>

            <ButtonHideOnBigDevices
              raised
              iconChildren="arrow_back"
              onClick={this.props.toggleHideUserList}
              style={{ margin: '15px', width: '100%' }}
            >
              Go back
            </ButtonHideOnBigDevices>
          </ButtonWrapper>
        </Wrapper>

        <AddUserDialog
          visible={this.state.dialogVisible}
          hide={this.hideDialog}
          addUser={this.props.addUser}
        />
      </Container>
    )
  }
}

export const UserList = hot(module)(UserListComponent)
