export type listenerProp<T extends unknown> = [
  type: string,
  listener?: T,
  settings?: SettingsType
]

export type ListenerProps = <T extends unknown>([
  type,
  listener,
  settings,
]: listenerProp<T>) => void

export interface ReturnType {
  on: ListenerProps
  once: ListenerProps
  off: ListenerProps
  emit: (type: string, detail?: unknown) => boolean
}

export interface SettingsType {
  debug?: boolean
  debugGlobal?: boolean
  allowDoublettesSubscribers?: boolean
  useLatestSubscriberScope?: boolean
  suppresDebug?: boolean
}

let broadcastItemsCache: string[] = []

let globalDebug =
  new URLSearchParams(window.location.search).get('debug')?.toLowerCase() ===
  'broadcasterjs'

const defaultSettings = {
  debug: false,
  debugGlobal: false,
  allowDoublettesSubscribers: false,
  useLatestSubscriberScope: true,
  suppresDebug: false,
}

const eventBus = (): ReturnType => {
  const hubId = ' broadcast-node '
  const on = <T extends unknown>([
    type,
    listener,
    settings = defaultSettings,
  ]: listenerProp<T>): string => {
    const options = setOptions(settings)
    const { exists, id } = handleCache().listenerExists(type, listener, options)
    if (exists && !options.allowDoublettesSubscribers) {
      if (!options.useLatestSubscriberScope) return id
      // Remove previous listener and set new to update scope.
      off([type, listener, { suppresDebug: true }])
      debugmode({
        string: `Subscriber ${type} existed. Will update scope.`,
        obj: broadcastItemsCache,
      })
    }
    if (options.debug)
      debugmode({
        string: `${
          exists ? 'Updating listener scope' : 'Setting new listener'
        } for "${type}"`,
        obj: listener,
        force: true,
      })
    const eventTarget = createOrGetCustomEventNode(hubId)
    eventTarget.addEventListener(
      'broadcast-' + type,
      listener as EventListenerOrEventListenerObject
    )
    return id
  }
  const once = <T extends unknown>([
    type,
    listener,
    settings = defaultSettings,
  ]: listenerProp<T>) => {
    const options = setOptions(settings)
    const { exists, id } = handleCache().listenerExists(type, listener, options)
    if (exists && !options.allowDoublettesSubscribers) return id
    if (options.debug)
      debugmode({
        string: `Setting "once" listener "${type}"`,
        obj: listener,
        force: true,
      })
    const eventTarget = createOrGetCustomEventNode(hubId)
    eventTarget.addEventListener(
      'broadcast-' + type,
      listener as EventListenerOrEventListenerObject,
      { once: true }
    )
    return id
  }
  const off = <T extends unknown>([
    type,
    listener,
    settings = defaultSettings,
  ]: listenerProp<T>) => {
    const options = setOptions(settings)
    if (options.debug)
      debugmode({
        string: `Removing listener "${type}"`,
        obj: listener,
        force: true,
        settings,
      })
    handleCache().remove(type, listener)
    const eventTarget = createOrGetCustomEventNode(hubId)
    eventTarget.removeEventListener(
      'broadcast-' + type,
      listener as EventListenerOrEventListenerObject
    )
  }
  const emit = (
    type: string,
    detail?: unknown,
    settings?: SettingsType
  ): boolean => {
    debugmode({
      string: `Emitted ${type}`,
      obj: detail,
      force: settings?.debug,
    })
    const eventTarget = createOrGetCustomEventNode(hubId)
    return eventTarget.dispatchEvent(
      new CustomEvent('broadcast-' + type, { detail })
    )
  }
  return { on, once, off, emit }

  // Initiate or retreive node for custom event.
  function createOrGetCustomEventNode(hubId: string): Node {
    const nodeIterator = document.createNodeIterator(
      document.body,
      NodeFilter.SHOW_COMMENT
    )
    while (nodeIterator.nextNode()) {
      if (nodeIterator.referenceNode.nodeValue === hubId) {
        return nodeIterator.referenceNode
      }
    }
    return document.body.appendChild(document.createComment(hubId))
  }

  // Store each subscription (flag + details object serialized and hashed) in an array
  // taking advantage of the es6 modules intrinsic singleton properties.
  // If already stored reject request and exit silently.
  function handleCache() {
    const listenerExists = (
      type: string,
      listener: unknown,
      settings: SettingsType
    ): { exists: boolean; id: string } => {
      const id = createBroadcastId(type, listener)
      debugmode({
        string: 'broadcastItemsCache',
        obj: broadcastItemsCache,
        force: settings.debug,
      })
      if (broadcastItemsCache.indexOf(type + id) !== -1) {
        debugmode({
          string: 'Found a previous instans of subscriber.',
          force: settings.debug,
        })
        return { exists: true, id }
      }
      broadcastItemsCache.push(type + id)
      return { exists: false, id }
    }
    const remove = (type: string, listener: unknown) => {
      const removeId = type + createBroadcastId(type, listener)
      debugmode({
        string: `Remove listener: ${removeId}`,
        obj:
          broadcastItemsCache.indexOf(removeId) !== -1
            ? 'Existed'
            : `Didn't exist`,
      })
      broadcastItemsCache = broadcastItemsCache.filter((id) => id !== removeId)
    }
    return { listenerExists, remove }
  }

  // Serialize+hash the subscriber and store it to not add it twice.
  function createBroadcastId(flag: string, details: unknown): string {
    let detailsStringified
    switch (typeof details) {
      case 'function':
        detailsStringified = helpers().serializeFn(details as () => void, {})
        break
      default:
        try {
          detailsStringified = JSON.stringify(details)
        } catch (error) {
          throw new Error(
            `Could not "JSON.stringify" the broadcasterjs payload of "${typeof details}" type.`
          )
        }
    }
    return helpers()
      .hashCode(flag + detailsStringified)
      .toString()
  }

  function setOptions(settings: SettingsType): SettingsType {
    const mergedOptions = { ...defaultSettings, ...settings }
    if (mergedOptions.debugGlobal) globalDebug = true
    return mergedOptions
  }

  function helpers() {
    const hashCode = (s: string) =>
      s.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)
    const serializeFn = (f: () => void, env: unknown) =>
      JSON.stringify({ src: f.toString(), env: env })
    return { serializeFn, hashCode }
  }

  function debugmode({
    string,
    obj,
    force,
    settings,
  }: {
    string: string
    obj?: unknown
    force?: boolean
    settings?: SettingsType
  }) {
    if ((!globalDebug && !force) || settings?.suppresDebug) return
    console.log(`%cBroadcast: ${string}`, 'color:#bada55', obj ? obj : '--')
  }
}
const broadcast = eventBus()
export { broadcast }

