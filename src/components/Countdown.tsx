import { hot } from 'react-hot-loader'
import * as React from 'react'
import { Button, ButtonProps } from 'react-md/lib/Buttons'
import styled, { StyledComponentClass } from 'styled-components'

import { Time } from '../time'

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  flex-shrink: 1;
`

const TimeAndButtons = styled.span`
  display: inline-flex;
  flex-direction: column;
`

// We need to pass strings to stop an error message due to styled-components
// https://github.com/BeeeQueue/mob-timer/issues/7
interface IStyledButtonProps {
  counting: 'true' | 'false'
}

const StyledButton: StyledComponentClass<
  IStyledButtonProps & ButtonProps,
  {}
> = styled(Button)`
  font-size: 1.5em;
  height: auto;
  opacity: ${(p: IStyledButtonProps) => (p.counting === 'true' ? 0 : 1)};
  pointer-events: ${(p: IStyledButtonProps) =>
    p.counting === 'true' ? 'none' : 'all'};
  transition-property: background-color, box-shadow, opacity !important;
`

const Timer = styled.span`
  font-size: 30vw;

  @media only screen and (min-width: 600px) {
    font-size: 15vw;
  }
`

interface IProps {
  time: Time
  counting: 'true' | 'false'
  onChangeTime: (time: Time) => void
}

class CountdownComponent extends React.PureComponent<IProps> {
  private changeMinutes = (e: React.MouseEvent<HTMLElement>) => {
    const { time, onChangeTime } = this.props
    const newMinutes = time.minutes + Number(e.currentTarget.textContent)

    if (newMinutes < 0) return

    const newTime = new Time(
      time.minutes + Number(e.currentTarget.textContent),
      time.seconds
    )

    onChangeTime(newTime)
  }

  private changeSeconds = (e: React.MouseEvent<HTMLElement>) => {
    const { time, onChangeTime } = this.props
    let newSeconds = time.seconds + Number(e.currentTarget.textContent)

    if (newSeconds < 0) newSeconds = 50
    if (newSeconds > 50) newSeconds = 0

    const newTime = new Time(time.minutes, newSeconds)

    onChangeTime(newTime)
  }

  public render() {
    const { time, counting } = this.props

    return (
      <Container>
        <TimeAndButtons>
          <StyledButton flat counting={counting} onClick={this.changeMinutes}>
            +1
          </StyledButton>

          <Timer>
            {time.toString().substring(0, time.toString().indexOf(':'))}
          </Timer>

          <StyledButton flat counting={counting} onClick={this.changeMinutes}>
            -1
          </StyledButton>
        </TimeAndButtons>

        <Timer>:</Timer>

        <TimeAndButtons>
          <StyledButton flat counting={counting} onClick={this.changeSeconds}>
            +10
          </StyledButton>

          <Timer>
            {time.toString().substring(time.toString().indexOf(':') + 1)}
          </Timer>

          <StyledButton flat counting={counting} onClick={this.changeSeconds}>
            -10
          </StyledButton>
        </TimeAndButtons>
      </Container>
    )
  }
}

export const Countdown = hot(module)(CountdownComponent)
