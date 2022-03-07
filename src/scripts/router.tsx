import React, { useEffect } from 'react'

// type RouteState<K extends string, T> = { [P in K]: T }
type PageId = string
interface PageData {
  index: number
  title: string
}
interface HistoryType {
  pushState: (response: PushStateObj) => void
}

interface RouteType {
  _routeState: Map<PageId, PageData>
  history: HistoryType
  baseRoute?: string
  baseTitle?: string
  //   SET: (path: string, l: number) => void
}

interface PushStateObj {
  html: string
  pageTitle?: string
  urlPath?: string
}

/**
 * Responsible for setting the URL without reloading.
 */
const history = Object.create({
  pushState: (response: PushStateObj) => {
    const pageTitle = response.pageTitle || document.title
    const urlPath = response.urlPath || '/'
    window.history.pushState(
      { html: response.html, pageTitle: pageTitle },
      '',
      urlPath
    )
  },
})

/**
 * Main object.
 */
const route = {
  _routeState: new Map<string, PageData>(),
  history,
  baseRoute: '',
  baseTitle: '',
  //   set initiate(initObj: RouteState<PageId, PageNumber>) {
  //     this._routeState = initObj
  //   },
  //   set SET({ path, index }: { path: string; index: number }) {
  //     this._routeState.set(path, index)
  //   },
  get state() {
    return this._routeState
  },
} as RouteType

const Route = ({
  path,
  component,
  index = 0,
  title = '',
}: {
  index?: number
  path: string
  component?: React.ReactNode
  title?: string
}): JSX.Element => {
  const getPath = ({
    path,
    index,
    title,
  }: {
    path: string
    index: number
    title: string
  }): boolean => {
    const pathURL =
      route.baseRoute + '/' + document.location.pathname.split('/')[1]
    route._routeState.set(path, { index, title })
    if (path === pathURL) console.log(`MiniRoute matched '${path}'`)
    return path === pathURL
  }
  return <>{getPath({ path, index, title }) && <>{component}</>}</>
}

const MiniRoute = ({
  children,
  baseRoute,
  baseTitle,
}: {
  children: React.ReactNode
  baseRoute?: string
  baseTitle?: string
}) => {
  useEffect(() => {
    route.baseRoute = baseRoute || ''
    route.baseTitle = baseTitle || ''
  })

  return <>{children}</>
}

// Initiate in app.
// route.initiate = new Map([
//   ['getstarted', 1],
//   ['benefits', 2],
//   ['liveexample', 3],
//   ['sourcecode', 4],
//   ['debug', 5],
// ])

export { route, Route, MiniRoute }
