import styled from 'styled-components'
import { broadcast } from './scripts/broadcaster'

const HeaderH1 = styled.h1`
  display: inline-block;
  span {
    cursor: pointer;
  }
  small {
    font-size: 1rem;
    margin-left: 1rem;
  }
`

export const Header = () => {
  const handleHeaderCLick = () => {
    broadcast.emit('SET-PAGE', 1)
  }
  return (
    <header>
      <HeaderH1>
        <span onClick={handleHeaderCLick}>BroadcasterJS</span>
        <small>A Simple Pub/Sub Event Bus</small>
      </HeaderH1>
    </header>
  )
}
