import './styles.css'

import { Drawer } from './Drawer'
import { useEffect, useState } from 'react'
import { broadcast } from '@foundit/broadcasterjs'
import { Pages } from './pages/pages.styles'
import { PageCode } from './pages/PageCode'
import { Header } from './Header'
import { Footer } from './Footer'
import { PageGetStarted } from './pages/PageGetStarted'
import { PageBenefits } from './pages/PageBenefits'
import { PageExamples } from './pages/PageExamples'
import { PageDebug } from './pages/PageDebug'
import { Route, route, MiniRoute } from './scripts/router'

export default function App() {
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    broadcast.on([
      'SET-PAGE',
      ({ detail: page }: { detail: number }) => {
        setCurrentPage(page)
        // Update url w/o reload
        route.history.pushState({
          html: Array.from(route.state)[page - 1][0],
          pageTitle: Array.from(route.state)[page - 1][1].title,
          urlPath: Array.from(route.state)[page - 1][0],
        })
      },
    ])
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [])

  return (
    <div className='App'>
      <Header />
      <MiniRoute baseRoute='' baseTitle='BroadcasterJS - '>
        <Route
          path='/getstarted'
          title='Get Started'
          index={1}
          component={<Redirect page={1} />}
        />
        <Route
          path='/benefits'
          title='Benefits'
          component={<Redirect page={2} />}
        />
        <Route
          path='/liveexample'
          title='Live Example'
          component={<Redirect page={3} />}
        />
        <Route
          path='/sourcecode'
          title='Source Code'
          component={<Redirect page={4} />}
        />
        <Route path='/debug' title='Debug' component={<Redirect page={5} />} />
      </MiniRoute>
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

function Redirect({ page }: { page: number }) {
  // Sole purpose to redirect on load.
  useEffect(() => {
    setTimeout(() => broadcast.emit('SET-PAGE', page), 300)
  }, [page])
  return <></>
}
