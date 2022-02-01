import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { broadcast } from './scripts/broadcast'
import { sleep } from './scripts/helpers'
import { IconMenu } from './IconMenu'

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

let autoCloseId: ReturnType<typeof setTimeout>[] = []

export const Drawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showPieTimer, setShowPieTimer] = useState(false)
  const drawer = useRef<HTMLElement | null>(null)

  const handleDrawerClick = (e?: React.SyntheticEvent) => {
    broadcast.emit('menu-toggled')
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

  const gotoPage = async (page: number) => {
    broadcast.emit('set-page', page)
    await sleep(300)
    handleDrawerClick()
  }

  const handleOnMouseOver = () => {
    console.log(autoCloseId)
    autoCloseId.map((id) => clearTimeout(id))
    setShowPieTimer(false)
  }
  const handleOnMouseOut = () => {
    autoCloseAfterDelay(1000)
  }

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
        <IconMenu onClick={handleDrawerClick} showPieTimer={showPieTimer} />
        <ul>
          <li onClick={() => gotoPage(1)}>Get started</li>
          <li onClick={() => gotoPage(2)}>Benefits</li>
          <li onClick={() => gotoPage(3)}>Live example</li>
          <li onClick={() => gotoPage(4)}>Source code</li>
          <li onClick={() => gotoPage(5)}>Debug</li>
        </ul>
      </DrawerNav>
    </>
  )
}
