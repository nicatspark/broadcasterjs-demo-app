import { Block, Page } from './pages.styles'
import splashimage from './../megaphone.svg'
export const PageGetStarted = () => {
  return (
    <Page>
      <img
        src={splashimage}
        alt='A megaphone'
        width='80'
        style={{ margin: '4rem auto', display: 'block' }}
      />
      <h1 style={{ marginTop: '0' }}>Simplifiy your life today</h1>
      <p className='limited'>
        It is never to late to start simplifying your dev life. Start using the
        pub/sub event bus today!
      </p>
      <Block limit='30rem'>
        <p>Install broadcasterjs (or copy code)</p>
        <code>npm i @foundit/broadcasterjs</code>
        <p>Import broadcaster.ts</p>
        <code>import broadcast from "./broadcast";</code>
        <p>Subscribe:</p>
        <code>{`broadcast.on(['EXAMPLE-FLAG', () => setMyUseState(true)])`}</code>
        <p>Publish:</p>
        <code>{`broadcast.emit('EXAMPLE-FLAG', {detail: someVarToEmit})`}</code>
        <p>Publish with some payload data:</p>
        <code>{`broadcast.emit('EXAMPLE-FLAG', {detail: myData})`}</code>
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
    broadcast.on(['EXAMPLE-FLAG', () => setMyUseState(true)])
    return () => broadcast.off(['EXAMPLE-FLAG', () => setMyUseState(true)])
  }, [])`}</code>
        </pre>
      </Block>
      <p className='limited'>
        The clean-up return function is optional, BroadcasterJS is managing this
        anyway but React migth warn about memory leaks never the less. A
        identical subscriber (flag + callback combination) can only be set once
        so no worries about rerenders.
      </p>
      <p className='limited'>
        Setting the flag in upper case is just a best practice which makes for
        easier code overview.
      </p>
      <p
        className='limited'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3rem',
          paddingRight: '5rem',
        }}
      >
        <a
          style={{ marginTop: '0.8rem' }}
          href='https://www.npmjs.com/package/@foundit/broadcasterjs'
        >
          <NpmLogo />
        </a>
        <a
          style={{ fontSize: '2rem' }}
          href='https://github.com/nicatspark/broadcasterjs'
        >
          <GithubLogo />
        </a>
      </p>
    </Page>
  )
}

function NpmLogo() {
  return (
    <svg
      style={{ display: 'inline-block' }}
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      height='2rem'
      viewBox='0 0 18 7'
    >
      <path
        fill='#CB3837'
        d='M0,0h18v6H9v1H5V6H0V0z M1,5h2V2h1v3h1V1H1V5z M6,1v5h2V5h2V1H6z M8,2h1v2H8V2z M11,1v4h2V2h1v3h1V2h1v3h1V1H11z'
      />
      <polygon fill='#FFFFFF' points='1,5 3,5 3,2 4,2 4,5 5,5 5,1 1,1 ' />
      <path fill='#FFFFFF' d='M6,1v5h2V5h2V1H6z M9,4H8V2h1V4z' />
      <polygon
        fill='#FFFFFF'
        points='11,1 11,5 13,5 13,2 14,2 14,5 15,5 15,2 16,2 16,5 17,5 17,1 '
      />
    </svg>
  )
}

function GithubLogo() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      aria-hidden='true'
      role='img'
      id='footer-sample-full'
      width='1.03em'
      height='1em'
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 256 250'
      className='iconify iconify--logos'
    >
      <path
        d='M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46c6.397 1.185 8.746-2.777 8.746-6.158c0-3.052-.12-13.135-.174-23.83c-35.61 7.742-43.124-15.103-43.124-15.103c-5.823-14.795-14.213-18.73-14.213-18.73c-11.613-7.944.876-7.78.876-7.78c12.853.902 19.621 13.19 19.621 13.19c11.417 19.568 29.945 13.911 37.249 10.64c1.149-8.272 4.466-13.92 8.127-17.116c-28.431-3.236-58.318-14.212-58.318-63.258c0-13.975 5-25.394 13.188-34.358c-1.329-3.224-5.71-16.242 1.24-33.874c0 0 10.749-3.44 35.21 13.121c10.21-2.836 21.16-4.258 32.038-4.307c10.878.049 21.837 1.47 32.066 4.307c24.431-16.56 35.165-13.12 35.165-13.12c6.967 17.63 2.584 30.65 1.255 33.873c8.207 8.964 13.173 20.383 13.173 34.358c0 49.163-29.944 59.988-58.447 63.157c4.591 3.972 8.682 11.762 8.682 23.704c0 17.126-.148 30.91-.148 35.126c0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002C256 57.307 198.691 0 128.001 0zm-80.06 182.34c-.282.636-1.283.827-2.194.39c-.929-.417-1.45-1.284-1.15-1.922c.276-.655 1.279-.838 2.205-.399c.93.418 1.46 1.293 1.139 1.931zm6.296 5.618c-.61.566-1.804.303-2.614-.591c-.837-.892-.994-2.086-.375-2.66c.63-.566 1.787-.301 2.626.591c.838.903 1 2.088.363 2.66zm4.32 7.188c-.785.545-2.067.034-2.86-1.104c-.784-1.138-.784-2.503.017-3.05c.795-.547 2.058-.055 2.861 1.075c.782 1.157.782 2.522-.019 3.08zm7.304 8.325c-.701.774-2.196.566-3.29-.49c-1.119-1.032-1.43-2.496-.726-3.27c.71-.776 2.213-.558 3.315.49c1.11 1.03 1.45 2.505.701 3.27zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033c-1.448-.439-2.395-1.613-2.103-2.626c.301-1.01 1.747-1.484 3.207-1.028c1.446.436 2.396 1.602 2.095 2.622zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95c-1.53.034-2.769-.82-2.786-1.86c0-1.065 1.202-1.932 2.733-1.958c1.522-.03 2.768.818 2.768 1.868zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37c-1.485.271-2.861-.365-3.05-1.386c-.184-1.056.893-2.114 2.376-2.387c1.514-.263 2.868.356 3.061 1.403z'
        fill='#161614'
      ></path>
    </svg>
  )
}
