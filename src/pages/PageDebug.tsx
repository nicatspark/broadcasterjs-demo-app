import { Block, Page, Separator } from './pages.styles'

export const PageDebug = () => {
  return (
    <Page>
      <h1>
        Debug
        <div className='goahead-note'>
          Psst! Go ahead, try it on this site now -&gt;
        </div>
      </h1>
      <p className='limited'>
        So you implemented it and then things went south. Well, here is how to
        debug.
      </p>
      <p className='limited'>You can:</p>

      <details className='limited'>
        <summary>
          <mark>Inspect</mark> what listeners are active.
        </summary>
        Select elements tab in devtools. Find the &lt;!-- broadcast-node --&gt;.
        Select the node in dev-tools/elements tab and open event-listeners tab
        in second pane in dev-tools and all active listeners will be listed.
        Those starting with 'broadcast-' are yours.
        <img
          src='https://hervy.s3.eu-north-1.amazonaws.com/broadcastjs-inspect.jpg'
          alt='Screenshot of node in html that lists all element.'
        />
      </details>
      <details className='limited'>
        <summary>
          Activate a <mark>global</mark> debugmode that outputs all emit events
          as well as subscriptions when they occur to the console log.
        </summary>
        Add <mark>?debug=broadcasterjs</mark> to your url and open the devtools
        console.
      </details>
      <details className='limited'>
        <summary>
          Activate debugmode <mark>locally</mark> that outputs a specific
          subscription/emit event to the console log.
        </summary>
        <p>Subscribe with debug locally:</p>
        <Block limit='30rem' my='0rem'>
          <pre>
            <code style={{ lineHeight: '1.5rem' }}>
              {`broadcast.on(['EXAMPLE-FLAG', () => {
    setMyUseState(true)
  }], {debug: true})`}
            </code>
          </pre>
        </Block>
      </details>
      <Separator />
      <h2 className='limited'>Advanced use</h2>
      <h3 className='limited'>Circumvent the doublette guard</h3>
      <p className='limited'>
        BroadcasterJS is optimised for a SPA like situation where it can be a
        tall task to keep track of renders where subscription are set. Since the
        same custom event easily can be set multiple times BroadcasterJS by
        default does not allow more than one identical flag + callback
        combination to be set.
      </p>
      <p className='limited'>
        It is easy to circumevent this by sligthly changing the function to
        include a comment with a number /* 1 */ etc to ensure that the function
        is unique. You can also disable the guard by including a settings object
        as a third value in the subscriber array. The subscriber argument array
        would look something like{' '}
        <mark>{`['MY-EXAMPLE-FLAG', myCallbackFnToRunOnEvent, {allowDoublettesSubscribers:true}]`}</mark>
      </p>
      <p className='limited'>
        The broadcast subscriber function also returns an unique id for the flag
        + callback combination if you want to handle the doublette guard
        externally for some reason.
      </p>

      <h3 className='limited'>Invoke the global debug</h3>
      <p className='limited'>
        Aside from invoking the debug mode through the url with url params you
        can invoke it throught the settings object. Debug output will then start
        from when the settings object is set of course so the url method is
        preferable. Settings object example:{' '}
        <mark>{`['MY-EXAMPLE-FLAG', myCallbackFnToRunOnEvent, {debugGlobal:true}]`}</mark>
      </p>
    </Page>
  )
}
