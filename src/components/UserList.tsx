import * as React from 'react'
import styled from 'styled-components'
import { List } from 'react-md/lib/Lists'
import { Divider } from 'react-md/lib/Dividers'

import { DraggableUser } from './User'

const Container = styled.span`
  display: flex;
  align-items: center;
  background: #fff;
`

interface IProps {
  users: ReadonlyArray<string>
  readonly activeUser: number
  moveUser(dragIndex: number, hoverIndex: number): void
}

export class UserList extends React.PureComponent<IProps> {
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
              />
            </React.Fragment>
          ))}
        </List>
      </Container>
    )
  }
}
