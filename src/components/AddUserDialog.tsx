import * as React from 'react'
import { Button } from 'react-md/lib/Buttons'
import { DialogContainer } from 'react-md/lib/Dialogs'
import { TextField } from 'react-md/lib/TextFields'

interface IProps {
  readonly visible: boolean
  readonly hide: () => void
  readonly addUser: (name: string) => void
}

interface IState {
  value: string
  error: boolean
}

export class AddUserDialog extends React.PureComponent<IProps, IState> {
  public state = {
    value: '',
    error: false,
  }

  private onConfirmClick = () => {
    if (this.state.value.trim().length < 3) {
      return this.setState({ error: true })
    }

    this.props.addUser(this.state.value)
    this.props.hide()
  }

  private onFieldChange = (value: string) => {
    this.setState({ value })
  }

  private actions = [
    { children: 'Cancel', onClick: this.props.hide },
    <Button key="confirm" flat primary onClick={this.onConfirmClick}>
      Add
    </Button>,
  ]

  public render() {
    return (
      <DialogContainer
        id="add-user-dialog"
        title="Add User"
        visible={this.props.visible}
        actions={this.actions}
        onHide={this.props.hide}
      >
        <TextField
          id="add-user-text-input"
          label="Name"
          value={this.state.value}
          onChange={this.onFieldChange}
          error={this.state.error}
          errorText="Please enter a name longer than 2 characters."
        />
      </DialogContainer>
    )
  }
}
