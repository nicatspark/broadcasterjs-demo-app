import { Block, Page } from './pages.styles'

export const PageGetStarted = () => {
  return (
    <Page>
      <h1>Simplifiy your life today</h1>
      <p className='limited'>
        It is never to late to start simplifying your life. Start using the
        pub/sub event bus today!
      </p>
      <Block limit='30rem'>
        <p>Import broadcaster.ts</p>
        <code>import broadcast from "./broadcast";</code>
        <p>Subscribe:</p>
        <code>{`broadcast.on(['example-flag', () => setMyUseState(true)])`}</code>
        <p>Publish:</p>
        <code>{`broadcast.emit('example-flag', {detail: someVarToEmit})`}</code>
        <p>Publish with data:</p>
        <code>{`broadcast.emit('example-flag', {detail: myData})`}</code>
      </Block>
      <p className='limited'>
        BroadcasterJS is a pub/sub event transmitter written in typescript. A
        subscriber in one part of your app is always ready to execute a function
        triggered from another part of your app. With or without arguments. Use
        it once or architect your whole web app infrastructure around events.
        Either way this lightweight gem of code will suit your needs.
      </p>
      <p className='limited'>
        BroadcasterJS is framework agnostic and therefor doesn't in itself
        trigger any rerenders. So to get it back into the React realm just put
        the subscriber in a useEffect like so. Emitters can be trigger anywhere.
      </p>
      <Block limit='30rem'>
        <p>In React wrap the subscriber in a useEffect:</p>
        {/* // prettier-ignore */}
        <pre style={{ lineHeight: '1.5rem' }}>
          <code>{`useEffect(() => {
    broadcast.on(['example-flag', () => setMyUseState(true)])
  }, [])`}</code>
        </pre>
      </Block>
    </Page>
  )
}
