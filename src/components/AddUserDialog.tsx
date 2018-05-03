import * as React from 'react'
import keydown from 'react-keydown/es'
import { Button } from 'react-md/lib/Buttons'
import { DialogContainer } from 'react-md/lib/Dialogs'
import { Autocomplete } from 'react-md/lib/Autocompletes'

interface IProps {
  readonly visible: boolean
  readonly hide: () => void
  readonly addUser: (name: string) => void
}

interface IState {
  readonly value: string
  readonly error: boolean
  readonly names: ReadonlyArray<string>
}

export class AddUserDialog extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  public state = {
    value: '',
    error: false,
    names: JSON.parse(localStorage.getItem('names') || '[]'),
  }

  private submit = () => {
    const name = this.state.value

    if (name.trim().length < 3) {
      return this.setState({ error: true })
    }

    this.props.addUser(name)
    this.props.hide()

    const names = [...this.state.names]

    if (names.includes(name)) {
      names.splice(names.indexOf(name))
    }

    this.setState({
      value: '',
      names: [name, ...names],
      error: false,
    })
  }

  @keydown('enter')
  private onSubmit() {
    this.submit()
  }

  private onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) return this.submit()
  }

  private onFieldChange = (value: string) => {
    this.setState({ value })
  }

  public selectName = (name: string) => {
    this.setState({ value: name })
  }

  private actions = [
    { children: 'Cancel', onClick: this.props.hide },
    <Button key="confirm" flat primary onClick={this.submit}>
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
        <Autocomplete
          inline
          id="add-user-text-input"
          label="Name"
          data={this.state.names}
          value={this.state.value}
          filter={Autocomplete.fuzzyFilter}
          onChange={this.onFieldChange}
          onAutocomplete={this.selectName}
          error={this.state.error}
          onKeyDown={this.onInputKeyDown}
        />
      </DialogContainer>
    )
  }
}
