import * as React from 'react'
import styled from 'styled-components'

const ToHide = styled.span`
  @media only screen and (min-width: 600px) {
    display: none;
  }
`

export const HideOnBigDevices: React.SFC = props => (
  <ToHide>{props.children}</ToHide>
)
