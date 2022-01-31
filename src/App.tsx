import './styles.css'

import { Section1 } from './Section1'
import { Section2 } from './Section2'
import { Drawer } from './Drawer'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { broadcast } from './broadcast'

// Using passed-props as example,
// prefer a css custom vars solution for this.
const Pages = styled.div`
  transform: ${({ viewPage }: { viewPage: number }) =>
    `translateX(calc(100vw * -${viewPage - 1}))`};
  display: flex;
  flex-flow: row nowrap;
  transition: transform 300ms ease-out;
`

const Page = styled.div`
  min-width: 100vw;
  outline: 1px solid red;
`

export default function App() {
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    broadcast.on([
      'set-page',
      ({ detail }: { detail: number }) => {
        console.log(detail)
        setCurrentPage(detail)
      },
    ])
  }, [])

  return (
    <div className='App'>
      <h1>Pub/sub event bus</h1>
      <h2>Custom events</h2>
      <Pages viewPage={currentPage}>
        <Page>
          <h1>First page</h1>
        </Page>
        <Page>
          <h1>Second page</h1>
        </Page>
        <Page>
          <div className='wrapper'>
            <Section1 />
            <Section2 />
          </div>
        </Page>
      </Pages>

      <Drawer />
    </div>
  )
}
