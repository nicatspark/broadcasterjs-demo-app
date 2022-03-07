import React from 'react'

type RouteState<K extends string, T> = { [P in K]: T }
type PageId = string
type PageNumber = number

interface RouteType {
  _routeState: RouteState<PageId, PageNumber>
}

interface PushStateObj {
  html: string
  pageTitle?: string
  urlPath?: string
}

const history = Object.create({
  set pushState(response: PushStateObj) {
    const pageTitle = response.pageTitle || document.title
    const urlPath = response.urlPath || '/'
    window.history.pushState(
      { html: response.html, pageTitle: pageTitle },
      '',
      urlPath
    )
  },
})

const route = Object.create({
  _routeState: Object.create(null),
  history,
  set initiate(initObj: RouteState<PageId, PageNumber>) {
    this._routeState = initObj
  },
  get state() {
    return this._routeState
  },
} as RouteType)

const Route = ({
  path,
  component,
  index = false,
}: {
  index?: boolean
  path: string
  component: React.ReactNode
}): React.ReactNode => {
  const getPath = ({
    path,
    index,
  }: {
    path: string
    index: boolean
  }): boolean => {
    return path === '/' + document.location.pathname.split('/')[1]
  }
  return <>{getPath({ path, index }) && component}</>
}

// Initiate in app.
route.initiate = new Map([
  ['getstarted', 1],
  ['benefits', 2],
  ['liveexample', 3],
  ['sourcecode', 4],
  ['debug', 5],
])

export { route, Route }
