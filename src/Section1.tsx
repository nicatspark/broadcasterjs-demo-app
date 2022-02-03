import React from 'react'
import { Button } from './Button'
import { broadcast } from './scripts/broadcaster'

interface ChildrenAndProps {
  children?: JSX.Element
}

export const Section1 = ({ children }: ChildrenAndProps): JSX.Element => {
  const handleButton = () => {
    broadcast.emit('example-flag', Date.now())
  }

  return (
    <div className='section'>
      <p>Emitter</p>
      <Button onClick={handleButton} />
    </div>
  )
}
