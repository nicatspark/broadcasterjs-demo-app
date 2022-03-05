var _a
let broadcastItemsCache = []
let globalDebug =
  ((_a = new URLSearchParams(window.location.search).get('debug')) === null ||
  _a === void 0
    ? void 0
    : _a.toLowerCase()) === 'broadcasterjs'
const defaultSettings = {
  debug: false,
  debugGlobal: false,
  allowDoublettesSubscribers: false,
  useLatestSubscriberScope: true,
  suppressDebug: false,
}
const eventBus = () => {
  const hubId = ' broadcast-node '
  const on = ([type, listener, settings = defaultSettings]) => {
    const options = setOptions(settings)
    const { exists, id } = handleCache().listenerExists(type, listener, options)
    if (exists && !options.allowDoublettesSubscribers) {
      if (!options.useLatestSubscriberScope) return null
      // Remove previous listener and set new to update scope.
      off([type, listener, { suppressDebug: true }])
      debugmode({
        string: `Subscriber ${type} existed. Will update scope.`,
        obj: broadcastItemsCache,
      })
    }
    debugmode({
      string: `${
        exists ? `Updating listener scope for ${id}` : 'Setting new listener'
      } for "${type} (id:${id}})"`,
      obj: listener,
      force: options.debug,
    })
    const eventTarget = createOrGetCustomEventNode(hubId)
    const unbind = helpers().bind(eventTarget, {
      type: 'broadcast-' + type,
      listener: listener,
    })
    return unbind
  }
  const once = ([type, listener, settings = defaultSettings]) => {
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
    const unbind = helpers().bind(eventTarget, {
      type: 'broadcast-' + type,
      listener: listener,
      options: { once: true },
    })
    return unbind
  }
  const off = ([type, listener, settings = defaultSettings]) => {
    var _a
    if (
      typeof ((_a = listener) === null || _a === void 0
        ? void 0
        : _a.prototype) === 'undefined'
    ) {
      throw new Error(
        'Listener function not passed as a reference will not match previously set Broadcast listener.'
      )
    }
    const options = setOptions(settings)
    debugmode({
      string: `Removing listener "${type}"`,
      obj: listener,
      force: options.debug,
      settings,
    })
    handleCache().remove(type, listener)
    const eventTarget = createOrGetCustomEventNode(hubId)
    eventTarget.removeEventListener('broadcast-' + type, listener)
  }
  const emit = (type, detail, settings) => {
    debugmode({
      string: `Emitted ${type}`,
      obj: detail,
      force: settings === null || settings === void 0 ? void 0 : settings.debug,
    })
    const eventTarget = createOrGetCustomEventNode(hubId)
    return eventTarget.dispatchEvent(
      new CustomEvent('broadcast-' + type, { detail })
    )
  }
  return { on, once, off, emit }
  // Initiate or retreive node for custom event.
  function createOrGetCustomEventNode(hubId) {
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
    const listenerExists = (type, listener, settings) => {
      const id = createBroadcastId(type, listener)
      debugmode({
        string: 'broadcastItemsCache',
        obj: broadcastItemsCache,
        force: settings.debug,
      })
      if (broadcastItemsCache.indexOf(type + id) !== -1) {
        debugmode({
          string: `Found a previous instans of ${type}.`,
          force: settings.debug,
        })
        return { exists: true, id }
      }
      broadcastItemsCache.push(type + id)
      return { exists: false, id }
    }
    const remove = (type, listener) => {
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
  function createBroadcastId(flag, details) {
    let detailsStringified
    switch (typeof details) {
      case 'function':
        detailsStringified = helpers().serializeFn(details, {})
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
  function setOptions(settings) {
    const mergedOptions = Object.assign(
      Object.assign({}, defaultSettings),
      settings
    )
    if (mergedOptions.debugGlobal) globalDebug = true
    return mergedOptions
  }
  function helpers() {
    const hashCode = (s) =>
      s.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)
    const serializeFn = (f, env) =>
      JSON.stringify({ src: f.toString(), env: env })
    const bind = (target, { type, listener, options }) => {
      target.addEventListener(type, listener, options)
      return function unbind() {
        target.removeEventListener(type, listener, options)
      }
    }
    return { serializeFn, hashCode, bind }
  }
  function debugmode({ string, obj, force, settings }) {
    if (
      (!globalDebug && !force) ||
      (settings === null || settings === void 0
        ? void 0
        : settings.suppressDebug)
    )
      return
    const style =
      'color:#bada55;background:#666;padding:0.3rem 0.5rem;border-radius:3px'
    console.log(`%c${string}`, style, obj ? obj : '--')
  }
}
const broadcast = eventBus()
export { broadcast }
// Usage
/*
  No need to initialize separately. Import the 'broadcast' factory function and use to your hearts content.
  
  START SUBSCRIPTION IN REACT
  Return the `off` function if it is desired to stop subscription on unmount.
  useEffect(() => {
    const off = broadcast.on(['BROADCAST-ID', myCallbackFunction])
    return off
  }, [myCallbackFunction])
  
  START SUBSCRIPTION VANILLA JS
  const off = broacast.on(['BROADCAST-ID', ({ detail }) => {
      document.body.append(detail + ' ');
  }]);
  const off = broacast.once(['BROADCAST-ID', ({ detail }) => {
      document.body.append(detail + ' ');
  }]);
  
  END SUBSCRIPTION
  Execute the function returned by the subscribe function.
  
  PUBLISH (REACT & VANILLLA JS)
  broadcast.emit('BROADCAST-ID', 'Hello world')
  
  TO INSPECT VISUALLY
  Click elements tab i chrome devtools,
  click event-listeners tab in second pane.
  Active listeners begin with 'broadcast-' + flag name.
  
  To debug: add ?debug=BroadcasterJS in url and open devtools console.
  
  Advanced: function `on` and `once` takes an optional third value and emit takes
  an optional third argument in the form of a settings object.
  {
    debug: boolean
    debugGlobal: boolean
    allowDoublettesSubscribers: boolean
    useLatestSubscriberScope: true, // <- internal use
    suppressDebug: false, // <- internal use
  }
  */