// Usage
/*
  No need to initialize separately. Import the 'broadcast' factory function and use to your hearts content.
  
  START SUBSCRIPTION IN REACT
  useEffect(() => {
    broadcast.on(['BROADCAST-ID', flagReceivedFunction])
  }, [flagReceivedFunction])
  
  START SUBSCRIPTION VANILLA JS
  broacast.on(['BROADCAST-ID', ({ detail }) => {
      document.body.append(detail + ' ');
  }]);
  broacast.once(['BROADCAST-ID', ({ detail }) => {
      document.body.append(detail + ' ');
  }]);
  
  END SUBSCRIPTION
  broacast.off(['BROADCAST-ID', ({ detail }) => {
      document.body.append(detail + ' ');
  }]);
  
  PUBLISH IN REACT & VANILLLA JS
  broadcast.emit('BROADCAST-ID', 'Hello world')
  
  TO INSPECT VISUALLY
  Click elements tab i chrome devtools, 
  click event-listeners tab in second pane. 
  Active listeners begin with 'broadcast-' + flag name.
  
  To debug: add ?debug=BroadcasterJS in url and open devtools console.
  
  Advanced: on,once,off takes an optional third value and emit takes 
  an optional third argument in the form of a settings object.
  {
    debug: boolean
    debugGlobal: boolean
    allowDoublettesSubscribers: boolean
    useLatestSubscriberScope: true,
    suppresDebug: false,
  }
  */
