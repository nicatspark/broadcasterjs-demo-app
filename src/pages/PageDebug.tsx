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
          src='https://hervy.s3.eu-north-1.amazonaws.com/broadcastjs-inspect.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCmV1LW5vcnRoLTEiRjBEAiA%2Bx6wxtTN3PAMMAACe5Z1cXcZ4Phj293Y81TGFYp7S%2FQIgO3h2hWKPaoRDp3Sy%2F4hSQoMFXaJ99w3AxK%2BNFQbImBcqlQIIYhAAGgwzMTQ1Mjk5ODM1MTEiDFv2ZmSNftSxBAAh6SryAXJSk2qzZJxW3lnuLLiJUTXrQzOD9fb37fAbyVN4vQG3HmqF%2FkzR8fruRwEBBNn1bi5QnRyS6E2zv0tsh1Oh04X66OeISMQ1ekVAl%2BNoJQ5KDVzQLHiTeMnOoUjTUvXpLSRHMXXDXtYzSvvmAK2yhwbHwBS%2FmqmA1m4J6zaa9ikkUynjsz3C1dvY3J0XoYII6x1%2BvJN1%2BjlerweCeJDmtPUWlIydDimLOrybqiagPdqiZ7c%2F6mT%2BG28EFz34MwheTo1%2FQ5CpJwtMOpwA5OuKKkOyRXLIamW0XILej35GfpIExrl%2F5itK08MwId6LV5AMkAgFMKvDn5AGOuABabFWkHtyaRBFyEdLfK1qfGS17pPD%2FL%2F5gDZq3h%2Bnun9lGZe95G7WHBANFAhKtam66OrvoIz9zXHi3H%2BLYJjBs1Wyenv8weQusuHgf2pX6l%2B1e5R%2FzZgQbicFmQEFJrEqqoiUU5%2BngcgN3598OvBN7c1Ie0yvyyLPFyP4l0pMnQSlx%2FxM539g2%2BAlQQpJFN7rkQ9A70JwX16jvmNWhUiIbMgbdd45fVIrAkmnXjkJrRghwQncSBDuj%2F3jVp3OhZY5aEMkOv9dqlNTgE0i7b0SnVF%2FyZmmuNFUjO%2F%2BsdNBdTY%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220212T170728Z&X-Amz-SignedHeaders=host&X-Amz-Expires=299&X-Amz-Credential=ASIAUSO3SVQLWNGYWAXF%2F20220212%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Signature=be880e7c7f4a05ac9ade1485097e48668388b7721d3b0d0a8e4e438edc5fa2e8'
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
