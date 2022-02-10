import { Page, Ttip } from './pages.styles'

export const PageBenefits = () => {
  return (
    <Page>
      <h1>Benefits</h1>
      <div className='limited'>
        <h2>
          Benefits to useing a <mark>pub/sub pattern</mark> in general
        </h2>
        <ul>
          <li>
            <Ttip data-tool-tip='And that makes for happier developers ❤️'>
              Creating decoupled components makes for easier
              refactoring/maintenance.
            </Ttip>
          </li>
          <li>
            <Ttip data-tool-tip={`Let's put an end to prop inception.`}>
              No need for unnecessary prop drilling.
            </Ttip>
          </li>
          <li>
            Multiple events emitters can trigger a centralized functions placed
            in logical places instead of practical.
          </li>
          <li>
            Event driven web apps unleashes good DX. (developer happiness)
          </li>
        </ul>
        <h2>
          Benefits of using <mark>custom events</mark>. (encapsulated in
          BroadcasterJS)
        </h2>
        <ul>
          <li>
            <Ttip data-tool-tip='You heard right, or use no framework at all ¯\_(ツ)_/¯'>
              Framework agnostic.
            </Ttip>
          </li>
          <li>
            <Ttip data-tool-tip='As long as the mfe setup allows JS events to bubble through.'>
              Works globally in a micro frontend environment.
            </Ttip>
          </li>
          <li>Scales well.</li>
          <li>
            <Ttip data-tool-tip="Yeah, it'll outlive React.">
              Native. (Ages well.)
            </Ttip>
          </li>
          <li>
            <Ttip data-tool-tip="I'd put a debouncer/throttle on a scroll event anyway. Just sayin'.">
              Native. (Performant)
            </Ttip>
          </li>
        </ul>
        <p></p>
        <h2>Prerequisites and requirements before creation of BroadcasterJS</h2>
        <ul>
          <li>Easy to use.</li>
          <li>
            <Ttip data-tool-tip='That needs to live in a special place in your code.'>
              No initialization.
            </Ttip>
          </li>
          <li>
            <Ttip data-tool-tip='Create a subscriber and a emitter and you are golden.'>
              Plug and play.
            </Ttip>
          </li>
          <li>
            <Ttip data-tool-tip='You are in control.'>
              Inspectable and debuggable.
            </Ttip>
          </li>
          <li>
            <Ttip data-tool-tip="Can be replaced by (worse) solutions if it should come to that. 'it's not you it's me' 😭">
              Unintrusive as a dependency.
            </Ttip>
          </li>
          <Ttip data-tool-tip='Less risc...'>
            <li>No own dependecies.</li>
          </Ttip>
        </ul>
      </div>
    </Page>
  )
}
