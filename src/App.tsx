import './styles.css'

import { Drawer } from './Drawer'
import { useEffect, useState } from 'react'
import { broadcast } from './scripts/broadcaster'
import { Pages } from './pages/pages.styles'
import { PageCode } from './pages/PageCode'
import { Header } from './Header'
import { Footer } from './Footer'
import { PageGetStarted } from './pages/PageGetStarted'
import { PageBenefits } from './pages/PageBenefits'
import { PageExamples } from './pages/PageExamples'
import { PageDebug } from './pages/PageDebug'
export default function App() {
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    broadcast.on([
      'set-page',
      ({ detail: page }: { detail: number }) => {
        setCurrentPage(page)
      },
    ])
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [])

  return (
    <div className='App'>
      <Header />
      <Pages viewPage={currentPage}>
        <PageGetStarted />
        <PageBenefits />
        <PageExamples />
        <PageCode />
        <PageDebug />
      </Pages>
      <Footer />
      <Drawer />
    </div>
  )
}
