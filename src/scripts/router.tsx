import React, { useEffect, useRef, useState } from 'react'

// type RouteState<K extends string, T> = { [P in K]: T }
type PageId = string
interface PageData {
  index: number
  title: string
}
interface HistoryType {
  pushState: (response: PushStateObj) => void
  previousPush: string
}

interface RouteType {
  _routeState: Map<PageId, PageData>
  state: Map<PageId, PageData>
  history: HistoryType
  baseRoute?: string
  baseTitle?: string
  push: PushStateObj
  //   SET: (path: string, l: number) => void
}

interface PushStateObj {
  html: string
  pageTitle?: string
  urlPath?: string
}

// window.addEventListener('popstate', (event) => {
//   console.log(
//     'location: ' + document.location + ', state: ' + JSON.stringify(event.state)
//   )
// })

/**
 * Responsible for setting the URL without reloading.
 */
const history = Object.create({
  previousPush: '',
  pushState: function (response: PushStateObj) {
    console.log('prev', route.history.previousPush, response.urlPath)
    if (route.history.previousPush === response.urlPath) return
    console.log('Setting', response.urlPath)
    route.history.previousPush = response.urlPath || ''
    const pageTitle = response.pageTitle
      ? route.baseTitle + response.pageTitle
      : document.title
    document.title = pageTitle
    const urlPath = response.urlPath || '/'
    window.history.pushState(
      { html: response.html, pageTitle: pageTitle },
      '',
      urlPath
    )
  },
})

const browserBack = (
  event: PopStateEvent,
  _forceRender: (arg: number) => void,
  path: string
) => {
  if (event.state.html !== path) return
  preventAddingBackUrlToHistory()
  console.log(`Backing into ${path}`)
  _forceRender(Math.random())

  function preventAddingBackUrlToHistory() {
    route.history.previousPush = path
  }
}

/**
 * Main object.
 */
const route = {
  _routeState: new Map<string, PageData>(),
  history,
  baseRoute: '',
  baseTitle: '',
  get state() {
    return this._routeState
  },
  set push({ html, pageTitle, urlPath }: PushStateObj) {
    // TODO: Not working. Use _routeState.set for now.
    this._routeState.set(urlPath || '', { index: 2, title: pageTitle || '' })
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
  const [, _forceRender] = useState(0)
  const listenerSet = useRef(false)

  const getPath = ({
    path,
    index,
    title,
  }: {
    path: string
    index: number
    title: string
  }): boolean => {
    const baseRoute = route.baseRoute || ''
    console.assert(
      /^\//.test(baseRoute) || baseRoute.length === 0,
      `baseRoute must begin with a '/'`
    )
    const pathURL =
      baseRoute +
      '/' +
      document.location.pathname.replace(baseRoute, '').split('/')[1]
    route._routeState.set(path, { index, title })
    return path === pathURL
  }

  useEffect(() => {
    if (listenerSet.current) return
    listenerSet.current = true
    window.addEventListener('popstate', (e) =>
      browserBack(e, _forceRender, path)
    )
    return () => {
      listenerSet.current = false
      window.removeEventListener('popstate', (e) =>
        browserBack(e, _forceRender, path)
      )
    }
  })

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

export { route, Route, MiniRoute }
