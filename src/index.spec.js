import MessagePortWebSocket from '.';
import { deserialize, HTMLEventEmitter, serialize } from 'websocket-util';

function setupMock() {
  const messagePort = new HTMLEventEmitter();

  messagePort.postMessage = jest.fn();
  messagePort.start = jest.fn();

  return { messagePort };
}

test('send text', () => {
  const { messagePort } = setupMock();
  const webSocket = new MessagePortWebSocket(messagePort);

  webSocket.send('Hello, World!');

  expect(messagePort.postMessage).toHaveBeenCalledTimes(1);
  expect(JSON.parse(messagePort.postMessage.mock.calls[0][0])).toEqual(serialize('Hello, World!'));
});

test('send binary', () => {
  const { messagePort } = setupMock();
  const webSocket = new MessagePortWebSocket(messagePort);

  webSocket.send(Buffer.from('Hello, World!'));

  expect(messagePort.postMessage).toHaveBeenCalledTimes(1);
  expect(JSON.parse(messagePort.postMessage.mock.calls[0][0])).toEqual(serialize(Buffer.from('Hello, World!')));
});

test('receive text', () => {
  const { messagePort } = setupMock();
  const webSocket = new MessagePortWebSocket(messagePort);

  webSocket.onmessage = jest.fn();

  messagePort.emit('message', {
    data: JSON.stringify(serialize('Hello, World!')),
    origin: 'https://./',
  });

  expect(webSocket.onmessage).toHaveBeenCalledTimes(1);
  expect(webSocket.onmessage.mock.calls[0][0]).toHaveProperty('data', 'Hello, World!');
  expect(webSocket.onmessage.mock.calls[0][0]).toHaveProperty('origin', 'https://./');
});
