"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
exports.__esModule = true;
exports.broadcast = void 0;
var broadcastItemsCache = [];
var globalDebug = ((_a = new URLSearchParams(window.location.search).get('debug')) === null || _a === void 0 ? void 0 : _a.toLowerCase()) ===
    'broadcasterjs';
var defaultSettings = {
    debug: false,
    debugGlobal: false,
    allowDoublettesSubscribers: false
};
var eventBus = function () {
    var hubId = ' broadcast-node ';
    var on = function (_a) {
        var type = _a[0], listener = _a[1], _b = _a[2], settings = _b === void 0 ? defaultSettings : _b;
        var options = setOptions(settings);
        var _c = handleCache().listenerExists(type, listener, options), exists = _c.exists, id = _c.id;
        if (exists && !options.allowDoublettesSubscribers)
            return id;
        if (options.debug)
            debugmode({
                string: "Setting listener for \"".concat(type, "\""),
                obj: listener,
                force: true
            });
        var eventTarget = createOrGetCustomEventNode(hubId);
        eventTarget.addEventListener('broadcast-' + type, listener);
        return id;
    };
    var once = function (_a) {
        var type = _a[0], listener = _a[1], _b = _a[2], settings = _b === void 0 ? defaultSettings : _b;
        var options = setOptions(settings);
        var _c = handleCache().listenerExists(type, listener, options), exists = _c.exists, id = _c.id;
        if (exists && !options.allowDoublettesSubscribers)
            return id;
        if (options.debug)
            debugmode({
                string: "Setting \"once\" listener \"".concat(type, "\""),
                obj: listener,
                force: true
            });
        var eventTarget = createOrGetCustomEventNode(hubId);
        eventTarget.addEventListener('broadcast-' + type, listener, { once: true });
        return id;
    };
    var off = function (_a) {
        var type = _a[0], listener = _a[1], _b = _a[2], settings = _b === void 0 ? defaultSettings : _b;
        var options = setOptions(settings);
        if (options.debug)
            debugmode({
                string: "Removing listener \"".concat(type, "\""),
                obj: listener,
                force: true
            });
        handleCache().remove(type, listener);
        var eventTarget = createOrGetCustomEventNode(hubId);
        eventTarget.removeEventListener('broadcast-' + type, listener);
    };
    var emit = function (type, detail, settings) {
        debugmode({
            string: "Emitted ".concat(type),
            obj: detail,
            force: settings === null || settings === void 0 ? void 0 : settings.debug
        });
        var eventTarget = createOrGetCustomEventNode(hubId);
        return eventTarget.dispatchEvent(new CustomEvent('broadcast-' + type, { detail: detail }));
    };
    return { on: on, once: once, off: off, emit: emit };
    // Initiate or retreive node for custom event.
    function createOrGetCustomEventNode(hubId) {
        var nodeIterator = document.createNodeIterator(document.body, NodeFilter.SHOW_COMMENT);
        while (nodeIterator.nextNode()) {
            if (nodeIterator.referenceNode.nodeValue === hubId) {
                return nodeIterator.referenceNode;
            }
        }
        return document.body.appendChild(document.createComment(hubId));
    }
    // Store each subscription (flag + details object serialized and hashed) in an array
    // taking advantage of the es6 modules intrinsic singleton properties.
    // If already stored reject request and exit silently.
    function handleCache() {
        var listenerExists = function (type, listener, settings) {
            var id = createBroadcastId(type, listener);
            debugmode({
                string: 'broadcastItemsCache',
                obj: broadcastItemsCache,
                force: settings.debug
            });
            if (broadcastItemsCache.indexOf(type + id) !== -1) {
                debugmode({
                    string: 'Prevented doublette subscriber.',
                    force: settings.debug
                });
                return { exists: true, id: id };
            }
            broadcastItemsCache.push(type + id);
            return { exists: false, id: id };
        };
        var remove = function (type, listener) {
            var removeId = createBroadcastId(type, listener);
            broadcastItemsCache = broadcastItemsCache.filter(function (id) { return id !== removeId; });
        };
        return { listenerExists: listenerExists, remove: remove };
    }
    // Serialize+hash the subscriber and store it to not add it twice.
    function createBroadcastId(flag, details) {
        var detailsStringified;
        switch (typeof details) {
            case 'function':
                detailsStringified = helpers().serializeFn(details, {});
                break;
            default:
                try {
                    detailsStringified = JSON.stringify(details);
                }
                catch (error) {
                    throw new Error("Could not \"JSON.stringify\" the broadcasterjs payload of \"".concat(typeof details, "\" type."));
                }
        }
        return helpers()
            .hashCode(flag + detailsStringified)
            .toString();
    }
    function setOptions(settings) {
        var mergedOptions = __assign(__assign({}, defaultSettings), settings);
        if (mergedOptions.debugGlobal)
            globalDebug = true;
        return mergedOptions;
    }
    function helpers() {
        var hashCode = function (s) {
            return s.split('').reduce(function (a, b) { return ((a << 5) - a + b.charCodeAt(0)) | 0; }, 0);
        };
        var serializeFn = function (f, env) {
            return JSON.stringify({ src: f.toString(), env: env });
        };
        return { serializeFn: serializeFn, hashCode: hashCode };
    }
    function debugmode(_a) {
        var string = _a.string, obj = _a.obj, force = _a.force;
        if (!globalDebug && !force)
            return;
        console.log("%cBroadcast: ".concat(string), 'color:#bada55', obj ? obj : '--');
    }
};
var broadcast = eventBus();
exports.broadcast = broadcast;
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
  }
  */
