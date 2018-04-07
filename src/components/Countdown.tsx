import * as React from 'react'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import { Time } from '../time'

interface IProps {
  time: Time
  onChangeTime: (time: Time) => void
}

const TimeAndButtons = styled.span`
  display: inline-flex;
  flex-direction: column;
`

const Timer = styled.span`
  font-size: 10vw;
`

export class Countdown extends React.PureComponent<IProps> {
  private changeMinutes = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { time, onChangeTime } = this.props
    const newMinutes = time.minutes + Number(e.currentTarget.textContent)

    if (newMinutes < 0) return

    const newTime = new Time(
      time.minutes + Number(e.currentTarget.textContent),
      time.seconds
    )

    onChangeTime(newTime)
  }

  private changeSeconds = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { time, onChangeTime } = this.props
    let newSeconds = time.seconds + Number(e.currentTarget.textContent)

    if (newSeconds < 0) newSeconds = 50
    if (newSeconds > 50) newSeconds = 0

    const newTime = new Time(time.minutes, newSeconds)

    onChangeTime(newTime)
  }

  public render() {
    const { time } = this.props

    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ height: '100%' }}
      >
        <TimeAndButtons>
          <Button onClick={this.changeMinutes} size="large">
            +1
          </Button>

          <Timer>
            {time.toString().substring(0, time.toString().indexOf(':'))}
          </Timer>

          <Button onClick={this.changeMinutes} size="large">
            -1
          </Button>
        </TimeAndButtons>

        <Timer>:</Timer>

        <TimeAndButtons>
          <Button onClick={this.changeSeconds} size="large">
            +10
          </Button>

          <Timer>
            {time.toString().substring(time.toString().indexOf(':') + 1)}
          </Timer>

          <Button onClick={this.changeSeconds} size="large">
            -10
          </Button>
        </TimeAndButtons>
      </Grid>
    )
  }
}
