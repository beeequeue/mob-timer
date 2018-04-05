import * as React from 'react'
import styled from 'styled-components'
import { Time } from '../time'

interface IProps {
  time: Time
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 10vw;
  padding: 0;
`

export const Countdown: React.StatelessComponent<IProps> = props => (
  <Container>{props.time.toString()}</Container>
)
