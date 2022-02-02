import { useEffect, useState } from 'react'
import { broadcast } from '../scripts/broadcast'
import { Section1 } from '../Section1'
import { Section2 } from '../Section2'
import { Page } from './pages.styles'

export const PageExamples = () => {
  const [, setCurrentPage] = useState(1)
  const [showAssertion, setShowAssertion] = useState(false)

  useEffect(() => {
    broadcast.on([
      'set-page',
      ({ detail: page }: { detail: number }) => {
        setCurrentPage(page)
        if (page !== 3) setShowAssertion(false)
      },
    ])
    broadcast.on(['example-flag', () => setShowAssertion(true)])
  }, [])

  return (
    <Page>
      <h1>Live Example</h1>
      <p className='limited'>
        A click invokes a broadcast that is received in the sibling component
        where it sets a local state in React that triggers a re-render.
      </p>
      <div className='wrapper'>
        <Section1 />
        <Section2 />
      </div>
      <p
        style={{
          textAlign: 'center',
          transition: 'opacity 2s',
          opacity: showAssertion ? '1' : '0',
        }}
      >
        No props where abused in this button click.
        <span
          style={{
            textAlign: 'center',
            transition: 'opacity 2s linear 3s',
            opacity: showAssertion ? '1' : '0',
          }}
        >
          {' '}
          Scouts honor.
        </span>
      </p>
    </Page>
  )
}
