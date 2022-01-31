import './styles.css'

import { Section1 } from './Section1'
import { Section2 } from './Section2'
import { Drawer } from './Drawer'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { broadcast } from './broadcast'

// Using passed-props as SC example,
// prefer a css custom vars solution for this.
const Pages = styled.div`
  transform: ${({ viewPage }: { viewPage: number }) =>
    `translateX(calc((var(--visible-width)) * -${viewPage - 1}))`};
  display: flex;
  flex-flow: row nowrap;
  transition: transform 300ms ease-out;
`

const Page = styled.div`
  min-width: calc(100vw - var(--menu-min-width));
  outline: 1px solid #eee;
  padding: 0 1rem;
  max-height: calc(100vh - var(--header-height));
  overflow: scroll;
  h1 {
    text-align: center;
    margin-top: max(15vh - 50px, 4rem);
  }
  .limited {
    max-width: 35rem;
    margin: 1.5rem auto;
    line-height: 1.8rem;
  }
`

const Block = styled.div`
  max-width: ${({ limit }: { limit: number }) => limit};
  margin: 0 auto;
  p {
    margin-bottom: 0;
  }
  code {
    background-color: yellow;
    border-radius: 3px;
    padding: 0.3rem 1rem;
  }
`

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
    broadcast.on(['my-flag', () => setShowAssertion(true)])
  }, [])

  return (
    <div className='App'>
      <header>
        <h1>A Pub/Sub Event Bus</h1>
      </header>
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
            <code>{`broadcast.on(['my-flag', () => setMyUseState(true)])`}</code>
            <p>Publish:</p>
            <code>{`broadcast.emit('my-flag', {detail: someVarToEmit})`}</code>
            <p>Publish with data:</p>
            <code>{`broadcast.emit('my-flag', {detail: myData})`}</code>
          </Block>
          <p className='limited'>
            Use it once or architect your whole web app infrastructure around
            events. Either way this gem of code will suit your needs.
          </p>
          <p className='limited'>
            Broadcasterjs is framework agnostic and therefor doesn't in itself
            trigger any rerenders. So to get it back into the React realm just
            put the subscriber in a useEffect like so. Emitters can be triggered
            anywhere.
          </p>
          <Block limit='30rem'>
            <p>Subscribe in React:</p>
            <code>{`useEffect(() => {\n
              broadcast.on(['my-flag', () => setMyUseState(true)])\n
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
        <Page>
          <h1>The source code</h1>
          <p className='center'>broadcast.ts</p>
          <code>
            <pre>
              {`
              type ListenerProps = <T extends unknown>([type, listener]: [
                type: string,
                listener: T
              ]) => void
              
              interface returnType {
                on: ListenerProps
                once: ListenerProps
                off: ListenerProps
                emit: (type: string, detail?: unknown) => boolean
              }
              
              let broadcastItemsCache: string[] = []
              
              const eventBus = (): returnType => {
                const hubId = ' broadcast-node '
              
                const on = <T extends unknown>([type, listener]: [
                  type: string,
                  listener: T
                ]) => {
                  if (handleCache().listenerExists(type, listener)) return
                  const eventTarget = createOrGetCustomEventNode(hubId)
                  eventTarget.addEventListener(
                    'broadcast-' + type,
                    listener as EventListenerOrEventListenerObject
                  )
                }
                const once = <T extends unknown>([type, listener]: [
                  type: string,
                  listener: T
                ]) => {
                  if (handleCache().listenerExists(type, listener)) return
                  const eventTarget = createOrGetCustomEventNode(hubId)
                  eventTarget.addEventListener(
                    'broadcast-' + type,
                    listener as EventListenerOrEventListenerObject,
                    { once: true }
                  )
                }
                const off = <T extends unknown>([type, listener]: [
                  type: string,
                  listener: T
                ]) => {
                  handleCache().remove(type, listener)
                  const eventTarget = createOrGetCustomEventNode(hubId)
                  eventTarget.removeEventListener(
                    'broadcast-' + type,
                    listener as EventListenerOrEventListenerObject
                  )
                }
                const emit = (type: string, detail?: unknown): boolean => {
                  console.log(\`Broadcast: \${type}\`)
                  const eventTarget = createOrGetCustomEventNode(hubId)
                  return eventTarget.dispatchEvent(
                    new CustomEvent('broadcast-' + type, { detail })
                  )
                }
                return { on, once, off, emit }
              
                // Initiate or retreive node for custom event.
                function createOrGetCustomEventNode(hubId: string): Node {
                  const nodeIterator = document.createNodeIterator(
                    document.body,
                    NodeFilter.SHOW_COMMENT
                  )
                  while (nodeIterator.nextNode()) {
                    if (nodeIterator.referenceNode.nodeValue === hubId) {
                      return nodeIterator.referenceNode
                    }
                  }
                  return document.body.appendChild(document.createComment(hubId))
                }
              
                // Store each subscription (flag + details object serialized and hashed) in an array
                // taking advantage of the es6 modules intrinsic singleton properties.
                // If already stored reject request and exit silently.
                function handleCache() {
                  const listenerExists = (type: string, listener: unknown) => {
                    const id = createBroadcastId(type, listener)
                    console.log('broadcastItemsCache', broadcastItemsCache)
                    if (broadcastItemsCache.includes(type + id)) return true
                    broadcastItemsCache.push(type + id)
                    return false
                  }
                  const remove = (type: string, listener: unknown) => {
                    const removeId = createBroadcastId(type, listener)
                    broadcastItemsCache = broadcastItemsCache.filter((id) => id !== removeId)
                  }
                  return { listenerExists, remove }
                }
              
                // Serialize+hash the subscriber and store it to not add it twice.
                function createBroadcastId(flag: string, details: unknown): string {
                  let detailsStringified
                  switch (typeof details) {
                    case 'object':
                    case 'boolean':
                    case 'string':
                      detailsStringified = JSON.stringify(details)
                      break
                    case 'function':
                      detailsStringified = helpers().serializeFn(details as () => void, {})
                      break
                    default:
                      throw new Error('Could not identify type of "details".')
                  }
                  return helpers()
                    .hashCode(flag + detailsStringified)
                    .toString()
                }
              
                function helpers() {
                  const hashCode = (s: string) =>
                    s.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)
                  const serializeFn = (f: () => void, env: unknown) =>
                    JSON.stringify({ src: f.toString(), env: env })
                  return { serializeFn, hashCode }
                }
              }
              const broadcast = eventBus()
              export { broadcast }
            `}
            </pre>
          </code>
        </Page>
      </Pages>

      <Drawer />
    </div>
  )
}
