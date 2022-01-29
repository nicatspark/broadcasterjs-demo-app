import { useEffect, useRef, useState } from 'react'
import { broadcast } from './broadcast'

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
  console.log('rerender', start)
  const [sec, setSec] = useState(0)

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
    // return () => broadcast.off(action as ActionType)
  }, [start])

  return (
    <section>
      <p>Receiver</p>
      <div>{sec}s since last render</div>
    </section>
  )
}
