import { deserialize, serialize, WebSocketBase } from 'websocket-util';

export default class WebSocketConnection extends WebSocketBase {
  constructor(messagePort) {
    super(data => messagePort.postMessage(JSON.stringify(serialize(data))), { opened: true });

    this.handleMessage = this.handleMessage.bind(this);

    messagePort.addEventListener('message', this.handleMessage);
    messagePort.start();

    this.on('end', () => {
      messagePort.removeEventListener('message', this.handleMessage);
    });
  }

  handleMessage(event) {
    const messageEvent = {
      data: deserialize(JSON.parse(event.data)),
      origin: event.origin,
      source: this
    };

    this.emit('message', messageEvent);
  }
}
