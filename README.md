# messageport-websocket

[![npm version](https://badge.fury.io/js/messageport-websocket.svg)](https://badge.fury.io/js/messageport-websocket) [![Build Status](https://travis-ci.org/compulim/messageport-websocket.svg?branch=master)](https://travis-ci.org/compulim/messageport-websocket)

This package will turn [MessagePort](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort) into [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket).

# Background

Instead of learning/using different API for different communication channels, we should unite them into a single interface pattern, either [MessagePort](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort) or [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket).

# How to use

```js
const { port1, port2 } = new MessageChannel();
const webSocket = new MessagePortWebSocket(port1);

webSocket.onmessage = event => {
  // Could be either a string or Buffer
  console.log(event.data);
};

webSocket.send('Hello, World!');
```

> Instead of subscribing to `onmessage`, you can also subscribe using `on('message', handler)`.

Note that when `MessagePortWebSocket` is constructed, the MessagePort is already established. So we assume Web Socket is already opened, thus, no `open` event will be emitted.

# Contributions

Like us? [Star](https://github.com/compulim/messageport-websocket/stargazers) us.

Want to make it better? [File](https://github.com/compulim/messageport-websocket/issues) us an issue.

Don't like something you see? [Submit](https://github.com/compulim/messageport-websocket/pulls) a pull request.
