import { useEffect, useRef, useState } from 'react'
import { broadcast } from './scripts/broadcaster'
import styled from 'styled-components'

const Section = styled.div`
  transition: border-color 3s, background-color 3s;
  &.rerendered {
    border-color: yellow;
    background-color: yellow;
    transition: none;
  }
`

interface ChildrenAndProps {
  children?: JSX.Element
}

type ActionType = [
  type: string,
  listener: string | (({ detail }: { detail: number }) => void)
]

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
    const action = [
      'example-flag',
      ({ detail }: { detail: number }) => {
        console.log(
          'asd',
          `${seconds(detail)} sec since last render`,
          start.current
        )
        setSec(seconds(detail))
      },
    ]
    broadcast.on(action as ActionType)
    // Investogate why this is not needed.
    // return () => broadcast.off(action as ActionType)
  }, [start])

  return (
    <Section className='receiver section'>
      <p>Receiver</p>
      <div>{sec}s since last render</div>
    </Section>
  )
}
