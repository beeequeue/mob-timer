import * as React from 'react'
import { DialogContainer } from 'react-md/lib/Dialogs'
import { FontIcon } from 'react-md/lib/FontIcons'
import styled from 'styled-components'

const Instruction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  & > .md-icon {
    margin-right: 6px;
  }
`

const Key = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  font-size: 1.1em;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.65);
`

interface IProps {
  readonly visible: boolean
  readonly hide: () => void
}

export class KeyboardShortcutsDialog extends React.PureComponent<IProps> {
  private actions = [{ children: 'Back', onClick: this.props.hide }]

  public render() {
    return (
      <DialogContainer
        id="keyboard-shortcuts-dialog"
        title="Keyboard Shortcuts"
        visible={this.props.visible}
        actions={this.actions}
        onHide={this.props.hide}
      >
        <Instruction title="Spacebar">
          <FontIcon>space_bar</FontIcon> Start / pause the timer
        </Instruction>

        <Instruction title="Spacebar">
          <Key>R</Key> Reset the timer
        </Instruction>
      </DialogContainer>
    )
  }
}
