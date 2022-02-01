import { Block, Page } from './pages.styles'

export const PageDebug = () => {
  return (
    <Page>
      <h1>Debug</h1>
      <p className='limited'>
        So you implmented it and then things went south. Well, here is how to
        debug.
      </p>
      <p className='limited'>You can:</p>
      <ul className='limited'>
        <li>
          <summary className='limited'>
            <mark>Inspect</mark> what listeners are active.
            <details>
              Select elements tab in devtools. Find the &lt;!-- broadcast-node
              --&gt;. Select the node in dev-tools/elements tab and open
              event-listeners tab in second pane in dev-tools and all active
              listeners will be listed. Those starting with 'broadcast-' are
              yours.
            </details>
          </summary>
        </li>
        <li>
          <summary className='limited'>
            Activate debugmode <mark>globaly</mark> that outputs all events to
            the console log.
          </summary>
        </li>
        <li>
          <summary className='limited'>
            Activate debugmode <mark>localy</mark> that outputs all events to
            the console log.
          </summary>
        </li>
      </ul>
      <Block limit='30rem'>
        <p>Subscribe with debug localy:</p>
        <pre>
          <code style={{ lineHeight: '1.5rem' }}>
            {`broadcast.on(['example-flag', () => {
    setMyUseState(true)
  }], 'debug')`}
          </code>
        </pre>
      </Block>
    </Page>
  )
}
