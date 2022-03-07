import { Page } from './pages.styles'
import Prism from 'prismjs'
import { useEffect } from 'react'

const getCode = async (url: string, e: React.SyntheticEvent) => {
  e.preventDefault()
  e.stopPropagation()
  const fetchcode = async (url: Request) => await (await fetch(url)).text()
  const el = document.querySelector('.code') as HTMLElement
  var myRequest = new Request(url)
  const code = await fetchcode(myRequest)
  if (el) el.innerText = code
}

export const PageCode = () => {
  useEffect(() => {
    setTimeout(() => Prism.highlightAll(), 0)
  }, [])

  return (
    <Page>
      <h1>The source code</h1>
      <p className='center'>
        <a
          title='download'
          download
          onClick={(e) => getCode('/broadcaster.js', e)}
          href='/broadcaster.js'
        >
          broadcaster.js
        </a>{' '}
        |{' '}
        <a
          title='download'
          download
          onClick={(e) => getCode('/broadcaster.ts', e)}
          href='/broadcaster.ts'
        >
          broadcaster.ts
        </a>
      </p>
      <pre className='big line-numbers'>
        <code className='language-ts code'>
          {`
      export type ListenerProps = <T extends unknown>([type, listener, settings]: [
        type: string,
        listener?: T,
        settings?: settingsType
      ]) => string | void
      
      export interface returnType {
        on: ListenerProps
        once: ListenerProps
        off: ListenerProps
        emit: (type: string, detail?: unknown) => boolean
      }
      
      export interface settingsType {
        debug: boolean
        debugGlobal: boolean
        allowDoublettesSubscribers: boolean
      }
      
      let broadcastItemsCache: string[] = []
      
      let globalDebug =
        new URLSearchParams(window.location.search).get('debug')?.toLowerCase() ===
        'broadcasterjs'
      
      const defaultSettings = {
        debug: false,
        debugGlobal: false,
        allowDoublettesSubscribers: false,
      }
      
      const eventBus = (): returnType => {
        const hubId = ' broadcast-node '
        const on = <T extends unknown>([type, listener, settings = defaultSettings]: [
          type: string,
          listener?: T,
          settings?: settingsType
        ]): string => {
          const options = setOptions(settings)
          const { exists, id } = handleCache().listenerExists(type, listener, options)
          if (exists && !options.allowDoublettesSubscribers) return id
          if (options.debug)
            debugmode({
              string: \`Setting listener for "\${type}"\`,
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
        ]: [type: string, listener?: T, settings?: settingsType]) => {
          const options = setOptions(settings)
          const { exists, id } = handleCache().listenerExists(type, listener, options)
          if (exists && !options.allowDoublettesSubscribers) return id
          if (options.debug)
            debugmode({
              string: \`Setting "once" listener "\${type}"\`,
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
        ]: [type: string, listener?: T, settings?: settingsType]) => {
          const options = setOptions(settings)
          if (options.debug)
            debugmode({
              string: \`Removing listener "\${type}"\`,
              obj: listener,
              force: true,
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
          settings?: settingsType
        ): boolean => {
          debugmode({
            string: \`Emitted \${type}\`,
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
            settings: settingsType
          ): { exists: boolean; id: string } => {
            const id = createBroadcastId(type, listener)
            debugmode({
              string: 'broadcastItemsCache',
              obj: broadcastItemsCache,
              force: settings.debug,
            })
            if (broadcastItemsCache.includes(type + id)) {
              debugmode({
                string: 'Prevented doublette subscriber.',
                force: settings.debug,
              })
              return { exists: true, id }
            }
            broadcastItemsCache.push(type + id)
            return { exists: false, id }
          }
          const remove = (type: string, listener: unknown) => {
            const removeId = createBroadcastId(type, listener)
            broadcastItemsCache = broadcastItemsCache.filter(id => id !== removeId)
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
                  \`Could not "JSON.stringify" the broadcasterjs payload of "\${typeof details}" type.\`
                )
              }
          }
          return helpers()
            .hashCode(flag + detailsStringified)
            .toString()
        }
      
        function setOptions(settings: settingsType): settingsType {
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
        }: {
          string: string
          obj?: unknown
          force?: boolean
        }) {
          if (!globalDebug && !force) return
          console.log(\`%cBroadcast: \${string}\`, 'color:#bada55', obj ? obj : '--')
        }
      }
      const broadcast = eventBus()
      export { broadcast }
    `}
        </code>
      </pre>
      <p className='limited small'>
        (Even if BroadcasterJS is simple to use the source code for this site is
        public with plenty of examples that can be scrutinised here:{' '}
        <a href='https://github.com/nicatspark/broadcasterjs'>
          https://github.com/nicatspark/broadcasterjs
        </a>
        )
      </p>
    </Page>
  )
}
