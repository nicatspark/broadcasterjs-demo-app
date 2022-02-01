import './styles.css'

import { Section1 } from './Section1'
import { Section2 } from './Section2'
import { Drawer } from './Drawer'
import { useEffect, useState } from 'react'
import { broadcast } from './broadcast'
import { Page, Pages, Block } from './pages/pages.styles'
import { PageCode } from './pages/PageCode'
import { Header } from './Header'
import { Footer } from './Footer'
export default function App() {
  const [currentPage, setCurrentPage] = useState(1)
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
    <div className='App'>
      <Header />
      <Pages viewPage={currentPage}>
        <Page>
          <h1>Simplifiy your life today</h1>
          <p className='limited'>
            It is never to late to start simplifying your life. Start using the
            pub/sub event bus today!
          </p>
          <Block limit='30rem'>
            <p>Import broadcast.ts</p>
            <code>import broadcast from "./broadcast";</code>
            <p>Subscribe:</p>
            <code>{`broadcast.on(['example-flag', () => setMyUseState(true)])`}</code>
            <p>Publish:</p>
            <code>{`broadcast.emit('example-flag', {detail: someVarToEmit})`}</code>
            <p>Publish with data:</p>
            <code>{`broadcast.emit('example-flag', {detail: myData})`}</code>
          </Block>
          <p className='limited'>
            Use it once or architect your whole web app infrastructure around
            events. Either way this gem of code will suit your needs.
          </p>
          <p className='limited'>
            BroadcasterJS is framework agnostic and therefor doesn't in itself
            trigger any rerenders. So to get it back into the React realm just
            put the subscriber in a useEffect like so. Emitters can be triggered
            anywhere.
          </p>
          <Block limit='30rem'>
            <p>Subscribe in React:</p>
            <code>{`useEffect(() => {\n
              broadcast.on(['example-flag', () => setMyUseState(true)])\n
            }, [])`}</code>
          </Block>
        </Page>
        <Page>
          <h1>Benefits</h1>
          <div className='limited'>
            <h2>
              Benefits to useing a <mark>pub/sub pattern</mark> in general
            </h2>
            <ul>
              <li>
                Creating decoupled components makes for easier refactoring.
              </li>
              <li>No need for unnecessary prop drilling.</li>
              <li>
                Multiple events emitters can trigger a centralized functions
                placed in logical places instead of practical.
              </li>
              <li>
                Event driven web apps unleashes good DX. (developer happiness)
              </li>
            </ul>
            <h2>
              Benefits of using <mark>custom events</mark> (behind an api)
            </h2>
            <ul>
              <li>Framework agnostic.</li>
              <li>
                Works globaly in a micro frontend environment.<sup>*</sup>
              </li>
              <li>Scales well.</li>
              <li>Native. (Ages well)</li>
              <li>Native. (Performant)</li>
            </ul>
            <p>
              <sup>*</sup>
              <i>depending in mfe setup</i>
            </p>
            <h2>
              Prerequisites and requirements before creation of the pub/sub
            </h2>
            <ul>
              <li>Easy to use.</li>
              <li>No initialization.</li>
              <li>Plug and play.</li>
              <li>Inspectable and debugable.</li>
            </ul>
          </div>
        </Page>
        <Page>
          <h1>Live Example</h1>
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
        <PageCode />
      </Pages>
      <Footer />
      <Drawer />
    </div>
  )
}
