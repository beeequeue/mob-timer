import * as React from 'react'
import List from 'material-ui/es/List'
import Grid from 'material-ui/es/Grid'
import Divider from 'material-ui/es/Divider'
import { DraggableUser } from './User'

interface IProps {
  users: ReadonlyArray<string>
  moveUser(dragIndex: number, hoverIndex: number): void
}

export class UserList extends React.PureComponent<IProps> {
  public render() {
    return (
      <span>
        <Grid container justify="center">
          <List component="nav">
            {this.props.users.map((user, i) => (
              <React.Fragment key={user}>
                {i !== 0 && <Divider />}

                <DraggableUser
                  user={user}
                  index={i}
                  moveUser={this.props.moveUser}
                />
              </React.Fragment>
            ))}
          </List>
        </Grid>
      </span>
    )
  }
}
