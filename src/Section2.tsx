import { useEffect, useRef, useState } from 'react'
import { broadcast } from './broadcast'
import styled from 'styled-components'
import { sleep } from './helpers'

const Section = styled.div`
  transition: border-color 5s, background-color 5s;
  &.rerendered {
    border-color: #02d814;
    background-color: #b3ceb5;
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
  // Highlight every render in UI.
  ;({
    do: async function () {
      const a = document.querySelector('.receiver') as HTMLDivElement
      if (!a) return
      a.classList.remove('rerendered')
      await sleep(10)
      a.classList.add('rerendered')
      await sleep(10)
      a.classList.remove('rerendered')
    },
  }.do())

  useEffect(() => {
    const seconds = (detail: number) =>
      Math.floor((detail - start.current) / 1000)
    const action = [
      'my-flag',
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
