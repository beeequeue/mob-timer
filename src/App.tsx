import * as React from 'react'
import styled from 'styled-components'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { setTime } from './actions/timer'

const Container = styled.div`
  text-align: center;
`

interface IStateProps {
  duration: string
}

interface IActionProps {
  setTime: typeof setTime
}

const mapState = (state: IState): IStateProps => ({
  duration: state.timer.duration.toString(),
})

const mapActions = { setTime }

export class AppComponent extends React.Component<IStateProps & IActionProps> {
  constructor(props: any) {
    super(props)

    this.setTimeToTen = this.setTimeToTen.bind(this)
  }

  private setTimeToTen() {
    this.props.setTime('10:00')
  }

  public render() {
    const { duration } = this.props

    return (
      <Container>
        <p className="App-intro">{duration}</p>

        <button onClick={this.setTimeToTen}>Set time to 10:00</button>
      </Container>
    )
  }
}

export const App = compose(connect(mapState, mapActions))(AppComponent)
