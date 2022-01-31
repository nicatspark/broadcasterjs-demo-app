import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { broadcast } from './broadcast'
import { IconMenu } from './IconMenu'
import { sleep } from './helpers'

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
  transform: translateX(calc(-100% + 3rem));
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
      cursor: pointer;
    }
  }
  .navicon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
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

export const Drawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showPieTimer, setShowPieTimer] = useState(false)
  const drawer = useRef<HTMLElement | null>(null)

  const handleDrawerClick = (e: React.SyntheticEvent) => {
    broadcast.emit('menu-toggled')
    setDrawerOpen((toggel) => !toggel)
    setShowPieTimer(false)
    const el = e.currentTarget as HTMLElement
    setTimeout(() => el?.blur(), 800)
    autoCloseAfterDelay(8000)

    async function autoCloseAfterDelay(delay: number) {
      await sleep(delay)
      if (!drawer.current?.classList.contains('open')) return
      setShowPieTimer(true)
      await sleep(3000)
      setDrawerOpen(false)
      setShowPieTimer(false)
    }
  }

  return (
    <>
      <Cover className={drawerOpen ? `open` : ''} onClick={handleDrawerClick} />
      <DrawerNav
        ref={drawer}
        ariaLabel='Main navigation'
        className={drawerOpen ? `open` : ''}
      >
        <IconMenu onClick={handleDrawerClick} showPieTimer={showPieTimer} />
        <ul>
          <li>Get started</li>
          <li>Benefits</li>
          <li>Live example</li>
        </ul>
      </DrawerNav>
    </>
  )
}
