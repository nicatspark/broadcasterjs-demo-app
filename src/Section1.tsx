import { Button } from './Button'
import { Section } from './pages/pages.styles'
import { broadcast } from './scripts/broadcaster'

interface ChildrenAndProps {
  children?: JSX.Element
}

export const Section1 = ({ children }: ChildrenAndProps): JSX.Element => {
  const handleButton = () => {
    broadcast.emit('EXAMPLE-FLAG', Date.now())
  }

  return (
    <Section className='section emitter'>
      <p>Emitter</p>
      <Button onClick={handleButton} />
    </Section>
  )
}
