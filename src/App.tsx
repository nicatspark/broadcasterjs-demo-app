import React from 'react'
import './styles.css'

import { Section1 } from './Section1'
import { Section2 } from './Section2'

export default function App() {
  return (
    <div className='App'>
      <h1>Pub/sub event bus</h1>
      <h2>Custom events</h2>
      <div className='wrapper'>
        <Section1 />
        <Section2 />
      </div>
    </div>
  )
}
