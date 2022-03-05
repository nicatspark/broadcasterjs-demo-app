# BroadcasterJS

This app is a demo application for the event bus BroadcasterJS.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

---

We are using the `Custom Events` API but there is other ways.

## Other ways of communication in JavaScript

two common interfaces for inter-page interaction - `window.postMessage` and `BroadcastChannel` API - and compares the differences between them.

### window.postMessage

An example of a `window.postMessage` call is as follows.

```Javascript
// A Page
const B = window.open(B.html);
B.postMessage("hello B!", "*");
```

```Javascript
// B Page
function receiveMessage(ev) {
  alert(ev.data);
}
window.addEventListener("message", receiveMessage, false);
```

As you can see from the code, page A passes a Hello string to page B, which page B receives and alerts by listening.

`window.postMessage` is passed in one way and must specify the recipient’s (in fact, it calls the recipient’s API).

### Broadcast Channeel API

An example of a Broadcast Channeel API call is as follows.

```Javascript
// A Page
const bc = new BroadcastChannel('fm86.7');
bc.onmessage = function (ev) {
  alert(ev.data);
}
bc.postMessage('Music Radio');
```

```Javascript
// B Page
const bc = new BroadcastChannel('fm86.7');
bc.onmessage = function (ev) {
  alert(ev.data);
}
```

```Javascript
// C Page
const bc = new BroadcastChannel('fm86.7');
bc.onmessage = function (ev) {
  alert(ev.data);
}
```

As you can see from the code, all three pages have access to the `fm86.7` channel, and A broadcasts the `Music Radio` string, which is received by both B and C, and alerted out

## Applicable scenarios

### Single Page / Multi Page

Most single-page applications rely on built-in or plug-in implementation of global state management and are less likely to need to use the two methods in this article.

Consider using these two APIs when there is cross-page interaction in multi-page applications.

### Directional/Broadcast/Cross-Domain

`window.postMessage` is generally used for targeted delivery of data, and cross-domain interaction is possible (you can set the targetOrigin to ensure security).

`Broadcast Channel` API is a kind of broadcast, access to the corresponding channel can be received by all pages, but only limited to this domain, does not support cross-domain.

### MDN Documentation

For more specific usage and examples, see the MDN documentation, not here.

[window.postMessage-MDN documentation](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)
[Broadcast Channel API-MDN documentation](https://developer.mozilla.org/zh-CN/docs/Web/API/Broadcast_Channel_API)

## Other methods to pass inter-page data

For inter-page interaction, there are other more ways to.

- using URL parameters to pass values (?param=value), received with the URLSearchParams API, but only once, when the page is opened
- directly manipulate parent, top (Window object), or contentWindow of iFrame (Window object)
- Channel Messaging API, which only supports two-way communication between two pages
- pass data through localStorage, you can actively get, you can also use `window.addEventListener("storage", callback)` event trigger to get (the same, IndexedDB, Cookie and other storage solutions can be achieved between pages to pass data)
- Shared Worker or Service Worker
- These methods in increasing order of difficulty, but of course more powerful, for reference!

Using a broadcast function is in some way tied together with a global state. A global state manager like Redux could also be used for passing flags and data but every state change will ten force re-renders for all components connected with a listener even when the flag is not ment for that specific component.

[Reference](https://kaifeiji.cc/post/interactions-between-windows-postmessage-and-broadcastchannel/)

---

None of the above ways do allow to pass a function. But by serializing a function that could still be possible.

```Javascript
var a = 123, b = 'hello';
function test(x, y) {
	console.log(this);
	return a + x + b + y;
}

// Serialize a function *with its captured environment*
var sf = serialize(test, { a: a, b: b });

// Deserialize with captured environment
var pf = parse(sf);

// And call it
console.log(pf(10, ', world'));

function serialize(f, env) {
	return JSON.stringify({ src: f.toString(), env: env });
}

function parse(serialized) {
	var parsed = JSON.parse(serialized);
	return createFunction(parsed.src, parsed.env);
}

function createFunction(src, env) {
	return (new Function(createFunctionBody(src, env))(env));
}

function createFunctionBody(src, env) {
	return '"use strict";\n' + Object.keys(env).reduceRight(addVar, 'return ' + src + ';');
}

function addVar(s, k) {
	return 'var ' + k + ' = arguments[0].' + k + ';\n' + s;
}
```
