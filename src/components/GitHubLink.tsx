import { hot } from 'react-hot-loader'
import * as React from 'react'
import styled from 'styled-components'

import iconUrl from '../assets/github.svg'

const Icon = styled.img`
  position: fixed;
  right: 15px;
  bottom: 15px;
  height: 40px;
  padding: 5px;
  border-radius: 100%;
  background: #eee;
`

export const GitHubLinkComponent: React.SFC = () => (
  <a target="_blank" href="https://github.com/beeequeue/mob-timer">
    <Icon src={iconUrl} />
  </a>
)

export const GitHubLink = hot(module)(GitHubLinkComponent)
