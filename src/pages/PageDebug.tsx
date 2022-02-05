import { Block, Page } from './pages.styles'

export const PageDebug = () => {
  return (
    <Page>
      <h1>Debug</h1>
      <p className='limited'>
        So you implemented it and then things went south. Well, here is how to
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
            Activate a <mark>global</mark> debugmode that outputs all emit
            events as well as subscriptions when they occur to the console log.
            <details>
              Add <mark>?debug=broadcasterjs</mark> to your url and open the
              devtools console.
            </details>
          </summary>
        </li>
        <li>
          <summary className='limited'>
            Activate debugmode <mark>localy</mark> that outputs a specific
            subscription/emit event to the console log.
            <details>See the example below.</details>
          </summary>
        </li>
      </ul>
      <Block limit='30rem'>
        <p>Subscribe with debug localy:</p>
        <pre>
          <code style={{ lineHeight: '1.5rem' }}>
            {`broadcast.on(['example-flag', () => {
    setMyUseState(true)
  }], {debug: true})`}
          </code>
        </pre>
      </Block>
      <h2 className='limited'>Advanced use</h2>
      <h3 className='limited'>Circumvent the doublette guard</h3>
      <p className='limited'>
        BroadcasterJS was optimised to run in a SPA like situation where it can
        be a tall task to keep track of renders where subscription are set.
        Since custom events can be set multiple times BroadcasterJS by default
        does not allow more than one identical flag + function combination to be
        set.
      </p>
      <p className='limited'>
        It is easy to circumevent this by sligthly changing the function to
        include a comment with a number /* 1 */ etc to ensure that the function
        is unique. You can also disable the guard by including a settings object
        as a third value in the subscriber array. The subscriber argument array
        would look something like{' '}
        {`['MY-EXAMPLE-FLAG', myFunctionToRunOnEvent, {allowDoublettesSubscribers:true}]`}
      </p>
      <p className='limited'>
        The broadcast subscriber function also returns an unique id for the flag
        + function combination if you want to handle the doublette guard
        externally for some reason.
      </p>

      <h3 className='limited'>Invoke the global debug</h3>
      <p className='limited'>
        Aside from invoking it through the url with url params you can invoke it
        throught the settings object. Debug output will then start from when the
        settings object is set of course so the url method is preferable.
        Example:{' '}
        {`['MY-EXAMPLE-FLAG', myFunctionToRunOnEvent, {debugGlobal:true}]`}
      </p>
    </Page>
  )
}
