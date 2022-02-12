import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { broadcast } from './scripts/broadcaster'
import { sleep } from './scripts/helpers'
import { IconMenu } from './IconMenu'
import { useEffect } from 'react'

const DrawerNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  border-right: 1px solid #666666;
  box-shadow: 10px 0 10px rgba(0 0 0 / 0.09);
  width: min(90%, 200px);
  height: 100vh;
  padding: 1rem;
  transform: translateX(calc(-100% + var(--menu-min-width)));
  transition: transform 150ms ease-out;
  &.open {
    transform: translateX(0px);
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin-top: 3rem;
    li {
      text-align: left;
      border-bottom: 1px solid #eee;
      margin-right: 2rem;
      margin-bottom: 0.5rem;
      position: relative;
      cursor: pointer;
      &.active {
        cursor: default;
        &:after {
          content: '';
          position: absolute;
          left: -1rem;
          width: 6px;
          height: 100%;
          background-color: #000;
        }
      }
    }
  }
`
const Cover = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0 0 0 / 0);
  transition: background-color 150ms;
  pointer-events: none;
  &.open {
    background-color: rgba(0 0 0 / 0.5);
    pointer-events: all;
  }
`

let autoCloseId: ReturnType<typeof setTimeout>[] = []

export const Drawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showPieTimer, setShowPieTimer] = useState(false)
  const [page, setPage] = useState(1)
  const drawer = useRef<HTMLElement | null>(null)

  const handleDrawerClick = (e?: React.SyntheticEvent) => {
    broadcast.emit('MENU-TOGGLED') // No receiver yet but it's an event we likely will need.
    setDrawerOpen((toggel) => !toggel)
    setShowPieTimer(false)
    if (!e) return
    const el = e.currentTarget as HTMLElement
    setTimeout(() => el?.blur(), 800)
    autoCloseAfterDelay()
  }

  async function autoCloseAfterDelay(delay = 8000) {
    const pieDelay = 3000
    const id = setTimeout(async () => {
      if (!drawer.current?.classList.contains('open')) return
      setShowPieTimer(true)
      const id = setTimeout(() => {
        setDrawerOpen(false)
        setShowPieTimer(false)
      }, pieDelay)
      autoCloseId.push(id)
    }, delay)
    autoCloseId.push(id)
  }

  const gotoPage = async (pagenr: number) => {
    broadcast.emit('SET-PAGE', pagenr)
    setPage(pagenr)
    await sleep(300)
    handleDrawerClick()
  }

  useEffect(() => {
    broadcast.on([
      'SET-PAGE',
      ({ detail: page }: { detail: number }) => {
        setPage(page)
      },
    ])
  }, [])

  const handleOnMouseOver = () => {
    autoCloseId.map((id) => clearTimeout(id))
    setShowPieTimer(false)
  }
  const handleOnMouseOut = () => {
    autoCloseAfterDelay(1000)
  }

  // resets to page on locally
  useEffect(() => {
    broadcast.emit('SET-PAGE', 1)
  }, [])

  return (
    <>
      <Cover className={drawerOpen ? `open` : ''} onClick={handleDrawerClick} />
      <DrawerNav
        ref={drawer}
        ariaLabel='Main navigation'
        className={drawerOpen ? `open` : ''}
        onMouseEnter={handleOnMouseOver}
        onMouseLeave={handleOnMouseOut}
      >
        <IconMenu
          className={drawerOpen ? `open` : ''}
          onClick={handleDrawerClick}
          showPieTimer={showPieTimer}
        />
        <ul>
          <li
            onClick={() => gotoPage(1)}
            className={page === 1 ? 'active' : ''}
          >
            Get started
          </li>
          <li
            onClick={() => gotoPage(2)}
            className={page === 2 ? 'active' : ''}
          >
            Benefits
          </li>
          <li
            onClick={() => gotoPage(3)}
            className={page === 3 ? 'active' : ''}
          >
            Live example
          </li>
          <li
            onClick={() => gotoPage(4)}
            className={page === 4 ? 'active' : ''}
          >
            Source code
          </li>
          <li
            onClick={() => gotoPage(5)}
            className={page === 5 ? 'active' : ''}
          >
            Debug
          </li>
        </ul>
      </DrawerNav>
    </>
  )
}
