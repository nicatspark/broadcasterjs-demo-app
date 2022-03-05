import { useEffect, useRef, useState } from 'react'
import { Section } from './pages/pages.styles'
import { broadcast } from './scripts/broadcaster'

interface ChildrenAndProps {
  children?: JSX.Element
}

export const Section2 = ({ children }: ChildrenAndProps): JSX.Element => {
  const start = useRef(Date.now())
  start.current = Date.now()
  const [sec, setSec] = useState(0)
  // Highlights every render in UI.
  ;({
    do: function () {
      const a = document.querySelector('.receiver') as HTMLDivElement
      if (!a) return
      a.classList.remove('rerendered')
      setTimeout(() => {
        a.classList.add('rerendered')
        setTimeout(() => a.classList.remove('rerendered'), 500)
      })
    },
  }.do())

  useEffect(() => {
    const seconds = (detail: number) =>
      Math.floor((detail - start.current) / 1000)
    const off = broadcast.on([
      'EXAMPLE-FLAG',
      ({ detail }: { detail: number }) => {
        console.log(`${seconds(detail)} sec since last render`, start.current)
        setSec(seconds(detail))
      },
    ])
    return off
  }, [start])

  return (
    <Section className='receiver section'>
      <p>Receiver</p>
      <div>{sec}s since last render</div>
    </Section>
  )
}
