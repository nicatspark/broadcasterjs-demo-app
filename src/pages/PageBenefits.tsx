import { Page } from './pages.styles'

export const PageBenefits = () => {
  return (
    <Page>
      <h1>Benefits</h1>
      <div className='limited'>
        <h2>
          Benefits to useing a <mark>pub/sub pattern</mark> in general
        </h2>
        <ul>
          <li>Creating decoupled components makes for easier refactoring.</li>
          <li>No need for unnecessary prop drilling.</li>
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
          <li>Framework agnostic.</li>
          <li>
            Works globally in a micro frontend environment.<sup>*</sup>
          </li>
          <li>Scales well.</li>
          <li>Native. (Ages well)</li>
          <li>Native. (Performant)</li>
        </ul>
        <p>
          <sup>*</sup>
          <i>as long as the mfe setup allows JS events to bubble through.</i>
        </p>
        <h2>Prerequisites and requirements before creation of BroadcasterJS</h2>
        <ul>
          <li>Easy to use.</li>
          <li>
            No initialization. Do not need live in a special place in your code.
          </li>
          <li title='Create a subscriber and a emitter and your done.'>
            Plug and play.
          </li>
          <li title='You are in control.'>Inspectable and debugable.</li>
          <li title='Can easily be replaced by other (worse) solutions if needed.'>
            Unintrusive as a dependency.
          </li>
        </ul>
      </div>
    </Page>
  )
}
