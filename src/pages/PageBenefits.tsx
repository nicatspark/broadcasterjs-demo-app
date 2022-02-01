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
        <h2>Prerequisites and requirements before creation of the pub/sub</h2>
        <ul>
          <li>Easy to use.</li>
          <li>No initialization.</li>
          <li>Plug and play.</li>
          <li>Inspectable and debugable.</li>
        </ul>
      </div>
    </Page>
  )
}
