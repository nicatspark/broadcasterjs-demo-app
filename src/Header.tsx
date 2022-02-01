import styled from 'styled-components'

const HeaderH1 = styled.h1`
  display: inline-block;
  small {
    font-size: 1rem;
    margin-left: 1rem;
  }
`

export const Header = () => {
  return (
    <header>
      <HeaderH1>
        BroadcasterJS<small>A Simple Pub/Sub Event Bus</small>
      </HeaderH1>
    </header>
  )
}
