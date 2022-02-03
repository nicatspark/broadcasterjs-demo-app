type ListenerProps = <T extends unknown>([type, listener]: [
  type: string,
  listener: T
]) => void

interface returnType {
  on: ListenerProps
  once: ListenerProps
  off: ListenerProps
  emit: (type: string, detail?: unknown) => boolean
}

let broadcastItemsCache: string[] = []

const debug =
  new URLSearchParams(window.location.search).get('debug')?.toLowerCase() ===
  'broadcasterjs'

const eventBus = (): returnType => {
  const hubId = ' broadcast-node '

  const on = <T extends unknown>([type, listener]: [
    type: string,
    listener: T
  ]) => {
    if (handleCache().listenerExists(type, listener)) return
    const eventTarget = createOrGetCustomEventNode(hubId)
    eventTarget.addEventListener(
      'broadcast-' + type,
      listener as EventListenerOrEventListenerObject
    )
  }
  const once = <T extends unknown>([type, listener]: [
    type: string,
    listener: T
  ]) => {
    if (handleCache().listenerExists(type, listener)) return
    const eventTarget = createOrGetCustomEventNode(hubId)
    eventTarget.addEventListener(
      'broadcast-' + type,
      listener as EventListenerOrEventListenerObject,
      { once: true }
    )
  }
  const off = <T extends unknown>([type, listener]: [
    type: string,
    listener: T
  ]) => {
    handleCache().remove(type, listener)
    const eventTarget = createOrGetCustomEventNode(hubId)
    eventTarget.removeEventListener(
      'broadcast-' + type,
      listener as EventListenerOrEventListenerObject
    )
  }
  const emit = (type: string, detail?: unknown): boolean => {
    debugmode(type, detail)
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
    const listenerExists = (type: string, listener: unknown) => {
      const id = createBroadcastId(type, listener)
      debugmode('broadcastItemsCache', broadcastItemsCache)
      if (broadcastItemsCache.includes(type + id)) return true
      broadcastItemsCache.push(type + id)
      return false
    }
    const remove = (type: string, listener: unknown) => {
      const removeId = createBroadcastId(type, listener)
      broadcastItemsCache = broadcastItemsCache.filter((id) => id !== removeId)
    }
    return { listenerExists, remove }
  }

  // Serialize+hash the subscriber and store it to not add it twice.
  function createBroadcastId(flag: string, details: unknown): string {
    let detailsStringified
    switch (typeof details) {
      case 'object':
      case 'boolean':
      case 'string':
        detailsStringified = JSON.stringify(details)
        break
      case 'function':
        detailsStringified = helpers().serializeFn(details as () => void, {})
        break
      default:
        throw new Error('Could not identify type of "details".')
    }
    return helpers()
      .hashCode(flag + detailsStringified)
      .toString()
  }

  function helpers() {
    const hashCode = (s: string) =>
      s.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)
    const serializeFn = (f: () => void, env: unknown) =>
      JSON.stringify({ src: f.toString(), env: env })
    return { serializeFn, hashCode }
  }

  function debugmode(type: string, obj?: unknown) {
    if (!debug) return
    console.log(`Broadcast: ${type}`, obj ? obj : '--')
  }
}
const broadcast = eventBus()
export { broadcast }

// Usage
/*
No need to initialize separately. Import the 'broadcast' factory function and use to your hearts content.

START SUBSCRIPTION IN REACT
useEffect(() => {
  broadcast.on(['broadcast-name', flagReceivedFunction])
}, [flagReceivedFunction])

START SUBSCRIPTION VANILLA JS
broacaster.on(['broadcast-name', ({ detail }) => {
    document.body.append(detail + ' ');
}]);
broacaster.once(['broadcast-name', ({ detail }) => {
    document.body.append(detail + ' ');
}]);

END SUBSCRIPTION
broacaster.off(['broadcast-name', ({ detail }) => {
    document.body.append(detail + ' ');
}]);

PUBLISH IN REACT & VANILLLA JS
broadcast.emit('broadcast-name', 'Hello world')

TO INSPECT VISUALLY
Click elements tab i chrome devtools, 
click event-listeners tab in second pane. 
Active listeners begin with 'broadcast-' + flag name.

To debug: add ?debug=BroadcasterJS
*/
