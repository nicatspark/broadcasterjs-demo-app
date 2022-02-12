import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { broadcast } from './scripts/broadcaster'

const PageflipperDiv = styled.div`
  width: 7rem;
  height: 3rem;
  background-color: #fff;
  position: absolute;
  top: 0;
  right: 2rem;
  border-radius: 1.5rem;
  transform: translateY(-50%);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
`

const Triangle = styled.div`
  --bg-color: ${({ disabled }: { disabled: boolean }) =>
    disabled ? '#999' : '#000'};
  width: 0;
  height: 0;
  border-style: solid;
  border-width: ${({ right }: { right: boolean }) =>
    right ? '0.9rem 0 0.9rem 1.15rem' : '0.9rem 1.15rem 0.9rem 0'};
  border-color: ${({ right }: { right: boolean }) =>
    !right
      ? 'transparent var(--bg-color) transparent transparent'
      : 'transparent transparent transparent var(--bg-color)'};
  transform-origin: center;
  transform: scale(1);
  transition: all 0.5s ease-out;
  &:hover {
    transform: ${({ disabled }: { disabled: boolean }) =>
      disabled ? 'scale(1.0)' : 'scale(1.1)'};
  }
`

const shakeAnimMS = 1000

export const Pageflipper = () => {
  const [disableLeft, setDisableLeft] = useState(false)
  const [disableRight, setDisableRight] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const leftTri = useRef<HTMLElement | null>(null)
  const rightTri = useRef<HTMLElement | null>(null)
  const maxNumberOfPage = 5

  useEffect(() => {
    broadcast.on([
      'SET-PAGE',
      ({ detail: page }: { detail: number }) => {
        setDisableLeft(page === 1)
        setDisableRight(page === maxNumberOfPage)
        setCurrentPage(page)
      },
    ])
  }, [])

  const handleLeftClick = () => {
    const gotoPage = Math.max(currentPage - 1, 1)
    if (gotoPage === currentPage) {
      leftTri.current?.classList.add('shake')
      setTimeout(() => leftTri.current?.classList.remove('shake'), shakeAnimMS)
      return
    }
    broadcast.emit('SET-PAGE', Math.max(currentPage - 1, 1))
  }
  const handleRightClick = () => {
    const gotoPage = Math.min(currentPage + 1, maxNumberOfPage)
    if (gotoPage === currentPage) {
      rightTri.current?.classList.add('shake')
      setTimeout(() => {
        rightTri.current?.classList.remove('shake')
      }, shakeAnimMS)
      return
    }
    broadcast.emit('SET-PAGE', gotoPage)
  }

  return (
    <PageflipperDiv>
      <Triangle
        ref={leftTri}
        disabled={disableLeft}
        onClick={handleLeftClick}
      />
      <Triangle
        ref={rightTri}
        disabled={disableRight}
        right
        onClick={handleRightClick}
      />
    </PageflipperDiv>
  )
}
